import React, { useState } from 'react'
import frontIcon from '../assets/front.png'
import backendIcon from '../assets/backend.png'
import designIcon from '../assets/design.png'

// Carousel 1 icons
import bootstrapIcon from '../assets/carossel1/Bootstrap.png'
import cssIcon from '../assets/carossel1/css.png'
import figmaIcon from '../assets/carossel1/figma.png'
import gitIcon from '../assets/carossel1/git.png'
import githubIcon from '../assets/carossel1/github.png'
import htmlIcon from '../assets/carossel1/html.png'
import intellijIcon from '../assets/carossel1/IntelliJ_IDEA_Icon.svg.png'
import jsIcon from '../assets/carossel1/js.png'
import reactIcon from '../assets/carossel1/React.png'
import starumlIcon from '../assets/carossel1/Staruml_logo.png'
import swaggerIcon from '../assets/carossel1/Swagger-logo.png'
import tailwindIcon from '../assets/carossel1/Tailwind.png'
import vscodeIcon from '../assets/carossel1/Visual_Studio_Code_1.35_icon.svg.png'
import viteIcon from '../assets/carossel1/vite$.png'

// Carousel 2 icons
import dockerIcon from '../assets/carossel2/dpcker.png'
import jakartaIcon from '../assets/carossel2/jakarta.png'
import javaIcon from '../assets/carossel2/java.png'
import laravelIcon from '../assets/carossel2/laravel.png'
import mysqlIcon from '../assets/carossel2/mysql.png'
import phpIcon from '../assets/carossel2/php.png'
import postmanIcon from '../assets/carossel2/postman-logo-icon-hd.png'
import springBootIcon from '../assets/carossel2/spring-boot.png'
import springSecurityIcon from '../assets/carossel2/spring-security.png'
import springIcon from '../assets/carossel2/spring.png'
import springAiIcon from '../assets/carossel2/spring_ai.png'
import sqlIcon from '../assets/carossel2/sql.png'
import angularIcon from '../assets/carossel2/angular.png'

const carousel1Icons = [
  { name: 'Bootstrap', icon: bootstrapIcon },
  { name: 'CSS', icon: cssIcon },
  { name: 'Figma', icon: figmaIcon },
  { name: 'Git', icon: gitIcon },
  { name: 'GitHub', icon: githubIcon },
  { name: 'HTML', icon: htmlIcon },
  { name: 'IntelliJ', icon: intellijIcon },
  { name: 'JavaScript', icon: jsIcon },
  { name: 'React', icon: reactIcon },
  { name: 'StarUML', icon: starumlIcon },
  { name: 'Swagger', icon: swaggerIcon },
  { name: 'Tailwind', icon: tailwindIcon },
  { name: 'VS Code', icon: vscodeIcon },
  { name: 'Vite', icon: viteIcon },
]

const carousel2Icons = [
  { name: 'Docker', icon: dockerIcon },
  { name: 'Jakarta EE', icon: jakartaIcon },
  { name: 'Java', icon: javaIcon },
  { name: 'Laravel', icon: laravelIcon },
  { name: 'MySQL', icon: mysqlIcon },
  { name: 'PHP', icon: phpIcon },
  { name: 'Postman', icon: postmanIcon },
  { name: 'Spring Boot', icon: springBootIcon },
  { name: 'Spring Security', icon: springSecurityIcon },
  { name: 'Spring', icon: springIcon },
  { name: 'Spring AI', icon: springAiIcon },
  { name: 'SQL', icon: sqlIcon },
  { name: 'Angular', icon: angularIcon }
]

const frontendTechs = [
  'HTML',
  'CSS',
  'Tailwind',
  'Bootstrap',
  'ShadcnUI',
  'JavaScript',
  'TypeScript',
  'React',
  'Angular'
]

const backendTechs = [
  'PHP',
  'Laravel',
  'Java',
  'JEE',
  'Spring Boot',
  'MySQL',
  'PostgreSQL',
  'Postman',
  'Swagger'
]

const designTechs = [
  'StarUML',
  'Figma',
  'Photoshop',
  'Git',
  'GitHub',
  'Docker',
  'GitHub Actions',
  'Jenkins'
]

export default function Services() {
  const [expandedBox, setExpandedBox] = useState(null)

  const handleBoxClick = (index) => {
    setExpandedBox(expandedBox === index ? null : index)
  }

  return (
    <section id="services" className="section services-section">
      <div className="services-container">
        {/* Carousels at Top */}
        <div className="carousels-wrapper">
          {/* Top Carousel */}
          <div className="tech-carousel carousel-1">
            <div className="carousel-track">
              {carousel1Icons.map((tech, idx) => (
                <div key={`top-${idx}`} className="carousel-item">
                  <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
                </div>
              ))}
              {carousel1Icons.map((tech, idx) => (
                <div key={`top-clone-${idx}`} className="carousel-item">
                  <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Carousel */}
          <div className="tech-carousel carousel-2">
            <div className="carousel-track">
              {carousel2Icons.map((tech, idx) => (
                <div key={`bottom-${idx}`} className="carousel-item">
                  <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
                </div>
              ))}
              {carousel2Icons.map((tech, idx) => (
                <div key={`bottom-clone-${idx}`} className="carousel-item">
                  <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Boxes at Bottom */}
        <div className="services-boxes">
          <div 
            className={`service-box yellow-box ${expandedBox === 0 ? 'expanded' : ''}`}
            onClick={() => handleBoxClick(0)}
          >
            <div className="box-content">
              <img src={frontIcon} alt="Frontend" className="box-icon" />
              <div className="box-text">
                <h3 className="box-title">Frontend Development</h3>
                <p className="box-description">
                    I build modern, responsive, and user-friendly interfaces using clean code 
                    and strong design principles. My goal is to turn ideas into smooth, 
                    fast, and visually appealing web experiences that work perfectly 
                    on all devices.
                </p>
                {expandedBox === 0 && (
                  <div className="tech-tags">
                    {frontendTechs.map((tech, idx) => (
                      <div key={idx} className="tech-tag">
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div 
            className={`service-box grey-box ${expandedBox === 1 ? 'expanded' : ''}`}
            onClick={() => handleBoxClick(1)}
          >
            <div className="box-content">
              <img src={backendIcon} alt="Backend" className="box-icon" />
              <div className="box-text">
                <h3 className="box-title">Backend Development</h3>
                <p className="box-description">
                    I develop secure, scalable, and efficient backend systems that 
                    power your application’s logic and data. From APIs to databases, 
                    I ensure everything runs smoothly, reliably, and handles real-world needs.
                </p>                {expandedBox === 1 && (
                  <div className="tech-tags">
                    {backendTechs.map((tech, idx) => (
                      <div key={idx} className="tech-tag">
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                )}              </div>
            </div>
          </div>
          <div 
            className={`service-box grey-box ${expandedBox === 2 ? 'expanded' : ''}`}
            onClick={() => handleBoxClick(2)}
          >
            <div className="box-content">
              <img src={designIcon} alt="Design" className="box-icon" />
              <div className="box-text">
                <h3 className="box-title">Project Conception & Management</h3>
                <div className="box-description">
                  <ul className="service-points">
                    <li>Project conception, specifications and System Analysis & Design Diagrams</li>
                    <li>Application design</li>
                    <li>DevOps: Automating deployment, continuous integration, and infrastructure management for reliable and efficient software delivery</li>
                  </ul>
                </div>
                {expandedBox === 2 && (
                  <div className="tech-tags">
                    {designTechs.map((tech, idx) => (
                      <div key={idx} className="tech-tag">
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlay */}
        {expandedBox !== null && (
          <div className="services-overlay" onClick={() => setExpandedBox(null)}></div>
        )}
      </div>
    </section>
  )
}
