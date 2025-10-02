import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { TooltipProvider } from '@/components/ui/tooltip';
import ScrollToTop from '@/components/ScrollToTop';
import { useEffect } from 'react';
import Index from './pages/Index';
import About from './pages/About';
import Support from './pages/Support';
import CrisisSupport from './pages/CrisisSupport';
import Donors from './pages/Donors';
import Donation from './pages/Donation';
import Resources from './pages/Resources';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import Emergency from './pages/Emergency';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Shop from './pages/Shop';
import Press from './pages/Press';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import TreatmentCenters from './pages/TreatmentCenters';
import SupportGroups from './pages/SupportGroups';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import OpenLetter from './pages/OpenLetter';
import AICompanion from './pages/AICompanion';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import Volunteer from './pages/Volunteer';
import BookDownload from './pages/BookDownload';
import BookDownloadConfirmation from './pages/BookDownloadConfirmation';
import Education from './pages/Education';
import FamilySupport from './pages/FamilySupport';
import RecoveryTools from './pages/RecoveryTools';
import Speakers from './pages/Speakers';
import RecoveryQuiz from './pages/RecoveryQuiz';
import RecoveryGame from './pages/RecoveryGame';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  console.log('App.tsx: Rendering App component');
  
  useEffect(() => {
    // Add Delphi custom styles
    const style = document.createElement('style');
    style.textContent = `
      .grecaptcha-badge { 
        visibility: hidden; 
      }
      
      #delphi-bubble-trigger {
        width: 111px !important;
        height: 111px !important;
        position: relative !important;
        background: 0 0 / 100% no-repeat, #FF6A27 !important;
        border: 5px solid #FF6A27 !important;
      }

      #delphi-bubble-trigger[data-is-open="false"] {
        background-color: #000 !important;
      }

      #delphi-bubble-trigger::after {
        content: "GET\\AHELP" !important;
        position: absolute;
        color: #fff !important;
        font-weight: 800 !important;
        text-align: center !important;
        line-height: 1.1em !important;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2em !important;
        white-space: pre !important;
      }

      /* Close button for Delphi popup */
      #delphi-close-button {
        position: fixed;
        bottom: 140px;
        right: 24px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FF6A27;
        border: 2px solid #fff;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }

      #delphi-close-button:hover {
        background: #000;
        transform: scale(1.1);
      }

      #delphi-close-button.show {
        display: flex;
      }
    `;
    document.head.appendChild(style);

    // Configure Delphi
    (window as any).delphi = {...((window as any).delphi ?? {}) };
    (window as any).delphi.bubble = {
      config: "c061c0ab-f09a-49fa-aa95-d00e7e4dcdf5",
      trigger: {
        color: "#FF6A27",
      },
    };

    // Create config script tag
    const configScript = document.createElement('script');
    configScript.id = 'delphi-bubble-script';
    document.head.appendChild(configScript);

    // Load Delphi widget
    const loadDelphi = () => {
      const r = window;
      const a = document;
      
      if (!(r as any).delphi || (typeof (r as any).delphi?.bubble === "undefined" && typeof (r as any).delphi?.page === "undefined")) {
        console.error("Invalid or missing delphi object");
        return;
      }
      
      if ((r as any).delphi.bubble && !a.getElementById("delphi-bubble-container")) {
        const script = a.createElement("script");
        script.src = "https://embed.delphi.ai/widget.js";
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        if ((r as any)?.delphi?.bubble?.config) {
          script.setAttribute("data-config", (r as any).delphi.bubble.config);
        }
        const configEl = a.getElementById("delphi-bubble-script");
        if (configEl && configEl.parentNode) {
          configEl.parentNode.insertBefore(script, configEl);
        }

        // Add close button after Delphi loads
        setTimeout(() => {
          if (!document.getElementById('delphi-close-button')) {
            const closeButton = document.createElement('button');
            closeButton.id = 'delphi-close-button';
            closeButton.innerHTML = '×';
            closeButton.setAttribute('aria-label', 'Close help popup');
            closeButton.addEventListener('click', () => {
              const trigger = document.getElementById('delphi-bubble-trigger') as HTMLElement;
              if (trigger) {
                trigger.click();
              }
            });
            document.body.appendChild(closeButton);

            // Watch for changes to the trigger's data-is-open attribute
            const observer = new MutationObserver(() => {
              const trigger = document.getElementById('delphi-bubble-trigger');
              if (trigger) {
                const isOpen = trigger.getAttribute('data-is-open') === 'true';
                if (isOpen) {
                  closeButton.classList.add('show');
                } else {
                  closeButton.classList.remove('show');
                }
              }
            });

            // Start observing the trigger button
            const triggerToObserve = document.getElementById('delphi-bubble-trigger');
            if (triggerToObserve) {
              observer.observe(triggerToObserve, {
                attributes: true,
                attributeFilter: ['data-is-open']
              });
            }
          }
        }, 1000);
      }
    };

    if (document.readyState === "complete") {
      loadDelphi();
    } else {
      window.addEventListener("load", loadDelphi);
      return () => window.removeEventListener("load", loadDelphi);
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <ShadcnToaster />
          <ExitIntentPopup />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/crisis-support" element={<CrisisSupport />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/help" element={<Emergency />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/page/:pageNumber" element={<Blog />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/open-letter" element={<OpenLetter />} />
            <Route path="/ai-companion" element={<AICompanion />} />
            <Route path="/press" element={<Press />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/treatment-centers" element={<TreatmentCenters />} />
            <Route path="/support-groups" element={<SupportGroups />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/education" element={<Education />} />
            <Route path="/family-support" element={<FamilySupport />} />
            <Route path="/recovery-tools" element={<RecoveryTools />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/recovery-quiz" element={<RecoveryQuiz />} />
            <Route path="/addiction-recovery-book" element={<BookDownload />} />
            <Route path="/addiction-recovery-book-download" element={<BookDownloadConfirmation />} />
            <Route path="/recovery-game" element={<RecoveryGame />} />
            <Route path="/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;