import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaCloud, FaRocket, FaStar, FaCodeBranch, FaEye, FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import GitHubService from '../services/githubService';
import './Projects.css';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [githubStats, setGithubStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const githubService = new GitHubService('daivikpurani');

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      const [repos, profile] = await Promise.all([
        githubService.getRepositories(),
        githubService.getUserProfile()
      ]);

      if (repos) {
        const processedProjects = repos
          .filter(repo => !repo.fork && repo.name !== 'Portfolio') // Exclude forks and this portfolio
          .map(repo => githubService.processRepositoryData(repo))
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        setProjects(processedProjects);
      }

      if (profile) {
        setGithubStats({
          publicRepos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
          totalStars: repos ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) : 0
        });
      }
    } catch (err) {
      setError('Failed to fetch GitHub data');
      console.error('GitHub fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredAndSortedProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stars - a.stars;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'updated':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredAndSortedProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Database': return <FaDatabase />;
      case 'Machine Learning': return <FaCode />;
      case 'Web Development': return <FaRocket />;
      case 'Mobile Development': return <FaRocket />;
      case 'DevOps': return <FaCloud />;
      case 'Data Science': return <FaDatabase />;
      case 'Blockchain': return <FaCode />;
      default: return <FaCode />;
    }
  };

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

  const projectVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <div className="loading-container">
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FaCode />
            </motion.div>
            <p>Loading your amazing projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <div className="error-container">
            <h2>Unable to load projects</h2>
            <p>{error}</p>
            <button onClick={fetchGitHubData} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          ref={ref}
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="projects-header" variants={itemVariants}>
            <h2 className="section-title">GitHub Projects</h2>
            <p className="section-subtitle">
              Real-time showcase of my GitHub repositories with live stats and filtering
            </p>
            
            {githubStats && (
              <div className="github-stats">
                <div className="stat-item">
                  <FaCode />
                  <span>{githubStats.publicRepos} Repositories</span>
                </div>
                <div className="stat-item">
                  <FaStar />
                  <span>{githubStats.totalStars} Stars</span>
                </div>
                <div className="stat-item">
                  <FaEye />
                  <span>{githubStats.followers} Followers</span>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div className="projects-controls" variants={itemVariants}>
            <div className="search-filter-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-controls">
                <div className="filter-group">
                  <FaFilter />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="sort-group">
                  <FaSort />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="updated">Recently Updated</option>
                    <option value="stars">Most Stars</option>
                    <option value="name">Name A-Z</option>
                    <option value="created">Recently Created</option>
                  </select>
                </div>
                
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={`projects-grid ${viewMode}`} 
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {currentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={projectVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-category">
                        <span className="category-icon">{getCategoryIcon(project.category)}</span>
                        <span>{project.category}</span>
                      </div>
                      <div className="project-stats">
                        <div className="stat">
                          <FaStar />
                          <span>{project.stars}</span>
                        </div>
                        <div className="stat">
                          <FaCodeBranch />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                      <div className="project-actions">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-language">
                        {project.language}
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="tech-tag more">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                    
                    <div className="project-meta">
                      <span className="updated-date">
                        Updated {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div className="pagination" variants={itemVariants}>
              <div className="pagination-info">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProjects.length)} of {filteredAndSortedProjects.length} projects
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {filteredAndSortedProjects.length === 0 && (
            <motion.div className="no-projects" variants={itemVariants}>
              <FaCode className="no-projects-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </motion.div>
          )}

          <motion.div className="projects-cta" variants={itemVariants}>
            <p>Want to see more of my work?</p>
            <a
              href={`https://github.com/${githubService.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FaGithub />
              View All Projects on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-section">
                  <h2>{selectedProject.title}</h2>
                  <div className="modal-stats">
                    <div className="modal-stat">
                      <FaStar />
                      <span>{selectedProject.stars}</span>
                    </div>
                    <div className="modal-stat">
                      <FaCodeBranch />
                      <span>{selectedProject.forks}</span>
                    </div>
                    <div className="modal-stat">
                      <span className="language">{selectedProject.language}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
                
                <div className="modal-info">
                  <p className="modal-description">{selectedProject.longDescription}</p>
                  
                  <div className="modal-features">
                    <h4>Key Features</h4>
                    <ul>
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="modal-technologies">
                    <h4>Technologies Used</h4>
                    <div className="tech-tags">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-links">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <FaGithub />
                      View Code
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;