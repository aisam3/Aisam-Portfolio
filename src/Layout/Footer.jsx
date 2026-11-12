import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuArrowUp } from "react-icons/lu";
import Magnetic from "../Components/ui/Magnetic";
import { navLinks, profile } from "../data";
import { prefersReducedMotion, scrollToTarget } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const root = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: profile.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".footer__giant span", {
        yPercent: 100,
        stagger: 0.05,
        ease: "expo.out",
        duration: 1.4,
        scrollTrigger: { trigger: ".footer__giant", start: "top 95%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={root}>
      <div className="footer__top">
        <div className="footer__col">
          <span className="eyebrow">Local time</span>
          <span>{time} PKT</span>
        </div>
        <nav className="footer__col" aria-label="Footer">
          <span className="eyebrow">Sitemap</span>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="footer__col">
          <span className="eyebrow">Socials</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <Magnetic>
          <button className="footer__top-btn" onClick={() => scrollToTarget(0)} aria-label="Back to top" data-cursor="hover">
            <LuArrowUp />
          </button>
        </Magnetic>
      </div>

      <div className="footer__giant" aria-hidden="true">
        {Array.from(profile.firstName.toUpperCase()).map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed &amp; built with care</span>
      </div>
    </footer>
  );
};

export default Footer;
