import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ServiceHeader from '../components/ServiceHeader';
import ServiceFooter from '../components/ServiceFooter';
import ConsultationModal from '../components/ConsultationModal';
import ScrollProgress from '../components/UI/ScrollProgress';
import CursorGlow from '../components/UI/CursorGlow';

export default function CommercialSolarPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: null,
  });

  const [capacityKw, setCapacityKw] = useState(50);
  const [hasDg, setHasDg] = useState(true);
  const [dgHours, setDgHours] = useState(2);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('hospitals');

  // Hot Lead Form
  const [leadFacilityType, setLeadFacilityType] = useState('Hospital / Clinic');
  const [leadOrgName, setLeadOrgName] = useState('');
  const [leadCity, setLeadCity] = useState('Jaipur');
  const [leadSanctionLoad, setLeadSanctionLoad] = useState('50 - 100 kVA');
  const [leadBill, setLeadBill] = useState('65000');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPreference, setLeadPreference] = useState('cfo_deck'); // 'cfo_deck' | 'site_audit'
  const [passToken, setPassToken] = useState('NX-CORP-7729');
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
        connectionType: 'Commercial',
        ...customData,
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, initialData: null });
  };

  // Calculations
  const monthlyUnits = capacityKw * 130;
  const solarEnergyValue = monthlyUnits * 7.1; // Net monthly savings
  const annualCashSavings = solarEnergyValue * 12;
  const estimatedCapex = capacityKw * 48000;
  const year1TaxShield = (estimatedCapex * 0.40) * 0.25; // 40% AD at 25% tax
  const annualDgSavings = hasDg ? (dgHours * 300 * (capacityKw * 0.45 * 28)) / 10 : 0; // DG fuel savings
  const paybackYears = (estimatedCapex / (annualCashSavings + (year1TaxShield / 3) + annualDgSavings)).toFixed(1);
  const lifetimeProfit = (annualCashSavings * 25) - estimatedCapex;

  // Dynamic user input metrics
  const customKw = Math.max(10, Math.round(Number(leadBill || 65000) / 1300));
  const customCapex = customKw * 48000;
  const customTaxShield = Math.round(customCapex * 0.40 * 0.25);
  const customAnnualSavings = Math.round(Number(leadBill || 65000) * 0.72 * 12);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(leadPhone.trim())) {
      alert('Please enter a valid 10-digit mobile number to receive your CFO Memo.');
      return;
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newToken = `NX-CORP-${randomCode}`;
    setPassToken(newToken);
    setLeadSubmitted(true);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadOrgName || 'Commercial Inquiry',
          organization_name: leadOrgName,
          phone: leadPhone.trim(),
          mobile: leadPhone.trim(),
          city: leadCity,
          location: `${leadCity}, Rajasthan`,
          sanction_load: leadSanctionLoad,
          monthly_bill: leadBill,
          business_type: leadFacilityType,
          facility_type: leadFacilityType,
          calculated_kw: customKw,
          estimated_capex: customCapex,
          estimated_tax_shield: customTaxShield,
          estimated_annual_savings: customAnnualSavings,
          delivery_preference: leadPreference,
          pass_token: newToken,
          connection_type: 'Commercial',
          property_type: 'Commercial',
          source: 'Commercial Solar Landing Page CFO Memo',
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

  const sectors = [
    {
      id: 'hospitals',
      title: 'Hospitals & Medical Centres',
      tag: 'Critical Uninterrupted Power',
      icon: '🏥',
      description: 'Hospitals operate 24/7 with massive daytime loads from HVAC, MRI/CT scanners, ICUs, and lighting. Solar provides immediate cost relief with zero voltage fluctuations.',
      keyPoints: [
        'DG-Solar synchronization cuts hospital diesel expenses by up to 65%',
        'Stabilizes sensitive diagnostic equipment power supply',
        'Demonstrates ESG green healthcare compliance to patients & boards',
      ],
      typicalSize: '25 kW to 150 kW',
    },
    {
      id: 'schools',
      title: 'Schools, Colleges & Universities',
      tag: 'Perfect 100% Daytime Match',
      icon: '🎓',
      description: 'Academic institutions consume over 85% of their electricity between 8:00 AM and 4:00 PM—matching peak solar generation hours with zero battery storage required.',
      keyPoints: [
        'Massive open RCC building roof area utilized efficiently',
        'Direct educational value: students learn real-world sustainability',
        'Cuts campus operational overheads to reinvest in education',
      ],
      typicalSize: '30 kW to 250 kW',
    },
    {
      id: 'offices',
      title: 'Corporate Offices & IT Tech Parks',
      tag: '40% Tax Depreciation Shield',
      icon: '🏢',
      description: 'Commercial high-rises and IT firms face steep commercial tariffs (₹9–₹12/unit). Turn your building roof into an asset that shelters corporate tax profits.',
      keyPoints: [
        'Claim 40% Accelerated Depreciation in Year 1 under Section 32',
        'Significantly lowers monthly common area maintenance (CAM) costs',
        'Earns vital points for LEED & IGBC Green Building Certification',
      ],
      typicalSize: '20 kW to 200 kW',
    },
    {
      id: 'retail',
      title: 'Hotels, Showrooms & Petrol Pumps',
      tag: 'High Air-Conditioning Offsets',
      icon: '🛍️',
      description: 'Air conditioning and retail lighting drive massive summer peak demand penalties. Solar generation peaks exactly when your chillers and display lights work hardest.',
      keyPoints: [
        'Protects against state DISCOM annual commercial tariff hikes',
        'Net-metering banks surplus weekend generation for weekday use',
        'Attracts eco-conscious commercial clientele and guests',
      ],
      typicalSize: '15 kW to 100 kW',
    },
  ];

  const commercialFaqs = [
    {
      q: 'How does 40% Accelerated Depreciation (AD) reduce our corporate tax?',
      a: 'Under Section 32 of the Indian Income Tax Act, commercial and industrial enterprises can claim 40% depreciation on the capital cost of a solar installation in the first financial year (if commissioned before Sept 30; 20% if commissioned later). This substantial deduction reduces your taxable profit, shielding substantial cash flow and cutting the effective payback period down to 2.5–3 years.',
    },
    {
      q: 'What is DG-Solar Synchronization and why is it essential for businesses?',
      a: 'Most commercial facilities operate diesel generators during grid outages. Standard grid-tied inverters automatically shut down during outages to prevent islanding. With a Neonix Smart DG-Sync Controller, the solar inverter stays alive and dynamically throttles its output to supply up to 70% of the building load while maintaining a minimum 30% load on the generator to prevent reverse current feed. This slashes expensive diesel fuel consumption dramatically.',
    },
    {
      q: 'Can we install solar with zero upfront capital under the RESCO / OPEX model?',
      a: 'Yes! In the OPEX/RESCO model, a third-party clean energy fund finances, installs, and maintains the solar plant on your commercial roof at zero upfront cost to your company. You simply buy clean solar electricity from the rooftop system at a predetermined tariff 20% to 30% lower than your current DISCOM grid rate.',
    },
    {
      q: 'Can we install solar on rented or leased commercial premises?',
      a: 'Yes! If you hold a long-term commercial lease (e.g. 5+ years) and obtain a No Objection Certificate (NOC) from the property owner, you can install a commercial solar plant. Alternatively, modular clamp structures can be dismantled and reinstalled at a new facility if your business relocates.',
    },
  ];

  return (
    <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#00BFA6] selection:text-white min-h-screen flex flex-col justify-between">
      <ScrollProgress />
      <CursorGlow />

      <ServiceHeader currentService="commercial" onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-grow pt-24">
        {/* ── BREADCRUMB ── */}
        <div className="bg-[#0B132B] border-b border-white/10 text-xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">Services</span>
            <span className="text-gray-600">/</span>
            <span className="text-[#00BFA6] font-semibold">Commercial Rooftop Solar</span>
          </div>
        </div>

        {/* ── TOP B2B ANNOUNCEMENT STRIP ── */}
        <div className="bg-[#070D1E] text-white text-xs py-2.5 px-4 text-center border-b border-white/10 flex flex-wrap items-center justify-center gap-2">
          <span className="bg-[#00BFA6] text-[#070D1E] font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
            CFO Tax Alert
          </span>
          <span className="text-gray-200">
            Commission your commercial solar asset to write off 40% of project cost under Section 32 Accelerated Depreciation this financial year.
          </span>
          <a href="#cfo-funnel" className="text-[#00BFA6] font-bold hover:underline">
            Generate 1-Page Board Proposal ↓
          </a>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#0B132B] via-[#0F172A] to-[#070D1E] text-white">
          <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-[#00BFA6]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 reveal-up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00BFA6]/15 border border-[#00BFA6]/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00BFA6]">
                    40% Tax Depreciation Shield • DG-Sync Fuel Saver
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
                  Cut Commercial Power Costs from ₹10/Unit to{' '}
                  <span className="bg-gradient-to-r from-[#00BFA6] via-[#2DD4BF] to-[#0F9D58] bg-clip-text text-transparent">
                    ₹2.40/Unit
                  </span>
                </h1>

                <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Commercial electricity tariffs are eating your business operating margins. Neonix engineers turnkey rooftop solar solutions for offices, hospitals, schools, and retail buildings with <strong className="text-white font-bold">40% accelerated tax depreciation</strong> and smart DG-Solar synchronization that slashes diesel generator bills by up to 70%.
                </p>

                {/* 4 Commercial Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#00BFA6]">40% AD</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">IT Act Section 32</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">~2.8 Yrs</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Capital Payback</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#0F9D58]">70% Cut</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">In Diesel Generator</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">Zero CapEx</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">OPEX / RESCO Model</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#cfo-funnel"
                    className="bg-[#00BFA6] hover:bg-[#009688] text-[#070D1E] text-sm font-extrabold px-7 py-4 rounded-xl shadow-[0_0_25px_rgba(0,191,166,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Generate Executive CFO Proposal</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="tel:+919910000774"
                    className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>📞 Call Commercial Lead: +91 99100 00774</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="lg:col-span-5 reveal-scale">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-2">
                  <img
                    src="/images/commercial-solar.webp"
                    alt="Commercial rooftop solar system installed on an office and commercial institution"
                    className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl"
                    width="600"
                    height="420"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5 bg-[#0F172A]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase font-semibold">Corporate Energy Asset</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">
                        High-Yield Tier-1 Bifacial PV Arrays
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#00BFA6] bg-[#00BFA6]/10 px-3 py-1.5 rounded-lg border border-[#00BFA6]/20">
                      LEED Points Boost
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INSTANT B2B / CFO BOARD PROPOSAL GENERATOR ── */}
        <section id="cfo-funnel" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-10 relative z-20">
          <div className="bg-white rounded-3xl border-2 border-[#00BFA6]/40 shadow-[0_20px_60px_rgba(0,191,166,0.2)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#04361E] text-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#00BFA6]/20 text-[#00BFA6] border border-[#00BFA6]/30 text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" />
                  Section 32 Tax Shield & DG Sync Model
                </span>
                <span className="text-[11px] font-semibold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                  C&I Commercial Solar Division
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {leadSubmitted ? '🎉 Your Commercial Solar Pass is Active!' : 'Get a 1-Page Solar Financial Proposal for Your Board or CA'}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {leadSubmitted
                  ? `Your corporate executive pass is ready. Er. Vikramaditya Rathore is compiling your 40% depreciation tax shield analysis.`
                  : 'Enter your commercial facility details to calculate exact corporate tax savings, DG generator fuel reduction, and payback timeline.'}
              </p>
            </div>

            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="p-6 sm:p-8 bg-[#F8FAFC]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Facility / Institution Type:
                    </label>
                    <select
                      value={leadFacilityType}
                      onChange={(e) => setLeadFacilityType(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    >
                      <option value="Hospital / Clinic">Hospital / Diagnostic Centre</option>
                      <option value="School / College">School / College / University</option>
                      <option value="Corporate Office">Corporate Office / IT Park</option>
                      <option value="Hotel / Resort">Hotel / Banquet Hall</option>
                      <option value="Retail Showroom">Retail Showroom / Mall</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Business / Institution Name:
                    </label>
                    <input
                      type="text"
                      value={leadOrgName}
                      onChange={(e) => setLeadOrgName(e.target.value)}
                      placeholder="e.g. Apex Hospital / Heritage Hotel"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Printed on your executive memo</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      City / Region:
                    </label>
                    <select
                      value={leadCity}
                      onChange={(e) => setLeadCity(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    >
                      <option value="Jaipur">Jaipur (JVVNL)</option>
                      <option value="Jodhpur">Jodhpur (JdVVNL)</option>
                      <option value="Kota / Bundi">Kota / Bundi (JdVVNL/JVVNL)</option>
                      <option value="Udaipur">Udaipur (AVVNL)</option>
                      <option value="Alwar / Bhiwadi">Alwar / Bhiwadi</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Sanctioned Load (kVA):
                    </label>
                    <select
                      value={leadSanctionLoad}
                      onChange={(e) => setLeadSanctionLoad(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    >
                      <option value="25 - 50 kVA">25 - 50 kVA LT Connection</option>
                      <option value="50 - 100 kVA">50 - 100 kVA LT / HT</option>
                      <option value="100 - 250 kVA">100 - 250 kVA 11 kV HT</option>
                      <option value="250 kVA+">250 kVA+ Heavy Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Avg Monthly Power Bill:
                    </label>
                    <input
                      type="number"
                      min="15000"
                      max="5000000"
                      step="5000"
                      value={leadBill}
                      onChange={(e) => setLeadBill(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">In ₹ (Commercial tariff ~₹8.50/u)</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      WhatsApp Mobile (CFO/Director):
                    </label>
                    <input
                      id="commercial-lead-phone"
                      type="tel"
                      maxLength="10"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Direct PDF delivery</span>
                  </div>
                </div>

                {/* DG Synchronization Toggle */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="dg-check"
                      checked={hasDg}
                      onChange={(e) => setHasDg(e.target.checked)}
                      className="w-5 h-5 text-[#00BFA6] rounded cursor-pointer"
                    />
                    <div>
                      <label htmlFor="dg-check" className="text-xs font-bold text-gray-800 cursor-pointer block">
                        We Operate Diesel Generators (DG) During Outages
                      </label>
                      <span className="text-[11px] text-gray-500">
                        Neonix DG-Sync controller saves up to 70% in expensive diesel fuel costs!
                      </span>
                    </div>
                  </div>

                  {hasDg && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span>Avg DG Run:</span>
                      <select
                        value={dgHours}
                        onChange={(e) => setDgHours(Number(e.target.value))}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-2.5 py-1 text-xs"
                      >
                        <option value="1">1 Hour / Day</option>
                        <option value="2">2 Hours / Day</option>
                        <option value="4">4+ Hours / Day</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Delivery Mode Selector */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Select Your Preferred Delivery Channel:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLeadPreference('cfo_deck')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        leadPreference === 'cfo_deck'
                          ? 'border-[#00BFA6] bg-[#00BFA6]/10 ring-2 ring-[#00BFA6]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">📊</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Instant WhatsApp CFO Board Deck</div>
                        <div className="text-[11px] text-gray-500">1-Page PDF financial memo with 40% AD tax shield math</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLeadPreference('site_audit')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        leadPreference === 'site_audit'
                          ? 'border-[#00BFA6] bg-[#00BFA6]/10 ring-2 ring-[#00BFA6]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">🏛️</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Boardroom Presentation & Site Audit</div>
                        <div className="text-[11px] text-gray-500">Senior commercial engineer visits for technical appraisal</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dynamic Instant Financial Ribbon */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gray-400">Optimum System Sizing</span>
                    <div className="text-2xl font-black text-[#0B132B]">{customKw} kWp Array</div>
                    <span className="text-[10px] text-gray-500">Tier-1 Bifacial PV Modules</span>
                  </div>
                  <div className="sm:border-l border-gray-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase text-gray-400">Year 1 Income Tax Shield</span>
                    <div className="text-2xl font-black text-[#00BFA6]">₹{customTaxShield.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-gray-500">40% Accelerated Depreciation (Sec 32)</span>
                  </div>
                  <div className="sm:border-l border-gray-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase text-gray-400">Est. Annual Cash Savings</span>
                    <div className="text-2xl font-black text-[#0F9D58]">₹{customAnnualSavings.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-gray-500">Direct operational cost reduction</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00BFA6] hover:bg-[#009688] text-[#070D1E] font-black py-4 px-6 rounded-xl text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(0,191,166,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Generate Executive CFO Proposal & Commercial Pass</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            ) : (
              /* ── CONFIRMATORY CORPORATE HOT LEAD PASS CARD ── */
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#F0FDFA] to-white border-t border-[#00BFA6]/30">
                <div className="bg-white border-2 border-[#00BFA6] rounded-2xl p-6 shadow-xl relative overflow-hidden mb-6">
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-[#00BFA6]/15 text-[#0D8070] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#00BFA6]/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6]" />
                    Corporate Priority Queue Active
                  </div>

                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Neonix Commercial Solar Board Pass
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
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                      ✓ Executive Dossier Ready for {leadOrgName || leadFacilityType}
                    </span>
                  </div>

                  {/* Summary Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-gray-200/80 mb-5">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Array Capacity</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">{customKw} kWp Grid-Tied</div>
                      <div className="text-[10px] text-gray-500">Load: {leadSanctionLoad}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Year 1 Tax Shield</div>
                      <div className="text-sm font-black text-[#0D8070] mt-0.5">₹{customTaxShield.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-gray-500">40% AD Benefit</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Annual Power Cut</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">₹{customAnnualSavings.toLocaleString('en-IN')} / Yr</div>
                      <div className="text-[10px] text-gray-500">72% Tariff Savings</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">DG Fuel Savings</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">{hasDg ? 'Up to 70% Cut' : 'N/A (Grid Only)'}</div>
                      <div className="text-[10px] text-[#0F9D58] font-bold">Zero-Export Ready</div>
                    </div>
                  </div>

                  {/* Assigned Commercial Lead Card */}
                  <div className="bg-[#0F172A] text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#00BFA6] flex items-center justify-center font-black text-lg text-[#070D1E] shadow-md">
                        VR
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          Er. Vikramaditya Rathore
                          <span className="text-[10px] bg-[#00BFA6]/20 text-[#00BFA6] px-2 py-0.5 rounded font-semibold">
                            Chief Commercial Solar Engineer
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          Assigned to compile your Board/CA financial memorandum and transformer net-metering layout.
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Dispatch Status</span>
                      <span className="text-xs font-bold text-[#00BFA6] flex items-center gap-1 justify-end">
                        <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-ping" />
                        Executive Dossier Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Confirmatory Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919910000774?text=${encodeURIComponent(
                      `Hi Er. Vikramaditya, I have generated Neonix Commercial Solar Pass #${passToken}.\n\n` +
                      `🏢 Organization: ${leadOrgName || leadFacilityType}\n` +
                      `📍 City: ${leadCity}\n` +
                      `⚡ Sanction Load: ${leadSanctionLoad}\n` +
                      `💰 Avg Monthly Bill: ₹${leadBill}\n` +
                      `🚜 DG Generator: ${hasDg ? 'Yes (Sync Needed)' : 'No'}\n` +
                      `📊 Estimated System: ${customKw} kWp\n` +
                      `💵 Year 1 Tax Shield: ₹${customTaxShield.toLocaleString('en-IN')}\n\n` +
                      `Please WhatsApp the 1-page Executive CFO Memo and Section 32 depreciation schedule for our CA.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬 Chat on WhatsApp with Er. Vikramaditya</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="tel:+919910000774"
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>📞 Call Commercial Solar Hotline</span>
                  </a>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setLeadSubmitted(false)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline transition-colors"
                  >
                    ← Want to adjust monthly bill or facility parameters? Recalculate here
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── INTERACTIVE COMMERCIAL ROI & TAX SHIELD SIMULATOR ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D8070] bg-[#0D8070]/10 px-3.5 py-1.5 rounded-full border border-[#0D8070]/20">
              C&I Financial Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
              Commercial ROI & Tax Shield Simulator
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Slide to your facility’s estimated capacity to evaluate cash savings, accelerated depreciation tax write-offs, and project payback.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden max-w-5xl mx-auto p-6 sm:p-10">
            {/* Slider Control */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="capacity-slider" className="text-sm font-bold text-gray-700">
                  Select System Capacity:
                </label>
                <div className="text-2xl sm:text-3xl font-black text-[#0D8070] bg-[#0D8070]/10 px-4 py-1 rounded-xl">
                  {capacityKw} kWp
                </div>
              </div>
              <input
                id="capacity-slider"
                type="range"
                min="10"
                max="250"
                step="5"
                value={capacityKw}
                onChange={(e) => setCapacityKw(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00BFA6]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>10 kW (Offices / Clinics)</span>
                <span>100 kW (Schools / Hotels)</span>
                <span>250 kW (Campuses / Hospitals)</span>
              </div>
            </div>

            {/* Live Financial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Monthly Generation
                </span>
                <div className="text-2xl font-black text-[#111827]">
                  {monthlyUnits.toLocaleString('en-IN')} Units
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Replaces grid tariff @ ₹9.50/unit</p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Annual Power Savings
                </span>
                <div className="text-2xl font-black text-[#0B7542]">
                  ₹{Math.round(annualCashSavings).toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-[#0F9D58] font-semibold mt-1">
                  ~₹{Math.round(solarEnergyValue).toLocaleString('en-IN')}/mo in cash
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Year-1 Tax Shield (40% AD)
                </span>
                <div className="text-2xl font-black text-[#00BFA6]">
                  ₹{Math.round(year1TaxShield).toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Written off against corporate profit</p>
              </div>

              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Capital Payback
                </span>
                <div className="text-2xl font-black text-[#111827]">
                  {paybackYears} Years
                </div>
                <p className="text-[11px] text-[#0B7542] font-semibold mt-1">22+ Years of free electricity</p>
              </div>
            </div>

            {/* Detailed Summary Strip */}
            <div className="bg-[#0B132B] text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-[#00BFA6] font-bold uppercase tracking-wider">
                  25-Year Cumulative Business Profit
                </span>
                <div className="text-3xl font-black text-white mt-0.5">
                  ₹{Math.round(lifetimeProfit).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Estimated Capital Cost: ₹{Math.round(estimatedCapex).toLocaleString('en-IN')} • Rooftop Area Required: ~{capacityKw * 70} sq. ft.
                </p>
              </div>

              <button
                onClick={() => handleOpenConsultation({ bill: String(leadBill), connectionType: `${capacityKw}kW Commercial Solar` })}
                className="bg-[#00BFA6] hover:bg-[#009688] text-[#070D1E] text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap"
              >
                Get Custom Feasibility Report →
              </button>
            </div>
          </div>
        </section>

        {/* ── SECTOR TAILORED SOLUTIONS ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D8070] bg-[#0D8070]/10 px-3.5 py-1.5 rounded-full">
                Tailored Solutions
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
                Engineered for Your Specific Industry Needs
              </h2>
            </div>

            {/* Sector Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {sectors.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`px-4 sm:px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                    activeTab === sec.id
                      ? 'bg-[#0B132B] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.title}</span>
                </button>
              ))}
            </div>

            {/* Active Tab Card */}
            {(() => {
              const current = sectors.find((s) => s.id === activeTab) || sectors[0];
              return (
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-8 max-w-4xl mx-auto shadow-md">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0D8070]">
                        {current.tag}
                      </span>
                      <h3 className="text-2xl font-extrabold text-[#111827] mt-1">{current.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-xl">
                      Typical Plant: {current.typicalSize}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{current.description}</p>

                  <div className="space-y-3 mb-8">
                    {current.keyPoints.map((pt) => (
                      <div key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                        <span className="text-[#00BFA6] font-bold text-base leading-none">✓</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-gray-500">Includes complete DISCOM liaisoning & CEIG approvals</span>
                    <button
                      onClick={() => handleOpenConsultation({ note: `Requested blueprint for ${current.title}` })}
                      className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all"
                    >
                      Request {current.title} Blueprint
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── COMMERCIAL FAQS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D8070] bg-[#0D8070]/10 px-3.5 py-1.5 rounded-full">
              Corporate FAQs
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
              Commercial Solar Questions Answered
            </h2>
          </div>

          <div className="space-y-3">
            {commercialFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] hover:text-[#0D8070] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#00BFA6] text-[#070D1E]' : 'bg-gray-100 text-gray-600'}`}>
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
        <section className="bg-gradient-to-r from-[#0B132B] via-[#0F172A] to-[#070D1E] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BFA6] bg-[#00BFA6]/10 px-3 py-1 rounded-full border border-[#00BFA6]/20">
              Free Site Audit Available
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-4 mb-4">
              Lower Your Commercial Electricity Tariffs Today
            </h2>
            <p className="text-gray-300 text-xs sm:text-base mb-8 max-w-xl mx-auto">
              Our engineering team will assess your connected load, tariff structure, and rooftop area to present an investment memorandum within 48 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenConsultation({ note: 'Commercial Bottom CTA audit booking' })}
                className="bg-[#00BFA6] hover:bg-[#009688] text-[#070D1E] text-xs sm:text-sm font-extrabold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(0,191,166,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                Schedule Commercial Energy Audit
              </button>
              <a
                href="tel:+919910000774"
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-4 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span>📞 +91 99100 00774</span>
              </a>
              <a
                href="tel:+919088688899"
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-4 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span>📞 +91 90886 88899</span>
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
