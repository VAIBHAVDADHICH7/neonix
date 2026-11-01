import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsultationModal from './components/ConsultationModal';
import MobileActionBar from './components/MobileActionBar';

// ── Code-split below-fold components to reduce initial JavaScript & TBT ──
const Solutions = lazy(() => import('./components/Solutions'));
const WhySolar = lazy(() => import('./components/WhySolar'));
const CalculatorTeaser = lazy(() => import('./components/CalculatorTeaser'));
const SavingsHub = lazy(() => import('./components/SavingsHub'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TrustSignals = lazy(() => import('./components/TrustSignals'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const RelatedLinksNetwork = lazy(() => import('./components/RelatedLinksNetwork'));

// Desktop & Tablet visual enhancements (never loaded on mobile)
const ScrollProgress = lazy(() => import('./components/UI/ScrollProgress'));
const CursorGlow = lazy(() => import('./components/UI/CursorGlow'));

const isDesktopOrTablet = typeof window !== 'undefined' && window.innerWidth >= 768;
const isDesktop = isDesktopOrTablet;

function App() {
  // Desktop and tablet preserve the consultation form overlay on initial load; mobile (<768px) stays clean for Core Web Vitals
  const [modalState, setModalState] = useState({
    isOpen: isDesktopOrTablet,
    initialData: null,
  });

  // Defer below-the-fold chunks until after initial LCP render (on scroll, touch, or idle)
  const [loadBelowFold, setLoadBelowFold] = useState(false);

  useEffect(() => {
    const triggerLoad = () => {
      setLoadBelowFold(true);
      window.removeEventListener('scroll', triggerLoad);
      window.removeEventListener('touchstart', triggerLoad);
      window.removeEventListener('mousemove', triggerLoad);
    };

    window.addEventListener('scroll', triggerLoad, { passive: true, once: true });
    window.addEventListener('touchstart', triggerLoad, { passive: true, once: true });
    window.addEventListener('mousemove', triggerLoad, { passive: true, once: true });

    const timer = setTimeout(() => setLoadBelowFold(true), 1500);

    return () => {
      window.removeEventListener('scroll', triggerLoad);
      window.removeEventListener('touchstart', triggerLoad);
      window.removeEventListener('mousemove', triggerLoad);
      clearTimeout(timer);
    };
  }, []);

  const handleOpenConsultation = (initialData = null) => {
    setModalState({
      isOpen: true,
      initialData,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      initialData: null,
    });
  };

  useEffect(() => {
    const REVEAL_SELECTOR = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale';

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    const observeNew = (root) => {
      root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => revealObserver.observe(el));
    };
    observeNew(document);

    // Watch for lazy-loaded sections mounting and observe their reveal elements
    const mainContent = document.getElementById('main-content') || document.body;
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches(REVEAL_SELECTOR)) {
              revealObserver.observe(node);
            }
            observeNew(node);
          }
        });
      });
    });

    mutationObserver.observe(mainContent, { childList: true, subtree: true });

    // Smooth scrolling via Lenis — only load on desktop where CPU & battery allow it
    let lenisInstance = null;
    if (isDesktop) {
      import('lenis').then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
        });
        window.__lenis = lenisInstance;

        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      });
    }

    return () => {
      if (window.__lenis) {
        delete window.__lenis;
        lenisInstance?.destroy();
      }
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Sync Lenis state with modal open/close
  useEffect(() => {
    if (window.__lenis) {
      if (modalState.isOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [modalState.isOpen]);

  return (
    <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#0F9D58] selection:text-white pb-16 md:pb-0 min-h-screen flex flex-col justify-between">
      {/* Desktop & Tablet effects */}
      {isDesktopOrTablet && (
        <Suspense fallback={null}>
          <ScrollProgress />
          <CursorGlow />
        </Suspense>
      )}

      {/* 1. Header (Sticky Minimalist Navigation) */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main id="main-content" className="flex-grow">
        {/* Hero Section & Landing Proposal Form */}
        <Hero 
          onOpenConsultation={() => handleOpenConsultation()} 
          onScrollToCalculator={() => {
            const el = document.getElementById('savings-hub') || document.getElementById('roi-calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Below-the-fold content deferred until after initial LCP paint (on scroll, touch, or idle) */}
        {loadBelowFold && (
          <Suspense fallback={null}>
            {/* Step 1 of 4: What do you offer? */}
            <Solutions onSelectSolution={(sol) => handleOpenConsultation({ connectionType: sol })} />

            {/* Why Solar: Top 10 High-Impact Benefits */}
            <WhySolar />

            {/* Interactive Solar ROI Teaser Widget Linking to /solar-calculator */}
            <CalculatorTeaser />

            {/* Step 2 of 4: How much can I save? (Consolidated Hub: Bill Slider + Govt Subsidy + Roof Quiz) */}
            <SavingsHub onOpenConsultation={handleOpenConsultation} />

            {/* Step 3 of 4: Can I trust you? */}
            <TrustSignals />
            <Testimonials />

            {/* Step 4 of 4: How do I contact you? */}
            <FAQ onOpenConsultation={() => handleOpenConsultation()} />
            <RelatedLinksNetwork currentSlug="home" />
            <Contact />
          </Suspense>
        )}
      </main>

      {/* Interactive Consultation & ROI Report Modal */}
      {modalState.isOpen && (
        <ConsultationModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          initialData={modalState.initialData}
        />
      )}

      {/* Minimalist Mobile Quick Action Bar */}
      <MobileActionBar onOpenConsultation={() => handleOpenConsultation()} />
    </div>
  );
}

export default App;
