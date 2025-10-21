# Playwright Web Scraper

This directory contains Playwright scripts for scraping and analyzing website designs.

## 🚀 Quick Start

### Run the Mirana scraper:
```bash
npm run scrape
```

This will:
1. Navigate to mirana.xyz
2. Extract design tokens (colors, fonts, spacing, animations)
3. Analyze page structure and sections
4. Capture full-page and viewport screenshots
5. Save analysis to `mirana-analysis.json`
6. Save screenshots to `/screenshots` directory

## 📁 Files

- **`scrape-mirana.mjs`** - Main Playwright scraper script
- **`mirana-analysis.json`** - Extracted design data (generated)

## 🎯 What Gets Scraped

### Design Tokens
- Colors (background, text, borders)
- Font families and typography
- Spacing patterns (padding, margin)
- Animation timings and easing functions

### Page Structure
- Navigation links
- Section layout and organization
- Hero section content and styling
- Content hierarchy

### Visual Assets
- Full-page screenshot (`screenshots/mirana-full.png`)
- Viewport screenshot (`screenshots/mirana-viewport.png`)

## 🔧 Customization

To scrape a different website, modify `scrape-mirana.mjs`:

```javascript
await page.goto('https://your-website.com/', { 
  waitUntil: 'networkidle' 
});
```

## 📊 Analysis Output

The `mirana-analysis.json` file contains:

```json
{
  "url": "https://www.mirana.xyz/",
  "scrapedAt": "2025-10-21T17:40:55.891Z",
  "designTokens": {
    "colors": { ... },
    "fonts": [ ... ],
    "spacing": [ ... ],
    "animations": [ ... ]
  },
  "pageStructure": [ ... ],
  "navigation": [ ... ],
  "heroSection": { ... },
  "animations": [ ... ]
}
```

## 🛠️ Requirements

- Node.js
- Playwright (installed via `npm install`)
- Chromium browser (auto-installed with Playwright)

## 💡 Use Cases

1. **Design Analysis** - Study competitor or inspiration websites
2. **Design System Extraction** - Pull colors, fonts, spacing
3. **Layout Planning** - Understand page structure
4. **Animation Study** - Identify timing and easing functions
5. **Visual Reference** - Capture screenshots for mood boards

## ⚠️ Legal Note

Only scrape websites you own or have permission to analyze. This tool is designed for:
- Your own websites
- Publicly available information
- Design research and inspiration
- Non-commercial analysis

## 🎨 Applied to Sommet.capital

The scraped data was used to enhance sommet.capital with:
- 40s marquee animation (from Mirana's 40s timing)
- cubic-bezier(0.47, 0, 0.745, 0.715) transitions
- Enhanced section spacing (6-10rem)
- New Team page structure
- Research & Insights section
- Improved hover effects

See `../DESIGN-ANALYSIS.md` for complete details.

