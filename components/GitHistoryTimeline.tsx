"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, GitCommit, GitMerge, Sparkles } from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  type: "commit" | "branch" | "merge";
  description: string;
  tech: string[];
}

export default function GitHistoryTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const timeline: TimelineEvent[] = [
    {
      year: "2020",
      title: "Started Full-Stack Journey",
      type: "commit",
      description: "Learned React, Node.js, and built first web applications",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      year: "2021",
      title: "Branched into Cloud",
      type: "branch",
      description: "Gained AWS certification and deployed scalable applications",
      tech: ["AWS", "Docker", "Kubernetes"]
    },
    {
      year: "2022",
      title: "Merged AI/ML Skills",
      type: "merge",
      description: "Integrated machine learning into web applications",
      tech: ["Python", "TensorFlow", "FastAPI"]
    },
    {
      year: "2023",
      title: "Advanced TypeScript",
      type: "commit",
      description: "Mastered TypeScript and modern frontend frameworks",
      tech: ["TypeScript", "Next.js", "Tailwind"]
    },
    {
      year: "2024",
      title: "Microservices Architecture",
      type: "branch",
      description: "Built and deployed production microservices",
      tech: ["GraphQL", "PostgreSQL", "Redis"]
    },
    {
      year: "2025",
      title: "Innovation & Leadership",
      type: "merge",
      description: "Leading projects and mentoring developers",
      tech: ["Architecture", "Leadership", "Innovation"]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "commit":
        return GitCommit;
      case "branch":
        return GitBranch;
      case "merge":
        return GitMerge;
      default:
        return GitCommit;
    }
  };

  return (
    <div className="trace-timeline">
      <div className="trace-overview">
        <div><span className="trace-overline"><Sparkles size={12} /> BUILD LOG / 2020—25</span><strong>Six pivots.<br /><em>One evolving system.</em></strong></div>
        <p>Every chapter added a new layer: from shipping interfaces to designing the systems and teams behind them.</p>
      </div>
      <div className="trace-rail" aria-hidden="true"><span /></div>

      <div className="trace-events">
        {timeline.map((event, index) => {
          const Icon = getIcon(event.type);
          const isSelected = selectedEvent === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`trace-event ${isSelected ? "trace-event-selected" : ""}`}
            >
              <div className="trace-node">
                <Icon size={15} />
              </div>

              <button
                onClick={() => setSelectedEvent(isSelected ? null : index)}
                className="trace-card"
              >
                <div className="trace-card-topline">
                  <span className="trace-year">{event.year}</span>
                  <span className="trace-type">{event.type} / 0{index + 1}</span>
                </div>
                <div className="trace-card-content">
                  <div><h3>{event.title}</h3><p>{event.description}</p></div>
                  <span className="trace-card-arrow"><ArrowUpRight size={17} /></span>
                </div>
                <div className="trace-tech">
                  {event.tech.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                {isSelected && <div className="trace-expanded">Selected signal · this chapter compounds the next one.</div>}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
