import { lazy, Suspense, useEffect, useState } from 'react'
import {
  profile,
  education,
  nav,
  experience,
  projects,
  skills,
  achievements,
  activities,
} from './data.js'
import TypewriterText from './components/TypewriterText.jsx'
import ScrollReveal from './components/ScrollReveal.jsx'
import TiltProjectCard from './components/TiltProjectCard.jsx'
import { useInViewOnce } from './hooks/useInViewOnce.js'

const ParticleBackground = lazy(() => import('./components/ParticleBackground.jsx'))

const HERO_HEADLINE = 'Driven by Why, What If, and How.'

function SectionHead({ eyebrow, title, intro, id }) {
  const [headRef, inView] = useInViewOnce()

  return (
    <header ref={headRef} className="section__head">
      {eyebrow && (
        <ScrollReveal as="span" className="section__eyebrow reveal--inline" delay={0}>
          {eyebrow}
        </ScrollReveal>
      )}
      <h2 id={`${id}-title`} className="section__title">
        <TypewriterText
          as="span"
          text={title}
          active={inView}
          speed={52}
          showCursor={inView}
        />
      </h2>
      {intro && (
        <ScrollReveal as="p" className="section__intro" delay={120}>
          {intro}
        </ScrollReveal>
      )}
    </header>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || !els.length) return undefined
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -40% 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="wrap site-header__bar">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__logo" aria-hidden="true">D</span>
          <span className="brand__name">Dhanyatha D</span>
        </a>

        <button
          type="button"
          className={`menu-btn ${open ? 'menu-btn--open' : ''}`}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
        </button>

        <nav id="main-nav" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main Navigation">
          <div className="nav__links">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`nav__item ${active === n.id ? 'is-active' : ''}`}
                aria-current={active === n.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="nav__actions">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
              onClick={() => setOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              className="btn btn--gradient btn--sm"
              onClick={() => setOpen(false)}
            >
              <span>Let’s Talk</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-center wrap">
      <div className="hero-center__content hero-center__content--enter">
        <h1 className="hero-center__title">
          <TypewriterText
            as="span"
            text={HERO_HEADLINE}
            active
            speed={55}
            startDelay={280}
            showCursor
          />
        </h1>

        <p className="hero-center__lede hero-stagger" style={{ '--hero-stagger': 0 }}>
          I’m Dhanyatha, a Computer Science student exploring ideas, experimenting with technology and building software that solves real problems.
        </p>

        <div className="hero-center__highlights hero-stagger" style={{ '--hero-stagger': 1 }}>
          <div className="highlight-pill">
            <span className="highlight-dot highlight-dot--emerald" />
            <span>CGPA: <strong>8.7 / 10</strong></span>
          </div>
          <div className="highlight-pill">
            <span className="highlight-dot highlight-dot--purple" />
            <span>2x Internships (NIELIT & Cognifyz)</span>
          </div>
          <div className="highlight-pill">
            <span className="highlight-dot highlight-dot--blue" />
            <span>98% SWAYAM Python Distinction</span>
          </div>
          <div className="highlight-pill">
            <span className="highlight-dot highlight-dot--cyan" />
            <span>IEEE WIE & Ideathon Finalist</span>
          </div>
        </div>

        <div className="hero-center__actions hero-stagger" style={{ '--hero-stagger': 2 }}>
          <a className="btn btn--gradient btn--lg" href="#projects">
            <span>Explore Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <a
            className="btn btn--outline btn--lg"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>View Resume</span>
          </a>
          <a className="btn btn--ghost btn--lg" href="#contact">
            <span>Contact Me</span>
          </a>
        </div>

        <div className="hero-center__socials hero-stagger" style={{ '--hero-stagger': 3 }}>
          <ul className="social-links social-links--centered" aria-label="Social Profiles">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="social-link" title="Send Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section wrap" aria-labelledby="about-title">
      <SectionHead
        eyebrow="BACKGROUND & EDUCATION"
        id="about"
        title="Engineering with Purpose"
        intro="Grounding machine intelligence in structured data, robust pipelines, and intuitive interfaces."
      />

      <div className="bento-grid">
        {/* Narrative Card */}
        <ScrollReveal className="bento-card bento-card--featured" delay={0}>
          <div className="bento-card__badge">Focus & Philosophy</div>
          <h3 className="bento-card__title">Applied AI & Resilient Systems</h3>
          <div className="prose">
            <p>
              I specialize in engineering intelligent software that solves tangible problems with data-grounded precision. My <strong>Local PDF Analyzer & RAG Chatbot</strong> leverages PyMuPDF extraction, semantic document chunking, and vector retrieval to supply context-aware answers with verified page citations.
            </p>
            <p>
              With <strong>NIZHAL</strong>, I designed an image verification system combining perceptual hashing (ImageHash) and invisible watermarking (Stegano) to protect digital assets against tampering and unauthorized reuse with a forensic Safe/Blocked gallery.
            </p>
            <p>
              My portfolio also spans enterprise backend engineering with <strong>EcoSphere</strong> (Django & DRF APIs for ESG tracking and gamification), embedded systems for <strong>Smart Water Leakage Detection</strong> (ESP8266 sensor telemetry), and high-speed 3D WebGL experiences like the <strong>PhaseJump Cyberpunk Endless Runner</strong> built with Three.js.
            </p>
          </div>
        </ScrollReveal>

        {/* Education & Academic Excellence */}
        <ScrollReveal className="bento-card" delay={90}>
          <div className="bento-card__badge">Academics</div>
          <h3 className="bento-card__title">Education</h3>
          <div className="edu-block">
            <span className="edu-tag">Undergraduate Degree</span>
            <h4 className="edu-degree">{education.degree}</h4>
            <p className="edu-institution">{education.institution}</p>
            <p className="edu-timeline">{education.period} • {education.status}</p>
            <div className="cgpa-badge">
              <span className="cgpa-label">Cumulative GPA</span>
              <span className="cgpa-val">{education.cgpa}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Principles */}
        <ScrollReveal className="bento-card" delay={180}>
          <div className="bento-card__badge">Core Focus</div>
          <h3 className="bento-card__title">Technical Pillars</h3>
          <ul className="pillar-list">
            <li>
              <div className="pillar-bullet pillar-bullet--purple" />
              <div>
                <strong>RAG & Vector Retrieval:</strong>
                <span> Document chunking, semantic embeddings, and LLM augmentation for precision search.</span>
              </div>
            </li>
            <li>
              <div className="pillar-bullet pillar-bullet--cyan" />
              <div>
                <strong>Applied AI & Computer Vision:</strong>
                <span> Perceptual hashing and invisible watermarks for robust media protection.</span>
              </div>
            </li>
            <li>
              <div className="pillar-bullet pillar-bullet--blue" />
              <div>
                <strong>Responsive Frontend & APIs:</strong>
                <span> Clean, cross-device interfaces with modular architecture and reliable REST integration.</span>
              </div>
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section wrap" aria-labelledby="experience-title">
      <SectionHead
        eyebrow="PROFESSIONAL JOURNEY"
        id="experience"
        title="Work Experience"
        intro="Hands-on internships delivering real-world frontend and automation software."
      />

      <div className="experience-timeline">
        {experience.map((job, idx) => (
          <ScrollReveal key={job.role + job.org} className="exp-card" delay={idx * 90}>
            <div className="exp-card__aside">
              <span className="exp-card__period">{job.period}</span>
              <span className="exp-card__loc">{job.location}</span>
            </div>

            <div className="exp-card__main">
              <div className="exp-card__header">
                <div>
                  <h3 className="exp-card__role">{job.role}</h3>
                  <p className="exp-card__org">{job.org}</p>
                </div>
                <span className="exp-badge">{job.badge}</span>
              </div>

              <ul className="exp-card__points">
                {job.points.map((pt, i) => (
                  <li key={i}>
                    <span className="point-icon" aria-hidden="true">▹</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="exp-card__tech">
                <span className="tech-label">Technologies used:</span>
                <div className="tags">
                  {job.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true
    if (filter === 'ai') return p.category.includes('AI')
    if (filter === 'backend') return p.category.includes('Backend')
    if (filter === 'iot') return p.category.includes('IoT')
    if (filter === '3d') return p.category.includes('3D')
    return true
  })

  return (
    <section id="projects" className="section wrap" aria-labelledby="projects-title">
      <SectionHead
        eyebrow="FEATURED WORK"
        id="projects"
        title="Featured Projects"
        intro="Selected software engineering projects across AI pipelines, backend architectures, IoT systems, and 3D WebGL."
      />

      {/* Category Filter Pills */}
      <div className="project-filters" role="tablist" aria-label="Project domain filters">
        <button
          type="button"
          className={`filter-btn ${filter === 'all' ? 'is-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Domains ({projects.length})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'ai' ? 'is-active' : ''}`}
          onClick={() => setFilter('ai')}
        >
          AI & Generative AI (2)
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'backend' ? 'is-active' : ''}`}
          onClick={() => setFilter('backend')}
        >
          Backend Development (1)
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'iot' ? 'is-active' : ''}`}
          onClick={() => setFilter('iot')}
        >
          IoT & Embedded (1)
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === '3d' ? 'is-active' : ''}`}
          onClick={() => setFilter('3d')}
        >
          3D WebGL (1)
        </button>
      </div>

      <div className="project-grid">
        {filteredProjects.map((p, idx) => (
          <ScrollReveal key={p.id || p.title} delay={idx * 85} className="project-grid__item">
          <TiltProjectCard>
          <article className="proj-card">
            <div className="proj-card__top">
              <div className="proj-card__meta">
                <span className={`proj-badge proj-badge--${p.tagColor || 'purple'}`}>
                  {p.category}
                </span>
                <span className="proj-num">0{idx + 1}</span>
              </div>
              <h3 className="proj-card__title">{p.title}</h3>
              <p className="proj-card__summary">{p.summary}</p>
            </div>

            <div className="proj-card__highlights">
              <ul className="highlights-list">
                {p.points.map((pt, i) => (
                  <li key={i}>
                    <span className="highlight-bullet" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="proj-card__footer">
              <div className="tags" aria-label="Tech Stack">
                {p.stack.map((s) => (
                  <span key={s} className="tag tag--accent">{s}</span>
                ))}
              </div>

              <div className="proj-card__actions">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
                >
                  <span>View on GitHub</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
          </TiltProjectCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section wrap" aria-labelledby="skills-title">
      <SectionHead
        eyebrow="TECHNICAL TOOLKIT"
        id="skills"
        title="Skills & Technologies"
        intro="Languages, AI frameworks, retrieval architectures, and developer toolchains."
      />

      <div className="skills-grid">
        {skills.map((s, idx) => (
          <ScrollReveal key={s.group} className="skill-tile" delay={idx * 70}>
            <div className="skill-tile__head">
              <div className="skill-tile__icon-box" aria-hidden="true">
                {s.icon === 'code' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                )}
                {s.icon === 'sparkles' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3l1.912 5.886a2 2 0 001.202 1.202L21 12l-5.886 1.912a2 2 0 00-1.202 1.202L12 21l-1.912-5.886a2 2 0 00-1.202-1.202L3 12l5.886-1.912a2 2 0 001.202-1.202L12 3z" />
                  </svg>
                )}
                {s.icon === 'layout' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                )}
                {s.icon === 'database' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                )}
                {s.icon === 'terminal' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                )}
                {s.icon === 'cpu' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                )}
              </div>
              <h3 className="skill-tile__title">{s.group}</h3>
            </div>
            <div className="skill-tile__tags">
              {s.items.map((item) => (
                <span key={item} className="skill-chip">{item}</span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section id="achievements" className="section wrap" aria-labelledby="achievements-title">
      <SectionHead
        eyebrow="RECOGNITION & FORUMS"
        id="achievements"
        title="Achievements & Activities"
        intro="Recognitions, certifications, and active participation across tech communities."
      />

      <div className="achieve-grid">
        <div className="achieve-card">
          <div className="achieve-card__head">
            <div className="icon-award-badge" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <div>
              <h3 className="achieve-card__title">Honors & Certifications</h3>
              <p className="achieve-card__sub">Competitions, papers and technical milestones</p>
            </div>
          </div>

          <ul className="achieve-list">
            {achievements.map((a) => (
              <li key={a.title} className="achieve-item">
                <div className="achieve-item__header">
                  <strong>{a.title}</strong>
                  <span className="achieve-tag">{a.tag}</span>
                </div>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="achieve-card">
          <div className="achieve-card__head">
            <div className="icon-award-badge icon-award-badge--purple" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3 className="achieve-card__title">Activities & Forums</h3>
              <p className="achieve-card__sub">Developer groups, meetups and technical contests</p>
            </div>
          </div>

          <ul className="achieve-list">
            {activities.map((act) => (
              <li key={act.title} className="achieve-item">
                <div className="achieve-item__header">
                  <strong>{act.title}</strong>
                  <span className="achieve-tag achieve-tag--purple">{act.role}</span>
                </div>
                <p>{act.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const send = (e) => {
    e.preventDefault()
    const subj = subject.trim() || `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
    const body = `${message.trim()}\n\n---\nSent by: ${name.trim()}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const t = document.createElement('textarea')
      t.value = profile.email
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const [contactRef, contactInView] = useInViewOnce()

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="wrap contact-container">
        <div className="contact-info" ref={contactRef}>
          <ScrollReveal as="span" className="section__eyebrow reveal--inline">
            GET IN TOUCH
          </ScrollReveal>
          <h2 id="contact-title" className="contact-title">
            <TypewriterText
              as="span"
              text="Let’s build something extraordinary together."
              active={contactInView}
              speed={50}
            />
          </h2>
          <ScrollReveal as="p" className="contact-lede" delay={100}>
            I’m actively seeking internships and software engineering opportunities where I can contribute to AI systems, RAG pipelines, or full-stack web applications. Feel free to reach out directly!
          </ScrollReveal>

          <div className="contact-cards">
            {/* Email Card */}
            <div className="c-card">
              <div className="c-card__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="c-card__details">
                <span className="c-card__label">Email</span>
                <a href={`mailto:${profile.email}`} className="c-card__val">{profile.email}</a>
              </div>
              <button
                type="button"
                className={`btn-copy ${copied ? 'btn-copy--copied' : ''}`}
                onClick={copy}
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="c-card">
              <div className="c-card__icon c-card__icon--purple" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </div>
              <div className="c-card__details">
                <span className="c-card__label">LinkedIn</span>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="c-card__val">
                  dhanyatha-d-4b8424326 ↗
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="c-card">
              <div className="c-card__icon c-card__icon--gray" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="c-card__details">
                <span className="c-card__label">GitHub</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="c-card__val">
                  Dhanyatha555 ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Composer Form */}
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={send}>
            <div className="form-head">
              <h3>Send a Message</h3>
              <p>Direct pre-filled email dispatch. No intermediaries.</p>
            </div>

            <div className="form-group">
              <label htmlFor="c-name">Your Name</label>
              <input
                id="c-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Alex Chen"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-subject">Subject</label>
              <input
                id="c-subject"
                name="subject"
                type="text"
                placeholder="Internship opportunity / Project inquiry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-msg">Message</label>
              <textarea
                id="c-msg"
                name="message"
                rows="5"
                placeholder="Tell me about your role, team, or idea..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn--gradient btn--block">
              <span>Open in Email App</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
            <p className="form-privacy-note">
              🔒 Prepares a draft in your native mail application with your typed message.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const onScroll = () => {
      document.documentElement.style.setProperty(
        '--scroll-parallax',
        `${window.scrollY * 0.035}px`
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-shell">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Ambient background glows */}
      <div className="bg-ambient bg-ambient--top" aria-hidden="true" />
      <div className="bg-ambient bg-ambient--right" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <a href="#about" className="skip">Skip to content</a>
      <Header />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <div className="site-footer__brand">
            <span className="footer-monogram" aria-hidden="true">D</span>
            <div>
              <strong>Dhanyatha D</strong>
              <p>Computer Science & Engineering • Panimalar Engineering College</p>
            </div>
          </div>

          <div className="site-footer__links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="site-footer__bottom">
            <p>© {new Date().getFullYear()} Dhanyatha D. All rights reserved.</p>
            <a href="#top" className="back-to-top">
              <span>Back to top</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
