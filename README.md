# GitHub Pages Finder

A webapp that finds all GitHub Pages sites for any GitHub username.

## Features

- **My Pages tab**: Automatically shows GitHub Pages for the configured owner
- **Search tab**: Search for any GitHub username's pages

## Configuration

Edit `script.js` and set the owner username:

```javascript
const config = {
    owner: 'YOUR_GITHUB_USERNAME'
};
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Usage

**My Pages (default):**
- Loads automatically on page load
- Shows all GitHub Pages sites for the configured owner

**Search:**
- Click the "Search" tab
- Enter any GitHub username
- Click "Find Pages" or press Enter

## Deployment

1. Edit `script.js` with your GitHub username
2. Push to a GitHub repository
3. Enable GitHub Pages in Settings → Pages

## Files

- `index.html` - Main page structure
- `styles.css` - GitHub-style dark theme
- `script.js` - GitHub API integration + config
- `.nojekyll` - Prevents Jekyll processing

## Limitations

- Only searches public repositories
- GitHub API rate limit: 60 requests/hour (unauthenticated)
