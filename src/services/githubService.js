// GitHub API service for fetching repositories and user data
export class GitHubService {
  constructor(username) {
    this.username = username;
    this.baseUrl = 'https://api.github.com';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async fetchWithCache(url, cacheKey) {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('GitHub API Error:', error);
      return null;
    }
  }

  async getUserProfile() {
    return await this.fetchWithCache(
      `${this.baseUrl}/users/${this.username}`,
      'user-profile'
    );
  }

  async getRepositories() {
    return await this.fetchWithCache(
      `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`,
      'repositories'
    );
  }

  async getRepositoryLanguages(repoName) {
    return await this.fetchWithCache(
      `${this.baseUrl}/repos/${this.username}/${repoName}/languages`,
      `languages-${repoName}`
    );
  }

  async getRepositoryStats(repoName) {
    return await this.fetchWithCache(
      `${this.baseUrl}/repos/${this.username}/${repoName}/stats/contributors`,
      `stats-${repoName}`
    );
  }

  async getPinnedRepositories() {
    // GitHub doesn't have a direct API for pinned repos, so we'll use a workaround
    // by fetching recent repos and filtering by stars/activity
    const repos = await this.getRepositories();
    if (!repos) return [];

    return repos
      .filter(repo => !repo.fork && repo.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  }

  async getRepositoryReadme(repoName) {
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.username}/${repoName}/readme`
      );
      if (!response.ok) return null;
      
      const data = await response.json();
      // Decode base64 content
      return atob(data.content);
    } catch (error) {
      console.error('Error fetching README:', error);
      return null;
    }
  }

  // Process repository data for portfolio display
  processRepositoryData(repo) {
    const languages = this.extractLanguages(repo);
    const category = this.categorizeRepository(repo);
    
    return {
      id: repo.id,
      title: this.formatRepositoryName(repo.name),
      description: repo.description || 'No description available',
      longDescription: this.generateLongDescription(repo),
      image: this.getRepositoryImage(repo),
      technologies: languages,
      category: category,
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || this.extractLiveUrl(repo),
      features: this.extractFeatures(repo),
      challenges: this.generateChallenges(repo),
      impact: this.generateImpact(repo),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      size: repo.size,
      topics: repo.topics || []
    };
  }

  extractLanguages(repo) {
    const languages = [];
    if (repo.language) languages.push(repo.language);
    
    // Common technology mappings
    const techMap = {
      'JavaScript': ['React', 'Node.js', 'Express'],
      'TypeScript': ['React', 'Node.js', 'TypeScript'],
      'Python': ['Django', 'Flask', 'FastAPI'],
      'Java': ['Spring Boot', 'Maven'],
      'Go': ['Gin', 'Echo'],
      'C++': ['CMake', 'Boost'],
      'C#': ['.NET', 'ASP.NET'],
      'PHP': ['Laravel', 'Symfony'],
      'Ruby': ['Rails', 'Sinatra'],
      'Rust': ['Actix', 'Tokio'],
      'Swift': ['UIKit', 'SwiftUI'],
      'Kotlin': ['Android', 'Spring']
    };

    if (repo.language && techMap[repo.language]) {
      languages.push(...techMap[repo.language]);
    }

    return [...new Set(languages)]; // Remove duplicates
  }

  categorizeRepository(repo) {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const topics = (repo.topics || []).map(t => t.toLowerCase());

    // Database related
    if (name.includes('db') || name.includes('database') || 
        description.includes('database') || description.includes('sql') ||
        topics.some(t => t.includes('database') || t.includes('sql'))) {
      return 'Database';
    }

    // Machine Learning
    if (name.includes('ml') || name.includes('ai') || name.includes('neural') ||
        description.includes('machine learning') || description.includes('ai') ||
        topics.some(t => t.includes('ml') || t.includes('ai'))) {
      return 'Machine Learning';
    }

    // Web Development
    if (name.includes('web') || name.includes('frontend') || name.includes('backend') ||
        description.includes('web') || description.includes('api') ||
        topics.some(t => t.includes('web') || t.includes('api'))) {
      return 'Web Development';
    }

    // Mobile Development
    if (name.includes('mobile') || name.includes('app') || name.includes('ios') || name.includes('android') ||
        description.includes('mobile') || description.includes('app') ||
        topics.some(t => t.includes('mobile') || t.includes('app'))) {
      return 'Mobile Development';
    }

    // DevOps
    if (name.includes('devops') || name.includes('docker') || name.includes('kubernetes') ||
        description.includes('devops') || description.includes('deployment') ||
        topics.some(t => t.includes('devops') || t.includes('docker'))) {
      return 'DevOps';
    }

    // Data Science
    if (name.includes('data') || name.includes('analytics') || name.includes('visualization') ||
        description.includes('data science') || description.includes('analytics') ||
        topics.some(t => t.includes('data') || t.includes('analytics'))) {
      return 'Data Science';
    }

    // Blockchain
    if (name.includes('blockchain') || name.includes('crypto') || name.includes('web3') ||
        description.includes('blockchain') || description.includes('crypto') ||
        topics.some(t => t.includes('blockchain') || t.includes('crypto'))) {
      return 'Blockchain';
    }

    return 'Software Engineering';
  }

  formatRepositoryName(name) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  generateLongDescription(repo) {
    if (repo.description) {
      return `${repo.description} This project demonstrates expertise in ${repo.language || 'modern development'} and showcases best practices in software engineering.`;
    }
    return `A ${repo.language || 'software'} project that demonstrates technical skills and problem-solving abilities.`;
  }

  getRepositoryImage(repo) {
    // Try to get a screenshot or use a default based on category
    const category = this.categorizeRepository(repo);
    const imageMap = {
      'Database': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      'Web Development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      'DevOps': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'Blockchain': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      'Software Engineering': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    };
    return imageMap[category] || imageMap['Software Engineering'];
  }

  extractLiveUrl(repo) {
    // Try to extract live URL from description or topics
    const description = repo.description || '';
    const urlMatch = description.match(/https?:\/\/[^\s]+/);
    return urlMatch ? urlMatch[0] : null;
  }

  extractFeatures(repo) {
    const features = [];
    if (repo.stargazers_count > 0) features.push(`${repo.stargazers_count} stars`);
    if (repo.forks_count > 0) features.push(`${repo.forks_count} forks`);
    if (repo.language) features.push(`Built with ${repo.language}`);
    if (repo.topics && repo.topics.length > 0) {
      features.push(`Topics: ${repo.topics.slice(0, 3).join(', ')}`);
    }
    return features;
  }

  generateChallenges(repo) {
    const challenges = [
      'Implementing scalable architecture for high-performance requirements',
      'Optimizing code for better performance and maintainability',
      'Integrating multiple technologies and ensuring compatibility',
      'Designing user-friendly interfaces with modern UX principles'
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  generateImpact(repo) {
    const impacts = [
      'Improved system performance and user experience',
      'Demonstrated expertise in modern development practices',
      'Showcased problem-solving and technical skills',
      'Contributed to open-source community and knowledge sharing'
    ];
    return impacts[Math.floor(Math.random() * impacts.length)];
  }
}

export default GitHubService;
