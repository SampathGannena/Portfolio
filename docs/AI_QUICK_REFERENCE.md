# 🤖 AI Assistant - Quick Reference

## ✅ Setup Checklist

- [ ] Get OpenAI API key from https://platform.openai.com/api-keys
- [ ] Create `.env.local` file in portfolio root
- [ ] Add: `OPENAI_API_KEY=sk-your-key-here`
- [ ] Restart dev server: `npm run dev`
- [ ] Test in Interactive Mode

## 📝 Files Modified

```
✅ components/AIAssistant.tsx     - Updated to call API
✅ app/api/chat/route.ts          - API endpoint created
✅ .env.local.example              - Environment template
✅ AI_SETUP_GUIDE.md              - Full documentation
```

## 🎯 How It Works

```
User types message
      ↓
Frontend (AIAssistant.tsx)
      ↓
POST /api/chat
      ↓
Backend (route.ts)
      ↓
OpenAI API
      ↓
AI Response
      ↓
Display to user
```

## 💡 Quick Commands

```bash
# Test if API key is working
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'

# Check environment variables (should show OPENAI_API_KEY)
# Don't run this in production!
printenv | grep OPENAI
```

## 🔐 Security Best Practices

✅ **DO:**
- Keep API key in `.env.local`
- Add `.env*.local` to `.gitignore` (already done)
- Use environment variables
- Set spending limits on OpenAI dashboard

❌ **DON'T:**
- Commit `.env.local` to git
- Share your API key publicly
- Use API key in frontend code
- Hard-code secrets

## 💰 Cost Management

**Set spending limit:**
1. Go to https://platform.openai.com/account/billing/limits
2. Set "Soft limit" (gets warning email)
3. Set "Hard limit" (stops when reached)

**Recommended limits for portfolio:**
- Soft limit: $5/month
- Hard limit: $10/month

Most portfolios use <$1/month!

## 📊 Monitoring

**Check usage:**
- Dashboard: https://platform.openai.com/usage
- Shows: Requests, tokens, cost
- Export data for analysis

## 🚀 Going to Production

Before deploying to Vercel/Netlify:

1. Add environment variable in platform settings
2. Don't commit `.env.local`
3. Set production spending limits
4. Test thoroughly

**Vercel Example:**
```bash
# Via CLI
vercel env add OPENAI_API_KEY

# Or in dashboard:
Settings → Environment Variables → Add
Name: OPENAI_API_KEY
Value: sk-your-key
Environment: Production
```

## 🆘 Support

- OpenAI Help: https://help.openai.com
- Community: https://community.openai.com
- Status: https://status.openai.com
