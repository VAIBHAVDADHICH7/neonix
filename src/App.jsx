import { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import ScrollProgress from './components/UI/ScrollProgress';
import CursorGlow from './components/UI/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const KeyBenefits = lazy(() => import('./components/KeyBenefits'));
const RoiCalculator = lazy(() => import('./components/RoiCalculator'));
const BillComparison = lazy(() => import('./components/BillComparison'));
const RooftopFeasibilityQuiz = lazy(() => import('./components/RooftopFeasibilityQuiz'));
const Solutions = lazy(() => import('./components/Solutions'));
const SubsidyInfo = lazy(() => import('./components/SubsidyInfo'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TrustSignals = lazy(() => import('./components/TrustSignals'));
const Contact = lazy(() => import('./components/Contact'));
const ConsultationModal = lazy(() => import('./components/ConsultationModal'));
import MobileActionBar from './components/MobileActionBar';


function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: null,
  });

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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    // Observe any reveal elements already in the DOM
    const observeNew = (root) => {
      root.querySelectorAll(REVEAL_SELECTOR).forEach(el => revealObserver.observe(el));
    };
    observeNew(document);

    // Watch for lazy-loaded sections mounting and observe their reveal elements
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Observe the node itself if it matches
            if (node.matches && node.matches(REVEAL_SELECTOR)) {
              revealObserver.observe(node);
            }
            // Observe any matching descendants
            observeNew(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <HelmetProvider>
      <div className="font-sans antialiased text-[#111827] bg-[#F8FAFC] selection:bg-[#0F9D58] selection:text-white pb-16 md:pb-0 min-h-screen flex flex-col justify-between">
        <Helmet>
          <title>Neonix | Rooftop Solar Panels, Clean & Green Energy Solutions in India</title>
          <meta name="description" content="Switch to clean & green solar energy with Neonix. Expert rooftop solar panel installations for homes and businesses across India. Get up to ₹78,000 PM Surya Ghar subsidy and save 90% on electricity bills." />
        </Helmet>
        
        <ScrollProgress />
        <CursorGlow />
        
        {/* 1. Header (Sticky Minimalist Navigation) */}
        <Navbar onOpenConsultation={() => handleOpenConsultation()} />
        
        <main id="main-content" className="flex-grow">
          {/* 2. Hero Section (with scrollyteller effect) */}
          <Hero onOpenConsultation={() => handleOpenConsultation()} />
          
          <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
            {/* 3. Key Benefits (4 Columns) */}
            <KeyBenefits />
          
          {/* 4. ROI Calculator */}
          <RoiCalculator onDownloadReport={(data) => handleOpenConsultation(data)} />

          {/* 5. Before vs After Electricity Bill Transformation Slider */}
          <BillComparison onGetStarted={() => handleOpenConsultation({ source: 'Bill Comparison' })} />

          {/* 6. Rooftop Feasibility Diagnostic Quiz */}
          <RooftopFeasibilityQuiz onCompleteQuiz={(quizData) => handleOpenConsultation({ quizData })} />
          
          {/* 7. Solutions Overview (with 4-card expanding accordion including AMC) */}
          <Solutions onSelectSolution={(sol) => handleOpenConsultation({ connectionType: sol })} />
          
          {/* 8. Subsidy Information (PM Surya Ghar) */}
          <SubsidyInfo onOpenConsultation={() => handleOpenConsultation()} />
          
          {/* 9. Testimonials */}
          <Testimonials />
          
          {/* 10. Certifications & Trust Signals */}
          <TrustSignals />
          
          {/* 12. Contact Section & Footer */}
          <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          {/* Interactive Consultation & ROI Report Modal */}
          <ConsultationModal 
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            initialData={modalState.initialData}
          />
        </Suspense>

        {/* Minimalist Mobile Quick Action Bar */}
        <MobileActionBar onOpenConsultation={() => handleOpenConsultation()} />
      </div>
    </HelmetProvider>
  );
}

export default App;
