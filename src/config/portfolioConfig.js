// Portfolio Configuration
// Update these values to customize your portfolio

export const portfolioConfig = {
  // Personal Information
  personalInfo: {
    name: "Daivik Purani",
    title: "Software Engineer @ AWS TimestreamDB | Backend Engineer",
    email: "daivik.purani@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    github: "https://github.com/daivikpurani",
    linkedin: "https://linkedin.com/in/daivikpurani",
    website: "https://daivikpurani.dev",
    bio: "3+ years as a Backend Engineer — Built Kafka pipeline (150K+ events/day) infra saving $360K/year, and now working @ AWS TimestreamDB on Distributed Systems.",
    summary: "Experienced Software Engineer with 3+ years building scalable distributed systems. Currently working at Amazon Web Services on TimestreamDB, with proven expertise in Kafka pipelines, microservices architecture, and database optimization. Led development of systems processing 150K+ events/day and achieved $360K/year infrastructure savings."
  },

  // GitHub Configuration
  github: {
    username: "daivikpurani", // Replace with your GitHub username
    apiUrl: "https://api.github.com",
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    maxRepositories: 100
  },

  // Theme Configuration
  theme: {
    defaultMode: "light", // "light" or "dark"
    primaryColors: [
      { name: 'blue', color: '#2563eb' },
      { name: 'purple', color: '#7c3aed' },
      { name: 'green', color: '#059669' },
      { name: 'red', color: '#dc2626' },
      { name: 'orange', color: '#ea580c' },
      { name: 'pink', color: '#db2777' }
    ]
  },

  // Animation Configuration
  animations: {
    enableParticles: true,
    particleCount: "auto", // "auto" or number
    enableSmoothScrolling: true,
    animationDuration: 0.5,
    staggerDelay: 0.1
  },

  // Performance Configuration
  performance: {
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCodeSplitting: true,
    enableServiceWorker: true,
    enablePerformanceMonitoring: true
  },

  // SEO Configuration
  seo: {
    title: "Daivik Purani - Software Engineer Portfolio",
    description: "Portfolio showcasing database and software engineering projects by Daivik Purani",
    keywords: ["software engineer", "database specialist", "full stack developer", "portfolio"],
    ogImage: "/og-image.jpg",
    twitterCard: "summary_large_image"
  },

  // Contact Configuration
  contact: {
    enableForm: true,
    enableSocialLinks: true,
    enableLocation: true,
    formEndpoint: "/api/contact", // Replace with your form endpoint
    enableEmailValidation: true
  },

  // Blog Configuration
  blog: {
    enableBlog: true,
    maxPosts: 6,
    enableCategories: true,
    enableSearch: true,
    enableFeaturedPosts: true
  },

  // Analytics Configuration
  analytics: {
    enableGoogleAnalytics: false,
    googleAnalyticsId: "", // Replace with your GA ID
    enableHotjar: false,
    hotjarId: "" // Replace with your Hotjar ID
  }
};

export default portfolioConfig;
