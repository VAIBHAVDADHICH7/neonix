import SpotlightCard from './UI/SpotlightCard';
import { WHY_SOLAR_BENEFITS } from '../data';

export default function WhySolar() {
  const benefits = WHY_SOLAR_BENEFITS;

  return (
    <section 
      id="why-solar" 
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80"
      aria-label="Why Choose Solar"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Why Choose Solar</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
          Why Going Solar Makes Complete Sense
        </h2>
        <p className="text-[#374151] text-xs sm:text-base md:text-lg mt-2 sm:mt-3 font-normal">
          Save money every month, get government cash support, and produce clean electricity on your own roof.
        </p>
      </div>

      {/* Basic 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {benefits.map((b, idx) => (
          <SpotlightCard
            key={b.title}
            className={`reveal-up bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0F9D58]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden delay-${(idx + 1) * 100}`}
            spotlightColor={b.bgGlow}
          >
            <div>
              {/* Icon Container */}
              <div className="mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{ backgroundColor: `${b.accentColor}18`, color: b.accentColor }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.iconPath} />
                  </svg>
                </div>
              </div>

              {/* Tag / Badge */}
              <div className="mb-2">
                <span 
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md inline-block mb-1.5"
                  style={{ backgroundColor: `${b.accentColor}15`, color: b.accentColor }}
                >
                  {b.highlight}
                </span>
                <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#0b7542] transition-colors leading-snug">
                  {b.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
                {b.description}
              </p>
            </div>

            {/* Bottom Metric Pill */}
            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400 font-normal">Benefit</span>
              <span className="text-[#0b7542] font-bold">{b.metric}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
