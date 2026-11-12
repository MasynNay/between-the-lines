# Privacy and product boundaries

The public demonstration at `btl.masynnay.com/demo/` has two modes.

**Bring your own document:** Visitors can import a PDF containing selectable text or a plain text file. The parsing library (Mozilla PDF.js 4.10.38) is bundled into the published static site by GitHub Actions; no third-party CDN scripts are used in the visitor's browser. The file and extracted prose are kept in the current tab's memory, **not stored in a database or sent to a server**. Refreshing or closing the tab discards it. Literal source search and approximate reading sections operate on that text. Name suggestions are conservatively labeled as **unverified**. Scanned PDFs requiring OCR are not supported.

**Optional original examples:** Two short original stories demonstrate curated questions, chronological relationship evidence, and spoiler-aware character visibility. Those authored sample explanations are **not** produced by a live AI model.

The public website does not host accounts, private imports, Ollama, the full Between the Lines backend, or AI-generated comprehension. It does not connect to Aang, Korra, or the user's home network. It has a restrictive Content Security Policy that prevents the page from making network API requests. The only runtime assets are static files from the site's own origin.

The theme and progress of the authored sample stories are remembered in browser localStorage; document text and PDF bytes are not persisted. The server hosting the static website may still log ordinary site requests, as with other web hosting. For privacy-sensitive PDFs, visitors should only use devices they trust.

This is a browser-only functional version of selected user interactions, **not the same full backend or an AI-quality benchmark**. Full public AI analysis would require an isolated cloud backend with authentication, strict resource budgets, content controls, and security review. Do not open the home Docker server to public traffic.
