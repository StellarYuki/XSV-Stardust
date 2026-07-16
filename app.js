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
                <img src="${crew.sl_pic}" class="crew-pic" alt="Profile Pic" onerror="this.src='https://via.placeholder.com/100/000000/ff9900?text=PIC'">
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

// --- RENDER FULL RULES ---
document.getElementById('rules-container').innerHTML = `
    <div class="text-block">
        <h3 style="color:#99ccff;">INTRODUCTION</h3>
        <p>Welcome aboard the XSV Stardust! We are an independent mercenary crew. This vessel is a heavily modified Type-17 Argo-class shuttle. Originally designed to carry a cargo buggy, the aft section has been completely retrofitted to support deep-space, long-duration roleplay.</p>
        <p>Amenities are minimal. We have a Bridge, a small Teleporter pad, 4 cramped bunks, a tiny lounge with a 4-seat table, and a compact engineering section. Whether we are docked at a station or exploring deep space, this shuttle serves as our mobile home. We encourage collaborative, creative storytelling where everyone gets to contribute!</p>
    </div>

    <div class="text-block">
        <h3 style="color:#99ccff;">DEPARTMENTS & COLORS</h3>
        <p>Our crew uses a color-coding system to easily identify everyone's primary role:</p>
        <p>• <strong>BLUE (Command & CONN):</strong> The leaders and pilots.<br>
        • <strong>RED (Security & Tactical):</strong> The protectors and weapons specialists.<br>
        • <strong>YELLOW (Engineering & Operations):</strong> The fixers and system mechanics.<br>
        • <strong>BURGUNDY (Science & Medical):</strong> The researchers and healers.</p>
    </div>

    <div class="text-block">
        <h3 style="color:#99ccff;">DRESS CODE & UNIFORMS</h3>
        <p>We are open to most uniforms! While we have "official" uniforms linked below, you may wear what you like as long as it stays within the sci-fi/Trek theme. Civilian attire is also completely allowed while off-duty in the living quarters.</p>
        <p>• <strong>Females:</strong> Short skirts, thigh-highs, bodysuits, and form-fitting attire are highly encouraged!<br>
        • <strong>Males:</strong> For men... pants. XD (Bodysuit uniforms are highly encouraged as well!)</p>
        
        <p style="color:#ff9900; margin-bottom:5px;"><strong>Official Female Duty Uniforms:</strong></p>
        <a href="https://marketplace.secondlife.com/p/Jazabelle-Deep-Space-69-complete-outfit/22834766" target="_blank" class="sl-link">Jazabelle 'Deep Space 69'</a>
        <a href="https://marketplace.secondlife.com/p/Jazabelle-To-Boldly-Go-complete-outfit/28087979" target="_blank" class="sl-link">Jazabelle 'To Boldly Go'</a>
        <a href="https://marketplace.secondlife.com/p/JRF-Uniform-2360s-Female/14669939" target="_blank" class="sl-link">[JRF] Uniform - 2360s</a>

        <p style="color:#ff9900; margin-top:15px; margin-bottom:5px;"><strong>Official Male Duty Uniforms:</strong></p>
        <a href="https://marketplace.secondlife.com/p/Mercer-Fleet-Officer-Blue/23627398" target="_blank" class="sl-link">Mercer Fleet Officer</a>
        <a href="https://marketplace.secondlife.com/p/WW-2371-Uniform-Male/25932021" target="_blank" class="sl-link">WW 2371 Uniform</a>
        <a href="https://marketplace.secondlife.com/p/JRF-Uniform-2360s-Male/14991576" target="_blank" class="sl-link">JRF 2360s Uniform</a>

        <p style="color:#ff9900; margin-top:15px; margin-bottom:5px;"><strong>Official Equipment and Rank Pips:</strong></p>
        <a href="https://marketplace.secondlife.com/p/TerraCo-Rank-Pips-Standard-Officer/9390312" target="_blank" class="sl-link">TerraCo Rank Pips</a>
        <a href="https://marketplace.secondlife.com/p/JRF-Equipment-S3RP-STP-Tricorder/25896747" target="_blank" class="sl-link">[JRF] Tricorder</a>
        <a href="https://marketplace.secondlife.com/p/JRF-Equipment-Med-Kit/22241217" target="_blank" class="sl-link">[JRF] Med Kit</a>
        <a href="https://marketplace.secondlife.com/p/JRF-Weapon-Phaser-sidearm-Type-2-MK6/25896599" target="_blank" class="sl-link">[JRF] Phaser Sidearm</a>
        <a href="https://marketplace.secondlife.com/p/JRF-Weapon-Phaser-rifle-Type-3-MK10/25896366" target="_blank" class="sl-link">[JRF] Phaser Rifle</a>
    </div>

    <div class="text-block">
        <h3 style="color:#99ccff;">RANK PIPS & HUD SYSTEM</h3>
        <p>We use the JRF Equipment HUD system for our overhead titlers and gear. Please set your titler to display your Name, Rank, and "XSV Stardust". Your rank is displayed on your collar using a 6-tier pip system. Rank implies responsibility in the RP, not just power.</p>
        <p>🟡🟡🟡🟡 | Captain (Mission Commander)<br>
        🟡🟡🟡 | Commander (First Officer)<br>
        ⚫🟡🟡 | Lieutenant Commander<br>
        🟡🟡 | Lieutenant<br>
        ⚫🟡 | Lieutenant J.G. (Junior Grade)<br>
        🟡 | Ensign</p>
    </div>

    <div class="text-block">
        <h3 style="color:#99ccff;">SHUTTLE OPERATIONS & IC PROTOCOLS</h3>
        <p><strong>1. ALARMS & RED ALERTS:</strong> When the ship's alarm sounds, all crew are expected to immediately return to their duty station and remain there until the alert is cleared or the mission dictates otherwise. All personal activities are suspended.</p>
        <p><strong>2. RESOURCE CONSERVATION:</strong> Due to the shuttle's limited water-reclamation and life-support capacities, lavatory and sonic shower usage is strictly rationed. Access is logged and restricted to scheduled cycles. Holding it is part of the job, and unauthorized use will result in IC reprimands.</p>
        <p><strong>3. REPLICATOR RATIONS:</strong> The mess replicator draws heavily on the warp core. Replicator use is limited to basic rations, water, and coffee. Luxury items or complex meals require Command authorization.</p>
        <p><strong>4. CRAMPED QUARTERS:</strong> Space is at a premium. Keep your personal gear stowed in your designated bunk area. If you leave your equipment lying around the lounge or bridge, expect Command to place it in the community locker (or the recycler).</p>
        <p><strong>5. MAINTENANCE DUTY:</strong> We don't have a dedicated janitorial staff. Everyone, regardless of rank, is expected to help scrub the decks, patch conduits, and keep the ship flying.</p>
    </div>

    <div class="text-block">
        <h3 style="color:#99ccff;">OOC RULES, LIMITS & CONSENT</h3>
        <p><strong>1. ADULT THEMES & ERP:</strong> This is a strictly 18+ environment. Lewd scenes and ERP are allowed, but please try to keep them out of the main open areas during active missions. If you get caught fooling around by a superior officer, expect IC consequences!</p>
        <p><strong>2. CONSENT IS REQUIRED:</strong> Ask for a person's consent and limits before proceeding with combat, sexual touching/teasing, mutilation, perma-death, or any altercations that permanently damage a character's mental or physical state.</p>
        <p><strong>3. NO GOD-MODDING OR POWER-GAMING:</strong> Your character is not invincible. You cannot force actions on another player without their OOC consent, and you cannot play a character that is akin to a god. Characters must have weaknesses to offset their strengths.</p>
        <p><strong>4. NO META-GAMING:</strong> Do not use Out-Of-Character (OOC) information for an In-Character (IC) situation. Your character must be at the scene of an active RP (or access an RP terminal) to obtain information.</p>
        <p><strong>5. CONSEQUENCES:</strong> In-character actions have consequences. You cannot claim something is against your limits if you set yourself up for it (e.g., if you steal IC'ly and get caught, you cannot claim being cuffed is against your limits).</p>
        <p><strong>6. IC vs. OOC ETIQUETTE:</strong> Keep OOC chatter to a minimum during active roleplay. Use brackets for OOC: (( like this )). Use quotes for speaking: "Like this."</p>
        <p><strong>7. APPEARANCE:</strong> No child or underage avatars. Characters must look realistic and fit within a sci-fi setting. No excessive glow, particles, or full-bright attachments. Copyright/parody characters (e.g., playing exactly as Obi-Wan) are not allowed.</p>
        <p><strong>8. NO GRIEFING OR SPAMMING:</strong> Do not use weapons, pushers, particle spammers, or disruptive HUDs inside the shuttle.</p>
        <p><strong>9. HAVE FUN:</strong> Above all else, we are here to tell a great story together! If any problems occur between players, try to talk it out OOC'ly before approaching management.</p>
    </div>
`;

// ==========================================
// MAP ENGINE & ZOOM LOGIC
// ==========================================
const mapCanvas = document.getElementById('map-canvas');

if (typeof systemsDB !== 'undefined' && mapCanvas) {
    let svgHTML = `
        <!-- GALAXY BACKGROUND -->
        <circle cx="4000" cy="4000" r="3800" fill="#050508" stroke="#111" stroke-width="20"/>
    `;

    // --- DRAW 16 CURVED SECTORS ---
    const numSectors = 16;
    const cx = 4000, cy = 4000, r = 3800;
    const sectorNames = [
        "ZAVARES", "TERRAN CORE", "VOSSK EMPIRE", "NIVELIAN REP.", 
        "MIDORIAN", "LOMA PIRATES", "THE VOID", "ABYSSAL REACH",
        "RADIANT CORE", "OBSIDIAN MARCHES", "OUTER RIM", "NEBULA WASTES",
        "SHATTERED EXPANSE", "SILENT SECTOR", "FRONTIER", "UNKNOWN REGIONS"
    ];

    for (let i = 0; i < numSectors; i++) {
        let angle1 = (i * 360 / numSectors) * (Math.PI / 180);
        let angle2 = ((i + 1) * 360 / numSectors) * (Math.PI / 180);
        
        // Calculate end points on the circle
        let x1 = cx + r * Math.cos(angle1);
        let y1 = cy + r * Math.sin(angle1);
        
        // Calculate a control point to make it curve (swirl effect)
        let ctrlAngle = angle1 + 0.3; 
        let ctrlX = cx + (r * 0.5) * Math.cos(ctrlAngle);
        let ctrlY = cy + (r * 0.5) * Math.sin(ctrlAngle);

        // Draw the curved line
        svgHTML += `<path d="M ${cx} ${cy} Q ${ctrlX} ${ctrlY} ${x1} ${y1}" class="sector-line" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10" stroke-dasharray="40,20"/>`;
        
        // Place Sector Label in the middle of the slice
        let midAngle = (angle1 + angle2) / 2;
        let labelX = cx + (r * 0.7) * Math.cos(midAngle);
        let labelY = cy + (r * 0.7) * Math.sin(midAngle);
        
        // Rotate text to match the slice
        let rot = (midAngle * 180 / Math.PI) + 90;
        if (rot > 90 && rot < 270) rot += 180; // Keep text upright
        
        svgHTML += `<text x="${labelX}" y="${labelY}" class="sector-label" transform="rotate(${rot}, ${labelX}, ${labelY})" text-anchor="middle" fill="#333" font-size="100" font-weight="bold" letter-spacing="5" style="pointer-events:none;">${sectorNames[i]}</text>`;
    }

    // --- DRAW SYSTEMS & PLANETS ---
    systemsDB.forEach(sys => {
        svgHTML += `<g transform="translate(${sys.x}, ${sys.y})">`;
        
        // Draw Planets
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
