# App Scaffold

The complete project structure for a customer deck. Uses plain Vite + React as a SPA, deployed as static assets to Workers. No TanStack Start, no SSR.

## Why not TanStack Start

TanStack Start (`@tanstack/start`) has a broken dependency chain as of April 2026. The `start-config@1.120.x` package imports `CONSTANTS` from `@tanstack/router-generator`, which only exists in `1.120.x`. But `@tanstack/react-start-plugin` (a transitive dep) resolves to `1.131.x`, which removed that export. npm overrides cannot fix this because the two packages need different versions of the same sub-dependency simultaneously. The plain Vite SPA approach sidesteps all of this and is simpler for a static deck anyway.

## Directory Structure

```
{slug}/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc
└── src/
    ├── main.tsx              # React entry point
    ├── styles.css            # Design tokens + fonts + animations
    ├── data/
    │   ├── types.ts          # From data-model.md
    │   ├── deck-content.ts   # Generated content for this customer
    │   ├── coastlines.ts     # Natural Earth 110m coastline polygons (for Globe3D)
    │   └── pops.ts           # 330+ Cloudflare PoP [lat,lon] coords (for Globe3D)
    └── components/
        ├── Presentation.tsx  # Main presentation shell
        ├── SlideRenderer.tsx # Type -> component mapper
        ├── SlideWrapper.tsx  # Slide layout wrapper
        ├── CloudflareLogo.tsx
        ├── Globe3D.tsx       # Three.js globe (only if deck uses it)
        ├── VisualElements.tsx
        └── slides/
            ├── SlideTitle.tsx
            ├── SlideRecap.tsx
            ├── SlideProducts.tsx
            ├── SlideArchitecture.tsx
            ├── SlideCode.tsx
            ├── SlideResources.tsx
            ├── SlideNextSteps.tsx
            └── SlideContact.tsx
```

Only create slide component files for slides included in this deck.

## Config Files

### package.json

```json
{
  "name": "SLUG",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "optionalDependencies_comment": "Add these only if the deck uses the Globe3D element (visual-elements.md #10):",
  "optionalDependencies_globe": {
    "three": "^0.170.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.170.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0"
  }
}
```

Replace `SLUG` with the actual customer slug (e.g., `acme-corp`).

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  },
  "include": ["src"]
}
```

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
});
```

### wrangler.jsonc

```jsonc
{
  "name": "customer-deck-SLUG",
  "account_id": "1aeca2f2fd756d1dad2398a75a92c880",
  "compatibility_date": "2025-04-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": "./dist"
  }
}
```

Replace `SLUG` with the actual customer slug. Do NOT add a `binding` key inside `assets` -- assets-only Workers reject that.

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CUSTOMER_NAME | Cloudflare</title>
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Replace `CUSTOMER_NAME` with the actual customer name.

### src/styles.css

```css
@import "tailwindcss";

:root {
  /* Primary */
  --cf-orange: #FF4801;
  --cf-orange-hover: #FF7038;
  --cf-orange-light: rgba(255, 72, 1, 0.08);
  --cf-orange-border: rgba(255, 72, 1, 0.2);

  /* Text */
  --cf-text: #521000;
  --cf-text-muted: rgba(82, 16, 0, 0.55);
  --cf-text-faint: rgba(82, 16, 0, 0.38);

  /* Backgrounds */
  --cf-bg-100: #FFFBF5;
  --cf-bg-200: #FFFDFB;
  --cf-bg-300: #FEF7ED;
  --cf-bg-header: rgba(255, 251, 245, 0.92);

  /* Borders */
  --cf-border: #EBD5C1;

  /* Code */
  --cf-code-bg: #0D0D0D;
  --cf-code-text: #E4E4E7;
  --cf-code-comment: #6B7280;
  --cf-code-keyword: #FF4801;
  --cf-code-string: #FAAE40;
  --cf-code-function: #38BDF8;
}

@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  src: url(https://cf-fonts.cloudflareinsights.com/v/inter/5.0.16/latin/wght/normal.woff2);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  font-display: swap;
}

@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  src: url(https://cf-fonts.cloudflareinsights.com/v/inter/5.0.16/latin/wght/normal.woff2);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  font-display: swap;
}

@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  src: url(https://cf-fonts.cloudflareinsights.com/v/inter/5.0.16/latin/wght/normal.woff2);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  font-display: swap;
}

@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  src: url(https://cf-fonts.cloudflareinsights.com/v/inter/5.0.16/latin/wght/normal.woff2);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  font-display: swap;
}

@font-face {
  font-family: "Fira Code";
  font-style: normal;
  font-weight: 400;
  src: url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@6.2/distr/woff2/FiraCode-Regular.woff2) format("woff2");
  font-display: swap;
}

body {
  font-family: "Inter", system-ui, sans-serif;
  background: var(--cf-bg-100);
  color: var(--cf-text);
  overflow: hidden;
  margin: 0;
}

@keyframes hero-shine-in {
  0% {
    opacity: 0;
    filter: blur(12px) brightness(2.4);
  }
  40% {
    opacity: 1;
    filter: blur(4px) brightness(1.6);
  }
  100% {
    opacity: 1;
    filter: blur(0px) brightness(1);
  }
}

.hero-shine {
  animation: hero-shine-in 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

## Entry Point

### src/main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Presentation } from "./components/Presentation";
import { deckContent } from "./data/deck-content";

const root = document.getElementById("root");
if (!root) throw new Error("No root element");

createRoot(root).render(
  <StrictMode>
    <Presentation content={deckContent} />
  </StrictMode>
);
```

## Core Components

### src/components/Presentation.tsx

```tsx
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DeckContent } from "../data/types";
import { SlideRenderer } from "./SlideRenderer";
import { HeaderBar, BottomNav } from "./VisualElements";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction * 56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    x: direction * -56,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Presentation({ content }: { content: DeckContent }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = content.slides.length;

  const navigate = useCallback(
    (dir: 1 | -1) => {
      const next = slideIndex + dir;
      if (next >= 0 && next < totalSlides) {
        setDirection(dir);
        setSlideIndex(next);
      }
    },
    [slideIndex, totalSlides]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        navigate(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const currentSlide = content.slides[slideIndex];

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ fontFamily: '"Inter", system-ui, sans-serif', background: "var(--cf-bg-100)" }}
    >
      <HeaderBar
        title={content.meta.customerName}
        slideIndex={slideIndex}
        totalSlides={totalSlides}
      />

      <div className="absolute left-0 right-0" style={{ top: "44px", bottom: "56px" }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slideIndex}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <SlideRenderer slide={currentSlide} meta={content.meta} />
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav
        slideIndex={slideIndex}
        totalSlides={totalSlides}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        onGoTo={(i) => {
          setDirection(i > slideIndex ? 1 : -1);
          setSlideIndex(i);
        }}
      />
    </div>
  );
}
```

## Important Notes

1. **Build before deploying.** Run `npx vite build` first -- wrangler uploads the `dist/` folder. Running `npx wrangler deploy` without building first will fail.
2. **No `binding` in the assets config.** `wrangler.jsonc` must have `"assets": { "directory": "./dist" }` with no `binding` key. Adding a binding to an assets-only Worker causes a deploy error.
3. **No TanStack Router/Start.** These packages have a broken version resolution as of April 2026 and are not needed for a single-page deck. Do not add them.
4. **No emojis.** Do not use emojis in any slide content, product descriptions, topic labels, resource names, or anywhere else.
5. **Code blocks must have syntax highlighting.** Never render code as plain monochrome text. Use the `HighlightedCode` component from `visual-elements.md` which tokenises keywords, strings, comments, function calls, and numbers using the design system's code color tokens. This is not optional -- unhighlighted code looks flat and defeats the "wow" effect.
