import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Hero from './components/HeroOriginal'
import HeroMinimal from './components/HeroMinimal'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import ParticleBackground from './components/ParticleBackground'
import './AppToggle.css'

function AppToggle() {
  const [useMinimal, setUseMinimal] = useState(true)

  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <ThemeToggle />
        
        {/* Version Toggle */}
        <div className="version-toggle">
          <button 
            className={`toggle-btn ${!useMinimal ? 'active' : ''}`}
            onClick={() => setUseMinimal(false)}
            aria-label="Switch to original design"
          >
            Original
          </button>
          <button 
            className={`toggle-btn ${useMinimal ? 'active' : ''}`}
            onClick={() => setUseMinimal(true)}
            aria-label="Switch to minimal design"
          >
            Minimal
          </button>
        </div>

        <Header />
        {useMinimal ? <HeroMinimal /> : <Hero />}
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default AppToggle
