import { useEffect, useState } from 'react';
import HeroBackground from './HeroBackground';
import HeroBadge from './HeroBadge';
import HeroHeadline from './HeroHeadline';
import HeroActions from './HeroActions';
import HeroStats from './HeroStats';
import HeroLeadForm from './HeroLeadForm';
import HeroCarousel from './HeroCarousel';
import HeroSlide from './HeroSlide';
import HeroScrollIndicator from './HeroScrollIndicator';
import {
  DEFAULT_HERO_SLIDES,
  DEFAULT_HERO_STATS,
  DEFAULT_TRUST_CHIPS,
} from './heroData';

export default function Hero({
  onOpenConsultation,
  onScrollToCalculator,
  badgeText = 'PM Surya Ghar Subsidy ₹78,000',
  title = 'Rooftop Solar',
  highlightText = 'Solutions',
  subtitle = 'Powering your home & business with high-efficiency clean solar energy and expert turnkey installation in India.',
  trustChips = DEFAULT_TRUST_CHIPS,
  stats = DEFAULT_HERO_STATS,
  slides = DEFAULT_HERO_SLIDES,
  indicatorLabels = ['Plan', 'About', 'Mission', 'Vision'],
  bgImage = '/images/residential-solar.webp',
  leadFormTitle = 'Get Your Free Proposal',
  webhookUrl = 'https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r',
  showFormOnMobile = false,
  showScrollIndicator = false,
  className = '',
  children,
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Scrollytelling scroll listener
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

      const T0 = 0.15,
        T1 = 0.38,
        T2 = 0.62,
        T3 = 0.82;

      if (progress < T0) {
        setCurrentSlideIndex(0);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '1';
          heroMainLayer.style.visibility = 'visible';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '0';
          heroCarousel.style.visibility = 'hidden';
        }
        if (formGroup) {
          formGroup.style.opacity = '0.9';
          formGroup.style.transform = 'translateY(16px)';
        }
        if (slideAbout) {
          slideAbout.style.opacity = '0';
          slideAbout.style.transform = 'translateX(40px)';
        }
        if (slideMission) {
          slideMission.style.opacity = '0';
          slideMission.style.transform = 'translateX(40px)';
        }
        if (slideVision) {
          slideVision.style.opacity = '0';
          slideVision.style.transform = 'translateX(40px)';
        }
      } else if (progress >= T0 && progress < T1) {
        setCurrentSlideIndex(0);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '1';
          heroMainLayer.style.visibility = 'visible';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '0';
          heroCarousel.style.visibility = 'hidden';
        }
        if (formGroup) {
          formGroup.style.opacity = '1';
          formGroup.style.transform = 'translateY(0)';
        }
        if (slideAbout) {
          slideAbout.style.opacity = '0';
          slideAbout.style.transform = 'translateX(40px)';
        }
        if (slideMission) {
          slideMission.style.opacity = '0';
          slideMission.style.transform = 'translateX(40px)';
        }
        if (slideVision) {
          slideVision.style.opacity = '0';
          slideVision.style.transform = 'translateX(40px)';
        }
      } else if (progress >= T1 && progress < T2) {
        setCurrentSlideIndex(1);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '0';
          heroMainLayer.style.visibility = 'hidden';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '1';
          heroCarousel.style.visibility = 'visible';
        }
        if (slideAbout) {
          slideAbout.style.opacity = '1';
          slideAbout.style.transform = 'translateX(0)';
        }
        if (slideMission) {
          slideMission.style.opacity = '0';
          slideMission.style.transform = 'translateX(40px)';
        }
        if (slideVision) {
          slideVision.style.opacity = '0';
          slideVision.style.transform = 'translateX(40px)';
        }
      } else if (progress >= T2 && progress < T3) {
        setCurrentSlideIndex(2);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '0';
          heroMainLayer.style.visibility = 'hidden';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '1';
          heroCarousel.style.visibility = 'visible';
        }
        if (slideAbout) {
          slideAbout.style.opacity = '0';
          slideAbout.style.transform = 'translateX(-40px)';
        }
        if (slideMission) {
          slideMission.style.opacity = '1';
          slideMission.style.transform = 'translateX(0)';
        }
        if (slideVision) {
          slideVision.style.opacity = '0';
          slideVision.style.transform = 'translateX(40px)';
        }
      } else {
        setCurrentSlideIndex(3);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '0';
          heroMainLayer.style.visibility = 'hidden';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '1';
          heroCarousel.style.visibility = 'visible';
        }
        if (slideAbout) {
          slideAbout.style.opacity = '0';
          slideAbout.style.transform = 'translateX(-40px)';
        }
        if (slideMission) {
          slideMission.style.opacity = '0';
          slideMission.style.transform = 'translateX(-40px)';
        }
        if (slideVision) {
          slideVision.style.opacity = '1';
          slideVision.style.transform = 'translateX(0)';
        }
      }
    };

    const throttledHandler = throttle(scrollytellerScrollHandler, 35);
    window.addEventListener('scroll', throttledHandler, { passive: true });
    scrollytellerScrollHandler();
    return () => window.removeEventListener('scroll', throttledHandler);
  }, []);

  return (
    <section
      id="scrolly-hero"
      className={`relative h-[380vh] w-full bg-[#F8FAFC] ${className}`}
      aria-label="Neonix Rooftop Solar Hero"
    >
      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div
        className="sticky top-0 h-[100dvh] w-full flex flex-col overflow-hidden"
        style={{ maxWidth: '100vw' }}
      >
        {/* Modular Background Layer */}
        <HeroBackground bgImage={bgImage} />

        {/* Navbar Spacer */}
        <div className="h-14 sm:h-16 w-full shrink-0" />

        {/* ── MAIN CONTENT LAYER ── */}
        <div className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-center pointer-events-none my-auto py-2 sm:py-4">
          {children || (
            <>
              {/* Layer 1 — Main Hero Grid */}
              <div id="hero-main-layer" className="scrolly-transition w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center w-full">
                  {/* Left Column: Headline, Actions & Stats */}
                  <div className="space-y-4 sm:space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                    <HeroHeadline
                      badgeText={badgeText}
                      title={title}
                      highlightText={highlightText}
                      subtitle={subtitle}
                      trustChips={trustChips}
                    />

                    <HeroActions
                      onOpenConsultation={onOpenConsultation}
                      onScrollToCalculator={onScrollToCalculator}
                    />

                    <HeroStats stats={stats} />
                  </div>

                  {/* Right Column: Lead Proposal Form (Hidden on mobile by default for clean UX) */}
                  <div
                    className={`${
                      showFormOnMobile ? 'flex justify-center' : 'hidden lg:flex justify-end'
                    } w-full pointer-events-auto scrolly-transition transform translate-y-2 sm:translate-y-4 opacity-95`}
                  >
                    <HeroLeadForm title={leadFormTitle} webhookUrl={webhookUrl} />
                  </div>
                </div>
              </div>

              {/* Layer 2 — Scrollytelling Carousel */}
              <HeroCarousel slides={slides} />
            </>
          )}
        </div>

        {/* Optional Bottom Scroll Indicator (disabled by default) */}
        {showScrollIndicator && (
          <HeroScrollIndicator
            currentSlideIndex={currentSlideIndex}
            labels={indicatorLabels}
          />
        )}
      </div>
    </section>
  );
}

// Attach subcomponents as compound properties for easy composition
Hero.Background = HeroBackground;
Hero.Badge = HeroBadge;
Hero.Headline = HeroHeadline;
Hero.Actions = HeroActions;
Hero.Stats = HeroStats;
Hero.LeadForm = HeroLeadForm;
Hero.Carousel = HeroCarousel;
Hero.Slide = HeroSlide;
Hero.ScrollIndicator = HeroScrollIndicator;

// Export individual subcomponents as named exports
export {
  HeroBackground,
  HeroBadge,
  HeroHeadline,
  HeroActions,
  HeroStats,
  HeroLeadForm,
  HeroCarousel,
  HeroSlide,
  HeroScrollIndicator,
};
