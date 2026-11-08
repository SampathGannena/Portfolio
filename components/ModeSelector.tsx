"use client";

import { motion } from "framer-motion";
import { Clock, Code, Sparkles } from "lucide-react";

interface ModeSelectorProps {
  onModeSelect: (mode: "executive" | "technical" | "interactive") => void;
}

export default function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  const modes = [
    {
      id: "executive" as const,
      title: "Executive Mode",
      description: "5-minute overview for decision makers",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      duration: "~5 min",
    },
    {
      id: "technical" as const,
      title: "Technical Deep Dive",
      description: "Comprehensive technical showcase",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      duration: "~15 min",
    },
    {
      id: "interactive" as const,
      title: "Interactive Experience",
      description: "Full portfolio with 3D, AI chat, and live demos",
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
      duration: "Explore",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 glow-strong">
            Choose Your Experience
          </h1>
          <p className="text-xl text-gray-400">
            Select how you'd like to explore this portfolio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onModeSelect(mode.id)}
                className="relative group"
              >
                <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-8 h-full hover:border-terminal-text transition-all">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>
                  
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${mode.color}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-terminal-text">
                    {mode.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {mode.description}
                  </p>
                  <div className="text-sm text-terminal-info font-mono">
                    {mode.duration}
                  </div>

                  {/* Hover Effect */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-terminal-text font-bold">
                      Click to Enter →
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-gray-500"
        >
          <p className="text-sm">
            💡 Tip: Open DevTools (F12) for hidden features
          </p>
        </motion.div>
      </div>
    </div>
  );
}
