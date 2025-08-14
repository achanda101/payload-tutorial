import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'

import config from '@/payload.config'
import Navigation from './_components/Navigation'
import ResilienceStory from './_components/ResilienceStory'
import FeaturedPublication from './_components/FeaturedPublication'
import ListOfPublications from './_components/ListOfPublications'
import InstagramPost from './_components/InstagramPost'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch homepage data
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    draft: true,
  })
  // console.log(JSON.stringify(homepage, null, 2))

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

  // Function to extract stories of resilience
  function extractStoriesOfResilience(homepageData: any) {
    if (!homepageData?.storiesOfResilience) return []

    return homepageData.storiesOfResilience.map((story: any) => ({
      image: {
        url: story.image?.url || null,
        alt: story.image?.alt || null,
      },
      title: story.title || null,
      content_html: story.content_html || null,
      linkType: story.linkType || null,
      linkLabel: story.linkLabel || null,
      link: story.linkType === 'internal' ? story.blogPost?.slug : story.externalUrl,
      tags: story.tags?.map((tag: any) => tag.tag) || [],
      contentPosition: story.contentPosition || 'left',
    }))
  }
  const storiesData = extractStoriesOfResilience(homepage)

  // Function to extract featured publication
  function extractFeaturedPublication(homepageData: any) {
    if (!homepageData?.featuredPublication) return []

    return homepageData.featuredPublication.map((publication: any) => ({
      image: {
        url: publication.image?.url || null,
        alt: publication.image?.alt || null,
      },
      title: publication.title || null,
      content_html: publication.content_html || null,
      linkType: publication.linkType || null,
      linkLabel: publication.linkLabel || null,
      link:
        publication.linkType === 'internal' ? publication.blogPost?.slug : publication.externalUrl,
      tags: publication.tags?.map((tag: any) => tag.tag) || [],
      contentPosition: publication.contentPosition || 'left',
    }))
  }
  const featuredPublicationData = extractFeaturedPublication(homepage)

  // Function to extract list of publications
  function extractListOfPublications(homepageData: any) {
    if (!homepageData?.listOfPublications) return []

    return homepageData.listOfPublications.map((publication: any) => ({
      image: {
        url: publication.image?.url || null,
        alt: publication.image?.alt || null,
      },
      title: publication.title || null,
      content_html: publication.content_html || null,
      linkType: publication.linkType || null,
      linkLabel: publication.linkLabel || null,
      link:
        publication.linkType === 'internal' ? publication.blogPost?.slug : publication.externalUrl,
      tags: publication.tags?.map((tag: any) => tag.tag) || [],
      contentPosition: publication.contentPosition || 'left',
    }))
  }
  const listOfPublicationsData = extractListOfPublications(homepage)

  // Function to extract Instagram posts
  function extractInstagramPost(homepageData: any) {
    if (!homepageData?.instagramPost) return []

    return homepageData.instagramPost.map((post: any) => ({
      image: {
        url: post.image?.url || null,
        alt: post.image?.alt || null,
      },
      title: post.title || null,
      content_html: post.content_html || null,
      linkType: post.linkType || null,
      linkLabel: post.linkLabel || null,
      link: post.linkType === 'internal' ? post.blogPost?.slug : post.externalUrl,
      tags: post.tags?.map((tag: any) => tag.tag) || [],
      contentPosition: post.contentPosition || 'left',
      icon: {
        url: post.icon?.url || null,
        alt: post.icon?.alt || null,
      },
      smHandle: post.smHandle || null,
      smLink: post.smLink || null,
    }))
  }
  const instagramPostData = extractInstagramPost(homepage)

  if (!homepage) {
    return (
      <div className="home">
        <h1>Homepage not found</h1>
        <p>Please create a homepage in the admin panel.</p>
      </div>
    )
  } else {
    return (
      <>
        <RefreshRouteOnSave />
        <div className="home">
          <Navigation menuItems={menuStructure} />
          {homepage.heroTitle && <h1>{homepage.heroTitle}</h1>}
          {homepage.heroSubtitle && <p>{homepage.heroSubtitle}</p>}
          <ResilienceStory stories={storiesData} />
          <FeaturedPublication publications={featuredPublicationData} />
          <ListOfPublications publications={listOfPublicationsData} />
          <InstagramPost posts={instagramPostData} />
        </div>
      </>
    )
  }
}
