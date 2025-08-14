import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-primary/10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              
              <h2 className="text-2xl font-bold mb-6 text-primary">Introduction</h2>
              <p className="mb-6">
                Thank you for visiting Genius Recovery. We understand the importance that internet users place on privacy, 
                and this Privacy Policy describes how we use personal information that is collected through our website 
                and services related to addiction recovery support.
              </p>

              <p className="mb-8">
                By using this website, you accept the privacy practices contained in this Privacy Policy. These privacy 
                practices may change from time to time, but any changes will be posted. You are encouraged to review 
                the Privacy Policy whenever you visit the website to make sure you understand how any personal information 
                you provide will be used.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-4">Personally Identifiable Information</h3>
              <p className="mb-6">
                We may collect personally identifiable information when you voluntarily submit it, such as when you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Request information about our recovery support services</li>
                <li>Subscribe to our mailing lists or newsletters</li>
                <li>Make a donation to support our mission</li>
                <li>Register for our recovery support programs</li>
                <li>Contact us through our contact forms</li>
              </ul>
              
              <p className="mb-8">
                This information may include your name, email address, phone number, mailing address, and payment 
                information when making donations. We collect this information to provide you with the services 
                you request and to communicate with you about our programs.
              </p>

              <h3 className="text-xl font-semibold mb-4">Non-Personally Identifiable Information</h3>
              <p className="mb-6">
                We may collect various types of non-personally identifiable information to help us improve your 
                experience and measure site activity. This may include:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>General geographic location</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">How We Use Your Information</h2>
              <p className="mb-6">
                We will only use your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>To deliver the recovery support services you have requested</li>
                <li>To process donations and provide receipts</li>
                <li>To send you information about our programs and services</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">Information Sharing</h2>
              <p className="mb-6">
                We will NEVER share your personally identifiable information with third parties unless:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>You have given us explicit permission to do so</li>
                <li>It is necessary to fulfill a service you have requested</li>
                <li>We are required to do so by law</li>
                <li>It is necessary to protect our rights or the safety of others</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">Email Communications</h2>
              <p className="mb-6">
                By submitting your email address, you agree to receive email communications from us. You can 
                unsubscribe from any email list at any time by clicking the unsubscribe link included in 
                every email we send.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Data Security</h2>
              <p className="mb-6">
                We take the security of your personal information seriously. All information collected from 
                you is stored in a technically and physically secure environment. We use SSL encryption to 
                protect sensitive information during transmission.
              </p>
              <p className="mb-8">
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to use commercially acceptable means to protect your personal information, 
                we cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Cookies</h2>
              <p className="mb-6">
                Our website may use cookies to enhance your experience. Cookies are small text files stored 
                on your device that help us understand how you use our website. You can configure your 
                browser to refuse cookies, but this may limit some functionality of our website.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Children's Privacy</h2>
              <p className="mb-8">
                We do not knowingly collect personally identifiable information from children under 18 years 
                of age. If you believe we have collected information from a minor, please contact us 
                immediately so we can remove this information.
              </p>

              <h2 className="text-2xl font-bold mb-6 text-primary">Your Rights</h2>
              <p className="mb-6">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Access the personal information we have about you</li>
                <li>Correct inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your personal information</li>
              </ul>

              <h2 className="text-2xl font-bold mb-6 text-primary">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-muted p-6 rounded-lg mb-8">
                <p className="font-semibold mb-2">Genius Recovery</p>
                <p>Email: privacy@geniusrecovery.org</p>
                <p>For general inquiries: info@geniusrecovery.org</p>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-primary">Changes to This Policy</h2>
              <p className="mb-8">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date at the top 
                of this policy.
              </p>

              <div className="border-t pt-8 mt-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Link 
                    to="/" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    ← Return to Home
                  </Link>
                  <Link 
                    to="/terms-conditions" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    View Terms & Conditions →
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

export default PrivacyPolicy;