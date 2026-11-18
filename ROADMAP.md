# Between the Lines — Product Roadmap

**Last reviewed:** November 17, 2026 (C133 private / C122 public)  
**Public site:** https://btl.masynnay.com  
**Public source:** https://github.com/MasynNay/between-the-lines  
**Private app checkpoint:** C133 private complete-source checkpoint with gold-blinded, two-reader source annotation preparation and conflict detection. No public installer, actual human evaluation, certified model accuracy or live-host upgrade.

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

## C125 private staged-copy verification (November 16, 2026)

- [x] Extend the C124 inspection-only staging flow with a read-only `--verify-staged --confirm-stopped` mode that compares old and staged book/account bytes, directory layout, private settings and source integrity.
- [x] Preserve empty library directories and verify restrictive permissions; use Linux atomic no-replace publication to prevent an empty destination being overwritten during a race.
- [x] Fresh-extract and verify the complete private C125 package: **889 protected source files**, **439 protected Docker-target files**, **305 resolved relative imports**, and **58/58 focused tests passing**.
- [ ] Full C125 offline regression **not certified**: first completed run had 1,071 passes and 2 documentation-version failures; the affected tests were corrected and passed, but the final entire-suite retry stalled without a complete result.
- [ ] **20 genuine `parse5` integration checks are unverified** because the real dependency is absent; offline parser fixtures do not establish live HTML/Wikipedia correctness.
- [ ] Real Ollama answers with 32+ independently human-reviewed questions, actual Docker installation, real-host upgrade, and rollback after new-version writes remain unverified.

**Boundary:** This public repository contains only milestone notes. Neither private C125 source nor any books, accounts, credentials, Docker state or model output have been published. No home server was accessed.

## C126 private offline verification checkpoint (November 16, 2026)

- [x] Replace inconclusive monolithic offline regression reporting with 12 independently timed batches. All **1,077/1,077 executed offline tests passed**, with 0 failures, including a second run from the freshly extracted private C126 archive.
- [x] Reject unsafe staging attestations (malformed JSON, overbroad permissions, oversized payloads), and re-inventory the original private data at the end of read-only staged verification.
- [x] Verify the fresh C126 package: **899 protected source files**, **444 protected Docker-target files**, **8/8 staged-copy tests**, and **10/10 selected source/portfolio/runner tests** passed.
- [ ] The **20 real `parse5@7.3.0` HTML/Wikipedia integration cases remain unverified**: npm access failed in the isolated environment, and the offline fixture is deliberately not treated as a real parser. The full unfiltered suite has **not** passed.
- [ ] Complete independent human review of real local Ollama inference on 32+ questions from two works. Synthetic exercises are **not** accuracy evidence.
- [ ] Verify an actual Docker-host installation, safe migration/rollback after writes, and accessible mobile use before calling any private release production-ready.

**Boundary:** Public GitHub contains only this milestone documentation and the static, client-only browser demo. C126 private source, installation archive, credentials, personal books, and model outputs remain unpublished. No home server was accessed.

## C127 private disposable restore rehearsal (November 16, 2026)

- [x] Add an explicit **disposable restore rehearsal** to the existing inspect-first, stopped-app staging workflow. It first validates the already-prepared stage, copies staged `app/data` and optional `.env` into owner-only temporary storage, simulates changes **only inside scratch space**, restores that scratch copy and verifies bytes, directories, and private permissions.
- [x] Reverify the original and staged installations after the rehearsal, and clean up the disposable backup. Refuse missing stopped-app confirmation, corrupt stages, and datasets above a **128 MiB rehearsal cap**.
- [x] From a freshly extracted C127 private ZIP, verify **910 protected source files**, **450 protected Docker-target source files**, **309 relative Docker imports with none missing**, **15/15 focused tests** and **1,080/1,080 offline regression tests in 12 batches**.
- [ ] **20 genuine `parse5` HTML/Wikipedia integration checks remain unverified.** npm registry DNS was unavailable; the offline parser fixture is not a substitute for real dependency integration.
- [ ] **Real Ollama comprehension evaluation** on 32+ independently reviewed questions, plus a real Docker-host cutover and post-write rollback, remain unverified. A scratch recovery rehearsal is not proof of a live-volume or database migration.

**Publication boundary:** C127's private source and installation ZIP, personal books, account data, model outputs and credentials remain outside this public GitHub repository. Only these public-safe milestone notes are published, and no home server was touched.

## C128 private source-drift and staging integrity (November 16, 2026)

- [x] Rehash original private data and optional `.env` at the **start and end** of stopped-app staging and read-only validation, preventing identical-size, restored-timestamp writes from passing metadata-only checks.
- [x] Use no-follow, single-link file checksum reads that check the opened regular-file identity and reject switched inodes or unsafe links.
- [x] Preserve C127's independently verified staged copy, owner-only disposable recovery rehearsal, and Linux atomic no-overwrite publication.
- [x] Verify a freshly extracted private C128 complete-source ZIP: **922 protected source files**, **457 Docker-target source files**, **311 resolved relative imports**, and **1,084 offline regression checks passed across 12 bounded batches**.
- [ ] **20 genuine `parse5@7.3.0` HTML/Wikipedia integrations remain unverified.** Registry DNS failed in the isolated development environment; an inert offline parser fixture cannot certify real parsing.
- [ ] **Actual local Ollama inference** on 32+ human-reviewed questions across two works, live Docker build/install, and post-write host/volume rollback remain unverified.

**Boundary:** These are public-safe engineering milestone notes only. No C128 private application source, complete installer, user books, account records, settings, model output, or Docker state is published on GitHub Pages. No home host was accessed.

## C129 private staging and recovery disk-space preflight (November 16, 2026)

- [x] Estimate disk-space requirements before preparing a separate staged installation, including package source, stopped-app library data, optional private settings, and a reserve.
- [x] Require additional free space of the greater of **64 MiB or 10% of estimated copy bytes**. This is an estimate, **not a space reservation** or guarantee against other disk writers.
- [x] Preflight temporary restore-rehearsal storage, accounting for both backup and mutation workspace before copying data. Fail closed if space is insufficient.
- [x] Reject unsafe symlinked, hard-linked or mounted package files encountered during estimation and preserve earlier source-byte drift and staged-copy integrity protections.
- [x] The private C129 source passed **1,088/1,088 offline fixture tests in 12 bounded batches** after correcting an older roadmap assertion; focused storage, staging and source checks also passed.
- [ ] **20 real `parse5` HTML/Wikipedia integration cases remain unverified** because the dependency was unavailable here. The offline fixture is not real parser certification.
- [ ] Run genuine Ollama literary comprehension with independently reviewed 32+ answers and test live Docker-host cutover/rollback using disposable persistent volumes before a production upgrade.

**Privacy boundary:** Only the public-safe milestone notes are published here. Private C129 source, installer ZIP, user books, accounts, settings, model output and Docker state remain separate. No home host has been touched.

## C130 private real-parser integration gate (November 17, 2026)

- [x] Add a **fail-closed, private-source integration runner** that selects all **20 known HTML/Wikipedia `parse5` cases** from six test files. It validates the pinned `parse5@7.3.0` lock, refuses injected test-only fixture loaders and version mismatches, sanity-checks DOM parsing, then requires 20 genuine selected tests to pass before reporting success.
- [x] Provide a read-only `--plan` mode for inspecting exact case names and their owning files without installing dependencies, using Docker, or reading an existing personal library.
- [x] Verify the fresh-extracted private C130 archive: **940 protected source files**, **466 Docker-target source files**, **315 resolved imports**, **11 focused tests passing**, and **1,092 offline fixture tests passing across 12 bounded batches**.
- [ ] **The 20 real `parse5` tests have NOT passed or even run with the genuine package.** Locked dependency installation remains blocked by unavailable npm registry access here. The gate correctly returns a nonzero `REAL_PARSE5_NOT_VERIFIED` result. Offline fixtures do not establish genuine parsing correctness.
- [ ] Run 32+ actual local Ollama comprehension answers across two independently annotated works with blind human grading; verify real Docker image build, secure host installation, persistent-volume upgrades and recovery on an authorized disposable host.

**Privacy boundary:** The public repository receives only these notes. C130 private app code, installation ZIP, imported books, accounts, credentials, model outputs and home-host data are not published or accessed.

## C131 private disposable Docker recovery rehearsal (November 17, 2026)

- [x] Add an **opt-in, isolated Docker-volume rehearsal** for a new app image and newly created synthetic volumes. Its `--plan` mode performs no Docker calls and `--run --confirm-disposable` requires explicit consent and a working local daemon.
- [x] Include a synthetic-only recovery fixture with byte/permission/ownership inventory, no-follow regular-file checks, 128 MiB limit, tampered-backup refusal, empty-directory preservation and restoration verification. No host bind mounts, published ports, existing containers or existing volume names are used by the intended workflow.
- [x] Verify a fresh-extracted C131 private source ZIP: **1,100/1,100 offline fixture tests across 12/12 batches**, **24/24 focused tests**, **947 protected host source files**, **469 protected Docker-target files**, **315 resolved relative imports**, and zero missing imports.
- [ ] **The C131 Docker rehearsal itself is NOT verified.** This development environment lacks Docker. The unit tests only use disposable local directories and mocked daemon failure. A same-image synthetic restore, when eventually run, will not prove old-to-new database migrations or post-write host rollback.
- [ ] **20 genuine `parse5@7.3.0` HTML/Wikipedia integration tests remain unverified** because the dependency cannot be fetched here. C130's strict real-parser gate remains part of the private application.
- [ ] Run 32+ real local Ollama source-grounded questions across two independently reviewed works, then test a genuine version-to-version Docker upgrade, data-preserving cutover and rollback on an authorized disposable host.

**Privacy boundary:** Only these public-safe milestone notes appear in this public repository. The private C131 source, ZIP, books, accounts, credentials, Docker state, and model output remain separate. No home server or live library was accessed.

## C132 private two-work comprehension evaluation kit (November 17, 2026)

- [x] Add two **original short synthetic works** with four source sections each and **32 distinct stopping-point-scoped questions** (18 assistant-labeled supported, 14 assistant-labeled unknown). They exercise actors, objects, chronology, uncertainty, narrator identity, negation, rumors, dreams and information withheld until later chapters.
- [x] Add a dependency-free inspection command and four opt-in, bounded local Ollama batch instructions, using the existing loopback-only runner. No source book files, user data, or model answers are uploaded to the public demo.
- [x] Add a private, offline two-work report combiner rejecting swapped fixture hashes, duplicate or out-of-scope IDs, missing responses, report errors, and mixed model names. Owner-only, non-overwritable summaries exclude raw model answers and always mark human review and release approval **false**.
- [x] Verify a fresh-extracted C132 private ZIP: **956 source file hashes**, **474 protected Docker-target files**, **318 relative imports**, and **1,108/1,108 offline fixture tests across 12/12 batches**, plus **15 focused tests**, with zero failures.
- [ ] **This is not genuine AI-accuracy evidence.** No Ollama inference was performed, no independent human verified the gold labels or graded model answers, and short synthetic stories are not full-length works. Run the tests on an authorized local model, independently review every answer, then extend the benchmark to longer legally usable texts.
- [ ] The **20 genuine `parse5@7.3.0` HTML/Wikipedia integration tests remain unverified** (npm registry unavailable here), as does real Docker volume recovery and an actual version-to-version data-preserving upgrade.

**Privacy boundary:** This public repository records only milestone notes. The C132 private source ZIP, original benchmark source passages, model reports, account information, user books, credentials and Docker state remain outside GitHub Pages. No home server was accessed.

## C133 private gold-blind independent-review preparation (November 17, 2026)

- [x] Add an **offline gold-label review workflow** for the previous C132 two-work, 32-question comprehension fixture: create 32 separate source-only packets scoped to each question's completed chapters, plus independent blank reviewer worksheets. The packets expose neither the assistant-authored gold labels nor model answers or later chapters.
- [x] Validate two completed, **self-attested** reader sheets for all 32 bound question IDs, matching fixture hashes, stopping points, explanatory notes and verbatim quotations for supported claims. Flag mismatches between reviewers and provisional gold labels for real adjudication; unknown/unclear answers cannot silently acquire source citations.
- [x] Refuse overwritten or linked review inputs; write new private output with owner-only permissions and require review artifacts to live outside the private application source tree.
- [x] Fresh-extracted private C133 ZIP passed **1,116/1,116 offline fixture tests across 12 bounded batches**, plus **23 focused tests**, and verified **963 protected source files**, **477 Docker-target source files**, and the **197-import server runtime closure**.
- [ ] **No actual independent human review has happened.** Self-reported reviewer aliases and two matching worksheets cannot authenticate reviewers or establish independent verification. This tool always returns `releaseGate:false` and `certifiedGoldAccuracy:null`.
- [ ] **No genuine Ollama inference**, 20-case real `parse5` HTML/Wikipedia integration, or actual Docker-host recovery/upgrade test has been performed. All remain release blockers.

**Publication boundary:** The private C133 source, model reports, original story passages, review packets, books, accounts, credentials, and containers are not part of this public repository. Only public-safe roadmap notes are published.

## Current stopping point

- The public portfolio site and browser demo are deployed using GitHub Pages and the custom domain.
- The homepage has a **dark-first theme** and a story-evidence illustration in its opening, instead of a large rectangular product screenshot; genuine private-app screenshots remain in the feature tour.
- The local application is **not publicly deployed or connected** to this website. Deep Ollama accuracy is still unverified independently.
- Suggested next task: **P0 — finish real-device/accessibility checks**, then complete **P1 — a genuine 32+ question human-reviewed local Ollama benchmark** and verify the missing real-parser integration. The public demo remains a browser-based preview, not the complete local application.
