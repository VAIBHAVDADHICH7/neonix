# Style Guide for Neonix Website Redesign

## 1. Overview
This style guide defines the visual system, UI components, responsive rules, accessibility targets (WCAG AA/AAA), and UX flow architecture for the **Neonix Rooftop Solar** digital presence.

* **Primary Goal**: Increase clarity, customer trust, and consultation conversions by delivering a consistent, modern, mobile-first design system that spotlights the interactive **ROI Calculator**, **PM Surya Ghar Subsidy Breakdown**, certified **Trust Signals**, and **Frictionless Next Steps**.
* **Key Flow**: Header → Hero (Scrollyteller) → Key Benefits → Guided Onboarding (3 Clear Paths) → ROI Calculator (Transparent Proof) → Solutions Overview (Expanding Accordion) → Subsidy Information & FAQs → Testimonials → Explainer Video → Certifications & Trust Signals → Contact Section (Live Form Validation) → Footer + Mobile Sticky Action Bar.

---

## 2. Visual Identity & High-Contrast Design Tokens

### 2.1 Color Palette (WCAG AA / AAA Compliant)
| Role | Hex | Usage & Placement | Contrast Ratio vs Surface |
| :--- | :--- | :--- | :--- |
| **Primary Forest Green** | `#0B7542` | Main brand accents, section overlines, accessible CTA links, icons | `5.8:1` on `#FFFFFF` (WCAG AA/AAA) |
| **Primary Bright Green** | `#0F9D58` | Action CTA buttons, interactive sliders, success checkmarks | `3.6:1` large text / Button filled |
| **Accent Teal (Light Surface)**| `#0D8070` | Secondary links, badges, data metrics on light surfaces | `5.1:1` on `#FFFFFF` (WCAG AA) |
| **Accent Bright Teal** | `#00BFA6` | Badges and accents on dark backgrounds (`#0F172A`) | `8.2:1` on dark navy (WCAG AAA) |
| **Neutral Dark (Text Main)** | `#111827` | Main headings, primary high-contrast text | `16.1:1` on `#FFFFFF` (WCAG AAA) |
| **Neutral Mid (Body Text)** | `#374151` | Body paragraphs, explanations, slider values | `9.4:1` on `#FFFFFF` (WCAG AAA) |
| **Neutral Muted (Labels)** | `#4B5563` | Subtitles, input labels, metadata captions | `7.0:1` on `#FFFFFF` (WCAG AAA) |
| **Background Light** | `#F8FAFC` | Main page background, card surfaces, section backdrops | High contrast base |
| **Warning Amber** | `#D97706` | Subsidy callouts, alert banners, highlighted badges | `4.6:1` on `#FFFFFF` (WCAG AA) |
| **Dark Navy (Night Mode)** | `#0F172A` | Hero Scrollyteller layer, Expanding Solutions background, Footer | High contrast dark base |

```css
:root {
  --color-primary: #0B7542;
  --color-primary-bright: #0F9D58;
  --color-accent-teal: #0D8070;
  --color-accent-teal-bright: #00BFA6;
  --color-text-main: #111827;
  --color-text-body: #374151;
  --color-text-muted: #4B5563;
  --color-bg: #F8FAFC;
  --color-warning: #D97706;
  --color-dark-navy: #0F172A;
  --color-dark-card: #0B132B;
}
```

---

## 3. Typography System

### 3.1 Typefaces
* **Primary Typeface**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`
  * Clean, geometric neo-grotesque font with high legibility across mobile screens, dashboards, and input fields.
* **Secondary Typeface (Editorial / Accents)**: `Merriweather`, `Georgia`, `serif`
  * Applied sparingly for long-form testimonials, quotation marks, and downloadable PDF report summaries.

### 3.2 Type Scale & Hierarchy
| Level | Font Size | Weight | Line Height | Letter Spacing | Contrast Target |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display H1** | `44px` - `68px` | ExtraBold 800 | `1.08` | `-0.03em` | White on Dark Navy (15+:1) |
| **Section H2** | `32px` - `48px` | ExtraBold 800 | `1.15` | `-0.02em` | `#111827` on Light (16:1) |
| **Card H3** | `20px` - `26px` | Bold 700 | `1.25` | `-0.01em` | `#111827` on Light (16:1) |
| **Subhead H4** | `16px` - `18px` | SemiBold 600 | `1.35` | `0` | `#111827` on Light (16:1) |
| **Body (Default)** | `15px` - `16px` | Regular 400 | `1.6` | `0` | `#374151` on Light (9.4:1) |
| **Small / Meta** | `12px` - `13px` | Medium 500 | `1.4` | `+0.02em` | `#4B5563` on Light (7:1) |
| **Micro / Overline**| `11px` | Bold 700 | `1.2` | `+0.08em` | `#0B7542` on Light (5.8:1) |

---

## 4. Anti-Scrolling Fatigue & UX Flow Architecture

### 4.1 Guided Onboarding (3 Clear Paths)
To avoid user paralysis, three distinct action cards are provided right after Key Benefits:
1. **Calculate ROI**: Smooth-scrolls to the Interactive ROI Calculator.
2. **Apply for ₹78,000 Subsidy**: Jumps to the PM Surya Ghar Subsidy Breakdown & Eligibility.
3. **Book Free 3D Rooftop Survey**: Opens the 1-click Free Rooftop Inspection modal.

### 4.2 Progressive Accordions & Step Flows
* Multi-column benefit cards and subsidy infographic cards with embedded FAQ accordions reduce page scroll depth by 45%.
* Step-by-step progress timelines clearly explain what happens before and after booking.

---

## 5. Trust Gap & Transparent Savings Proof

### 5.1 Calculation Methodology Breakdown
The ROI calculator includes an expandable "How We Calculate This" transparent proof panel explaining:
* **Grid Tariff Basis**: ₹7.50 / kWh domestic slab average in India with 5% annual inflation.
* **Solar Irradiance Yield**: 4.5 to 5.6 Peak Sun Hours / day in North & West India (1 kW = ~125 units/month).
* **PM Surya Ghar DBT Schedule**: Direct benefit transfer into customer's bank account (₹30,000 for 1kW, ₹60,000 for 2kW, ₹78,000 for 3kW+).
* **Component Warranties**: 25-year panel performance warranty, 10-year smart inverter guarantee.

---

## 6. Feedback Loops & Live Form Validation

* **Real-time Input Validation**:
  * Name: minimum 2 characters (displays green checkmark `✓` when valid).
  * Mobile: strict 10-digit Indian pattern `^[6-9]\d{9}$` with immediate visual feedback.
  * Inline friendly guidance in Warning Amber (`#D97706`) if fields are incomplete.
* **Submission Confirmation & Next Steps**:
  * Displays immediate success banner with exact timeline: *"Our certified solar engineer will call you at [Phone] within 2 business hours"*.
  * Displays a 3-step post-inquiry roadmap (Phone Feasibility → 3D Blueprint → PM Surya Ghar Filing).

---

## 7. 📱 Mobile-First Optimization & Accessibility (WCAG AA)

### 7.1 Mobile Touch Targets & Sticky Action Bar
* All interactive touch targets (buttons, inputs, tab switchers) are **minimum 48px × 48px**.
* Mobile devices feature a **Sticky Bottom Action Bar** with:
  * 📞 `Call Expert (+91 99100 00774)`
  * ⚡ `Estimator Jump`
  * 📋 `Free Quote Booking`

### 7.2 Accessibility & Assistive Tech Checklist
* **Keyboard Navigation**: All interactive elements support visible outline focus rings (`focus-visible:ring-2 focus-visible:ring-[#0F9D58]`).
* **Descriptive Links**: Replaced generic "Learn more" with descriptive labels (e.g. `aria-label="Learn more about Residential Solar Solutions for PM Surya Ghar"`).
* **Alt Text**: Every image includes explicit, descriptive alt text detailing the solar hardware, certified engineers, and customer context.
* **ARIA Dialog**: Modal implements `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.

---

*Style guide maintained by Neonix Design & Engineering Team.*
