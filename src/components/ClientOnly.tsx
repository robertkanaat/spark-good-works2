// src/components/ClientOnly.tsx
import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log('ClientOnly: Mounted client-side, userAgent:', navigator.userAgent);
    setIsMounted(true);
  }, []);

  // Allow prerendering bots to bypass client-only check
  const isPrerenderBot = typeof navigator !== 'undefined' && /Prerender|Googlebot|bingbot|Slurp/.test(navigator.userAgent);

  if (!isMounted && !isPrerenderBot) {
    return null; // Render nothing during SSR unless it's a prerender bot
  }

  return <>{children}</>;
};

export default ClientOnly;