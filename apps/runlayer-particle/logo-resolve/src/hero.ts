// ════════════════════════════════════════════════════════════════════════════
// Runlayer hero — in-situ scaffolding (UI only).
// Styles the page, hides dev controls by default, wires `~` toggle, unified
// hero-mode tabs, and architectural line-burst motion. main.ts owns the particle orb.
// ════════════════════════════════════════════════════════════════════════════

import "./hero.css";
import { initArchMotion, stopArchMotion } from "./hero-arch-motion";

export type HeroMode = "lines" | "lines-dense" | "logo-converge" | "logo-sweep" | "logo-flow";
type HeroStyle = "particles" | "architectural";

const MODE_PULSE: Record<HeroMode, number | null> = {
  lines: null,
  "lines-dense": null,
  "logo-converge": 0,
  "logo-sweep": 1,
  "logo-flow": 2,
};

function modeToStyle(mode: HeroMode): HeroStyle {
  return mode === "lines" || mode === "lines-dense" ? "architectural" : "particles";
}

let currentHeroMode: HeroMode | "" = "";

document.body.classList.add("dev-hidden");

addEventListener("keydown", (event) => {
  if (event.key === "`" || event.key === "~") {
    document.body.classList.toggle("dev-hidden");
  }
});

document.querySelectorAll<HTMLFormElement>(".hero-demo-form").forEach((form) => {
  form.addEventListener("submit", (event) => event.preventDefault());
});

const modeTabs = document.querySelector<HTMLElement>(".hero-mode-tabs");

function setHeroMode(mode: HeroMode) {
  if (mode === currentHeroMode) return;

  currentHeroMode = mode;
  const style = modeToStyle(mode);
  document.body.setAttribute("data-hero-mode", mode);

  const archEl = document.querySelector<HTMLElement>(".hero-architectural");
  if (archEl) archEl.hidden = style !== "architectural";

  modeTabs
    ?.querySelectorAll<HTMLButtonElement>("button[data-hero-mode]")
    .forEach((button) => {
      button.classList.toggle("is-active", button.dataset.heroMode === mode);
    });

  document.dispatchEvent(
    new CustomEvent("hero-mode-change", {
      detail: { mode, style, pulseMode: MODE_PULSE[mode] },
    })
  );

  if (style === "architectural") {
    void initArchMotion(mode === "lines-dense" ? "dense" : "sparse");
  } else {
    stopArchMotion();
  }
}

document.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
    ".hero-mode-tabs button[data-hero-mode]"
  );
  if (!button) return;
  setHeroMode((button.dataset.heroMode ?? "lines") as HeroMode);
});

setHeroMode("lines");
