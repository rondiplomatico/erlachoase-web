# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing website for **Erlachoase**, a vacation apartment in Leinfelden-Echterdingen (near Stuttgart). Three-file site (`index.html`, `style.css`, `script.js`) plus `images/` and `logo.png`. No build step, no dependencies, no package manager — it's plain HTML/CSS/vanilla JS hosted at `www.erlachoase.de`.

## Running locally

Open `index.html` directly in a browser, or serve the directory with any static server, e.g.:

```powershell
python -m http.server 8000
```

There is no test suite, linter, or build pipeline.

## Architecture

### Bilingual content via `data-de` / `data-en` attributes

All translatable text lives twice in the HTML — once as `data-de="..."` and once as `data-en="..."` on the same element. The visible text is whichever language was last selected. `setLanguage(lang)` in `script.js` walks every `[data-de]` element and writes `getAttribute('data-' + lang)` into the element. The chosen language persists in `localStorage` under the key `erlachoase-lang` and is applied on load (default `de`).

Three special cases the writer must handle:
- `<meta>` tags get `setAttribute('content', ...)` — used for the description meta.
- `<title>` gets `textContent`.
- Elements that contain HTML (e.g. `<strong>`, `&amp;`) need a `data-html` attribute on them; otherwise the translation is set via `textContent` and tags will render as literal text. When you see `&lt;strong&gt;` inside a `data-de`/`data-en` value, the element MUST also carry `data-html`.

When adding new copy: always add both `data-de` and `data-en`, and add `data-html` if either translation contains markup or HTML entities.

### Gallery + lightbox: index-coupled arrays

The lightbox (`openLightbox(i)`) reads from `allGalleryImages` in [script.js:2-67](script.js#L2-L67). Every `onclick="openLightbox(N)"` in `index.html` is a hard-coded numeric index into that array. Sections are split into ranges:

- `0–5`: main gallery grid
- `6–39`: apartment slider (#gallerySlider) — bedrooms, living, kitchen, bath, hallway, terrace, exterior, wellness
- `40–52`: nature/surroundings slider (#natureSlider)

When adding, removing, or reordering a gallery image you must update **both** the `allGalleryImages` array AND every `onclick="openLightbox(N)"` index after the change, or the lightbox will open the wrong photo. The slider arrows (`slideGallery` / `slideNature`) just scroll the container — they don't depend on the indices, but the lightbox does.

### Sliders

`slideContainer(id, dir)` in [script.js:150-157](script.js#L150-L157) computes a step from one item's width and scrolls by `(visibleItems - 1)` items in that direction. Two thin wrappers — `slideGallery` and `slideNature` — bind it to the two `.gallery-slider` containers. Adding a third slider means adding a wrapper and a matching pair of prev/next buttons.

### Booking widget (third-party)

The "Buchen" section embeds a **Smoobu** single-apartment calendar via the script `https://login.smoobu.com/js/Apartment/CalendarWidget.js`, configured by `data-load-calendar-url`, `data-verification`, and `data-baseUrl` attributes on `#smoobuApartment2917276de`. Apartment ID `2917276` and the verification hash are tied to the Smoobu account — don't change them when editing markup. If the calendar must be replaced or removed, the whole `.booking-embed` block is the unit to swap.

### Styling

All styling lives in `style.css`. The palette is defined as CSS custom properties on `:root` ([style.css:1-19](style.css#L1-L19)) — `--cream`, `--gold`, `--green`, `--text`, etc. Reuse these variables rather than hard-coding hex values. Headings use Cormorant Garamond, body uses Nunito Sans (loaded from Google Fonts in `<head>`).

Scroll-triggered fade-ins use the `.reveal` class plus the `IntersectionObserver` at the bottom of `script.js`; new sections that should animate in need that class on the element.

### Modals

Two overlay UIs share the same pattern: `.lightbox` (image viewer) and `.impressum-modal` (legal notice). Open functions add `.active` and set `body.style.overflow = 'hidden'`; close functions remove both. Click-on-backdrop and `Escape` close them — the keydown handler in [script.js:137-147](script.js#L137-L147) checks lightbox first, then impressum.

## Content notes

- Address and Impressum (`Daniel Wirtz`, `Erlachstraße 21`, `stay@erlachoase.de`) appear in the footer and the `#impressumModal`. Update both if details change.
- The site addresses guests informally ("ihr/euch") in German — keep that tone in new copy.
