import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuSparkles } from "react-icons/lu";
import { marqueeWords } from "../data";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Two counter-scrolling bands whose speed and direction react to scroll velocity. */
const Marquee = () => {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".marquee__track");
      const tweens = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 30, ease: "none", repeat: -1 }
        )
      );
      // Start far into the loop so reversing (on scroll-up) never hits time 0.
      tweens.forEach((t) => t.totalTime(t.duration() * 100));
      let dir = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (Math.abs(v) > 10) dir = v > 0 ? 1 : -1;
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400);
          tweens.forEach((t) => {
            gsap.to(t, { timeScale: dir * boost, duration: 0.2, overwrite: true });
            gsap.to(t, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out" });
          });
          gsap.to(".marquee__band", { skewY: gsap.utils.clamp(-4, 4, v / -500), duration: 0.4, overwrite: "auto" });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const Row = () => (
    <>
      {[...marqueeWords, ...marqueeWords].map((w, i) => (
        <span className="marquee__item" key={i}>
          {i % 2 ? <em className="serif">{w}</em> : w}
          <LuSparkles className="marquee__star" />
        </span>
      ))}
    </>
  );

  return (
    <section className="marquee" ref={root} aria-label="What I focus on">
      <div className="marquee__band marquee__band--accent">
        <div className="marquee__track">
          <Row />
        </div>
      </div>
      <div className="marquee__band marquee__band--dark">
        <div className="marquee__track">
          <Row />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
