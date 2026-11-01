import { useState } from 'react';
import { SERVICES } from '../data';

export default function Solutions({ onSelectSolution }) {
  const [activeCard, setActiveCard] = useState('residential');

  // Core solutions for interactive slider cards
  const solutions = SERVICES.filter((s) => ['residential', 'commercial', 'industrial', 'amc'].includes(s.id)).map((s) => ({
    ...s,
    title: s.name,
    tag: s.tagline,
  }));

  return (
    <section
      id="solutions"
      className="py-12 sm:py-20 px-0 w-full overflow-hidden bg-white border-t border-gray-200/70"
      aria-label="Solar Solutions for Everyone"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 reveal-up">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Our Solar Systems & Services</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
              Solar Systems & Complete Maintenance
            </h2>
            <p className="text-[#374151] text-xs sm:text-base mt-2 sm:mt-3 max-w-2xl font-normal">
              Choose the right solar setup and ongoing care for your home, business, or factory.
            </p>
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#0b7542] flex items-center gap-1.5 flex-shrink-0">
            <span className="hidden sm:inline">Tap a card to expand</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </div>

      {/* ── UNIFIED RESPONSIVE DOM TREE (Single HTML Block Styled via CSS) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row w-full space-y-3 lg:space-y-0 lg:h-[580px] reveal-scale rounded-2xl lg:rounded-3xl overflow-hidden lg:bg-[#0F172A] lg:shadow-2xl lg:border lg:border-white/15">
          {solutions.map((sol) => {
            const isExpanded = activeCard === sol.id;
            return (
              <div
                key={sol.id}
                onClick={() => setActiveCard(sol.id)}
                className={`group relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden rounded-2xl lg:rounded-none bg-[#0F172A] shadow-lg lg:shadow-none min-h-[220px] lg:min-h-0 lg:h-full lg:border-r lg:border-white/15 lg:last:border-r-0 focus-within:ring-2 focus-within:ring-[#0F9D58] ${
                  isExpanded ? 'lg:flex-[2.4]' : 'lg:flex-1 lg:hover:flex-[2.4]'
                }`}
              >
                {/* Background image (semantic img for crawler indexing) */}
                <img
                  src={sol.image}
                  alt={sol.alt}
                  loading="lazy"
                  decoding="async"
                  width="1158"
                  height="868"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 lg:group-hover:scale-105 opacity-60 lg:opacity-100 pointer-events-none"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/60 to-black/30 transition-opacity duration-500 ${
                    isExpanded ? 'lg:via-[#0F172A]/45' : 'lg:group-hover:via-[#0F172A]/45'
                  }`}
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20">
                  <span
                    className="text-[10px] lg:text-xs font-bold uppercase tracking-wider px-2.5 py-1 lg:px-3.5 lg:py-1.5 rounded-full text-white backdrop-blur-md border border-white/20 shadow-md inline-block"
                    style={{ backgroundColor: `${sol.badgeColor}E6` }}
                  >
                    {sol.tag}
                  </span>
                </div>

                {/* Card Content: Always visible on mobile, interactive/animated on desktop */}
                <div className="relative lg:absolute lg:bottom-0 lg:left-0 p-4 sm:p-5 lg:p-8 w-full z-10 text-white flex flex-col justify-end min-h-[220px] lg:min-h-0 lg:h-full pt-14 lg:pt-0">
                  <div
                    className={`flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3 transform transition-all duration-500 delay-75 lg:opacity-0 lg:translate-y-6 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 ${
                      isExpanded ? 'lg:translate-y-0 lg:opacity-100' : ''
                    }`}
                  >
                    <a
                      href={sol.href}
                      aria-label={sol.ariaLabel}
                      className="inline-flex items-center gap-1 lg:gap-1.5 text-[11px] lg:text-xs font-bold uppercase tracking-widest text-[#00BFA6] hover:text-white transition-colors border-b border-[#00BFA6]/40 pb-0.5 lg:pb-1"
                    >
                      <span>Explore Dedicated Service Page</span>
                      <span aria-hidden="true">→</span>
                    </a>
                    {onSelectSolution && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSolution(sol.title);
                        }}
                        className="text-[10px] lg:text-[11px] font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 lg:px-2.5 py-0.5 rounded-md border border-white/15 transition-colors"
                      >
                        Quick Quote
                      </button>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-3xl font-extrabold mb-1.5 lg:mb-2.5 transition-colors group-hover:text-[#00BFA6] text-white">
                    {sol.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm lg:text-base text-gray-200 lg:max-w-md transform transition-all duration-500 delay-100 leading-relaxed mb-3 lg:mb-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 ${
                      isExpanded ? 'lg:opacity-100 lg:translate-y-0' : ''
                    }`}
                  >
                    {sol.description}
                  </p>

                  <div
                    className={`flex flex-wrap gap-1.5 lg:gap-2 mt-1.5 lg:mt-4 transform transition-all duration-500 delay-150 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 ${
                      isExpanded ? 'lg:opacity-100 lg:translate-y-0' : ''
                    }`}
                  >
                    {sol.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] lg:text-xs font-semibold text-white/95 bg-white/15 px-2 py-0.5 lg:px-3 lg:py-1 rounded-md border border-white/20 backdrop-blur-sm"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
