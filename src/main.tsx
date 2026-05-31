import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Presentation } from "./components/Presentation";
import { deckContent } from "./data/deck-content";

const root = document.getElementById("root");
if (!root) throw new Error("No root element");

createRoot(root).render(
  <StrictMode>
    <Presentation content={deckContent} />
  </StrictMode>,
);
