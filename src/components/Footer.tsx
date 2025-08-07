import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png" 
                alt="Genius Recovery" 
                className="w-[240px] h-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Changing the global conversation around addiction from one of judgment to one of compassion. 
              Providing 24/7 AI-powered recovery support and connecting people to life-saving resources.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/geniusnetworkrecovery/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://x.com/GeniusRecovery" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                <span className="sr-only">X (formerly Twitter)</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/showcase/genius-recovery/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Get Help</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Crisis Support</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Treatment Centers</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Recovery Resources</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Support Groups</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Family Support</a></li>
            </ul>
          </div>

          {/* About & Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">AI Technology</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Research</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Impact Reports</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mt-12 p-6 bg-slate-700/50 rounded-lg border border-slate-600/30 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2 text-white">24/7 Crisis Support Available</h3>
            <p className="text-white/80 mb-4">If you or someone you know is in crisis, help is available right now.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:988" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-md font-semibold inline-block transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">Call 988 - Suicide & Crisis Lifeline</span>
              </a>
              <a 
                href="tel:1-800-662-4357" 
                className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-6 py-3 rounded-md font-semibold inline-block transition-all duration-300 border border-slate-500/50 shadow-lg hover:shadow-xl hover:shadow-slate-500/25 hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">Call SAMHSA: 1-800-662-4357</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © 2025 Genius Recovery. All rights reserved. 501(c)(3) nonprofit organization.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-white/60 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-white/60 hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link to="/contact" className="text-white/60 hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;