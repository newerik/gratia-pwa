export const isContentEmpty = (html: string | null): boolean => {
  if (!html) return true;
  // Basic HTML tag stripping and entity cleaning
  const plainText = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&zwnj;/g, '')
    .trim();
  return plainText === '';
};
