export default function ServiceFooter() {
  return (
    <footer className="bg-[#070D1E] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-4 inline-flex">
              <div className="bg-white rounded-full p-1 h-9 w-9 flex items-center justify-center shadow-md">
                <img src="/images/logo.svg" alt="Neonix Logo" className="h-full w-auto object-contain" width="36" height="36" />
              </div>
              <div className="flex flex-col justify-center leading-none text-left">
                <span className="text-white font-extrabold text-lg tracking-tight">Neonix</span>
                <span className="text-gray-400 font-semibold text-[8px] tracking-widest uppercase">Infra Solutions LLP</span>
              </div>
            </a>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 max-w-sm">
              Government-registered Solar EPC company based in Jaipur, Rajasthan. Delivering turnkey residential, commercial, and industrial rooftop solar plants with PM Surya Ghar subsidy liaisoning, net-metering, and lifetime generation care.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-gray-300">
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ MNRE Channel Partner</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ DISCOM Empanelled</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ ISO 9001:2015</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">✓ 30-Yr Warranty</span>
            </div>
          </div>

          {/* Col 2: Four Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/residential-solar.html" className="hover:text-[#00BFA6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#0F9D58]">›</span> Solar for Homes (Residential)
                </a>
              </li>
              <li>
                <a href="/commercial-solar.html" className="hover:text-[#00BFA6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#00BFA6]">›</span> Solar for Businesses (Commercial)
                </a>
              </li>
              <li>
                <a href="/industrial-solar.html" className="hover:text-[#00BFA6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#F59E0B]">›</span> Solar for Factories (Industrial)
                </a>
              </li>
              <li>
                <a href="/solar-amc.html" className="hover:text-[#00BFA6] transition-colors flex items-center gap-1.5">
                  <span className="text-[#3B82F6]">›</span> Solar Care & AMC Maintenance
                </a>
              </li>
              <li>
                <a href="/solar-calculator.html" className="hover:text-[#00BFA6] transition-colors flex items-center gap-1.5 text-white font-semibold">
                  <span className="text-[#0F9D58]">★</span> Solar ROI & Subsidy Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Links & Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Tools & Guides</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/solar-calculator.html" className="hover:text-white transition-colors">
                  Subsidy Calculator 2026
                </a>
              </li>
              <li>
                <a href="/#savings-hub" className="hover:text-white transition-colors">
                  PM Surya Ghar Guide (₹78k)
                </a>
              </li>
              <li>
                <a href="/#solutions" className="hover:text-white transition-colors">
                  System Sizing Comparison
                </a>
              </li>
              <li>
                <a href="/#trust-signals" className="hover:text-white transition-colors">
                  Customer Reviews & Trust
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  Solar FAQs & Discom Rules
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Helpline & Office</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#00BFA6]">📞</span>
                <div>
                  <a href="tel:+919910000774" className="text-white font-bold hover:text-[#00BFA6] block">
                    +91 99100 00774
                  </a>
                  <a href="tel:+919088688899" className="text-gray-400 hover:text-white block mt-0.5">
                    +91 90886 88899
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00BFA6]">✉️</span>
                <a href="mailto:info@neonixinfra.in" className="hover:text-white">
                  info@neonixinfra.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00BFA6]">📍</span>
                <span className="text-gray-400 leading-snug">
                  Jaipur, Rajasthan, 302020 India
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
            &copy; {new Date().getFullYear()} Neonix Infra Solutions LLP. All Rights Reserved. Reg. No: LLPIN-ABE-4589.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy.html" className="hover:text-gray-300 transition-colors">
              Privacy & Warranty Policy
            </a>
            <a href="/terms.html" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap.xml" className="hover:text-gray-300 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
