# GitHub Pages Finder

A webapp that finds all GitHub Pages sites for any GitHub username.

## Features

- **My Pages tab**: Automatically shows GitHub Pages based on where it's deployed
- **Search tab**: Search for any GitHub username's pages

## How It Works

The owner is automatically detected from the GitHub Pages URL:
- `username.github.io/repo` → detects `username`

## Usage

**My Pages (default):**
- Loads automatically on page load
- Shows all GitHub Pages sites for the deployment owner

**Search:**
- Click the "Search" tab
- Enter any GitHub username
- Click "Find Pages" or press Enter

## Deployment

1. Push to a GitHub repository
2. Enable GitHub Pages in Settings → Pages
3. Done! Owner is auto-detected

## Files

- `index.html` - Main page structure
- `styles.css` - GitHub-style dark theme
- `script.js` - GitHub API integration + auto-detect
- `.nojekyll` - Prevents Jekyll processing

## Limitations

- Only searches public repositories
- GitHub API rate limit: 60 requests/hour (unauthenticated)