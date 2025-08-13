'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StoryData {
  image: {
    url: string | null
    alt: string | null
  }
  title: string | null
  content_html: string | null
  linkType: string | null
  linkLabel: string | null
  link: string | null
  tags: string[]
  contentPosition: 'left' | 'right' | 'center'
}

interface ResilienceStoryProps {
  stories: StoryData[]
}

export default function ResilienceStory({ stories }: ResilienceStoryProps) {
  if (!stories || stories.length === 0) return null

  return (
    <section className="resilience-stories">
      <h2>Stories of Resilience</h2>
      {stories.map((story, index) => (
        <article key={index} className={`story-card content-${story.contentPosition}`}>
          {/* Image column */}
          <div className="story-image">
            {story.image?.url && (
              <Image
                src={story.image.url}
                alt={story.image.alt || story.title || 'Story image'}
                width={400}
                height={300}
                className="image"
              />
            )}
          </div>

          {/* Content column */}
          <div className="story-content">
            {story.title && (
              <h3 className="story-title">{story.title}</h3>
            )}

            {story.tags && story.tags.length > 0 && (
              <div className="story-tags">
                {story.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {story.content_html && (
              <div 
                className="story-text"
                dangerouslySetInnerHTML={{ __html: story.content_html }}
              />
            )}

            {story.linkLabel && story.link && (
              <div className="story-link">
                {story.linkType === 'external' ? (
                  <a
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    {story.linkLabel}
                  </a>
                ) : (
                  <Link href={`/${story.link}`} className="link-button">
                    {story.linkLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </article>
      ))}

      <style jsx>{`
        .resilience-stories {
          margin: 2rem 0;
        }

        .resilience-stories h2 {
          margin-bottom: 1.5rem;
          font-size: 2rem;
          color: #333;
        }

        .story-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 1.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .story-card.content-right .story-image {
          order: 1;
        }

        .story-card.content-right .story-content {
          order: 2;
        }

        .story-card.content-left .story-image {
          order: 2;
        }

        .story-card.content-left .story-content {
          order: 1;
        }

        .story-card.content-center {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
        }

        .story-card.content-center .story-image {
          order: 1;
        }

        .story-card.content-center .story-content {
          order: 2;
        }

        .story-image {
          display: flex;
          align-items: flex-start;
        }

        .image {
          width: 100%;
          height: auto;
          border-radius: 6px;
          object-fit: cover;
        }

        .story-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .story-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
        }

        .story-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          padding: 0.25rem 0.75rem;
          background: #f0f9ff;
          color: #0369a1;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .story-text {
          flex-grow: 1;
          line-height: 1.6;
          color: #555;
        }

        .story-text :global(p) {
          margin-bottom: 1rem;
        }

        .story-text :global(p:last-child) {
          margin-bottom: 0;
        }

        .story-link {
          margin-top: auto;
        }

        .link-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #0066cc;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .link-button:hover {
          background: #0052a3;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .story-card {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .story-image {
            order: 1;
          }

          .story-content {
            order: 2;
          }

          .resilience-stories h2 {
            font-size: 1.75rem;
          }

          .story-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  )
}