import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import { RefreshRouteOnSave } from '../RefreshRouteOnSave'

import config from '@/payload.config'
import Navigation from '../_components/Navigation'
import '../styles.css'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the blog post by slug
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: true,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  // Fetch navigation data
  const navMenu = await payload.findGlobal({
    slug: 'nav',
    draft: true,
    depth: 2,
  })

  // Function to extract menu structure
  function extractMenuStructure(navData: any) {
    if (!navData?.TopLevelMenuItems) return []

    return navData.TopLevelMenuItems.map((topLevel: any) => ({
      label: topLevel.label,
      subMenuItems:
        topLevel.MenuItems?.map((subItem: any) => ({
          label: subItem.label,
          slug: subItem.linkType === 'external' ? subItem.externalUrl : subItem.blogPost.slug,
        })) || [],
    }))
  }

  const menuStructure = extractMenuStructure(navMenu)

  return (
    <>
      <RefreshRouteOnSave />
      <div className="home">
        <Navigation menuItems={menuStructure} />
        <article>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
          
          {/* Render content blocks */}
          {post.content_html && (
            <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
          )}
          
          {/* Render stories of resilience blocks */}
          {post.storiesOfResilience && post.storiesOfResilience.length > 0 && (
            <div className="stories-section">
              <h2>Stories of Resilience</h2>
              {post.storiesOfResilience.map((block: any, index: number) => (
                <div key={index} className="story-block">
                  {block.title && <h3>{block.title}</h3>}
                  {block.content_html && (
                    <div dangerouslySetInnerHTML={{ __html: block.content_html }} />
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Render featured publication blocks */}
          {post.featuredPublication && post.featuredPublication.length > 0 && (
            <div className="featured-section">
              <h2>Featured Publication</h2>
              {post.featuredPublication.map((block: any, index: number) => (
                <div key={index} className="featured-block">
                  {block.title && <h3>{block.title}</h3>}
                  {block.content_html && (
                    <div dangerouslySetInnerHTML={{ __html: block.content_html }} />
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Render list of publications blocks */}
          {post.listOfPublications && post.listOfPublications.length > 0 && (
            <div className="publications-section">
              <h2>Publications</h2>
              {post.listOfPublications.map((block: any, index: number) => (
                <div key={index} className="publication-block">
                  {block.title && <h3>{block.title}</h3>}
                  {block.content_html && (
                    <div dangerouslySetInnerHTML={{ __html: block.content_html }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'posts',
    select: {
      slug: true,
    },
  })

  return posts.docs.map((post) => ({
    slug: post.slug,
  }))
}