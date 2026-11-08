"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  FileText,
  Mail,
  Menu,
  X,
} from "lucide-react";
import TechnicalMode from "@/components/modes/TechnicalMode";
import InteractiveMode from "@/components/modes/InteractiveMode";
import TypewriterHeading from "@/components/TypewriterHeading";
import HeroBackdrop from "@/components/HeroBackdrop";
import PortfolioLoader from "@/components/PortfolioLoader";

type Page = "executive" | "technical" | "interactive" | "contact";

const projects = [
  {
    number: "01",
    title: "GitGuard AI",
    category: "Security · Developer tooling",
    description:
      "Automated pull-request security review that isolates changed code, finds meaningful risk, and posts fix-first feedback directly to GitHub.",
    result: "Actionable reviews, automatically",
    stack: "Node.js · React · MongoDB · Groq",
    detail: "Webhook-driven analysis with replay protection, repository rules, risk scoring, finding fingerprints, and inline corrected-code suggestions.",
    tone: "coral",
  },
  {
    number: "02",
    title: "StudyFinder",
    category: "EdTech · Collaboration",
    description:
      "A connected learning environment where learners discover mentors, join study groups, collaborate in real time, and track progress.",
    result: "One journey from guidance to progress",
    stack: "Node.js · MongoDB · WebSockets · PeerJS",
    detail: "Personalized discovery, mentorship workflows, real-time chat, collaborative coding, video rooms, goals, tasks, and AI-assisted support.",
    tone: "blue",
  },
  {
    number: "03",
    title: "NetSage AI",
    category: "AI · Networking",
    description:
      "Evidence-based troubleshooting for Cisco-style labs that turns symptoms and command output into a reviewable diagnosis.",
    result: "Diagnosis with evidence, not guesses",
    stack: "Python · RAG · Pydantic · Streamlit",
    detail: "Retrieval, deterministic checks, structured AI diagnosis, confidence reconciliation, and human accept/edit/reject review.",
    tone: "gold",
  },
  {
    number: "04",
    title: "CareerForge Pro",
    category: "AI · Career tools",
    description:
      "An AI resume architect that tailors resumes and cover letters to a role while keeping every claim grounded in the candidate’s facts.",
    result: "From resume to role-ready application",
    stack: "React · Express · MongoDB · Groq",
    detail: "Resume parsing, keyword alignment, ATS scoring, editable templates, cover-letter generation, and export workflows.",
    tone: "coral",
  },
  {
    number: "05",
    title: "SQLTown",
    category: "Learning · Game design",
    description:
      "An interactive SQL learning world where documentation, browser-based practice, interviews, and city-building make progress visible.",
    result: "Learn by querying, building, and solving",
    stack: "React · SQL.js · Express · MongoDB",
    detail: "Lessons, schema exploration, query playgrounds, hidden-test evaluation, quests, XP, buildings, and interview progress.",
    tone: "blue",
  },
  {
    number: "06",
    title: "BlogSpace",
    category: "Publishing · Community",
    description:
      "A full publishing lifecycle for writing, discovery, discussion, moderation, and content performance in one focused platform.",
    result: "Create, organize, engage, measure",
    stack: "React · Express · MongoDB · Chakra UI",
    detail: "Markdown authoring, drafts, publishing, search, bookmarks, threaded discussion, role-based moderation, and analytics.",
    tone: "gold",
  },
];

const capabilities = [
  "Product-minded engineering",
  "Scalable web platforms",
  "Technical leadership",
  "AI and data products",
];

function GithubMark() {
  return <svg className="brand-icon brand-icon-github" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.18c.85 0 1.7.12 2.49.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2.2Z" /></svg>;
}

function LinkedInMark() {
  return <svg className="brand-icon brand-icon-linkedin" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 7.1A1.7 1.7 0 1 1 5.2 3.7a1.7 1.7 0 0 1 0 3.4ZM3.7 8.5h3v9.8h-3V8.5Zm4.8 0h2.9v1.34h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.61v5.41h-3v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-2.94V8.5Z" /></svg>;
}

function Navigation({ activePage, onNavigate }: { activePage: Page; onNavigate: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { id: Page; label: string }[] = [
    { id: "executive", label: "Overview" },
    { id: "technical", label: "Technical" },
    { id: "interactive", label: "Interactive" },
  ];

  const navigate = (page: Page) => {
    onNavigate(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="executive-nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => navigate("executive")} aria-label="Go to overview">
          SG<span>.</span>
        </button>
        <nav className={open ? "nav-links nav-links-open" : "nav-links"} aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.id}
              className={activePage === link.id ? "nav-link nav-link-active" : "nav-link"}
              onClick={() => navigate(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a className="nav-contact" href="mailto:gannenasampath@gmail.com" onClick={() => setOpen(false)}>
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <button className="nav-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={21} /> : <span className="nav-dots"><i /><i /><i /></span>}
        </button>
      </div>
    </header>
  );
}

function RecruiterApproach({ onBack }: { onBack: () => void }) {
  const approach = [
    { number: "01", title: "Share the opportunity", text: "Send the role, product context, or problem you want to solve." },
    { number: "02", title: "Start with the work", text: "I’ll respond with the most relevant projects, decisions, and questions." },
    { number: "03", title: "Find the fit", text: "If there’s a strong match, we’ll make the next conversation useful." },
  ];

  return (
    <div className="recruiter-page">
      <header className="recruiter-nav">
        <button className="brand" onClick={onBack} aria-label="Back to overview">SG<span>.</span></button>
        <button className="recruiter-close" onClick={onBack}>Back to overview <ArrowUpRight size={15} /></button>
      </header>
      <main className="recruiter-container">
        <section className="recruiter-hero">
          <HeroBackdrop />
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
            <p className="eyebrow"><span className="recruiter-prompt">&gt;_</span> Recruiter approach / open channel</p>
            <h1>Bring me a<br /><em>worthwhile problem.</em></h1>
          </motion.div>
          <motion.div className="recruiter-hero-note" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .12 }}>
            <p>Thoughtful products, difficult systems, and teams that care about the details are the conversations I want to have.</p>
            <span>Based in India · Working globally</span>
          </motion.div>
        </section>

        <motion.section className="recruiter-contact-card recruiter-live-section" initial={{ opacity: 0, y: 30, scale: .98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .7 }}>
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}><div className="recruiter-card-label">DIRECT LINE / 01</div></motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .3 }}>
            <h2>Tell me what you&apos;re building.</h2>
            <p>The fastest way to reach me is email. Include the role, team, and the kind of challenge you need help with.</p>
            <div className="recruiter-actions">
              <a className="button button-coral" href="mailto:gannenasampath@gmail.com?subject=Opportunity%20for%20Sampath%20Gannena"><Mail size={17} /> Email Sampath <ArrowUpRight size={15} /></a>
              <a className="button button-resume" href="/Sampath-Gannena-Resume.pdf" target="_blank" rel="noreferrer"><FileText size={17} /> View resume</a>
            </div>
          </motion.div>
          <motion.div className="recruiter-email" initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}>gannenasampath@gmail.com</motion.div>
        </motion.section>

        <motion.section className="recruiter-fit recruiter-live-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .15 }} transition={{ duration: .65 }}>
          <motion.div className="recruiter-section-title" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}><p className="eyebrow">A useful first message</p><h2>Make the<br /><em>context count.</em></h2></motion.div>
          <motion.div className="recruiter-fit-copy" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}><p>You don&apos;t need a polished brief. A few honest details are enough to start.</p><ul>{["What are you building?", "Where is the hardest part right now?", "What would meaningful progress look like?"].map((item, index) => <motion.li key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: index * .1 }}>{item}</motion.li>)}</ul></motion.div>
        </motion.section>

        <motion.section className="recruiter-process recruiter-live-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .65 }}>
          <p className="eyebrow">What happens next</p>
          <div className="recruiter-process-grid">{approach.map((item, index) => <motion.div key={item.number} className="recruiter-process-item" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: index * .12 }} whileHover={{ y: -6 }}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></motion.div>)}</div>
        </motion.section>
      </main>
      <motion.footer className="recruiter-footer recruiter-live-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}><span>Open to meaningful work</span><a href="mailto:gannenasampath@gmail.com">Let&apos;s make it worth solving <ArrowUpRight size={14} /></a></motion.footer>
    </div>
  );
}

function ExecutiveLanding({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeProject, setActiveProject] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const selectedProject = projects[activeProject];

  return (
    <div className="executive-page">
      <Navigation activePage="executive" onNavigate={onNavigate} />
      <main>
        <section className="executive-hero executive-container">
          <HeroBackdrop />
          <motion.div className="hero-copy overview-reveal" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, ease: "easeOut" }}>
            <button className="availability-toggle" onClick={() => setIsAvailable(!isAvailable)} aria-pressed={isAvailable}>
              <span className={`status-dot ${isAvailable ? "" : "status-dot-off"}`} /> {isAvailable ? "Available for meaningful work" : "Currently focused on building"}
            </button>
            <TypewriterHeading
              segments={[
                { text: "Building digital products " },
                { text: "that matter.", emphasis: true },
              ]}
            />
            <p className="hero-intro">
              I&apos;m Sampath Gannena, a senior full-stack developer and technology leader. I help ambitious teams turn complex ideas into clear, scalable products.
            </p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => onNavigate("contact")}>
                Start a conversation <ArrowUpRight size={17} />
              </button>
              <a className="text-link" href="#work">Explore selected work <ChevronRight size={16} /></a>
            </div>
            <div className="hero-meta">
              <span><span className="meta-label">Based in</span> India · Working globally</span>
              <span><span className="meta-label">Focus</span> Product &amp; Platform</span>
            </div>
          </motion.div>
          <motion.div className="hero-profile overview-reveal" aria-label="Profile photo" initial={{ opacity: 0, x: 28, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .8, delay: .12, ease: "easeOut" }}>
            <div className="hero-profile-dots" aria-hidden="true"><i /><i /><i /></div>
            <div className="hero-profile-image">
              <Image
                src="/profile.jpg"
                alt="Portrait of Sampath Gannena"
                fill
                priority
                sizes="(max-width: 760px) 72vw, 360px"
              />
            </div>
            <span className="hero-profile-label">Sampath Gannena<br /><b>Full-stack developer</b></span>
          </motion.div>
        </section>

        <motion.section className="portfolio-pulse overview-section-reveal" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65 }}>
          <div className="executive-container pulse-grid">
            <div className="pulse-intro">
              <p className="eyebrow">Portfolio pulse</p>
              <h2>Six products.<br /><em>One constant.</em></h2>
            </div>
            <div className="pulse-content">
              <p className="pulse-lede">I build useful systems at the intersection of people, data, and intelligent automation.</p>
              <div className="pulse-domains" aria-label="Project domains">
                <span><i className="pulse-dot pulse-coral" /> Security automation</span>
                <span><i className="pulse-dot pulse-blue" /> Learning platforms</span>
                <span><i className="pulse-dot pulse-gold" /> AI-assisted decisions</span>
                <span><i className="pulse-dot pulse-white" /> Community products</span>
              </div>
              <div className="pulse-signature">
                <span className="pulse-line" />
                <span>Make complexity feel simple.</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="work" className="work-section executive-container overview-section-reveal" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65 }}>
          <div className="section-heading">
            <div><p className="eyebrow">Selected work</p><h2>Outcomes over output.</h2></div>
            <p className="section-lede">A few ways I&apos;ve helped teams move from a hard problem to a meaningful result.</p>
          </div>
          <div className="project-explorer">
            <div className="project-list">
            {projects.map((project, index) => (
              <motion.button initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .07, duration: .4 }} className={`project-card project-${project.tone} ${activeProject === index ? "project-card-active" : ""}`} key={project.number} onClick={() => setActiveProject(index)} aria-pressed={activeProject === index}>
                <span className="project-number">{project.number}</span>
                <div className="project-body">
                  <span className="project-category">{project.category}</span><h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer"><span className="project-result">{project.result}</span><span>{project.stack}</span></div>
                </div>
                <ArrowUpRight className="project-arrow" size={22} />
              </motion.button>
            ))}
            </div>
            <aside className={`project-detail project-${selectedProject.tone}`} aria-live="polite">
              <div className="detail-topline"><span>Now exploring</span><span>{selectedProject.number} / 06</span></div>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.detail}</p>
              <div className="detail-progress"><span style={{ width: `${((activeProject + 1) / projects.length) * 100}%` }} /></div>
              <div className="detail-controls">
                <button onClick={() => setActiveProject((activeProject + projects.length - 1) % projects.length)} aria-label="Previous project">←</button>
                <button onClick={() => setActiveProject((activeProject + 1) % projects.length)} aria-label="Next project">→</button>
              </div>
            </aside>
          </div>
        </motion.section>

        <motion.section className="capabilities-section overview-section-reveal" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .65 }}>
          <div className="executive-container capabilities-grid">
            <div><p className="eyebrow">How I contribute</p><h2>Clarity at every layer.</h2></div>
            <div className="capability-list">
              {capabilities.map((capability, index) => <motion.div key={capability} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><Check size={18} /><span>{capability}</span></motion.div>)}
            </div>
            <p className="capability-copy">From first principles to final polish, I bring the product context, technical depth, and calm execution needed to make ambitious work feel straightforward.</p>
          </div>
        </motion.section>

        <motion.section className="contact-section executive-container overview-section-reveal" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65 }}>
          <div><p className="eyebrow">Have a challenge?</p><h2>Let&apos;s make it<br /><em>worth solving.</em></h2></div>
          <div className="contact-side"><p>I&apos;m always interested in thoughtful products, difficult systems, and teams that care about the details.</p><div className="contact-actions"><button className="button button-coral" onClick={() => onNavigate("contact")}><Mail size={17} /> Start a conversation <ArrowUpRight size={15} /></button><a className="button button-resume" href="/Sampath-Gannena-Resume.pdf" target="_blank" rel="noreferrer"><FileText size={17} /> View resume <ArrowUpRight size={15} /></a></div></div>
        </motion.section>
      </main>
      <motion.footer className="executive-footer executive-container overview-section-reveal" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .8 }}><span>© 2025 Sampath Gannena</span><div><a href="https://github.com/SampathGannena" target="_blank" rel="noreferrer"><GithubMark />GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/sampath-gannena-4626b8288/" target="_blank" rel="noreferrer"><LinkedInMark /> LinkedIn</a></div></motion.footer>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState<Page>("executive");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setIsReady(true));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  if (!isReady) {
    return <PortfolioLoader />;
  }

  return (
    <main className="portfolio-shell">
      {page === "executive" && <ExecutiveLanding onNavigate={setPage} />}
      {page === "technical" && <><Navigation activePage={page} onNavigate={setPage} /><TechnicalMode onBack={() => setPage("executive")} /></>}
      {page === "interactive" && <><Navigation activePage={page} onNavigate={setPage} /><InteractiveMode onBack={() => setPage("executive")} /></>}
      {page === "contact" && <RecruiterApproach onBack={() => setPage("executive")} />}
    </main>
  );
}
