# Fetching GitHub Projects

To populate the static projects data, you can run the fetch script:

## Option 1: Run the script (when API limits reset)

```bash
node fetch-projects.mjs
```

This will fetch all your GitHub repositories, parse their READMEs, and update `src/data/portfolioData.js` with the project data.

## Option 2: Use a GitHub Personal Access Token

If you hit rate limits, create a GitHub Personal Access Token and update the script:

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate a new token with `public_repo` scope
3. Update `fetch-projects.mjs` to include the token in headers:

```javascript
const token = 'YOUR_TOKEN_HERE';
const headers = {
  'Authorization': `token ${token}`,
  'Accept': 'application/vnd.github.v3+json'
};
```

Then modify fetch calls to include headers:
```javascript
const response = await fetch(url, { headers });
```

## Option 3: Manual Population

You can manually add projects to `src/data/portfolioData.js` in the `projects` array. Each project should have this structure:

```javascript
{
  id: 123456789,
  title: "Project Name",
  description: "Short description",
  longDescription: "Longer description",
  image: "https://images.unsplash.com/...",
  technologies: ["JavaScript", "React", "Node.js"],
  category: "Web Development",
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://demo-url.com", // or null
  features: ["Feature 1", "Feature 2"],
  challenges: "Challenge description", // or null
  impact: "Impact description", // or null
  stars: 10,
  forks: 5,
  language: "JavaScript",
  updatedAt: "2024-01-01T00:00:00Z",
  createdAt: "2023-01-01T00:00:00Z",
  size: 12345,
  topics: ["react", "nodejs"]
}
```
