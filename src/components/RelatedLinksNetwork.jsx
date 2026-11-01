export default function RelatedLinksNetwork({ currentSlug = '' }) {
  const internalSolutions = [
    {
      slug: 'residential',
      title: 'Residential Rooftop Solar (1kW–10kW)',
      badge: 'Home Installation',
      badgeColor: '#0F9D58',
      desc: 'Turnkey residential rooftop solar installations in Jaipur with Tier-1 bifacial panels, JVVNL net metering, and 90% bill reduction.',
      href: '/residential-solar',
    },
    {
      slug: 'pmsuryaghar',
      title: 'PM Surya Ghar Rajasthan Guide',
      badge: '₹78k DBT Subsidy',
      badgeColor: '#00BFA6',
      desc: 'Official 2026 handbook for ₹78,000 direct bank subsidy, JVVNL net-metering eligibility, and 7% solar loans.',
      href: '/pm-surya-ghar-yojana',
    },
    {
      slug: 'calculator',
      title: 'Solar Panel Cost & ROI Calculator',
      badge: 'kW Sizing Tool',
      badgeColor: '#F59E0B',
      desc: 'Interactive 2026 tool to calculate solar capacity (kW), equipment investment, payback period, and monthly net savings.',
      href: '/solar-calculator',
    },
    {
      slug: 'commercial',
      title: 'Commercial Rooftop Solar',
      badge: '40% Tax Depreciation',
      badgeColor: '#3B82F6',
      desc: 'Slash high commercial power tariffs for offices, schools, and hospitals with rapid 3-year capital payback.',
      href: '/commercial-solar',
    },
    {
      slug: 'industrial',
      title: 'Industrial MW Solar Plants',
      badge: 'Heavy Industry',
      badgeColor: '#8B5CF6',
      desc: 'Heavy-duty non-penetrating PEB shed mounting, 11kV/33kV HT grid synchronization, and zero-export relays.',
      href: '/industrial-solar',
    },
    {
      slug: 'amc',
      title: 'Solar AMC & Cleaning Care',
      badge: 'Generation Care',
      badgeColor: '#EC4899',
      desc: 'Demineralized RO water cleaning, drone thermal imaging, and 18-point electrical diagnostic inspections.',
      href: '/solar-amc',
    },
    {
      slug: 'privacy',
      title: 'Privacy & 25-Yr Warranty Policy',
      badge: 'Customer Protection',
      badgeColor: '#6B7280',
      desc: 'Review our certified 25-year performance warranty terms, refund guarantee, and customer data privacy standards.',
      href: '/privacy-policy',
    },
    {
      slug: 'terms',
      title: 'Solar EPC Terms & Conditions',
      badge: 'Legal & Contracts',
      badgeColor: '#6B7280',
      desc: 'Clear, transparent service-level agreements (SLA), net-metering liaisoning commitments, and DISCOM timelines.',
      href: '/terms',
    },
  ];

  const externalAuthorities = [
    {
      name: 'PM Surya Ghar National Portal',
      authority: 'Ministry of New & Renewable Energy (MNRE)',
      desc: 'Official Central Government portal to register rooftop solar applications, track DISCOM approvals, and verify DBT subsidy credit.',
      href: 'https://pmsuryaghar.gov.in/',
      domain: 'pmsuryaghar.gov.in',
    },
    {
      name: 'Ministry of New and Renewable Energy (MNRE)',
      authority: 'Government of India',
      desc: 'Apex central ministry formulating national solar policies, Approved List of Models and Manufacturers (ALMM), and DCR cell standards.',
      href: 'https://mnre.gov.in/',
      domain: 'mnre.gov.in',
    },
    {
      name: 'Jan Samarth National Solar Loan Portal',
      authority: 'Dept. of Financial Services, Govt. of India',
      desc: 'Official credit-linked portal offering collateral-free 7% concessional solar loans via SBI, Canara Bank, and PNB for rooftop solar.',
      href: 'https://www.jansamarth.in/',
      domain: 'jansamarth.in',
    },
    {
      name: 'Jaipur Vidyut Vitran Nigam Limited (JVVNL)',
      authority: 'Government of Rajasthan Energy Dept.',
      desc: 'State electricity DISCOM managing technical feasibility, bidirectional net-meter installations, and grid synchronization in Rajasthan.',
      href: 'https://energy.rajasthan.gov.in/jvvnl',
      domain: 'energy.rajasthan.gov.in',
    },
    {
      name: 'Rajasthan Renewable Energy Corporation (RRECL)',
      authority: 'State Nodal Agency, Rajasthan',
      desc: 'State nodal agency promoting green energy, formulating Rajasthan Solar Energy Policy, and driving state-wide rooftop solar expansion.',
      href: 'https://energy.rajasthan.gov.in/rrecl',
      domain: 'energy.rajasthan.gov.in',
    },
    {
      name: 'Bureau of Energy Efficiency (BEE)',
      authority: 'Ministry of Power, Govt. of India',
      desc: 'Statutory authority regulating energy conservation building codes (ECBC), appliance star ratings, and industrial energy efficiency norms.',
      href: 'https://beeindia.gov.in/',
      domain: 'beeindia.gov.in',
    },
    {
      name: 'Central Electricity Authority (CEA)',
      authority: 'Ministry of Power, Govt. of India',
      desc: 'Technical regulatory body establishing technical standards for grid connectivity, transformer stepping, and safety of solar power plants.',
      href: 'https://cea.nic.in/',
      domain: 'cea.nic.in',
    },
    {
      name: 'Income Tax Department of India (Sec. 32)',
      authority: 'Ministry of Finance, Govt. of India',
      desc: 'Statutory guidelines governing 40% Accelerated Depreciation tax benefits for commercial and industrial solar power capital investments.',
      href: 'https://incometaxindia.gov.in/',
      domain: 'incometaxindia.gov.in',
    },
  ];

  // Filter out the current page from internal cards so other services are highlighted
  const displaySolutions = internalSolutions.filter(s => s.slug !== currentSlug);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
      {/* ── Internal Solutions Navigation ── */}
      <div className="mb-14">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1 rounded-full">
            Internal Solar Directory &amp; Tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-3">
            Explore Related Solar Solutions &amp; EPC Services
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Connect with our certified solar engineers to choose the optimal turnkey clean energy package for your property.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displaySolutions.slice(0, 6).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:shadow-lg hover:border-[#0F9D58] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white"
                    style={{ backgroundColor: item.badgeColor }}
                  >
                    {item.badge}
                  </span>
                  <span className="text-[#0F9D58] font-bold text-xs group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <h3 className="font-bold text-[#111827] text-base group-hover:text-[#0F9D58] transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-[#0F9D58]">
                <span>View Full Details</span>
                <span>Learn More ›</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── External Government & Statutory Energy Resources ── */}
      <div className="bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#070D1E] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BFA6] bg-[#00BFA6]/10 px-3 py-1 rounded-full border border-[#00BFA6]/30">
            Authoritative External References
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Official Government &amp; Regulatory Energy Portals
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Verify official solar subsidy notifications, net-metering regulations, low-interest bank loans, and statutory standards directly on Govt. of India portals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {externalAuthorities.map((auth) => (
            <a
              key={auth.href}
              href={auth.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00BFA6]/50 rounded-2xl p-4 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00BFA6] bg-[#00BFA6]/10 px-2 py-0.5 rounded">
                    Official Portal
                  </span>
                  <span className="text-gray-400 group-hover:text-[#00BFA6] transition-colors text-xs font-bold">
                    ↗
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm group-hover:text-[#00BFA6] transition-colors mb-1">
                  {auth.name}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mb-2">
                  {auth.authority}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {auth.desc}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#00BFA6] font-semibold">
                <span>{auth.domain}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">Visit Portal ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

