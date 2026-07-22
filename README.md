# Pléthore Smart Banner

A smart banner that promotes your mobile app to visitors on mobile devices.
It ships in two interchangeable ways — a **WordPress plugin** and a
**universal `embed.js` script** — both rendering the same banner from the same
per-account data hosted on `smart-banner.pletho.re`.

## Repository layout

| Path         | What it holds                                                              |
| ------------ | -------------------------------------------------------------------------- |
| `wordpress/` | The WordPress plugin (settings page, banner injector, update checker).     |
| `embed/`     | Source of the universal `embed.js` — self-contained, vanilla, zero-deps.   |
| `dist/`      | The built `embed.js` artifact served by the CDN (`smart-banner.pletho.re`).|

Both channels read the same account data: `https://smart-banner.pletho.re/{account}.json`.

## Behavior (both channels)

- Shows only on mobile viewports (`window.innerWidth <= 768`).
- Once dismissed, stays hidden for **6 months** (`localStorage["plethore-banner-closed-at"]`).
- Localized from the browser: **`fr`** or **`en`**, defaulting to `en`.
- Fails silently — a data or network error never breaks the host page.

---

## Install — WordPress plugin

1. Copy the `wordpress/` directory into `wp-content/plugins/` (e.g. as
   `wp-content/plugins/plethore-smart-banner/`), or install the packaged zip.
2. Activate **Pléthore Smart Banner** in the WordPress admin.
3. Go to **Settings → Plethore Smart Banner** and set your **Account slug**.

Notes:

- On activation the account slug defaults to the build-time placeholder
  `%%DEFAULT_ACCOUNT_SLUG%%`, replaced by the packaging step per client.
- The plugin auto-updates against
  `https://smart-banner.pletho.re/plugin-metadata.json`.

---

## Install — universal `embed.js`

Drop one tag on any site (WordPress or not), with your account slug:

```html
<script
  async
  src="https://smart-banner.pletho.re/embed.js"
  data-account="YOUR_ACCOUNT_SLUG"
></script>
```

The script is self-contained (no jQuery, no framework, no external asset): it
injects its own markup and styles, resolves the account slug from its own
`data-account` attribute, and follows the shared behavior described above.

---

Supplément Bacon — Copyright © 2025
