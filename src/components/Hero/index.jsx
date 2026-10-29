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
  showFormOnMobile = true,
  showScrollIndicator = true,
  className = '',
  children,
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Smooth scrollytelling scroll listener with requestAnimationFrame
  useEffect(() => {
    let rafId = null;
    let isTicking = false;

    const updateScrollyteller = () => {
      isTicking = false;
      const scrollyHero = document.getElementById('scrolly-hero');
      if (!scrollyHero) return;

      const heroMainLayer = document.getElementById('hero-main-layer');
      const heroHeadlineCol = document.getElementById('hero-headline-col');
      const heroFormCol = document.getElementById('hero-form-col');
      const heroCarousel = document.getElementById('hero-carousel');
      const slideAbout = document.getElementById('slide-about');
      const slideMission = document.getElementById('slide-mission');
      const slideVision = document.getElementById('slide-vision');
      const heroBgLayer = document.getElementById('hero-bg-layer');

      const rect = scrollyHero.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      let progress = 0;
      if (scrollDistance > 0) {
        progress = -rect.top / scrollDistance;
        progress = Math.max(0, Math.min(1, progress));
      }

      if (heroBgLayer) {
        heroBgLayer.style.transform = `scale(${1 + progress * 0.1})`;
      }

      const isMobile = window.innerWidth < 768;
      const T_FORM = 0.15;
      const T1 = 0.38;
      const T2 = 0.62;
      const T3 = 0.82;

      if (progress < T1) {
        // Stage 0 & 1: Hero Main (Headline & Proposal Form)
        setCurrentSlideIndex(0);

        if (heroMainLayer) {
          heroMainLayer.style.opacity = '1';
          heroMainLayer.style.visibility = 'visible';
          heroMainLayer.style.pointerEvents = 'auto';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '0';
          heroCarousel.style.visibility = 'hidden';
          heroCarousel.style.pointerEvents = 'none';
        }

        if (isMobile) {
          if (progress < T_FORM) {
            // Mobile Stage 0: Headline prominent
            if (heroHeadlineCol) {
              heroHeadlineCol.style.opacity = '1';
              heroHeadlineCol.style.transform = 'translateY(0)';
              heroHeadlineCol.style.pointerEvents = 'auto';
              heroHeadlineCol.style.visibility = 'visible';
            }
            if (heroFormCol) {
              heroFormCol.style.opacity = '0';
              heroFormCol.style.transform = 'translateY(24px)';
              heroFormCol.style.pointerEvents = 'none';
              heroFormCol.style.visibility = 'hidden';
            }
          } else {
            // Mobile Stage 1: Form prominent
            if (heroHeadlineCol) {
              heroHeadlineCol.style.opacity = '0';
              heroHeadlineCol.style.transform = 'translateY(-20px)';
              heroHeadlineCol.style.pointerEvents = 'none';
              heroHeadlineCol.style.visibility = 'hidden';
            }
            if (heroFormCol) {
              heroFormCol.style.opacity = '1';
              heroFormCol.style.transform = 'translateY(0)';
              heroFormCol.style.pointerEvents = 'auto';
              heroFormCol.style.visibility = 'visible';
            }
          }
        } else {
          // Desktop: both Headline and Form are visible side-by-side
          if (heroHeadlineCol) {
            heroHeadlineCol.style.opacity = '1';
            heroHeadlineCol.style.transform = 'none';
            heroHeadlineCol.style.pointerEvents = 'auto';
            heroHeadlineCol.style.visibility = 'visible';
          }
          if (heroFormCol) {
            heroFormCol.style.opacity = '1';
            heroFormCol.style.transform = 'none';
            heroFormCol.style.pointerEvents = 'auto';
            heroFormCol.style.visibility = 'visible';
          }
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
        // Stage 2: Slide 1 (About)
        setCurrentSlideIndex(1);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '0';
          heroMainLayer.style.visibility = 'hidden';
          heroMainLayer.style.pointerEvents = 'none';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '1';
          heroCarousel.style.visibility = 'visible';
          heroCarousel.style.pointerEvents = 'auto';
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
        // Stage 3: Slide 2 (Mission)
        setCurrentSlideIndex(2);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '0';
          heroMainLayer.style.visibility = 'hidden';
          heroMainLayer.style.pointerEvents = 'none';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '1';
          heroCarousel.style.visibility = 'visible';
          heroCarousel.style.pointerEvents = 'auto';
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
        // Stage 4: Slide 3 (Vision)
        setCurrentSlideIndex(3);
        if (heroMainLayer) {
          heroMainLayer.style.opacity = '0';
          heroMainLayer.style.visibility = 'hidden';
          heroMainLayer.style.pointerEvents = 'none';
        }
        if (heroCarousel) {
          heroCarousel.style.opacity = '1';
          heroCarousel.style.visibility = 'visible';
          heroCarousel.style.pointerEvents = 'auto';
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

    const onScroll = () => {
      if (!isTicking) {
        rafId = requestAnimationFrame(updateScrollyteller);
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollyteller();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToHeroForm = () => {
    const scrollyHero = document.getElementById('scrolly-hero');
    if (scrollyHero) {
      const rect = scrollyHero.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      const targetY = window.scrollY + rect.top + scrollDistance * 0.22;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="scrolly-hero"
      className={`relative h-[340vh] sm:h-[380vh] w-full bg-[#F8FAFC] ${className}`}
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
              <div id="hero-main-layer" className="scrolly-transition w-full relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center w-full relative">
                  {/* Left Column: Headline, Actions & Stats */}
                  <div
                    id="hero-headline-col"
                    className="scrolly-transition space-y-3.5 sm:space-y-6 text-center md:text-left max-w-xl mx-auto md:mx-0 w-full"
                  >
                    <HeroHeadline
                      badgeText={badgeText}
                      title={title}
                      highlightText={highlightText}
                      subtitle={subtitle}
                      trustChips={trustChips}
                    />

                    <HeroActions
                      onOpenConsultation={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          scrollToHeroForm();
                        } else if (onOpenConsultation) {
                          onOpenConsultation();
                        }
                      }}
                      onScrollToCalculator={onScrollToCalculator}
                    />

                    <HeroStats stats={stats} />
                  </div>

                  {/* Right Column: Lead Proposal Form (Mobile center stage, tablet & desktop right-aligned) */}
                  <div
                    id="hero-form-col"
                    className={`${
                      showFormOnMobile
                        ? 'flex justify-center absolute md:relative inset-0 md:inset-auto items-center md:items-start md:justify-end'
                        : 'hidden md:flex justify-end'
                    } w-full pointer-events-auto scrolly-transition`}
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

        {/* Bottom Scroll Indicator */}
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
