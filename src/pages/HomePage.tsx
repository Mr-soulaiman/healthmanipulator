import React from 'react';
import { BLOG_POSTS, SITE_CONFIG } from '../config/siteConfig';
import { IllustrationImage } from '../components/IllustrationImage';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';
import { PainterlyArrowRight } from '../components/ArtisticIcons';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoHead
        title="Home"
        description={SITE_CONFIG.tagline}
        path="/"
      />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* 1. NEO-BRUTALIST HERO / INTRODUCTION */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden rounded-[8px] border-[3px] border-[#172033] bg-[#FFFDF8] shadow-[6px_6px_0_#172033]"
        >
          {/* Subtle top multi-accent bar */}
          <div aria-hidden="true" className="grid h-2.5 grid-cols-12 border-b-[2.5px] border-[#172033]">
            <div className="col-span-6 bg-[#F06449]" />
            <div className="col-span-4 border-l-[2px] border-[#172033] bg-[#9ED8C5]" />
            <div className="col-span-2 border-l-[2px] border-[#172033] bg-[#B9A7E8]" />
          </div>

          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
              <div className="mb-3.5 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 border-[2px] border-[#172033] bg-[#F06449]"
                />
                <p className="text-xs font-bold tracking-wider text-[#172033]">
                  Personal Notes &amp; Everyday Habits
                </p>
              </div>

              <h1
                id="hero-heading"
                className="mb-6 max-w-xl font-display text-3xl font-bold tracking-[-0.02em] leading-[1.25] text-[#172033] sm:text-4xl sm:leading-[1.2] md:text-5xl md:leading-[1.15] lg:text-[50px] lg:leading-[1.12] xl:text-[54px]"
              >
                <span className="inline-block rounded-[4px] border-[2px] border-[#172033] bg-[#F7F3EA] px-2.5 py-0.5 my-1 shadow-[3px_3px_0_#172033]">
                  What if losing
                </span>{' '}
                <span className="inline-block rounded-[4px] border-[2px] border-[#172033] bg-[#F7F3EA] px-2.5 py-0.5 my-1 shadow-[3px_3px_0_#172033]">
                  weight didn’t have to
                </span>{' '}
                <span className="inline-block rounded-[4px] border-[2px] border-[#172033] bg-[#F7F3EA] px-2.5 py-0.5 my-1 shadow-[3px_3px_0_#172033]">
                  take over your life?
                </span>
              </h1>

              <p className="mb-7 max-w-lg text-base leading-relaxed text-[#2A354B] sm:text-[17px]">
                {SITE_CONFIG.hero.intro}
              </p>

              <a
                href="/blog"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    onNavigate('/blog');
                  }
                }}
                className="btn-painterly inline-flex items-center gap-2.5 whitespace-nowrap rounded-[6px] px-6 py-3 text-sm font-bold sm:text-base"
              >
                <span>Read the Blog</span>
                <PainterlyArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="flex items-center justify-center p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <img
                src={SITE_CONFIG.branding.mascotPrimary}
                alt="HealthManipulator mascot character"
                className="h-auto max-h-[300px] w-auto max-w-full object-contain sm:max-h-[350px] lg:max-h-[390px]"
              />
            </div>
          </div>
        </section>

        {/* 2. SHORT PERSONAL INTRODUCTION */}
        <section
          aria-labelledby="personal-intro-heading"
          className="painterly-card relative overflow-hidden rounded-[8px]"
        >
          <div
            aria-hidden="true"
            className="h-2 w-full border-b-[2px] border-[#172033] bg-[#B9A7E8]"
          />
          <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-9">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[6px] border-[2.5px] border-[#172033] bg-[#9ED8C5] shadow-[4px_4px_0_#172033]">
              <IllustrationImage
                src={SITE_CONFIG.author.avatar}
                alt={SITE_CONFIG.author.name}
                accentBg="#F7F3EA"
                aspectClass="aspect-square h-full w-full"
              />
            </div>

            <div className="flex-1">
              <h2
                id="personal-intro-heading"
                className="mb-2 font-display text-2xl font-bold text-[#172033] sm:text-3xl"
              >
                Hi, I&apos;m {SITE_CONFIG.author.name}
              </h2>
              <p className="text-[15px] leading-relaxed text-[#2A354B] sm:text-base">
                {SITE_CONFIG.author.shortBio}
              </p>
            </div>

            <a
              href="/about"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('/about');
                }
              }}
              className="btn-painterly-secondary inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[6px] px-4 py-2.5 text-sm font-bold"
            >
              <span>About Me</span>
              <PainterlyArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* 2.5 CALORIE CALCULATOR PROMPT CARD */}
        <section
          aria-labelledby="calculator-tool-heading"
          className="overflow-hidden rounded-[8px] border-[3px] border-[#172033] bg-[#FFFDF8] shadow-[5px_5px_0_#172033]"
        >
          <div aria-hidden="true" className="h-2 w-full border-b-[2px] border-[#172033] bg-[#9ED8C5]" />
          <div className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border-[2px] border-[#172033] bg-[#F7F3EA] shadow-[3px_3px_0_#172033]">
                <img
                  src={SITE_CONFIG.branding.mascotGesture}
                  alt=""
                  aria-hidden="true"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F06449] uppercase">
                  Simple Free Tool
                </span>
                <h2
                  id="calculator-tool-heading"
                  className="font-display text-xl font-bold text-[#172033] sm:text-2xl"
                >
                  Calorie Calculator
                </h2>
                <p className="mt-0.5 text-sm text-[#4E5B73]">
                  Want a quick estimate of your daily calorie needs and maintenance baseline?
                </p>
              </div>
            </div>

            <a
              href="/calorie-calculator"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('/calorie-calculator');
                }
              }}
              className="btn-painterly inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[6px] px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_#172033]"
            >
              <span>Calculate yours</span>
              <PainterlyArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* 3. FEATURED / LATEST ARTICLES */}
        <section aria-labelledby="latest-articles-heading" className="space-y-7">
          <div className="flex items-end justify-between border-b-[3px] border-[#172033] pb-3.5">
            <div className="flex items-center gap-3">
              <img
                src={SITE_CONFIG.branding.mascotBadge}
                alt=""
                aria-hidden="true"
                className="h-9 w-auto object-contain"
              />
              <h2
                id="latest-articles-heading"
                className="font-display text-3xl font-bold text-[#172033] sm:text-[36px]"
              >
                Latest Articles
              </h2>
            </div>

            <a
              href="/blog"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('/blog');
                }
              }}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#172033] underline decoration-[#F06449] decoration-2 underline-offset-4 transition-colors hover:text-[#F06449]"
            >
              <span>All Articles ({BLOG_POSTS.length})</span>
              <PainterlyArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {BLOG_POSTS.slice(0, 4).map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
                onReadMore={(slug) => onNavigate(`/blog/${slug}`)}
              />
            ))}
          </div>

          <div className="pt-2 text-center">
            <a
              href="/blog"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigate('/blog');
                }
              }}
              className="btn-painterly inline-flex items-center gap-2.5 rounded-[6px] px-7 py-3 text-base font-bold shadow-[4px_4px_0_#172033]"
            >
              <span>Browse All {BLOG_POSTS.length} Articles</span>
              <PainterlyArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
};
