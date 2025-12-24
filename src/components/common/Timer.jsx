import { useEffect, useState } from 'react';

export default function Timer({
  seconds,
  onComplete,
  size = 'md',
  showProgress = true,
  className = '',
}) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setTimeLeft(seconds);
    setIsRunning(true);
  }, [seconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && onComplete) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const progress = (timeLeft / seconds) * 100;
  const isLow = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  const sizeClasses = {
    sm: 'text-2xl w-16 h-16',
    md: 'text-4xl w-24 h-24',
    lg: 'text-6xl w-32 h-32',
    xl: 'text-7xl w-40 h-40', // For TV display
  };

  return (
    <div className={`relative ${className}`}>
      {/* Circular progress */}
      <div className={`
        ${sizeClasses[size]}
        relative flex items-center justify-center
        ${isCritical ? 'animate-pulse' : ''}
      `}>
        {showProgress && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke={isCritical ? '#dc2626' : isLow ? '#f59e0b' : '#165B33'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
        )}
        <span className={`
          font-bold
          ${isCritical ? 'text-red-600' : isLow ? 'text-amber-500' : 'text-christmas-green'}
        `}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
