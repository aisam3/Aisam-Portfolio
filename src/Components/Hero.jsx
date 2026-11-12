import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuArrowDown, LuArrowUpRight, LuDownload } from "react-icons/lu";
import Magnetic from "./ui/Magnetic";
import RotatingBadge from "./ui/RotatingBadge";
// eslint-disable-next-line no-unused-vars -- kept for the commented-out eyebrow below
import DecryptedText from "./DecryptedText";
import { RollText } from "../Layout/Header";
import { profile, roles } from "../data";
import { SplitChars, prefersReducedMotion, scrollToTarget } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const RoleTicker = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="role-ticker" aria-live="polite">
      <span className="role-ticker__track" style={{ transform: `translateY(-${(i * 100) / roles.length}%)` }}>
        {roles.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </span>
    </span>
  );
};

const Hero = ({ ready }) => {
  const root = useRef(null);

  // Intro timeline, fired when the preloader curtain starts lifting.
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero__title .char", { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.035 }, 0.25)
        .from(".hero__portrait", { scale: 0, rotate: -20, duration: 1.3 }, 0.6)
        .from(".hero__portrait img", { scale: 1.6, duration: 1.6 }, 0.6)
        .from(".hero [data-fade]", { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.8);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // Scroll-out parallax.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      // Lines drift toward the centre and the content lifts away — nothing is pushed
      // past the hero's edges, so it never slides under the marquee or off-screen.
      tl.to(".hero__line--1", { xPercent: 5, ease: "none" }, 0)
        .to(".hero__line--2", { xPercent: -4, ease: "none" }, 0)
        .to(".hero__inner", { y: () => -window.innerHeight * 0.12, opacity: 0, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={root}>
      <div className="hero__inner">
        <div className="hero__top">
          <span className="chip" data-fade>
            <i className="pulse" /> Available for new projects
          </span>
          {/* <span className="eyebrow" data-fade>
            <DecryptedText text="Portfolio — 2026 Edition" animateOn="hover" speed={40} maxIterations={12} />
          </span> */}
        </div>

        <h1 className="hero__title" aria-label={profile.name}>
          <span className="hero__line hero__line--1">
            <SplitChars text={profile.firstName} />
          </span>
          <span className="hero__line hero__line--2">
            <span className="hero__portrait" data-cursor-label="Hi! 👋">
              <img src={profile.portrait} alt="" />
            </span>
            <em className="serif">
              <SplitChars text={profile.lastName} />
            </em>
          </span>
        </h1>

        <div className="hero__bottom">
          <div className="hero__intro">
            <p className="hero__role" data-fade>
              <span className="muted">I'm a</span> <RoleTicker />
            </p>
            <p className="hero__lead" data-fade>
              I design and build clean, fast and <em className="serif">delightfully animated</em> web
              experiences — turning complexity into simple, precise interfaces.
            </p>
            <div className="hero__ctas" data-fade>
              <Magnetic>
                <a
                  href="#work"
                  className="btn btn--accent"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("work");
                  }}
                >
                  <RollText>View my work</RollText>
                  <LuArrowUpRight />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.resume} download="Aisam-Abbas-Resume.pdf" className="btn btn--ghost">
                  <RollText>Download CV</RollText>
                  <LuDownload />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hero__scroll" data-fade>
            <RotatingBadge
              text="Scroll to explore"
              icon={<LuArrowDown />}
              onClick={() => scrollToTarget("about")}
              label="Scroll to the About section"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
