// ==========================================
// MAP ENGINE & ZOOM LOGIC
// ==========================================
const mapCanvas = document.getElementById('map-canvas');

if (typeof systemsDB !== 'undefined' && mapCanvas) {
    let svgHTML = `
        <!-- GALAXY BACKGROUND -->
        <circle cx="4000" cy="4000" r="3800" fill="#050508" stroke="#111" stroke-width="20"/>
    `;

    // --- DRAW 8 ORGANIC SECTORS (Country-like borders) ---
    const sectorBorders = [
        "M 4000 4000 L 3800 3000 L 3500 2000 L 4000 1000 L 3500 0", // Separates Terran & Midorian
        "M 4000 4000 L 4500 3500 L 5000 2500 L 5500 1500 L 6000 0", // Separates Midorian & Zavares
        "M 4000 4000 L 5000 4200 L 6000 4500 L 7000 4000 L 8000 4500", // Separates Zavares & Nivelian
        "M 4000 4000 L 4500 5000 L 5500 6000 L 6500 7000 L 8000 7500", // Separates Nivelian & Abyssal
        "M 4000 4000 L 4200 5000 L 4000 6000 L 4500 7000 L 4000 8000", // Separates Abyssal & Loma
        "M 4000 4000 L 3500 4500 L 2500 5500 L 2000 7000 L 1500 8000", // Separates Loma & Vossk
        "M 4000 4000 L 3000 4200 L 2000 4500 L 1000 5000 L 0 5500", // Separates Vossk & Void
        "M 4000 4000 L 3000 3500 L 2000 3000 L 1000 2500 L 0 2000"  // Separates Void & Terran
    ];

    sectorBorders.forEach(path => {
        svgHTML += `<path d="${path}" class="sector-line" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="15" stroke-linejoin="round"/>`;
    });

    // --- 8 SECTOR LABELS (Placed inside the organic borders) ---
    const sectors = [
        { name: "TERRAN CORE", x: 2500, y: 2000 },
        { name: "MIDORIAN", x: 4500, y: 1500 },
        { name: "ZAVARES", x: 6000, y: 3000 },
        { name: "NIVELIAN REP.", x: 6500, y: 5000 },
        { name: "ABYSSAL REACH", x: 5500, y: 7000 },
        { name: "LOMA PIRATES", x: 3500, y: 6500 },
        { name: "VOSSK EMPIRE", x: 1500, y: 6000 },
        { name: "THE VOID", x: 1200, y: 3500 }
    ];

    sectors.forEach(sec => {
        svgHTML += `<text x="${sec.x}" y="${sec.y}" class="sector-label" text-anchor="middle" fill="#333" font-size="140" font-weight="bold" letter-spacing="10" style="pointer-events:none;">${sec.name}</text>`;
    });

    // --- DRAW SYSTEMS & PLANETS ---
    systemsDB.forEach(sys => {
        svgHTML += `<g transform="translate(${sys.x}, ${sys.y})">`;
        
        // Draw Planets (Only visible when zoomed in)
        if (sys.planets) {
            sys.planets.forEach(p => {
                let px = Math.cos(p.angle * Math.PI / 180) * p.dist;
                let py = Math.sin(p.angle * Math.PI / 180) * p.dist;
                
                svgHTML += `<circle cx="0" cy="0" r="${p.dist}" class="orbit zoom-lvl-3" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>`;
                
                if(p.type === 'station') {
                    svgHTML += `<rect x="${px - p.size/2}" y="${py - p.size/2}" width="${p.size}" height="${p.size}" fill="${p.color}" class="clickable zoom-lvl-3" onclick="loadMapLore('${sys.id}', '${p.id}')"/>`;
                } else {
                    svgHTML += `<circle cx="${px}" cy="${py}" r="${p.size}" fill="${p.color}" class="clickable zoom-lvl-3" onclick="loadMapLore('${sys.id}', '${p.id}')"/>`;
                }
                svgHTML += `<text x="${px + p.size + 5}" y="${py + 5}" class="planet-label zoom-lvl-3" fill="#aaa" font-size="20" style="pointer-events:none;">${p.name}</text>`;
            });
        }

        // Draw Star (Always visible)
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
        
        svgHTML += `<text x="${-sys.size}" y="${sys.size + 40}" class="system-label" fill="#fff" font-size="40" style="pointer-events:none;">${sys.name}</text>`;
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

// --- PERFECTED ZOOM & PAN LOGIC ---
const viewport = document.getElementById('map-viewport');
// Start zoomed out to see the whole 8000x8000 galaxy
let scale = 0.12; 
let panX = 0;
let panY = 0;
let isDragging = false;
let startX, startY;

function updateTransform() {
    if (!mapCanvas) return;
    mapCanvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    
    // Semantic Zoom Classes
    if (scale < 0.3) viewport.setAttribute('data-zoom', '1'); // Galaxy
    else if (scale >= 0.3 && scale < 1.0) viewport.setAttribute('data-zoom', '2'); // Systems
    else viewport.setAttribute('data-zoom', '3'); // Planets
}

// Center the map on load
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

        // Convert mouse position to SVG coordinates
        const svgX = (mouseX - panX) / scale;
        const svgY = (mouseY - panY) / scale;

        const zoomFactor = 0.15;
        const direction = e.deltaY < 0 ? 1 : -1;
        let newScale = scale * (1 + direction * zoomFactor);
        
        // Clamp zoom (0.05 = fully zoomed out, 4.0 = fully zoomed in)
        newScale = Math.max(0.05, Math.min(newScale, 4.0));

        // Adjust pan so the SVG coordinate stays under the mouse
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
