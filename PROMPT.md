# Claude Code Initial Prompt

Copy and paste this prompt when starting Claude Code in the project directory:

---

Build a Jackbox-style Christmas games webapp for my family. 

**How it should work:**
- One device (TV/laptop) hosts the game and displays questions + scoreboard
- Family members join on their phones using a 4-letter room code
- Players submit answers on their phones
- Scores sync in real-time to a shared leaderboard
- Host controls game flow (next question, reveal answers, etc.)

**Tech Stack:**
- React + Vite + Tailwind
- Supabase for real-time multiplayer (database + realtime subscriptions)
- Deploy to Vercel

**Setup Required:**
1. Read CLAUDE.md for full specs and database schema
2. The PDF files contain game questions and answer keys
3. You'll need to create a Supabase project - prompt me for the URL/key when ready

**Key Features:**
- Room codes for joining (like "XMAS")
- Host screen optimized for TV (large text, readable from couch)
- Player screens optimized for phones (big buttons, thumb-friendly)
- Real-time score updates
- 20+ Christmas games from the PDFs

**Priority:**
1. Project setup + Supabase schema
2. Room create/join system
3. Basic host/player flow
4. First game (Christmas Trivia)
5. Real-time answer sync
6. Add remaining games
7. Deploy to Vercel

Start by reading CLAUDE.md, set up the project, then walk me through Supabase setup. Work autonomously after that.

---

## Shorter Version

---

Build a Jackbox-style Christmas games webapp. Read CLAUDE.md for specs. 

One device hosts (TV), family joins on phones with room codes. Use React + Vite + Tailwind + Supabase for real-time sync. Deploy to Vercel.

Extract games from the PDFs. Start with room system, then Christmas Trivia as the first game. Prompt me for Supabase credentials when ready.

---

## Supabase Setup Steps

When Claude Code asks for Supabase setup:

1. Go to https://supabase.com and create a free account
2. Create a new project (remember the database password)
3. Once created, go to Settings → API
4. Copy the **Project URL** and **anon/public key**
5. Give these to Claude Code when prompted
6. Claude Code will create the database tables

## Vercel Deployment

When ready to deploy:

1. Push code to GitHub (Claude Code can help)
2. Go to https://vercel.com and connect your GitHub
3. Import the repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

Or let Claude Code deploy directly with `npx vercel`

---

## File Structure to Create

```
your-project-folder/
├── .claude/
│   └── settings.json
├── CLAUDE.md
├── JB_ChristmasGamesBundle_AnswerKeys.pdf
└── [other game PDFs]
```

---

## To Resume a Session

---

Continue building the Christmas games webapp. Read CLAUDE.md for current status and next steps. Pick up where you left off.

---

## Tips

- **Supabase free tier** is plenty for family use (500MB database, unlimited API requests)
- **Vercel free tier** handles this easily
- **Test locally** with `npm run dev` before deploying
- **Room codes expire** - old rooms auto-delete after 24 hours (built into the schema)

## Playing the Game

1. Open the site on a laptop/TV → "Host Game"
2. Select which games to play
3. Share the room code with family
4. Everyone joins on their phones
5. Host starts the game
6. Questions appear on TV, answers submitted on phones
7. Scores update live!
