import React, { useState, useEffect } from 'react'
import personImage from '../assets/ml2.png'
import resumePDF from '../assets/omar faraji cv en-1.pdf'
import SynthwaveCanyonShaders from './SynthwaveCanyonShaders'

export default function About() {
  const [showStory, setShowStory] = useState(false)

  useEffect(() => {
    if (showStory) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showStory])

  return (
    <section id="about" className="section about-section" style={{ position: 'relative', overflow: 'hidden', margin: '0 -7px' }}>
      {/* Synthwave Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <SynthwaveCanyonShaders 
          speed={0.5}
          flightHeight={1.0}
          crtEffect={false}
          terrainDepth={20}
        />
      </div>
      
      <div className="about-container" style={{ position: 'relative', zIndex: 1, margin: '0 5rem' }}>
        {/* Left: Title and social */}
        <div className="about-left">
          <h1>Omar<br />FARAJI</h1>
          <div className="accent-bar"></div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/omar-faraji-1b7274332/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.811 0-9.727h3.554v1.375c.427-.659 1.191-1.597 2.897-1.597 2.117 0 3.704 1.384 3.704 4.362v5.587zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.706 0-.955.771-1.706 1.956-1.706 1.184 0 1.915.75 1.938 1.706 0 .948-.754 1.706-1.979 1.706zm1.519 11.02H3.818V9.727h3.038v10.726zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <a href="https://github.com/FARAJI-Omar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href={resumePDF} download="Omar_Faraji_CV.pdf" className="resume-link" aria-label="Download Resume">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Center: Photo */}
        <div className="about-center about-image-wrapper">
         <div className='image-wraper'>
           <img 
            src={personImage} 
            alt="Omar Faraji" 
            className="about-image"
            style={{
              transform: 'scale(1.15)',
              clipPath: 'inset(0 0 0% 0 )'
            }}
          />
         </div>
        </div>

        {/* Right: Title, description, and CTA */}
        <div className="about-right">
          <h2>Full Stack developer</h2>
          <p className="about-description">
            Full Stack Web Developer with a passion for crafting clean, 
            modern, and unique digital experiences.          </p>
          <a href="#" className="my-story" onClick={(e) => { e.preventDefault(); setShowStory(true); }}>My Story →</a>
        </div>
      </div>

      {/* Story Modal */}
      {showStory && (
        <>
          <div className="story-overlay" onClick={() => setShowStory(false)}></div>
          <div className="story-modal">
            <button className="story-close" onClick={() => setShowStory(false)}>×</button>
            {/* <h3>Academic Career</h3> */}
            
            <div className="career-timeline">
              <div className="career-item career-item-1">
                <div className="career-year">2017 - 2020</div>
                <h4 className="career-title">Bachelor's Degree Biologie Chimie Geology</h4>
                <p className="career-school">Faculty of Sciences and Techniques - Al-Hoceima</p>
             
              </div>

              <div className="career-item career-item-2">
                <div className="career-year">2021 - 2024</div>
                <h4 className="career-title">Master's Degree in Coastal engineering: Coastal dynamics and natural hazards.</h4>
                <p className="career-school">Faculty of Sciences and Techniques - Al-Hoceima</p>
              
              </div>

              <div className="career-item career-item-3">
                <div className="career-year">2024 - 2026</div>
                <h4 className="career-title">Web&Mobile Developement</h4>
                <p className="career-school">Youcode UMP6 - Nador</p>

              </div>

              
              <div className="career-item career-item-3">
                <div className="career-year">2025 May - 2025 September</div>
                <h4 className="career-title">Internship</h4>
                <p className="career-school">EHC group - Meknes</p>
                <p className="careerdescription">
                  Design and development of an internal recruitment platform (“The Recruiter”), from needs analysis to the creation of a functional application.                
                </p>
                <p className="careerdescription">
                  React , TypeScript et Tailwind CSS, Java Spring Boot, Spring Security (JWT) et MySQL                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
