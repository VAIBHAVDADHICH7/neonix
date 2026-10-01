import { useState } from 'react';

export default function HeroLeadForm({
  title = 'Get Your Free Proposal',
  badgeText = 'Free Site Survey',
  webhookUrl = 'https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r',
  defaultState = {
    name: '',
    phone: '',
    email: '',
    pincode: '',
    city: '',
    state: 'Rajasthan',
    monthly_bill: '4500',
    connection_type: 'Residential',
  },
  onSuccess,
  onError,
  className = '',
}) {
  const [formData, setFormData] = useState(defaultState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const isNameValid = formData.name.trim().length >= 2;
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPincodeValid = /^[1-9][0-9]{5}$/.test(formData.pincode.trim());
  const isCityValid = formData.city.trim().length >= 2;
  const isBillValid = Number(formData.monthly_bill) >= 500;
  const isConnectionTypeValid = Boolean(formData.connection_type);
  const isQuickFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPincodeValid &&
    isCityValid &&
    isBillValid &&
    isConnectionTypeValid;

  const numBill = Math.max(500, Number(formData.monthly_bill) || 4500);
  const estimatedYearlySavings = Math.round(numBill * 0.9 * 12);
  const estimatedSubsidy =
    formData.connection_type === 'Residential' ? '₹78,000 Domestic' : '40% Tax Benefit';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      const sanitized = digits.length > 10 && digits.startsWith('91') ? digits.slice(2, 12) : digits.slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: sanitized }));
      return;
    }
    if (name === 'pincode') {
      const digits = value.replace(/\D/g, '').slice(0, 6);
      setFormData((prev) => ({ ...prev, pincode: digits }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleQuickLeadSubmit = async (e) => {
    e.preventDefault();
    if (!isQuickFormValid) {
      setTouched({
        name: true,
        phone: true,
        email: true,
        pincode: true,
        city: true,
        monthly_bill: true,
        connection_type: true,
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    try {
      const payload = {
        ...formData,
        property_type: formData.connection_type,
        location: `${formData.city}, ${formData.state} - ${formData.pincode}`,
        estimatedYearlySavings,
        estimatedSubsidy,
        source: 'Hero Responsive Interactive Lead Form',
        timestamp: new Date().toISOString(),
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmitSuccess(true);
      if (onSuccess) onSuccess(payload);
      setFormData(defaultState);
      setTouched({});
      setTimeout(() => setSubmitSuccess(false), 6000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
      if (onError) onError(error);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (invalid) =>
    `w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-50/90 hover:bg-white focus:bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]/20 transition-all ${
      invalid ? 'border-red-400 bg-red-50/20 focus:border-red-500' : 'border-slate-200 focus:border-[#0F9D58]'
    }`;

  return (
    <div
      id="hero-form-group"
      className={`w-full max-w-md bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
          <span className="text-[#0F9D58]">⚡</span> {title}
        </h2>
        {badgeText && (
          <span className="text-[10px] font-bold text-[#0b7542] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 shadow-xs">
            {badgeText}
          </span>
        )}
      </div>

      {/* Real-time Estimated Savings Pill */}
      <div className="flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-50/90 to-teal-50/90 border border-emerald-200/80 text-xs mb-2.5 shadow-xs">
        <span className="text-slate-600 font-medium text-[11px] sm:text-xs">Est. Annual Savings:</span>
        <span className="font-extrabold text-[#0b7542] text-xs sm:text-sm">
          ₹{estimatedYearlySavings.toLocaleString('en-IN')}/yr
        </span>
      </div>

      {submitSuccess && (
        <div
          className="mb-2.5 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold"
          role="status"
        >
          ✓ Thank you! Our certified solar engineer will call you shortly.
        </div>
      )}
      {submitError && (
        <div
          className="mb-2.5 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold"
          role="alert"
        >
          Something went wrong. Please call +91 99100 00774.
        </div>
      )}

      <form onSubmit={handleQuickLeadSubmit} noValidate className="space-y-2">
        {/* Connection Type Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
          {['Residential', 'Commercial'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, connection_type: type }))}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                formData.connection_type === type
                  ? 'bg-[#0F9D58] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'Residential' ? '🏡 Home / Resi' : '🏢 Business'}
            </button>
          ))}
        </div>

        {/* Name */}
        <div>
          <input
            id="hero-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={() => handleBlur('name')}
            placeholder="Full Name (As per electricity bill) *"
            aria-label="Full Name"
            required
            className={inputClass(touched.name && !isNameValid)}
          />
          {touched.name && !isNameValid && (
            <p className="text-[10px] text-red-500 font-medium mt-0.5 pl-1">Please enter your full name</p>
          )}
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <input
              id="hero-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              maxLength={10}
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => handleBlur('phone')}
              placeholder="Mobile (10 Digits) *"
              aria-label="Mobile Number"
              required
              className={inputClass(touched.phone && !isPhoneValid)}
            />
            {touched.phone && !isPhoneValid && (
              <p className="text-[10px] text-red-500 font-medium mt-0.5 pl-1">10-digit mobile required</p>
            )}
          </div>
          <div>
            <input
              id="hero-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur('email')}
              placeholder="Email Address *"
              aria-label="Email Address"
              required
              className={inputClass(touched.email && !isEmailValid)}
            />
            {touched.email && !isEmailValid && (
              <p className="text-[10px] text-red-500 font-medium mt-0.5 pl-1">Valid email required</p>
            )}
          </div>
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              id="hero-city"
              type="text"
              name="city"
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={() => handleBlur('city')}
              placeholder="City (e.g. Jaipur) *"
              aria-label="City"
              required
              className={inputClass(touched.city && !isCityValid)}
            />
            {touched.city && !isCityValid && (
              <p className="text-[10px] text-red-500 font-medium mt-0.5 pl-1">City required</p>
            )}
          </div>
          <div>
            <input
              id="hero-pincode"
              type="text"
              name="pincode"
              autoComplete="postal-code"
              maxLength={6}
              value={formData.pincode}
              onChange={handleInputChange}
              onBlur={() => handleBlur('pincode')}
              placeholder="Pincode (6 Digits) *"
              aria-label="Pincode"
              required
              className={inputClass(touched.pincode && !isPincodeValid)}
            />
            {touched.pincode && !isPincodeValid && (
              <p className="text-[10px] text-red-500 font-medium mt-0.5 pl-1">6-digit pincode</p>
            )}
          </div>
        </div>

        {/* State Dropdown + Monthly Bill */}
        <div className="grid grid-cols-2 gap-2">
          <select
            id="hero-state"
            name="state"
            autoComplete="address-level1"
            value={formData.state}
            onChange={handleInputChange}
            aria-label="State"
            className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0F9D58]/20 focus:border-[#0F9D58] cursor-pointer"
          >
            <option value="Rajasthan">Rajasthan</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Haryana">Haryana</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Punjab">Punjab</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Other">Other State</option>
          </select>
          <div>
            <input
              id="hero-monthly-bill"
              type="number"
              name="monthly_bill"
              value={formData.monthly_bill}
              onChange={handleInputChange}
              onBlur={() => handleBlur('monthly_bill')}
              placeholder="Monthly Bill (₹) *"
              aria-label="Monthly Bill Amount"
              required
              className={inputClass(touched.monthly_bill && !isBillValid)}
            />
            {touched.monthly_bill && !isBillValid && (
              <p className="text-[10px] text-red-500 font-medium mt-0.5 pl-1">Min bill ₹500</p>
            )}
          </div>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl uppercase tracking-wider transition-all shadow-[0_6px_20px_-3px_rgba(15,157,88,0.35)] hover:shadow-[0_10px_24px_-3px_rgba(15,157,88,0.45)] disabled:opacity-50 cursor-pointer min-h-[44px] shimmer-btn"
        >
          {isSubmitting ? 'Submitting...' : 'Check My Savings & Subsidy →'}
        </button>
        <p className="text-[10px] sm:text-[11px] text-center text-slate-500 mt-1 flex items-center justify-center gap-1">
          <span>🔒</span> 100% Privacy Protected • Zero Spam
        </p>
      </form>
    </div>
  );
}

