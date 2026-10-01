"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { translations, type Language } from "../translations";

type Theme = "light" | "dark";

const themeChangeEvent = "portfolio-theme-change";
const navItemIds = ["home", "about", "experience", "projects", "skills", "certifications", "contact"];
function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener(themeChangeEvent, callback);
  return () => window.removeEventListener(themeChangeEvent, callback);
}

const Header = ({ language }: { language: Language }) => {
  const router = useRouter();
  const labels = translations[language].header;
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: labels.home, id: "home" },
    { label: labels.about, id: "about" },
    { label: labels.experience, id: "experience" },
    { label: labels.projects, id: "projects" },
    { label: labels.skills, id: "skills" },
    { label: labels.certifications, id: "certifications" },
    { label: labels.contact, id: "contact" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme: Theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.dataset.theme = initialTheme;
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    navItemIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "hi" : "en";
    router.push(`/?lang=${nextLanguage}${window.location.hash}`);
  };

  const closeMenu = (sectionId: string) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={() => closeMenu("home")} aria-label="Mayank Vishwakarma home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span className="brand-name">Mayank Vishwakarma<span className="brand-period">.</span></span>
        </a>

        <nav id="mobile-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label={labels.navigationLabel}>
          {navItems.map(({ label, id }) => (
            <a
              className={`nav-link${activeSection === id ? " is-active" : ""}`}
              href={`#${id}`}
              key={id}
              onClick={() => closeMenu(id)}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? labels.switchToLight : labels.switchToDark}
            title={theme === "dark" ? labels.switchToLight : labels.switchToDark}
          >
            {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button
            className="language-toggle"
            type="button"
            onClick={toggleLanguage}
            aria-label={labels.languageLabel}
            title={labels.languageLabel}
          >
            {labels.languageButton}
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;