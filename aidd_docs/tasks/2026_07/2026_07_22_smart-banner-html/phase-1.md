---
status: done
---

<!-- Fill or omit these sections; never add, rename, or reorder one. -->

# Instruction: Repo restructure & rename

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── wordpress/                     ✅ (existing plugin moved here, intact)
│   ├── index.php                  ✏️ moved from ./index.php
│   ├── banner-injector.php        ✏️ moved
│   ├── settings-page.php          ✏️ moved
│   ├── uninstall.php              ✏️ moved
│   ├── plugin-metadata.json       ✏️ moved
│   ├── assets/                    ✏️ moved (banner.js, banner.css)
│   ├── template/                  ✏️ moved (banner.html)
│   └── plugin-update-checker/     ✏️ moved
├── embed/                         ✅ empty source dir (filled in Phase 2)
│   └── .gitkeep                   ✅
├── dist/                          ✅ build-output dir (filled in Phase 2)
│   └── .gitkeep                   ✅
├── README.md                      ✏️ note the new layout (full docs in Phase 4)
├── LICENSE.txt                    (unchanged, root)
└── .gitignore                     (unchanged, root)
```

## Tasks to do

### `1)` Move the plugin into `wordpress/`

> Relocate every plugin file as one unit so no internal path breaks.

1. `git mv` `index.php`, `banner-injector.php`, `settings-page.php`, `uninstall.php`, `plugin-metadata.json`, `assets/`, `template/`, `plugin-update-checker/` into `wordpress/`.
2. Leave `README.md`, `LICENSE.txt`, `.gitignore` at the root.

### `2)` Scaffold `embed/` and `dist/`

> Create the two new channels' directories.

1. Create `embed/` with a `.gitkeep`.
2. Create `dist/` with a `.gitkeep`.

### `3)` Verify the WP plugin still resolves

> The move must be behaviour-neutral for WordPress.

1. Confirm the relative `require` paths in `wordpress/index.php` still resolve (all targets moved alongside it).
2. Confirm the absolute update-checker URL `https://smart-banner.pletho.re/plugin-metadata.json` and the `%%DEFAULT_ACCOUNT_SLUG%%` activation flow are untouched.

### `4)` Flag the GitHub rename as an ops step

> The repo rename is not a git-tracked change; do not perform it here.

1. Record in the phase notes that `…-wordpress` → `plethore-smart-banner` must happen after downstream snippets target embed.js, done via GitHub settings (not this branch).

## Test acceptance criteria

<!-- Each criterion is an observable behavior, not a command. -->

| Task | Acceptance criteria                                                                                              |
| ---- | --------------------------------------------------------------------------------------------------------------- |
| 1    | Every former plugin file now lives under `wordpress/`; the repo root holds only `wordpress/`, `embed/`, `dist/`, `README.md`, `LICENSE.txt`, `.gitignore`. |
| 2    | `embed/` and `dist/` exist and are tracked by git.                                                              |
| 3    | Activating the plugin from `wordpress/` on a test WordPress install registers the settings page and enqueues the banner with no path errors in the log. |
| 4    | The phase notes state the GitHub rename is a later ops step and the update-checker URL is unchanged.            |
