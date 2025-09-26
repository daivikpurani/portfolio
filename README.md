# 🚀 Top 1.1% Portfolio Website

A **premium, highly interactive** portfolio website showcasing **real-world distributed systems expertise** with **real-time GitHub integration**. Built with cutting-edge technologies and designed to impress potential employers.

**Featuring**: 3+ years Backend Engineering experience, AWS TimestreamDB work, Kafka pipelines processing 150K+ events/day, and $360K/year infrastructure savings.

## ✨ **Premium Features**

### 🎯 **Core Features**
- **🔄 Real-time GitHub Integration**: Automatically fetches and displays your actual GitHub repositories
- **🌙 Dark/Light Mode**: Toggle between themes with smooth transitions
- **🎨 Theme Customization**: Choose from 6 different color schemes
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **⚡ Performance Optimized**: 95+ Lighthouse score across all metrics

### 🎭 **Advanced Animations & Interactions**
- **✨ Particle Background**: Interactive particle system with connections
- **🎬 Framer Motion**: Smooth page transitions and micro-interactions
- **🎯 Intersection Observer**: Scroll-triggered animations
- **🔄 Loading States**: Beautiful loading animations and transitions
- **🎪 Hover Effects**: Advanced hover states and transformations

### 📊 **Dynamic Content**
- **📈 Live GitHub Stats**: Real-time repository statistics
- **🔍 Advanced Search**: Search projects by name, description, or technologies
- **🏷️ Smart Filtering**: Filter by category, language, or date
- **📊 Project Analytics**: Stars, forks, and activity metrics
- **📝 Blog Section**: Featured articles with category filtering

### 🛠️ **Technical Excellence**
- **⚡ Vite Build System**: Lightning-fast development and optimized builds
- **🎯 TypeScript Ready**: Type-safe development (optional)
- **📦 Code Splitting**: Optimized bundle sizes
- **🔄 Service Worker**: Offline functionality and caching
- **📊 Performance Monitoring**: Built-in performance tracking

## Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with custom properties
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daivikpurani/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for GitHub Pages deployment:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

The site will be available at: `https://daivikpurani.github.io/Portfolio`

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── About.jsx       # About section
│   ├── Skills.jsx      # Skills showcase
│   ├── Projects.jsx    # Projects gallery
│   ├── Contact.jsx     # Contact form
│   └── Footer.jsx      # Footer
├── data/
│   └── portfolioData.js # Portfolio data
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Customization

### Personal Information

Edit `src/data/portfolioData.js` to update:
- Personal details (name, email, location)
- Bio and summary
- Skills and technologies
- Projects and experience
- Education and certifications

### Styling

The project uses CSS custom properties for easy theming. Main color variables are defined in `src/index.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --accent-color: #06b6d4;
  /* ... more variables */
}
```

### Adding Projects

Add new projects to the `projects` array in `portfolioData.js`:

```javascript
{
  id: 7,
  title: "Your Project Title",
  description: "Brief description",
  longDescription: "Detailed description",
  image: "project-image-url",
  technologies: ["React", "Node.js", "MongoDB"],
  category: "Web Development",
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://your-project.com",
  features: ["Feature 1", "Feature 2"],
  challenges: "Technical challenges faced",
  impact: "Project impact and results"
}
```

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with Vite
- **Images**: Placeholder images from Unsplash (replace with your own)
- **Animations**: Hardware-accelerated with Framer Motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: daivik.purani@email.com
- **GitHub**: [@daivikpurani](https://github.com/daivikpurani)
- **LinkedIn**: [Daivik Purani](https://linkedin.com/in/daivikpurani)

---

Made with ❤️ by Daivik Purani
