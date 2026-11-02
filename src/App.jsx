import { useEffect, useState } from 'react'
import { activities, achievements, education, experience, nav, profile, projects, skills } from './data.js'

function Reveal({ as: Element = 'div', className = '', delay = 0, children, ...props }) {
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) return undefined
    if (!('IntersectionObserver' in window)) {
      ref.classList.add('is-visible')
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref])

  return <Element ref={setRef} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...props}>{children}</Element>
}

function SectionIntro({ id, number, eyebrow, title, intro }) {
  return (
    <Reveal as="header" className="section-intro">
      <div className="section-intro__index"><span>{number}</span><span className="index-rule" aria-hidden="true" /></div>
      <div className="section-intro__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {intro && <p className="section-intro__lede">{intro}</p>}
      </div>
    </Reveal>
  )
}

function Arrow({ diagonal = false }) {
  return <svg className="arrow-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={diagonal ? 'M4 16 16 4M6 4h10v10' : 'M3 10h13m-5-5 5 5-5 5'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" /></svg>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const sections = nav.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || !sections.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { rootMargin: '-32% 0px -56% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)} aria-label="Dhanyatha D, home"><span className="wordmark__mark">D.</span><span>Dhanyatha D</span></a>
        <button className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
        <nav className={`site-nav${open ? ' is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
          <div className="site-nav__links">
            {nav.map((item, index) => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}><span className="nav-number">0{index + 1}</span>{item.label}</a>)}
          </div>
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Résumé <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid page-width">
        <div className="hero__main">
          <p className="eyebrow hero__eyebrow"><span className="status-mark" aria-hidden="true" /> {profile.title} <span className="eyebrow-divider">/</span> {profile.location}</p>
          <h1 id="hero-title"><span className="hero__line hero__line--one">Driven by <em>why.</em></span><span className="hero__line hero__line--two">Curious about</span><span className="hero__line hero__line--three"><em>what if.</em></span><span className="hero__line hero__line--four">Grounded in <em>how.</em></span></h1>
          <p className="hero__lede">I’m Dhanyatha, a Computer Science student exploring ideas, experimenting with technology and building software that solves real problems.</p>
          <div className="hero__actions"><a className="link-action link-action--dark" href="#projects">Explore selected work <Arrow /></a><a className="text-action" href={`mailto:${profile.email}`}>Start a conversation <Arrow diagonal /></a></div>
        </div>
        <aside className="hero__aside" aria-label="Portfolio notes">
          <div className="hero-art" aria-hidden="true"><span className="hero-art__orbit hero-art__orbit--one" /><span className="hero-art__orbit hero-art__orbit--two" /><span className="hero-art__core">D</span><span className="hero-art__cross">+</span><span className="hero-art__label">FIELD NOTES<br />/ 001—026</span></div>
          <p className="hero__aside-note">A practice of asking better questions, testing the edges, and making useful things.</p>
          <div className="hero__facts"><p><span>01 / STUDY</span><strong>{education.cgpa} CGPA</strong></p><p><span>02 / PRACTICE</span><strong>2 internships</strong></p><p><span>03 / COMMUNITY</span><strong>IEEE WIE · Ideathon finalist</strong></p></div>
        </aside>
        <div className="hero__bottom"><span>CHENNAI, INDIA</span><a href="#about">Scroll to explore <span aria-hidden="true">↓</span></a><span>WHY → WHAT IF → HOW</span></div>
      </div>
      <div className="hero__vertical-note" aria-hidden="true">A PORTFOLIO IN THREE ACTS</div>
    </section>
  )
}

function About() {
  return (
    <section className="section section--peach about" id="about" aria-labelledby="about-title">
      <div className="page-width">
        <SectionIntro id="about-title" number="01" eyebrow="WHY / THE FOUNDATION" title="Engineering with purpose." intro="Grounding machine intelligence in structured data, robust pipelines, and intuitive interfaces." />
        <div className="about__layout">
          <Reveal className="about__story">
            <p className="eyebrow">A NOTE ON THE WORK</p>
            <p>I specialize in engineering intelligent software that solves tangible problems with data-grounded precision. My <strong>Local PDF Analyzer & RAG Chatbot</strong> leverages PyMuPDF extraction, semantic document chunking, and vector retrieval to supply context-aware answers with verified page citations.</p>
            <p>With <strong>NIZHAL</strong>, I designed an image verification system combining perceptual hashing (ImageHash) and invisible watermarking (Stegano) to protect digital assets against tampering and unauthorized reuse with a forensic Safe/Blocked gallery.</p>
            <p>My portfolio also spans enterprise backend engineering with <strong>EcoSphere</strong> (Django & DRF APIs for ESG tracking and gamification), embedded systems for <strong>Smart Water Leakage Detection</strong> (ESP8266 sensor telemetry), and high-speed 3D WebGL experiences like the <strong>PhaseJump Cyberpunk Endless Runner</strong> built with Three.js.</p>
          </Reveal>
          <Reveal className="education-note" delay={100}>
            <p className="eyebrow">EDUCATION / 2024—2028</p>
            <span className="education-note__index">01</span>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
            <p className="education-note__meta">{education.period} <span>·</span> {education.status}</p>
            <div className="education-note__score"><span>CUMULATIVE GPA</span><strong>{education.cgpa}</strong></div>
          </Reveal>
        </div>
        <div className="principles">
          <p className="eyebrow">THREE TECHNICAL PILLARS</p>
          <div className="principles__grid">
            <Reveal className="principle"><span>01</span><h3>RAG & vector retrieval</h3><p>Document chunking, semantic embeddings, and LLM augmentation for precision search.</p></Reveal>
            <Reveal className="principle" delay={80}><span>02</span><h3>Applied AI & computer vision</h3><p>Perceptual hashing and invisible watermarks for robust media protection.</p></Reveal>
            <Reveal className="principle" delay={160}><span>03</span><h3>Responsive frontend & APIs</h3><p>Clean, cross-device interfaces with modular architecture and reliable REST integration.</p></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section section--clay experience" id="experience" aria-labelledby="experience-title">
      <div className="page-width">
        <SectionIntro id="experience-title" number="02" eyebrow="HOW / IN PRACTICE" title="Work, in the real world." intro="Hands-on internships delivering real-world frontend and automation software." />
        <div className="experience-list">
          {experience.map((job, index) => <Reveal as="article" className="experience-entry" key={`${job.role}-${job.org}`} delay={index * 100}>
            <div className="experience-entry__index">0{index + 1}<span>{job.period}</span></div>
            <div className="experience-entry__main"><p className="eyebrow">{job.org} <span>/</span> {job.location}</p><h3>{job.role}</h3><ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="experience-entry__tools"><span>TOOLS</span>{job.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
            <p className="experience-entry__discipline">{job.badge}</p>
          </Reveal>)}
        </div>
      </div>
    </section>
  )
}

const projectFilters = [
  { id: 'all', label: 'All work' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'backend', label: 'Backend' },
  { id: 'iot', label: 'IoT' },
  { id: '3d', label: '3D / WebGL' },
]

function projectMatches(project, filter) {
  if (filter === 'all') return true
  if (filter === 'ai') return project.category.includes('AI')
  if (filter === 'backend') return project.category.includes('Backend')
  if (filter === 'iot') return project.category.includes('IoT')
  if (filter === '3d') return project.category.includes('3D')
  return true
}

function ProjectEntry({ project, index, featured }) {
  return (
    <Reveal as="article" className={`project-entry${featured ? ' project-entry--feature' : ''}`} delay={(index % 3) * 70}>
      <div className="project-entry__art" aria-hidden="true"><span className="project-entry__art-number">0{index + 1}</span><span className="project-entry__art-mark">{project.id === 'rag-pdf' ? '¶' : project.id === 'nizhal' ? '◉' : project.id === 'ecosphere' ? '↗' : project.id === 'water-leakage' ? '≈' : '⌁'}</span><span className="project-entry__art-caption">{project.category}</span></div>
      <div className="project-entry__copy"><p className="eyebrow">PROJECT / 0{index + 1} <span>/</span> {project.category}</p><h3>{project.title}</h3><p className="project-entry__summary">{project.summary}</p><ul className="project-entry__points">{project.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="project-entry__footer"><div className="project-entry__stack" aria-label="Technology stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a className="project-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>View on GitHub <Arrow diagonal /></a></div></div>
    </Reveal>
  )
}

function Projects() {
  const [filter, setFilter] = useState('all')
  const filteredProjects = projects.filter((project) => projectMatches(project, filter))

  return (
    <section className="section section--peach projects" id="projects" aria-labelledby="projects-title">
      <div className="page-width">
        <SectionIntro id="projects-title" number="03" eyebrow="WHAT IF / SELECTED EXPERIMENTS" title="Ideas, made tangible." intro="Software engineering across AI pipelines, backend architectures, IoT systems, and 3D WebGL." />
        <div className="project-controls"><p className="eyebrow">BROWSE BY DISCIPLINE</p><div className="project-filters" aria-label="Filter projects">{projectFilters.map((item) => <button type="button" key={item.id} className={filter === item.id ? 'is-active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{projects.filter((project) => projectMatches(project, item.id)).length.toString().padStart(2, '0')}</span></button>)}</div></div>
        <div className="project-list" aria-live="polite">{filteredProjects.map((project, index) => <ProjectEntry key={project.id} project={project} index={projects.indexOf(project)} featured={filter === 'all' && index === 0} />)}</div>
        <p className="project-endnote"><span>END OF CURRENT INDEX</span><span>{filteredProjects.length.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')} STUDIES</span></p>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section section--clay skills" id="skills" aria-labelledby="skills-title">
      <div className="page-width">
        <SectionIntro id="skills-title" number="04" eyebrow="HOW / THE TOOLKIT" title="A growing set of tools." intro="Languages, AI frameworks, retrieval architectures, and developer toolchains." />
        <div className="skills-index">{skills.map((group, index) => <Reveal as="article" className="skills-index__row" key={group.group} delay={index * 50}><span className="skills-index__number">0{index + 1}</span><h3>{group.group}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul><span className="skills-index__symbol" aria-hidden="true">↗</span></Reveal>)}</div>
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section className="section section--peach recognition" id="achievements" aria-labelledby="achievements-title">
      <div className="page-width">
        <SectionIntro id="achievements-title" number="05" eyebrow="RECOGNITION / COMMUNITY" title="Learning in good company." intro="Recognitions, certifications, and active participation across tech communities." />
        <div className="recognition__layout"><div className="recognition__list">{achievements.map((item, index) => <Reveal as="article" className="recognition-entry" key={item.title} delay={index * 45}><span className="recognition-entry__index">0{index + 1}</span><div><p className="eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.text}</p></div><Arrow diagonal /></Reveal>)}</div><aside className="community-note"><p className="eyebrow">ALONG THE WAY</p><h3>Participation is a practice, too.</h3>{activities.map((activity) => <div className="community-note__entry" key={activity.title}><span>{activity.role}</span><h4>{activity.title}</h4><p>{activity.text}</p></div>)}</aside></div>
      </div>
    </section>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const send = (event) => {
    event.preventDefault()
    const emailSubject = subject.trim() || `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
    const body = `${message.trim()}\n\n---\nSent by: ${name.trim()}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const field = document.createElement('textarea')
      field.value = profile.email
      field.setAttribute('readonly', '')
      field.style.position = 'absolute'
      field.style.left = '-9999px'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2400)
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="page-width">
        <div className="contact__topline"><p className="eyebrow">06 / A NEXT STEP</p><span>OPEN TO OPPORTUNITIES</span></div>
        <div className="contact__layout">
          <div className="contact__intro"><h2 id="contact-title">Let’s build something <em>extraordinary.</em></h2><p>I’m actively seeking internships and software engineering opportunities where I can contribute to AI systems, RAG pipelines, or full-stack web applications. Feel free to reach out directly!</p><a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="contact__socials"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a><button type="button" onClick={copyEmail}>{copied ? 'Email copied' : 'Copy email'}</button></div></div>
          <form className="contact-form" onSubmit={send}><div className="contact-form__heading"><h3>Send a note</h3><p>Opens a pre-filled draft in your email application.</p></div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Name" required value={name} onChange={(event) => setName(event.target.value)} /><label htmlFor="contact-subject">Subject <span>OPTIONAL</span></label><input id="contact-subject" name="subject" type="text" placeholder="What would you like to discuss?" value={subject} onChange={(event) => setSubject(event.target.value)} /><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="4" placeholder="A little context goes a long way…" required value={message} onChange={(event) => setMessage(event.target.value)} /><button className="contact-form__submit" type="submit">Open in email app <Arrow /></button></form>
        </div>
        <div className="contact__signoff"><span>THANK YOU FOR YOUR TIME.</span><a href="#top">Back to the beginning ↑</a></div>
      </div>
    </section>
  )
}

export default function App() {
  return <div className="portfolio"><a className="skip-link" href="#about">Skip to content</a><Header /><main><Hero /><About /><Experience /><Projects /><Skills /><Achievements /><Contact /></main><footer className="site-footer"><div className="page-width site-footer__inner"><a className="site-footer__mark" href="#top">D.</a><p>Dhanyatha D <span>·</span> Computer Science & Engineering, Panimalar Engineering College</p><div><a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé</a><span>© {new Date().getFullYear()}</span></div></div></footer></div>
}
