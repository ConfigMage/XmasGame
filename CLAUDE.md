# Christmas Games Webapp

## Project Overview
Build an interactive Christmas games webapp for family game night with **Jackbox-style multiplayer**. One device hosts the main game display (TV/laptop), family members join on their phones and submit answers. Scores sync in real-time to a shared leaderboard.

## Deployment
- **Platform**: Vercel
- **Database**: Supabase (free tier) for real-time multiplayer sync
- **Domain**: Will deploy to Vercel, can add custom domain later

## Tech Stack
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks + Supabase Realtime
- **Routing**: React Router
- **Backend**: Supabase (Postgres + Realtime subscriptions)
- **Deployment**: Vercel

## Jackbox-Style Multiplayer Architecture

### How It Works
1. **Host** creates a game room → gets a 4-letter room code (e.g., "XMAS")
2. **Players** go to the site on their phones → enter room code + their name
3. **Host screen** shows the current question/game and live scoreboard
4. **Player screens** show answer input controls
5. **Answers sync in real-time** via Supabase Realtime
6. **Host controls** game flow (next question, reveal answers, etc.)

### User Flows

#### Host Flow
```
Home → "Host Game" → Select Games to Include → Get Room Code → 
Wait for Players → Start Game → Control Game Flow → View Final Scores
```

#### Player Flow
```
Home → "Join Game" → Enter Room Code → Enter Name → 
Wait in Lobby → Answer Questions on Phone → See Scores
```

### Screen Types

#### Host Screens (TV/Laptop)
- **Lobby**: Room code displayed large, list of joined players, "Start Game" button
- **Question Display**: Shows current question/prompt (large, readable from couch)
- **Scoreboard**: Live updating scores between rounds
- **Answer Reveal**: Shows correct answer + who got it right

#### Player Screens (Phone)
- **Join**: Room code input, name input
- **Waiting**: "Waiting for host to start..."
- **Answer Input**: Question-specific input (multiple choice buttons, text field, etc.)
- **Submitted**: "Answer submitted! Waiting for others..."
- **Results**: Shows if they got it right, their current score

## Database Schema (Supabase)

```sql
-- Game rooms
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(4) UNIQUE NOT NULL,
  host_id VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'lobby', -- lobby, playing, finished
  current_game VARCHAR(50),
  current_question INT DEFAULT 0,
  selected_games TEXT[], -- array of game IDs to play
  created_at TIMESTAMP DEFAULT NOW()
);

-- Players in rooms
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  score INT DEFAULT 0,
  is_host BOOLEAN DEFAULT FALSE,
  connected BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Submitted answers
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  game_id VARCHAR(50) NOT NULL,
  question_index INT NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN,
  points_earned INT DEFAULT 0,
  submitted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(room_id, player_id, game_id, question_index)
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE players;
ALTER PUBLICATION supabase_realtime ADD TABLE answers;
```

## Design Requirements
- **Theme**: Festive Christmas colors (red #c41e3a, green #165B33, gold #FFD700, white)
- **Host Screen**: Large text readable from 10+ feet away (TV viewing distance)
- **Player Screen**: Mobile-optimized, large touch targets, thumb-friendly
- **Room Code**: Display prominently, easy to read/type

## Games to Implement

### Trivia & Quiz Games (Multiple Choice/Text Input)
1. **Christmas Trivia** - 18 questions about Christmas traditions
2. **Christmas Movie Trivia** - 18 questions about Christmas movies
3. **Christmas Around the World Trivia** - 10 multiple choice questions
4. **Fact or Fiction** - 15 true/false statements about Christmas

### Emoji Games (Text Input)
5. **Christmas Movie Emoji Game** - Guess movie from emojis (15 items)
6. **Christmas Song Emoji Game** - Guess song from emojis (15 items)

### Matching Games (Selection-based for mobile)
7. **Festive Food Match** - Match foods to countries (10 items)
8. **Christmas Cookie Match-Up** - Match clues to cookie types (17 items)
9. **Christmas Around the World Languages** - Match greetings to languages (16 items)
10. **Movie Character Matchup** - Match characters to movies (16 items)
11. **Riddle Me This** - Match riddles to answers (15 items)

### Word Games
12. **Word Scramble 1** - Unscramble 15 Christmas words
13. **Word Scramble 2** - Unscramble 15 Christmas words
14. **Word Scramble 3** - Unscramble 15 Christmas words
15. **Codecracker Easy** - Decode number-to-letter ciphers (10 phrases)
16. **Codecracker Hard** - Mixed cipher puzzles (10 phrases)

### Fill-in-the-Blank
17. **Finish the Lyrics** - Complete Christmas song lyrics (20 items)
18. **Recipe Challenge** - Guess dish from ingredients (15 items)
19. **Candy Challenge** - Name candy from description (15 items)
20. **Guess the Christmas Movie** - Name movie from quote (19 items)
21. **Guess the Christmas Carol** - Decode clever clues to song titles (19 items)

### Quick-Fire Games
22. **Color Challenge (Red or Green)** - 16 questions (great for speed rounds)

### Complex Games (Lower Priority - work better as single-player)
23. **Crossword Puzzle**
24. **Word Search**
25. **Christmas Sudoku**
26. **Picture Sudoku**
27. **Santa Maze**
28. **I Spy**

## Game Modes

### Party Mode (Primary - Jackbox Style)
- Host controls the game
- Timed answers (configurable: 15s, 30s, 60s, unlimited)
- Points for correct answers
- Bonus points for fastest correct answer
- Live scoreboard between rounds

### Solo Mode (Secondary)
- Single player practice
- No room code needed
- Local score tracking

## Scoring System
- **Correct Answer**: 100 points
- **Speed Bonus**: +50 points for first correct, +25 for second, +10 for third
- **Streak Bonus**: +10 points per consecutive correct answer
- Final scores displayed with rankings and fun superlatives ("Fastest Fingers", "Comeback Kid", etc.)

## File Structure
```
/src
  /components
    /common
      Button.jsx
      Card.jsx
      Timer.jsx
      RoomCode.jsx
      PlayerList.jsx
    /host
      HostLobby.jsx
      HostQuestion.jsx
      HostScoreboard.jsx
      HostControls.jsx
    /player
      JoinRoom.jsx
      PlayerLobby.jsx
      PlayerAnswer.jsx
      PlayerWaiting.jsx
    /games
      TriviaGame.jsx
      EmojiGame.jsx
      MatchingGame.jsx
      WordScramble.jsx
      FillInBlank.jsx
  /data
    games.js (all game data extracted from PDFs)
  /lib
    supabase.js (Supabase client setup)
  /hooks
    useRoom.js (room state management)
    usePlayer.js (player state)
    useGameSync.js (real-time game state)
  /pages
    Home.jsx
    HostGame.jsx
    PlayerGame.jsx
    SoloGame.jsx
  /context
    GameContext.jsx
  App.jsx
  main.jsx
/supabase
  schema.sql (database schema)
vercel.json
```

## Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Vercel Deployment Setup

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deployment Steps
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Priority Order
1. **Set up project**: Vite + React + Tailwind + Supabase client
2. **Database**: Create Supabase project, run schema
3. **Room system**: Create/join rooms with codes
4. **Basic flow**: Host lobby → player join → start game
5. **First game**: Implement Christmas Trivia as template
6. **Real-time sync**: Answers + scores updating live
7. **Polish host display**: Make it TV-ready
8. **Add more games**: Work through the list
9. **Scoring + leaderboard**: Final scores, superlatives
10. **Solo mode**: For practice/testing
11. **Deploy to Vercel**

## Implementation Notes

### Room Code Generation
```javascript
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // No I, O (avoid confusion)
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
```

### Answer Validation
- Case-insensitive
- Trim whitespace
- Remove punctuation for comparison
- Support common alternatives (e.g., "Home Alone" = "home alone 1")

### Real-time Subscriptions
```javascript
// Subscribe to room changes
supabase
  .channel('room:' + roomId)
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'rooms',
    filter: `id=eq.${roomId}`
  }, handleRoomChange)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'players',
    filter: `room_id=eq.${roomId}`
  }, handlePlayersChange)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'answers',
    filter: `room_id=eq.${roomId}`
  }, handleNewAnswer)
  .subscribe();
```

### Mobile Considerations
- Large buttons (min 48px touch target)
- No hover states (use active/focus)
- Prevent zoom on input focus
- Simple, thumb-reachable layouts

## Session Continuity
After each session, update this file with:
- Completed features
- Current state of implementation
- Supabase setup status
- Any blockers or decisions made
- Next steps

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx vercel` - Deploy to Vercel (after login)
- `npx vercel --prod` - Deploy to production

## Supabase Setup Checklist
- [ ] Create Supabase project
- [ ] Run schema.sql to create tables
- [ ] Enable Realtime on tables
- [ ] Copy URL and anon key to .env
- [ ] Test connection

## Current Status
✅ Core app built - Ready for Supabase setup and deployment!

## Completed Features
- [x] Vite + React + Tailwind project setup
- [x] All 22 games extracted from PDFs with answer data
- [x] Supabase client library ready
- [x] Core UI components (Button, Card, Timer, RoomCode, PlayerList, ScoreDisplay)
- [x] Home page with Host/Join/Solo options
- [x] Host game page with lobby, question display, scoreboard, and game over screens
- [x] Player game page with join form, waiting, answer input, and result screens
- [x] Solo practice mode for all games
- [x] Answer validation with alternate answers support
- [x] Real-time subscription setup (ready for Supabase)
- [x] Vercel config ready
- [x] Database schema ready in supabase/schema.sql

## Games Implemented
1. Christmas Movie Emoji Game (15 questions)
2. Christmas Song Emoji Game (15 questions)
3. Christmas Trivia (18 questions)
4. Christmas Movie Trivia (18 questions)
5. Christmas Around the World Trivia (10 questions - multiple choice)
6. Fact or Fiction (15 true/false)
7. Finish the Lyrics (20 questions)
8. Word Scramble 1, 2, 3 (15 each)
9. Codecracker Easy & Hard (10 each)
10. Festive Food Match (10 items)
11. Recipe Challenge (15 questions)
12. Candy Challenge (15 questions)
13. Red or Green Challenge (16 questions)
14. Riddle Me This (15 riddles)
15. Christmas Cookie Match-Up (17 items)
16. Merry Christmas in Languages (16 items)
17. Guess the Movie from Quote (19 quotes)
18. Guess the Christmas Carol (19 clues)
19. Movie Character Matchup (16 items)

## Next Steps
1. **Set up Supabase** - Create project and run schema.sql
2. **Add .env file** - With Supabase URL and anon key
3. **Test multiplayer** - Host on one device, join on another
4. **Deploy to Vercel**

## How to Complete Setup

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Go to SQL Editor
4. Copy contents of `supabase/schema.sql` and run it
5. Go to Settings → API and copy:
   - Project URL
   - anon/public key

### 2. Create .env file
```bash
cp .env.example .env
# Then edit .env with your Supabase credentials
```

### 3. Test locally
```bash
npm run dev
```

### 4. Deploy to Vercel
```bash
npx vercel
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel dashboard
npx vercel --prod
```
