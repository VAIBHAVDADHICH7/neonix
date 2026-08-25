import { useState, useId, useEffect, useRef } from 'react';
import SpotlightCard from './UI/SpotlightCard';

// Exact Master Pricing & Subsidy Lookup Tables
const DCR_PRICING_TABLE = {
  '3KW_1PH': { capacity: 3, name: '3 kW System', price: 195000, subsidy: 78000, net: 117000, phase: '1PH' },
  '4KW_1PH': { capacity: 4, name: '4 kW System', price: 235000, subsidy: 78000, net: 157000, phase: '1PH' },
  '5KW_1PH': { capacity: 5, name: '5 kW System (Single Phase)', price: 280000, subsidy: 78000, net: 202000, phase: '1PH' },
  '5KW_3PH': { capacity: 5, name: '5 kW System (3-Phase)', price: 315000, subsidy: 78000, net: 237000, phase: '3PH' },
  '6KW_1PH': { capacity: 6, name: '6 kW System (Single Phase)', price: 330000, subsidy: 78000, net: 252000, phase: '1PH' },
  '6KW_3PH': { capacity: 6, name: '6 kW System (3-Phase)', price: 355000, subsidy: 78000, net: 277000, phase: '3PH' },
  '8KW_3PH': { capacity: 8, name: '8 kW System (3-Phase)', price: 440000, subsidy: 78000, net: 362000, phase: '3PH' },
  '10KW_3PH': { capacity: 10, name: '10 kW System (3-Phase)', price: 520000, subsidy: 78000, net: 442000, phase: '3PH' },
  '12KW_3PH': { capacity: 12, name: '12 kW System (3-Phase)', price: 620000, subsidy: 78000, net: 542000, phase: '3PH' },
  '15KW_3PH': { capacity: 15, name: '15 kW System (3-Phase)', price: 765000, subsidy: 78000, net: 687000, phase: '3PH' },
  '18KW_3PH': { capacity: 18, name: '18 kW System (3-Phase)', price: 910000, subsidy: 78000, net: 832000, phase: '3PH' },
};

const NDCR_PRICING_TABLE = {
  '3KW_1PH': { capacity: 3, name: '3 kW System', price: 160000, subsidy: 0, net: 160000, phase: '1PH' },
  '4KW_1PH': { capacity: 4, name: '4 kW System', price: 200000, subsidy: 0, net: 200000, phase: '1PH' },
  '5KW_1PH': { capacity: 5, name: '5 kW System (Single Phase)', price: 235000, subsidy: 0, net: 235000, phase: '1PH' },
  '5KW_3PH': { capacity: 5, name: '5 kW System (3-Phase)', price: 260000, subsidy: 0, net: 260000, phase: '3PH' },
  '6KW_1PH': { capacity: 6, name: '6 kW System (Single Phase)', price: 270000, subsidy: 0, net: 270000, phase: '1PH' },
  '6KW_3PH': { capacity: 6, name: '6 kW System (3-Phase)', price: 305000, subsidy: 0, net: 305000, phase: '3PH' },
  '8KW_3PH': { capacity: 8, name: '8 kW System (3-Phase)', price: 340000, subsidy: 0, net: 340000, phase: '3PH' },
  '10KW_3PH': { capacity: 10, name: '10 kW System (3-Phase)', price: 380000, subsidy: 0, net: 380000, phase: '3PH' },
  '12KW_3PH': { capacity: 12, name: '12 kW System (3-Phase)', price: 450000, subsidy: 0, net: 450000, phase: '3PH' },
  '15KW_3PH': { capacity: 15, name: '15 kW System (3-Phase)', price: 555000, subsidy: 0, net: 555000, phase: '3PH' },
  '18KW_3PH': { capacity: 18, name: '18 kW System (3-Phase)', price: 660000, subsidy: 0, net: 660000, phase: '3PH' },
};

// Exact Mapping: Required load -> Recommended System Size
const KW_TO_SYSTEM_MAP = {
  1: 3, 2: 3, 3: 3, 4: 4, 5: 5, 6: 6, 7: 8, 8: 8, 9: 10, 10: 10, 11: 12, 12: 12, 13: 15, 14: 15, 15: 15, 16: 18, 17: 18, 18: 18,
};

// Animated counter hook — counts from prev to target value
function useAnimatedCount(target, duration = 650) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    if (from === to) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

export default function RoiCalculator({ onDownloadReport }) {
  const [bill, setBill] = useState(4500);
  const [location, setLocation] = useState('Jaipur, Rajasthan');
  const [connectionType, setConnectionType] = useState('Residential');
  const [panelType, setPanelType] = useState('DCR');
  const [selectedPhase, setSelectedPhase] = useState('1PH');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pincode: '',
    city: '',
    state: 'Rajasthan',
  });

  // Flash key — incremented on every output change to retrigger CSS animation
  const [flashKey, setFlashKey] = useState(0);
  const prevCapacityRef = useRef(null);

  const billSliderId = useId();
  const billInputId = useId();
  const locationSelectId = useId();

  const handleConnectionTypeChange = (type) => {
    setConnectionType(type);
    if (type === 'Residential') {
      setPanelType('DCR');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const rawKwNeeded = Math.max(1, Math.min(18, Math.round(bill / 1000)));
  const recommendedCapacity = KW_TO_SYSTEM_MAP[rawKwNeeded] || 3;

  let effectivePhase = '1PH';
  if (recommendedCapacity >= 8) {
    effectivePhase = '3PH';
  } else if (recommendedCapacity <= 4) {
    effectivePhase = '1PH';
  } else {
    effectivePhase = selectedPhase;
  }

  const effectivePanelType = connectionType === 'Residential' ? 'DCR' : panelType;
  const lookupKey = `${recommendedCapacity}KW_${effectivePhase}`;
  const pricingTable = effectivePanelType === 'DCR' ? DCR_PRICING_TABLE : NDCR_PRICING_TABLE;
  
  const planData = pricingTable[lookupKey] || pricingTable[`${recommendedCapacity}KW_3PH`] || pricingTable['5KW_1PH'] || {
    capacity: recommendedCapacity,
    name: `${recommendedCapacity} kW System`,
    price: recommendedCapacity * 55000,
    subsidy: effectivePanelType === 'DCR' ? 78000 : 0,
    net: (recommendedCapacity * 55000) - (effectivePanelType === 'DCR' ? 78000 : 0),
  };

  const grossCost = planData.price;
  const subsidyAmount = connectionType === 'Residential' ? planData.subsidy : 0;
  const netCost = grossCost - subsidyAmount;

  // Annual savings calculation
  const monthlySolarGenerationUnits = recommendedCapacity * 125;
  const annualSavings = Math.round(monthlySolarGenerationUnits * 12 * 7.5);
  const paybackYears = (netCost / Math.max(1, annualSavings)).toFixed(1);
  const co2OffsetTons = (recommendedCapacity * 1.3).toFixed(1);
  const treeEquivalents = Math.round(co2OffsetTons * 45);

  // Trigger flash when capacity changes
  useEffect(() => {
    if (prevCapacityRef.current !== null && prevCapacityRef.current !== recommendedCapacity) {
      setFlashKey(k => k + 1);
    }
    prevCapacityRef.current = recommendedCapacity;
  }, [recommendedCapacity]);

  // Animated display values
  const animSavings = useAnimatedCount(annualSavings);
  const animSubsidy = useAnimatedCount(subsidyAmount);
  const animNetCost = useAnimatedCount(netCost);
  const animGross   = useAnimatedCount(grossCost);
  const animTrees   = useAnimatedCount(treeEquivalents);
  const animSavings5 = useAnimatedCount(annualSavings * 5);
  const animSavings10 = useAnimatedCount(annualSavings * 10);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    setReportSuccess(false);

    const payload = {
      ...formData,
      bill,
      requiredRoofArea: recommendedCapacity * 64, // 2 panels per kw, 32 sqft each
      location,
      connectionType,
      panelType: effectivePanelType,
      calculatedSystemSize: recommendedCapacity,
      systemPhase: effectivePhase,
      subsidyAmount,
      grossCost,
      netCost,
      annualSavings,
      paybackYears,
      co2OffsetTons,
      treeEquivalents,
      source: 'ROI Calculator Lead Form',
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setReportSuccess(true);
      if (onDownloadReport) {
        onDownloadReport(payload);
      }
      setFormData({
        name: '',
        mobile: '',
        email: '',
        pincode: '',
        city: '',
        state: 'Rajasthan',
      });
      setTimeout(() => setReportSuccess(false), 5000);
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmittingForm(false);
    }
  };


  return (
    <section 
      id="roi-calculator" 
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC] overflow-hidden"
      aria-label="Solar Savings Calculator"
    >
      {/* Animated background orbs */}
      <div className="roi-orb absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0F9D58]/8 blur-3xl" aria-hidden="true" />
      <div className="roi-orb absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#0b7542]/6 blur-3xl" style={{ animationDelay: '3.5s' }} aria-hidden="true" />
      {/* Energy beam sweeps */}
      <div className="energy-beam absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#0F9D58]/10 to-transparent" aria-hidden="true" />
      <div className="energy-beam-delay absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#0b7542]/8 to-transparent" aria-hidden="true" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-up relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
          {/* Live pulsing dot */}
          <span className="ticker-dot w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Live Savings Calculator</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          Calculate Your Solar Savings & Cost
        </h2>
        <p className="text-[#374151] text-xs sm:text-base md:text-lg mt-2 sm:mt-3 font-normal">
          Adjust any input below — numbers update <strong>instantly</strong> as you change your setup.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
        
        {/* LEFT COLUMN: Input Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm space-y-5 sm:space-y-6 reveal-left calc-card-hover">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[#111827]">Your Electricity Details</h3>
            <span className="text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0b7542]/10 text-[#0b7542]">
              Official Pricing
            </span>
          </div>

          {/* 1. Property Category Selector */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
              Where will you install solar?
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2" role="group" aria-label="Select property type">
              {[
                { type: 'Residential', label: 'Home' },
                { type: 'Commercial', label: 'Office' },
                { type: 'Industrial', label: 'Factory' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => handleConnectionTypeChange(item.type)}
                  className={`py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl font-bold text-[11px] sm:text-xs transition-all cursor-pointer min-h-[44px] border ${
                    connectionType === item.type
                      ? 'bg-[#0b7542] text-white border-[#0b7542] shadow-sm'
                      : 'bg-gray-50 text-[#374151] border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Panel Specification */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[11px] sm:text-xs font-bold text-[#374151] uppercase tracking-wider">
                Panel Type
              </label>
              {connectionType === 'Residential' ? (
                <span className="text-[10px] sm:text-[11px] bg-[#0b7542]/10 text-[#0b7542] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span>🛡️</span> DCR (Gets Up to ₹78k Subsidy)
                </span>
              ) : (
                <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold">Choose Panel Type</span>
              )}
            </div>

            {connectionType === 'Residential' ? (
              <div className="p-2.5 sm:p-3 bg-[#0b7542]/5 border border-[#0b7542]/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#111827] block">Made in India (DCR Panels)</span>
                  <span className="text-[10px] sm:text-[11px] text-[#374151]">Govt. approved panels for PM Surya Ghar subsidy</span>
                </div>
                <span className="text-xs font-black text-[#0b7542] shrink-0 ml-2">Up to ₹78k Subsidy</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPanelType('DCR')}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    effectivePanelType === 'DCR'
                      ? 'border-[#0b7542] bg-[#0b7542]/10 ring-1 ring-[#0b7542]'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-bold text-[#111827] block">DCR Panels</span>
                  <span className="text-[10px] text-gray-500">Domestic Certified</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPanelType('NDCR')}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    effectivePanelType === 'NDCR'
                      ? 'border-[#0b7542] bg-[#0b7542]/10 ring-1 ring-[#0b7542]'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-bold text-[#111827] block">Standard Panels</span>
                  <span className="text-[10px] text-[#0d8070] font-bold">Lower Setup Cost</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Monthly Power Bill Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={billInputId} className="font-bold text-xs sm:text-sm text-[#111827]">
                Monthly Electricity Bill (₹)
              </label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1">
                <span className="text-xs font-bold text-gray-600">₹</span>
                <input
                  id={billInputId}
                  type="number"
                  min="1000"
                  max="50000"
                  step="500"
                  value={bill}
                  onChange={(e) => {
                    setBill(Math.max(500, Number(e.target.value)));
                  }}
                  className="w-20 sm:w-24 text-right font-extrabold text-[#0b7542] text-sm sm:text-base focus:outline-none bg-transparent"
                  aria-label="Monthly Bill in Rupees"
                />
              </div>
            </div>
            <input
              id={billSliderId}
              type="range"
              min="1000"
              max="25000"
              step="500"
              value={bill}
              onChange={(e) => {
                setBill(Number(e.target.value));
              }}
              className="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label="Monthly bill slider"
            />
            <div className="flex justify-between text-[11px] text-[#4B5563] mt-1 font-semibold">
              <span>₹1,000 / mo</span>
              <span>₹8,000 / mo</span>
              <span>₹18,000+ / mo</span>
            </div>
          </div>

          {/* Phase Selector */}
          {(recommendedCapacity === 5 || recommendedCapacity === 6) && (
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                Meter Connection Phase
              </label>
              <div className="flex gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setSelectedPhase('1PH')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    effectivePhase === '1PH'
                      ? 'bg-[#0b7542] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Single Phase (1PH)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhase('3PH')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    effectivePhase === '3PH'
                      ? 'bg-[#0b7542] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  3-Phase (3PH)
                </button>
              </div>
            </div>
          )}

          {/* 4. Solar Size Display */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[11px] sm:text-xs font-bold text-[#374151] uppercase tracking-wider">
                Recommended Solar Plant Size
              </label>
            </div>
            <div className="px-4 py-3 bg-[#0b7542] text-white rounded-xl shadow-md font-extrabold text-lg sm:text-xl flex justify-between items-center">
              <span>{recommendedCapacity} kW System</span>
              <span className="text-[10px] sm:text-xs bg-white/20 px-2 py-1 rounded">Optimal for ₹{bill} Bill</span>
            </div>
          </div>

          {/* 5. Required Area */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-xs sm:text-sm text-[#111827]">
                Required Roof Area
              </label>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
              <span className="text-lg sm:text-xl font-extrabold text-[#0b7542]">{recommendedCapacity * 64}</span>
              <span className="text-sm text-gray-600 font-bold">Sq.Ft</span>
              <span className="text-[10px] sm:text-xs text-gray-400 ml-auto">(approx. {recommendedCapacity * 2} panels)</span>
            </div>
          </div>

          {/* 6. City / District in Rajasthan */}
          <div>
            <label htmlFor={locationSelectId} className="block font-bold text-xs sm:text-sm text-[#111827] mb-2">
              City / District (Rajasthan)
            </label>
            <select
              id={locationSelectId}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 sm:h-12 px-3 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-[#111827] font-semibold focus:outline-none focus:border-[#0F9D58] cursor-pointer shadow-xs"
            >
              <option value="Jaipur, Rajasthan">Jaipur, Rajasthan (High Sunlight)</option>
              <option value="Jodhpur, Rajasthan">Jodhpur, Rajasthan (Optimal Sunlight)</option>
              <option value="Kota, Rajasthan">Kota, Rajasthan</option>
              <option value="Udaipur, Rajasthan">Udaipur, Rajasthan</option>
              <option value="Ajmer, Rajasthan">Ajmer, Rajasthan</option>
              <option value="Bikaner, Rajasthan">Bikaner, Rajasthan</option>
              <option value="Alwar, Rajasthan">Alwar, Rajasthan</option>
              <option value="Bhilwara, Rajasthan">Bhilwara, Rajasthan</option>
              <option value="Sikar, Rajasthan">Sikar, Rajasthan</option>
              <option value="Other District, Rajasthan">Other District in Rajasthan</option>
            </select>
          </div>
        </div>

        {/* RIGHT COLUMN: Results Dashboard (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 reveal-right">
          
          {/* Main 3 Output Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Metric 1: Annual Savings */}
            <SpotlightCard 
              className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between calc-card-hover" 
              spotlightColor="rgba(15, 157, 88, 0.12)"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#4B5563]">Annual Savings</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0b7542]/10 text-[#0b7542] flex items-center justify-center font-extrabold text-xs sm:text-sm" aria-hidden="true">₹</span>
              </div>
              <div>
                <h4
                  key={`sav-${flashKey}`}
                  className="value-flash text-2xl sm:text-3xl font-black text-[#0b7542] tracking-tight"
                >
                  ₹{animSavings.toLocaleString()}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#374151] mt-1 font-semibold">~₹{Math.round(animSavings / 12).toLocaleString()} saved each month</p>
              </div>
            </SpotlightCard>

            {/* Metric 2: Payback Period */}
            <SpotlightCard 
              className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between calc-card-hover" 
              spotlightColor="rgba(13, 128, 112, 0.12)"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#4B5563]">Money Back In</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0d8070]/10 text-[#0d8070] flex items-center justify-center text-xs sm:text-sm" aria-hidden="true">⏱️</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <h4
                    key={`pay-${flashKey}`}
                    className="value-flash text-2xl sm:text-3xl font-black text-[#111827] tracking-tight"
                  >
                    {paybackYears}
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-[#0d8070]">Years</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#374151] mt-1 font-semibold">Free electricity for 25+ years</p>
              </div>
            </SpotlightCard>

            {/* Metric 3: Carbon Offset */}
            <SpotlightCard 
              className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between calc-card-hover" 
              spotlightColor="rgba(217, 119, 6, 0.12)"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#4B5563]">Clean Energy</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#D97706]/10 text-[#D97706] flex items-center justify-center text-xs sm:text-sm" aria-hidden="true">🌱</span>
              </div>
              <div>
                <h4
                  key={`tree-${flashKey}`}
                  className="value-flash text-2xl sm:text-3xl font-black text-[#111827] tracking-tight"
                >
                  {animTrees} <span className="text-xs sm:text-sm font-bold text-gray-500">Trees</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-[#374151] mt-1 font-semibold">Equal to planting {animTrees} trees/year</p>
              </div>
            </SpotlightCard>
          </div>

          {/* System Breakdown Card */}
          <div className="bg-white p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm calc-card-hover">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 mb-4 border-b border-gray-100">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#111827]">
                  {planData.name} ({effectivePanelType === 'DCR' ? 'Made-in-India Panels' : 'Standard Panels'})
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                  Complete setup including panels, inverter, wire fittings & meter connection
                </p>
              </div>
              <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded bg-[#0b7542]/10 text-[#0b7542] self-start sm:self-auto">
                {effectivePhase === '1PH' ? 'Single Phase' : '3-Phase'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200 text-center sm:text-left">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#4B5563] font-bold">Capacity</span>
                <p
                  key={`cap-${flashKey}`}
                  className="value-flash text-lg sm:text-xl font-black text-[#111827] mt-0.5"
                >{recommendedCapacity} kW</p>
                <span className="text-[11px] text-gray-600 font-medium">~{recommendedCapacity * 2} Panels</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#4B5563] font-bold">Govt. Subsidy</span>
                <p
                  key={`sub-${flashKey}`}
                  className="value-flash subsidy-glow text-lg sm:text-xl font-black text-[#0b7542] mt-0.5 rounded-md"
                >₹{animSubsidy.toLocaleString()}</p>
                <span className="text-[11px] text-[#0b7542] font-semibold">Direct in Bank</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#4B5563] font-bold">Total Price</span>
                <p
                  key={`gross-${flashKey}`}
                  className="value-flash text-lg sm:text-xl font-black text-[#374151] mt-0.5"
                >₹{animGross.toLocaleString()}</p>
                <span className="text-[11px] text-gray-600 font-medium">All Equipment</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#4B5563] font-bold">You Pay</span>
                <p
                  key={`net-${flashKey}`}
                  className="value-flash text-lg sm:text-xl font-black text-[#0d8070] mt-0.5"
                >₹{animNetCost.toLocaleString()}</p>
                <span className="text-[11px] text-[#0d8070] font-semibold">After Subsidy</span>
              </div>
            </div>

            {/* Visual Savings Over 10 Years */}
            <div className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-extrabold text-[#111827]">Your Money Saved Over 10 Years</span>
                <div className="flex items-center gap-3 text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0b7542]" aria-hidden="true" />
                    <span className="text-[#111827]">With Solar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true" />
                    <span className="text-[#374151]">Without Solar</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Comparisons */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-[11px] sm:text-xs font-bold text-[#374151] mb-1">
                    <span>After 5 Years</span>
                    <span className="text-[#0b7542]">You Save ₹{animSavings5.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 sm:h-5 overflow-hidden flex" role="progressbar" aria-valuenow={annualSavings * 5} aria-valuemin="0" aria-valuemax="400000" aria-label="Savings after 5 years">
                    <div 
                      key={`bar5-${flashKey}`}
                      className="bar-animate bg-[#0b7542] h-full rounded-full flex items-center justify-end pr-2 text-[10px] sm:text-[11px] font-bold text-white"
                      style={{ width: `${Math.min(100, (annualSavings * 5 / (annualSavings * 6)) * 100)}%`, transition: 'width 0.85s cubic-bezier(0.22, 1, 0.36, 1)' }}
                    >
                      ₹{animSavings5.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] sm:text-xs font-bold text-[#374151] mb-1">
                    <span>After 10 Years</span>
                    <span className="text-[#0d8070]">You Save ₹{animSavings10.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 sm:h-5 overflow-hidden flex" role="progressbar" aria-valuenow={annualSavings * 10} aria-valuemin="0" aria-valuemax="800000" aria-label="Savings after 10 years">
                    <div 
                      key={`bar10-${flashKey}`}
                      className="bar-animate bg-[#0d8070] h-full rounded-full flex items-center justify-end pr-2 text-[10px] sm:text-[11px] font-bold text-white"
                      style={{ width: `${Math.min(100, (annualSavings * 10 / (annualSavings * 11)) * 100)}%`, transition: 'width 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s' }}
                    >
                      ₹{animSavings10.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Box: Lead Generation Form */}
          <div className="bg-[#0F172A] p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl border border-white/10 text-white">
            <h4 className="text-lg sm:text-xl font-extrabold text-white mb-1">
              Send Your Calculated Quotation to Us
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 mb-5 font-normal">
              Enter your details below to receive your exact {recommendedCapacity} kW setup quotation, subsidy assistance, and free roof layout.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="E.g. Rajesh Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFA6] focus:ring-1 focus:ring-[#00BFA6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFA6] focus:ring-1 focus:ring-[#00BFA6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="rajesh@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFA6] focus:ring-1 focus:ring-[#00BFA6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    maxLength={6}
                    placeholder="302001"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFA6] focus:ring-1 focus:ring-[#00BFA6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Jaipur"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFA6] focus:ring-1 focus:ring-[#00BFA6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    readOnly
                    aria-label="State"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingForm}
                className="w-full mt-2 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmittingForm ? 'Submitting...' : 'Send Quotation to Team →'}
              </button>
            </form>
          </div>

          {reportSuccess && (
            <div className="p-3 bg-[#0b7542]/15 border border-[#0b7542] text-[#0b7542] rounded-xl text-center text-xs sm:text-sm font-bold" role="status">
              ✓ Your customized {recommendedCapacity} kW Solar Report is ready!
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
