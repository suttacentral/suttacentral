import { expect } from '@open-wc/testing';

import {
  DEVICE_COLOR_THEME,
  resolveColorTheme,
  onDeviceColorSchemeChange,
} from '../utils/colorTheme';

describe('colorTheme', () => {
  const originalMatchMedia = window.matchMedia;
  let mediaQuery;

  function stubDeviceScheme(dark) {
    const listeners = new Set();
    mediaQuery = {
      matches: dark,
      addEventListener: (type, cb) => type === 'change' && listeners.add(cb),
      removeEventListener: (type, cb) => type === 'change' && listeners.delete(cb),
      setDark(value) {
        this.matches = value;
        listeners.forEach(cb => cb({ matches: value }));
      },
      listeners,
    };
    window.matchMedia = query => {
      expect(query).to.equal('(prefers-color-scheme: dark)');
      return mediaQuery;
    };
  }

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('keeps an explicit light or dark theme', () => {
    stubDeviceScheme(true);
    expect(resolveColorTheme('light')).to.equal('light');
    stubDeviceScheme(false);
    expect(resolveColorTheme('dark')).to.equal('dark');
  });

  it('follows the device when set to the device theme', () => {
    stubDeviceScheme(true);
    expect(resolveColorTheme(DEVICE_COLOR_THEME)).to.equal('dark');
    stubDeviceScheme(false);
    expect(resolveColorTheme(DEVICE_COLOR_THEME)).to.equal('light');
  });

  it('falls back to light when matchMedia is not available', () => {
    window.matchMedia = undefined;
    expect(resolveColorTheme(DEVICE_COLOR_THEME)).to.equal('light');
    expect(() => onDeviceColorSchemeChange(() => {})()).not.to.throw();
  });

  it('notifies about device scheme changes until stopped', () => {
    stubDeviceScheme(false);
    const seen = [];
    const stop = onDeviceColorSchemeChange(() => seen.push(resolveColorTheme(DEVICE_COLOR_THEME)));
    mediaQuery.setDark(true);
    mediaQuery.setDark(false);
    stop();
    mediaQuery.setDark(true);
    expect(seen).to.deep.equal(['dark', 'light']);
    expect(mediaQuery.listeners.size).to.equal(0);
  });
});
