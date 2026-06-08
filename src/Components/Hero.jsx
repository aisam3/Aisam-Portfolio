import React from "react";

const Hero = () => {
  return (
    <div className="Hero" id="home">
      <div className="hero-left">
        <div className="badge">🚀 Welcome to my portfolio</div>
        <h1>Hello, <br /> I'm <span className="highlight text-gradient">Aisam.</span></h1>
        <p>My passion lies in building clean, functional, and user-friendly web experiences. I love turning complexity into simplicity through thoughtful design and precise code.</p>

        <div className="hero-btns">
          <a href="#portfolio" className="modern-btn primary">View My Work</a>
          <a href="#contact" className="modern-btn secondary">Contact Me</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="testimonial-card card-1">
          <p>"Aisam just gets it. Delivered perfectly, zero back and forth."</p>
          <span>— Mark., Germany</span>
        </div>

        <div className="testimonial-card card-2">
          <p>"The UI and animations blew our entire team away. Hired him again instantly."</p>
          <span>— Harry., UK</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;

