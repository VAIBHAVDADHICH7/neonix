import { useState, useEffect, useRef } from 'react';

// Advanced Magnetic Button Component
const MagneticElement = ({ children, className, onClick, as: Tag = 'button', ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const hx = rect.left + rect.width / 2;
      const hy = rect.top + rect.height / 2;
      const dx = e.clientX - hx;
      const dy = e.clientY - hy;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 90) {
        element.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
      } else {
        element.style.transform = 'translate(0px, 0px)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Tag 
      ref={ref} 
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default function Navbar({ onOpenConsultation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
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

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Govt. Subsidy', href: '#subsidy-info' },
    { name: 'Savings Calculator', href: '#roi-calculator' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* MOBILE FULL-SCREEN DRAWER */}
      <div 
        className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className={`absolute inset-0 bg-[#0B132B]/85 cursor-pointer transition-all duration-500 ${isMenuOpen ? 'backdrop-blur-md' : 'backdrop-blur-none'}`} 
          onClick={() => setIsMenuOpen(false)}
        />

        <div 
          id="mobile-menu-drawer" 
          aria-hidden={!isMenuOpen} 
          className={`relative z-10 h-full w-[85%] max-w-sm bg-[#0B132B] border-r border-white/10 p-6 flex flex-col justify-between transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}
        >
          <div>
            {/* Top of drawer: Close button & Logo */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <img src="/images/logo.svg" alt="Neonix Logo" className="h-9 w-auto bg-white p-1.5 rounded-full" width="36" height="36" />
                <div>
                  <span className="text-white font-bold text-lg block leading-none">Neonix</span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider">Infra Solutions</span>
                </div>
              </div>
              <button 
                aria-label="Close Navigation Menu" 
                className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Primary CTA */}
            <div className="mb-6">
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
                className="w-full bg-[#0F9D58] hover:bg-[#0c8248] text-white font-bold py-3.5 px-5 rounded-xl text-xs tracking-wide transition-all shadow-[0_4px_14px_rgba(15,157,88,0.35)] flex items-center justify-center gap-2"
              >
                <span>Get Free Roof Consultation</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-200 text-base font-medium hover:text-[#00BFA6] transition-colors py-2 border-b border-white/5"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact quick info */}
          <div className="pt-4 border-t border-white/10 text-xs text-gray-400">
            <p className="font-semibold text-white mb-1">Customer Support</p>
            <p>📞 +91 99100 00774 / +91 90886 88899</p>
            <p className="mt-0.5">📍 Jaipur, Rajasthan 302020</p>
          </div>
        </div>
      </div>

      {/* STICKY HEADER NAVIGATION (Minimalist, Clean & Fast) */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#0B132B]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)] py-2.5' : 'bg-[#0B132B]/75 backdrop-blur-sm py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
          
          {/* Logo (Top Left) */}
          <MagneticElement 
            as="a" 
            href="#scrolly-hero" 
            className="flex items-center gap-2.5 group cursor-pointer min-h-[48px]" 
            aria-label="Neonix INFRA SOLUTIONS"
          >
            <div className="bg-white rounded-full p-1 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-105">
              <img src="/images/logo.svg" alt="Neonix Logo" className="h-full w-auto object-contain" width="40" height="40" />
            </div>
            <div className="flex flex-col justify-center leading-none text-left">
              <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight transition-colors group-hover:text-[#00BFA6]">Neonix</span>
              <span className="text-gray-300 font-semibold text-[8px] sm:text-[9px] tracking-widest uppercase">Infra Solutions</span>
            </div>
          </MagneticElement>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-gray-200 text-sm font-semibold hover:text-[#00BFA6] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00BFA6] rounded-full transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: CTA Button + Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0F9D58] hover:bg-[#0c8248] text-white text-xs font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-sm hover:shadow-[0_0_16px_rgba(15,157,88,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 shimmer-btn"
            >
              <span>Get Free Consultation</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="lg:hidden p-2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
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
