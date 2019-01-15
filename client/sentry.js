import '@sentry/browser';

const sentryEnabled = process.env.NODE_ENV === 'production';

export function initSentry() {
  if (sentryEnabled) {
    Sentry.init({
      dsn: 'https://c7d8c1d86423434b8965874d954ba735@sentry.io/358981',
      environment: /staging/.test(location.hostname) ? 'staging' : 'production',
    });
  }
}
