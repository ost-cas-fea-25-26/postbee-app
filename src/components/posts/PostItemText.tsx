import Link from 'next/link';

export const PostItemText = ({ text }: { text: string }) => {
  if (!text) return null;

  // Split the string using RegEx
  const parts = text.split(/(^|\s)(#[\w-]+)/g);

  // Filter out any empty strings that might result from the split
  const cleanedParts = parts.filter(Boolean);

  return (
    <p className="pb-paragraph-md cursor-auto whitespace-pre-wrap wrap-break-word overflow-hidden">
      {cleanedParts.map((part, index) => {
        if (part.startsWith('#')) {
          // The actual hashtag text (e.g., "#mumble")
          const hashtag = part;

          // The tag without the '#' for the URL (e.g., "mumble")
          const tagWithoutHash = part.substring(1);

          const href = `/?tags=${tagWithoutHash}`;

          return (
            <Link key={index} href={href} className="text-primary hover:text-primary-900 hover:underline">
              {hashtag}
            </Link>
          );
        } else {
          // Plain text part, including the leading space from the regex split
          return <span key={index}>{part}</span>;
        }
      })}
    </p>
  );
};
