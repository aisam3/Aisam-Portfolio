import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuCode, LuLayers, LuZap } from "react-icons/lu";
import SectionLabel from "./ui/SectionLabel";
import { projects, skills } from "../data";
import { SplitWords, prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "I'm a Computer Science student and Full-Stack developer who obsesses over the details — crafting interfaces that feel fast, look sharp and are a joy to use.";

const stats = [
  // { value: 6, suffix: "th", label: "Semester, BS Computer Science" },
  { value: projects.filter((p) => p.link).length, pad: true, suffix: "", label: "Live projects shipped" },
  { value: skills.length, suffix: "+", label: "Tools & technologies" },
];

const pillars = [
  { Icon: LuCode, title: "Clean code", text: "Readable, component-driven React that scales with the product." },
  { Icon: LuLayers, title: "Pixel care", text: "Responsive layouts and design systems that hold up on every screen." },
  { Icon: LuZap, title: "Motion", text: "Purposeful animation that guides attention and makes UIs feel alive." },
];

const About = () => {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Words light up as you scroll through the statement.
      gsap.fromTo(
        ".about__statement .word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about__statement", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );

      // Count-up stats.
      gsap.utils.toArray(".stat__num").forEach((el) => {
        const end = Number(el.dataset.value);
        const pad = el.dataset.pad === "true";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            const n = Math.round(obj.v);
            el.textContent = pad ? String(n).padStart(2, "0") : n;
          },
        });
      });

      gsap.from(".stat, .pillar", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about__grid", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={root}>
      <SectionLabel title="About" />
      <p className="about__statement">
        <SplitWords text={statement} />
      </p>

      <div className="about__grid">
        <div className="about__stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value">
                <span className="stat__num" data-value={s.value} data-pad={s.pad ? "true" : "false"}>
                  {s.pad ? String(s.value).padStart(2, "0") : s.value}
                </span>
                <span className="stat__suffix">{s.suffix}</span>
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="about__pillars">
          {pillars.map(({ Icon, title, text }) => (
            <article className="pillar" key={title}>
              <span className="pillar__icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
