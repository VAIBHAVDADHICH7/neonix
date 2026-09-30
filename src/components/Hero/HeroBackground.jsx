export default function HeroBackground({
  bgImage = '/images/8.webp',
  alt = 'Rooftop solar panels on Indian homes',
  showGlowOrbs = true,
  className = '',
}) {
  return (
    <>
      {/* Background Image Layer (Semantic <img> for crawler indexing & LCP optimization) */}
      <img
        id="hero-bg-layer"
        src={bgImage}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[120ms] ease-out will-change-transform ${className}`}
        style={{ transform: 'scale(1)' }}
      />

      {/* Radial and Directional Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070D1E]/95 via-[#070D1E]/80 to-[#070D1E]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/90 via-transparent to-[#070D1E]/60" />

      {/* Decorative Glow Orbs */}
      {showGlowOrbs && (
        <>
          <div className="hidden md:block absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#00BFA6]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden md:block absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#0F9D58]/15 rounded-full blur-3xl pointer-events-none" />
        </>
      )}
    </>
  );
}
