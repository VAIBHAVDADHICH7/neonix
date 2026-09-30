import { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: 'subsidy',
    question: 'How much government subsidy is available for rooftop solar panels?',
    answer:
      'Under the PM Surya Ghar Muft Bijli Yojana, residential consumers in India can receive up to ₹78,000 direct central subsidy (₹30,000 for 1kW, ₹60,000 for 2kW, and ₹78,000 for 3kW and above). Neonix handles the complete paperwork and Discom liaison to credit the subsidy directly to your bank account.',
  },
  {
    id: 'savings',
    question: 'How much can I save on my electricity bill by installing solar panels?',
    answer:
      'A standard rooftop solar installation can reduce monthly electricity bills by up to 90%. Any excess green energy produced during sunny daytime hours is automatically exported back to the grid via bidirectional net metering, earning you billing credits against your nighttime consumption.',
  },
  {
    id: 'lifespan',
    question: 'What is the lifespan of Neonix clean energy solar panels?',
    answer:
      'Neonix installs Tier-1 Mono PERC and TopCon bi-facial solar panels that come with a 25 to 30-year linear performance warranty. Our installations include galvanized anti-corrosive structures and comprehensive Annual Maintenance Contracts (AMC) for worry-free longevity.',
  },
  {
    id: 'roof',
    question: 'What type of roof is suitable for solar panel installation?',
    answer:
      'RCC flat roofs, metal sheds, and tiled roofs are all suitable for solar installation. We require approximately 80-100 sq. ft. of shadow-free rooftop space per 1 kW of solar capacity. Our engineers conduct a 3D shadow analysis before every installation to guarantee optimal angle and maximum daily generation.',
  },
  {
    id: 'timeline',
    question: 'How long does the installation and net metering approval process take?',
    answer:
      'Physical rooftop installation typically completes within 3 to 5 days. State electricity board (DISCOM) net-meter inspection and grid synchronization generally takes 2 to 4 weeks depending on your local circle. Neonix end-to-end manages all inspections and documentation.',
  },
];

export default function FAQ({ onOpenConsultation }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-white border-t border-gray-200/70"
      aria-label="Frequently Asked Questions about Solar"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 reveal-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b7542]/10 border border-[#0b7542]/25 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0F9D58]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0b7542]">Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base mt-2.5 max-w-xl mx-auto">
            Everything you need to know about rooftop solar subsidies, net metering, warranty, and installation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 reveal-up">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50/80 border-[#0F9D58]/40 shadow-sm'
                    : 'bg-white border-gray-200/80 hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F9D58]"
                >
                  <span className="font-bold text-base sm:text-lg text-[#111827] leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#0F9D58] text-white rotate-180'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-[#374151] leading-relaxed border-t border-gray-100 pt-3"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-[#070D1E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 reveal-up">
          <div>
            <h3 className="text-lg font-bold text-white">Have a specific question about your roof?</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Talk directly to our chief solar engineers for a free site feasibility check.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="flex-shrink-0 bg-[#0F9D58] hover:bg-[#0c8248] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md min-h-[48px]"
          >
            Ask An Engineer
          </button>
        </div>
      </div>
    </section>
  );
}
