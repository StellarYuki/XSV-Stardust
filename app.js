// --- RENDER CREW ---
const crewContainer = document.getElementById('crew-container');
crewContainer.innerHTML = '<h2 style="color: #ffcc99;">Active Crew Roster</h2>';
crewDB.forEach(crew => {
    crewContainer.innerHTML += `
        <div class="card">
            <h3 style="color:#ff9900;">${crew.name}</h3>
            <p><strong>Rank:</strong> ${crew.rank}<br><strong>Department:</strong> ${crew.dept}</p>
            <p>${crew.bio}</p>
        </div>`;
});

// --- RENDER SHIP STATS ---
const statsContainer = document.getElementById('stats-container');
statsContainer.innerHTML = '<h2 style="color: #cc0000;">Ship Systems Dashboard</h2><p>Update current levels manually.</p><div style="margin-top: 30px;">';
shipStatsDB.forEach(stat => {
    statsContainer.innerHTML += `<div class="stat-row"><span>${stat.label}:</span> <input type="text" value="${stat.value}"></div>`;
});
statsContainer.innerHTML += '</div>';

// --- RENDER MAP ---
const mapCanvas = document.getElementById('map-canvas');
let svgHTML = `
    <circle cx="4000" cy="4000" r="3800" fill="#050508" stroke="#111" stroke-width="20"/>
    <line x1="4000" y1="100" x2="4000" y2="7900" class="sector-line"/>
    <line x1="100" y1="4000" x2="7900" y2="4000" class="sector-line"/>
    <text x="4500" y="3000" class="sector-label">ZAVARES</text>
    <text x="2000" y="3000" class="sector-label">TERRAN CORE</text>
`;

systemsDB.forEach(sys => {
    svgHTML += `<g transform="translate(${sys.x}, ${sys.y})">`;
    sys.planets.forEach(p => {
        let px = Math.cos(p.angle * Math.PI / 180) * p.dist;
        let py = Math.sin(p.angle * Math.PI / 180) * p.dist;
        svgHTML += `<circle cx="0" cy="0" r="${p.dist}" class="orbit zoom-lvl-3"/>`;
        svgHTML += `<circle cx="${px}" cy="${py}" r="${p.size}" fill="${p.color}" class="clickable zoom-lvl-3" onclick="loadLore('${sys.id}', '${p.id}')"/>`;
        svgHTML += `<text x="${px + p.size + 5}" y="${py + 5}" class="planet-label zoom-lvl-3">${p.name}</text>`;
    });
    svgHTML += `<circle cx="0" cy="0" r="${sys.size}" fill="${sys.color}" class="clickable" onclick="loadLore('${sys.id}', null)"/>`;
    svgHTML += `<text x="${-sys.size}" y="${sys.size + 40}" class="system-label">${sys.name}</text></g>`;
});
mapCanvas.innerHTML = svgHTML;

// --- LORE LOADER ---
function loadLore(sysId, planetId) {
    let sys = systemsDB.find(s => s.id === sysId);
    let target = planetId ? sys.planets.find(p => p.id === planetId) : sys;
    
    document.getElementById('panel-title').innerText = target.name;
    document.getElementById('panel-desc').innerText = target.desc;
    document.getElementById('panel-resources').innerText = target.resources ? "Resources: " + target.resources : "";
}

// --- NAVIGATION & ZOOM LOGIC ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
}

const viewport = document.getElementById('map-viewport');
let scale = 0.15, panX = -200, panY = -200, isDragging = false, startX, startY;

function updateTransform() {
    mapCanvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    if (scale < 0.4) viewport.setAttribute('data-zoom', '1');
    else if (scale < 1.2) viewport.setAttribute('data-zoom', '2');
    else viewport.setAttribute('data-zoom', '3');
}
updateTransform();

viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = viewport.getBoundingClientRect();
    let newScale = Math.max(0.1, Math.min(scale * (1 + (e.deltaY < 0 ? 1 : -1) * 0.15), 4.0));
    const ratio = newScale / scale;
    panX = (e.clientX - rect.left) - ((e.clientX - rect.left) - panX) * ratio;
    panY = (e.clientY - rect.top) - ((e.clientY - rect.top) - panY) * ratio;
    scale = newScale; updateTransform();
});

viewport.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX - panX; startY = e.clientY - panY; });
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('mousemove', (e) => { if (isDragging) { panX = e.clientX - startX; panY = e.clientY - startY; updateTransform(); }});
