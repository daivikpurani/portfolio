// 🎯 Portfolio UI Analysis Script for Cursor Browser
// Run this in Cursor's browser DevTools Console (F12 → Console)

console.log('🚀 Starting Portfolio UI Analysis...');

class PortfolioAnalyzer {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      issues: [],
      suggestions: [],
      metrics: {},
      screenshots: []
    };
  }

  // Analyze the hero section specifically
  analyzeHeroSection() {
    console.log('🎨 Analyzing Hero Section...');
    
    const hero = document.querySelector('.hero-minimal');
    if (!hero) {
      this.results.issues.push({
        type: 'critical',
        element: 'hero-minimal',
        issue: 'Hero section not found',
        suggestion: 'Check if HeroMinimal component is properly rendered'
      });
      return;
    }

    // Check hero dimensions and positioning
    const heroRect = hero.getBoundingClientRect();
    const heroStyle = window.getComputedStyle(hero);
    
    const heroAnalysis = {
      dimensions: {
        width: heroRect.width,
        height: heroRect.height,
        isFullHeight: heroRect.height >= window.innerHeight * 0.9
      },
      background: {
        backgroundColor: heroStyle.backgroundColor,
        backgroundImage: heroStyle.backgroundImage,
        hasGradient: heroStyle.backgroundImage !== 'none'
      },
      positioning: {
        position: heroStyle.position,
        zIndex: heroStyle.zIndex
      }
    };

    // Check if hero takes full viewport height
    if (!heroAnalysis.dimensions.isFullHeight) {
      this.results.issues.push({
        type: 'warning',
        element: 'hero-minimal',
        issue: 'Hero section may not be full height',
        suggestion: 'Consider using min-height: 100vh for better visual impact'
      });
    }

    return heroAnalysis;
  }

  // Analyze social links
  analyzeSocialLinks() {
    console.log('🔗 Analyzing Social Links...');
    
    const socialLinks = document.querySelectorAll('.social-link');
    const socialAnalysis = [];
    
    socialLinks.forEach((link, index) => {
      const rect = link.getBoundingClientRect();
      const style = window.getComputedStyle(link);
      
      const analysis = {
        index,
        dimensions: { width: rect.width, height: rect.height },
        colors: {
          backgroundColor: style.backgroundColor,
          color: style.color,
          borderColor: style.borderColor
        },
        positioning: {
          borderRadius: style.borderRadius,
          borderWidth: style.borderWidth,
          boxShadow: style.boxShadow
        },
        accessibility: {
          hasAriaLabel: link.hasAttribute('aria-label'),
          isClickable: rect.width >= 44 && rect.height >= 44 // WCAG touch target size
        }
      };

      // Check touch target size
      if (!analysis.accessibility.isClickable) {
        this.results.issues.push({
          type: 'accessibility',
          element: `social-link-${index}`,
          issue: 'Touch target too small',
          suggestion: 'Increase size to at least 44x44px for better mobile usability'
        });
      }

      // Check contrast
      const contrastRatio = this.calculateContrast(style.color, style.backgroundColor);
      if (contrastRatio < 4.5) {
        this.results.issues.push({
          type: 'accessibility',
          element: `social-link-${index}`,
          issue: 'Low contrast ratio',
          suggestion: `Current ratio: ${contrastRatio.toFixed(2)}:1. Need 4.5:1 for WCAG AA`
        });
      }

      socialAnalysis.push(analysis);
    });

    return socialAnalysis;
  }

  // Analyze action items
  analyzeActionItems() {
    console.log('⚡ Analyzing Action Items...');
    
    const actionItems = document.querySelectorAll('.action-item');
    const actionAnalysis = [];
    
    actionItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const style = window.getComputedStyle(item);
      const text = item.querySelector('.action-text');
      const line = item.querySelector('.action-line');
      
      const analysis = {
        index,
        text: {
          content: text?.textContent || '',
          fontSize: text ? window.getComputedStyle(text).fontSize : 'unknown',
          fontWeight: text ? window.getComputedStyle(text).fontWeight : 'unknown',
          color: text ? window.getComputedStyle(text).color : 'unknown'
        },
        line: {
          exists: !!line,
          width: line ? window.getComputedStyle(line).width : '0px',
          backgroundColor: line ? window.getComputedStyle(line).backgroundColor : 'none'
        },
        hover: {
          cursor: style.cursor,
          transition: style.transition
        }
      };

      // Check if action line exists
      if (!analysis.line.exists) {
        this.results.issues.push({
          type: 'ui',
          element: `action-item-${index}`,
          issue: 'Action line not found',
          suggestion: 'Ensure .action-line element exists for hover effects'
        });
      }

      actionAnalysis.push(analysis);
    });

    return actionAnalysis;
  }

  // Analyze animations and performance
  analyzeAnimations() {
    console.log('🎬 Analyzing Animations...');
    
    const animatedElements = document.querySelectorAll('.ripple, .cursor-glow, .particle, .shape-circle, .shape-line');
    const animationAnalysis = [];
    
    animatedElements.forEach((element, index) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      
      const analysis = {
        element: element.className,
        index,
        performance: {
          willChange: style.willChange,
          transform: style.transform,
          hasHardwareAcceleration: style.transform.includes('translate3d') || style.transform.includes('translateZ'),
          opacity: style.opacity
        },
        visibility: {
          isVisible: rect.width > 0 && rect.height > 0 && style.opacity !== '0',
          zIndex: style.zIndex
        }
      };

      // Check for hardware acceleration
      if (!analysis.performance.hasHardwareAcceleration && analysis.performance.transform !== 'none') {
        this.results.issues.push({
          type: 'performance',
          element: element.className,
          issue: 'Animation may not be hardware accelerated',
          suggestion: 'Add transform: translateZ(0) or will-change: transform for better performance'
        });
      }

      animationAnalysis.push(analysis);
    });

    return animationAnalysis;
  }

  // Analyze responsive design
  analyzeResponsive() {
    console.log('📱 Analyzing Responsive Design...');
    
    const breakpoints = [320, 768, 1024, 1440, 1920];
    const responsiveAnalysis = [];
    
    breakpoints.forEach(breakpoint => {
      // Simulate different screen sizes
      const originalWidth = window.innerWidth;
      window.resizeTo(breakpoint, window.innerHeight);
      
      setTimeout(() => {
        const content = document.querySelector('.minimal-content');
        const socialLinks = document.querySelectorAll('.social-link');
        
        if (content) {
          const contentRect = content.getBoundingClientRect();
          const isOverflowing = contentRect.right > breakpoint || contentRect.left < 0;
          
          responsiveAnalysis.push({
            breakpoint,
            content: {
              width: contentRect.width,
              isOverflowing,
              padding: window.getComputedStyle(content).padding
            },
            socialLinks: Array.from(socialLinks).map(link => ({
              width: link.getBoundingClientRect().width,
              height: link.getBoundingClientRect().height
            }))
          });

          if (isOverflowing) {
            this.results.issues.push({
              type: 'responsive',
              element: 'minimal-content',
              issue: `Content overflowing at ${breakpoint}px`,
              suggestion: 'Adjust padding or max-width for this breakpoint'
            });
          }
        }
        
        // Restore original width
        window.resizeTo(originalWidth, window.innerHeight);
      }, 100);
    });

    return responsiveAnalysis;
  }

  // Calculate contrast ratio
  calculateContrast(color1, color2) {
    const rgb1 = this.colorToRgb(color1);
    const rgb2 = this.colorToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = this.getLuminance(rgb1);
    const lum2 = this.getLuminance(rgb2);
    
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  }

  colorToRgb(color) {
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const computed = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    
    const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
  }

  getLuminance(rgb) {
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Generate improvement suggestions
  generateSuggestions() {
    console.log('💡 Generating Improvement Suggestions...');
    
    const suggestions = [];
    
    // Group issues by type
    const issueGroups = this.results.issues.reduce((groups, issue) => {
      if (!groups[issue.type]) groups[issue.type] = [];
      groups[issue.type].push(issue);
      return groups;
    }, {});

    // Generate suggestions based on issue types
    Object.entries(issueGroups).forEach(([type, issues]) => {
      switch (type) {
        case 'accessibility':
          suggestions.push({
            priority: 'high',
            category: 'Accessibility',
            title: 'Improve Accessibility',
            description: `${issues.length} accessibility issues found`,
            actions: [
              'Increase touch target sizes to 44x44px minimum',
              'Improve color contrast ratios to 4.5:1 minimum',
              'Add proper ARIA labels to interactive elements'
            ],
            code: `
/* Accessibility improvements */
.social-link {
  min-width: 44px;
  min-height: 44px;
  border: 2px solid var(--primary-color); /* Better contrast */
}

.action-item {
  min-height: 44px;
  padding: 12px 0; /* Better touch target */
}`
          });
          break;

        case 'performance':
          suggestions.push({
            priority: 'medium',
            category: 'Performance',
            title: 'Optimize Animations',
            description: `${issues.length} performance issues found`,
            actions: [
              'Enable hardware acceleration for animations',
              'Use will-change property for animated elements',
              'Consider reducing animation complexity'
            ],
            code: `
/* Performance improvements */
.ripple, .cursor-glow, .particle {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force hardware acceleration */
}

.shape-circle, .shape-line {
  will-change: transform;
}`
          });
          break;

        case 'responsive':
          suggestions.push({
            priority: 'medium',
            category: 'Responsive Design',
            title: 'Fix Responsive Issues',
            description: `${issues.length} responsive issues found`,
            actions: [
              'Adjust content padding for mobile devices',
              'Test all breakpoints thoroughly',
              'Consider mobile-first approach'
            ],
            code: `
/* Responsive improvements */
@media (max-width: 768px) {
  .minimal-content {
    padding: 0 1rem;
    max-width: 100%;
  }
  
  .social-link {
    width: 45px;
    height: 45px;
  }
}`
          });
          break;
      }
    });

    this.results.suggestions = suggestions;
    return suggestions;
  }

  // Run complete analysis
  async runCompleteAnalysis() {
    console.log('🚀 Running Complete Portfolio Analysis...');
    
    // Run all analysis functions
    this.results.heroAnalysis = this.analyzeHeroSection();
    this.results.socialAnalysis = this.analyzeSocialLinks();
    this.results.actionAnalysis = this.analyzeActionItems();
    this.results.animationAnalysis = this.analyzeAnimations();
    this.results.responsiveAnalysis = this.analyzeResponsive();
    
    // Generate suggestions
    this.generateSuggestions();
    
    // Display results
    this.displayResults();
    
    return this.results;
  }

  // Display results in console
  displayResults() {
    console.log('\n🎯 PORTFOLIO ANALYSIS COMPLETE!');
    console.log('=====================================');
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total Issues Found: ${this.results.issues.length}`);
    console.log(`- Suggestions Generated: ${this.results.suggestions.length}`);
    console.log(`- Viewport: ${this.results.viewport.width}x${this.results.viewport.height}`);
    
    console.log(`\n🚨 Issues by Type:`);
    const issueTypes = this.results.issues.reduce((types, issue) => {
      types[issue.type] = (types[issue.type] || 0) + 1;
      return types;
    }, {});
    
    Object.entries(issueTypes).forEach(([type, count]) => {
      console.log(`- ${type}: ${count}`);
    });
    
    console.log(`\n💡 Top Suggestions:`);
    this.results.suggestions.forEach((suggestion, index) => {
      console.log(`\n${index + 1}. ${suggestion.title} (${suggestion.priority} priority)`);
      console.log(`   ${suggestion.description}`);
      console.log(`   Actions: ${suggestion.actions.join(', ')}`);
    });
    
    console.log(`\n📄 Full results available in: analyzer.results`);
  }

  // Export results
  exportResults() {
    const dataStr = JSON.stringify(this.results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('📄 Analysis results exported!');
  }
}

// Initialize and run analysis
console.log(`
🎯 Portfolio UI Analysis Tool Ready!

To run the analysis:
1. const analyzer = new PortfolioAnalyzer();
2. analyzer.runCompleteAnalysis();
3. analyzer.exportResults(); // Optional: export results

The tool will analyze:
- Hero section layout and styling
- Social links accessibility and contrast
- Action items functionality
- Animation performance
- Responsive design across breakpoints
- Generate specific improvement suggestions
`);

// Make analyzer available globally
window.PortfolioAnalyzer = PortfolioAnalyzer;

// Auto-run if desired
// const analyzer = new PortfolioAnalyzer();
// analyzer.runCompleteAnalysis();


