import { useState, useEffect } from 'react';
import { SERVICES_DROPDOWN_LIST, SITE_CONFIG } from '../data';

export default function ServiceHeader({ currentService, onOpenConsultation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const serviceList = SERVICES_DROPDOWN_LIST.filter((s) => s.id !== 'calculator');

  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#070D1E]/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`relative z-10 h-full w-[85%] max-w-sm bg-[#0B132B] border-r border-white/10 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto`}
        >
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <a href="/" className="flex items-center gap-2.5">
                <img
                  src="/images/logo.svg"
                  alt="Neonix Logo"
                  className="h-9 w-auto bg-white p-1 rounded-full"
                  width="36"
                  height="36"
                />
                <div>
                  <span className="text-white font-black text-lg block leading-none">Neonix</span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    Infra Solutions
                  </span>
                </div>
              </a>
              <button
                aria-label="Close Navigation Menu"
                className="p-2 text-white/80 hover:text-white bg-white/10 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-[#0F9D58] hover:bg-[#0c8248] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <span>Get Free Consultation</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-[#00BFA6] mb-3">Our Services</p>
            <div className="space-y-2 mb-6">
              {serviceList.map((srv) => {
                const isActive = currentService === srv.id;
                return (
                  <a
                    key={srv.id}
                    href={srv.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-200'
                    }`}
                  >
                    <span className="text-xl mt-0.5">{srv.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{srv.name}</span>
                        <span className="text-[9px] font-semibold text-[#00BFA6] bg-[#00BFA6]/10 px-2 py-0.5 rounded">
                          {srv.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{srv.desc}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Quick Navigation</p>
            <div className="space-y-1 text-sm font-medium text-gray-300">
              <a href="/" className="block py-2 px-3 rounded-lg hover:bg-white/5 hover:text-[#00BFA6]">
                ← Back to Homepage
              </a>
              <a href="/pm-surya-ghar-yojana" className="block py-2 px-3 rounded-lg hover:bg-white/5 text-amber-400 font-bold flex items-center justify-between">
                <span>🏛️ PM Surya Ghar (₹78k)</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">Active</span>
              </a>
              <a href="/solar-calculator" className="block py-2 px-3 rounded-lg hover:bg-white/5 text-[#00BFA6] font-semibold">
                ⚡ Solar ROI Calculator
              </a>
              <a href="/#savings-hub" className="block py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white">
                💰 Subsidy Breakdown
              </a>
              <a href="/#trust-signals" className="block py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white">
                ⭐ Trust & Certifications
              </a>
              <a href="/#contact" className="block py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white">
                📞 Contact & Address
              </a>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 text-xs text-gray-400">
            <p className="font-semibold text-white">Direct Helpline</p>
            <div className="space-y-0.5 mt-0.5">
              <a href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`} className="text-[#00BFA6] font-bold block">
                {SITE_CONFIG.contact.primaryPhone}
              </a>
              <a href={`tel:${SITE_CONFIG.contact.secondaryPhoneRaw}`} className="text-gray-300 hover:text-white block font-medium">
                {SITE_CONFIG.contact.secondaryPhone}
              </a>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{SITE_CONFIG.address.locality}, {SITE_CONFIG.address.state} • {SITE_CONFIG.contact.workingHours}</p>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B132B]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.3)] py-2.5'
            : 'bg-[#0B132B]/85 backdrop-blur-sm py-3.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
          {/* Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Neonix Infra Solutions Homepage"
          >
            <div className="bg-white rounded-full p-1 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.svg"
                alt="Neonix Logo"
                className="h-full w-auto object-contain"
                width="36"
                height="36"
              />
            </div>
            <div className="flex flex-col justify-center leading-none text-left">
              <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight transition-colors group-hover:text-[#00BFA6]">
                Neonix
              </span>
              <span className="text-gray-300 font-semibold text-[8px] sm:text-[9px] tracking-widest uppercase">
                Infra Solutions
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a
              href="/"
              className="text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className="flex items-center gap-1 text-white text-xs font-bold uppercase tracking-wider py-2 transition-colors hover:text-[#00BFA6]"
                aria-expanded={servicesDropdown}
              >
                <span>Services</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 pt-2 z-50">
                  <div className="bg-[#0F172A] border border-white/15 rounded-2xl p-3 shadow-2xl backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#00BFA6] px-3 py-1.5 mb-1">
                      Our Solar Solutions
                    </div>
                    {serviceList.map((srv) => {
                      const isActive = currentService === srv.id;
                      return (
                        <a
                          key={srv.id}
                          href={srv.href}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                            isActive
                              ? 'bg-[#0F9D58]/20 border border-[#0F9D58]/30 text-white'
                              : 'hover:bg-white/10 text-gray-200'
                          }`}
                        >
                          <span className="text-lg mt-0.5">{srv.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold">{srv.name}</span>
                              <span className="text-[9px] font-semibold text-[#0F9D58] bg-[#0F9D58]/15 px-1.5 py-0.2 rounded">
                                {srv.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">{srv.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <a
              href="/pm-surya-ghar-yojana"
              className="text-amber-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>PM Surya Ghar</span>
              <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-black">₹78k</span>
            </a>

            <a
              href="/solar-calculator"
              className="text-[#00BFA6] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              <span>ROI Calculator</span>
              <span className="text-[10px]">↗</span>
            </a>

            <a
              href="/#why-solar"
              className="text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Why Solar
            </a>

            <a
              href="/#contact"
              className="text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-[#00BFA6] transition-colors bg-white/10 hover:bg-white/15 px-3 py-2 rounded-xl border border-white/10"
            >
              <svg className="w-3.5 h-3.5 text-[#0F9D58]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>{SITE_CONFIG.contact.primaryPhone}</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <span>Free Survey</span>
              <span aria-hidden="true">→</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
