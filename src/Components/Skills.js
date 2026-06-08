import React from "react";

const skillsData = [
  { name: "HTML5", src: "/Assets/html.png" },
  { name: "CSS3", src: "/Assets/css.png" },
  { name: "Tailwind CSS", src: "/Assets/tailwind.png" },
  { name: "JavaScript", src: "/Assets/javascript.png" },
  { name: "React JS", src: "/Assets/react.png" },
  { name: "GitHub", src: "/Assets/github.png", invert: true },
  { name: "Bootstrap", src: "/Assets/bootstrap.png" },
];

const Skills = () => {
  return (
    <div className="Skills" id="skills">
      <h1>Skills</h1>

      <div className="skills-scatter">
        {skillsData.map((skill, i) => (
          <div className="skill-bubble" key={i}>
            <img 
              src={skill.src} 
              alt={skill.name} 
              style={skill.invert ? { filter: "invert(1) brightness(2)" } : {}} 
            />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
