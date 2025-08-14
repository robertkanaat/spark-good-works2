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
  // Custom function to use specific HTML templates for routes
  beforeFetch: async (page, route, basename) => {
    if (route === '/about') {
      // Use about.html as the base template for /about route
      const aboutHtmlPath = require('path').resolve(__dirname, 'dist', 'about.html');
      if (require('fs').existsSync(aboutHtmlPath)) {
        await page.goto('file://' + aboutHtmlPath);
        return { html: await page.content() };
      }
    }
    // For index route, use the default index.html from dist
    return null;
  }
};