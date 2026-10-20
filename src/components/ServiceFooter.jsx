import { SITE_CONFIG, FOOTER_SECTIONS } from '../data';

export default function ServiceFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070D1E] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-4 inline-flex">
              <div className="bg-white rounded-full p-1 h-9 w-9 flex items-center justify-center shadow-md">
                <img src={SITE_CONFIG.logo} alt={`${SITE_CONFIG.name} Logo`} className="h-full w-auto object-contain" width="36" height="36" />
              </div>
              <div className="flex flex-col justify-center leading-none text-left">
                <span className="text-white font-extrabold text-lg tracking-tight">{SITE_CONFIG.name}</span>
                <span className="text-gray-400 font-semibold text-[8px] tracking-widest uppercase">{SITE_CONFIG.legalName}</span>
              </div>
            </a>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 max-w-sm">
              Government-registered Solar EPC company based in {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}. Delivering turnkey residential, commercial, and industrial rooftop solar plants with PM Surya Ghar subsidy liaisoning, net-metering, and lifetime generation care.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-gray-300">
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ MNRE Channel Partner</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ DISCOM Empanelled</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ ISO 9001:2015</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ {SITE_CONFIG.stats.warrantyYears} Warranty</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{FOOTER_SECTIONS.services.title}</h4>
            <ul className="space-y-2.5">
              {FOOTER_SECTIONS.services.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`hover:text-[#00BFA6] transition-colors flex items-center gap-1.5 ${
                      link.highlight ? 'text-white font-semibold' : ''
                    }`}
                  >
                    <span className="text-[#0F9D58]">›</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Links & Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{FOOTER_SECTIONS.toolsAndGuides.title}</h4>
            <ul className="space-y-2.5">
              {FOOTER_SECTIONS.toolsAndGuides.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{FOOTER_SECTIONS.helpline.title}</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#00BFA6]">📞</span>
                <div>
                  <a href={`tel:${SITE_CONFIG.contact.primaryPhoneRaw}`} className="text-white font-bold hover:text-[#00BFA6] block">
                    {SITE_CONFIG.contact.primaryPhone}
                  </a>
                  <a href={`tel:${SITE_CONFIG.contact.secondaryPhoneRaw}`} className="text-gray-400 hover:text-white block mt-0.5">
                    {SITE_CONFIG.contact.secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00BFA6]">✉️</span>
                <a href={`mailto:${SITE_CONFIG.contact.primaryEmail}`} className="hover:text-white">
                  {SITE_CONFIG.contact.primaryEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00BFA6]">📍</span>
                <span className="text-gray-400 leading-snug">
                  {SITE_CONFIG.address.fullFormatted}
                </span>
              </li>
              <li className="pt-1">
                <span className="inline-block bg-[#0F9D58]/15 text-[#0F9D58] border border-[#0F9D58]/30 px-2 py-0.5 rounded text-[10px] font-bold">
                  ● Engineering Response &lt; 2 Hours
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-gray-500 text-[11px]">
          <p>
            &copy; {currentYear} {SITE_CONFIG.legalName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_SECTIONS.legal.links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-gray-300 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
