import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuArrowUpRight } from "react-icons/lu";
import Magnetic from "../Components/ui/Magnetic";
import { navLinks, profile } from "../data";
import { getLenis, scrollToTarget } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const useLocalTime = (timeZone) => {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
};

/** Text that rolls up to a duplicate copy on hover. */
export const RollText = ({ children }) => (
  <span className="roll" data-text={children}>
    <span>{children}</span>
  </span>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  // eslint-disable-next-line no-unused-vars -- clock display is currently commented out
  const time = useLocalTime(profile.timezone);

  // Hide on scroll down, reveal on scroll up; track the section in view.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 40);
        setHidden(self.direction === 1 && y > window.innerHeight * 0.6);
      },
    });
    const sections = ["home", ...navLinks.map((l) => l.id)]
      .filter((id) => document.getElementById(id))
      .map((id) =>
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => self.isActive && setActive(id),
        })
      );
    return () => {
      st.kill();
      sections.forEach((s) => s.kill());
    };
  }, []);

  // Fullscreen menu animation + scroll lock.
  useEffect(() => {
    const lenis = getLenis();
    const ctx = gsap.context(() => {
      if (open) {
        lenis?.stop();
        gsap.timeline()
          .to(menuRef.current, { clipPath: "circle(150% at calc(100% - 44px) 40px)", duration: 0.9, ease: "expo.inOut" })
          .fromTo(".menu__link .char-line", { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 0.8, ease: "expo.out" }, "-=0.35")
          .fromTo(".menu__foot > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, "-=0.5");
      } else {
        lenis?.start();
        gsap.to(menuRef.current, { clipPath: "circle(0% at calc(100% - 44px) 40px)", duration: 0.7, ease: "expo.inOut" });
      }
    }, menuRef);
    return () => ctx.kill();
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu start closing before scrolling.
    setTimeout(() => scrollToTarget(id), open ? 350 : 0);
  };

  return (
    <>
      <header className={`nav ${hidden && !open ? "is-hidden" : ""} ${scrolled && !open ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}>
        <a href="#home" className="nav__logo" onClick={go("home")} data-cursor="hover" aria-label="Back to top">
          <span className="nav__logo-mark">©</span>
          <span className="nav__logo-text">
            <span>Code by</span>
            <span>{profile.firstName}</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className={active === l.id ? "is-active" : ""}
              aria-current={active === l.id ? "true" : undefined}
            >
              <RollText>{l.label}</RollText>
            </a>
          ))}
        </nav>

        <div className="nav__right">
          {/* <span className="nav__time" title="Local time in Lahore">
            <i className="pulse" /> LHR
          </span> */}
          <Magnetic>
            <a href="#contact" onClick={go("contact")} className="btn btn--pill btn--light nav__cta">
              <RollText>Let's talk</RollText>
              <LuArrowUpRight />
            </a>
          </Magnetic>
          <button
            className={`nav__burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="menu" id="site-menu" ref={menuRef} aria-hidden={!open}>
        <div className="menu__inner">
          <p className="eyebrow">Navigation</p>
          <ul>
            {[{ id: "home", label: "Home" }, ...navLinks].map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="menu__link" onClick={go(l.id)} tabIndex={open ? 0 : -1}>
                  <span className="mask">
                    <span className="char-line">
                      <sup>0{i + 1}</sup> {l.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              LinkedIn <LuArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
