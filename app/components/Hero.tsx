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
          Building software and systems that solve real problems
        </h1>

        <p className="hero__intro">
          I&apos;m a computer engineer who builds full-stack applications,
          embedded software, real-time systems, and automation solutions. I
          enjoy taking projects from an initial idea all the way to a
          polished product.
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
