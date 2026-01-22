import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
