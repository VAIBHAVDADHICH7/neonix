import HeroBadge from './HeroBadge';
import { DEFAULT_TRUST_CHIPS } from './heroData';

export default function HeroHeadline({
  badgeText = 'PM Surya Ghar Subsidy ₹78,000',
  title = 'Rooftop Solar',
  highlightText = 'Solutions',
  subtitle = 'Powering your home & business with high-efficiency clean solar energy and expert turnkey installation in India.',
  trustChips = DEFAULT_TRUST_CHIPS,
  className = '',
  children,
}) {
  return (
    <div
      id="hero-title-group"
      className={`space-y-3.5 sm:space-y-4.5 ${className}`}
    >
      {badgeText && <HeroBadge text={badgeText} />}

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.05]">
        {title}{' '}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#0d8070] block sm:inline">
            {highlightText}
          </span>
        )}
      </h1>

      {/* Trust Chips */}
      {trustChips && trustChips.length > 0 && (
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
          {trustChips.map((item) => (
            <span
              key={item}
              className="text-[10px] sm:text-[11px] font-semibold text-slate-700 bg-white/85 border border-slate-200/90 px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap shadow-xs backdrop-blur-md hover:border-emerald-300 hover:text-emerald-800 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Sub-headline */}
      {subtitle && (
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0 font-normal">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}

