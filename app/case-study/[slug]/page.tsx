import { notFound } from "next/navigation";
import Link from "next/link";
import "../../styles/CaseStudy.css";
import UltrasonicRadar from "../content/UltrasonicRadar";
import ContactTube from "../content/ContactTube";
import Knighthoot from "../content/Knighthoot";

const PROJECTS = [
  { slug: "neonops",              title: "NeonOps: AI-Powered Kubernetes Visualization Platform" },
  { slug: "ultrasonic-radar",     title: "Ultrasonic Radar System" },
  { slug: "contacttube",          title: "ContactTube" },
  { slug: "knighthoot",           title: "Knighthoot" },
  { slug: "lidar-system",         title: "Auto-Focusing LiDAR System" },
  { slug: "shooting-gallery",     title: "Interactive Shooting Gallery Simulator" },
  { slug: "engineering-platform", title: "Engineering Management Platform" },
  { slug: "cubli",                title: "Cubli: Reaction Wheel Robot" },
];

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  if (slug === "ultrasonic-radar") return <UltrasonicRadar />;
  if (slug === "contacttube") return <ContactTube />;
  if (slug === "knighthoot") return <Knighthoot />;

  return (
    <main className="case-study">
      <div className="case-study__container">
        <Link href="/#projects" className="case-study__back">
          ← Back to Projects
        </Link>
        <h1 className="case-study__title">{project.title}</h1>
      </div>
    </main>
  );
}
