"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, CircleDot, RotateCcw, Send, Sparkles, User, Zap } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  projectContext?: string;
}

const projectPrompts = [
  { label: "GitGuard AI", prompt: "How does GitGuard AI make code reviews safer?" },
  { label: "StudyFinder", prompt: "Tell me about StudyFinder's collaboration features." },
  { label: "NetSage AI", prompt: "How does NetSage AI diagnose network issues?" },
  { label: "CareerForge", prompt: "What makes CareerForge Pro's AI grounded?" },
  { label: "SQLTown", prompt: "How does SQLTown make SQL learning fun?" },
  { label: "BlogSpace", prompt: "What can users do in BlogSpace?" },
];

function RecruiterIcon() {
  return (
    <svg className="recruiter-icon" viewBox="0 0 32 32" role="img" aria-label="Human recruiter assistant">
      <circle className="recruiter-icon-halo" cx="16" cy="16" r="14" />
      <path className="recruiter-icon-hair" d="M10.2 13.5c-.2-4.4 2.2-7 5.8-7s6 2.6 5.8 7c-.8-1.1-1.7-1.8-2.7-2.2-1.7 1.3-4.6 1.8-7.1 1.2-.6.3-1.2.7-1.8 1Z" />
      <circle className="recruiter-icon-face" cx="16" cy="14" r="5.1" />
      <path className="recruiter-icon-neck" d="M13.7 18.1h4.6v3.2h-4.6z" />
      <path className="recruiter-icon-shirt" d="M7.3 27c.5-4 2.8-6.2 6.4-7l2.3 2 2.3-2c3.6.8 5.9 3 6.4 7H7.3Z" />
      <path className="recruiter-icon-detail" d="m13.7 20 2.3 2 2.3-2M12.5 24.2h7" />
    </svg>
  );
}

export default function AIAssistant({ projectContext }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: projectContext
      ? `You are exploring ${projectContext}. Ask me how it works, what it is built with, or why it matters.`
      : "Welcome to the project desk. Ask me about any project, technology, or product decision in this portfolio.",
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useMockMode, setUseMockMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getMockResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("gitguard")) return "GitGuard AI is a webhook-driven security review tool. It isolates changed code, applies repository rules, scores meaningful risk, fingerprints findings, and posts fix-first inline feedback back to GitHub.";
    if (msg.includes("studyfinder") || msg.includes("study finder")) return "StudyFinder connects learners with mentors and study groups. Its product loop combines personalized discovery, real-time chat, collaborative coding, video rooms, goals, tasks, and AI-assisted support.";
    if (msg.includes("netsage") || msg.includes("network")) return "NetSage AI troubleshoots Cisco-style labs with evidence instead of guesses. It combines retrieved runbooks, deterministic command checks, structured AI diagnosis, confidence reconciliation, and human review.";
    if (msg.includes("careerforge") || msg.includes("resume") || msg.includes("cover letter")) return "CareerForge Pro tailors resumes and cover letters to a role while keeping claims grounded in candidate facts. It combines resume parsing, keyword alignment, ATS scoring, editable templates, and export workflows.";
    if (msg.includes("sqltown") || msg.includes("sql")) return "SQLTown turns SQL practice into a world to explore. Learners query browser-side databases, pass hidden tests, complete quests, earn XP, build a city, and track interview progress.";
    if (msg.includes("blogspace") || msg.includes("blog")) return "BlogSpace covers the full publishing lifecycle: Markdown authoring, drafts, publishing, search, bookmarks, threaded discussion, moderation, and content analytics.";
    if (msg.includes("react") || msg.includes("frontend") || msg.includes("next")) return "React and Next.js are used across the portfolio to build fast product surfaces, interactive learning flows, dashboards, and AI-assisted workflows. TypeScript, reusable components, and deliberate loading states keep those experiences maintainable.";
    if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack")) return "The project stack spans React, Next.js, TypeScript, Node.js, Python, Express, MongoDB, SQL.js, WebSockets, RAG pipelines, Groq, Streamlit, and cloud delivery tools.";
    if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio")) return "The six projects are GitGuard AI, StudyFinder, NetSage AI, CareerForge Pro, SQLTown, and BlogSpace. Each explores a different product problem across security, learning, AI, career tools, and publishing.";
    return "I can walk you through GitGuard AI, StudyFinder, NetSage AI, CareerForge Pro, SQLTown, or BlogSpace. Ask what problem a project solves, which technologies it uses, or how its user experience works.";
  };

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage || isTyping) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    if (useMockMode) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: getMockResponse(userMessage) }]);
        setIsTyping(false);
      }, 650);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMessage }] }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status !== 429 && errorData.error?.code !== "insufficient_quota") throw new Error("The assistant service returned an error.");
        setUseMockMode(true);
        setMessages((prev) => [...prev, { role: "assistant", content: getMockResponse(userMessage) }]);
        return;
      }
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Assistant request failed:", error);
      setUseMockMode(true);
      setMessages((prev) => [...prev, { role: "assistant", content: getMockResponse(userMessage) }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const resetConversation = () => {
    setMessages([{
      role: "assistant",
      content: projectContext
        ? `You are exploring ${projectContext}. Ask me how it works, what it is built with, or why it matters.`
        : "Welcome to the project desk. Ask me about any project, technology, or product decision in this portfolio.",
    }]);
    setInput("");
  };

  return (
    <div className="ai-console">
      <header className="ai-console-header">
        <div className="ai-console-brand"><span className="ai-console-pulse" /><div><strong>PROJECT DESK <span className="ai-console-live">LIVE</span></strong><small>Portfolio intelligence / {useMockMode ? "local fallback" : "connected"}</small></div></div>
        <div className="ai-console-actions">
          <span className="ai-console-model"><Sparkles size={13} /> {useMockMode ? "LOCAL MODE" : "ASSISTANT ONLINE"}</span>
          <button className="ai-reset" onClick={resetConversation} aria-label="Reset conversation" title="Reset conversation"><RotateCcw size={14} /></button>
        </div>
      </header>
      <div className="ai-console-context">
        <div className="ai-context-orbit"><CircleDot size={15} /><span /></div>
        <div><span className="ai-context-label">CURRENT THREAD</span><strong>{projectContext || "Portfolio index"}</strong></div>
        <div className="ai-context-stats"><span><b>06</b> projects</span><span><b>∞</b> questions</span></div>
      </div>
      <div className="ai-project-prompts">
        <span><Zap size={11} /> QUICK START</span>
        {projectPrompts.map((prompt) => <button key={prompt.label} onClick={() => handlePrompt(prompt.prompt)} className={projectContext === prompt.label ? "ai-prompt-active" : ""}>{prompt.label}<ArrowUpRight size={12} /></button>)}
      </div>
      <div className="ai-messages">
        {messages.length === 1 && !isTyping && (
          <div className="ai-starter-grid">
            {["What problem does it solve?", "Walk me through the stack", "Why does it matter?"].map((prompt) => (
              <button key={prompt} onClick={() => handlePrompt(projectContext ? `${prompt} (${projectContext})` : prompt)}>
                <span>{prompt}</span><ChevronRight size={14} />
              </button>
            ))}
          </div>
        )}
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`ai-message ${message.role === "user" ? "ai-message-user" : ""}`}>
            {message.role === "assistant" && <div className="ai-avatar ai-avatar-bot"><RecruiterIcon /></div>}
            <div className={`ai-bubble ${message.role === "user" ? "ai-bubble-user" : "ai-bubble-assistant"}`}>
              <span className="ai-bubble-label">{message.role === "user" ? "YOU" : "PROJECT DESK"}</span>
              <p>{message.content}</p>
            </div>
            {message.role === "user" && <div className="ai-avatar ai-avatar-user"><User size={17} /></div>}
          </div>
        ))}
        {isTyping && <div className="ai-message"><div className="ai-avatar ai-avatar-bot"><RecruiterIcon /></div><div className="ai-bubble ai-bubble-assistant ai-typing"><div><i /><i /><i /></div><span>Thinking through the project...</span></div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="ai-composer">
        <div className="ai-input-row">
          <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSend()} placeholder="Ask about a project, stack, or product decision..." className="ai-input" aria-label="Ask the project desk" />
          <button onClick={handleSend} disabled={!input.trim() || isTyping} className="ai-send"><Send size={15} /><span>Ask</span></button>
        </div>
        <div className="ai-composer-meta"><p className="ai-hint">{useMockMode ? "LOCAL MODE · Responses are grounded in the portfolio project index." : "Try a project chip above, or ask: How does NetSage AI work?"}</p><span>{input.length}/240</span></div>
      </div>
    </div>
  );
}
