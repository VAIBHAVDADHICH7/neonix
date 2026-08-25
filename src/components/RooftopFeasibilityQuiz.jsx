import { useState } from 'react';
import SpotlightCard from './UI/SpotlightCard';

export default function RooftopFeasibilityQuiz({ onCompleteQuiz }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    roofType: 'Flat Terrace',
    shadowCondition: 'Full Sunlight All Day',
    meterLoad: 'Home (2-3 BHK)',
  });
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setQuizFinished(false);
  };

  return (
    <section 
      id="feasibility-checker" 
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#F8FAFC]"
      aria-label="Is Your Roof Ready for Solar"
    >
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 reveal-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Quick 1-Minute Check</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          Is Your Roof Ready for Solar?
        </h2>
        <p className="text-[#374151] text-xs sm:text-base md:text-lg mt-2 sm:mt-3 font-normal">
          Answer 3 quick questions to see if your roof can produce solar electricity and save you money.
        </p>
      </div>

      <div className="max-w-3xl mx-auto reveal-scale">
        <SpotlightCard className="bg-white p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden" spotlightColor="rgba(15, 157, 88, 0.08)">
          
          {!quizFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0b7542]">
                  Question {currentStep} of 3
                </span>
                <div className="flex gap-1.5 sm:gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        currentStep === step ? 'w-6 sm:w-8 bg-[#0F9D58]' : currentStep > step ? 'w-3 sm:w-4 bg-[#0b7542]' : 'w-3 sm:w-4 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Roof Type */}
              {currentStep === 1 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                    1. What kind of roof do you have?
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4B5563]">Select the type of roof on your building.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                    {[
                      { label: 'Flat Terrace', icon: '🏢', desc: 'Standard flat concrete terrace' },
                      { label: 'Metal / Tin Shed', icon: '🏭', desc: 'Tin roof or factory warehouse' },
                      { label: 'Slanted / Tiled Roof', icon: '🏠', desc: 'Sloping roof with tiles or shingles' },
                      { label: 'Open Rooftop Structure', icon: '🏗️', desc: 'Elevated roof or gazebo setup' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSelect('roofType', item.label)}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 sm:gap-3 min-h-[64px] ${
                          answers.roofType === item.label
                            ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/20'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/60'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#111827]">{item.label}</p>
                          <p className="text-[11px] sm:text-xs text-[#4B5563] mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shadow Conditions */}
              {currentStep === 2 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                    2. Does your roof get good sunlight?
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4B5563]">Good sunlight during daytime ensures maximum power production.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                    {[
                      { label: 'Full Sunlight All Day', icon: '☀️', desc: 'Open sky with no shadows from morning to evening' },
                      { label: 'Some Shade in Morning/Evening', icon: '🌤️', desc: 'Small parapet wall or nearby trees' },
                      { label: 'Tall Nearby Buildings / Water Tank', icon: '🏢', desc: 'Can use an elevated solar stand' },
                      { label: 'Not Sure (Need Free Roof Check)', icon: '🔍', desc: 'Our engineer will check for you free' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSelect('shadowCondition', item.label)}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 sm:gap-3 min-h-[64px] ${
                          answers.shadowCondition === item.label
                            ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/20'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/60'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#111827]">{item.label}</p>
                          <p className="text-[11px] sm:text-xs text-[#4B5563] mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Sanctioned Load */}
              {currentStep === 3 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                    3. Where is this solar system for?
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4B5563]">Helps us calculate your exact government subsidy.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                    {[
                      { label: 'Small House (1-2 BHK)', icon: '⚡', desc: 'Gets up to ₹60,000 Govt. Benefits' },
                      { label: 'Standard Home (2-3 BHK)', icon: '🏡', desc: 'Gets Maximum ₹78,000 domestic Govt. Benefits' },
                      { label: 'Large Home / Villa', icon: '🏬', desc: 'Gets ₹78,000 domestic subsidy + Big Savings' },
                      { label: 'Shop / Factory / Office', icon: '🏭', desc: 'Huge monthly savings on power bills' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSelect('meterLoad', item.label)}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 sm:gap-3 min-h-[64px] ${
                          answers.meterLoad === item.label
                            ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/20'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/60'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#111827]">{item.label}</p>
                          <p className="text-[11px] sm:text-xs text-[#4B5563] mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 sm:pt-8 mt-4 sm:mt-6 border-t border-gray-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 sm:px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#374151] hover:bg-gray-100 cursor-pointer min-h-[40px]"
                  >
                    ← Back
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0F9D58] hover:bg-[#0c8248] active:bg-[#096636] text-white font-extrabold text-xs uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-md transition-all cursor-pointer shimmer-btn min-h-[44px]"
                >
                  {currentStep === 3 ? 'See My Result →' : 'Next Question →'}
                </button>
              </div>
            </div>
          ) : (
            /* Results Card */
            <div className="text-center py-2 sm:py-4 space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0F9D58]/15 text-[#0F9D58] flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-inner">
                ⚡
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#0b7542] bg-[#0b7542]/10 px-3 py-1 rounded-full inline-block mb-1.5 sm:mb-2">
                  Roof Check Result
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111827]">
                  Your Roof is 100% Ready for Solar!
                </h3>
                <p className="text-xs sm:text-sm text-[#374151] mt-1.5 sm:mt-2 max-w-md mx-auto leading-relaxed font-normal">
                  Your roof has great sunlight. You can save up to <strong>90% on your monthly electricity bills</strong> and get <strong>₹78,000 domestic govt. benefits</strong>.
                </p>
              </div>

              {/* Quick Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 bg-[#F8FAFC] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200 text-xs text-left">
                <div className="p-1.5 sm:p-2">
                  <span className="text-gray-500 block font-semibold text-[11px]">Roof Type</span>
                  <span className="font-extrabold text-[#111827] text-xs sm:text-sm">{answers.roofType}</span>
                </div>
                <div className="p-1.5 sm:p-2">
                  <span className="text-gray-500 block font-semibold text-[11px]">Sunlight</span>
                  <span className="font-extrabold text-[#0b7542] text-xs sm:text-sm">{answers.shadowCondition}</span>
                </div>
                <div className="p-1.5 sm:p-2">
                  <span className="text-gray-500 block font-semibold text-[11px]">Govt. Benefits</span>
                  <span className="font-extrabold text-[#0d8070] text-xs sm:text-sm">₹78,000 Domestic Eligible</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onCompleteQuiz) {
                      onCompleteQuiz(answers);
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto bg-[#0F9D58] hover:bg-[#0c8248] text-white font-extrabold text-xs uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg transition-all cursor-pointer shimmer-btn min-h-[46px]"
                >
                  Book Free Roof Check For This Setup →
                </button>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-300 text-xs font-bold text-[#374151] hover:bg-gray-100 cursor-pointer min-h-[44px]"
                >
                  Check Again
                </button>
              </div>
            </div>
          )}

        </SpotlightCard>
      </div>
    </section>
  );
}
