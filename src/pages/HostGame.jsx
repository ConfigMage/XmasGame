import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Button, Card, RoomCode, PlayerList, Timer, ScoreDisplay } from '../components/common';
import { createRoom, updateRoomStatus, getPlayersInRoom, getAnswersForQuestion, submitAnswer, updatePlayerScore, setPlayerScore, supabase } from '../lib/supabase';
import { games, checkAnswer, GAME_TYPES } from '../data/games';

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

  // Host playing state
  const [hostAnswer, setHostAnswer] = useState('');
  const [hostSubmitted, setHostSubmitted] = useState(false);
  const [hostLastResult, setHostLastResult] = useState(null);
  const [hostScore, setHostScore] = useState(0);
  const questionStartTime = useRef(Date.now());

  // Score adjustment state
  const [adjustingPlayer, setAdjustingPlayer] = useState(null);
  const [scoreAdjustment, setScoreAdjustment] = useState(0);

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

  // Subscribe to answers for current question in real-time
  useEffect(() => {
    if (!room?.id || !currentGame || gamePhase !== 'question' || !supabase) return;

    console.log('Setting up answer subscription for:', room.id, currentGame, currentQuestionIndex);

    const channel = supabase
      .channel(`host-answers:${room.id}:${currentGame}:${currentQuestionIndex}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'answers',
        filter: `room_id=eq.${room.id}`
      }, (payload) => {
        const newAnswer = payload.new;
        // Only add if it's for the current game/question
        if (newAnswer.game_id === currentGame && newAnswer.question_index === currentQuestionIndex) {
          console.log('New answer received:', newAnswer);
          setQuestionAnswers(prev => {
            // Avoid duplicates
            if (prev.some(a => a.player_id === newAnswer.player_id)) {
              return prev;
            }
            return [...prev, newAnswer];
          });
        }
      })
      .subscribe((status) => {
        console.log('Answer subscription status:', status);
      });

    return () => {
      console.log('Cleaning up answer subscription');
      supabase.removeChannel(channel);
    };
  }, [room?.id, currentGame, currentQuestionIndex, gamePhase]);

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
    setHostAnswer('');
    setHostSubmitted(false);
    setHostLastResult(null);
    questionStartTime.current = Date.now();

    await updateRoomStatus(room.id, 'playing', firstGame, 0);
  };

  // Move to next question
  const nextQuestion = async () => {
    setShowAnswer(false);
    setQuestionAnswers([]);
    setHostAnswer('');
    setHostSubmitted(false);
    setHostLastResult(null);
    questionStartTime.current = Date.now();

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

  // Handle host answer submit
  const handleHostSubmit = async () => {
    if (!hostAnswer || hostSubmitted) return;

    setHostSubmitted(true);

    const gameData = games[currentGame];
    const question = gameData.questions?.[currentQuestionIndex] ||
                     gameData.pairs?.[currentQuestionIndex];

    // Check if answer is correct
    let isCorrect = false;

    if (gameData.type === GAME_TYPES.TRUE_FALSE) {
      isCorrect = hostAnswer === String(question.answer);
    } else if (gameData.type === GAME_TYPES.MULTIPLE_CHOICE ||
               gameData.type === GAME_TYPES.TWO_CHOICE) {
      isCorrect = hostAnswer === question.answer;
    } else {
      isCorrect = checkAnswer(hostAnswer, question.answer, question.alternates || []);
    }

    const responseTime = Date.now() - questionStartTime.current;
    const points = isCorrect ? 100 : 0;

    // Submit answer to database
    await submitAnswer(
      room.id,
      player.id,
      currentGame,
      currentQuestionIndex,
      hostAnswer,
      isCorrect,
      points,
      responseTime
    );

    // Update host score
    if (isCorrect) {
      await updatePlayerScore(player.id, points, true, false);
      setHostScore(prev => prev + points);
    } else {
      await updatePlayerScore(player.id, 0, false, true);
    }

    setHostLastResult({ isCorrect, points });
  };

  // Handle score adjustment
  const handleScoreAdjustment = async () => {
    if (!adjustingPlayer || scoreAdjustment === 0) return;

    const newScore = Math.max(0, adjustingPlayer.score + scoreAdjustment);
    await setPlayerScore(adjustingPlayer.id, newScore);

    // Update local host score if adjusting self
    if (adjustingPlayer.id === player?.id) {
      setHostScore(newScore);
    }

    await refreshPlayers();
    setAdjustingPlayer(null);
    setScoreAdjustment(0);
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
          <div className="flex items-center gap-4">
            <div>
              <span className="text-2xl">{currentGameData.icon}</span>
              <span className="ml-2 font-semibold">{currentGameData.title}</span>
            </div>
            <ScoreDisplay score={hostScore} size="sm" />
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

          {/* Host answer input */}
          {!showAnswer && (
            <Card className="w-full max-w-md mt-6" padding="md">
              {!hostSubmitted ? (
                <>
                  <p className="text-center text-sm text-gray-500 mb-3">Your answer (Host)</p>

                  {/* True/False buttons */}
                  {currentGameData.type === GAME_TYPES.TRUE_FALSE && (
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Button
                        variant={hostAnswer === 'true' ? 'secondary' : 'outline'}
                        size="lg"
                        onClick={() => setHostAnswer('true')}
                      >
                        ✓ Fact
                      </Button>
                      <Button
                        variant={hostAnswer === 'false' ? 'primary' : 'outline'}
                        size="lg"
                        onClick={() => setHostAnswer('false')}
                      >
                        ✗ Fiction
                      </Button>
                    </div>
                  )}

                  {/* Two-choice (Red/Green) */}
                  {currentGameData.type === GAME_TYPES.TWO_CHOICE && currentQuestion.options && (
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {currentQuestion.options.map((option) => (
                        <Button
                          key={option}
                          variant={hostAnswer === option ? 'secondary' : 'outline'}
                          size="lg"
                          onClick={() => setHostAnswer(option)}
                        >
                          {option === 'Red' ? '🔴' : '🟢'} {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Multiple choice */}
                  {currentGameData.type === GAME_TYPES.MULTIPLE_CHOICE && currentQuestion.options && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {currentQuestion.options.map((option, i) => (
                        <Button
                          key={option}
                          variant={hostAnswer === option ? 'secondary' : 'outline'}
                          size="md"
                          onClick={() => setHostAnswer(option)}
                          className="text-left justify-start text-sm"
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Text input for other types */}
                  {(currentGameData.type === GAME_TYPES.TRIVIA ||
                    currentGameData.type === GAME_TYPES.EMOJI ||
                    currentGameData.type === GAME_TYPES.FILL_BLANK ||
                    currentGameData.type === GAME_TYPES.WORD_SCRAMBLE ||
                    currentGameData.type === GAME_TYPES.MATCHING ||
                    currentGameData.type === GAME_TYPES.CODECRACKER) && (
                    <input
                      type="text"
                      value={hostAnswer}
                      onChange={(e) => setHostAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full text-lg border-2 border-gray-300 rounded-xl p-3 mb-3
                               focus:border-christmas-green focus:ring-2 focus:ring-christmas-green/20"
                      autoComplete="off"
                    />
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleHostSubmit}
                    disabled={!hostAnswer}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  {hostLastResult?.isCorrect ? (
                    <>
                      <span className="text-4xl">🎉</span>
                      <p className="text-christmas-green font-bold mt-2">Correct! +{hostLastResult.points}</p>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl">😅</span>
                      <p className="text-christmas-red font-bold mt-2">Not quite!</p>
                    </>
                  )}
                </div>
              )}
            </Card>
          )}
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
    // Include all players (host can play too!)
    const allPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="font-festive text-5xl md:text-7xl text-christmas-red mb-8">
          Scoreboard
        </h1>

        <Card className="w-full max-w-2xl" padding="lg">
          <p className="text-center text-sm text-gray-500 mb-4">Tap a player to adjust their score</p>
          <div className="space-y-3">
            {allPlayers.map((p, index) => (
              <div
                key={p.id}
                onClick={() => {
                  setAdjustingPlayer(p);
                  setScoreAdjustment(0);
                }}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <span className="text-2xl font-bold text-gray-400 w-8">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </span>
                <span className="text-3xl">{p.avatar}</span>
                <span className="text-xl font-semibold flex-1">
                  {p.name} {p.is_host && <span className="text-sm text-gray-400">(Host)</span>}
                </span>
                <span className="text-2xl font-bold text-christmas-gold">
                  {p.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Score adjustment modal */}
        {adjustingPlayer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm" padding="lg">
              <div className="text-center mb-6">
                <span className="text-5xl">{adjustingPlayer.avatar}</span>
                <h3 className="text-xl font-bold mt-2">{adjustingPlayer.name}</h3>
                <p className="text-gray-500">Current score: {adjustingPlayer.score.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev - 100)}
                  className="text-2xl w-14 h-14"
                >
                  -100
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev - 10)}
                  className="text-xl w-12 h-12"
                >
                  -10
                </Button>
                <div className="text-center min-w-[80px]">
                  <p className={`text-3xl font-bold ${scoreAdjustment > 0 ? 'text-christmas-green' : scoreAdjustment < 0 ? 'text-christmas-red' : 'text-gray-400'}`}>
                    {scoreAdjustment > 0 ? '+' : ''}{scoreAdjustment}
                  </p>
                  <p className="text-sm text-gray-500">
                    New: {Math.max(0, adjustingPlayer.score + scoreAdjustment).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev + 10)}
                  className="text-xl w-12 h-12"
                >
                  +10
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev + 100)}
                  className="text-2xl w-14 h-14"
                >
                  +100
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setAdjustingPlayer(null);
                    setScoreAdjustment(0);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleScoreAdjustment}
                  disabled={scoreAdjustment === 0}
                >
                  Apply
                </Button>
              </div>
            </Card>
          </div>
        )}

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
    // Include all players (host can play too!)
    const sortedPlayers = [...players]
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
          <p className="text-center text-sm text-gray-500 mb-4">Tap a player to adjust their score</p>
          <div className="space-y-3">
            {sortedPlayers.map((p, index) => (
              <div
                key={p.id}
                onClick={() => {
                  setAdjustingPlayer(p);
                  setScoreAdjustment(0);
                }}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <span className="text-2xl font-bold text-gray-400 w-8">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </span>
                <span className="text-3xl">{p.avatar}</span>
                <span className="text-xl font-semibold flex-1">
                  {p.name} {p.is_host && <span className="text-sm text-gray-400">(Host)</span>}
                </span>
                <span className="text-2xl font-bold text-christmas-gold">
                  {p.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Score adjustment modal */}
        {adjustingPlayer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm" padding="lg">
              <div className="text-center mb-6">
                <span className="text-5xl">{adjustingPlayer.avatar}</span>
                <h3 className="text-xl font-bold mt-2">{adjustingPlayer.name}</h3>
                <p className="text-gray-500">Current score: {adjustingPlayer.score.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev - 100)}
                  className="text-2xl w-14 h-14"
                >
                  -100
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev - 10)}
                  className="text-xl w-12 h-12"
                >
                  -10
                </Button>
                <div className="text-center min-w-[80px]">
                  <p className={`text-3xl font-bold ${scoreAdjustment > 0 ? 'text-christmas-green' : scoreAdjustment < 0 ? 'text-christmas-red' : 'text-gray-400'}`}>
                    {scoreAdjustment > 0 ? '+' : ''}{scoreAdjustment}
                  </p>
                  <p className="text-sm text-gray-500">
                    New: {Math.max(0, adjustingPlayer.score + scoreAdjustment).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev + 10)}
                  className="text-xl w-12 h-12"
                >
                  +10
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setScoreAdjustment(prev => prev + 100)}
                  className="text-2xl w-14 h-14"
                >
                  +100
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setAdjustingPlayer(null);
                    setScoreAdjustment(0);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleScoreAdjustment}
                  disabled={scoreAdjustment === 0}
                >
                  Apply
                </Button>
              </div>
            </Card>
          </div>
        )}

        <Button variant="primary" size="huge" onClick={() => navigate('/')}>
          Play Again
        </Button>
      </div>
    );
  }

  return null;
}
