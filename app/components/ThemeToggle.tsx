"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const initial = stored === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

    // stay in sync when the pull cord (or any other source) changes the theme
    function onExternalChange(e: Event) {
      setTheme((e as CustomEvent<string>).detail as "dark" | "light");
    }
    window.addEventListener("themechange", onExternalChange);
    return () => window.removeEventListener("themechange", onExternalChange);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    // tell the arm to animate first; theme flips at the pull moment (~400ms)
    window.dispatchEvent(new CustomEvent("armPullCord", { detail: next }));
    setTimeout(() => {
      setTheme(next);
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("theme", next);
      window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    }, 720); // fires at peak of arm pull (Phase 4)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      aria-pressed={theme === "light"}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
      <span className="theme-toggle__track">
        <span className={`theme-toggle__thumb ${theme === "light" ? "is-light" : ""}`} />
      </span>
    </button>
  );
}
