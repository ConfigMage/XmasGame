import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, subscribeToRoom, getPlayersInRoom } from '../lib/supabase';

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  // Room state
  const [room, setRoom] = useState(null);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  // Game state
  const [currentGame, setCurrentGame] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState('lobby'); // lobby, question, reveal, scoreboard, finished
  const [answers, setAnswers] = useState([]);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  // UI state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Refresh players list
  const refreshPlayers = useCallback(async () => {
    if (!room?.id) return;
    const { players: fetchedPlayers } = await getPlayersInRoom(room.id);
    setPlayers(fetchedPlayers);
  }, [room?.id]);

  // Subscribe to room updates
  useEffect(() => {
    if (!room?.id || !supabase) return;

    const subscription = subscribeToRoom(room.id, {
      onRoomChange: (updatedRoom) => {
        setRoom(updatedRoom);
        setCurrentGame(updatedRoom.current_game);
        setCurrentQuestionIndex(updatedRoom.current_question);

        // Update game phase based on room status
        if (updatedRoom.status === 'lobby') {
          setGamePhase('lobby');
        } else if (updatedRoom.status === 'playing') {
          setGamePhase('question');
        } else if (updatedRoom.status === 'finished') {
          setGamePhase('finished');
        }
      },
      onPlayersChange: () => {
        refreshPlayers();
      },
      onNewAnswer: (answer) => {
        setAnswers(prev => [...prev, answer]);
      },
    });

    // Initial fetch
    refreshPlayers();

    return () => {
      subscription.unsubscribe();
    };
  }, [room?.id, refreshPlayers]);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeRemaining === null || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  // Start timer
  const startTimer = useCallback((seconds) => {
    setTimeRemaining(seconds);
    setTimerActive(true);
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    setTimerActive(false);
  }, []);

  // Reset game state
  const resetGame = useCallback(() => {
    setRoom(null);
    setPlayer(null);
    setPlayers([]);
    setIsHost(false);
    setCurrentGame(null);
    setCurrentQuestionIndex(0);
    setGamePhase('lobby');
    setAnswers([]);
    setTimeRemaining(null);
    setTimerActive(false);
    setError(null);
  }, []);

  // Set room and player after creating/joining
  const initializeRoom = useCallback((roomData, playerData, hostStatus) => {
    setRoom(roomData);
    setPlayer(playerData);
    setIsHost(hostStatus);
    setGamePhase('lobby');
  }, []);

  // Calculate scores
  const calculatePoints = useCallback((isCorrect, responseTime, isFirst = false, isSecond = false, isThird = false, streak = 0) => {
    if (!isCorrect) return 0;

    let points = 100; // Base points

    // Speed bonus for first 3 correct
    if (isFirst) points += 50;
    else if (isSecond) points += 25;
    else if (isThird) points += 10;

    // Streak bonus
    points += streak * 10;

    return points;
  }, []);

  const value = {
    // State
    room,
    player,
    players,
    isHost,
    currentGame,
    currentQuestionIndex,
    gamePhase,
    answers,
    timeRemaining,
    timerActive,
    error,
    loading,

    // Actions
    setRoom,
    setPlayer,
    setPlayers,
    setIsHost,
    setCurrentGame,
    setCurrentQuestionIndex,
    setGamePhase,
    setAnswers,
    setError,
    setLoading,
    startTimer,
    stopTimer,
    resetGame,
    initializeRoom,
    refreshPlayers,
    calculatePoints,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
