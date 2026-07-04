"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../../styles/CaseStudyContent.css";

function Img({ n, aspect = "16/9" }: { n: number; aspect?: string }) {
  return (
    <div className="cs-img-placeholder" style={{ aspectRatio: aspect }}>
      <span>Image {n}</span>
    </div>
  );
}

export default function UltrasonicRadar() {
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
      <section className="cs-hero">
        <div className="cs-hero__image">
          <Img n={1} aspect="auto" />
        </div>
        <div className="cs-hero__content">
          <div className="cs-hero__inner">
            <span className="cs-label">Case Study</span>
            <h1 className="cs-hero__title">Ultrasonic Radar System</h1>
            <p className="cs-hero__desc">
              Designed and manufactured a complete embedded system featuring a
              custom PCB, onboard power regulation, real-time MSP430 firmware,
              and full laboratory validation — from schematic to soldered hardware.
            </p>
            <div className="cs-tech-pills">
              {[
                "C",
                "MSP430",
                "Embedded Systems",
                "PCB Design",
                "Fusion 360 Electronics",
                "SMD Assembly",
                "Hardware Validation",
              ].map((t) => (
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
              <a
                href="#"
                className="cs-github-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <div className="cs-overview__grid">
            <div className="cs-overview__text">
              <span className="cs-label">Project Overview</span>
              <h2 className="cs-section__title">From Schematic to Manufactured PCB</h2>
              <p className="cs-body">
                The objective of this project was to design a fully functional embedded system capable
                of measuring distance using an ultrasonic sensor and displaying live readings on an
                LCD. Every subsystem — power delivery, sensing, display, and firmware — was integrated
                onto a custom-designed printed circuit board rather than a breadboard.
              </p>
              <p className="cs-body">
                Throughout the project I designed voltage regulation circuits, developed embedded
                firmware in C, manufactured the PCB, hand-assembled surface-mount components,
                debugged hardware issues, and validated performance using professional laboratory
                equipment including an oscilloscope and thermal camera.
              </p>
            </div>
            <div className="cs-overview__diagram">
              <Img n={2} aspect="4/3" />
              <p className="cs-caption">System Block Diagram</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN PROCESS ── */}
      <section className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Design Process</span>
          <h2 className="cs-section__title">Engineering from First Principles</h2>
          <div className="cs-cards-3">

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={3} aspect="4/3" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">System Design</h3>
                <p className="cs-card__text">
                  Designed the complete electrical schematic integrating the MSP430 microcontroller,
                  ultrasonic sensor, LCD interface, switching regulators, LEDs, and user inputs into
                  a single embedded platform. Component selection and routing decisions balanced
                  functionality, manufacturability, and board size.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={4} aspect="4/3" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">PCB Layout</h3>
                <p className="cs-card__text">
                  After schematic validation, the board was laid out in Fusion 360 Electronics. Trace
                  routing, connector placement, and component footprints were optimized to simplify
                  assembly while maintaining clean signal routing and power distribution across the board.
                </p>
              </div>
            </div>

            <div className="cs-card cs-animate">
              <div className="cs-card__image">
                <Img n={5} aspect="4/3" />
              </div>
              <div className="cs-card__body">
                <h3 className="cs-card__title">Firmware Development</h3>
                <p className="cs-card__text">
                  Firmware was written in C for the MSP430 to drive the ultrasonic sensor, update the
                  LCD in real time, read potentiometer inputs, and manage onboard LEDs. Initial
                  development iterated on a breadboard prototype before the final system moved to PCB.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PCB MANUFACTURING ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <span className="cs-label">PCB Manufacturing</span>
          <h2 className="cs-section__title">From Bare Board to Assembled Hardware</h2>
          <div className="cs-steps">
            {[
              { n: 6,  label: "Stencil" },
              { n: 7,  label: "Solder Paste" },
              { n: 8,  label: "Component Placement" },
              { n: 9,  label: "Completed PCB" },
            ].map((step, i, arr) => (
              <div key={step.n} className="cs-steps__item">
                <div className="cs-steps__image">
                  <Img n={step.n} aspect="1/1" />
                </div>
                <p className="cs-steps__label">{step.label}</p>
                {i < arr.length - 1 && <div className="cs-steps__arrow">→</div>}
              </div>
            ))}
          </div>
          <p className="cs-body cs-body--center">
            The PCB was assembled using stencil-applied solder paste, surface-mount component placement,
            reflow soldering, and manual through-hole soldering. After assembly, regulators, the LCD
            display, ultrasonic sensor, and remaining peripherals were installed and tested.
          </p>
        </div>
      </section>

      {/* ── TESTING & VALIDATION ── */}
      <section className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Testing &amp; Validation</span>
          <h2 className="cs-section__title">Verified with Professional Lab Equipment</h2>
          <div className="cs-cards-2">

            <div className="cs-val-card cs-animate">
              <div className="cs-val-card__image">
                <Img n={10} aspect="4/3" />
              </div>
              <div className="cs-val-card__body">
                <h3 className="cs-val-card__title">Oscilloscope</h3>
                <p className="cs-val-card__text">
                  Measured output ripple to verify regulator stability and switching performance under load.
                </p>
              </div>
            </div>

            <div className="cs-val-card cs-animate">
              <div className="cs-val-card__image">
                <Img n={11} aspect="4/3" />
              </div>
              <div className="cs-val-card__body">
                <h3 className="cs-val-card__title">Thermal Camera</h3>
                <p className="cs-val-card__text">
                  Validated regulator thermal performance under sustained load to confirm safe operating temperatures across the board.
                </p>
              </div>
            </div>

            <div className="cs-val-card cs-animate">
              <div className="cs-val-card__image">
                <Img n={12} aspect="4/3" />
              </div>
              <div className="cs-val-card__body">
                <h3 className="cs-val-card__title">Bench Equipment</h3>
                <p className="cs-val-card__text">
                  Measured output voltage and current draw using precision bench instruments to verify regulator accuracy and load regulation.
                </p>
              </div>
            </div>

            <div className="cs-val-card cs-animate">
              <div className="cs-val-card__image">
                <Img n={13} aspect="4/3" />
              </div>
              <div className="cs-val-card__body">
                <h3 className="cs-val-card__title">Finished System</h3>
                <p className="cs-val-card__text">
                  Confirmed full firmware and hardware integration by displaying live ultrasonic distance measurements on the LCD in real time.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ENGINEERING CHALLENGE ── */}
      <section className="cs-section cs-animate">
        <div className="cs-container">
          <div className="cs-challenge">
            <span className="cs-label cs-label--highlight">Engineering Challenge</span>
            <h2 className="cs-challenge__title">Debugging a PCB Routing Error</h2>
            <p className="cs-challenge__text">
              During initial hardware bring-up, a portion of the board failed to operate correctly due
              to a routing error introduced during PCB layout. After tracing the signal path and
              isolating the missing connection with a multimeter, the board was repaired with a manual
              jumper wire to restore full functionality. This hands-on debugging experience reinforced
              the importance of thorough design rule checks, schematic review, and post-fabrication
              continuity testing before committing to a second PCB revision.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL RESULT ── */}
      <section id="cs-demo" className="cs-section cs-section--alt cs-animate">
        <div className="cs-container">
          <span className="cs-label">Final Result</span>
          <h2 className="cs-section__title">System Demonstration</h2>

          <div className="cs-video-wrap">
            <Img n={14} aspect="16/9" />
          </div>

          <div className="cs-final-images">
            <Img n={15} aspect="4/3" />
            <Img n={16} aspect="4/3" />
            <Img n={17} aspect="4/3" />
          </div>

          <div className="cs-outcomes cs-animate">
            <h3 className="cs-outcomes__title">Key Outcomes</h3>
            <ul className="cs-outcomes__list">
              {[
                "Designed a complete embedded system from schematic through manufactured PCB",
                "Developed real-time firmware in C for the MSP430 microcontroller",
                "Manufactured and assembled a custom PCB using SMD reflow and through-hole techniques",
                "Validated power delivery and system performance using oscilloscopes, a thermal camera, and precision bench instruments",
                "Debugged and resolved a PCB routing error through systematic hardware analysis",
                "Successfully integrated sensing, display, power regulation, and firmware into a single embedded platform",
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
          <Link href="/#projects" className="case-study__back">← Back to Projects</Link>
        </div>
      </div>

    </div>
  );
}
