import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pincode: '',
    city: '',
    state: 'Rajasthan',
    monthly_bill: '',
    connection_type: 'Residential',
    message: '',
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ submitting: false, success: false, error: false });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Live Validation Rules
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFormSubmit = async (e) => {
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

    setStatus({ submitting: true, success: false, error: false });

    try {
      await fetch('https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: `${formData.city}, ${formData.state} - ${formData.pincode}`,
          source: 'Website Contact Section Inquiry',
          submittedAt: new Date().toISOString(),
        }),
      });
      setStatus({ submitting: false, success: true, error: false });
      setFormData({
        name: '',
        phone: '',
        email: '',
        pincode: '',
        city: '',
        state: 'Rajasthan',
        monthly_bill: '',
        connection_type: 'Residential',
        message: '',
      });
      setTouched({});
      setTimeout(() => setStatus((prev) => ({ ...prev, success: false })), 8000);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({ submitting: false, success: false, error: true });
      setTimeout(() => setStatus((prev) => ({ ...prev, error: false })), 6000);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  return (
    <>
      {/* 10. CONTACT SECTION */}
      <section 
        id="contact" 
        className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC]"
        aria-label="Contact and Site Survey Booking"
      >
        <div className="bg-[#0F172A] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden border border-white/10">
          
          {/* Glowing background shapes */}
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#0F9D58]/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#00BFA6]/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 reveal-left text-center lg:text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 mb-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">We Are Here to Help</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Ready to Cut Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA6] via-[#0F9D58] to-[#00BFA6]">Electricity Bills?</span>
                </h2>
                <p className="text-gray-300 text-xs sm:text-base mt-2 sm:mt-3 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
                  Talk to our friendly solar team for a free roof check, custom solar plan, and easy government subsidy help.
                </p>
              </div>

              {/* Address, Phone, Email Cards */}
              <div className="space-y-3 sm:space-y-4 text-left">
                
                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0F9D58]/20 text-[#00BFA6] flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">Our Office</h3>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                      Neonix Infra Solutions LLP, Manyawas, Jaipur, Rajasthan 302020
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-[#00BFA6] font-semibold block mt-0.5">
                      ★ Active across Rajasthan
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0F9D58]/20 text-[#00BFA6] flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">Phone (Mon–Sat 9AM–7PM)</h3>
                    <a href="tel:+919910000774" className="text-xs sm:text-sm font-bold text-white hover:text-[#00BFA6] transition-colors block mt-0.5">
                      +91 99100 00774 / +91 90886 88899
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0F9D58]/20 text-[#00BFA6] flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">Email Us</h3>
                    <a href="mailto:customercare@neonixinfra.in" className="text-xs sm:text-sm font-bold text-white hover:text-[#00BFA6] transition-colors block mt-0.5">
                      customercare@neonixinfra.in
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 reveal-right">
              <form 
                onSubmit={handleFormSubmit}
                noValidate
                className="bg-white/[0.05] backdrop-blur-xl border border-white/15 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl space-y-3.5 sm:space-y-4 relative text-left"
              >
                <div className="border-b border-white/10 pb-3 mb-1 sm:mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Send Us a Message</h3>
                </div>

                {status.success && (
                  <div className="p-3.5 sm:p-4 bg-[#0F9D58]/30 border border-[#0F9D58] text-white rounded-xl text-xs sm:text-sm leading-relaxed" role="alert">
                    <p className="font-bold flex items-center gap-1.5">
                      <span>✓</span> Message Sent Successfully!
                    </p>
                    <p className="text-xs text-gray-200 mt-1">
                      Our solar team will call you shortly to help you with your free roof check and subsidy.
                    </p>
                  </div>
                )}

                {status.error && (
                  <div className="p-3 bg-red-500/25 border border-red-500 text-white rounded-xl text-xs sm:text-sm font-medium" role="alert">
                    Could not send message. Please call us directly at +91 99100 00774.
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="inquiry-name" className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      {touched.name && isNameValid && (
                        <span className="text-xs text-[#00BFA6] font-bold">✓</span>
                      )}
                    </div>
                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Rajesh Sharma"
                      className={`w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                        touched.name && !isNameValid ? 'border-red-400 bg-red-500/10' : ''
                      }`}
                    />
                    {touched.name && !isNameValid && (
                      <p className="text-xs text-[#F59E0B] font-semibold">Please enter your full name.</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="inquiry-phone" className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                        Mobile (10 Digits) <span className="text-red-400">*</span>
                      </label>
                      {touched.phone && isPhoneValid && (
                        <span className="text-xs text-[#00BFA6] font-bold">✓</span>
                      )}
                    </div>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      name="phone"
                      maxLength={10}
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="e.g. 9829012345"
                      className={`w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                        touched.phone && !isPhoneValid ? 'border-red-400 bg-red-500/10' : ''
                      }`}
                    />
                    {touched.phone && !isPhoneValid && (
                      <p className="text-xs text-[#F59E0B] font-semibold">Enter a valid 10-digit mobile number.</p>
                    )}
                  </div>
                </div>

                {/* Email & Monthly Bill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="inquiry-email" className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      {touched.email && isEmailValid && (
                        <span className="text-xs text-[#00BFA6] font-bold">✓</span>
                      )}
                    </div>
                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="name@example.com"
                      className={`w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                        touched.email && !isEmailValid ? 'border-red-400 bg-red-500/10' : ''
                      }`}
                    />
                    {touched.email && !isEmailValid && (
                      <p className="text-xs text-[#F59E0B] font-semibold">Please enter a valid email address.</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="inquiry-bill" className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                        Monthly Bill (₹) <span className="text-red-400">*</span>
                      </label>
                      {touched.monthly_bill && isBillValid && (
                        <span className="text-xs text-[#00BFA6] font-bold">✓</span>
                      )}
                    </div>
                    <input
                      id="inquiry-bill"
                      type="number"
                      name="monthly_bill"
                      required
                      value={formData.monthly_bill}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('monthly_bill')}
                      placeholder="e.g. 4500"
                      className={`w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                        touched.monthly_bill && !isBillValid ? 'border-red-400 bg-red-500/10' : ''
                      }`}
                    />
                    {touched.monthly_bill && !isBillValid && (
                      <p className="text-xs text-[#F59E0B] font-semibold">Enter your average monthly bill (min ₹500).</p>
                    )}
                  </div>
                </div>

                {/* Connection Type & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label htmlFor="inquiry-connection" className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                      Connection Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="inquiry-connection"
                      name="connection_type"
                      required
                      value={formData.connection_type}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none bg-[#0B132B] text-white cursor-pointer"
                    >
                      <option value="Residential" className="bg-[#0B132B] text-white">Residential (Home / Villa)</option>
                      <option value="Commercial" className="bg-[#0B132B] text-white">Commercial (Office / Shop / Hospital)</option>
                      <option value="Industrial" className="bg-[#0B132B] text-white">Industrial (Factory / Warehouse)</option>
                      <option value="Agricultural" className="bg-[#0B132B] text-white">Agricultural (Farm / Pump)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="inquiry-city" className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                        City <span className="text-red-400">*</span>
                      </label>
                      {touched.city && isCityValid && (
                        <span className="text-xs text-[#00BFA6] font-bold">✓</span>
                      )}
                    </div>
                    <input
                      id="inquiry-city"
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('city')}
                      placeholder="e.g. Jaipur, Jodhpur, Kota"
                      className={`w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                        touched.city && !isCityValid ? 'border-red-400 bg-red-500/10' : ''
                      }`}
                    />
                    {touched.city && !isCityValid && (
                      <p className="text-xs text-[#F59E0B] font-semibold">Please enter your city.</p>
                    )}
                  </div>
                </div>

                {/* Pincode & State (Fixed) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="inquiry-pincode" className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                        Pincode (6 Digits) <span className="text-red-400">*</span>
                      </label>
                      {touched.pincode && isPincodeValid && (
                        <span className="text-xs text-[#00BFA6] font-bold">✓</span>
                      )}
                    </div>
                    <input
                      id="inquiry-pincode"
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('pincode')}
                      placeholder="e.g. 302020"
                      className={`w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                        touched.pincode && !isPincodeValid ? 'border-red-400 bg-red-500/10' : ''
                      }`}
                    />
                    {touched.pincode && !isPincodeValid && (
                      <p className="text-xs text-[#F59E0B] font-semibold">Enter a valid 6-digit pincode.</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="inquiry-state" className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                      State <span className="text-[#00BFA6] text-[10px]">(Fixed)</span>
                    </label>
                    <input
                      id="inquiry-state"
                      type="text"
                      name="state"
                      value="Rajasthan"
                      readOnly
                      aria-label="State (Fixed to Rajasthan)"
                      className="w-full p-3 sm:p-3.5 rounded-xl glass-input text-xs sm:text-sm text-gray-300 cursor-not-allowed font-medium opacity-80"
                    />
                  </div>
                </div>

                {/* Message Field (Optional) */}
                <div className="space-y-1">
                  <label htmlFor="inquiry-msg" className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                    Additional Message / Requirements <span className="text-gray-400 font-normal text-[10px]">(Optional)</span>
                  </label>
                  <textarea
                    id="inquiry-msg"
                    name="message"
                    rows="2"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us any specific details about your roof or questions..."
                    className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm focus:outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full mt-2 sm:mt-3 bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs sm:text-sm tracking-wider px-6 py-3.5 sm:py-4 rounded-xl uppercase transition-all shadow-[0_4px_16px_rgba(15,157,88,0.4)] transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shimmer-btn min-h-[46px] sm:min-h-[48px]"
                  aria-label="Submit Solar Consultation Inquiry"
                >
                  <span>{status.submitting ? 'Sending Message...' : 'Send Message'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#0B132B] text-white pt-12 sm:pt-16 pb-20 md:pb-12 border-t border-white/10 relative overflow-hidden" aria-label="Neonix Site Footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-white/10">
            
            {/* Brand & Mission */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <img src="/images/logo.svg" alt="Neonix Infra Solutions Logo" className="h-9 sm:h-10 w-auto bg-white p-1.5 rounded-full" width="40" height="40" />
                <div>
                  <span className="text-white font-extrabold text-lg sm:text-xl block leading-none">Neonix</span>
                  <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold">Infra Solutions</span>
                </div>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                Your trusted partner for rooftop solar power in India. Cut electricity bills by 90% with government subsidy and complete installation support.
              </p>
              
              {/* Social Media Icons */}
              <div className="pt-1 sm:pt-2">
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-bold mb-2 sm:mb-3">Connect With Us</p>
                <div className="flex gap-2.5 sm:gap-3">
                  <a 
                    href="https://www.instagram.com/neonix_infra/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Visit Neonix on Instagram" 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/neonix-infra-solutions-a4a6b3416/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Visit Neonix on LinkedIn" 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61590804090394" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Visit Neonix on Facebook" 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white mb-2 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-300">
                <li><a href="#solutions" className="hover:text-[#00BFA6] transition-colors">Our Solar Systems</a></li>
                <li><a href="#subsidy-info" className="hover:text-[#00BFA6] transition-colors">Govt. Subsidy (PM Surya Ghar)</a></li>
                <li><a href="#roi-calculator" className="hover:text-[#00BFA6] transition-colors">Savings Calculator</a></li>
                <li><a href="#testimonials" className="hover:text-[#00BFA6] transition-colors">Customer Reviews</a></li>
                <li><a href="#contact" className="hover:text-[#00BFA6] transition-colors">Book Free Roof Check</a></li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white mb-2 sm:mb-4">Helpful Info</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-300">
                <li><a href="/privacy-policy.html" className="hover:text-[#00BFA6] transition-colors">Privacy Policy</a></li>
                <li><a href="/terms.html" className="hover:text-[#00BFA6] transition-colors">Terms of Service</a></li>
                <li><a href="#subsidy-info" className="hover:text-[#00BFA6] transition-colors">Govt. Subsidy Guide</a></li>
                <li><a href="#roi-calculator" className="hover:text-[#00BFA6] transition-colors">Price List</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white mb-2 sm:mb-4">Solar Updates</h4>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Get helpful tips on saving electricity and government solar news.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Your email address for newsletter subscription"
                  className="w-full p-2.5 sm:p-3 rounded-xl glass-input text-xs focus:ring-2 focus:ring-[#0F9D58] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0B7542] hover:bg-[#0c8248] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 sm:py-3 rounded-xl transition-colors cursor-pointer min-h-[42px] sm:min-h-[44px]"
                >
                  Subscribe
                </button>
                {newsletterSubscribed && (
                  <p className="text-xs text-[#00BFA6] font-bold mt-1">✓ Thank you for subscribing!</p>
                )}
              </form>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-400 gap-3 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Neonix Infra Solutions LLP. All rights reserved.</p>
            <p className="text-gray-300">Govt. Approved PM Surya Ghar Partner in India</p>
          </div>

        </div>
      </footer>
    </>
  );
}
