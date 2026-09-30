import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import RoiCalculator from '../components/RoiCalculator';
import ConsultationModal from '../components/ConsultationModal';
import ScrollProgress from '../components/UI/ScrollProgress';
import CursorGlow from '../components/UI/CursorGlow';

export default function CalculatorPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: null,
  });

  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    if (modalState.isOpen) {
      lenis.stop();
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      delete window.__lenis;
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.__lenis) {
      if (modalState.isOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [modalState.isOpen]);

  const handleOpenConsultation = (initialData = null) => {
    setModalState({
      isOpen: true,
      initialData,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      initialData: null,
    });
  };

  const faqs = [
    {
      q: 'How is my recommended solar system capacity calculated?',
      a: 'The calculator estimates your monthly electricity consumption in kWh (units) by dividing your average monthly electricity bill by standard grid tariff rates. In high-sunlight regions like Rajasthan, 1 kW of rooftop solar generates approximately 120–135 units per month. We then match your monthly consumption to the exact kW system needed to eliminate up to 90% of your grid bill.',
    },
    {
      q: 'What is the PM Surya Ghar subsidy amount for residential solar?',
      a: 'Under the PM Surya Ghar Muft Bijli Yojana (2026), residential consumers in India receive: ₹30,000 subsidy for 1 kW systems, ₹60,000 subsidy for 2 kW systems, and a maximum flat subsidy of ₹78,000 for 3 kW and larger systems. The subsidy is credited directly to your bank account via Direct Benefit Transfer (DBT) within 30 days after net meter installation.',
    },
    {
      q: 'What is the difference between DCR and Non-DCR solar panels?',
      a: 'DCR (Domestic Content Requirement) panels are manufactured entirely in India using domestically produced solar cells and modules. DCR panels are strictly mandatory to qualify for the central government PM Surya Ghar subsidy. Non-DCR panels use high-efficiency imported cells (e.g. N-Type TOPCon) and offer lower upfront pricing for commercial, industrial, or institutional installations where accelerated depreciation benefits apply instead of residential subsidies.',
    },
    {
      q: 'When should I choose Single-Phase (1PH) vs Three-Phase (3PH)?',
      a: 'Single-phase connections are standard for smaller residential homes with sanctioned loads up to 4 kW – 5 kW running standard home appliances. Three-phase connections are required for systems larger than 5 kW, commercial buildings, agricultural connections, or homes operating multiple heavy appliances (central ACs, commercial machinery, heat pumps).',
    },
    {
      q: 'How does Net Metering work in Rajasthan?',
      a: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. During daytime peak hours, your solar panels power your home and export surplus power to your DISCOM (JVVNL, AVVNL, JdVVNL). At night, you draw power from the grid. At the end of the billing cycle, you are only billed for the "net" difference.',
    },
    {
      q: 'How much shadow-free roof area is required for installation?',
      a: 'Each 1 kW of rooftop solar requires approximately 64 to 70 sq. ft. of clean, shadow-free rooftop space. For example, a 3 kW system (consisting of 6 high-efficiency 550W panels) needs about 192 to 210 sq. ft. of unshaded roof area.',
    },
  ];

  return (
    <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#0F9D58] selection:text-white min-h-screen flex flex-col justify-between">
      <ScrollProgress />
      <CursorGlow />

      {/* ── HEADER / NAVIGATION ── */}
      <header className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group" aria-label="Neonix Solar Home">
            <div className="bg-white rounded-full p-1.5 h-10 w-10 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <img src="/images/logo.svg" alt="Neonix Logo" className="h-full w-auto object-contain" width="40" height="40" />
            </div>
            <div>
              <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight block leading-none">Neonix</span>
              <span className="text-gray-300 font-semibold text-[9px] tracking-widest uppercase">Infra Solutions</span>
            </div>
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-[#00BFA6] transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </a>

            <a
              href="tel:+919910000774"
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-white/90 bg-white/10 hover:bg-white/20 px-3.5 py-2.5 rounded-xl border border-white/15 transition-all"
            >
              <svg className="w-4 h-4 text-[#00BFA6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 99100 00774</span>
            </a>

            <button
              onClick={() => handleOpenConsultation({ source: 'Calculator Page Header' })}
              className="inline-flex items-center gap-2 bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Get Free Quotation</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main id="main-content" className="flex-grow">
        {/* HERO TITLE SECTION */}
        <section className="bg-gradient-to-b from-[#0B132B] via-[#0F172A] to-[#F8FAFC] pt-12 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F9D58]/20 border border-[#00BFA6]/30 text-[#00BFA6] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" />
              PM Surya Ghar Muft Bijli Yojana (2026 Compliant)
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Solar ROI & Government Subsidy Calculator
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Calculate your recommended system capacity (kW), direct government subsidies (up to ₹78,000), monthly savings, and lifetime financial returns in 30 seconds.
            </p>
          </div>
        </section>

        {/* ── INTERACTIVE CALCULATOR ENGINE ── */}
        <section className="-mt-6 sm:-mt-8 relative z-20">
          <RoiCalculator onDownloadReport={(data) => handleOpenConsultation(data)} />
        </section>

        {/* ── TECHNICAL DEFINITIONS & CONCEPTS SECTION ── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1 rounded-full">
              Solar Knowledge & Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] mt-3 mb-4">
              Key Technical Definitions & Sizing Concepts
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Understanding these core parameters helps you choose the most cost-effective solar setup for your residential home, factory, or commercial building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Solar ROI & Payback */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-black text-lg mb-4">
                ROI
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">Solar ROI & Payback Period</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Solar Return on Investment (ROI) measures your annual electricity cost savings against the net setup cost. With central subsidies, typical residential payback is achieved in <strong>2.5 to 3.5 years</strong>, after which solar power is 100% free for 25+ years.
              </p>
            </div>

            {/* Card 2: DCR Solar Panels */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-black text-lg mb-4">
                DCR
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">DCR Panels (Subsidy Eligible)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong>Domestic Content Requirement (DCR)</strong> panels are manufactured in India using indigenous solar cells and modules. MNRE mandates DCR panels for all residential PM Surya Ghar DBT subsidies up to ₹78,000.
              </p>
            </div>

            {/* Card 3: Non-DCR Panels */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-lg mb-4">
                NDCR
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">Non-DCR Panels (C&I Commercial)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Non-DCR panels utilize imported cells offering high-efficiency TopCon technology at a lower capital cost. They are ideal for commercial and industrial buildings claiming <strong>40% accelerated depreciation</strong> tax savings.
              </p>
            </div>

            {/* Card 4: Single-Phase (1PH) vs Three-Phase (3PH) */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-black text-lg mb-4">
                PH
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">1-Phase vs 3-Phase Systems</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Single-phase (1PH) inverters are used for residential setups up to 4–5 kW. Three-phase (3PH) inverters are required for plants 5 kW and above, commercial establishments, and sites with high inductive loads (large ACs, pumps).
              </p>
            </div>

            {/* Card 5: Net Metering */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-black text-lg mb-4">
                NET
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">Bi-directional Net Metering</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                A bi-directional net meter records both imported units from the electricity board (DISCOM) and exported solar units. Any surplus generation during peak sunlight hours is banked and subtracted from your grid bill.
              </p>
            </div>

            {/* Card 6: Shadow-Free Rooftop Area */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-lg mb-4">
                AREA
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">Roof Area Sizing Formula</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Standard Mono PERC / TopCon panels require approx. <strong>64 to 70 sq. ft.</strong> of shadow-free rooftop area per 1 kW (2 solar panels). A standard 3 kW residential setup requires roughly 192 to 210 sq. ft.
              </p>
            </div>
          </div>
        </section>

        {/* ── PM SURYA GHAR SUBSIDY MATRIX TABLE ── */}
        <section className="py-12 sm:py-16 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00BFA6] bg-[#00BFA6]/10 px-3 py-1 rounded-full">
                Government Policy Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-3">
                PM Surya Ghar Muft Bijli Yojana Subsidy Breakdown (2026)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Official Ministry of New and Renewable Energy (MNRE) Direct Benefit Transfer (DBT) rates.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B132B] text-white text-xs sm:text-sm">
                    <th className="py-3.5 px-4 font-bold">System Capacity</th>
                    <th className="py-3.5 px-4 font-bold">Monthly Bill Range</th>
                    <th className="py-3.5 px-4 font-bold">Roof Space</th>
                    <th className="py-3.5 px-4 font-bold text-right">Central Subsidy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-700">
                  <tr className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#111827]">1 kW System</td>
                    <td className="py-3 px-4">₹1,500 – ₹2,500 / month</td>
                    <td className="py-3 px-4">~64 sq. ft.</td>
                    <td className="py-3 px-4 text-right font-bold text-[#0F9D58]">₹30,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50/80 transition-colors bg-green-50/30">
                    <td className="py-3 px-4 font-semibold text-[#111827]">2 kW System</td>
                    <td className="py-3 px-4">₹2,500 – ₹4,500 / month</td>
                    <td className="py-3 px-4">~128 sq. ft.</td>
                    <td className="py-3 px-4 text-right font-bold text-[#0F9D58]">₹60,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50/80 transition-colors bg-emerald-50/40">
                    <td className="py-3 px-4 font-semibold text-[#111827]">3 kW System (Most Popular)</td>
                    <td className="py-3 px-4">₹4,500 – ₹7,000 / month</td>
                    <td className="py-3 px-4">~192 sq. ft.</td>
                    <td className="py-3 px-4 text-right font-bold text-[#0F9D58]">₹78,000 (Max Flat)</td>
                  </tr>
                  <tr className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#111827]">4 kW – 10 kW Residential</td>
                    <td className="py-3 px-4">₹7,000 – ₹20,000+ / month</td>
                    <td className="py-3 px-4">256 – 640 sq. ft.</td>
                    <td className="py-3 px-4 text-right font-bold text-[#0F9D58]">₹78,000 (Flat)</td>
                  </tr>
                  <tr className="hover:bg-gray-50/80 transition-colors bg-blue-50/30">
                    <td className="py-3 px-4 font-semibold text-[#111827]">Commercial & Industrial (C&I)</td>
                    <td className="py-3 px-4">₹25,000 – ₹5,00,000+ / month</td>
                    <td className="py-3 px-4">Custom Factory Roof</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600">40% Tax Depreciation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-3">
              Solar ROI Calculator FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] hover:text-[#0F9D58] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#0F9D58] text-white' : ''}`}>
                      ↓
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

        {/* ── CALL TO ACTION SECTION ── */}
        <section className="bg-[#0B132B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              Ready to Save Up to 90% on Your Electricity Bill?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-6 max-w-xl mx-auto">
              Our certified solar engineers provide complete end-to-end support including free roof shadow analysis, DISCOM net metering, and subsidy paperwork.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleOpenConsultation({ source: 'Calculator Page Bottom CTA' })}
                className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(15,157,88,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                Book Free Rooftop Site Inspection
              </button>
              <a
                href="tel:+919910000774"
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl border border-white/20 transition-all"
              >
                Call: +91 99100 00774
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#070D1E] text-gray-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Neonix Logo" className="h-6 w-auto" width="24" height="24" />
            <span className="text-white font-bold">Neonix Infra Solutions LLP</span>
            <span className="text-gray-500">| Jaipur, Rajasthan, India</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/privacy-policy.html" className="hover:text-white transition-colors">Privacy & Warranty Policy</a>
            <a href="/terms.html" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>

          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Neonix Infra Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── CONSULTATION MODAL ── */}
      <ConsultationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialData={modalState.initialData}
      />
    </div>
  );
}
