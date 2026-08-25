import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function BillComparison({ onGetStarted }) {
  const [billAmount, setBillAmount] = useState(6500);

  // Before & After calculations
  // Fixed DISCOM meter/connection charge after 92% solar net-metering (min ₹250)
  const monthlySolarBill = Math.max(250, Math.round(billAmount * 0.08));
  const monthlySavings = Math.max(0, billAmount - monthlySolarBill);
  const annualSavings = monthlySavings * 12;
  const annualGridBill = billAmount * 12;

  // Factoring 5% annual grid tariff increase over 25 years (1.55x compounding multiplier)
  const twentyFiveYearGridPayment = Math.round(annualGridBill * 25 * 1.55);
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * 1.55);
  const reductionPercent = Math.round((monthlySavings / billAmount) * 100);
  const recommendedKw = Math.max(3, Math.min(18, Math.round(billAmount / 1200)));

  return (
    <section 
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-white border-t border-gray-200/70"
      aria-label="Before and After Solar Bill Comparison"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Compare Your Bills</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          See How Your Electricity Bill Drops
        </h2>
        <p className="text-[#374151] text-xs sm:text-base md:text-lg mt-2 sm:mt-3 font-normal">
          See what you pay right now compared to how little you will pay after installing solar.
        </p>
      </div>

      <div className="max-w-5xl mx-auto reveal-scale">
        <SpotlightCard className="bg-[#0F172A] text-white p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden" spotlightColor="rgba(15, 157, 88, 0.15)">
          
          {/* Slider to adjust current bill */}
          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3">
              <div>
                <label htmlFor="bill-compare-slider" className="text-xs sm:text-sm font-bold text-gray-300">
                  Select Your Current Monthly Electricity Bill
                </label>
                <p className="text-[11px] sm:text-xs text-gray-400">Move the slider to match your electricity bill</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/20">
                <span className="text-xs sm:text-sm text-[#00BFA6] font-bold">₹</span>
                <span className="text-xl sm:text-2xl font-black text-white">{billAmount.toLocaleString()}</span>
                <span className="text-xs text-gray-300">/ mo</span>
              </div>
            </div>

            <input
              id="bill-compare-slider"
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full bg-white/20 rounded-lg appearance-none cursor-pointer"
              aria-label="Electricity bill comparison slider"
            />
            <div className="flex justify-between text-[11px] sm:text-xs text-gray-400 mt-2 font-semibold">
              <span>₹2,000 / mo</span>
              <span>₹12,000 / mo</span>
              <span>₹25,000+ / mo</span>
            </div>
          </div>

          {/* Visual Before vs After Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch mb-8 sm:mb-10">
            
            {/* BEFORE (Without Solar) */}
            <div className="bg-white/5 border border-red-500/30 rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-bl-xl border-l border-b border-red-500/30">
                Without Solar
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Your Present Bill</span>
                <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-3 sm:mb-4">High & Rising Bills</h3>
                
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/10">
                    <span className="text-gray-300">Monthly Bill:</span>
                    <span className="font-extrabold text-red-400 text-sm sm:text-base">₹{billAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/10">
                    <span className="text-gray-300">Total Bill / Year:</span>
                    <span className="font-bold text-gray-200">₹{annualGridBill.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/10">
                    <span className="text-gray-300">Rate Increases:</span>
                    <span className="font-semibold text-gray-400">+5% to 8% / Year</span>
                  </div>
                  <div className="flex justify-between py-1.5 sm:py-2">
                    <span className="text-gray-300">Paid in 25 Years:</span>
                    <span className="font-black text-red-400">~₹{twentyFiveYearGridPayment.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 border-t border-white/10 text-xs text-gray-400 flex items-center gap-2">
                <span className="text-red-400">⚠️</span>
                <span>You pay every month and own nothing.</span>
              </div>
            </div>

            {/* AFTER (With Solar) */}
            <div className="bg-[#0F9D58]/10 border-2 border-[#0F9D58] rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(15,157,88,0.2)]">
              <div className="absolute top-0 right-0 bg-[#0F9D58] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                With Neonix Solar
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#00BFA6] uppercase tracking-wider block mb-1">Your Future with Solar ({recommendedKw} kW)</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{reductionPercent}% Bill Reduction</h3>
                
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/10">
                    <span className="text-gray-200">New Monthly Bill:</span>
                    <span className="font-extrabold text-[#00BFA6] text-base sm:text-lg">~₹{monthlySolarBill.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/10">
                    <span className="text-gray-200">Saved Each Month:</span>
                    <span className="font-extrabold text-[#0F9D58] text-sm sm:text-base">+₹{monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/10">
                    <span className="text-gray-200">1st Year Savings:</span>
                    <span className="font-bold text-white">₹{annualSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 sm:py-2">
                    <span className="text-gray-200">25-Year Savings:</span>
                    <span className="font-black text-[#00BFA6] text-base sm:text-lg">+₹{twentyFiveYearSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 border-t border-white/10 text-xs text-white/90 flex items-center gap-2 font-semibold">
                <span className="text-[#00BFA6]">✓</span>
                <span>Includes ₹78,000 domestic govt. benefits & 30-year warranty.</span>
              </div>
            </div>

          </div>

          {/* Bottom Call to Action */}
          <div className="bg-white/5 border border-white/15 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base font-bold text-white">Save ₹{annualSavings.toLocaleString()} Every Year Starting Now</h4>
              <p className="text-[11px] sm:text-xs text-gray-300">Book your free site survey today with no hidden charges.</p>
            </div>
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto shrink-0 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shimmer-btn min-h-[46px]"
            >
              Get Free Roof Check →
            </button>
          </div>

        </SpotlightCard>
      </div>
    </section>
  );
}
