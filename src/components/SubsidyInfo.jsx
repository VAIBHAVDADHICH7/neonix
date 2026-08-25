import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function SubsidyInfo({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('steps');

  const steps = [
    {
      step: '01',
      title: 'Free Roof Visit & Application',
      timeline: 'Day 1 - 2',
      description: 'Our team visits your roof for a free check, takes measurements, and helps you submit your application on the official government portal.',
      icon: '📝',
    },
    {
      step: '02',
      title: 'Discom & Government Approval',
      timeline: 'Day 3 - 7',
      description: 'Your local electricity board (DISCOM) reviews and approves your solar connection. We handle all approvals for you.',
      icon: '🏛️',
    },
    {
      step: '03',
      title: 'Quick & Safe Installation',
      timeline: 'Day 8 - 12',
      description: 'Our certified engineers install high-quality Made-in-India solar panels and your smart net-meter in just 1 to 2 days.',
      icon: '⚡',
    },
    {
      step: '04',
      title: 'Govt. Benefits Sent to Your Bank',
      timeline: 'Within 30 Days',
      description: 'The government sends up to ₹78,000 domestic govt. benefits directly into your bank account via Direct Benefit Transfer (DBT).',
      icon: '💰',
    },
  ];

  const rateCards = [
    { capacity: '3 kW System', bestFor: 'Small Homes (Bill ~₹3,000/mo)', price: '₹1,95,000', subsidy: '₹78,000 domestic', net: '₹1,17,000', monthlyUnits: '~360 Units/mo' },
    { capacity: '4 kW System', bestFor: 'Medium Homes (Bill ~₹4,000/mo)', price: '₹2,35,000', subsidy: '₹78,000 domestic', net: '₹1,57,000', monthlyUnits: '~480 Units/mo' },
    { capacity: '5 kW System (Single Phase)', bestFor: 'Standard Homes with 1-2 ACs', price: '₹2,80,000', subsidy: '₹78,000 domestic', net: '₹2,02,000', monthlyUnits: '~600 Units/mo', popular: true },
    { capacity: '5 kW System (3-Phase)', bestFor: '3-Phase Standard Homes / ACs', price: '₹3,15,000', subsidy: '₹78,000 domestic', net: '₹2,37,000', monthlyUnits: '~600 Units/mo' },
    { capacity: '6 kW System (Single Phase)', bestFor: 'Large Homes with 2-3 ACs', price: '₹3,30,000', subsidy: '₹78,000 domestic', net: '₹2,52,000', monthlyUnits: '~720 Units/mo' },
    { capacity: '6 kW System (3-Phase)', bestFor: '3-Phase Large Homes / Heavy Loads', price: '₹3,55,000', subsidy: '₹78,000 domestic', net: '₹2,77,000', monthlyUnits: '~720 Units/mo' },
    { capacity: '8 kW System (3-Phase)', bestFor: 'Villas & Joint Families', price: '₹4,40,000', subsidy: '₹78,000 domestic', net: '₹3,62,000', monthlyUnits: '~960 Units/mo' },
    { capacity: '10 kW System (3-Phase)', bestFor: 'Luxury Homes & Commercial Setups', price: '₹5,20,000', subsidy: '₹78,000 domestic', net: '₹4,42,000', monthlyUnits: '~1,200 Units/mo' },
  ];

  return (
    <section 
      id="subsidy-info" 
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC]"
      aria-label="Government Solar Subsidy Guide"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/10 border border-[#D97706]/25 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D97706]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">PM Surya Ghar Scheme</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          How to Get Your ₹78,000 Domestic Govt. Benefits
        </h2>
        <p className="text-[#374151] text-xs sm:text-base md:text-lg mt-2 sm:mt-3 font-normal">
          Under the PM Surya Ghar Muft Bijli Yojana, Indian homeowners receive up to ₹78,000 domestic govt. benefits cash back directly in their bank account. We take care of all paperwork for you.
        </p>

        {/* Segmented View Toggles */}
        <div className="inline-flex flex-col sm:flex-row p-1 bg-white border border-gray-200 rounded-2xl shadow-xs mt-5 sm:mt-6 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'steps'
                ? 'bg-[#0b7542] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            4 Easy Steps to Get Benefits
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'bg-[#0b7542] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Govt. Benefits & Pricing List
          </button>
        </div>
      </div>

      {/* TAB 1: 4 Easy Steps */}
      {activeTab === 'steps' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((s, idx) => (
            <SpotlightCard
              key={s.step}
              className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between reveal-up delay-${(idx + 1) * 100}`}
              spotlightColor="rgba(15, 157, 88, 0.1)"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl" role="img" aria-label={s.title}>{s.icon}</span>
                  <span className="text-xl sm:text-2xl font-black text-gray-200">{s.step}</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#0b7542] bg-[#0b7542]/10 px-2 sm:px-2.5 py-0.5 rounded-md inline-block mb-1.5 sm:mb-2">
                  {s.timeline}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-1 sm:mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
                  {s.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Step {s.step} of 04</span>
                <span className="text-[#0b7542]">✓ We Handle This</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* TAB 2: Official Subsidy & Pricing Cards */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rateCards.map((rc) => (
            <SpotlightCard
              key={rc.capacity}
              className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border ${
                rc.popular ? 'border-[#0b7542] ring-2 ring-[#0b7542]/20 shadow-md' : 'border-gray-200'
              } shadow-sm flex flex-col justify-between relative`}
              spotlightColor="rgba(15, 157, 88, 0.12)"
            >
              {rc.popular && (
                <span className="absolute -top-3 right-4 sm:right-6 bg-[#0b7542] text-white text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              <div>
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#111827]">{rc.capacity}</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{rc.bestFor}</p>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0d8070] inline-block mt-1">Generates {rc.monthlyUnits}</span>
                </div>

                <div className="space-y-2 sm:space-y-2.5 py-3 sm:py-4 border-y border-gray-100 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Package Price:</span>
                    <span className="font-bold text-gray-900">{rc.price}</span>
                  </div>
                  <div className="flex justify-between text-[#0b7542] font-semibold">
                    <span>Govt. Benefits Back:</span>
                    <span className="font-extrabold">- {rc.subsidy}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#111827] pt-2 border-t border-gray-100">
                    <span>Final Cost to You:</span>
                    <span className="text-[#0b7542]">{rc.net}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenConsultation) onOpenConsultation();
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    rc.popular
                      ? 'bg-[#0b7542] hover:bg-[#0c8248] text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Book This Solar Size →
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Trust Callout Banner */}
      <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0b7542]/10 text-[#0b7542] flex items-center justify-center text-xl sm:text-2xl shrink-0">
            🛡️
          </div>
          <div>
            <h4 className="text-sm sm:text-lg font-extrabold text-[#111827]">
              100% Govt. Benefits Assistance Guaranteed
            </h4>
            <p className="text-xs sm:text-sm text-[#374151] mt-0.5 font-normal">
              We guide you step-by-step from portal registration to bank account verification. No middle-man delays.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onOpenConsultation) onOpenConsultation();
          }}
          className="w-full md:w-auto shrink-0 bg-[#0B7542] hover:bg-[#0c8248] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm cursor-pointer min-h-[44px]"
        >
          Check My Eligibility Free →
        </button>
      </div>

    </section>
  );
}
