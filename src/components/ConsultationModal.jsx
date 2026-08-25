import { useState } from 'react';

export default function ConsultationModal({ isOpen, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: initialData?.location || 'Jaipur, Rajasthan',
    bill: initialData?.bill || '4500',
    propertyType: initialData?.connectionType || 'Residential',
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const isNameValid = formData.name.trim().length >= 2;
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isFormValid = isNameValid && isPhoneValid && isEmailValid;

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
      setTouched({ name: true, phone: true, email: true });
      return;
    }

    setSubmitting(true);

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 overflow-hidden transform transition-all max-h-[92vh] overflow-y-auto">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#0b7542]/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            {/* Step & Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0b7542]/10 text-[#0b7542]">
                  {initialData ? 'Personalized ROI Report' : 'Free Expert Site Consultation'}
                </span>
                <span className="text-xs text-[#4B5563] font-semibold">• 2 Min Form</span>
              </div>
              <h3 id="modal-title" className="text-2xl font-black text-[#111827] leading-snug">
                {initialData ? 'Download Your Solar Savings Blueprint' : 'Book Free Expert Site Survey'}
              </h3>
              <p className="text-xs sm:text-sm text-[#374151] mt-1 font-normal">
                Our solar engineers will prepare a personalized shadow analysis and exact subsidy breakdown.
              </p>
            </div>

            {/* If initialData is present, show summary box */}
            {initialData && (
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-3.5 mb-5 text-xs text-[#111827] grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[#4B5563] block font-medium">System Size</span>
                  <span className="font-black text-[#0b7542] text-sm">{initialData.calculatedSystemSize || '3.5'} kW</span>
                </div>
                <div>
                  <span className="text-[#4B5563] block font-medium">Govt. Benefits</span>
                  <span className="font-black text-[#0d8070] text-sm">₹{Number(initialData.subsidyAmount || 78000).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#4B5563] block font-medium">Annual Savings</span>
                  <span className="font-black text-[#111827] text-sm">₹{Number(initialData.annualSavings || 45000).toLocaleString()}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  {touched.name && isNameValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
                </div>
                <input
                  id="modal-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full h-12 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                    touched.name && !isNameValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                      Mobile (10 Digits) <span className="text-red-500">*</span>
                    </label>
                    {touched.phone && isPhoneValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
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
                    className={`w-full h-12 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                      touched.phone && !isPhoneValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="modal-city" className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                    City / Location
                  </label>
                  <input
                    id="modal-city"
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Jaipur, Rajasthan"
                    className="w-full h-12 px-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  {touched.email && isEmailValid && <span className="text-xs text-[#0b7542] font-bold">✓</span>}
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
                  className={`w-full h-12 px-3.5 bg-gray-50 border rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#0F9D58] ${
                    touched.email && !isEmailValid ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-3 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-sm tracking-wide py-4 rounded-xl uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer shimmer-btn min-h-[48px]"
              >
                {submitting ? 'Preparing Blueprint...' : (initialData ? 'Generate & Send Report' : 'Confirm Free Consultation')}
              </button>
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
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
