"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, Star, Award, TrendingUp, Zap, Code, Users, Rocket } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ExecutiveModeProps {
  onBack: () => void;
}

export default function ExecutiveMode({ onBack }: ExecutiveModeProps) {
  const [activeProject, setActiveProject] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  useEffect(() => {
    setCountersStarted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const achievements = [
    { icon: "🏆", label: "AWS Certified", color: "from-yellow-500 to-orange-500" },
    { icon: "⭐", label: "Top Contributor", color: "from-blue-500 to-cyan-500" },
    { icon: "🎯", label: "Scrum Master", color: "from-green-500 to-emerald-500" },
    { icon: "🚀", label: "Tech Speaker", color: "from-purple-500 to-pink-500" },
  ];

  const skillDomains = [
    {
      domain: "Web Development",
      icon: "🌐",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React & Next.js", level: 95, icon: "⚛️" },
        { name: "TypeScript", level: 92, icon: "📘" },
        { name: "HTML5/CSS3", level: 90, icon: "🎨" },
        { name: "Tailwind CSS", level: 88, icon: "💨" },
      ]
    },
    {
      domain: "Backend Development",
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 90, icon: "🟢" },
        { name: "Python", level: 85, icon: "🐍" },
        { name: "GraphQL", level: 82, icon: "📊" },
        { name: "REST APIs", level: 93, icon: "🔌" },
      ]
    },
    {
      domain: "Cloud & DevOps",
      icon: "☁️",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "AWS", level: 88, icon: "☁️" },
        { name: "Docker", level: 87, icon: "🐳" },
        { name: "Kubernetes", level: 80, icon: "⎈" },
        { name: "CI/CD", level: 85, icon: "🔄" },
      ]
    },
    {
      domain: "Database & Storage",
      icon: "🗄️",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "PostgreSQL", level: 88, icon: "🐘" },
        { name: "MongoDB", level: 85, icon: "🍃" },
        { name: "Redis", level: 82, icon: "⚡" },
        { name: "MySQL", level: 80, icon: "🗃️" },
      ]
    },
  ];

  const highlights = [
    { metric: 5, label: "Years Experience", icon: "🎯", suffix: "+", color: "from-purple-500 to-pink-500" },
    { metric: 50, label: "Projects Delivered", icon: "🚀", suffix: "+", color: "from-blue-500 to-cyan-500" },
    { metric: 98, label: "Client Satisfaction", icon: "⭐", suffix: "%", color: "from-green-500 to-emerald-500" },
    { metric: 10, label: "Tech Stacks", icon: "💎", suffix: "+", color: "from-orange-500 to-red-500" },
  ];

  const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [end, countersStarted]);

    return <>{count}{suffix}</>;
  };

  const keyProjects = [
    {
      title: "E-Commerce Platform Optimization",
      company: "Fortune 500 Retailer",
      impact: "40% increase in conversion rate",
      revenue: "$2.5M additional annual revenue",
      tech: "Next.js, AWS, PostgreSQL",
      timeline: "6 months",
    },
    {
      title: "Real-time Analytics Dashboard",
      company: "SaaS Startup",
      impact: "Processing 1M+ events/day",
      revenue: "Reduced infrastructure costs by $200K/year",
      tech: "React, Node.js, Redis, Kafka",
      timeline: "4 months",
    },
    {
      title: "AI-Powered Recommendation Engine",
      company: "Media Platform",
      impact: "25% boost in user engagement",
      revenue: "15% increase in premium subscriptions",
      tech: "Python, TensorFlow, FastAPI",
      timeline: "8 months",
    },
  ];

  const skills = [
    {
      category: "Leadership",
      items: [
        "Team Management",
        "Technical Architecture",
        "Agile/Scrum",
        "Mentoring",
      ],
    },
    {
      category: "Frontend",
      items: ["React/Next.js", "TypeScript", "Tailwind CSS", "WebGL/Three.js"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "Redis"],
    },
    {
      category: "Cloud/DevOps",
      items: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    },
  ];

  const testimonials = [
    {
      quote:
        "Outstanding technical leadership and ability to deliver complex projects on time.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
    },
    {
      quote:
        "Transformed our legacy system into a modern, scalable platform. Exceptional work.",
      author: "Michael Chen",
      role: "VP Engineering, DataFlow",
    },
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-8 pt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-purple-300 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Mode Selection</span>
        </button>
      </div>

      {/* Hero Section with Image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="inline-block bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2 mb-4">
                  <span className="text-purple-300 text-sm font-semibold">
                    Available for Senior Roles
                  </span>
                </div>

                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Sampath Gannena
                </h1>

                <h2 className="text-3xl text-purple-300 mb-6 font-semibold">
                  Senior Full-Stack Developer & Tech Lead
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Transforming complex business challenges into elegant,
                  scalable technical solutions. Proven track record of
                  delivering high-impact projects that drive revenue and reduce
                  costs.
                </p>

                {/* Quick Contact */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="mailto:gannenasampath@gmail.com"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
                  >
                    <span>📧</span>
                    <span>Email</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sampath-gannena-4626b8288/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
                  >
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/SampathGannena"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all"
                  >
                    <span>💻</span>
                    <span>GitHub</span>
                  </a>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all">
                    <span>📄</span>
                    <span>Download Resume</span>
                  </button>
                </div>

                {/* Achievement Badges with Magnetic Effect */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1, type: "spring", bounce: 0.5 }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r ${achievement.color} p-0.5 rounded-full cursor-pointer relative group`}
                    >
                      <div className="absolute inset-0 blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative bg-slate-900 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
                        <motion.span 
                          className="text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          {achievement.icon}
                        </motion.span>
                        <span className="text-xs font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{achievement.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-purple-500/50 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Schedule a Meeting</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-purple-400/50 hover:border-purple-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all hover:bg-white/5 relative group"
                  >
                    <span className="relative z-10">View Projects</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right: Developer Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Glowing Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>

                {/* Image Container with Holographic Effect */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent shadow-2xl backdrop-blur-sm bg-gradient-to-br from-purple-900/50 to-blue-900/50"
                  style={{
                    backgroundImage: `linear-gradient(${mousePosition.x / 10}deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5))`,
                    boxShadow: `0 0 40px rgba(147, 51, 234, 0.4), inset 0 0 60px rgba(59, 130, 246, 0.2)`,
                  }}>
                  {/* Placeholder for developer image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                    <div className="text-center">
                      <div className="text-8xl mb-4">👨‍💻</div>
                      <p className="text-sm text-gray-400">
                        Replace with your photo
                      </p>
                      <p className="text-xs text-gray-500 mt-2 px-4">
                        Add your image to{" "}
                        <code className="bg-black/30 px-2 py-1 rounded">
                          public/profile.jpg
                        </code>
                      </p>
                    </div>
                  </div>

                  <Image
                    src="/profile.jpg"
                    alt="Sampath Gannena - Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                 
                </div>

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                >
                  ✓ Available
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                >
                  🏆 Top 1% Dev
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.08, y: -12, rotateX: 5, rotateY: 5 }}
              className={`relative bg-gradient-to-br ${item.color} p-0.5 rounded-2xl overflow-hidden group cursor-pointer`}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
              <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 text-center h-full shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)`,
                  boxShadow: `0 10px 40px -10px ${item.color.includes('purple') ? 'rgba(168, 85, 247, 0.4)' : item.color.includes('blue') ? 'rgba(59, 130, 246, 0.4)' : item.color.includes('green') ? 'rgba(34, 197, 94, 0.4)' : 'rgba(249, 115, 22, 0.4)'}`,
                }}>
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {item.icon}
                </motion.div>
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={item.metric} suffix={item.suffix} />
                </div>
                <div className="text-gray-300 font-medium">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Executive Summary with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ boxShadow: "0 0 60px rgba(168, 85, 247, 0.3)" }}
          className="relative bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-2xl rounded-3xl p-8 mb-16 border border-purple-400/30 shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all"></div>
          <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">💼</span>
            Executive Summary
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                Business Impact
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>$3M+ in revenue generated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>$700K+ cost savings delivered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>50% reduction in deployment time</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                Technical Leadership
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Led teams of 10+ developers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Architected systems for 5M+ users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Established CI/CD best practices</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                Innovation
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>AI/ML integration expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Performance optimization specialist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Modern architecture patterns</span>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">🚀</span>
            Featured Projects
          </h2>
          <div className="space-y-6">
            {keyProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)",
                  borderColor: "rgba(168, 85, 247, 0.8)"
                }}
                className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20 shadow-2xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-purple-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.company} • {project.timeline}
                    </p>
                  </div>
                  <div className="bg-purple-600/20 border border-purple-400/30 px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-600/30 transition-all">
                    <span className="text-purple-300 font-semibold">
                      Case Study →
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                    <p className="text-green-400 font-semibold mb-1">
                      📈 Performance Impact
                    </p>
                    <p className="text-white">{project.impact}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold mb-1">
                      💰 Business Value
                    </p>
                    <p className="text-white">{project.revenue}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.split(", ").map((tech, i) => (
                    <span
                      key={i}
                      className="bg-purple-600/20 border border-purple-400/30 px-3 py-1 rounded-full text-sm text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Overview - Floating Domain Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-10 h-10 text-yellow-400" />
            Technical Expertise
          </h2>
          
          {/* Floating Domain Badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            {skillDomains.map((domain, domainIndex) => (
              <motion.div
                key={domainIndex}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + domainIndex * 0.1, type: "spring", bounce: 0.5 }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDomain(selectedDomain === domainIndex ? null : domainIndex)}
                className={`bg-gradient-to-r ${domain.color} p-0.5 rounded-2xl cursor-pointer relative group transition-all`}
              >
                {/* Neon Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${domain.color} rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className={`relative bg-slate-900 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg transition-all ${
                  selectedDomain === domainIndex ? 'ring-2 ring-white/50' : ''
                }`}>
                  <motion.span 
                    className="text-3xl"
                    animate={{ 
                      rotate: selectedDomain === domainIndex ? [0, 10, -10, 0] : 0,
                      scale: selectedDomain === domainIndex ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {domain.icon}
                  </motion.span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {domain.domain}
                    </span>
                    <span className="text-xs text-gray-400">
                      {domain.skills.length} skills
                    </span>
                  </div>
                  {selectedDomain === domainIndex && (
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 180 }}
                      className="text-white text-xl ml-2"
                    >
                      ↑
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expanded Skills Display */}
          {selectedDomain !== null && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative"
            >
              <div className={`relative bg-gradient-to-r ${skillDomains[selectedDomain].color} p-0.5 rounded-3xl shadow-2xl`}>
                {/* Animated Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
                
                <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl p-8">
                  {/* Domain Title */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                    <span className="text-5xl">{skillDomains[selectedDomain].icon}</span>
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {skillDomains[selectedDomain].domain}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">Click on a badge to explore skills</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {skillDomains[selectedDomain].skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -30, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.05, x: 10 }}
                        className="group/skill bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <motion.span 
                              className="text-3xl"
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                            >
                              {skill.icon}
                            </motion.span>
                            <span className="text-lg font-semibold text-white group-hover/skill:text-purple-300 transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 + 0.2, ease: "easeOut" }}
                            className={`absolute h-full bg-gradient-to-r ${skillDomains[selectedDomain].color} rounded-full shadow-lg`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setSelectedDomain(null)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all hover:scale-105 flex items-center gap-2"
                    >
                      Close
                      <span className="text-lg">✕</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Testimonials with Ratings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            What Leaders Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-lg rounded-xl p-8 border border-purple-400/30 hover:border-purple-400/60 transition-all group overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-200 mb-6 italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl shadow-lg">
                      👤
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-purple-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-12 border border-purple-400/30"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's talk about how I can help drive your technical initiatives
            forward and deliver measurable business results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-105">
              📅 Schedule a Call
            </button>
            <button className="border-2 border-purple-400/50 hover:border-purple-400 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all hover:bg-white/5">
              📧 Send a Message
            </button>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
