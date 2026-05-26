let videosExpanded = false;

function buildVideoCard(data) {
    const card = document.createElement('div');
    card.className = 'glass-card video-card';
    card.innerHTML = `
        <video src="${data.Video}" controls preload="metadata"></video>
        <h4>${data.Title}</h4>
        <p>${data.Description}</p>`;
    return card;
}

async function fetchVideo(fileName) {
    try {
        const response = await fetch(`json/videoJson/${fileName}`);
        return await response.json();
    } catch (e) {
        console.error("Error loading video JSON:", fileName, e);
        return null;
    }
}

function updateShowAllVisibility() {
    const wrap = document.getElementById('show-all-wrap');
    const videoGrid = document.getElementById('video-grid');
    if (!wrap) return;

    const videosTabActive = videoGrid?.classList.contains('active-tab');
    const hasMore = PortfolioData.videoFiles.length > PortfolioData.featuredVideoFiles.length;
    wrap.classList.toggle('is-visible', videosTabActive && !videosExpanded && hasMore);
}

function showTab(type) {
    document.querySelectorAll('.grid').forEach(g => g.classList.remove('active-tab'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    if (type === 'videos') {
        document.getElementById('video-grid').classList.add('active-tab');
        document.querySelector('.tab-btn[data-tab="videos"]')?.classList.add('active');
    } else {
        document.getElementById('os-grid').classList.add('active-tab');
        document.querySelector('.tab-btn[data-tab="opensource"]')?.classList.add('active');
    }

    updateShowAllVisibility();
}

async function loadFeaturedVideos() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;

    const results = await Promise.all(PortfolioData.featuredVideoFiles.map(fetchVideo));
    results.forEach(data => {
        if (data) videoGrid.appendChild(buildVideoCard(data));
    });
}

async function loadRemainingVideos() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;

    const remaining = PortfolioData.videoFiles.filter(
        f => !PortfolioData.featuredVideoFiles.includes(f)
    );
    const results = await Promise.all(remaining.map(fetchVideo));
    results.forEach(data => {
        if (data) {
            const card = buildVideoCard(data);
            card.classList.add('video-card-reveal');
            videoGrid.appendChild(card);
        }
    });
}

async function showAllVideos() {
    if (videosExpanded) return;
    videosExpanded = true;

    const btn = document.getElementById('show-all-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerText = 'Loading...';
    }

    await loadRemainingVideos();
    updateShowAllVisibility();
}

async function loadOpenSource() {
    const osGrid = document.getElementById('os-grid');
    if (!osGrid) return;

    for (const fileName of PortfolioData.openSourceFiles) {
        try {
            const response = await fetch(`json/osJson/${fileName}`);
            const data = await response.json();
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.innerHTML = `
                <img src="${data.Image}" alt="${data.Title}">
                <h4>${data.Title}</h4>
                <p></p>
                <a href="${data.Link}" target="_blank" class="btn">View Source</a>`;
            osGrid.appendChild(card);
        } catch (e) {
            console.error("Error loading OS JSON:", e);
        }
    }
}

function bindPortfolioControls() {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => showTab(btn.dataset.tab));
    });

    document.getElementById('show-all-btn')?.addEventListener('click', showAllVideos);
}

export async function initPortfolio() {
    bindPortfolioControls();
    await loadFeaturedVideos();
    await loadOpenSource();
    updateShowAllVisibility();
}
