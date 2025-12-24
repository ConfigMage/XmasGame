-- Christmas Games Multiplayer Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Game rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(4) UNIQUE NOT NULL,
  host_id VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'lobby' CHECK (status IN ('lobby', 'playing', 'finished')),
  current_game VARCHAR(50),
  current_question INT DEFAULT 0,
  selected_games TEXT[] DEFAULT '{}',
  settings JSONB DEFAULT '{"timer": 30, "showLeaderboardAfter": 5}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Players table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  avatar VARCHAR(10) DEFAULT '🎅',
  score INT DEFAULT 0,
  streak INT DEFAULT 0,
  is_host BOOLEAN DEFAULT FALSE,
  connected BOOLEAN DEFAULT TRUE,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Answers table
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  game_id VARCHAR(50) NOT NULL,
  question_index INT NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  points_earned INT DEFAULT 0,
  response_time_ms INT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, player_id, game_id, question_index)
);

-- Indexes for performance
CREATE INDEX idx_rooms_code ON rooms(code);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_players_room_id ON players(room_id);
CREATE INDEX idx_answers_room_id ON answers(room_id);
CREATE INDEX idx_answers_player_id ON answers(player_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for rooms updated_at
CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up old rooms (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_old_rooms()
RETURNS void AS $$
BEGIN
  DELETE FROM rooms WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow all operations for anonymous users (game doesn't require auth)
CREATE POLICY "Allow all operations on rooms" ON rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on players" ON players FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on answers" ON answers FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE players;
ALTER PUBLICATION supabase_realtime ADD TABLE answers;

-- Helpful view for leaderboard
CREATE OR REPLACE VIEW room_leaderboard AS
SELECT 
  p.room_id,
  p.id as player_id,
  p.name,
  p.avatar,
  p.score,
  p.streak,
  RANK() OVER (PARTITION BY p.room_id ORDER BY p.score DESC) as rank
FROM players p
WHERE p.connected = true
ORDER BY p.room_id, p.score DESC;
