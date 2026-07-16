// ==========================================
// XSV STARDUST - MAIN APPLICATION ENGINE
// ==========================================

// --- PAGE NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    
    const titles = { 
        'home': 'HOME STATION', 'rules': 'STARDUST RULES', 'crew': 'CREW REGISTRY', 
        'map': 'ASTROMETRICS NAV', 'lore': 'LORE STORAGE BANKS', 'vessels': 'FLEET REGISTRY' 
    };
    document.getElementById('header-title').innerText = titles[pageId];
}

// --- RENDER CREW ---
const crewContainer = document.getElementById('crew-container');
if (typeof crewDB !== 'undefined') {
    crewDB.forEach(crew => {
        crewContainer.innerHTML += `
            <div class="crew-card">
                <img src="${crew.sl_pic}" class="crew-pic" alt="Profile Pic">
                <div class="crew-info">
                    <h3 style="color:#ff9900; margin-top:0;">${crew.name}</h3>
                    <p style="margin: 5px 0;"><strong>Rank:</strong> ${crew.rank} | <strong>Dept:</strong> ${crew.dept}</p>
                    <p style="margin: 10px 0;">${crew.bio}</p>
                    <a href="${crew.sl_link}" class="sl-link" target="_blank">View Second Life Profile</a>
                </div>
            </div>`;
    });
}

// --- RENDER VESSELS ---
const vesselList = document.getElementById('vessel-list');
if (typeof vesselsDB !== 'undefined') {
    vesselsDB.forEach(vessel => {
        vesselList.innerHTML += `<button class="vessel-btn" onclick="loadVessel('${vessel.id}')">${vessel.name}</button>`;
    });
}

function loadVessel(id) {
    const v = vesselsDB.find(v => v.id === id);
    document.getElementById('vessel-details').style.display = 'block';
    document.getElementById('vessel-name').innerText = v.name + " (" + v.class + ")";
    document.getElementById('vessel-desc').innerText = v.desc;
    
    let statsHTML = "";
    v.stats.forEach(stat => {
        statsHTML += `<div class="stat-row"><span>${stat.label}:</span> <input type="text" value="${stat.value}"></div>`;
    });
    document.getElementById('vessel-stats').innerHTML = statsHTML;
}

// --- RENDER LORE STORAGE ---
const loreList = document.getElementById('lore-list');
if (typeof loreStorageDB !== 'undefined') {
    loreStorageDB.forEach(lore => {
        loreList.innerHTML += `<button class="lore-btn" onclick="loadStorageLore('${lore.id}')">${lore.title} <span style="float:right; color:#888;">${lore.date}</span></button>`;
    });
}

function loadStorageLore(id) {
    const l = loreStorageDB.find(l => l.id === id);
    document.getElementById('lore-reader').style.display = 'block';
    document.getElementById('lore-reader-title').innerText = l.title;
    document.getElementById('lore-reader-date').innerText = "Logged: " + l.date;
    document.getElementById('lore-reader-content').innerText = l.content;
}

// --- RENDER RULES ---
document.getElementById('rules-container').innerHTML = `
    <div class="card"><h3 style="color:#99ccff;">Dress Code</h3><p>Short skirts, thigh-highs, and bodysuits encouraged. Civilian attire allowed off-duty.</p></div>
    <div class="card"><h3 style="color:#99ccff;">IC Protocols</h3><p>Alarms suspend all personal activities. Lavatory usage is strictly rationed.</p></div>
    <div class="card"><h3 style="color:#99ccff;">OOC Limits</h3><p>18+ environment. Consent required for combat/ERP. No God-Modding or Meta-Gaming.</p></div>
`;

// ==========================================
// MAP ENGINE & ZOOM LOGIC
// ==========================================
const mapCanvas = document.getElementById('map-canvas');

if (typeof systemsDB !== 'undefined' && mapCanvas) {
    let svgHTML = `
        <!-- GALAXY BACKGROUND -->
        <circle cx="4000" cy="4000" r="3800" fill="#050508" stroke="#111" stroke-width="20"/>
        
        <!-- SECTOR DIVIDERS -->
        <line x1="4000" y1="100" x2="4000" y2="7900" class="sector-line"/>
        <line x1="100" y1="4000" x2="7900" y2="4000" class="sector-line"/>
        <line x1="1242" y1="1242" x2="6758" y2="6758" class="sector-line"/>
        <line x1="1242" y1="6758" x2="6758" y2="1242" class="sector-line"/>
        
        <!-- SECTOR LABELS -->
        <text x="4500" y="3000" class="sector-label">ZAVARES</text>
        <text x="2000" y="3000" class="sector-label">TERRAN CORE</text>
        <text x="1500" y="6000" class="sector-label">VOSSK EMPIRE</text>
        <text x="5500" y="2000" class="sector-label">NIVELIAN REP.</text>
        <text x="6000" y="6000" class="sector-label">ABYSSAL REACH</text>
        <text x="1000" y="1500" class="sector-label">RADIANT CORE</text>

        <!-- TRADE ROUTES -->
        <path d="M 4000 4000 L 4500 3500 L 5500 3800" class="trade-route"/>
        <path d="M 4000 4000 L 2500 3000 L 2800 2200" class="trade-route"/>
        <path d="M 2500 3000 L 3200 5000 L 3000 6000" class="trade-route"/>
        <path d="M 4000 4000 L 3500 1500" class="trade-route"/>
    `;

    systemsDB.forEach(sys => {
        svgHTML += `<g transform="translate(${sys.x}, ${sys.y})">`;
        
        // Draw Planets
        if (sys.planets) {
            sys.planets.forEach(p => {
                let px = Math.cos(p.angle * Math.PI / 180) * p.dist;
                let py = Math.sin(p.angle * Math.PI / 180) * p.dist;
                
                svgHTML += `<circle cx="0" cy="0" r="${p.dist}" class="orbit zoom-lvl-3"/>`;
                
                if(p.type === 'station') {
                    svgHTML += `<rect x="${px - p.size/2}" y="${py - p.size/2}" width="${p.size}" height="${p.size}" fill="${p.color}" class="clickable zoom-lvl-3" onclick="loadMapLore('${sys.id}', '${p.id}')"/>`;
                } else {
                    svgHTML += `<circle cx="${px}" cy="${py}" r="${p.size}" fill="${p.color}" class="clickable zoom-lvl-3" onclick="loadMapLore('${sys.id}', '${p.id}')"/>`;
                }
                svgHTML += `<text x="${px + p.size + 5}" y="${py + 5}" class="planet-label zoom-lvl-3">${p.name}</text>`;
            });
        }

        // Draw Star
        if(sys.type === 'blackhole') {
            svgHTML += `<circle cx="0" cy="0" r="${sys.size + 20}" fill="rgba(100,0,255,0.2)" class="zoom-lvl-2"/>`;
            svgHTML += `<circle cx="0" cy="0" r="${sys.size}" fill="#000" stroke="#fff" stroke-width="2" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        } else if (sys.type === 'wormhole') {
            svgHTML += `<circle cx="0" cy="0" r="${sys.size}" fill="none" stroke="${sys.color}" stroke-width="10" stroke-dasharray="20,10" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        } else if (sys.type === 'station') {
            svgHTML += `<rect x="${-sys.size/2}" y="${-sys.size/2}" width="${sys.size}" height="${sys.size}" fill="${sys.color}" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        } else {
            svgHTML += `<circle cx="0" cy="0" r="${sys.size}" fill="${sys.color}" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        }
        
        svgHTML += `<text x="${-sys.size}" y="${sys.size + 40}" class="system-label">${sys.name}</text>`;
        svgHTML += `</g>`;
    });

    mapCanvas.innerHTML = svgHTML;
}

// --- MAP LORE LOADER ---
function loadMapLore(sysId, planetId) {
    let sys = systemsDB.find(s => s.id === sysId);
    let target = planetId ? sys.planets.find(p => p.id === planetId) : sys;
    
    if(target) {
        document.getElementById('panel-title').innerText = target.name;
        document.getElementById('panel-desc').innerText = target.desc;
        document.getElementById('panel-resources').innerText = target.resources ? "Resources: " + target.resources : "";
    }
}

// --- SEMANTIC ZOOM & PAN LOGIC ---
const viewport = document.getElementById('map-viewport');
let scale = 0.15; 
let panX = -200;
let panY = -200;
let isDragging = false;
let startX, startY;

function updateTransform() {
    if (!mapCanvas) return;
    mapCanvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    
    if (scale < 0.4) viewport.setAttribute('data-zoom', '1');
    else if (scale >= 0.4 && scale < 1.2) viewport.setAttribute('data-zoom', '2');
    else viewport.setAttribute('data-zoom', '3');
}
updateTransform();

if (viewport) {
    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const zoomFactor = 0.15;
        const direction = e.deltaY < 0 ? 1 : -1;
        let newScale = scale * (1 + direction * zoomFactor);
        newScale = Math.max(0.1, Math.min(newScale, 4.0));

        const scaleRatio = newScale / scale;
        panX = mouseX - (mouseX - panX) * scaleRatio;
        panY = mouseY - (mouseY - panY) * scaleRatio;
        
        scale = newScale;
        updateTransform();
    });

    viewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => { isDragging = false; viewport.style.cursor = 'grab'; });
    window.addEventListener('mouseleave', () => { isDragging = false; viewport.style.cursor = 'grab'; });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateTransform();
    });
}
