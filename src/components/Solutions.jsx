import { useState } from 'react';

export default function Solutions({ onSelectSolution }) {
  const [activeCard, setActiveCard] = useState('residential');

  const solutions = [
    {
      id: 'residential',
      title: 'Solar for Homes',
      tag: '₹78,000 Domestic Govt. Benefits',
      badgeColor: '#0F9D58',
      image: '/images/residential-solar.webp',
      alt: 'Rooftop solar panels installed on a residential home',
      description: 'Cut your home electricity bill by 90% with customized rooftop solar for individual houses, villas, and apartments.',
      highlights: ['Get up to ₹78,000 Domestic Govt. Benefits', 'Smart Net-Meter Included', '30-Year Long Life'],
      ariaLabel: 'Learn more about Solar for Homes and the government subsidy',
    },
    {
      id: 'commercial',
      title: 'Solar for Businesses',
      tag: 'Save On Running Costs',
      badgeColor: '#00BFA6',
      image: '/images/commercial-solar.webp',
      alt: 'Solar panels installed on an office and commercial building',
      description: 'Lower your monthly electricity bills for offices, hospitals, schools, and shops with clean solar energy.',
      highlights: ['40% Tax Benefit', 'Fast 3-Year Payback', 'Reliable Daily Power'],
      ariaLabel: 'Learn more about Solar for Businesses and tax benefits',
    },
    {
      id: 'industrial',
      title: 'Solar for Factories',
      tag: 'High Capacity Power',
      badgeColor: '#F59E0B',
      image: '/images/industrial-solar.webp',
      alt: 'Large industrial solar power plant on a manufacturing factory warehouse',
      description: 'Heavy-duty solar systems built for factories, warehouses, and industrial plants with heavy electricity usage.',
      highlights: ['Custom High-Load Design', 'Continuous Power Supply', 'Full Maintenance Support'],
      ariaLabel: 'Learn more about Solar for Factories and heavy industries',
    },
    {
      id: 'amc',
      title: 'Solar Care & AMC',
      tag: 'Yearly Maintenance',
      badgeColor: '#3B82F6',
      image: '/images/amc-solar.webp',
      alt: 'Solar panel cleaning and professional maintenance service technician on roof',
      description: 'Complete yearly maintenance, regular panel cleaning, health checks, and fast repairs to keep your solar generating peak power.',
      highlights: ['Scheduled Panel Cleaning', 'Inverter & Wiring Checks', '24-Hour Quick Support'],
      ariaLabel: 'Learn more about Solar Care and Annual Maintenance Contracts (AMC)',
    },
  ];

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

      {/* ── MOBILE: stacked cards (always visible content) ── */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
        {solutions.map((sol) => (
          <div
            key={sol.id}
            className="relative rounded-2xl overflow-hidden bg-[#0F172A] shadow-lg"
            style={{ minHeight: '200px' }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: `url('${sol.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/55 to-[#0F172A]/20" />

            {/* Content — always visible on mobile */}
            <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full" style={{ minHeight: '200px' }}>
              {/* Top tag */}
              <div className="mb-auto">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white border border-white/20 inline-block"
                  style={{ backgroundColor: `${sol.badgeColor}CC` }}
                >
                  {sol.tag}
                </span>
              </div>

              {/* Bottom content */}
              <div className="mt-4">
                <a
                  href="#contact"
                  aria-label={sol.ariaLabel}
                  onClick={(e) => { if (onSelectSolution) { e.preventDefault(); onSelectSolution(sol.title); } }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#00BFA6] mb-2"
                >
                  <span>Learn More</span>
                  <span aria-hidden="true">→</span>
                </a>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1.5">{sol.title}</h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-3">{sol.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sol.highlights.map((h) => (
                    <span key={h} className="text-[10px] font-semibold text-white/90 bg-white/15 px-2 py-0.5 rounded-md border border-white/20">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: expanding accordion (hover to expand) ── */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8">
        <div className="flex w-full h-[580px] reveal-scale rounded-3xl overflow-hidden bg-[#0F172A] shadow-2xl border border-white/15">
          {solutions.map((sol) => {
            const isExpanded = activeCard === sol.id;
            return (
              <div
                key={sol.id}
                onClick={() => setActiveCard(sol.id)}
                className={`group relative bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-r border-white/15 last:border-r-0 focus-within:ring-2 focus-within:ring-[#0F9D58] ${
                  isExpanded ? 'flex-[2.4]' : 'flex-1 hover:flex-[2.4]'
                }`}
                style={{ backgroundImage: `url('${sol.image}')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/60 to-black/30 transition-opacity duration-500 ${isExpanded ? 'via-[#0F172A]/45' : 'group-hover:via-[#0F172A]/45'}`} />

                {/* Top Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full text-white backdrop-blur-md border border-white/20 shadow-md inline-block"
                    style={{ backgroundColor: `${sol.badgeColor}E6` }}
                  >
                    {sol.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-white flex flex-col justify-end h-full">
                  <div className={`transform transition-all duration-500 delay-75 mb-3 ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                    <a
                      href="#contact"
                      aria-label={sol.ariaLabel}
                      onClick={(e) => { if (onSelectSolution) { e.preventDefault(); onSelectSolution(sol.title); } }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#00BFA6] hover:text-white transition-colors border-b border-[#00BFA6]/40 pb-1"
                    >
                      <span>Learn More</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-2.5 transition-colors group-hover:text-[#00BFA6] text-white">{sol.title}</h3>

                  <p className={`text-sm md:text-base text-gray-200 lg:max-w-md transform transition-all duration-500 delay-100 leading-relaxed ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'}`}>
                    {sol.description}
                  </p>

                  <div className={`flex flex-wrap gap-2 mt-4 transform transition-all duration-500 delay-150 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'}`}>
                    {sol.highlights.map((h) => (
                      <span key={h} className="text-xs font-semibold text-white/95 bg-white/15 px-3 py-1 rounded-md border border-white/20 backdrop-blur-sm">
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
