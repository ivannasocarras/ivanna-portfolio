import Image from "next/image";
import "../styles/About.css";

const specializations = [
  "Embedded Systems",
  "Electro-Optical Systems",
  "Optical Sensing & Imaging",
  "PCB & Electronics Design",
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <span className="about__label">ABOUT</span>

        <div className="about__body">
          {/* ── Bio ── */}
          <div className="about__text">
            <h2 className="about__title">Get to Know Me</h2>
            <p>
              I&apos;m an embedded and electro-optical engineer who enjoys building
              complete systems that connect electronics, optics, firmware, and
              mechanical design. I like working on products that interact with the
              physical world, whether that&apos;s through lasers, imaging systems,
              sensors, or precision embedded hardware.
            </p>
            <p>
              I enjoy taking projects from an early concept to a working prototype.
              That means defining requirements, designing electronics, writing
              embedded software, integrating hardware, testing performance, and
              refining the system until it works reliably. I find the most rewarding
              projects are the ones that require thinking across multiple engineering
              disciplines rather than focusing on a single component.
            </p>
            <p>
              My background in computer engineering gave me a strong foundation in
              embedded systems and electronics. As I continue my education in optics
              and photonics, I&apos;m expanding that foundation into electro-optical
              system design, imaging, and sensing technologies. My goal is to design
              products where optics, electronics, and embedded software work together
              as a single system.
            </p>
            <p>
              I&apos;m always looking for opportunities to build projects that
              challenge me technically and teach me something new. Every project is a
              chance to become a better engineer, whether that means designing a
              custom PCB, integrating a new sensor, developing embedded firmware, or
              improving the performance of an optical system.
            </p>
          </div>

          {/* ── Sidebar ── */}
          <div className="about__sidebar">
            {/* Headshot */}
            <div className="about__headshot-wrap">
              <Image
                src="/photos/headshot.png"
                alt="Ivanna Socarras"
                width={320}
                height={320}
                className="about__headshot"
              />
            </div>

            {/* Education */}
            <div className="about__card">
              <p className="about__card-label">Education</p>

              <h3 className="about__card-title">
                Bachelor of Science
                <br />
                Computer Engineering
              </h3>
              <p className="about__card-school">University of Central Florida</p>
              <p className="about__card-year">Conferred May 2026</p>

              <div className="about__card-divider" />

              <h3 className="about__card-title">
                Bachelor of Science
                <br />
                Photonic Science and Engineering
              </h3>
              <p className="about__card-school">University of Central Florida</p>
              <p className="about__card-year">Expected May 2027</p>

              <div className="about__card-divider" />

              <h3 className="about__card-title">
                Master of Science
                <br />
                Optics and Photonics
              </h3>
              <p className="about__card-school">University of Central Florida</p>
              <p className="about__card-school">Accelerated 4+1 Program</p>
              <p className="about__card-year">Expected May 2028</p>
            </div>

            {/* Specializations */}
            <div className="about__card">
              <p className="about__card-label">Specializations</p>
              <ul className="about__spec-list">
                {specializations.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
