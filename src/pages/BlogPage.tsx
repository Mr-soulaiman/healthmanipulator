import React from 'react';
import { BLOG_POSTS, SITE_CONFIG } from '../config/siteConfig';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title="Blog"
        description={`Articles on ${SITE_CONFIG.brandName}. ${SITE_CONFIG.tagline}`}
        path="/blog"
      />

      <div className="mx-auto max-w-5xl space-y-9 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="painterly-card overflow-hidden rounded-[8px]">
          <div
            aria-hidden="true"
            className="h-2.5 w-full border-b-[2px] border-[#172033] bg-[#9ED8C5]"
          />
          <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-4 w-4 border-2 border-[#172033] bg-[#F06449] shadow-[2px_2px_0_#172033]"
                />
                <h1 className="font-display text-4xl font-bold text-[#172033] sm:text-[44px]">
                  Blog
                </h1>
              </div>
              <p className="mt-2.5 max-w-xl text-base text-[#2A354B] sm:text-lg">
                {SITE_CONFIG.tagline}
              </p>
            </div>
            <div className="hidden shrink-0 sm:block">
              <img
                src={SITE_CONFIG.branding.mascotActive}
                alt=""
                aria-hidden="true"
                className="h-20 w-auto object-contain opacity-95"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
              onReadMore={(slug) => onNavigate(`/blog/${slug}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
