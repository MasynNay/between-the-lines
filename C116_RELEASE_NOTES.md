# C116 — Public browser demo reliability and privacy

**Date:** November 16, 2026  
**Scope:** `MasynNay/between-the-lines` public GitHub Pages site only; not the private Docker/Ollama application.

## Implemented

- Exact-PDF-page reader with numbered-page navigation and boundary-aware source search links.
- In-memory imported document removal, including a visible library control and per-document sidebar action.
- Reset now clears all imports from the active tab; an in-progress import can be cancelled without adding a late result.
- 40 MiB upload-size limit, 800-PDF-page limit, 8 MiB extracted-text limit, and actionable messages for invalid, password-protected, empty, or image-only documents.
- GitHub Pages pipeline now separates artifact upload (`build`) from publication (`deploy`) to prevent the single-job artifact-discovery race on initial publication.
- No uploaded book data added to this release. Static website continues to have no connection to home computers or private Ollama services.

## Test evidence

- `node tests/demo.test.cjs` — PASS.
- `node tests/local-import.test.cjs` — PASS.
- `node tests/privacy-workflow.test.cjs` — PASS, including an in-progress import cancellation and reset.
- `python3 tests/verify_site.py` — PASS on local public source.
- `python3 tests/browser_smoke.py` — PASS on isolated Chromium desktop 1440×900 and mobile 390×844 DOM. This mode does not navigate a hosted or local URL because browser navigation is prohibited by the environment.
- `node --check` on application and demo source — PASS.

## Outstanding

Real PDF.js worker parsing of a PDF in the hosted browser, external HTTPS/DNS, scanning/encrypted PDFs, screen-reader assistive-technology review, and real Ollama accuracy evaluation are *not independently verified* by these checks. Do not claim otherwise.

## Next checkpoint

Complete the production PDF/HTTPS end-to-end review, then begin a separately measured, source-grounded P1 private-model benchmark. Keep the private app out of this GitHub repository.
