module.exports = {
  source: "dist",
  minifyHtml: {
    collapseWhitespace: false,
    removeComments: false
  },
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  crawlFrom: "/",
  include: [
    "/",
    "/about",
    "/support", 
    "/crisis-support",
    "/donors",
    "/donation",
    "/resources",
    "/emergency",
    "/help",
    "/blog",
    "/shop",
    "/open-letter",
    "/ai-companion",
    "/press",
    "/privacy-policy",
    "/terms-conditions",
    "/treatment-centers",
    "/contact",
    "/volunteer",
    "/faq"
  ],
  skipThirdPartyRequests: true,
  cacheAjaxRequests: false,
  preconnectThirdParty: false,
  asyncScriptTags: true,
  preloadImages: true,
  // Custom handling for different routes
  inlineCss: false,
  // Use custom HTML templates for specific routes
  beforeFetch: async (page, route, basename) => {
    console.log(`Processing route: ${route}`);
    
    if (route === '/about') {
      // Use the about/index.html that was created by post-build
      const aboutHtmlPath = require('path').resolve(__dirname, 'dist', 'about', 'index.html');
      if (require('fs').existsSync(aboutHtmlPath)) {
        await page.goto('file://' + aboutHtmlPath);
        return { html: await page.content() };
      }
    }
    
    return null; // Use default for other routes
  }
};