# Between the Lines — Product Roadmap

**Last reviewed:** November 16, 2026 (C117)  
**Public site:** https://btl.masynnay.com  
**Public source:** https://github.com/MasynNay/between-the-lines  
**Private app checkpoint:** C111 complete local source, kept separately from this public website.

## The two editions

The **public browser demonstration** is a static GitHub Pages site with local-in-browser PDF/TXT import, basic extraction and passage search, ten themes, and sample evidence. It does **not** run Ollama, retain a server library, accept accounts, or connect to Aang or Korra. The full **private local application** supports a persistent library, book and TV research, more advanced import and source evidence, and optional Ollama analysis. Neither edition should promise perfect literary understanding.

## Next milestones (in recommended order)

### P0 — Confirm portfolio quality and reliability

- [ ] Independently review the new dark-first homepage and demo on desktop, phone, keyboard, and screen reader.
- [ ] Confirm Pages custom domain and **Enforce HTTPS**; verify `/` and `/demo/` after cache refresh.
- [ ] Verify a visitor can import a selectable-text PDF entirely on-device, navigate its pages, change reading position, and clear the import without external traffic. **C116 progress:** isolated desktop/mobile browser-TXT checks and exact-page navigation pass; production PDF.js worker still needs independent verification.
- [ ] Test large uploads and corrupted/encrypted/scanned documents. Give clear, helpful limitations instead of silent failures. **C116 progress:** file-size and extracted-text guards, cancellation, and error messages implemented; actual malformed/encrypted PDF parsing still needs an end-to-end browser run.
- [ ] Capture current real local-app screenshots for the portfolio; label historical ones until replaced.

**Done when:** the demo passes end-to-end browser checks and its claims match the visitor's actual experience.

### P1 — Factual story intelligence, not confident guesses

- [ ] Run a reproducible, human-reviewed Ollama benchmark on user-provided, legitimately accessible book chapters and TV episodes.
- [ ] Record separate accuracy measures for characters, identity aliases, actions, relationships, chronology, and citations; report false positives and unanswered questions.
- [ ] Add an evidence requirement and **unknown / uncertain / directly stated / reported** labels to every generated fact.
- [ ] Improve first-person narrator resolution without assuming every 'I' is a named character.
- [ ] Prevent front matter, teaser chapters, appendices, and author material from contaminating the story index.
- [ ] Retain a regression set for false character names such as 'So', 'Probably', and sentence-opening fragments.

**Done when:** independent sample reviews show fewer invented facts, every asserted fact has a verifiable source, and limitations are documented.

### P2 — Make the self-hosted app feel finished

- [ ] Harmonize ten coordinated themes across all dialogs, tabs, buttons, empty states, and mobile views.
- [ ] Make the reading workflow obvious: import → choose stopping point → browse characters/events/relationships → inspect evidence.
- [ ] Improve duplicate identities and aliases with review-before-merge controls and reversible decisions.
- [ ] Make large-library search fast, with chapter-accurate citations, clear loading progress, and cancellable long AI operations.
- [ ] Revisit bookshelf spines, TV display, image quality, typography, and navigational consistency.

**Done when:** a new tester can complete a book-import and source-verification task without coaching, and major controls are keyboard-accessible.

### P3 — Safe, repeatable local installation

- [ ] Keep one Docker Compose project and one clean release package; no numbered trial containers.
- [ ] Add an upgrade path that backs up and preserves books, accounts, preferences, and Ollama model cache unless the user explicitly requests a reset.
- [ ] Document supported operating systems, CPU/RAM needs, first-run model download, backups, restores, and removal.
- [ ] Test account isolation, unsafe file paths, upload limits, rate limiting, CSRF, and prompt-injection resistance.
- [ ] Complete realistic long-session memory, performance, recovery, and timeout tests.

**Done when:** fresh install, upgrade, backup, restore, and uninstall all pass on supported hosts without affecting unrelated Docker services.

### P4 — Responsible public availability

- [ ] Decide whether to publish the local source, an installer, or both only after privacy, security, and licensing review.
- [ ] Keep public GitHub Pages demo completely disconnected from private infrastructure.
- [ ] If a model-backed public demo is ever desired, design isolated hosting, usage quotas, cost limits, abuse protections, and a separate privacy policy first.
- [ ] Finish product documentation, accessibility checklist, changelog, screenshots, and a clear feature matrix.

**Done when:** visitors know precisely what is included in each edition, installation is safe to distribute, and there is evidence for the claims on the website.

## Working rules for the next session

1. The live public repository contains **only** the static showcase. Do not push private clean-install ZIPs, Docker data, model files, PDF uploads, credentials, or account state here.
2. Do not start, modify, or expose Aang, Korra, nginx, Home Assistant, or private Ollama as part of public demo updates.
3. Prefer **one complete, replaceable local application package** over C-series trial deployments. Keep release notes and verification results with each private checkpoint.
4. Before calling any upgrade completed, test the exact archive or commit being delivered. Separate unit/integration checks from independent real-model evaluations.
5. Work one priority at a time. Keep this roadmap and the public README accurate as code evolves.

## C116 progress (November 16, 2026)

- [x] Source and test review of the C115 public repository, confirming the homepage, demo, and two-edition boundaries.
- [x] Implement an explicit **Remove book** control and a Reset action that clears imported files from active in-memory state; never persist imported prose.
- [x] Implement **exact PDF page** view and go-to-page controls: source results can now open page N, within the stopping-point boundary, without rendering whole multi-page sections at once.
- [x] Add a cancellable import flow and guard against excessive extracted text, empty files, oversized files, and incorrect formats. Provide actionable error messages for damaged or encrypted files.
- [x] Exercise TXT import, page citations, spoiler gates, removal, themes, and responsive layouts with isolated desktop/mobile Chromium DOM tests (no server navigation).
- [ ] Perform a full hosted-site audit with an actual selectable-text PDF and the production-bundled PDF.js worker, including HTTP traffic inspection. Chromium navigation and local npm package download are blocked in the development environment; do not mark this verified.
- [ ] Verify custom-domain HTTPS enforcement and collect new real private-app screenshots.

## C117 progress (November 16, 2026)

- [x] Use a **real Chromium PDF.js integration test** during each Pages build, with the same pinned parser and web worker shipped to visitors.
- [x] Exercise generated, original two-page PDF input at desktop and mobile widths: verify text extraction, chapter gating, exact-page search citations, removal, image-only PDF rejection, and no outbound/upload requests or persisted book prose.
- [x] GitHub Actions **build and deploy passed** for commit `5ea8008` (C117 initial test gate). The synthetic fixture is generated in memory and is never checked into the public site as a PDF.
- [ ] Confirm hosted HTTPS responses and worker assets from an external runner (diagnostic probe added); verify public custom-domain behavior independently after any DNS change.
- [ ] Run independent assistive-technology checks on actual devices, then progress to the P1 private Ollama factual-accuracy benchmark.

## Current stopping point

- The public portfolio site and browser demo are deployed using GitHub Pages and the custom domain.
- The homepage has a **dark-first theme** and a story-evidence illustration in its opening, instead of a large rectangular product screenshot; genuine private-app screenshots remain in the feature tour.
- The local application is **not publicly deployed or connected** to this website. Deep Ollama accuracy is still unverified independently.
- Suggested next task: **P0 — finish hosted HTTPS/device/accessibility checks**, then start **P1 — the human-reviewed private Ollama comprehension benchmark**. The public demo remains a browser-based preview, not the complete local application.
