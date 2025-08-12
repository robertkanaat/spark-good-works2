# React-Snap Pre-rendering Setup

This project now includes static pre-rendering using react-snap for improved SEO and faster initial page loads.

## What's Included

✅ **react-snap package** - Generates static HTML for all routes  
✅ **SSR-safe code** - All browser APIs properly guarded  
✅ **Route configuration** - All main pages pre-rendered  
✅ **Build scripts** - Automated pre-rendering process  

## How It Works

1. **Build Phase**: Vite builds the React app normally
2. **Pre-render Phase**: react-snap crawls all routes and generates static HTML
3. **Hydration**: React takes over after initial HTML load

## Building with Pre-rendering

### Option 1: Use the build script
```bash
node scripts/build-with-prerender.js
```

### Option 2: Manual process
```bash
npm run build:dev
npx react-snap
```

## Configuration

The react-snap configuration is in `react-snap.config.js`:

- **Routes**: All main pages are pre-rendered
- **Settings**: Optimized for SEO and performance
- **Puppeteer**: Configured for headless rendering

## SEO Benefits

✅ **Search Engines**: See full HTML content immediately  
✅ **Social Sharing**: Meta tags and Open Graph work properly  
✅ **Performance**: Faster First Contentful Paint  
✅ **Accessibility**: Screen readers get immediate content  

## Files Modified for SSR Safety

- `src/main.tsx` - Hydration support
- `src/integrations/supabase/client.ts` - Safe localStorage
- `src/hooks/use-mobile.tsx` - Window guards
- `src/components/ui/sidebar.tsx` - Document/window guards
- `src/components/Footer.tsx` - Safe window usage
- `src/components/ScrollToTop.tsx` - Safe window usage
- `src/utils/ssrHelpers.ts` - SSR utility functions

## Pre-rendered Routes

- `/` - Homepage
- `/about` - About page
- `/support` - Support page
- `/crisis-support` - Crisis support
- `/donors` - Donors page
- `/donation` - Donation page
- `/resources` - Resources
- `/emergency` - Emergency help
- `/blog` - Blog listing
- `/shop` - Shop page
- And all other main routes...

## Deployment

When you deploy, make sure your static hosting:
1. Serves the pre-rendered HTML files
2. Falls back to `index.html` for client-side routing
3. Properly handles React hydration

## Testing

After building, you can test the pre-rendered files:
```bash
npm run preview
```

The static HTML should load immediately, then React will hydrate and take over navigation.