import SpotlightCard from './UI/SpotlightCard';

export default function Services() {
  return (
    <>
      {/* ── CRAFTSMANSHIP & INNOVATION ──────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <h2 className="reveal-left text-2xl sm:text-4xl md:text-5xl font-bold max-w-xl leading-tight tracking-tight text-dark-navy">
            Unmatched Solar Craftsmanship that Powers Your Home
          </h2>
          <a href="#video" className="reveal-right flex items-center gap-3 text-sm font-semibold uppercase tracking-wider cursor-pointer group flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-accent-green flex items-center justify-center text-accent-green group-hover:bg-accent-green group-hover:text-white transition-all duration-300 play-btn-pulse">
              <span aria-hidden="true" className="ml-0.5 text-base sm:text-lg">▶</span>
            </div>
            <div>
              <span className="block text-dark-navy">Watch Video</span>
              <span className="text-xs text-gray-600 block font-normal mt-0.5">2 Minutes</span>
            </div>
          </a>
        </div>

        {/* Hero image */}
        <div className="reveal-scale relative rounded-xl sm:rounded-2xl overflow-hidden h-[220px] sm:h-[350px] md:h-[500px] mb-6 sm:mb-8 group cursor-pointer shadow-2xl">
          <img src="/images/solar-installation.webp" alt="Solar Installation" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/20 to-transparent p-5 sm:p-10 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2 sm:mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <div className="w-2 h-2 rounded-full bg-accent-green" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent-green">High Efficiency</span>
            </div>
            <p className="text-white text-sm sm:text-xl md:text-3xl max-w-2xl font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              The premium DCR panels we install provide maximum energy output and are fully eligible for government subsidies.
            </p>
          </div>
        </div>

        {/* Two feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <SpotlightCard
            className="reveal-up delay-100 bg-dark-card text-white p-6 sm:p-10 rounded-xl sm:rounded-2xl flex flex-col justify-between min-h-[260px] sm:min-h-[400px] relative group hover:shadow-2xl transition-all duration-500"
            spotlightColor="rgba(244, 180, 26, 0.15)"
            style={{ backgroundImage: "linear-gradient(rgba(11, 20, 36, 0.9), rgba(11, 20, 36, 0.95)), url('/images/cost-savings.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent-yellow" />
                <span className="text-xs uppercase tracking-widest text-accent-yellow font-bold">Cost Savings</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-sm group-hover:text-white transition-colors duration-300">
                Cut your electricity bill to zero. Designed for PM Surya Ghar, our systems generate enough power to run your household and earn you credits.
              </p>
            </div>
            <div className="mt-6 self-end w-36 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden shadow-xl transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 border-2 border-white/10 relative z-10">
              <img src="/images/solar-workers.webp" alt="Solar Installation Workers" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="reveal-up delay-200 bg-dark-card text-white p-6 sm:p-10 rounded-xl sm:rounded-2xl flex flex-col justify-between min-h-[260px] sm:min-h-[400px] relative group hover:shadow-2xl transition-all duration-500"
            spotlightColor="rgba(123, 192, 67, 0.15)"
            style={{ backgroundImage: "linear-gradient(rgba(11, 20, 36, 0.7), rgba(11, 20, 36, 0.9)), url('/images/durability.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="text-right ml-auto max-w-sm relative z-10 transform group-hover:translate-x-2 transition-transform duration-500">
              <p className="text-sm sm:text-base font-medium text-gray-200 leading-relaxed">
                Built to withstand the harshest weather conditions, the solar systems we install are incredibly durable and come with a 30-year performance warranty.
              </p>
            </div>
            <div className="flex items-center gap-2 relative z-10 mt-4">
              <div className="w-2 h-2 rounded-full bg-accent-green" />
              <span className="text-xs uppercase tracking-widest text-accent-green font-bold">Durability and Longevity</span>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ── OUR SERVICES ACCORDION ──────────────────────────────────────── */}
      <section id="services" className="py-12 sm:py-20 px-0 w-full overflow-hidden bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12 reveal-up">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark-navy mb-3">Our Solar Services</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">Complete end-to-end solar solutions designed for maximum ROI and sustainability.</p>
        </div>

        {/* Accordion: vertical stack on mobile, horizontal flex on md+ */}
        <div className="flex flex-col md:flex-row w-full min-h-0 md:h-[650px] reveal-scale bg-dark-navy">

          {/* Panel 1 — Residential */}
          <div className="group relative flex-1 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer md:hover:flex-[2.5] overflow-hidden border-b md:border-b-0 md:border-r border-white/20 min-h-[180px] sm:min-h-[220px] md:min-h-0" style={{ backgroundImage: "url('/images/4.webp')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/95 via-dark-navy/40 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full z-10 text-white flex flex-col justify-end h-full">
              <div className="mb-2 border-b border-white/30 pb-2 inline-flex items-center gap-2 max-w-max opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs tracking-widest font-medium text-white">See Detail Service</span>
                <span aria-hidden="true" className="text-accent-green font-bold">↗</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 group-hover:text-accent-green transition-colors">Residential Solutions</h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm group-hover:opacity-100 transition-all duration-500">
                Reduce your household electricity bills with customized rooftop solar systems.
              </p>
            </div>
          </div>

          {/* Panel 2 — Commercial */}
          <div className="group relative flex-1 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer md:hover:flex-[2.5] overflow-hidden border-b md:border-b-0 md:border-r border-white/20 min-h-[180px] sm:min-h-[220px] md:min-h-0" style={{ backgroundImage: "url('/images/6.webp')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/95 via-dark-navy/40 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full z-10 text-white flex flex-col justify-end h-full">
              <div className="mb-2 border-b border-white/30 pb-2 inline-flex items-center gap-2 max-w-max opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs tracking-widest font-medium text-white">See Detail Service</span>
                <span aria-hidden="true" className="text-accent-yellow font-bold">↗</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 group-hover:text-accent-yellow transition-colors">Commercial Solutions</h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm group-hover:opacity-100 transition-all duration-500">
                Optimize operational costs with high-efficiency solar solutions for maximum ROI.
              </p>
            </div>
          </div>

          {/* Panel 3 — Industrial */}
          <div className="group relative flex-1 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer md:hover:flex-[2.5] overflow-hidden border-b md:border-b-0 md:border-r border-white/20 min-h-[180px] sm:min-h-[220px] md:min-h-0" style={{ backgroundImage: "url('/images/7.webp')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/95 via-dark-navy/40 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full z-10 text-white flex flex-col justify-end h-full">
              <div className="mb-2 border-b border-white/30 pb-2 inline-flex items-center gap-2 max-w-max opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs tracking-widest font-medium text-white">See Detail Service</span>
                <span aria-hidden="true" className="text-accent-green font-bold">↗</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 group-hover:text-accent-green transition-colors">Industrial Solutions</h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm group-hover:opacity-100 transition-all duration-500">
                Scalable, high-capacity solar systems for long-term savings and sustainability.
              </p>
            </div>
          </div>

          {/* Panel 4 — AMC */}
          <div className="group relative flex-1 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer md:hover:flex-[2.5] overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-0" style={{ backgroundImage: "url('/images/5.webp')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/95 via-dark-navy/40 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full z-10 text-white flex flex-col justify-end h-full">
              <div className="mb-2 border-b border-white/30 pb-2 inline-flex items-center gap-2 max-w-max opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs tracking-widest font-medium text-white">See Detail Service</span>
                <span aria-hidden="true" className="text-accent-green font-bold">↗</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 group-hover:text-accent-green transition-colors">Annual Maintenance (AMC)</h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-sm group-hover:opacity-100 transition-all duration-500">
                Ensure peak performance and longevity of your solar system with our comprehensive AMC.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
