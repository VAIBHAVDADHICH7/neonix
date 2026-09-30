import { useState, useEffect } from 'react';

export default function ConsultationModal({ isOpen, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pincode: initialData?.pincode || '',
    city: initialData?.city || 'Jaipur',
    state: 'Rajasthan',
    monthly_bill: initialData?.bill || initialData?.monthly_bill || '4500',
    connection_type: initialData?.connectionType || initialData?.connection_type || 'Residential',
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      if (window.__lenis) {
        window.__lenis.stop();
      }
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        window.removeEventListener('keydown', handleKeyDown);
        if (window.__lenis) {
          window.__lenis.start();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isNameValid = formData.name.trim().length >= 2;
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPincodeValid = /^[1-9][0-9]{5}$/.test(formData.pincode.trim());
  const isCityValid = formData.city.trim().length >= 2;
  const isBillValid = Number(formData.monthly_bill) >= 500;
  const isConnectionTypeValid = Boolean(formData.connection_type);
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPincodeValid &&
    isCityValid &&
    isBillValid &&
    isConnectionTypeValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
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

    setSubmitting(true);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: `${formData.city}, ${formData.state} - ${formData.pincode}`,
          roiData: initialData,
          source: 'Free Consultation & ROI Modal',
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-[300] overflow-y-auto overscroll-contain flex justify-center p-2.5 sm:p-4"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card - Single scrollable outer context, perfectly centered with my-auto */}
      <div 
        className="relative z-10 w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl border border-gray-200 transform transition-all my-auto"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#0b7542]/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          id="close-consultation-modal"
          type="button"
          onClick={onClose}
          aria-label="Close form and continue to home screen"
          title="Close and continue to home screen"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-2 sm:mb-3 pr-8">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0b7542]/10 text-[#0b7542]">
                  {initialData ? 'Personalized ROI Report' : 'Free Expert Site Survey'}
                </span>
                <span className="text-[10px] sm:text-xs text-[#4B5563] font-semibold">• PM Surya Ghar</span>
              </div>
              <h3 id="modal-title" className="text-base sm:text-lg font-black text-[#111827] leading-tight">
                {initialData ? 'Download Your Solar Savings Blueprint' : 'Book Free Expert Site Survey'}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#374151] mt-0.5 font-normal">
                Personalized shadow analysis &amp; exact government subsidy breakdown.
              </p>
            </div>

            {/* If initialData is present, show compact summary pill */}
            {initialData && (
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-2 mb-3 text-xs text-[#111827] grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[#4B5563] block text-[10px] font-medium">System Size</span>
                  <span className="font-black text-[#0b7542] text-xs sm:text-sm">{initialData.calculatedSystemSize || '3.5'} kW</span>
                </div>
                <div>
                  <span className="text-[#4B5563] block text-[10px] font-medium">Govt. Benefits</span>
                  <span className="font-black text-[#0d8070] text-xs sm:text-sm">₹{Number(initialData.subsidyAmount || 78000).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#4B5563] block text-[10px] font-medium">Annual Savings</span>
                  <span className="font-black text-[#111827] text-xs sm:text-sm">₹{Number(initialData.annualSavings || 45000).toLocaleString()}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-2 sm:space-y-2.5">
              {/* Row 1: Full Name & Mobile */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label htmlFor="modal-name" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#374151]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    {touched.name && isNameValid && <span className="text-[10px] text-[#0b7542] font-bold">✓</span>}
                  </div>
                  <input
                    id="modal-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Rajesh"
                    className={`w-full h-8.5 sm:h-9.5 px-2.5 bg-gray-50 border rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                      touched.name && !isNameValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label htmlFor="modal-phone" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#374151]">
                      Mobile (10 Digits) <span className="text-red-500">*</span>
                    </label>
                    {touched.phone && isPhoneValid && <span className="text-[10px] text-[#0b7542] font-bold">✓</span>}
                  </div>
                  <input
                    id="modal-phone"
                    type="tel"
                    name="phone"
                    maxLength={10}
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    placeholder="9829012345"
                    className={`w-full h-8.5 sm:h-9.5 px-2.5 bg-gray-50 border rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                      touched.phone && !isPhoneValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Row 2: Email & Monthly Bill */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label htmlFor="modal-email" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#374151]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    {touched.email && isEmailValid && <span className="text-[10px] text-[#0b7542] font-bold">✓</span>}
                  </div>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="name@example.com"
                    className={`w-full h-8.5 sm:h-9.5 px-2.5 bg-gray-50 border rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                      touched.email && !isEmailValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label htmlFor="modal-bill" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#374151]">
                      Monthly Bill (₹) <span className="text-red-500">*</span>
                    </label>
                    {touched.monthly_bill && isBillValid && <span className="text-[10px] text-[#0b7542] font-bold">✓</span>}
                  </div>
                  <input
                    id="modal-bill"
                    type="number"
                    name="monthly_bill"
                    required
                    value={formData.monthly_bill}
                    onChange={handleChange}
                    onBlur={() => handleBlur('monthly_bill')}
                    placeholder="e.g. 4500"
                    className={`w-full h-8.5 sm:h-9.5 px-2.5 bg-gray-50 border rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                      touched.monthly_bill && !isBillValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Connection Type & City + Pincode */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <label htmlFor="modal-connection" className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#374151] mb-0.5">
                    Connection Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="modal-connection"
                    name="connection_type"
                    required
                    value={formData.connection_type}
                    onChange={handleChange}
                    className="w-full h-8.5 sm:h-9.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] cursor-pointer"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#374151]">
                      City &amp; Pincode (RJ) <span className="text-red-500">*</span>
                    </label>
                    {touched.city && isCityValid && touched.pincode && isPincodeValid && (
                      <span className="text-[10px] text-[#0b7542] font-bold">✓</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                    <input
                      id="modal-city"
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={() => handleBlur('city')}
                      placeholder="City"
                      aria-label="City in Rajasthan"
                      className={`w-full h-8.5 sm:h-9.5 px-2 bg-gray-50 border rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                        touched.city && !isCityValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <input
                      id="modal-pincode"
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      onBlur={() => handleBlur('pincode')}
                      placeholder="Pincode"
                      aria-label="6-digit Pincode"
                      className={`w-full h-8.5 sm:h-9.5 px-2 bg-gray-50 border rounded-lg text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                        touched.pincode && !isPincodeValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm tracking-wide py-2.5 sm:py-3 rounded-xl uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer shimmer-btn min-h-[42px]"
              >
                {submitting ? 'Preparing Blueprint...' : (initialData ? 'Generate & Send Report' : 'Confirm Free Consultation')}
              </button>

              <p className="text-[10px] text-center text-[#4B5563] pt-0.5">
                🔒 100% Free • Direct DISCOM Net Metering • No Spam Guarantee
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0b7542]/15 text-[#0b7542] flex items-center justify-center text-3xl mx-auto" aria-hidden="true">
              ✓
            </div>
            <h3 className="text-2xl font-black text-[#111827]">Request Confirmed!</h3>
            <p className="text-sm text-[#374151] leading-relaxed max-w-sm mx-auto font-normal">
              Thank you! Our senior solar consultant is reviewing your electricity slab and will call you at <strong>{formData.phone}</strong> within 2 business hours.
            </p>

            {/* Instant Print / Save PDF Option */}
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 text-xs text-left space-y-2 text-[#374151]">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-extrabold text-[#111827]">Neonix Official Solar Blueprint</span>
                <span className="text-[10px] bg-[#0b7542]/10 text-[#0b7542] px-2 py-0.5 rounded font-bold">READY</span>
              </div>
              <p>• Recommended Size: <strong>{initialData?.calculatedSystemSize || '3.5'} kW</strong></p>
              <p>• PM Surya Ghar Subsidy: <strong>₹{Number(initialData?.subsidyAmount || 78000).toLocaleString()}</strong></p>
              <p>• Estimated Year 1 Savings: <strong>₹{Number(initialData?.annualSavings || 45000).toLocaleString()}</strong></p>
              <p>• Payback Timeline: <strong>{initialData?.paybackYears || '2.4'} Years</strong></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={handlePrintReport}
                className="flex-1 bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🖨️ Print / Save Summary</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#0b7542] hover:bg-[#096636] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl cursor-pointer"
              >
                Explore Home Screen →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
