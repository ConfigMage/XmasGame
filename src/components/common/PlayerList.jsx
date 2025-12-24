export default function PlayerList({
  players = [],
  showScores = false,
  showRank = false,
  size = 'md',
  maxVisible = 10,
  className = '',
}) {
  const sortedPlayers = showScores
    ? [...players].sort((a, b) => b.score - a.score)
    : players;

  const visiblePlayers = sortedPlayers.slice(0, maxVisible);
  const hiddenCount = sortedPlayers.length - maxVisible;

  const sizeClasses = {
    sm: 'text-base gap-2',
    md: 'text-lg gap-3',
    lg: 'text-2xl gap-4',
    xl: 'text-3xl gap-5', // For TV display
  };

  const avatarSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="space-y-2">
        {visiblePlayers.map((player, index) => (
          <div
            key={player.id}
            className={`
              flex items-center justify-between
              bg-white rounded-xl px-4 py-3
              border-2 ${player.is_host ? 'border-christmas-gold' : 'border-gray-200'}
              ${showRank && index === 0 ? 'ring-2 ring-christmas-gold' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              {showRank && (
                <span className={`
                  font-bold w-8 text-center
                  ${index === 0 ? 'text-christmas-gold' : ''}
                  ${index === 1 ? 'text-gray-400' : ''}
                  ${index === 2 ? 'text-amber-600' : ''}
                `}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </span>
              )}
              <span className={avatarSizes[size]}>{player.avatar || '🎄'}</span>
              <span className="font-semibold">{player.name}</span>
              {player.is_host && (
                <span className="text-xs bg-christmas-gold text-christmas-darkRed px-2 py-1 rounded-full font-bold">
                  HOST
                </span>
              )}
            </div>
            {showScores && (
              <div className="flex items-center gap-2">
                {player.streak > 0 && (
                  <span className="text-orange-500 text-sm">
                    🔥{player.streak}
                  </span>
                )}
                <span className="font-bold text-christmas-green">
                  {player.score.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <p className="text-center text-gray-500 mt-2">
          +{hiddenCount} more player{hiddenCount > 1 ? 's' : ''}
        </p>
      )}

      {players.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          Waiting for players to join...
        </p>
      )}
    </div>
  );
}
