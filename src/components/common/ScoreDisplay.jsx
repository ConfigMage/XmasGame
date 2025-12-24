export default function ScoreDisplay({
  score,
  label = 'Score',
  size = 'md',
  showAnimation = false,
  previousScore,
  className = '',
}) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-7xl', // For TV display
  };

  const pointsGained = previousScore !== undefined ? score - previousScore : 0;

  return (
    <div className={`text-center ${className}`}>
      <p className="text-gray-600 font-medium mb-1">{label}</p>
      <div className="relative">
        <span className={`
          ${sizeClasses[size]}
          font-bold text-christmas-gold
          ${showAnimation ? 'animate-bounce-slow' : ''}
        `}>
          {score.toLocaleString()}
        </span>
        {showAnimation && pointsGained > 0 && (
          <span className="absolute -top-4 right-0 text-christmas-green font-bold animate-bounce">
            +{pointsGained}
          </span>
        )}
      </div>
    </div>
  );
}
