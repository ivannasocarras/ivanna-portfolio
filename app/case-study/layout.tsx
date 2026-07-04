import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/CaseStudyLayout.css";

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="case-study-bar">
        <Link href="/#projects" className="case-study-bar__back">← Back to Projects</Link>
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
