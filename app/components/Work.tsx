import "../styles/Work.css";

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
  tags: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Software Engineer Intern",
    company: "Minoria Tech",
    location: "Orlando, FL",
    period: "Nov 2025 – May 2026",
    current: false,
    bullets: [
      "Engineered end-to-end features for a high-volume fintech sales portal, utilizing C# and the .NET framework to seamlessly integrate responsive frontend interfaces with secure, automated backend business logic.",
      "Designed and deployed REST API integrations and AI-driven backend automation tools within the .NET ecosystem, significantly reducing manual workflow processing time and accelerating sales task completion rates.",
      "Helped in the implementation of an OpenAI-powered fintech AI agent that securely connects to banking APIs to track spending, analyze cash flow, and execute multi-step user requests, using function calling and code interpreter to generate real-time, personalized investment and budgeting strategies.",
      "Helped include security guardrails around agent-initiated financial actions, including data encryption ensuring safe autonomous operation within a regulated fintech environment.",
    ],
    tags: ["C#", ".NET", "REST APIs", "AI Automation", "Fintech", "Backend"],
  },
  {
    id: 2,
    role: "Junior Knights Java Programming Instructor",
    company: "University of Central Florida",
    location: "Orlando, FL",
    period: "Dec 2023 – May 2024",
    current: false,
    bullets: [
      "Accomplished competition readiness for students, resulting in a 3rd-place regional finish, by mentoring in object-oriented design, algorithmic thinking, and Java, evaluating progress against benchmarks and prioritizing skill gaps.",
    ],
    tags: ["Java", "OOP", "Algorithms", "Teaching", "Mentoring"],
  },
];

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work__container">
        <span className="work__label">EXPERIENCE</span>
        <h2 className="work__title">Where I&apos;ve Made an Impact</h2>

        <div className="work__timeline">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="work__entry">

              {/* ── Left: company info ── */}
              <div className="work__meta">
                <p className="work__period">{exp.period}</p>
                <p className="work__company">{exp.company}</p>
                <p className="work__location">{exp.location}</p>
                {exp.current && (
                  <span className="work__badge">
                    <span className="work__badge-dot" />
                    Current
                  </span>
                )}
              </div>

              {/* ── Center: timeline line + dot ── */}
              <div className="work__line-col">
                <div className="work__dot" />
                <div className="work__line" />
              </div>

              {/* ── Right: role + bullets + tags ── */}
              <div className="work__body">
                <h3 className="work__role">{exp.role}</h3>
                <ul className="work__bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="work__tags">
                  {exp.tags.map((t) => (
                    <span key={t} className="work__tag">{t}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
