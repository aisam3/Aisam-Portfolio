import React from "react";

const Resume = () => {
  return (
    <div className="Resume" id="resume">
      <h1>Resume</h1>
      <div class="resume-tile">
        <p>Download my resume</p>
        <a href="resume.pdf" download="Aisam-Abbas-Resume.pdf" class="resume-btn">
          Download
        </a>
      </div>
    </div>
  );
};

export default Resume;
