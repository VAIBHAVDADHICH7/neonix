import { useState, useEffect } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Neonix made solar simple and affordable for us.",
      story: "Our monthly electricity bill was over ₹7,500 during summer. After Neonix installed a 4 kW rooftop system with PM Surya Ghar subsidy, our bill came down to barely ₹300. The entire installation was finished in 48 hours without any hassle.",
      author: "Rajendra Pareek",
      role: "Homeowner, Vaishali Nagar, Jaipur",
      system: "4 kW Residential System",
      savings: "92% Bill Reduced",
      rating: 5,
    },
    {
      id: 2,
      quote: "The subsidy process was completely seamless and transparent.",
      story: "I was skeptical about government benefits paperwork, but Neonix handled everything from National Portal registration to DISCOM net-metering. The ₹78,000 domestic govt. benefits got credited directly to my bank account within 30 days.",
      author: "Kanishka Sharma",
      role: "Villa Owner, Mansarovar, Jaipur",
      system: "3 kW Residential System",
      savings: "₹45,000/yr Saved",
      rating: 5,
    },
    {
      id: 3,
      quote: "Best investment for our commercial warehouse facility.",
      story: "We installed a 15 kW commercial solar plant for our garment manufacturing unit. The ROI has been phenomenal, and the real-time IoT app helps us monitor peak daytime solar generation with ease.",
      author: "Vikram Singhania",
      role: "Director, Singhania Textiles, Sitapura",
      system: "15 kW Commercial System",
      savings: "₹2.2 Lakhs/yr Saved",
      rating: 5,
    },
    {
      id: 4,
      quote: "Top-tier craftsmanship, highly dedicated engineers.",
      story: "The structural mounting and cabling were done with surgical precision. Even after heavy rains and storms, the panels generate uninterrupted clean energy. Highly recommend Neonix to everyone considering solar!",
      author: "Pooja Choudhary",
      role: "Residential Society Secretary, Jagatpura",
      system: "5 kW Society System",
      savings: "88% Bill Reduced",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC]"
      aria-label="Customer Testimonials and Reviews"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Customer Stories</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          Trusted by 500+ Happy Solar Rooftops
        </h2>
        <p className="text-[#374151] text-xs sm:text-base md:text-lg mt-2 sm:mt-3 font-normal">
          Hear from real homeowners and businesses who transitioned to zero-cost clean electricity with Neonix.
        </p>
      </div>

      {/* Main Testimonial Carousel Card */}
      <div className="max-w-4xl mx-auto reveal-scale">
        <SpotlightCard 
          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-gray-200 shadow-xl relative overflow-hidden" 
          spotlightColor="rgba(15, 157, 88, 0.1)"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F9D58]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            
            {/* Customer Initials Avatar & Meta Badge */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0b7542]/15 via-[#0F9D58]/10 to-[#0b7542]/5 border-2 border-[#0b7542]/30 flex items-center justify-center text-2xl sm:text-3xl font-black text-[#0b7542] shadow-sm mb-3 sm:mb-4">
                {current.author.split(' ').map(n => n[0]).join('')}
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#0b7542]/10 text-[#0b7542] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" aria-hidden="true" />
                Verified Client
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#111827]">{current.author}</h3>
              <p className="text-[11px] sm:text-xs text-[#4B5563] font-semibold mt-0.5">{current.role}</p>

              {/* Rating stars */}
              <div className="flex gap-1 mt-2 text-[#D97706] text-xs sm:text-sm" aria-label="5 out of 5 stars rating">
                {'★'.repeat(current.rating)}
              </div>
            </div>

            {/* Quote & Story with High Contrast */}
            <div className="w-full md:w-2/3 flex flex-col justify-between md:pl-2">
              <div>
                <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl text-[#0b7542] leading-none font-serif select-none" aria-hidden="true">“</span>
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#111827] leading-snug">
                    {current.quote}
                  </blockquote>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#374151] leading-relaxed font-normal mb-4 sm:mb-6">
                  {current.story}
                </p>
              </div>

              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 text-xs">
                <span className="bg-[#0b7542]/10 text-[#0b7542] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs">
                  ⚡ {current.system}
                </span>
                <span className="bg-[#0d8070]/10 text-[#0d8070] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs">
                  💰 {current.savings}
                </span>
              </div>
            </div>

          </div>

          {/* Controls: Prev / Next / Dots */}
          <div className="flex items-center justify-between pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200 relative z-10">
            <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-selected={currentIndex === idx}
                  role="tab"
                  className={`h-2.5 sm:h-3 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 sm:w-8 bg-[#0b7542]' : 'w-2.5 sm:w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous customer story"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 hover:border-[#0b7542] hover:text-[#0b7542] bg-white flex items-center justify-center text-[#111827] shadow-sm transition-all cursor-pointer active:scale-95"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next customer story"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 hover:border-[#0b7542] hover:text-[#0b7542] bg-white flex items-center justify-center text-[#111827] shadow-sm transition-all cursor-pointer active:scale-95"
              >
                →
              </button>
            </div>
          </div>

        </SpotlightCard>
      </div>

    </section>
  );
}
