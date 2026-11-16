#!/usr/bin/env python3
"""Optional isolated DOM smoke checks; requires Python Playwright and Chromium.
Sandbox-safe page.set_content: verifies DOM behaviors without real HTTP navigation.
Not a replacement for testing the production PDF.js worker and hosted domain.
"""
from __future__ import annotations
import os
import re
import base64
import mimetypes
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

def run():
    # Browser navigation is restricted in some CI sandboxes. Test actual DOM/JS
    # in an isolated document instead; PDF.js network module loading is separate.
    def load_document(page, document, css, scripts):
        html=(ROOT / document).read_text()
        html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>','',html)
        html=re.sub(r'<script src="[^"]+" defer></script>','',html)
        html=re.sub(r'<link rel="stylesheet" href="[^"]+">','',html)
        html=re.sub(r'<img\b[^>]*>','<span class="test-image" aria-hidden="true"></span>',html)
        page.set_content(html, wait_until="load")
        for file in css: page.add_style_tag(content=(ROOT / file).read_text())
        for file in scripts: page.evaluate((ROOT / file).read_text())
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, executable_path=os.getenv("CHROMIUM_BIN", "/usr/bin/chromium"), args=["--no-sandbox"])
            try:
                for width, height, label in [(1440, 900, "desktop"), (390, 844, "mobile")]:
                    page = browser.new_page(viewport={"width":width,"height":height}, device_scale_factor=1)
                    page.set_default_timeout(8000)
                    errors, outside, outbound = [], [], []
                    page.on("pageerror", lambda e: errors.append(str(e)))
                    page.on("request", lambda req: outside.append(req.url))
                    page.on("request", lambda req: outbound.append(req.method + ' ' + req.url) if req.method != "GET" else None)
                    load_document(page, "index.html", ["styles.css"], ["app.js"])
                    assert page.locator("h1").count() >= 1
                    assert not page.evaluate("document.documentElement.scrollWidth > innerWidth+1"), "Homepage horizontal overflow"
                    load_document(page, "demo/index.html", ["demo/styles.css", "demo/private-match.css"], ["demo/data.js", "demo/import-engine.js", "demo/demo.js"])
                    assert page.locator("#view-content").inner_text() != ""
                    assert not page.evaluate("document.documentElement.scrollWidth > innerWidth+1"), "Demo horizontal overflow"
                    page.locator("#theme-launch").click()
                    assert page.locator("#theme-dialog").evaluate("el=>el.open")
                    page.locator("button[data-theme-choice='pine']").click()
                    assert page.locator("html").get_attribute("data-theme") == "pine"
                    page.locator("button[data-view='library']").first.click()
                    # The browser must be able to import private TXT content, search, cite and remove it.
                    sample=("My brother Sid found the blue ribbon near the sea. ")*135 + "\nSECRET TERM: clovergate" + (" Mara visited the greenhouse.")*280
                    page.locator("#book-upload").set_input_files({"name":"Private_Smoke_Test.txt", "mimeType":"text/plain", "buffer":sample.encode()})
                    page.locator(".source-reading-page").wait_for(timeout=10000)
                    assert "PAGE 1" in page.locator(".source-reading-header").inner_text().upper()
                    assert "clovergate" not in page.locator(".source-reading-text").inner_text().lower(), "Future page exposed"
                    page.locator("#local-section").select_option("2")
                    assert "clovergate" in page.locator(".source-reading-text").inner_text().lower(), "Second source page missing"
                    page.locator("#workspace-tabs button[data-guide-view='evidence']").click()
                    page.locator("#question-input").fill("clovergate")
                    page.get_by_role("button", name="Search my PDF").click()
                    assert "Open PDF page 2" in page.locator(".answer-pane").inner_text()
                    page.locator(".answer-pane [data-source-page='2']").click()
                    assert "PAGE 2" in page.locator(".source-reading-header").inner_text().upper()
                    page.locator("button[data-view='library']").first.click()
                    page.locator("#view-content [data-remove-story]").first.click()
                    assert "removed from this tab" in page.locator("#import-status").inner_text()
                    assert "Private Smoke Test" not in page.locator("#sidebar-book-panel").inner_text()
                    load_document(page, "demo/index.html", ["demo/styles.css", "demo/private-match.css"], ["demo/data.js", "demo/import-engine.js", "demo/demo.js"])
                    assert "Private Smoke Test" not in page.locator("#sidebar-book-panel").inner_text(), "Private text persisted after refresh"
                    assert not errors, f"Console errors: {errors}"
                    assert not outside, f"Unexpected cross-origin requests: {outside}"
                    assert not outbound, f"Unexpected non-GET requests: {outbound}"
                    assert not page.evaluate("document.documentElement.scrollWidth > innerWidth+1"), "Overflow after import"
                    page.evaluate("scrollTo(0,0)")
                    page.screenshot(path=str(ROOT / f"C116_demo_{label}.png"), full_page=False)
                    print(f"PASS {label}: isolated DOM/TXT import, source-page citation, spoiler gate, removal, no attempted requests")
                    page.close()
            finally:
                browser.close()
    finally:
        pass
if __name__ == "__main__":
    run()
