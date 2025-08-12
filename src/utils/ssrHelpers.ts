// SSR helper utilities to safely access browser APIs

export const isBrowser = typeof window !== 'undefined';

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silent fail in SSR
    }
  },
  removeItem: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail in SSR
    }
  }
};

export const safeWindow = {
  scrollTo: (options: ScrollToOptions | number, y?: number): void => {
    if (!isBrowser) return;
    if (typeof options === 'number') {
      window.scrollTo(options, y || 0);
    } else {
      window.scrollTo(options);
    }
  },
  matchMedia: (query: string) => {
    if (!isBrowser) {
      return {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      };
    }
    return window.matchMedia(query);
  },
  addEventListener: (event: string, handler: EventListener): void => {
    if (!isBrowser) return;
    window.addEventListener(event, handler);
  },
  removeEventListener: (event: string, handler: EventListener): void => {
    if (!isBrowser) return;
    window.removeEventListener(event, handler);
  },
  open: (url: string, target?: string, features?: string): Window | null => {
    if (!isBrowser) return null;
    return window.open(url, target, features);
  },
  get location() {
    if (!isBrowser) return { href: '', origin: '' } as Location;
    return window.location;
  },
  get innerWidth() {
    if (!isBrowser) return 1024; // Default width for SSR
    return window.innerWidth;
  }
};

export const safeDocument = {
  createElement: (tagName: string): HTMLElement | null => {
    if (!isBrowser) return null;
    return document.createElement(tagName);
  },
  getElementById: (id: string): HTMLElement | null => {
    if (!isBrowser) return null;
    return document.getElementById(id);
  },
  querySelector: (selector: string): Element | null => {
    if (!isBrowser) return null;
    return document.querySelector(selector);
  },
  get title(): string {
    if (!isBrowser) return '';
    return document.title;
  },
  set title(value: string) {
    if (!isBrowser) return;
    document.title = value;
  },
  get head(): HTMLHeadElement | null {
    if (!isBrowser) return null;
    return document.head;
  },
  get cookie(): string {
    if (!isBrowser) return '';
    return document.cookie;
  },
  set cookie(value: string) {
    if (!isBrowser) return;
    document.cookie = value;
  }
};