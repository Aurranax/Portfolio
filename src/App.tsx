import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'

import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Menu,
  X,
  Cpu,
  Plane,
  Database,
  Code2,
  CircuitBoard,
  MoveUpRight,
  Layers3,
} from 'lucide-react'

import './App.css'

const projects = [
  {
    number: '01',
    type: 'SOFTWARE · DATABASE TOOLS',
    title: 'DBLens',
    description:
      'A browser-based SQLite workspace for exploring databases, inspecting schemas, analysing query plans and finding indexing opportunities.',
    tags: ['JavaScript', 'SQL.js', 'WebAssembly', 'CodeMirror'],
    icon: Database,
    link: 'https://github.com/Aurranax/DBLens-Lite',
    linkLabel: 'View repository',
    featured: true,
  },
  {
    number: '02',
    type: 'AEROSPACE · FIXED-WING UAV',
    title: 'Humanitarian Airlift UAV',
    description:
      'Fixed-wing aircraft design work focused on wing geometry, aerodynamic performance, propulsion selection and payload integration.',
    tags: ['Aerodynamics', 'Aircraft Design', 'Payload Integration'],
    icon: Plane,
    link: '',
    linkLabel: 'Project details',
    featured: false,
  },
  {
    number: '03',
    type: 'ROBOTICS · MULTIROTOR',
    title: 'Autonomous Micro UAV',
    description:
      'Micro-drone development involving flight-controller configuration, propulsion integration and mission planning with ArduPilot.',
    tags: ['ArduPilot', 'Mission Planner', 'UAV Systems'],
    icon: CircuitBoard,
    link: '',
    linkLabel: 'Project details',
    featured: false,
  },
]

const capabilities = [
  {
    icon: Plane,
    title: 'Aerospace & UAV',
    items: 'Aircraft design · Aerodynamics · Propulsion · Flight systems',
  },
  {
    icon: Code2,
    title: 'Software & Data',
    items: 'Python · SQL · JavaScript · Git · Web development',
  },
  {
    icon: Cpu,
    title: 'Engineering Systems',
    items: 'CAD · Simulation · Embedded systems · Hardware integration',
  },
  {
    icon: Layers3,
    title: 'Research & Delivery',
    items: 'Technical documentation · Testing · R&D · Team collaboration',
  },
]

function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return

  const rect = event.currentTarget.getBoundingClientRect()

  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height

  event.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`)
  event.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`)

  event.currentTarget.style.setProperty(
    '--tilt-x',
    `${(0.5 - y) * 4}deg`,
  )

  event.currentTarget.style.setProperty(
    '--tilt-y',
    `${(x - 0.5) * 4}deg`,
  )
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

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* NAVIGATION */}

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Yash Vardhan Purohit home"
        >
          <span className="brand-mark">
            Y<span>.</span>
          </span>

          <span className="brand-name">
            YASH PUROHIT<span> / ENGINEERING</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? 'nav-links open' : 'nav-links'}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          <a
            className="nav-cta"
            href="https://github.com/Aurranax"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      {/* HERO */}

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            ENGINEERING · SOFTWARE · SYSTEMS
          </div>

          <h1>
            Building across
            <br />
            <span>hardware</span> &
            <br />
            software.
          </h1>

          <p className="hero-intro">
            I'm Yash Vardhan Purohit, an MBATech Computer Engineering
            student at NMIMS MPSTME, Shirpur (Class of 2030).
            I turn engineering concepts into working systems — from
            UAV development and hardware integration to software
            tools that solve practical problems.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <ArrowUpRight size={17} />
            </a>

            <a className="text-link" href="#about">
              A little about me <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="hero-highlights">
            <div className="highlight-card">
              <strong>03</strong>
              <span>BOEING QUALIFIER</span>
            </div>

            <div className="highlight-card">
              <strong>DB</strong>
              <span>SOFTWARE PROJECT</span>
            </div>

            <div className="highlight-card">
              <strong>UAV</strong>
              <span>AEROSPACE SYSTEMS</span>
            </div>
          </div>
        </div>

        <div
          className="hero-visual interactive-surface"
          aria-label="Abstract engineering-inspired visual"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointerPosition}
        >
          <div className="visual-topline">
            <span>FIELD NOTES / 2026</span>
            <span>FIG. 001</span>
          </div>

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="visual-core">
            <div className="core-ring">
              <div className="core-center">
                <span>Y</span>
              </div>
            </div>
          </div>

          <div className="visual-cross cross-a" />
          <div className="visual-cross cross-b" />

          <div className="visual-label label-top">
            <span className="label-line" />
            SYSTEMS THINKING
          </div>

          <div className="visual-label label-bottom">
            FROM CONCEPT <ArrowUpRight size={13} /> TO EXECUTION
          </div>

          <div className="visual-coordinate">
            21° 00' N
            <br />
            75° 04' E
          </div>

          <div className="visual-index">Y—01</div>
        </div>

        <a className="scroll-cue" href="#about">
          <span />
          SCROLL TO EXPLORE
        </a>
      </section>

      {/* INTRO STRIP */}

      <section className="intro-strip reveal-on-scroll">
        <div className="section-shell strip-inner">
          <span>CURIOUS BY DEFAULT.</span>

          <p>
            From aircraft structures to browser-based tools, I enjoy
            understanding how things work — then making them work better.
          </p>

          <span className="strip-mark">✳</span>
        </div>
      </section>

      {/* ABOUT */}

      <section
        className="content-section section-shell reveal-on-scroll"
        id="about"
      >
        <div className="section-heading">
          <span className="section-kicker">01 / ABOUT</span>
          <span className="section-note">
            A broad toolkit. A practical mindset.
          </span>
        </div>

        <div className="about-grid">
          <h2>
            Engineering is
            <br />
            how I <em>think.</em>
          </h2>

          <div className="about-body">
            <p className="lead">
              I'm Yash Vardhan Purohit, pursuing an MBATech in
              Computer Engineering at NMIMS MPSTME, Shirpur,
              graduating in 2030.
            </p>

            <p>
              My interests span aerospace and UAV development,
              software engineering, data tools and intelligent systems.
              I like working across disciplines — from understanding
              a physical system to building the software and processes
              around it.
            </p>

            <p>
              I'm especially drawn to hands-on problem solving:
              designing, integrating, testing, documenting and
              improving systems through iteration.
            </p>

            <div className="about-foot">
              <span>BASED IN INDIA</span>
              <span>OPEN TO LEARNING & COLLABORATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section className="work-section reveal-on-scroll" id="work">
        <div className="section-shell">
          <div className="section-heading">
            <span className="section-kicker">02 / SELECTED WORK</span>
            <span className="section-note">
              A selection of things I've worked on.
            </span>
          </div>

          <div className="work-heading">
            <h2>
              Ideas into
              <br />
              <em>working systems.</em>
            </h2>

            <span className="work-count">
              03
              <br />
              PROJECTS
            </span>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              const Icon = project.icon

              return (
                <article
                  className={`project-card interactive-surface ${
                    project.featured ? 'featured' : ''
                  }`}
                  key={project.number}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={resetPointerPosition}
                >
                  <div className="project-number">
                    {project.number}
                  </div>

                  <div className="project-main">
                    <div className="project-type">
                      {project.type}
                    </div>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    {project.link ? (
                      <a
                        className="project-link"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.linkLabel}
                        <MoveUpRight size={15} />
                      </a>
                    ) : (
                      <span className="project-link muted-link">
                        {project.linkLabel}
                        <span>DETAILS COMING SOON</span>
                      </span>
                    )}
                  </div>

                  <div className="project-art">
                    <Icon strokeWidth={1.1} />
                    <span>{project.number} / 03</span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}

      <section
        className="content-section section-shell reveal-on-scroll"
        id="capabilities"
      >
        <div className="section-heading">
          <span className="section-kicker">03 / CAPABILITIES</span>
          <span className="section-note">
            Areas I'm building depth in.
          </span>
        </div>

        <div className="capability-intro">
          <h2>
            Connected
            <br />
            <em>disciplines.</em>
          </h2>

          <p>
            I'm interested in the space between hardware and software —
            and in the tools, analysis and collaboration that bring
            a complete system together.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon

            return (
              <article
                className="capability-card interactive-surface"
                key={item.title}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetPointerPosition}
              >
                <div className="capability-top">
                  <span>0{index + 1}</span>
                  <Icon size={21} strokeWidth={1.5} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.items}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ACHIEVEMENT */}

      <section className="achievement-section reveal-on-scroll">
        <div className="section-shell achievement-inner">
          <div className="section-heading">
            <span className="section-kicker">04 / EXPERIENCE</span>
            <span className="section-note">
              Competition · Team engineering
            </span>
          </div>

          <div className="achievement-content">
            <div className="achievement-year">
              2025—26
            </div>

            <div>
              <div className="project-type">
                BOEING NATIONAL AEROMODELLING COMPETITION
              </div>

              <h2>
                Built for a
                <br />
                <em>humanitarian mission.</em>
              </h2>

              <p>
                As part of Team UAS NMIMS Shirpur, I contributed to
                the Collaborative Humanitarian Airlift Mission.
                The team placed third in the qualifier round and
                advanced to the national round.
              </p>

              <div className="achievement-result">
                <span>03</span>

                <div>
                  <b>3RD PLACE</b>
                  <small>
                    QUALIFIER ROUND · ADVANCED TO NATIONAL ROUND
                  </small>
                </div>
              </div>
            </div>

            <div className="achievement-stamp">
              <Plane size={34} strokeWidth={1.2} />
              <span>
                TEAM UAS
                <br />
                NMIMS SHIRPUR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section
        className="contact-section section-shell reveal-on-scroll"
        id="contact"
      >
        <div className="section-heading">
          <span className="section-kicker">05 / CONTACT</span>
          <span className="section-note">
            Have a problem worth solving?
          </span>
        </div>

        <div className="contact-content">
          <h2>
            Let's make
            <br />
            <em>something useful.</em>
          </h2>

          <div className="contact-side">
            <p>
              I'm interested in engineering projects, technical
              collaboration and opportunities to learn by building.
            </p>

            <a
              className="button button-primary"
              href="https://github.com/Aurranax"
              target="_blank"
              rel="noreferrer"
            >
              Find me on GitHub <Github size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="site-footer section-shell">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">
            Y<span>.</span>
          </span>

          <span className="brand-name">
            YASH PUROHIT<span> / ENGINEERING</span>
          </span>
        </a>

        <span>DESIGNED & BUILT WITH INTENTION.</span>

        <a href="#home" className="back-top">
          BACK TO TOP ↑
        </a>

        <span className="copyright">© 2026</span>
      </footer>
    </main>
  )
}

export default App