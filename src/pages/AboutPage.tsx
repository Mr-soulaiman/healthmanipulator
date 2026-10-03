import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { IllustrationImage } from '../components/IllustrationImage';
import { SeoHead } from '../components/SeoHead';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="About"
        description={SITE_CONFIG.author.shortBio}
        path="/about"
      />

      <div className="mx-auto max-w-3xl space-y-9 px-4 py-8 sm:px-6 sm:py-12">
        {/* 1. AUTHOR ILLUSTRATION, NAME, AND SHORT PERSONAL BIO */}
        <section
          aria-labelledby="about-author-heading"
          className="painterly-card overflow-hidden rounded-[8px]"
        >
          <div
            aria-hidden="true"
            className="h-2.5 w-full border-b-[2px] border-[#172033] bg-[#F06449]"
          />
          <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-9">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-[6px] border-[3px] border-[#172033] bg-[#9ED8C5] shadow-[4px_4px_0_#172033]">
              <IllustrationImage
                src={SITE_CONFIG.author.avatar}
                alt={SITE_CONFIG.author.name}
                accentBg="#F7F3EA"
                aspectClass="aspect-square h-full w-full"
              />
            </div>

            <div className="space-y-3">
              <h1
                id="about-author-heading"
                className="font-display text-3xl font-bold text-[#172033] sm:text-4xl"
              >
                {SITE_CONFIG.author.name}
              </h1>
              {SITE_CONFIG.about.introParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base leading-relaxed text-[#2A354B] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 2. MY WEIGHT-LOSS STORY */}
        <section
          aria-labelledby="story-heading"
          className="painterly-card overflow-hidden rounded-[8px]"
        >
          <div
            aria-hidden="true"
            className="h-2.5 w-full border-b-[2px] border-[#172033] bg-[#9ED8C5]"
          />
          <div className="p-6 sm:p-9">
            <h2
              id="story-heading"
              className="mb-4 border-b-[2.5px] border-[#172033] pb-3 font-display text-2xl font-bold text-[#172033] sm:text-3xl"
            >
              {SITE_CONFIG.about.storyTitle}
            </h2>
            <div className="space-y-4">
              {SITE_CONFIG.about.storyParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base leading-relaxed text-[#172033] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHY I CREATED THE BLOG */}
        <section
          aria-labelledby="why-blog-heading"
          className="painterly-card overflow-hidden rounded-[8px]"
        >
          <div
            aria-hidden="true"
            className="h-2.5 w-full border-b-[2px] border-[#172033] bg-[#B9A7E8]"
          />
          <div className="p-6 sm:p-9">
            <h2
              id="why-blog-heading"
              className="mb-4 border-b-[2.5px] border-[#172033] pb-3 font-display text-2xl font-bold text-[#172033] sm:text-3xl"
            >
              {SITE_CONFIG.about.whyBlogTitle}
            </h2>
            <div className="space-y-4">
              {SITE_CONFIG.about.whyBlogParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base leading-relaxed text-[#172033] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
