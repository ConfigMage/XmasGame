const variants = {
  default: 'bg-white border-christmas-red',
  green: 'bg-white border-christmas-green',
  gold: 'bg-white border-christmas-gold',
  transparent: 'bg-white/90 backdrop-blur border-christmas-red',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <div
      className={`
        ${variants[variant]}
        ${paddingClasses[padding]}
        rounded-2xl shadow-xl border-4
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
