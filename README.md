# Between the Lines — Public Demo & Portfolio

A self-contained editorial case study and interactive sample of **Between the Lines**, an evidence-first, chapter-aware reading companion. **This repository contains the public showcase only.** The full private application, backend, imported books, account data, and Ollama service are intentionally absent.

## Explore

- **Home / case study:** https://btl.masynnay.com/
- **Interactive reading room:** https://btl.masynnay.com/demo/

The public demo offers two original short stories, a sample library, reading-progress controls, visible chapter boundaries, source-linked character dossiers, chronological relationship evidence, a question interface using authored citations and lexical matching, and ten coordinated themes.

**Not included:** sign-in, PDF uploads, remote calls, production data, live Ollama inference, or any claims of verified general-purpose literary reasoning. The sample question tool is not an AI chatbot. Demo preferences and reading progress live in the browser's `localStorage` and can be reset with **Reset demo**.

## Deploy on GitHub Pages

1. Create a new **public** GitHub repository named `between-the-lines` under `MasynNay`. Do **not** initialize with a README; this archive already includes one.
2. Upload the **contents** of this folder to the repository's `main` branch, including the hidden `.github/workflows/pages.yml` folder, `CNAME`, `index.html`, `demo/`, `assets/`, and `.nojekyll`.
3. In **Settings → Pages**, set **Build and deployment → Source → GitHub Actions**. The supplied `Publish Between the Lines public demo` workflow will publish the site on pushes to `main`.
4. In **Settings → Pages → Custom domain**, enter `btl.masynnay.com` and save. This setting is required even though a `CNAME` file is included: **GitHub Actions deployments ignore that file**.
5. In Cloudflare DNS, set the `btl` **CNAME** target to `masynnay.github.io` (without `https://`, without a repository name); use **DNS only** until Pages confirms the domain and HTTPS. Remove conflicting `btl` A/AAAA records if present.
6. When GitHub completes its certificate setup, turn on **Enforce HTTPS** in Pages and open the home and `/demo/` URLs. DNS/certificate propagation can take time.

If the repo is created first and GitHub is connected to ChatGPT, the assistant can make subsequent repository changes without requiring an Aang installation. Repo creation itself is not supported by the currently available connected GitHub actions.

## Safety and architecture

- Static HTML, CSS and JavaScript. No build dependencies or runtime server.
- A strict per-page Content Security Policy disallows external connections, remote scripts, forms and frames.
- All demonstration story text is original fiction, not an imported book.
- `assets/app-reader.webp` and `assets/app-library.webp` are **labeled historical screenshots** from an older private development build; they are not screenshots of this new demo.
- No accounts, API keys, uploads, analytics, or external requests.
- **This is a showcase and a representative client-side product exercise**, not a public deployment of the full research engine.

## Local inspection

Open `index.html` or serve this folder with `python3 -m http.server 8765` and navigate to `http://localhost:8765`. The demo runs at `/demo/`.

`node tests/demo.test.cjs` runs the source-linked chapter-gating and interaction-state checks without needing a browser.

## Source confidentiality

Only publish this public-only folder. Do **not** upload any of the full Between the Lines clean-install ZIPs, local Docker state, database files, user PDFs, or Ollama models into a public repo.

© 2026 MasynNay. This demonstration's sample fiction is original. Historical product screenshots are used to illustrate software work.
