import React, { useState, useEffect } from 'react'
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

function App() {
  // Full version is always the default
  const [isMinimal, setIsMinimal] = useState(false);

  // Save state to localStorage (but don't load it - always default to full version)
  useEffect(() => {
    localStorage.setItem('heroVersion', isMinimal ? 'minimal' : 'standard');
  }, [isMinimal]);

  // Expose toggle function globally for Header
  useEffect(() => {
    window.toggleHeroVersion = () => {
      setIsMinimal(prev => !prev);
    };
    window.getHeroVersion = () => (isMinimal ? 'minimal' : 'standard');
  }, [isMinimal]);

  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <ThemeToggle />
        <Header isMinimal={isMinimal} />
        {isMinimal ? <HeroMinimal /> : <Hero />}
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
