'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PublicationData {
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

interface FeaturedPublicationProps {
  publications: PublicationData[]
}

export default function FeaturedPublication({ publications }: FeaturedPublicationProps) {
  if (!publications || publications.length === 0) return null

  return (
    <section className="featured-publications">
      <h2>Featured Publications</h2>
      {publications.map((publication, index) => (
        <article key={index} className={`publication-card content-${publication.contentPosition}`}>
          {/* Image column */}
          <div className="publication-image">
            {publication.image?.url && (
              <Image
                src={publication.image.url}
                alt={publication.image.alt || publication.title || 'Publication image'}
                width={400}
                height={300}
                className="image"
              />
            )}
          </div>

          {/* Content column */}
          <div className="publication-content">
            {publication.title && (
              <h3 className="publication-title">{publication.title}</h3>
            )}

            {publication.tags && publication.tags.length > 0 && (
              <div className="publication-tags">
                {publication.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {publication.content_html && (
              <div 
                className="publication-text"
                dangerouslySetInnerHTML={{ __html: publication.content_html }}
              />
            )}

            {publication.linkLabel && publication.link && (
              <div className="publication-link">
                {publication.linkType === 'external' ? (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    {publication.linkLabel}
                  </a>
                ) : (
                  <Link href={`/${publication.link}`} className="link-button">
                    {publication.linkLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </article>
      ))}

      <style jsx>{`
        .featured-publications {
          margin: 2rem 0;
        }

        .featured-publications h2 {
          margin-bottom: 1.5rem;
          font-size: 2rem;
          color: #333;
        }

        .publication-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 1.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #FFF8EC;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .publication-card.content-right .publication-image {
          order: 1;
        }

        .publication-card.content-right .publication-content {
          order: 2;
        }

        .publication-card.content-left .publication-image {
          order: 2;
        }

        .publication-card.content-left .publication-content {
          order: 1;
        }

        .publication-card.content-center {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
        }

        .publication-card.content-center .publication-image {
          order: 1;
        }

        .publication-card.content-center .publication-content {
          order: 2;
        }

        .publication-image {
          display: flex;
          align-items: flex-start;
        }

        .image {
          width: 100%;
          height: auto;
          border-radius: 6px;
          object-fit: cover;
        }

        .publication-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .publication-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
        }

        .publication-tags {
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

        .publication-text {
          flex-grow: 1;
          line-height: 1.6;
          color: #555;
        }

        .publication-text :global(p) {
          margin-bottom: 1rem;
        }

        .publication-text :global(p:last-child) {
          margin-bottom: 0;
        }

        .publication-link {
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
          .publication-card {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .publication-image {
            order: 1;
          }

          .publication-content {
            order: 2;
          }

          .featured-publications h2 {
            font-size: 1.75rem;
          }

          .publication-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  )
}