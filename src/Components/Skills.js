import React from "react";

const Skills = () => {
  return (
    <div className="Skills" id="skills">
      <h1>Skills</h1>

      <div className="skills-img skills-top">
        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/html.png" alt="HTML" />
          </div>
          <p>HTML</p>
        </div>

        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/css.png" alt="CSS" />
          </div>
          <p>CSS</p>
        </div>

        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/tailwind.png" alt="Tailwind" />
          </div>
          <p>Tailwind</p>
        </div>

        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/javascript.png" alt="JavaScript" />
          </div>
          <p>JavaScript</p>
        </div>
      </div>

      <div className="skills-img">
        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/react.png" alt="React" />
          </div>
          <p>React</p>
        </div>

        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/github.png" alt="GitHub" />
          </div>
          <p>GitHub</p>
        </div>

        <div className="icon">
          <div className="icon-bg">
            <img src="/Assets/bootstrap.png" alt="Bootstrap" />
          </div>
          <p>Bootstrap</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
