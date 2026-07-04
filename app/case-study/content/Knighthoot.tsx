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

function KnighthootArch() {
  return (
    <div className="cs-arch cs-arch--multi">
      <div className="cs-arch__top-row">
        <div className="cs-arch__node cs-arch__node--web">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden>
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          Teacher Web App
        </div>
        <div className="cs-arch__node cs-arch__node--mobile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" aria-hidden>
            <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/>
          </svg>
          Student Mobile App
        </div>
      </div>
      <div className="cs-arch__mid-arrows">
        <div className="cs-arch__v-arrow">↓</div>
        <div className="cs-arch__v-arrow">↓</div>
      </div>
      <div className="cs-arch__node cs-arch__node--api">REST API</div>
      <div className="cs-arch__v-arrow cs-arch__v-arrow--center">↓</div>
      <div className="cs-arch__node cs-arch__node--db">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" aria-hidden>
          <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>
        MongoDB
      </div>
    </div>
  );
}

export default function Knighthoot() {
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
            <h1 className="cs-hero__title">Knighthoot</h1>
            <p className="cs-hero__desc">
              A real-time classroom assessment platform that enables teachers to create and host live
              quizzes while students participate through a dedicated mobile application using a
              unique game PIN.
            </p>
            <div className="cs-tech-pills">
              {["React", "Flutter", "TypeScript", "Node.js", "Express", "MongoDB", "REST API", "DigitalOcean"].map((t) => (
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
            <Img n={1} aspect="16/10" label="Teacher Dashboard" />
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <div className="cs-overview__grid">
            <div className="cs-overview__text">
              <span className="cs-label">Project Overview</span>
              <h2 className="cs-section__title">A Multi-Platform EdTech Ecosystem</h2>
              <p className="cs-body">
                Knighthoot was designed to modernize classroom engagement by giving teachers an intuitive
                platform for creating interactive quizzes while students participate in real time through
                a companion mobile application. Every session is live, scored, and reportable.
              </p>
              <p className="cs-body">
                The system combines a React web application, Flutter mobile app, RESTful backend, and
                MongoDB database into a complete ecosystem supporting authentication, quiz creation, live
                sessions, scoring, reporting, and email verification. My focus was designing and building
                the web interface while collaborating closely with backend, mobile, and database developers.
              </p>
            </div>
            <div className="cs-overview__diagram">
              <KnighthootArch />
              <p className="cs-caption">System Architecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN & DEVELOPMENT ── */}
      <section className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Design &amp; Development</span>
          <h2 className="cs-section__title">Designed Before Built</h2>
          <div className="cs-cards-3">

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={2} aspect="16/10" label="Web Application Prototype" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">User Experience Design</h3>
                <p className="cs-card__text">
                  The full web experience was prototyped in Figma before development began, establishing
                  a consistent design language, navigation flow, and responsive layouts. The interface
                  was built around a clean black-and-gold visual identity inspired by the university&apos;s
                  branding while prioritizing usability for live classroom sessions.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={3} aspect="16/10" label="Activity / Use Case Diagram" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Multi-Platform Architecture</h3>
                <p className="cs-card__text">
                  Teachers interact through the web dashboard while students participate via the Flutter
                  mobile app. Both clients share a single REST API, enabling synchronized quiz sessions,
                  authentication, live scoring, and real-time gameplay across platforms.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={4} aspect="16/10" label="Entity Relationship Diagram" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Database Design</h3>
                <p className="cs-card__text">
                  MongoDB manages users, quizzes, questions, and student results. The schema supports
                  authentication, quiz ownership, live classroom sessions, and performance reporting
                  while maintaining efficient relationships between teachers, students, and assessments.
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
              <h2 className="cs-section__title">Agile, Prototype-First, Collaborative</h2>
              <p className="cs-body">
                Development followed an agile workflow with early project planning, collaborative GitHub
                development, and API-first architecture. Detailed prototypes and UML diagrams allowed
                the frontend, backend, mobile, and database teams to develop independently while
                maintaining a shared system architecture throughout.
              </p>
            </div>
            <div className="cs-process__images">
              <div className="cs-process__img-grid">
                <div className="cs-process__img-item cs-animate">
                  <Img n={5} aspect="4/3" label="Gantt Chart" />
                  <p className="cs-caption">Gantt Chart</p>
                </div>
                <div className="cs-process__img-item cs-animate">
                  <Img n={6} aspect="4/3" label="Web Prototype" />
                  <p className="cs-caption">Web Prototype</p>
                </div>
                <div className="cs-process__img-item cs-animate">
                  <Img n={7} aspect="4/3" label="Mobile Prototype" />
                  <p className="cs-caption">Mobile Prototype</p>
                </div>
                <div className="cs-process__img-item cs-animate">
                  <Img n={8} aspect="4/3" label="Class Diagram" />
                  <p className="cs-caption">Class Diagram</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTING & QUALITY ── */}
      <section className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Testing &amp; Quality</span>
          <h2 className="cs-section__title">Validated Across Every Layer</h2>
          <div className="cs-cards-3">

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={9} aspect="4/3" label="Lighthouse Reports" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Accessibility</h3>
                <p className="cs-card__text">
                  Accessibility was a core focus throughout development. Key pages consistently achieved
                  perfect Lighthouse accessibility scores while maintaining responsive layouts and
                  intuitive navigation across the application.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={10} aspect="4/3" label="SwaggerHub / Postman" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">API Testing</h3>
                <p className="cs-card__text">
                  REST API endpoints were documented and validated using SwaggerHub and Postman to
                  ensure reliable communication between the web application, mobile app, and backend
                  before full system integration.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={11} aspect="4/3" label="Unit Testing Diagram" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Integration Testing</h3>
                <p className="cs-card__text">
                  Automated integration tests simulated complete user workflows — registration, quiz
                  participation, and account management — to verify end-to-end system behavior rather
                  than isolated API endpoints.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <span className="cs-label">Challenges</span>
          <h2 className="cs-section__title">Problems Worth Solving</h2>
          <div className="cs-challenges">

            <div className="cs-challenge-card cs-animate">
              <div className="cs-challenge-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="26" height="26">
                  <rect x="2" y="3" width="9" height="8" rx="2"/><rect x="13" y="3" width="9" height="8" rx="2"/><rect x="2" y="13" width="9" height="8" rx="2"/><rect x="13" y="13" width="9" height="8" rx="2"/>
                </svg>
              </div>
              <h3 className="cs-challenge-card__title">Building a Multi-Platform System</h3>
              <p className="cs-challenge-card__text">
                Coordinating development across web, mobile, backend, and database teams required careful
                planning, clear communication, and well-defined API contracts. Early planning and shared
                documentation allowed each subsystem to evolve independently while remaining compatible
                during integration.
              </p>
            </div>

            <div className="cs-challenge-card cs-animate">
              <div className="cs-challenge-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="26" height="26">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="cs-challenge-card__title">Production Deployment</h3>
              <p className="cs-challenge-card__text">
                Deploying the application introduced new challenges including SSL certificate requirements,
                HTTPS configuration, dependency management, and cloud hosting. Solving these issues
                provided hands-on experience moving beyond local development into production-ready software.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL RESULT ── */}
      <section id="cs-demo" className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Final Result</span>
          <h2 className="cs-section__title">See It in Action</h2>

          <div className="cs-video-wrap cs-animate">
            <Img n={12} aspect="16/9" label="Demo Video" />
          </div>

          <div className="cs-result-grid cs-animate">
            <div className="cs-result-grid__item">
              <Img n={13} aspect="16/10" label="Teacher Dashboard" />
              <p className="cs-caption">Teacher Dashboard</p>
            </div>
            <div className="cs-result-grid__item">
              <Img n={14} aspect="16/10" label="Quiz Creation" />
              <p className="cs-caption">Quiz Creation</p>
            </div>
            <div className="cs-result-grid__item">
              <Img n={15} aspect="16/10" label="Student Mobile App" />
              <p className="cs-caption">Student Mobile App</p>
            </div>
            <div className="cs-result-grid__item">
              <Img n={16} aspect="16/10" label="Live Quiz Interface" />
              <p className="cs-caption">Live Quiz Interface</p>
            </div>
          </div>

          <div className="cs-outcomes cs-animate">
            <h3 className="cs-outcomes__title">Key Outcomes</h3>
            <ul className="cs-outcomes__list">
              {[
                "Designed and developed a responsive React web application for classroom management",
                "Collaborated on a full-stack architecture integrating React, Flutter, Node.js, and MongoDB",
                "Created interactive UI prototypes before implementation to streamline development",
                "Contributed to a cloud-deployed application with secure authentication, email verification, and RESTful APIs",
                "Participated in agile planning, collaborative development, and comprehensive testing across a multi-platform system",
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
