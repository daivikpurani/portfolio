import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import HeroMinimal from './components/HeroMinimal'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import ParticleBackground from './components/ParticleBackground'

function AppMinimal() {
  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <ThemeToggle />
        <Header />
        <HeroMinimal />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default AppMinimal
