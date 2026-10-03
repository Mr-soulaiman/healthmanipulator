import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  exactTitle?: boolean;
}

/**
 * Dynamically updates document title, meta description, OpenGraph tags,
 * and canonical link for each page route.
 */
export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  path,
  type = 'website',
  exactTitle = false,
}) => {
  useEffect(() => {
    const fullTitle = exactTitle ? title : `${title} | ${SITE_CONFIG.brandName}`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
          if (nameMatch) el.setAttribute('name', nameMatch[1]);
        } else if (selector.startsWith('meta[property=')) {
          const propMatch = selector.match(/meta\[property="([^"]+)"\]/);
          if (propMatch) el.setAttribute('property', propMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    const canonicalBase = SITE_CONFIG.siteUrl.replace(/\/$/, '');
    const cleanPath =
      path === '/' ? '/' : `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
    const canonicalUrl =
      cleanPath === '/' ? `${canonicalBase}/` : `${canonicalBase}${cleanPath}`;

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);

    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, path, type, exactTitle]);

  return null;
};
