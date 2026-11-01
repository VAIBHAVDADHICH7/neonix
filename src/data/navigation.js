/**
 * Navigation Configuration
 * Single Source of Truth for header, mobile drawer, and footer links
 */

import { SERVICES } from './servicesData';
import { SITE_CONFIG } from './siteConfig';

export const HEADER_NAV_LINKS = [
  { name: 'PM Surya Ghar (₹78k)', href: '/pm-surya-ghar-yojana', isSpecial: true },
  { name: 'Why Solar', href: '#why-solar' },
  { name: 'Savings & Subsidy', href: '#savings-hub' },
  { name: 'Trust & Reviews', href: '#trust-signals' },
  { name: 'FAQs', href: '#faq' },
  { name: 'Contact', href: '#contact' },
  { name: 'ROI Calculator ↗', href: '/solar-calculator' },
];

export const SERVICES_DROPDOWN_LIST = SERVICES.map((service) => ({
  id: service.id,
  name: service.name,
  href: service.href,
  badge: service.badge,
  icon: service.icon,
  desc: service.desc,
}));

export const FOOTER_SECTIONS = {
  services: {
    title: 'Our Solar Solutions',
    links: [
      { name: 'Residential Solar (1kW–10kW)', href: '/residential-solar' },
      { name: 'PM Surya Ghar Rajasthan Guide', href: '/pm-surya-ghar-yojana' },
      { name: 'Commercial Rooftop Solar', href: '/commercial-solar' },
      { name: 'Industrial MW-Scale Solar Plants', href: '/industrial-solar' },
      { name: 'Solar Care & AMC Maintenance', href: '/solar-amc' },
      { name: '★ Solar Cost & ROI Calculator', href: '/solar-calculator', highlight: true },
    ],
  },
  toolsAndGuides: {
    title: 'Tools & Navigation',
    links: [
      { name: 'Solar Cost & ROI Calculator', href: '/solar-calculator' },
      { name: 'PM Surya Ghar Rajasthan Guide', href: '/pm-surya-ghar-yojana' },
      { name: 'Our Solar Systems', href: '/#solutions' },
      { name: 'Why Solar (10 Key Benefits)', href: '/#why-solar' },
      { name: 'Customer Reviews & Projects', href: '/#testimonials' },
      { name: 'Solar FAQs & Net Metering', href: '/#faq' },
      { name: 'Book Free Roof Check', href: '/#contact' },
    ],
  },
  governmentPortals: {
    title: 'Govt. & Official Resources',
    links: [
      { name: 'PM Surya Ghar National Portal ↗', href: 'https://pmsuryaghar.gov.in/', external: true },
      { name: 'Ministry of New & Renewable Energy (MNRE) ↗', href: 'https://mnre.gov.in/', external: true },
      { name: 'Jan Samarth 7% Solar Loans ↗', href: 'https://www.jansamarth.in/', external: true },
      { name: 'JVVNL Net Metering Portal ↗', href: 'https://energy.rajasthan.gov.in/jvvnl', external: true },
      { name: 'Bureau of Energy Efficiency (BEE) ↗', href: 'https://beeindia.gov.in/', external: true },
      { name: 'Income Tax 40% Solar Depreciation ↗', href: 'https://incometaxindia.gov.in/', external: true },
      { name: 'Find Us on Google Maps ↗', href: 'https://maps.google.com/?q=54A,+Jyoti+Vihar,+Manyawas,+Mansarovar,+Jaipur,+Rajasthan+302020', external: true },
    ],
  },
  legal: {
    title: 'Helpful Info & Policies',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Warranty & Cancellation Terms', href: '/privacy-policy#warranty' },
      { name: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
  helpline: {
    title: 'Helpline & Office',
    phone1: SITE_CONFIG.contact.primaryPhone,
    phone2: SITE_CONFIG.contact.secondaryPhone,
    email: SITE_CONFIG.contact.primaryEmail,
    address: SITE_CONFIG.address.fullFormatted,
  },
};
