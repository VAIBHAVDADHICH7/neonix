import SpotlightCard from './UI/SpotlightCard';

export default function KeyBenefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      title: 'Cost Saving',
      highlight: 'Save Up to 90%',
      description: 'Cut your monthly electricity bills by up to 90% and enjoy free solar power for years to come.',
      accentColor: '#0b7542',
      bgGlow: 'rgba(15, 157, 88, 0.12)',
      linkAnchor: '#roi-calculator',
      ariaAction: 'See how much money you can save with our solar calculator',
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233l2.809-2.808a2.652 2.652 0 10-3.75-3.75l-2.808 2.808m3.749 3.75l-3.75-3.75" />
        </svg>
      ),
      title: 'Low Maintenance',
      highlight: '30+ Years Long Life',
      description: 'Strong, high-quality solar panels built to last for over 30 years with full maintenance support from our team.',
      accentColor: '#0d8070',
      bgGlow: 'rgba(13, 128, 112, 0.12)',
      linkAnchor: '#solutions',
      ariaAction: 'Learn about our long-lasting solar panels and maintenance support',
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: 'Govt. Benefits',
      highlight: 'Up to ₹78,000 Domestic Subsidy',
      description: 'Get up to ₹78,000 domestic subsidy sent directly to your bank account with complete help on government paperwork.',
      accentColor: '#D97706',
      bgGlow: 'rgba(217, 119, 6, 0.12)',
      linkAnchor: '#subsidy-info',
      ariaAction: 'Learn how to get the government solar subsidy',
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      title: 'Real-time Monitoring',
      highlight: 'Free Mobile App',
      description: 'See how much electricity you generate and how much money you save each day on your mobile phone.',
      accentColor: '#0b7542',
      bgGlow: 'rgba(15, 157, 88, 0.12)',
      linkAnchor: '#solutions',
      ariaAction: 'Learn more about our smart solar solutions',
    },
  ];

  return (
    <section 
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC]"
      aria-label="Key Benefits of Solar"
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

      {/* 4 Column Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {benefits.map((b, idx) => (
          <SpotlightCard
            key={b.title}
            className={`reveal-up bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0F9D58]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden delay-${(idx + 1) * 100}`}
            spotlightColor={b.bgGlow}
          >
            <div>
              {/* Icon Container */}
              <div className="mb-4 sm:mb-5">
                <div 
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{ backgroundColor: `${b.accentColor}18`, color: b.accentColor }}
                >
                  {b.icon}
                </div>
              </div>

              {/* Title & Badge */}
              <div className="mb-2 sm:mb-2.5">
                <span 
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md inline-block mb-1.5 sm:mb-2"
                  style={{ backgroundColor: `${b.accentColor}15`, color: b.accentColor }}
                >
                  {b.highlight}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#0b7542] transition-colors">
                  {b.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
                {b.description}
              </p>
            </div>


          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
