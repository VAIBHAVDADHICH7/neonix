/**
 * Frequently Asked Questions
 * Categorized FAQ database for Homepage, Calculator, and Service Pages
 */

export const FAQS = {
  home: [
    {
      id: 'subsidy',
      question: 'How much government subsidy is available for rooftop solar panels?',
      answer:
        'Under the <a href="/pm-surya-ghar-yojana" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">PM Surya Ghar Muft Bijli Yojana</a>, residential consumers in India can receive up to ₹78,000 direct central subsidy (₹30,000 for 1kW, ₹60,000 for 2kW, and ₹78,000 for 3kW and above). Registration and DBT subsidy transfer is managed directly on the official <a href="https://pmsuryaghar.gov.in/" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">PM Surya Ghar National Portal ↗</a>. Neonix handles the complete portal paperwork and DISCOM liaison to credit the subsidy directly to your bank account.',
    },
    {
      id: 'savings',
      question: 'How much can I save on my electricity bill by installing solar panels?',
      answer:
        'A standard rooftop solar installation can reduce monthly electricity bills by up to 90%. Any excess green energy produced during sunny daytime hours is automatically exported back to the grid via bidirectional net metering, earning you billing credits against nighttime consumption. You can estimate your exact savings with our <a href="/solar-calculator" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Free Solar ROI Calculator</a>.',
    },
    {
      id: 'lifespan',
      question: 'What is the lifespan of Neonix clean energy solar panels?',
      answer:
        'Neonix installs Tier-1 Mono PERC and TopCon bi-facial solar panels that come with a 25 to 30-year linear performance warranty backed by <a href="https://mnre.gov.in/" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">MNRE ALMM guidelines ↗</a>. Our installations include galvanized anti-corrosive structures and comprehensive <a href="/solar-amc" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Solar Care &amp; AMC Maintenance Contracts</a> for worry-free longevity.',
    },
    {
      id: 'roof',
      question: 'What type of roof is suitable for solar panel installation?',
      answer:
        'RCC flat roofs, metal sheds, and tiled roofs are all suitable for solar installation. We require approximately 65–80 sq. ft. of shadow-free rooftop space per 1 kW of solar capacity. We offer specialized mounting for <a href="/residential-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Residential Homes</a> and non-penetrating clamps for <a href="/industrial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Industrial Factory Sheds</a>.',
    },
    {
      id: 'timeline',
      question: 'How long does the installation and net metering approval process take?',
      answer:
        'Physical rooftop installation typically completes within 3 to 5 days. State electricity board net-meter inspection and grid synchronization (via <a href="https://energy.rajasthan.gov.in/jvvnl" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">JVVNL / DISCOM ↗</a>) generally takes 2 to 4 weeks depending on your circle. Neonix end-to-end manages all inspections and documentation.',
    },
  ],

  calculator: [
    {
      q: 'How is my recommended solar system capacity calculated?',
      a: 'The calculator estimates your monthly electricity consumption in kWh (units) by dividing your average monthly bill by standard grid tariff rates. In high-sunlight states like Rajasthan, 1 kW of rooftop solar generates approximately 120–135 units per month. We then match your consumption to the exact kW system needed to eliminate up to 90% of your bill. Explore our <a href="/residential-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Residential Solar Solutions</a> or <a href="/commercial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Commercial Solar Packages</a>.',
    },
    {
      q: 'What is the PM Surya Ghar subsidy amount for residential solar?',
      a: 'Under the PM Surya Ghar Muft Bijli Yojana, residential consumers receive: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum flat subsidy of ₹78,000 for 3 kW and larger systems. The subsidy is credited directly via DBT within 30 days. Read our comprehensive <a href="/pm-surya-ghar-yojana" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">PM Surya Ghar Scheme Guide</a> or visit the official <a href="https://pmsuryaghar.gov.in/" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">National Portal ↗</a>.',
    },
    {
      q: 'What is the difference between DCR and Non-DCR solar panels?',
      a: 'DCR (Domestic Content Requirement) panels are manufactured entirely in India using domestically produced solar cells and modules, mandated by <a href="https://mnre.gov.in/" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">MNRE ↗</a> to qualify for the PM Surya Ghar subsidy. Non-DCR panels use high-efficiency imported cells (e.g. N-Type TOPCon) offering lower upfront capital cost for <a href="/commercial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Commercial</a> and <a href="/industrial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Industrial</a> plants claiming 40% accelerated depreciation tax savings.',
    },
    {
      q: 'When should I choose Single-Phase (1PH) vs Three-Phase (3PH)?',
      a: 'Single-phase connections are standard for smaller residential homes with sanctioned loads up to 4 kW – 5 kW running standard home appliances. Three-phase connections are required for systems larger than 5 kW, commercial establishments, agricultural connections, or homes operating multiple heavy AC units or machinery.',
    },
    {
      q: 'How does Net Metering work in Rajasthan?',
      a: 'Net metering is a billing mechanism governed by <a href="https://energy.rajasthan.gov.in/jvvnl" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">JVVNL / State DISCOMs ↗</a> that credits solar energy system owners for surplus electricity added to the grid. During daytime peak hours, your solar panels export excess power to the grid. At night, you draw power back. You only pay for the net difference.',
    },
    {
      q: 'How much shadow-free roof area is required for installation?',
      a: 'Each 1 kW of rooftop solar requires approximately 64 to 70 sq. ft. of clean, shadow-free rooftop space. For example, a 3 kW system needs about 192 to 210 sq. ft. of unshaded roof area. Check our <a href="/solar-amc" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Solar AMC &amp; Maintenance</a> services to keep your panels at maximum output.',
    },
  ],
};
