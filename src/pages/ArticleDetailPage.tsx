import React from 'react';
import { BLOG_POSTS, BlogPost, SITE_CONFIG } from '../config/siteConfig';
import { IllustrationImage } from '../components/IllustrationImage';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';
import { PainterlyArrowLeft, PainterlyArrowRight, PainterlyBrushDivider } from '../components/ArtisticIcons';

interface ArticleDetailPageProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
}

/**
 * Curated topical relationship network for genuine contextual recommendations.
 * Each article links to 3 topically-related articles based on content themes:
 * - Hunger & Cravings
 * - Food Flexibility & Portion Swaps
 * - Sustainable Mindset & Habits
 */
const TOPICAL_RELATED_MAP: Record<string, string[]> = {
  'brainless-weight-loss': [
    'you-dont-need-to-start-a-new-diet-every-monday',
    'weight-loss-isnt-a-30-day-challenge',
    'you-dont-have-to-completely-change-your-diet-to-lose-weight',
  ],
  'you-dont-need-to-start-a-new-diet-every-monday': [
    'i-ate-too-much-what-now',
    'weight-loss-isnt-a-30-day-challenge',
    'brainless-weight-loss',
  ],
  'why-too-much-free-time-can-make-losing-weight-harder': [
    'my-favorite-trick-for-dealing-with-cravings',
    'the-10-minute-trick-i-use-when-im-extremely-hungry',
    'weight-loss-isnt-a-30-day-challenge',
  ],
  'my-favorite-trick-for-dealing-with-cravings': [
    'the-10-minute-trick-i-use-when-im-extremely-hungry',
    'why-too-much-free-time-can-make-losing-weight-harder',
    'cheat-code-foods-for-hunger',
  ],
  'the-10-minute-trick-i-use-when-im-extremely-hungry': [
    'what-i-do-when-im-very-hungry-before-cooking',
    'my-favorite-trick-for-dealing-with-cravings',
    'soup-and-low-calorie-drinks',
  ],
  'cheat-code-foods-for-hunger': [
    'mixing-potatoes-with-rice-pasta-and-bread',
    'soup-and-low-calorie-drinks',
    'what-i-do-when-im-very-hungry-before-cooking',
  ],
  'soup-and-low-calorie-drinks': [
    'what-i-do-when-im-very-hungry-before-cooking',
    'the-10-minute-trick-i-use-when-im-extremely-hungry',
    'cheat-code-foods-for-hunger',
  ],
  'you-dont-have-to-completely-change-your-diet-to-lose-weight': [
    'how-i-eat-pizza-without-cheat-day',
    'mixing-potatoes-with-rice-pasta-and-bread',
    'brainless-weight-loss',
  ],
  'mixing-potatoes-with-rice-pasta-and-bread': [
    'cheat-code-foods-for-hunger',
    'how-i-eat-pizza-without-cheat-day',
    'you-dont-have-to-completely-change-your-diet-to-lose-weight',
  ],
  'how-i-eat-pizza-without-cheat-day': [
    'i-treat-my-calories-like-a-daily-budget',
    'how-i-save-calories-earlier-in-the-day',
    'you-dont-have-to-completely-change-your-diet-to-lose-weight',
  ],
  'i-treat-my-calories-like-a-daily-budget': [
    'how-i-save-calories-earlier-in-the-day',
    'how-i-eat-pizza-without-cheat-day',
    'i-ate-too-much-what-now',
  ],
  'how-i-save-calories-earlier-in-the-day': [
    'i-treat-my-calories-like-a-daily-budget',
    'how-i-eat-pizza-without-cheat-day',
    'what-i-do-when-im-very-hungry-before-cooking',
  ],
  'i-ate-too-much-what-now': [
    'you-dont-need-to-start-a-new-diet-every-monday',
    'weight-loss-isnt-a-30-day-challenge',
    'i-treat-my-calories-like-a-daily-budget',
  ],
  'weight-loss-isnt-a-30-day-challenge': [
    'you-dont-need-to-start-a-new-diet-every-monday',
    'brainless-weight-loss',
    'i-ate-too-much-what-now',
  ],
  'what-i-do-when-im-very-hungry-before-cooking': [
    'the-10-minute-trick-i-use-when-im-extremely-hungry',
    'soup-and-low-calorie-drinks',
    'cheat-code-foods-for-hunger',
  ],
};

/**
 * Renders inline markdown links [anchor text](path), **bold**, and *italic* emphasis.
 */
function renderInlineFormatting(
  text: string,
  onNavigate: (path: string) => void
): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const label = match[1];
        const href = match[2];
        return (
          <a
            key={index}
            href={href}
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onNavigate(href);
              }
            }}
            className="font-semibold text-[#172033] underline decoration-[#F06449] decoration-2 underline-offset-4 transition-colors hover:text-[#F06449]"
          >
            {label}
          </a>
        );
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-[#172033]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-[#172033]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  post,
  onNavigate,
}) => {
  const relatedSlugs = TOPICAL_RELATED_MAP[post.slug] || [];
  const relatedPosts = relatedSlugs
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));

  const hasInlineIllustration = post.sections.some((s) => Boolean(s.illustrationAfter));

  // Breadcrumb schema for search engines
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_CONFIG.siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_CONFIG.siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        exactTitle={Boolean(post.seoTitle)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        {/* HIERARCHICAL BREADCRUMB NAVIGATION */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4E5B73] sm:text-sm">
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onNavigate('/');
              }
            }}
            className="transition-colors hover:text-[#F06449]"
          >
            Home
          </a>
          <span aria-hidden="true" className="text-[#99A1AF]">/</span>
          <a
            href="/blog"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onNavigate('/blog');
              }
            }}
            className="transition-colors hover:text-[#F06449]"
          >
            Blog
          </a>
          <span aria-hidden="true" className="text-[#99A1AF]">/</span>
          <span className="truncate max-w-[200px] text-[#172033] sm:max-w-md font-bold" aria-current="page">
            {post.title}
          </span>
        </nav>

        <div>
          <a
            href="/blog"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                onNavigate('/blog');
              }
            }}
            className="btn-painterly-secondary inline-flex items-center gap-2 whitespace-nowrap rounded-[6px] px-4 py-2 text-sm font-bold"
          >
            <PainterlyArrowLeft className="h-4 w-4" />
            <span>Back to All Articles</span>
          </a>
        </div>

        <article className="overflow-hidden rounded-[8px] border-[3px] border-[#172033] bg-[#FFFDF8] shadow-[6px_6px_0_#172033]">
          {/* Neo-Brutalist Top Accent Strip */}
          <div aria-hidden="true" className="grid h-2.5 grid-cols-12 border-b-[2.5px] border-[#172033]">
            <div className="col-span-5 bg-[#F06449]" />
            <div className="col-span-4 border-l-[2px] border-[#172033] bg-[#9ED8C5]" />
            <div className="col-span-3 border-l-[2px] border-[#172033] bg-[#B9A7E8]" />
          </div>

          {!hasInlineIllustration && (
            <div className="border-b-[2.5px] border-[#172033]">
              <IllustrationImage
                src={post.image}
                alt={post.title}
                accentBg={post.cardAccentBg}
                aspectClass="aspect-[16/10] w-full"
              />
            </div>
          )}

          <div className="p-6 sm:p-11 md:p-14">
            {/* NEO-BRUTALIST ARTICLE HEADER */}
            <header className="mb-10 border-b-[2.5px] border-[#172033] pb-8">
              <div className="mb-3.5 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-[#2A354B] sm:text-sm">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 border-[1.5px] border-[#172033] bg-[#F06449]"
                />
                <span className="font-bold text-[#172033]">{post.category}</span>
                {post.date && (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date} className="text-[#4E5B73]">
                      {post.date}
                    </time>
                  </>
                )}
              </div>

              <h1 className="mb-5 font-display text-3xl font-bold leading-[1.14] text-[#172033] sm:text-4xl md:text-[44px]">
                {post.title}
              </h1>

              <p className="text-base leading-relaxed text-[#2A354B] sm:text-[18px]">
                {post.excerpt}
              </p>

              {/* Simple Author / Date Area */}
              <div className="mt-6 flex items-center justify-between pt-2 text-sm text-[#2A354B]">
                <span>
                  By{' '}
                  <strong className="font-bold text-[#172033]">
                    {post.author || SITE_CONFIG.author.name}
                  </strong>
                </span>
                <PainterlyBrushDivider className="hidden h-3 w-28 sm:block" />
              </div>
            </header>

            {/* ARTICLE BODY WITH CONTEXTUAL INTERNAL LINKS */}
            <div className="space-y-11">
              {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  {section.heading && (
                    <h2 className="pt-3 font-display text-2xl font-bold leading-snug text-[#172033] sm:text-[31px]">
                      {section.heading}
                    </h2>
                  )}

                  <div className="space-y-4">
                    {section.blocks.map((block, bIdx) => {
                      if (block.type === 'blockquote') {
                        return (
                          <blockquote
                            key={bIdx}
                            className="my-5 rounded-[6px] border-2 border-[#172033] border-l-[6px] border-l-[#F06449] bg-[#F7F3EA] py-3.5 pl-5 pr-5 font-display text-xl font-semibold italic text-[#172033] shadow-[3px_3px_0_#172033] sm:text-2xl"
                          >
                            {renderInlineFormatting(block.text, onNavigate)}
                          </blockquote>
                        );
                      }

                      return (
                        <p
                          key={bIdx}
                          className="text-[17px] leading-[1.78] text-[#172033] sm:text-[18px]"
                        >
                          {renderInlineFormatting(block.text, onNavigate)}
                        </p>
                      );
                    })}
                  </div>

                  {/* Painterly Illustration placed after the specified section */}
                  {section.illustrationAfter && (
                    <figure className="my-10 overflow-hidden rounded-[6px] border-[2.5px] border-[#172033] bg-[#F7F3EA] shadow-[5px_5px_0_#172033]">
                      <IllustrationImage
                        src={section.illustrationAfter.src}
                        alt={section.illustrationAfter.alt}
                        accentBg={section.illustrationAfter.accentBg || '#F7F3EA'}
                        aspectClass={section.illustrationAfter.aspectClass || 'aspect-[16/9] w-full'}
                      />
                    </figure>
                  )}
                </section>
              ))}
            </div>

            {/* SMALL UNOBTRUSIVE NOTE AT THE BOTTOM */}
            {post.bottomDisclaimer && (
              <footer className="mt-12 rounded-[6px] border-2 border-[#172033] bg-[#F7F3EA] p-4 shadow-[3px_3px_0_#172033]">
                <p className="text-xs leading-relaxed text-[#2A354B] sm:text-sm">
                  {post.bottomDisclaimer}
                </p>
              </footer>
            )}
          </div>
        </article>

        {/* TOPICALLY-RELATED ARTICLES AT THE VERY BOTTOM */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-articles-heading" className="space-y-6 pt-4">
            <div className="flex flex-col gap-2 border-b-[3px] border-[#172033] pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-3.5 border-2 border-[#172033] bg-[#B9A7E8] shadow-[2px_2px_0_#172033]"
                />
                <h2
                  id="related-articles-heading"
                  className="font-display text-2xl font-bold text-[#172033] sm:text-3xl"
                >
                  You Might Also Like
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#172033] underline decoration-[#F06449] decoration-2 underline-offset-4 transition-colors hover:text-[#F06449] sm:text-sm"
              >
                <span>Browse All {BLOG_POSTS.length} Articles</span>
                <PainterlyArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <ArticleCard
                  key={related.id}
                  post={related}
                  onReadMore={(slug) => onNavigate(`/blog/${slug}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
