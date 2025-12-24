import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button, Card, RoomCode, PlayerList, Timer } from '../components/common';
import { createRoom, updateRoomStatus, getPlayersInRoom, getAnswersForQuestion } from '../lib/supabase';
import { games, checkAnswer } from '../data/games';

export default function HostGame() {
  const navigate = useNavigate();
  const { roomCode: urlRoomCode } = useParams();
  const {
    room, setRoom,
    player, setPlayer,
    players, setPlayers,
    isHost, setIsHost,
    currentGame, setCurrentGame,
    currentQuestionIndex, setCurrentQuestionIndex,
    gamePhase, setGamePhase,
    answers, setAnswers,
    initializeRoom,
    refreshPlayers,
  } = useGame();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGames, setSelectedGames] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  // Initialize room on mount
  useEffect(() => {
    const initRoom = async () => {
      try {
        // Get selected games from session storage
        const storedGames = sessionStorage.getItem('selectedGames');
        const gameIds = storedGames ? JSON.parse(storedGames) : Object.keys(games);
        setSelectedGames(gameIds);

        // Create a new room
        const { room: newRoom, player: newPlayer, error } = await createRoom(gameIds);

        if (error) {
          setError(error);
          setLoading(false);
          return;
        }

        initializeRoom(newRoom, newPlayer, true);
        setIsHost(true);
        setLoading(false);
      } catch (err) {
        setError('Failed to create room');
        setLoading(false);
      }
    };

    initRoom();
  }, []);

  // Refresh players periodically
  useEffect(() => {
    if (!room?.id) return;

    const interval = setInterval(refreshPlayers, 3000);
    return () => clearInterval(interval);
  }, [room?.id, refreshPlayers]);

  // Get current game data
  const currentGameData = currentGame ? games[currentGame] : null;
  const currentQuestion = currentGameData?.questions?.[currentQuestionIndex] ||
                          currentGameData?.pairs?.[currentQuestionIndex];
  const totalQuestions = currentGameData?.questions?.length ||
                         currentGameData?.pairs?.length || 0;

  // Start the game
  const startGame = async () => {
    if (selectedGames.length === 0) return;

    const firstGame = selectedGames[0];
    setCurrentGame(firstGame);
    setCurrentGameIndex(0);
    setCurrentQuestionIndex(0);
    setGamePhase('question');
    setShowAnswer(false);

    await updateRoomStatus(room.id, 'playing', firstGame, 0);
  };

  // Move to next question
  const nextQuestion = async () => {
    setShowAnswer(false);
    setQuestionAnswers([]);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= totalQuestions) {
      // Move to next game or finish
      const nextGameIndex = currentGameIndex + 1;

      if (nextGameIndex >= selectedGames.length) {
        // All games complete
        setGamePhase('finished');
        await updateRoomStatus(room.id, 'finished');
        return;
      }

      // Move to next game
      setCurrentGameIndex(nextGameIndex);
      const nextGame = selectedGames[nextGameIndex];
      setCurrentGame(nextGame);
      setCurrentQuestionIndex(0);
      await updateRoomStatus(room.id, 'playing', nextGame, 0);
    } else {
      // Move to next question
      setCurrentQuestionIndex(nextIndex);
      await updateRoomStatus(room.id, 'playing', currentGame, nextIndex);
    }
  };

  // Reveal answer
  const revealAnswer = async () => {
    setShowAnswer(true);
    // Fetch all answers for this question
    const { answers } = await getAnswersForQuestion(room.id, currentGame, currentQuestionIndex);
    setQuestionAnswers(answers);
    await refreshPlayers();
  };

  // Show scoreboard
  const showScoreboard = () => {
    setGamePhase('scoreboard');
  };

  // Back to question
  const backToQuestion = () => {
    setGamePhase('question');
  };

  // End game
  const endGame = async () => {
    setGamePhase('finished');
    await updateRoomStatus(room.id, 'finished');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🎄</div>
          <p className="text-xl text-christmas-green">Setting up your game...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-christmas-red mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </Card>
      </div>
    );
  }

  // Lobby phase - waiting for players
  if (gamePhase === 'lobby') {
    const nonHostPlayers = players.filter(p => !p.is_host);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="font-festive text-4xl md:text-6xl text-christmas-red mb-2">
            Game Lobby
          </h1>
          <p className="text-christmas-green">
            Share this code with players!
          </p>
        </div>

        <RoomCode code={room?.code} size="xl" className="mb-8" />

        <div className="w-full max-w-md mb-8">
          <h3 className="font-bold text-lg mb-3 text-center">
            Players ({nonHostPlayers.length})
          </h3>
          <PlayerList
            players={nonHostPlayers}
            size="lg"
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="huge"
            onClick={startGame}
            disabled={nonHostPlayers.length === 0}
          >
            Start Game
          </Button>
        </div>

        {nonHostPlayers.length === 0 && (
          <p className="mt-4 text-amber-600">
            Waiting for at least one player to join...
          </p>
        )}
      </div>
    );
  }

  // Question phase
  if (gamePhase === 'question' && currentGameData && currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl">{currentGameData.icon}</span>
            <span className="ml-2 font-semibold">{currentGameData.title}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500">Question</span>
            <span className="font-bold text-2xl ml-2">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Question display - TV optimized */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Card className="w-full max-w-4xl text-center" padding="xl">
            {/* Emoji prompt for emoji games */}
            {currentQuestion.prompt && (
              <p className="text-6xl md:text-8xl mb-8">{currentQuestion.prompt}</p>
            )}

            {/* Question text */}
            {currentQuestion.question && (
              <p className="text-3xl md:text-5xl font-bold text-christmas-green leading-relaxed">
                {currentQuestion.question}
              </p>
            )}

            {/* Scrambled word */}
            {currentQuestion.scrambled && (
              <p className="text-5xl md:text-7xl font-mono font-bold text-christmas-red tracking-wider">
                {currentQuestion.scrambled}
              </p>
            )}

            {/* Code for codecracker */}
            {currentQuestion.code && (
              <p className="text-3xl md:text-5xl font-mono font-bold text-christmas-green">
                {currentQuestion.code}
              </p>
            )}

            {/* Statement for true/false */}
            {currentQuestion.statement && (
              <p className="text-3xl md:text-5xl font-bold text-christmas-green leading-relaxed">
                {currentQuestion.statement}
              </p>
            )}

            {/* Multiple choice options */}
            {currentQuestion.options && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {currentQuestion.options.map((option, i) => (
                  <div
                    key={i}
                    className={`
                      p-4 rounded-xl text-2xl md:text-3xl font-bold
                      ${showAnswer && option === currentQuestion.answer
                        ? 'bg-christmas-green text-white'
                        : 'bg-gray-100'
                      }
                    `}
                  >
                    {String.fromCharCode(65 + i)}. {option}
                  </div>
                ))}
              </div>
            )}

            {/* Answer reveal */}
            {showAnswer && (
              <div className="mt-8 p-6 bg-christmas-green/10 rounded-xl border-2 border-christmas-green">
                <p className="text-xl text-gray-600 mb-2">Answer:</p>
                <p className="text-4xl md:text-5xl font-bold text-christmas-green">
                  {currentQuestion.answer?.toString() === 'true' ? '✓ FACT' :
                   currentQuestion.answer?.toString() === 'false' ? '✗ FICTION' :
                   currentQuestion.answer}
                </p>
              </div>
            )}
          </Card>

          {/* Answer count */}
          <div className="mt-6 text-xl text-gray-600">
            {questionAnswers.length} / {players.filter(p => !p.is_host).length} answers received
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="ghost" size="lg" onClick={showScoreboard}>
            📊 Scoreboard
          </Button>
          {!showAnswer ? (
            <Button variant="gold" size="lg" onClick={revealAnswer}>
              Reveal Answer
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={nextQuestion}>
              Next Question →
            </Button>
          )}
          <Button variant="ghost" size="lg" onClick={endGame}>
            End Game
          </Button>
        </div>
      </div>
    );
  }

  // Scoreboard phase
  if (gamePhase === 'scoreboard') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="font-festive text-5xl md:text-7xl text-christmas-red mb-8">
          Scoreboard
        </h1>

        <Card className="w-full max-w-2xl" padding="lg">
          <PlayerList
            players={players.filter(p => !p.is_host)}
            showScores
            showRank
            size="xl"
          />
        </Card>

        <div className="flex gap-4 mt-8">
          <Button variant="secondary" size="lg" onClick={backToQuestion}>
            ← Back to Game
          </Button>
          <Button variant="primary" size="lg" onClick={nextQuestion}>
            Next Question →
          </Button>
        </div>
      </div>
    );
  }

  // Finished phase
  if (gamePhase === 'finished') {
    const sortedPlayers = [...players]
      .filter(p => !p.is_host)
      .sort((a, b) => b.score - a.score);

    const winner = sortedPlayers[0];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-8xl mb-4">🏆</div>
        <h1 className="font-festive text-5xl md:text-7xl text-christmas-gold mb-4">
          Game Over!
        </h1>

        {winner && (
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-600 mb-2">Winner</p>
            <p className="text-5xl mb-2">{winner.avatar}</p>
            <p className="text-4xl font-bold text-christmas-green">{winner.name}</p>
            <p className="text-3xl text-christmas-gold">{winner.score.toLocaleString()} points</p>
          </div>
        )}

        <Card className="w-full max-w-2xl mb-8" padding="lg">
          <h3 className="font-bold text-xl mb-4 text-center">Final Standings</h3>
          <PlayerList
            players={sortedPlayers}
            showScores
            showRank
            size="lg"
          />
        </Card>

        <Button variant="primary" size="huge" onClick={() => navigate('/')}>
          Play Again
        </Button>
      </div>
    );
  }

  return null;
}
