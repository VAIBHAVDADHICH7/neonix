import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function WhySolar() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Benefits' },
    { id: 'financial', label: '💰 Financial & Savings' },
    { id: 'technology', label: '⚡ Durability & Tech' },
    { id: 'green', label: '🌱 Green Impact' },
  ];

  const benefits = [
    {
      category: 'financial',
      badge: 'Up to 90% Off',
      badgeColor: '#0b7542',
      title: 'Drastic Electricity Bill Reduction',
      metric: '90% Drop',
      metricLabel: 'Monthly Bill',
      description: 'Neutralize heavy power expenses. Power air conditioners, refrigerators, pumps, and everyday appliances with free solar electricity generated right on your roof.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      category: 'financial',
      badge: 'PM Surya Ghar',
      badgeColor: '#D97706',
      title: 'Up to ₹78,000 Direct Govt. Subsidy',
      metric: '₹78,000',
      metricLabel: 'Direct Bank Transfer',
      description: 'Under the Central Government PM Surya Ghar Muft Bijli Yojana, eligible residential rooftop installations receive direct cash subsidies transferred straight to your bank account.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      category: 'financial',
      badge: 'Fast Payback',
      badgeColor: '#0d8070',
      title: 'Quick 3 to 4-Year Breakeven',
      metric: '3-4 Yrs',
      metricLabel: 'Full ROI Period',
      description: 'Rooftop solar systems in India generate annualized returns of 25% to 30%. Once paid off in 3 to 4 years, all electricity for the next 20+ years is essentially 100% free.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      category: 'financial',
      badge: 'Tariff Shield',
      badgeColor: '#0b7542',
      title: 'Immunity from Annual Grid Price Hikes',
      metric: '5-7% Yearly',
      metricLabel: 'Grid Hike Protection',
      description: 'DISCOM electricity tariffs rise by 5% to 7% every single year. Solar locks in your energy cost at virtually zero, shielding your family and business for decades.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      category: 'technology',
      badge: 'Smart Net Meter',
      badgeColor: '#00BFA6',
      title: 'Monetize Surplus Power (Net Metering)',
      metric: 'Bi-Directional',
      metricLabel: 'DISCOM Credit Sync',
      description: 'Generate more power than you use during peak daylight? Your bidirectional net-meter exports surplus units to the power grid, accumulating billing credits for nighttime use.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      category: 'technology',
      badge: 'Tier-1 Reliability',
      badgeColor: '#0b7542',
      title: '30+ Years Long-Life Technology',
      metric: '30+ Years',
      metricLabel: 'Engineered Lifespan',
      description: 'Manufactured with high-efficiency Mono PERC Bifacial cells, rust-proof anodized aluminum mounts, and tempered hail-resistant glass. Zero moving parts ensure minimal wear.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      category: 'financial',
      badge: 'Commercial Tax Perk',
      badgeColor: '#D97706',
      title: '40% Accelerated Tax Depreciation',
      metric: '40% Write-Off',
      metricLabel: 'Year 1 Tax Relief',
      description: 'Commercial businesses, offices, and factories can write off 40% of the total solar capital expenditure in the very first year, dramatically lowering income tax liability.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      ),
    },
    {
      category: 'technology',
      badge: 'Live IoT App',
      badgeColor: '#0b7542',
      title: 'Real-Time Phone Telemetry & Monitoring',
      metric: '24/7 Mobile',
      metricLabel: 'WiFi & App Tracking',
      description: 'Track daily electricity generated, peak solar production curve, carbon saved, and instant rupee savings directly on your smartphone through our companion app.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      category: 'green',
      badge: 'Eco-Champion',
      badgeColor: '#0b7542',
      title: 'Cut 100+ Tons of Carbon Emissions',
      metric: '100+ Tons',
      metricLabel: 'CO2 Offset / 25 Yrs',
      description: 'A standard residential solar system offsets the carbon emission equivalent of planting over 1,500 mature trees, creating a healthier planet for your children.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      category: 'financial',
      badge: 'Higher Appraisal',
      badgeColor: '#0d8070',
      title: 'Appreciates Property & Resale Value',
      metric: '+4% to 8%',
      metricLabel: 'Real Estate Premium',
      description: 'Homes and commercial buildings equipped with commissioned rooftop solar systems command higher market appraisal, attract premium tenants, and rent faster.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ];

  const filteredBenefits = activeCategory === 'all'
    ? benefits
    : benefits.filter((b) => b.category === activeCategory);

  return (
    <section
      id="why-solar"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-slate-200/80"
      aria-label="Why Solar Benefits and Advantages"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3.5">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Why Choose Solar</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          The Unmatched <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b7542] via-[#0F9D58] to-[#00BFA6]">Benefits of Going Solar</span>
        </h2>
        <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3 font-normal max-w-2xl mx-auto">
          Investing in rooftop solar isn't just about saving electricity—it is a guaranteed, government-supported financial asset that pays you back for 25+ years.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredBenefits.map((item) => (
          <SpotlightCard
            key={item.title}
            className="reveal-up bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#0F9D58]/60 transition-all duration-300 flex flex-col justify-between group"
            spotlightColor="rgba(15, 157, 88, 0.08)"
          >
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.badgeColor}15`, color: item.badgeColor }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: item.badgeColor }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0b7542] transition-colors leading-snug mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Bottom Highlight Metric */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {item.metricLabel}
              </span>
              <span className="text-sm font-black text-[#0b7542]">
                {item.metric}
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Summary Highlights Strip */}
      <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-2xl sm:text-3xl font-black text-[#00BFA6]">₹78,000</p>
          <p className="text-xs text-slate-300 mt-1">PM Surya Ghar Subsidy</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-[#0F9D58]">90%</p>
          <p className="text-xs text-slate-300 mt-1">Avg. Bill Reduction</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400">3.5 Years</p>
          <p className="text-xs text-slate-300 mt-1">Typical Payback Time</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-white">25+ Years</p>
          <p className="text-xs text-slate-300 mt-1">Warranty & Free Power</p>
        </div>
      </div>
    </section>
  );
}
