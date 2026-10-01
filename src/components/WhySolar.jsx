import SpotlightCard from './UI/SpotlightCard';

export default function WhySolar() {
  const pillars = [
    {
      id: 'bills',
      theme: 'emerald',
      tag: 'Direct Savings',
      badgeBg: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',
      glowColor: 'rgba(15, 157, 88, 0.16)',
      accentColor: '#0F9D58',
      title: 'Slash Your Monthly Bill by Up to 90%',
      subtitle: 'Free daytime power for ACs, water heaters & heavy home loads.',
      description:
        'Instead of paying expensive DISCOM grid tariffs that rise every single year, your rooftop captures abundant sunlight and powers your high-consumption appliances for zero running cost.',
      // Visual mini-component
      visual: (
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B132B] to-slate-950 text-white border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span>Monthly Grid Transformation</span>
            <span className="text-emerald-400 font-bold font-mono">92% Net Reduction</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-rose-300 block uppercase font-mono">Old Grid Bill</span>
              <span className="text-base sm:text-lg font-black text-rose-400 line-through">₹6,500</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Every single month</span>
            </div>
            <div className="text-emerald-400 font-black text-lg">➔</div>
            <div className="flex-1 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center shadow-[0_0_15px_rgba(15,157,88,0.2)]">
              <span className="text-[10px] text-emerald-300 block uppercase font-mono font-bold">New Solar Bill</span>
              <span className="text-base sm:text-lg font-black text-[#00BFA6]">₹250</span>
              <span className="text-[9px] text-emerald-300/80 block mt-0.5">Fixed DISCOM charge</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-slate-300">Annual Cash Kept in Pocket:</span>
            <span className="font-black text-[#00BFA6] font-mono text-xs">+₹75,000 / Year</span>
          </div>
        </div>
      ),
      takeaway: 'Save ₹50,000 to ₹1.8+ Lakhs year after year',
    },
    {
      id: 'subsidy',
      theme: 'amber',
      tag: 'Govt. Sponsored',
      badgeBg: 'bg-amber-500/10 text-amber-800 border-amber-500/25',
      glowColor: 'rgba(217, 119, 6, 0.16)',
      accentColor: '#D97706',
      title: 'Get Up to ₹78,000 Direct Bank Subsidy',
      subtitle: 'PM Surya Ghar DBT transfer straight into your bank account.',
      description:
        'The Central Government funds a massive portion of your rooftop system. Neonix handles 100% of the DISCOM technical inspection, national portal paperwork, and net-meter approvals.',
      // Visual mini-component
      visual: (
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#131109] to-slate-950 text-white border border-amber-900/40 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-amber-300/80 mb-2">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              PM Surya Ghar National Portal
            </span>
            <span className="text-[10px] font-mono text-slate-400">Direct DBT Transfer</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base">
                🏛️
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Ministry of New & Renewable Energy</p>
                <p className="text-[10px] text-slate-400">Direct Benefit Transfer (DBT)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">Approved</span>
              <span className="text-base font-black text-amber-400 font-mono">+₹78,000</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-slate-300">Your Paperwork Effort:</span>
            <span className="font-bold text-emerald-400">Zero (Handled by Neonix)</span>
          </div>
        </div>
      ),
      takeaway: 'Credited directly to your bank within 30 days',
    },
    {
      id: 'returns',
      theme: 'teal',
      tag: 'High-Yield Asset',
      badgeBg: 'bg-teal-500/10 text-teal-800 border-teal-500/25',
      glowColor: 'rgba(0, 191, 166, 0.16)',
      accentColor: '#00BFA6',
      title: 'Pay Off in ~3 Years, Enjoy 20+ Years Free',
      subtitle: '28%+ tax-free return on capital that beats FDs and Mutual Funds.',
      description:
        'Instead of investing money into market-volatile stocks or low-yielding FDs, solar delivers immediate monthly cashflow through power bill avoidance. After year 3, it is 100% free profit.',
      // Visual mini-component
      visual: (
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#071918] to-slate-950 text-white border border-teal-900/40 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
            <span>25-Year Lifecycle Cashflow</span>
            <span className="text-[#00BFA6] font-bold font-mono">28.5% Annualized IRR</span>
          </div>
          {/* Progress bar timeline */}
          <div className="space-y-1.5">
            <div className="h-3 rounded-full bg-slate-800 flex overflow-hidden p-0.5 border border-slate-700">
              <div className="w-[18%] bg-amber-400 rounded-l-full" title="Payback Phase (3.5 Years)" />
              <div className="w-[82%] bg-gradient-to-r from-[#0F9D58] to-[#00BFA6] rounded-r-full" title="Free Electricity Era (21.5 Years)" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span className="text-amber-300 font-bold">Years 0–3.5 (Payback)</span>
              <span className="text-[#00BFA6] font-bold">Years 4–25+ (100% Free Power)</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-slate-300">25-Yr Lifetime Wealth Created:</span>
            <span className="font-black text-amber-400 font-mono text-xs">+₹15,00,000+</span>
          </div>
        </div>
      ),
      takeaway: 'Outperforms Bank FDs (7%) & Nifty Index (12%)',
    },
    {
      id: 'durability',
      theme: 'blue',
      tag: 'Zero Daily Hassle',
      badgeBg: 'bg-blue-500/10 text-blue-800 border-blue-500/25',
      glowColor: 'rgba(59, 130, 246, 0.16)',
      accentColor: '#3B82F6',
      title: '30+ Years Lifespan with Total Peace of Mind',
      subtitle: 'Tier-1 Bifacial panels engineered for intense Indian summers.',
      description:
        'With zero moving parts, hail-resistant tempered glass, and rust-proof aluminum structures, your system works quietly year-round. Track daily unit generation live on your phone anytime.',
      // Visual mini-component
      visual: (
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1426] to-slate-950 text-white border border-blue-900/40 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 text-blue-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Live IoT Mobile Telemetry
            </span>
            <span className="text-emerald-400 font-mono text-[10px]">● System Healthy</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 block font-mono">Today's Yield</span>
              <span className="text-sm font-black text-white font-mono">24.8 kWh</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 block font-mono">Peak Power</span>
              <span className="text-sm font-black text-[#00BFA6] font-mono">5.2 kW</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 block font-mono">Inverter Eff.</span>
              <span className="text-sm font-black text-amber-400 font-mono">98.6%</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-slate-300">Warranty Coverage:</span>
            <span className="font-bold text-blue-300">25 Years Linear Performance</span>
          </div>
        </div>
      ),
      takeaway: 'Hail-proof glass, IP68 rated, 24/7 mobile sync',
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
      aria-label="Why Solar Benefits and Advantages"
    >
      {/* ── HEADER ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">
            The Solar Advantage
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Four Clear Reasons Why Solar is <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6]">
            The Smartest Investment in 2026
          </span>
        </h2>

        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3.5 font-normal max-w-2xl mx-auto leading-relaxed">
          Tangible monthly savings, guaranteed government support, and 25+ years of worry-free clean power for your roof.
        </p>
      </div>

      {/* ── 4 ATTRACTIVE FEATURE PRESENTATION CARDS (2x2 Grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {pillars.map((pillar) => (
          <SpotlightCard
            key={pillar.id}
            className="reveal-up bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200 shadow-md hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            spotlightColor={pillar.glowColor}
          >
            <div>
              {/* Badge & Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${pillar.badgeBg}`}>
                  {pillar.tag}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                  Benefit #{pillars.indexOf(pillar) + 1}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-[#0b7542] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-3">
                {pillar.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {pillar.description}
              </p>

              {/* Visual Micro-Demonstration Widget */}
              {pillar.visual}
            </div>

            {/* Bottom Satisfying Takeaway Chip */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-emerald-600">✓</span> {pillar.takeaway}
              </span>
              <button
                type="button"
                onClick={handleScrollToSavings}
                className="text-emerald-700 group-hover:text-emerald-800 font-extrabold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Calculate</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* ── ATTRACTIVE BOTTOM CONVERSION BANNER ── */}
      <div className="mt-10 sm:mt-14 relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0B132B] to-slate-900 border border-slate-700/60 p-6 sm:p-9 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00BFA6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00BFA6] uppercase tracking-wider">
              <span>⚡</span> Ready to stop paying high electricity bills?
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              See What Your Roof Can Save in 60 Seconds
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Use our interactive bill slider below to calculate your system size, PM Surya Ghar subsidy amount, and 25-year wealth generation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleScrollToSavings}
            className="w-full lg:w-auto shrink-0 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_10px_25px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer shimmer-btn"
          >
            Calculate Your Savings Below ↓
          </button>
        </div>
      </div>
    </section>
  );
}
