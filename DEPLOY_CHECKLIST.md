# Between the Lines public publication and review checklist

## Completed

- [x] Public repository `MasynNay/between-the-lines` exists and contains **only** static showcase source.
- [x] GitHub Pages uses the GitHub Actions deployment workflow and the `btl.masynnay.com` custom-domain setting.
- [x] Separate build and deploy jobs publish the browser preview and self-hosted PDF.js parser.
- [x] Automated text-import, spoiler-boundary, theme, privacy and source-integrity checks pass.
- [x] C117 checks real PDF upload through the production PDF.js parser and worker in Chromium at desktop/mobile sizes.

## Still requires independent verification

- [ ] Confirm the **HTTPS certificate** and Cloudflare CNAME are correct; enable **Enforce HTTPS** in GitHub Pages settings.
- [ ] Check both `https://btl.masynnay.com/` and `/demo/` using an unrelated physical desktop and phone browser.
- [ ] Run a real **locally owned selectable-text PDF** through the published site and confirm all bytes remain in the browser tab.
- [ ] Test password-protected, malformed, very large and image-only PDFs on the hosted domain.
- [ ] Check keyboard and screen-reader behavior and color contrast across all ten themes.
- [ ] Re-capture private app screenshots before presenting historical screenshots as current.

**Security boundary:** Never publish the private application source, personal book PDFs, databases, local Ollama models, `.env` files, or Docker state in this static website repository.
