import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function SavingsHub({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('slider'); // 'slider' | 'subsidy' | 'quiz'
  const [billAmount, setBillAmount] = useState(6500);

  // Precision bill calculations
  // Fixed DISCOM minimum connection charge after ~92% solar net-metering
  const monthlySolarBill = Math.max(250, Math.round(billAmount * 0.08));
  const monthlySavings = Math.max(0, billAmount - monthlySolarBill);
  const annualSavings = monthlySavings * 12;
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * 1.55);
  const recommendedKw = Math.max(3, Math.min(15, Math.round(billAmount / 1200)));

  // Quiz state
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    roofType: 'Flat Concrete Terrace',
    sunlight: 'Unobstructed Full Sunlight (6+ Hours)',
    load: 'Active Modern Family (~₹4k - ₹9k/mo)',
  });
  const [quizCompleted, setQuizCompleted] = useState(false);

  const subsidyPackages = [
    {
      capacity: '3 kW System',
      title: 'Sunshine Starter',
      bestFor: 'Perfect for compact homes & 1 AC (Bill ~₹3,000/mo)',
      price: '₹1,95,000',
      subsidy: '₹78,000',
      net: '₹1,17,000',
      units: '~360 Units / month',
      popular: false,
    },
    {
      capacity: '5 kW System',
      title: 'Family Powerhouse',
      bestFor: 'Engineered for standard 2-3 BHK homes running 2-3 ACs',
      price: '₹2,80,000',
      subsidy: '₹78,000',
      net: '₹2,02,000',
      units: '~600 Units / month',
      popular: true,
    },
    {
      capacity: '8 kW System',
      title: 'Luxury Villa Suite',
      bestFor: 'Designed for sprawling residences, villas & heavy appliances',
      price: '₹4,40,000',
      subsidy: '₹78,000',
      net: '₹3,62,000',
      units: '~960 Units / month',
      popular: false,
    },
    {
      capacity: '10 kW System',
      title: 'High-Yield Commercial',
      bestFor: 'Ideal for joint families, clinics, schools & commercial floors',
      price: '₹5,20,000',
      subsidy: '₹78,000',
      net: '₹4,42,000',
      units: '~1,200 Units / month',
      popular: false,
    },
  ];

  const subsidySteps = [
    {
      step: '01',
      title: 'Effortless Roof Audit & Portal Filing',
      time: 'Day 1 - 2',
      desc: 'Our certified solar engineers visit your roof, run a high-precision 3D shadow analysis, and file your official PM Surya Ghar National Portal application.',
      icon: '📐',
    },
    {
      step: '02',
      title: 'Express DISCOM Technical Sanction',
      time: 'Day 3 - 7',
      desc: 'We liaise directly with your local electricity board to secure express net-metering sanctions. Zero government paperwork or queue hassle for you.',
      icon: '⚡',
    },
    {
      step: '03',
      title: 'White-Glove Precision Installation',
      time: 'Day 8 - 12',
      desc: 'Factory-certified technicians securely mount Tier-1 bifacial panels, German-engineered smart inverters, and bidirectional net-meters in just 24 to 48 hours.',
      icon: '🛡️',
    },
    {
      step: '04',
      title: '₹78,000 Deposited in Your Bank',
      time: 'Within 30 Days',
      desc: 'Watch your net-meter spin backwards as the central government credits the ₹78,000 subsidy directly into your bank account via Direct Benefit Transfer (DBT).',
      icon: '💰',
    },
  ];

  return (
    <section 
      id="savings-hub" 
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80"
      aria-label="Solar Savings and Government Subsidy Hub"
    >
      <div id="roi-calculator" className="absolute -top-16 left-0 pointer-events-none" />

      {/* ── STEP INDICATOR & BUTTERY HEADER ── */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-4 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-black uppercase tracking-wider text-[#0b7542]">Step 2 of 4 • Effortless Financial Freedom</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Turn Your Empty Roof Into A{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6] block sm:inline">
            Lifetime Wealth Generator
          </span>
        </h2>

        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3.5 font-normal max-w-2xl mx-auto leading-relaxed">
          Experience the pure delight of slashing your electricity bill by up to 90%. Slide the calculator below, explore official PM Surya Ghar subsidy packages, or test your roof in 60 seconds.
        </p>

        {/* ── INTERACTIVE TAB SELECTOR ── */}
        <div className="mt-8 inline-flex p-1.5 bg-slate-200/85 backdrop-blur-md rounded-2xl border border-slate-300/80 shadow-inner max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('slider')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === 'slider'
                ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>⚡ Instant Bill Transformation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subsidy')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === 'subsidy'
                ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>🏛️ PM Surya Ghar Packages (₹78k)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>🏠 60-Sec Roof Feasibility</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: BILL TRANSFORMATION SLIDER ── */}
      {activeTab === 'slider' && (
        <div className="max-w-5xl mx-auto reveal-scale transition-all duration-300">
          <SpotlightCard className="bg-[#0F172A] text-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden" spotlightColor="rgba(15, 157, 88, 0.15)">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F9D58]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00BFA6]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Slider to adjust bill */}
            <div className="relative z-10 mb-8 pb-6 border-b border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <label htmlFor="savings-hub-slider" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Slide Your Current Monthly Electricity Bill</span>
                    <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      Real-Time Net Metering Model
                    </span>
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">Drag smoothly to watch your power expenses convert into lifelong family savings</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 shadow-inner">
                  <span className="text-sm text-[#00BFA6] font-bold">₹</span>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{billAmount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-300 font-medium">/ month</span>
                </div>
              </div>

              <input
                id="savings-hub-slider"
                name="savings_hub_slider"
                type="range"
                min="2000"
                max="25000"
                step="500"
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full h-3.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-[#0F9D58] focus:outline-hidden"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>₹2,000 / mo</span>
                <span>₹10,000 / mo</span>
                <span>₹25,000+ / mo</span>
              </div>
            </div>

            {/* Before vs After Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Without Solar */}
              <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-red-500/20 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                      The Endless Grid Outflow
                    </span>
                    <span className="text-[11px] text-red-300/90 font-medium bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
                      Uncontrolled Hikes
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">What you currently surrender to the utility board</p>
                  <div className="text-2xl sm:text-3xl font-black text-white mb-4">
                    ₹{billAmount.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-slate-400 font-normal">/ month forever</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">1-Year Outflow:</span>
                    <span className="font-bold text-white">₹{(billAmount * 12).toLocaleString('en-IN')} with zero returns</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">25-Year Cumulative Loss:</span>
                    <span className="font-black text-red-300 text-sm">₹{Math.round(billAmount * 12 * 25 * 1.55).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-white/5">
                    <span>DISCOM Tariff Trend:</span>
                    <span className="text-red-400 font-semibold">Compounding ~5% every year</span>
                  </div>
                </div>
              </div>

              {/* With Neonix Solar */}
              <div className="bg-gradient-to-b from-emerald-950/60 to-slate-900/90 rounded-2xl p-5 sm:p-6 border border-[#0F9D58]/50 shadow-xl relative flex flex-col justify-between">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#0F9D58] text-white px-2.5 py-1 rounded-full shadow-xs">
                    Up to 90% Vanished
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#00BFA6] inline-block animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#00BFA6]">
                      Your Clean Energy Powerhouse
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-1">Your new minimal DISCOM grid connection charge</p>
                  <div className="text-2xl sm:text-3xl font-black text-[#00BFA6] mb-4">
                    ₹{monthlySolarBill.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-slate-300 font-normal">/ month (fixed meter fee)</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-200 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Direct Monthly Savings:</span>
                    <span className="font-black text-[#0F9D58] text-base">+₹{monthlySavings.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Custom Engineered Size:</span>
                    <span className="font-bold text-white">{recommendedKw} kW High-Yield Bifacial Array</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Govt. Direct Cash Subsidy:</span>
                    <span className="font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ₹78,000 (DBT Bank Credit)
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-bold text-white">25-Year Wealth Created:</span>
                    <span className="font-black text-amber-400 text-base sm:text-lg">+₹{twentyFiveYearSavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Banner */}
            <div className="relative z-10 bg-white/5 border border-white/15 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>Keep ₹{(monthlySavings * 12).toLocaleString('en-IN')} In Your Family Every Single Year</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  We handle 100% of the DISCOM paperwork, net-metering synchronization, and national subsidy portal filing for you. Zero hidden fees.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation && onOpenConsultation({ bill: billAmount, systemSize: recommendedKw })}
                className="w-full sm:w-auto shrink-0 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-xl shadow-[0_4px_18px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer shimmer-btn"
              >
                Lock In My Savings & Free Survey →
              </button>
            </div>
          </SpotlightCard>
        </div>
      )}

      {/* ── TAB 2: GOVT SUBSIDY PACKAGES ── */}
      {activeTab === 'subsidy' && (
        <div className="max-w-5xl mx-auto reveal-scale transition-all duration-300 space-y-8">
          {/* Rate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subsidyPackages.map((pkg) => (
              <SpotlightCard
                key={pkg.capacity}
                className={`bg-white rounded-2xl p-5 border shadow-sm flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.popular ? 'border-[#0F9D58] shadow-lg ring-2 ring-[#0F9D58]/20' : 'border-slate-200 hover:border-slate-300'
                }`}
                spotlightColor="rgba(15, 157, 88, 0.08)"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{pkg.title}</span>
                    {pkg.popular && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#0F9D58] text-white px-2 py-0.5 rounded-full shadow-xs">
                        Most Loved
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900">{pkg.capacity}</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-3.5 leading-snug">{pkg.bestFor}</p>

                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Standard Benchmark:</span>
                      <span className="line-through font-mono">{pkg.price}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#0b7542]">
                      <span>Central DBT Subsidy:</span>
                      <span className="bg-[#0b7542]/10 px-1.5 py-0.5 rounded">- {pkg.subsidy}</span>
                    </div>
                    <div className="flex justify-between pt-1 font-black text-slate-900 text-sm">
                      <span>Net Effective Outlay:</span>
                      <span className="text-[#0b7542] text-base">{pkg.net}</span>
                    </div>
                  </div>

                  <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-700 flex items-center gap-2">
                    <span className="text-[#0F9D58] font-bold">⚡</span>
                    <span>Generates: <strong className="text-slate-900 font-bold">{pkg.units}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation && onOpenConsultation({ systemSize: pkg.capacity })}
                  className={`mt-4 w-full font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-xs ${
                    pkg.popular
                      ? 'bg-[#0F9D58] hover:bg-[#0c8248] text-white'
                      : 'bg-slate-900 hover:bg-[#0b7542] text-white'
                  }`}
                >
                  Choose {pkg.capacity}
                </button>
              </SpotlightCard>
            ))}
          </div>

          {/* 4 Steps Roadmap */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Seamless Government Portal Flow</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                  The Smooth 4-Step Journey to Your ₹78,000 Govt. Subsidy
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                100% Direct Benefit Transfer (DBT)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subsidySteps.map((s) => (
                <div key={s.step} className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#0b7542] font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      Step {s.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {s.time}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: ROOF FEASIBILITY QUIZ ── */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto reveal-scale transition-all duration-300">
          <SpotlightCard className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden" spotlightColor="rgba(15, 157, 88, 0.08)">
            {!quizCompleted ? (
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">
                      Question {quizStep} of 3 • Rooftop Diagnostic
                    </span>
                    <p className="text-[11px] text-slate-500">Takes less than 45 seconds to analyze</p>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          quizStep === s ? 'w-8 bg-[#0F9D58]' : quizStep > s ? 'w-4 bg-[#0b7542]' : 'w-4 bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {quizStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      1. What crowns your property rooftop?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {[
                        { name: 'Flat Concrete Terrace', sub: 'Walkable, prime layout for tilt structures' },
                        { name: 'Slanted Tile / Tin Shed', sub: 'Custom lightweight clamp brackets' },
                        { name: 'Industrial Metal Sheet', sub: 'High-speed trapezoidal mounting' },
                      ].map((opt) => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, roofType: opt.name }));
                            setQuizStep(2);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                            quizAnswers.roofType === opt.name
                              ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/20'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.name}</div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      2. How generously does the sun shine across your roof?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {[
                        { name: 'Unobstructed Full Sunlight (6+ Hours)', sub: 'Maximum peak generation & fastest ROI' },
                        { name: 'Gentle Partial Afternoon Shade', sub: 'Bifacial panels easily harvest ambient light' },
                        { name: 'Dappled Shade / Surrounding Trees', sub: 'Optimizers ensure top-tier performance' },
                      ].map((opt) => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, sunlight: opt.name }));
                            setQuizStep(3);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                            quizAnswers.sunlight === opt.name
                              ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/20'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.name}</div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      3. What is your family's typical monthly power consumption?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {[
                        { name: 'Cozy Household (~₹2k - ₹4k/mo)', sub: 'Qualifies for 3 kW system with ₹78k subsidy' },
                        { name: 'Active Modern Family (~₹4k - ₹9k/mo)', sub: 'Best matched with 5 kW high-output array' },
                        { name: 'High Comfort / Villa (>₹10k/mo)', sub: 'Ideal for 8-10 kW multi-phase plant' },
                      ].map((opt) => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, load: opt.name }));
                            setQuizCompleted(true);
                          }}
                          className="p-4 rounded-2xl border border-slate-200 hover:border-[#0F9D58] hover:bg-[#0F9D58]/10 text-left transition-all duration-200 cursor-pointer"
                        >
                          <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.name}</div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#0b7542] rounded-full flex items-center justify-center text-3xl mx-auto font-black shadow-inner">
                  ✓
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                  98% High Feasibility Match
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Exceptional Solar Rooftop Potential!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Your <strong className="text-slate-900 font-semibold">{quizAnswers.roofType}</strong> paired with{' '}
                  <strong className="text-slate-900 font-semibold">{quizAnswers.sunlight}</strong> is prime for peak solar conversion. You are fully eligible for up to ₹78,000 in direct government subsidies under PM Surya Ghar.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation && onOpenConsultation({ quizData: quizAnswers })}
                    className="w-full sm:w-auto bg-[#0F9D58] hover:bg-[#0c8248] text-white font-black text-xs uppercase px-7 py-3.5 rounded-xl shadow-lg cursor-pointer transition-all transform hover:-translate-y-0.5"
                  >
                    Reserve Free 3D Roof Design & Site Survey →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizStep(1);
                      setQuizCompleted(false);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer px-4 py-2"
                  >
                    Test Another Scenario
                  </button>
                </div>
              </div>
            )}
          </SpotlightCard>
        </div>
      )}

      {/* ── DEEP DIVE FINANCIAL MODELING GATEWAY CARD ── */}
      <div className="mt-10 sm:mt-14 max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0B132B] to-slate-900 border border-slate-700/60 p-5 sm:p-7 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-white">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00BFA6] uppercase tracking-wider">
              <span>📊</span> Executive Financial Modeling Suite
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Need a Comprehensive 25-Year Cashflow Model With Commercial Tax Shields & Loan EMIs?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Step into our dedicated financial modeling engine — calculate accelerated tax depreciation (40%), compare DCR vs Non-DCR panel ROI, and generate an executive PDF feasibility report in 1 click.
            </p>
          </div>

          <a
            href="/solar-calculator.html"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#00BFA6] hover:bg-[#00a892] active:bg-[#008f7c] text-slate-950 font-black text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            <span>Launch Full Solar ROI Calculator</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
