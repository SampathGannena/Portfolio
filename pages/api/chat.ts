import type { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

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

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<{ message: string }>
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    response.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { messages } = request.body;

    if (!process.env.GROQ_API_KEY) {
      response.status(200).json({
        message: "I'm currently in demo mode. Get your free API key at https://console.groq.com",
      });
      return;
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
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

    const aiMessage =
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response.";

    response.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Chat API Error:', error);
    response.status(500).json({
      message: 'Sorry, I encountered an error. Please try again later.',
    });
  }
}
