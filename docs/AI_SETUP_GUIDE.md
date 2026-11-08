# AI Assistant API Integration Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your OpenAI API Key

1. Go to **https://platform.openai.com/api-keys**
2. Sign up or log in
3. Click **"Create new secret key"**
4. Give it a name (e.g., "Portfolio AI Assistant")
5. **Copy the key** (starts with `sk-...`)

### Step 2: Add API Key to Your Project

1. Create a file named `.env.local` in your portfolio root folder:
   ```
   c:\portfolio\.env.local
   ```

2. Add this line to the file:
   ```bash
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
   
3. **Important:** Make sure `.env.local` is in your `.gitignore` (it already is!)

### Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test It!

1. Open your portfolio: http://localhost:3000
2. Click "Interactive Mode"
3. Scroll to the AI Assistant
4. Ask: "Tell me about your React experience"

**That's it!** 🎉 Your AI assistant is now live!

---

## 💰 Cost Breakdown

**OpenAI GPT-3.5 Turbo:**
- ~$0.002 per conversation
- ~$1 for 500 conversations
- Perfect for portfolio sites

**OpenAI GPT-4:**
- Better responses but more expensive
- ~$0.03 per conversation
- Change model in `app/api/chat/route.ts` line 52

---

## 🔧 Customization

### Update Portfolio Context

Edit `app/api/chat/route.ts` around line 5 to customize what the AI knows about you:

```typescript
const PORTFOLIO_CONTEXT = `
You are an AI assistant for [YOUR NAME]'s portfolio...

Add your actual:
- Name and role
- Skills and experience  
- Projects and achievements
- Awards and certifications
`;
```

### Change AI Model

```typescript
// In app/api/chat/route.ts line 52
model: 'gpt-3.5-turbo',  // Fast, cheap, good quality
// or
model: 'gpt-4',          // Best quality, more expensive
// or  
model: 'gpt-4-turbo',    // Fast GPT-4, good balance
```

---

## 🆓 Free Alternatives

### Option 1: Google Gemini (Free Tier)

1. Get API key: https://makersuite.google.com/app/apikey
2. Update `.env.local`:
   ```bash
   GOOGLE_AI_KEY=your_google_key
   ```

3. Replace API call in `route.ts`:
```typescript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: PORTFOLIO_CONTEXT + '\n\n' + messages.map(m => 
            `${m.role}: ${m.content}`
          ).join('\n')
        }]
      }]
    }),
  }
);
```

### Option 2: Ollama (100% Free, Local)

1. Install Ollama: https://ollama.ai
2. Run: `ollama run llama2`
3. Update API endpoint:
```typescript
const response = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama2',
    messages: [{ role: 'system', content: PORTFOLIO_CONTEXT }, ...messages],
  }),
});
```

**Pros:** 100% free, private, no API keys  
**Cons:** Slower, runs on your computer

---

## 🐛 Troubleshooting

### "I'm currently in demo mode"
- API key not set or not found
- Check `.env.local` exists in root folder
- Restart dev server after adding key

### "Failed to get response"
- Check API key is valid
- Check you have credits on OpenAI account
- Check console for error details

### Rate Limits
- OpenAI free tier: 3 requests/minute
- Upgrade to paid: 3,500 requests/minute
- Cost: Pay-as-you-go, usually <$1/month

---

## 📚 Learn More

- OpenAI API Docs: https://platform.openai.com/docs
- Pricing: https://openai.com/pricing
- API Status: https://status.openai.com