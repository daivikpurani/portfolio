import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaDatabase, FaTools, FaCloud } from 'react-icons/fa';
import { skills } from '../data/portfolioData';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = {
    languages: { icon: <FaCode />, label: 'Programming Languages', data: skills.languages },
    databases: { icon: <FaDatabase />, label: 'Databases', data: skills.databases },
    frameworks: { icon: <FaTools />, label: 'Frameworks & Libraries', data: skills.frameworks },
    tools: { icon: <FaCloud />, label: 'Tools & Technologies', data: skills.tools }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          ref={ref}
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="skills-header" variants={itemVariants}>
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-subtitle">
              Technologies and tools I work with to build amazing solutions
            </p>
          </motion.div>

          <motion.div className="skills-categories" variants={itemVariants}>
            <div className="category-tabs">
              {Object.entries(categories).map(([key, category]) => (
                <motion.button
                  key={key}
                  className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="tab-icon">{category.icon}</span>
                  <span className="tab-label">{category.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={containerVariants}
            key={activeCategory}
            initial="hidden"
            animate="visible"
          >
            {categories[activeCategory].data.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={skillVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <div className="skill-header">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category">{skill.category}</span>
                </div>
                
                <div className="skill-progress">
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                  <span className="progress-text">{skill.level}%</span>
                </div>

                <div className="skill-level">
                  {skill.level >= 90 && <span className="level-expert">Expert</span>}
                  {skill.level >= 70 && skill.level < 90 && <span className="level-advanced">Advanced</span>}
                  {skill.level >= 50 && skill.level < 70 && <span className="level-intermediate">Intermediate</span>}
                  {skill.level < 50 && <span className="level-beginner">Beginner</span>}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="skills-summary" variants={itemVariants}>
            <div className="summary-card">
              <h3>Technical Focus Areas</h3>
              <div className="focus-areas">
                <div className="focus-area">
                  <div className="focus-icon">
                    <FaDatabase />
                  </div>
                  <div className="focus-content">
                    <h4>Database Design & Optimization</h4>
                    <p>Expertise in PostgreSQL, MySQL, MongoDB, and Redis with focus on performance tuning and scalability</p>
                  </div>
                </div>
                <div className="focus-area">
                  <div className="focus-icon">
                    <FaCode />
                  </div>
                  <div className="focus-content">
                    <h4>Backend Development</h4>
                    <p>Building robust APIs and microservices using Python, Node.js, and modern frameworks</p>
                  </div>
                </div>
                <div className="focus-area">
                  <div className="focus-icon">
                    <FaCloud />
                  </div>
                  <div className="focus-content">
                    <h4>Cloud & DevOps</h4>
                    <p>Deploying scalable applications on AWS with Docker, Kubernetes, and CI/CD pipelines</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
