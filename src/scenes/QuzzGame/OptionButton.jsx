const OptionButton = ({ option, onClick, disabled, isSelected, isCorrect, isWrong }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
      className={`relative w-full rounded-2xl border-[3px] px-4 py-4 font-display text-xs md:text-sm uppercase tracking-wide transition-all duration-150 shadow-[0_0_18px_rgba(129,69,255,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
        isCorrect
          ? 'border-emerald-300 bg-emerald-500/25 text-emerald-50 scale-[1.01]'
          : isWrong
          ? 'border-rose-300 bg-rose-600/30 text-rose-50'
          : isSelected
          ? 'border-amber-300 bg-purple-700/50 text-amber-100'
          : 'border-purple-400/60 bg-slate-900/80 text-slate-100 hover:border-amber-200 hover:text-amber-100'
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{option}</span>
        <span className="w-8 h-8 rounded-full border border-slate-600 bg-slate-800/70 flex items-center justify-center text-xs">
          {isCorrect ? '✓' : isWrong ? '✗' : ''}
        </span>
      </div>
    </button>
  );
};

export default OptionButton;
