# Playwright Scraping Results - Mirana.xyz Design Analysis

## Overview
Successfully scraped and analyzed design patterns from mirana.xyz using Playwright and applied them to ascentis.capital.

---

## 🎨 Design Tokens Extracted from Mirana.xyz

### Fonts
- **Primary**: Abcmonumentgrotesk (modern geometric sans-serif)
- **Monospace**: Abcmonumentgroteskmono
- **Fallback**: sans-serif

### Key Animations
1. **Marquee Animation**: `40s linear infinite` - Used for logo scrolling
2. **Transitions**: `cubic-bezier(0.47, 0, 0.745, 0.715)` - Smooth, professional easing
3. **Hover Effects**: `0.3s duration` with subtle transforms

### Spacing Patterns
- Large section padding: 96px, 120px, 200px
- Card spacing: 24px, 32px, 48px
- Consistent use of generous whitespace

---

## ✅ Changes Applied to Ascentis.capital

### 1. **Logo Marquee Animation** ✓
- Updated from `30s` to `40s` linear infinite
- Renamed animation to `marquee-horizontal` (Mirana's naming)
- Smoother, more professional scrolling speed

### 2. **Cubic-Bezier Transitions** ✓
- Applied `cubic-bezier(0.47, 0, 0.745, 0.715)` to all buttons
- Added to navigation links
- Enhanced hover states with `translateY(-2px)` transforms
- 0.3s duration for all interactive elements

### 3. **Team Page** ✓
Created new `/team` page with:
- Hero section introducing the team
- Grid layout for team members (2 columns on desktop)
- Team member cards with images, roles, and bios
- "Our Approach" section
- CTA section
- Full responsive design

### 4. **Research & Insights Section** ✓
Added new section to homepage with:
- "Research and Insights" heading with "Explore more" link
- 2-column grid of article cards
- Hover effects with scale transform
- Card borders and backgrounds matching Mirana's style
- Date stamps and article previews

### 5. **Navigation Updates** ✓
- Added "Team" link to navigation menu
- Updated footer to include Team link
- Applied cubic-bezier transitions to all nav links
- Maintained existing navigation structure

### 6. **Enhanced Spacing** ✓
- Increased section padding to match Mirana's generous spacing:
  - Mobile: 6rem (96px)
  - Tablet: 8rem (128px)
  - Desktop: 10rem (160px)
- Better visual breathing room between sections

### 7. **Card Hover Effects** ✓
- Added `.card-hover` utility class
- Applied to research article cards
- Subtle `translateY(-4px)` on hover
- Enhanced shadow effects

---

## 📊 Comparison: Before vs After

### Before (Original Ascentis.capital)
- 30s marquee animation
- Basic 0.2s ease transitions
- No Team page
- No Research section
- Standard section spacing (6-8rem)
- Navigation: Portfolio, Thesis, Contact

### After (Mirana-inspired Updates)
- **40s marquee animation** (matches Mirana)
- **cubic-bezier transitions** (0.3s, professional easing)
- **New Team page** (full responsive design)
- **Research & Insights section** (2-column article grid)
- **Enhanced spacing** (6-10rem responsive)
- **Updated navigation**: Portfolio, Team, Thesis, Contact

---

## 🎯 Key Design Patterns Learned from Mirana

1. **Slower Animations**: 40s vs 30s creates a more premium, unhurried feel
2. **Professional Easing**: cubic-bezier curves instead of basic ease/linear
3. **Generous Spacing**: Large padding between sections (up to 160px on desktop)
4. **Subtle Transforms**: Small translateY movements on hover (2-4px)
5. **Content Structure**: Research/insights section adds authority and thought leadership
6. **Team Presence**: Dedicated team page builds trust and credibility

---

## 📸 Screenshots Captured
- `screenshots/mirana-full.png` - Full page screenshot
- `screenshots/mirana-viewport.png` - Above-the-fold view

---

## 🚀 Files Modified

### Created
- `app/team/page.tsx` - New team page
- `scripts/scrape-mirana.mjs` - Playwright scraper
- `scripts/mirana-analysis.json` - Design analysis data

### Modified
- `app/globals.css` - Animations, transitions, spacing, card styles
- `app/page.tsx` - Added Research & Insights section
- `app/layout.tsx` - Updated footer with Team link
- `components/Navigation.tsx` - Added Team link, updated transitions

---

## 💡 Playwright Capabilities Demonstrated

1. **Page Navigation & Waiting**: Loaded page with networkidle wait
2. **Style Extraction**: Extracted computed styles from all elements
3. **DOM Analysis**: Analyzed page structure and sections
4. **Screenshot Capture**: Full-page and viewport screenshots
5. **Animation Detection**: Identified CSS animations and transitions
6. **Data Export**: Saved analysis to JSON for later reference

---

## 🎨 Design Philosophy Alignment

Both Mirana and Ascentis.capital now share:
- **Modern, premium aesthetic** with generous whitespace
- **Smooth, professional interactions** with cubic-bezier easing
- **Strong typography hierarchy** with clear section titles
- **Trust-building content** (team pages, research sections)
- **Minimalist color palettes** (dark backgrounds, clean whites)
- **Subtle but impactful animations** that don't distract

---

## 📝 Notes

- Maintained Ascentis's brand identity (dark theme, Playfair Display + Inter fonts)
- Applied Mirana's design patterns without directly copying layout
- Enhanced existing components rather than rebuilding from scratch
- All changes are production-ready and responsive
- Team page content is placeholder - update with real team info

---

**Scraped**: October 21, 2025  
**Website**: https://www.mirana.xyz/  
**Tool**: Playwright + Chromium  
**Analysis Time**: ~5 seconds

