const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

class PortfolioUIAnalyzer {
  constructor() {
    this.browser = null;
    this.page = null;
    this.screenshots = [];
  }

  async initialize() {
    this.browser = await chromium.launch({ 
      headless: false, // Set to true for production
      slowMo: 1000 // Slow down for better observation
    });
    this.page = await this.browser.newPage();
    
    // Set viewport for consistent screenshots
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async capturePortfolioScreenshots() {
    console.log('📸 Capturing portfolio screenshots...');
    
    // Navigate to your portfolio
    await this.page.goto('http://localhost:5174/portfolio/', { 
      waitUntil: 'networkidle' 
    });

    // Wait for animations to complete
    await this.page.waitForTimeout(3000);

    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Capture different sections and states
    const captures = [
      {
        name: 'hero-light-mode',
        action: async () => {
          // Ensure light mode
          await this.page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'light');
          });
          await this.page.waitForTimeout(1000);
        }
      },
      {
        name: 'hero-dark-mode',
        action: async () => {
          // Switch to dark mode
          await this.page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'dark');
          });
          await this.page.waitForTimeout(1000);
        }
      },
      {
        name: 'hero-hover-effects',
        action: async () => {
          // Test hover effects
          const socialLinks = await this.page.$$('.social-link');
          for (const link of socialLinks) {
            await link.hover();
            await this.page.waitForTimeout(500);
          }
        }
      },
      {
        name: 'mobile-view',
        action: async () => {
          await this.page.setViewportSize({ width: 375, height: 667 });
          await this.page.waitForTimeout(1000);
        }
      },
      {
        name: 'tablet-view',
        action: async () => {
          await this.page.setViewportSize({ width: 768, height: 1024 });
          await this.page.waitForTimeout(1000);
        }
      }
    ];

    for (const capture of captures) {
      await capture.action();
      const screenshot = await this.page.screenshot({
        path: path.join(screenshotsDir, `${capture.name}.png`),
        fullPage: true
      });
      
      this.screenshots.push({
        name: capture.name,
        path: path.join(screenshotsDir, `${capture.name}.png`),
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Captured: ${capture.name}`);
    }
  }

  async analyzeUIElements() {
    console.log('🔍 Analyzing UI elements...');
    
    // Get element metrics
    const elementAnalysis = await this.page.evaluate(() => {
      const elements = {
        hero: document.querySelector('.hero-minimal'),
        socialLinks: document.querySelectorAll('.social-link'),
        actionItems: document.querySelectorAll('.action-item'),
        shapes: document.querySelectorAll('.shape-circle, .shape-line'),
        particles: document.querySelectorAll('.particle')
      };

      const analysis = {};
      
      for (const [name, element] of Object.entries(elements)) {
        if (element) {
          const rect = element.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(element);
          
          analysis[name] = {
            visible: rect.width > 0 && rect.height > 0,
            position: { x: rect.x, y: rect.y },
            size: { width: rect.width, height: rect.height },
            opacity: computedStyle.opacity,
            zIndex: computedStyle.zIndex,
            transform: computedStyle.transform,
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color
          };
        }
      }
      
      return analysis;
    });

    return elementAnalysis;
  }

  async testInteractions() {
    console.log('🖱️ Testing interactions...');
    
    const interactionResults = [];
    
    // Test social link hover
    const socialLinks = await this.page.$$('.social-link');
    for (let i = 0; i < socialLinks.length; i++) {
      const link = socialLinks[i];
      await link.hover();
      await this.page.waitForTimeout(500);
      
      const hoverState = await this.page.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return {
          transform: style.transform,
          backgroundColor: style.backgroundColor,
          boxShadow: style.boxShadow
        };
      }, link);
      
      interactionResults.push({
        element: `social-link-${i}`,
        hoverState
      });
    }

    // Test action items
    const actionItems = await this.page.$$('.action-item');
    for (let i = 0; i < actionItems.length; i++) {
      const item = actionItems[i];
      await item.hover();
      await this.page.waitForTimeout(500);
      
      const hoverState = await this.page.evaluate((element) => {
        const line = element.querySelector('.action-line');
        return {
          lineWidth: line ? line.style.width : '0px',
          textColor: window.getComputedStyle(element.querySelector('.action-text')).color
        };
      }, item);
      
      interactionResults.push({
        element: `action-item-${i}`,
        hoverState
      });
    }

    return interactionResults;
  }

  async generateImprovementSuggestions() {
    console.log('💡 Generating improvement suggestions...');
    
    const suggestions = [];
    
    // Analyze contrast ratios
    const contrastAnalysis = await this.page.evaluate(() => {
      const elements = document.querySelectorAll('.social-link, .action-text, .minimal-name, .minimal-role');
      const results = [];
      
      elements.forEach((element, index) => {
        const style = window.getComputedStyle(element);
        const bgColor = style.backgroundColor;
        const textColor = style.color;
        
        // Simple contrast check (you'd use a proper contrast library in production)
        results.push({
          element: element.className,
          backgroundColor: bgColor,
          textColor: textColor,
          needsImprovement: bgColor === 'rgba(0, 0, 0, 0)' || textColor === 'rgba(0, 0, 0, 0)'
        });
      });
      
      return results;
    });

    // Generate suggestions based on analysis
    if (contrastAnalysis.some(item => item.needsImprovement)) {
      suggestions.push({
        type: 'contrast',
        priority: 'high',
        description: 'Some elements have insufficient contrast ratios',
        recommendation: 'Review and improve color contrast for better accessibility'
      });
    }

    // Check for performance issues
    const performanceMetrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
      };
    });

    if (performanceMetrics.loadTime > 3000) {
      suggestions.push({
        type: 'performance',
        priority: 'medium',
        description: 'Page load time is slower than optimal',
        recommendation: 'Optimize images, reduce bundle size, or implement lazy loading'
      });
    }

    return suggestions;
  }

  async generateReport() {
    console.log('📊 Generating analysis report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      screenshots: this.screenshots,
      elementAnalysis: await this.analyzeUIElements(),
      interactionResults: await this.testInteractions(),
      suggestions: await this.generateImprovementSuggestions()
    };

    // Save report
    const reportPath = path.join(__dirname, 'ui-analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('📄 Report saved to:', reportPath);
    return report;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Usage example
async function runUIAnalysis() {
  const analyzer = new PortfolioUIAnalyzer();
  
  try {
    await analyzer.initialize();
    await analyzer.capturePortfolioScreenshots();
    const report = await analyzer.generateReport();
    
    console.log('\n🎯 Analysis Complete!');
    console.log('📸 Screenshots captured:', report.screenshots.length);
    console.log('💡 Suggestions generated:', report.suggestions.length);
    
    // Print suggestions
    report.suggestions.forEach((suggestion, index) => {
      console.log(`\n${index + 1}. ${suggestion.type.toUpperCase()} (${suggestion.priority})`);
      console.log(`   ${suggestion.description}`);
      console.log(`   💡 ${suggestion.recommendation}`);
    });
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  } finally {
    await analyzer.cleanup();
  }
}

module.exports = { PortfolioUIAnalyzer, runUIAnalysis };

// Run if called directly
if (require.main === module) {
  runUIAnalysis();
}

