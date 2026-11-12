import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuArrowUpRight, LuImage, LuLoaderCircle } from "react-icons/lu";
import SectionLabel from "./ui/SectionLabel";
import { projects } from "../data";
import { SplitChars, isTouch, prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");

const Portfolio = () => {
  const root = useRef(null);
  const popup = useRef(null);
  const [active, setActive] = useState(null); // index of tile whose preview is showing
  const [touch] = useState(isTouch);

  // Entrance animations.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".work__title .char", {
        yPercent: 110,
        stagger: 0.025,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".work__title", start: "top 85%" },
      });
      // Explicit from/to values plus transition:none while tweening, so the tiles' CSS hover
      // transitions can't be read back as the animation's end state.
      const tiles = gsap.utils.toArray(".ptile");
      gsap.set(tiles, { transition: "none" });
      gsap.fromTo(
        tiles,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".work__grid", start: "top 85%" },
          onComplete: () => gsap.set(tiles, { clearProps: "transition,transform,opacity" }),
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // Desktop: one small floating preview that trails the cursor across the grid.
  useEffect(() => {
    const el = popup.current;
    if (!el || touch) return;
    const grid = root.current.querySelector(".work__grid");
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const rTo = gsap.quickTo(el, "rotate", { duration: 0.6, ease: "power3" });
    let lastX = 0;
    // Keep the pop-up fully on screen: it sits up-right of the cursor, and flips to the
    // cursor's left when there isn't room on the right.
    const clampX = (x) => (x + el.offsetWidth + 60 > window.innerWidth ? x - el.offsetWidth - 56 : x);
    const clampY = (y) => Math.max(y, el.offsetHeight + 40);

    const enter = (e) => {
      gsap.set(el, { x: clampX(e.clientX), y: clampY(e.clientY) });
      lastX = e.clientX;
    };
    const move = (e) => {
      xTo(clampX(e.clientX));
      yTo(clampY(e.clientY));
      rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.5));
      lastX = e.clientX;
    };
    grid.addEventListener("mouseenter", enter);
    grid.addEventListener("mousemove", move);
    return () => {
      grid.removeEventListener("mouseenter", enter);
      grid.removeEventListener("mousemove", move);
    };
  }, [touch]);

  useEffect(() => {
    if (!popup.current || touch) return;
    gsap.to(popup.current, {
      scale: active === null ? 0.4 : 1,
      opacity: active === null ? 0 : 1,
      duration: 0.45,
      ease: active === null ? "power3.out" : "back.out(1.7)",
    });
  }, [active, touch]);

  return (
    <section className="section work" id="work" ref={root}>
      <SectionLabel index="03" title="Selected work" aside={`${pad(projects.length)} projects`} />
      <h2 className="display work__title" aria-label="Featured projects">
        <span className="line">
          <SplitChars text="Featured" />
        </span>
        <span className="line line--right">
          <em className="serif">
            <SplitChars text="projects" />
          </em>
          <sup className="work__count">({projects.length})</sup>
        </span>
      </h2>

      <ul className="work__grid" onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => {
          const live = Boolean(p.link);
          const isActive = active === i;
          return (
            <li
              key={p.title}
              className={`ptile ${isActive ? "is-active" : ""} ${active !== null && !isActive && !touch ? "is-dim" : ""}`}
              onMouseEnter={() => !touch && setActive(i)}
              onFocus={() => !touch && setActive(i)}
              data-cursor-label={live ? "Visit ↗" : "Soon"}
            >
              <div className="ptile__top">
                <span className="ptile__index">{pad(i + 1)}</span>
                <span className={`ptile__status ${live ? "is-live" : ""}`}>
                  {live ? <i className="pulse" /> : <LuLoaderCircle className="spin-slow" />}
                  {live ? "Live" : "In progress"}
                </span>
              </div>

              <h3 className="ptile__title">
                {live ? (
                  <a href={p.link} target="_blank" rel="noreferrer" className="ptile__link">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
                {p.badge && <span className="chip chip--accent">{p.badge}</span>}
              </h3>
              <p className="ptile__subtitle">{p.subtitle}</p>
              <p className="ptile__desc">{p.description}</p>

              <div className="ptile__foot">
                <ul className="ptile__tags" aria-label="Tech used">
                  {p.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="ptile__arrow" aria-hidden="true">
                  {live ? <LuArrowUpRight /> : <LuLoaderCircle />}
                </span>
              </div>

              {/* Touch screens: tap the button to toggle a small preview inside the tile. */}
              {touch && (
                <>
                  <button
                    type="button"
                    className="ptile__peek"
                    onClick={() => setActive(isActive ? null : i)}
                    aria-expanded={isActive}
                    aria-label={`${isActive ? "Hide" : "Show"} ${p.title} preview`}
                  >
                    <LuImage />
                  </button>
                  <span className="ptile__thumb" aria-hidden={!isActive}>
                    <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>

      {!touch && (
        <div className="work__popup" ref={popup} aria-hidden="true">
          <div className="work__popup-track" style={{ transform: `translateY(-${(active ?? 0) * 100}%)` }}>
            {projects.map((p) => (
              <img key={p.title} src={p.image} alt="" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
