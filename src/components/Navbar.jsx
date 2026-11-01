import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { SERVICES, SITE_CONFIG } from '../data';

// ── 1. MAGNETIC BUTTON WRAPPER (SUBTLE & SMOOTH) ───────────────────────────────
const MagneticElement = ({ children, className = '', onClick, as: Tag = 'button', strength = 0.15, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 70) {
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      } else {
        el.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (el) el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <Tag
      ref={ref}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Tag>
  );
};

// ── 2. SEARCH & COMMAND PALETTE DATA ───────────────────────────────────────────
const SEARCH_DATABASE = [
  {
    id: 'res-solar',
    title: 'Solar for Homes (Residential)',
    category: 'Solutions',
    desc: 'PM Surya Ghar rooftop solar with up to ₹78,000 direct DBT subsidy.',
    href: '/residential-solar',
    icon: '🏠',
  },
  {
    id: 'pm-surya',
    title: 'PM Surya Ghar Muft Bijli Yojana',
    category: 'Govt Scheme',
    desc: 'Official 2026 MNRE portal roadmap, 7% bank loan & subsidy claiming guide.',
    href: '/pm-surya-ghar-yojana',
    icon: '🏛️',
  },
  {
    id: 'comm-solar',
    title: 'Solar for Businesses (Commercial)',
    category: 'Solutions',
    desc: 'Offices, hospitals & institutions with 40% accelerated tax depreciation.',
    href: '/commercial-solar',
    icon: '🏢',
  },
  {
    id: 'ind-solar',
    title: 'Solar for Factories (Industrial)',
    category: 'Solutions',
    desc: 'Heavy-duty MW-scale solar EPC, 33kV HT net-metering & Klip-Lok clamps.',
    href: '/industrial-solar',
    icon: '🏭',
  },
  {
    id: 'amc-solar',
    title: 'Solar Care & AMC Maintenance',
    category: 'Services',
    desc: 'Demineralized RO water wash, drone thermal scans & generation guarantee.',
    href: '/solar-amc',
    icon: '🛠️',
  },
  {
    id: 'roi-tool',
    title: 'Solar ROI & Subsidy Calculator',
    category: 'Tools',
    desc: 'Instant kW sizing, monthly power bill savings & 25-yr financial returns.',
    href: '/solar-calculator',
    icon: '⚡',
  },
  {
    id: 'why-solar',
    title: 'Why Solar: Key Benefits',
    category: 'Overview',
    desc: 'Tier-1 DCR bifacial panels, 30-year warranty, and environmental impact.',
    href: '/#why-solar',
    icon: '☀️',
  },
  {
    id: 'faq-section',
    title: 'Frequently Asked Questions (FAQs)',
    category: 'Help',
    desc: 'Common questions on net-metering timeline, cloudy days, and subsidies.',
    href: '/#faq',
    icon: '❓',
  },
  {
    id: 'contact-section',
    title: 'Contact Engineering & Office',
    category: 'Contact',
    desc: 'Jaipur HQ address, direct helpline, and consultations.',
    href: '/#contact',
    icon: '📍',
  },
  {
    id: 'action-consult',
    title: 'Book Free Roof Survey (₹0)',
    category: 'Action',
    desc: 'Schedule an on-site inspection with a certified solar engineer.',
    isAction: 'consult',
    icon: '📋',
  },
  {
    id: 'action-call',
    title: `Call Helpline: ${SITE_CONFIG.contact.primaryPhone}`,
    category: 'Action',
    desc: 'Direct phone line for quick tariff and rooftop assistance.',
    isAction: 'call',
    icon: '📞',
  },
];

// Minimal, curated desktop navigation links
const MINIMAL_NAV_LINKS = [
  { name: 'PM Surya Ghar', href: '/pm-surya-ghar-yojana', badge: '₹78k' },
  { name: 'Calculator', href: '/solar-calculator' },
  { name: 'Why Solar', href: '#why-solar' },
  { name: 'Contact', href: '#contact' },
];

// ── 3. MINIMALIST NAVBAR COMPONENT ─────────────────────────────────────────────
export default function Navbar({ onOpenConsultation, currentService, isServicePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);

  const dropdownTimerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Track scroll state
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or search modal is open
  useEffect(() => {
    if (isMenuOpen || searchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, searchModalOpen]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / '/' for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setServicesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input on open
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 40);
      setSelectedSearchIndex(0);
    } else {
      setSearchQuery('');
    }
  }, [searchModalOpen]);

  // Filter search database
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return SEARCH_DATABASE.slice(0, 6);
    }
    const q = searchQuery.toLowerCase().trim();
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    setSelectedSearchIndex(0);
  }, [searchResults]);

  // Handle Search Selection
  const handleSelectSearchItem = useCallback(
    (item) => {
      setSearchModalOpen(false);

      if (item.isAction === 'consult') {
        if (onOpenConsultation) {
          onOpenConsultation();
        } else {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (item.isAction === 'call') {
        window.location.href = `tel:${SITE_CONFIG.contact.primaryPhoneRaw}`;
      } else if (item.href) {
        if (item.href.startsWith('/#') && !isServicePage) {
          const targetId = item.href.replace('/#', '');
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = item.href;
          }
        } else {
          window.location.href = item.href;
        }
      }
    },
    [onOpenConsultation, isServicePage]
  );

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSearchIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSearchIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedSearchIndex]) {
        handleSelectSearchItem(searchResults[selectedSearchIndex]);
      }
    }
  };

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const servicesList = SERVICES.filter((s) => s.id !== 'calculator');

  const getNavHref = (targetHref) => {
    if (targetHref.startsWith('#') && isServicePage) {
      return `/${targetHref}`;
    }
    return targetHref;
  };

  return (
    <>
      {/* ── SEARCH MODAL (SPOTLIGHT COMMAND PALETTE) ────────────────────────── */}
      {searchModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick Search"
          className="fixed inset-0 z-[300] flex items-start justify-center pt-20 sm:pt-28 px-4"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchModalOpen(false)}
          />

          <div className="relative w-full max-w-xl bg-[#0B132B] border border-white/15 rounded-2xl shadow-2xl overflow-hidden spotlight-modal-animate z-10 flex flex-col max-h-[75vh]">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <svg className="w-4 h-4 text-[#00BFA6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search services, subsidy, calculator, FAQs..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-sm font-medium focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-gray-400 bg-white/10 rounded">
                ESC
              </kbd>
            </div>

            <div className="overflow-y-auto p-2 space-y-1">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => {
                  const isSelected = index === selectedSearchIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSearchItem(item)}
                      onMouseEnter={() => setSelectedSearchIndex(index)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <span className="text-xs font-semibold text-white block">{item.title}</span>
                          <span className="text-[11px] text-gray-400 line-clamp-1">{item.desc}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.category}</span>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-gray-400">
                  No results found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE MENU DRAWER ──────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[250] transition-opacity duration-300 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-[#070D1E]/75 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          <div
            className="relative z-10 h-full w-[85%] max-w-sm bg-[#0B132B] border-r border-white/10 p-5 flex flex-col justify-between transform transition-transform duration-300 ease-out translate-x-0 overflow-y-auto"
          >
          <div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/10">
              <a href="/" className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                  <img src="/images/logo.svg" alt="Neonix Logo" className="h-full w-auto" width="32" height="32" />
                </div>
                <span className="text-white font-extrabold text-base tracking-tight">Neonix</span>
              </a>
              <button
                aria-label="Close Navigation Menu"
                className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Search inside Drawer */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full mb-4 flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs"
            >
              <span className="flex items-center gap-2 text-gray-400">
                <svg className="w-3.5 h-3.5 text-[#00BFA6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search...
              </span>
              <kbd className="text-[10px] text-gray-400 bg-white/10 px-1.5 py-0.2 rounded">⌘K</kbd>
            </button>

            {/* Solutions List */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00BFA6] block mb-2">
                Solar Solutions
              </span>
              <div className="space-y-1">
                {servicesList.map((srv) => (
                  <a
                    key={srv.id}
                    href={srv.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 text-white transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>{srv.icon}</span>
                      <span className="font-medium">{srv.name}</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-semibold">{srv.badge}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="mb-4 pt-2 border-t border-white/5">
              <ul className="space-y-1 text-xs font-medium text-gray-200">
                {MINIMAL_NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={getNavHref(link.href)}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-2.5 rounded-lg hover:bg-white/5 hover:text-[#00BFA6] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Action CTA & Direct Call */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full bg-[#0F9D58] hover:bg-[#0c8248] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all text-center block"
            >
              Free Roof Survey
            </button>
            <a
              href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`}
              className="block text-center text-[11px] text-gray-400 hover:text-white transition-colors"
            >
              📞 {SITE_CONFIG.contact.primaryPhone}
            </a>
          </div>
        </div>
      </div>
      )}

      {/* ── FULL CANVAS EDGE-TO-EDGE BLUR BAND (Stretches across entire screen from left to right) ── */}
      <div className="nav-full-canvas-blur" aria-hidden="true" />

      {/* ── MINIMALIST FLOATING ISLAND HEADER ───────────────────────────────── */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-[100] px-3 sm:px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto relative">
          <nav
            aria-label="Main Navigation"
            className={`transition-all duration-300 flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)] relative ${
              scrolled
                ? 'bg-[#0B132B]/90 backdrop-blur-2xl border-white/20'
                : 'bg-[#0B132B]/80 backdrop-blur-xl'
            }`}
          >
            {/* 1. Brand Logo */}
            <a
              href="/"
              className="flex items-center gap-2 group shrink-0"
              aria-label="Neonix Infra Solutions"
            >
              <div className="bg-white rounded-full p-1 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center shadow transition-transform duration-300 group-hover:scale-105">
                <img src="/images/logo.svg" alt="Neonix Logo" className="h-full w-auto object-contain" width="32" height="32" />
              </div>
              <span className="text-white font-black text-base sm:text-lg tracking-tight group-hover:text-[#00BFA6] transition-colors">
                Neonix
              </span>
            </a>

            {/* 2. Desktop Curated Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-xs font-semibold">

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
                    servicesOpen || currentService
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Solutions</span>
                  <svg
                    className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-[#00BFA6]' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Minimalist Solutions Dropdown Card */}
                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50 nav-dropdown-animate"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="w-72 bg-[#0F172A]/95 border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1">
                      {servicesList.map((srv) => {
                        const isActive = currentService === srv.id;
                        return (
                          <a
                            key={srv.id}
                            href={srv.href}
                            onClick={() => setServicesOpen(false)}
                            className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                              isActive
                                ? 'bg-emerald-500/15 text-white'
                                : 'hover:bg-white/5 text-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{srv.icon}</span>
                              <div className="leading-tight">
                                <span className="text-xs font-bold block">{srv.name}</span>
                                <span className="text-[10px] text-gray-400 line-clamp-1">{srv.desc}</span>
                              </div>
                            </div>
                            <span className="text-[9px] text-emerald-400 font-semibold shrink-0 ml-1">
                              {srv.badge}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Minimal Nav Links */}
              {MINIMAL_NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={getNavHref(link.href)}
                  className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                    link.badge
                      ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* 3. Right Action Group (Search Icon + Minimal CTA + Hamburger) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

              {/* Minimalist Search Icon Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search site (⌘K)"
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Search (⌘K)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Minimal Clean Consultation CTA */}
              <MagneticElement
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hidden sm:inline-flex items-center bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm hover:shadow-[0_0_15px_rgba(15,157,88,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Free Survey</span>
              </MagneticElement>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 17h16'}
                  />
                </svg>
              </button>

            </div>

          </nav>
        </div>
      </header>
    </>
  );
}
