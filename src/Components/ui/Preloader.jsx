import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/motion";

const words = ["Hello", "Salaam", "Hola", "Bonjour", "Ciao", "Hallo"];

/** Intro screen: greeting cycle + 0→100 counter, then a curved curtain lifts. */
const Preloader = ({ onReveal, onDone }) => {
  const root = useRef(null);
  const count = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal?.();
      onDone?.();
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline();
      const wordEls = gsap.utils.toArray(".preloader__word");

      gsap.set(wordEls, { yPercent: 100, opacity: 0 });
      wordEls.forEach((w, i) => {
        tl.to(w, { yPercent: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, i * 0.28);
        if (i < wordEls.length - 1) {
          tl.to(w, { yPercent: -100, opacity: 0, duration: 0.22, ease: "power2.in" }, i * 0.28 + 0.24);
        }
      });

      tl.to(
        counter,
        {
          v: 100,
          duration: tl.duration(),
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0
      )
        .to(".preloader__bar span", { scaleX: 1, duration: tl.duration(), ease: "power2.inOut" }, 0)
        .add(() => onReveal?.())
        .to(".preloader__inner", { y: -60, opacity: 0, duration: 0.5, ease: "power3.in" })
        .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2")
        .to(".preloader__curve", { attr: { d: "M0 0 L100 0 L100 0 Q50 0 0 0 Z" }, duration: 1, ease: "expo.inOut" }, "<")
        .add(() => onDone?.());
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__words">
          {words.map((w) => (
            <span className="preloader__word" key={w}>
              <i /> {w}
            </span>
          ))}
        </div>
        <div className="preloader__meta">
          <span>Aisam Abbas · Portfolio ©{new Date().getFullYear()}</span>
          <span className="preloader__count" ref={count}>
            000
          </span>
        </div>
        <div className="preloader__bar">
          <span />
        </div>
      </div>
      <svg className="preloader__svg" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path className="preloader__curve" d="M0 0 L100 0 L100 0 Q50 10 0 0 Z" />
      </svg>
    </div>
  );
};

export default Preloader;
