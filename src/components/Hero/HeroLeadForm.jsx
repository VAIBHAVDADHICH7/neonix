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
    `w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.06] border text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00BFA6] transition-colors ${
      invalid ? 'border-red-500/60' : 'border-white/10 focus:border-[#00BFA6]'
    }`;

  return (
    <div
      id="hero-form-group"
      className={`w-full max-w-md bg-[#0B132B]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-1.5">
          <span className="text-[#00BFA6]">⚡</span> {title}
        </h2>
        {badgeText && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {badgeText}
          </span>
        )}
      </div>

      {/* Real-time Estimated Savings Pill */}
      <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/30 text-xs mb-3">
        <span className="text-gray-300 text-[11px] sm:text-xs">Est. Annual Savings:</span>
        <span className="font-extrabold text-[#00BFA6] text-xs sm:text-sm">
          ₹{estimatedYearlySavings.toLocaleString('en-IN')}/yr
        </span>
      </div>

      {submitSuccess && (
        <div
          className="mb-3 p-3 bg-[#0B7542]/25 border border-[#0B7542]/60 text-[#00BFA6] rounded-xl text-xs font-semibold"
          role="status"
        >
          ✓ Thank you! Our certified solar engineer will call you shortly.
        </div>
      )}
      {submitError && (
        <div
          className="mb-3 p-3 bg-red-500/15 border border-red-500/40 text-red-300 rounded-xl text-xs"
          role="alert"
        >
          Something went wrong. Please call +91 99100 00774.
        </div>
      )}

      <form onSubmit={handleQuickLeadSubmit} noValidate className="space-y-2 sm:space-y-2.5">
        {/* Connection Type Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.08]">
          {['Residential', 'Commercial'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, connection_type: type }))}
              className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                formData.connection_type === type
                  ? 'bg-[#0F9D58] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {type === 'Residential' ? '🏡 Home / Resi' : '🏢 Business'}
            </button>
          ))}
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={() => handleBlur('name')}
          placeholder="Full Name (As per electricity bill) *"
          aria-label="Full Name"
          required
          className={inputClass(touched.name && !isNameValid)}
        />

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="tel"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={() => handleBlur('phone')}
            placeholder="Mobile No. (10 Digits) *"
            aria-label="Mobile Number"
            required
            className={inputClass(touched.phone && !isPhoneValid)}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            placeholder="Email Address *"
            aria-label="Email Address"
            required
            className={inputClass(touched.email && !isEmailValid)}
          />
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            onBlur={() => handleBlur('city')}
            placeholder="City (Jaipur) *"
            aria-label="City"
            required
            className={inputClass(touched.city && !isCityValid)}
          />
          <input
            type="text"
            name="pincode"
            maxLength={6}
            value={formData.pincode}
            onChange={handleInputChange}
            onBlur={() => handleBlur('pincode')}
            placeholder="Pincode *"
            aria-label="Pincode"
            required
            className={inputClass(touched.pincode && !isPincodeValid)}
          />
        </div>

        {/* State (Fixed) + Monthly Bill */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="state"
            value="Rajasthan"
            readOnly
            aria-label="State"
            className="w-full px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-gray-300 cursor-not-allowed font-medium focus:outline-none"
          />
          <input
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
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer min-h-[46px] shimmer-btn"
        >
          {isSubmitting ? 'Submitting...' : 'Check My Savings & Subsidy →'}
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-1">
          🔒 100% Privacy Protected • Zero Spam
        </p>
      </form>
    </div>
  );
}
