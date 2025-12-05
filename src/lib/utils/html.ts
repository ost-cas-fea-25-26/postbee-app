import createDOMPurify from 'dompurify';

let DOMPurifyInstance: any;

function getDOMPurify() {
  if (!DOMPurifyInstance) {
    if (typeof window === 'undefined') {
      // We're on server - require jsdom and create DOMPurify
      const { JSDOM } = require('jsdom');
      const window = new JSDOM('<!DOCTYPE html>').window;
      DOMPurifyInstance = createDOMPurify(window);

      DOMPurifyInstance.addHook('afterSanitizeAttributes', (node: any) => {
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
  if (!html) return '';

  const dompurify = getDOMPurify();

  return dompurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'b', 'i', 'em', 'strong', 'span', 'br'],
    ALLOWED_ATTR: ['href', 'title', 'class', 'rel', 'target'],
    USE_PROFILES: { html: true },
  });
}
