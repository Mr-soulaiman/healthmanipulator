import React from 'react';
import { BlogPost } from '../config/siteConfig';
import { IllustrationImage } from './IllustrationImage';
import { PainterlyArrowRight } from './ArtisticIcons';

interface ArticleCardProps {
  post: BlogPost;
  onReadMore: (slug: string) => void;
}

/**
 * Painterly Editorial Article Card combining:
 * - Painterly illustration as the visual focus
 * - Warm umber metadata (Category · Date)
 * - Expressive serif title
 * - Readable excerpt
 * - Tactile warm terracotta button
 */
function getCategoryAccentColor(category: string): string {
  switch (category) {
    case 'Hunger & Cravings':
      return '#F06449'; // Coral
    case 'Food & Swaps':
      return '#9ED8C5'; // Mint
    case 'Calories Without Obsession':
      return '#B9A7E8'; // Lavender
    case 'Staying Consistent':
      return '#F4D35E'; // Pale Yellow (used sparingly)
    default:
      return '#9ED8C5'; // Mint
  }
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post, onReadMore }) => {
  const accentColor = getCategoryAccentColor(post.category);

  return (
    <article className="painterly-card-interactive group flex flex-col justify-between overflow-hidden rounded-[8px]">
      <div>
        {/* Subtle Neo-Brutalist Top Accent Bar */}
        <div
          aria-hidden="true"
          className="h-2.5 w-full border-b-[2px] border-[#172033]"
          style={{ backgroundColor: accentColor }}
        />

        <a
          href={`/blog/${post.slug}`}
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              onReadMore(post.slug);
            }
          }}
          className="block border-b-[2.5px] border-[#172033]"
          aria-label={`Read article: ${post.title}`}
        >
          <IllustrationImage
            src={post.image}
            alt={post.title}
            accentBg={post.cardAccentBg}
            aspectClass="aspect-[16/10]"
          />
        </a>

        <div className="p-6 sm:p-7">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2A354B]">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0 border-[1.5px] border-[#172033]"
              style={{ backgroundColor: accentColor }}
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

          <h3 className="mb-3 font-display text-2xl font-bold leading-[1.2] text-[#172033] sm:text-[28px]">
            <a
              href={`/blog/${post.slug}`}
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onReadMore(post.slug);
                }
              }}
              className="transition-colors group-hover:text-[#F06449]"
            >
              {post.title}
            </a>
          </h3>

          <p className="text-[15px] leading-relaxed text-[#2A354B] sm:text-base">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-7 sm:pb-7">
        <a
          href={`/blog/${post.slug}`}
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              onReadMore(post.slug);
            }
          }}
          className="btn-painterly inline-flex items-center gap-2 whitespace-nowrap rounded-[6px] px-4 py-2.5 text-sm font-bold"
        >
          <span>Read More</span>
          <PainterlyArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
};
