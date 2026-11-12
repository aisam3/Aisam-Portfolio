import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LuArrowUpRight,
  LuCheck,
  LuCopy,
  LuDownload,
  LuLinkedin,
  LuLoaderCircle,
  LuMail,
  LuMapPin,
  LuPhone,
  LuSend,
  LuX,
} from "react-icons/lu";
import SectionLabel from "./ui/SectionLabel";
import Magnetic from "./ui/Magnetic";
import RotatingBadge from "./ui/RotatingBadge";
import { RollText } from "../Layout/Header";
import { profile } from "../data";
import { SplitChars, prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Field = ({ as = "input", label, name, type = "text", ...rest }) => {
  const Comp = as;
  return (
    <label className="field">
      <Comp name={name} type={as === "input" ? type : undefined} placeholder=" " required {...rest} />
      <span className="field__label">{label}</span>
      <span className="field__line" />
    </label>
  );
};

const Contact = () => {
  const root = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact__title .char", {
        yPercent: 110,
        stagger: 0.02,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact__title", start: "top 85%" },
      });
      gsap.from(".contact__info > *, .contact__form", {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact__body", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mwpngaza", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const buttonContent = {
    idle: (
      <>
        <RollText>Send message</RollText> <LuSend />
      </>
    ),
    sending: (
      <>
        Sending <LuLoaderCircle className="spin" />
      </>
    ),
    sent: (
      <>
        Message sent <LuCheck />
      </>
    ),
    error: (
      <>
        Try again <LuX />
      </>
    ),
  }[status];

  return (
    <section className="section contact" id="contact" ref={root}>
      <SectionLabel index="05" title="Contact" />

      <h2 className="contact__title" aria-label="Let's build something great together">
        <span className="line">
          <SplitChars text="Let's build" />
        </span>
        <span className="line line--indent">
          <span className="contact__avatar">
            <img src={profile.portrait} alt="" />
          </span>
          <em className="serif">
            <SplitChars text="something" />
          </em>
        </span>
        <span className="line">
          <SplitChars text="great." />
        </span>
      </h2>

      <div className="contact__body">
        <div className="contact__info">
          <p className="contact__lead">
            Have an idea, a role or a project in mind? Drop me a message and let's make it happen.
          </p>

          <div className="contact__email">
            <a href={`mailto:${profile.email}`} className="contact__email-link" data-cursor="hover">
              <LuMail /> {profile.email}
            </a>
            <button
              type="button"
              className={`icon-btn ${copied ? "is-done" : ""}`}
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <LuCheck /> : <LuCopy />}
            </button>
            <span className={`toast ${copied ? "is-visible" : ""}`} role="status">
              Copied to clipboard
            </span>
          </div>

          <ul className="contact__meta">
            <li>
              <LuPhone /> <a href={profile.phoneHref}>{profile.phone}</a>
            </li>
            <li>
              <LuMapPin /> {profile.location}
            </li>
          </ul>

          <div className="contact__actions">
            <Magnetic>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <LuLinkedin /> <RollText>LinkedIn</RollText> <LuArrowUpRight />
              </a>
            </Magnetic>
            <RotatingBadge
              text="Download my CV"
              icon={<LuDownload />}
              href={profile.resume}
              download="Aisam-Abbas-Resume.pdf"
              className="rotating-badge--accent"
            />
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__row">
            <Field label="Your name" name="name" autoComplete="name" />
            <Field label="Your email" name="email" type="email" autoComplete="email" />
          </div>
          <Field as="textarea" label="Tell me about your project" name="message" rows={5} />
          <Magnetic strength={0.25}>
            <button type="submit" className={`btn btn--accent btn--lg is-${status}`} disabled={status === "sending"}>
              {buttonContent}
            </button>
          </Magnetic>
          <p className="form-status" role="status">
            {status === "sent" && "Thanks! Your message landed in my inbox."}
            {status === "error" && "Something went wrong — please try again or email me directly."}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
