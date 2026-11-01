/**
 * Frequently Asked Questions
 * Categorized FAQ database for Homepage, Calculator, and Service Pages
 * Differentiated by search intent: Local Brand + EPC Authority for Home, Tool/Pricing for Calculator
 */

export const FAQS = {
  home: [
    {
      id: 'why-neonix',
      question: 'Why choose Neonix as your rooftop solar EPC company in Jaipur & Rajasthan?',
      answer:
        'Neonix Infra Solutions is a premier rooftop solar EPC contractor headquartered in Jaipur. We deliver end-to-end solar engineering—from precision 3D shadow analysis and IIT-grade elevated structural engineering to complete JVVNL net metering approvals and 25-year performance warranties. Our in-house certified engineering team guarantees zero roof leakage and top-tier power generation across Jaipur, Kota, Jodhpur, Udaipur, and all of Rajasthan.',
    },
    {
      id: 'services',
      question: 'What solar EPC services does Neonix provide across Rajasthan?',
      answer:
        'We engineer turnkey solar solutions across all scales: <a href="/residential-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Residential Rooftop Solar (1kW–10kW)</a> for villas and homes, <a href="/commercial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Commercial Rooftop Solar</a> with 40% accelerated tax depreciation, <a href="/industrial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Industrial MW-Scale Solar Plants</a> for factories, and <a href="/solar-amc" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Solar Care &amp; AMC Maintenance Contracts</a>.',
    },
    {
      id: 'jvvnl-net-metering',
      question: 'How does Neonix manage the JVVNL net metering process in Jaipur?',
      answer:
        'As an empanelled solar EPC in Rajasthan, Neonix handles 100% of the DISCOM workflow with <a href="https://energy.rajasthan.gov.in/jvvnl" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">JVVNL (Jaipur Vidyut Vitran Nigam Ltd) ↗</a>. We conduct distribution transformer feasibility checks, submit official sanction applications, supervise bi-directional net-meter installation, and ensure timely grid synchronization without customer hassles.',
    },
    {
      id: 'warranty',
      question: 'What warranties and performance guarantees does Neonix offer?',
      answer:
        'All Neonix rooftop installations feature Tier-1 TopCon and Mono PERC solar panels backed by a 25 to 30-year linear performance warranty under <a href="https://mnre.gov.in/" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">MNRE ALMM guidelines ↗</a>, 5 to 10-year smart inverter warranties, a 5-year water-tight roof guarantee, and our exclusive generation guarantee with cash deficit compensation.',
    },
    {
      id: 'subsidy-support',
      question: 'Does Neonix assist residential homeowners with PM Surya Ghar subsidies?',
      answer:
        'Yes. For residential customers, Neonix manages complete documentation and portal liaison to secure direct DBT subsidies of up to ₹78,000 deposited straight into your bank account. For an in-depth breakdown of eligibility, subsidy slabs, and Discom paperwork, read our dedicated <a href="/pm-surya-ghar-yojana" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">PM Surya Ghar Rajasthan Scheme Guide</a>.',
    },
  ],

  calculator: [
    {
      q: 'How is my recommended solar system capacity (kW) calculated?',
      a: 'The calculator estimates your monthly electricity consumption in kWh (units) by dividing your average monthly bill by standard DISCOM tariff slab rates. In high-sunlight regions like Rajasthan, 1 kW of rooftop solar generates approximately 120–135 units per month. We size the exact kW system needed to eliminate up to 90% of your bill. Explore our <a href="/residential-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Residential Solar Solutions (1kW–10kW)</a> or <a href="/commercial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Commercial Solar Packages</a>.',
    },
    {
      q: 'How does the calculator determine system costs, net savings, and ROI payback?',
      a: 'The tool uses current market turnkey installation rates (Tier-1 TopCon / Mono PERC modules, on-grid smart inverters, and galvanized structures) minus applicable central DBT subsidies (up to ₹78,000 under PM Surya Ghar). Payback period is computed by dividing net investment by your annual power bill savings. For official government scheme rules, see our <a href="/pm-surya-ghar-yojana" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">PM Surya Ghar Rajasthan Guide</a>.',
    },
    {
      q: 'What is the difference between DCR and Non-DCR solar panels?',
      a: 'DCR (Domestic Content Requirement) panels are manufactured entirely in India using domestically produced solar cells and modules, mandated by <a href="https://mnre.gov.in/" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] font-bold underline hover:text-[#0369a1]">MNRE ↗</a> to qualify for residential PM Surya Ghar subsidies. Non-DCR panels use high-efficiency imported cells (e.g. N-Type TOPCon) offering lower upfront capital cost for <a href="/commercial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Commercial</a> and <a href="/industrial-solar" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Industrial</a> plants claiming 40% accelerated depreciation tax savings.',
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
      a: 'Each 1 kW of rooftop solar requires approximately 64 to 70 sq. ft. of clean, shadow-free rooftop space. For example, a 3 kW system needs about 192 to 210 sq. ft. of unshaded roof area. Check our <a href="/solar-amc" class="text-[#0F9D58] font-bold underline hover:text-[#0b7542]">Solar Care &amp; AMC Maintenance</a> services to keep your panels at maximum output.',
    },
  ],
};
