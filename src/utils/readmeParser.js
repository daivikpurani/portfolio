// README Parser Utility
// Extracts structured data from GitHub README markdown files

export class ReadmeParser {
  constructor(content) {
    this.content = content || '';
    this.lines = content.split('\n');
  }

  // Extract project description (first paragraph or description section)
  extractDescription() {
    // Try to find a description section first
    const descriptionMatch = this.content.match(/##?\s*Description\s*\n\n(.*?)(?=\n##|$)/is);
    if (descriptionMatch) {
      return this.cleanText(descriptionMatch[1]);
    }

    // Try to find an About section
    const aboutMatch = this.content.match(/##?\s*About\s*\n\n(.*?)(?=\n##|$)/is);
    if (aboutMatch) {
      return this.cleanText(aboutMatch[1]);
    }

    // Extract first meaningful paragraph (skip badges, title, etc.)
    const paragraphs = this.content
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => {
        // Skip badges, images, headers
        if (p.match(/^\[!\[/) || p.match(/^#+/) || p.match(/^<img/) || p.length < 20) {
          return false;
        }
        return true;
      });

    if (paragraphs.length > 0) {
      return this.cleanText(paragraphs[0]);
    }

    return null;
  }

  // Extract features list from Features section
  extractFeatures() {
    const features = [];

    // Try to find Features section
    const featuresMatch = this.content.match(/##?\s*Features?\s*\n\n(.*?)(?=\n##|$)/is);
    if (featuresMatch) {
      const featuresContent = featuresMatch[1];
      
      // Extract list items (both - and *)
      const listItems = featuresContent.match(/^[\s]*[-*]\s+(.+)$/gm);
      if (listItems) {
        features.push(...listItems.map(item => this.cleanText(item.replace(/^[\s]*[-*]\s+/, ''))));
      }

      // Extract numbered list items
      const numberedItems = featuresContent.match(/^\d+\.\s+(.+)$/gm);
      if (numberedItems) {
        features.push(...numberedItems.map(item => this.cleanText(item.replace(/^\d+\.\s+/, ''))));
      }
    }

    // Try to find Key Features section
    const keyFeaturesMatch = this.content.match(/##?\s*Key\s+Features?\s*\n\n(.*?)(?=\n##|$)/is);
    if (keyFeaturesMatch && features.length === 0) {
      const featuresContent = keyFeaturesMatch[1];
      const listItems = featuresContent.match(/^[\s]*[-*]\s+(.+)$/gm);
      if (listItems) {
        features.push(...listItems.map(item => this.cleanText(item.replace(/^[\s]*[-*]\s+/, ''))));
      }
    }

    return features.filter(f => f.length > 0 && f.length < 200); // Filter out invalid entries
  }

  // Extract technologies from tech stack sections or badges
  extractTechnologies() {
    const technologies = new Set();

    // Extract from badges (shields.io, etc.)
    const badgePatterns = [
      /!\[.*?\]\(https:\/\/img\.shields\.io\/badge\/([^-]+)/gi,
      /!\[.*?\]\(.*?badge.*?([A-Za-z0-9\s]+).*?\)/gi,
    ];

    badgePatterns.forEach(pattern => {
      const matches = this.content.matchAll(pattern);
      for (const match of matches) {
        const tech = match[1]?.trim();
        if (tech && tech.length < 30) {
          technologies.add(tech);
        }
      }
    });

    // Extract from Tech Stack section
    const techStackMatch = this.content.match(/##?\s*Tech\s+Stack\s*\n\n(.*?)(?=\n##|$)/is);
    if (techStackMatch) {
      const techContent = techStackMatch[1];
      
      // Extract list items
      const listItems = techContent.match(/^[\s]*[-*]\s+(.+)$/gm);
      if (listItems) {
        listItems.forEach(item => {
          const tech = this.cleanText(item.replace(/^[\s]*[-*]\s+/, ''));
          if (tech.length < 50) {
            technologies.add(tech);
          }
        });
      }

      // Extract code blocks with technologies
      const codeBlocks = techContent.match(/```[\s\S]*?```/g);
      if (codeBlocks) {
        codeBlocks.forEach(block => {
          const lines = block.split('\n').filter(line => !line.includes('```'));
          lines.forEach(line => {
            const techs = line.split(/[,\s]+/).filter(t => t.length > 0 && t.length < 30);
            techs.forEach(t => technologies.add(t.trim()));
          });
        });
      }
    }

    // Extract from Technologies section
    const technologiesMatch = this.content.match(/##?\s*Technologies?\s*\n\n(.*?)(?=\n##|$)/is);
    if (technologiesMatch) {
      const techContent = technologiesMatch[1];
      const listItems = techContent.match(/^[\s]*[-*]\s+(.+)$/gm);
      if (listItems) {
        listItems.forEach(item => {
          const tech = this.cleanText(item.replace(/^[\s]*[-*]\s+/, ''));
          if (tech.length < 50) {
            technologies.add(tech);
          }
        });
      }
    }

    return Array.from(technologies).slice(0, 15); // Limit to 15 technologies
  }

  // Extract live/demo URLs
  extractLiveUrls() {
    const urls = [];

    // Look for live demo badges
    const demoBadgePattern = /\[!\[.*?Live.*?Demo.*?\]\((https?:\/\/[^\s\)]+)\)/gi;
    const demoMatches = this.content.matchAll(demoBadgePattern);
    for (const match of demoMatches) {
      urls.push(match[1]);
    }

    // Look for "Live Demo" or "Demo" links
    const liveDemoPattern = /\[.*?(?:Live\s+)?Demo.*?\]\((https?:\/\/[^\s\)]+)\)/gi;
    const liveMatches = this.content.matchAll(liveDemoPattern);
    for (const match of liveMatches) {
      urls.push(match[1]);
    }

    // Look for website links in description
    const websitePattern = /(?:website|site|app|demo):\s*(https?:\/\/[^\s\)]+)/gi;
    const websiteMatches = this.content.matchAll(websitePattern);
    for (const match of websiteMatches) {
      urls.push(match[1]);
    }

    // Look for URLs in homepage field (GitHub API)
    // This will be handled separately in the service

    return [...new Set(urls)]; // Remove duplicates
  }

  // Extract challenges or architecture notes
  extractChallenges() {
    const challenges = [];

    // Try to find Challenges section
    const challengesMatch = this.content.match(/##?\s*Challenges?\s*\n\n(.*?)(?=\n##|$)/is);
    if (challengesMatch) {
      const challengesContent = challengesMatch[1];
      const paragraphs = challengesContent.split(/\n\n+/);
      challenges.push(...paragraphs.map(p => this.cleanText(p)).filter(p => p.length > 0));
    }

    // Try to find Architecture section
    const archMatch = this.content.match(/##?\s*Architecture\s*\n\n(.*?)(?=\n##|$)/is);
    if (archMatch && challenges.length === 0) {
      const archContent = archMatch[1];
      const paragraphs = archContent.split(/\n\n+/).slice(0, 2); // First 2 paragraphs
      challenges.push(...paragraphs.map(p => this.cleanText(p)).filter(p => p.length > 0));
    }

    return challenges;
  }

  // Extract impact or results
  extractImpact() {
    const impacts = [];

    // Try to find Results section
    const resultsMatch = this.content.match(/##?\s*Results?\s*\n\n(.*?)(?=\n##|$)/is);
    if (resultsMatch) {
      const resultsContent = resultsMatch[1];
      const paragraphs = resultsContent.split(/\n\n+/).slice(0, 2);
      impacts.push(...paragraphs.map(p => this.cleanText(p)).filter(p => p.length > 0));
    }

    // Try to find Impact section
    const impactMatch = this.content.match(/##?\s*Impact\s*\n\n(.*?)(?=\n##|$)/is);
    if (impactMatch) {
      const impactContent = impactMatch[1];
      const paragraphs = impactContent.split(/\n\n+/).slice(0, 2);
      impacts.push(...paragraphs.map(p => this.cleanText(p)).filter(p => p.length > 0));
    }

    return impacts;
  }

  // Parse all data from README
  parse() {
    return {
      description: this.extractDescription(),
      longDescription: this.extractDescription(), // Can be enhanced later
      features: this.extractFeatures(),
      technologies: this.extractTechnologies(),
      liveUrls: this.extractLiveUrls(),
      challenges: this.extractChallenges(),
      impact: this.extractImpact()
    };
  }

  // Helper: Clean text from markdown formatting
  cleanText(text) {
    if (!text) return '';
    
    return text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links, keep text
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
      .replace(/#+\s*/g, '') // Remove headers
      .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove code
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()
      .replace(/\s+/g, ' '); // Normalize whitespace
  }
}

export default ReadmeParser;
