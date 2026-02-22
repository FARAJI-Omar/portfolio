import React, { useEffect, useState } from 'react'
import logoImage from '../assets/logo2.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const sections = ['about', 'services', 'projects', 'contact']

    // If user loaded a path like /projects, scroll to that section on load
    const path = window.location.pathname.replace(/^\//, '')
    if (path && sections.includes(path)) {
      const el = document.getElementById(path)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
        setActiveSection(path)
        window.history.replaceState(null, '', `/${path}`)
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Detect active section
      const scrollPos = window.scrollY + 100

      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            window.history.replaceState(null, '', `/${section}`)
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
          <button style={{ border: 'none', background: 'none', padding: 0 , cursor: 'pointer'}} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.replaceState(null, '', '/'); }} >
              <img src={logoImage} alt="Logo" className="logo-image" />
          </button>
        </div>
        <nav>
          {navLinks.map(link => (
            <a
              key={link}
              href={`/${link}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                e.preventDefault()
                const el = document.getElementById(link)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                window.history.replaceState(null, '', `/${link}`)
                setActiveSection(link)
              }}
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
