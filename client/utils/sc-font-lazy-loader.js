export class FontLazyLoader {
  constructor() {
    this.isLoaded = false;
    this.loadPromise = null;
  }

  async loadFontsWhenIdle() {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve) => {
      const loadFonts = async () => {
        try {
          // Dynamically import font styles
          const { SCFontStyles } = await import('../elements/styles/sc-font-styles.js');
          this.injectFontStyles(SCFontStyles);
          this.isLoaded = true;
          resolve();
        } catch (error) {
          console.error('Failed to load font styles:', error);
          resolve(); // Resolve even if it fails to avoid blocking
        }
      };

      // Load when the browser is idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadFonts, { timeout: 3000 });
      } else {
        // Downgrade to setTimeout
        setTimeout(loadFonts, 100);
      }
    });

    return this.loadPromise;
  }

  injectFontStyles(fontStyles) {
    const existingStyle = document.querySelector('[data-font-styles="main"]');
    if (existingStyle) {
      return;
    }

    const style = document.createElement('style');
    style.setAttribute('data-font-styles', 'main');
    style.textContent = fontStyles.cssText || fontStyles.toString();
    document.head.appendChild(style);
  }
}

export const fontLazyLoader = new FontLazyLoader();