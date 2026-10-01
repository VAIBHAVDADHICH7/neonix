import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function SavingsHub({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('slider'); // 'slider' | 'subsidy' | 'quiz'
  const [billAmount, setBillAmount] = useState(6500);

  // Bill calculations
  const monthlySolarBill = Math.max(250, Math.round(billAmount * 0.08));
  const monthlySavings = Math.max(0, billAmount - monthlySolarBill);
  const annualSavings = monthlySavings * 12;
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * 1.55);
  const recommendedKw = Math.max(3, Math.min(15, Math.round(billAmount / 1200)));

  // Quiz state
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    roofType: 'Flat Concrete Terrace',
    sunlight: 'Full Sunlight (6+ Hours)',
    load: '2-3 BHK Home (~₹4k - ₹8k/mo)',
  });
  const [quizCompleted, setQuizCompleted] = useState(false);

  const subsidyPackages = [
    { capacity: '3 kW System', bestFor: 'Small Homes (Bill ~₹3,000/mo)', price: '₹1,95,000', subsidy: '₹78,000', net: '₹1,17,000', units: '~360 Units/mo', popular: false },
    { capacity: '5 kW System', bestFor: 'Standard 2-3 BHK Homes with AC', price: '₹2,80,000', subsidy: '₹78,000', net: '₹2,02,000', units: '~600 Units/mo', popular: true },
    { capacity: '8 kW System', bestFor: 'Large Villas & Joint Families', price: '₹4,40,000', subsidy: '₹78,000', net: '₹3,62,000', units: '~960 Units/mo', popular: false },
    { capacity: '10 kW System', bestFor: 'Luxury Homes & Commercial Setups', price: '₹5,20,000', subsidy: '₹78,000', net: '₹4,42,000', units: '~1,200 Units/mo', popular: false },
  ];

  const subsidySteps = [
    { step: '01', title: 'Free Roof Survey & Application', time: 'Day 1-2', desc: 'Our team inspects your roof and handles your application on the PM Surya Ghar National Portal.' },
    { step: '02', title: 'DISCOM Feasibility Approval', time: 'Day 3-7', desc: 'Your local electricity board approves your net-metering connection with zero friction.' },
    { step: '03', title: 'Turnkey Installation', time: 'Day 8-12', desc: 'Certified engineers mount Tier-1 panels, smart inverters, and synchronization meters in 1-2 days.' },
    { step: '04', title: '₹78,000 DBT in Your Bank', time: 'Within 30 Days', desc: 'Government transfers the ₹78,000 subsidy directly to your registered bank account.' },
  ];

  return (
    <section 
      id="savings-hub" 
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80"
      aria-label="Solar Savings and Government Subsidy Hub"
    >
      {/* Step Indicator & Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3.5">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Step 2 of 4 • Financial Transparency</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          How Much Can You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6]">Save With Solar?</span>
        </h2>
        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3 font-normal max-w-2xl mx-auto">
          Explore your direct bill savings, browse official PM Surya Ghar subsidy packages, or test your rooftop feasibility.
        </p>

        {/* Tab Controls */}
        <div className="mt-8 inline-flex p-1.5 bg-slate-200/80 backdrop-blur-md rounded-2xl border border-slate-300/80 shadow-inner max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('slider')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'slider'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>⚡ Bill Transformation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subsidy')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subsidy'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>🏛️ Govt. Subsidy Packages</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>🏠 Roof Feasibility Quiz</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: BILL TRANSFORMATION SLIDER ── */}
      {activeTab === 'slider' && (
        <div className="max-w-5xl mx-auto reveal-scale transition-all duration-300">
          <SpotlightCard className="bg-[#0F172A] text-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden" spotlightColor="rgba(15, 157, 88, 0.15)">
            {/* Slider to adjust bill */}
            <div className="mb-8 pb-6 border-b border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <label htmlFor="savings-hub-slider" className="text-sm sm:text-base font-bold text-white">
                    Select Your Current Monthly Electricity Bill
                  </label>
                  <p className="text-xs text-slate-400">Drag the slider to calculate instant solar savings</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                  <span className="text-sm text-[#00BFA6] font-bold">₹</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">{billAmount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-300">/ mo</span>
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
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0F9D58] focus:outline-hidden"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>₹2,000/mo</span>
                <span>₹10,000/mo</span>
                <span>₹25,000+/mo</span>
              </div>
            </div>

            {/* Before vs After Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Without Solar */}
              <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-red-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">Without Solar (Grid Power)</span>
                  <span className="text-xs text-red-300">Uncontrolled Hikes</span>
                </div>
                <p className="text-xs text-slate-400 mb-1">Estimated Monthly Bill</p>
                <div className="text-2xl sm:text-3xl font-black text-white mb-4">
                  ₹{billAmount.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-white/10">
                  <div className="flex justify-between">
                    <span>1-Year Grid Bill:</span>
                    <span className="font-bold text-white">₹{(billAmount * 12).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25-Year Cumulative Paid:</span>
                    <span className="font-bold text-red-300">₹{Math.round(billAmount * 12 * 25 * 1.55).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Expected Tariff Hike:</span>
                    <span>5% per annum</span>
                  </div>
                </div>
              </div>

              {/* With Solar */}
              <div className="bg-emerald-950/40 rounded-2xl p-5 sm:p-6 border border-[#0F9D58]/40 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00BFA6]">With Neonix Solar</span>
                  <span className="text-[10px] font-bold bg-[#0F9D58]/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Up to 90% Drop
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-1">New Monthly Electricity Bill</p>
                <div className="text-2xl sm:text-3xl font-black text-[#00BFA6] mb-4">
                  ₹{monthlySolarBill.toLocaleString('en-IN')} <span className="text-xs text-slate-300 font-normal">/ month</span>
                </div>
                <div className="space-y-2 text-xs text-slate-200 pt-3 border-t border-white/10">
                  <div className="flex justify-between">
                    <span>Monthly Savings:</span>
                    <span className="font-extrabold text-[#0F9D58] text-sm">+₹{monthlySavings.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommended Capacity:</span>
                    <span className="font-bold text-white">{recommendedKw} kW System</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Govt. Direct Subsidy:</span>
                    <span className="font-bold text-emerald-300">₹78,000 (DBT Bank Transfer)</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/10">
                    <span className="font-semibold text-white">25-Year Wealth Created:</span>
                    <span className="font-black text-amber-400 text-sm sm:text-base">+₹{twentyFiveYearSavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="bg-white/5 border border-white/15 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Save ₹{(monthlySavings * 12).toLocaleString('en-IN')} Every Single Year
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Full PM Surya Ghar subsidy processing and DISCOM paperwork handled by our certified engineers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenConsultation && onOpenConsultation({ bill: billAmount, systemSize: recommendedKw })}
                className="w-full sm:w-auto shrink-0 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shimmer-btn"
              >
                Claim This Estimate & Survey →
              </button>
            </div>
          </SpotlightCard>
        </div>
      )}

      {/* ── TAB 2: GOVT SUBSIDY PACKAGES ── */}
      {activeTab === 'subsidy' && (
        <div className="max-w-5xl mx-auto reveal-scale transition-all duration-300 space-y-8">
          {/* Rate Cards Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subsidyPackages.map((pkg) => (
              <SpotlightCard
                key={pkg.capacity}
                className={`bg-white rounded-2xl p-5 border shadow-sm flex flex-col justify-between relative transition-all ${
                  pkg.popular ? 'border-[#0F9D58] shadow-md ring-2 ring-[#0F9D58]/20' : 'border-slate-200'
                }`}
                spotlightColor="rgba(15, 157, 88, 0.08)"
              >
                <div>
                  {pkg.popular && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#0F9D58] text-white px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900">{pkg.capacity}</h3>
                  <p className="text-xs text-slate-500 mb-3">{pkg.bestFor}</p>

                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Benchmark Price:</span>
                      <span className="line-through">{pkg.price}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-700">
                      <span>Govt. Subsidy:</span>
                      <span>- {pkg.subsidy}</span>
                    </div>
                    <div className="flex justify-between pt-1 font-black text-slate-900 text-sm">
                      <span>Net Investment:</span>
                      <span className="text-[#0b7542]">{pkg.net}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2.5 font-medium">
                    ⚡ Generates: <strong className="text-slate-800">{pkg.units}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation && onOpenConsultation({ systemSize: pkg.capacity })}
                  className="mt-4 w-full bg-slate-900 hover:bg-[#0b7542] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Choose {pkg.capacity}
                </button>
              </SpotlightCard>
            ))}
          </div>

          {/* 4 Steps Roadmap */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🏛️</span> PM Surya Ghar Subsidy Journey (How You Get Paid)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subsidySteps.map((s) => (
                <div key={s.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#0b7542] font-mono">{s.step}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {s.time}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{s.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{s.desc}</p>
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
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">
                    Question {quizStep} of 3
                  </span>
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
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">1. What kind of roof do you have?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {['Flat Concrete Terrace', 'Slanted Tile / Tin Shed', 'Industrial Metal Sheet'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, roofType: opt }));
                            setQuizStep(2);
                          }}
                          className={`p-4 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                            quizAnswers.roofType === opt
                              ? 'border-[#0F9D58] bg-[#0F9D58]/10 text-[#0b7542]'
                              : 'border-slate-200 hover:border-slate-400 text-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">2. How much direct sunlight does your roof get?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {['Full Sunlight (6+ Hours)', 'Partial Afternoon Shadow', 'Significant Shade / Trees'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, sunlight: opt }));
                            setQuizStep(3);
                          }}
                          className={`p-4 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                            quizAnswers.sunlight === opt
                              ? 'border-[#0F9D58] bg-[#0F9D58]/10 text-[#0b7542]'
                              : 'border-slate-200 hover:border-slate-400 text-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">3. What is your typical monthly electricity bill?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {['Small Home (₹2k - ₹4k)', 'Standard Home (₹4k - ₹9k)', 'Large Home / Commercial (₹10k+)'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, load: opt }));
                            setQuizCompleted(true);
                          }}
                          className="p-4 rounded-xl border border-slate-200 hover:border-[#0F9D58] hover:bg-[#0F9D58]/10 text-xs sm:text-sm font-bold text-left transition-all cursor-pointer text-slate-800"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-[#0b7542] rounded-full flex items-center justify-center text-2xl mx-auto font-black">
                  ✓
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">98% High Feasibility Match!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Based on your <strong className="text-slate-800">{quizAnswers.roofType}</strong> and{' '}
                  <strong className="text-slate-800">{quizAnswers.sunlight}</strong>, your rooftop is eligible for immediate 
                  PM Surya Ghar solar installation with up to ₹78,000 in government subsidies.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation && onOpenConsultation({ quizData: quizAnswers })}
                    className="w-full sm:w-auto bg-[#0F9D58] hover:bg-[#0c8248] text-white font-bold text-xs uppercase px-6 py-3.5 rounded-xl shadow-md cursor-pointer transition-all"
                  >
                    Confirm With Free Site Survey →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizStep(1);
                      setQuizCompleted(false);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    Retake Check
                  </button>
                </div>
              </div>
            )}
          </SpotlightCard>
        </div>
      )}

      {/* ── DEEP DIVE GATEWAY CARD ── */}
      <div className="mt-10 sm:mt-14 max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0B132B] to-slate-900 border border-slate-700/60 p-5 sm:p-7 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-white">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00BFA6] uppercase tracking-wider">
              <span>📊</span> Dedicated Financial Modeling Tool
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Want a Full 25-Year Cashflow Model With Tax Depreciation & Loan EMIs?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Access our dedicated calculator page for detailed DCR/Non-DCR comparisons, commercial accelerated depreciation (40%), and instant PDF feasibility downloads.
            </p>
          </div>

          <a
            href="/solar-calculator.html"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#00BFA6] hover:bg-[#00a892] active:bg-[#008f7c] text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            <span>Launch Full Solar ROI Calculator</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
