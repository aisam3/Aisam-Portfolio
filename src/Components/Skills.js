import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./ui/SectionLabel";
import { skills } from "../data";
import { SplitChars, prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const root = useRef(null);
  const grid = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".skills__title .char", {
        yPercent: 110,
        stagger: 0.025,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".skills__title", start: "top 85%" },
      });
      gsap.from(".tile", {
        y: 80,
        opacity: 0,
        rotateX: -30,
        duration: 1,
        ease: "expo.out",
        stagger: { each: 0.05, from: "start" },
        scrollTrigger: { trigger: grid.current, start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Spotlight border/glow that follows the pointer across the whole grid.
  const onMove = (e) => {
    grid.current.querySelectorAll(".tile").forEach((tile) => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
      tile.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  };

  // Subtle 3D tilt on the hovered tile.
  const onTilt = (e) => {
    const tile = e.currentTarget;
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(tile, { rotateY: x * 14, rotateX: -y * 14, duration: 0.5, ease: "power3.out" });
  };
  const onLeave = (e) => gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });

  return (
    <section className="section skills" id="skills" ref={root}>
      <SectionLabel title="Stack" aside={`${skills.length} tools`} />
      <div className="skills__head">
        <h2 className="display skills__title" aria-label="Tools I build with">
          <span className="line">
            <SplitChars text="Tools I" />
          </span>
          <span className="line">
            <em className="serif">
              <SplitChars text="build with" />
            </em>
          </span>
        </h2>
        <p className="skills__lead">
          A modern, typed front-end toolkit — backed by the data layer I need to ship complete,
          production-ready products.
        </p>
      </div>

      <div className="skills__grid" ref={grid} onMouseMove={onMove}>
        {skills.map(({ name, group, Icon, color }) => (
          <div
            className="tile"
            key={name}
            style={{ "--brand": color }}
            onMouseMove={onTilt}
            onMouseLeave={onLeave}
            data-cursor="hover"
          >
            <span className="tile__icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="tile__name">{name}</span>
            <span className="tile__group">{group}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
