import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, ScoreDisplay } from '../components/common';
import { games, getGameList, checkAnswer, GAME_TYPES } from '../data/games';

export default function SoloGame() {
  const navigate = useNavigate();
  const { gameId: urlGameId } = useParams();

  const [selectedGame, setSelectedGame] = useState(urlGameId || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(null);
  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const allGames = getGameList();
  const gameData = selectedGame ? games[selectedGame] : null;
  const question = gameData?.questions?.[currentQuestionIndex] ||
                   gameData?.pairs?.[currentQuestionIndex];
  const totalQuestions = gameData?.questions?.length ||
                         gameData?.pairs?.length || 0;

  // Select a game
  const selectGame = (gameId) => {
    setSelectedGame(gameId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswer('');
    setShowAnswer(false);
    setWasCorrect(null);
    setFinished(false);
    setCorrectCount(0);
  };

  // Check answer
  const handleSubmit = () => {
    if (!answer && !showAnswer) return;

    let isCorrect = false;

    if (gameData.type === GAME_TYPES.TRUE_FALSE) {
      isCorrect = answer === String(question.answer);
    } else if (gameData.type === GAME_TYPES.MULTIPLE_CHOICE ||
               gameData.type === GAME_TYPES.TWO_CHOICE) {
      isCorrect = answer === question.answer;
    } else {
      isCorrect = checkAnswer(answer, question.answer, question.alternates || []);
    }

    if (isCorrect) {
      setScore(prev => prev + 100);
      setCorrectCount(prev => prev + 1);
    }

    setWasCorrect(isCorrect);
    setShowAnswer(true);
  };

  // Next question
  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= totalQuestions) {
      setFinished(true);
      return;
    }

    setCurrentQuestionIndex(prev => prev + 1);
    setAnswer('');
    setShowAnswer(false);
    setWasCorrect(null);
  };

  // Reset game
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswer('');
    setShowAnswer(false);
    setWasCorrect(null);
    setFinished(false);
    setCorrectCount(0);
  };

  // Game selection screen
  if (!selectedGame) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-festive text-4xl text-christmas-red">
              Solo Practice
            </h1>
            <Button variant="ghost" onClick={() => navigate('/')}>
              ← Back
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allGames.map((game) => (
              <Card
                key={game.id}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => selectGame(game.id)}
              >
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="font-bold text-lg">{game.title}</h3>
                <p className="text-sm text-gray-500">
                  {game.questionCount} questions
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Finished screen
  if (finished) {
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center" padding="xl">
          <div className="text-8xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 50 ? '⭐' : '🎄'}
          </div>
          <h2 className="text-3xl font-bold text-christmas-green mb-4">
            {percentage >= 80 ? 'Amazing!' :
             percentage >= 50 ? 'Good Job!' :
             'Keep Practicing!'}
          </h2>

          <div className="space-y-4 mb-8">
            <div>
              <p className="text-gray-500">Final Score</p>
              <p className="text-4xl font-bold text-christmas-gold">
                {score.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Accuracy</p>
              <p className="text-2xl font-bold">
                {correctCount}/{totalQuestions} ({percentage}%)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={resetGame}
            >
              Play Again
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setSelectedGame(null)}
            >
              Choose Different Game
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Playing screen
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => setSelectedGame(null)}>
          ← Games
        </Button>
        <ScoreDisplay score={score} size="sm" />
      </div>

      {/* Progress */}
      <div className="text-center mb-4">
        <span className="text-2xl">{gameData?.icon}</span>
        <span className="ml-2 font-semibold">{gameData?.title}</span>
        <span className="ml-4 text-gray-500">
          {currentQuestionIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-christmas-green h-2 rounded-full transition-all"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl" padding="lg">
          {/* Question prompt */}
          <div className="text-center mb-8">
            {question.prompt && (
              <p className="text-5xl mb-4">{question.prompt}</p>
            )}
            {question.question && (
              <p className="text-2xl font-bold text-christmas-green">
                {question.question}
              </p>
            )}
            {question.scrambled && (
              <p className="text-4xl font-mono font-bold text-christmas-red tracking-wider">
                {question.scrambled}
              </p>
            )}
            {question.code && (
              <p className="text-2xl font-mono font-bold text-christmas-green">
                {question.code}
              </p>
            )}
            {question.statement && (
              <p className="text-2xl font-bold text-christmas-green">
                {question.statement}
              </p>
            )}
          </div>

          {/* Answer input */}
          {!showAnswer && (
            <>
              {/* True/False */}
              {gameData.type === GAME_TYPES.TRUE_FALSE && (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={answer === 'true' ? 'secondary' : 'outline'}
                    size="xl"
                    onClick={() => setAnswer('true')}
                  >
                    ✓ Fact
                  </Button>
                  <Button
                    variant={answer === 'false' ? 'primary' : 'outline'}
                    size="xl"
                    onClick={() => setAnswer('false')}
                  >
                    ✗ Fiction
                  </Button>
                </div>
              )}

              {/* Two-choice */}
              {gameData.type === GAME_TYPES.TWO_CHOICE && question.options && (
                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((option) => (
                    <Button
                      key={option}
                      variant={answer === option ? 'secondary' : 'outline'}
                      size="xl"
                      onClick={() => setAnswer(option)}
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

              {/* Text input */}
              {(gameData.type === GAME_TYPES.TRIVIA ||
                gameData.type === GAME_TYPES.EMOJI ||
                gameData.type === GAME_TYPES.FILL_BLANK ||
                gameData.type === GAME_TYPES.WORD_SCRAMBLE ||
                gameData.type === GAME_TYPES.CODECRACKER) && (
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full text-xl border-2 border-gray-300 rounded-xl p-4
                           focus:border-christmas-green focus:ring-2 focus:ring-christmas-green/20"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              )}

              <div className="flex gap-4 mt-6">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowAnswer(true)}
                >
                  Show Answer
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!answer}
                >
                  Submit
                </Button>
              </div>
            </>
          )}

          {/* Answer reveal */}
          {showAnswer && (
            <div className="text-center">
              {wasCorrect !== null && (
                <div className={`text-6xl mb-4 ${wasCorrect ? '' : ''}`}>
                  {wasCorrect ? '🎉' : '😅'}
                </div>
              )}

              <div className="p-6 bg-christmas-green/10 rounded-xl border-2 border-christmas-green mb-6">
                <p className="text-lg text-gray-600 mb-2">
                  {wasCorrect ? 'Correct!' : 'The answer is:'}
                </p>
                <p className="text-3xl font-bold text-christmas-green">
                  {question.answer?.toString() === 'true' ? '✓ FACT' :
                   question.answer?.toString() === 'false' ? '✗ FICTION' :
                   question.answer}
                </p>
              </div>

              <Button
                variant="primary"
                size="xl"
                fullWidth
                onClick={nextQuestion}
              >
                {currentQuestionIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question →'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
