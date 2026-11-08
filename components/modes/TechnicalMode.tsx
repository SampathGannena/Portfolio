"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Cloud,
  Database,
  GitBranch,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import CodePlayground from "../CodePlayground";
import TypewriterHeading from "../TypewriterHeading";
import HeroBackdrop from "../HeroBackdrop";

interface TechnicalModeProps {
  onBack: () => void;
}

const projects = [
  {
    number: "01",
    title: "GitGuard AI",
    category: "Security · Developer tooling",
    description: "Automated pull-request security review that isolates changed code, finds meaningful risk, and posts fix-first feedback directly to GitHub.",
    stack: ["Node.js", "React", "MongoDB", "Groq"],
    signal: "Webhook-driven",
    metric: "Risk-scored findings",
    accent: "coral",
    code: `const review = await securityReview({
  diff: changedFiles,
  rules: repositoryRules,
});

await github.createReview({
  body: review.summary,
  comments: review.findings.map(toInlineComment),
});`,
  },
  {
    number: "02",
    title: "StudyFinder",
    category: "EdTech · Collaboration",
    description: "A connected learning environment where learners discover mentors, join study groups, collaborate in real time, and track progress.",
    stack: ["Node.js", "MongoDB", "WebSockets", "PeerJS"],
    signal: "Real-time by default",
    metric: "Mentor-to-progress loop",
    accent: "blue",
    code: `const room = await studyRooms.join({
  learnerId,
  topic,
  presence: "online",
});

room.on("goal.completed", ({ goalId }) =>
  progress.track({ learnerId, goalId })
);`,
  },
  {
    number: "03",
    title: "NetSage AI",
    category: "AI · Networking",
    description: "Evidence-based troubleshooting for Cisco-style labs that turns symptoms and command output into a reviewable diagnosis.",
    stack: ["Python", "RAG", "Pydantic", "Streamlit"],
    signal: "Evidence-first AI",
    metric: "Human-reviewable output",
    accent: "gold",
    code: `evidence = retrieve(runbook, query=symptoms)
checks = deterministic_checks(command_output)

diagnosis = reconcile(
  ai_diagnosis=summarize(evidence, checks),
  confidence=checks.confidence,
)`,
  },
  {
    number: "04",
    title: "CareerForge Pro",
    category: "AI · Career tools",
    description: "An AI resume architect that tailors resumes and cover letters to a role while keeping every claim grounded in the candidate’s facts.",
    stack: ["React", "Express", "MongoDB", "Groq"],
    signal: "Grounded generation",
    metric: "Role-aligned output",
    accent: "coral",
    code: `const profile = await parseResume(upload);
const alignment = scoreAgainst(profile, jobDescription);

return generateApplication({
  facts: profile.facts,
  gaps: alignment.missingKeywords,
});`,
  },
  {
    number: "05",
    title: "SQLTown",
    category: "Learning · Game design",
    description: "An interactive SQL learning world where documentation, browser-based practice, interviews, and city-building make progress visible.",
    stack: ["React", "SQL.js", "Express", "MongoDB"],
    signal: "Browser-native practice",
    metric: "Learn by building",
    accent: "blue",
    code: `const result = db.exec(query);
const passed = hiddenTests.every((test) =>
  test.assert(result)
);

if (passed) await player.award({ xp: 100, quest });`,
  },
  {
    number: "06",
    title: "BlogSpace",
    category: "Publishing · Community",
    description: "A full publishing lifecycle for writing, discovery, discussion, moderation, and content performance in one focused platform.",
    stack: ["React", "Express", "MongoDB", "Chakra UI"],
    signal: "Lifecycle complete",
    metric: "Create → measure",
    accent: "gold",
    code: `const draft = await posts.save({
  authorId,
  body: markdown,
  status: "draft",
});

await analytics.track("draft.created", {
  postId: draft.id,
});`,
  },
];

const skills = [
  { category: "Product surface", icon: Layers3, items: ["React / Next.js", "TypeScript", "Design systems"] },
  { category: "Systems", icon: Database, items: ["Node.js / Express", "Python / FastAPI", "MongoDB / PostgreSQL"] },
  { category: "Intelligence", icon: Sparkles, items: ["RAG pipelines", "Grounded generation", "Evaluation workflows"] },
  { category: "Delivery", icon: Cloud, items: ["Docker / Kubernetes", "AWS / GCP", "CI/CD and observability"] },
];

export default function TechnicalMode({ onBack }: TechnicalModeProps) {
  const [selectedProject, setSelectedProject] = useState(0);
  const project = projects[selectedProject];

  return (
    <div className="technical-page">
      <div className="technical-container">
        <button onClick={onBack} className="technical-back">
          <ArrowLeft size={16} /> Back to overview
        </button>

        <header className="technical-hero">
          <HeroBackdrop />
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .65 }}>
            <p className="eyebrow"><span className="technical-prompt">&gt;_</span> Technical index / 2024—26</p>
            <TypewriterHeading
              segments={[
                { text: "How the " },
                { text: "work", emphasis: true },
                { text: "\nholds together." },
              ]}
            />
          </motion.div>
          <motion.div className="technical-intro" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .65, delay: .12 }}>
            <p>Six products, mapped by the decisions behind them: architecture, interfaces, and the small systems that make ambitious ideas useful.</p>
            <div className="technical-status"><CheckCircle2 size={15} /> Systems thinking, shipped in public</div>
          </motion.div>
        </header>

        <div className="technical-stats" aria-label="Portfolio statistics">
          {[
            ["06", "products explored"],
            ["04", "product domains"],
            ["∞", "ways to make it clearer"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              className="technical-stat"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: .65 }}
              transition={{ delay: 0.25 + index * 0.12 }}
            >
              <strong>{value}</strong><span>{label}</span><i />
            </motion.div>
          ))}
          <motion.div className="technical-stat-note" initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .65 }} transition={{ delay: 0.65 }}><ShieldCheck size={17} /> Built around evidence, feedback, and human control.</motion.div>
        </div>

        <motion.section className="technical-work" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .12 }} transition={{ duration: .65 }}>
          <motion.div className="technical-section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .5 }}>
            <div>
              <p className="eyebrow">01 / Project systems</p>
              <h2>Choose a system<br /><em>to inspect.</em></h2>
            </div>
            <p>Every project is a small product thesis. Select one to see the stack and a representative implementation detail.</p>
          </motion.div>

          <div className="technical-explorer">
            <div className="technical-project-list">
              {projects.map((item, index) => (
                <motion.button
                  key={item.title}
                  onClick={() => setSelectedProject(index)}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: .25 }}
                  transition={{ delay: index * .06, duration: .4 }}
                  className={`technical-project ${selectedProject === index ? "technical-project-active" : ""}`}
                >
                  <span className="technical-project-number">{item.number}</span>
                  <span>
                    <small>{item.category}</small>
                    <b>{item.title}</b>
                    <span className="technical-project-signal">{item.signal}</span>
                  </span>
                  <ArrowUpRight size={17} />
                </motion.button>
              ))}
            </div>

            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: .25 }}
              className={`technical-detail technical-detail-${project.accent}`}
            >
              <div className="technical-detail-top">
                <span className="technical-index">SYSTEM_{project.number}</span>
                <Braces size={20} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technical-pills">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="technical-detail-metric"><span>CORE SIGNAL</span><strong>{project.metric}</strong></div>
              <CodePlayground code={project.code} />
            </motion.article>
          </div>
        </motion.section>

        <motion.section className="technical-skills" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .12 }} transition={{ duration: .65 }}>
          <motion.div className="technical-section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .5 }}>
            <div><p className="eyebrow">02 / Working toolkit</p><h2>The layers<br /><em>in between.</em></h2></div>
            <p>Tools are selected for the problem, not the trend. The through-line is making complexity easier to operate.</p>
          </motion.div>
          <div className="technical-skill-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  className="technical-skill-card"
                  key={skill.category}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                >
                  <div className="technical-skill-icon"><Icon size={20} /><span>0{index + 1}</span></div>
                  <h3>{skill.category}</h3>
                  <ul>{skill.items.map((item, itemIndex) => <motion.li key={item} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .5 }} transition={{ delay: index * 0.1 + itemIndex * 0.08 }}><GitBranch size={13} />{item}<span className="technical-skill-signal" /></motion.li>)}</ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
        <motion.footer className="technical-footer" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .15 }} transition={{ duration: .7 }}>
          <motion.div className="technical-footer-copy" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .3 }}><span className="eyebrow">03 / Shipping loop</span><h2>Make it clear.<br /><em>Then make it move.</em></h2><p>A good system is never finished. It gets observed, refined, and shipped again.</p></motion.div>
          <motion.div className="technical-footer-console" initial={{ opacity: 0, x: 20, scale: .97 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: false, amount: .3 }} transition={{ delay: .12 }}>
            <div className="technical-console-top"><span><i /> LIVE BUILD</span><small>portfolio@sg:~/systems</small></div>
            <div className="technical-console-line"><b>$</b> npm run ship<span className="technical-cursor">_</span></div>
            <div className="technical-console-progress"><i /></div>
            <div className="technical-console-steps"><span className="done">01 / inspect</span><span className="done">02 / compose</span><span>03 / improve</span></div>
            <div className="technical-console-output"><CheckCircle2 size={14} /> Build is healthy. Keep making the next decision useful.</div>
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
}
