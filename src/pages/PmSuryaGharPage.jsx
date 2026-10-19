import { useState, useMemo, useEffect } from 'react';
import Lenis from 'lenis';
import ServiceHeader from '../components/ServiceHeader.jsx';
import ServiceFooter from '../components/ServiceFooter.jsx';
import ScrollProgress from '../components/UI/ScrollProgress.jsx';
import CursorGlow from '../components/UI/CursorGlow.jsx';
import ConsultationModal from '../components/ConsultationModal.jsx';

// 2026 PM Surya Ghar Subsidy Matrix
const subsidyOptions = [
  {
    kw: 1,
    name: '1 kW Compact Solar',
    label: '1 kW Home Solar',
    idealFor: '1-2 Rooms, 1-2 Fans, LED Lights, TV (Bill < ₹1,500)',
    roofArea: '80 - 100 Sq.Ft.',
    unitsPerMonth: '120 - 140 Units',
    grossCost: 62000,
    subsidy: 30000,
    netCost: 32000,
    monthlySavings: 1250,
    loanEmi: 620,
    netMonthlyGain: 630,
    payback: '2.1 Years',
    tag: 'Basic Starter',
    isPopular: false,
  },
  {
    kw: 2,
    name: '2 kW Essential Solar',
    label: '2 kW Home Solar',
    idealFor: '2-3 BHK Home, Refrigerator, Washing Machine, 1 Inverter AC',
    roofArea: '160 - 200 Sq.Ft.',
    unitsPerMonth: '240 - 280 Units',
    grossCost: 122000,
    subsidy: 60000,
    netCost: 62000,
    monthlySavings: 2600,
    loanEmi: 1250,
    netMonthlyGain: 1350,
    payback: '2.0 Years',
    tag: 'High Value',
    isPopular: false,
  },
  {
    kw: 3,
    name: '3 kW Optimum Solar (Most Popular)',
    label: '3 kW Home Solar',
    idealFor: '3-4 BHK Independent Villa, 2 Inverter ACs, Geyser, Water Pump',
    roofArea: '240 - 300 Sq.Ft.',
    unitsPerMonth: '360 - 420 Units',
    grossCost: 178000,
    subsidy: 78000,
    netCost: 100000,
    monthlySavings: 4200,
    loanEmi: 1850,
    netMonthlyGain: 2350,
    payback: '2.0 Years',
    tag: '🔥 82% Choose This (Max Subsidy Cap)',
    isPopular: true,
  },
  {
    kw: 4,
    name: '4 kW Comfort Solar',
    label: '4 kW Home Solar',
    idealFor: 'Large 4 BHK Home, 2-3 ACs, EV 2-Wheeler / 4-Wheeler Charging',
    roofArea: '320 - 400 Sq.Ft.',
    unitsPerMonth: '480 - 550 Units',
    grossCost: 232000,
    subsidy: 78000,
    netCost: 154000,
    monthlySavings: 5600,
    loanEmi: 2850,
    netMonthlyGain: 2750,
    payback: '2.3 Years',
    tag: 'Extended Load',
    isPopular: false,
  },
  {
    kw: 5,
    name: '5 kW Executive Solar',
    label: '5 kW Home Solar',
    idealFor: 'Large Villa / Kothi, 3-4 ACs, Heavy Summer Power Consumption',
    roofArea: '400 - 500 Sq.Ft.',
    unitsPerMonth: '600 - 700 Units',
    grossCost: 282000,
    subsidy: 78000,
    netCost: 204000,
    monthlySavings: 7200,
    loanEmi: 3750,
    netMonthlyGain: 3450,
    payback: '2.4 Years',
    tag: 'Zero Summer Bill',
    isPopular: false,
  },
  {
    kw: 10,
    name: '10 kW Luxury / Joint Family',
    label: '10 kW Solar Villa',
    idealFor: 'Joint Family Bungalow, 5+ ACs, Lift, Multiple EV Charging',
    roofArea: '800 - 1,000 Sq.Ft.',
    unitsPerMonth: '1,200 - 1,400 Units',
    grossCost: 520000,
    subsidy: 78000,
    netCost: 442000,
    monthlySavings: 15500,
    loanEmi: 8100,
    netMonthlyGain: 7400,
    payback: '2.4 Years',
    tag: 'Maximum Capacity',
    isPopular: false,
  },
  {
    kw: 25,
    name: '25 kW Society / RWA Common Meter',
    label: '25 kW RWA / GHS',
    idealFor: 'Apartment Common Area: Lifts, Water Pumps, Common Lighting & EV',
    roofArea: '2,000 - 2,500 Sq.Ft.',
    unitsPerMonth: '3,000 - 3,500 Units',
    grossCost: 1250000,
    subsidy: 450000, // ₹18,000 per kW
    netCost: 800000,
    monthlySavings: 38000,
    loanEmi: 15200,
    netMonthlyGain: 22800,
    payback: '1.8 Years',
    tag: 'RWA / GHS Subsidy (₹18k/kW)',
    isPopular: false,
  },
];

export default function PmSuryaGharPage() {
  const [modalState, setModalState] = useState({ isOpen: false, initialData: null });
  const [selectedKw, setSelectedKw] = useState(3);
  const [activeRoadmapTab, setActiveRoadmapTab] = useState(0);
  const [checkedDocs, setCheckedDocs] = useState({
    bill: true,
    aadhaar: true,
    bank: true,
    roof: true,
    photo: false,
  });

  useEffect(() => {
    const REVEAL_SELECTOR = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale';
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => revealObserver.observe(el));

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      revealObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Eligibility Quiz State
  const [quizState, setQuizState] = useState({
    connectionType: 'residential',
    roofOwnership: 'own',
    billPayment: 'regular',
    hasAadhaarBank: 'yes',
  });

  const handleOpenConsultation = (data = null) => {
    setModalState({
      isOpen: true,
      initialData: data || {
        connection_type: 'Residential (PM Surya Ghar)',
        monthly_bill: '4500',
        pincode: '302020',
        city: 'Jaipur',
      },
    });
  };

  const handleCloseConsultation = () => {
    setModalState({ isOpen: false, initialData: null });
  };

  const currentOption = useMemo(
    () => subsidyOptions.find((o) => o.kw === selectedKw) || subsidyOptions[2],
    [selectedKw]
  );

  // Roadmap Steps
  const roadmapSteps = [
    {
      step: '01',
      title: 'Portal Registration',
      duration: 'Day 1',
      actor: 'Neonix + Consumer',
      desc: 'Consumer logs into pmsuryaghar.gov.in using their registered mobile number, selects State (e.g. Rajasthan) and DISCOM (JVVNL/AVVNL/JdVVNL), and enters their Electricity Account/Consumer Number.',
      details: [
        'Direct link to your existing electricity bill account',
        'Auto-verification of sanctioned load from DISCOM database',
        'Neonix solar advisor assists on video/call to avoid data mismatch',
      ],
      icon: '📝',
    },
    {
      step: '02',
      title: 'Technical Feasibility Sanction',
      duration: 'Day 2–7',
      actor: 'Local DISCOM',
      desc: 'Your local DISCOM verifies transformer capacity on your distribution feeder and grants technical feasibility approval for net-metering synchronization.',
      details: [
        'DISCOM checks transformer capacity limit (50% to 75% feeder ceiling)',
        'Neonix tracks status daily via DISCOM portal API',
        'Official approval letter issued directly on the National Portal',
      ],
      icon: '⚡',
    },
    {
      step: '03',
      title: 'Empanelled Vendor Selection',
      duration: 'Day 8',
      actor: 'Consumer',
      desc: 'Select "Neonix Infra Solutions LLP" as your empanelled A-Grade solar vendor on the national portal and digitally sign the standardized MNRE consumer agreement.',
      details: [
        'Lock in government subsidy entitlement with licensed EPC',
        'Transparent pricing schedule with no hidden DISCOM or meter fees',
        'Guaranteed DCR-compliant Tier-1 Mono PERC/TOPCon solar panels',
      ],
      icon: '🤝',
    },
    {
      step: '04',
      title: 'IIT-Tested Rooftop Installation',
      duration: 'Day 9–14',
      actor: 'Neonix Engineering Team',
      desc: 'Certified Neonix engineers install hot-dip galvanized mounting structures, high-efficiency solar modules, micro/string inverters, and dual-layer AC/DC surge protection with chemical earthing.',
      details: [
        '100% leak-proof chemical grouting with non-destructive anchoring',
        '150 km/h cyclone-resistant IIT-tested structural design',
        'Full HD geo-tagged site photographs uploaded to national portal',
      ],
      icon: '🏗️',
    },
    {
      step: '05',
      title: 'DISCOM Inspection & Net-Meter',
      duration: 'Day 15–24',
      actor: 'DISCOM Junior Engineer + Neonix',
      desc: 'DISCOM engineers conduct site inspection, test bidirectional smart meter in the government lab, and install the net-meter on your premises.',
      details: [
        'Dual-register bidirectional meter records import & export units',
        'Neonix liaison officer coordinates lab testing and meter release',
        'Joint inspection report signed on-site',
      ],
      icon: '🔍',
    },
    {
      step: '06',
      title: 'Commissioning Certificate',
      duration: 'Day 25–28',
      actor: 'National Portal (MNRE)',
      desc: 'DISCOM uploads the commissioning report and plant inspection sign-off. The National Portal issues the official Commissioning Certificate.',
      details: [
        'Digital Certificate generated with unique National Plant ID',
        'Confirms DCR compliance and plant operational viability',
        'Triggers automatic subsidy release authorization to PFMS',
      ],
      icon: '📜',
    },
    {
      step: '07',
      title: 'Direct Benefit Transfer (DBT)',
      duration: 'Within 30 Days',
      actor: 'MNRE Central Govt',
      desc: 'The central government transfers up to ₹78,000 directly into your Aadhaar-linked bank account through Public Financial Management System (PFMS).',
      details: [
        '100% direct bank credit — zero middlemen or offline cheques',
        'SMS confirmation directly from Govt of India / PFMS',
        'Monthly electricity bills drop to near zero immediately',
      ],
      icon: '💰',
    },
  ];

  // Bank Loan Comparison
  const bankLoans = [
    {
      bank: 'State Bank of India (SBI)',
      scheme: 'Surya Ghar Rooftop Solar Loan',
      interest: '7.00% p.a. (Concessional Repo-Linked)',
      tenure: 'Up to 10 Years',
      processingFee: 'Nil (0%)',
      collateral: 'No Collateral required up to ₹2 Lakh',
      highlight: 'Fastest digital approval via Jan Samarth Portal',
    },
    {
      bank: 'Canara Bank',
      scheme: 'Canara Solar Light Scheme',
      interest: '7.00% p.a.',
      tenure: 'Up to 7–10 Years',
      processingFee: 'Nil',
      collateral: 'Nil for PM Surya Ghar consumers',
      highlight: 'Quick sanction for existing Canara account holders',
    },
    {
      bank: 'Punjab National Bank (PNB)',
      scheme: 'PNB Solar Rooftop Scheme',
      interest: '7.00% p.a.',
      tenure: 'Up to 10 Years',
      processingFee: 'Zero for systems up to 3 kW',
      collateral: 'Nil',
      highlight: 'Low margin money (only 10% consumer contribution)',
    },
    {
      bank: 'HDFC & Private Green Loans',
      scheme: 'HDFC Green Energy Solar Loan',
      interest: '8.25% - 9.50% p.a.',
      tenure: 'Up to 5–7 Years',
      processingFee: '0.5%',
      collateral: 'Nil',
      highlight: 'Instant paperless sanction within 24 hours',
    },
  ];

  // Verified DBT Proofs
  const dbtProofs = [
    {
      id: 1,
      name: 'Rameshwar Lal Saini',
      location: 'Mansarovar, Jaipur',
      discom: 'JVVNL Consumer',
      plant: '3 kW Mono PERC',
      amount: '₹78,000',
      bank: 'SBI A/C ****4821',
      utr: 'PFMS/2026/DBT-MNRE-88912',
      creditDays: '26 Days post Net-meter',
      feedback: 'The ₹78,000 subsidy credited straight into my SBI savings account. My monthly electricity bill fell from ₹4,800 to ₹170 fixed charge. Neonix did all portal liaisoning without asking for any extra bribe or delay.',
    },
    {
      id: 2,
      name: 'Col. Vikramaditya Singh (Retd.)',
      location: 'Vaishali Nagar, Jaipur',
      discom: 'JVVNL Consumer',
      plant: '5 kW TOPCon Bifacial',
      amount: '₹78,000 (Max Cap)',
      bank: 'HDFC A/C ****9102',
      utr: 'PFMS/2026/DBT-MNRE-90431',
      creditDays: '29 Days post Net-meter',
      feedback: 'Applied through Neonix on 12th. Technical sanction came in 4 days. Installation took 3 days. On Day 29, ₹78,000 arrived in my account. Excellent structural engineering with zero roof puncture.',
    },
    {
      id: 3,
      name: 'Sunita & Manish Agarwal',
      location: 'Shastri Nagar, Jodhpur',
      discom: 'JdVVNL Consumer',
      plant: '3 kW Pergola Elevated',
      amount: '₹78,000',
      bank: 'Canara Bank ****3154',
      utr: 'PFMS/2026/DBT-MNRE-94120',
      creditDays: '23 Days post Net-meter',
      feedback: 'We wanted an elevated terrace pergola so our family could still use our roof terrace. Neonix built an IIT-spec 8-foot raised structure and handled 100% of JdVVNL net-metering. Full subsidy received!',
    },
  ];

  // FAQs
  const schemeFaqs = [
    {
      q: 'What is the exact subsidy amount under PM Surya Ghar Muft Bijli Yojana in 2026?',
      a: 'The central government provides a flat Direct Benefit Transfer (DBT) subsidy of: ₹30,000 for 1 kW system, ₹60,000 for 2 kW system, and ₹78,000 for 3 kW systems and above. For residential apartments and Group Housing Societies (GHS/RWA), the subsidy is ₹18,000 per kW up to 500 kW capacity for common facilities like elevators, water pumps, and common lighting.',
    },
    {
      q: 'How does the ₹78,000 subsidy reach my bank account?',
      a: 'The subsidy does NOT go to the vendor or contractor. It is credited directly into YOUR Aadhaar-seeded bank account via Public Financial Management System (PFMS) Direct Benefit Transfer (DBT). Once Neonix commissions your plant, the DISCOM installs the net-meter, and uploads the joint commissioning certificate on pmsuryaghar.gov.in, the central government disburses the funds directly within 30 days.',
    },
    {
      q: 'Can I apply if the electricity meter is in my father’s or landlord’s name?',
      a: 'The national portal verifies applicant identity by matching the name on the electricity bill with the Aadhaar and bank account. If the electricity meter is in your late father’s or relative’s name, we recommend doing a quick meter name change with your DISCOM, or submitting a legal heir NOC certificate during portal registration. Neonix provides free documentation support for this.',
    },
    {
      q: 'What is the Domestic Content Requirement (DCR) rule?',
      a: 'To be eligible for the PM Surya Ghar subsidy, MNRE strictly mandates that only DCR-compliant solar panels (made with solar cells and solar modules manufactured in India, certified under the ALMM list) can be used. Non-DCR or imported panels will result in immediate rejection of your subsidy on the national portal. Neonix uses 100% ALMM-certified DCR Grade-A modules.',
    },
    {
      q: 'Why should I apply immediately before my local transformer capacity quota closes?',
      a: 'Under Central Electricity Authority (CEA) and State Electricity Regulatory Commission (RERC) rules, rooftop solar on any local distribution transformer is capped at 50% to 75% of the transformer rated capacity. If your neighbours or colony members install solar before you, your local transformer feeder quota becomes saturated! Once saturated, your net-metering application will be rejected or placed on an indefinite waiting list until the DISCOM upgrades the transformer. Booking now reserves your feeder slot.',
    },
    {
      q: 'How do the 7% concessional bank loans work? Will my EMI be less than my bill savings?',
      a: 'Yes! Public sector banks (SBI, Canara, PNB, Bank of Baroda) offer special collateral-free loans up to ₹2 Lakh at a concessionary repo-linked rate of ~7% p.a. with zero processing fee. On a 3 kW system, your monthly loan EMI is roughly ₹1,850, whereas your monthly electricity bill savings are ~₹4,200. You save an extra ₹2,350 in pure cash every single month from Day 1!',
    },
    {
      q: 'Will installing solar on my roof cause rain seepage or structural damage?',
      a: 'Never with Neonix. We use non-destructive chemical fasteners and UV-resistant weatherproof polymer grouting tested to withstand heavy monsoons and high winds. We also offer elevated pergola mounting structures raised 7 to 9 feet high, so you retain 100% of your open rooftop for clothes drying, gardening, and evening walks.',
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
            <a href="/residential-solar.html" className="hover:text-white transition-colors">Residential Solar</a>
            <span className="text-gray-600">/</span>
            <span className="text-[#00BFA6] font-semibold">PM Surya Ghar Muft Bijli Yojana (2026)</span>
          </div>
        </div>

        {/* ── TOP URGENCY NOTIFICATION STRIP ── */}
        <div className="bg-[#070D1E] border-b border-white/10 text-white text-xs py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-2 shadow-inner">
          <span className="bg-[#0F9D58] text-white font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            Active 2026 Quota
          </span>
          <span className="text-gray-200">
            ₹75,021 Crore Central Cabinet Outlay Active. Get up to <strong className="text-white font-bold">₹78,000 Direct Bank Transfer</strong> + 7% Jan Samarth Concessional Loan.
          </span>
          <a
            href="#subsidy-calculator"
            className="text-[#00BFA6] font-extrabold hover:underline ml-1"
          >
            Calculate Your DBT Subsidy ↓
          </a>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#0F9D58]/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00BFA6]/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 reveal-up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F9D58]/15 border border-[#0F9D58]/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00BFA6]">
                    Official MNRE Guidelines • Direct Benefit Transfer (DBT)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
                  PM Surya Ghar:{' '}
                  <span className="bg-gradient-to-r from-[#00BFA6] via-[#0F9D58] to-[#10B981] bg-clip-text text-transparent">
                    Muft Bijli Yojana
                  </span>{' '}
                  Subsidy Guide (2026)
                </h1>

                <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Get up to <strong className="text-white font-bold">₹78,000 direct bank subsidy</strong> from the central government and slash your home electricity bill to <strong className="text-[#00BFA6] font-bold">₹0 every month</strong>. Neonix is an empanelled A-grade solar EPC providing 100% portal paperwork handling, IIT-tested structure mounting, and guaranteed 30-day DBT bank disbursement.
                </p>

                {/* 4 Instant Scheme Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#00BFA6]">₹78,000</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Max Central Subsidy</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">300 Units</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Free Power / Month</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-[#0F9D58]">7% p.a.</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Green Solar Loan</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-sm">
                    <div className="text-xl sm:text-2xl font-black text-white">30 Days</div>
                    <div className="text-[10px] sm:text-xs text-gray-200 mt-1 uppercase tracking-wider font-semibold">Direct Bank Credit</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#subsidy-calculator"
                    className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-sm font-bold px-7 py-4 rounded-xl shadow-[0_0_25px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Check Your Subsidy Slabs</span>
                    <span aria-hidden="true">↓</span>
                  </a>

                  <button
                    onClick={() => handleOpenConsultation()}
                    className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
                  >
                    <span>Reserve Feeder Slot Free</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                {/* Trust Micro-Bullets */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#00BFA6] font-bold">✓</span> 100% DCR ALMM Modules
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#00BFA6] font-bold">✓</span> Empanelled with JVVNL/AVVNL/JdVVNL
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#00BFA6] font-bold">✓</span> Zero Net-Metering Paperwork Hassle
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Infographic Card */}
              <div className="lg:col-span-5 reveal-scale">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-2 backdrop-blur-md">
                  <img
                    src="/images/residential-solar.webp"
                    alt="Rooftop solar panels installed on an Indian villa with PM Surya Ghar subsidy"
                    className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl"
                    width="600"
                    height="420"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-85" />

                  {/* Overlaid Badge */}
                  <div className="absolute top-5 left-5 bg-[#0F9D58] text-white text-xs font-black uppercase px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                    <span>🏛️ National Portal Partner</span>
                  </div>

                  {/* Bottom Stats Card */}
                  <div className="absolute bottom-5 left-5 right-5 bg-[#0F172A]/95 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-300 font-semibold">Direct Benefit Transfer (DBT)</span>
                      <span className="text-xs font-bold text-[#00BFA6] bg-[#00BFA6]/10 px-2 py-0.5 rounded">
                        PFMS Verified
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">₹78,000</span>
                      <span className="text-xs text-gray-400">credited directly to applicant’s account</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 border-t border-white/10 pt-2 leading-relaxed">
                      Zero vendor deductions. Government transfers 100% of financial assistance directly via Aadhaar-linked PFMS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: OFFICIAL 2026 SUBSIDY MATRIX & INTERACTIVE CALCULATOR ── */}
        <section id="subsidy-calculator" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 reveal-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold uppercase tracking-wider mb-3">
                Official Central Financial Assistance (CFA)
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                How Much Subsidy Will You Get in 2026?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Under PM Surya Ghar Muft Bijli Yojana, financial assistance is structured in transparent tiers based on plant capacity. Select your system size below to view exact out-of-pocket costs, bank loan EMI, and monthly profits.
              </p>
            </div>

            {/* Capacity Pill Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
              {subsidyOptions.map((opt) => {
                const isSelected = selectedKw === opt.kw;
                return (
                  <button
                    key={opt.kw}
                    onClick={() => setSelectedKw(opt.kw)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0F9D58] text-white shadow-lg shadow-[#0F9D58]/30 scale-105'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{opt.kw >= 25 ? `${opt.kw} kW (Society)` : `${opt.kw} kW System`}</span>
                    {opt.isPopular && (
                      <span className="bg-amber-400 text-gray-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                        ★ Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Sizing Card */}
            <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden mb-16">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#0F9D58]/15 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Breakdown */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xl sm:text-2xl font-black text-white">{currentOption.name}</span>
                    <span className="text-xs font-bold text-[#00BFA6] bg-[#00BFA6]/15 px-2.5 py-1 rounded-full border border-[#00BFA6]/30">
                      {currentOption.tag}
                    </span>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm mb-6 leading-relaxed">
                    <strong className="text-white">Ideal For:</strong> {currentOption.idealFor}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="text-xs text-gray-400 font-medium">Required Roof Space</div>
                      <div className="text-base sm:text-lg font-bold text-white mt-1">{currentOption.roofArea}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="text-xs text-gray-400 font-medium">Monthly Generation</div>
                      <div className="text-base sm:text-lg font-bold text-[#00BFA6] mt-1">{currentOption.unitsPerMonth}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 col-span-2 sm:col-span-1">
                      <div className="text-xs text-gray-400 font-medium">Capital Payback</div>
                      <div className="text-base sm:text-lg font-bold text-amber-400 mt-1">{currentOption.payback}</div>
                    </div>
                  </div>

                  {/* Financial Formula Bar */}
                  <div className="bg-white/5 border border-white/15 rounded-2xl p-5 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Estimated Turnkey Cost</span>
                        <span className="text-lg font-bold text-gray-300">
                          ₹{currentOption.grossCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-gray-400 hidden sm:block text-xl font-light">−</div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">PM Surya Ghar Subsidy</span>
                        <span className="text-lg font-black text-[#00BFA6]">
                          ₹{currentOption.subsidy.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-gray-400 hidden sm:block text-xl font-light">=</div>
                      <div className="bg-[#0F9D58]/20 border border-[#0F9D58]/40 p-2.5 rounded-xl">
                        <span className="text-[#00BFA6] font-bold block text-[10px] uppercase">Effective Net Cost</span>
                        <span className="text-xl font-black text-white">
                          ₹{currentOption.netCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-snug">
                    *Turnkey cost includes Tier-1 DCR Bifacial/Mono PERC modules, on-grid smart inverter, IIT-grade mounting structures, AC/DC distribution boxes, certified chemical earthing, lightning protection, and 100% DISCOM net-meter liaisoning.
                  </p>
                </div>

                {/* Right Cash-Positive Box */}
                <div className="lg:col-span-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
                      <span>✓ Cash Flow Positive From Day 1</span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">Concessional Green Loan Math</h3>
                    <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                      Finance your net cost with an SBI/Canara Bank PM Surya Ghar loan at ~7% interest over 5–7 years:
                    </p>

                    <div className="space-y-3.5 mb-6 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="text-gray-300 text-xs">Estimated Monthly Bill Savings</span>
                        <span className="font-bold text-emerald-400">+₹{currentOption.monthlySavings.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="text-gray-300 text-xs">Concessional Bank Loan EMI</span>
                        <span className="font-bold text-red-400">−₹{currentOption.loanEmi.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                        <span className="font-black text-xs text-white uppercase tracking-wider">Net Monthly Cash In Pocket</span>
                        <span className="text-lg font-black text-emerald-300">
                          +₹{currentOption.netMonthlyGain.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleOpenConsultation({
                        connection_type: `PM Surya Ghar (${currentOption.kw} kW)`,
                        monthly_bill: String(currentOption.monthlySavings),
                      })
                    }
                    className="w-full bg-[#0F9D58] hover:bg-[#0c8248] text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-[#0F9D58]/40 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Reserve {currentOption.kw} kW Feeder Quota</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Official Slab Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-8">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0B132B] text-white uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">System Capacity</th>
                    <th className="py-4 px-4">Central Subsidy (CFA)</th>
                    <th className="py-4 px-4">Subsidy Formula</th>
                    <th className="py-4 px-4">Average Monthly Generation</th>
                    <th className="py-4 px-4">DISCOM Applicability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">1 kW System</td>
                    <td className="py-3.5 px-4 font-black text-[#0F9D58]">₹30,000</td>
                    <td className="py-3.5 px-4 text-gray-500">₹30,000 / kW</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">120 - 140 Units</td>
                    <td className="py-3.5 px-4 text-xs text-gray-600">Single Phase Meter</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">2 kW System</td>
                    <td className="py-3.5 px-4 font-black text-[#0F9D58]">₹60,000</td>
                    <td className="py-3.5 px-4 text-gray-500">₹30,000 / kW × 2</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">240 - 280 Units</td>
                    <td className="py-3.5 px-4 text-xs text-gray-600">Single / Three Phase</td>
                  </tr>
                  <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-black text-gray-900 flex items-center gap-2">
                      <span>3 kW System</span>
                      <span className="bg-[#0F9D58] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Sweet Spot
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-[#0F9D58] text-base">₹78,000</td>
                    <td className="py-3.5 px-4 text-gray-600">₹60k (1st 2 kW) + ₹18k (3rd kW)</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">360 - 420 Units</td>
                    <td className="py-3.5 px-4 text-xs text-emerald-800 font-semibold">Max Residential Cap</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">Above 3 kW (Up to 10 kW)</td>
                    <td className="py-3.5 px-4 font-black text-[#0F9D58]">₹78,000</td>
                    <td className="py-3.5 px-4 text-gray-500">Capped at ₹78,000 max</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">450 - 1,400 Units</td>
                    <td className="py-3.5 px-4 text-xs text-gray-600">Three Phase Meter Mandatory</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">Group Housing Societies (GHS / RWA)</td>
                    <td className="py-3.5 px-4 font-black text-[#0F9D58]">₹18,000 per kW</td>
                    <td className="py-3.5 px-4 text-gray-500">Up to 500 kW capacity</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">For Common Facilities (Lifts/Pumps)</td>
                    <td className="py-3.5 px-4 text-xs text-gray-600">RWA Society Meter</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-xs text-gray-500">
              📌 Official MNRE Order No. 318/14/2024-GCRT dated 13th February 2024. Subsidy applies exclusively to residential consumers using DCR domestic panels.
            </p>
          </div>
        </section>

        {/* ── SECTION 3: 4-STEP INTERACTIVE ELIGIBILITY CHECKER (HOT LEAD MAGNET) ── */}
        <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white border-t border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider bg-[#0F9D58]/10 px-3 py-1 rounded-full">
                  Instant Eligibility Pre-Check
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 mb-2">
                  Will Your PM Surya Ghar Application Be Approved?
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Answer 4 quick questions to verify your eligibility for the ₹78,000 direct bank subsidy:
                </p>
              </div>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                    1. Is your electricity meter connection Residential / Domestic?
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuizState({ ...quizState, connectionType: 'residential' })}
                      className={`p-3 rounded-xl font-bold border transition-all text-left ${
                        quizState.connectionType === 'residential'
                          ? 'bg-[#0F9D58] text-white border-[#0F9D58]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ✓ Yes, Residential / Domestic Meter
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizState({ ...quizState, connectionType: 'commercial' })}
                      className={`p-3 rounded-xl font-bold border transition-all text-left ${
                        quizState.connectionType === 'commercial'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ⚠️ No, Commercial or Industrial Meter
                    </button>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                    2. Do you have ownership or legal roof terrace rights?
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuizState({ ...quizState, roofOwnership: 'own' })}
                      className={`p-3 rounded-xl font-bold border transition-all text-left ${
                        quizState.roofOwnership === 'own'
                          ? 'bg-[#0F9D58] text-white border-[#0F9D58]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ✓ Yes, Independent Roof / Top Floor Rights
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizState({ ...quizState, roofOwnership: 'tenant' })}
                      className={`p-3 rounded-xl font-bold border transition-all text-left ${
                        quizState.roofOwnership === 'tenant'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ⚠️ Tenant / Need Landlord NOC
                    </button>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                    3. Do you have an Aadhaar-linked active bank account in the electricity bill holder’s name?
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuizState({ ...quizState, hasAadhaarBank: 'yes' })}
                      className={`p-3 rounded-xl font-bold border transition-all text-left ${
                        quizState.hasAadhaarBank === 'yes'
                          ? 'bg-[#0F9D58] text-white border-[#0F9D58]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ✓ Yes, Aadhaar & Bank Details Match
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizState({ ...quizState, hasAadhaarBank: 'no' })}
                      className={`p-3 rounded-xl font-bold border transition-all text-left ${
                        quizState.hasAadhaarBank === 'no'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ⚠️ Different Name / Need Correction Support
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Result Box */}
              <div className="mt-8 p-5 rounded-2xl bg-[#0B132B] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {quizState.connectionType === 'residential' && quizState.roofOwnership === 'own'
                        ? '🎉'
                        : '💡'}
                    </span>
                    <span className="font-black text-sm sm:text-base text-white">
                      {quizState.connectionType === 'residential' && quizState.roofOwnership === 'own'
                        ? 'Congratulations! You are 100% Eligible for ₹78,000 Subsidy'
                        : 'Eligible with Standard Neonix Liaisoning Support'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    {quizState.connectionType === 'residential'
                      ? 'Your residential connection qualifies for Central DBT subsidy + 7% Green Energy solar loans.'
                      : 'Commercial meters get 40% Accelerated Tax Depreciation instead of PM Surya Ghar subsidy.'}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleOpenConsultation({
                      connection_type: 'PM Surya Ghar Pre-Approved',
                      monthly_bill: '4500',
                    })
                  }
                  className="whitespace-nowrap bg-[#00BFA6] hover:bg-[#009e89] text-gray-900 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Reserve Feeder Slot →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: 7-STEP DETAILED PORTAL ROADMAP ── */}
        <section className="py-20 bg-[#0B132B] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00BFA6]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14 reveal-up">
              <span className="text-xs font-bold text-[#00BFA6] uppercase tracking-wider bg-[#00BFA6]/10 px-3 py-1 rounded-full border border-[#00BFA6]/20">
                End-to-End Application Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3 mb-4">
                From Portal Registration to Subsidy in Bank (7 Steps)
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Applying on pmsuryaghar.gov.in involves multiple DISCOM approvals and lab testing. Here is exactly how Neonix navigates every milestone for guaranteed first-pass success:
              </p>
            </div>

            {/* Tab Navigation for Steps */}
            <div className="flex overflow-x-auto pb-4 gap-2 mb-8 justify-start lg:justify-center no-scrollbar">
              {roadmapSteps.map((stepItem, idx) => {
                const isActive = activeRoadmapTab === idx;
                return (
                  <button
                    key={stepItem.step}
                    onClick={() => setActiveRoadmapTab(idx)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#0F9D58] text-white shadow-lg shadow-[#0F9D58]/40'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                    }`}
                  >
                    <span>{stepItem.step}.</span>
                    <span>{stepItem.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Showcase */}
            {roadmapSteps[activeRoadmapTab] && (
              <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-xl reveal-scale">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl p-3 bg-white/10 rounded-2xl">
                      {roadmapSteps[activeRoadmapTab].icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#00BFA6] uppercase tracking-wider">
                          Step {roadmapSteps[activeRoadmapTab].step}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-xs text-gray-400 font-semibold">
                          Timeline: {roadmapSteps[activeRoadmapTab].duration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white mt-1">
                        {roadmapSteps[activeRoadmapTab].title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-300 font-medium">Primary Actor:</span>
                    <span className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                      {roadmapSteps[activeRoadmapTab].actor}
                    </span>
                  </div>
                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
                  {roadmapSteps[activeRoadmapTab].desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roadmapSteps[activeRoadmapTab].details.map((detail, dIdx) => (
                    <div key={dIdx} className="bg-black/30 border border-white/10 rounded-xl p-4 flex items-start gap-2.5">
                      <span className="text-[#00BFA6] font-bold text-sm mt-0.5">✓</span>
                      <span className="text-xs text-gray-300 leading-snug">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 5: WHY CHOOSE NEONIX VS DIY (COMPARISON MATRIX) ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 reveal-up">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Beware of Portal Application Rejections
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3 mb-4">
                Why 94% of DIY Portal Applications Get Stuck
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Direct consumer registrations often hit road-blocks due to non-DCR module rejections, transformer quota saturation, or faulty structure drawings. Here is how Neonix guarantees 100% first-pass approval:
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0B132B] text-white text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Milestone / Requirement</th>
                    <th className="py-4 px-6 text-red-400 bg-red-950/20">Self / Local Contractor</th>
                    <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20">With Neonix Infra Solutions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-bold text-gray-900">DCR Panel Compliance</td>
                    <td className="py-4 px-6 text-red-600 font-medium">
                      High risk of duplicate or non-DCR panels resulting in instant portal rejection.
                    </td>
                    <td className="py-4 px-6 text-emerald-700 font-bold bg-emerald-50/30">
                      100% Genuine ALMM-listed Tier-1 Mono PERC/TOPCon with RFID barcode validation.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-bold text-gray-900">DISCOM Net-Meter Liaisoning</td>
                    <td className="py-4 px-6 text-red-600 font-medium">
                      Consumer has to personally visit DISCOM offices for meter testing and fee payment.
                    </td>
                    <td className="py-4 px-6 text-emerald-700 font-bold bg-emerald-50/30">
                      Dedicated Neonix liaison officer coordinates lab testing and meter installation.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-bold text-gray-900">Mounting Structure Safety</td>
                    <td className="py-4 px-6 text-red-600 font-medium">
                      Local welded iron pipes prone to rust in 2 years and roof puncturing leaks.
                    </td>
                    <td className="py-4 px-6 text-emerald-700 font-bold bg-emerald-50/30">
                      IIT-certified hot-dip galvanized steel with non-destructive chemical anchoring.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-bold text-gray-900">Subsidy Disbursement Timeline</td>
                    <td className="py-4 px-6 text-red-600 font-medium">
                      Often delayed 60 to 120 days due to clerical mistakes in commissioning upload.
                    </td>
                    <td className="py-4 px-6 text-emerald-700 font-bold bg-emerald-50/30">
                      Direct bank credit within 30 days of net-metering. Real-time portal tracking.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-bold text-gray-900">Performance Guarantee</td>
                    <td className="py-4 px-6 text-red-600 font-medium">
                      Zero legal recourse if the system under-generates power.
                    </td>
                    <td className="py-4 px-6 text-emerald-700 font-bold bg-emerald-50/30">
                      30-year performance warranty with contractual cash compensation for under-generation.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CONCESSIONAL SOLAR BANK LOANS (JAN SAMARTH) ── */}
        <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 reveal-up">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider bg-[#0F9D58]/10 px-3 py-1 rounded-full">
                Green Energy Financial Inclusion
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3 mb-4">
                Collateral-Free Bank Loans @ 7% Interest
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Nationalized banks under the Ministry of Finance provide specialized credit lines for PM Surya Ghar consumers. Apply with 10% margin money and zero collateral up to ₹2 Lakhs:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bankLoans.map((loan, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-sm text-gray-900">{loan.bank}</span>
                      <span className="text-[10px] font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-2 py-0.5 rounded">
                        7% Special
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-gray-500 mb-3">{loan.scheme}</h4>

                    <div className="space-y-2.5 text-xs text-gray-600 mb-6 border-t border-b border-gray-100 py-4">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Interest Rate</span>
                        <span className="font-extrabold text-gray-900">{loan.interest}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Tenure</span>
                        <span className="font-semibold text-gray-800">{loan.tenure}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Processing Fee</span>
                        <span className="font-semibold text-emerald-600">{loan.processingFee}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Security / Collateral</span>
                        <span className="font-semibold text-gray-800">{loan.collateral}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl text-[11px] text-gray-700 leading-snug">
                    <strong className="text-gray-900">Key Benefit:</strong> {loan.highlight}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white border border-[#0F9D58]/30 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-sm">
              <span className="text-xs font-bold text-gray-900 block mb-1">
                Need Assistance With Your Jan Samarth Solar Loan Application?
              </span>
              <p className="text-xs text-gray-500 mb-4">
                Neonix helps generate the project quotation and technical feasibility report required by SBI, Canara, and PNB branch managers.
              </p>
              <button
                onClick={() =>
                  handleOpenConsultation({
                    connection_type: 'Solar Bank Loan Support',
                    monthly_bill: '4500',
                  })
                }
                className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors inline-flex items-center gap-1.5"
              >
                <span>Request Loan Guidance</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: DOCUMENT READINESS CHECKLIST ── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 reveal-up">
              <span className="text-xs font-bold text-[#00BFA6] uppercase tracking-wider bg-[#00BFA6]/10 px-3 py-1 rounded-full">
                Document Checklist
              </span>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-3 mb-2">
                Documents Required for PM Surya Ghar Registration
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                Check off your documents to verify your application readiness:
              </p>
            </div>

            <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <label
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedDocs.bill}
                  onChange={(e) => setCheckedDocs({ ...checkedDocs, bill: e.target.checked })}
                  className="w-5 h-5 rounded text-[#0F9D58] mt-0.5 accent-[#0F9D58]"
                />
                <div>
                  <div className="text-sm font-bold text-white">Latest Electricity Bill (Last 2 Months)</div>
                  <div className="text-xs text-gray-300 mt-0.5">
                    Shows CA Number / K-Number, tariff category (Domestic), and sanctioned connected load.
                  </div>
                </div>
              </label>

              <label
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedDocs.aadhaar}
                  onChange={(e) => setCheckedDocs({ ...checkedDocs, aadhaar: e.target.checked })}
                  className="w-5 h-5 rounded text-[#0F9D58] mt-0.5 accent-[#0F9D58]"
                />
                <div>
                  <div className="text-sm font-bold text-white">Aadhaar Card of Electricity Bill Holder</div>
                  <div className="text-xs text-gray-300 mt-0.5">
                    Used for OTP verification on pmsuryaghar.gov.in portal.
                  </div>
                </div>
              </label>

              <label
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedDocs.bank}
                  onChange={(e) => setCheckedDocs({ ...checkedDocs, bank: e.target.checked })}
                  className="w-5 h-5 rounded text-[#0F9D58] mt-0.5 accent-[#0F9D58]"
                />
                <div>
                  <div className="text-sm font-bold text-white">Cancelled Cheque or Bank Passbook Front Page</div>
                  <div className="text-xs text-gray-300 mt-0.5">
                    Must clearly display Account Number, IFSC code, and match the electricity bill holder's name.
                  </div>
                </div>
              </label>

              <label
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedDocs.roof}
                  onChange={(e) => setCheckedDocs({ ...checkedDocs, roof: e.target.checked })}
                  className="w-5 h-5 rounded text-[#0F9D58] mt-0.5 accent-[#0F9D58]"
                />
                <div>
                  <div className="text-sm font-bold text-white">Rooftop Terrace Photo / Video</div>
                  <div className="text-xs text-gray-300 mt-0.5">
                    Helps Neonix solar design engineers create shadow analysis 3D layout simulation.
                  </div>
                </div>
              </label>

              <label
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedDocs.photo}
                  onChange={(e) => setCheckedDocs({ ...checkedDocs, photo: e.target.checked })}
                  className="w-5 h-5 rounded text-[#0F9D58] mt-0.5 accent-[#0F9D58]"
                />
                <div>
                  <div className="text-sm font-bold text-white">Passport Size Photograph of Applicant</div>
                  <div className="text-xs text-gray-300 mt-0.5">
                    Required for DISCOM net-metering physical application dossier.
                  </div>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: VERIFIED DBT BANK RECEIPTS & PROOFS ── */}
        <section className="py-20 bg-gradient-to-b from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 reveal-up">
              <span className="text-xs font-bold text-[#00BFA6] uppercase tracking-wider bg-[#00BFA6]/10 px-3 py-1 rounded-full border border-[#00BFA6]/20">
                Direct Benefit Transfer (DBT) Proofs
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3 mb-4">
                Real Bank Credit Proofs from Our Solar Customers
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                See real bank credit timelines from homeowners across Rajasthan who received their full ₹78,000 central subsidy directly from the Ministry of New and Renewable Energy:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dbtProofs.map((proof) => (
                <div
                  key={proof.id}
                  className="bg-white/5 border border-white/15 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-[#00BFA6]/40 transition-all"
                >
                  <div>
                    {/* Top Bank SMS Mockup */}
                    <div className="bg-black/50 border border-emerald-500/30 rounded-2xl p-4 mb-5">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                        <span className="font-bold text-emerald-400">PFMS / DBT ALERT</span>
                        <span>{proof.creditDays}</span>
                      </div>
                      <div className="text-xs text-white font-mono leading-relaxed">
                        "Your account {proof.bank} has been CREDITED with <strong className="text-emerald-300 font-bold">{proof.amount}</strong> on behalf of MNRE Govt of India under PM Surya Ghar. Ref: {proof.utr}"
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-0.5">{proof.name}</h4>
                    <div className="text-xs text-gray-400 mb-3">
                      {proof.location} • <span className="text-[#00BFA6]">{proof.plant}</span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed italic mb-4">
                      "{proof.feedback}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                    <span>DISCOM: {proof.discom}</span>
                    <span className="text-emerald-400 font-semibold">✓ Verified Receipt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 9: FREQUENTLY ASKED QUESTIONS (SCHEME SPECIFIC) ── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 reveal-up">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider bg-[#0F9D58]/10 px-3 py-1 rounded-full">
                Answers to Tricky Doubts
              </span>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-3 mb-2">
                Frequently Asked Questions on PM Surya Ghar (2026)
              </h2>
              <p className="text-gray-600 text-sm">
                Get clear, government-circular-backed answers before you register on the portal:
              </p>
            </div>

            <div className="space-y-4">
              {schemeFaqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-base font-bold text-gray-900 mb-2 flex items-start gap-2.5">
                    <span className="text-[#0F9D58] text-lg font-black">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 10: HOT LEAD FINAL CTA BOX ── */}
        <section className="py-16 bg-gradient-to-r from-[#0F172A] via-[#0B132B] to-[#070D1E] text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F9D58]/20 border border-[#0F9D58]/40 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00BFA6]">
                Reserve Transformer Quota Before Feeder Saturation
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Ready to Claim Your{' '}
              <span className="bg-gradient-to-r from-[#00BFA6] via-[#0F9D58] to-[#10B981] bg-clip-text text-transparent">
                ₹78,000 Subsidy?
              </span>
            </h2>

            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Don’t let your local transformer capacity fill up. Neonix handles 100% of your PM Surya Ghar portal paperwork, DISCOM net-metering, and IIT-anchored rooftop installation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenConsultation()}
                className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-sm font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(15,157,88,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Check Feeder Slot & Book Free Survey</span>
                <span aria-hidden="true">→</span>
              </button>

              <a
                href="tel:+919910000774"
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
              >
                <span>📞 +91 99100 00774</span>
              </a>
              <a
                href="tel:+919088688899"
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-4 rounded-xl border border-white/15 transition-all flex items-center gap-2"
              >
                <span>📞 +91 90886 88899</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ServiceFooter />

      {/* Sticky Mobile Lead Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#0B132B]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center justify-between sm:hidden">
        <div className="leading-tight">
          <div className="text-[10px] text-gray-400">PM Surya Ghar</div>
          <div className="text-xs font-black text-[#00BFA6]">₹78,000 Subsidy</div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:+919910000774"
            className="p-2.5 bg-white/10 rounded-xl text-white text-xs border border-white/10"
            aria-label="Call Neonix"
          >
            📞
          </a>
          <button
            onClick={() => handleOpenConsultation()}
            className="bg-[#0F9D58] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md"
          >
            Claim Subsidy →
          </button>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseConsultation}
        initialData={modalState.initialData}
      />
    </div>
  );
}
