export default function MobileActionBar({ onOpenConsultation }) {
  const scrollToCalculator = () => {
    const el = document.getElementById('roi-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Quick Mobile Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/15 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_25px_rgba(0,0,0,0.4)] transition-transform duration-300"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+919910000774"
          aria-label="Call Us: Neonix Solar Consultant at +91 99100 00774"
          className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-bold py-2.5 px-2 rounded-xl border border-white/20 transition-all text-center min-h-[44px]"
        >
          <span className="text-sm" aria-hidden="true">📞</span>
          <span>Call Us</span>
        </a>

        {/* Check Savings Calculator Jump */}
        <button
          type="button"
          onClick={scrollToCalculator}
          aria-label="Calculator: Jump to Solar ROI Savings"
          className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-bold py-2.5 px-2 rounded-xl border border-white/20 transition-all text-center min-h-[44px] cursor-pointer"
        >
          <span className="text-sm" aria-hidden="true">⚡</span>
          <span>Calculator</span>
        </button>

        {/* Free Consultation CTA */}
        <button
          type="button"
          onClick={onOpenConsultation}
          aria-label="Free Plan: Open Free Rooftop Solar Consultation Booking"
          className="flex-[1.2] flex items-center justify-center gap-1 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white text-xs font-extrabold py-2.5 px-3 rounded-xl shadow-md transition-all text-center min-h-[44px] cursor-pointer shimmer-btn"
        >
          <span>Free Plan</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </aside>
  );
}
