// Critical CSS classes that should always be loaded
export const criticalStyles = [
  // Layout classes
  'relative', 'absolute', 'fixed', 'flex', 'grid', 'block', 'inline-block', 'hidden',
  // Spacing
  'p-4', 'py-8', 'px-6', 'm-4', 'mb-8', 'mt-4', 'mx-auto',
  // Colors (semantic tokens)
  'bg-background', 'text-foreground', 'bg-primary', 'text-primary-foreground',
  // Typography
  'text-base', 'text-lg', 'text-xl', 'font-bold', 'font-semibold',
  // Common button styles
  'bg-primary', 'hover:bg-primary/90', 'rounded-md', 'px-4', 'py-2',
];

// Remove unused CSS utility classes at runtime (for development)
export const removeUnusedStyles = () => {
  if (process.env.NODE_ENV === 'development') {
    // This helps identify unused styles during development
    const allStyleSheets = Array.from(document.styleSheets);
    
    allStyleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        rules.forEach((rule: any) => {
          if (rule.selectorText && !document.querySelector(rule.selectorText)) {
            console.log('Potentially unused CSS rule:', rule.selectorText);
          }
        });
      } catch (e) {
        // Cross-origin stylesheets can't be accessed
      }
    });
  }
};