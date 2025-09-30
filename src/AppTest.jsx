import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import HeroMinimal from './components/HeroMinimal'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import ParticleBackground from './components/ParticleBackground'
import './AppTest.css'

function AppTest() {
  const [showMinimal, setShowMinimal] = useState(false)

  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <ThemeToggle />
        
        {/* Version Toggle */}
        <div className="version-toggle">
          <button 
            className={`toggle-btn ${!showMinimal ? 'active' : ''}`}
            onClick={() => setShowMinimal(false)}
          >
            Original
          </button>
          <button 
            className={`toggle-btn ${showMinimal ? 'active' : ''}`}
            onClick={() => setShowMinimal(true)}
          >
            Minimal
          </button>
        </div>

        <Header />
        {showMinimal ? <HeroMinimal /> : <Hero />}
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default AppTest
