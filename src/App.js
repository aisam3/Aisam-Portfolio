import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.scss";
import Backgroundvideo from "./Components/Backgroundvideo";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Portfolio from "./Components/Portfolio";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Select all main sections
    const sections = gsap.utils.toArray(".content > div");
    
    // Animate each section on scroll
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          y: 50,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // when top of section hits 85% of viewport
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    });

    // Animate Sidebar and Header on load
    gsap.fromTo(
      ".Sidebar",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".Navbar",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className="aside">
     <Backgroundvideo/>
      <Sidebar />
      <main className="content">
        <Header/>
        <Hero />
        <About/>
        <Skills/>
        <Portfolio/>
        <Resume/>
        <Contact/>
      </main>
    </div>
  );
}

export default App;
