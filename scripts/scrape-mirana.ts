import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface DesignToken {
  colors: { [key: string]: string };
  fonts: string[];
  spacing: string[];
  animations: string[];
}

interface Section {
  tag: string;
  classes: string[];
  text: string;
  children: number;
}

async function scrapeMiranaDesign() {
  console.log('🚀 Starting Playwright scraper for mirana.xyz...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('📡 Navigating to mirana.xyz...');
    await page.goto('https://www.mirana.xyz/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // Wait for any animations
    
    console.log('✅ Page loaded successfully\n');

    // Extract design tokens
    const designTokens = await page.evaluate(() => {
      const colors: { [key: string]: string } = {};
      const fonts = new Set<string>();
      const spacing = new Set<string>();
      
      // Get computed styles from body
      const bodyStyles = window.getComputedStyle(document.body);
      colors.background = bodyStyles.backgroundColor;
      colors.text = bodyStyles.color;
      fonts.add(bodyStyles.fontFamily);
      
      // Analyze all elements
      document.querySelectorAll('*').forEach((el) => {
        const styles = window.getComputedStyle(el);
        
        // Colors
        if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors[`bg-${el.tagName.toLowerCase()}`] = styles.backgroundColor;
        }
        if (styles.color) {
          colors[`text-${el.tagName.toLowerCase()}`] = styles.color;
        }
        
        // Fonts
        if (styles.fontFamily) {
          fonts.add(styles.fontFamily);
        }
        
        // Spacing
        if (styles.padding && styles.padding !== '0px') {
          spacing.add(styles.padding);
        }
        if (styles.margin && styles.margin !== '0px') {
          spacing.add(styles.margin);
        }
      });
      
      return {
        colors,
        fonts: Array.from(fonts),
        spacing: Array.from(spacing),
        animations: []
      };
    });

    console.log('🎨 Design Tokens Extracted:');
    console.log('Colors:', Object.keys(designTokens.colors).length);
    console.log('Fonts:', designTokens.fonts.slice(0, 3));
    console.log('');

    // Extract page structure
    const pageStructure = await page.evaluate(() => {
      const sections: any[] = [];
      
      document.querySelectorAll('section, div[class*="section"]').forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.height > 100) { // Only significant sections
          sections.push({
            tag: section.tagName.toLowerCase(),
            classes: Array.from(section.classList),
            text: section.textContent?.substring(0, 100) || '',
            children: section.children.length,
            height: rect.height
          });
        }
      });
      
      return sections;
    });

    console.log('📐 Page Structure:');
    console.log(`Found ${pageStructure.length} major sections\n`);

    // Extract navigation structure
    const navigation = await page.evaluate(() => {
      const navLinks: { text: string; href: string }[] = [];
      
      document.querySelectorAll('nav a, header a').forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        if (anchor.textContent && anchor.href) {
          navLinks.push({
            text: anchor.textContent.trim(),
            href: anchor.href
          });
        }
      });
      
      return navLinks;
    });

    console.log('🧭 Navigation Links:');
    navigation.forEach(link => console.log(`  - ${link.text}`));
    console.log('');

    // Extract hero section
    const heroSection = await page.evaluate(() => {
      const hero = document.querySelector('h1')?.parentElement;
      if (!hero) return null;
      
      const styles = window.getComputedStyle(hero);
      return {
        text: hero.textContent?.substring(0, 200),
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        background: styles.backgroundColor
      };
    });

    if (heroSection) {
      console.log('🎯 Hero Section:');
      console.log(`  Text: "${heroSection.text?.substring(0, 60)}..."`);
      console.log(`  Font Size: ${heroSection.fontSize}`);
      console.log(`  Font Weight: ${heroSection.fontWeight}`);
      console.log('');
    }

    // Take screenshots
    console.log('📸 Taking screenshots...');
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    await page.screenshot({ 
      path: path.join(screenshotsDir, 'mirana-full.png'),
      fullPage: true 
    });
    
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'mirana-viewport.png')
    });

    console.log('✅ Screenshots saved to /screenshots\n');

    // Extract CSS animations
    const animations = await page.evaluate(() => {
      const animationData: string[] = [];
      
      document.querySelectorAll('*').forEach((el) => {
        const styles = window.getComputedStyle(el);
        if (styles.animation && styles.animation !== 'none') {
          animationData.push(styles.animation);
        }
        if (styles.transition && styles.transition !== 'all 0s ease 0s') {
          animationData.push(`transition: ${styles.transition}`);
        }
      });
      
      return [...new Set(animationData)].slice(0, 10);
    });

    console.log('✨ Animations & Transitions:');
    animations.forEach(anim => console.log(`  - ${anim.substring(0, 80)}`));
    console.log('');

    // Save analysis to JSON
    const analysis = {
      url: 'https://www.mirana.xyz/',
      scrapedAt: new Date().toISOString(),
      designTokens,
      pageStructure,
      navigation,
      heroSection,
      animations
    };

    const analysisPath = path.join(process.cwd(), 'scripts', 'mirana-analysis.json');
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
    
    console.log('💾 Analysis saved to scripts/mirana-analysis.json');
    console.log('\n✨ Scraping complete!');

  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeMiranaDesign();

