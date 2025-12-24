import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button, Card, ScoreDisplay } from '../components/common';
import { joinRoom, submitAnswer, updatePlayerScore, supabase, subscribeToRoom } from '../lib/supabase';
import { games, checkAnswer, GAME_TYPES } from '../data/games';

// Avatar options
const AVATARS = ['🎅', '🤶', '🧝', '⛄', '🦌', '🎄', '🎁', '🔔', '⭐', '❄️', '🍪', '🥛'];

export default function PlayerGame() {
  const navigate = useNavigate();
  const { roomCode: urlRoomCode } = useParams();
  const {
    room, setRoom,
    player, setPlayer,
    initializeRoom,
  } = useGame();

  // Join form state
  const [joinCode, setJoinCode] = useState(urlRoomCode || '');
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState(null);

  // Game state
  const [gameState, setGameState] = useState('join'); // join, lobby, playing, submitted, result, finished
  const [currentGame, setCurrentGame] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [localScore, setLocalScore] = useState(0);

  // Timer for response time
  const questionStartTime = useRef(Date.now());

  // Subscribe to room updates
  useEffect(() => {
    if (!room?.id) return;

    const subscription = subscribeToRoom(room.id, {
      onRoomChange: (updatedRoom) => {
        setRoom(updatedRoom);

        // Handle game state changes
        if (updatedRoom.status === 'lobby') {
          setGameState('lobby');
        } else if (updatedRoom.status === 'playing') {
          // New question started
          if (updatedRoom.current_game !== currentGame ||
              updatedRoom.current_question !== currentQuestionIndex) {
            setCurrentGame(updatedRoom.current_game);
            setCurrentQuestionIndex(updatedRoom.current_question);
            setSubmitted(false);
            setAnswer('');
            setLastResult(null);
            questionStartTime.current = Date.now();
            setGameState('playing');
          }
        } else if (updatedRoom.status === 'finished') {
          setGameState('finished');
        }
      },
      onPlayersChange: async () => {
        // Refresh our player data
        if (player?.id) {
          const { data } = await supabase
            .from('players')
            .select()
            .eq('id', player.id)
            .single();
          if (data) {
            setPlayer(data);
            setLocalScore(data.score);
          }
        }
      },
    });

    return () => subscription.unsubscribe();
  }, [room?.id, currentGame, currentQuestionIndex, player?.id]);

  // Handle join
  const handleJoin = async (e) => {
    e.preventDefault();
    if (!joinCode || !playerName) return;

    setJoining(true);
    setJoinError(null);

    const { room: joinedRoom, player: joinedPlayer, error } = await joinRoom(
      joinCode.toUpperCase(),
      playerName.trim(),
      selectedAvatar
    );

    if (error) {
      setJoinError(error);
      setJoining(false);
      return;
    }

    initializeRoom(joinedRoom, joinedPlayer, false);
    setLocalScore(0);

    if (joinedRoom.status === 'lobby') {
      setGameState('lobby');
    } else if (joinedRoom.status === 'playing') {
      setCurrentGame(joinedRoom.current_game);
      setCurrentQuestionIndex(joinedRoom.current_question);
      setGameState('playing');
      questionStartTime.current = Date.now();
    } else {
      setGameState('finished');
    }

    setJoining(false);
  };

  // Handle answer submit
  const handleSubmit = async () => {
    if (!answer || submitted) return;

    setSubmitted(true);

    const gameData = games[currentGame];
    const question = gameData.questions?.[currentQuestionIndex] ||
                     gameData.pairs?.[currentQuestionIndex];

    // Check if answer is correct
    let isCorrect = false;

    if (gameData.type === GAME_TYPES.TRUE_FALSE) {
      isCorrect = answer === String(question.answer);
    } else if (gameData.type === GAME_TYPES.MULTIPLE_CHOICE ||
               gameData.type === GAME_TYPES.TWO_CHOICE) {
      isCorrect = answer === question.answer;
    } else {
      isCorrect = checkAnswer(answer, question.answer, question.alternates || []);
    }

    const responseTime = Date.now() - questionStartTime.current;

    // Calculate points (simplified - host would normally do this for fairness)
    const points = isCorrect ? 100 : 0;

    // Submit answer
    await submitAnswer(
      room.id,
      player.id,
      currentGame,
      currentQuestionIndex,
      answer,
      isCorrect,
      points,
      responseTime
    );

    // Update player score
    if (isCorrect) {
      await updatePlayerScore(player.id, points, true, false);
      setLocalScore(prev => prev + points);
    } else {
      await updatePlayerScore(player.id, 0, false, true);
    }

    setLastResult({ isCorrect, points });
    setGameState('submitted');
  };

  // Get current game/question data
  const gameData = currentGame ? games[currentGame] : null;
  const question = gameData?.questions?.[currentQuestionIndex] ||
                   gameData?.pairs?.[currentQuestionIndex];

  // Join screen
  if (gameState === 'join') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="font-festive text-4xl text-christmas-red mb-8">
          Join Game
        </h1>

        <Card className="w-full max-w-md">
          <form onSubmit={handleJoin} className="space-y-6">
            {/* Room Code */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="XMAS"
                maxLength={4}
                className="w-full text-center text-4xl font-mono font-bold tracking-widest
                         border-2 border-gray-300 rounded-xl p-4
                         focus:border-christmas-green focus:ring-2 focus:ring-christmas-green/20
                         uppercase"
              />
            </div>

            {/* Player Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                className="w-full text-xl border-2 border-gray-300 rounded-xl p-4
                         focus:border-christmas-green focus:ring-2 focus:ring-christmas-green/20"
              />
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Choose Your Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`
                      text-3xl p-2 rounded-xl transition-all
                      ${selectedAvatar === avatar
                        ? 'bg-christmas-green/20 ring-2 ring-christmas-green scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                      }
                    `}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            {joinError && (
              <p className="text-red-500 text-center">{joinError}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="xl"
              fullWidth
              loading={joining}
              disabled={!joinCode || !playerName}
            >
              Join Game
            </Button>
          </form>
        </Card>

        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => navigate('/')}
        >
          ← Back
        </Button>
      </div>
    );
  }

  // Lobby - waiting for host to start
  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="text-6xl mb-4">{player?.avatar}</div>
          <h2 className="text-2xl font-bold text-christmas-green mb-2">
            Welcome, {player?.name}!
          </h2>
          <p className="text-gray-600 mb-8">
            Waiting for the host to start the game...
          </p>
          <div className="flex justify-center">
            <div className="animate-pulse flex gap-2">
              <span className="text-4xl">🎄</span>
              <span className="text-4xl">🎅</span>
              <span className="text-4xl">🎁</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Playing - answer the question
  if (gameState === 'playing' && gameData && question) {
    return (
      <div className="min-h-screen flex flex-col p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{player?.avatar}</span>
            <span className="font-semibold">{player?.name}</span>
          </div>
          <ScoreDisplay score={localScore} size="sm" />
        </div>

        {/* Question info */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">
            {gameData.title} - Q{currentQuestionIndex + 1}
          </span>
        </div>

        {/* Answer input area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Card className="w-full max-w-md" padding="lg">
            {/* True/False buttons */}
            {gameData.type === GAME_TYPES.TRUE_FALSE && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={answer === 'true' ? 'secondary' : 'outline'}
                  size="huge"
                  onClick={() => setAnswer('true')}
                  className="text-4xl"
                >
                  ✓ Fact
                </Button>
                <Button
                  variant={answer === 'false' ? 'primary' : 'outline'}
                  size="huge"
                  onClick={() => setAnswer('false')}
                  className="text-4xl"
                >
                  ✗ Fiction
                </Button>
              </div>
            )}

            {/* Two-choice (Red/Green) */}
            {gameData.type === GAME_TYPES.TWO_CHOICE && question.options && (
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => (
                  <Button
                    key={option}
                    variant={answer === option ? 'secondary' : 'outline'}
                    size="huge"
                    onClick={() => setAnswer(option)}
                    className={`text-3xl ${option === 'Red' ? 'hover:bg-red-500' : 'hover:bg-green-500'}`}
                  >
                    {option === 'Red' ? '🔴' : '🟢'} {option}
                  </Button>
                ))}
              </div>
            )}

            {/* Multiple choice */}
            {gameData.type === GAME_TYPES.MULTIPLE_CHOICE && question.options && (
              <div className="space-y-3">
                {question.options.map((option, i) => (
                  <Button
                    key={option}
                    variant={answer === option ? 'secondary' : 'outline'}
                    size="lg"
                    fullWidth
                    onClick={() => setAnswer(option)}
                    className="text-left justify-start"
                  >
                    <span className="font-bold mr-3">{String.fromCharCode(65 + i)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* Text input for other types */}
            {(gameData.type === GAME_TYPES.TRIVIA ||
              gameData.type === GAME_TYPES.EMOJI ||
              gameData.type === GAME_TYPES.FILL_BLANK ||
              gameData.type === GAME_TYPES.WORD_SCRAMBLE ||
              gameData.type === GAME_TYPES.CODECRACKER) && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full text-2xl border-2 border-gray-300 rounded-xl p-4
                           focus:border-christmas-green focus:ring-2 focus:ring-christmas-green/20"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                />
              </div>
            )}

            {/* Submit button */}
            <Button
              variant="primary"
              size="huge"
              fullWidth
              onClick={handleSubmit}
              disabled={!answer}
              className="mt-6"
            >
              Submit Answer
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Submitted - waiting for others / showing result
  if (gameState === 'submitted') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center" padding="xl">
          {lastResult?.isCorrect ? (
            <>
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-christmas-green mb-2">
                Correct!
              </h2>
              <p className="text-2xl text-christmas-gold font-bold">
                +{lastResult.points} points
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-4">😅</div>
              <h2 className="text-3xl font-bold text-christmas-red mb-2">
                Not quite!
              </h2>
              <p className="text-lg text-gray-600">
                Better luck next time!
              </p>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 mb-2">Your Score</p>
            <p className="text-4xl font-bold text-christmas-gold">
              {localScore.toLocaleString()}
            </p>
          </div>

          <p className="mt-6 text-gray-500">
            Waiting for next question...
          </p>
        </Card>
      </div>
    );
  }

  // Finished
  if (gameState === 'finished') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center" padding="xl">
          <div className="text-8xl mb-4">🎄</div>
          <h2 className="text-3xl font-bold text-christmas-green mb-4">
            Game Over!
          </h2>

          <div className="mb-8">
            <p className="text-gray-500 mb-2">Your Final Score</p>
            <p className="text-5xl font-bold text-christmas-gold">
              {localScore.toLocaleString()}
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            Thanks for playing, {player?.name}!
          </p>

          <Button
            variant="primary"
            size="xl"
            fullWidth
            onClick={() => navigate('/')}
          >
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  return null;
}
