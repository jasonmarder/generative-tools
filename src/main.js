import "./styles.css";

const tools = [
  { slug: "chainguard-block", label: "Chainguard block" },
  { slug: "fortastra-rings", label: "Fortastra rings" },
  { slug: "gradient-isometric", label: "Gradient isometric" },
  { slug: "groq-circuit", label: "Groq circuit" },
  { slug: "groq-circle-shader", label: "Groq circle shader" },
  { slug: "runlayer-hero", label: "Runlayer hero" },
  { slug: "runlayer-particle", label: "Runlayer particle" },
  { slug: "tachyon-burst", label: "Tachyon burst" },
];

const dock = document.querySelector(".dock");
const trigger = document.querySelector("#dock-trigger");
const menu = document.querySelector("#tool-menu");
const currentLabel = document.querySelector("#dock-current");
const dockStatus = document.querySelector(".dock-status");
const scrim = document.querySelector("#stage-scrim");
const frameA = document.querySelector("#tool-frame-a");
const frameB = document.querySelector("#tool-frame-b");
const announcement = document.querySelector("#tool-announcement");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const appBaseUrl = new URL(import.meta.url);
appBaseUrl.pathname = appBaseUrl.pathname.replace(/\/[^/]+\/[^/]+$/, "/");
appBaseUrl.search = "";
appBaseUrl.hash = "";

// Mirrors the CSS custom properties in styles.css — kept numeric here so the
// orchestrator can schedule timers/rAFs against the exact same durations the
// stylesheet animates with (same idiom as the old 95ms leave timer).
const CROSSFADE_MS = 240; // mirrors --tool-crossfade-duration
const LOAD_FALLBACK_MS = 4000; // mirrors --tool-load-fallback

let activeIndex = getInitialIndex();
let menuOpen = false;

// Two-iframe buffer: `activeFrame` is visible + interactive, `bufferFrame`
// is hidden/inert and either idle (about:blank) or loading the next tool.
let activeFrame = frameA;
let bufferFrame = frameB;
let booted = false;
let bootTarget = "";
let pendingTarget = ""; // URL the buffer frame is currently loading toward ("" = idle)
// "" | "loading" | "revealing" — makes the load→crossfade trigger idempotent
// per gesture. Session-history traversal can re-navigate the buffer frame to
// the exact URL it's already loading, firing a second 'load' event; without
// this, that second event would re-enter crossfadeIn and arm a second commit
// timer alongside the first.
let pendingPhase = "";
let pendingMotionOK = true; // whether the in-flight switch should crossfade or snap instantly
let switchToken = 0; // increments per switch gesture; guards async continuations
let fallbackTimer = 0;
let commitTimer = 0;
let settleFrame1 = 0;
let settleFrame2 = 0;
let bootFrame1 = 0;
let bootFrame2 = 0;

menu.innerHTML = tools
  .map(
    (tool, index) => `
      <a
        class="dock-option"
        href="${getSelectionUrl(index)}"
        role="menuitemradio"
        aria-checked="false"
        data-index="${index}"
        style="--item-index: ${index}"
      >
        <span class="option-dot" aria-hidden="true"></span>
        <span class="option-label">${tool.label}</span>
        <span class="option-check" aria-hidden="true">
          <svg viewBox="0 0 14 14" focusable="false">
            <path d="m3.25 7.15 2.35 2.35 5.15-5.15" />
          </svg>
        </span>
      </a>
    `,
  )
  .join("");

const options = [...menu.querySelectorAll(".dock-option")];

function getInitialIndex() {
  const slug = new URLSearchParams(window.location.search).get("tool");
  const index = tools.findIndex((tool) => tool.slug === slug);
  return index >= 0 ? index : 0;
}

function getToolUrl(index) {
  return new URL(`tools/${tools[index].slug}/index.html`, appBaseUrl).href;
}

function getSelectionUrl(index) {
  const url = new URL(window.location.href);
  url.searchParams.set("tool", tools[index].slug);
  return url.href;
}

function updateSelection(index, announce = false) {
  activeIndex = index;
  const tool = tools[index];

  currentLabel.textContent = tool.label;
  document.title = `${tool.label} — Generative Tools`;

  options.forEach((option, optionIndex) => {
    option.setAttribute("aria-checked", String(optionIndex === index));
  });

  if (announce) {
    announcement.textContent = `${tool.label} loaded`;
  }
}

function setInstant(callback) {
  dock.dataset.instant = "true";
  callback();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dock.dataset.instant = "false";
    });
  });
}

function setMenuOpen(nextOpen, { instant = false, focusOption = true, returnFocus = false } = {}) {
  const apply = () => {
    menuOpen = nextOpen;
    dock.dataset.open = String(nextOpen);
    trigger.setAttribute("aria-expanded", String(nextOpen));
    menu.setAttribute("aria-hidden", String(!nextOpen));
    menu.toggleAttribute("inert", !nextOpen);

    // The stage scrim only needs to exist while the menu is open — see its
    // styles.css comment. `hidden` (not just pointer-events) so it's also
    // fully out of the a11y/hit-testing tree the instant the menu shuts.
    scrim.hidden = !nextOpen;

    if (nextOpen && focusOption) {
      requestAnimationFrame(() => options[activeIndex].focus({ preventScroll: true }));
    } else if (!nextOpen && returnFocus) {
      trigger.focus({ preventScroll: true });
    }
  };

  if (instant) setInstant(apply);
  else apply();
}

function applyRoles() {
  activeFrame.style.zIndex = "1";
  bufferFrame.style.zIndex = "2"; // buffer stacks above active so it can crossfade in on top
}

// Navigate a frame WITHOUT adding a joint-session-history entry. Setting
// .src on an iframe past its first navigation splices a new entry into the
// top-level window's back/forward history; location.replace() never does.
// Because .src (the attribute reflection) does not update after a
// location.replace() navigation, we track the "current/expected" URL
// ourselves via a dataset expando — every load-guard below reads THIS,
// never frameEl.src.
function navigateFrame(frameEl, url) {
  frameEl.dataset.loadTarget = url;
  frameEl.contentWindow.location.replace(url);
}

// Resets any in-flight switch so the buffer frame is free to reuse. Safe to
// call at any point in the gesture (loading, settling, or mid-crossfade) —
// the buffer frame is never visible/interactive until crossfadeIn commits,
// so snapping it back to the hidden/inert resting state is never seen.
function cancelPendingSwitch() {
  switchToken += 1;
  window.clearTimeout(fallbackTimer);
  window.clearTimeout(commitTimer);
  cancelAnimationFrame(settleFrame1);
  cancelAnimationFrame(settleFrame2);
  fallbackTimer = commitTimer = settleFrame1 = settleFrame2 = 0;
  dockStatus.classList.remove("is-loading", "is-loading-static");

  if (pendingTarget) {
    bufferFrame.classList.remove("is-transitioning");
    bufferFrame.classList.add("is-buffer");
    bufferFrame.toggleAttribute("inert", true);
    navigateFrame(bufferFrame, "about:blank"); // abort the in-flight load, leave-no-trace
    pendingTarget = "";
    pendingPhase = "";
  }
}

function beginBufferedLoad(index, animate) {
  const target = getToolUrl(index);
  cancelPendingSwitch();

  pendingTarget = target;
  pendingPhase = "loading";
  pendingMotionOK = animate && !reduceMotion.matches;
  const token = switchToken;

  bufferFrame.title = tools[index].label;
  dockStatus.classList.add(pendingMotionOK ? "is-loading" : "is-loading-static");
  navigateFrame(bufferFrame, target);

  fallbackTimer = window.setTimeout(() => crossfadeIn(token), LOAD_FALLBACK_MS);
}

function crossfadeIn(token) {
  // Idempotent per gesture: bail if superseded (token) or already revealed
  // (phase) — the latter is what defuses a duplicate 'load' event (e.g. from
  // history-traversal re-navigating the buffer frame to the same URL) firing
  // this a second time and arming a second, orphaned commit timer.
  if (token !== switchToken || pendingPhase !== "loading") return;
  pendingPhase = "revealing";

  window.clearTimeout(fallbackTimer);
  fallbackTimer = 0;
  dockStatus.classList.remove("is-loading", "is-loading-static");

  // Interactive exactly when the crossfade starts — it's loaded, so this is
  // the moment the user should be able to reach it.
  bufferFrame.toggleAttribute("inert", false);

  if (!pendingMotionOK) {
    bufferFrame.classList.remove("is-buffer");
    finishSwitch(token);
    return;
  }

  bufferFrame.classList.add("is-transitioning");
  settleFrame1 = requestAnimationFrame(() => {
    settleFrame2 = requestAnimationFrame(() => {
      if (token !== switchToken) return;
      bufferFrame.classList.remove("is-buffer");
      commitTimer = window.setTimeout(() => finishSwitch(token), CROSSFADE_MS);
    });
  });
}

function finishSwitch(token) {
  if (token !== switchToken) return;

  // Consume this gesture's token immediately: if a duplicate commit timer
  // from the same gesture is also live (see crossfadeIn's phase guard for
  // how that can happen via history-traversal re-navigation), it captured
  // this same token value and must bail when it fires — otherwise it would
  // run finishSwitch a second time against already-swapped roles and retire
  // the wrong (newly active) frame, blanking the stage.
  switchToken += 1;

  // A real switch has now committed, so the boot frame's own first-load path
  // (which only ever applies once, to whichever frame was active at startup)
  // is moot from here on — belt-and-suspenders against a late/aborted boot
  // 'load' event trying to run promoteFirstLoad after the fact.
  booted = true;

  const finished = bufferFrame;
  const retired = activeFrame;

  finished.classList.remove("is-transitioning");

  // Leave-no-trace: free the outgoing tool's WebGL/CPU and reset it back to
  // the resting buffer state so it's ready to be reused for the next switch.
  // location.replace (not .src=) so retiring a frame never adds a history entry.
  navigateFrame(retired, "about:blank");
  retired.classList.remove("is-transitioning", "is-first-load");
  retired.classList.add("is-buffer");
  retired.toggleAttribute("inert", true);

  activeFrame = finished;
  bufferFrame = retired;
  applyRoles();

  pendingTarget = "";
  pendingPhase = "";
  commitTimer = 0;
}

function promoteFirstLoad() {
  booted = true;
  dockStatus.classList.remove("is-loading", "is-loading-static");
  activeFrame.toggleAttribute("inert", false);

  if (reduceMotion.matches) {
    activeFrame.classList.remove("is-buffer");
    return;
  }

  activeFrame.classList.add("is-first-load");
  bootFrame1 = requestAnimationFrame(() => {
    bootFrame2 = requestAnimationFrame(() => {
      activeFrame.classList.remove("is-buffer");
    });
  });
}

function handleFrameLoad(frameEl) {
  if (frameEl === activeFrame) {
    if (!booted && frameEl.dataset.loadTarget === bootTarget) promoteFirstLoad();
    return;
  }

  // frameEl is the buffer frame — only act if this load matches what we're
  // actually waiting for AND we haven't already started revealing it. The
  // phase check specifically guards against session-history traversal
  // re-navigating this frame to the same URL mid-gesture, which fires a
  // second 'load' event for a target we've already begun crossfading in.
  if (!pendingTarget || pendingPhase !== "loading" || frameEl.dataset.loadTarget !== pendingTarget) return;
  crossfadeIn(switchToken);
}

function selectTool(index, { animate = true, historyMode = "push", announce = true } = {}) {
  const target = getToolUrl(index);

  if (target === pendingTarget) return; // already loading this exact target into the buffer

  const alreadyActive = index === activeIndex && activeFrame.dataset.loadTarget === target;
  if (alreadyActive && !pendingTarget) return;

  updateSelection(index, announce);

  if (historyMode !== "none") {
    const url = new URL(window.location.href);
    url.searchParams.set("tool", tools[index].slug);
    window.history[`${historyMode}State`]({ tool: tools[index].slug }, "", url);
  }

  if (alreadyActive) {
    // Re-selected the tool that's already showing while a *different*
    // switch was in flight (target !== pendingTarget, checked above) —
    // cancel the stale switch and stay put. Never crossfade to a tool the
    // user just backed away from.
    cancelPendingSwitch();
    return;
  }

  beginBufferedLoad(index, animate);
}

function moveFocus(direction) {
  const focusedIndex = options.indexOf(document.activeElement);
  const origin = focusedIndex >= 0 ? focusedIndex : activeIndex;
  const nextIndex = (origin + direction + options.length) % options.length;
  options[nextIndex].focus({ preventScroll: true });
}

trigger.addEventListener("click", (event) => {
  const keyboardInitiated = event.detail === 0;
  setMenuOpen(!menuOpen, {
    instant: keyboardInitiated,
    focusOption: true,
    returnFocus: !menuOpen,
  });
});

trigger.addEventListener("keydown", (event) => {
  if (!["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) return;

  event.preventDefault();
  setMenuOpen(true, { instant: true, focusOption: true });

  if (event.key === "ArrowUp") {
    requestAnimationFrame(() => options.at(-1).focus({ preventScroll: true }));
  }
});

menu.addEventListener("click", (event) => {
  const option = event.target instanceof Element ? event.target.closest(".dock-option") : null;
  if (!option) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();

  const keyboardInitiated = event.detail === 0;
  // Stage motion (crossfade) is gated on prefers-reduced-motion only — input
  // modality must not decide it, or keyboard users get a jarring hard cut.
  selectTool(Number(option.dataset.index));
  setMenuOpen(false, { instant: keyboardInitiated, returnFocus: true });
});

menu.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    moveFocus(event.key === "ArrowDown" ? 1 : -1);
    return;
  }

  if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    const index = event.key === "Home" ? 0 : options.length - 1;
    options[index].focus({ preventScroll: true });
  }
});

// Escape closes the menu whenever it's open, regardless of where focus is —
// not just when focus happens to be inside the menu itself.
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !menuOpen) return;

  event.preventDefault();
  const focusWasInDock = dock.contains(document.activeElement);
  setMenuOpen(false, { instant: true, returnFocus: focusWasInDock });
});

document.addEventListener("pointerdown", (event) => {
  if (menuOpen && !dock.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener("focusin", (event) => {
  if (menuOpen && !dock.contains(event.target)) {
    setMenuOpen(false, { instant: true });
  }
});

window.addEventListener("popstate", () => {
  const index = getInitialIndex();
  if (index !== activeIndex) {
    selectTool(index, { historyMode: "none" });
  }
});

frameA.addEventListener("load", () => handleFrameLoad(frameA));
frameB.addEventListener("load", () => handleFrameLoad(frameB));

updateSelection(activeIndex);
menu.toggleAttribute("inert", true);
applyRoles();

// The boot frame's first-ever navigation is exempt from the history-entry
// problem: per spec, a fresh iframe's initial navigation replaces its
// automatic blank entry rather than adding a joint-session-history entry,
// so plain .src= is safe here (and simpler than contentWindow.location for
// a frame whose contentWindow has no prior navigation to be undone).
bootTarget = getToolUrl(activeIndex);
activeFrame.title = tools[activeIndex].label;
activeFrame.dataset.loadTarget = bootTarget;
dockStatus.classList.add(reduceMotion.matches ? "is-loading-static" : "is-loading");
activeFrame.src = bootTarget;
