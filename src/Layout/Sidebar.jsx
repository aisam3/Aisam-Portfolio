import React from "react";
import { CiFaceSmile } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className="Sidebar">
      <div className="sidebar-con">
        <div className="available">
          <CiFaceSmile className="avail-icon" /> <p>available</p>
        </div>
        <div className="portimage">
          <img src="/Assets/portimage.jpg" alt="" />
        </div>
        <div className="Name">
          <p className="p1">Aisam</p>
          <p className="p2">
            <SiGmail className="profile-icons" /> aisamabbas03@gmail.com
          </p>
          <p className="p2">
            <FaPhone className="profile-icons" /> +92-3467900942
          </p>
          <p className="p2">
            <FaLocationDot className="profile-icons" /> Shamsabad, Rawalpindi
          </p>
        </div>
        <div />
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/aisam-abbas/">
            <FaLinkedin />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=aisamabbas03@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoMdMail />
          </a>
        </div>
        <a className="started" href="#contact">
          <a href="/">Contact Me</a>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
