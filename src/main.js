import "./styles.css";

const tools = [
  { slug: "chainguard-block", label: "chainguard block" },
  { slug: "fortastra-rings", label: "fortastra rings" },
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
const frame = document.querySelector("#tool-frame");
const announcement = document.querySelector("#tool-announcement");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeIndex = getInitialIndex();
let menuOpen = false;
let switchTimer = 0;
let frameTarget = "";

menu.innerHTML = tools
  .map(
    (tool, index) => `
      <button
        class="dock-option"
        type="button"
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
      </button>
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
  return new URL(`./tools/${tools[index].slug}/index.html`, window.location.href).href;
}

function updateSelection(index, announce = false) {
  activeIndex = index;
  const tool = tools[index];

  currentLabel.textContent = tool.label;
  frame.title = tool.label;
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
    menu.inert = !nextOpen;

    if (nextOpen && focusOption) {
      requestAnimationFrame(() => options[activeIndex].focus({ preventScroll: true }));
    } else if (!nextOpen && returnFocus) {
      trigger.focus({ preventScroll: true });
    }
  };

  if (instant) setInstant(apply);
  else apply();
}

function loadFrame(index, animate) {
  const target = getToolUrl(index);
  frameTarget = target;
  frame.classList.remove("is-leaving");

  if (animate && !reduceMotion.matches) {
    frame.classList.add("is-arriving");
  } else {
    frame.classList.remove("is-arriving");
  }

  frame.src = target;
}

function selectTool(index, { animate = true, historyMode = "push", announce = true } = {}) {
  if (index === activeIndex && frame.src) return;

  window.clearTimeout(switchTimer);
  updateSelection(index, announce);

  if (historyMode !== "none") {
    const url = new URL(window.location.href);
    url.searchParams.set("tool", tools[index].slug);
    window.history[`${historyMode}State`]({ tool: tools[index].slug }, "", url);
  }

  if (animate && !reduceMotion.matches) {
    frame.classList.add("is-leaving");
    switchTimer = window.setTimeout(() => loadFrame(index, true), 95);
  } else {
    loadFrame(index, false);
  }
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
  const option = event.target.closest(".dock-option");
  if (!option) return;

  const keyboardInitiated = event.detail === 0;
  selectTool(Number(option.dataset.index), { animate: !keyboardInitiated });
  setMenuOpen(false, { instant: keyboardInitiated, returnFocus: true });
});

menu.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    setMenuOpen(false, { instant: true, returnFocus: true });
    return;
  }

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

document.addEventListener("pointerdown", (event) => {
  if (menuOpen && !dock.contains(event.target)) {
    setMenuOpen(false);
  }
});

dock.addEventListener("focusout", () => {
  queueMicrotask(() => {
    if (menuOpen && !dock.contains(document.activeElement)) {
      setMenuOpen(false, { instant: true });
    }
  });
});

window.addEventListener("popstate", () => {
  const index = getInitialIndex();
  if (index !== activeIndex) {
    selectTool(index, { historyMode: "none" });
  }
});

frame.addEventListener("load", () => {
  if (frame.src !== frameTarget) return;

  requestAnimationFrame(() => {
    frame.classList.remove("is-arriving");
  });
});

updateSelection(activeIndex);
menu.inert = true;
loadFrame(activeIndex, !reduceMotion.matches);
