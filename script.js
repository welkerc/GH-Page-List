const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById('search-btn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');
const resultsTitle = document.getElementById('results-title');
const resultsCount = document.getElementById('results-count');
const pagesList = document.getElementById('pages-list');

searchBtn.addEventListener('click', handleSearch);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

async function handleSearch() {
    const username = usernameInput.value.trim();
    if (!username) {
        showError('Please enter a username');
        return;
    }

    hideError();
    hideResults();
    showLoading();
    searchBtn.disabled = true;

    try {
        const pages = await findGitHubPages(username);
        hideLoading();
        showResults(pages, username);
    } catch (error) {
        hideLoading();
        showError(error.message);
    } finally {
        searchBtn.disabled = false;
    }
}

async function findGitHubPages(username) {
    const pages = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const repos = await fetchRepos(username, page, perPage);
        
        if (repos.length === 0) break;

        for (const repo of repos) {
            if (repo.has_pages) {
                const domain = repo.html_url.replace('github.com', 'github.io');
                pages.push({
                    name: repo.name,
                    url: `https://${username}.github.io/${repo.name}`,
                    description: repo.description,
                    defaultBranch: repo.default_branch,
                    updatedAt: repo.updated_at
                });
            }
        }

        if (repos.length < perPage) break;
        page++;
    }

    return pages.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

async function fetchRepos(username, page, perPage) {
    const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`
    );

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found');
        }
        if (response.status === 403) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        throw new Error(`Failed to fetch repositories (${response.status})`);
    }

    return response.json();
}

function showLoading() {
    loadingEl.classList.remove('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

function showResults(pages, username) {
    resultsTitle.textContent = username;
    resultsCount.textContent = pages.length;

    if (pages.length === 0) {
        pagesList.innerHTML = `
            <div class="empty-state">
                <p>No GitHub Pages sites found for this user.</p>
            </div>
        `;
    } else {
        pagesList.innerHTML = pages.map(page => `
            <div class="page-item">
                <div class="page-info">
                    <a href="${page.url}" target="_blank" rel="noopener noreferrer" class="page-name">
                        ${escapeHtml(page.name)}
                    </a>
                    <span class="page-url">${escapeHtml(page.url)}</span>
                    ${page.description ? `<span class="page-description">${escapeHtml(page.description)}</span>` : ''}
                </div>
                <div class="page-status">
                    <span class="status-dot"></span>
                    <span>Active</span>
                </div>
            </div>
        `).join('');
    }

    resultsEl.classList.remove('hidden');
}

function hideResults() {
    resultsEl.classList.add('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

usernameInput.focus();