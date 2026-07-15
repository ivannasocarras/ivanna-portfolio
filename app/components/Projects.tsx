"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import "../styles/Projects.css";

const FILTERS = ["Featured", "What's Next?", "All", "Full Stack", "Embedded", "PCB Design", "Web Apps", "Mobile Apps", "AI/ML"] as const;
type Filter = (typeof FILTERS)[number];

type MediaSlide = { src: string; position?: string; fit?: "cover" | "contain" };
type MediaItem = string | MediaSlide | { group: string[] };

interface Phase {
  name: string;
  sections: { title: string; bullets: string[] }[];
}

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: Filter[];
  techStack: string[];
  github?: string;
  date: { month: number; year: number };
  activelyWorking?: boolean;
  progress?: number;
  images?: MediaItem[];
  hidden?: boolean;
  overview?: string;
  phases?: Phase[];
  status?: string;
}

// array order doesn't matter — sorted newest → oldest at render time
const PROJECTS: Project[] = [
  {
    id: 9,
    slug: "galvanometer-scanner",
    hidden: true,
    title: "Closed-Loop Laser Galvanometer Vector Scanner",
    activelyWorking: true,
    progress: 10,
    date: { month: 7, year: 2026 },
    description: "A high-precision 2D vector laser projection system built from scratch, combining custom closed-loop LQR control, analog signal conditioning, and a BLE telemetry pipeline that logs real-time tracking diagnostics to a PostgreSQL database.",
    overview: "The primary objective of this project is to engineer a high-precision, low-latency 2D vector laser projection system from scratch by overriding commercial hardware with custom closed-loop control and wireless telemetry. By interfacing an ESP32 microcontroller with a 20Kpps galvanometer mirror assembly, the system achieves deterministic, resonance-free laser beam steering through a custom-coded LQR optimal control loop, demonstrating full-stack mechatronic integration spanning custom analog signal conditioning, dual-core real-time embedded firmware, and an asynchronous BLE pipeline that logs high-frequency tracking diagnostics to a local PostgreSQL database.",
    phases: [
      {
        name: "Phase 1: Foundational Design & Component Engineering",
        sections: [
          {
            title: "Optical & Structural Architecture",
            bullets: [
              "Source a commercial 20Kpps ILDA-standard galvanometer assembly with dual-axis front-surface mirrors and integrated optical position-sensing photodiodes",
              "Integrate a 5mW green (532nm) laser diode with hardware TTL modulation for sub-millisecond beam blanking during vector transitions",
              "Leverage front-surface mirrors to eliminate rear-substrate reflections and ensure sharp, high-contrast vector lines",
            ],
          },
          {
            title: "Hardware & Analog Design",
            bullets: [
              "Integrate an external 12-bit dual-channel SPI DAC (MCP4922) to achieve 4,096 discrete positions per axis",
              "Design a custom analog front-end using precision op-amps (TL072/LM833) for high-fidelity signal mapping between MCU logic and the physical drive layers",
            ],
          },
          {
            title: "Embedded Software & Systems",
            bullets: [
              "Architect multi-threaded firmware in C++ using FreeRTOS — isolating the time-critical control loop on Core 0 while offloading telemetry to Core 1",
              "Engineer a low-latency BLE pipeline to stream live coordinate feedback and loop metrics to a mobile HMI console",
              "Design an asynchronous data bridge to forward tracking error metrics to a local PostgreSQL schema for control loop visualization",
            ],
          },
        ],
      },
      {
        name: "Phase 2: System Integration & Laser Beam Steering",
        sections: [
          {
            title: "Bipolar Signal Interfacing",
            bullets: [
              "Route coordinates via high-speed SPI to the 12-bit DAC and engineer a custom op-amp topology to shift 0–3.3V MCU signals into ±5V differential ILDA inputs required by the galvo driver boards",
            ],
          },
          {
            title: "Closed-Loop Feedback Bridging",
            bullets: [
              "Tap ±5V position feedback from the galvo's internal optical sensors and attenuate to 0–3.3V for sampling by the ESP32 ADC at 10kHz",
              "Implement the LQR algorithm inside a strict 10kHz hardware timer interrupt to eliminate overshoot, mechanical resonance, and settling time",
            ],
          },
          {
            title: "Optical Alignment & Synchronized Blanking",
            bullets: [
              "Align the 5mW green laser to strike the geometric center of the orthogonal X-Y mirror block",
              "Coordinate mirror positioning with a hardware TTL blanking line to disable the laser during coordinate jumps and eliminate trace lines",
            ],
          },
        ],
      },
    ],
    status: "Purchased a 20Kpps galvo kit and ESP32 hardware. Successfully benchmarked 12-bit SPI DAC throughput and verified analog signal conditioning on a breadboard. Currently tuning LQR state-space matrix gains.",
    tags: ["What's Next?", "Embedded"],
    techStack: ["ESP32", "C++", "FreeRTOS", "LQR Control", "MCP4922 DAC", "TL072/LM833", "BLE", "PostgreSQL", "SPI", "ADC", "TTL"],
  },
  {
    id: 8,
    slug: "neonops",
    hidden: true,
    title: "NeonOps: AI-Powered Kubernetes Visualization Platform",
    activelyWorking: true,
    progress: 10,
    date: { month: 7, year: 2026 },
    description:
      "A futuristic DevOps platform that transforms Kubernetes clusters into an interactive 3D cyberpunk city where infrastructure comes to life. Powered by an autonomous AI agent, the platform visualizes system health, analyzes failures, and helps engineers investigate issues through natural language and real-time infrastructure insights.",
    tags: ["What's Next?", "Full Stack", "AI/ML"],
    techStack: ["React", "React Three Fiber", "Three.js", "TypeScript", "Python", "Kubernetes", "Docker", "OpenAI API", "FastAPI", "WebSockets"],
    github: "#",
  },
  {
    id: 7,
    slug: "ultrasonic-radar",
    title: "Ultrasonic Radar System",
    images: [
      "/photos/projects/ultrasonic_radar/final_project.png",
      "/photos/projects/ultrasonic_radar/mainboard_pcb.png",
    ],
    date: { month: 3, year: 2025 },
    description:
      "A real-time radar visualization system that detects nearby objects using ultrasonic sensing and displays their position through an interactive radar interface. The project combines embedded firmware, sensor integration, and real-time data visualization to provide continuous environmental awareness.",
    tags: ["Embedded", "PCB Design"],
    techStack: ["ESP32", "C", "ESP-IDF", "HC-SR04", "Servo Motor", "Real-Time Systems", "SPI", "TFT Display"],
    github: "https://github.com/ivannasocarras/ultrasonic_radar",
  },
  {
    id: 6,
    slug: "contacttube",
    title: "ContactTube",
    images: [
      "/photos/projects/contacttube/initial_page.png",
      "/photos/projects/contacttube/registration_page.png",
      "/photos/projects/contacttube/registartion_password.png",
      "/photos/projects/contacttube/contacts_page.png",
    ],
    date: { month: 6, year: 2025 },
    description:
      "A modern contact management platform that simplifies organizing, searching, and managing personal and professional contacts. Built with a responsive user interface, secure backend, and database-driven architecture to provide a fast and intuitive user experience.",
    tags: ["Full Stack", "Web Apps"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "REST API", "Tailwind CSS", "Authentication"],
    github: "https://github.com/ivannasocarras/contacttube",
  },
  {
    id: 4,
    slug: "knighthoot",
    title: "Knighthoot",
    images: [
      "/photos/projects/knighthoot/01-front-page.png",
      "/photos/projects/knighthoot/02-login.png",
      "/photos/projects/knighthoot/04-account-type.png",
      "/photos/projects/knighthoot/05-student-registration.png",
      "/photos/projects/knighthoot/06-teacher-dashboard.png",
      "/photos/projects/knighthoot/07-student-dashboard.png",
    ],
    date: { month: 12, year: 2025 },
    description:
      "A real-time event management platform that simplifies communication through live updates, intelligent notifications, and seamless collaboration. Built with a scalable backend, relational database, and companion mobile application to deliver a connected user experience.",
    tags: ["Featured", "Full Stack", "Web Apps", "Mobile Apps"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "React Native", "Firebase", "REST API"],
    github: "https://github.com/ivannasocarras/knighthoot",
  },
  {
    id: 5,
    slug: "lidar-system",
    title: "Auto-Focusing LiDAR System",
    images: [
      "/photos/projects/lidar_system/image_1.webp",
      "/photos/projects/lidar_system/image_2.webp",
      "/photos/projects/lidar_system/image_3.webp",
      "/photos/projects/lidar_system/image_4.webp",
      "/photos/projects/lidar_system/optics.png",
    ],
    date: { month: 3, year: 2026 },
    description:
      "An intelligent LiDAR system that automatically adjusts lens position based on real-time distance measurements to maintain a focused laser beam. The project combines embedded firmware, sensor integration, motor control, and optical calibration to create a fully autonomous focusing system.",
    tags: ["Featured", "Embedded"],
    techStack: ["ESP32-S3", "C", "ESP-IDF", "Garmin LiDAR-Lite v3", "28BYJ-48 Stepper Motor", "I²C", "SPI", "ST7735 Display", "Real-Time Control", "Optical Calibration"],
    github: "https://github.com/ivannasocarras/Shooting-Gallery-Simulator",
  },
  {
    id: 3,
    slug: "shooting-gallery",
    title: "Interactive Shooting Gallery Simulator",
    images: [
      "/photos/projects/shooting%20gallery/showcase_picture.webp",
      "/photos/projects/shooting%20gallery/target_shot.mp4",
      "/photos/projects/shooting%20gallery/rifle_gun.webp",
      { src: "/photos/projects/shooting%20gallery/database.webp", position: "right center" },
      "/photos/projects/shooting%20gallery/scope_optics.png",
      "/photos/projects/shooting%20gallery/beam_expander.png",
    ],
    date: { month: 4, year: 2026 },
    description:
      "A laser-based shooting gallery simulator featuring real-time hit detection, distance measurement, and interactive gameplay. The system integrates custom electronics, optical sensing, embedded firmware, and touchscreen interfaces to create an immersive training experience.",
    tags: ["Featured", "Embedded"],
    techStack: ["ESP32-S3", "C", "ESP-IDF", "LVGL", "OPA2380", "SPI", "I²C", "PCB Design"],
    github: "https://github.com/ivannasocarras/Shooting-Gallery-Simulator",
  },
  {
    id: 2,
    slug: "engineering-platform",
    title: "Engineering Management Platform",
    date: { month: 5, year: 2026 },
    description:
      "A full-stack engineering platform developed alongside the Interactive Shooting Gallery Simulator to centralize project documentation, system architecture, testing, and development progress. The application combines database-driven workflows, secure authentication, and responsive dashboards to support the entire engineering lifecycle.",
    hidden: true,
    tags: ["Featured", "Full Stack", "Web Apps", "AI/ML"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "REST API", "Authentication", "Tailwind CSS"],
    github: "#",
  },
  {
    id: 1,
    slug: "cubli",
    title: "Cubli: Reaction Wheel Robot",
    images: [
      { src: "/photos/projects/cubli/IMG_4152.mov", fit: "contain" },
      "/photos/projects/cubli/pcb.png",
      "/photos/projects/cubli/Schematics.webp",
      {
        group: [
          "/photos/projects/cubli/app_1.webp",
          "/photos/projects/cubli/app_2.webp",
          "/photos/projects/cubli/app_3.webp",
        ],
      },
    ],
    activelyWorking: true,
    progress: 75,
    date: { month: 6, year: 2026 },
    description:
      "A custom-built reaction wheel robot capable of balancing on edges and vertices, jumping between orientations, and rotating in place using real-time feedback control. The project combines embedded firmware with a companion mobile app for wireless monitoring, telemetry, and control.",
    tags: ["What's Next?", "Embedded", "PCB Design", "Mobile Apps"],
    techStack: ["ESP-IDF", "FreeRTOS", "BLE", "React Native", "Expo", "NativeWind", "TypeScript"],
    github: "https://github.com/ivannasocarras/cubli",
  },
];

function normMedia(m: string | MediaSlide) {
  return typeof m === "string" ? { src: m, position: "center center" } : { position: "center center", ...m };
}

function ProjectImage({ images }: { images?: MediaItem[] }) {
  const n = images?.length ?? 0;
  // trackIdx: 0..n-1 are real images; n is the clone of images[0]
  const [trackIdx, setTrackIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = useRef(false);

  const dotIdx = trackIdx >= n ? 0 : trackIdx;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!images || n <= 1) return;
    timerRef.current = setTimeout(() => {
      if (!hoveredRef.current) slideTo("next");
    }, 10000);
  }, [images, n]); // eslint-disable-line react-hooks/exhaustive-deps

  // slide to a real index, or "next" to advance by 1 (handles clone)
  const slideTo = useCallback((target: number | "next") => {
    setTransitioning(true);
    if (target === "next") {
      setTrackIdx((i) => i + 1);
    } else {
      setTrackIdx(target);
    }
  }, []);

  // after sliding to the clone (index n), snap back to 0 without animation
  useEffect(() => {
    if (trackIdx !== n || n === 0) return;
    const snap = setTimeout(() => {
      setTransitioning(false);
      setTrackIdx(0);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setTransitioning(true);
        startTimer();
      }));
    }, 1000);
    return () => clearTimeout(snap);
  }, [trackIdx, n, startTimer]);

  // restart timer after each real slide completes
  useEffect(() => {
    if (trackIdx === n) return; // handled above
    const done = setTimeout(() => {
      setTransitioning(false);
      if (!hoveredRef.current) startTimer();
    }, 1000);
    return () => clearTimeout(done);
  }, [trackIdx, n, startTimer]);

  // start timer on mount
  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [startTimer]);

  if (!images || n === 0) {
    return (
      <div className="project-card__image-placeholder">
        <span>Image coming soon</span>
      </div>
    );
  }

  const track = [...images, images[0]];

  return (
    <div
      className="project-card__carousel"
      onMouseEnter={() => {
        hoveredRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        startTimer();
      }}
    >
      <div
        className="project-card__carousel-track"
        style={{
          transform: `translateX(-${trackIdx * 100}%)`,
          transition: transitioning ? "transform 1s ease" : "none",
        }}
      >
        {track.map((item, i) => {
          if (typeof item !== "string" && "group" in item) {
            return (
              <div key={i} className="project-card__carousel-group">
                {item.group.map((src, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt={`Screenshot ${(i % n) + 1}.${j + 1}`} className="project-card__carousel-group-img" />
                ))}
              </div>
            );
          }
          const m = normMedia(item);
          return m.src.endsWith(".mp4") || m.src.endsWith(".mov")
            ? <video key={i} className="project-card__carousel-img" autoPlay muted loop playsInline style={{ objectPosition: m.position, objectFit: m.fit }}>{/* .mov declared as video/mp4: browsers skip sources typed video/quicktime, but play H.264 .mov files fine */}<source src={m.src} type="video/mp4" /></video>
            // eslint-disable-next-line @next/next/no-img-element
            : <img key={i} src={m.src} alt={`Screenshot ${(i % n) + 1}`} className="project-card__carousel-img" style={{ objectPosition: m.position, objectFit: m.fit }} />;
        })}
      </div>
      {n > 1 && (
        <>
          <button
            className="project-card__carousel-btn project-card__carousel-btn--prev"
            onClick={(e) => { e.preventDefault(); if (!transitioning) slideTo((trackIdx - 1 + n) % n); }}
            aria-label="Previous"
          >‹</button>
          <button
            className="project-card__carousel-btn project-card__carousel-btn--next"
            onClick={(e) => { e.preventDefault(); if (!transitioning) slideTo("next"); }}
            aria-label="Next"
          >›</button>
          <div className="project-card__carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`project-card__carousel-dot${i === dotIdx ? " active" : ""}`}
                onClick={() => { if (!transitioning) slideTo(i); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TextProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card project-card--text">
      <div className="project-card__text-inner">
        {/* ── Header ── */}
        <div className="project-card__text-header">
          <div className="project-card__top">
            <div className="project-card__tags">
              {project.tags.filter((t) => t !== "Featured" && t !== "What's Next?").map((t) => (
                <span key={t} className="project-card__tag">{t}</span>
              ))}
              {project.activelyWorking && (
                <span className="project-card__active-wrap">
                  <span className="project-card__active-dot" />
                  <span className="project-card__active-tip">Currently in progress</span>
                </span>
              )}
            </div>
            <a href={project.github} className="project-card__github" aria-label="View on GitHub" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
          <h3 className="project-card__title">{project.title}</h3>
          {project.progress !== undefined && (
            <div className="project-card__progress" style={{ marginTop: "0.75rem" }}>
              <div className="project-card__progress-track">
                <div className="project-card__progress-fill" style={{ width: `${project.progress}%` }} />
                <div className="project-card__progress-thumb" style={{ left: `${project.progress}%` }}>
                  <span className="project-card__progress-tip">{project.progress}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Overview ── */}
        {project.overview && (
          <div className="project-card__text-overview">
            <p className="project-card__text-overview-label">Project Overview</p>
            <p className="project-card__text-overview-body">{project.overview}</p>
          </div>
        )}

        {/* ── Phases ── */}
        {project.phases && (
          <div className="project-card__phases">
            {project.phases.map((phase) => (
              <div key={phase.name} className="project-card__phase">
                <h4 className="project-card__phase-title">{phase.name}</h4>
                <div className="project-card__phase-sections">
                  {phase.sections.map((sec) => (
                    <div key={sec.title} className="project-card__phase-section">
                      <p className="project-card__phase-section-title">{sec.title}</p>
                      <ul className="project-card__phase-bullets">
                        {sec.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Status ── */}
        {project.status && (
          <div className="project-card__status">
            <span className="project-card__status-label">Current Status</span>
            <p className="project-card__status-body">{project.status}</p>
          </div>
        )}

        {/* ── Tech stack ── */}
        <div className="project-card__stack" style={{ marginTop: "1.5rem" }}>
          {project.techStack.map((t) => (
            <span key={t} className="project-card__stack-item">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Filter>("Featured");

  const visible = PROJECTS.filter((p) => !p.hidden);
  const filtered = (
    active === "All"
      ? visible
      : visible.filter((p) => p.tags.includes(active as Filter))
  ).slice().sort((a, b) => b.date.year - a.date.year || b.date.month - a.date.month);

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <span className="projects__label">PROJECTS</span>
        <h2 className="projects__title">Featured Works</h2>
        <p className="projects__caption">
          A selection of projects demonstrating my approach to building reliable
          software, embedded systems, and modern applications.
        </p>

        <div className="projects__filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`projects__filter-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__list">
          {filtered.map((project, idx) => project.phases ? (
            <TextProjectCard key={project.id} project={project} />
          ) : (
            <article
              key={project.id}
              className={`project-card${idx % 2 !== 0 ? " project-card--reverse" : ""}`}
            >
              {/* ── Image side ── */}
              <div className="project-card__image">
                <ProjectImage images={project.images} />
              </div>

              {/* ── Description side ── */}
              <div className="project-card__body">
                {/* top row: tags + github */}
                <div className="project-card__top">
                  <div className="project-card__tags">
                    {project.tags.filter((t) => t !== "Featured" && t !== "What's Next?").map((t) => (
                      <span key={t} className="project-card__tag">{t}</span>
                    ))}
                    {project.activelyWorking && (
                      <span className="project-card__active-wrap">
                        <span className="project-card__active-dot" />
                        <span className="project-card__active-tip">Currently in progress</span>
                      </span>
                    )}
                  </div>
                  <a
                    href={project.github}
                    className="project-card__github"
                    aria-label="View on GitHub"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>

                <div className="project-card__actions">
                  {project.progress !== undefined && (
                    <div className="project-card__progress">
                      <div className="project-card__progress-track">
                        <div
                          className="project-card__progress-fill"
                          style={{ width: `${project.progress}%` }}
                        />
                        <div
                          className="project-card__progress-thumb"
                          style={{ left: `${project.progress}%` }}
                        >
                          <span className="project-card__progress-tip">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <a href={`/case-study/${project.slug}`} className="project-card__case-btn">
                    {project.activelyWorking ? "Follow Development" : "Read Full Case Study"}
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a> */}
                </div>

                <div className="project-card__stack">
                  {project.techStack.map((t) => (
                    <span key={t} className="project-card__stack-item">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
