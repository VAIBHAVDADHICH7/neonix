import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ServiceHeader from '../components/ServiceHeader';
import ServiceFooter from '../components/ServiceFooter';
import ConsultationModal from '../components/ConsultationModal';
import ScrollProgress from '../components/UI/ScrollProgress';
import CursorGlow from '../components/UI/CursorGlow';

export default function ResidentialSolarPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: null,
  });

  const [systemSize, setSystemSize] = useState(3);
  const [activeFaq, setActiveFaq] = useState(null);

  // Hot Lead Funnel States
  const [leadMonthlyBill, setLeadMonthlyBill] = useState('4500');
  const [leadPincode, setLeadPincode] = useState('302020');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadDiscom, setLeadDiscom] = useState('JVVNL (Jaipur & Eastern Rajasthan)');
  const [leadRoofType, setLeadRoofType] = useState('Flat RCC Terrace (Full Access)');
  const [leadPreference, setLeadPreference] = useState('whatsapp'); // 'whatsapp' | 'drone_survey'
  const [passToken, setPassToken] = useState('NX-RAJ-8842');
  const [copiedPass, setCopiedPass] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [activeBillProof, setActiveBillProof] = useState('jaipur');

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
        connectionType: 'Residential',
        ...customData,
      },
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, initialData: null });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(leadPhone.trim())) {
      alert('Please enter a valid 10-digit mobile number to receive your 3D layout & subsidy token.');
      return;
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newToken = `NX-RAJ-${randomCode}`;
    setPassToken(newToken);
    setLeadSubmitted(true);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Residential Solar Inquiry',
          phone: leadPhone.trim(),
          mobile: leadPhone.trim(),
          pincode: leadPincode || '302020',
          city: 'Jaipur',
          state: 'Rajasthan',
          monthly_bill: leadMonthlyBill,
          discom: leadDiscom,
          roof_type: leadRoofType,
          preference: leadPreference,
          pass_token: newToken,
          connection_type: 'Residential',
          property_type: 'Residential',
          location: `Rajasthan - ${leadPincode || '302020'}`,
          source: 'Residential Solar Landing Page Inline Feasibility Pass',
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

  // Residential Calculations Table
  const sizeOptions = [
    {
      kw: 1,
      label: '1 kW',
      idealFor: '1-2 BHK Flat / Small House (Fans, Lights, TV, Refrigerator)',
      roofArea: '70 sq. ft.',
      monthlyUnits: '120 - 135 units',
      billBefore: '₹1,200',
      billAfter: '₹150 (Fixed charges)',
      grossCost: 65000,
      subsidy: 30000,
      netCost: 35000,
      monthlyEmi: '₹1,150',
      annualSavings: '₹12,600',
      paybackYears: '2.8 Yrs',
      lifetimeSavings: '₹3,78,000',
    },
    {
      kw: 2,
      label: '2 kW',
      idealFor: '2-3 BHK Home (1 Inverter AC + Fridge + Washing Machine)',
      roofArea: '140 sq. ft.',
      monthlyUnits: '240 - 270 units',
      billBefore: '₹2,500',
      billAfter: '₹200 (Fixed charges)',
      grossCost: 125000,
      subsidy: 60000,
      netCost: 65000,
      monthlyEmi: '₹1,950',
      annualSavings: '₹27,600',
      paybackYears: '2.4 Yrs',
      lifetimeSavings: '₹8,28,000',
    },
    {
      kw: 3,
      label: '3 kW (Most Popular)',
      idealFor: '3-4 BHK Independent Villa (2 Inverter ACs + All Appliances)',
      roofArea: '210 sq. ft.',
      monthlyUnits: '360 - 410 units',
      billBefore: '₹4,200',
      billAfter: '₹250 (Fixed charges)',
      grossCost: 185000,
      subsidy: 78000,
      netCost: 107000,
      monthlyEmi: '₹2,850',
      annualSavings: '₹47,400',
      paybackYears: '2.3 Yrs',
      lifetimeSavings: '₹14,22,000',
    },
    {
      kw: 5,
      label: '5 kW (High Savings)',
      idealFor: 'Large Independent Bungalow (3-4 ACs, Geysers, Water Pump)',
      roofArea: '350 sq. ft.',
      monthlyUnits: '600 - 680 units',
      billBefore: '₹7,500',
      billAfter: '₹350 (Fixed charges)',
      grossCost: 295000,
      subsidy: 78000,
      netCost: 217000,
      monthlyEmi: '₹4,950',
      annualSavings: '₹85,800',
      paybackYears: '2.5 Yrs',
      lifetimeSavings: '₹25,74,000',
    },
    {
      kw: 7,
      label: '7 kW',
      idealFor: 'Duplex / Joint Family Villa (4-5 ACs + Electric Vehicle)',
      roofArea: '490 sq. ft.',
      monthlyUnits: '840 - 950 units',
      billBefore: '₹11,000',
      billAfter: '₹450 (Fixed charges)',
      grossCost: 395000,
      subsidy: 78000,
      netCost: 317000,
      monthlyEmi: '₹6,850',
      annualSavings: '₹1,26,600',
      paybackYears: '2.5 Yrs',
      lifetimeSavings: '₹37,98,000',
    },
    {
      kw: 10,
      label: '10 kW (Zero Bill Villa)',
      idealFor: 'Luxury Villa / Farmhouse with Central AC & High Peak Load',
      roofArea: '700 sq. ft.',
      monthlyUnits: '1,200 - 1,350 units',
      billBefore: '₹16,500',
      billAfter: '₹600 (Fixed charges)',
      grossCost: 550000,
      subsidy: 78000,
      netCost: 472000,
      monthlyEmi: '₹9,800',
      annualSavings: '₹1,90,800',
      paybackYears: '2.5 Yrs',
      lifetimeSavings: '₹57,24,000',
    },
  ];

  const currentOption = sizeOptions.find((o) => o.kw === systemSize) || sizeOptions[2];

  const billProofs = [
    {
      id: 'jaipur',
      location: 'Vaishali Nagar, Jaipur (5 kW)',
      discom: 'JVVNL Domestic Consumer',
      billBefore: '₹8,450 / Month',
      billAfter: '₹210 / Month',
      annualSavings: '₹98,880 Saved / Year',
      feedback: '"Our JVVNL bill went from over ₹8,000 down to just the fixed line meter charge. The ₹78,000 subsidy was in our SBI account within 26 days of net-metering."',
      customer: 'Dr. Alok Sharma',
    },
    {
      id: 'jodhpur',
      location: 'Shastri Nagar, Jodhpur (3 kW)',
      discom: 'JdVVNL Domestic Consumer',
      billBefore: '₹4,620 / Month',
      billAfter: '₹180 / Month',
      annualSavings: '₹53,280 Saved / Year',
      feedback: '"Neonix installed elevated pergola structures so we still use our entire roof terrace for our evening tea. Zero leakage even in heavy rains."',
      customer: 'Mahendra Singh Rathore',
    },
    {
      id: 'mansarovar',
      location: 'Mansarovar, Jaipur (7 kW with EV)',
      discom: 'JVVNL Domestic Consumer',
      billBefore: '₹12,800 / Month',
      billAfter: '₹340 / Month',
      annualSavings: '₹1,49,520 Saved / Year',
      feedback: '"We charge our Tata Nexon EV and run 4 ACs all summer for practically ₹0 electricity cost. It paid for itself in less than 2.5 years."',
      customer: 'Rajesh & Sunita Khandelwal',
    },
  ];

  const homeFaqs = [
    {
      q: 'How does the PM Surya Ghar ₹78,000 subsidy reach my account?',
      a: 'The central government subsidy under PM Surya Ghar Muft Bijli Yojana is a Direct Benefit Transfer (DBT). Once Neonix completes installation, tests the bidirectional net-meter with your local DISCOM (e.g. JVVNL/AVVNL/JdVVNL), and uploads the commissioning certificate to the national portal, the ₹78,000 subsidy is credited directly to your bank account within 30 days. Neonix handles 100% of the portal paperwork for you.',
    },
    {
      q: 'What is Neonix’s Generation Guarantee with Cash Compensation?',
      a: 'If your solar plant fails to generate the promised number of electricity units agreed upon in your engineering contract (due to equipment or design flaws), Neonix pays you cash compensation for the deficit at the prevailing grid tariff rate. You take zero generation risk.',
    },
    {
      q: 'Will installing solar damage my roof or cause rain leakage?',
      a: 'Absolutely not. Neonix uses IIT-tested non-destructive anchoring and specialized chemical grouting. We offer two mounting systems: Standard Elevated RCC mounts with sealed chemical fasteners (100% waterproofing guaranteed) or Elevated Gazebo Pergola structures raised 7 to 9 feet high, preserving 100% of your rooftop terrace for walking, gardening, and family gatherings.',
    },
    {
      q: 'Can I pay in monthly installments where the EMI is less than my savings?',
      a: 'Yes! With our 0% processing fee green bank loans (SBI, Canara, HDFC), your monthly EMI is typically lower than your current electricity bill! For example, on a 3 kW system, your monthly bill savings are ~₹3,950, while your solar EMI is only ~₹2,850. You save an extra ₹1,100 in cash every month from Day 1!',
    },
    {
      q: 'Why should I apply for Net-Metering immediately before quota closes?',
      a: 'DISCOM regulations cap residential solar installations at 50% to 75% of your local distribution transformer capacity. If your neighbours install solar before you, your local transformer quota can get saturated, causing future net-metering applications to be placed on a long waiting list. Booking today reserves your feeder slot.',
    },
  ];

  return (
    <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#0F9D58] selection:text-white min-h-screen flex flex-col justify-between">
      <ScrollProgress />
      <CursorGlow />

      <ServiceHeader currentService="residential" onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-grow pt-24">
        {/* ── BREADCRUMB ── */}
        <div className="bg-[#0B132B] border-b border-white/10 text-xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">Services</span>
            <span className="text-gray-600">/</span>
            <span className="text-[#00BFA6] font-semibold">Residential Rooftop Solar</span>
          </div>
        </div>

        {/* ── TOP URGENCY NOTIFICATION BAR ── */}
        <div className="bg-[#070D1E] border-b border-white/10 text-white text-xs py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-2">
          <span className="bg-[#0F9D58] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            Active 2026 Quota
          </span>
          <span className="text-gray-200">
            Rajasthan PM Surya Ghar Central Subsidy Quota is active. Claim up to ₹78,000 direct bank transfer + 0% EMI financing.
          </span>
          <a href="#quick-funnel" className="text-[#00BFA6] font-bold hover:underline">
            Reserve Subsidy Slot →
          </a>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-12 sm:py-20 bg-gradient-to-b from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0F9D58]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 reveal-up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F9D58]/15 border border-[#0F9D58]/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00BFA6]">
                    PM Surya Ghar Empanelled • Money-Back Generation Guarantee
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
                  Stop Paying Power Bills.{' '}
                  <span className="bg-gradient-to-r from-[#00BFA6] via-[#0F9D58] to-[#10B981] bg-clip-text text-transparent">
                    Save Up to ₹1.4 Lakh
                  </span>{' '}
                  Every Year.
                </h1>

                <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Get up to <strong className="text-white font-bold">₹78,000 direct bank subsidy</strong> with India's most trusted solar engineering company. If your system does not generate the promised electricity, <strong className="text-[#00BFA6] font-bold">Neonix pays you the cash difference</strong>!
                </p>

                {/* 4 Value Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#00BFA6]">₹78,000</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Direct Subsidy</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">2.3 Yrs</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Fast Payback</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#0F9D58]">30 Yrs</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Panel Life</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">Cash Back</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Power Guarantee</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#quick-funnel"
                    className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-sm font-bold px-7 py-4 rounded-xl shadow-[0_0_25px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Reserve ₹78,000 Subsidy Slot</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="tel:+919910000774"
                    className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>📞 Talk to Solar Engineer</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6 text-xs">
                  <span className="flex items-center gap-1.5 text-white/90 font-medium">
                    <span className="text-[#00BFA6] font-bold">✓</span> Free 3D Rooftop Drone Blueprint (Worth ₹2,500)
                  </span>
                  <span className="flex items-center gap-1.5 text-white/90 font-medium">
                    <span className="text-[#00BFA6] font-bold">✓</span> 5-Yr Leak-Proof Guarantee
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Showcase */}
              <div className="lg:col-span-5 reveal-scale">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-2">
                  <img
                    src="/images/residential-solar.webp"
                    alt="Rooftop solar panels installed on a residential villa in India"
                    className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl"
                    width="600"
                    height="420"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5 bg-[#0F172A]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase font-semibold">Government Certified</div>
                      <div className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#0F9D58]" />
                        PM Surya Ghar Empanelled EPC
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#00BFA6] bg-[#00BFA6]/10 px-3 py-1.5 rounded-lg border border-[#00BFA6]/20">
                      100% Paperwork Done
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INSTANT HOT LEAD SUBSIDY & 3D LAYOUT RESERVATION WIDGET ── */}
        <section id="quick-funnel" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-10 relative z-20">
          <div className="bg-white rounded-3xl border-2 border-[#0F9D58]/40 shadow-[0_20px_60px_rgba(15,157,88,0.22)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#0B132B] to-[#04361E] text-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 text-[#00BFA6] border border-[#0F9D58]/40 text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" />
                  Live Substation Feeder Check
                </span>
                <span className="text-[11px] font-semibold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                  Rajasthan DISCOM Portal • PM Surya Ghar
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {leadSubmitted ? '🎉 Your Feeder Subsidy Quota is Reserved!' : 'Lock In Your ₹78,000 Subsidy & Get Free 3D Roof Layout'}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {leadSubmitted
                  ? `Your priority pass has been generated. Er. Devendra Rathore is verifying net-meter feeder capacity for PIN ${leadPincode}.`
                  : 'Rajasthan distribution transformers have strict 80% solar penetration limits. Reserve your net-meter feeder slot before local quota fills up.'}
              </p>
            </div>

            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="p-6 sm:p-8 bg-[#F8FAFC]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Your Avg Monthly Power Bill:
                    </label>
                    <select
                      value={leadMonthlyBill}
                      onChange={(e) => setLeadMonthlyBill(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                    >
                      <option value="2000">₹1,500 - ₹2,500 / mo (2 kW System)</option>
                      <option value="4500">₹3,500 - ₹5,500 / mo (3 kW System)</option>
                      <option value="8000">₹6,500 - ₹10,000 / mo (5 kW Villa)</option>
                      <option value="12000">₹10,000 - ₹16,000 / mo (7-10 kW)</option>
                      <option value="20000">₹16,000+ / mo (Large Luxury Villa)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Pincode (Rajasthan):
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      value={leadPincode}
                      onChange={(e) => setLeadPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 302020"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Checks local distribution transformer</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Electricity DISCOM:
                    </label>
                    <select
                      value={leadDiscom}
                      onChange={(e) => setLeadDiscom(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                    >
                      <option value="JVVNL (Jaipur & Eastern Rajasthan)">JVVNL (Jaipur & Eastern Rajasthan)</option>
                      <option value="JdVVNL (Jodhpur & Western Rajasthan)">JdVVNL (Jodhpur & Western Rajasthan)</option>
                      <option value="AVVNL (Ajmer & Central Rajasthan)">AVVNL (Ajmer & Central Rajasthan)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Rooftop Usability & Structure:
                    </label>
                    <select
                      value={leadRoofType}
                      onChange={(e) => setLeadRoofType(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                    >
                      <option value="Flat RCC Terrace (Full Access)">Flat RCC Terrace (100% Usable Rooftop)</option>
                      <option value="Elevated Gazebo Pergola (7-9 Ft High)">Elevated Gazebo Pergola (Sit-out Terrace)</option>
                      <option value="Tin / Metal Sheet Roof">Tin / Industrial Metal Sheet Roof</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      10-Digit WhatsApp Mobile:
                    </label>
                    <input
                      id="residential-lead-phone"
                      type="tel"
                      maxLength="10"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter mobile for instant 3D layout"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Zero spam. Sent as private 3D PDF blueprint</span>
                  </div>
                </div>

                {/* Confirmation Preference Selector */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Select Your Preferred Confirmation Mode:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLeadPreference('whatsapp')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        leadPreference === 'whatsapp'
                          ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">⚡</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Instant WhatsApp 3D Blueprint</div>
                        <div className="text-[11px] text-gray-500">Get shadow-free CAD layout + Net-Meter check in 15 mins</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLeadPreference('drone_survey')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        leadPreference === 'drone_survey'
                          ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">🚁</span>
                      <div>
                        <div className="text-xs font-bold text-gray-900">Free Rooftop Drone LiDAR Survey</div>
                        <div className="text-[11px] text-gray-500">Engineer visits with drone to map shadows & roof load</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dynamic Instant Calculation Ribbon */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gray-400">Direct Central Subsidy</span>
                    <div className="text-2xl font-black text-[#0B7542]">₹78,000 DBT Credit</div>
                    <span className="text-[10px] text-gray-500">Credited to SBI/bank account post-inspection</span>
                  </div>
                  <div className="sm:border-l border-gray-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase text-gray-400">Monthly Bill Slashed To</span>
                    <div className="text-2xl font-black text-[#111827]">₹200 - ₹350</div>
                    <span className="text-[10px] text-[#0F9D58] font-bold">Only fixed meter rent remaining</span>
                  </div>
                  <div className="sm:border-l border-gray-200 sm:pl-6">
                    <span className="text-[11px] font-bold uppercase text-gray-400">0% EMI Option</span>
                    <div className="text-2xl font-black text-[#00BFA6]">₹2,450 / mo</div>
                    <span className="text-[10px] text-gray-500">Save cash from Month 1!</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F9D58] hover:bg-[#0c8248] text-white font-extrabold py-4 px-6 rounded-xl text-sm tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(15,157,88,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Lock ₹78,000 Subsidy Slot & Generate My Priority Pass</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            ) : (
              /* ── CONFIRMATORY HOT LEAD PASS CARD ── */
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#F0FDF4] to-white border-t border-[#0F9D58]/30">
                <div className="bg-white border-2 border-[#0F9D58] rounded-2xl p-6 shadow-xl relative overflow-hidden mb-6">
                  {/* Watermark Ribbon */}
                  <div className="absolute top-3 right-3 bg-[#0F9D58]/10 text-[#0B7542] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#0F9D58]/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" />
                    PM Surya Ghar Empanelled Quota
                  </div>

                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Neonix Solar Sanction Pass
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
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                      ⏳ Feeder Slot Held for 48 Hours
                    </span>
                  </div>

                  {/* Summary Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-gray-200/80 mb-5">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Target System</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">3.3 kW Bifacial Mono</div>
                      <div className="text-[10px] text-gray-500">Topcon N-Type Cell</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Locked Subsidy</div>
                      <div className="text-sm font-black text-[#0B7542] mt-0.5">₹78,000 DBT</div>
                      <div className="text-[10px] text-gray-500">Direct to Bank</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Monthly Bill Slashed</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">₹{leadMonthlyBill} ➔ ~₹220</div>
                      <div className="text-[10px] text-gray-500">92% Bill Cut</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Substation Zone</div>
                      <div className="text-sm font-extrabold text-gray-900 mt-0.5">PIN {leadPincode}</div>
                      <div className="text-[10px] text-[#0F9D58] font-bold">Slot Feasible</div>
                    </div>
                  </div>

                  {/* Assigned Solar Engineer Card */}
                  <div className="bg-[#0F172A] text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#0F9D58] flex items-center justify-center font-bold text-lg text-white shadow-md">
                        DR
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          Er. Devendra Rathore
                          <span className="text-[10px] bg-[#00BFA6]/20 text-[#00BFA6] px-2 py-0.5 rounded font-semibold">
                            Lead DISCOM Liaison
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          Assigned to verify your net-meter feeder quota at {leadDiscom.split(' ')[0]}.
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Queue Status</span>
                      <span className="text-xs font-bold text-[#00BFA6] flex items-center gap-1 justify-end">
                        <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-ping" />
                        Priority Queue Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Confirmatory Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919910000774?text=${encodeURIComponent(
                      `Hi Er. Devendra, I have reserved my Neonix Priority Pass #${passToken}.\n\n` +
                      `📍 Pincode: ${leadPincode}\n` +
                      `⚡ Avg Monthly Bill: ₹${leadMonthlyBill}\n` +
                      `🏠 Roof Type: ${leadRoofType}\n` +
                      `🏢 DISCOM: ${leadDiscom}\n` +
                      `💰 Locked Subsidy: ₹78,000 (PM Surya Ghar)\n\n` +
                      `Please verify my local transformer feeder capacity and send my 3D rooftop solar blueprint on this WhatsApp number.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬 Chat on WhatsApp with Er. Devendra</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href="tel:+919910000774"
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>📞 Call Priority Hotline</span>
                  </a>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setLeadSubmitted(false)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline transition-colors"
                  >
                    ← Want to test another electricity bill or pincode? Recalculate here
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── REAL VERIFIED DISCOM BILL PROOF GALLERY ── */}
        <section className="py-16 sm:py-20 bg-white border-y border-gray-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B7542] bg-[#0B7542]/10 px-3.5 py-1.5 rounded-full">
                Zero Fiction • 100% Genuine Bills
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
                See Real Electricity Bills Slashed from ₹8,000+ to ₹200
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Click a customer story to review actual bill numbers from Jaipur and Rajasthan DISCOMs.
              </p>
            </div>

            {/* Proof Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {billProofs.map((bp) => (
                <button
                  key={bp.id}
                  onClick={() => setActiveBillProof(bp.id)}
                  className={`px-4 sm:px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    activeBillProof === bp.id
                      ? 'bg-[#0B132B] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {bp.location}
                </button>
              ))}
            </div>

            {/* Active Proof Card */}
            {(() => {
              const active = billProofs.find((b) => b.id === activeBillProof) || billProofs[0];
              return (
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-lg max-w-4xl mx-auto">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <span className="text-xs font-bold text-[#0B7542] uppercase tracking-wider block">
                        Verified Installation
                      </span>
                      <h3 className="text-2xl font-black text-[#111827] mt-0.5">{active.location}</h3>
                      <span className="text-xs text-gray-500 font-semibold">{active.discom}</span>
                    </div>
                    <span className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-3.5 py-1.5 rounded-xl border border-[#0F9D58]/20">
                      ✓ {active.annualSavings}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                      <span className="text-xs font-bold text-red-600 uppercase">Electricity Bill BEFORE Solar</span>
                      <div className="text-3xl font-black text-red-700 mt-1">{active.billBefore}</div>
                      <span className="text-[11px] text-red-500">Every single month lost to the grid</span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                      <span className="text-xs font-bold text-green-700 uppercase">Electricity Bill AFTER Solar</span>
                      <div className="text-3xl font-black text-[#0B7542] mt-1">{active.billAfter}</div>
                      <span className="text-[11px] text-[#0F9D58] font-bold">90%+ Net Reduction Guaranteed</span>
                    </div>
                  </div>

                  <blockquote className="italic text-gray-700 text-sm leading-relaxed mb-4 bg-white p-4 rounded-xl border border-gray-100">
                    {active.feedback}
                  </blockquote>
                  <div className="text-right text-xs font-bold text-gray-600">— {active.customer}</div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── INTERACTIVE SYSTEM CAPACITY & SUBSIDY EXPLORER ── */}
        <section id="capacity-calculator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B7542] bg-[#0B7542]/10 px-3.5 py-1.5 rounded-full border border-[#0B7542]/20">
              Interactive System Sizer
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
              Choose Your Home System Size & See Net Subsidy
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Select your required kilowatt rating to see exact monthly generation, required roof area, central subsidy credit, and 25-year financial returns.
            </p>
          </div>

          {/* Size Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
            {sizeOptions.map((opt) => {
              const isSelected = opt.kw === systemSize;
              return (
                <button
                  key={opt.kw}
                  onClick={() => setSystemSize(opt.kw)}
                  className={`px-4 sm:px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex flex-col items-center ${
                    isSelected
                      ? 'bg-[#0F9D58] text-white shadow-[0_4px_20px_rgba(15,157,88,0.35)] scale-105'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0F9D58]/50 hover:bg-gray-50'
                  }`}
                >
                  <span>{opt.kw} kW System</span>
                  <span className={`text-[10px] font-normal mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                    {opt.kw <= 2 ? `₹${(opt.subsidy / 1000)}k Subsidy` : '₹78k Max Subsidy'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Calculation Display Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden reveal-scale max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#0B132B] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#00BFA6]">{currentOption.kw} kW Rooftop Solar Plant</span>
                  <span className="bg-[#0F9D58]/20 text-[#0F9D58] border border-[#0F9D58]/40 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">{currentOption.idealFor}</p>
              </div>

              <button
                onClick={() => handleOpenConsultation({ bill: String(currentOption.grossCost), connectionType: `${currentOption.kw}kW Home Solar` })}
                className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap"
              >
                Book This System →
              </button>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F8FAFC]">
              {/* Subsidy Math */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">PM Surya Ghar Subsidy</span>
                <div className="my-3">
                  <div className="text-3xl font-black text-[#0B7542]">₹{currentOption.subsidy.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-gray-500 mt-1">Direct Bank Credit (DBT) within 30 days</div>
                </div>
                <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 flex justify-between">
                  <span>Gross Cost:</span>
                  <span className="font-semibold text-gray-800">₹{currentOption.grossCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-1 text-xs text-gray-600 flex justify-between font-bold text-[#0F9D58]">
                  <span>Net Investment:</span>
                  <span>₹{currentOption.netCost.toLocaleString('en-IN')}*</span>
                </div>
              </div>

              {/* Monthly Bill Slashed */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Monthly Bill Impact</span>
                <div className="my-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-400 line-through text-lg">{currentOption.billBefore}</span>
                    <span className="text-3xl font-black text-[#111827]">{currentOption.billAfter}</span>
                  </div>
                  <div className="text-xs text-[#0F9D58] font-semibold mt-1">
                    Saves approx. {currentOption.annualSavings}/year
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 flex justify-between">
                  <span>Monthly Power Output:</span>
                  <span className="font-semibold text-gray-800">{currentOption.monthlyUnits}</span>
                </div>
                <div className="mt-1 text-xs text-gray-600 flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-bold text-[#0B7542]">{currentOption.paybackYears}</span>
                </div>
              </div>

              {/* 25-Year Wealth Generation */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Lifetime Financial Return</span>
                <div className="my-3">
                  <div className="text-3xl font-black text-[#00BFA6]">{currentOption.lifetimeSavings}</div>
                  <div className="text-xs text-gray-500 mt-1">Cumulative net savings over 25 years</div>
                </div>
                <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 flex justify-between">
                  <span>Roof Area Required:</span>
                  <span className="font-semibold text-gray-800">{currentOption.roofArea}</span>
                </div>
                <div className="mt-1 text-xs text-gray-600 flex justify-between">
                  <span>Self-Paying EMI:</span>
                  <span className="font-bold text-[#0F9D58]">{currentOption.monthlyEmi} / mo</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>*Net price estimates are indicative and vary based on DCR module market rate and structure elevation.</span>
              <a
                href="https://api.whatsapp.com/send?phone=919910000774&text=Hi%20Neonix,%20I%20am%20interested%20in%20a%20residential%20solar%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0B7542] font-bold hover:underline flex items-center gap-1"
              >
                <span>💬 WhatsApp with Solar Expert</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── MOUNTING INNOVATION: FLUSH VS ELEVATED GAZEBO ── */}
        <section className="py-16 sm:py-20 bg-white border-y border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B7542] bg-[#0B7542]/10 px-3.5 py-1.5 rounded-full">
                Zero Roof Damage Guarantee
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
                Mounting Engineered to Protect Your Roof & Retain Living Space
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Unlike local vendors who hammer holes into concrete, Neonix utilizes certified engineering structures that withstand 170 km/h wind storms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Option A: Elevated Gazebo Pergola */}
              <div className="bg-[#0B132B] text-white rounded-3xl p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#00BFA6]/20 text-[#00BFA6] border border-[#00BFA6]/30 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    High Elevation (7 - 9 Feet)
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Elevated Solar Pergola / Rooftop Gazebo</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Installed 7 to 9 feet high with heavy-duty structural steel columns. Keeps 100% of your terrace usable for morning walks, rooftop parties, drying clothes, or creating a shaded garden lounge!
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-200">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F9D58] font-bold">✓</span> Full head clearance & 100% terrace utility preserved
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F9D58] font-bold">✓</span> Keeps the top floor cooler by blocking direct summer sun
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F9D58] font-bold">✓</span> Zero risk of parapet or water tank shadows
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Wind Load: Up to 170 km/h</span>
                  <button
                    onClick={() => handleOpenConsultation({ note: 'Interested in Elevated Rooftop Gazebo Structure' })}
                    className="text-xs font-bold text-[#00BFA6] hover:text-white transition-colors"
                  >
                    Request Pergola Blueprint →
                  </button>
                </div>
              </div>

              {/* Option B: Standard Flush RCC Anchor */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#0B7542]/10 text-[#0B7542] border border-[#0B7542]/20 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Standard Flush Mount
                  </div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Leakage-Proof Chemical Anchored Mount</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Optimized for flat concrete roofs with maximum sun exposure. Uses precision hot-dip galvanized steel or extruded aluminum with high-grade Hilti/Fischer chemical anchoring.
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F9D58] font-bold">✓</span> 100% leak-proof multi-layer waterproofing sealant
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F9D58] font-bold">✓</span> Lowest structural cost with maximum wind-aerodynamic stability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#0F9D58] font-bold">✓</span> Rust-proof Hot-Dip Galvanized (HDG) coating (80+ microns)
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Corrosion Resistance: 25+ Years</span>
                  <button
                    onClick={() => handleOpenConsultation({ note: 'Interested in Standard Flush RCC Mount' })}
                    className="text-xs font-bold text-[#0B7542] hover:text-[#0F9D58] transition-colors"
                  >
                    Request Sizing Quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPETITOR COMPARISON GRID ── */}
        <section className="py-16 bg-[#070D1E] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00BFA6] bg-[#00BFA6]/10 px-3.5 py-1.5 rounded-full border border-[#00BFA6]/20">
                Why Homeowners Choose Neonix
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">
                Neonix vs Local Contractors vs Aggregators
              </h2>
            </div>

            <div className="bg-[#0F172A] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#0B132B]">
                      <th className="p-4 sm:p-5 font-bold text-gray-300">Feature</th>
                      <th className="p-4 sm:p-5 font-bold text-[#00BFA6] bg-[#00BFA6]/10">Neonix Solar</th>
                      <th className="p-4 sm:p-5 font-bold text-gray-400">Local Electrician</th>
                      <th className="p-4 sm:p-5 font-bold text-gray-400">Generic Online Aggregators</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-4 sm:p-5 font-semibold text-gray-200">Panel Quality</td>
                      <td className="p-4 sm:p-5 text-[#0F9D58] font-bold bg-[#00BFA6]/5">Tier-1 N-Type TOPCon (30-Yr Warranty)</td>
                      <td className="p-4 sm:p-5 text-gray-400">Older Poly/Mono Perc (Uncertain brand)</td>
                      <td className="p-4 sm:p-5 text-gray-400">Varies by outsourced contractor</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-semibold text-gray-200">Generation Guarantee</td>
                      <td className="p-4 sm:p-5 text-[#0F9D58] font-bold bg-[#00BFA6]/5">Cash Compensation for Deficit</td>
                      <td className="p-4 sm:p-5 text-gray-400">Zero generation responsibility</td>
                      <td className="p-4 sm:p-5 text-gray-400">Disclaimed in small print</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-semibold text-gray-200">PM Surya Ghar Subsidy Support</td>
                      <td className="p-4 sm:p-5 text-[#0F9D58] font-bold bg-[#00BFA6]/5">100% Guaranteed End-to-End Filing</td>
                      <td className="p-4 sm:p-5 text-gray-400">Customer must do own paperwork</td>
                      <td className="p-4 sm:p-5 text-gray-400">Call center chatbot assistance</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-semibold text-gray-200">Wind Load & Roof Leakage Guarantee</td>
                      <td className="p-4 sm:p-5 text-[#0F9D58] font-bold bg-[#00BFA6]/5">170 km/h Rated + 5-Yr Leakage Warranty</td>
                      <td className="p-4 sm:p-5 text-gray-400">Hammer drilled, frequent leak issues</td>
                      <td className="p-4 sm:p-5 text-gray-400">Standard mounting only</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-semibold text-gray-200">In-House Engineers vs Outsourcing</td>
                      <td className="p-4 sm:p-5 text-[#0F9D58] font-bold bg-[#00BFA6]/5">100% In-House Certified Engineers</td>
                      <td className="p-4 sm:p-5 text-gray-400">Uncertified local labor</td>
                      <td className="p-4 sm:p-5 text-gray-400">Subcontracts to lowest bidder</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ACCORDION ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B7542] bg-[#0B7542]/10 px-3.5 py-1.5 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-3">
              Frequently Asked Questions About Home Solar
            </h2>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] hover:text-[#0B7542] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#0F9D58] text-white' : 'bg-gray-100 text-gray-600'}`}>
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

        {/* ── FINAL CTA STRIP ── */}
        <section className="bg-gradient-to-r from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BFA6] bg-[#00BFA6]/10 px-3 py-1 rounded-full border border-[#00BFA6]/20">
              Limited Regional Substation Quota
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-4 mb-4">
              Reserve Your Substation Net-Metering Feasibility Before Capacity Fills Up
            </h2>
            <p className="text-gray-300 text-xs sm:text-base mb-8 max-w-xl mx-auto">
              Schedule your free 3D drone shadow survey. Our certified engineer will inspect your roof, evaluate DISCOM feeder capacity, and deliver a zero-obligation proposal within 2 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenConsultation({ note: 'Booked Free 3D Rooftop Survey from Bottom CTA' })}
                className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs sm:text-sm font-bold px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(15,157,88,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                Schedule Free 3D Rooftop Survey (Worth ₹2,500)
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
