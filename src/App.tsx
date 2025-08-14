import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ScrollToTop from '@/components/ScrollToTop';
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
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import OpenLetter from './pages/OpenLetter';
import AICompanion from './pages/AICompanion';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import Volunteer from './pages/Volunteer';

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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            
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
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/open-letter" element={<OpenLetter />} />
            <Route path="/ai-companion" element={<AICompanion />} />
            <Route path="/press" element={<Press />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/treatment-centers" element={<TreatmentCenters />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;