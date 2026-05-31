# Design System

Strict design rules for customer decks. Do NOT deviate from these values. Every deck must look like it was built by the same person using the same system.

This design system is derived from [Leo's slide collection](https://cloudflare.leo.arsen.in) and [workers.cloudflare.com](https://workers.cloudflare.com). Both use the same Cloudflare visual language.

## Color Tokens

Define these as CSS custom properties in `src/styles.css`:

```css
:root {
  /* Primary */
  --cf-orange:       #FF4801;
  --cf-orange-hover:  #FF7038;
  --cf-orange-light: rgba(255, 72, 1, 0.08);
  --cf-orange-border: rgba(255, 72, 1, 0.2);

  /* Text */
  --cf-text:         #521000;
  --cf-text-muted:   rgba(82, 16, 0, 0.55);
  --cf-text-faint:   rgba(82, 16, 0, 0.38);

  /* Backgrounds */
  --cf-bg-100:       #FFFBF5;    /* Page background */
  --cf-bg-200:       #FFFDFB;    /* Card/panel background */
  --cf-bg-300:       #FEF7ED;    /* Hover background */
  --cf-bg-header:    rgba(255, 251, 245, 0.92);  /* Header with backdrop-blur */

  /* Borders */
  --cf-border:       #EBD5C1;

  /* Code */
  --cf-code-bg:      #0D0D0D;
  --cf-code-text:    #E4E4E7;
  --cf-code-comment: #6B7280;
  --cf-code-keyword: #FF4801;
  --cf-code-string:  #FAAE40;
  --cf-code-function: #38BDF8;
}
```

### Rules

- **NEVER** use colors outside this palette. No grays, no blues, no greens unless inside a code block.
- The warm cream background (`--cf-bg-100`) is the foundation. Everything sits on top of it.
- Text is always dark brown (`--cf-text`), never black, never gray.
- Orange is used sparingly for accents, CTAs, and active states. Not for large areas.
- Borders are always the warm tan (`--cf-border`). No gray borders.

## Typography

### Font Stack

```css
/* Body/UI */
font-family: "Inter", system-ui, sans-serif;

/* Display headings (optional, for title slides) */
font-family: "FT Kunst Grotesk", "Inter", system-ui, sans-serif;

/* Code */
font-family: "Fira Code", "Cascadia Code", "JetBrains Mono", monospace;
```

Load Inter from Cloudflare's font CDN:
```html
<link rel="stylesheet" href="https://cf-fonts.cloudflare.com/v/inter/5.0.16/latin/wght/normal.woff2" />
```

Or use the `@font-face` declarations that Leo's app uses (preferred -- no external request):
```css
@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  src: url(/cf-fonts/v/inter/5.0.16/latin/wght/normal.woff2);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  font-display: swap;
}
```

### Scale

| Use | Size | Weight | Letter-spacing | Line-height |
|-----|------|--------|----------------|-------------|
| Hero heading | `clamp(2.8rem, 5.5vw, 4.5rem)` | 500 | `-0.04em` | 1.15 |
| Section heading | `clamp(1.8rem, 3.5vw, 2.8rem)` | 600 | `-0.03em` | 1.2 |
| Card title | `1.1rem` | 500 | `-0.02em` | 1.3 |
| Body text | `0.875rem` to `1rem` | 400 | normal | 1.6 |
| Caption/label | `0.75rem` | 500 | `0.02em` | 1.4 |
| Mono label | `10px` to `11px` | 400 | `0.05em` | 1 |
| Mono counter | `13px` | 400 | `0.05em` | 1 |
| Slide counter | `10px` mono | 400 | `0.05em` | 1 |

### Rules

- **Letter-spacing is negative for headings**, positive for mono/labels. This is not optional.
- Hero headings should feel large and confident. Use `clamp()` for responsive sizing.
- Body text is always `--cf-text`. Muted text uses `--cf-text-muted`.
- Mono text (counters, labels, badges) uses `--cf-text-faint` and uppercase with wide tracking.

## Spacing

Use Tailwind's default spacing scale. Key patterns:

| Context | Value |
|---------|-------|
| Page horizontal padding | `px-10` (40px) |
| Page vertical padding | `py-8` to `py-9` |
| Card internal padding | `p-6 pt-7` |
| Gap between cards in grid | `gap-5` |
| Gap between sections | `gap-8` |
| Header height | `44px` (Leo's app) or `54px` (workers.cf.com) |
| Footer/nav bar height | `56px` |
| Border radius on cards | `rounded-xl` (12px) |
| Border radius on pills/badges | `rounded-full` |
| Border radius on code blocks | `rounded-2xl` (16px) |

## Layout

- Max content width: `1280px`, centered.
- Content uses `padding-left: 2%; padding-right: 2%` inside the max-width container.
- The presentation is fullscreen (`w-screen h-screen overflow-hidden`).
- Slides occupy the space between header (44px) and footer nav (56px).

## Cloudflare Logo SVG

Always use the inline SVG. Never an image file.

```tsx
<svg height="18" viewBox="0 0 66 30" fill="none">
  <path d="M52.688 13.028c-.22 0-.437.008-.654.015a.3.3 0 0 0-.102.024.37.37 0 0 0-.236.255l-.93 3.249c-.401 1.397-.252 2.687.422 3.634.618.876 1.646 1.39 2.894 1.45l5.045.306a.45.45 0 0 1 .435.41.5.5 0 0 1-.025.223.64.64 0 0 1-.547.426l-5.242.306c-2.848.132-5.912 2.456-6.987 5.29l-.378 1a.28.28 0 0 0 .248.382h18.054a.48.48 0 0 0 .464-.35c.32-1.153.482-2.344.48-3.54 0-7.22-5.79-13.072-12.933-13.072" fill="#FAAE40" />
  <path d="M44.807 29.578l.334-1.175c.402-1.397.253-2.687-.42-3.634-.62-.876-1.647-1.39-2.896-1.45l-23.665-.306a.47.47 0 0 1-.374-.199.5.5 0 0 1-.052-.434.64.64 0 0 1 .552-.426l23.886-.306c2.836-.131 5.9-2.456 6.975-5.29l1.362-3.6a.9.9 0 0 0 .04-.477C48.997 5.259 42.789 0 35.367 0c-6.842 0-12.647 4.462-14.73 10.665a6.92 6.92 0 0 0-4.911-1.374c-3.28.33-5.92 3.002-6.246 6.318a7.2 7.2 0 0 0 .18 2.472C4.3 18.241 0 22.679 0 28.133q0 .74.106 1.453a.46.46 0 0 0 .457.402h43.704a.57.57 0 0 0 .54-.418" fill="#F38020" />
</svg>
```

Use `height="18"` in the header bar, `height="28"` on title slides.
