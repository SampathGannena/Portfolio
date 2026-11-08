"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { useState, useEffect } from "react";

export default function PerformanceScore() {
  const [isVisible, setIsVisible] = useState(false);
  const [scores] = useState({
    performance: 100,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-gray-900 border border-terminal-text rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Gauge className="w-4 h-4 text-terminal-text" />
          <span className="text-xs font-bold text-terminal-text">
            Lighthouse Score
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Performance</span>
            <span className="text-terminal-text font-bold">{scores.performance}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">A11y</span>
            <span className="text-terminal-text font-bold">{scores.accessibility}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Best Practices</span>
            <span className="text-terminal-text font-bold">{scores.bestPractices}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">SEO</span>
            <span className="text-terminal-text font-bold">{scores.seo}</span>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-terminal-info">
          ⚡ &lt;1s load time
        </div>
      </div>
    </motion.div>
  );
}
