import type { SlideContent, DeckMeta } from "../data/types";
import { SlideTitle } from "./slides/SlideTitle";
import { SlideDroneReveal } from "./slides/SlideDroneReveal";
import { SlidePremise } from "./slides/SlidePremise";
import { SlideProgression } from "./slides/SlideProgression";
import { SlideCapabilities } from "./slides/SlideCapabilities";
import { SlidePositiveFrame } from "./slides/SlidePositiveFrame";
import { SlideContrast } from "./slides/SlideContrast";
import { SlideDemoGoal } from "./slides/SlideDemoGoal";
import { SlideLiveDemo } from "./slides/SlideLiveDemo";
import { SlideDemoRecap } from "./slides/SlideDemoRecap";
import { SlideArchitecture } from "./slides/SlideArchitecture";
import { SlideQuote } from "./slides/SlideQuote";
import { SlideResponsibilities } from "./slides/SlideResponsibilities";
import { SlideToolVocabulary } from "./slides/SlideToolVocabulary";
import { SlideApproval } from "./slides/SlideApproval";
import { SlideLedger } from "./slides/SlideLedger";
import { SlidePattern } from "./slides/SlidePattern";
import { SlideBenefits } from "./slides/SlideBenefits";
import { SlideUseCases } from "./slides/SlideUseCases";
import { SlideBuildWeekend } from "./slides/SlideBuildWeekend";
import { SlideClosing } from "./slides/SlideClosing";

export function SlideRenderer({
  slide,
  meta,
  step = 0,
}: {
  slide: SlideContent;
  meta: DeckMeta;
  step?: number;
}) {
  switch (slide.type) {
    case "title":
      return <SlideTitle slide={slide} />;
    case "drone-reveal":
      return <SlideDroneReveal slide={slide} />;
    case "premise":
      return <SlidePremise slide={slide} />;
    case "progression":
      return <SlideProgression slide={slide} />;
    case "capabilities":
      return <SlideCapabilities slide={slide} />;
    case "positive-frame":
      return <SlidePositiveFrame slide={slide} />;
    case "contrast":
      return <SlideContrast slide={slide} />;
    case "demo-goal":
      return <SlideDemoGoal slide={slide} />;
    case "live-demo":
      return <SlideLiveDemo slide={slide} />;
    case "demo-recap":
      return <SlideDemoRecap slide={slide} />;
    case "architecture":
      return <SlideArchitecture slide={slide} step={step} />;
    case "quote":
      return <SlideQuote slide={slide} />;
    case "responsibilities":
      return <SlideResponsibilities slide={slide} />;
    case "tool-vocabulary":
      return <SlideToolVocabulary slide={slide} />;
    case "approval":
      return <SlideApproval slide={slide} />;
    case "ledger":
      return <SlideLedger slide={slide} />;
    case "pattern":
      return <SlidePattern slide={slide} />;
    case "benefits":
      return <SlideBenefits slide={slide} />;
    case "use-cases":
      return <SlideUseCases slide={slide} />;
    case "build-weekend":
      return <SlideBuildWeekend slide={slide} />;
    case "closing":
      return <SlideClosing slide={slide} />;
    default: {
      // Exhaustiveness check
      const _exhaustive: never = slide;
      void _exhaustive;
      void meta;
      return null;
    }
  }
}
