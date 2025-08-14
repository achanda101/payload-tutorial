import React from 'react'
import Image from 'next/image'

interface Publication {
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
  contentPosition?: string
}

interface ListOfPublicationsProps {
  publications: Publication[]
}

const ListOfPublications: React.FC<ListOfPublicationsProps> = ({ publications }) => {
  if (!publications || publications.length === 0) {
    return null
  }

  const useSlider = publications.length === 3

  return (
    <div className="list-of-publications">
      <div className={`publications-row ${useSlider ? 'publications-slider' : ''}`}>
        {publications.map((publication, index) => (
          <div key={index} className="publication-card">
            {publication.image?.url && (
              <div className="publication-image">
                <Image
                  src={publication.image.url}
                  alt={publication.image.alt || publication.title || 'Publication image'}
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div className="publication-content">
              <div className="publication-meta">
                {publication.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="publication-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {publication.title && (
                <h3 className="publication-title">{publication.title}</h3>
              )}
              {publication.content_html && (
                <div 
                  className="publication-description"
                  dangerouslySetInnerHTML={{ __html: publication.content_html }}
                />
              )}
              {publication.link && publication.linkLabel && (
                <a 
                  href={publication.linkType === 'internal' ? `/${publication.link}` : publication.link}
                  className="publication-link"
                  target={publication.linkType === 'external' ? '_blank' : '_self'}
                  rel={publication.linkType === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {publication.linkLabel} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfPublications