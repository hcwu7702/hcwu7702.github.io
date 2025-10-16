# hungchieh-website

This repository hosts the personal GitHub Pages site for Hung-Chieh Wu.

## Recent visual updates

I made some styling and layout improvements to make the site cleaner and more modern. Summary:

- Updated `assets/css/style.css` with a new color scheme, responsive container, hero, card and button styles.
- Updated `_layouts/default.html` to use semantic classes (`.site-header`, `.container`, `.site-footer`) and simplified nav links to relative filenames.
- Reworked `index.md` to remove inline styles and use the new CSS classes (`.hero`, `.features`, `.card`, `.btn`).

## How to preview locally

Quick (no Jekyll required):

```bash
python3 -m http.server 4000
# then open http://localhost:4000
```

Full Jekyll render (recommended if you use Jekyll features):

```bash
bundle install
bundle exec jekyll serve
```

## Notes

- `index.md` intentionally uses inline HTML (sections, divs, images) for better layout control. Some markdown linters flag this as MD033 — this is acceptable for this repository. If you prefer strict markdown-only content, I can convert layout parts into includes.
- The stylesheet still uses `{{ '/assets/css/style.css' | relative_url }}` in the layout to ensure the asset resolves correctly on GitHub Pages builds.

If you'd like a different visual direction (minimal/professional, colorful/bright, or academic), tell me which and I will update the CSS accordingly.
