import SpotlightCard from './UI/SpotlightCard';

export default function WhySolar() {
  const benefits = [
    {
      title: 'Slash Electricity Bills',
      highlight: 'Save Up to 90%',
      description: 'Cut your monthly power bills by up to 90% and run heavy appliances on free daytime solar energy.',
      metric: '₹50k+ / Year Saved',
      accentColor: '#0b7542',
      bgGlow: 'rgba(15, 157, 88, 0.12)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Up to ₹78,000 Subsidy',
      highlight: 'PM Surya Ghar',
      description: 'Direct government cash subsidy credited straight to your bank account with complete paperwork handling.',
      metric: 'Direct Bank Transfer',
      accentColor: '#D97706',
      bgGlow: 'rgba(217, 119, 6, 0.12)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: '25+ Years Free Power',
      highlight: '3-Year Payback',
      description: 'Recover your full investment in ~3 years with 28%+ tax-free returns, followed by decades of free power.',
      metric: '28%+ Tax-Free Return',
      accentColor: '#00BFA6',
      bgGlow: 'rgba(0, 191, 166, 0.12)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Low Maintenance',
      highlight: '30+ Years Life',
      description: 'Hail-resistant Tier-1 panels built to last over 30 years, with real-time generation tracking on your phone.',
      metric: '24/7 Mobile App Sync',
      accentColor: '#0b7542',
      bgGlow: 'rgba(15, 157, 88, 0.12)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

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
                  {b.icon}
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
