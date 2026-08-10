---
status: done
---

<!-- Fill or omit these sections; never add, rename, or reorder one. -->

# Instruction: README — both install paths

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
└── README.md                      ✏️ document both delivery channels
```

## Tasks to do

### `1)` Document the repo layout

> Orient a reader on the monorepo.

1. Describe the three top-level dirs: `wordpress/` (the WP plugin), `embed/` (embed.js source), `dist/` (built embed.js served by the CDN).

### `2)` Document the WordPress install path

> The existing channel.

1. How to install/activate the plugin and set the account slug on the settings page.
2. Note the `%%DEFAULT_ACCOUNT_SLUG%%` build-time default and the update-checker URL.

### `3)` Document the embed.js install path

> The new universal channel.

1. Give the copy-paste snippet: `<script async src="https://smart-banner.pletho.re/embed.js" data-account="YOUR_SLUG"></script>`.
2. State the behaviour: mobile-only (≤768px), 6-month dismiss memory, locale from the browser, silent failure.

## Test acceptance criteria

<!-- Each criterion is an observable behavior, not a command. -->

| Task | Acceptance criteria                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------ |
| 1    | The README explains the `wordpress/`, `embed/`, `dist/` layout.                                        |
| 2    | A reader can install the WP plugin and set the account slug from the README alone.                     |
| 3    | The README carries the exact embed.js `<script>` snippet and states its mobile-only, dismiss, and locale behaviour. |
