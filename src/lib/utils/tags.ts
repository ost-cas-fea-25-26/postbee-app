export const textToTagsLink = (text: string) => {
  if (!text) {
    return '';
  }

  return text.replace(/(^|[^/\w])#([\p{L}\p{N}_-]+)/gu, (full, prefix: string, tag: string) => {
    const encoded = encodeURIComponent(tag);

    return `${prefix}<a href="/?tags=${encoded}" class="text-primary-700 underline decoration-dotted decoration-primary-400 decoration-1 underline-offset-3 hover:decoration-primary-700 hover:decoration-solid pr-xxs">#${tag}</a>`;
  });
};
