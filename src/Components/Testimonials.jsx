import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuQuote } from "react-icons/lu";
import SectionLabel from "./ui/SectionLabel";
import { testimonials } from "../data";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".quote").forEach((q, i) => {
        gsap.from(q, {
          xPercent: i % 2 ? 12 : -12,
          opacity: 0,
          rotate: i % 2 ? 2 : -2,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: q, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section testimonials" ref={root} aria-label="Testimonials">
      <SectionLabel title="Kind words" />
      <div className="testimonials__list">
        {testimonials.map((t) => (
          <figure className="quote" key={t.author}>
            <LuQuote className="quote__mark" aria-hidden="true" />
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="quote__avatar" aria-hidden="true">
                {t.author[0]}
              </span>
              <span>
                <strong>{t.author}</strong>
                <span className="muted">{t.place}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
