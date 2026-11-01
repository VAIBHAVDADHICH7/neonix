/**
 * Site Configuration & Company Identity
 * Single Source of Truth (SSOT) for Neonix Infra Solutions
 */

export const SITE_CONFIG = {
  name: 'Neonix',
  legalName: 'Neonix Infra Solutions LLP',
  tagline: 'Clean & Green Energy Solutions in India',
  description:
    'Certified rooftop solar installation company in India specializing in residential, commercial, and industrial clean green energy systems under PM Surya Ghar Muft Bijli Yojana.',
  url: 'https://www.neonixinfra.in',
  logo: '/images/logo.svg',
  favicon: '/favicon.ico',
  ogImage: '/images/1.webp',

  // Contact Information
  contact: {
    phones: [
      { raw: '+919910000774', display: '+91 99100 00774', label: 'Primary Helpline' },
      { raw: '+919088688899', display: '+91 90886 88899', label: 'Support & Consultations' },
    ],
    primaryPhone: '+91 99100 00774',
    primaryPhoneRaw: '+919910000774',
    secondaryPhone: '+91 90886 88899',
    secondaryPhoneRaw: '+919088688899',
    emails: [
      { address: 'contact@neonixinfra.in', label: 'Primary Inquiries & Support' },
    ],
    primaryEmail: 'contact@neonixinfra.in',
    supportEmail: 'contact@neonixinfra.in',
    workingHours: 'Mon–Sat: 9:00 AM – 7:00 PM IST',
  },

  // Physical Location & Geo
  address: {
    street: '54A, Jyoti Vihar, Manyawas, Mansarovar',
    locality: 'Manyawas, Mansarovar',
    city: 'Jaipur',
    state: 'Rajasthan',
    stateCode: 'RJ',
    pincode: '302020',
    country: 'India',
    countryCode: 'IN',
    fullFormatted: '54A, Jyoti Vihar, Manyawas, Mansarovar, Jaipur, Rajasthan 302020',
    geo: {
      latitude: '26.8520',
      longitude: '75.7600',
    },
  },

  // Social Links
  social: {
    instagram: 'https://www.instagram.com/neonix_infra/',
    linkedin: 'https://www.linkedin.com/in/neonix-infra-solutions-a4a6b3416/',
    facebook: 'https://www.facebook.com/profile.php?id=61590804090394',
    twitter: '@neonix_infra',
  },

  // Trust Statistics & Ratings
  stats: {
    rooftopsInstalled: '500+',
    ratingValue: '4.9',
    ratingCount: '148',
    customerSavings: '₹3.5 Cr+',
    subsidySuccessRate: '100%',
    warrantyYears: '25–30 Years',
    maxSubsidyAmount: '₹78,000',
    co2OffsetTonnes: '2,400+',
  },

  // DISCOMs & Regulatory
  discoms: ['JVVNL', 'AVVNL', 'JdVVNL', 'Tata Power', 'BSES', 'DHBVN', 'UPPCL'],
};
