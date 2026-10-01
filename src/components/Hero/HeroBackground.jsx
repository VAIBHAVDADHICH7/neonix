export default function HeroBackground({
  bgImage = '/images/residential-solar.webp',
  alt = 'Neonix rooftop solar panel installation on residential home in India',
  showGlowOrbs = true,
  className = '',
}) {
  return (
    <>
      {/* Background Image Layer: Authentic Rooftop Solar Business Installation */}
      <img
        id="hero-bg-layer"
        src={bgImage}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        width="1158"
        height="868"
        className={`absolute inset-0 w-full h-full object-cover object-[center_35%] lg:object-[right_center] transition-transform duration-[120ms] ease-out will-change-transform opacity-75 sm:opacity-85 ${className}`}
        style={{ transform: 'scale(1)' }}
      />

      {/* Asymmetric Left Gradient Shield: Guarantees 100% WCAG contrast for headline & copy while letting solar panels shine on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/92 via-55% to-white/40" />

      {/* Top and Bottom Atmosphere Blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/85 to-transparent" />

      {/* Subtle Solar Micro-Dot Mesh Grid for High-Tech Engineering Feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0b7542 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Solar Glow Orbs (Sun Warmth & Clean Energy Aura) */}
      {showGlowOrbs && (
        <>
          {/* Solar Warmth Golden Sun Flare (Top Center/Right) */}
          <div className="hidden md:block absolute -top-16 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 via-yellow-200/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          {/* Eco Solar Emerald Glow Accent (Left Behind Stats) */}
          <div className="hidden md:block absolute bottom-24 -left-16 w-[450px] h-[450px] bg-[#0F9D58]/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}
    </>
  );
}


