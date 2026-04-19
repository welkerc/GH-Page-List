const config = {
    owner: 'YOUR_GITHUB_USERNAME'
};

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById('search-btn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');
const resultsTitle = document.getElementById('results-title');
const resultsCount = document.getElementById('results-count');
const pagesList = document.getElementById('pages-list');

const loadingOwner = document.getElementById('loading-owner');
const errorOwner = document.getElementById('error-owner');
const resultsOwner = document.getElementById('results-owner');
const ownerTitle = document.getElementById('owner-title');
const ownerCount = document.getElementById('owner-count');
const pagesListOwner = document.getElementById('pages-list-owner');

searchBtn.addEventListener('click', handleSearch);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

async function init() {
    if (config.owner && config.owner !== 'YOUR_GITHUB_USERNAME') {
        await loadOwnerPages();
    } else {
        showOwnerError('Owner not configured');
    }
}

async function loadOwnerPages() {
    showOwnerLoading();
    try {
        const pages = await findGitHubPages(config.owner);
        showOwnerResults(pages);
    } catch (error) {
        showOwnerError(error.message);
    }
}

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

function showOwnerLoading() {
    loadingOwner.classList.remove('hidden');
}

function hideOwnerLoading() {
    loadingOwner.classList.add('hidden');
}

function showOwnerError(message) {
    errorOwner.textContent = message;
    errorOwner.classList.remove('hidden');
}

function hideOwnerError() {
    errorOwner.classList.add('hidden');
}

function showOwnerResults(pages) {
    hideOwnerLoading();
    hideOwnerError();
    ownerTitle.textContent = config.owner;
    ownerCount.textContent = pages.length;

    if (pages.length === 0) {
        pagesListOwner.innerHTML = `
            <div class="empty-state">
                <p>No GitHub Pages sites found.</p>
            </div>
        `;
    } else {
        pagesListOwner.innerHTML = pages.map(page => `
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

    resultsOwner.classList.remove('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

init();