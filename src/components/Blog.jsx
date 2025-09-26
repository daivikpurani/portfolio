import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaCode, FaDatabase, FaRocket } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Database Systems: A Deep Dive",
      excerpt: "Learn how to design and implement high-performance database systems that can handle millions of transactions per second.",
      content: "In this comprehensive guide, we explore the architecture patterns, optimization techniques, and best practices for building scalable database systems...",
      author: "Daivik Purani",
      date: "2024-01-15",
      category: "Database",
      tags: ["PostgreSQL", "Scalability", "Performance"],
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Modern React Patterns for Enterprise Applications",
      excerpt: "Discover advanced React patterns and techniques that make your applications more maintainable and performant.",
      content: "React has evolved significantly over the years. In this article, we'll explore modern patterns like custom hooks, context optimization, and component composition...",
      author: "Daivik Purani",
      date: "2024-01-10",
      category: "Frontend",
      tags: ["React", "JavaScript", "Patterns"],
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Microservices Architecture: Lessons Learned",
      excerpt: "Real-world insights from building and maintaining microservices at scale.",
      content: "Microservices offer many benefits but also introduce complexity. Here are the key lessons learned from implementing microservices architecture...",
      author: "Daivik Purani",
      date: "2024-01-05",
      category: "Architecture",
      tags: ["Microservices", "Docker", "Kubernetes"],
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Machine Learning Pipeline Optimization",
      excerpt: "How to optimize ML pipelines for production environments and improve model performance.",
      content: "Building ML models is just the beginning. This article covers optimization techniques for production ML pipelines...",
      author: "Daivik Purani",
      date: "2024-01-01",
      category: "Machine Learning",
      tags: ["Python", "MLOps", "Optimization"],
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Cloud Security Best Practices",
      excerpt: "Essential security practices for cloud-native applications and infrastructure.",
      content: "Security in the cloud requires a different approach. Learn about the essential practices for securing cloud applications...",
      author: "Daivik Purani",
      date: "2023-12-28",
      category: "Security",
      tags: ["AWS", "Security", "DevOps"],
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "Database Performance Tuning Techniques",
      excerpt: "Advanced techniques for optimizing database performance and reducing query response times.",
      content: "Database performance is crucial for application success. This guide covers advanced tuning techniques...",
      author: "Daivik Purani",
      date: "2023-12-20",
      category: "Database",
      tags: ["SQL", "Performance", "Optimization"],
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      featured: true
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Database': return <FaDatabase />;
      case 'Frontend': return <FaCode />;
      case 'Architecture': return <FaRocket />;
      case 'Machine Learning': return <FaCode />;
      case 'Security': return <FaRocket />;
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

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <motion.div
          ref={ref}
          className="blog-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="blog-header" variants={itemVariants}>
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">
              Insights, tutorials, and thoughts on software engineering and database systems
            </p>
          </motion.div>

          <motion.div className="blog-filters" variants={itemVariants}>
            <div className="category-tabs">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="tab-icon">{getCategoryIcon(category)}</span>
                  <span className="tab-label">{category}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {selectedCategory === 'All' && (
            <motion.div className="featured-posts" variants={itemVariants}>
              <h3>Featured Articles</h3>
              <div className="featured-grid">
                {featuredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    className="blog-card featured"
                    whileHover={{ scale: 1.02, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="card-image">
                      <img src={post.image} alt={post.title} />
                      <div className="card-overlay">
                        <span className="featured-badge">Featured</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="category">
                          <span className="category-icon">{getCategoryIcon(post.category)}</span>
                          {post.category}
                        </span>
                        <span className="read-time">{post.readTime}</span>
                      </div>
                      <h3 className="card-title">{post.title}</h3>
                      <p className="card-excerpt">{post.excerpt}</p>
                      <div className="card-tags">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="card-footer">
                        <div className="author-info">
                          <FaUser />
                          <span>{post.author}</span>
                        </div>
                        <div className="date-info">
                          <FaCalendarAlt />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="read-more-btn">
                        Read More <FaArrowRight />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div className="blog-grid" variants={containerVariants}>
            {regularPosts.map((post) => (
              <motion.article
                key={post.id}
                className="blog-card"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span className="category">
                      <span className="category-icon">{getCategoryIcon(post.category)}</span>
                      {post.category}
                    </span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-excerpt">{post.excerpt}</p>
                  <div className="card-tags">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="tag more">+{post.tags.length - 2}</span>
                    )}
                  </div>
                  <div className="card-footer">
                    <div className="author-info">
                      <FaUser />
                      <span>{post.author}</span>
                    </div>
                    <div className="date-info">
                      <FaCalendarAlt />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="read-more-btn">
                    Read More <FaArrowRight />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div className="blog-cta" variants={itemVariants}>
            <h3>Stay Updated</h3>
            <p>Subscribe to get notified about new articles and insights</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
