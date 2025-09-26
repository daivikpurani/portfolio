import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaDatabase, FaCloud, FaRocket, FaUsers, FaChartLine } from 'react-icons/fa';
import { personalInfo, experience, education, certifications } from '../data/portfolioData';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { icon: <FaCode />, number: '50+', label: 'Projects Completed' },
    { icon: <FaDatabase />, number: '10+', label: 'Database Systems' },
    { icon: <FaCloud />, number: '5+', label: 'Cloud Certifications' },
    { icon: <FaRocket />, number: '3+', label: 'Years Experience' }
  ];

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

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          ref={ref}
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="about-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Passionate about building scalable systems and solving complex data challenges
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="about-card">
                <h3>My Story</h3>
                <p>{personalInfo.summary}</p>
                <p>
                  I specialize in designing and implementing robust database systems, 
                  building scalable backend services, and creating intuitive user interfaces. 
                  My passion lies in solving complex technical challenges and delivering 
                  high-quality solutions that make a real impact.
                </p>
                <div className="about-highlights">
                  <div className="highlight-item">
                    <FaUsers className="highlight-icon" />
                    <div>
                      <h4>Team Collaboration</h4>
                      <p>Experienced in leading cross-functional teams and mentoring junior developers</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <FaChartLine className="highlight-icon" />
                    <div>
                      <h4>Performance Optimization</h4>
                      <p>Expertise in optimizing database queries and improving system performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="about-timeline" variants={itemVariants}>
            <h3>Professional Journey</h3>
            <div className="timeline">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{exp.position}</h4>
                      <span className="timeline-company">{exp.company}</span>
                      <span className="timeline-duration">{exp.duration}</span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                    <ul className="timeline-achievements">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="about-education" variants={itemVariants}>
            <h3>Education & Certifications</h3>
            <div className="education-grid">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-card"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 + 1 }}
                >
                  <h4>{edu.degree}</h4>
                  <p className="education-school">{edu.school}</p>
                  <p className="education-year">{edu.year} • GPA: {edu.gpa}</p>
                  <div className="education-courses">
                    <h5>Relevant Courses:</h5>
                    <div className="course-tags">
                      {edu.relevant_courses.map((course, idx) => (
                        <span key={idx} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="certifications">
              <h4>Certifications</h4>
              <div className="cert-grid">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="cert-card"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 + 1.2 }}
                  >
                    <h5>{cert.name}</h5>
                    <p>{cert.issuer}</p>
                    <span className="cert-year">{cert.year}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
