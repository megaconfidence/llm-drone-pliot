// Data model for "LLM Is Now the Drone Pilot" deck.
// Each slide is a discriminated union member -- the `type` field maps to a component.

export interface DeckMeta {
  talkTitle: string;
  subtitle: string;
  event: string;
  presenter: string;
  presenterHandle: string;
}

export interface DeckContent {
  meta: DeckMeta;
  slides: SlideContent[];
}

// All 22 slide variants
export type SlideContent =
  | TitleSlide
  | DroneRevealSlide
  | PremiseSlide
  | ProgressionSlide
  | CapabilitiesSlide
  | PositiveFrameSlide
  | ContrastSlide
  | DemoGoalSlide
  | LiveDemoSlide
  | DemoRecapSlide
  | ArchitectureSlide
  | QuoteSlide
  | ResponsibilitiesSlide
  | ToolVocabularySlide
  | ApprovalSlide
  | LedgerSlide
  | PatternSlide
  | BenefitsSlide
  | UseCasesSlide
  | BuildWeekendSlide
  | ClosingSlide;

// 1. Title
export interface TitleSlide {
  type: "title";
  title: string;
  subtitle: string;
  event: string;
  presenter: string;
  presenterRole: string;
  ticker: string[];
}

// 2. Drone Reveal
export interface DroneRevealSlide {
  type: "drone-reveal";
  eyebrow: string;
  heading: string;
  supporting: string[];
  labels: string[];
}

// 3. Premise
export interface PremiseSlide {
  type: "premise";
  heading: string;
  body: string;
  cards: { label: string; description: string }[];
}

// 4. Chatbot -> Agent progression
export interface ProgressionSlide {
  type: "progression";
  eyebrow: string;
  heading: string;
  stages: { label: string; description: string }[];
}

// 5. Capabilities
export interface CapabilitiesSlide {
  type: "capabilities";
  heading: string;
  capabilities: { label: string; description: string }[];
  loop: string[]; // observe -> reason -> act -> remember
  closing: string;
}

// 6. Positive frame
export interface PositiveFrameSlide {
  type: "positive-frame";
  heading: string;
  body: string;
  cards: { label: string; description: string }[];
  highlight: string;
}

// 7. Screens -> scenes contrast
export interface ContrastSlide {
  type: "contrast";
  eyebrow: string;
  heading: string;
  leftHeader: string;
  rightHeader: string;
  rows: { left: string; right: string }[];
  caption: string;
}

// 8. Demo goal
export interface DemoGoalSlide {
  type: "demo-goal";
  heading: string;
  prompt: string;
  steps: string[];
}

// 9. Live demo
export interface LiveDemoSlide {
  type: "live-demo";
  heading: string;
  commands: string[];
  telemetry: { label: string; value: string }[];
  states: string[]; // pill state options
}

// 10. What just happened
export interface DemoRecapSlide {
  type: "demo-recap";
  heading: string;
  summary: string;
  tags: string[];
}

// 11. Architecture
export interface ArchitectureSlide {
  type: "architecture";
  heading: string;
  body: string;
  zones: {
    cloud: { label: string; nodes: ArchNode[] };
    local: { label: string; nodes: ArchNode[] };
  };
  client: ArchNode; // The audience prompt / UI
  drone: ArchNode; // Endpoint
  links: { label: string; from: string; to: string }[];
}

export interface ArchNode {
  id: string;
  label: string;
  sublabels?: string[];
  isCloudflare?: boolean;
}

// 12. Quote
export interface QuoteSlide {
  type: "quote";
  eyebrow: string;
  quote: string;
  supporting: string;
  small?: string;
}

// 13. Responsibilities
export interface ResponsibilitiesSlide {
  type: "responsibilities";
  heading: string;
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}

// 14. Tool vocabulary
export interface ToolVocabularySlide {
  type: "tool-vocabulary";
  heading: string;
  body: string;
  code: string;
  rules: string[];
  caption: string;
}

// 15. Approval
export interface ApprovalSlide {
  type: "approval";
  heading: string;
  plan: string[];
  buttons: string[];
  supporting: string;
}

// 16. Command Ledger
export interface LedgerSlide {
  type: "ledger";
  heading: string;
  ledger: { time: string; event: string }[];
  telemetry: { label: string; value: string }[];
  closing: string;
}

// 17. Reusable pattern
export interface PatternSlide {
  type: "pattern";
  eyebrow: string;
  heading: string;
  loop: { label: string; description: string }[];
  formula: string;
  environments: string[];
}

// 18. Why useful
export interface BenefitsSlide {
  type: "benefits";
  heading: string;
  cards: { label: string; description: string }[];
}

// 19/20. Use cases (two variants, same shape)
export interface UseCasesSlide {
  type: "use-cases";
  eyebrow?: string;
  heading: string;
  cards: { label: string; description: string }[];
  safetyRail?: string[];
  safetyLine?: string;
}

// 21. Build this weekend
export interface BuildWeekendSlide {
  type: "build-weekend";
  eyebrow: string;
  heading: string;
  blocks: { label: string; description: string }[];
  closing: string;
}

// 22. Closing
export interface ClosingSlide {
  type: "closing";
  headline: string;
  supporting: string;
  paragraph: string;
  presenter: string;
  event: string;
  ticker: string[];
}
