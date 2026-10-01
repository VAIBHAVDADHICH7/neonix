export default function HeroActions({
  onOpenConsultation,
  onScrollToCalculator,
  primaryText = '⚡ Get Free Quote',
  secondaryText = 'Calculate Savings →',
  className = '',
}) {
  const handleScrollToCalculator = () => {
    if (onScrollToCalculator) {
      onScrollToCalculator();
    } else {
      const el = document.getElementById('roi-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pointer-events-auto pt-3 sm:pt-4 ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpenConsultation && onOpenConsultation()}
        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-xl shadow-[0_6px_20px_-3px_rgba(15,157,88,0.35)] hover:shadow-[0_10px_24px_-3px_rgba(15,157,88,0.45)] transition-all cursor-pointer min-h-[48px] shimmer-btn transform hover:-translate-y-0.5"
      >
        <span>{primaryText}</span>
      </button>
      <button
        type="button"
        onClick={handleScrollToCalculator}
        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 text-slate-800 hover:text-emerald-700 font-bold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer min-h-[48px] transform hover:-translate-y-0.5"
      >
        <span>{secondaryText}</span>
      </button>
    </div>
  );
}

