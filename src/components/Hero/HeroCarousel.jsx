import HeroSlide from './HeroSlide';
import { DEFAULT_HERO_SLIDES } from './heroData';

export default function HeroCarousel({
  slides = DEFAULT_HERO_SLIDES,
  className = '',
}) {
  return (
    <div
      id="hero-carousel"
      className={`scrolly-transition absolute inset-0 w-full h-full flex items-center justify-center opacity-0 invisible ${className}`}
    >
      {slides.map((slide) => (
        <HeroSlide key={slide.id} {...slide} />
      ))}
    </div>
  );
}
