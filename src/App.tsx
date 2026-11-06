import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'
import {
  Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight,
  CheckCircle2, CircuitBoard, Code2, Compass, Cpu, Database,
  ExternalLink, Github, Menu, Plane, ScanLine, Sparkles, Terminal,
  Workflow, X, Zap,
} from 'lucide-react'
import './App.css'

const projects = [
  {
    number: '01',
    type: 'SOFTWARE / DATABASE TOOLS',
    title: 'DBLens',
    short: 'A browser-based workspace for understanding SQLite databases.',
    description: 'DBLens brings database exploration into the browser. It focuses on inspecting schemas, running SQL, understanding query plans and surfacing practical indexing opportunities.',
    tags: ['JavaScript', 'SQL.js', 'WebAssembly', 'CodeMirror'],
    icon: Database,
    link: 'https://github.com/Aurranax/DBLens-Lite',
    linkLabel: 'Explore repository',
    featured: true,
    details: [
      'Client-side SQLite workflow built around SQL.js and WebAssembly.',
      'Schema exploration for tables, views and indexes.',
      'SQL execution and query-plan inspection.',
      'A practical interface for exploring indexing opportunities.',
    ],
  },
  {
    number: '02',
    type: 'AEROSPACE / FIXED-WING UAV',
    title: 'Humanitarian Airlift UAV',
    short: 'Aircraft design work shaped around a humanitarian payload mission.',
    description: 'A fixed-wing aircraft design effort involving wing geometry, aerodynamic considerations, propulsion selection, structural design and payload integration for a humanitarian airlift mission.',
    tags: ['Aircraft Design', 'Aerodynamics', 'Propulsion', 'Payload Integration'],
    icon: Plane,
    link: '',
    linkLabel: 'Project overview',
    featured: false,
    details: [
      'Work spanning aircraft structure and configuration.',
      'Consideration of wing geometry and aerodynamic performance.',
      'Propulsion and payload integration as connected design constraints.',
      'Team context: Boeing National Aeromodelling Competition 2025–26.',
    ],
  },
  {
    number: '03',
    type: 'ROBOTICS / MULTIROTOR',
    title: 'Autonomous Micro UAV',
    short: 'A compact UAV concept involving flight systems and mission planning.',
    description: 'Micro-drone development involving flight-controller configuration, propulsion integration and mission planning workflows using ArduPilot and Mission Planner.',
    tags: ['ArduPilot', 'Mission Planner', 'Flight Systems', 'Integration'],
    icon: CircuitBoard,
    link: '',
    linkLabel: 'Project overview',
    featured: false,
    details: [
      'Flight-controller configuration and system setup.',
      'Propulsion integration within a compact multirotor platform.',
      'Mission planning workflows using ArduPilot and Mission Planner.',
      'Focus on practical hardware–software integration.',
    ],
  },
] as const

const capabilities = [
  { icon: Plane, number: '01', title: 'Aerospace & UAV', description: 'Aircraft design, aerodynamics, propulsion and flight systems.', skills: ['Fixed-wing design', 'UAV systems', 'Propulsion', 'Flight planning'] },
  { icon: Code2, number: '02', title: 'Software & Data', description: 'Building practical software tools and working with structured data.', skills: ['Python', 'JavaScript', 'SQL', 'Git & GitHub'] },
  { icon: Cpu, number: '03', title: 'Engineering Systems', description: 'Connecting physical components, embedded systems and analysis.', skills: ['CAD', 'Simulation', 'Embedded systems', 'Integration'] },
  { icon: Workflow, number: '04', title: 'Research & Delivery', description: 'Turning open-ended problems into documented, testable work.', skills: ['Technical documentation', 'Testing', 'R&D', 'Collaboration'] },
] as const

const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const element = event.currentTarget
  const rect = element.getBoundingClientRect()
  if (!rect.width || !rect.height) return
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  element.style.setProperty('--pointer-x', `${x * 100}%`)
  element.style.setProperty('--pointer-y', `${y * 100}%`)
  element.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`)
  element.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`)
}

function resetPointerPosition(event: ReactPointerEvent<HTMLElement>) {
  const element = event.currentTarget
  element.style.setProperty('--tilt-x', '0deg')
  element.style.setProperty('--tilt-y', '0deg')
  element.style.setProperty('--pointer-x', '50%')
  element.style.setProperty('--pointer-y', '50%')
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null)
  const [introDone, setIntroDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (introDone) return
    const timer = window.setTimeout(() => setIntroDone(true), 1650)
    return () => window.clearTimeout(timer)
  }, [introDone])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal')
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.13, rootMargin: '0px 0px -55px 0px' })
      revealItems.forEach((item) => revealObserver.observe(item))
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 })
    document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => sectionObserver.observe(section))

    let frame = 0
    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0
        document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`)
      })
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      cancelAnimationFrame(frame)
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!activeProject) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeProject])

  return (
    <main className={introDone ? 'portfolio intro-complete' : 'portfolio'}>
      <div className="scroll-progress" aria-hidden="true" />
      {!introDone && (
        <div className="intro-screen" aria-hidden="true">
          <div className="intro-mark">Y<span>.</span></div>
          <div className="intro-name">YASH VARDHAN PUROHIT</div>
          <div className="intro-line"><span /></div>
          <div className="intro-caption">ENGINEERING / SOFTWARE / SYSTEMS</div>
        </div>
      )}

      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Yash Purohit home">
          <span className="brand-mark">Y<span>.</span></span>
          <span className="brand-name">YASH PUROHIT <span>/ ENGINEERING</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav id="primary-navigation" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="nav-cta" href="https://github.com/Aurranax" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow reveal reveal-delay-1">
            <span className="status-dot" /> ENGINEERING · SOFTWARE · SYSTEMS
            <span className="eyebrow-rule" /><span className="eyebrow-year">2026 / PORTFOLIO</span>
          </div>
          <h1 className="reveal reveal-delay-2">
            I build across<br />
            <span>hardware</span> <i>&</i><br />
            software<span className="hero-period">.</span>
          </h1>
          <p className="hero-intro reveal reveal-delay-3">
            I'm Yash Vardhan Purohit — an MBATech Computer Engineering student at NMIMS MPSTME, Shirpur. I turn engineering concepts into working systems, from UAV development and hardware integration to software tools that solve practical problems.
          </p>
          <div className="hero-actions reveal reveal-delay-4">
            <a className="button button-primary magnetic-button" href="#work">Explore selected work <ArrowUpRight size={16} /></a>
            <a className="text-link" href="#about">Get to know me <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-metrics reveal reveal-delay-4">
            <div className="metric"><strong>03</strong><span>PROJECT AREAS</span></div>
            <div className="metric-divider" />
            <div className="metric"><strong>3<span>rd</span></strong><span>BOEING QUALIFIER</span></div>
            <div className="metric-divider" />
            <div className="metric"><strong>2030</strong><span>GRADUATION</span></div>
          </div>
        </div>

        <div className="hero-visual interactive-surface reveal reveal-delay-2" onPointerMove={handlePointerMove} onPointerLeave={resetPointerPosition} aria-label="Interactive orbital engineering graphic">
          <div className="visual-noise" />
          <div className="visual-topline"><span><Activity size={13} /> SYSTEMS / 001</span><span>LIVE CONCEPT</span></div>
          <div className="visual-coordinate coordinate-top">DESIGN / INTEGRATE / ITERATE</div>
          <div className="visual-axis axis-x" /><div className="visual-axis axis-y" />
          <div className="visual-orbit orbit-a"><span /></div>
          <div className="visual-orbit orbit-b"><span /></div>
          <div className="visual-orbit orbit-c"><span /></div>
          <div className="visual-orbit orbit-d" />
          <div className="visual-center">
            <div className="center-halo" />
            <div className="center-core"><span className="core-letter">Y</span><span className="core-period">.</span></div>
          </div>
          <div className="visual-chip chip-one"><span>01</span><b>DESIGN</b><small>IDEAS INTO FORM</small></div>
          <div className="visual-chip chip-two"><span>02</span><b>BUILD</b><small>HARDWARE + SOFTWARE</small></div>
          <div className="visual-chip chip-three"><span>03</span><b>REFINE</b><small>TEST / ITERATE</small></div>
          <div className="visual-coordinate coordinate-bottom">YP—001 <span>•</span> SHIRPUR, INDIA</div>
          <div className="visual-corner corner-tl" /><div className="visual-corner corner-br" />
          <div className="visual-scan"><ScanLine size={14} /> SYSTEM ONLINE</div>
        </div>
        <a className="scroll-cue" href="#about"><span className="scroll-cue-line" /><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /></a>
      </section>

      <section className="ticker" aria-label="Areas of interest">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="ticker-group" key={index} aria-hidden={index === 1}>
              <span>UAV SYSTEMS</span><i>✳</i><span>SOFTWARE ENGINEERING</span><i>✳</i><span>HARDWARE INTEGRATION</span><i>✳</i><span>DATABASE TOOLS</span><i>✳</i><span>AEROSPACE</span><i>✳</i><span>PROBLEM SOLVING</span><i>✳</i>
            </div>
          ))}
        </div>
      </section>

      <section className="intro-strip reveal">
        <div className="section-shell strip-inner"><span className="micro-label">CURIOUS BY DEFAULT.</span><p>From aircraft structures to browser-based tools, I enjoy understanding how things work — then making them work better.</p><Sparkles className="strip-spark" size={25} /></div>
      </section>

      <section className="content-section section-shell reveal" id="about">
        <div className="section-heading"><span className="section-kicker">01 / ABOUT</span><span className="section-note">A broad toolkit. A practical mindset.</span></div>
        <div className="about-grid">
          <div className="about-heading"><span className="section-index">01</span><h2>Engineering is<br />how I <em>think.</em></h2><div className="about-orbit-mark"><Compass size={42} strokeWidth={1} /></div></div>
          <div className="about-body">
            <p className="lead">I'm Yash Vardhan Purohit, pursuing an MBATech in Computer Engineering at NMIMS MPSTME, Shirpur, graduating in 2030.</p>
            <p>My interests span aerospace and UAV development, software engineering, data tools and intelligent systems. I like working across disciplines — from understanding a physical system to building the software and processes around it.</p>
            <p>I'm especially drawn to hands-on problem solving: designing, integrating, testing, documenting and improving systems through iteration.</p>
            <div className="about-foot"><span><CheckCircle2 size={13} /> BASED IN INDIA</span><span>OPEN TO LEARNING & COLLABORATION</span></div>
          </div>
        </div>
      </section>

      <section className="work-section reveal" id="work">
        <div className="section-shell">
          <div className="section-heading"><span className="section-kicker">02 / SELECTED WORK</span><span className="section-note">A selection of things I've worked on.</span></div>
          <div className="work-heading"><div><span className="micro-label">BUILT / TESTED / ITERATED</span><h2>Ideas into<br /><em>working systems.</em></h2></div><div className="work-count"><strong>03</strong><span>PROJECTS<br />TO EXPLORE</span></div></div>
          <div className="project-list">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <article className={`project-card interactive-surface${project.featured ? ' featured' : ''}`} key={project.number} onPointerMove={handlePointerMove} onPointerLeave={resetPointerPosition}>
                  <div className="project-card-top"><span className="project-number">{project.number} / 03</span><span className="project-type">{project.type}</span><span className="project-open-indicator"><ArrowUpRight size={17} /></span></div>
                  <div className="project-card-body">
                    <div className="project-main"><h3>{project.title}</h3><p>{project.short}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-link" onClick={() => setActiveProject(project)}>Explore project <ArrowRight size={15} /></button></div>
                    <div className="project-art" aria-hidden="true"><div className="project-art-ring ring-one" /><div className="project-art-ring ring-two" /><div className="project-art-core"><Icon size={48} strokeWidth={1.1} /></div><span>{project.number}—SYSTEM</span></div>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="work-footnote"><span /> Select a project to inspect its focus and technical scope.</p>
        </div>
      </section>

      <section className="content-section section-shell reveal" id="capabilities">
        <div className="section-heading"><span className="section-kicker">03 / CAPABILITIES</span><span className="section-note">Areas I'm building depth in.</span></div>
        <div className="capability-intro"><div><span className="micro-label">CROSS-DISCIPLINARY BY DESIGN</span><h2>Connected<br /><em>disciplines.</em></h2></div><p>I'm interested in the space between hardware and software — and in the tools, analysis and collaboration that bring a complete system together.</p></div>
        <div className="capability-grid">
          {capabilities.map((item) => {
            const Icon = item.icon
            return <article className="capability-card interactive-surface" key={item.number} onPointerMove={handlePointerMove} onPointerLeave={resetPointerPosition}><div className="capability-top"><span>{item.number}</span><Icon size={23} strokeWidth={1.5} /></div><h3>{item.title}</h3><p>{item.description}</p><div className="capability-skills">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="capability-arrow"><ArrowUpRight size={17} /></div></article>
          })}
        </div>
      </section>

      <section className="process-section reveal" id="approach">
        <div className="section-shell">
          <div className="section-heading"><span className="section-kicker">04 / APPROACH</span><span className="section-note">How I like to work through a problem.</span></div>
          <div className="process-heading"><h2>Make it make<br /><em>sense. Then make it work.</em></h2><p>A simple loop: understand the system, build a useful first version, test it, and improve what the evidence tells you.</p></div>
          <div className="process-steps">
            <div className="process-step"><span>01</span><Terminal size={22} /><h3>Understand</h3><p>Define the problem, constraints and what success should look like.</p></div>
            <div className="process-connector"><span /></div>
            <div className="process-step"><span>02</span><Workflow size={22} /><h3>Build</h3><p>Turn the idea into a working model, tool or integrated system.</p></div>
            <div className="process-connector"><span /></div>
            <div className="process-step"><span>03</span><Zap size={22} /><h3>Improve</h3><p>Test, document and refine based on what actually happens.</p></div>
          </div>
        </div>
      </section>

      <section className="achievement-section reveal" id="experience">
        <div className="section-shell">
          <div className="section-heading"><span className="section-kicker">05 / EXPERIENCE</span><span className="section-note">Competition · Team engineering</span></div>
          <div className="achievement-content">
            <div className="achievement-year">2025—26<span>TEAM UAS<br />NMIMS SHIRPUR</span></div>
            <div className="achievement-main"><span className="micro-label">BOEING NATIONAL AEROMODELLING COMPETITION</span><h2>Built for a<br /><em>humanitarian mission.</em></h2><p>As part of Team UAS NMIMS Shirpur, I contributed to the Collaborative Humanitarian Airlift Mission. The team placed third in the qualifier round and advanced to the national round.</p><div className="achievement-result"><strong>03</strong><div><b>3RD PLACE</b><small>QUALIFIER ROUND · ADVANCED TO NATIONAL ROUND</small></div></div></div>
            <div className="achievement-seal"><Plane size={36} strokeWidth={1.1} /><span>TEAM UAS<br />NMIMS SHIRPUR</span><i>✳</i></div>
          </div>
        </div>
      </section>

      <section className="contact-section section-shell reveal" id="contact">
        <div className="section-heading"><span className="section-kicker">06 / CONTACT</span><span className="section-note">Have a problem worth solving?</span></div>
        <div className="contact-content"><div><span className="micro-label">LET'S BUILD SOMETHING USEFUL</span><h2>Curiosity is<br /><em>a good start.</em></h2></div><div className="contact-side"><p>I'm interested in engineering projects, technical collaboration and opportunities to learn by building.</p><a className="button button-primary" href="https://github.com/Aurranax" target="_blank" rel="noreferrer">Connect on GitHub <Github size={17} /></a><a className="contact-secondary" href="https://github.com/Aurranax/Portfolio" target="_blank" rel="noreferrer">View this portfolio's repository <ExternalLink size={13} /></a></div></div>
      </section>

      <footer className="site-footer section-shell">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">Y<span>.</span></span><span className="brand-name">YASH PUROHIT <span>/ ENGINEERING</span></span></a>
        <span className="footer-note">DESIGNED & BUILT WITH INTENTION.</span>
        <a href="#home" className="back-top"><ArrowUpRight size={14} /> BACK TO TOP</a>
        <span className="copyright">© 2026</span>
      </footer>

      {activeProject && (
        <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProject(null) }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <div className="modal-topline"><span>PROJECT FILE / {activeProject.number}</span><button onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={19} /></button></div>
            <div className="modal-icon">{(() => { const Icon = activeProject.icon; return <Icon size={30} strokeWidth={1.3} /> })()}</div>
            <span className="project-type">{activeProject.type}</span><h2 id="project-modal-title">{activeProject.title}</h2><p className="modal-description">{activeProject.description}</p>
            <div className="modal-divider" /><span className="micro-label">PROJECT SCOPE</span>
            <ul>{activeProject.details.map((detail) => <li key={detail}><CheckCircle2 size={15} />{detail}</li>)}</ul>
            <div className="tag-list modal-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-actions">{activeProject.link ? <a className="button button-primary" href={activeProject.link} target="_blank" rel="noreferrer">{activeProject.linkLabel} <ExternalLink size={15} /></a> : <span className="modal-note">Detailed project documentation is being prepared.</span>}<button className="text-link modal-close" onClick={() => setActiveProject(null)}>Close details <X size={14} /></button></div>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
