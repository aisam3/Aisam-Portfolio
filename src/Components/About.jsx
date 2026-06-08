import React from "react";

const About = () => {
  return (
    <div className="About" id="about">
      <div className="about-content">
        <div className="about-text-box">
          <h1 className="text-gradient">About Me</h1>
          <p>
            I am a BS Computer Science student (4th semester) and a Front-End Web
            Developer with strong problem-solving abilities. Skilled in building
            clean, functional, and user-focused applications with a growing knowledge of
            backend development.
          </p>
          <p>
            I am responsible, organized, and dedicated to meeting
            both personal and organizational goals while constantly learning new technologies.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <h3>6th</h3>
            <span>Semester CS Student</span>
          </div>
          <div className="stat-card">
            <h3>Web</h3>
            <span>Frontend Focus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
