const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});


const tools = ["VSCode", "Cursor", "Rojo", "Wally", "Rokit", "Git"];
const languages = ["C", "C++", "Rust", "HTML/CSS", "JavaScript", "Lua", "Luau", "Python", "ARM + X86 Assembly"];

const renderTags = (list, containerId) => {
    const container = document.getElementById(containerId);
    list.forEach(item => {
        const span = document.createElement('span');
        span.className = "tech-tag";
        span.innerText = item;
        container.appendChild(span);
    });
};

renderTags(tools, 'tools-container');
renderTags(languages, 'languages-container');

function showTab(type) {
    document.querySelectorAll('.grid').forEach(g => g.classList.remove('active-tab'));
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    if(type === 'videos') {
        document.getElementById('video-grid').classList.add('active-tab');
        document.querySelector('.tab-btn[onclick*="videos"]').classList.add('active');
    } else {
        document.getElementById('os-grid').classList.add('active-tab');
        document.querySelector('.tab-btn[onclick*="opensource"]').classList.add('active');
    }
}

async function loadVideos() {
    const videoGrid = document.getElementById('video-grid');
    for (const fileName of PortfolioData.videoFiles) {
        try {
            const response = await fetch(`VideoFiles/${fileName}`);
            const data = await response.json();
            videoGrid.innerHTML += `
                <div class="glass-card">
                    <video src="${data.Video}" controls></video>
                    <h4 style="margin-top:15px; color:var(--accent);">${data.Title}</h4>
                    <p style="font-size:0.85rem; opacity:0.7;">${data.Description}</p>
                </div>`;
        } catch (e) { console.error("Error loading video JSON:", e); }
    }
}

async function loadOpenSource() {
    const osGrid = document.getElementById('os-grid');
    for (const fileName of PortfolioData.openSourceFiles) {
        try {
            const response = await fetch(`OpenSource/${fileName}`);
            const data = await response.json();
            osGrid.innerHTML += `
                <div class="glass-card">
                    <img src="${data.Image}" alt="${data.Title}">
                    <h4 style="margin-top:15px;">${data.Title}</h4>
                    <a href="${data.Link}" target="_blank" class="btn" style="margin-top:15px; font-size:0.8rem; padding: 8px 15px;">View Source</a>
                </div>`;
        } catch (e) { console.error("Error loading OS JSON:", e); }
    }
}

const pricingData = [
    { name: "Per-Task Commissions", price: "$10+", desc: "Individual features" },
    { name: "Simple Gameplay", price: "$150+", desc: "Basic game loops, e.g, obby/tycoon" },
    { name: "Medium Gameplay", price: "$350+", desc: "Medium Difficulty Gameplay, e.g, platformer/racing/pet simulator" },
    { name: "Complex Gameplay", price: "$900+", desc: "Complex Gameplay, e.g, combat/complex fps/open world/etc" },
    { name: "Anticheat (S/M/C)", price: "$50 - $300+", desc: "Project dependent" },
    { name: "Monetization", price: "$50 - $150+", desc: "Standard to Complex" }
];

const pGrid = document.getElementById('pricing-grid');
pricingData.forEach(p => {
    pGrid.innerHTML += `
        <div class="pricing-card">
            <div>
                <h4 style="color:var(--text)">${p.name}</h4>
                <p style="font-size: 0.75rem; opacity: 0.6;">${p.desc}</p>
            </div>
            <span style="color:var(--accent); font-weight: bold;">${p.price}</span>
        </div>`;
});

function updateStatus() {
    const Availability = { shortTerm: true, longTerm: false };
    
    document.getElementById('short-term-status').innerText = Availability.shortTerm ? "YES" : "NO";
    document.getElementById('short-term-status').className = `status-indicator ${Availability.shortTerm ? 'yes' : 'no'}`;
    
    document.getElementById('long-term-status').innerText = Availability.longTerm ? "YES" : "NO";
    document.getElementById('long-term-status').className = `status-indicator ${Availability.longTerm ? 'yes' : 'no'}`;

    const now = new Date();
    const utcHours = now.getUTCHours();
    const gmt5Hours = (utcHours + 5) % 24;
    
    const isOnline = gmt5Hours >= 13 && gmt5Hours < 22;
    const onlineEl = document.getElementById('online-status');
    onlineEl.innerText = isOnline ? "YES" : "NO";
    onlineEl.className = `status-indicator ${isOnline ? 'yes' : 'no'}`;
}

loadVideos();
loadOpenSource();
updateStatus();