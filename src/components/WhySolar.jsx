import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function WhySolar() {
  const [selectedAudience, setSelectedAudience] = useState('residential'); // 'residential' | 'commercial'
  const [simulationMode, setSimulationMode] = useState('noon'); // 'noon' | 'evening' | 'cloudy'
  const [comparisonYear, setComparisonYear] = useState(10); // 5, 10, 15, 20, 25

  // Tariff inflation engineering model:
  // Grid tariff starts at ₹8.50/kWh (Residential) or ₹10.75/kWh (Commercial), compounding at 6% annually.
  // Solar Levelized Cost of Energy (LCOE) is fixed at ₹1.85/kWh over 25 years.
  const baseTariff = selectedAudience === 'residential' ? 8.5 : 10.75;
  const gridRateAtYear = (baseTariff * Math.pow(1.06, comparisonYear)).toFixed(2);
  const solarLcoe = (1.85).toFixed(2);
  const savingsFactor = (gridRateAtYear / solarLcoe).toFixed(1);

  // Technical specifications for the active audience
  const engineeringSpecs = selectedAudience === 'residential' ? [
    { label: 'Technology', value: 'N-Type TOPCon Dual-Glass Bifacial', code: 'IEC 61215 / 61730' },
    { label: 'Cell Efficiency', value: '22.8% Peak Module Efficiency', code: 'Grade A+ Mono Cells' },
    { label: 'Temp Coefficient', value: '-0.29%/°C (High Heat Resilient)', code: 'Tested for 50°C Summers' },
    { label: 'Wind Load Rating', value: '170 km/h Hurricane Resistance', code: 'IS 875 Part 3 Standard' },
    { label: 'Annual Degradation', value: '< 0.40% / Year Linear Guarantee', code: '84.8% Output at Year 25' },
    { label: 'Net-Metering Sync', value: 'Automatic Bi-Directional Banking', code: 'State DISCOM Certified' },
  ] : [
    { label: 'Asset Depreciation', value: '40% Accelerated Tax Write-Off', code: 'Section 32 Income Tax' },
    { label: 'Commercial Payback', value: '2.8 – 3.4 Years Full Capex Amortization', code: 'Internal Rate of Return ~31%' },
    { label: 'Harmonic Distortion', value: 'THD < 2.5% (High Power Factor)', code: 'IEEE 519 Grid Compliant' },
    { label: 'String Inverter', value: 'Quad-MPPT 98.8% Peak Efficiency', code: 'IP66 Rated Enclosure' },
    { label: 'Anti-Islanding Safety', value: '< 100ms Automatic Grid Disconnect', code: 'IEC 62116 Certified' },
    { label: 'Carbon Offset Yield', value: '250+ Metric Tons CO₂ / 100kWp', code: 'ESG & Green Audit Ready' },
  ];

  return (
    <section
      id="why-solar"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden"
      aria-label="Why Solar Economics and Engineering"
    >
      {/* Background Architectural Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono uppercase tracking-wider mb-4 shadow-sm border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" aria-hidden="true" />
          <span>ENGINEERING DISCIPLINE • LCOE ANALYSIS 2026</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          The Physics & Financials of <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6]">
            Sovereign Rooftop Solar
          </span>
        </h2>

        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3.5 font-normal max-w-2xl mx-auto leading-relaxed">
          Rooftop solar is an engineered capital asset. It permanently removes inflation risk, delivers a guaranteed 28%+ tax-free IRR, and converts unused terrace space into a 30-year private utility.
        </p>

        {/* Audience Toggle (Residential vs Commercial) */}
        <div className="mt-7 inline-flex p-1.5 bg-slate-200/90 backdrop-blur-md rounded-2xl border border-slate-300 shadow-inner">
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

      {/* ── BENTO GRID ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

        {/* ── BENTO 1: INTERACTIVE ENERGY FLOW SCHEMATIC (Full 12 cols or 7 cols) ── */}
        <SpotlightCard
          className="lg:col-span-7 bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative flex flex-col justify-between"
          spotlightColor="rgba(0, 191, 166, 0.18)"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00BFA6] animate-ping" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00BFA6]">
                  Live Energy Flow Architecture
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Real-Time Net-Metering Physics
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
              Bi-Directional Synchronized Power Generation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              See how on-grid solar functions across sunlight conditions. Click a mode to trace how surplus electricity is banked into the DISCOM grid for nighttime credit.
            </p>

            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: 'noon', label: '☀️ Peak Daylight (12 PM)', desc: 'Surplus Export to Grid' },
                { id: 'evening', label: '🌙 Evening / Night (8 PM)', desc: 'Drawing Banked Credits' },
                { id: 'cloudy', label: '⛅ Diffuse / Monsoons', desc: 'Continuous Base Power' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSimulationMode(m.id)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    simulationMode === m.id
                      ? 'bg-slate-800/90 border-[#00BFA6] shadow-[0_0_15px_rgba(0,191,166,0.25)]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-[11px] sm:text-xs font-bold text-white truncate">{m.label}</p>
                  <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* SVG Visual Flow Schematic */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center relative z-10">
                {/* Node 1: Rooftop Array */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-2xl block mb-1">☀️ ➔ 🔲</span>
                  <p className="text-[11px] font-bold text-white">Bifacial Panels</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    {simulationMode === 'noon' ? 'Generates 5.4 kW' : simulationMode === 'evening' ? '0.0 kW (Idle)' : '1.8 kW (Diffuse)'}
                  </p>
                </div>

                {/* Node 2: MPPT Inverter */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-2xl block mb-1">⚡ ➔ ⚙️</span>
                  <p className="text-[11px] font-bold text-white">Smart Inverter</p>
                  <p className="text-[10px] text-[#00BFA6] font-mono mt-0.5">
                    {simulationMode === 'noon' ? '98.6% DC ➔ AC' : simulationMode === 'evening' ? 'Grid Sync Ready' : 'Low-Irradiance MPPT'}
                  </p>
                </div>

                {/* Node 3: Property Loads */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-2xl block mb-1">🏠 ➔ ❄️</span>
                  <p className="text-[11px] font-bold text-white">Active Loads</p>
                  <p className="text-[10px] text-amber-400 font-mono mt-0.5">
                    {simulationMode === 'noon' ? 'Consumes 2.0 kW' : simulationMode === 'evening' ? 'Consumes 2.2 kW' : 'Consumes 1.5 kW'}
                  </p>
                </div>

                {/* Node 4: Net Meter & Grid */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-2xl block mb-1">⇄ ➔ 🏛️</span>
                  <p className="text-[11px] font-bold text-white">DISCOM Grid</p>
                  <p className="text-[10px] text-cyan-300 font-mono mt-0.5">
                    {simulationMode === 'noon' ? '+3.4 kW Export' : simulationMode === 'evening' ? 'Offset with Credits' : 'Zero Net Import'}
                  </p>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6]" />
                  Status:{' '}
                  <strong className="text-white">
                    {simulationMode === 'noon'
                      ? 'Excess solar energy is currently exported to DISCOM for unit credits.'
                      : simulationMode === 'evening'
                      ? 'Household powered by daytime credits. Real-time net bill remains ₹0.'
                      : 'N-Type TOPCon cells capture UV spectrum during cloud cover with steady yield.'}
                  </strong>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Net Tariff: ₹0.00 / Unit</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
            <span>Grid Synchronization: <strong>50 Hz ± 0.5% (Indian Grid Code)</strong></span>
            <span className="text-[#00BFA6] font-mono">Bifacial Rear Albedo Gain: +15% to 20%</span>
          </div>
        </SpotlightCard>

        {/* ── BENTO 2: 25-YEAR TARIFF INFLATION CURVE (5 cols) ── */}
        <SpotlightCard
          className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col justify-between"
          spotlightColor="rgba(15, 157, 88, 0.1)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0b7542] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                Financial Physics
              </span>
              <span className="text-xs font-bold text-slate-500 font-mono">
                Compounding Model
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              The 25-Year Grid Tariff Inflation Trap
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              DISCOM tariffs in India compound at 6% annually. Solar fixes daytime energy at an amortized <strong>₹1.85/unit</strong>.
            </p>

            {/* Projection Horizon Tabs */}
            <div className="mb-4">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                Simulate Projection Horizon:
              </span>
              <div className="flex gap-1.5">
                {[5, 10, 15, 20, 25].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setComparisonYear(yr)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                      comparisonYear === yr
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Yr {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Comparison Bars */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
              {/* Grid Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-rose-700">Grid Tariff at Year {comparisonYear}</span>
                  <span className="font-mono font-black text-rose-600 text-sm">₹{gridRateAtYear} / kWh</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-rose-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (Number(gridRateAtYear) / 25) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Compounding at 6% yearly grid inflation</span>
              </div>

              {/* Solar Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-emerald-800">Neonix Solar Fixed Cost</span>
                  <span className="font-mono font-black text-[#0b7542] text-sm">₹{solarLcoe} / kWh</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#0b7542] to-[#00BFA6] h-3 rounded-full" 
                    style={{ width: '18%' }}
                  />
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">Zero inflation • 25-Year amortized capital yield</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-semibold">
            <span>Year {comparisonYear} Advantage:</span>
            <span className="text-[#0b7542] font-black text-sm bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Solar is {savingsFactor}x Cheaper
            </span>
          </div>
        </SpotlightCard>

        {/* ── BENTO 3: CAPITAL EFFICIENCY & TAX SHIELD (4 cols) ── */}
        <SpotlightCard
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          spotlightColor="rgba(217, 119, 6, 0.12)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xl">
                {selectedAudience === 'residential' ? '🏛️' : '💼'}
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {selectedAudience === 'residential' ? 'DBT Subsidy' : 'Tax Write-Off'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {selectedAudience === 'residential'
                ? 'PM Surya Ghar ₹78,000 Direct Bank Credit'
                : '40% Accelerated Tax Depreciation (Year 1)'}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {selectedAudience === 'residential'
                ? 'Under the 2026 Central Government scheme, eligible domestic installations up to 3 kW receive ₹78,000 transferred directly to your Aadhaar-linked bank account within 30 days.'
                : 'Commercial enterprises, institutions, and industrial setups can write off 40% of the entire solar capex in Year 1, significantly cutting corporate income tax.'}
            </p>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-900 font-mono">
              <div className="flex justify-between items-center font-bold">
                <span>{selectedAudience === 'residential' ? 'Central DBT Grant:' : 'Year 1 Tax Shield:'}</span>
                <span className="text-amber-800 text-sm font-black">
                  {selectedAudience === 'residential' ? '₹78,000' : '40% of Capex'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-amber-600">✓</span> Full paperwork handled by Neonix liaison engineers
          </div>
        </SpotlightCard>

        {/* ── BENTO 4: ASSET CLASS IRR BENCHMARK (4 cols) ── */}
        <SpotlightCard
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          spotlightColor="rgba(15, 157, 88, 0.08)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0b7542] flex items-center justify-center font-bold text-xl">
                📈
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                28.5% IRR
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Unmatched Risk-Adjusted Returns
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Solar delivers a 28%+ tax-free return through avoided expenses, completely unaffected by stock market fluctuations.
            </p>

            {/* Micro Return Comparison */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 font-bold">
                <span>⚡ Rooftop Solar</span>
                <span className="text-[#0b7542] font-black">28.5% (Tax-Free)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700">
                <span>📈 Equity Index (Nifty)</span>
                <span>~12.5% (Taxable)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700">
                <span>🏦 Fixed Deposit (FD)</span>
                <span>~7.0% (Taxable)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-emerald-600">✓</span> Payback: 3.2 – 3.8 years • Free power for 21+ years
          </div>
        </SpotlightCard>

        {/* ── BENTO 5: HARDWARE RELIABILITY (4 cols) ── */}
        <SpotlightCard
          className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          spotlightColor="rgba(0, 191, 166, 0.08)"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0d8070] flex items-center justify-center font-bold text-xl">
                🛡️
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                Tier-1 Hardware
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Engineered for 30+ Years Lifespan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Dual-glass Mono PERC Bifacial architecture eliminates micro-cracks and PID degradation, withstanding intense Indian dust and monsoon winds.
            </p>

            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs font-black text-slate-900 block">3.2mm</span>
                <span className="text-[10px] text-slate-500">Tempered Glass</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs font-black text-slate-900 block">IP68</span>
                <span className="text-[10px] text-slate-500">Junction Boxes</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-emerald-600">✓</span> 30-Year Linear Output Guarantee (&gt;84% at Yr 25)
          </div>
        </SpotlightCard>

      </div>

      {/* ── ENGINEERING SPECIFICATION DATA MATRIX ── */}
      <div className="mt-8 sm:mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0b7542]" />
              Engineering Benchmarks & Compliance Matrix ({selectedAudience === 'residential' ? 'Residential' : 'Commercial'})
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">Strict adherence to Indian Grid Codes, CEA standards, and MNRE guidelines.</p>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            IEC & ALMM CERTIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {engineeringSpecs.map((spec) => (
            <div key={spec.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  {spec.label}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {spec.value}
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 self-start mt-3">
                {spec.code}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MACRO IMPACT & EQUITY BAR ── */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#00BFA6] flex items-center justify-center text-2xl shrink-0 font-bold">
            🌱
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">120+ Metric Tons CO₂ Offset</h4>
            <p className="text-xs text-slate-300 mt-0.5">Equivalent to planting over 1,900 trees over 25 years.</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00BFA6]/20 text-[#00BFA6] flex items-center justify-center text-2xl shrink-0 font-bold">
            🏡
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">+4% to 7% Real Estate Equity</h4>
            <p className="text-xs text-slate-300 mt-0.5">Zero-electricity properties fetch higher appraisal & rent.</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl shrink-0 font-bold">
            📱
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">24/7 IoT Generation Telemetry</h4>
            <p className="text-xs text-slate-300 mt-0.5">Mobile app tracking of generation curve & saved rupees.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
