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

  // Hero remains clean, accessible, and permanently visible at all times

  return (
    <section
      id="hero"
      className={`relative min-h-[90vh] lg:min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden ${className}`}
      aria-label="Neonix Rooftop Solar Hero"
    >
      {/* Modular Background Layer */}
      <HeroBackground bgImage={bgImage} />

      {/* Navbar Spacer */}
      <div className="h-14 sm:h-16 w-full shrink-0" />

      {/* ── MAIN CONTENT LAYER ── */}
      <div className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-center my-auto py-3 sm:py-5 lg:py-6">
        {children || (
          <div id="hero-main-layer" className="w-full">
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

              {/* Right Column: Lead Proposal Form (Permanently visible and interactive) */}
              <div
                className="w-full flex justify-center lg:justify-end pointer-events-auto"
              >
                <HeroLeadForm title={leadFormTitle} webhookUrl={webhookUrl} />
              </div>
            </div>
          </div>
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
