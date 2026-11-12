import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.scss";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Hero from "./Components/Hero";
import Marquee from "./Components/Marquee";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Portfolio from "./Components/Portfolio";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import ClickSpark from "./Components/ClickSpark";
import Preloader from "./Components/ui/Preloader";
import Cursor from "./Components/ui/Cursor";
import Background from "./Components/ui/Background";
import { getLenis, prefersReducedMotion, setLenis } from "./lib/motion";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const progress = useRef(null);

  // Smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    setLenis(lenis);
    if (process.env.NODE_ENV === "development") window.__lenis = lenis;
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Unlock scrolling once the intro finishes; re-measure triggers after fonts settle.
  useEffect(() => {
    if (loading) return;
    getLenis()?.start();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [loading]);

  // Scroll progress bar.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);

  return (
    <ClickSpark
      sparkColor="#d4ff3f"
      sparkSize={12}
      sparkRadius={22}
      sparkCount={8}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      {loading && <Preloader onReveal={() => setRevealed(true)} onDone={() => setLoading(false)} />}
      <Background />
      <Cursor />
      <div className="progress" aria-hidden="true">
        <span ref={progress} />
      </div>
      <Header />
      <main className="page">
        <Hero ready={revealed} />
        <Marquee />
        <About />
        <Skills />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </ClickSpark>
  );
}

export default App;
