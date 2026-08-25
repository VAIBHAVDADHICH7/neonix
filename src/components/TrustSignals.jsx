import SpotlightCard from './UI/SpotlightCard';

export default function TrustSignals() {
  const certifications = [
    {
      title: 'MNRE Approved',
      subtitle: 'Ministry of New & Renewable Energy',
      code: 'Channel Partner Reg. #RJ-NEO-2024',
      icon: '🏛️',
      color: '#0b7542',
    },

    {
      title: 'Govt. Subsidy Approval',
      subtitle: 'PM Surya Ghar National Portal',
      code: 'Direct Benefit Transfer (DBT)',
      icon: '⚡',
      color: '#D97706',
    },
    {
      title: 'Tier-1 ALMM Panels',
      subtitle: 'Domestic Content Requirement (DCR)',
      code: 'Mono PERC Bifacial Grade A',
      icon: '🛡️',
      color: '#111827',
    },
  ];

  return (
    <section 
      className="py-14 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] border-t border-gray-200/70"
      aria-label="Certifications, Compliance and Trust Signals"
    >
      {/* Section Headline */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Certifications & Compliance</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
          Certified installers, trusted by 500+ customers
        </h2>
        <p className="text-[#374151] text-xs sm:text-base mt-2 font-normal">
          Strict adherence to Indian national grid codes, safety standards, and MNRE quality benchmarks.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-10">
        {certifications.map((cert) => (
          <SpotlightCard
            key={cert.title}
            className="reveal-up bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5 sm:gap-4"
            spotlightColor="rgba(15, 157, 88, 0.08)"
          >
            <div 
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-xs"
              style={{ backgroundColor: `${cert.color}15` }}
              role="img"
              aria-label={cert.title}
            >
              {cert.icon}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827] leading-snug">{cert.title}</h3>
              <p className="text-[11px] sm:text-xs text-[#374151] font-medium mt-0.5">{cert.subtitle}</p>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-mono block mt-1 font-semibold">{cert.code}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Trust metric summary bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-around gap-4 text-center reveal-up">
        <div>
          <p className="text-2xl sm:text-3xl font-black text-[#0b7542]">500+</p>
          <p className="text-[11px] sm:text-xs text-[#374151] font-bold mt-0.5">Rooftops Installed</p>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />
        <div>
          <p className="text-2xl sm:text-3xl font-black text-[#0d8070]">4.9 ★</p>
          <p className="text-[11px] sm:text-xs text-[#374151] font-bold mt-0.5">Google Review Rating</p>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />
        <div>
          <p className="text-2xl sm:text-3xl font-black text-[#D97706]">₹3.5 Cr+</p>
          <p className="text-[11px] sm:text-xs text-[#374151] font-bold mt-0.5">Customer Bill Savings</p>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />
        <div>
          <p className="text-2xl sm:text-3xl font-black text-[#111827]">100%</p>
          <p className="text-[11px] sm:text-xs text-[#374151] font-bold mt-0.5">Subsidy Claim Success</p>
        </div>
      </div>
    </section>
  );
}
