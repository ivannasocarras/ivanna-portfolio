"use client";

import { useEffect } from "react";
import "../../styles/CaseStudyContent.css";

function Img({ n, aspect = "16/9", label }: { n: number; aspect?: string; label?: string }) {
  return (
    <div className="cs-img-placeholder" style={{ aspectRatio: aspect }}>
      <span>{label ?? `Image ${n}`}</span>
    </div>
  );
}

function ArchDiagram() {
  const nodes = ["Frontend", "REST API", "PHP Backend", "MySQL Database"];
  return (
    <div className="cs-arch">
      {nodes.map((node, i) => (
        <div key={node} className="cs-arch__row">
          <div className="cs-arch__node">{node}</div>
          {i < nodes.length - 1 && (
            <div className="cs-arch__arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ContactTube() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cs-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".cs-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToDemo() {
    document.getElementById("cs-demo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="cs-page">

      {/* ── HERO ── */}
      <section className="cs-hero cs-hero--web">
        <div className="cs-hero__content cs-hero__content--left">
          <div className="cs-hero__inner">
            <span className="cs-label">Case Study</span>
            <h1 className="cs-hero__title">ContactTube</h1>
            <p className="cs-hero__desc">
              A modern full-stack contact management application inspired by YouTube&apos;s clean interface.
              Built with a PHP backend, MySQL database, and RESTful APIs to provide secure authentication
              and intuitive contact management.
            </p>
            <div className="cs-tech-pills">
              {["HTML", "CSS", "JavaScript", "PHP", "MySQL", "REST API", "DigitalOcean"].map((t) => (
                <span key={t} className="cs-tech-pill">{t}</span>
              ))}
            </div>
            <div className="cs-hero__ctas">
              <button className="cs-watch-btn" onClick={scrollToDemo}>
                Watch Demo
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <a href="#" className="cs-github-btn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="cs-hero__screenshot-wrap">
          <div className="cs-hero__screenshot">
            <Img n={1} aspect="16/10" label="Home Dashboard" />
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <div className="cs-overview__grid">
            <div className="cs-overview__text">
              <span className="cs-label">Project Overview</span>
              <h2 className="cs-section__title">A Full-Stack Application Built for Real Users</h2>
              <p className="cs-body">
                ContactTube was built to provide a complete, production-grade web application experience —
                user accounts, secure authentication, full CRUD contact management, and real-time search,
                all powered by a RESTful API and relational database.
              </p>
              <p className="cs-body">
                Developed collaboratively using agile practices, my focus was on the entire frontend
                experience: interface design, responsive layouts, branding, and seamless communication
                between the UI and backend API layer.
              </p>
            </div>
            <div className="cs-overview__diagram">
              <ArchDiagram />
              <p className="cs-caption">System Architecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN & DEVELOPMENT ── */}
      <section className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Design &amp; Development</span>
          <h2 className="cs-section__title">Built Layer by Layer</h2>
          <div className="cs-cards-3">

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={2} aspect="16/10" label="Homepage / Login Screen" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">User Experience</h3>
                <p className="cs-card__text">
                  The interface was designed around familiar YouTube-inspired layouts to minimize the
                  learning curve while delivering a modern dashboard for contact management. Color
                  palettes, spacing, and typography were carefully selected for a clean, approachable feel.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={3} aspect="16/10" label="Entity Relationship Diagram" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Backend Architecture</h3>
                <p className="cs-card__text">
                  The backend was built using PHP and RESTful APIs connected to a MySQL database.
                  Authentication, contact management, and search were separated into dedicated endpoints,
                  enabling independent frontend and backend development with a scalable structure.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={4} aspect="16/10" label="Database Tables / ERD" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Database Design</h3>
                <p className="cs-card__text">
                  The schema was designed to securely associate contacts with individual user accounts
                  while supporting efficient CRUD operations and fast search. The relational design
                  ensured each user could only access their own contacts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT PROCESS ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <div className="cs-process__grid">
            <div className="cs-process__text">
              <span className="cs-label">Development Process</span>
              <h2 className="cs-section__title">Agile, API-First, Collaborative</h2>
              <p className="cs-body">
                The project followed an agile workflow with weekly team meetings, GitHub version control,
                and API-first development documented through SwaggerHub. Planning diagrams and project
                milestones kept each subsystem organized and allowed the frontend and backend to be
                developed and tested independently before integration.
              </p>
            </div>
            <div className="cs-process__images">
              <div className="cs-process__img-grid">
                <div className="cs-process__img-item cs-animate">
                  <Img n={5} aspect="4/3" label="Use Case Diagram" />
                  <p className="cs-caption">Use Case Diagram</p>
                </div>
                <div className="cs-process__img-item cs-animate">
                  <Img n={6} aspect="4/3" label="Gantt Chart" />
                  <p className="cs-caption">Gantt Chart</p>
                </div>
                <div className="cs-process__img-item cs-animate">
                  <Img n={7} aspect="4/3" label="API Documentation (SwaggerHub)" />
                  <p className="cs-caption">SwaggerHub API Docs</p>
                </div>
                <div className="cs-process__img-item cs-animate">
                  <Img n={8} aspect="4/3" label="GitHub Repository" />
                  <p className="cs-caption">GitHub Repository</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Challenges</span>
          <h2 className="cs-section__title">Problems Worth Solving</h2>
          <div className="cs-challenges">

            <div className="cs-challenge-card cs-animate">
              <div className="cs-challenge-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="26" height="26">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="cs-challenge-card__title">Learning PHP</h3>
              <p className="cs-challenge-card__text">
                Transitioning from primarily frontend development to integrating a PHP backend required
                learning server-side concepts, authentication flows, and API communication patterns —
                significantly expanding my understanding of full-stack web development.
              </p>
            </div>

            <div className="cs-challenge-card cs-animate">
              <div className="cs-challenge-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="26" height="26">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="cs-challenge-card__title">CRUD Integration</h3>
              <p className="cs-challenge-card__text">
                Implementing contact editing, deletion, and user registration required coordinating
                frontend interactions with backend API endpoints while maintaining consistent application
                state and clear user feedback throughout the interface.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL RESULT ── */}
      <section id="cs-demo" className="cs-section cs-animate">
        <div className="cs-container">
          <span className="cs-label">Final Result</span>
          <h2 className="cs-section__title">See It in Action</h2>

          <div className="cs-video-wrap cs-animate">
            <Img n={9} aspect="16/9" label="Demo Video" />
          </div>

          <div className="cs-result-grid cs-animate">
            <div className="cs-result-grid__item">
              <Img n={10} aspect="16/10" label="Login Page" />
              <p className="cs-caption">Login Page</p>
            </div>
            <div className="cs-result-grid__item">
              <Img n={11} aspect="16/10" label="Dashboard" />
              <p className="cs-caption">Dashboard</p>
            </div>
            <div className="cs-result-grid__item">
              <Img n={12} aspect="16/10" label="Contact Management Interface" />
              <p className="cs-caption">Contact Management</p>
            </div>
            <div className="cs-result-grid__item">
              <Img n={13} aspect="16/10" label="Search Functionality" />
              <p className="cs-caption">Search Functionality</p>
            </div>
          </div>

          <div className="cs-outcomes cs-animate">
            <h3 className="cs-outcomes__title">Key Outcomes</h3>
            <ul className="cs-outcomes__list">
              {[
                "Designed and developed a responsive frontend interface inspired by YouTube",
                "Integrated frontend components with a RESTful PHP backend",
                "Implemented secure user authentication and full CRUD functionality",
                "Collaborated using GitHub, SwaggerHub, and agile development practices",
                "Achieved high Lighthouse accessibility and performance scores through frontend optimization",
              ].map((item) => (
                <li key={item} className="cs-outcomes__item">
                  <span className="cs-outcomes__dot" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div className="cs-footer-nav">
        <div className="cs-container">
          <a href="/#projects" className="case-study__back">← Back to Projects</a>
        </div>
      </div>

    </div>
  );
}
