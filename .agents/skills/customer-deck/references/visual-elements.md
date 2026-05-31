# Visual Elements Catalog

Reusable animated and decorative building blocks for customer decks. Pick from this catalog when composing slides. Do NOT invent new visual patterns.

The dynamic elements section (bottom of this file) is what creates the "wow" effect. Every deck should use at least one dynamic element.

---

## Background Patterns

### Dot Pattern

Used as the main page background on title slides and the home screen. Subtle, warm.

```tsx
function DotPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.5 }}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.75" fill="var(--cf-border)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}
```

**When to use:** Title slides, contact/CTA slides.

### Grid Overlay

Used as the background on content slides. Structured, technical feel.

```tsx
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        opacity: 0.06,
        backgroundImage:
          "linear-gradient(var(--cf-border) 1px, transparent 1px), linear-gradient(90deg, var(--cf-border) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}
```

**When to use:** Product recommendation slides, architecture slides, code slides.

### Dashed Vertical Lines

Page-width gutter lines from workers.cloudflare.com. Adds structure to wide layouts.

```tsx
function DashedLine({ position }: { position: "left" | "right" }) {
  return (
    <div
      className={`absolute top-0 h-full w-px ${position === "left" ? "left-0" : "right-0"}`}
      style={{
        backgroundImage: "linear-gradient(to bottom, var(--cf-border) 50%, transparent 50%)",
        backgroundSize: "1px 32px",
        backgroundRepeat: "repeat-y",
      }}
    />
  );
}
```

---

## Card Elements

### Corner Brackets

The signature Cloudflare card detail -- small squares at each corner.

```tsx
function CornerBrackets() {
  return (
    <>
      <div className="absolute -top-1 -left-1 w-2 h-2 border border-[#EBD5C1] rounded-[1.5px] bg-[#FFFBF5]" />
      <div className="absolute -top-1 -right-1 w-2 h-2 border border-[#EBD5C1] rounded-[1.5px] bg-[#FFFBF5]" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-[#EBD5C1] rounded-[1.5px] bg-[#FFFBF5]" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-[#EBD5C1] rounded-[1.5px] bg-[#FFFBF5]" />
    </>
  );
}
```

**When to use:** Every card that has a border.

### Orange Top Stripe

A 2px accent bar at the top of cards.

```tsx
function OrangeStripe() {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
      style={{ background: "var(--cf-orange)" }}
    />
  );
}
```

**When to use:** Primary cards (product recommendations). NOT on secondary/supporting cards.

---

## Badges & Pills

### Product Badge

```tsx
function ProductBadge({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded-full flex-shrink-0"
      style={{
        background: "var(--cf-orange-light)",
        color: "var(--cf-orange)",
        border: "1px solid var(--cf-orange-border)",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}
```

---

## Standard Animations

All standard animations use Framer Motion. Import from `framer-motion`.

### Staggered Reveal

For lists of items, card grids, bullet points.

```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.div key={i.id} variants={item}>{/* content */}</motion.div>
  ))}
</motion.div>
```

**Exact values -- do not change:** stagger `0.08s`, duration `0.5s`, easing `[0.22, 1, 0.36, 1]`, y `16px`.

### Slide Transition

For transitioning between slides.

```tsx
const slideVariants = {
  enter: (direction: number) => ({ x: direction * 56, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction: number) => ({ x: direction * -56, opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
};
```

### Hero Shine-In

For title slide headings only. Defined in `src/styles.css`.

```css
@keyframes hero-shine-in {
  0%   { opacity: 0; filter: blur(12px) brightness(2.4); }
  40%  { opacity: 1; filter: blur(4px)  brightness(1.6); }
  100% { opacity: 1; filter: blur(0px)  brightness(1);   }
}
.hero-shine {
  animation: hero-shine-in 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

### Fade In Up

Simple single-element entrance.

```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
<motion.div {...fadeInUp}>Content</motion.div>
```

---

## Code Blocks

Dark-themed code display for code example slides. **Must include syntax highlighting** using the code color tokens from the design system (`--cf-code-keyword`, `--cf-code-string`, `--cf-code-function`, `--cf-code-comment`). Do NOT render code as plain monochrome text -- it looks flat and unfinished.

The `CodeBlock` component includes a built-in `highlightCode` tokenizer that covers TypeScript, JavaScript, Python, and similar languages. It uses regex-based tokenisation (no external dependency needed). The token order matters -- comments and strings must be matched first to prevent keywords inside them from being highlighted.

```tsx
import type React from "react";

// Lightweight syntax tokeniser -- no external deps needed.
// Token order matters: comments & strings first so keywords inside them are not coloured.
type Token = { type: "keyword" | "string" | "comment" | "function" | "number" | "plain"; value: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  // Regex captures in priority order
  const regex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(["'`](?:[^"'`\\]|\\.)*?["'`])|(\b(?:import|export|from|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|throw|try|catch|finally|class|extends|implements|interface|type|enum|async|await|yield|of|in|typeof|instanceof|void|null|undefined|true|false|as|readonly|declare|namespace|module|abstract|static|public|private|protected|super|this|def|self|print|with|elif|except|raise|pass|lambda|nonlocal|global|assert|del|None|True|False)\b)|(\b[a-zA-Z_]\w*(?=\s*\())|(\b\d+(?:\.\d+)?\b)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    // Push any plain text before this match
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", value: code.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "comment", value: match[1] });
    else if (match[2]) tokens.push({ type: "string", value: match[2] });
    else if (match[3]) tokens.push({ type: "keyword", value: match[3] });
    else if (match[4]) tokens.push({ type: "function", value: match[4] });
    else if (match[5]) tokens.push({ type: "number", value: match[5] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < code.length) {
    tokens.push({ type: "plain", value: code.slice(lastIndex) });
  }
  return tokens;
}

const tokenColors: Record<Token["type"], string> = {
  keyword:  "var(--cf-code-keyword)",   // #FF4801 orange
  string:   "var(--cf-code-string)",    // #FAAE40 amber
  comment:  "var(--cf-code-comment)",   // #6B7280 gray
  function: "var(--cf-code-function)",  // #38BDF8 blue
  number:   "var(--cf-code-string)",    // reuse amber for numeric literals
  plain:    "var(--cf-code-text)",      // #E4E4E7 light gray
};

function HighlightedCode({ code }: { code: string }) {
  const tokens = tokenize(code);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: tokenColors[tok.type] }}>
          {tok.value}
        </span>
      ))}
    </>
  );
}

function CodeBlock({ language, filename, code }: {
  language: string;
  filename?: string;
  code: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--cf-code-bg)" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        </div>
        {filename && (
          <span className="ml-2 font-mono text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{filename}</span>
        )}
        <span className="ml-auto font-mono text-[10px] uppercase" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
          {language}
        </span>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed" style={{ color: "var(--cf-code-text)", fontFamily: '"Fira Code", monospace' }}>
          <HighlightedCode code={code} />
        </code>
      </pre>
    </div>
  );
}
```

**Rules:**
- Every `CodeBlock` MUST use the `HighlightedCode` component. Never render `{code}` as a raw string.
- The tokeniser handles TS, JS, and Python out of the box. For other languages, extend the keyword list inside the regex or add language-specific patterns.
- Token match order is: comments -> strings -> keywords -> function calls -> numbers -> plain text. Do not rearrange.
- Colors map to the design system's code tokens. Do not invent new code colors.

---

## Navigation Elements

### Header Bar

```tsx
function HeaderBar({ title, slideIndex, totalSlides }: {
  title: string;
  slideIndex: number;
  totalSlides: number;
}) {
  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center px-5 gap-3 border-b z-30"
      style={{ height: "44px", background: "var(--cf-bg-header)", borderColor: "var(--cf-border)", backdropFilter: "blur(8px)" }}
    >
      <CloudflareLogo height={18} />
      <div className="w-px self-stretch py-2.5" style={{ background: "var(--cf-border)" }} />
      <span className="font-medium" style={{ fontSize: "13px", color: "var(--cf-text)", letterSpacing: "-0.01em" }}>
        {title}
      </span>
      <span className="ml-auto font-mono text-[10px] tabular-nums" style={{ color: "var(--cf-text-muted)", letterSpacing: "0.05em" }}>
        {slideIndex + 1} / {totalSlides}
      </span>
    </div>
  );
}
```

### Bottom Nav

```tsx
function BottomNav({ slideIndex, totalSlides, onPrev, onNext, onGoTo }: {
  slideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 border-t z-30"
      style={{ height: "56px", background: "var(--cf-bg-header)", borderColor: "var(--cf-border)", backdropFilter: "blur(8px)" }}
    >
      <button onClick={onPrev} disabled={slideIndex === 0}
        className="flex items-center gap-1.5 text-xs font-medium transition-opacity disabled:opacity-30"
        style={{ color: "var(--cf-text-muted)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button key={i} onClick={() => onGoTo(i)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{ width: i === slideIndex ? "18px" : "6px", height: "6px", background: i === slideIndex ? "var(--cf-orange)" : "var(--cf-border)" }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
      <button onClick={onNext} disabled={slideIndex === totalSlides - 1}
        className="flex items-center gap-1.5 text-xs font-medium transition-opacity disabled:opacity-30"
        style={{ color: "var(--cf-text-muted)" }}>
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
```

---

## Architecture Diagrams

### Node Box

```tsx
function DiagramNode({ label, sublabel, isCloudflare }: {
  label: string;
  sublabel?: string;
  isCloudflare?: boolean;
}) {
  return (
    <div
      className="relative px-4 py-3 rounded-lg text-center"
      style={{
        background: isCloudflare ? "var(--cf-orange-light)" : "var(--cf-bg-200)",
        border: `1px solid ${isCloudflare ? "var(--cf-orange-border)" : "var(--cf-border)"}`,
        color: isCloudflare ? "var(--cf-orange)" : "var(--cf-text)",
        minWidth: "140px",
      }}
    >
      <div className="font-medium text-sm" style={{ letterSpacing: "-0.01em" }}>{label}</div>
      {sublabel && (
        <div className="font-mono text-[10px] mt-0.5" style={{ color: isCloudflare ? "var(--cf-orange)" : "var(--cf-text-muted)", letterSpacing: "0.02em", opacity: 0.7 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
```

### Arrow

```tsx
function Arrow({ direction = "down" }: { direction?: "right" | "down" }) {
  if (direction === "right") {
    return (
      <svg width="40" height="20" viewBox="0 0 40 20" className="flex-shrink-0">
        <line x1="0" y1="10" x2="32" y2="10" stroke="var(--cf-border)" strokeWidth="1.5" />
        <polygon points="32,5 40,10 32,15" fill="var(--cf-border)" />
      </svg>
    );
  }
  return (
    <svg width="20" height="40" viewBox="0 0 20 40" className="flex-shrink-0">
      <line x1="10" y1="0" x2="10" y2="32" stroke="var(--cf-border)" strokeWidth="1.5" />
      <polygon points="5,32 10,40 15,32" fill="var(--cf-border)" />
    </svg>
  );
}
```

---

## Stat Display

```tsx
function StatDisplay({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-semibold tabular-nums"
        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--cf-orange)", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase mt-2"
        style={{ color: "var(--cf-text-muted)", letterSpacing: "0.1em" }}>
        {label}
      </div>
    </div>
  );
}
```

---

## Dynamic Elements

These are the "wow" elements. Each one is animated and creates immediate visual interest. Every deck should use at least one. All implementations are pure React + CSS -- no external canvas libraries required.

Source: reverse-engineered from workers.cloudflare.com (Spikes, InfiniteSlider, TerminalText, Waveform, CornerLines components).

---

### 1. Traffic Spike Chart

An animated canvas chart that shows a traffic spike -- a flat baseline that surges upward and then levels off. Directly mirrors the "Spikes" component on workers.cloudflare.com ("Let it spike. We got you.").

**When to use:** Architecture slides, title slides. Excellent visual for any customer dealing with traffic scaling, DDoS, or unpredictable load.

```tsx
import { useEffect, useRef } from "react";

function SpikeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      const progress = Math.min(frame / 120, 1); // 2s at 60fps
      const spikeEase = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const points: [number, number][] = [];
      const segments = 60;

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * W;
        const t = i / segments;

        // Spike shape: flat baseline, sharp rise around t=0.4-0.6, plateau
        let spike = 0;
        if (t > 0.35 && t < 0.65) {
          const bell = Math.sin(((t - 0.35) / 0.3) * Math.PI);
          spike = bell * bell * spikeEase;
        } else if (t >= 0.65) {
          spike = 0.25 * spikeEase;
        }

        // Add subtle noise
        const noise = (Math.sin(t * 47 + frame * 0.05) * 0.012 + Math.sin(t * 23) * 0.008);
        const y = H * 0.78 - spike * H * 0.55 + noise * H;
        points.push([x, y]);
      }

      // Fill area under curve
      ctx!.beginPath();
      ctx!.moveTo(0, H);
      points.forEach(([x, y]) => ctx!.lineTo(x, y));
      ctx!.lineTo(W, H);
      ctx!.closePath();
      const grad = ctx!.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(255, 72, 1, 0.18)");
      grad.addColorStop(1, "rgba(255, 72, 1, 0)");
      ctx!.fillStyle = grad;
      ctx!.fill();

      // Draw line
      ctx!.beginPath();
      points.forEach(([x, y], i) => i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y));
      ctx!.strokeStyle = "rgba(255, 72, 1, 0.7)";
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // RPS label at spike peak
      if (progress > 0.4) {
        const peakX = W * 0.52;
        const peakY = H * 0.78 - spikeEase * H * 0.55 - 12;
        const rps = Math.round(533000 * spikeEase);
        ctx!.font = "11px monospace";
        ctx!.fillStyle = `rgba(255, 72, 1, ${Math.min((progress - 0.4) * 5, 0.6)})`;
        ctx!.textAlign = "right";
        ctx!.fillText(`${(rps / 1000).toFixed(0)}k RPS`, peakX - 6, peakY);
      }

      frame++;
      animId = requestAnimationFrame(draw);
    }

    // Resize canvas to match display size
    const resize = () => {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* SVG dot grid background -- matches workers.cloudflare.com exactly */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern id="spike-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="0.75" fill="var(--cf-border)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#spike-dots)" />
      </svg>
      {/* Canvas on top */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
```

**Usage in a slide:** Place as a full-bleed background element inside `SlideWrapper`:
```tsx
<SlideWrapper background="plain">
  <SpikeChart />
  <div className="relative z-10 w-full px-8">
    {/* slide content on top */}
  </div>
</SlideWrapper>
```

---

### 2. Infinite Ticker

A seamlessly looping horizontal ticker strip. Directly mirrors the `InfiniteSlider` component in the Build section of workers.cloudflare.com.

**When to use:** Title slides (strip at the bottom), contact slides. Great for listing key facts, product names, or Cloudflare stats without taking up much space.

Add to `src/styles.css`:
```css
@keyframes infinite-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-infinite-scroll {
  animation: infinite-scroll 40s linear infinite;
}
```

```tsx
function InfiniteTickerStrip({ items }: { items: string[] }) {
  // Duplicate items so the loop is seamless
  const all = [...items, ...items];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden border-t"
      style={{ height: "40px", borderColor: "var(--cf-border)", background: "var(--cf-bg-100)" }}
      aria-hidden="true"
    >
      <div className="animate-infinite-scroll flex flex-row items-center" style={{ gap: "0" }}>
        {all.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="font-mono text-[11px] whitespace-nowrap px-6"
              style={{ color: "var(--cf-text-muted)", letterSpacing: "0.04em" }}
            >
              {item}
            </span>
            <span
              className="flex-shrink-0 w-px h-3 self-center"
              style={{ background: "var(--cf-border)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
```

**Example usage on a title slide:**
```tsx
<InfiniteTickerStrip items={[
  "330+ cities",
  "No cold starts",
  "Scales to millions of requests",
  "Built-in DDoS protection",
  "Zero Trust ready",
]} />
```

---

### 3. Terminal Text Typewriter

An animated terminal that types out a command line sequence character by character. Directly mirrors the `TerminalText` component on workers.cloudflare.com ("Deploy with one command").

**When to use:** Code slides, architecture slides where a deploy or CLI flow is being shown. Extremely effective for developer-facing customers.

Add to `src/styles.css`:
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.cursor-blink {
  animation: blink 1s step-end infinite;
}
```

```tsx
import { useState, useEffect } from "react";

interface TerminalLine {
  prefix?: string;   // e.g. "$ " or "> "
  text: string;
  delay?: number;    // ms before this line starts typing
  color?: string;    // override text color
}

function TerminalTypewriter({ lines }: { lines: TerminalLine[] }) {
  const [displayed, setDisplayed] = useState<string[]>(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const line = lines[currentLine];
    if (!line) return;

    const startDelay = charIndex === 0 ? (line.delay ?? 0) : 0;

    const timer = setTimeout(() => {
      if (charIndex < line.text.length) {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = line.text.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((c) => c + 1);
      } else if (currentLine < lines.length - 1) {
        setCurrentLine((l) => l + 1);
        setCharIndex(0);
      } else {
        setDone(true);
      }
    }, startDelay + (charIndex === 0 ? 0 : 28 + Math.random() * 20));

    return () => clearTimeout(timer);
  }, [currentLine, charIndex, done, lines]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--cf-code-bg)", fontFamily: '"Fira Code", monospace' }}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        </div>
        <span className="ml-2 font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          terminal
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-1" style={{ minHeight: "160px" }}>
        {lines.map((line, i) => (
          <div key={i} className="flex items-start text-sm leading-relaxed">
            {line.prefix && (
              <span className="mr-2 flex-shrink-0" style={{ color: "var(--cf-orange)", opacity: 0.7 }}>
                {line.prefix}
              </span>
            )}
            <span style={{ color: line.color ?? "var(--cf-code-text)" }}>
              {displayed[i]}
              {/* Blinking cursor on the active line */}
              {i === currentLine && !done && (
                <span className="cursor-blink inline-block w-[7px] h-[14px] ml-0.5 align-text-bottom"
                  style={{ background: "var(--cf-orange)", opacity: 0.8 }} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Example usage:**
```tsx
<TerminalTypewriter lines={[
  { prefix: "$", text: "wrangler deploy", delay: 400 },
  { text: "Uploading worker...", delay: 600, color: "rgba(228,228,231,0.5)" },
  { text: "Deployed to 330 cities in 1.2s", delay: 300, color: "rgba(255, 72, 1, 0.8)" },
]} />
```

---

### 4. Animated Waveform

A horizontally scrolling SVG waveform that loops infinitely. Directly mirrors the `Waveform` component from workers.cloudflare.com. Works well as a decorative background element on slides that need a sense of motion without being distracting.

**When to use:** Title slides (lower portion), contact slides, or as a subtle background layer on recap slides.

Add to `src/styles.css`:
```css
@keyframes waveform-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

```tsx
function AnimatedWaveform() {
  // Generate a waveform path that looks like network traffic
  // Two copies side-by-side for seamless looping
  const width = 1200;
  const height = 80;
  const segments = 120;

  function buildPath(offsetX: number): string {
    const points: string[] = [];
    for (let i = 0; i <= segments; i++) {
      const x = offsetX + (i / segments) * width;
      const t = i / segments;
      // Multi-frequency sine combination for organic waveform look
      const y =
        height / 2 +
        Math.sin(t * Math.PI * 8) * 18 +
        Math.sin(t * Math.PI * 14 + 1.2) * 10 +
        Math.sin(t * Math.PI * 3 + 0.5) * 24 +
        Math.sin(t * Math.PI * 21) * 5;
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }

  const path1 = buildPath(0);
  const path2 = buildPath(width);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
      style={{ height: `${height}px`, opacity: 0.3 }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "flex",
          width: "200%",
          animation: "waveform-scroll 20s linear infinite",
        }}
      >
        <svg
          width={width * 2}
          height={height}
          viewBox={`0 0 ${width * 2} ${height}`}
          style={{ flexShrink: 0 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path1} fill="none" stroke="var(--cf-orange)" strokeWidth="1" />
          <path d={path2} fill="none" stroke="var(--cf-orange)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
```

---

### 5. Section Fade-In (Viewport Reveal)

Sections fade in as they enter the viewport. Directly mirrors the `animate-in fade-in delay-100 duration-2000` pattern used on every section of workers.cloudflare.com. Use this on the `SlideWrapper` container to give each slide a soft entrance independent of the slide transition.

Add to `src/styles.css`:
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.animate-section-in {
  animation: fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

```tsx
import { motion } from "framer-motion";

// Wrap any block of content that should reveal itself on mount
function RevealOnMount({ children, delay = 0 }: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Usage -- stagger multiple blocks on one slide:**
```tsx
<RevealOnMount delay={0}>   <h2>Heading</h2>         </RevealOnMount>
<RevealOnMount delay={0.15}><p>Paragraph text</p>    </RevealOnMount>
<RevealOnMount delay={0.3}> <ProductCardGrid />       </RevealOnMount>
```

---

### 6. Network Graph (Full-Stack Diagram)

An SVG-based architecture diagram with animated dashed borders, connection lines, and subtle scale-breathing on nodes. Reverse-engineered from the "Full Stack" section graphic on workers.cloudflare.com (`name="full-stack"`).

Key animation patterns from the source:
- Nodes have `stroke-dasharray="4 4"` with animated `stroke-dashoffset` (rotating dashes)
- Nodes pulse with `transform: scale(1.02)` breathing
- Connection lines use `pathLength="1"` with `stroke-dasharray="1 1"` for draw-in animation
- Small connector squares sit at attachment points between nodes and lines
- Icons inside nodes use `filter="brightness(1.2)"` and `transform: scale(1.05)` for a glow effect

**When to use:** Architecture slides, product relationship diagrams. Use this instead of the basic CSS-grid `DiagramNode` approach when you need cross-column connections or a more polished look.

Add to `src/styles.css`:
```css
@keyframes dash-rotate {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -16; }
}
@keyframes node-breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.02); }
}
.animate-dash {
  animation: dash-rotate 4s linear infinite;
}
.animate-breathe {
  animation: node-breathe 3s ease-in-out infinite;
  transform-origin: 50% 50%;
  transform-box: fill-box;
}
```

```tsx
import { motion } from "framer-motion";

interface GraphNode {
  id: string;
  x: number;            // Center X in viewBox coordinates
  y: number;            // Center Y in viewBox coordinates
  label: string;
  sublabel?: string;
  isCloudflare: boolean;
  width?: number;       // Default 160
  height?: number;      // Default 58
}

interface GraphConnection {
  from: string;
  to: string;
  label?: string;
  highlighted?: boolean;
}

interface NetworkGraphProps {
  nodes: GraphNode[];
  connections: GraphConnection[];
  viewBox?: string;     // Default "0 0 900 400"
  edgeZone?: {          // Optional highlighted zone for Cloudflare edge
    x: number; y: number; width: number; height: number; label?: string;
  };
}

function NetworkGraph({ nodes, connections, viewBox = "0 0 900 400", edgeZone }: NetworkGraphProps) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  function buildCurve(fromId: string, toId: string): string {
    const f = nodeMap[fromId];
    const t = nodeMap[toId];
    if (!f || !t) return "";
    const fw = (f.width ?? 160) / 2;
    const fh = (f.height ?? 58) / 2;
    const tw = (t.width ?? 160) / 2;
    const th = (t.height ?? 58) / 2;
    const dx = t.x - f.x;
    const dy = t.y - f.y;

    let sx: number, sy: number, ex: number, ey: number;
    if (Math.abs(dx) > Math.abs(dy)) {
      sx = f.x + (dx > 0 ? fw : -fw); sy = f.y;
      ex = t.x + (dx > 0 ? -tw : tw); ey = t.y;
    } else {
      sx = f.x; sy = f.y + (dy > 0 ? fh : -fh);
      ex = t.x; ey = t.y + (dy > 0 ? -th : th);
    }
    const cx1 = sx + (ex - sx) * 0.5;
    const cy1 = sy;
    const cx2 = sx + (ex - sx) * 0.5;
    const cy2 = ey;
    return `M${sx},${sy} C${cx1},${cy1} ${cx2},${cy2} ${ex},${ey}`;
  }

  return (
    <svg viewBox={viewBox} className="w-full" style={{ maxHeight: "380px" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ng-arrow-hl" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0,0 8,3 0,6" fill="var(--cf-orange)" opacity="0.7" />
        </marker>
        <marker id="ng-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0,0 8,3 0,6" fill="var(--cf-border)" opacity="0.5" />
        </marker>
      </defs>

      {/* Optional Cloudflare edge zone */}
      {edgeZone && (
        <>
          {/* Fill */}
          <motion.rect
            x={edgeZone.x} y={edgeZone.y}
            width={edgeZone.width} height={edgeZone.height}
            rx={16} fill="var(--cf-orange)"
            initial={{ opacity: 0 }} animate={{ opacity: 0.06 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          {/* Border */}
          <motion.rect
            x={edgeZone.x} y={edgeZone.y}
            width={edgeZone.width} height={edgeZone.height}
            rx={16} fill="none" stroke="var(--cf-orange)" strokeWidth={1.5}
            initial={{ opacity: 0 }} animate={{ opacity: 0.25 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          {/* Label -- rendered inside the zone at the top, not below it */}
          {edgeZone.label && (
            <motion.text
              x={edgeZone.x + edgeZone.width / 2}
              y={edgeZone.y + 21}
              textAnchor="middle" fontSize="11"
              fontFamily="'Fira Code', monospace" fontWeight="600"
              fill="var(--cf-orange)" letterSpacing="0.12em"
              initial={{ opacity: 0 }} animate={{ opacity: 0.9 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {edgeZone.label}
            </motion.text>
          )}
        </>
      )}

      {/* Connections -- animated draw-in with dashes */}
      {connections.map((conn, i) => {
        const d = buildCurve(conn.from, conn.to);
        const pathId = `ng-path-${i}`;
        return (
          <g key={pathId}>
            <path id={pathId} d={d} fill="none" />
            <motion.path
              d={d} fill="none"
              stroke={conn.highlighted ? "var(--cf-orange)" : "var(--cf-border)"}
              strokeWidth={conn.highlighted ? 1.5 : 1}
              strokeDasharray="4 4"
              className="animate-dash"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: conn.highlighted ? 0.7 : 0.4 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              markerEnd={conn.highlighted ? "url(#ng-arrow-hl)" : "url(#ng-arrow)"}
            />
            {/* Traveling dot */}
            <motion.circle
              r={conn.highlighted ? 3 : 2}
              fill={conn.highlighted ? "var(--cf-orange)" : "var(--cf-border)"}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.8, 0] }}
              transition={{ delay: 1 + i * 0.15, duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <animateMotion dur="2.5s" begin={`${1 + i * 0.15}s`} repeatCount="indefinite">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </motion.circle>
            {/* Connection label */}
            {conn.label && (
              <motion.text
                fontSize="8" fontFamily="'Fira Code', monospace"
                fill="var(--cf-text-faint)" letterSpacing="0.03em" textAnchor="middle"
                initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                <textPath href={`#${pathId}`} startOffset="50%">{conn.label}</textPath>
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Connector squares at node attachment points */}
      {connections.map((conn, i) => {
        const t = nodeMap[conn.to];
        if (!t) return null;
        const f = nodeMap[conn.from];
        if (!f) return null;
        const tw = (t.width ?? 160) / 2;
        const th = (t.height ?? 58) / 2;
        const dx = t.x - f.x;
        const dy = t.y - f.y;
        let cx: number, cy: number;
        if (Math.abs(dx) > Math.abs(dy)) {
          cx = t.x + (dx > 0 ? -tw : tw); cy = t.y;
        } else {
          cx = t.x; cy = t.y + (dy > 0 ? -th : th);
        }
        return (
          <motion.rect
            key={`sq-${i}`}
            x={cx - 4.5} y={cy - 4.5} width={9} height={9} rx={1.5}
            fill="var(--cf-bg-100)" stroke="var(--cf-border)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          />
        );
      })}

      {/* Nodes -- dashed-border boxes with breathing animation */}
      {nodes.map((node, i) => {
        const w = node.width ?? 160;
        const h = node.height ?? 58;
        const isCf = node.isCloudflare;
        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Box with animated dashed border */}
            <rect
              x={node.x - w / 2} y={node.y - h / 2}
              width={w} height={h} rx={8}
              fill={isCf ? "rgba(255, 72, 1, 0.05)" : "var(--cf-bg-200)"}
              stroke={isCf ? "var(--cf-orange-border)" : "var(--cf-border)"}
              strokeDasharray="4 4"
              className="animate-dash animate-breathe"
            />
            {/* Label */}
            <text
              x={node.x} y={node.sublabel ? node.y - 4 : node.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill={isCf ? "var(--cf-orange)" : "var(--cf-text)"}
              fontSize="12" fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="-0.01em"
            >
              {node.label}
            </text>
            {node.sublabel && (
              <text
                x={node.x} y={node.y + 14}
                textAnchor="middle" dominantBaseline="middle"
                fill={isCf ? "var(--cf-orange)" : "var(--cf-text-muted)"}
                fontSize="9" fontFamily="'Fira Code', monospace"
                letterSpacing="0.02em" opacity={0.6}
              >
                {node.sublabel}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
```

**Rules:**
- Nodes always have dashed borders (`strokeDasharray="4 4"`) with the `animate-dash` CSS class for rotating dashes.
- Nodes breathe with `animate-breathe` CSS class. Both classes must be in `src/styles.css`.
- Connections draw themselves in with `pathLength` animation and have a traveling dot looping along the path.
- Small connector squares (9x9, rx 1.5) appear at the attachment point where a connection meets a node.
- **Arrow direction:** arrows point FROM Cloudflare edge nodes TO client/origin nodes -- i.e. traffic flows outward from the edge. For cache miss / origin fetch connections, arrows point toward the origin (left to right). Never point arrows from the client toward Cloudflare; the edge is the active party serving the request.
- **Edge zone label:** always render the label inside the zone rect near the top (`y = edgeZone.y + 21`), not below it. Use `fontSize="11"`, `fontWeight="600"`, `opacity: 0.9`. The zone also gets a visible 1.5px orange border at opacity 0.25 in addition to the fill.
- This replaces the CSS-grid `DiagramNode`/`Arrow` approach for architecture slides. Use `NetworkGraph` for any diagram with cross-column connections or more than 4 nodes.

---

### 7. Edge Network Pattern

A decorative SVG background showing a repeating network of arcs and vertical lines, suggesting Cloudflare's global edge network. Reverse-engineered from the "Edge" section graphic on workers.cloudflare.com (`name="edge"`). Three server-like icons sit at intersection points with the network mesh behind them.

Key animation patterns from the source:
- Background arcs and vertical lines at `opacity="0.3"` with animated `stroke-dashoffset` (flowing dashes)
- Server icon nodes at full opacity with `strokeDasharray` on the boxes
- Connection squares at top and bottom of each node
- Icons inside nodes use `filter="brightness(1.2)"` and `transform: scale(1.05)`

**When to use:** Title slides, architecture slides as a background layer. Conveys the idea of a distributed global network. Works well behind text content at low opacity.

Add to `src/styles.css`:
```css
@keyframes dash-flow {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -32; }
}
.animate-dash-flow {
  animation: dash-flow 6s linear infinite;
}
```

```tsx
function EdgeNetworkPattern({ opacity = 0.4 }: { opacity?: number }) {
  // Three columns of repeating arc-and-line patterns
  // Each column has: vertical lines above/below + arcs connecting to neighbors
  const cols = [65, 162, 259];
  const arcY = 87.5;
  const arcYBottom = 146;

  // Generate arc paths between adjacent columns
  // Arc shape: cubic bezier that peaks above/below the line
  function topArc(x1: number, x2: number): string {
    const midX = (x1 + x2) / 2;
    return `M${x1} ${arcY}C${midX - 15} ${arcY - 27} ${midX + 15} ${arcY - 64.4} ${x2} ${arcY}`;
  }
  function bottomArc(x1: number, x2: number): string {
    const midX = (x1 + x2) / 2;
    return `M${x1} ${arcYBottom}C${midX - 15} ${arcYBottom + 27} ${midX + 15} ${arcYBottom + 64.4} ${x2} ${arcYBottom}`;
  }

  const arcs: string[] = [];
  for (let i = 0; i < cols.length - 1; i++) {
    arcs.push(topArc(cols[i], cols[i + 1]));
    arcs.push(bottomArc(cols[i], cols[i + 1]));
  }
  // Extra arcs extending off-screen for seamless feel
  arcs.push(topArc(-31, cols[0]));
  arcs.push(bottomArc(-30.5, cols[0]));
  arcs.push(topArc(cols[cols.length - 1], 355));
  arcs.push(bottomArc(cols[cols.length - 1], 355.5));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity }} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 324 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#edge-clip)">
          {/* Background mesh -- arcs + vertical lines */}
          <g opacity="0.3">
            {arcs.map((d, i) => (
              <path
                key={`arc-${i}`} d={d}
                stroke="var(--cf-orange)" strokeDasharray="4 4"
                className="animate-dash-flow"
              />
            ))}
            {cols.map((x, i) => (
              <g key={`vlines-${i}`}>
                <line x1={x} y1={arcY - 2} x2={x} y2={-34}
                  stroke="var(--cf-orange)" strokeDasharray="4 4" className="animate-dash-flow" />
                <line x1={x} y1={265} x2={x} y2={arcYBottom + 2}
                  stroke="var(--cf-orange)" strokeDasharray="4 4" className="animate-dash-flow" />
              </g>
            ))}
          </g>

          {/* Server nodes at each column */}
          {cols.map((cx, i) => (
            <g key={`node-${i}`}>
              {/* Node box */}
              <rect
                x={cx - 27.5} y={90.5} width={55} height={55} rx={7.5}
                fill="var(--cf-bg-200)" stroke="var(--cf-border)"
                className="animate-breathe"
              />
              {/* Server icon (simplified dual-rack) */}
              <g style={{ transform: "scale(1.05)", transformOrigin: "50% 50%", transformBox: "fill-box" as any }}>
                <path
                  d={`M${cx - 6} 112H${cx - 5.99}M${cx - 6} 124H${cx - 5.99}M${cx - 6.8} 116H${cx + 6.8}C${cx + 7.92} 116 ${cx + 8.48} 116 ${cx + 8.908} 115.782C${cx + 9.284} 115.59 ${cx + 9.59} 115.284 ${cx + 9.782} 114.908C${cx + 10} 114.48 ${cx + 10} 113.92 ${cx + 10} 112.8V111.2C${cx + 10} 110.08 ${cx + 10} 109.52 ${cx + 9.782} 109.092C${cx + 9.59} 108.716 ${cx + 9.284} 108.41 ${cx + 8.908} 108.218C${cx + 8.48} 108 ${cx + 7.92} 108 ${cx + 6.8} 108H${cx - 6.8}C${cx - 7.92} 108 ${cx - 8.48} 108 ${cx - 8.908} 108.218C${cx - 9.284} 108.41 ${cx - 9.59} 108.716 ${cx - 9.782} 109.092C${cx - 10} 109.52 ${cx - 10} 110.08 ${cx - 10} 111.2V112.8C${cx - 10} 113.92 ${cx - 10} 114.48 ${cx - 9.782} 114.908C${cx - 9.59} 115.284 ${cx - 9.284} 115.59 ${cx - 8.908} 115.782C${cx - 8.48} 116 ${cx - 7.92} 116 ${cx - 6.8} 116Z`}
                  stroke="var(--cf-border)" strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: "brightness(1.2)" }}
                />
              </g>
              {/* Connector squares top + bottom */}
              <rect x={cx - 4.5} y={85.5} width={9} height={9} rx={1.5}
                fill="var(--cf-bg-100)" stroke="var(--cf-border)" />
              <rect x={cx - 4.5} y={141.5} width={9} height={9} rx={1.5}
                fill="var(--cf-bg-100)" stroke="var(--cf-border)" />
            </g>
          ))}
        </g>
        <defs>
          <clipPath id="edge-clip">
            <rect width="324" height="210" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
```

**Simplified usage** -- if you don't need the exact server icons, use this minimal version that just renders the arc mesh:

```tsx
function EdgeMeshBackground({ opacity = 0.15 }: { opacity?: number }) {
  const cols = [65, 162, 259];
  // ... same arc generation as above, but omit the server node groups
  // Useful as a pure background on title or contact slides
}
```

**Rules:**
- Background arcs are always at reduced opacity (0.3 within the SVG, further controlled by the wrapper `opacity` prop).
- The `animate-dash-flow` class creates continuous flowing dashes. Use a slower duration (6s) than `animate-dash` (4s) because the arcs are longer.
- Server icons are simplified -- the exact path data from workers.cloudflare.com generates two stacked server racks. You can swap these for any icon relevant to the customer's architecture.
- Connector squares (9x9, rx 1.5) always appear at the top and bottom of server nodes.

---

### 8. Interactive Code Panel

A two-panel layout with a code editor on the left and a tabbed description sidebar on the right. Reverse-engineered from the product code examples section on workers.cloudflare.com (the KV / Workers for Platforms code demos).

Key patterns from the source:
- Left panel: dark code editor with dot-pattern background, line numbers, syntax highlighting, a filename tab bar, and a copy-to-clipboard button
- Right panel: stacked description cards, one active (highlighted with an orange left border and lighter bg), others muted
- Clicking a description card switches the code shown in the editor
- Dot-pattern background uses the same pattern as the title slide (`circle r="0.75"`) with masking (fades toward top-left)

**When to use:** Code slides where you want to showcase multiple code examples with context. Much more polished than a plain `CodeBlock`. Best for 2-4 related code snippets with descriptions.

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeExample {
  filename: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

function InteractiveCodePanel({ examples }: { examples: CodeExample[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = examples[activeIndex];

  return (
    // IMPORTANT: Use fixed `height` (not minHeight) so children can calculate overflow.
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full" style={{ height: "420px" }}>
      {/* Left: Code editor
          min-h-0 is CRITICAL -- without it, flex children default to min-height:auto
          and will expand to fit content instead of scrolling. */}
      <div className="relative lg:col-span-2 flex flex-col min-h-0 rounded-l-xl"
        style={{ background: "var(--cf-code-bg)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Dot pattern background with mask */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ mask: "linear-gradient(135deg, transparent 0%, black 60%)" }}>
          <defs>
            <pattern id="code-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="0.75" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#code-dots)" />
        </svg>

        {/* Filename tabs -- flex-shrink-0 so tabs never collapse */}
        <div className="relative z-10 flex-shrink-0 flex gap-1 px-2 pt-2 pb-1">
          {examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="px-2 py-1 font-mono text-xs whitespace-nowrap transition-colors duration-200"
              style={{
                color: i === activeIndex ? "var(--cf-code-text)" : "rgba(228,228,231,0.4)",
              }}
            >
              {ex.filename}
            </button>
          ))}
        </div>

        {/* Code content with line numbers
            flex-1 + min-h-0 + overflow-y-auto = scrollable flex child */}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-auto px-4 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <pre className="text-sm leading-relaxed">
                <code style={{ fontFamily: '"Fira Code", monospace', color: "var(--cf-code-text)" }}>
                  {active.code.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 flex-shrink-0 text-right pr-3 select-none"
                        style={{ color: "rgba(228,228,231,0.2)", fontSize: "13px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <HighlightedCode code={line} />
                    </div>
                  ))}
                </code>
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Description cards -- min-h-0 for scroll if content overflows */}
      <div className="flex flex-col min-h-0 overflow-y-auto rounded-r-xl"
        style={{ background: "var(--cf-bg-100)", border: "1px solid var(--cf-border)", borderLeft: "none" }}>
        {examples.map((ex, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="relative flex w-full flex-col items-start gap-1 p-6 text-left transition-colors duration-200"
            style={{
              background: i === activeIndex ? "var(--cf-bg-200)" : "var(--cf-bg-100)",
              borderBottom: i < examples.length - 1 ? "1px solid var(--cf-border)" : "none",
            }}
          >
            {/* Active indicator */}
            {i === activeIndex && (
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ background: "var(--cf-orange)" }}
                layoutId="active-tab"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <p className="text-sm font-medium transition-colors"
              style={{ color: i === activeIndex ? "var(--cf-text)" : "var(--cf-text-muted)" }}>
              {ex.title}
            </p>
            <span className="text-xs leading-relaxed transition-colors"
              style={{ color: i === activeIndex ? "var(--cf-text-muted)" : "var(--cf-text-faint)" }}>
              {ex.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Note:** This component references `HighlightedCode` from the Code Blocks section. Make sure the tokeniser is available in the same file or imported.

**Example usage:**
```tsx
<InteractiveCodePanel examples={[
  {
    filename: "detect.ts",
    title: "Classify AI crawlers at the edge",
    description: "Use Bot Management signals to identify GPTBot, ClaudeBot, and other AI crawlers by their detection IDs.",
    language: "typescript",
    code: `const botInfo = request.cf?.botManagement;\nconst isAiCrawler = botInfo?.verifiedBot\n  && AI_DETECTION_IDS.includes(botInfo.detectionIds[0]);`,
  },
  {
    filename: "inject.ts",
    title: "Inject content with HTMLRewriter",
    description: "Modify the response body for AI crawlers only, appending sponsored content after article elements.",
    language: "typescript",
    code: `return new HTMLRewriter()\n  .on("article", {\n    element(el) {\n      el.append(sponsoredHtml, { html: true });\n    },\n  })\n  .transform(response);`,
  },
]} />
```

**Rules:**
- Always pair with the `HighlightedCode` tokeniser for syntax colouring. Never render code as monochrome text.
- The active tab indicator uses Framer Motion's `layoutId` for smooth sliding transitions.
- Dot pattern background uses a CSS mask gradient (`linear-gradient(135deg, transparent 0%, black 60%)`) to fade out toward the top-left corner, exactly matching the workers.cloudflare.com implementation.
- Line numbers are 2-digit zero-padded, styled at `rgba(228,228,231,0.2)` -- barely visible but present.
- Limit to 2-4 examples. More than 4 makes the right panel too crowded.
- **Scrolling is mandatory.** See the "Flexbox Scroll Pattern" rule below -- every panel that can overflow must scroll.

---

### 9. Workflow Diagram + Interactive Workflow Panel

A two-part element for presenting Cloudflare Workflows visually. Combines a vertical step-chain diagram (matching the style from developers.cloudflare.com/workflows) with the Interactive Code Panel pattern. The diagram and code panel live side-by-side in a three-column layout; the diagram column animates in/out based on which step tab is selected.

**When to use:** Any slide that shows a `WorkflowEntrypoint` implementation. The diagram makes the durable step chain tangible at a glance, while the code panel shows the actual implementation per step.

---

#### 9a. WorkflowDiagram

A vertical chain of step nodes connected by lines, with an entry dot at the top and a filled terminal dot at the bottom. Each node has a type badge (`do`, `sleep`, `waitForEvent`), an icon, and a label. The active node (driven by the selected code tab) lights up in the corresponding accent colour.

**Step types and colours:**

| Type | Badge | Icon | Active colour |
|------|-------|------|---------------|
| `do` | `do` | Checkbox square | `var(--cf-orange)` |
| `sleep` | `sleep` | Clock | `#38BDF8` blue |
| `waitForEvent` | `waitForEvent` | Magnifier | `#A78BFA` purple |

```tsx
import { motion } from "framer-motion";

interface DiagramStep {
  type: "do" | "sleep" | "waitForEvent";
  label: string;   // e.g. "fetch document"
}

interface WorkflowDiagramProps {
  steps: DiagramStep[];
  activeLabel?: string; // highlights the node whose label matches
}

// Icons
function IconDo({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill={color} viewBox="0 0 256 256">
      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z" />
    </svg>
  );
}
function IconSleep({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill={color} viewBox="0 0 256 256">
      <path d="M232,136a96,96,0,1,1-96-96A96.11,96.11,0,0,1,232,136Zm-96-80a80,80,0,1,0,80,80A80.09,80.09,0,0,0,136,56Zm40,112H120a8,8,0,0,1-6.34-12.84l34-44H120a8,8,0,0,1,0-16h56a8,8,0,0,1,6.34,12.84l-34,44H176a8,8,0,0,1,0,16Z" />
    </svg>
  );
}
function IconWaitForEvent({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill={color} viewBox="0 0 256 256">
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Zm104-8H120V88a8,8,0,0,0-16,0v24a8,8,0,0,0,8,8h32a8,8,0,0,0,0-16Z" />
    </svg>
  );
}

const STEP_META = {
  do:           { label: "do",           icon: IconDo,           activeColor: "var(--cf-orange)", activeBg: "var(--cf-orange-light)",         activeBorder: "var(--cf-orange-border)",         activeHeader: "rgba(255,72,1,0.06)"         },
  sleep:        { label: "sleep",        icon: IconSleep,        activeColor: "#38BDF8",           activeBg: "rgba(56,189,248,0.08)",          activeBorder: "rgba(56,189,248,0.25)",          activeHeader: "rgba(56,189,248,0.06)"        },
  waitForEvent: { label: "waitForEvent", icon: IconWaitForEvent, activeColor: "#A78BFA",           activeBg: "rgba(167,139,250,0.08)",         activeBorder: "rgba(167,139,250,0.25)",         activeHeader: "rgba(167,139,250,0.06)"       },
};

function WorkflowDiagram({ steps, activeLabel }: WorkflowDiagramProps) {
  const connectorColor = "var(--cf-border)";

  return (
    <div className="flex flex-col items-center w-fit mx-auto select-none">
      {/* Entry dot */}
      <div className="flex flex-col items-center">
        <div className="rounded" style={{ width: 10, height: 10, border: "1px solid var(--cf-border)", background: "var(--cf-bg-200)", position: "relative", zIndex: 30 }} />
        <div style={{ width: 2, height: 10, background: connectorColor }} />
      </div>

      <ul className="list-none m-0 p-0 flex flex-col items-center">
        {steps.map((step, i) => {
          const meta = STEP_META[step.type];
          const isActive = step.label === activeLabel;
          const cardColor   = isActive ? meta.activeColor   : "var(--cf-text-muted)";
          const cardBg      = isActive ? meta.activeBg      : "var(--cf-bg-200)";
          const cardBorder  = isActive ? meta.activeBorder  : "var(--cf-border)";
          const headerBg    = isActive ? meta.activeHeader  : "var(--cf-bg-300)";
          const headerBorder= isActive ? meta.activeBorder  : "var(--cf-border)";
          const Icon = meta.icon;

          return (
            <li key={i} className="flex flex-col items-center">
              <motion.div className="flex flex-col items-center"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                {/* Top cap */}
                <div style={{ width: 8, height: 4, borderRadius: "2px 2px 0 0",
                  background: isActive ? meta.activeColor : connectorColor, transition: "background 0.3s",
                  marginLeft: "auto", marginRight: "auto" }} />

                {/* Card */}
                <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 8,
                  overflow: "hidden", minWidth: 160, maxWidth: 220,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)", transition: "border-color 0.3s, background 0.3s",
                  position: "relative", zIndex: 20 }}>
                  <header style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}`,
                    padding: "3px 8px", display: "flex", alignItems: "center", transition: "background 0.3s" }}>
                    <span className="font-mono" style={{ fontSize: 10, color: cardColor,
                      letterSpacing: "0.02em", transition: "color 0.3s" }}>
                      {meta.label}
                    </span>
                  </header>
                  <div style={{ padding: "6px 10px 6px 8px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                      <Icon color={cardColor} />
                    </span>
                    <span className="font-medium font-mono truncate"
                      style={{ fontSize: 11, color: isActive ? cardColor : "var(--cf-text)",
                        letterSpacing: "-0.01em", transition: "color 0.3s", maxWidth: 160 }}>
                      {step.label}
                    </span>
                  </div>
                </div>

                {/* Bottom attachment square */}
                <div style={{ width: 10, height: 10, border: "1px solid var(--cf-border)", borderRadius: 2,
                  background: "var(--cf-bg-200)", marginTop: -6, position: "relative", zIndex: 30 }} />
              </motion.div>

              {/* Connector to next step */}
              {i < steps.length - 1 && (
                <motion.div className="flex flex-col items-center" style={{ height: 36 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}>
                  <div className="w-px flex-1"
                    style={{ background: isActive ? meta.activeColor : connectorColor, transition: "background 0.3s" }} />
                </motion.div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Terminal dot */}
      <div className="flex flex-col items-center">
        <div style={{ width: 2, height: 10, background: connectorColor }} />
        <div className="rounded" style={{ width: 8, height: 8, background: connectorColor,
          border: `1px solid ${connectorColor}`, position: "relative", zIndex: 10 }} />
      </div>
    </div>
  );
}
```

---

#### 9b. SlideWorkflow — Three-Column Interactive Layout

Wraps `WorkflowDiagram` + `InteractiveCodePanel` into a full slide. The diagram column is the leftmost panel and **only renders when the first tab ("full workflow") is selected** — it animates in/out using `AnimatePresence` with a width transition. Switching to any other tab collapses the diagram, expanding the code panel to fill the space.

Supports an optional **variant toggle** (e.g. "Workers AI" vs "Deepgram API") rendered as a pill switch in the heading row.

**Data model:**

```ts
interface WorkflowSlide {
  type: "workflow";
  heading?: string;
  variants?: WorkflowVariant[]; // optional toggle between named step sets
  steps?: WorkflowStep[];       // used when no variants
}

interface WorkflowVariant {
  label: string;
  preferred?: boolean;   // shown by default, gets orange pill
  steps: WorkflowStep[];
}

interface WorkflowStep {
  title: string;          // sidebar tab label
  description: string;    // subtitle shown in sidebar
  language: string;
  filename: string;
  code: string;
  diagramSteps?: DiagramStep[];   // defines the full workflow chain (set on step[0] only)
  diagramHighlight?: string;      // which node label to highlight when this tab is active
}

interface DiagramStep {
  type: "do" | "sleep" | "waitForEvent";
  label: string;
}
```

**Key rules:**
- `diagramSteps` is defined **only on `steps[0]`** — it represents the full chain for the whole workflow. All tabs share the same chain.
- `diagramHighlight` on each tab tells the diagram which node to colour. Tab 0 (full workflow overview) has no `diagramHighlight` — all nodes render at rest.
- The diagram column animates from `width: 0` to `width: 210px` using `AnimatePresence`. This keeps the layout shift smooth when switching tabs.
- The code editor and sidebar are `flex-1` / fixed-width respectively; no CSS grid is needed.
- The variant toggle renders as a pill switch with `layoutId="variant-pill"` for smooth sliding. The preferred variant gets an orange filled pill; others get a bordered neutral pill.

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SlideWorkflow({ slide }: { slide: WorkflowSlide }) {
  const defaultVariantIndex = slide.variants
    ? Math.max(0, slide.variants.findIndex((v) => v.preferred))
    : 0;
  const [variantIndex, setVariantIndex] = useState(defaultVariantIndex);
  const [activeIndex, setActiveIndex]   = useState(0);

  const steps = slide.variants ? slide.variants[variantIndex].steps : (slide.steps ?? []);
  const active = steps[activeIndex];

  // Diagram: defined once on steps[0], visible only when tab 0 is active
  const allDiagramSteps = steps[0]?.diagramSteps ?? [];
  const hasDiagram      = allDiagramSteps.length > 0 && activeIndex === 0;
  const activeDiagramLabel = active.diagramHighlight ?? null;

  function switchVariant(i: number) { setVariantIndex(i); setActiveIndex(0); }

  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8 flex flex-col" style={{ height: "100%" }}>

        {/* Heading + variant toggle */}
        <div className="flex-shrink-0 flex items-center justify-between mb-4 gap-6">
          <h2 className="font-medium" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
            color: "var(--cf-text)", letterSpacing: "-0.03em" }}>
            {slide.heading}
          </h2>

          {slide.variants && slide.variants.length > 1 && (
            <div className="flex items-center gap-1 flex-shrink-0"
              style={{ background: "var(--cf-bg-200)", border: "1px solid var(--cf-border)",
                borderRadius: 9999, padding: 3 }}>
              {slide.variants.map((v, i) => (
                <button key={i} type="button" onClick={() => switchVariant(i)}
                  className="relative px-3 py-1 text-xs font-medium cursor-pointer"
                  style={{ borderRadius: 9999, color: i === variantIndex
                    ? (v.preferred ? "#fff" : "var(--cf-text)") : "var(--cf-text-muted)",
                    background: "transparent", border: "none" }}>
                  {i === variantIndex && (
                    <motion.span layoutId="variant-pill" className="absolute inset-0 rounded-full"
                      style={{ background: v.preferred ? "var(--cf-orange)" : "var(--cf-bg-300)",
                        border: v.preferred ? "none" : "1px solid var(--cf-border)" }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {v.preferred && <span className="font-mono text-[9px] uppercase"
                      style={{ color: i === variantIndex ? "rgba(255,255,255,0.7)" : "var(--cf-orange)",
                        letterSpacing: "0.08em" }}>rec</span>}
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Three-column layout (diagram | code | sidebar) */}
        <motion.div className="flex-1 flex flex-row min-h-0"
          style={{ gap: 10, minHeight: 0, maxHeight: "calc(100% - 60px)" }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

          {/* Diagram column — mounts/unmounts with AnimatePresence */}
          <AnimatePresence initial={false}>
            {hasDiagram && (
              <motion.div key="diagram"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 210 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 flex flex-col items-start overflow-y-auto overflow-x-hidden rounded-xl"
                style={{ background: "var(--cf-bg-200)", border: "1px solid var(--cf-border)", padding: "16px 14px" }}>
                <div className="w-full flex justify-center pt-2">
                  <WorkflowDiagram steps={allDiagramSteps} activeLabel={activeDiagramLabel ?? undefined} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code editor */}
          <div className="relative flex flex-col min-h-0 overflow-hidden rounded-xl flex-1"
            style={{ background: "var(--cf-code-bg)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Filename tabs */}
            <div className="relative z-10 flex-shrink-0 flex gap-1 px-3 pt-2 pb-1 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {steps.map((step, i) => (
                <button key={i} type="button" onClick={() => setActiveIndex(i)}
                  className="px-2.5 py-1 font-mono text-xs whitespace-nowrap rounded-sm cursor-pointer"
                  style={{ color: i === activeIndex ? "var(--cf-code-text)" : "rgba(228,228,231,0.35)",
                    background: i === activeIndex ? "rgba(255,255,255,0.06)" : "transparent" }}>
                  {step.filename}
                </button>
              ))}
            </div>
            {/* Code with line numbers */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-auto px-4 py-4">
              <AnimatePresence mode="wait">
                <motion.div key={`${variantIndex}-${activeIndex}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}>
                  <pre className="text-sm leading-relaxed m-0">
                    <code style={{ fontFamily: '"Fira Code", monospace', color: "var(--cf-code-text)" }}>
                      {active.code.split("\n").map((line, i) => (
                        <div key={i} className="flex">
                          <span className="w-7 flex-shrink-0 text-right pr-3 select-none"
                            style={{ color: "rgba(228,228,231,0.18)", fontSize: 12, lineHeight: "1.625" }}>
                            {i + 1}
                          </span>
                          <HighlightedCode code={line} />
                        </div>
                      ))}
                    </code>
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step selector sidebar */}
          <div className="flex flex-col min-h-0 overflow-y-auto rounded-xl flex-shrink-0"
            style={{ background: "var(--cf-bg-100)", border: "1px solid var(--cf-border)", width: 260 }}>
            <AnimatePresence mode="wait">
              <motion.div key={variantIndex} className="flex flex-col"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}>
                {steps.map((step, i) => (
                  <button key={i} type="button" onClick={() => setActiveIndex(i)}
                    className="relative flex w-full flex-col items-start gap-1 p-5 text-left cursor-pointer"
                    style={{ background: i === activeIndex ? "var(--cf-bg-200)" : "var(--cf-bg-100)",
                      borderBottom: i < steps.length - 1 ? "1px solid var(--cf-border)" : "none",
                      flexShrink: 0 }}>
                    <div className="flex items-center gap-2.5 w-full">
                      {i === activeIndex && (
                        <motion.div className="absolute left-0 top-0 bottom-0 w-0.5"
                          style={{ background: "var(--cf-orange)" }}
                          layoutId={`workflow-active-${variantIndex}`}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} />
                      )}
                      <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-medium"
                        style={{ background: i === activeIndex ? "var(--cf-orange-light)" : "transparent",
                          color: i === activeIndex ? "var(--cf-orange)" : "var(--cf-text-faint)",
                          border: `1px solid ${i === activeIndex ? "var(--cf-orange-border)" : "var(--cf-border)"}` }}>
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium leading-tight"
                        style={{ color: i === activeIndex ? "var(--cf-text)" : "var(--cf-text-muted)" }}>
                        {step.title}
                      </p>
                    </div>
                    <p className="text-xs leading-relaxed mt-1 pl-7"
                      style={{ color: i === activeIndex ? "var(--cf-text-muted)" : "var(--cf-text-faint)" }}>
                      {step.description}
                    </p>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

**Example `deck-content.ts` entry for a Cloudflare Workflows slide:**

```ts
{
  type: "workflow",
  heading: "Document Workflow — WorkflowEntrypoint",
  steps: [
    {
      title: "The full workflow",
      description: "All steps in one class. Resumes from the last completed step if the Worker restarts.",
      language: "typescript",
      filename: "workflow.ts",
      diagramHighlight: undefined, // show all nodes at rest
      diagramSteps: [
        { type: "do", label: "fetch document" },
        { type: "do", label: "ocr document" },
        { type: "do", label: "extract fields" },
        { type: "do", label: "persist to D1" },
        { type: "do", label: "push to TMS" },
      ],
      code: `import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from "cloudflare:workers";
// ...full WorkflowEntrypoint class`,
    },
    {
      title: "Trigger from upload",
      description: "A Worker stores the file in R2, then calls env.DOC_WORKFLOW.create() to start the instance.",
      language: "typescript",
      filename: "trigger.ts",
      diagramHighlight: "fetch document", // lights up this node in the diagram
      code: `// trigger worker code...`,
    },
    // ... more steps
  ],
},
```

**Rules:**
- `diagramSteps` is set **only on `steps[0]`**. All tabs share the same chain — do not repeat it on every tab.
- `diagramHighlight` should match a `DiagramStep.label` exactly (case-sensitive).
- The diagram is hidden (width → 0) whenever `activeIndex !== 0`. This is intentional — the first tab is always the "full overview" tab.
- Do not show more than 8 nodes in the diagram — it will overflow the column height.
- Use `sleep` node type for `step.sleep()` calls and `waitForEvent` node type for `step.waitForEvent()` calls. All other steps are `do`.
- The variant toggle is optional. Use it when showing two implementations of the same pipeline (e.g. "Workers AI" vs "External API"). Mark the preferred variant with `preferred: true`.

---

### 10. Globe Flow Diagram (How It Works)

A large-format SVG diagram showing a request flow across a globe background with labeled nodes, pulsing rings, animated connection lines, and a speed legend. Reverse-engineered from the "How It Works" section on workers.cloudflare.com (Workers for Platforms diagram).

Key animation patterns from the source:
- **Pulsing rings:** Concentric circles around the central "user" node that pulse outward (`pulse-ring-1`, `pulse-ring-2`, `pulse-ring-3`), each with decreasing fill opacity (0.08, 0.05, 0.03) and a matching stroke ring at 0.05 opacity
- **Animated dashed lines:** Curved paths between nodes using `stroke-dasharray="3 5"` with CSS-animated `stroke-dashoffset` (flowing dashes in one direction)
- **Reverse animated dashes:** Some lines flow in the opposite direction (`.reverse-animated-dash`)
- **Animated solid line:** A connection that draws itself in as a solid stroke, transitioning from 0.3 opacity background to full opacity foreground
- **Corner bracket legend:** A speed legend box in the bottom-left with an animated arrow (arrowhead clips in/out via SVG `<animate>`) and a reverse-dashed "Slower" line
- **Database icons:** Cylindrical database shapes inside circular nodes (the SVG path data is complex but represents a 3D-ish cylinder with 4 stacked rings)
- **Sparkle icon:** The central "Edge" node uses a sparkle/star icon (AI inference indicator)
- **Labeled dashed rectangles:** Rounded rect labels under nodes with `stroke-dasharray="1 4"` and text inside (e.g., "Storage", "Edge", "User")
- **Globe background:** A raster image (`globe.png`) fills the SVG background via `<pattern>`. In the React version, use a gradient or the dot pattern as a substitute.

**When to use:** "How It Works" or request lifecycle slides where you want to show data flowing between 3+ services with a sense of global scale. Best for explaining multi-hop architectures (user -> edge -> storage, user -> edge -> AI -> origin).

Add to `src/styles.css`:
```css
@keyframes pulse-ring {
  0%   { transform: scale(1);    opacity: 1; }
  50%  { transform: scale(1.04); opacity: 0.7; }
  100% { transform: scale(1);    opacity: 1; }
}
.pulse-ring-1 { animation: pulse-ring 3s ease-in-out infinite; transform-origin: center; }
.pulse-ring-2 { animation: pulse-ring 3s ease-in-out 0.4s infinite; transform-origin: center; }
.pulse-ring-3 { animation: pulse-ring 3s ease-in-out 0.8s infinite; transform-origin: center; }

@keyframes animated-dash-forward {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -24; }
}
@keyframes animated-dash-reverse {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 24; }
}
.animated-dash-fwd {
  animation: animated-dash-forward 2s linear infinite;
}
.animated-dash-rev {
  animation: animated-dash-reverse 2s linear infinite;
}

@keyframes solid-line-draw {
  0%   { stroke-dashoffset: 300; }
  50%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; }
}
.animated-solid-line {
  stroke-dasharray: 300;
  animation: solid-line-draw 4s ease-in-out infinite;
}

@keyframes arrow-pulse {
  0%, 35%  { opacity: 0; }
  42%, 97% { opacity: 1; }
  100%     { opacity: 0; }
}
.animated-arrow-head {
  animation: arrow-pulse 4s linear infinite;
}
```

```tsx
import { motion } from "framer-motion";

interface FlowNode {
  id: string;
  cx: number;              // Center X in viewBox
  cy: number;              // Center Y in viewBox
  label: string;           // Text label shown in dashed box below node
  icon: "database" | "sparkle" | "user" | "globe";  // Determines which icon renders inside the circle
  isPrimary?: boolean;     // If true, gets pulse rings
}

interface FlowConnection {
  from: string;
  to: string;
  path: string;            // Raw SVG path d="" -- hand-authored curves for best visual result
  style: "dashed" | "dashed-reverse" | "solid";
}

interface GlobeFlowDiagramProps {
  nodes: FlowNode[];
  connections: FlowConnection[];
  viewBox?: string;        // Default "0 0 914 522"
  legend?: boolean;        // Show Faster/Slower legend (default true)
}

function GlobeFlowDiagram({ nodes, connections, viewBox = "0 0 914 522", legend = true }: GlobeFlowDiagramProps) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full border" style={{ borderColor: "var(--cf-border)" }}>
      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-0 z-10 select-none" aria-hidden="true">
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => {
          const [v, h] = pos.split("-");
          return (
            <div
              key={pos}
              className="absolute"
              style={{
                [h === "left" ? "left" : "right"]: "-7px",
                [v === "top" ? "top" : "bottom"]: "-7px",
                width: "14px", height: "14px",
                border: "1px solid var(--cf-border)",
                borderRadius: "3px",
                background: "var(--cf-bg-100)",
              }}
            />
          );
        })}
      </div>

      <svg viewBox={viewBox} className="w-full" style={{ maxHeight: "480px" }}>
        {/* Dot pattern background instead of globe image */}
        <defs>
          <pattern id="globe-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.5" fill="var(--cf-border)" />
          </pattern>
          <radialGradient id="globe-fade" cx="50%" cy="75%" r="50%">
            <stop offset="0%" stopColor="var(--cf-orange)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--cf-orange)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#globe-dots)" />
        <rect width="100%" height="100%" fill="url(#globe-fade)" />

        {/* Connections */}
        {connections.map((conn, i) => (
          <g key={`conn-${i}`}>
            {/* Background line at low opacity for solid style */}
            {conn.style === "solid" && (
              <path
                d={conn.path}
                stroke="var(--cf-orange)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
                fill="none"
              />
            )}
            <path
              d={conn.path}
              stroke="var(--cf-orange)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={conn.style === "solid" ? undefined : "3 5"}
              className={
                conn.style === "dashed" ? "animated-dash-fwd" :
                conn.style === "dashed-reverse" ? "animated-dash-rev" :
                "animated-solid-line"
              }
            />
          </g>
        ))}

        {/* Pulse rings for primary nodes */}
        {nodes.filter((n) => n.isPrimary).map((node) => (
          <g key={`rings-${node.id}`}>
            <circle className="pulse-ring-3" cx={node.cx} cy={node.cy} r="105"
              fill="var(--cf-orange)" fillOpacity="0.03" />
            <circle className="pulse-ring-3" cx={node.cx} cy={node.cy} r="104.5"
              fill="none" stroke="var(--cf-orange)" strokeOpacity="0.05" />
            <circle className="pulse-ring-2" cx={node.cx} cy={node.cy} r="71"
              fill="var(--cf-orange)" fillOpacity="0.05" />
            <circle className="pulse-ring-2" cx={node.cx} cy={node.cy} r="70.5"
              fill="none" stroke="var(--cf-orange)" strokeOpacity="0.05" />
            <circle className="pulse-ring-1" cx={node.cx} cy={node.cy} r="43"
              fill="var(--cf-orange)" fillOpacity="0.08" />
            <circle className="pulse-ring-1" cx={node.cx} cy={node.cy} r="42.5"
              fill="none" stroke="var(--cf-orange)" strokeOpacity="0.05" />
          </g>
        ))}

        {/* Node circles */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Circle background */}
            <circle cx={node.cx} cy={node.cy} r="24"
              fill="var(--cf-bg-200)" stroke="var(--cf-orange)" />

            {/* Simple icon placeholder -- a letter abbreviation */}
            <text
              x={node.cx} y={node.cy + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill="var(--cf-orange)" fontSize="14" fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {node.icon === "database" ? "DB" :
               node.icon === "sparkle" ? "AI" :
               node.icon === "user" ? "U" : "G"}
            </text>

            {/* Label box below the node */}
            <rect
              x={node.cx - 28.5} y={node.cy + 28}
              width={57} height={34} rx={4}
              fill="var(--cf-bg-200)"
              stroke="var(--cf-orange)"
              strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round" strokeDasharray="1 4"
            />
            <text
              x={node.cx} y={node.cy + 49}
              textAnchor="middle" dominantBaseline="middle"
              fill="var(--cf-orange)" fontSize="11" fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Speed legend */}
        {legend && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <rect x="24" y="380" width="110" height="60" rx="2"
              fill="var(--cf-bg-100)" stroke="var(--cf-orange)"
              strokeDasharray="1 0" opacity="0.9" />
            {/* Corner accents */}
            <rect x="22.5" y="378.5" width="16" height="2" fill="var(--cf-orange)" />
            <rect x="22.5" y="378.5" width="2" height="16" fill="var(--cf-orange)" />
            <rect x="117.5" y="378.5" width="16" height="2" fill="var(--cf-orange)" />
            <rect x="132.5" y="378.5" width="2" height="16" fill="var(--cf-orange)" />
            <rect x="22.5" y="438.5" width="16" height="2" fill="var(--cf-orange)" />
            <rect x="22.5" y="424.5" width="2" height="16" fill="var(--cf-orange)" />
            <rect x="117.5" y="438.5" width="16" height="2" fill="var(--cf-orange)" />
            <rect x="132.5" y="424.5" width="2" height="16" fill="var(--cf-orange)" />

            {/* Faster arrow */}
            <line x1="33" y1="400" x2="55" y2="400"
              stroke="var(--cf-orange)" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="55,396 63,400 55,404" fill="var(--cf-orange)"
              className="animated-arrow-head" />
            <text x="68" y="403" fill="var(--cf-orange)" fontSize="11"
              fontFamily="'Fira Code', monospace" fontWeight="600">Faster</text>

            {/* Slower dashed */}
            <line x1="55" y1="420" x2="33" y2="420"
              stroke="var(--cf-orange)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="3 5" className="animated-dash-rev" />
            <text x="68" y="423" fill="var(--cf-orange)" fontSize="11"
              fontFamily="'Fira Code', monospace" fontWeight="600">Slower</text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}
```

**Example usage for a 3-node request flow:**
```tsx
<GlobeFlowDiagram
  nodes={[
    { id: "storage", cx: 518, cy: 108, label: "Storage", icon: "database" },
    { id: "edge",    cx: 703, cy: 165, label: "Edge",    icon: "sparkle" },
    { id: "user",    cx: 408, cy: 417, label: "User",    icon: "user", isPrimary: true },
  ]}
  connections={[
    { from: "storage", to: "user",  path: "M519 112.5C564 150.5 623 276.5 607.5 396", style: "dashed" },
    { from: "user",    to: "edge",  path: "M431 411C486.25 396 584 396 584 396",       style: "solid" },
    { from: "edge",    to: "user",  path: "M617 387C772 178 764 136 703.9 172.9",      style: "dashed-reverse" },
  ]}
/>
```

**Rules:**
- Connection paths must be **hand-authored SVG curves** (not auto-generated). The diagram looks best when curves are organic and asymmetric. Use tools like https://svg-path-editor.netlify.app/ to design them.
- The primary node (usually "User" or "Client") gets pulsing rings. Only one node should be primary.
- The speed legend should appear in the bottom-left for diagrams showing latency comparison (edge vs. origin). Omit it (`legend={false}`) for simpler flows.
- Dashed lines flow toward their destination. Reverse-dashed lines flow the opposite direction (used for return paths or slower connections).
- The solid animated line draws itself in repeatedly -- use it for the "fast path" (edge route).
- Node icons are simplified to 2-letter abbreviations. For production decks with more time, replace with actual SVG icon paths.
- Corner brackets on the outer container are mandatory -- they're the signature Cloudflare detail from the source.
- The `pulse-ring` animations are staggered by 0.4s each via the CSS class suffixes (`pulse-ring-1`, `pulse-ring-2`, `pulse-ring-3`).

---

### 11. 3D Globe (Three.js + React Three Fiber)

A WebGL-rendered 3D globe using Three.js, @react-three/fiber, and @react-three/drei. Features a transparent glass sphere, coastline point clouds from Natural Earth 110m data, 330+ Cloudflare PoP dots as instanced meshes, graticule grid lines, atmosphere glow, and HDR environment lighting. Inspired by the globe on [cloudflare.leo.arsen.in](https://cloudflare.leo.arsen.in/deck/cloudflare?s=2&p=0).

**Required dependencies:** `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` (dev)
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

**Bundle impact:** ~700KB min+gz. This is significant. Only use for decks where the globe is a key visual element (title slides for global reach / edge network messaging).

Key visual layers:
- **Globe sphere:** `meshPhysicalMaterial` with low opacity (`0.1`), gray color (`#B0A8A0`), clearcoat for subtle edge highlight. The globe should be nearly invisible so the PoP dots and branding pop.
- **Coastline point cloud:** Natural Earth 110m coastline polygons interpolated into dense points, rendered as `pointsMaterial` in muted taupe (`#A09080`, opacity 0.5). Coastlines are a subtle geographic reference, not the star.
- **Graticule grid:** Lat/lon lines every 30deg as `lineSegments` at very low opacity (0.08).
- **PoP dots:** `instancedMesh` with 330+ Cloudflare data center locations as small orange spheres (`#FF4801`, opacity 0.9). These are the visual focal point.
- **Atmosphere glow:** Two `BackSide`-rendered spheres (r=1.01, r=1.08) with muted gray color and very low opacity. Keeps the globe from floating in a void.
- **Lighting:** Warm ambient + directional + orange point light, plus `"dawn"` HDR environment from drei.
- **Auto-rotation:** Slow Y-axis spin via `useFrame` at `delta * 0.08`.

**When to use:** Title slides where global reach / edge network is the message. Pairs well with `InfiniteTickerStrip` at the bottom. This is the most visually striking title slide element.

**File structure:**
- `src/data/coastlines.ts` -- Natural Earth 110m coastline polygons (same file from previous canvas approach, reused)
- `src/data/pops.ts` -- 330+ Cloudflare PoP `[lat, lon]` coordinates
- `src/components/Globe3D.tsx` -- The Three.js globe component

**Step 1: `src/data/coastlines.ts`** -- Same as before (Natural Earth 110m polygons). See the Centra deck repo for the full file. Contains 10 landmass polygons: Eurasia+Africa, Americas, Australia, Greenland, Japan, Britain, Madagascar, New Guinea, Sumatra, Borneo.

**Step 2: `src/data/pops.ts`** -- 330+ Cloudflare PoP locations organized by region (US 80+, Canada 12, Mexico/Caribbean 8, Central America 5, South America 20, Western Europe 40, Nordics/Baltics 12, Central/Eastern Europe 18, Turkey/Cyprus 3, Middle East 12, Africa 25+, Russia/CIS 8, South Asia 12, Southeast Asia 15, East Asia 16+, Oceania 12). See the Centra deck repo for the full file.

**Step 3: `src/components/Globe3D.tsx`**

```tsx
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { coastlines } from "../data/coastlines";
import { POP_COORDS } from "../data/pops";

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function generateCoastlinePoints(radius: number, density = 0.3): Float32Array {
  const pts: number[] = [];
  for (const poly of coastlines) {
    for (let i = 0; i < poly.length - 1; i++) {
      const [lat1, lon1] = poly[i];
      const [lat2, lon2] = poly[i + 1];
      const dist = Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2);
      const steps = Math.max(1, Math.round(dist / density));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const lat = lat1 + (lat2 - lat1) * t;
        const lon = lon1 + (lon2 - lon1) * t;
        const v = latLonToVec3(lat, lon, radius);
        pts.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(pts);
}

function generateGraticule(radius: number): Float32Array {
  const pts: number[] = [];
  const step = 3;
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = -180; lon < 180; lon += step) {
      const a = latLonToVec3(lat, lon, radius);
      const b = latLonToVec3(lat, lon + step, radius);
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -90; lat < 90; lat += step) {
      const a = latLonToVec3(lat, lon, radius);
      const b = latLonToVec3(lat + step, lon, radius);
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  return new Float32Array(pts);
}

function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const R = 1;
  const coastPts = useMemo(() => generateCoastlinePoints(R * 1.002, 0.25), []);
  const gratPts = useMemo(() => generateGraticule(R * 1.001), []);
  const popCount = POP_COORDS.length;

  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  const onInstancedRef = (mesh: THREE.InstancedMesh | null) => {
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < popCount; i++) {
      const [lat, lon] = POP_COORDS[i];
      const v = latLonToVec3(lat, lon, R * 1.005);
      dummy.position.copy(v);
      dummy.lookAt(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  return (
    <group ref={groupRef} rotation={[0.84, 3.54, 0]}>
      {/* Globe sphere -- gray, nearly invisible */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshPhysicalMaterial
          color="#B0A8A0"
          transparent opacity={0.1}
          roughness={0.4} metalness={0}
          envMapIntensity={0.1}
          clearcoat={0.2} clearcoatRoughness={0.5}
          depthWrite={false}
        />
      </mesh>

      {/* Coastline point cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position"
            array={coastPts} count={coastPts.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#A09080" size={0.008} sizeAttenuation
          transparent opacity={0.5} depthWrite={false} />
      </points>

      {/* Graticule grid */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position"
            array={gratPts} count={gratPts.length / 3} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#8A6A50" transparent opacity={0.08} depthWrite={false} />
      </lineSegments>

      {/* PoP dots (instanced) */}
      <instancedMesh ref={onInstancedRef} args={[undefined, undefined, popCount]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial color="#FF4801" transparent opacity={0.9} />
      </instancedMesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[R * 1.01, 64, 64]} />
        <meshBasicMaterial color="#9A8A7A" transparent opacity={0.05}
          side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.08, 64, 64]} />
        <meshBasicMaterial color="#9A8A7A" transparent opacity={0.02}
          side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function Globe3D() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%",
      overflow: "hidden", pointerEvents: "auto", background: "transparent" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <Canvas
          camera={{ position: [0, 0, 3.6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} color="#FFF8F4" />
          <directionalLight position={[5, 3, 5]} intensity={0.8} color="#FFF0E0" />
          <pointLight position={[-3, 2, -3]} intensity={0.3} color="#FF4801" />
          <Environment preset="dawn" />
          <GlobeGroup />
        </Canvas>
      </div>
    </div>
  );
}
```

**Usage on a title slide:**
```tsx
import { Suspense } from "react";
import { Globe3D } from "../Globe3D";

<SlideWrapper background="plain">
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    <Suspense fallback={null}>
      <Globe3D />
    </Suspense>
  </div>
  <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center">
    {/* Title content renders on top of the globe */}
  </div>
  <InfiniteTickerStrip items={["330+ cities", "Edge compute", "..."]} />
</SlideWrapper>
```

**Rules:**
- Always wrap `<Globe3D />` in `<Suspense fallback={null}>` -- the Environment HDR preset loads async.
- The globe sphere must be nearly invisible (opacity ~0.1, gray color). The PoP dots and branding should dominate the visual hierarchy.
- Coastline points are muted taupe, not orange. They provide geographic context without competing with the PoPs.
- PoP dots are bright orange (`#FF4801`) and are the only high-contrast element on the globe. They represent Cloudflare's global network.
- The coastline data file (`coastlines.ts`) and PoP data file (`pops.ts`) must be separate from the component. Do not inline coordinate arrays.
- Coastline data is from Natural Earth 110m (public domain). Do not hand-plot coastline coordinates.
- PoP coordinates should cover all ~330 Cloudflare data centers. The full list is in the Centra deck repo at `src/data/pops.ts`.
- Rotation speed: `delta * 0.08` in `useFrame`. Do not speed this up.
- Initial orientation: `rotation={[0.84, 3.54, 0]}` tilts the globe to show Europe/Africa facing forward. Adjust `initialRotationY` (the second value) to face the customer's region.
- Camera at `z=3.6`, FOV 45. These values give a good globe size relative to the slide.

---

---

### 11. Wall Clock vs CPU Time Diagram

A horizontal timeline bar showing paid compute blocks (solid orange) separated by free idle segments (dashed orange with scrolling "free" watermark text). Reverse-engineered from the pricing promo section on workers.cloudflare.com. Visually communicates that Workers charges only for CPU time, not wall time.

**When to use:** Any slide explaining Workers/Workflows billing. Pairs well with the Workers benefit grid (element 12) and a Lambda comparison table. Always place full-width below other content.

Add to `src/styles.css` (if not already present):
```css
@keyframes infinite-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-infinite-scroll {
  animation: infinite-scroll 40s linear infinite;
}
.-rotate-30 {
  transform: rotate(-30deg);
}
```

```tsx
function FreeStripes({ duration = "80s" }: { duration?: string }) {
  const items = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-center py-1 overflow-hidden" aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex min-h-5 flex-nowrap overflow-hidden">
          <div className="animate-infinite-scroll flex flex-row gap-x-3 flex-shrink-0"
            style={{ animationDuration: duration, animationTimingFunction: "linear", animationIterationCount: "infinite" }}>
            {[...items, ...items].map((_, i) => (
              <span key={i} className="-rotate-30 whitespace-nowrap font-mono"
                style={{ fontSize: 10, color: "rgba(255,72,1,0.18)", marginLeft: "-2px" }}>free</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type SegType = "paid" | "free" | "gap";
// Define segments as: type, width %, optional hover label, optional duration label
const SEGMENTS: { type: SegType; pct: number; label?: string; duration?: string }[] = [
  { type: "gap",  pct: 6 },
  { type: "paid", pct: 8,  duration: "12ms" },
  { type: "free", pct: 22, label: "LLM call",   duration: "2500ms" },
  { type: "paid", pct: 5,  duration: "8ms" },
  { type: "free", pct: 18, label: "Await step", duration: "300ms" },
  { type: "paid", pct: 8,  duration: "40ms" },
  { type: "gap",  pct: 6 },
];

function WallClockDiagram() {
  return (
    <div className="relative w-full" style={{ border: "1px solid var(--cf-border)", borderRadius: 6, padding: "18px 10px 28px" }}>
      {/* Corner brackets */}
      {(["top","bottom"] as const).flatMap(v => (["left","right"] as const).map(h => (
        <div key={`${v}${h}`} className="absolute" style={{
          [v]: -5, [h]: -5, width: 10, height: 10,
          background: "var(--cf-bg-100)", border: "1px solid var(--cf-border)", borderRadius: 2,
        }} />
      )))}

      <div className="font-mono text-[9px] uppercase mb-3 text-center"
        style={{ color: "var(--cf-text-faint)", letterSpacing: "0.1em" }}>
        Wall Clock vs CPU Time
      </div>

      <div className="relative flex items-end w-full" style={{ height: 52 }}>
        {SEGMENTS.map((seg, i) => {
          if (seg.type === "gap") return (
            <div key={i} style={{ width: `${seg.pct}%`, height: 1, alignSelf: "center",
              background: "repeating-linear-gradient(90deg, var(--cf-border) 0, var(--cf-border) 6px, transparent 6px, transparent 10px)",
              opacity: 0.35 }} />
          );
          if (seg.type === "paid") return (
            <div key={i} className="relative flex-shrink-0" style={{ width: `${seg.pct}%`, height: 44 }}>
              <div className="h-full w-full rounded-sm"
                style={{ background: "rgba(255,72,1,0.3)", border: "1px solid var(--cf-orange)" }} />
              {seg.duration && (
                <div className="absolute -top-5 left-1/2 font-mono whitespace-nowrap"
                  style={{ transform: "translateX(-50%)", fontSize: 9, color: "var(--cf-orange)", letterSpacing: "-0.04em" }}>
                  {seg.duration}
                </div>
              )}
            </div>
          );
          return (
            <div key={i} className="relative flex-shrink-0" style={{ width: `${seg.pct}%`, height: 44 }}>
              <div className="relative h-full w-full rounded-sm overflow-hidden"
                style={{ background: "rgba(255,72,1,0.04)", border: "1px dashed rgba(255,72,1,0.35)" }}>
                <FreeStripes duration={seg.pct > 15 ? "80s" : "40s"} />
              </div>
              {seg.label && seg.duration && (
                <div className="absolute -bottom-7 left-1/2 font-mono whitespace-nowrap"
                  style={{ transform: "translateX(-50%)", fontSize: 9, color: "rgba(255,72,1,0.5)", letterSpacing: "-0.04em" }}>
                  {seg.label} {seg.duration}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-0 left-1/2 flex items-center gap-3 px-2 py-1"
        style={{ transform: "translate(-50%, 50%)", background: "var(--cf-bg-100)", fontSize: 9 }}>
        <div style={{ width: 10, height: 10, borderRadius: 2, border: "1px solid var(--cf-border)", background: "var(--cf-bg-100)" }} />
        <div className="flex items-center gap-1">
          <div style={{ width: 10, height: 10, borderRadius: 2, border: "1px solid var(--cf-orange)", background: "rgba(255,72,1,0.3)" }} />
          <span className="font-mono" style={{ color: "var(--cf-orange)" }}>Paid</span>
        </div>
        <div className="flex items-center gap-1">
          <div style={{ width: 10, height: 10, borderRadius: 2, border: "1px dashed rgba(255,72,1,0.4)", background: "rgba(255,72,1,0.04)" }} />
          <span className="font-mono" style={{ color: "rgba(255,72,1,0.5)" }}>Free</span>
        </div>
        <div style={{ width: 10, height: 10, borderRadius: 2, border: "1px solid var(--cf-border)", background: "var(--cf-bg-100)" }} />
      </div>
    </div>
  );
}
```

**Customising segments:** Adjust `pct` values to reflect the customer's actual workload. For document processing pipelines: LLM calls and vector search waits are the dominant free segments. For API proxies: upstream latency is the free segment.

**Rules:**
- Always render full-width (`w-full`). Never constrain to a fixed pixel width -- it needs to match adjacent content width.
- Place below the benefit grid, not beside it.
- Pair with a comparison table (Lambda vs Workers) to the right if horizontal space allows. See element 12.
- The `FreeStripes` animation speed should scale with segment width: use `80s` for wide segments (>15%), `40s` for narrow.

---

### 12. Workers Benefit Grid + Lambda Comparison

A full-width 3×2 grid of Workers feature cards (icon + title + body) derived directly from workers.cloudflare.com product page. Pairs with the Wall Clock diagram and a Lambda comparison table for a complete "why Workers" slide.

**When to use:** Any slide explaining why to use Workers/Workflows over Lambda or other compute. Always use as a standalone slide (`SlideWorkers`) after a workflow slide. Do not embed inside a products slide.

```tsx
// SVG icons -- taken directly from workers.cloudflare.com source
function IconStopwatch() {
  return <svg width="20" height="20" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M28 22.1667V31.5001L33.8333 35.0001M28 11.6667C17.0463 11.6667 8.16666 20.5464 8.16666 31.5001C8.16666 42.4537 17.0463 51.3334 28 51.3334C38.9536 51.3334 47.8333 42.4537 47.8333 31.5001C47.8333 20.5464 38.9536 11.6667 28 11.6667ZM28 11.6667V4.66675M23.3333 4.66675H32.6667M47.4343 13.0482L43.9343 9.54818M8.5657 13.0482L12.0657 9.54818" />
  </svg>;
}
function IconGlobe() {
  return <svg width="20" height="20" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M35 5.73495C32.7903 5.04091 30.4388 4.66675 28 4.66675C15.1134 4.66675 4.66669 15.1134 4.66669 28.0001C4.66669 40.8867 15.1134 51.3334 28 51.3334C40.8867 51.3334 51.3334 40.8867 51.3334 28.0001C51.3334 23.9977 50.3256 20.2306 48.55 16.9388M39.6667 13.4167H39.6784M24.5001 51.0727L24.5004 45.9316C24.5004 45.6531 24.6 45.3838 24.7813 45.1724L30.5814 38.4054C31.0581 37.8492 30.9104 36.9966 30.2744 36.6332L23.6099 32.8248C23.4289 32.7213 23.2788 32.5712 23.1755 32.3901L18.8311 24.7769C18.605 24.3807 18.1687 24.1526 17.7143 24.193L4.81645 25.3418M49 14.0001C49 19.1547 44.3334 23.3334 39.6667 28.0001C35 23.3334 30.3334 19.1547 30.3334 14.0001C30.3334 8.84542 34.512 4.66675 39.6667 4.66675C44.8213 4.66675 49 8.84542 49 14.0001Z" />
  </svg>;
}
// ... IconClock, IconBarChart, IconScale, IconTerminal -- same pattern, use paths from workers.cloudflare.com

const BENEFITS = [
  { Icon: IconStopwatch, title: "Only pay for what you use",            body: "Pay only for execution time (CPU time), not idle time spent waiting on I/O." },
  { Icon: IconGlobe,     title: "Near your users, or your data",        body: "Deploy once, run in 330+ cities by default, or use Smart Placement to run near your data." },
  { Icon: IconClock,     title: "No cold starts",                       body: "Don't keep users waiting, or spend your time on prewarming rube-goldberg machines." },
  { Icon: IconBarChart,  title: "Infinite concurrency without the markup", body: "No pre-provisioned concurrency. Scale up on demand on your big launch days." },
  { Icon: IconScale,     title: "First-class local development",        body: "Fully test changes locally with workerd, Cloudflare's open-source runtime, before pushing." },
  { Icon: IconTerminal,  title: "Write in JS, TS, Python or Rust",      body: "Choose from a template in your language to kickstart building an app." },
];

// Benefit grid -- full width, 3x2, bordered with corner brackets
<motion.div className="relative w-full" style={{ border: "1px solid var(--cf-border)", borderRadius: 8 }}
  variants={stagger} initial="hidden" animate="show">
  {/* corner brackets */}
  <div className="grid grid-cols-3">
    {BENEFITS.map((b, i) => (
      <motion.div key={i} variants={fadeUp}
        className="flex flex-col items-start p-4 gap-1.5"
        style={{
          borderTop:  i >= 3        ? "1px solid var(--cf-border)" : "none",
          borderLeft: i % 3 !== 0   ? "1px solid var(--cf-border)" : "none",
        }}>
        <span style={{ color: "var(--cf-orange)", opacity: 0.8 }}><b.Icon /></span>
        <h6 className="font-medium text-xs" style={{ color: "var(--cf-text)" }}>{b.title}</h6>
        <p className="text-[11px]" style={{ color: "var(--cf-text-muted)" }}>{b.body}</p>
      </motion.div>
    ))}
  </div>
</motion.div>
```

**Lambda comparison table** -- always render to the right of `WallClockDiagram` in the bottom row:

```tsx
<div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 320, border: "1px solid var(--cf-border)" }}>
  <div className="grid grid-cols-2 text-center" style={{ borderBottom: "1px solid var(--cf-border)" }}>
    <div className="py-2 text-[10px] font-mono uppercase" style={{ color: "var(--cf-text-faint)", borderRight: "1px solid var(--cf-border)" }}>Lambda</div>
    <div className="py-2 text-[10px] font-mono uppercase" style={{ color: "var(--cf-orange)" }}>Workers</div>
  </div>
  {[
    { label: "Billing",    left: "Wall time",        right: "CPU time only"   },
    { label: "Cold start", left: "100ms – 1s+",      right: "None"            },
    { label: "Scale",      left: "Pre-provisioned",  right: "Instant, global" },
    { label: "Runtime",    left: "Node / container", right: "V8 isolates"     },
    { label: "Dev loop",   left: "SAM / Docker",     right: "wrangler dev"    },
  ].map((row, i, arr) => (
    <div key={i} className="grid grid-cols-2 text-center"
      style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--cf-border)" : "none" }}>
      <div className="py-2 px-2 text-[10px]" style={{ color: "var(--cf-text-muted)", borderRight: "1px solid var(--cf-border)" }}>
        <div className="font-mono text-[8px] uppercase mb-0.5" style={{ color: "var(--cf-text-faint)" }}>{row.label}</div>
        {row.left}
      </div>
      <div className="py-2 px-2 text-[10px] font-medium" style={{ color: "var(--cf-text)", background: "var(--cf-orange-light)" }}>
        <div className="font-mono text-[8px] uppercase mb-0.5" style={{ color: "var(--cf-orange)" }}>{row.label}</div>
        {row.right}
      </div>
    </div>
  ))}
</div>
```

**Full slide layout:**

```tsx
// SlideWorkers -- full slide combining heading, benefit grid, wall clock + comparison table
export function SlideWorkers() {
  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8 flex flex-col gap-4">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className="font-medium mb-1"
            style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--cf-text)", letterSpacing: "-0.03em" }}>
            Workflows are backed by Workers
          </h2>
          <p className="text-sm" style={{ color: "var(--cf-text-muted)", maxWidth: 560 }}>
            Every Workflow step runs on the same runtime as Workers -- which means you inherit everything Workers is built on.
          </p>
        </motion.div>

        {/* Benefit grid -- full width */}
        {/* ... see grid code above ... */}

        {/* Bottom row: wall clock (flex-1) + comparison table (fixed 320px) */}
        <motion.div className="w-full flex gap-4 items-stretch"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex-1"><WallClockDiagram /></div>
          {/* ... comparison table ... */}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

**Rules:**
- The benefit grid is always full-width. Never constrain it to a column.
- `WallClockDiagram` takes `flex-1` in the bottom row. The comparison table is `flex-shrink-0` at `width: 320px`.
- This slide stands alone -- do not merge it into a products slide or add it as a card. It needs the full slide real estate.
- The heading should always say "Workflows are backed by Workers" when following a `workflow` slide, or "Why Workers" when used standalone.
- Customise the comparison table left column to match the customer's actual stack (Lambda, Azure Functions, GCP Cloud Run, etc.).

---

### 13. AI Gateway Routing Diagram

An animated SVG diagram showing request flow from a customer app through AI Gateway to multiple LLM providers. Reverse-engineered from workers.cloudflare.com/product/ai-gateway. Paired with a 3-col feature card grid above it.

**When to use:** Any `ai-gateway` slide. Always used together with the 3-col feature card grid (below heading). The diagram fills the lower half of the slide.

**Layout structure (within SlideAIGateway):**
```
heading + eyebrow + subtitle
3-col feature grid (same corner-bracket bordered pattern as Workers benefit grid)
Animated SVG routing diagram (dot-grid bg, corner brackets)
```

**SVG layout (viewBox="0 0 900 210", maxHeight: 210):**
- **Left panel** (x=30, w=160): Customer app with 3 route rows. All rows identical style -- orange tint fill, orange border, orange text. Use `rgba(255,72,1,0.08)` fill and `var(--cf-orange-border)` stroke.
- **Center box** (x=330, w=160): AI Gateway -- dashed animated orange border (`animate-dash`), orange fill `rgba(255,72,1,0.06)`, two lines of sublabel text.
- **Right pills** (x=680, w=150): Provider pills stacked vertically. Primary pill: solid orange border `1.5px`. Fallback pill: dashed border. Cached response pill: plain border.
- **Text centering on pills**: Use `dominantBaseline="middle"` on both name and role text elements. Name text at `y = pillTop + pillHeight * 0.42`, role text at `y = pillTop + pillHeight * 0.78`.

**Paths:**
- App to gateway: dashed orange animated (`animate-dash`)
- Gateway to primary provider: **solid orange, strokeWidth 2** -- this is the hero line
- Gateway to fallback provider: dashed, `var(--cf-border)`, low opacity (0.45)
- Gateway to cached: dashed, `var(--cf-border)`, very low opacity (0.35)

**Traveling dots:** Use SVG `<animateMotion>` with `<mpath>` on the primary path and app-to-gateway path. Define paths in `<defs>` with IDs for reuse.

**Rules:**
- All route rows in the app panel must be styled the same -- never use an "inactive" style.
- Arrows point FROM gateway TO providers, never the reverse.
- The dot-grid background uses a separate absolute `<svg>` element behind the main diagram SVG (`z-0` vs `z-10`).
- Corner bracket squares: same `±5px` offset, `10×10px`, `var(--cf-bg-100)` fill, `var(--cf-border)` stroke, `borderRadius: 2`.

---

## Global Layout Rules

### Flexbox Scroll Pattern

Any component with a fixed-height container and variable-length content (code panels, description sidebars, resource lists, terminal output) **must** follow this pattern to enable scrolling:

```
Container (fixed height or constrained by parent)
  └── Flex column (min-h-0)          ← allows shrinking below content size
       ├── Header/tabs (flex-shrink-0) ← never collapses
       └── Scroll area (flex-1 min-h-0 overflow-y-auto) ← scrolls
```

**The three required classes on a scrollable flex child:**
1. `flex-1` -- fills remaining space
2. `min-h-0` -- overrides the default `min-height: auto` that prevents shrinking
3. `overflow-y-auto` (or `overflow-auto`) -- enables the scrollbar

**Common mistake:** Using `overflow-hidden` on the flex parent. This clips content but does NOT enable scrolling on children. Only use `overflow-hidden` on purely decorative containers (backgrounds, clipping SVG patterns). Never on containers that hold scrollable content.

**The outer container must have a deterministic height.** Use a fixed `height` (e.g., `height: 420px`) or be constrained by a parent with a known height. `minHeight` alone does NOT work -- it allows the container to grow to fit content, so children never overflow and never scroll.

This pattern applies to:
- `InteractiveCodePanel` (code area + description sidebar)
- `TerminalTypewriter` when embedded in a fixed-height panel
- Any split-panel layout with scrollable content on one or both sides
- Code slides where the snippet exceeds the visible area

---

### 13. V8 Isolates Architecture Diagram

A side-by-side animated comparison of traditional container/process architecture vs Workers V8 isolates. Directly mirrors the "How Workers Works" diagram on workers.cloudflare.com. The traditional side shows 4 separate process boxes (2x2 grid), each containing one code unit and its own process overhead. The Workers side shows a single process box containing 9 code units sharing one overhead instance. A legend on the right explains the icons.

All boxes use `animate-dash` (rotating dashed borders) and `animate-breathe` (subtle scale pulse) CSS classes for continuous motion matching the workers.cloudflare.com style.

**When to use:** Workers slides, "Why Workers" slides, any slide explaining the V8 isolate model vs traditional serverless. Pairs well with a live "Invoke Worker" demo button and the 3 key Workers selling points (zero cold starts, CPU time billing, deploy to region earth).

**Required CSS** (should already be in `src/styles.css` from the base catalog):
```css
@keyframes dash-rotate {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -16; }
}
@keyframes node-breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.02); }
}
.animate-dash { animation: dash-rotate 4s linear infinite; }
.animate-breathe { animation: node-breathe 3s ease-in-out infinite; transform-origin: 50% 50%; transform-box: fill-box; }
```

```tsx
/* ── Icon sub-components ── */
function IsolateCodeIcon({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 4} ${y - 4}L${x - 8} ${y}L${x - 4} ${y + 4}`} stroke="var(--cf-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${x - 1.5} ${y + 6}L${x + 1.5} ${y - 6}`} stroke="var(--cf-orange)" strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${x + 4} ${y - 4}L${x + 8} ${y}L${x + 4} ${y + 4}`} stroke="var(--cf-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function IsolateRepeatIcon({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x + 8} ${y - 4}C${x + 7.3} ${y - 5.5} ${x + 6.1} ${y - 6.8} ${x + 4.7} ${y - 7.6}C${x + 3.3} ${y - 8.5} ${x + 1.6} ${y - 9} ${x - 0.04} ${y - 9}C${x - 5} ${y - 9} ${x - 9} ${y - 5} ${x - 9} ${y}M${x - 8} ${y + 4}C${x - 7.3} ${y + 5.5} ${x - 6.1} ${y + 6.8} ${x - 4.7} ${y + 7.6}C${x - 3.3} ${y + 8.5} ${x - 1.6} ${y + 9} ${x + 0.04} ${y + 9}C${x + 5} ${y + 9} ${x + 9} ${y + 5} ${x + 9} ${y}M${x - 3.3} ${y + 4}C${x - 5.7} ${y + 4} ${x - 8} ${y + 4} ${x - 8} ${y + 4}V${y + 8.7}M${x + 8} ${y - 8.7}V${y - 4}H${x + 3.3}`}
      stroke="var(--cf-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
  );
}

/* ── Main diagram ── */
function IsolatesArchitectureDiagram() {
  const cellSize = 52;
  const gap = 4;
  const processSize = cellSize * 2 + gap;
  const W = processSize * 2 + gap * 3;
  const H = processSize * 2 + gap * 3;

  return (
    <div className="flex items-end justify-center" style={{ gap: 48 }}>
      {/* Traditional: 2x2 grid of process boxes */}
      <div className="flex flex-col items-center" style={{ gap: 12 }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          {[0, 1, 2, 3].map((idx) => {
            const row = Math.floor(idx / 2);
            const col = idx % 2;
            const bx = col * (processSize + gap) + gap;
            const by = row * (processSize + gap) + gap;
            return (
              <g key={idx} className="animate-breathe">
                <rect x={bx} y={by} width={processSize} height={processSize} rx={4}
                  fill="var(--cf-orange)" fillOpacity={0.05} />
                <rect x={bx + 0.5} y={by + 0.5} width={processSize - 1} height={processSize - 1} rx={3.5}
                  stroke="var(--cf-orange)" strokeOpacity={0.15} />
                {/* Code icon box */}
                <rect x={bx + 4} y={by + 4} width={cellSize - 8} height={cellSize - 8} rx={4}
                  fill="var(--cf-bg-200)" />
                <rect x={bx + 4} y={by + 4} width={cellSize - 8} height={cellSize - 8} rx={4}
                  stroke="var(--cf-orange)" strokeWidth={1.5} strokeLinecap="round"
                  strokeDasharray="1 4" className="animate-dash" />
                <IsolateCodeIcon x={bx + cellSize / 2} y={by + cellSize / 2} />
                {/* Process overhead icon */}
                <circle cx={bx + processSize - cellSize / 2} cy={by + processSize - cellSize / 2}
                  r={cellSize / 2 - 4} fill="var(--cf-bg-200)" />
                <circle cx={bx + processSize - cellSize / 2} cy={by + processSize - cellSize / 2}
                  r={cellSize / 2 - 4} fill="none" stroke="var(--cf-orange)" strokeOpacity={0.15} />
                <IsolateRepeatIcon x={bx + processSize - cellSize / 2} y={by + processSize - cellSize / 2} />
              </g>
            );
          })}
        </svg>
        <span className="font-mono text-sm" style={{ color: "var(--cf-orange)" }}>
          Traditional architecture
        </span>
      </div>

      {/* Workers: single process, 9 code units, 1 overhead */}
      <div className="flex flex-col items-center" style={{ gap: 12 }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <g className="animate-breathe">
            <rect x={gap} y={gap} width={W - gap * 2} height={H - gap * 2} rx={4}
              fill="var(--cf-orange)" fillOpacity={0.05} />
            <rect x={gap + 0.5} y={gap + 0.5} width={W - gap * 2 - 1} height={H - gap * 2 - 1} rx={3.5}
              stroke="var(--cf-orange)" strokeOpacity={0.15} />
          </g>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const cx = gap + 8 + col * cellSize + cellSize / 2;
            const cy = gap + 8 + row * cellSize + cellSize / 2;
            return (
              <g key={idx}>
                <rect x={cx - cellSize / 2 + 4} y={cy - cellSize / 2 + 4}
                  width={cellSize - 8} height={cellSize - 8} rx={4} fill="var(--cf-bg-200)" />
                <rect x={cx - cellSize / 2 + 4} y={cy - cellSize / 2 + 4}
                  width={cellSize - 8} height={cellSize - 8} rx={4}
                  stroke="var(--cf-orange)" strokeWidth={1.5} strokeLinecap="round"
                  strokeDasharray="1 4" className="animate-dash" />
                <IsolateCodeIcon x={cx} y={cy} />
              </g>
            );
          })}
          <circle cx={W - gap - 30} cy={H - gap - 30} r={20} fill="var(--cf-bg-200)" />
          <circle cx={W - gap - 30} cy={H - gap - 30} r={20} fill="none"
            stroke="var(--cf-orange)" strokeOpacity={0.15} />
          <IsolateRepeatIcon x={W - gap - 30} y={H - gap - 30} />
        </svg>
        <span className="font-mono text-sm" style={{ color: "var(--cf-orange)" }}>
          Workers V8 isolates
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-col" style={{ gap: 12, paddingBottom: 28 }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
            <rect x={2} y={2} width={36} height={36} rx={4} fill="var(--cf-bg-200)" />
            <rect x={2} y={2} width={36} height={36} rx={4} stroke="var(--cf-orange)"
              strokeWidth={1.5} strokeLinecap="round" strokeDasharray="1 4" className="animate-dash" />
            <IsolateCodeIcon x={20} y={20} />
          </svg>
          <span className="font-mono text-sm" style={{ color: "var(--cf-orange)" }}>User code</span>
        </div>
        <div className="flex items-center" style={{ gap: 10 }}>
          <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
            <circle cx={20} cy={20} r={16} fill="var(--cf-bg-200)" />
            <circle cx={20} cy={20} r={16} fill="none" stroke="var(--cf-orange)" strokeOpacity={0.15} />
            <IsolateRepeatIcon x={20} y={20} />
          </svg>
          <span className="font-mono text-sm" style={{ color: "var(--cf-orange)" }}>Process overhead</span>
        </div>
      </div>
    </div>
  );
}
```

**Rules:**
- All code icon boxes MUST use `className="animate-dash"` for the rotating dashed border. Without it the diagram looks static and dead.
- Process container groups MUST use `className="animate-breathe"` for the subtle scale pulse.
- Traditional side: 4 separate `<g className="animate-breathe">` groups (one per process). Workers side: single `<g className="animate-breathe">` wrapping the outer rect.
- The code icon (`<> </>` brackets) and repeat icon (circular arrows) are extracted as reusable sub-components (`IsolateCodeIcon`, `IsolateRepeatIcon`) that take `x, y` center coordinates.
- Repeat icon circles need both a `fill` circle and a separate `stroke`-only circle at `strokeOpacity={0.15}` for the subtle ring effect.
- Pairs well with a `LiveWorkerDemo` component that calls a real Worker endpoint and displays round-trip latency + colo location.

---

## Combining Dynamic Elements

Good slide compositions:

| Slide type      | Recommended dynamic element(s)                            |
|-----------------|----------------------------------------------------------|
| Title           | `Globe3D` (Three.js, full-bleed bg) or `SpikeChart` / `BotTrafficFlow` + `InfiniteTickerStrip` (bottom) |
| Recap           | `RevealOnMount` on heading + topic pills                 |
| Products        | `RevealOnMount` stagger on product cards                 |
| Architecture    | `NetworkGraph` (animated SVG diagram) or `GlobeFlowDiagram` (for multi-hop with globe feel). Use `EdgeNetworkPattern` as bg for distributed/edge architectures. |
| Code            | `InteractiveCodePanel` for multi-example slides, `TerminalTypewriter` for CLI/deploy flows, `CodeBlock` with `HighlightedCode` for single snippets |
| AI Gateway      | `SlideAIGateway` -- 3-col feature grid (element 13) + animated SVG routing diagram. Always pair with `SlideAIGatewayCode` on the next slide. |
| AI Gateway Code | `SlideAIGatewayCode` -- feature pills + full-height dark code editor with `rate-models.ts` / `route-config.json` tabs. Takeaway: routes are JSON, no redeploys. |
| Workflow        | `SlideWorkflow` with `WorkflowDiagram` — diagram column shows on the overview tab, collapses on detail tabs. Use variant toggle for "Workers AI vs External API" comparisons. Always add feature pills (step-based execution, zero-config state, event-driven) below the heading. |
| Workers / Why Workers | `IsolatesArchitectureDiagram` (element 13) side-by-side with 3 feature cards (zero cold starts, CPU billing, region earth). Add `LiveWorkerDemo` bar at the bottom. Optionally add `WorkersBenefitGrid` (element 12) + `WallClockDiagram` (element 11) + Lambda comparison table if the customer comes from a Lambda/serverless background. |
| How It Works    | `GlobeFlowDiagram` with speed legend, pulse rings on the user/client node |
| Next Steps      | `RevealOnMount` stagger on action items                  |
| Contact         | `InfiniteTickerStrip` (bottom) + hero shine-in + `EdgeNetworkPattern` (bg) |
