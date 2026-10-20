/**
 * Solar Domain Constants, Subsidy Rules & Financial Calculations
 * Centralized business logic for PM Surya Ghar Muft Bijli Yojana (2026)
 */

export const SOLAR_DATA = {
  // Central Government Subsidy Rules (MNRE PM Surya Ghar 2026)
  subsidy: {
    maxFlatSubsidy: 78000,
    rates: [
      { capacityKw: 1, subsidyAmount: 30000, label: '1 kW System', note: '₹30,000 Direct Benefit Transfer' },
      { capacityKw: 2, subsidyAmount: 60000, label: '2 kW System', note: '₹60,000 Direct Benefit Transfer' },
      { capacityKw: 3, subsidyAmount: 78000, label: '3 kW System', note: '₹78,000 (Maximum Flat Subsidy)' },
      { capacityKw: 4, subsidyAmount: 78000, label: '4 kW to 10 kW', note: '₹78,000 (Flat Maximum Cap)' },
    ],
    getSubsidyForKw: (kw) => {
      if (kw <= 0) return 0;
      if (kw < 2) return 30000;
      if (kw < 3) return 60000;
      return 78000;
    },
  },

  // Tariff & Generation Factors
  benchmarks: {
    averageTariffPerUnit: 7.5, // INR / kWh
    monthlyUnitsPerKw: 125, // 1 kW produces approx 120-135 units/month in Rajasthan
    sqFtPerKw: 65, // shadow-free terrace area required per 1 kW
    billReductionPotential: 0.9, // Up to 90%
    co2KgPerKwh: 0.82,
    lifetimeYears: 25,
  },

  // Pre-configured Subsidy Packages for Savings Hub
  packages: [
    {
      capacity: '3 kW System',
      bestFor: 'Small Homes (Bill ~₹3,000/mo)',
      price: '₹1,95,000',
      subsidy: '₹78,000',
      net: '₹1,17,000',
      units: '~360 Units/mo',
      popular: false,
    },
    {
      capacity: '5 kW System',
      bestFor: 'Standard 2-3 BHK Homes with AC',
      price: '₹2,80,000',
      subsidy: '₹78,000',
      net: '₹2,02,000',
      units: '~600 Units/mo',
      popular: true,
    },
    {
      capacity: '8 kW System',
      bestFor: 'Large Villas & Joint Families',
      price: '₹4,40,000',
      subsidy: '₹78,000',
      net: '₹3,62,000',
      units: '~960 Units/mo',
      popular: false,
    },
    {
      capacity: '10 kW System',
      bestFor: 'Luxury Homes & Commercial Setups',
      price: '₹5,20,000',
      subsidy: '₹78,000',
      net: '₹4,42,000',
      units: '~1,200 Units/mo',
      popular: false,
    },
  ],

  // 4-Step Subsidy & Commissioning Journey
  subsidySteps: [
    {
      step: '01',
      title: 'Free Roof Survey & Application',
      time: 'Day 1–2',
      desc: 'Our team inspects your roof and handles your application on the PM Surya Ghar National Portal.',
    },
    {
      step: '02',
      title: 'DISCOM Feasibility Approval',
      time: 'Day 3–7',
      desc: 'Your local electricity board approves your net-metering connection with zero friction.',
    },
    {
      step: '03',
      title: 'Turnkey Installation',
      time: 'Day 8–12',
      desc: 'Certified engineers mount Tier-1 panels, smart inverters, and synchronization meters in 1–2 days.',
    },
    {
      step: '04',
      title: '₹78,000 DBT in Your Bank',
      time: 'Within 30 Days',
      desc: 'Government transfers the ₹78,000 subsidy directly to your registered bank account via PFMS.',
    },
  ],
};

export const PM_SURYA_GHAR_SUBSIDY_OPTIONS = [
  {
    kw: 1,
    name: '1 kW Compact Solar',
    label: '1 kW Home Solar',
    idealFor: '1-2 Rooms, 1-2 Fans, LED Lights, TV (Bill < ₹1,500)',
    roofArea: '80 - 100 Sq.Ft.',
    unitsPerMonth: '120 - 140 Units',
    grossCost: 62000,
    subsidy: 30000,
    netCost: 32000,
    monthlySavings: 1250,
    loanEmi: 620,
    netMonthlyGain: 630,
    payback: '2.1 Years',
    tag: 'Basic Starter',
    isPopular: false,
  },
  {
    kw: 2,
    name: '2 kW Essential Solar',
    label: '2 kW Home Solar',
    idealFor: '2-3 BHK Home, Refrigerator, Washing Machine, 1 Inverter AC',
    roofArea: '160 - 200 Sq.Ft.',
    unitsPerMonth: '240 - 280 Units',
    grossCost: 122000,
    subsidy: 60000,
    netCost: 62000,
    monthlySavings: 2600,
    loanEmi: 1250,
    netMonthlyGain: 1350,
    payback: '2.0 Years',
    tag: 'High Value',
    isPopular: false,
  },
  {
    kw: 3,
    name: '3 kW Optimum Solar (Most Popular)',
    label: '3 kW Home Solar',
    idealFor: '3-4 BHK Independent Villa, 2 Inverter ACs, Geyser, Water Pump',
    roofArea: '240 - 300 Sq.Ft.',
    unitsPerMonth: '360 - 420 Units',
    grossCost: 178000,
    subsidy: 78000,
    netCost: 100000,
    monthlySavings: 4200,
    loanEmi: 1850,
    netMonthlyGain: 2350,
    payback: '2.0 Years',
    tag: '🔥 82% Choose This (Max Subsidy Cap)',
    isPopular: true,
  },
  {
    kw: 4,
    name: '4 kW Comfort Solar',
    label: '4 kW Home Solar',
    idealFor: 'Large 4 BHK Home, 2-3 ACs, EV 2-Wheeler / 4-Wheeler Charging',
    roofArea: '320 - 400 Sq.Ft.',
    unitsPerMonth: '480 - 550 Units',
    grossCost: 232000,
    subsidy: 78000,
    netCost: 154000,
    monthlySavings: 5600,
    loanEmi: 2850,
    netMonthlyGain: 2750,
    payback: '2.3 Years',
    tag: 'Extended Load',
    isPopular: false,
  },
  {
    kw: 5,
    name: '5 kW Executive Solar',
    label: '5 kW Home Solar',
    idealFor: 'Large Villa / Kothi, 3-4 ACs, Heavy Summer Power Consumption',
    roofArea: '400 - 500 Sq.Ft.',
    unitsPerMonth: '600 - 700 Units',
    grossCost: 282000,
    subsidy: 78000,
    netCost: 204000,
    monthlySavings: 7200,
    loanEmi: 3750,
    netMonthlyGain: 3450,
    payback: '2.4 Years',
    tag: 'Zero Summer Bill',
    isPopular: false,
  },
  {
    kw: 10,
    name: '10 kW Luxury / Joint Family',
    label: '10 kW Solar Villa',
    idealFor: 'Joint Family Bungalow, 5+ ACs, Lift, Multiple EV Charging',
    roofArea: '800 - 1,000 Sq.Ft.',
    unitsPerMonth: '1,200 - 1,400 Units',
    grossCost: 520000,
    subsidy: 78000,
    netCost: 442000,
    monthlySavings: 15500,
    loanEmi: 8100,
    netMonthlyGain: 7400,
    payback: '2.4 Years',
    tag: 'Maximum Capacity',
    isPopular: false,
  },
  {
    kw: 25,
    name: '25 kW Society / RWA Common Meter',
    label: '25 kW RWA / GHS',
    idealFor: 'Apartment Common Area: Lifts, Water Pumps, Common Lighting & EV',
    roofArea: '2,000 - 2,500 Sq.Ft.',
    unitsPerMonth: '3,000 - 3,500 Units',
    grossCost: 1250000,
    subsidy: 450000, // ₹18,000 per kW
    netCost: 800000,
    monthlySavings: 38000,
    loanEmi: 15200,
    netMonthlyGain: 22800,
    payback: '1.8 Years',
    tag: 'RWA / GHS Subsidy (₹18k/kW)',
    isPopular: false,
  },
];

// Master Pricing & Subsidy Lookup Tables for Calculator Engine
export const DCR_PRICING_TABLE = {
  '3KW_1PH': { capacity: 3, name: '3 kW System', price: 195000, subsidy: 78000, net: 117000, phase: '1PH' },
  '4KW_1PH': { capacity: 4, name: '4 kW System', price: 235000, subsidy: 78000, net: 157000, phase: '1PH' },
  '5KW_1PH': { capacity: 5, name: '5 kW System (Single Phase)', price: 280000, subsidy: 78000, net: 202000, phase: '1PH' },
  '5KW_3PH': { capacity: 5, name: '5 kW System (3-Phase)', price: 315000, subsidy: 78000, net: 237000, phase: '3PH' },
  '6KW_1PH': { capacity: 6, name: '6 kW System (Single Phase)', price: 330000, subsidy: 78000, net: 252000, phase: '1PH' },
  '6KW_3PH': { capacity: 6, name: '6 kW System (3-Phase)', price: 355000, subsidy: 78000, net: 277000, phase: '3PH' },
  '8KW_3PH': { capacity: 8, name: '8 kW System (3-Phase)', price: 440000, subsidy: 78000, net: 362000, phase: '3PH' },
  '10KW_3PH': { capacity: 10, name: '10 kW System (3-Phase)', price: 520000, subsidy: 78000, net: 442000, phase: '3PH' },
  '12KW_3PH': { capacity: 12, name: '12 kW System (3-Phase)', price: 620000, subsidy: 78000, net: 542000, phase: '3PH' },
  '15KW_3PH': { capacity: 15, name: '15 kW System (3-Phase)', price: 765000, subsidy: 78000, net: 687000, phase: '3PH' },
  '18KW_3PH': { capacity: 18, name: '18 kW System (3-Phase)', price: 910000, subsidy: 78000, net: 832000, phase: '3PH' },
};

export const NDCR_PRICING_TABLE = {
  '3KW_1PH': { capacity: 3, name: '3 kW System', price: 160000, subsidy: 0, net: 160000, phase: '1PH' },
  '4KW_1PH': { capacity: 4, name: '4 kW System', price: 200000, subsidy: 0, net: 200000, phase: '1PH' },
  '5KW_1PH': { capacity: 5, name: '5 kW System (Single Phase)', price: 235000, subsidy: 0, net: 235000, phase: '1PH' },
  '5KW_3PH': { capacity: 5, name: '5 kW System (3-Phase)', price: 260000, subsidy: 0, net: 260000, phase: '3PH' },
  '6KW_1PH': { capacity: 6, name: '6 kW System (Single Phase)', price: 270000, subsidy: 0, net: 270000, phase: '1PH' },
  '6KW_3PH': { capacity: 6, name: '6 kW System (3-Phase)', price: 305000, subsidy: 0, net: 305000, phase: '3PH' },
  '8KW_3PH': { capacity: 8, name: '8 kW System (3-Phase)', price: 340000, subsidy: 0, net: 340000, phase: '3PH' },
  '10KW_3PH': { capacity: 10, name: '10 kW System (3-Phase)', price: 380000, subsidy: 0, net: 380000, phase: '3PH' },
  '12KW_3PH': { capacity: 12, name: '12 kW System (3-Phase)', price: 450000, subsidy: 0, net: 450000, phase: '3PH' },
  '15KW_3PH': { capacity: 15, name: '15 kW System (3-Phase)', price: 555000, subsidy: 0, net: 555000, phase: '3PH' },
  '18KW_3PH': { capacity: 18, name: '18 kW System (3-Phase)', price: 660000, subsidy: 0, net: 660000, phase: '3PH' },
};

export const KW_TO_SYSTEM_MAP = {
  1: 3, 2: 3, 3: 3, 4: 4, 5: 5, 6: 6, 7: 8, 8: 8, 9: 10, 10: 10, 11: 12, 12: 12, 13: 15, 14: 15, 15: 15, 16: 18, 17: 18, 18: 18,
};

export const WHY_SOLAR_BENEFITS = [
  {
    id: 'bills',
    title: 'Slash Electricity Bills',
    highlight: 'Save Up to 90%',
    description: 'Cut your monthly power bills by up to 90% and run heavy appliances on free daytime solar energy.',
    metric: '₹50k+ / Year Saved',
    accentColor: '#0b7542',
    bgGlow: 'rgba(15, 157, 88, 0.12)',
    iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 'subsidy',
    title: 'Up to ₹78,000 Subsidy',
    highlight: 'PM Surya Ghar',
    description: 'Direct government cash subsidy credited straight to your bank account with complete paperwork handling.',
    metric: 'Direct Bank Transfer',
    accentColor: '#D97706',
    bgGlow: 'rgba(217, 119, 6, 0.12)',
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    id: 'roi',
    title: '25+ Years Free Power',
    highlight: '3-Year Payback',
    description: 'Recover your full investment in ~3 years with 28%+ tax-free returns, followed by decades of free power.',
    metric: '28%+ Tax-Free Return',
    accentColor: '#00BFA6',
    bgGlow: 'rgba(0, 191, 166, 0.12)',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    id: 'maintenance',
    title: 'Low Maintenance',
    highlight: '30+ Years Life',
    description: 'Hail-resistant Tier-1 panels built to last over 30 years, with real-time generation tracking on your phone.',
    metric: '24/7 Mobile App Sync',
    accentColor: '#0b7542',
    bgGlow: 'rgba(15, 157, 88, 0.12)',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
];
