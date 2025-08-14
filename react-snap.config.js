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
  preloadImages: true
};