import { createBrowserHistory } from 'history';
import { compile, match, parse } from 'path-to-regexp';

/**
 * Abstraction for browser history, use to set up a list of routes to handle
 */
export default class RoutingService {
  constructor() {
    this.routes = {};
    this.history = createBrowserHistory();
  }

  get location() {
    return this.history.location;
  }

  /**
   * @param routes {Record<string, {path: string}>}
   */
  addRoutes(routes) {
    this.routes = {
      ...this.routes,
      ...this._parseRoutes(routes),
    };
  }

  listen(cb, parent) {
    const navigationListener = event => {
      this.push(event.detail.pathname);
    };

    const handler = this._anchorHandler.bind(this);
    parent.addEventListener('click', handler);
    parent.addEventListener('sc-navigate', navigationListener);
    const unlisten = this.history.listen(cb);
    return () => {
      unlisten();
      parent.removeEventListener('click', handler);
      parent.removeEventListener('sc-navigate', navigationListener);
    };
  }

  push(url) {
    if (url.indexOf('/search') === -1) {
      this.history.push({
        pathname: url,
        search: '',
      });
    } else {
      this.history.push(url);
    }
  }

  replace(url) {
    this.history.replace(url);
  }

  match(pathname) {
    const [hit] = Object.entries(this.routes)
      .map(([route, path]) => [route, match(path.path)(decodeURI(pathname))])
      .filter(([route, path]) => !!path);

    if (!hit) {
      return [null, null];
    }

    const [route, { params }] = hit;

    const searchEntries = new URLSearchParams(this.location.search.slice(1)).entries();
    Array.from(searchEntries).forEach(([key, value]) => {
      if (!this.routes[route].tokens.includes(key)) {
        params[key] = value;
      }
    });

    return [route, params];
  }

  /**
   * @param e {MouseEvent}
   * @private
   */
  _anchorHandler(e) {
    /** @type {HTMLAnchorElement} */
    let anchor = null;
    const path = e.path || (e.composedPath && e.composedPath());
    for (let elem of path) {
      if (elem.tagName === 'A' && elem.href) {
        anchor = elem;
        break;
      }
    }

    if (
      // Skip event handling for unsupported elements
      !anchor ||
      anchor.target === '_blank' ||
      anchor.download ||
      ((anchor.target === '_top' || anchor.target === '_parent') && window.top !== window) ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey
    ) {
      return;
    }

    let url;
    if (document.baseURI != null) {
      url = new URL(anchor.href, document.baseURI);
    } else {
      url = new URL(anchor.href);
    }

    if (location.origin === url.origin) {
      const route = this.match(url.pathname);
      const isJustHashChange = location.pathname === url.pathname && location.hash !== url.hash;
      if (route && !isJustHashChange) {
        e.preventDefault();
        if (this.location.pathname !== url.pathname) {
          this.push(url.pathname);
        }
      }
    }
  }

  /**
   * @param routes {Record<string, {path: string}>}
   * @private
   */
  _parseRoutes(routes) {
    return Object.entries(routes)
      .map(([key, { path: value }]) => [
        key,
        {
          path: value,
          matcher: match(value),
          compile: compile(value),
          tokens: parse(value)
            .filter(t => t.name)
            .map(t => t.name),
        },
      ])
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});
  }
}
