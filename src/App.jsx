import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <ThemeToggle />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
