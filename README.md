# AVTR Digital Portal

Public GitHub Pages portal for the AVTR digital platform.

## Current structure
- `index.html` — main public launcher
- `corporate/` — AVTR corporate website
- `config.js` — production URLs for Python applications

## Python application URLs
After deployment, edit `config.js`:

```js
window.AVTR_APPS = {
  corporate: "./corporate/index.html",
  vehicle: "https://vehicles.avtr-digital.com",
  field: "https://field.avtr-digital.com"
};
```

## Custom domain
Target domain: `avtr-digital.com`.
Do not add a `CNAME` file until the domain is purchased/controlled and GitHub Pages DNS is being configured.
