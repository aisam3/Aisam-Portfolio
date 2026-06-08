import React from "react";

const Resume = () => {
  return (
    <div className="Resume" id="resume">
      <h1>Resume</h1>
      <div className="resume-card">
        <div className="resume-info">
          <h3>Curriculum Vitae</h3>
          <p>Get a detailed overview of my experience, skills, and academic history.</p>
        </div>
        <a href="resume.pdf" download="Aisam-Abbas-Resume.pdf" className="modern-btn primary">
          📄 Download PDF
        </a>
      </div>
    </div>
  );
};

export default Resume;
