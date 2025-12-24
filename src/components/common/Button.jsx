const variants = {
  primary: 'bg-christmas-red hover:bg-christmas-darkRed text-white',
  secondary: 'bg-christmas-green hover:bg-christmas-lightGreen text-white',
  gold: 'bg-christmas-gold hover:bg-yellow-500 text-christmas-darkRed',
  outline: 'bg-transparent border-2 border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white',
  ghost: 'bg-transparent text-christmas-green hover:bg-christmas-green/10',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
  xl: 'py-5 px-10 text-xl',
  huge: 'py-6 px-12 text-2xl md:text-3xl', // For TV display
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) {
  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-bold rounded-xl shadow-lg
        transform transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        touch-target
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
