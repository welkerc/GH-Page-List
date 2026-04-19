# GitHub Pages Finder

A webapp that finds all GitHub Pages sites for any GitHub username.

## Features

- **My Pages tab**: Automatically shows GitHub Pages based on where it's deployed
- **Search tab**: Search for any GitHub username's pages

## Quick Start

### Option 1: Use as a Template

1. Click "Use this template" on the [GitHub repository](https://github.com/cwelker/GH-Page-List)
2. Name your repository (e.g., `my-pages`)
3. Go to Settings → Pages
4. Select the `main` branch and click Save
5. Your page will be live at `username.github.io/my-pages`

### Option 2: Add to Existing Repo

1. Copy these files to your repo:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `.nojekyll`
2. Enable GitHub Pages in Settings → Pages
3. Select source and save

## Usage

**My Pages (default):**
- Enter your GitHub username and click "Load My Pages"
- Or deploy to GitHub Pages for auto-detection

**Search:**
- Click the "Search" tab
- Enter any GitHub username
- Click "Find Pages" or press Enter

## Local Development

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Open in browser (or use any static server)
# Just open index.html in a browser
# Note: API calls may not work due to CORS locally
```

## Files

- `index.html` - Main page structure
- `styles.css` - GitHub-style dark theme
- `script.js` - GitHub API integration + auto-detect
- `.nojekyll` - Prevents Jekyll processing

## Limitations

- Only searches public repositories
- GitHub API rate limit: 60 requests/hour (unauthenticated)
