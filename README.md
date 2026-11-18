# Between the Lines — Public Demo & Portfolio

A dark-first public introduction to the full **Between the Lines** local story-intelligence application, plus a transparent and intentionally limited in-browser preview. **This repository contains the public showcase only.** The full private application, backend, imported books, account data, and Ollama service are intentionally absent.

## The full local installation (private development edition)

The main product is a self-hosted Node.js and Docker Compose workspace with a persistent private book and TV library, PDF/EPUB/TXT imports, chapter and episode-aware evidence scopes, characters, relationships, and source-linked observations. It includes ten themes and can optionally run Ollama locally to draft deeper interpretations. **Ollama output is experimental and should be checked against the source.**

The public GitHub Pages demo is **not** the same as the local application. It has no persistent server library, no local model, no private account service, and no deep AI book comprehension. It supports browser-tab PDF/TXT imports and literal text search, plus curated fiction examples. Visitors never use the developer's home computing resources.

**Availability:** the complete local installer is still a private development build. This public demo repository does not distribute the private source, app database, bundled install ZIP, or Ollama models. A public installable release should follow further security and independent model-accuracy review. Details are prominently presented on the website under **Full local app**, **Compare editions**, and **Getting started**.

## Current engineering checkpoints

- **Private application C135:** Improves the **real imported-book question endpoint**, not only evaluation tooling. The second local-model evidence review now sees all bounded retrieved completed-reading passages; an independent lexical guard can withhold a disputed actor/action/object claim even if the model approved it, while keeping conflicting original excerpts visible. A fresh private ZIP passed **1,134 offline fixture tests in 13 batches** and **26 focused tests**, including a mocked Ollama HTTP test. **No real model accuracy is certified**; 20 genuine `parse5` integration tests, independent human grading and Docker-host recovery remain unverified. The private source and installer are **not part of this public repository**.


- **Private application C134:** Adds **gold-blinded source review of actual candidate model answers**, distinct from C133's gold-label review, with 32 chapter-scoped packets, separate reader worksheets, source-citation vetoes and private disagreement reports. A fresh private archive passed **1,126 offline fixture tests** and **27 focused tests**. **No real Ollama run or independent human review occurred**, and the 20 genuine `parse5` checks, Docker-host recovery and live upgrades remain unverified. The private installer/source and review packets are **not** included here.


- **Private application C133:** Builds a **gold-blinded, two-reader source-annotation workflow** for the 32-question synthetic comprehension benchmark. Reader packets contain no gold labels or later chapters, and an offline combiner flags missing answers, unsupported citations, disagreements and provisional label conflicts. A private fresh-extracted ZIP passed **1,116 offline fixture tests** and **23 focused tests**. **No real reviewers, Ollama inference, genuine `parse5` integration or Docker host run occurred**. This public repository does not distribute the private application, source passages or review packets.


- **Private application C132:** Prepared a **32-question, two-original-short-story benchmark** with chapter-aware citations and an offline, fail-closed multi-work batch combiner. A fresh private ZIP passed **1,108 offline fixture tests** and **15 focused tests**. This does **not** establish genuine Ollama answers, independently reviewed gold labels, or full-book comprehension. The 20 real `parse5` cases and actual Docker host recovery are also unverified. No private source, installer, story passages, answers or model credentials are included here.


- **Private application C131:** Adds a synthetic-only, opt-in Docker-volume recovery rehearsal with protected snapshot/restore checks. The *offline unit and fixture tests* passed **1,100/1,100** from a fresh source ZIP, with **24 focused tests** passing. **Actual Docker execution did not occur**; real `parse5` integration, independent Ollama accuracy and a live version-to-version rollback are also unverified. This public repository contains no C131 private app source or installer.


- **Private application C130:** Introduces an exact **20-case real `parse5` test gate** with a dependency-free plan and fail-closed execution that rejects the offline fixture. A fresh private ZIP passed **1,092 offline fixture tests** and **11 focused tests**. **The 20 genuine parser tests remain unverified** because the real dependency could not be fetched here. Real Ollama comprehension, Docker build and live data-preserving upgrades are also unverified. The private installer/source is **not** in this repository.


- **Private application C129:** Before an inspect-first staged copy or disposable recovery rehearsal, the private tool now estimates free space and refuses insufficient-space operations, retaining a minimum **64 MiB or 10% headroom**. The earlier offline suite passed **1,088 fixture-based tests in 12 batches**; **20 genuine `parse5` cases**, real Ollama accuracy, and live Docker activation/rollback remain unverified. The private application, ZIP and user data are not included here.


- **Private application C128:** Fixes a stopped-app upgrade verification gap: checks **real source bytes and private settings** at the beginning and end of staging, even when file size and modification time are unchanged; refuses swapped file identities and symlinked private checksum sources. A separately extracted C128 archive passed **1,084 offline tests in 12 bounded batches** and new drift regression tests. The **20 real `parse5` integration cases remain unverified**, as do genuine model accuracy and Docker-host upgrade/rollback. The private C128 installer and code are **not published here**.


- **Private application C127:** Adds an owner-only **disposable restore rehearsal** for a verified staged installation. A synthetic post-write restoration is checked without altering the original or staged library. Fresh-package verification passed **1,080 offline tests** and **15 focused tests**. This is **not** a certified live Docker rollback. The 20 real `parse5` cases and independently scored Ollama comprehension remain unverified; no private source or installer is included here.


- **Private application C126:** A newly verified private checkpoint adds bounded offline regression batches and stricter non-destructive upgrade-stage audits. **1,077 offline tests passed across 12 batches**, including a fresh-extraction run. The **20 real `parse5` integration tests remain unverified**, and there are no real human-reviewed Ollama scores, validated Docker cutover, or post-write rollback. Nothing from the private C126 package is included here.


- **Private application C125:** independent read-only verification of a separate, stopped-app staging copy; exact source file hashes, private permissions, preserved empty directories, and atomic Linux no-overwrite publication. A clean-source ZIP passed **58 focused tests**. The full offline regression and the 20 real `parse5` integration checks are **not certified**. This is not a public installer or safe live upgrade, and no model-quality claims are made.

- **Private application C124:** a non-destructive upgrade *preparation* workflow can inspect existing data and create a new, separately verified staged copy while preserving the original. **This is not a live Docker upgrade, release-quality migration, or published installer.** Focused synthetic checks passed; broad regression, genuine HTML parser integration, actual model accuracy, and a tested host upgrade remain outstanding.

- **Public reading room C122:** whole-word PDF/TXT search, exact-phrase-first ranking, clearly labeled partial matches, and improved keyboard navigation to search answers and cited pages. The real browser PDF.js and privacy tests passed before deployment.
- **Private application C123:** local-only bounded Ollama benchmark batches, strict offline aggregation, and individual gold-blinded human review packets. The package source was integrity-checked, but **no real Ollama comprehension benchmark or independent human evaluation has happened**. The genuine `parse5` HTML/Wikipedia integration remains unverified (20 checks). The private code and installer are **not part of this public repository**.

## Explore

- **Development roadmap and stopping point:** [ROADMAP.md](ROADMAP.md)

- **Home / case study:** https://btl.masynnay.com/
- **Interactive reading room:** https://btl.masynnay.com/demo/

The public browser demo adopts the private C111 reading workspace’s header, stopping-point controls, source tabs, signature violet-and-gold theme, and a real private-app screenshot while maintaining client-only PDF import. It includes source-linked Events, Places, Objects, Relationships, Recap, and Sources tabs. Details in [C113 parity notes](C113_PRIVATE_INTERFACE_PARITY.md).

The public demo now prioritizes **private on-device PDF and text import**, source-page reading, exact-PDF-page literal search links, explicit import removal/cancellation, conservative name review, spoiler-aware stopping points, and ten coordinated themes. Imported books stay in this tab only: reset or remove one to clear its text from the current session. Two original short stories remain as optional prepared examples with richer curated character and relationship demonstrations.

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

`node tests/demo.test.cjs`, `node tests/local-import.test.cjs`, and `node tests/privacy-workflow.test.cjs` check source grounding, spoiler boundaries, document removal, cancellation, and import limits. `python3 tests/browser_smoke.py` checks the DOM in isolated Chromium if Playwright is installed. **C117 added a real PDF.js browser gate**: the GitHub Pages build bundles pinned PDF.js, then runs `node tests/pdf-browser-smoke.cjs` in Chromium at desktop and mobile widths. It imports a generated two-page PDF, validates exact citations and locked pages, tests an image-only PDF, and verifies no unexpected network requests or stored prose. PDF.js and Playwright Core are installed by the CI workflow, not committed into this source tree. An optional diagnostic checks production HTTPS routes after deployment.

## Source confidentiality

Only publish this public-only folder. Do **not** upload any of the full Between the Lines clean-install ZIPs, local Docker state, database files, user PDFs, or Ollama models into a public repo.

© 2026 MasynNay. This demonstration's sample fiction is original. Historical product screenshots are used to illustrate software work.
