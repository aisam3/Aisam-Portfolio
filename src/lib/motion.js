import React from "react";

let lenisInstance = null;

export const setLenis = (lenis) => {
  lenisInstance = lenis;
};

export const getLenis = () => lenisInstance;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/** Smooth-scroll to a section id (or 0 for top) through Lenis, with a native fallback. */
export const scrollToTarget = (target) => {
  const el = typeof target === "string" ? document.getElementById(target) : null;
  if (lenisInstance) {
    lenisInstance.scrollTo(el || target, { duration: 1.4 });
    return;
  }
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

/** Splits text into masked characters for reveal animations. Spaces are preserved. */
export const SplitChars = ({ text, className = "char" }) =>
  Array.from(text).map((ch, i) => (
    <span className="mask" key={i} aria-hidden="true">
      <span className={className}>{ch === " " ? " " : ch}</span>
    </span>
  ));

/** Splits text into words (no mask) for scroll-scrubbed opacity reveals. */
export const SplitWords = ({ text, className = "word" }) =>
  text.split(" ").map((w, i, arr) => (
    <React.Fragment key={i}>
      <span className={className}>{w}</span>
      {i < arr.length - 1 ? " " : null}
    </React.Fragment>
  ));
