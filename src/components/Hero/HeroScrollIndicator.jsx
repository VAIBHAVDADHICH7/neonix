export default function HeroScrollIndicator({
  currentSlideIndex = 0,
  labels = ['Plan', 'About', 'Mission', 'Vision'],
  exploreText = 'Scroll to explore',
  className = '',
}) {
  return (
    <div
      className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-2 sm:py-3 mb-14 md:mb-0 pointer-events-none border-t border-slate-200/80 ${className}`}
    >
      {exploreText && (
        <span className="text-[10px] font-semibold text-slate-500 tracking-wide hidden sm:block">
          {exploreText}
        </span>
      )}
      <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
        {labels.map((label, idx) => (
          <span
            key={label}
            className={`px-2.5 py-0.5 rounded-full transition-all text-[9px] font-bold ${
              currentSlideIndex === idx
                ? 'bg-[#0F9D58] text-white shadow-xs'
                : 'bg-slate-200/70 text-slate-600'
            }`}
          >
            {String(idx + 1).padStart(2, '0')} {label}
          </span>
        ))}
      </div>
    </div>
  );
}

