import "../styles/Hero.css";
import WorkspaceIllustration from "./WorkspaceIllustration";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__left">
        <WorkspaceIllustration />
      </div>

      <div className="hero__right">
        <p className="hero__greeting">👋 Hi, I&apos;m Ivanna</p>

        <h1 className="hero__title">
          Designing systems where electronics, optics, and software come together.
        </h1>

        <p className="hero__intro">
          I&apos;m an engineer focused on embedded and electro-optical systems.
          I enjoy designing complete products that combine electronics, optics,
          firmware, and mechanical design, taking ideas from early prototypes
          to working hardware.
        </p>

        <div className="hero__buttons">
          <a href="#projects" className="hero__primary-btn">
            View Projects <span>→</span>
          </a>
          <a href="#contact" className="hero__secondary-btn">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
