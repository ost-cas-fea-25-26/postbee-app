import createDOMPurify, { DOMPurify } from 'dompurify';
import type { JSDOM as JSDOMType } from 'jsdom';

let DOMPurifyInstance: DOMPurify | null = null;

function getDOMPurify(): DOMPurify {
  if (!DOMPurifyInstance) {
    if (typeof window === 'undefined') {
      // We're on server - require jsdom and create DOMPurify
      // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      const jsdom = require('jsdom') as { JSDOM: typeof JSDOMType };
      const dom: JSDOMType = new jsdom.JSDOM('<!DOCTYPE html>');
      DOMPurifyInstance = createDOMPurify(dom.window as unknown as Window & typeof globalThis);

      DOMPurifyInstance.addHook('afterSanitizeAttributes', (node: Element) => {
        if (node.tagName.toLowerCase() === 'a') {
          const href = node.getAttribute('href') ?? '';

          if (href.toLowerCase().startsWith('javascript:')) {
            node.setAttribute('href', '#');
          }
          node.setAttribute('rel', 'noopener noreferrer');
        }
      });
    } else {
      // On client, just import default DOMPurify (browser version)
      DOMPurifyInstance = createDOMPurify(window);
    }
  }

  return DOMPurifyInstance;
}

export function getSanitizedHTML(html: string): string {
  if (!html) {
    return '';
  }

  const dompurify = getDOMPurify();

  return dompurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'b', 'i', 'em', 'strong', 'span', 'br'],
    ALLOWED_ATTR: ['href', 'title', 'class', 'rel', 'target'],
    USE_PROFILES: { html: true },
  });
}
