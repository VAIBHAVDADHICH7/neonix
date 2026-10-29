import { useState, useEffect } from 'react';
import HeroSlide from './HeroSlide';
import { DEFAULT_HERO_SLIDES } from './heroData';

export default function HeroCarousel({
  slides = DEFAULT_HERO_SLIDES,
  className = '',
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    const timer = setTimeout(() => setActive(true), 2500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="hero-carousel"
      className={`scrolly-transition absolute inset-0 w-full h-full flex items-center justify-center opacity-0 invisible pointer-events-none ${className}`}
    >
      {slides.map((slide) => (
        <HeroSlide
          key={slide.id}
          {...slide}
          // Defer image src until initial page load is finished
          image={active ? slide.image : null}
        />
      ))}
    </div>
  );
}
