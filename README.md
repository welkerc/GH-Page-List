# GitHub Pages Finder

A webapp that finds all GitHub Pages sites for any GitHub username.

## Usage

1. Enter a GitHub username
2. Click "Find Pages" or press Enter
3. View all repositories with GitHub Pages enabled

## Deployment

Push to a GitHub repository and enable GitHub Pages in Settings → Pages.

## Files

- `index.html` - Main page structure
- `styles.css` - GitHub-style dark theme
- `script.js` - GitHub API integration
- `.nojekyll` - Prevents Jekyll processing

## Limitations

- Only searches public repositories
- GitHub API rate limit: 60 requests/hour (unauthenticated)