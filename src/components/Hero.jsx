import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaDatabase, FaAws, FaCloud, FaRocket, FaChartLine } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    'Software Engineer @ AWS',
    'TimestreamDB Specialist',
    'Distributed Systems Expert',
    'Cloud Infrastructure Architect'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === texts[textIndex]) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCurrentText(texts[textIndex].slice(0, currentText.length + 1));
        }
      } else {
        if (currentText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setCurrentText(currentText.slice(0, -1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex, texts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleDownloadResume = () => {
    // In a real application, this would download the actual resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Placeholder
    link.download = 'Daivik_Purani_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-shapes">
          <motion.div
            className="shape shape-1"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="shape shape-2"
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="shape shape-3"
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            {/* AWS Badge */}
            <motion.div
              className="aws-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FaAws className="aws-icon" />
              <span>Currently at Amazon Web Services</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>
            
            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="typing-text">{currentText}</span>
              <span className="cursor">|</span>
            </motion.div>

            <motion.p
              className="hero-description"
              variants={itemVariants}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Key Achievements */}
            <motion.div
              className="hero-achievements"
              variants={itemVariants}
            >
              <div className="achievement-item">
                <FaChartLine className="achievement-icon" />
                <span>150K+ events/day processed</span>
              </div>
              <div className="achievement-item">
                <FaCloud className="achievement-icon" />
                <span>$360K annual savings</span>
              </div>
              <div className="achievement-item">
                <FaRocket className="achievement-icon" />
                <span>99.99% uptime achieved</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-buttons"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FaCode />
                View My Work
              </motion.a>
              
              <motion.button
                className="btn btn-secondary"
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Download Resume
              </motion.button>
            </motion.div>

            <motion.div
              className="hero-social"
              variants={itemVariants}
            >
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={`mailto:${personalInfo.email}`}>
                <FaEnvelope />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image"
            variants={itemVariants}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="image-container">
              <div className="image-placeholder">
                <FaAws className="placeholder-icon" />
              </div>
              <div className="image-overlay">
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  <span>Building at AWS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
