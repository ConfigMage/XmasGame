export default function RoomCode({
  code,
  size = 'lg',
  showLabel = true,
  className = '',
}) {
  const sizeClasses = {
    sm: 'text-2xl tracking-wider',
    md: 'text-4xl tracking-widest',
    lg: 'text-6xl md:text-8xl tracking-widest',
    xl: 'text-7xl md:text-9xl tracking-widest', // For TV display
  };

  return (
    <div className={`text-center ${className}`}>
      {showLabel && (
        <p className="text-christmas-red font-semibold mb-2 text-lg md:text-xl">
          Room Code
        </p>
      )}
      <div className={`
        ${sizeClasses[size]}
        font-mono font-bold text-christmas-green
        bg-white rounded-xl py-4 px-6 md:px-8
        border-4 border-christmas-green
        shadow-lg
        select-all
      `}>
        {code}
      </div>
      {showLabel && (
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Share this code with players!
        </p>
      )}
    </div>
  );
}
