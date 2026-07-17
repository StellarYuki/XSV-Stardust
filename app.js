// ==========================================
// PAGE NAVIGATION LOGIC
// ==========================================
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    
    const titles = {
        'home': 'HOME STATION',
        'rules': 'RULES & GUIDE',
        'crew': 'CREW REGISTRY',
        'map': 'ASTROMETRICS NAV',
        'lore': 'LORE STORAGE BANKS',
        'vessels': 'FLEET REGISTRY'
    };
    document.getElementById('header-title').innerText = titles[pageId];

    // Auto-load rules into the rules container
    if (pageId === 'rules') {
        const rulesContainer = document.getElementById('rules-container');
        const rulesLore = db_lore.find(l => l.title.includes("Rules"));
        if (rulesLore) {
            rulesContainer.innerHTML = `<div class="card"><p style="white-space: pre-wrap;">${rulesLore.content}</p></div>`;
        }
    }
}

// ==========================================
// POPULATE DATA PAGES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Populate Crew
    const crewContainer = document.getElementById('crew-container');
    if (crewContainer && typeof db_crew !== 'undefined') {
        db_crew.forEach(member => {
            crewContainer.innerHTML += `
                <div class="crew-card">
                    <div class="crew-pic"></div>
                    <div class="crew-info">
                        <h3 style="color:#ff9900; margin-bottom:5px;">${member.name}</h3>
                        <p style="margin:0; color:#fff;"><strong>Rank:</strong> ${member.rank} <span style="letter-spacing:2px;">${member.pips}</span></p>
                        <p style="margin:0; color:#ccc;"><strong>Dept:</strong> ${member.department}</p>
                        <a href="${member.profile}" class="sl-link" target="_blank">View SL Profile</a>
                    </div>
                </div>
            `;
        });
    }

    // Populate Lore (Grouped by Category)
    const loreList = document.getElementById('lore-list');
    if (loreList && typeof db_lore !== 'undefined') {
        const categories = ["Roleplay", "Organizations", "Species", "Locations"];
        
        categories.forEach(cat => {
            let catHTML = `<div style="margin-bottom: 10px;"><h3 style="color:#99ccff; border-bottom:1px solid #333; padding-bottom:5px;">${cat}</h3>`;
            db_lore.forEach((lore, index) => {
                if (lore.category === cat) {
                    catHTML += `<button class="lore-btn" onclick="showLore(${index})">${lore.title}</button>`;
                }
            });
            catHTML += `</div>`;
            loreList.innerHTML += catHTML;
        });
    }

    // Populate Vessels
    const vesselList = document.getElementById('vessel-list');
    if (vesselList && typeof db_vessels !== 'undefined') {
        db_vessels.forEach((vessel, index) => {
            vesselList.innerHTML += `<button class="vessel-btn" onclick="showVessel(${index})">${vessel.name}</button>`;
        });
    }
});

function showLore(index) {
    const lore = db_lore[index];
    document.getElementById('lore-reader').style.display = 'block';
    document.getElementById('lore-reader-title').innerText = lore.title;
    document.getElementById('lore-reader-date').innerText = `Category: ${lore.category}`;
    document.getElementById('lore-reader-content').innerText = lore.content;
}

function showVessel(index) {
    const vessel = db_vessels[index];
    document.getElementById('vessel-details').style.display = 'block';
    document.getElementById('vessel-name').innerText = vessel.name;
    document.getElementById('vessel-desc').innerText = vessel.overview;
    
    document.getElementById('vessel-stats').innerHTML = `
        <p><strong>Class:</strong> ${vessel.class}</p>
        <p><strong>Type:</strong> ${vessel.type}</p>
        <p><strong>Manufacturer:</strong> ${vessel.manufacturer}</p>
        <p><strong>Dimensions:</strong> ${vessel.dimensions}</p>
        <p><strong>Crew:</strong> ${vessel.crew}</p>
        <p><strong>Weapons:</strong> ${vessel.weapons}</p>
        <hr style="border-color:#333; margin:15px 0;">
        <p style="color:#aaa; white-space: pre-wrap;">${vessel.history}</p>
        <p style="color:#99ccff; font-size:12px; margin-top:10px; white-space: pre-wrap;">${vessel.notes}</p>
    `;
}

// ==========================================
// MAP ENGINE & ZOOM LOGIC
// ==========================================
const mapCanvas = document.getElementById('map-canvas');

if (typeof db_systems !== 'undefined' && mapCanvas) {
    let svgHTML = `
        <!-- GALAXY BACKGROUND -->
        <circle cx="4000" cy="4000" r="3800" fill="#050508" stroke="#111" stroke-width="20"/>
    `;

    // --- DRAW 8 ORGANIC SECTORS ---
    const sectorBorders = [
        "M 4000 4000 L 3800 3000 L 3500 2000 L 4000 1000 L 3500 0", 
        "M 4000 4000 L 4500 3500 L 5000 2500 L 5500 1500 L 6000 0", 
        "M 4000 4000 L 5000 4200 L 6000 4500 L 7000 4000 L 8000 4500", 
        "M 4000 4000 L 4500 5000 L 5500 6000 L 6500 7000 L 8000 7500", 
        "M 4000 4000 L 4200 5000 L 4000 6000 L 4500 7000 L 4000 8000", 
        "M 4000 4000 L 3500 4500 L 2500 5500 L 2000 7000 L 1500 8000", 
        "M 4000 4000 L 3000 4200 L 2000 4500 L 1000 5000 L 0 5500", 
        "M 4000 4000 L 3000 3500 L 2000 3000 L 1000 2500 L 0 2000"  
    ];

    sectorBorders.forEach(path => {
        svgHTML += `<path d="${path}" class="sector-line" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="15" stroke-linejoin="round"/>`;
    });

    // --- DRAW SYSTEMS & PLANETS ---
    db_systems.forEach(sys => {
        // WIDER SPACING: Multiply the -1000 to 1000 grid by 4 to spread them across the 8000x8000 canvas
        let svgX = (sys.x + 1000) * 4; 
        let svgY = (sys.y + 1000) * 4;

        svgHTML += `<g transform="translate(${svgX}, ${svgY})">`;
        
        // Draw Planets
        if (sys.planets) {
            sys.planets.forEach(p => {
                let scaledRadius = p.orbitRadius * 2.5; // Push orbits out further
                let px = Math.cos(p.angle) * scaledRadius;
                let py = Math.sin(p.angle) * scaledRadius;
                
                svgHTML += `<circle cx="0" cy="0" r="${scaledRadius}" class="orbit zoom-lvl-3" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>`;
                
                let pColor = getPlanetColor(p.type);
                svgHTML += `<circle cx="${px}" cy="${py}" r="15" fill="${pColor}" class="clickable zoom-lvl-3" onclick="loadMapLore('${sys.id}', '${p.name}')"/>`;
                svgHTML += `<text x="${px + 20}" y="${py + 5}" class="planet-label zoom-lvl-3" fill="#aaa" font-size="20" style="pointer-events:none;">${p.name}</text>`;

                if (p.hasStation) {
                    svgHTML += `<rect x="${px - 10}" y="${py - 10}" width="20" height="20" fill="#ff00ff" class="clickable zoom-lvl-3" style="opacity:0.5;" onclick="loadMapLore('${sys.id}', '${p.name}')"/>`;
                }
            });
        }

        // Draw Star
        let starSize = 35;
        if(sys.type === 'Black Hole') {
            svgHTML += `<circle cx="0" cy="0" r="${starSize + 20}" fill="rgba(100,0,255,0.2)" class="zoom-lvl-2"/>`;
            svgHTML += `<circle cx="0" cy="0" r="${starSize}" fill="#000" stroke="#fff" stroke-width="2" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        } else if (sys.type === 'Wormhole') {
            svgHTML += `<circle cx="0" cy="0" r="${starSize}" fill="none" stroke="${sys.color}" stroke-width="10" stroke-dasharray="20,10" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        } else {
            svgHTML += `<circle cx="0" cy="0" r="${starSize}" fill="${sys.color}" class="clickable" onclick="loadMapLore('${sys.id}', null)"/>`;
        }
        
        svgHTML += `<text x="${-starSize}" y="${starSize + 50}" class="system-label" fill="#fff" font-size="45" style="pointer-events:none;">${sys.name}</text>`;
        svgHTML += `</g>`;
    });

    mapCanvas.innerHTML = svgHTML;
}

function getPlanetColor(type) {
    switch(type) {
        case "Terran": return "#33cc33";
        case "Desert": return "#cc9900";
        case "Ice": return "#ccccff";
        case "Volcanic": return "#cc3300";
        case "Gas Giant": return "#cc9966";
        case "Ocean": return "#3366cc";
        case "Jungle": return "#009933";
        case "Station": return "#ff00ff";
        default: return "#888888"; 
    }
}

// --- MAP LORE LOADER (Updated for Rich Data) ---
function loadMapLore(sysId, planetName) {
    let sys = db_systems.find(s => s.id === sysId);
    
    if (planetName) {
        let planet = sys.planets.find(p => p.name === planetName);
        document.getElementById('panel-title').innerText = planet.name;
        document.getElementById('panel-desc').innerText = `Type: ${planet.type} World\nOrbit Radius: ${planet.orbitRadius}\nMoons: ${planet.moons}\n\nPopulation: ${planet.population}\nSpecies: ${planet.species}`;
        document.getElementById('panel-resources').innerText = planet.hasStation ? `Station: ${planet.stationName}` : "";
    } else {
        document.getElementById('panel-title').innerText = sys.name + " System";
        document.getElementById('panel-desc').innerText = `Star Type: ${sys.type}\nSector: ${sys.sector.toUpperCase()}`;
        document.getElementById('panel-resources').innerText = `Planetary Bodies: ${sys.planets ? sys.planets.length : 0}`;
    }
}

// --- ZOOM & PAN LOGIC ---
const viewport = document.getElementById('map-viewport');
let scale = 0.12; 
let panX = 0;
let panY = 0;
let isDragging = false;
let startX, startY;

function updateTransform() {
    if (!mapCanvas) return;
    mapCanvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    
    if (scale < 0.3) viewport.setAttribute('data-zoom', '1'); 
    else if (scale >= 0.3 && scale < 1.0) viewport.setAttribute('data-zoom', '2'); 
    else viewport.setAttribute('data-zoom', '3'); 
}

if (viewport) {
    const rect = viewport.getBoundingClientRect();
    panX = (rect.width - (8000 * scale)) / 2;
    panY = (rect.height - (8000 * scale)) / 2;
    updateTransform();

    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const svgX = (mouseX - panX) / scale;
        const svgY = (mouseY - panY) / scale;

        const zoomFactor = 0.15;
        const direction = e.deltaY < 0 ? 1 : -1;
        let newScale = scale * (1 + direction * zoomFactor);
        
        newScale = Math.max(0.05, Math.min(newScale, 4.0));

        panX = mouseX - svgX * newScale;
        panY = mouseY - svgY * newScale;
        
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
