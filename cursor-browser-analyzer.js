// Cursor Browser UI Analysis Script
// Run this in Cursor's browser console (F12 → Console)

class CursorUIAnalyzer {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      issues: [],
      suggestions: [],
      metrics: {}
    };
  }

  // Analyze color contrast
  analyzeContrast() {
    console.log('🎨 Analyzing color contrast...');
    
    const elements = document.querySelectorAll('.social-link, .action-text, .minimal-name, .minimal-role, .minimal-description');
    const contrastIssues = [];
    
    elements.forEach((element, index) => {
      const style = window.getComputedStyle(element);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      
      // Simple contrast check
      const hasLowContrast = this.checkContrast(textColor, bgColor);
      
      if (hasLowContrast) {
        contrastIssues.push({
          element: element.className,
          textColor,
          backgroundColor: bgColor,
          suggestion: 'Consider increasing contrast ratio for better accessibility'
        });
      }
    });
    
    this.results.issues.push(...contrastIssues);
    return contrastIssues;
  }

  // Check if contrast ratio is sufficient
  checkContrast(textColor, bgColor) {
    // Convert colors to RGB
    const textRgb = this.colorToRgb(textColor);
    const bgRgb = this.colorToRgb(bgColor);
    
    if (!textRgb || !bgRgb) return false;
    
    // Calculate relative luminance
    const textLuminance = this.getLuminance(textRgb);
    const bgLuminance = this.getLuminance(bgRgb);
    
    // Calculate contrast ratio
    const contrast = (Math.max(textLuminance, bgLuminance) + 0.05) / 
                    (Math.min(textLuminance, bgLuminance) + 0.05);
    
    return contrast < 4.5; // WCAG AA standard
  }

  // Convert color string to RGB
  colorToRgb(color) {
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const computed = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    
    const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
  }

  // Calculate relative luminance
  getLuminance(rgb) {
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Analyze responsive design
  analyzeResponsive() {
    console.log('📱 Analyzing responsive design...');
    
    const breakpoints = [320, 768, 1024, 1440, 1920];
    const responsiveIssues = [];
    
    breakpoints.forEach(width => {
      // Simulate different screen sizes
      window.resizeTo(width, window.innerHeight);
      
      setTimeout(() => {
        const elements = document.querySelectorAll('.minimal-content, .social-link, .action-item');
        elements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const isOverflowing = rect.right > width || rect.bottom > window.innerHeight;
          
          if (isOverflowing) {
            responsiveIssues.push({
              breakpoint: width,
              element: element.className,
              issue: 'Element overflowing viewport',
              suggestion: 'Adjust sizing or positioning for this breakpoint'
            });
          }
        });
      }, 100);
    });
    
    this.results.issues.push(...responsiveIssues);
    return responsiveIssues;
  }

  // Analyze performance
  analyzePerformance() {
    console.log('⚡ Analyzing performance...');
    
    const navigation = performance.getEntriesByType('navigation')[0];
    const paintEntries = performance.getEntriesByType('paint');
    
    const metrics = {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
    };
    
    this.results.metrics = metrics;
    
    const performanceIssues = [];
    if (metrics.loadTime > 3000) {
      performanceIssues.push({
        metric: 'loadTime',
        value: metrics.loadTime,
        suggestion: 'Consider optimizing images, reducing bundle size, or implementing lazy loading'
      });
    }
    
    this.results.issues.push(...performanceIssues);
    return performanceIssues;
  }

  // Analyze animations
  analyzeAnimations() {
    console.log('🎬 Analyzing animations...');
    
    const animatedElements = document.querySelectorAll('[style*="transform"], [style*="transition"], [style*="animation"]');
    const animationIssues = [];
    
    animatedElements.forEach(element => {
      const style = window.getComputedStyle(element);
      const hasTransform = style.transform !== 'none';
      const hasTransition = style.transition !== 'all 0s ease 0s';
      const hasAnimation = style.animation !== 'none';
      
      if (hasTransform || hasTransition || hasAnimation) {
        // Check if animation is smooth
        const isSmooth = this.checkAnimationSmoothness(element);
        
        if (!isSmooth) {
          animationIssues.push({
            element: element.className,
            issue: 'Animation may not be smooth',
            suggestion: 'Consider using will-change or transform3d for better performance'
          });
        }
      }
    });
    
    this.results.issues.push(...animationIssues);
    return animationIssues;
  }

  // Check animation smoothness
  checkAnimationSmoothness(element) {
    const style = window.getComputedStyle(element);
    const hasWillChange = style.willChange !== 'auto';
    const hasTransform3d = style.transform.includes('translate3d') || style.transform.includes('translateZ');
    
    return hasWillChange || hasTransform3d;
  }

  // Generate improvement suggestions
  generateSuggestions() {
    console.log('💡 Generating improvement suggestions...');
    
    const suggestions = [];
    
    // Based on contrast issues
    const contrastIssues = this.results.issues.filter(issue => issue.suggestion?.includes('contrast'));
    if (contrastIssues.length > 0) {
      suggestions.push({
        priority: 'high',
        category: 'accessibility',
        title: 'Improve Color Contrast',
        description: `${contrastIssues.length} elements have low contrast ratios`,
        action: 'Update color scheme to meet WCAG AA standards (4.5:1 ratio)',
        code: `
/* Suggested CSS improvements */
.social-link {
  background: var(--bg-primary);
  border: 2px solid var(--primary-color); /* Increased border width */
  color: var(--text-primary);
}

.action-text {
  color: var(--text-primary);
  font-weight: 500; /* Increased font weight */
}`
      });
    }
    
    // Based on performance issues
    const performanceIssues = this.results.issues.filter(issue => issue.suggestion?.includes('optimizing'));
    if (performanceIssues.length > 0) {
      suggestions.push({
        priority: 'medium',
        category: 'performance',
        title: 'Optimize Performance',
        description: 'Page load time could be improved',
        action: 'Implement performance optimizations',
        code: `
/* Suggested performance improvements */
.hero-minimal {
  will-change: transform; /* Enable hardware acceleration */
}

.social-link, .action-item {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU acceleration */
}`
      });
    }
    
    // Based on responsive issues
    const responsiveIssues = this.results.issues.filter(issue => issue.suggestion?.includes('breakpoint'));
    if (responsiveIssues.length > 0) {
      suggestions.push({
        priority: 'medium',
        category: 'responsive',
        title: 'Fix Responsive Issues',
        description: `${responsiveIssues.length} elements have responsive issues`,
        action: 'Adjust CSS for better mobile experience',
        code: `
/* Suggested responsive improvements */
@media (max-width: 768px) {
  .minimal-content {
    padding: 0 1rem;
  }
  
  .social-link {
    width: 45px;
    height: 45px;
  }
}`
      });
    }
    
    this.results.suggestions = suggestions;
    return suggestions;
  }

  // Run complete analysis
  async runAnalysis() {
    console.log('🚀 Starting UI analysis...');
    
    this.analyzeContrast();
    this.analyzeResponsive();
    this.analyzePerformance();
    this.analyzeAnimations();
    this.generateSuggestions();
    
    console.log('✅ Analysis complete!');
    console.log('📊 Results:', this.results);
    
    return this.results;
  }

  // Export results
  exportResults() {
    const dataStr = JSON.stringify(this.results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ui-analysis-results.json';
    link.click();
    
    URL.revokeObjectURL(url);
  }
}

// Usage instructions
console.log(`
🎯 Cursor Browser UI Analysis Tool

To use this tool:

1. Open Cursor's browser (Cmd+Shift+P → "Browser: Open Browser")
2. Navigate to your portfolio: http://localhost:5174/portfolio/
3. Open DevTools (F12)
4. Paste this script in the Console
5. Run: const analyzer = new CursorUIAnalyzer();
6. Run: analyzer.runAnalysis();
7. Export: analyzer.exportResults();

The tool will analyze:
- Color contrast ratios
- Responsive design issues  
- Performance metrics
- Animation smoothness
- Generate improvement suggestions
`);

// Make analyzer available globally
window.CursorUIAnalyzer = CursorUIAnalyzer;


