"use client";

import Image from "next/image";
import { useState } from "react";
import "../styles/Skills.css";

interface Skill {
  name: string;
  color: string;
  icon: string;
  logo?: string;
}

interface Category {
  label: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    label: "Programming Languages",
    skills: [
      { name: "C",           color: "#5fa8ff", icon: "C",   logo: "/photos/skills/c_Logo.png"          },
      { name: "C++",         color: "#6b9ef5", icon: "C++", logo: "/photos/skills/C++_Logo.png"        },
      { name: "Python",      color: "#ffd23f", icon: "Py",  logo: "/photos/skills/python_Logo.png"     },
      { name: "Java",        color: "#f5814a", icon: "Jv",  logo: "/photos/skills/java_logo.webp" },
      { name: "JavaScript",  color: "#ffd23f", icon: "JS",  logo: "/photos/skills/javascript_Logo.png" },
      { name: "TypeScript",  color: "#5fa8ff", icon: "TS",  logo: "/photos/skills/typescript_Logo.webp"},
      { name: "MySQL",       color: "#6ee7d8", icon: "SQL", logo: "/photos/skills/mysql_Logo.png" },
      { name: "HTML5",       color: "#f5814a", icon: "HT",  logo: "/photos/skills/html_Logo.png"       },
      { name: "CSS3",        color: "#8b6fb8", icon: "CS",  logo: "/photos/skills/css_Logo.webp"       },
    ],
  },
  {
    label: "Full Stack",
    skills: [
      { name: "React",        color: "#5fa8ff", icon: "Re",  logo: "/photos/skills/react_Logo.png"     },
      { name: "Next.js",      color: "#e0e0e0", icon: "Nx",  logo: "/photos/skills/next.js_Logo.webp"  },
      { name: "React Native", color: "#5fa8ff", icon: "RN",  logo: "/photos/skills/react_Logo.png"     },
      { name: "Expo Go",      color: "#e0e0e0", icon: "Ex",  logo: "/photos/skills/expogo_Logo.png" },
      { name: "Node.js",      color: "#4cd964", icon: "No",  logo: "/photos/skills/node.js_Logo.webp"  },
      { name: "ExpressJS",    color: "#8c8c98", icon: "Exp", logo: "/photos/skills/expressjs_Logo.webp" },
      { name: "Tailwind CSS", color: "#6ee7d8", icon: "TW",  logo: "/photos/skills/tailwind_Logo.png"  },
      { name: "RESTful API",  color: "#8b6fb8", icon: "API", logo: "/photos/skills/restfulapi_Logo.png" },
    ],
  },
  {
    label: "Backend & Databases",
    skills: [
      { name: "PostgreSQL",      color: "#5fa8ff", icon: "PG",  logo: "/photos/skills/Postgresql_Logo.webp" },
      { name: "Firebase",        color: "#ffd23f", icon: "FB",  logo: "/photos/skills/firebase_Logo.png"    },
      { name: "Supabase",        color: "#4cd964", icon: "SB",  logo: "/photos/skills/supabase_Logo.webp"   },
      { name: "MongoDB",         color: "#4cd964", icon: "Mg",  logo: "/photos/skills/mongoDB_Logo.png"     },
      { name: "Authentication",  color: "#8b6fb8", icon: "Au",  logo: "/photos/skills/authentication_Logo.svg" },
      { name: "Cloud Functions", color: "#5fa8ff", icon: "CF",  logo: "/photos/skills/cloud_Logo.png"           },
    ],
  },
  {
    label: "Embedded",
    skills: [
      { name: "ESP-IDF",      color: "#4cd964", icon: "IDF", logo: "/photos/skills/esp_Logo.png"      },
      { name: "FreeRTOS",     color: "#6ee7d8", icon: "RT",  logo: "/photos/skills/freeRTOS_Logo.png" },
      { name: "Arduino",      color: "#6ee7d8", icon: "Ar",  logo: "/photos/skills/arduino_Logo.png"  },
      { name: "Bluetooth LE", color: "#5fa8ff", icon: "BLE" },
      { name: "UART",         color: "#8c8c98", icon: "UA"  },
      { name: "SPI",          color: "#8c8c98", icon: "SPI" },
      { name: "I²C",          color: "#8c8c98", icon: "I²C" },
      { name: "CAN",          color: "#f5814a", icon: "CAN" },
      { name: "LVGL",         color: "#8b6fb8", icon: "LV"  },
    ],
  },
  {
    label: "Robotics & Control",
    skills: [
      { name: "PID Control",       color: "#8b6fb8", icon: "PID" },
      { name: "LQR Control",       color: "#8b6fb8", icon: "LQR" },
      { name: "Sensor Fusion",     color: "#6ee7d8", icon: "SF"  },
      { name: "IMU Integration",   color: "#5fa8ff", icon: "IMU" },
      { name: "LiDAR",             color: "#ffd23f", icon: "LD"  },
      { name: "Motor Control",     color: "#f5814a", icon: "MC"  },
      { name: "Real-Time Systems", color: "#4cd964", icon: "RTS" },
      { name: "Optical Systems",   color: "#6ee7d8", icon: "OPT" },
    ],
  },
  {
    label: "Engineering Tools",
    skills: [
      { name: "Git",             color: "#f5814a", icon: "Gt",  logo: "/photos/skills/git_Logo.png"       },
      { name: "GitHub",          color: "#e0e0e0", icon: "GH",  logo: "/photos/skills/github_Logo.png"    },
      { name: "GitLab",          color: "#f5814a", icon: "GL",  logo: "/photos/skills/gitlab_Logo.webp"    },
      { name: "VS Code",         color: "#5fa8ff", icon: "VS",  logo: "/photos/skills/vscode_Logo.png"    },
      { name: "KiCad",           color: "#4cd964", icon: "Ki",  logo: "/photos/skills/kicad_Logo.png"     },
      { name: "Fusion 360",      color: "#f5814a", icon: "F3",  logo: "/photos/skills/fusion360_Logo.png" },
      { name: "SolidWorks",      color: "#ff5a5f", icon: "SW",  logo: "/photos/skills/solidworks_Logo.png"},
      { name: "MATLAB",          color: "#ffd23f", icon: "ML",  logo: "/photos/skills/matlab_Logo.png"    },
      { name: "PlatformIO",      color: "#f5814a", icon: "PIO", logo: "/photos/skills/PlatformIO_logo.svg"},
    ],
  },
  {
    label: "DevOps & Deployment",
    skills: [
      { name: "Docker",          color: "#5fa8ff", icon: "Dk",  logo: "/photos/skills/docker_Logo.png"    },
      { name: "Vercel",          color: "#e0e0e0", icon: "Vc",  logo: "/photos/skills/vercel_Logo.webp"  },
      { name: "Linux",           color: "#ffd23f", icon: "Lx",  logo: "/photos/skills/linux_Logo.png"    },
      { name: "WSL",             color: "#4cd964", icon: "WSL", logo: "/photos/skills/wsl_Logo.png"      },
      { name: "Nginx",           color: "#4cd964", icon: "Nx",  logo: "/photos/skills/nginx_Logo.webp"   },
    ],
  },
];

const ALL_SKILLS = CATEGORIES.flatMap((c) => c.skills);

export default function Skills() {
  const [active, setActive] = useState("Programming Languages");

  const displayed =
    active === "All"
      ? ALL_SKILLS
      : CATEGORIES.find((c) => c.label === active)?.skills ?? [];

  return (
    <section id="skills" className="skills">
      <div className="skills__container">
        <span className="skills__label">MY SKILLS</span>
        <h2 className="skills__title">Technologies and Tools</h2>

        {/* ── Category tabs ── */}
        <div className="skills__tabs">
          {["All", ...CATEGORIES.map((c) => c.label)].map((tab) => (
            <button
              key={tab}
              className={`skills__tab${active === tab ? " active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Skill grid ── */}
        <div className="skills__grid">
          {displayed.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div
                className="skill-card__icon"
                style={skill.logo ? { background: "transparent", color: skill.color } : { background: `${skill.color}18`, color: skill.color }}
              >
                {skill.logo ? (
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={72}
                    height={72}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  skill.icon
                )}
              </div>
              <p className="skill-card__name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrolling ticker (two rows) ── */}
      {(() => {
        const half = Math.ceil(ALL_SKILLS.length / 2);
        const row1 = ALL_SKILLS.slice(0, half);
        const row2 = ALL_SKILLS.slice(half);
        return (
          <div className="skills__ticker-wrap">
            {/* row 1 — scrolls left */}
            <div className="skills__ticker">
              {[...row1, ...row1].map((skill, i) => (
                <span key={i} className="skills__ticker-pill"
                  style={{ color: skill.color, borderColor: `${skill.color}40` }}
                  onClick={() => {
                    const cat = CATEGORIES.find((c) => c.skills.some((s) => s.name === skill.name));
                    if (cat) setActive(cat.label);
                  }}>
                  {skill.name}
                </span>
              ))}
            </div>
            {/* row 2 — scrolls right */}
            <div className="skills__ticker skills__ticker--reverse">
              {[...row2, ...row2].map((skill, i) => (
                <span key={i} className="skills__ticker-pill"
                  style={{ color: skill.color, borderColor: `${skill.color}40` }}
                  onClick={() => {
                    const cat = CATEGORIES.find((c) => c.skills.some((s) => s.name === skill.name));
                    if (cat) setActive(cat.label);
                  }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
