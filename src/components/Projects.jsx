import React, { useState, useEffect, useRef } from 'react'

// TastyKing assets
import tastyKingVideo from '../assets/tastyking/1226.mp4'
import tastyKingMain from '../assets/tastyking/tastykingmain.png'
import tastyKing1 from '../assets/tastyking/screenshot1.png'
import tastyKing2 from '../assets/tastyking/screenshot2.png'
import tastyKing3 from '../assets/tastyking/screenshot3.png'
import tastyKing4 from '../assets/tastyking/screenshot4.png'
import tastyKing5 from '../assets/tastyking/screenshot5.png'
import tastyKing6 from '../assets/tastyking/screenshot6.png'
import tastyKing7 from '../assets/tastyking/screenshot7.png'
import tastyKing8 from '../assets/tastyking/screenshot8.png'
import tastyKing9 from '../assets/tastyking/screenshot9.png'

// Tricol assets
import tricolMain from '../assets/tricol/tricol-main-image.png'
import tricol1 from '../assets/tricol/Capture d’écran 2025-12-30 102356.png'
import tricol2 from '../assets/tricol/Capture d’écran 2025-12-30 102452.png'
import tricol3 from '../assets/tricol/Capture d’écran 2025-12-30 102901.png'
import tricol4 from '../assets/tricol/Capture d’écran 2025-12-30 102937.png'
import tricol5 from '../assets/tricol/Capture d’écran 2025-12-30 110148.png'
import tricol6 from '../assets/tricol/Capture d’écran 2025-12-30 110237.png'
import tricol7 from '../assets/tricol/Capture d’écran 2025-12-30 110303.png'
// MoneyMind assets
import moneyMindMain from '../assets/moneymind/moneymind-img.png'
import moneyMindVideo from '../assets/moneymind/moneymind1.mp4'
const projects = [
  { 
    title: 'MoneyMind - Personal Finance Management',
    description: 'A comprehensive personal finance management application that helps users track their expenses, manage budgets, and gain insights into their spending habits. MoneyMind provides intuitive tools for financial planning and monitoring, making it easier to achieve financial goals and maintain healthy spending patterns.',
    features: [
      'Expense tracking and categorization',
      'Budget creation and monitoring',
      'Financial reports and insights',
      'Spending pattern analysis',
      'Goal setting and progress tracking',
      'Multi-currency support'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    mainImage: moneyMindMain,
    video: moneyMindVideo
  },
  { 
    title: 'Tricol Supplier Order and Stock Management System',
    description: 'Supplier Order and Stock Management built in Java/Spring Boot, projectTricol manages supplier orders, receptions and lot-based FIFO stock valuation, Tricol records inbound lots with lot number, entry date, quantity and unit purchase price, Tricol enforces FIFO consumption on exit slips and links every movement to orders and lots, Tricol provides REST endpoints to create/read/update/delete suppliers, products, orders and exit-slips, Tricol supports stock consultation, movement history and low-stock alerts.',
    features: [
      'Supplier management (CRUD, search, contact & company details, ICE)',
      'Product management (CRUD, stock view, low-stock alerts, reorder point)',
      'Supplier orders lifecycle and reception (PENDING → VALIDATED → DELIVERED; reception generates lots)',
      'Exit slips and FIFO consumption (draft/validate/cancel, automatic FIFO outflows, traceability to lots/orders)'
    ],
    technologies: ['Maven', 'Spring Boot', 'JPA / Hibernate', 'Liquibase', 'MapStruct', 'Jakarta Validation', 'MySQL'],
    mainImage: tricolMain,
    images: [tricolMain, tricol1, tricol2, tricol3, tricol4, tricol5, tricol6, tricol7]
  },
  { 
    title: 'TastyKing - Food Ordering Platform',
    description: 'A food ordering platform designed to connect customers with a variety of meals and restaurants. It streamlines the process of browsing menus, placing orders, and managing user accounts, providing a seamless and user-friendly experience. The platform supports both customer and administrative functionalities for efficient order and menu management.',
    features: [
      'User registration, authentication, and profile management',
      'Browsing and searching for meals by category',
      'Shopping cart and order placement system',
      'Order history and review functionality',
      'Administrative tools for managing meals, categories, and orders',
      'Secure payment and session management'
    ],
    technologies: ['Laravel', 'MySQL', 'MySQL', 'Vite', 'HTML', 'CSS', 'JavaScript'],
    mainImage: tastyKingMain,
    video: tastyKingVideo,
    images: [tastyKing1, tastyKing2, tastyKing3, tastyKing4, tastyKing5, tastyKing6, tastyKing7, tastyKing8, tastyKing9]
  }
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsPlaying(false)
    setIsMuted(true)
    setShowVideo(true)
  }

  const handleClose = () => {
    setSelectedProject(null)
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handlePrevImage = () => {
    if (showVideo) {
      // If showing video, go to last image
      const maxIndex = selectedProject?.images?.length || 0
      setCurrentImageIndex(maxIndex - 1)
      setShowVideo(false)
    } else if (currentImageIndex === 0 && selectedProject?.video) {
      // If at first image and video exists, go to video
      setShowVideo(true)
    } else {
      // Otherwise navigate to previous image
      const maxIndex = selectedProject?.images?.length || 0
      setCurrentImageIndex((prev) => prev - 1)
      setShowVideo(false)
    }
  }

  const handleNextImage = () => {
    if (showVideo) {
      // If showing video, go to first image
      setCurrentImageIndex(0)
      setShowVideo(false)
    } else {
      const maxIndex = selectedProject?.images?.length || 0
      if (currentImageIndex === maxIndex - 1 && selectedProject?.video) {
        // If at last image and video exists, go to video
        setShowVideo(true)
      } else if (currentImageIndex === maxIndex - 1) {
        // If at last image without video, loop to first
        setCurrentImageIndex(0)
      } else {
        // Otherwise navigate to next image
        setCurrentImageIndex((prev) => prev + 1)
      }
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-container">
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card" onClick={() => handleProjectClick(project)}>
              <div 
                className="project-image"
                style={
                  project.mainImage 
                    ? { 
                        backgroundImage: `url(${project.mainImage})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      } 
                    : {}
                }
              ></div>
              <h3 className="project-title">{project.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <>
          <div className="project-detail-overlay" onClick={handleClose}></div>
          <div className="project-detail-modal">
            <button className="project-close" onClick={handleClose}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <h2 className="project-detail-title">{selectedProject.title}</h2>

            <div className="project-detail-content">
              {/* Image/Video Gallery */}
              <div className="project-gallery">
                <div className="gallery-main">
                  {selectedProject.video && showVideo ? (
                    <div className="video-container" ref={videoContainerRef}>
                      <video 
                        ref={videoRef}
                        src={selectedProject.video}
                        className="project-video"
                        muted={isMuted}
                        onClick={togglePlay}
                      />
                      <div className="video-controls">
                        <button className="video-control-btn" onClick={togglePlay}>
                          {isPlaying ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          )}
                        </button>
                        <button className="video-control-btn" onClick={toggleMute}>
                          {isMuted ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                          )}
                        </button>
                        <button className="video-control-btn" onClick={toggleFullscreen}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="gallery-main-image"
                      style={{
                        backgroundImage: selectedProject.images ? `url(${selectedProject.images[currentImageIndex]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => setImageFullscreen(true)}
                    >
                    </div>
                  )}
                </div>
                {selectedProject.images && (
                  <div className="gallery-thumbnails">
                    <button className="gallery-nav-small gallery-nav-left" onClick={handlePrevImage}>‹</button>
                    {selectedProject.video && (
                      <div 
                        className={`gallery-thumbnail ${showVideo ? 'active' : ''}`}
                        onClick={() => setShowVideo(true)}
                        style={{ 
                          backgroundImage: `url(${selectedProject.mainImage})`,
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none'
                        }}>
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'}}>
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    {selectedProject.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`gallery-thumbnail ${currentImageIndex === idx && !showVideo ? 'active' : ''}`}
                        onClick={() => { setCurrentImageIndex(idx); setShowVideo(false); }}
                        style={{ backgroundImage: `url(${img})` }}
                      ></div>
                    ))}
                    <button className="gallery-nav-small gallery-nav-right" onClick={handleNextImage}>›</button>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="project-info">
                <div className="project-description">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.description}</p>
                  
                  <h4>Key features</h4>
                  <ul>
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-technologies">
                  <h4>Technologies</h4>
                  <ul>
                    {selectedProject.technologies.map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                  {/* Add GitHub links for Tasty King and Tricol */}
                  {selectedProject.title === 'TastyKing - Food Ordering Platform' && (
                    <a
                      href="https://github.com/FARAJI-Omar/Tasty-King"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', marginTop: '12px', color: '#4078c0', fontWeight: 'bold' }}
                    >
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.title === 'Tricol Supplier Order and Stock Management System' && (
                    <a
                      href="https://github.com/FARAJI-Omar/Tricol-API-V2"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', marginTop: '12px', color: '#4078c0', fontWeight: 'bold' }}
                    >
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen Image Gallery */}
      {imageFullscreen && selectedProject && (
        <>
          <div className="fullscreen-overlay" onClick={() => setImageFullscreen(false)}></div>
          <div className="fullscreen-gallery">
            <button className="fullscreen-close" onClick={() => setImageFullscreen(false)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <button className="fullscreen-nav fullscreen-nav-prev" onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <div 
              className="fullscreen-image"
              style={{
                backgroundImage: selectedProject.images ? `url(${selectedProject.images[currentImageIndex]})` : 'none'
              }}
              onClick={(e) => e.stopPropagation()}
            ></div>
            <button className="fullscreen-nav fullscreen-nav-next" onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </section>
  )
}
