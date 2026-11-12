// The user's colour theme setting is 'light', 'dark' or DEVICE_COLOR_THEME,
// which follows the device's `prefers-color-scheme`.
export const DEVICE_COLOR_THEME = 'device';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function darkSchemeMediaQuery() {
  return typeof window.matchMedia === 'function' ? window.matchMedia(DARK_SCHEME_QUERY) : null;
}

// Returns the theme to display ('light' or 'dark') for a colour theme setting.
export function resolveColorTheme(colorTheme) {
  if (colorTheme !== DEVICE_COLOR_THEME) {
    return colorTheme;
  }
  return darkSchemeMediaQuery()?.matches ? 'dark' : 'light';
}

// Calls `callback` whenever the device switches between light and dark.
// Returns a function that stops listening.
export function onDeviceColorSchemeChange(callback) {
  const query = darkSchemeMediaQuery();
  query?.addEventListener('change', callback);
  return () => query?.removeEventListener('change', callback);
}
