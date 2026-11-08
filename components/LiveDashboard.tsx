"use client";

import { motion } from "framer-motion";
import { Activity, Star, GitFork, TrendingUp, ArrowUpRight, Radio, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function LiveDashboard() {
  // Mock data - replace with real API calls
  const stats = [
    { label: "GitHub Stars", value: "1,234", icon: Star, change: "+12%" },
    { label: "Contributions", value: "2,567", icon: Activity, change: "+8%" },
    { label: "Forks", value: "456", icon: GitFork, change: "+15%" },
    { label: "Followers", value: "890", icon: TrendingUp, change: "+5%" },
  ];

  const activityData = [
    { name: "Mon", commits: 12 },
    { name: "Tue", commits: 19 },
    { name: "Wed", commits: 8 },
    { name: "Thu", commits: 25 },
    { name: "Fri", commits: 18 },
    { name: "Sat", commits: 6 },
    { name: "Sun", commits: 10 },
  ];

  const languages = [
    { name: "TypeScript", percentage: 45, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f7df1e" },
    { name: "Python", percentage: 20, color: "#3776ab" },
    { name: "Go", percentage: 10, color: "#00add8" },
  ];

  return (
    <div className="pulse-dashboard">
      <div className="pulse-dashboard-head">
        <div><span className="pulse-kicker"><Radio size={12} /> SIGNAL MONITOR / LIVE</span><h3>Systems in motion.</h3></div>
        <div className="pulse-status"><i /> Last sync <strong>just now</strong></div>
      </div>
      <div className="pulse-summary"><span><Zap size={14} /> Engineering activity is trending upward</span><b>+18.4%</b><ArrowUpRight size={16} /></div>
      <div className="pulse-stat-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="pulse-stat-card"
            >
              <div className="pulse-stat-top"><span className="pulse-stat-index">0{index + 1}</span><Icon /><span>{stat.change}</span>
              </div>
              <strong>{stat.value}</strong><span>{stat.label}</span><div className="pulse-stat-bar"><i style={{ width: `${55 + index * 9}%` }} /></div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pulse-chart-card"
      >
        <div className="pulse-panel-head"><div><span>ACTIVITY STREAM</span><h3>Weekly activity</h3></div><b>126 commits <small>+8.2%</small></b></div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#00ff41"
              strokeWidth={2}
              dot={{ fill: "#00ff41", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pulse-languages-card"
      >
        <div className="pulse-panel-head"><div><span>STACK SIGNAL</span><h3>Language usage</h3></div><p>What the work is made of.</p></div>
        <div className="pulse-language-list">
          {languages.map((lang, index) => (
            <div key={index} className="pulse-language">
              <div><span><i style={{ backgroundColor: lang.color }} />{lang.name}</span><b>{lang.percentage}%</b>
              </div>
              <div className="pulse-language-track">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  className="pulse-language-fill"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pulse-footer"
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data updated in real-time</span>
        </div>
      </motion.div>
    </div>
  );
}
