import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/common';
import { getGameList } from '../data/games';

export default function Home() {
  const navigate = useNavigate();
  const [showGameSelect, setShowGameSelect] = useState(false);
  const [selectedGames, setSelectedGames] = useState([]);

  const allGames = getGameList();

  const toggleGame = (gameId) => {
    setSelectedGames(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const selectAll = () => {
    setSelectedGames(allGames.map(g => g.id));
  };

  const handleHostGame = () => {
    if (selectedGames.length === 0) {
      selectAll();
    }
    // Store selected games and navigate to host
    sessionStorage.setItem('selectedGames', JSON.stringify(selectedGames.length > 0 ? selectedGames : allGames.map(g => g.id)));
    navigate('/host');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-festive text-5xl md:text-7xl text-christmas-red mb-2">
          Christmas Games
        </h1>
        <p className="text-christmas-green text-lg md:text-xl">
          Family Game Night Edition
        </p>
      </div>

      {!showGameSelect ? (
        // Main menu
        <Card className="w-full max-w-md">
          <div className="space-y-4">
            <Button
              variant="primary"
              size="xl"
              fullWidth
              onClick={() => setShowGameSelect(true)}
            >
              🎄 Host Game
            </Button>

            <Button
              variant="secondary"
              size="xl"
              fullWidth
              onClick={() => navigate('/play')}
            >
              🎮 Join Game
            </Button>

            <Button
              variant="gold"
              size="xl"
              fullWidth
              onClick={() => navigate('/solo')}
            >
              👤 Solo Practice
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              Host displays questions on TV. Players answer on their phones.
            </p>
          </div>
        </Card>
      ) : (
        // Game selection
        <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <div className="flex-shrink-0">
            <h2 className="font-festive text-3xl text-christmas-red mb-4">
              Select Games to Play
            </h2>
            <div className="flex gap-2 mb-4">
              <Button size="sm" variant="outline" onClick={selectAll}>
                Select All
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedGames([])}>
                Clear
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-2">
            {allGames.map(game => (
              <label
                key={game.id}
                className={`
                  flex items-center gap-3 p-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${selectedGames.includes(game.id)
                    ? 'bg-christmas-green/10 border-2 border-christmas-green'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedGames.includes(game.id)}
                  onChange={() => toggleGame(game.id)}
                  className="w-5 h-5 rounded text-christmas-green"
                />
                <span className="text-2xl">{game.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold">{game.title}</p>
                  <p className="text-sm text-gray-500">
                    {game.questionCount} questions
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex-shrink-0 flex gap-4 mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowGameSelect(false)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleHostGame}
              disabled={selectedGames.length === 0}
            >
              Start Hosting ({selectedGames.length} games)
            </Button>
          </div>
        </Card>
      )}

      {/* Footer */}
      <p className="mt-8 text-gray-400 text-sm">
        Made with ❤️ for family fun
      </p>
    </div>
  );
}
