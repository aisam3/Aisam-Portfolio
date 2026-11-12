import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isTouch, prefersReducedMotion } from "../../lib/motion";

/**
 * Custom cursor: a precise dot plus a trailing ring.
 * Elements opt in with data-cursor="hover" (ring grows) or data-cursor="view" / data-cursor-label="…" (ring becomes a labelled bubble).
 */
const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState("");
  const [enabled] = useState(() => !isTouch() && !prefersReducedMotion());

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e) => {
      const target = e.target.closest("[data-cursor], a, button, input, textarea, label");
      if (!target) {
        setMode("");
        setLabel("");
        return;
      }
      const kind = target.getAttribute("data-cursor");
      const text = target.getAttribute("data-cursor-label");
      if (text) {
        setMode("label");
        setLabel(text);
      } else if (target.matches("input, textarea")) {
        setMode("text");
        setLabel("");
      } else {
        setMode(kind || "hover");
        setLabel("");
      }
    };

    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");
    const hide = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const show = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className={`cursor-dot ${mode ? `is-${mode}` : ""}`} aria-hidden="true" />
      <div ref={ring} className={`cursor-ring ${mode ? `is-${mode}` : ""}`} aria-hidden="true">
        <span className="cursor-label">{label}</span>
      </div>
    </>
  );
};

export default Cursor;
