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
  // Ensure proper handling of routes
  inlineCss: false,
  // Custom handling for different routes
  beforeFetch: async (page, route, basename) => {
    console.log(`Processing route: ${route}`);
    return null; // Let react-snap handle normally
  },
  // Post-process to ensure correct HTML templates
  afterFetch: async (route, content) => {
    console.log(`Post-processing route: ${route}`);
    return content;
  }
};