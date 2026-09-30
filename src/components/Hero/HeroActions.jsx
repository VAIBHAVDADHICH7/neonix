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
        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer min-h-[46px] shimmer-btn"
      >
        <span>{primaryText}</span>
      </button>
      <button
        type="button"
        onClick={handleScrollToCalculator}
        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.14] active:bg-white/[0.18] border border-white/20 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl transition-all cursor-pointer min-h-[46px]"
      >
        <span>{secondaryText}</span>
      </button>
    </div>
  );
}
