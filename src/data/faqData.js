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
        'RCC flat roofs, metal sheds, and tiled roofs are all suitable for solar installation. We require approximately 65–80 sq. ft. of shadow-free rooftop space per 1 kW of solar capacity. Our engineers conduct a 3D shadow analysis before every installation to guarantee optimal tilt angle and maximum daily generation.',
    },
    {
      id: 'timeline',
      question: 'How long does the installation and net metering approval process take?',
      answer:
        'Physical rooftop installation typically completes within 3 to 5 days. State electricity board (DISCOM) net-meter inspection and grid synchronization generally takes 2 to 4 weeks depending on your local circle. Neonix end-to-end manages all inspections and documentation.',
    },
  ],

  calculator: [
    {
      q: 'How is my recommended solar system capacity calculated?',
      a: 'The calculator estimates your monthly electricity consumption in kWh (units) by dividing your average monthly electricity bill by standard grid tariff rates. In high-sunlight regions like Rajasthan, 1 kW of rooftop solar generates approximately 120–135 units per month. We then match your monthly consumption to the exact kW system needed to eliminate up to 90% of your grid bill.',
    },
    {
      q: 'What is the PM Surya Ghar subsidy amount for residential solar?',
      a: 'Under the PM Surya Ghar Muft Bijli Yojana (2026), residential consumers in India receive: ₹30,000 subsidy for 1 kW systems, ₹60,000 subsidy for 2 kW systems, and a maximum flat subsidy of ₹78,000 for 3 kW and larger systems. The subsidy is credited directly to your bank account via Direct Benefit Transfer (DBT) within 30 days after net meter installation.',
    },
    {
      q: 'What is the difference between DCR and Non-DCR solar panels?',
      a: 'DCR (Domestic Content Requirement) panels are manufactured entirely in India using domestically produced solar cells and modules. DCR panels are strictly mandatory to qualify for the central government PM Surya Ghar subsidy. Non-DCR panels use high-efficiency imported cells (e.g. N-Type TOPCon) and offer lower upfront pricing for commercial, industrial, or institutional installations where accelerated depreciation benefits apply instead of residential subsidies.',
    },
    {
      q: 'When should I choose Single-Phase (1PH) vs Three-Phase (3PH)?',
      a: 'Single-phase connections are standard for smaller residential homes with sanctioned loads up to 4 kW – 5 kW running standard home appliances. Three-phase connections are required for systems larger than 5 kW, commercial buildings, agricultural connections, or homes operating multiple heavy appliances (central ACs, commercial machinery, heat pumps).',
    },
    {
      q: 'How does Net Metering work in Rajasthan?',
      a: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. During daytime peak hours, your solar panels power your home and export surplus power to your DISCOM (JVVNL, AVVNL, JdVVNL). At night, you draw power from the grid. At the end of the billing cycle, you are only billed for the "net" difference.',
    },
    {
      q: 'How much shadow-free roof area is required for installation?',
      a: 'Each 1 kW of rooftop solar requires approximately 64 to 70 sq. ft. of clean, shadow-free rooftop space. For example, a 3 kW system (consisting of 6 high-efficiency 550W panels) needs about 192 to 210 sq. ft. of unshaded roof area.',
    },
  ],
};
