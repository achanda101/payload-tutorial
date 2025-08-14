import React from 'react'
import Image from 'next/image'

interface InstagramPost {
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
  icon?: {
    url: string | null
    alt: string | null
  }
  smHandle?: string | null
  smLink?: string | null
}

interface InstagramPostProps {
  posts: InstagramPost[]
}

const InstagramPost: React.FC<InstagramPostProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="instagram-posts">
      <h2>Find latest updates on our Instagram</h2>
      {posts.map((post, index) => (
        <div key={index} className="instagram-post">
          <div
            className={`post-container ${post.contentPosition === 'right' ? 'content-right' : 'content-left'}`}
          >
            {post.image?.url && (
              <div className="post-image">
                <Image
                  src={post.image.url}
                  alt={post.image.alt || post.title || 'Instagram post image'}
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}

            <div className="post-content">
              {(post.icon?.url || post.smHandle) && (
                <div className="social-header">
                  <a
                    href={post.smLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {post.icon?.url && (
                      <Image
                        src={post.icon.url}
                        alt={post.icon.alt || 'Social media icon'}
                        width={25}
                        height={25}
                        className="social-icon"
                      />
                    )}
                    {post.smHandle && <span className="social-handle">{post.smHandle}</span>}
                  </a>
                </div>
              )}

              {post.title && <h2 className="post-title">{post.title}</h2>}

              {post.content_html && (
                <div
                  className="post-description"
                  dangerouslySetInnerHTML={{ __html: post.content_html }}
                />
              )}

              {post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="post-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {post.link && post.linkLabel && (
                <a
                  href={post.linkType === 'internal' ? `/${post.link}` : post.link}
                  className="post-link"
                  target={post.linkType === 'external' ? '_blank' : '_self'}
                  rel={post.linkType === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {post.linkLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InstagramPost
