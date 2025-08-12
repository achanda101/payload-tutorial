import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'

import config from '@/payload.config'
import Navigation from './components/Navigation'
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
  // console.log(JSON.stringify(menuStructure, null, 2))

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
        </div>
      </>
    )
  }
}
