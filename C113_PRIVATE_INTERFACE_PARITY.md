# C113 — Private Reader Parity Pass

This release reworks the **static public browser experience** to match the visual organization of the private C111 application as closely as is safe without an application server.

## Implemented

- Private reader's dark violet and gold appearance is the new default, with 10 selectable curated palettes.
- Real app logo, top product navigation, sidebar title and stopping point controls, and primary/secondary buttons.
- Distinct Overview, Characters, Events, Places, Objects, Relationships, Recap, and Sources tabs.
- Source-linked example story evidence stays gated by chapter progress. Events, places, and objects display **only** statements explicitly represented in the authored sample text.
- The artificial book-card hero was replaced with an authentic private-app screenshot. Two original sample guides remain optional; private PDF/TXT importing is primary.
- Reader text sizing controls and a theme swatch dialog similar to the private product's atmosphere selector.
- A same-origin PDF worker is permitted by Content Security Policy. Off-origin connections remain disallowed.
- Source files, components, and their static assets are hosted on GitHub Pages. Personal documents stay in the browser tab's memory.

## Deliberate differences from the private installation

The full application has a Node.js service, accounts, a persistent library, structured research and model inference, optional TV catalogs, and Ollama. GitHub Pages cannot run those components. Browser-imported PDFs provide original text, page-linked literal search, reading-position boundaries and conservative name suggestions only. There are **no AI character biographies, AI recaps, AI relationship predictions or guaranteed chapter detection**. PDF scans without text require external OCR.

Never place a private app archive, uploaded novel, database, Ollama credentials, or server proxy into this public repository. Public visitors must never reach Aang or Korra.

## Verification

Run `node tests/demo.test.cjs`, `node tests/local-import.test.cjs`, `python3 tests/verify_site.py`, and the GitHub Pages Actions deployment. Browser screenshot checks in the container could not be run because Chromium navigation is blocked by the execution environment; do not claim the live UI is browser visually validated until a manual browser check is completed.
