import SpotlightCard from './UI/SpotlightCard';

export default function WhySolar() {
  const pillars = [
    {
      id: 'bills',
      tag: 'Immediate Relief',
      badgeColor: '#0b7542',
      metric: 'Up to 90%',
      metricLabel: 'Monthly Bill Reduction',
      title: 'Slash Your Electricity Bills to Near Zero',
      description:
        'Say goodbye to stinging monthly electricity bills. Run air conditioners, refrigerators, and heavy appliances completely guilt-free during peak daylight hours on your own clean solar power.',
      highlight: 'Save ₹50,000 to ₹1.8+ Lakhs every year',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'subsidy',
      tag: 'Govt. Sponsored',
      badgeColor: '#D97706',
      metric: '₹78,000',
      metricLabel: 'Direct Bank Transfer (DBT)',
      title: 'Get Up to ₹78,000 Direct Cash Subsidy',
      description:
        'Under the PM Surya Ghar Muft Bijli Yojana, eligible homes receive direct government cash transfers straight into their bank account. Best of all, Neonix handles 100% of the DISCOM paperwork for you.',
      highlight: 'Full national portal & net-meter liaison included',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'returns',
      tag: 'High-Yield Asset',
      badgeColor: '#00BFA6',
      metric: '28%+ IRR',
      metricLabel: 'Tax-Free Annual Return',
      title: 'Pay Off in ~3 Years, Enjoy 20+ Years Free',
      description:
        'Solar easily outperforms Fixed Deposits (7%) and Mutual Funds (12%) with a 28%+ tax-free return through avoided expenses. Once your system pays for itself in ~3.5 years, electricity is 100% free profit.',
      highlight: 'Over two decades of pure financial upside',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: 'peace-of-mind',
      tag: 'Zero Daily Hassle',
      badgeColor: '#0b7542',
      metric: '30+ Years',
      metricLabel: 'Engineered Lifespan',
      description:
        'Crafted with Tier-1 hail-proof tempered glass and rust-proof aluminum structures. No moving parts mean zero daily maintenance—just periodic water rinsing and real-time generation tracking on your phone.',
      highlight: '25-Year performance warranty & live mobile app',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const handleScrollToSavings = () => {
    const el = document.getElementById('savings-hub') || document.getElementById('roi-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="why-solar"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80"
      aria-label="Why Choose Solar"
    >
      {/* ── HEADER ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3.5">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">
            Why Go Solar
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Four Powerful Reasons That Make <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6]">
            Solar a Complete No-Brainer
          </span>
        </h2>

        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3.5 font-normal max-w-2xl mx-auto leading-relaxed">
          Forget complicated jargon. Here is what switching to rooftop solar actually delivers for your home, your family, and your wallet.
        </p>
      </div>

      {/* ── 4 SATISFYING PILLARS (2x2 Grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {pillars.map((p) => (
          <SpotlightCard
            key={p.id}
            className="reveal-up bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0F9D58]/50 transition-all duration-300 flex flex-col justify-between group"
            spotlightColor="rgba(15, 157, 88, 0.08)"
          >
            <div>
              {/* Top Row: Icon + Badge + Metric */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{ backgroundColor: `${p.badgeColor}15`, color: p.badgeColor }}
                >
                  {p.icon}
                </div>

                <div className="text-right">
                  <span
                    className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white inline-block mb-1"
                    style={{ backgroundColor: p.badgeColor }}
                  >
                    {p.tag}
                  </span>
                  <div className="text-base sm:text-xl font-black text-slate-900 leading-none">
                    {p.metric}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {p.metricLabel}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0b7542] transition-colors leading-snug mb-2.5">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                {p.description}
              </p>
            </div>

            {/* Bottom Satisfying Takeaway Chip */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-emerald-600">✓</span> {p.highlight}
              </span>
              <span className="text-slate-400 group-hover:text-emerald-700 transition-colors font-bold text-xs">
                Learn how →
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* ── SATISFYING SUMMARY STRIP & ACTION ── */}
      <div className="mt-10 sm:mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto text-center lg:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          <div className="sm:pr-6">
            <p className="text-2xl sm:text-3xl font-black text-[#00BFA6]">₹78,000</p>
            <p className="text-xs text-slate-400 mt-1">Direct Govt. Subsidy</p>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-2xl sm:text-3xl font-black text-[#0F9D58]">90%</p>
            <p className="text-xs text-slate-400 mt-1">Average Bill Drop</p>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">3.5 Years</p>
            <p className="text-xs text-slate-400 mt-1">Full Payback Period</p>
          </div>
          <div className="pt-4 sm:pt-0 sm:pl-6">
            <p className="text-2xl sm:text-3xl font-black text-white">25+ Years</p>
            <p className="text-xs text-slate-400 mt-1">Free Electricity Era</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleScrollToSavings}
          className="w-full lg:w-auto shrink-0 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shimmer-btn"
        >
          See Your Exact Savings Below ↓
        </button>
      </div>
    </section>
  );
}
