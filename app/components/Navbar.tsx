"use client";

import Link from "next/link";
import "../styles/Navbar.css";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          Ivanna Socarras
        </Link>

        <nav className="navbar__center">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="navbar__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
