import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import ResumeViewer from './ResumeViewer';
import './HeroMinimal.css';

const HeroMinimal = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const containerRef = useRef(null);

  const roles = [
    'Software Engineer',
    'Distributed Systems Expert',
    'AWS TimestreamDB',
    'Backend Architect'
  ];

  // Motion values for cursor tracking with optimized springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.8 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // Optimized mouse tracking with throttling for 60fps
  useEffect(() => {
    let animationFrame;
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime >= throttleDelay) {
        lastTime = now;
        
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          mouseX.set(x);
          mouseY.set(y);
          
          // Create ripple effect with optimized timing
          const newRipple = {
            id: Date.now() + Math.random(),
            x: x,
            y: y,
            timestamp: Date.now()
          };
          
          setRipples(prev => [...prev.slice(-3), newRipple]);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [mouseX, mouseY]);

  // Optimized cleanup for old ripples
  useEffect(() => {
    const cleanup = setInterval(() => {
      setRipples(prev => prev.filter(ripple => Date.now() - ripple.timestamp < 1500));
    }, 200); // Less frequent cleanup for better performance

    return () => clearInterval(cleanup);
  }, []);


  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleClick = (action) => {
    switch (action) {
      case 'projects':
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'contact':
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'resume':
        setIsResumeViewerOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <section 
      id="home" 
      className="hero-minimal"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced Background */}
      <div className="minimal-background">
        {/* Water-like gradient background */}
        <div className="water-background" />
        
        {/* Optimized Animated geometric shapes */}
        <motion.div
          className="shape-circle"
          style={{
            x: useTransform(springX, [0, 1000], [-20, 20]),
            y: useTransform(springY, [0, 800], [-15, 15]),
          }}
          animate={{
            scale: isHovering ? 1.1 : 1,
            opacity: isHovering ? 0.1 : 0.06,
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        />
        
        <motion.div
          className="shape-line"
          style={{
            rotate: useTransform(springX, [0, 1000], [-8, 8]),
            scaleX: useTransform(springY, [0, 800], [0.95, 1.05]),
          }}
          animate={{
            opacity: isHovering ? 0.2 : 0.12,
            scaleX: isHovering ? 1.1 : 1,
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        />
        
        {/* Optimized Floating particles */}
        <div className="floating-particles">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                left: `${25 + i * 20}%`,
                top: `${35 + (i % 2) * 25}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Optimized Cursor Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ 
            scale: [0, 1.2, 2.5], 
            opacity: [0.9, 0.6, 0] 
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.4, 1]
          }}
        />
      ))}

      {/* Optimized Cursor Glow Effect */}
      <motion.div
        className="cursor-glow"
        style={{
          x: useTransform(springX, (value) => value - 25),
          y: useTransform(springY, (value) => value - 25),
        }}
        animate={{
          opacity: isHovering ? 0.7 : 0.4,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ 
          duration: 0.2, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      />

      {/* Main Content */}
      <div className="minimal-content">
        {/* Name */}
        <motion.h1
          className="minimal-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Dynamic Role */}
        <motion.div
          className="minimal-role"
          key={currentRole}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {roles[currentRole]}
        </motion.div>

        {/* Subtle Description */}
        <motion.p
          className="minimal-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Building distributed systems at scale
        </motion.p>

        {/* Interactive Actions */}
        <motion.div
          className="minimal-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="action-item"
            onClick={() => handleClick('projects')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick('projects');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="View my projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="action-text">View Work</span>
            <div className="action-line" />
          </motion.div>

          <motion.div
            className="action-item"
            onClick={() => handleClick('contact')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick('contact');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Get in touch"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="action-text">Get in Touch</span>
            <div className="action-line" />
          </motion.div>

          <motion.div
            className="action-item"
            onClick={() => handleClick('resume')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick('resume');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="View resume"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="action-text">View Resume</span>
            <div className="action-line" />
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="minimal-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub Profile"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="social-icon" />
          </motion.a>
          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn Profile"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="social-icon" />
          </motion.a>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="social-link"
            aria-label="Send Email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope className="social-icon" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="minimal-scroll"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="scroll-dot" />
      </motion.div>

      {/* Resume Viewer */}
      <ResumeViewer 
        isOpen={isResumeViewerOpen} 
        onClose={() => setIsResumeViewerOpen(false)} 
      />
    </section>
  );
};

export default HeroMinimal;
