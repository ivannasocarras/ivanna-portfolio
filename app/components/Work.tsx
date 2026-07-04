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
    period: "Nov 2025 – Present",
    current: true,
    bullets: [
      "Accomplished on-time delivery of frontend features across five business dashboards (AI assistant, accounting, admin, order flow, purchasing, sales) by co-leading the intern frontend team, assigning tasks, and reviewing implementation against UX requirements.",
      "Accomplished a polished AI business-assistant interface, approved by project managers with minimal revision cycles, by designing and building the dashboard frontend in React and JavaScript.",
      "Accomplished improved page reliability by load-testing dashboard software and implementing fixes across all five business dashboards, reducing latency-related defects.",
      "Accomplished higher-quality API integrations with fewer post-deployment defects by researching, evaluating, and selecting third-party APIs against defined technical requirements before production approval.",
    ],
    tags: ["React", "JavaScript", "Frontend", "API Integration", "Load Testing"],
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
