const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🧠</span>
              </div>
              <span className="ml-2 text-xl font-bold">GENIUS RECOVERY</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Changing the global conversation around addiction from one of judgment to one of compassion. 
              Providing 24/7 AI-powered recovery support and connecting people to life-saving resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297C4.232 14.804 3.742 13.653 3.742 12.356c0-1.297.49-2.448 1.297-3.33.882-.807 2.033-1.297 3.33-1.297 1.297 0 2.448.49 3.33 1.297.882.882 1.377 2.033 1.377 3.33 0 1.297-.49 2.448-1.297 3.33-.882.807-2.033 1.297-3.33 1.297zm7.598 0c-1.297 0-2.448-.49-3.33-1.297-.882-.882-1.377-2.033-1.377-3.33 0-1.297.49-2.448 1.297-3.33.882-.882 2.033-1.377 3.33-1.377 1.297 0 2.448.49 3.33 1.297.882.882 1.377 2.033 1.377 3.33 0 1.297-.49 2.448-1.297 3.33-.882.882-2.033 1.377-3.33 1.377z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
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
        <div className="mt-12 p-6 bg-primary/20 rounded-lg border border-primary/30">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">24/7 Crisis Support Available</h3>
            <p className="text-white/80 mb-4">If you or someone you know is in crisis, help is available right now.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:988" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold inline-block transition-colors">
                Call 988 - Suicide & Crisis Lifeline
              </a>
              <a href="tel:1-800-662-4357" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold inline-block transition-colors border border-white/30">
                Call SAMHSA: 1-800-662-4357
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © 2024 Genius Recovery. All rights reserved. 501(c)(3) nonprofit organization.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;