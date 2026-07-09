import Image from "next/image";
import "../styles/About.css";

const specializations = [
  "Full-Stack Development",
  "Embedded Systems",
  "Real-Time Software",
  "Automation & IoT",
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
              I am a full-stack and embedded developer with a recent degree from
              the University of Central Florida in Computer Engineering. I have
              built a passion for bringing together full-lifecycle products that
              integrate the use of software, hardware, and user experience. In my
              career thus far I have learned that what most excites me is being
              able to create software that goes beyond just the screen.
            </p>
            <p>
              I have loved developing web and mobile applications that communicate
              with embedded devices in ways such as visualizing and integrating
              sensor data directly in real-time as well as developing automation
              solutions. I also enjoy creating applications that make technology
              more accessible and enjoyable to use whether it be by designing
              responsive user interfaces and expandable backend services or by
              integrating APIs and databases.
            </p>
            <p>
              Working on both sides has given me a strong appreciation for how
              software and hardware influence one another. Instead of treating
              them as separate disciplines, I build products where they complement
              each other in order to bring a more capable and reliable system.
            </p>
            <p>
              I&apos;m heavily motivated by continuous learning and taking on
              projects that push me beyond my comfort zone, using every project as
              an opportunity to learn new technologies and refine my engineering
              practices to build something meaningful. My goal is to bridge the
              gap between full-stack software and embedded systems to create
              products that extend beyond the screen and into the real world.
            </p>
          </div>

          {/* ── Sidebar ── */}
          <div className="about__sidebar">
            <div className="about__sidebar-inner">
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
      </div>
    </section>
  );
}
