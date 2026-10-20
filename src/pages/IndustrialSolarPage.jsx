import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ServiceHeader from '../components/ServiceHeader';
import ServiceFooter from '../components/ServiceFooter';
import ConsultationModal from '../components/ConsultationModal';
import ScrollProgress from '../components/UI/ScrollProgress';
import CursorGlow from '../components/UI/CursorGlow';
import { SITE_CONFIG } from '../data';

export default function IndustrialSolarPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: null,
  });

  const [capacityKw, setCapacityKw] = useState(250);
  const [activeFaq, setActiveFaq] = useState(null);

  // Hot Lead Funnel
  const [leadShedArea, setLeadShedArea] = useState('25000');
  const [leadMonthlySpend, setLeadMonthlySpend] = useState('350000');
  const [leadCity, setLeadCity] = useState('Jaipur / Sitapura RIICO');
  const [leadIndustryType, setLeadIndustryType] = useState('Manufacturing / Engineering');
  const [leadVoltage, setLeadVoltage] = useState('11 kV HT Line');
  const [leadRoofMounting, setLeadRoofMounting] = useState('Non-Penetrating Seam Clamps');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPreference, setLeadPreference] = useState('blueprint_whatsapp'); // 'blueprint_whatsapp' | 'drone_feeder_audit'
  const [passToken, setPassToken] = useState('NX-IND-9912');
  const [copiedPass, setCopiedPass] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    const REVEAL_SELECTOR = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale';
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll(REVEAL_SELECTOR).forEach(el => revealObserver.observe(el));

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      delete window.__lenis;
      lenis.destroy();
      revealObserver.disconnect();
    };
  }, []);

  const handleOpenConsultation = (customData = {}) => {
    setModalState({
      isOpen: true,
      initialData: {
        connectionType: 'Industrial',
        ...customData,
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, initialData: null });
  };

  // Calculations
  const annualUnits = capacityKw * 1500;
  const annualSavings = annualUnits * 6.2;
  const estimatedCapex = capacityKw * 42000;
  const co2OffsetTons = Math.round(annualUnits * 0.00082);
  const irrPercent = (28.5 + (capacityKw > 500 ? 3.5 : 0)).toFixed(1);
  const paybackYears = (estimatedCapex / annualSavings).toFixed(1);

  // Dynamic user input metrics
  const customKw = Math.max(50, Math.round(Number(leadMonthlySpend || 350000) / 1200));
  const customAnnualSavings = Math.round(Number(leadMonthlySpend || 350000) * 0.70 * 12);
  const customCo2Offset = Math.round(customKw * 1500 * 0.00082);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(leadPhone.trim())) {
      alert('Please enter a valid 10-digit mobile number to receive your engineering simulation.');
      return;
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newToken = `NX-IND-${randomCode}`;
    setPassToken(newToken);
    setLeadSubmitted(true);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Industrial Feasibility Inquiry',
          phone: leadPhone.trim(),
          mobile: leadPhone.trim(),
          monthly_spend: leadMonthlySpend,
          monthly_bill: leadMonthlySpend,
          city: leadCity,
          location: `${leadCity}, Rajasthan`,
          voltage_line: leadVoltage,
          roof_mounting: leadRoofMounting,
          industry_type: leadIndustryType,
          calculated_kw: customKw,
          estimated_annual_savings: customAnnualSavings,
          estimated_co2_offset: customCo2Offset,
          delivery_preference: leadPreference,
          pass_token: newToken,
          connection_type: 'Industrial',
          property_type: 'Industrial',
          source: 'Industrial Solar Landing Page Engineering Simulation Pass',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Lead webhook push error:', err);
    }
  };


  const handleCopyPass = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passToken);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2500);
    }
  };

  const mountingSolutions = [
    {
      title: 'Klip-Lok Standing Seam Clamps',
      tag: 'Zero Roof Penetration',
      desc: 'Specialized aluminum seam clamps that clamp directly onto the ribs of standing seam metal roofs. Absolutely zero drilling or sheet puncture, ensuring 100% weather-tight factory protection.',
      specs: 'Wind Rated: 180 km/h • 10-Yr Leakproof Guarantee',
    },
    {
      title: 'Trapezoidal Sheet Short-Rail Clamps',
      tag: 'Lightweight & Aerodynamic',
      desc: 'High-grade anodized aluminum short rails fastened with EPDM gasketed rivets into the crown of industrial metal sheets. Drastically reduces structural dead-weight on factory trusses.',
      specs: 'Corrosion Class: C4/C5 • Ultra-fast installation',
    },
    {
      title: 'Elevated Industrial Ground Mounts',
      tag: 'Open Factory Plots',
      desc: 'Heavy-duty hot-dip galvanized steel ramming or pile foundation structures for factories with unutilized boundary land. Maximizes output with bifacial ground reflection gain.',
      specs: 'Tilt: Optimized 22°–26° • Dual Axis Compatible',
    },
  ];

  const industrialFaqs = [
    {
      q: 'Will solar installation cause any production shutdown in our factory?',
      a: 'Zero production downtime. Our civil and mechanical installation teams work entirely on your exterior shed roof or ground land with strict industrial safety protocols (PPE, lifelines, safety netting). Electrical switchgear interconnection and transformer synchronization are scheduled during your factory’s planned weekly off-day or scheduled maintenance shutdown.',
    },
    {
      q: 'Can our factory metal shed roof bear the weight of solar panels?',
      a: 'Neonix conducts a mandatory structural stability audit with certified civil engineers before installation. Standard Tier-1 solar arrays weigh only 12–15 kg/m², which is well within the design margins of pre-engineered buildings (PEBs) and industrial steel trusses. If needed, lightweight short-rail systems are used to minimize structural loading.',
    },
    {
      q: 'How does Neonix handle CEIG clearances and statutory approvals?',
      a: 'Industrial installations exceeding 50 kW require statutory permissions from the Chief Electrical Inspector to Government (CEIG) and state DISCOMs (JVVNL, AVVNL, etc.). Neonix prepares single line diagrams (SLD), protection relay coordination studies, transformer feasibility documents, and handles 100% of CEIG safety inspections on your behalf.',
    },
    {
      q: 'How does rooftop solar assist our European / American export ESG compliance?',
      a: 'Global supply chains increasingly mandate Scope-1 and Scope-2 carbon emission audits. A Neonix industrial solar plant provides verified green power generation certificates, significantly lowering your product’s carbon intensity per metric ton and helping you meet EU Carbon Border Adjustment Mechanism (CBAM) standards.',
    },
  ];

  return (
    <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#F59E0B] selection:text-white min-h-screen flex flex-col justify-between">
      <ScrollProgress />
      <CursorGlow />

      <ServiceHeader currentService="industrial" onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-grow pt-24">
        {/* ── BREADCRUMB ── */}
        <div className="bg-[#0B132B] border-b border-white/10 text-xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">Services</span>
            <span className="text-gray-600">/</span>
            <span className="text-[#F59E0B] font-semibold">Industrial Solar Power Plants</span>
          </div>
        </div>

        {/* ── TOP INDUSTRIAL URGENCY STRIP ── */}
        <div className="bg-[#070D1E] border-b border-white/10 text-white text-xs py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-2">
          <span className="bg-[#F59E0B] text-[#070D1E] font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
            Industrial Energy Audit
          </span>
          <span className="text-gray-200">
            Cut factory peak kVA demand penalties and achieve up to 34% IRR with custom non-penetrating shed solar.
          </span>
          <a href="#factory-funnel" className="text-[#F59E0B] font-bold hover:underline">
            Request Factory Engineering Simulation ↓
          </a>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#070D1E] text-white">
          <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 reveal-up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                    MW-Scale Turnkey EPC • Zero Factory Downtime
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
                  Heavy-Duty Solar Plants for{' '}
                  <span className="bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#00BFA6] bg-clip-text text-transparent">
                    Factories & Plants
                  </span>
                </h1>

                <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Transform massive factory shed roofs and unutilized industrial land into multi-megawatt captive solar assets. Cut heavy operational electricity bills, eliminate maximum demand penalties, and achieve 28%+ project IRR with zero factory downtime and non-penetrating leak-proof clamps.
                </p>

                {/* 4 Industrial Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#F59E0B]">28%+ IRR</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Bankable Return</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">50kW - 2MW</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Plant Scale</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#00BFA6]">0 Downtime</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">During Setup</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">CEIG Ready</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">100% Cleared</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#factory-funnel"
                    className="bg-[#F59E0B] hover:bg-[#D97706] text-[#070D1E] text-sm font-extrabold px-7 py-4 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Request Factory Engineering Audit</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`}
                    className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>📞 Head of Projects: {SITE_CONFIG.contact.primaryPhone}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="lg:col-span-5 reveal-scale">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-2">
                  <img
                    src="/images/industrial-solar.webp"
                    alt="High capacity industrial solar plant on a manufacturing factory warehouse"
                    className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl"
                    width="600"
                    height="420"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5 bg-[#0F172A]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase font-semibold">Manufacturing Energy Asset</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">
                        High Tension (HT) Substation Sync
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1.5 rounded-lg border border-[#F59E0B]/20">
                      IEC / MNRE Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FACTORY ENGINEERING HOT LEAD SIMULATION FORM ── */}
        <section id="factory-funnel" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-10 relative z-20">
          <div className="bg-white rounded-3xl border-2 border-[#F59E0B]/40 shadow-[0_20px_60px_rgba(245,158,11,0.2)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#451A03] text-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  HT Grid Substation & CEIG Pre-Check
                </span>
                <span className="text-[11px] font-semibold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                  Rajasthan Industrial HT Solar Division
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {leadSubmitted ? '🎉 Your Industrial Feasibility Pass is Active!' : 'Request Structural Load & Substation Synchronization Audit'}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {leadSubmitted
                  ? `Your industrial project pass has been generated. Er. R. K. Singhal is verifying HT transformer feeder feasibility for ${leadCity}.`
                  : 'Our Chief EPC Engineers will inspect your industrial shed trusses, evaluate transformer capacity, and deliver a bankable financial simulation.'}
              </p>
            </div>

            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="p-6 sm:p-8 bg-[#F8FAFC]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Available Roof Shed Area:
                    </label>
                    <select
                      value={leadShedArea}
                      onChange={(e) => setLeadShedArea(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="10000">10,000 sq ft (~100 kW)</option>
                      <option value="25000">25,000 sq ft (~250 kW)</option>
                      <option value="50000">50,000 sq ft (~500 kW)</option>
                      <option value="100000">1,00,000+ sq ft (1 MW+ Plant)</option>
                      <option value="ground">Unutilized Factory Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Industrial Belt / RIICO Zone:
                    </label>
                    <select
                      value={leadCity}
                      onChange={(e) => setLeadCity(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="Jaipur / Sitapura RIICO">Jaipur / Sitapura RIICO</option>
                      <option value="Bhiwadi Industrial Area">Bhiwadi / Neemrana Industrial</option>
                      <option value="Boranada / Jodhpur">Boranada / Jodhpur Industrial</option>
                      <option value="Bhilwara Textile Belt">Bhilwara Textile Belt</option>
                      <option value="Kishangarh Marble Zone">Kishangarh Marble Zone</option>
                      <option value="Sukher / Udaipur">Sukher / Udaipur</option>
                      <option value="Kota Industrial Area">Kota Industrial Area</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Supply Line Voltage:
                    </label>
                    <select
                      value={leadVoltage}
                      onChange={(e) => setLeadVoltage(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="11 kV HT Line">11 kV HT Dedicated Feeder</option>
                      <option value="33 kV HT Line">33 kV Extra High Tension</option>
                      <option value="415V LT Connection">415V Three-Phase LT</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Industry Sector:
                    </label>
                    <select
                      value={leadIndustryType}
                      onChange={(e) => setLeadIndustryType(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="Manufacturing / Engineering">Manufacturing & Heavy Engineering</option>
                      <option value="Textile & Spinning Mills">Textile, Dyeing & Spinning Mills</option>
                      <option value="Cold Storage / Food Processing">Cold Storage & Food Processing</option>
                      <option value="Steel & Auto Ancillary">Steel Fabrication & Auto Parts</option>
                      <option value="Plastics & Injection Moulding">Plastics & Injection Moulding</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Avg Monthly Power Spend:
                    </label>
                    <input
                      type="number"
                      min="50000"
                      max="100000000"
                      step="25000"
                      value={leadMonthlySpend}
                      onChange={(e) => setLeadMonthlySpend(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">In ₹ (HT tariff ~₹7.80 - ₹8.90/u)</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Plant Head / MD Mobile (WhatsApp):
                    </label>
                    <input
                      id="industrial-lead-phone"
                      type="tel"
                      maxLength="10"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Engineering blueprint delivery</span>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Roof Mounting Clamp Specification:
                  </label>
                  <select
                    value={leadRoofMounting}
                    onChange={(e) => setLeadRoofMounting(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="Non-Penetrating Seam Clamps">Klip-Lok Standing Seam Clamps (100% Zero Puncture, No Leaks Guaranteed)</option>
                    <option value="Trapezoidal Sheet Short-Rail Clamps">Trapezoidal Sheet Short-Rail Clamps with EPDM Gaskets (Lightweight)</option>
                    <option value="Ballasted Non-Invasive RCC Mount">Ballasted Non-Invasive RCC Mount (Wind-Tunnel Tested)</option>
                  </select>
                </div>

                {/* Confirmation Preference Selector */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Select Your Preferred Technical Delivery:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLeadPreference('blueprint_whatsapp')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        leadPreference === 'blueprint_whatsapp'
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10 ring-2 ring-[#F59E0B]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">⚡</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Instant CAD Layout & HT Feasibility (WhatsApp)</div>
                        <div className="text-[11px] text-gray-500">Includes kVA peak shaving analysis and single-line diagram (SLD)</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLeadPreference('drone_feeder_audit')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        leadPreference === 'drone_feeder_audit'
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10 ring-2 ring-[#F59E0B]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">🏭</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">On-Site Factory LiDAR & Structural Audit</div>
                        <div className="text-[11px] text-gray-500">Chief industrial engineer inspects shed purlins and CEIG earthing</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dynamic Instant Calculation Ribbon */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gray-400">Target Solar Array</span>
                    <div className="text-2xl font-black text-[#111827]">{customKw} kWp Industrial Plant</div>
                    <span className="text-[10px] text-gray-500">Tier-1 Bifacial HT Array</span>
                  </div>
                  <div className="sm:border-l border-gray-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase text-gray-400">Annual Power Cost Cut</span>
                    <div className="text-2xl font-black text-[#D97706]">₹{(customAnnualSavings / 100000).toFixed(1)} Lakhs / Yr</div>
                    <span className="text-[10px] text-gray-500">Tariff drops to ~₹2.10/u levelized</span>
                  </div>
                  <div className="sm:border-l border-gray-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase text-gray-400">Annual CO2 Offset</span>
                    <div className="text-2xl font-black text-[#0F9D58]">{customCo2Offset} Tons / Yr</div>
                    <span className="text-[10px] text-gray-500">ESG & Green Supply Chain Compliance</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#070D1E] font-black py-4 px-6 rounded-xl text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Factory Feasibility Blueprint & Priority Pass</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            ) : (
              /* ── CONFIRMATORY INDUSTRIAL HOT LEAD PASS CARD ── */
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#FFFBEB] to-white border-t border-[#F59E0B]/30">
                <div className="bg-white border-2 border-[#F59E0B] rounded-2xl p-6 shadow-xl relative overflow-hidden mb-6">
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-[#F59E0B]/15 text-[#B45309] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#F59E0B]/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    CEIG Pre-Clearance Priority
                  </div>

                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Neonix Industrial Solar Sanction Pass
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-1 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-wider">
                        {passToken}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPass}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-300 transition-all flex items-center gap-1"
                      >
                        {copiedPass ? '✓ Copied' : '📋 Copy Token'}
                      </button>
                    </div>
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                      ✓ HT Feasibility Queued for {leadCity}
                    </span>
                  </div>

                  {/* Summary Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-gray-200/80 mb-5">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Array Capacity</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">{customKw} kWp HT Grid</div>
                      <div className="text-[10px] text-gray-500">Line: {leadVoltage}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Annual OPEX Cut</div>
                      <div className="text-sm font-black text-[#B45309] mt-0.5">₹{(customAnnualSavings / 100000).toFixed(1)} Lakhs</div>
                      <div className="text-[10px] text-gray-500">Levelized: ₹2.10/u</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Mounting Clamping</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">Zero Puncture Seam</div>
                      <div className="text-[10px] text-gray-500">10-Yr Leakproof</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">CEIG Liaisoning</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">100% Handled</div>
                      <div className="text-[10px] text-[#0F9D58] font-bold">Fast-Track Sanction</div>
                    </div>
                  </div>

                  {/* Assigned Industrial Director Card */}
                  <div className="bg-[#0F172A] text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center font-black text-lg text-[#070D1E] shadow-md">
                        RS
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          Er. R. K. Singhal
                          <span className="text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded font-semibold">
                            Chief Industrial Solar Director
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          Former DISCOM HT Grid Consultant. Assigned to verify transformer reverse-power relay and single-line diagram (SLD).
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Liaison Status</span>
                      <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 justify-end">
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                        HT Feasibility In Progress
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Confirmatory Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919910000774?text=${encodeURIComponent(
                      `Hi Er. R. K. Singhal, I have generated Neonix Industrial Solar Pass #${passToken}.\n\n` +
                      `🏭 Industry: ${leadIndustryType}\n` +
                      `📍 Industrial Zone: ${leadCity}\n` +
                      `⚡ Supply Line: ${leadVoltage}\n` +
                      `📐 Roof Area: ${leadShedArea} sq ft\n` +
                      `💰 Monthly Power Spend: ₹${leadMonthlySpend}\n` +
                      `🔩 Mounting: ${leadRoofMounting}\n` +
                      `📊 Target Array: ${customKw} kWp\n` +
                      `💵 Expected Annual Savings: ₹${(customAnnualSavings / 100000).toFixed(1)} Lakhs\n\n` +
                      `Please WhatsApp the factory engineering feasibility blueprint, single-line diagram (SLD), and CEIG pre-clearance timeline.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬 Chat on WhatsApp with Er. R. K. Singhal</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>📞 Call Industrial Solar Desk</span>
                  </a>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setLeadSubmitted(false)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline transition-colors"
                  >
                    ← Want to adjust monthly power spend or shed area? Recalculate here
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── INTERACTIVE INDUSTRIAL SCALE SIMULATOR ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3.5 py-1.5 rounded-full border border-[#D97706]/20">
              Capacity & Yield Calculator
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
              Industrial Plant Scale & Carbon Simulator
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Select your factory’s connected load or available shed area to calculate annual electricity generation, operating expense reduction, and carbon offset.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden max-w-5xl mx-auto p-6 sm:p-10">
            {/* Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="industrial-slider" className="text-sm font-bold text-gray-700">
                  Select Plant Capacity:
                </label>
                <div className="text-2xl sm:text-3xl font-black text-[#D97706] bg-[#D97706]/10 px-4 py-1 rounded-xl">
                  {capacityKw >= 1000 ? `${(capacityKw / 1000).toFixed(1)} MW` : `${capacityKw} kWp`}
                </div>
              </div>
              <input
                id="industrial-slider"
                type="range"
                min="50"
                max="1000"
                step="25"
                value={capacityKw}
                onChange={(e) => setCapacityKw(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>50 kWp (Small Workshop)</span>
                <span>250 kWp (Medium Factory)</span>
                <span>1,000 kWp (1 Megawatt Plant)</span>
              </div>
            </div>

            {/* Financial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Annual Generation
                </span>
                <div className="text-2xl font-black text-[#111827]">
                  {annualUnits.toLocaleString('en-IN')} kWh
                </div>
                <p className="text-[11px] text-gray-500 mt-1">~1,500 units per kWp / year</p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Annual Power Savings
                </span>
                <div className="text-2xl font-black text-[#0B7542]">
                  ₹{Math.round(annualSavings).toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-[#0F9D58] font-semibold mt-1">Direct OPEX cost reduction</p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Projected IRR & Payback
                </span>
                <div className="text-2xl font-black text-[#D97706]">
                  {irrPercent}% / {paybackYears} Yrs
                </div>
                <p className="text-[11px] text-gray-500 mt-1">High financial internal return</p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  CO2 Offset (ESG)
                </span>
                <div className="text-2xl font-black text-[#00BFA6]">
                  {co2OffsetTons} Tons/Yr
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Assists Scope-2 export compliance</p>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="bg-[#0F172A] text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider">
                  Turnkey EPC Capital Estimate
                </span>
                <div className="text-3xl font-black text-white mt-0.5">
                  ₹{Math.round(estimatedCapex).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Estimated Shed Area Needed: ~{(capacityKw * 65).toLocaleString('en-IN')} sq. ft. • HT/LT Transformer sync included
                </p>
              </div>

              <button
                onClick={() => handleOpenConsultation({ bill: String(leadMonthlySpend), connectionType: `${capacityKw}kW Industrial Solar` })}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#070D1E] text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap"
              >
                Request Plant Technical Proposal →
              </button>
            </div>
          </div>
        </section>

        {/* ── SPECIALIZED MOUNTING ENGINEERING ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3.5 py-1.5 rounded-full">
                Shed Protection Standards
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
                Engineered for High Wind Speeds & Leak-Proof Metal Roofs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {mountingSolutions.map((sol) => (
                <div key={sol.title} className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <span className="text-[11px] font-bold text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-md mb-3 inline-block">
                      {sol.tag}
                    </span>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{sol.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">{sol.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 text-xs font-semibold text-gray-700">
                    {sol.specs}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIAL FAQS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3.5 py-1.5 rounded-full">
              Factory Owner FAQs
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
              Industrial Solar Questions & Answers
            </h2>
          </div>

          <div className="space-y-3">
            {industrialFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] hover:text-[#D97706] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#F59E0B] text-[#070D1E]' : 'bg-gray-100 text-gray-600'}`}>
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#070D1E] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
              Industrial Engineering Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-4 mb-4">
              Turn Your Factory Roof into an Energy Generating Powerhouse
            </h2>
            <p className="text-gray-300 text-xs sm:text-base mb-8 max-w-xl mx-auto">
              Our EPC project leaders will visit your manufacturing facility, conduct a structural load test, and deliver an engineering simulation within 3 days.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenConsultation({ note: 'Industrial Bottom CTA audit booking' })}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#070D1E] text-xs sm:text-sm font-extrabold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                Schedule Factory Structural & Energy Audit
              </button>
              <a
                href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`}
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-4 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span>📞 {SITE_CONFIG.contact.primaryPhone}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.secondaryPhoneRaw}`}
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-4 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span>📞 {SITE_CONFIG.contact.secondaryPhone}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ServiceFooter />

      <ConsultationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialData={modalState.initialData}
      />
    </div>
  );
}
