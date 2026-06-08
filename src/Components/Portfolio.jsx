import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Titon — Lead Management Platform",
    description: "Developed and maintained a full-stack web application with lead management, advanced filtering, pagination, and user profile management features. Integrated Supabase for database management and cloud data storage, enabling secure and scalable handling of customer and business data. Enhanced application performance, fixed critical bugs, optimized user experience, and deployed the solution to a production environment.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    link: "https://titon-iota.vercel.app/",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Prisma", "Tailwind CSS"]
  },
  {
    title: "Global IT Solution",
    description: "A modern React-based portfolio website showcasing innovative digital services and IT expertise with a focus on cutting-edge design.",
    image: "/Assets/portfolio1.png",
    link: "https://global-it-nine.vercel.app",
    tags: ["React", "UI/UX", "Tailwind"]
  },
  {
    title: "CRUD App Dashboard",
    description: "A comprehensive CRUD application with Firebase integration to create, read, update, and delete data in real-time.",
    image: "/Assets/crud.png",
    link: "https://crud-chi-inky.vercel.app",
    tags: ["React", "Firebase", "Dashboard"]
  },
  {
    title: "E-Commerce Platform",
    description: "A robust e-commerce dashboard with detailed data visualization, user management, and seamless real-time sales tracking features.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    link: "#",
    tags: ["E-Commerce", "Admin", "Analytics"]
  },
  {
    title: "Social Media App",
    description: "A highly scalable social networking application featuring live chat, posts, likes, and a rich interactive user interface.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    link: "#",
    tags: ["Social", "Real-time", "Chat"]
  }
];

const Portfolio = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i === projects.length - 1) return; // Last card doesn't need to scale down
        const nextCard = cardsRef.current[i + 1];

        // Scale and fade out the current card as the next one scrolls up to cover it
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.6,
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",     // when next card hits the bottom of the viewport
            end: "top 20%",          // until next card is near its sticky position
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert(); // clean up context
  }, []);

  return (
    <div className="Portfolio" id="portfolio" ref={containerRef}>
      <h1>Portfolio</h1>
      <div className="stacking-grid">
        {projects.map((project, index) => (
          <div
            className="stack-card"
            key={index}
            ref={(el) => cardsRef.current[index] = el}
            style={{ zIndex: index + 1 }}
          >
            <img src={project.image} alt={project.title} />
            <div className="stack-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="stack-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="stack-tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="modern-btn">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
