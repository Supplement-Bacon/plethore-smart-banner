---
objective: "A zero-dependency embed.js reaches parity with the WordPress banner and ships to smart-banner.pletho.re, with the repo restructured into wordpress/embed/dist and both install paths documented — the WP plugin still working unchanged."
status: in-progress
---

<!-- Fill or omit these sections; never add, rename, or reorder one. -->

# Plan: Universal smart-banner embed.js + repo restructure + CDN deploy

## Overview

| Field      | Value                                                                          |
| ---------- | ------------------------------------------------------------------------------ |
| **Goal**   | Ship a self-contained embed.js at parity with the WP banner, on a monorepo restructure with CDN deploy and docs. |
| **Source** | GitHub issue [#1](https://github.com/Supplement-Bacon/plethore-smart-banner-wordpress/issues/1) — `[EMBED] Universal smart-banner embed.js + repo restructure + CDN deploy` |

## Phases

| #   | Phase                          | File                         |
| --- | ------------------------------ | ---------------------------- |
| 1   | Repo restructure & rename      | [`phase-1.md`](./phase-1.md) |
| 2   | embed.js at banner parity      | [`phase-2.md`](./phase-2.md) |
| 3   | CDN deploy & CORS              | [`phase-3.md`](./phase-3.md) |
| 4   | README — both install paths    | [`phase-4.md`](./phase-4.md) |

## Resources

<!-- External sources only (URLs, docs), not code files. Omit if none consulted. -->

| Source                                                                               | Verified                                                                                                                            |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| [MDN — Document.currentScript](https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript) | Reliable only during synchronous top-level execution; `null` in async callbacks and modules → must read+cache it at load, fall back to `querySelector('script[data-account]')`. Confirms the issue's approach. |
| Existing `assets/banner.js` (in-repo)                                                | The WP banner already fetches `{account}.json` cross-origin from third-party sites' browsers today, so the S3/CloudFront CORS is very likely already permissive — Phase 3 verifies rather than builds it.        |

## Decisions

<!-- Architecture-magnitude only, one you'd regret reversing. Omit if none qualify. -->

| Decision                                                                              | Why                                                                                                                        |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Monorepo layout `wordpress/` (plugin) · `embed/` (source) · `dist/` (built embed.js)  | One repo serves both delivery channels; keeps the WP plugin and the universal script versioned together.                   |
| Move the WP plugin as a whole unit into `wordpress/`, no path edits                   | The plugin uses relative `require` and `plugin_dir_url(__FILE__)`; moving the folder intact preserves every internal path. |
| embed.js is a single self-contained file — markup + CSS injected by JS, zero runtime deps | It runs on arbitrary third-party sites; it cannot assume a template fetch, jQuery, or a stylesheet like the WP plugin can.  |
| GitHub repo rename `…-wordpress` → `plethore-smart-banner` is an ops step, done last  | Downstream repos clone by URL; renaming before their snippets are ready would break them. Tracked as a Phase 1 risk, executed outside git. |
