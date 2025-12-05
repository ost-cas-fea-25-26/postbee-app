export const textToTagsLink = (text: string) => {
  if (!text) return '';

  return text.replace(/(^|[^\/\w])#([\p{L}\p{N}_-]+)/gu, (full, prefix, tag) => {
    const encoded = encodeURIComponent(tag);
    return `${prefix}<a href="/?tags=${encoded}" class="text-primary-600 hover:text-primary-900 hover:underline">#${tag}</a>`;
  });
};
