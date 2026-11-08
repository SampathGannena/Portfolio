import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Portfolio context that the AI will use to answer questions
const PORTFOLIO_CONTEXT = `
You are an AI assistant for a developer portfolio. Here's the information about the developer:

NAME: Sampath Gannena
ROLE: Senior Full-Stack Developer & Tech Lead

EXPERIENCE:
- 5+ years of full-stack development
- Led teams of 10+ developers
- Built systems serving 5M+ users
- Generated $3M+ in revenue
- Delivered $700K+ in cost savings

SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, WebGL/Three.js
- Backend: Node.js, Python, PostgreSQL, Redis, GraphQL
- Cloud/DevOps: AWS, Docker, CI/CD, Kubernetes
- Leadership: Team Management, Technical Architecture, Agile/Scrum, Mentoring

KEY PROJECTS:
1. E-Commerce Platform Optimization
   - 40% increase in conversion rate
   - $2.5M additional annual revenue
   - Tech: Next.js, AWS, PostgreSQL
   
2. Real-time Analytics Dashboard
   - Processing 1M+ events/day
   - Reduced infrastructure costs by $200K/year
   - Tech: React, Node.js, Redis, Kafka
   
3. AI-Powered Recommendation Engine
   - 25% boost in user engagement
   - 15% increase in premium subscriptions
   - Tech: Python, TensorFlow, FastAPI

Answer questions about this developer's skills, projects, and experience in a friendly, professional way.
Keep responses concise (2-3 sentences) unless asked for details.
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Check if Groq API key is set
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { 
          message: "I'm currently in demo mode. Get your free API key at https://console.groq.com" 
        },
        { status: 200 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Call Groq API - Using latest Llama model (completely free!)
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant', // Current fast model. Other options: 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'
      messages: [
        {
          role: 'system',
          content: PORTFOLIO_CONTEXT,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiMessage = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { message: "Sorry, I encountered an error. Please try again later." },
      { status: 500 }
    );
  }
}
