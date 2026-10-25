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
      { name: 'Solar for Homes (₹78k Subsidy)', href: '/residential-solar' },
      { name: 'PM Surya Ghar Muft Bijli Yojana', href: '/pm-surya-ghar-yojana' },
      { name: 'Commercial Rooftop Solar', href: '/commercial-solar' },
      { name: 'Industrial MW-Scale Solar Plants', href: '/industrial-solar' },
      { name: 'Solar Care & AMC Maintenance', href: '/solar-amc' },
      { name: '★ Solar ROI & Subsidy Calculator', href: '/solar-calculator', highlight: true },
    ],
  },
  toolsAndGuides: {
    title: 'Tools & Guides',
    links: [
      { name: 'Subsidy Calculator 2026', href: '/solar-calculator' },
      { name: 'PM Surya Ghar Guide (₹78k)', href: '/pm-surya-ghar-yojana' },
      { name: 'Our Solar Systems', href: '#solutions' },
      { name: 'Customer Reviews', href: '#testimonials' },
      { name: 'Book Free Roof Check', href: '#contact' },
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
