import { SITE_CONFIG, FOOTER_SECTIONS } from '../data';

export default function ServiceFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070D1E] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4 inline-flex">
              <div className="bg-white rounded-full p-1 h-9 w-9 flex items-center justify-center shadow-md">
                <img src={SITE_CONFIG.logo} alt={`${SITE_CONFIG.name} Logo`} className="h-full w-auto object-contain" width="36" height="36" />
              </div>
              <div className="flex flex-col justify-center leading-none text-left">
                <span className="text-white font-extrabold text-lg tracking-tight">{SITE_CONFIG.name}</span>
                <span className="text-gray-400 font-semibold text-[8px] tracking-widest uppercase">{SITE_CONFIG.legalName}</span>
              </div>
            </a>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Government-registered Solar EPC company based in {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}. Delivering turnkey residential, commercial, and industrial rooftop solar plants with PM Surya Ghar subsidy liaisoning, net-metering, and lifetime care.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-300 mb-4">
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10">✓ MNRE Partner</span>
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10">✓ DISCOM Empanelled</span>
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/10">✓ ISO 9001:2015</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a 
                href={SITE_CONFIG.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visit ${SITE_CONFIG.name} on Instagram`}
                className="w-7 h-7 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#E1306C] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href={SITE_CONFIG.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visit ${SITE_CONFIG.name} on LinkedIn`}
                className="w-7 h-7 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#0077B5] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a 
                href={SITE_CONFIG.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visit ${SITE_CONFIG.name} on Facebook`}
                className="w-7 h-7 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services (Internal Links) */}
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

          {/* Col 3: Key Links & Tools (Internal Links) */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{FOOTER_SECTIONS.toolsAndGuides.title}</h4>
            <ul className="space-y-2.5">
              {FOOTER_SECTIONS.toolsAndGuides.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="text-gray-500">›</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Official Government & Regulatory Resources (External Links) */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{FOOTER_SECTIONS.governmentPortals.title}</h4>
            <ul className="space-y-2.5">
              {FOOTER_SECTIONS.governmentPortals.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#00BFA6] transition-colors flex items-center gap-1 text-gray-400"
                  >
                    <span className="text-[#0F9D58]">↗</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Support */}
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
                <a 
                  href="https://maps.google.com/?q=Manyawas+Mansarovar+Jaipur+Rajasthan+302020" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white leading-snug"
                >
                  {SITE_CONFIG.address.fullFormatted} <span className="text-[#00BFA6] text-[10px]">↗ (Map)</span>
                </a>
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
          <div className="flex flex-wrap items-center justify-center gap-6">
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
