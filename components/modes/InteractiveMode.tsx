"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Box,
  GitBranch,
  Gauge,
  Sparkles,
} from "lucide-react";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import AIAssistant from "../AIAssistant";
import GitHistoryTimeline from "../GitHistoryTimeline";
import LiveDashboard from "../LiveDashboard";
import TypewriterHeading from "../TypewriterHeading";
import HeroBackdrop from "../HeroBackdrop";

const ProjectShowcase3D = dynamic(() => import("../ProjectShowcase3D"), {
  ssr: false,
  loading: () => <div className="interactive-loader">Loading project universe...</div>,
});

interface InteractiveModeProps {
  onBack: () => void;
}

type InteractiveSection = "3d" | "ai" | "timeline" | "dashboard";

const projects = [
  { number: "01", name: "GitGuard AI", type: "Security / tooling", statement: "Make every code review more useful." },
  { number: "02", name: "StudyFinder", type: "EdTech / community", statement: "Turn guidance into momentum." },
  { number: "03", name: "NetSage AI", type: "AI / networking", statement: "Diagnose with evidence, not guesses." },
  { number: "04", name: "CareerForge Pro", type: "AI / career tools", statement: "Make good work easier to discover." },
  { number: "05", name: "SQLTown", type: "Learning / game design", statement: "Make progress visible and playful." },
  { number: "06", name: "BlogSpace", type: "Publishing / community", statement: "Give ideas a place to grow." },
];

const sections: { id: InteractiveSection; label: string; icon: typeof Box }[] = [
  { id: "3d", label: "Orbit", icon: Box },
  { id: "ai", label: "Ask", icon: Bot },
  { id: "timeline", label: "Trace", icon: GitBranch },
  { id: "dashboard", label: "Pulse", icon: Gauge },
];

export default function InteractiveMode({ onBack }: InteractiveModeProps) {
  const [activeSection, setActiveSection] = useState<InteractiveSection>("3d");
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  return (
    <div className="interactive-page">
      <div className="interactive-container">
        <motion.button onClick={onBack} className="interactive-back" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .45 }}><ArrowLeft size={16} /> Back to overview</motion.button>

        <header className="interactive-hero">
          <HeroBackdrop />
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .65 }}>
            <p className="eyebrow"><span className="interactive-prompt">●</span> Interactive index / choose your lens</p>
            <TypewriterHeading
              segments={[
                { text: "See the ideas\n" },
                { text: "in motion.", emphasis: true },
              ]}
            />
          </motion.div>
          <motion.div className="interactive-intro" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .65, delay: .12 }}>
            <p>A portfolio you can browse, question, rotate, and inspect. Start with a project, then choose how deeply you want to explore it.</p>
            <span><Sparkles size={14} /> Six products · four ways in</span>
          </motion.div>
        </header>

        <motion.section className="interactive-projects interactive-live-section" aria-label="Projects" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .6 }}>
          <div className="interactive-projects-label">PROJECTS / <span>SELECT A THREAD</span></div>
          <div className="interactive-project-grid">
            {projects.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => setActiveProject(index)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: .3 }}
                transition={{ delay: index * .06, duration: .4 }}
                className={`interactive-project ${activeProject === index ? "interactive-project-active" : ""}`}
              >
                <span className="interactive-project-number">{item.number}</span>
                <span><b>{item.name}</b><small>{item.type}</small></span>
                <ArrowUpRight size={15} />
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section
          key={project.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: .4 }}
          className="interactive-project-banner"
        >
          <span className="interactive-project-banner-index">SELECTED / {project.number}</span>
          <h2>{project.statement}</h2>
          <span className="interactive-project-banner-name">{project.name}</span>
        </motion.section>

        <motion.nav className="interactive-lenses interactive-live-section" aria-label="Interactive views" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .45 }} transition={{ duration: .5 }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: .96 }}
                className={activeSection === section.id ? "interactive-lens active" : "interactive-lens"}
              >
                <Icon size={16} /><span>{section.label}</span>
              </motion.button>
            );
          })}
        </motion.nav>

        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="interactive-stage"
        >
          <motion.div className="interactive-stage-heading" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .25 }} transition={{ duration: .5 }}>
            <div>
              <p className="eyebrow">{activeSection === "3d" ? "Lens 01 / spatial view" : activeSection === "ai" ? "Lens 02 / conversation" : activeSection === "timeline" ? "Lens 03 / project history" : "Lens 04 / live signals"}</p>
              <h2>{activeSection === "3d" ? "Orbit the work." : activeSection === "ai" ? "Ask the portfolio." : activeSection === "timeline" ? "Trace the decisions." : "Read the pulse."}</h2>
            </div>
            <p>{activeSection === "3d" ? "Drag to rotate. Click a project surface to bring it forward." : activeSection === "ai" ? "Ask about the projects, the stack, or the thinking behind the work." : activeSection === "timeline" ? "A living record of the tools and ideas that shaped the products." : "A playful snapshot of the engineering habits behind the portfolio."}</p>
          </motion.div>

          {activeSection === "3d" && <Suspense fallback={<div className="interactive-loader">Loading project universe...</div>}><ProjectShowcase3D selectedProject={activeProject} onSelectProject={setActiveProject} /></Suspense>}
          {activeSection === "ai" && <AIAssistant projectContext={project.name} />}
          {activeSection === "timeline" && <GitHistoryTimeline />}
          {activeSection === "dashboard" && <LiveDashboard />}
        </motion.main>
      </div>
    </div>
  );
}
