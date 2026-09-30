export default function CalculatorTeaser() {
  return (
    <section id="roi-calculator" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1E293B] border border-white/15 shadow-2xl p-6 sm:p-10 lg:p-14 text-white">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F9D58]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00BFA6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value proposition */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F9D58]/20 border border-[#00BFA6]/30 text-[#00BFA6] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" />
              PM Surya Ghar 2026 Ready
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Calculate Your <span className="text-[#00BFA6]">Solar ROI</span> & Govt. Subsidy
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Find out your exact solar system capacity (kW), direct government subsidy (up to ₹78,000), monthly savings, and payback period on our dedicated calculator page.
            </p>

            {/* Quick feature checklist */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                <span className="text-[#0F9D58] font-bold">✓</span> Up to ₹78,000 Direct Subsidy
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                <span className="text-[#0F9D58] font-bold">✓</span> 25-Year Lifetime Returns
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                <span className="text-[#0F9D58] font-bold">✓</span> DCR & Non-DCR Cost Models
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                <span className="text-[#0F9D58] font-bold">✓</span> Instant PDF Feasibility Report
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="/solar-calculator.html"
                className="inline-flex items-center gap-2.5 bg-[#0F9D58] hover:bg-[#0c8248] text-white text-sm sm:text-base font-bold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(15,157,88,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Launch Full Solar ROI Calculator</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Teaser Card */}
          <div className="lg:col-span-5">
            <a
              href="/solar-calculator.html"
              className="block bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-2xl p-5 sm:p-6 hover:bg-white/[0.1] transition-all duration-300 group hover:border-[#00BFA6]/40 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0F9D58]/20 flex items-center justify-center text-[#0F9D58] font-bold text-sm">
                    ₹
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Instant Estimation</span>
                </div>
                <span className="text-[10px] font-bold bg-[#00BFA6]/20 text-[#00BFA6] px-2.5 py-1 rounded-full border border-[#00BFA6]/30">
                  Interactive Tool →
                </span>
              </div>

              <div className="space-y-3 bg-[#0B132B]/80 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Average Monthly Bill:</span>
                  <span className="text-white font-bold">₹4,500 / month</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Recommended Capacity:</span>
                  <span className="text-[#00BFA6] font-bold">3.0 kW System</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Govt. Direct Subsidy:</span>
                  <span className="text-[#0F9D58] font-bold">₹78,000 (Direct Transfer)</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                  <span className="text-gray-300 font-semibold">Estimated 25-Yr Savings:</span>
                  <span className="text-amber-400 font-extrabold text-sm">₹11.8+ Lakhs</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-[#00BFA6] group-hover:underline inline-flex items-center gap-1">
                  Click here to customize for your rooftop & bill →
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
