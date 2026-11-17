# C117 — Real PDF.js browser verification

**Date:** November 16, 2026  
**Public target:** https://btl.masynnay.com/demo/  
**Scope:** public GitHub Pages demo only; no changes to Aang or the private Docker application.

## What changed

- Added a pre-publication Chromium smoke test that imports a **generated original two-page PDF** using the same PDF.js main module and worker included in the deployed site.
- Test checks that page 2 is inaccessible at the first stopping point, that advancing unlocks it, that literal search cites PDF page 2, and that removing the document discards it.
- Tests image-only PDF error handling and checks browser error logs, unexpected network requests, and `localStorage` for user prose.
- Continues the existing JavaScript test suite and separation between GitHub Pages `build` and `deploy` jobs.
- Added a nonblocking HTTPS route diagnostic for the portfolio homepage, demo and bundled PDF.js worker files.

## Verified

- Synthetic fixture independently parses as two PDF pages with text extraction using PyMuPDF.
- Existing C116 JavaScript and static-site verification suites pass locally.
- **C117 GitHub Actions real browser test passed at both 1440 px and 390 px**, then Pages successfully deployed commit `5ea80080737becda490303b4b295145266bc27d4`.
- GitHub Pages deployed documentation checkpoint `48b5d719f970dbd69b58a9296ceaa547a8ba31ec` successfully, and the automated HTTPS probe passed for `/`, `/demo/`, `/demo/vendor/pdf.min.mjs`, and `/demo/vendor/pdf.worker.min.mjs`.

## Not yet verified

- Cloudflare DNS target and GitHub **Enforce HTTPS** setting from the account UI; full-hosted-page audit using a reader-owned real PDF; screen-reader review; actual Ollama model factual accuracy; security of distributing the private app.

The new tests generate their own PDFs at runtime. **No user's novel, account data, model weights, or private service configuration is included.**
