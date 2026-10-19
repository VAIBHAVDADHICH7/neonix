import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ServiceHeader from '../components/ServiceHeader';
import ServiceFooter from '../components/ServiceFooter';
import ConsultationModal from '../components/ConsultationModal';
import ScrollProgress from '../components/UI/ScrollProgress';
import CursorGlow from '../components/UI/CursorGlow';

export default function SolarAmcPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: null,
  });

  const [activeFaq, setActiveFaq] = useState(null);

  // Hot Lead Audit Tool State
  const [auditCapacity, setAuditCapacity] = useState('5');
  const [auditMonthlyUnits, setAuditMonthlyUnits] = useState('420');
  const [auditCity, setAuditCity] = useState('Jaipur');
  const [cleaningStatus, setCleaningStatus] = useState('infrequent'); // 'never' | 'infrequent' | 'hardwater'
  const [auditSymptoms, setAuditSymptoms] = useState(['dust', 'pigeons']);
  const [auditPhone, setAuditPhone] = useState('');
  const [auditPreference, setAuditPreference] = useState('trial_clean'); // 'trial_clean' | 'whatsapp_prescription'
  const [passToken, setPassToken] = useState('NX-AMC-4418');
  const [copiedPass, setCopiedPass] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [activeThermalView, setActiveThermalView] = useState('thermal'); // 'normal' | 'thermal'

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
        connectionType: 'AMC & Maintenance',
        ...customData,
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, initialData: null });
  };

  // Health Audit Grade computation
  const idealExpectedUnits = Number(auditCapacity || 5) * 125;
  const currentUnitsNum = Number(auditMonthlyUnits || 420);
  const efficiencyRatio = Math.min(100, Math.round((currentUnitsNum / Math.max(1, idealExpectedUnits)) * 100));
  const healthGrade = efficiencyRatio >= 90 ? 'A (Healthy)' : efficiencyRatio >= 75 ? 'B (Moderate Soiling)' : 'C (Severe Bleed)';
  const monthlyMoneyLossEst = Math.max(0, Math.round((idealExpectedUnits - currentUnitsNum) * 7.5));
  const recoveredMoneyEst = Math.round(monthlyMoneyLossEst * 12 * 0.90);

  const toggleSymptom = (sym) => {
    setAuditSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(auditPhone.trim())) {
      alert('Please enter a valid 10-digit mobile number to receive your prescription report.');
      return;
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newToken = `NX-AMC-${randomCode}`;
    setPassToken(newToken);
    setAuditSubmitted(true);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Solar AMC Audit Inquiry',
          phone: auditPhone.trim(),
          mobile: auditPhone.trim(),
          city: auditCity,
          location: `${auditCity}, Rajasthan`,
          plant_kw: auditCapacity,
          capacity_kw: auditCapacity,
          monthly_units: auditMonthlyUnits,
          cleaning_status: cleaningStatus,
          symptoms: auditSymptoms.join(', '),
          delivery_preference: auditPreference,
          pass_token: newToken,
          service_type: 'Solar Care & AMC Maintenance',
          source: 'Solar Care & AMC Page Health Prescription Audit',
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

  const amcPlans = [
    {
      id: 'residential-care',
      name: 'Home Solar Care',
      tag: 'For 1kW - 10kW Homes',
      badgeColor: '#0F9D58',
      price: 'From ₹499 / Month',
      popular: false,
      desc: 'Ideal for villas and bungalows looking for hassle-free peak electricity bill savings.',
      features: [
        '12 Scheduled Cleaning Visits (Demineralized soft water)',
        'Quarterly Inverter Error Code & Firmware Inspection',
        'Annual Earth Resistance & Earthing Pit Check (<2 Ohms)',
        'Free Emergency Breakdown Assistance (<24 Hr Response)',
        'Comprehensive Generation Performance Health Card',
        '15% Generation Boost Money-Back Guarantee',
      ],
    },
    {
      id: 'commercial-pro',
      name: 'Commercial Pro Care',
      tag: 'For 10kW - 100kW Businesses',
      badgeColor: '#00BFA6',
      price: 'Custom Corporate SLA',
      popular: true,
      desc: 'Engineered for hospitals, institutions, and offices where power continuity is business-critical.',
      features: [
        '24 Cleaning Cycles/Year (Fortnightly professional cleaning)',
        'Semi-Annual Infrared Drone Thermography (Hotspot scan)',
        'DG-Solar Synchronization Tuning & Power Quality Audit',
        'Dedicated Technical Account Manager & WhatsApp Hotline',
        'Guaranteed Generation SLA with Performance Ratio Tracking',
        'Priority Spare Parts & Replacement Loaner Inverter',
      ],
    },
    {
      id: 'industrial-mw',
      name: 'Industrial Megawatt O&M',
      tag: 'For 100kW - 2MW+ Plants',
      badgeColor: '#3B82F6',
      price: 'Utility-Grade Contract',
      popular: false,
      desc: 'Comprehensive Operation & Maintenance for heavy manufacturing plants and logistics hubs.',
      features: [
        'On-Site / Dedicated Rapid Response Engineering Crew',
        'Robotic / Semi-Automated Panel Washing Deployment',
        'HT/LT Substation, Transformer & Relay Calibration',
        'SCADA Remote 24/7 Generation Telemetry Monitoring',
        'Statutory CEIG Re-Certification & Discom Liaisoning',
        'Custom Monthly Generation & ESG Carbon Audit Reports',
      ],
    },
  ];

  const amcFaqs = [
    {
      q: 'Why should I not wash solar panels with ordinary borewell/tap water?',
      a: 'Borewell and tap water in Rajasthan and North India has high TDS (Total Dissolved Solids) and heavy mineral hardness (calcium, magnesium). When hard water evaporates on hot glass, it leaves a chalky white mineral film called "scaling". This scale cannot be removed with a wiper, causes permanent shadow hotspots, accelerates cell browning, and can void your manufacturer warranty. Neonix cleans exclusively with reverse-osmosis (RO) demineralized water (TDS < 50 ppm) and specialized soft-bristle solar brushes.',
    },
    {
      q: 'What is thermal imaging and why is it essential for solar safety?',
      a: 'A single microcrack in a solar cell or a failing bypass diode creates high electrical resistance, causing the affected cell to heat up beyond 90°C–130°C (known as a hotspot). Hotspots are invisible to the naked eye but glow brightly on our FLIR infrared thermal cameras. If neglected, hotspots burn holes through the backsheet and pose severe rooftop fire risks. Our thermal scans catch these defects before disaster strikes.',
    },
    {
      q: 'Can Neonix maintain my solar plant if it was installed by another company?',
      a: 'Yes, absolutely! Over 40% of our AMC clients originally installed solar through local vendors or contractors who have since closed down or stopped answering calls. Neonix conducts a comprehensive 18-Point System Health Audit to diagnose wiring flaws, replace faulty inverters, and restore your plant to peak generation.',
    },
    {
      q: 'What is your 15% Generation Boost Money-Back Guarantee?',
      a: 'We are so confident in our laboratory-grade RO washing and electrical tuning that if your solar plant generation does not increase by at least 15% after our first deep cleaning and health audit, we will refund 100% of your service fee with zero questions asked.',
    },
    {
      q: 'What is your guaranteed response time for system breakdowns?',
      a: 'For residential care customers, we provide on-site technical inspection within 24 to 48 business hours. For Commercial and Industrial Pro customers with critical generation SLAs, we provide guaranteed emergency technical response within 12 to 24 hours.',
    },
  ];

  return (
    <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#3B82F6] selection:text-white min-h-screen flex flex-col justify-between">
      <ScrollProgress />
      <CursorGlow />

      <ServiceHeader currentService="amc" onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-grow pt-24">
        {/* ── BREADCRUMB ── */}
        <div className="bg-[#0B132B] border-b border-white/10 text-xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">Services</span>
            <span className="text-gray-600">/</span>
            <span className="text-[#60A5FA] font-semibold">Solar Care & AMC Services</span>
          </div>
        </div>

        {/* ── TOP HOT-LEAD URGENCY STRIP ── */}
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs font-bold py-2.5 px-4 text-center shadow-inner flex flex-wrap items-center justify-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded uppercase text-[10px] tracking-wider animate-pulse">
            ⚠️ Attention Solar Owners
          </span>
          <span className="text-white font-medium">
            Every 30 days without professional RO cleaning loses 15% to 30% of power. Stop washing with hard borewell water that permanently burns panel glass!
          </span>
          <a
            href="#hot-lead-card"
            className="underline hover:text-white font-extrabold ml-1 text-white"
          >
            Check Your Plant Health Free ↓
          </a>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white">
          <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[#3B82F6]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 reveal-up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
                    15% Generation Boost Guarantee • 100% Refundable
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
                  Is Your Solar Plant{' '}
                  <span className="bg-gradient-to-r from-red-400 via-amber-400 to-[#60A5FA] bg-clip-text text-transparent">
                    Bleeding Money
                  </span>{' '}
                  on Your Roof?
                </h1>

                <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Dust, bird droppings, and invisible electrical micro-hotspots destroy up to <strong className="text-white font-bold">35% of solar power output</strong> in Rajasthan. Neonix restores peak generation with <strong className="text-[#60A5FA] font-bold">RO demineralized water cleaning</strong>, FLIR infrared thermal scans, and certified inverter maintenance.
                </p>

                {/* 4 AMC Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#60A5FA]">+15-35%</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Power Recovered</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">TDS &lt; 50</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">RO Pure Water</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#00BFA6]">FLIR Scan</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Fire Risk Check</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">₹999 Trial</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">No-Risk Offer</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#hot-lead-card"
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold px-7 py-4 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Instant Plant Health Check</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="https://api.whatsapp.com/send?phone=919910000774&text=Hi%20Neonix,%20my%20solar%20plant%20generation%20is%20dropping.%20I%20want%20to%20book%20a%20health%20audit."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-sm font-bold px-6 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>💬 WhatsApp Solar Doctor</span>
                  </a>
                </div>

                <div className="flex items-center gap-4 mt-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-[#60A5FA]">✓ Any Brand / Any Installer Serviced</span>
                  <span className="flex items-center gap-1 text-[#60A5FA]">✓ 100% Money-Back Guarantee</span>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="lg:col-span-5 reveal-scale">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-2">
                  <img
                    src="/images/amc-solar.webp"
                    alt="Solar panel cleaning and professional maintenance technician inspecting rooftop solar array"
                    className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl"
                    width="600"
                    height="420"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5 bg-[#0F172A]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase font-semibold">Special Introductory Trial</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">
                        Deep RO Cleaning + 18-Point Diagnostic
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#60A5FA] bg-[#60A5FA]/10 px-3 py-1.5 rounded-lg border border-[#60A5FA]/20">
                      Just ₹999 Trial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE CONFIRMATORY HOT LEAD GENERATION SCORECARD ── */}
        <section id="hot-lead-card" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-8 relative z-20">
          <div className="bg-white rounded-3xl border-2 border-[#3B82F6]/40 shadow-[0_20px_60px_rgba(59,130,246,0.2)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#04361E] text-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#60A5FA]/20 text-[#60A5FA] border border-[#60A5FA]/30 text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
                  30-Second Online Diagnostic
                </span>
                <span className="text-[11px] font-semibold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                  100% Refundable ₹999 Trial
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {auditSubmitted ? '🎉 Your Solar Care Trial Pass is Active!' : 'Solar Health Scorecard & Lost Revenue Calculator'}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {auditSubmitted
                  ? `Your priority trial pass has been issued. Er. Mukesh Saini is preparing your demineralized soft water cleaning crew.`
                  : 'Enter your plant capacity and last month’s generation to discover if your panels are underperforming and calculate cash bleeding.'}
              </p>
            </div>

            {!auditSubmitted ? (
              <form onSubmit={handleAuditSubmit} className="p-6 sm:p-8 bg-[#F8FAFC]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Your System Size (kW):
                    </label>
                    <select
                      value={auditCapacity}
                      onChange={(e) => setAuditCapacity(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    >
                      <option value="3">3 kW (Small Home)</option>
                      <option value="5">5 kW (Standard Home)</option>
                      <option value="10">10 kW (Large Villa)</option>
                      <option value="25">25 kW (School / Clinic)</option>
                      <option value="50">50 kW (Hospital / Office)</option>
                      <option value="100">100 kW+ (Factory / Plant)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Last Month Generation (Units):
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="50000"
                      value={auditMonthlyUnits}
                      onChange={(e) => setAuditMonthlyUnits(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      placeholder="e.g. 420"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Inverter app or DISCOM bill</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Your City in Rajasthan:
                    </label>
                    <select
                      value={auditCity}
                      onChange={(e) => setAuditCity(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    >
                      <option value="Jaipur">Jaipur (High Dust Zone)</option>
                      <option value="Jodhpur">Jodhpur (Desert/Sandy)</option>
                      <option value="Kota">Kota (Industrial Zone)</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Bikaner">Bikaner</option>
                      <option value="Ajmer">Ajmer</option>
                      <option value="Other">Other Rajasthan City</option>
                    </select>
                  </div>
                </div>

                {/* Visible Symptoms Checklist */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Select All Visible Symptoms Observed on Your Plant:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'dust', label: '🌫️ Heavy Dust / Cement Layer' },
                      { id: 'pigeons', label: '🕊️ Pigeon Droppings / Nests' },
                      { id: 'hardwater', label: '🚰 White Hard-Water Scaling' },
                      { id: 'hotspots', label: '🔍 Discolored / Yellowed Cells' },
                      { id: 'inverter', label: '⚡ Inverter Error / Red Light' },
                    ].map((s) => {
                      const isSelected = auditSymptoms.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleSymptom(s.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {isSelected ? `✓ ${s.label}` : s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cleaning History Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Last Time Panels Were Washed:
                    </label>
                    <select
                      value={cleaningStatus}
                      onChange={(e) => setCleaningStatus(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    >
                      <option value="infrequent">More than 30 Days Ago</option>
                      <option value="never">Never Washed by Professionals</option>
                      <option value="hardwater">Washed with Tap / Borewell Water</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      WhatsApp Mobile Number:
                    </label>
                    <input
                      id="amc-audit-phone"
                      type="tel"
                      maxLength="10"
                      value={auditPhone}
                      onChange={(e) => setAuditPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">For instant diagnostic prescription</span>
                  </div>
                </div>

                {/* Service Preference Selector */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Select Your Trial Preference:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAuditPreference('trial_clean')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        auditPreference === 'trial_clean'
                          ? 'border-[#3B82F6] bg-[#3B82F6]/10 ring-2 ring-[#3B82F6]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">🎁</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">₹999 Deep Clean Trial (Zero Risk)</div>
                        <div className="text-[11px] text-gray-500">Demineralized wash + FLIR scan. 15% yield gain or 100% refund!</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuditPreference('whatsapp_prescription')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        auditPreference === 'whatsapp_prescription'
                          ? 'border-[#3B82F6] bg-[#3B82F6]/10 ring-2 ring-[#3B82F6]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">⚡</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Instant WhatsApp Diagnostic PDF</div>
                        <div className="text-[11px] text-gray-500">Detailed breakdown of money bleeding and restoration plan</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dynamic Diagnostic Output Strip */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    <div className="py-2 sm:py-0">
                      <span className="text-[11px] font-bold uppercase text-gray-400">Current Health Grade</span>
                      <div className={`text-xl font-black mt-1 ${efficiencyRatio >= 85 ? 'text-[#0F9D58]' : efficiencyRatio >= 70 ? 'text-amber-500' : 'text-red-600'}`}>
                        {healthGrade}
                      </div>
                      <span className="text-[10px] text-gray-400">Operating at {efficiencyRatio}% efficiency</span>
                    </div>

                    <div className="py-2 sm:py-0">
                      <span className="text-[11px] font-bold uppercase text-gray-400">Expected Monthly Output</span>
                      <div className="text-xl font-black text-gray-800 mt-1">
                        {idealExpectedUnits} Units
                      </div>
                      <span className="text-[10px] text-gray-400">Standard for sunny conditions</span>
                    </div>

                    <div className="py-2 sm:py-0">
                      <span className="text-[11px] font-bold uppercase text-red-500">Estimated Monthly Bleed</span>
                      <div className="text-xl font-black text-red-600 mt-1">
                        {monthlyMoneyLossEst > 0 ? `₹${monthlyMoneyLossEst.toLocaleString('en-IN')} / mo` : '₹0 (Peak Generation)'}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {monthlyMoneyLossEst > 0 ? `~₹${(monthlyMoneyLossEst * 12).toLocaleString('en-IN')} lost annually` : 'Optimal generation!'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-black py-4 px-6 rounded-xl text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Claim ₹999 Deep Clean Trial Slot & Health Pass</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            ) : (
              /* ── CONFIRMATORY AMC HOT LEAD PASS CARD ── */
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#EFF6FF] to-white border-t border-[#3B82F6]/30">
                <div className="bg-white border-2 border-[#3B82F6] rounded-2xl p-6 shadow-xl relative overflow-hidden mb-6">
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-[#3B82F6]/15 text-[#1D4ED8] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#3B82F6]/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    ₹999 Zero-Risk Trial Reserved
                  </div>

                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Neonix Solar Health Pass
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
                    <span className="text-xs font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-lg border border-blue-300">
                      ✓ 15% Generation Gain Guaranteed or 100% Refund
                    </span>
                  </div>

                  {/* Summary Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-gray-200/80 mb-5">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Plant Capacity</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">{auditCapacity} kW Rooftop</div>
                      <div className="text-[10px] text-gray-500">Grade: {healthGrade.split(' ')[0]}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Current Loss Bleed</div>
                      <div className="text-sm font-black text-red-600 mt-0.5">₹{monthlyMoneyLossEst} / mo</div>
                      <div className="text-[10px] text-gray-500">~₹{monthlyMoneyLossEst * 12}/yr lost</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Recoverable Gain</div>
                      <div className="text-sm font-extrabold text-[#0F9D58] mt-0.5">+15% to 32% Units</div>
                      <div className="text-[10px] text-gray-500">₹{recoveredMoneyEst}/yr back</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Service Zone</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">{auditCity}</div>
                      <div className="text-[10px] text-[#2563EB] font-bold">Crew Available</div>
                    </div>
                  </div>

                  {/* Assigned Field Service Lead Card */}
                  <div className="bg-[#0F172A] text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center font-bold text-lg text-white shadow-md">
                        MS
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          Er. Mukesh Saini
                          <span className="text-[10px] bg-[#3B82F6]/20 text-[#60A5FA] px-2 py-0.5 rounded font-semibold">
                            Lead FLIR Thermographer
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          Assigned to dispatch high-pressure demineralized soft water crew with infrared thermal hotspot scanner.
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Dispatch Status</span>
                      <span className="text-xs font-bold text-[#60A5FA] flex items-center gap-1 justify-end">
                        <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-ping" />
                        Trial Dispatch Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Confirmatory Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919910000774?text=${encodeURIComponent(
                      `Hi Er. Mukesh, I have generated Neonix Solar Care Pass #${passToken}.\n\n` +
                      `⚡ Plant Capacity: ${auditCapacity} kW\n` +
                      `📍 City: ${auditCity}\n` +
                      `📉 Monthly Generation: ${auditMonthlyUnits} units\n` +
                      `🏥 Health Grade: ${healthGrade}\n` +
                      `💸 Estimated Cash Bleed: ₹${monthlyMoneyLossEst}/month\n` +
                      `🔍 Observed Symptoms: ${auditSymptoms.join(', ')}\n` +
                      `🎁 Trial Type: ₹999 Zero-Risk Deep Cleaning (15% Boost Guarantee)\n\n` +
                      `Please confirm my ₹999 deep clean slot and WhatsApp my full plant diagnostic prescription.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬 Chat on WhatsApp with Er. Mukesh</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="tel:+919910000774"
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>📞 Call Solar Care Desk</span>
                  </a>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setAuditSubmitted(false)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline transition-colors"
                  >
                    ← Want to test another plant capacity or units? Recalculate here
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── INTERACTIVE THERMAL HOTSPOT VISUALIZER ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 px-3.5 py-1.5 rounded-full">
                Invisible Rooftop Fire Risk
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
                Why Standard Visual Inspection Misses 90% of Solar Faults
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                A solar panel looks completely clean to the human eye, but an infrared thermal scan reveals defective cells burning at over 90°C.
              </p>
            </div>

            {/* Interactive Toggle */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setActiveThermalView('normal')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeThermalView === 'normal'
                    ? 'bg-[#111827] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                👁️ Naked Eye Camera View (Looks Normal)
              </button>
              <button
                onClick={() => setActiveThermalView('thermal')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeThermalView === 'thermal'
                    ? 'bg-red-600 text-white shadow-md animate-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🔥 Neonix FLIR Thermal View (Detects 98°C Hotspot!)
              </button>
            </div>

            {/* Display Simulator */}
            <div className="bg-[#0F172A] rounded-3xl overflow-hidden border border-gray-300 shadow-2xl relative max-w-3xl mx-auto">
              {activeThermalView === 'normal' ? (
                <div className="relative p-8 text-center min-h-[320px] flex flex-col items-center justify-center bg-gradient-to-b from-slate-700 to-slate-900 text-white">
                  <div className="text-5xl mb-3">☀️</div>
                  <span className="text-xs font-bold uppercase text-gray-300">Standard Optical View</span>
                  <h3 className="text-lg font-bold text-white mt-1">The solar array appears completely fine</h3>
                  <p className="text-xs text-gray-400 max-w-md mt-2">
                    No visible damage, no smoke, no broken glass. Yet this exact panel is losing 40% generation due to a blown bypass diode.
                  </p>
                </div>
              ) : (
                <div className="relative p-8 text-center min-h-[320px] flex flex-col items-center justify-center bg-gradient-to-b from-amber-900 via-red-950 to-purple-950 text-white">
                  <div className="text-5xl mb-3 animate-bounce">🚨</div>
                  <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                    FLIR Infrared Thermal Scan
                  </span>
                  <h3 className="text-xl font-black text-red-400 mt-1">
                    CRITICAL HAZARD: Cell Temp 94.6°C Detected!
                  </h3>
                  <p className="text-xs text-gray-200 max-w-md mt-2 leading-relaxed">
                    Internal microcrack causing severe electrical resistance hotspot. Unchecked, this will burn through the EVA backsheet and trip your entire string inverter.
                  </p>
                  <div className="mt-4 inline-block bg-red-600/30 border border-red-500 text-red-200 px-3 py-1 rounded-full text-xs font-bold">
                    ✓ Caught in Neonix 18-Point Diagnostic Before Fire Occurred
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 3 STRUCTURED AMC PLANS ── */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 px-3.5 py-1.5 rounded-full">
                Maintenance Plans
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
                Transparent Solar Care Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {amcPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-3xl p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative overflow-hidden ${
                    plan.popular ? 'border-[#00BFA6] ring-2 ring-[#00BFA6]' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-4 right-4 bg-[#00BFA6] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{ backgroundColor: plan.badgeColor }}
                  />
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white inline-block mb-3"
                      style={{ backgroundColor: plan.badgeColor }}
                    >
                      {plan.tag}
                    </span>
                    <h3 className="text-2xl font-black text-[#111827] mb-1">{plan.name}</h3>
                    <div className="text-lg font-bold text-gray-700 mb-4">{plan.price}</div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">{plan.desc}</p>

                    <ul className="space-y-3 text-xs text-gray-700">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="text-[#0F9D58] font-bold text-sm leading-none">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => handleOpenConsultation({ note: `Inquired about ${plan.name}` })}
                      className={`w-full text-xs font-bold py-3.5 rounded-xl transition-colors ${
                        plan.popular
                          ? 'bg-[#00BFA6] hover:bg-[#009688] text-white'
                          : 'bg-[#111827] hover:bg-[#3B82F6] text-white'
                      }`}
                    >
                      Choose {plan.name} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 18-POINT DIAGNOSTIC CHECKLIST ── */}
        <section className="py-16 sm:py-24 bg-[#070D1E] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#60A5FA] bg-[#60A5FA]/10 px-3.5 py-1.5 rounded-full border border-[#60A5FA]/20">
                Medical Checkup for Your Solar Plant
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">
                Our 18-Point Solar Plant Inspection Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {[
                'RO Demineralized Water Washing (TDS < 50 ppm)',
                'Scratch-Free Microfiber Rotary Brushing',
                'FLIR Infrared Thermal Scan for Hotspots',
                'Bypass Diode & Junction Box Heat Check',
                'Inverter Heatsink & Cooling Fan Cleaning',
                'Inverter Firmware Update & Error Log Audit',
                'String-Level Voc & Isc Electrical Tracing',
                'DC/AC MC4 Connector Tightness & Corrosion Check',
                'Earth Pit Resistance Measurement (< 2 Ohms)',
                'Chemical Earth Electrode Re-watering',
                'Lightning Arrestor Air Terminal Continuity',
                'Structural Hot-Dip Bolt Torque Re-tightening',
                'Structural Galvanization Rust Inspection',
                'Cable Conduit & Rodent Damage Check',
                'ACDB & DCDB Surge Protection Device (SPD) Test',
                'Bidirectional Net-Meter Calibration Verification',
                'Solar Generation vs Sun Irradiance Ratio Audit',
                'Comprehensive Digital Health Card to Customer',
              ].map((item, idx) => (
                <div key={item} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-[#60A5FA] font-bold text-sm">{idx + 1}.</span>
                  <span className="text-gray-300 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AMC FAQS ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 px-3.5 py-1.5 rounded-full">
              Maintenance FAQs
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
              Solar Care & AMC Questions Answered
            </h2>
          </div>

          <div className="space-y-3">
            {amcFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] hover:text-[#2563EB] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-600'}`}>
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
        <section className="bg-gradient-to-r from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#60A5FA] bg-[#60A5FA]/10 px-3 py-1 rounded-full border border-[#60A5FA]/20">
              Zero Risk Guarantee
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-4 mb-4">
              Try Our Deep Clean & Thermal Health Audit for Just ₹999
            </h2>
            <p className="text-gray-300 text-xs sm:text-base mb-8 max-w-xl mx-auto">
              If your power generation doesn't jump by at least 15%, we refund 100% of your ₹999 on the spot. Even if your original installer disappeared, Neonix brings your solar plant back to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenConsultation({ note: 'Booked ₹999 Deep Clean Trial from Bottom CTA' })}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-bold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                Claim ₹999 Trial Clean (100% Refundable)
              </button>
              <a
                href="tel:+919910000774"
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-7 py-4 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span>📞 Call Service Line: +91 99100 00774</span>
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
