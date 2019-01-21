import * as Sentry from '@sentry/browser/esm';

const sentryEnabled = process.env.NODE_ENV === 'production';

function getEnvironment(hostname) {
  if (hostname === 'localhost') {
    return 'development';
  }

  return /staging/.test(hostname) ? 'staging' : 'production';
}

export function initSentry() {
  if (sentryEnabled) {
    Sentry.init({
      dsn: 'https://c7d8c1d86423434b8965874d954ba735@sentry.io/358981',
      environment: getEnvironment(location.hostname),
    });
  }
}
