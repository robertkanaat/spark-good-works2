import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-primary/10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our services.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Last Updated: January 2025
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white dark:bg-card rounded-lg shadow-sm border p-8 md:p-12">
              
              <h2 className="text-2xl font-bold mb-6 text-primary">Agreement to Terms</h2>
              <p className="mb-8">
                By accessing and using the Genius Recovery website and services, you accept and agree to be 
                bound by the terms and provision of this agreement. If you do not agree to abide by the 
                above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="mb-8">
                Genius Recovery is dedicated to changing the global conversation around addiction from one 
                of judgment to one of compassion. We provide 24/7 AI-powered recovery support and connect 
                people to life-saving resources. Our services are provided as a 501(c)(3) nonprofit organization.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Use of Our Services</h2>
              
              <h3 className="text-xl font-semibold mb-4">Eligibility</h3>
              <p className="mb-6">
                Our services are available to individuals who are:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>18 years of age or older</li>
                <li>Seeking recovery support or supporting someone in recovery</li>
                <li>Able to understand and agree to these terms</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Acceptable Use</h3>
              <p className="mb-6">
                You agree to use our services only for lawful purposes and in a way that does not infringe 
                the rights of, restrict or inhibit anyone else's use and enjoyment of the services. You may not:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share false or misleading information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services to spam or distribute malware</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">Recovery Support Services</h2>
              
              <h3 className="text-xl font-semibold mb-4">Nature of Services</h3>
              <p className="mb-6">
                Our recovery support services include:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>24/7 AI-powered recovery support and guidance</li>
                <li>Educational resources about addiction and recovery</li>
                <li>Connection to treatment centers and support groups</li>
                <li>Crisis intervention and emergency resources</li>
                <li>Caregiver and family support resources</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Not Medical Advice</h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
                <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  IMPORTANT DISCLAIMER:
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Our services are NOT a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of qualified healthcare providers with any questions you may have 
                  regarding addiction or mental health conditions. Never disregard professional medical 
                  advice or delay seeking it because of something you have read on our website.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4">Emergency Situations</h3>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRISIS SUPPORT:
                </p>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  If you are in immediate danger or having thoughts of self-harm, please contact emergency 
                  services immediately:
                </p>
                <ul className="list-disc pl-6 text-red-700 dark:text-red-300 space-y-1">
                  <li>Call 911 for immediate emergency assistance</li>
                  <li>Call 988 for the Suicide & Crisis Lifeline</li>
                  <li>Call 1-800-662-4357 for SAMHSA's National Helpline</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-primary">Donations and Payments</h2>
              <p className="mb-6">
                Donations to Genius Recovery are processed securely through third-party payment processors. 
                All donations are:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Voluntary contributions to support our mission</li>
                <li>Tax-deductible to the extent allowed by law</li>
                <li>Non-refundable unless required by law</li>
                <li>Used to support recovery programs and services</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">Privacy and Data Protection</h2>
              <p className="mb-8">
                Your privacy is important to us. Please review our Privacy Policy to understand how we 
                collect, use, and protect your personal information. By using our services, you consent 
                to the collection and use of information as described in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Intellectual Property</h2>
              <p className="mb-6">
                All content on our website, including text, graphics, logos, images, and software, is the 
                property of Genius Recovery or its content suppliers and is protected by copyright and 
                other intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Reproduce, distribute, or modify our content without permission</li>
                <li>Use our trademarks or logos without authorization</li>
                <li>Create derivative works based on our content</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">Limitation of Liability</h2>
              <p className="mb-8">
                To the fullest extent permitted by law, Genius Recovery shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, or any loss of profits 
                or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, 
                or other intangible losses resulting from your use of our services.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Indemnification</h2>
              <p className="mb-8">
                You agree to defend, indemnify, and hold harmless Genius Recovery and its officers, directors, 
                employees, and agents from any claims, liabilities, damages, losses, and expenses arising 
                from your use of our services or violation of these terms.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Termination</h2>
              <p className="mb-8">
                We may terminate or suspend your access to our services immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if you breach these terms.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Governing Law</h2>
              <p className="mb-8">
                These terms shall be interpreted and governed by the laws of the United States, without 
                regard to conflict of law provisions. Any disputes arising from these terms or your use 
                of our services shall be resolved in the appropriate courts.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Changes to Terms</h2>
              <p className="mb-8">
                We reserve the right to modify or replace these terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Contact Information</h2>
              <p className="mb-6">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg mb-8">
                <p className="font-semibold mb-2">Genius Recovery</p>
                <p>Email: legal@geniusrecovery.org</p>
                <p>For general inquiries: info@geniusrecovery.org</p>
              </div>

              <div className="border-t pt-8 mt-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Link 
                    to="/privacy-policy" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    ← Privacy Policy
                  </Link>
                  <Link 
                    to="/" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Return to Home →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;