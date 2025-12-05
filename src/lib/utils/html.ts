import DOMPurify from 'dompurify';

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    const href = node.getAttribute('href') ?? '';

    if (href.toLowerCase().startsWith('javascript:')) {
      node.setAttribute('href', '#');
    }

    node.setAttribute('rel', 'noopener noreferrer');
  }
});

export function getSanitizedHTML(html: string): string {
  if (!html) {
    return '';
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'b', 'i', 'em', 'strong', 'span', 'br'],
    ALLOWED_ATTR: ['href', 'title', 'class', 'rel', 'target'],
    USE_PROFILES: { html: true },
  });
}
