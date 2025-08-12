'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface SubMenuItem {
  label: string
  slug: string
}

interface MenuItem {
  label: string
  subMenuItems: SubMenuItem[]
}

interface NavigationProps {
  menuItems: MenuItem[]
}

export default function Navigation({ menuItems }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="nav-link">{item.label}</span>
            {item.subMenuItems.length > 0 && (
              <ul
                className={`dropdown ${
                  activeDropdown === index ? 'dropdown-active' : ''
                }`}
              >
                {item.subMenuItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="dropdown-item">
                    {subItem.slug.startsWith('http') ? (
                      <a
                        href={subItem.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-link"
                      >
                        {subItem.label}
                      </a>
                    ) : (
                      <Link href={`/${subItem.slug}`} className="dropdown-link">
                        {subItem.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .navigation {
          position: relative;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          cursor: pointer;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #0066cc;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          list-style: none;
          margin: 0;
          padding: 0.5rem 0;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          z-index: 1000;
        }

        .dropdown-active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          margin: 0;
        }

        .dropdown-link {
          display: block;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: #333;
          transition: background-color 0.2s;
        }

        .dropdown-link:hover {
          background-color: #f5f5f5;
          color: #0066cc;
        }
      `}</style>
    </nav>
  )
}