import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ScrollProgress from './components/UI/ScrollProgress';
import CursorGlow from './components/UI/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsultationModal from './components/ConsultationModal';
import KeyBenefits from './components/KeyBenefits';
import CalculatorTeaser from './components/CalculatorTeaser';
import BillComparison from './components/BillComparison';
import RooftopFeasibilityQuiz from './components/RooftopFeasibilityQuiz';
import Solutions from './components/Solutions';
import SubsidyInfo from './components/SubsidyInfo';
import Testimonials from './components/Testimonials';
import TrustSignals from './components/TrustSignals';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import MobileActionBar from './components/MobileActionBar';


function App() {
  const [modalState, setModalState] = useState({
    isOpen: true,
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
    window.__lenis = lenis;

    // If modal is open on initial load, pause Lenis wheel interception immediately
    if (modalState.isOpen) {
      lenis.stop();
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      delete window.__lenis;
      lenis.destroy();
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
      <ScrollProgress />
      <CursorGlow />
      
      {/* 1. Header (Sticky Minimalist Navigation) */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />
      
      <main id="main-content" className="flex-grow">
        {/* 2. Hero Section (with scrollyteller effect) */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />
        
        {/* 3. Key Benefits (4 Columns) */}
        <KeyBenefits />
      
        {/* 4. ROI Calculator Launch Teaser */}
        <CalculatorTeaser />

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
        
        {/* 11. Frequently Asked Questions (FAQ) */}
        <FAQ onOpenConsultation={() => handleOpenConsultation()} />
        
        {/* 12. Contact Section & Footer */}
        <Contact />
      </main>

      {/* Interactive Consultation & ROI Report Modal */}
      <ConsultationModal 
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialData={modalState.initialData}
      />

      {/* Minimalist Mobile Quick Action Bar */}
      <MobileActionBar onOpenConsultation={() => handleOpenConsultation()} />
    </div>
  );
}

export default App;
