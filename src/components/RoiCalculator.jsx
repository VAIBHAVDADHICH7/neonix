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
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [mailSentSuccess, setMailSentSuccess] = useState(false);
  const [generatedGmailUrl, setGeneratedGmailUrl] = useState('');
  const [generatedMailto, setGeneratedMailto] = useState('');
  const [formTouched, setFormTouched] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pincode: '',
    city: '',
    state: 'Rajasthan',
    monthly_bill: '4500',
    connection_type: 'Residential',
  });

  // Flash key — incremented on every output change to retrigger CSS animation
  const [flashKey, setFlashKey] = useState(0);
  const prevCapacityRef = useRef(null);

  const billSliderId = useId();
  const billInputId = useId();
  const locationSelectId = useId();

  const handleConnectionTypeChange = (type) => {
    setConnectionType(type);
    setFormData((prev) => ({ ...prev, connection_type: type }));
    if (type === 'Residential') {
      setPanelType('DCR');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'monthly_bill' && Number(value) >= 500) {
      setBill(Number(value));
    }
    if (name === 'connection_type') {
      setConnectionType(value);
      if (value === 'Residential') setPanelType('DCR');
    }
  };

  const handleFormBlur = (field) => {
    setFormTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isNameValid = formData.name.trim().length >= 2;
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.mobile.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPincodeValid = /^[1-9][0-9]{5}$/.test(formData.pincode.trim());
  const isCityValid = formData.city.trim().length >= 2;
  const isBillValid = Number(formData.monthly_bill || bill) >= 500;
  const isConnectionTypeValid = Boolean(formData.connection_type || connectionType);
  const isQuotationFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPincodeValid &&
    isCityValid &&
    isBillValid &&
    isConnectionTypeValid;

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

  // Lock body scroll when quotation modal is active
  useEffect(() => {
    if (isQuoteModalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isQuoteModalOpen]);

  // Animated display values
  const animSavings = useAnimatedCount(annualSavings);
  const animSubsidy = useAnimatedCount(subsidyAmount);
  const animNetCost = useAnimatedCount(netCost);
  const animGross   = useAnimatedCount(grossCost);
  const animTrees   = useAnimatedCount(treeEquivalents);
  const animSavings5 = useAnimatedCount(annualSavings * 5);
  const animSavings10 = useAnimatedCount(annualSavings * 10);

  const openQuoteModal = () => {
    setFormData((prev) => ({
      ...prev,
      monthly_bill: String(bill),
      connection_type: connectionType,
    }));
    setMailSentSuccess(false);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setMailSentSuccess(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isQuotationFormValid) {
      setFormTouched({
        name: true,
        mobile: true,
        email: true,
        pincode: true,
        city: true,
        monthly_bill: true,
        connection_type: true,
      });
      return;
    }
    setIsSubmittingForm(true);

    const effectiveBillAmount = Number(formData.monthly_bill) || bill;
    const effectiveConnType = formData.connection_type || connectionType;

    const payload = {
      ...formData,
      name: formData.name,
      mobile: formData.mobile,
      phone: formData.mobile,
      monthly_bill: effectiveBillAmount,
      connection_type: effectiveConnType,
      requiredRoofArea: recommendedCapacity * 64,
      location: `${formData.city}, ${formData.state} - ${formData.pincode}`,
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
      receiverEmail: 'amit.sharma@neonixinfra.in',
      source: 'ROI Calculator Email Lead Form',
      timestamp: new Date().toISOString(),
    };

    // Pre-formatted Email Message
    const emailSubject = `Solar Quotation & Feasibility Request - ${formData.name} (${recommendedCapacity} kW System)`;
    const emailBody = `Dear Neonix Solar Team,

I have calculated my solar requirements on the Neonix Solar ROI Calculator and would like to discuss this setup and receive a formal quotation.

==================================================
CUSTOMER & LOCATION DETAILS
==================================================
• Full Name: ${formData.name}
• Mobile Number: ${formData.mobile}
• Sender Email: ${formData.email}
• City: ${formData.city}
• State: ${formData.state}
• Area Pincode: ${formData.pincode}
• Connection Type: ${effectiveConnType}
• Monthly Electricity Bill: ₹${effectiveBillAmount.toLocaleString()}

==================================================
CALCULATED SYSTEM SPECIFICATIONS
==================================================
• Recommended System Size: ${recommendedCapacity} kW (${effectivePhase})
• Technology / Panel Type: ${effectivePanelType} Panels
• Estimated Roof Area Needed: ~${recommendedCapacity * 64} sq. ft.
• Gross System Cost: ₹${grossCost.toLocaleString()}
• PM Surya Ghar Govt. Subsidy: ₹${subsidyAmount.toLocaleString()}
• Net System Cost (After Subsidy): ₹${netCost.toLocaleString()}
• Estimated Year 1 Bill Savings: ₹${annualSavings.toLocaleString()} / year
• Estimated 10-Year Total Savings: ₹${(annualSavings * 10).toLocaleString()}
• Estimated Payback Timeline: ${paybackYears} Years
• Environmental Impact: ${co2OffsetTons} Tons CO2 (~${treeEquivalents} trees planted)

Please review my requirements and contact me at ${formData.mobile} to proceed with a site survey and consultation.

Best regards,
${formData.name}
Phone: ${formData.mobile}
Email: ${formData.email}`;

    const receiverEmail = 'amit.sharma@neonixinfra.in';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(receiverEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const mailtoUri = `mailto:${receiverEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    setGeneratedGmailUrl(gmailUrl);
    setGeneratedMailto(mailtoUri);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (onDownloadReport) {
        onDownloadReport(payload);
      }
    } catch (err) {
      console.error('Webhook sync log:', err);
    } finally {
      setIsSubmittingForm(false);
      setMailSentSuccess(true);
      // Open Gmail by default in a new tab / redirect
      try {
        const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          window.location.href = gmailUrl;
        }
      } catch {
        window.location.href = gmailUrl;
      }
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
        
        {/* LEFT COLUMN: Input Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm space-y-5 sm:space-y-6 reveal-left calc-card-hover flex flex-col justify-between h-full">
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
              onChange={(e) => {
                const val = e.target.value;
                setLocation(val);
                const cityName = val.split(',')[0].trim();
                if (cityName && !formData.city) {
                  setFormData((prev) => ({ ...prev, city: cityName }));
                }
              }}
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
        <div className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6 reveal-right h-full">
          
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

          {/* Action Box: Email Quotation CTA Banner */}
          <div className="bg-[#0F172A] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/10 text-white relative overflow-hidden flex-1 flex flex-col justify-center mt-auto">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#0F9D58]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00BFA6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 my-auto">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/25">
                  <span className="w-2 h-2 rounded-full bg-[#00BFA6]" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00BFA6]">Official Solar Quotation</span>
                </div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                  Happy with this calculation or want to discuss a custom setup?
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  If you want to discuss your rooftop setup or you are happy with the calculation, mail us your quote directly for immediate engineer review, shadow analysis, and subsidy paperwork.
                </p>
              </div>

              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_4px_20px_rgba(15,157,88,0.4)] hover:shadow-[0_6px_24px_rgba(15,157,88,0.55)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shimmer-btn min-h-[48px] sm:min-h-[50px] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
                >
                  <span>✉️ Send Us a Quote</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <span className="text-[11px] text-gray-400 text-center lg:text-left block font-medium">
                  ⚡ Pre-formats your {recommendedCapacity} kW quote with 1-click
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── QUOTATION FORMALITY & EMAIL MODAL ── */}
      {isQuoteModalOpen && (
        <div 
          className="fixed inset-0 z-[300] overflow-y-auto overscroll-contain flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="roi-quote-modal-title"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md transition-opacity cursor-pointer"
            onClick={closeQuoteModal}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div 
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 overflow-y-auto max-h-[88vh] overscroll-contain transform transition-all my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#0b7542]/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Close Button */}
            <button
              type="button"
              onClick={closeQuoteModal}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>

            {!mailSentSuccess ? (
              <div>
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0b7542]/10 text-[#0b7542]">
                      Email Quotation Request
                    </span>
                    <span className="text-xs text-[#4B5563] font-semibold">• Direct to our Engineering Team</span>
                  </div>
                  <h3 id="roi-quote-modal-title" className="text-2xl font-black text-[#111827] leading-snug">
                    Send Us Your Quotation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#374151] mt-1 font-normal">
                    Just complete some formalities before sending your quotation. We will pre-format your email with all your calculator estimates and open your mail service.
                  </p>
                </div>

                {/* Pre-filled Calculation Specs Box */}
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-3.5 mb-5 text-xs text-[#111827] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[#4B5563] block font-medium">System Size</span>
                    <span className="font-black text-[#0b7542] text-sm">{recommendedCapacity} kW</span>
                  </div>
                  <div>
                    <span className="text-[#4B5563] block font-medium">Govt. Benefits</span>
                    <span className="font-black text-[#0d8070] text-sm">₹{subsidyAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#4B5563] block font-medium">Net Cost</span>
                    <span className="font-black text-[#111827] text-sm">₹{netCost.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      {formTouched.name && isNameValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleFormBlur('name')}
                      placeholder="e.g. Rajesh Sharma"
                      className={`w-full h-11 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                        formTouched.name && !isNameValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {formTouched.name && !isNameValid && (
                      <p className="text-xs text-[#D97706] mt-1 font-medium">Please enter your full name.</p>
                    )}
                  </div>

                  {/* Mobile & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                          Mobile (10 Digits) <span className="text-red-500">*</span>
                        </label>
                        {formTouched.mobile && isPhoneValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        maxLength={10}
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onBlur={() => handleFormBlur('mobile')}
                        placeholder="9829012345"
                        className={`w-full h-11 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                          formTouched.mobile && !isPhoneValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formTouched.mobile && !isPhoneValid && (
                        <p className="text-xs text-[#D97706] mt-1 font-medium">Enter a valid 10-digit number.</p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                          Your Email (Sender ID) <span className="text-red-500">*</span>
                        </label>
                        {formTouched.email && isEmailValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleFormBlur('email')}
                        placeholder="name@example.com"
                        className={`w-full h-11 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                          formTouched.email && !isEmailValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formTouched.email && !isEmailValid && (
                        <p className="text-xs text-[#D97706] mt-1 font-medium">Enter a valid email address.</p>
                      )}
                    </div>
                  </div>

                  {/* Monthly Bill & Connection Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                          Monthly Bill (₹) <span className="text-red-500">*</span>
                        </label>
                        {formTouched.monthly_bill && isBillValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                      </div>
                      <input
                        type="number"
                        name="monthly_bill"
                        required
                        value={formData.monthly_bill}
                        onChange={handleInputChange}
                        onBlur={() => handleFormBlur('monthly_bill')}
                        placeholder="4500"
                        className={`w-full h-11 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                          formTouched.monthly_bill && !isBillValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                        Connection Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="connection_type"
                        required
                        value={formData.connection_type}
                        onChange={handleInputChange}
                        className="w-full h-11 px-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] cursor-pointer"
                      >
                        <option value="Residential">Residential (Home)</option>
                        <option value="Commercial">Commercial (Business / Shop)</option>
                        <option value="Industrial">Industrial (Factory)</option>
                      </select>
                    </div>
                  </div>

                  {/* City & Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                          City <span className="text-red-500">*</span>
                        </label>
                        {formTouched.city && isCityValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                      </div>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        onBlur={() => handleFormBlur('city')}
                        placeholder="e.g. Jaipur, Jodhpur"
                        className={`w-full h-11 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                          formTouched.city && !isCityValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formTouched.city && !isCityValid && (
                        <p className="text-xs text-[#D97706] mt-1 font-medium">Please enter your city.</p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                          Pincode (6 Digits) <span className="text-red-500">*</span>
                        </label>
                        {formTouched.pincode && isPincodeValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                      </div>
                      <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        onBlur={() => handleFormBlur('pincode')}
                        placeholder="302001"
                        className={`w-full h-11 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                          formTouched.pincode && !isPincodeValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formTouched.pincode && !isPincodeValid && (
                        <p className="text-xs text-[#D97706] mt-1 font-medium">Enter 6-digit pincode.</p>
                      )}
                    </div>
                  </div>

                  {/* State (Fixed) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                      State <span className="text-[#0b7542] text-[10px]">(Fixed)</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value="Rajasthan"
                      readOnly
                      aria-label="State"
                      className="w-full h-11 px-3.5 bg-gray-100 border border-gray-300 rounded-xl text-sm text-gray-600 cursor-not-allowed font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingForm}
                    className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 sm:py-4 rounded-xl shadow-[0_4px_16px_rgba(15,157,88,0.4)] hover:shadow-[0_6px_20px_rgba(15,157,88,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer shimmer-btn min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:ring-offset-2"
                  >
                    <span>{isSubmittingForm ? 'Preparing Email...' : '✉️ Send Quote to Us →'}</span>
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-1 font-medium">
                    Will open Gmail compose with your pre-formatted calculation.
                  </p>
                </form>
              </div>
            ) : (
              /* Success / Email Client Redirect state */
              <div className="text-center py-5 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0b7542]/15 text-[#0b7542] flex items-center justify-center text-3xl mx-auto shadow-inner" aria-hidden="true">
                  ✉️
                </div>
                <h3 className="text-2xl font-black text-[#111827]">Quotation Prepared!</h3>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed max-w-sm mx-auto font-normal">
                  Your customized <strong>{recommendedCapacity} kW solar quote</strong> has been prepared to send to us.
                </p>

                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-3.5 text-xs text-left space-y-1.5 text-[#374151]">
                  <p>• <strong>To:</strong> Neonix Solar Team</p>
                  <p>• <strong>From:</strong> {formData.email}</p>
                  <p>• <strong>Recommended System:</strong> {recommendedCapacity} kW ({effectivePanelType})</p>
                  <p>• <strong>PM Surya Ghar Subsidy:</strong> ₹{subsidyAmount.toLocaleString()}</p>
                  <p>• <strong>Estimated Net Cost:</strong> ₹{netCost.toLocaleString()}</p>
                  <p>• <strong>Annual Savings:</strong> ₹{annualSavings.toLocaleString()}/yr</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <a
                    href={generatedGmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(15,157,88,0.35)] hover:shadow-[0_6px_20px_rgba(15,157,88,0.45)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer shimmer-btn min-h-[46px]"
                  >
                    <span>Open in Gmail ↗</span>
                  </a>
                  {generatedMailto && (
                    <a
                      href={generatedMailto}
                      className="px-4 py-3.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-[#374151] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 min-h-[46px]"
                    >
                      <span>Default Mail</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={closeQuoteModal}
                    className="px-5 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#374151] transition-all cursor-pointer min-h-[46px]"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
