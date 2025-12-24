import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Running in offline mode.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Room code generation (excludes confusing characters I, O)
export const generateRoomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

// Generate a unique host/player ID for this browser session
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('xmas-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('xmas-session-id', sessionId);
  }
  return sessionId;
};

// Room operations
export const createRoom = async (selectedGames = []) => {
  if (!supabase) return { error: 'Database not connected' };

  const hostId = getSessionId();
  let code = generateRoomCode();

  // Try to create room, regenerate code if collision
  for (let i = 0; i < 5; i++) {
    const { data, error } = await supabase
      .from('rooms')
      .insert({
        code,
        host_id: hostId,
        selected_games: selectedGames,
        status: 'lobby',
      })
      .select()
      .single();

    if (!error) {
      // Create host as first player
      const { data: player } = await supabase
        .from('players')
        .insert({
          room_id: data.id,
          name: 'Host',
          is_host: true,
          avatar: '🎅',
        })
        .select()
        .single();

      return { room: data, player, error: null };
    }

    // If code collision, try again
    if (error.code === '23505') {
      code = generateRoomCode();
      continue;
    }

    return { error: error.message };
  }

  return { error: 'Failed to generate unique room code' };
};

export const joinRoom = async (code, playerName, avatar = '🎄') => {
  if (!supabase) return { error: 'Database not connected' };

  // Find room by code
  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select()
    .eq('code', code.toUpperCase())
    .single();

  if (roomError || !room) {
    return { error: 'Room not found' };
  }

  if (room.status === 'finished') {
    return { error: 'Game has already ended' };
  }

  // Create player
  const { data: player, error: playerError } = await supabase
    .from('players')
    .insert({
      room_id: room.id,
      name: playerName,
      avatar,
      is_host: false,
    })
    .select()
    .single();

  if (playerError) {
    return { error: 'Failed to join room' };
  }

  return { room, player, error: null };
};

export const updateRoomStatus = async (roomId, status, currentGame = null, currentQuestion = 0) => {
  if (!supabase) return { error: 'Database not connected' };

  const update = { status };
  if (currentGame !== null) update.current_game = currentGame;
  if (currentQuestion !== undefined) update.current_question = currentQuestion;

  const { data, error } = await supabase
    .from('rooms')
    .update(update)
    .eq('id', roomId)
    .select()
    .single();

  return { room: data, error: error?.message };
};

export const submitAnswer = async (roomId, playerId, gameId, questionIndex, answer, isCorrect, points, responseTime) => {
  if (!supabase) return { error: 'Database not connected' };

  const { data, error } = await supabase
    .from('answers')
    .upsert({
      room_id: roomId,
      player_id: playerId,
      game_id: gameId,
      question_index: questionIndex,
      answer,
      is_correct: isCorrect,
      points_earned: points,
      response_time_ms: responseTime,
    }, {
      onConflict: 'room_id,player_id,game_id,question_index'
    })
    .select()
    .single();

  return { answer: data, error: error?.message };
};

export const updatePlayerScore = async (playerId, scoreToAdd, updateStreak = false, resetStreak = false) => {
  if (!supabase) return { error: 'Database not connected' };

  // Get current score
  const { data: player } = await supabase
    .from('players')
    .select('score, streak')
    .eq('id', playerId)
    .single();

  if (!player) return { error: 'Player not found' };

  const newScore = player.score + scoreToAdd;
  let newStreak = player.streak;

  if (resetStreak) {
    newStreak = 0;
  } else if (updateStreak) {
    newStreak = player.streak + 1;
  }

  const { data, error } = await supabase
    .from('players')
    .update({ score: newScore, streak: newStreak })
    .eq('id', playerId)
    .select()
    .single();

  return { player: data, error: error?.message };
};

export const getPlayersInRoom = async (roomId) => {
  if (!supabase) return { players: [], error: 'Database not connected' };

  const { data, error } = await supabase
    .from('players')
    .select()
    .eq('room_id', roomId)
    .order('score', { ascending: false });

  return { players: data || [], error: error?.message };
};

export const getAnswersForQuestion = async (roomId, gameId, questionIndex) => {
  if (!supabase) return { answers: [], error: 'Database not connected' };

  const { data, error } = await supabase
    .from('answers')
    .select('*, players(name, avatar)')
    .eq('room_id', roomId)
    .eq('game_id', gameId)
    .eq('question_index', questionIndex);

  return { answers: data || [], error: error?.message };
};

// Subscribe to room updates
export const subscribeToRoom = (roomId, callbacks) => {
  if (!supabase) return { unsubscribe: () => {} };

  const channel = supabase
    .channel(`room:${roomId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'rooms',
      filter: `id=eq.${roomId}`
    }, (payload) => {
      callbacks.onRoomChange?.(payload.new);
    })
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'players',
      filter: `room_id=eq.${roomId}`
    }, (payload) => {
      callbacks.onPlayersChange?.(payload);
    })
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'answers',
      filter: `room_id=eq.${roomId}`
    }, (payload) => {
      callbacks.onNewAnswer?.(payload.new);
    })
    .subscribe();

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    }
  };
};

export default supabase;
