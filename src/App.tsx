import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { TooltipProvider } from '@/components/ui/tooltip';
import ScrollToTop from '@/components/ScrollToTop';
import GTMPageView from '@/components/GTMPageView';
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
import TagPage from './pages/TagPage';

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

        // Add click-outside-to-close functionality after Delphi loads
        setTimeout(() => {
          // Add click-outside-to-close that triggers Delphi's built-in close
          document.addEventListener('click', (e) => {
            const trigger = document.getElementById('delphi-bubble-trigger');
            const container = document.getElementById('delphi-bubble-container');
            
            if (trigger && container && trigger.getAttribute('data-is-open') === 'true') {
              const target = e.target as HTMLElement;
              // Close if clicking outside the container and trigger button
              if (!container.contains(target) && !trigger.contains(target)) {
                console.log('Clicking outside - closing Delphi popup');
                trigger.click(); // This triggers Delphi's built-in close
              }
            }
          });
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
          <GTMPageView />
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
            <Route path="/tag/:slug" element={<TagPage />} />
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
            <Route path="/GeniusRebels" element={<Navigate to="/donation" replace />} />
            <Route path="/GRQR" element={<Navigate to="/" replace />} />
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