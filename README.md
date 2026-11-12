# Between the Lines — Public Demo & Portfolio

A public introduction to the full **Between the Lines** local story-intelligence application, plus a transparent and intentionally limited in-browser preview. **This repository contains the public showcase only.** The full private application, backend, imported books, account data, and Ollama service are intentionally absent.

## The full local installation (private development edition)

The main product is a self-hosted Node.js and Docker Compose workspace with a persistent private book and TV library, PDF/EPUB/TXT imports, chapter and episode-aware evidence scopes, characters, relationships, and source-linked observations. It includes ten themes and can optionally run Ollama locally to draft deeper interpretations. **Ollama output is experimental and should be checked against the source.**

The public GitHub Pages demo is **not** the same as the local application. It has no persistent server library, no local model, no private account service, and no deep AI book comprehension. It supports browser-tab PDF/TXT imports and literal text search, plus curated fiction examples. Visitors never use the developer's home computing resources.

**Availability:** the complete local installer is still a private development build. This public demo repository does not distribute the private source, app database, bundled install ZIP, or Ollama models. A public installable release should follow further security and independent model-accuracy review. Details are prominently presented on the website under **Full local app**, **Compare editions**, and **Getting started**.

## Explore

- **Home / case study:** https://btl.masynnay.com/
- **Interactive reading room:** https://btl.masynnay.com/demo/

The C113 public demo adopts the private C111 reading workspace’s header, stopping-point controls, source tabs, signature violet-and-gold theme, and a real private-app screenshot while maintaining client-only PDF import. It includes source-linked Events, Places, Objects, Relationships, Recap, and Sources tabs. Details in [C113 parity notes](C113_PRIVATE_INTERFACE_PARITY.md).

The public demo now prioritizes **private on-device PDF and text import**, genuine extracted text reading, page-linked literal search, conservative name review, reading-progress boundaries, and ten coordinated themes. Two original short stories remain as optional prepared examples with richer curated character and relationship demonstrations.

**Not included:** sign-in, uploading documents to a server, live Ollama inference, production data, or any claims of verified general-purpose literary reasoning. PDF processing happens locally in the visitor browser using a self-hosted PDF.js build; scanned pages need OCR and cannot be indexed here. The question tool is literal passage search, not an AI chatbot. Demo preferences and reading progress live in the browser's `localStorage` and can be reset with **Reset demo**.

## Deploy on GitHub Pages

1. Create a new **public** GitHub repository named `between-the-lines` under `MasynNay`. Do **not** initialize with a README; this archive already includes one.
2. Upload the **contents** of this folder to the repository's `main` branch, including the hidden `.github/workflows/pages.yml` folder, `CNAME`, `index.html`, `demo/`, `assets/`, and `.nojekyll`.
3. In **Settings → Pages**, set **Build and deployment → Source → GitHub Actions**. The supplied `Publish Between the Lines public demo` workflow will publish the site on pushes to `main`.
4. In **Settings → Pages → Custom domain**, enter `btl.masynnay.com` and save. This setting is required even though a `CNAME` file is included: **GitHub Actions deployments ignore that file**.
5. In Cloudflare DNS, set the `btl` **CNAME** target to `masynnay.github.io` (without `https://`, without a repository name); use **DNS only** until Pages confirms the domain and HTTPS. Remove conflicting `btl` A/AAAA records if present.
6. When GitHub completes its certificate setup, turn on **Enforce HTTPS** in Pages and open the home and `/demo/` URLs. DNS/certificate propagation can take time.

If the repo is created first and GitHub is connected to ChatGPT, the assistant can make subsequent repository changes without requiring an Aang installation. Repo creation itself is not supported by the currently available connected GitHub actions.

## Safety and architecture

- Static HTML, CSS and JavaScript. GitHub Actions installs a pinned Mozilla PDF.js build and bundles it locally for visitors; there is no application backend or document upload endpoint.
- A strict per-page Content Security Policy disallows external connections, remote scripts, forms and frames. PDF parser and worker files are served from the same GitHub Pages origin.
- All demonstration story text is original fiction, not an imported book.
- `assets/app-reader.webp` and `assets/app-library.webp` are **labeled historical screenshots** from an older private development build; they are not screenshots of this new demo.
- No accounts, API keys, upload endpoint, analytics, or off-origin runtime requests. Uploaded document bytes and text stay in memory and are discarded on refresh.
- **This is a showcase and a representative client-side product exercise**, not a public deployment of the full research engine.

## Local inspection

Open `index.html` or serve this folder with `python3 -m http.server 8765` and navigate to `http://localhost:8765`. The demo runs at `/demo/`.

`node tests/demo.test.cjs` and `node tests/local-import.test.cjs` run the source-linked chapter-gating and local import adapter checks without needing a browser. PDF.js is installed by the deployment workflow, not this checkout.

## Source confidentiality

Only publish this public-only folder. Do **not** upload any of the full Between the Lines clean-install ZIPs, local Docker state, database files, user PDFs, or Ollama models into a public repo.

© 2026 MasynNay. This demonstration's sample fiction is original. Historical product screenshots are used to illustrate software work.
