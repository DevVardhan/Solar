const DEFAULT_TITLE = 'SandhyaSolar - Sustainable Solar Solutions';
const DEFAULT_DESCRIPTION =
  'SandhyaSolar offers cutting-edge, sustainable solar energy solutions for homes and businesses. Reduce your electricity bills and go green today!';

function setMetaTag(attr: 'name' | 'property', key: string, value: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

interface PageMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

/**
 * Sets the browser tab title and meta/OpenGraph tags for the current page.
 * Call this from a page component's useEffect. Returns a cleanup function
 * that restores the site-wide defaults — call it on unmount so navigating
 * away (e.g. back to the homepage) doesn't leave a stale blog title behind.
 */
export function setPageMeta({ title, description, image, url }: PageMeta) {
  document.title = title;
  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  if (image) setMetaTag('property', 'og:image', image);
  if (url) setMetaTag('property', 'og:url', url);

  return function resetPageMeta() {
    document.title = DEFAULT_TITLE;
    setMetaTag('name', 'description', DEFAULT_DESCRIPTION);
    setMetaTag('property', 'og:title', DEFAULT_TITLE);
    setMetaTag('property', 'og:description', DEFAULT_DESCRIPTION);
  };
}
