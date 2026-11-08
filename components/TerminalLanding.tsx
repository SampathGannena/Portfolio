"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

interface TerminalLandingProps {
  onComplete: () => void;
}

export default function TerminalLanding({ onComplete }: TerminalLandingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    { command: "whoami", output: "Full Stack Developer | Creative Problem Solver" },
    { command: "cat about.txt", output: "Passionate developer crafting unique digital experiences..." },
    { command: "ls skills/", output: "frontend/  backend/  devops/  ai-ml/  web3/" },
    { command: "echo $MISSION", output: "Building the future, one line of code at a time 🚀" },
  ];

  useEffect(() => {
    if (currentStep < commands.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, commands.length, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm">portfolio@terminal:~</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm space-y-4 min-h-[400px]">
            {commands.map((cmd, index) => (
              index <= currentStep && (
                <div key={index} className="space-y-2 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-prompt">$</span>
                    <span className="text-terminal-text glow">{cmd.command}</span>
                  </div>
                  {index < currentStep && (
                    <div className="pl-4 text-terminal-info">
                      {cmd.output}
                    </div>
                  )}
                </div>
              )
            ))}
            
            {currentStep >= commands.length && (
              <div className="animate-slide-up space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-terminal-prompt">$</span>
                  <span className="text-terminal-text glow">./start-portfolio.sh</span>
                </div>
                <div className="pl-4 text-green-400">
                  <TypeAnimation
                    sequence={[
                      "Loading portfolio...",
                      500,
                      "Initializing interactive experience...",
                      500,
                      "✓ Ready! Press any key to continue...",
                    ]}
                    wrapper="span"
                    speed={50}
                    cursor={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {currentStep >= commands.length && (
          <div className="text-center mt-8 animate-pulse">
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-terminal-text text-terminal-bg font-bold rounded-lg hover:bg-terminal-info transition-all transform hover:scale-105"
            >
              ENTER PORTFOLIO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
