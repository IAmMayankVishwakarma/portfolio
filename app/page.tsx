import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Header from "./Global Components/Header";
import { translations, type Language } from "./translations";

type HomeProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

function getLanguage(value?: string | string[]): Language {
  return value === "hi" ? "hi" : "en";
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const { lang } = await searchParams;
  return translations[getLanguage(lang)].metadata;
}

export default async function Home({ searchParams }: HomeProps) {
  const { lang } = await searchParams;
  const language = getLanguage(lang);
  const t = translations[language];

  return (
    <>
      <Header language={language} />
      <main>
        <section className="hero-section page-width" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Mayank Vishwakarma <span> / </span> {t.hero.location}</p>
            <h1>{t.hero.lineOne}<br /><span>{t.hero.lineTwo}</span></h1>
            <p className="hero-description">
              {t.hero.description}
            </p>
            <p className="availability-note">{t.hero.availability}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experience">{t.hero.experienceLink} <span aria-hidden="true">↘</span></a>
              <a className="text-link" href="mailto:imayankvishwakarma@gmail.com">{t.hero.contactLink} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-art" aria-label={t.hero.artLabel} role="img">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-monogram">M<span>.</span></div>
            <p className="art-caption">LARAVEL <span>×</span> PHP <span>×</span> FULL-STACK</p>
          </div>
          <a className="scroll-cue" href="#about"><span /> {t.hero.scrollLabel}</a>
        </section>

        <section className="content-section page-width" id="about">
          <p className="section-index">01 <span>/</span> {t.about.section}</p>
          <div className="section-content">
            <h2>{t.about.titleLineOne}<br /><span>{t.about.titleLineTwo}</span></h2>
            <p className="section-description">{t.about.description}</p>
            <div className="profile-stats" aria-label={t.about.statsLabel}>
              <div><strong>4+</strong><span>{t.about.stats[0]}</span></div>
              <div><strong>10k+</strong><span>{t.about.stats[1]}</span></div>
              <div><strong>4</strong><span>{t.about.stats[2]}</span></div>
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="experience">
          <p className="section-index">02 <span>/</span> {t.experience.section}</p>
          <div className="section-content">
            <h2>{t.experience.titleLineOne}<br /><span>{t.experience.titleLineTwo}</span></h2>
            <p className="section-description">{t.experience.intro}</p>
            <div className="experience-list">
              {t.experience.entries.map((item) => (
                <article className="experience-item" key={`${item.company}-${item.dates}`}>
                  <div className="experience-heading">
                    <div>
                      <h3>{item.role}</h3>
                      <p className="experience-company">{item.company}</p>
                    </div>
                    <p className="experience-dates">{item.dates}</p>
                  </div>
                  {item.project && <p className="experience-project">{t.experience.projectPrefix} {item.project}</p>}
                  <ul>
                    {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="projects">
          <p className="section-index">03 <span>/</span> {t.projects.section}</p>
          <div className="section-content">
            <h2>{t.projects.titleLineOne}<br /><span>{t.projects.titleLineTwo}</span></h2>
            <p className="section-description">{t.projects.intro}</p>
            <div className="project-list">
              {t.projects.items.map((project, index) => (
                <a
                  className="project-item"
                  href={project.url}
                  key={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-name">{project.name}</span>
                  <span className="project-url">{new URL(project.url).hostname}</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="skills">
          <p className="section-index">04 <span>/</span> {t.skills.section}</p>
          <div className="section-content">
            <h2>{t.skills.titleLineOne}<br /><span>{t.skills.titleLineTwo}</span></h2>
            <div className="skill-groups">
              {t.skills.groups.map(({ category, details }) => (
                <div className="skill-group" key={category}>
                  <h3>{category}</h3>
                  <p>{details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="certifications">
          <p className="section-index">05 <span>/</span> {t.certifications.section}</p>
          <div className="section-content">
            <h2>{t.certifications.titleLineOne}<br /><span>{t.certifications.titleLineTwo}</span></h2>
            <ul className="credential-list">
              {t.certifications.items.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
            <div className="education-line">
              <p className="education-label">{t.certifications.education}</p>
              <p><strong>{t.certifications.degree}</strong><br />{t.certifications.institution}</p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-width contact-inner">
            <p className="section-index">06 <span>/</span> {t.contact.section}</p>
            <h2>{t.contact.titleLineOne}<br /><span>{t.contact.titleLineTwo}</span></h2>
            <p>{t.contact.description}</p>
            <div className="contact-links">
              <a href="mailto:imayankvishwakarma@gmail.com">imayankvishwakarma@gmail.com <span aria-hidden="true">↗</span></a>
              <a href="tel:+919669635212">+91 96696 35212 <span aria-hidden="true">↗</span></a>
            </div>
            <div className="profile-links" aria-label="Professional profiles">
              {t.contact.socialLinks.map(({ label, url }) => (
                <a href={url} key={label} target="_blank" rel="noreferrer">
                  {label}<ExternalLink size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
            <a className="button button-primary" href="mailto:imayankvishwakarma@gmail.com">{t.contact.emailAction} <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <a className="footer-brand" href="#home">Mayank Vishwakarma<span>.</span></a>
        <p>{t.footer.role} <span aria-hidden="true">·</span> {t.footer.location}</p>
      </footer>
    </>
  );
}
