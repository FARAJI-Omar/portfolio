import React, { useEffect, useState } from 'react'
import logoImage from '../assets/logo2.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Detect active section
      const sections = ['about', 'services', 'projects', 'contact']
      const scrollPos = window.scrollY + 100

      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['about', 'services', 'projects', 'contact']

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}` }>
      <div className="nav-inner">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <nav>
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link}`}
              className={`nav-link ${activeSection === link ? 'active' : ''}`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
              {activeSection === link && <span className="nav-dot"></span>}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
