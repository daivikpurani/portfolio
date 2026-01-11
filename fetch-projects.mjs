// Script to fetch GitHub projects and save them statically
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const username = 'daivikpurani';
const baseUrl = 'https://api.github.com';

async function fetchRepositories() {
  try {
    const response = await fetch(`${baseUrl}/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

async function fetchReadme(repoName) {
  try {
    const response = await fetch(`${baseUrl}/repos/${username}/${repoName}/readme`);
    if (!response.ok) return null;
    const data = await response.json();
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch (error) {
    return null;
  }
}

async function fetchLanguages(repoName) {
  try {
    const response = await fetch(`${baseUrl}/repos/${username}/${repoName}/languages`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

function parseReadme(content) {
  if (!content) return null;

  function cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
      .replace(/#+\s*/g, '')
      .replace(/\*\*([^\*]+)\*\*/g, '$1')
      .replace(/\*([^\*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\n+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  const descriptionMatch = content.match(/##?\s*Description\s*\n\n(.*?)(?=\n##|$)/is);
  const aboutMatch = content.match(/##?\s*About\s*\n\n(.*?)(?=\n##|$)/is);
  
  let description = null;
  if (descriptionMatch) {
    description = cleanText(descriptionMatch[1]);
  } else if (aboutMatch) {
    description = cleanText(aboutMatch[1]);
  } else {
    const paragraphs = content
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => {
        if (p.match(/^\[!\[/) || p.match(/^#+/) || p.match(/^<img/) || p.length < 20) {
          return false;
        }
        return true;
      });
    if (paragraphs.length > 0) description = cleanText(paragraphs[0]);
  }

  const features = [];
  const featuresMatch = content.match(/##?\s*Features?\s*\n\n(.*?)(?=\n##|$)/is);
  if (featuresMatch) {
    const featuresContent = featuresMatch[1];
    const listItems = featuresContent.match(/^[\s]*[-*]\s+(.+)$/gm);
    if (listItems) {
      features.push(...listItems.map(item => cleanText(item.replace(/^[\s]*[-*]\s+/, ''))).filter(f => f.length > 0 && f.length < 200));
    }
  }

  const technologies = new Set();
  const techStackMatch = content.match(/##?\s*Tech\s+Stack\s*\n\n(.*?)(?=\n##|$)/is);
  if (techStackMatch) {
    const techContent = techStackMatch[1];
    const listItems = techContent.match(/^[\s]*[-*]\s+(.+)$/gm);
    if (listItems) {
      listItems.forEach(item => {
        const tech = cleanText(item.replace(/^[\s]*[-*]\s+/, ''));
        if (tech.length < 50) technologies.add(tech);
      });
    }
  }
  const techArray = Array.from(technologies).slice(0, 15);

  const liveUrls = [];
  const demoBadgePattern = /\[!\[.*?Live.*?Demo.*?\]\((https?:\/\/[^\s\)]+)\)/gi;
  const matches = content.matchAll(demoBadgePattern);
  for (const match of matches) {
    liveUrls.push(match[1]);
  }

  const challenges = [];
  const challengesMatch = content.match(/##?\s*Challenges?\s*\n\n(.*?)(?=\n##|$)/is);
  if (challengesMatch) {
    const challengesContent = challengesMatch[1];
    const paragraphs = challengesContent.split(/\n\n+/);
    challenges.push(...paragraphs.map(p => cleanText(p)).filter(p => p.length > 0));
  }

  const impacts = [];
  const impactMatch = content.match(/##?\s*Impact\s*\n\n(.*?)(?=\n##|$)/is);
  if (impactMatch) {
    const impactContent = impactMatch[1];
    const paragraphs = impactContent.split(/\n\n+/).slice(0, 2);
    impacts.push(...paragraphs.map(p => cleanText(p)).filter(p => p.length > 0));
  }

  return {
    description: description,
    longDescription: description,
    features: features,
    technologies: techArray,
    liveUrls: [...new Set(liveUrls)],
    challenges: challenges,
    impact: impacts
  };
}

function categorizeRepository(repo) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());

  if (name.includes('db') || name.includes('database') || description.includes('database') || description.includes('sql') || topics.some(t => t.includes('database') || t.includes('sql'))) {
    return 'Database';
  }
  if (name.includes('ml') || name.includes('ai') || name.includes('neural') || description.includes('machine learning') || description.includes('ai') || topics.some(t => t.includes('ml') || t.includes('ai'))) {
    return 'Machine Learning';
  }
  if (name.includes('web') || name.includes('frontend') || name.includes('backend') || description.includes('web') || description.includes('api') || topics.some(t => t.includes('web') || t.includes('api'))) {
    return 'Web Development';
  }
  if (name.includes('mobile') || name.includes('app') || name.includes('ios') || name.includes('android') || description.includes('mobile') || description.includes('app') || topics.some(t => t.includes('mobile') || t.includes('app'))) {
    return 'Mobile Development';
  }
  if (name.includes('devops') || name.includes('docker') || name.includes('kubernetes') || description.includes('devops') || description.includes('deployment') || topics.some(t => t.includes('devops') || t.includes('docker'))) {
    return 'DevOps';
  }
  if (name.includes('data') || name.includes('analytics') || description.includes('data science') || topics.some(t => t.includes('data') || t.includes('analytics'))) {
    return 'Data Science';
  }
  if (name.includes('blockchain') || name.includes('crypto') || description.includes('blockchain') || topics.some(t => t.includes('blockchain'))) {
    return 'Blockchain';
  }
  return 'Software Engineering';
}

function formatRepositoryName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getRepositoryImage(category) {
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

async function processRepositories() {
  console.log('Fetching repositories...');
  const repos = await fetchRepositories();
  const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== 'Portfolio');
  
  console.log(`Found ${filteredRepos.length} repositories. Processing...`);
  
  const projects = [];
  
  for (let i = 0; i < filteredRepos.length; i++) {
    const repo = filteredRepos[i];
    console.log(`Processing ${i + 1}/${filteredRepos.length}: ${repo.name}`);
    
    const [readmeContent, languageStats] = await Promise.all([
      fetchReadme(repo.name),
      fetchLanguages(repo.name)
    ]);
    
    const readmeData = readmeContent ? parseReadme(readmeContent) : null;
    const category = categorizeRepository(repo);
    
    // Extract technologies
    const technologies = [];
    if (repo.language) technologies.push(repo.language);
    if (languageStats) {
      const sortedLanguages = Object.keys(languageStats)
        .sort((a, b) => languageStats[b] - languageStats[a])
        .slice(0, 5);
      technologies.push(...sortedLanguages);
    }
    if (repo.topics && repo.topics.length > 0) {
      technologies.push(...repo.topics.filter(topic => topic.length < 30));
    }
    if (readmeData && readmeData.technologies) {
      technologies.push(...readmeData.technologies);
    }
    const allTechnologies = [...new Set(technologies)];
    
    // Determine description
    const description = readmeData?.description || repo.description || 'No description available';
    const longDescription = readmeData?.longDescription || readmeData?.description || description;
    
    // Determine features
    const features = readmeData?.features && readmeData.features.length > 0
      ? readmeData.features
      : [];
    
    // Determine live URL
    const liveUrl = readmeData?.liveUrls && readmeData.liveUrls.length > 0
      ? readmeData.liveUrls[0]
      : (repo.homepage || null);
    
    // Challenges and impact
    const challenges = readmeData?.challenges && readmeData.challenges.length > 0
      ? readmeData.challenges.join(' ')
      : null;
    const impact = readmeData?.impact && readmeData.impact.length > 0
      ? readmeData.impact.join(' ')
      : null;
    
    projects.push({
      id: repo.id,
      title: formatRepositoryName(repo.name),
      description: description,
      longDescription: longDescription,
      image: getRepositoryImage(category),
      technologies: allTechnologies,
      category: category,
      githubUrl: repo.html_url,
      liveUrl: liveUrl,
      features: features,
      challenges: challenges,
      impact: impact,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      size: repo.size,
      topics: repo.topics || []
    });
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  // Sort by updated date
  projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  return projects;
}

async function main() {
  try {
    const projects = await processRepositories();
    
    // Read existing portfolioData.js
    const dataPath = join(__dirname, 'src/data/portfolioData.js');
    let existingContent = readFileSync(dataPath, 'utf-8');
    
    // Create the projects export
    const projectsExport = `export const projects = ${JSON.stringify(projects, null, 2)};`;
    
    // Replace the projects array
    existingContent = existingContent.replace(
      /\/\/ Projects are now dynamically fetched from GitHub API[\s\S]*?export const projects = \[\];/,
      projectsExport
    );
    
    writeFileSync(dataPath, existingContent, 'utf-8');
    
    console.log(`\n✅ Successfully saved ${projects.length} projects to portfolioData.js`);
    console.log('Projects:', projects.map(p => p.title).join(', '));
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
