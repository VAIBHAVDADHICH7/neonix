import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function WhySolar() {
  const [selectedAudience, setSelectedAudience] = useState('residential'); // 'residential' | 'commercial'
  const [comparisonYear, setComparisonYear] = useState(10); // 5, 10, 20 years

  // Tariff inflation model (Grid starts at avg ₹8.50/kWh in India, inflating at 6% annually)
  // Solar Levelized Cost of Energy (LCOE) is fixed at ~₹1.80/kWh amortized over 25 years
  const initialTariff = selectedAudience === 'residential' ? 8.5 : 10.5;
  const gridRateAtYear = (initialTariff * Math.pow(1.06, comparisonYear)).toFixed(2);
  const solarLcoe = (1.85).toFixed(2);
  const costSavingsMultiple = (gridRateAtYear / solarLcoe).toFixed(1);

  return (
    <section
      id="why-solar"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80"
      aria-label="Why Solar Economics and Engineering"
    >
      {/* ── HEADER ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-ping" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">
            Energy Intelligence & Economics
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          The Engineering & Financial Case for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6]">Going Solar</span>
        </h2>
        
        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3.5 font-normal max-w-2xl mx-auto leading-relaxed">
          Rooftop solar isn't an expense—it is a guaranteed, low-risk infrastructure asset that delivers 25%–30% tax-free IRR while immunizing your property from compounding grid tariff hikes.
        </p>

        {/* Audience Toggle (Residential vs Commercial) */}
        <div className="mt-8 inline-flex p-1.5 bg-slate-200/90 backdrop-blur-md rounded-2xl border border-slate-300 shadow-inner">
          <button
            type="button"
            onClick={() => setSelectedAudience('residential')}
            className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedAudience === 'residential'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🏡 Residential Homes</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedAudience('commercial')}
            className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedAudience === 'commercial'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🏢 Commercial & Industrial</span>
          </button>
        </div>
      </div>

      {/* ── BENTO GRID ARCHITECTURE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

        {/* ── CARD 1: THE INFLATION HEDGE (5 or 7 Cols) ── */}
        <SpotlightCard
          className="lg:col-span-7 bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 shadow-2xl relative flex flex-col justify-between"
          spotlightColor="rgba(15, 157, 88, 0.2)"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#00BFA6] bg-[#00BFA6]/15 px-3 py-1 rounded-full border border-[#00BFA6]/30">
                Pillar 1 • The Tariff Shield
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Levelized Cost vs Grid Tariff
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
              Rent Power From the Grid Forever, or Own Your Energy at ₹1.85/kWh?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              DISCOM tariffs compound at 5%–7% annually in India due to coal costs and grid transmission losses. Solar locks your lifetime daytime electricity cost at a fixed amortized ₹1.85/unit.
            </p>

            {/* Interactive Timeline Selector */}
            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span>Select Projected Projection Horizon:</span>
                <span className="font-bold text-[#00BFA6]">Year {comparisonYear}</span>
              </div>
              <div className="flex gap-2">
                {[5, 10, 15, 20, 25].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setComparisonYear(yr)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonYear === yr
                        ? 'bg-[#0F9D58] text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Yr {yr}
                  </button>
                ))}
              </div>

              {/* Real-time comparison metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-center sm:text-left">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Grid Tariff at Year {comparisonYear}</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-400">₹{gridRateAtYear} <span className="text-xs font-normal text-slate-400">/ kWh</span></span>
                  <span className="text-[10px] text-rose-300/80 block mt-0.5">Includes compounding hikes</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Neonix Solar Fixed Cost</span>
                  <span className="text-xl sm:text-2xl font-black text-[#00BFA6]">₹{solarLcoe} <span className="text-xs font-normal text-slate-400">/ kWh</span></span>
                  <span className="text-[10px] text-emerald-300/80 block mt-0.5">Fixed 25-yr LCOE (Zero Hikes)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F9D58]" />
              <strong>{costSavingsMultiple}x Cheaper</strong> than grid power at Year {comparisonYear}
            </span>
            <span className="text-[#00BFA6] font-mono text-[11px]">Formula: LCOE = Capex ÷ 25-Yr Yield</span>
          </div>
        </SpotlightCard>

        {/* ── CARD 2: FINANCIAL RETURNS COMPARISON (5 Cols) ── */}
        <SpotlightCard
          className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col justify-between"
          spotlightColor="rgba(15, 157, 88, 0.08)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0b7542] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Pillar 2 • Superior Asset Returns
              </span>
              <span className="text-xs font-bold text-emerald-700">Tax-Free IRR</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Solar Crushes Traditional Asset Classes in India
            </h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Unlike mutual funds or gold subject to market swings, rooftop solar provides a direct, predictable reduction in living or operating expenditure.
            </p>

            {/* Asset Benchmark Chart */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#0b7542] flex items-center gap-1.5">
                    <span>⚡</span> Neonix Rooftop Solar
                  </span>
                  <span className="text-[#0b7542] font-black">28.5% IRR (Tax-Free)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0b7542] to-[#00BFA6] h-3 rounded-full w-[95%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>📈 Nifty 50 Index (Long Term)</span>
                  <span className="font-semibold text-slate-800">~12.5% (Pre-Tax)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-400 h-2 rounded-full w-[42%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>🏦 Bank Fixed Deposit (FD)</span>
                  <span className="font-semibold text-slate-800">~7.0% (Taxable)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-300 h-2 rounded-full w-[24%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-900 flex items-center justify-between">
            <span>Payback Period: <strong>3.2 – 3.8 Years</strong></span>
            <span>Free Power Era: <strong>21+ Years</strong></span>
          </div>
        </SpotlightCard>

        {/* ── CARD 3: BI-DIRECTIONAL NET-METERING PHYSICS (4 Cols) ── */}
        <SpotlightCard
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          spotlightColor="rgba(15, 157, 88, 0.08)"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#00BFA6]/15 text-[#0d8070] flex items-center justify-center font-bold text-xl mb-4">
              ⇄
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0d8070] block mb-1">
              Bi-Directional Net Metering
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Turn Your Rooftop into a Micro Power Plant
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              On sunny afternoons, your solar panels generate more electricity than your home consumes. Your DISCOM-approved net meter automatically spins backward, banking surplus units into your grid account.
            </p>

            {/* Architecture mini-flow */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-[11px] text-slate-700 font-mono">
              <div className="flex items-center justify-between">
                <span>Rooftop Solar</span>
                <span className="text-emerald-700">→ Supplies Home</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Surplus Units</span>
                <span className="text-[#0d8070]">→ Exported to Grid</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Night Consumption</span>
                <span className="text-slate-500">→ Offset via Credits</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-emerald-600">✓</span> Zero battery replacements needed for on-grid systems
          </div>
        </SpotlightCard>

        {/* ── CARD 4: TOPCON & BIFACIAL HARDWARE ENGINEERING (4 Cols) ── */}
        <SpotlightCard
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          spotlightColor="rgba(15, 157, 88, 0.08)"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#0b7542]/15 text-[#0b7542] flex items-center justify-center font-bold text-xl mb-4">
              🛡️
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0b7542] block mb-1">
              Industrial-Grade Hardware
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Tier-1 N-Type TOPCon & Dual-Glass Bifacial Panels
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Unlike cheap poly-crystalline panels, we deploy Tier-1 ALMM listed N-Type TOPCon cells. Front glass captures direct sun while the rear glass harvests reflected albedo sunlight for +15% more yield.
            </p>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-black text-slate-900 block">22.8%</span>
                <span className="text-[10px] text-slate-500">Cell Efficiency</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-black text-slate-900 block">30 Years</span>
                <span className="text-[10px] text-slate-500">Linear Warranty</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-emerald-600">✓</span> Hail-resistant 3.2mm tempered glass (IP68)
          </div>
        </SpotlightCard>

        {/* ── CARD 5: AUDIENCE SPECIFIC PERK (4 Cols) ── */}
        <SpotlightCard
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          spotlightColor="rgba(217, 119, 6, 0.12)"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xl mb-4">
              {selectedAudience === 'residential' ? '🏛️' : '💼'}
            </div>
            
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block mb-1">
              {selectedAudience === 'residential' ? 'Govt. Direct Benefit Transfer' : 'Tax Optimization Benefit'}
            </span>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {selectedAudience === 'residential' 
                ? 'PM Surya Ghar ₹78,000 Direct Bank Credit' 
                : '40% Accelerated Tax Depreciation (Year 1)'}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {selectedAudience === 'residential'
                ? 'Under the 2026 PM Surya Ghar national scheme, rooftop systems up to 3 kW qualify for a direct government DBT subsidy of ₹78,000 credited to your registered Aadhaar-linked bank account.'
                : 'Commercial enterprises, offices, hospitals, and industrial warehouses can claim 40% accelerated depreciation on solar capital investment in Year 1, significantly cutting corporate tax outgo.'}
            </p>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-900">
              {selectedAudience === 'residential' ? (
                <div className="flex justify-between items-center font-bold">
                  <span>Max Cash Subsidy:</span>
                  <span className="text-amber-700 text-sm">₹78,000 (Central Govt.)</span>
                </div>
              ) : (
                <div className="flex justify-between items-center font-bold">
                  <span>Year 1 Tax Write-Off:</span>
                  <span className="text-amber-700 text-sm">40% Capital Value</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-amber-600">✓</span> Full documentation handled by Neonix liaison team
          </div>
        </SpotlightCard>

      </div>

      {/* ── MACRO IMPACT & EQUITY BAR ── */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0b7542] flex items-center justify-center text-2xl shrink-0 font-bold">
            🌱
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">120+ Metric Tons CO₂ Offset</h4>
            <p className="text-xs text-slate-500 mt-0.5">Equivalent to planting over 1,900 trees over 25 years.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d8070] flex items-center justify-center text-2xl shrink-0 font-bold">
            🏡
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">+4% to 7% Property Appraisal</h4>
            <p className="text-xs text-slate-500 mt-0.5">Zero-electricity buildings command higher resale & rental yields.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0 font-bold">
            📱
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Real-Time IoT Generation Sync</h4>
            <p className="text-xs text-slate-500 mt-0.5">24/7 mobile app tracking of units, peak curves & rupee yield.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
