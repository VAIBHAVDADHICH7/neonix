import { useEffect, useState } from 'react';

export default function Hero({ onOpenConsultation }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    monthly_bill: '4500',
    property_type: 'Residential',
  });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const isNameValid = formData.name.trim().length >= 2;
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone.trim());
  const isLocationValid = formData.location.trim().length >= 2;
  const isBillValid = Number(formData.monthly_bill) >= 500;
  const isQuickFormValid = isNameValid && isPhoneValid && isLocationValid && isBillValid;

  // Real-time savings estimation (used in form submission payload)
  const numBill = Math.max(500, Number(formData.monthly_bill) || 4500);
  const estimatedYearlySavings = Math.round(numBill * 0.9 * 12);
  const estimatedSubsidy = formData.property_type === 'Residential' ? '₹78,000 Domestic' : '40% Tax Benefit';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleQuickLeadSubmit = async (e) => {
    e.preventDefault();
    if (!isQuickFormValid) {
      setTouched({ name: true, phone: true, location: true, monthly_bill: true });
      return;
    }
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedYearlySavings,
          estimatedSubsidy,
          source: 'Hero Responsive Interactive Lead Form',
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', location: '', monthly_bill: '4500', property_type: 'Residential' });
      setTouched({});
      setTimeout(() => setSubmitSuccess(false), 6000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scrollytelling effect
  useEffect(() => {
    function throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }

    const scrollyHero = document.getElementById('scrolly-hero');
    const heroMainLayer = document.getElementById('hero-main-layer');
    const heroCarousel = document.getElementById('hero-carousel');
    const titleGroup = document.getElementById('hero-title-group');
    const formGroup = document.getElementById('hero-form-group');
    const slideAbout = document.getElementById('slide-about');
    const slideMission = document.getElementById('slide-mission');
    const slideVision = document.getElementById('slide-vision');
    const heroBgLayer = document.getElementById('hero-bg-layer');

    const scrollytellerScrollHandler = () => {
      if (!scrollyHero) return;
      const rect = scrollyHero.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      let progress = 0;
      if (scrollDistance > 0) {
        progress = -rect.top / scrollDistance;
        progress = Math.max(0, Math.min(1, progress));
      }

      if (heroBgLayer) heroBgLayer.style.transform = `scale(${1 + progress * 0.12})`;

      const T0 = 0.15, T1 = 0.38, T2 = 0.62, T3 = 0.82;

      if (progress < T0) {
        setCurrentSlideIndex(0);
        if (heroMainLayer) { heroMainLayer.style.opacity = '1'; heroMainLayer.style.visibility = 'visible'; }
        if (heroCarousel) { heroCarousel.style.opacity = '0'; heroCarousel.style.visibility = 'hidden'; }
        if (titleGroup) titleGroup.style.transform = 'translateY(2vh)';
        if (formGroup) { formGroup.style.opacity = '0.9'; formGroup.style.transform = 'translateY(16px)'; }
        if (slideAbout) { slideAbout.style.opacity = '0'; slideAbout.style.transform = 'translateX(40px)'; }
        if (slideMission) { slideMission.style.opacity = '0'; slideMission.style.transform = 'translateX(40px)'; }
        if (slideVision) { slideVision.style.opacity = '0'; slideVision.style.transform = 'translateX(40px)'; }
      } else if (progress >= T0 && progress < T1) {
        setCurrentSlideIndex(0);
        if (heroMainLayer) { heroMainLayer.style.opacity = '1'; heroMainLayer.style.visibility = 'visible'; }
        if (heroCarousel) { heroCarousel.style.opacity = '0'; heroCarousel.style.visibility = 'hidden'; }
        if (titleGroup) titleGroup.style.transform = 'translateY(0)';
        if (formGroup) { formGroup.style.opacity = '1'; formGroup.style.transform = 'translateY(0)'; }
        if (slideAbout) { slideAbout.style.opacity = '0'; slideAbout.style.transform = 'translateX(40px)'; }
        if (slideMission) { slideMission.style.opacity = '0'; slideMission.style.transform = 'translateX(40px)'; }
        if (slideVision) { slideVision.style.opacity = '0'; slideVision.style.transform = 'translateX(40px)'; }
      } else if (progress >= T1 && progress < T2) {
        setCurrentSlideIndex(1);
        if (heroMainLayer) { heroMainLayer.style.opacity = '0'; heroMainLayer.style.visibility = 'hidden'; }
        if (heroCarousel) { heroCarousel.style.opacity = '1'; heroCarousel.style.visibility = 'visible'; }
        if (slideAbout) { slideAbout.style.opacity = '1'; slideAbout.style.transform = 'translateX(0)'; }
        if (slideMission) { slideMission.style.opacity = '0'; slideMission.style.transform = 'translateX(40px)'; }
        if (slideVision) { slideVision.style.opacity = '0'; slideVision.style.transform = 'translateX(40px)'; }
      } else if (progress >= T2 && progress < T3) {
        setCurrentSlideIndex(2);
        if (heroMainLayer) { heroMainLayer.style.opacity = '0'; heroMainLayer.style.visibility = 'hidden'; }
        if (heroCarousel) { heroCarousel.style.opacity = '1'; heroCarousel.style.visibility = 'visible'; }
        if (slideAbout) { slideAbout.style.opacity = '0'; slideAbout.style.transform = 'translateX(-40px)'; }
        if (slideMission) { slideMission.style.opacity = '1'; slideMission.style.transform = 'translateX(0)'; }
        if (slideVision) { slideVision.style.opacity = '0'; slideVision.style.transform = 'translateX(40px)'; }
      } else {
        setCurrentSlideIndex(3);
        if (heroMainLayer) { heroMainLayer.style.opacity = '0'; heroMainLayer.style.visibility = 'hidden'; }
        if (heroCarousel) { heroCarousel.style.opacity = '1'; heroCarousel.style.visibility = 'visible'; }
        if (slideAbout) { slideAbout.style.opacity = '0'; slideAbout.style.transform = 'translateX(-40px)'; }
        if (slideMission) { slideMission.style.opacity = '0'; slideMission.style.transform = 'translateX(-40px)'; }
        if (slideVision) { slideVision.style.opacity = '1'; slideVision.style.transform = 'translateX(0)'; }
      }
    };

    const throttledHandler = throttle(scrollytellerScrollHandler, 35);
    window.addEventListener('scroll', throttledHandler, { passive: true });
    scrollytellerScrollHandler();
    return () => window.removeEventListener('scroll', throttledHandler);
  }, []);

  const scrollToCalculator = () => {
    const el = document.getElementById('roi-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── SHARED INPUT STYLE ────────────────────────────────────────────────────
  const inputClass = (invalid) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00BFA6] transition-colors ${invalid ? 'border-red-500/60' : 'border-white/10 focus:border-[#00BFA6]'
    }`;

  return (
    <section
      id="scrolly-hero"
      className="relative h-[380vh] w-full bg-[#070D1E]"
      aria-label="Neonix Rooftop Solar Hero"
    >

      {/* ── STICKY VIEWPORT ─────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 min-h-[100dvh] md:h-[100dvh] w-full flex flex-col overflow-visible md:overflow-hidden"
        style={{ maxWidth: '100vw' }}
      >
        {/* Background */}
        <div
          id="hero-bg-layer"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[120ms] ease-out will-change-transform"
          style={{ backgroundImage: "url('/images/8.webp')", transform: 'scale(1)' }}
          role="img"
          aria-label="Rooftop solar panels on Indian homes"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D1E]/95 via-[#070D1E]/80 to-[#070D1E]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/90 via-transparent to-[#070D1E]/60" />
        <div className="hidden md:block absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#00BFA6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden md:block absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#0F9D58]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Navbar spacer */}
        <div className="h-14 sm:h-16 w-full shrink-0" />

        {/* ── CONTENT ───────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center pointer-events-none overflow-y-auto lg:overflow-visible my-auto py-4">

          {/* ═══ LAYER 1 — MAIN HERO ════════════════════════════════════════ */}
          <div id="hero-main-layer" className="scrolly-transition w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center w-full">

              {/* LEFT: Copy */}
              <div className="space-y-5 text-center lg:text-left">
                <div id="hero-title-group" className="scrolly-transition transform translate-y-[2vh] space-y-4">

                  {/* Eyebrow */}
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#00BFA6]">
                    Your Dedicated Solar Partner in India
                  </p>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-white leading-[1.05]">
                    Rooftop Solar<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA6] to-[#22C55E]">
                      Solutions
                    </span>
                  </h1>

                  {/* Trust Pills */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    {['✓ Govt. Subsidy Available', '✓ High Quality Assurance', '✓ AMC Support'].map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-semibold text-white/80 bg-white/[0.08] border border-white/15 px-3 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Sub-headline */}
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Powering your home & business with clean, green solar energy and expert solar panel installations.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pointer-events-auto pt-10">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation && onOpenConsultation()}
                    className="bg-[#0B7542] hover:bg-[#085e33] text-white font-bold text-sm px-6 py-3 rounded-lg transition-all shadow-lg cursor-pointer"
                  >
                    Get Quote Now
                  </button>
                  <button
                    type="button"
                    onClick={scrollToCalculator}
                    className="bg-white/[0.07] hover:bg-white/[0.12] border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all cursor-pointer"
                  >
                    Free Consultation
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 pt-3 border-t border-white/10 max-w-md mx-auto lg:mx-0">
                  {[
                    { value: '100%', label: 'Dedication' },
                    { value: '₹78K+', label: 'Govt Subsidy' },
                    { value: '30+', label: 'Yrs Lifespan' },
                    { value: '90%', label: 'Bill Reduction' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <span className="block text-lg sm:text-xl font-black text-white">{stat.value}</span>
                      <span className="block text-[9px] font-semibold uppercase tracking-wider text-gray-400 leading-tight mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Form */}
              <div
                id="hero-form-group"
                className="flex justify-center lg:justify-end w-full pointer-events-auto scrolly-transition transform translate-y-4 opacity-90"
              >
                <div className="w-full max-w-md bg-[#0B132B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
                  <h2 className="text-base sm:text-lg font-bold text-white mb-4">Get Your Free Proposal</h2>

                  {submitSuccess && (
                    <div className="mb-4 p-3 bg-[#0B7542]/20 border border-[#0B7542]/50 text-[#00BFA6] rounded-lg text-xs font-semibold" role="status">
                      ✓ Thank you! Our expert will call you shortly.
                    </div>
                  )}
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-500/15 border border-red-500/40 text-red-300 rounded-lg text-xs" role="alert">
                      Something went wrong. Please call +91 99100 00774.
                    </div>
                  )}

                  <form onSubmit={handleQuickLeadSubmit} noValidate className="space-y-3">

                    {/* Property type toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/30 rounded-xl border border-white/[0.08]">
                      {['Residential', 'Commercial'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, property_type: type }))}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${formData.property_type === type ? 'bg-[#0B7542] text-white shadow-sm' : 'text-gray-300 hover:text-white'
                            }`}
                        >
                          {type === 'Residential' ? '🏡 Home' : '🏢 Business'}
                        </button>
                      ))}
                    </div>

                    {/* Name */}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Name (As per electric bill)"
                      aria-label="Full Name"
                      required
                      className={inputClass(touched.name && !isNameValid)}
                    />

                    {/* Phone + Pincode */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('phone')}
                        placeholder="Mobile No."
                        aria-label="Mobile Number"
                        required
                        className={inputClass(touched.phone && !isPhoneValid)}
                      />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('location')}
                        placeholder="Pin Code"
                        aria-label="City or Pincode"
                        required
                        className={inputClass(touched.location && !isLocationValid)}
                      />
                    </div>

                    {/* Monthly Bill */}
                    <input
                      type="number"
                      name="monthly_bill"
                      value={formData.monthly_bill}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('monthly_bill')}
                      placeholder="Monthly Bill (₹)"
                      aria-label="Monthly Bill Amount"
                      required
                      className={inputClass(touched.monthly_bill && !isBillValid)}
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0B7542] hover:bg-[#085e33] active:bg-[#074b2a] text-white font-bold text-sm py-3.5 rounded-xl uppercase tracking-widest transition-all shadow-md disabled:opacity-50 cursor-pointer min-h-[48px]"
                    >
                      {isSubmitting ? 'Submitting...' : 'Check My Savings'}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>

          {/* ═══ LAYER 2 — SCROLLYTELLING CAROUSEL ══════════════════════════ */}
          <div
            id="hero-carousel"
            className="scrolly-transition absolute inset-0 w-full h-full flex items-center justify-center opacity-0 invisible"
          >
            {/* Slide 1: About */}
            <div id="slide-about" className="scrolly-transition absolute w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-14 transform translate-x-12 opacity-0 pointer-events-auto px-4">
              <div className="w-full md:w-5/12 flex justify-center">
                <div className="w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/[0.06] backdrop-blur-xl p-3">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#0F172A] relative">
                    <img src="/images/9.webp" alt="Neonix Solar Certified Engineers on-site" fetchPriority="high" width="400" height="533" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/70 via-transparent to-transparent" />
                  </div>
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Neonix Certified Engineers</h3>
                      <p className="text-[10px] text-[#00BFA6] font-semibold uppercase tracking-wider">MNRE Channel Partner</p>
                    </div>
                    <span className="text-[10px] font-bold bg-[#0F9D58]/20 text-[#00BFA6] px-2.5 py-1 rounded-full border border-[#00BFA6]/25">Tier-1 EPC</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-7/12 text-white space-y-4 text-center md:text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00BFA6]">About Neonix</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">Your Trusted Partner for Clean Solar Power.</h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">We help Indian families and businesses install high-quality rooftop solar systems. You get zero-hassle setup, maximum electricity bill savings, and systems that run smoothly for over 30 years.</p>
              </div>
            </div>

            {/* Slide 2: Mission */}
            <div id="slide-mission" className="scrolly-transition absolute w-full max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-14 transform translate-x-12 opacity-0 pointer-events-auto px-4">
              <div className="w-full md:w-5/12 flex justify-center">
                <div className="w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/[0.06] backdrop-blur-xl p-3">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#0F172A] relative">
                    <img src="/images/1.webp" alt="Hemlata Sharma - Managing Director" fetchPriority="high" width="400" height="533" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/70 via-transparent to-transparent" />
                  </div>
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Hemlata Sharma</h3>
                      <p className="text-[10px] text-[#00BFA6] font-semibold uppercase tracking-wider">Managing Director</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15">Leadership</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-7/12 text-white space-y-4 text-center md:text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00BFA6]">Our Mission</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">Solar for Every Home with PM Surya Ghar.</h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">Our goal is to help every family reduce their electricity bills by 90%. We take care of all the government paperwork so you receive your ₹78,000 domestic govt. benefits without any stress.</p>
              </div>
            </div>

            {/* Slide 3: Vision */}
            <div id="slide-vision" className="scrolly-transition absolute w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-14 transform translate-x-12 opacity-0 pointer-events-auto px-4">
              <div className="w-full md:w-5/12 flex justify-center">
                <div className="w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-white/[0.06] backdrop-blur-xl p-3">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#0F172A] relative">
                    <img src="/images/2.webp" alt="Amit Kumar Sharma - Co-Founder & CEO" fetchPriority="high" width="400" height="533" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/70 via-transparent to-transparent" />
                  </div>
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Amit Kumar Sharma</h3>
                      <p className="text-[10px] text-[#F59E0B] font-semibold uppercase tracking-wider">Co-Founder & CEO</p>
                    </div>
                    <span className="text-[10px] font-bold bg-[#F59E0B]/15 text-[#F59E0B] px-2.5 py-1 rounded-full border border-[#F59E0B]/25">Co-Founder</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-7/12 text-white space-y-4 text-center md:text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">Our Vision</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">Zero Electricity Bills for Everyone.</h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">We believe every roof can produce clean and free electricity. With strong solar panels and free service maintenance, we ensure you enjoy worry-free energy for 30 years.</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM SCROLLY INDICATOR ─────────────────────────────────────── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-3 pointer-events-none border-t border-white/[0.08]">
          <span className="text-[10px] font-semibold text-gray-500 tracking-wide hidden sm:block">Scroll to explore</span>
          <div className="flex items-center gap-1.5 ml-auto">
            {['Plan', 'About', 'Mission', 'Vision'].map((label, idx) => (
              <span
                key={label}
                className={`px-2 py-0.5 rounded-full transition-all text-[9px] font-bold ${currentSlideIndex === idx ? 'bg-[#00BFA6] text-[#070D1E]' : 'bg-white/5 text-gray-500'
                  }`}
              >
                {String(idx + 1).padStart(2, '0')} {label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
