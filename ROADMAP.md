# Between the Lines — Product Roadmap

**Last reviewed:** November 16, 2026 (C124 private / C122 public)  
**Public site:** https://btl.masynnay.com  
**Public source:** https://github.com/MasynNay/between-the-lines  
**Private app checkpoint:** C124 private complete-source checkpoint with staging-only upgrade preparation. No publicly distributed installer or certified host upgrade.

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
- [x] Public HTTPS homepage, demo, PDF.js module, and PDF.js worker all returned successful HTTPS responses from the GitHub Actions runner on November 16, 2026. Recheck after DNS changes; physical-device review is still pending.
- [ ] Run independent assistive-technology checks on actual devices, then progress to the P1 private Ollama factual-accuracy benchmark.

## C118 private development checkpoint (November 16, 2026)

- [x] Preserve separately narrated interactions in source-linked family relationship timelines without promoting those interactions to romantic, familial, or motivational claims.
- [x] Add a deterministic four-chapter original-fiction reference suite for character recognition, unsupported names, relationship contradictions, source citations, and chapter spoilers.
- [x] Add an **offline reviewed-action scoring tool** to flag actor/target reversals and fabricated or premature citations in future local-model evaluations.
- [x] Verify **1,055 passing Node tests across 226 test files**, source integrity, and a fresh-extracted complete private installation archive.
- [ ] Independently review real-book annotations and run the genuine Ollama comprehension benchmark. The synthetic reference scores are **not** evidence of real-model or arbitrary-book accuracy.

**Publication boundary:** C118's full private application source and installer remain outside this GitHub Pages repository. The public demo continues to be browser-only and does not use home computing resources.

## C119 private accuracy-safety checkpoint (November 16, 2026)

- [x] Strengthen the private semantic answer pipeline with source-evidence vetoes for **reversed actors**, explicitly negated or imagined actions, unsupported causal links, and reported events with no confirmation. Such claims now return `not-established` rather than proceeding to second-pass model approval.
- [x] Add a **loopback-only, opt-in Ollama benchmark runner** with offline inspection, bounded local requests, error/timeout handling, source-quote checks, category breakdowns, and separate independent-review eligibility.
- [x] Provide a nine-question original-fiction benchmark example covering actors, narrator ambiguity, rumors, dreams, negation, chronology, and spoiler cutoffs. **Not an independently reviewed real-book benchmark.**
- [x] Verify the complete C119 private installation ZIP after fresh extraction, including 847 protected host source files and Docker-target source checks. No Aang containers or public backend were used.
- [ ] **Full regression pending:** 1,047 of 1,067 offline checks passed; 20 legacy HTML/Wikipedia parsing checks require the real `parse5` dependency, which could not be downloaded in the isolated development environment. These are not marked passed.
- [ ] Run actual local Ollama inference on independently reviewed book chapters and complete the 32-question, two-work human-evaluated accuracy assessment.

**Boundary:** The public GitHub repository remains static GitHub Pages only. No private source, uploaded novel, credentials, Ollama models, or Docker state are published.

## C120 private review-integrity checkpoint (November 16, 2026)

- [x] Reject malformed model abstentions that carry asserted answer text, citations, or a missing/nonboolean support flag. Those must never score as correct unknown answers.
- [x] Separate automated exact-quote and keyword matching from human factual adjudication. **No automated result can authorize a public accuracy claim**, even with an editable reviewer signature.
- [x] Add a local-only, **blind review worksheet** bound to exact source and model-response SHA-256 hashes. It hides expected labels and proxy scores, requires explicit verdicts and written reasoning, and invalidates edited source/answer pairs.
- [x] Add a write-once offline review CLI; no user books, reviewer data, or Ollama requests are shared with the public website.
- [x] Verify a complete C120 private installation ZIP from a clean extraction: 854 protected source files, 425 installed Docker-context files, 32 focused tests passing.
- [ ] The offline 228-file regression sweep has **1,052 passing tests and 20 unverified HTML/Wikipedia parsing cases** because the real `parse5` dependency cannot be downloaded here. This is not full-suite certification.
- [ ] Run a real locally hosted Ollama evaluation against two independently annotated books (32+ reviewed questions), including genuine human review and category-by-category errors. No model accuracy claims are justified yet.

**Publication boundary:** The C120 application ZIP remains private. This public repository only records the milestone and continues to serve the static GitHub Pages demo without contacting Aang or Korra.

## C121 private model-output safety checkpoint (November 16, 2026)

- [x] Fix a genuine bug in the private Ollama evaluation runner: nonboolean or missing `supported` fields must **never** be coerced to `false` and credited as correct abstentions.
- [x] Add strict candidate-response validation for exactly typed JSON fields, empty abstentions, bounded answers, source quotes, chapter integers, and oversized outputs; record malformed responses as **invalid**, not unknown.
- [x] Guard the evaluation against silently oversized prompts. Keep failed transport/context requests unscored; allow a bounded evaluation to continue after an invalid model response.
- [x] Strengthen C120 human-review scoring: a missing or malformed response, a citation beyond the reader's stopping point, or a quote absent from the cited source cannot be marked `correct` merely by editing a worksheet.
- [x] Add a mock-only Ollama CLI integration test in a disposable private report folder; no network requests, account data, home servers, or public backend are involved.
- [x] Verify one complete C121 clean-install ZIP from fresh extraction: **861 protected source files, 427 Docker-target files, 38 focused tests passing**.
- [ ] The broader offline regression result is **1,058 passing checks across 229 test files, with 20 HTML/Wikipedia parsing cases blocked** because `npm ci` could not download real `parse5` (`EAI_AGAIN`). The full suite is **not** certified green.
- [ ] Run genuine local Ollama inference on two independently reviewed works, score 32+ source-grounded questions by human reviewers, and validate privacy/security and installation on an actual supported host.

**Publication boundary:** This public repository continues to contain only GitHub Pages site materials and milestone documentation. No private C121 source, private book PDF, model output, credentials or Docker containers have been published.

## C122 public reading room (November 16, 2026)

- [x] Require full-word literal PDF/TXT search matches, ranked by complete and exact-phrase matches before partial matches.
- [x] Show matched-term counts and explicitly label partial passage results; matching text is **not** an AI answer.
- [x] Move keyboard focus to search results and cited PDF pages. The real Chromium + PDF.js desktop/mobile regression and Pages deployment passed.
- [x] Add PR validation checks before merging public demo changes.
- [ ] Human accessibility review using actual mobile devices and assistive technology remains pending.

## C123 private evaluation checkpoint (November 16, 2026)

- [x] Enable an **explicit, local-only** Ollama benchmark to run a prepared 32-question suite across several bounded batches. No model inference was invoked in this development environment.
- [x] Reject overlap, source-hash mismatch, model mismatch, and missing or out-of-batch answers in offline aggregation.
- [x] Prepare individual gold-blinded reviewer packets limited to source sections available at each question's stopping point. These contain private model outputs/source excerpts and are **never** published here.
- [x] Verify a fresh-extracted C123 private source archive: 875 protected files; 38 focused checks passing; 1,066 offline non-parser checks passing.
- [ ] **20 real `parse5` HTML/Wikipedia integration checks still unverified.** The dependency could not be fetched from the isolated environment. Excluded is not equivalent to passing.
- [ ] Independently annotate two legally accessible works and obtain 32+ genuine local Ollama outputs, then blind-score all answers, citations, and unsupported claims by a real reviewer.
- [ ] Confirm a safe data-preserving upgrade, live Docker installation, real-browser accessibility, and security testing on an authorized host. Never run a fresh reset against an existing private library.

**Privacy boundary:** Only this high-level milestone report is public. The private C123 archive, source, model responses, book content, credentials, and local Docker services are not connected to or published through GitHub Pages.

## C124 private data-preserving upgrade preparation (November 16, 2026)

- [x] Provide a separate, **inspection-first** staging tool that copies existing `app/data` and optional `.env` into a **new** complete private-source installation, without changing the existing application or contacting Docker.
- [x] Check staged file bytes, secret permissions and protected source manifest. Reject symlinks, hard-linked data, mounted data, nested destination trees and overwrites; a failed stage is discarded.
- [x] Verify from a fresh-extracted private archive: **882 protected source files**, **305 Docker source imports**, and **46/46 focused tests passed** on synthetic existing-library data.
- [ ] Broad C124 offline regression: attempted, but the test process did not produce an authoritative completed summary; **do not call this full-suite green**.
- [ ] Real `parse5` 7.3.0 is unavailable in this environment. The explicit real-parser preflight reports **unverified**, and the 20 HTML/Wikipedia integration checks remain open.
- [ ] The staged copy is **not** an activated Docker upgrade. A real backed-up host upgrade and post-write rollback must be tested before installation guidance can be called safe for live libraries.
- [ ] Complete a separately annotated 32+ question **real** Ollama evaluation across two works, with independent human source review; synthetic model calls do not establish literary accuracy.

**Privacy boundary:** The C124 private package, settings, model output, and user books remain separate from this public GitHub Pages repository. No home servers or containers were touched.

## Current stopping point

- The public portfolio site and browser demo are deployed using GitHub Pages and the custom domain.
- The homepage has a **dark-first theme** and a story-evidence illustration in its opening, instead of a large rectangular product screenshot; genuine private-app screenshots remain in the feature tour.
- The local application is **not publicly deployed or connected** to this website. Deep Ollama accuracy is still unverified independently.
- Suggested next task: **P0 — finish real-device/accessibility checks**, then complete **P1 — a genuine 32+ question human-reviewed local Ollama benchmark** and verify the missing real-parser integration. The public demo remains a browser-based preview, not the complete local application.
