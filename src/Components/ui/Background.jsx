import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { isTouch, prefersReducedMotion } from "../../lib/motion";

/** Fixed ambient backdrop: drifting gradient orbs (one trails the pointer), a fine grid and film grain. */
const Background = () => {
  const follow = useRef(null);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion() || !follow.current) return;
    const xTo = gsap.quickTo(follow.current, "x", { duration: 2.2, ease: "power3" });
    const yTo = gsap.quickTo(follow.current, "y", { duration: 2.2, ease: "power3" });
    const move = (e) => {
      xTo(e.clientX - window.innerWidth / 2);
      yTo(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__orb bg__orb--a" />
      <div className="bg__orb bg__orb--b" />
      <div className="bg__follow" ref={follow} />
      <div className="bg__grid" />
      <div className="bg__grain" />
    </div>
  );
};

export default Background;
