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
crewDB.forEach(crew => {
    crewContainer.innerHTML += `
        <div class="crew-card">
            <img src="${crew.sl_pic}" class="crew-pic" alt="Profile Pic">
            <div class="crew-info">
                <h3 style="color:#ff9900;">${crew.name}</h3>
                <p style="margin: 5px 0;"><strong>Rank:</strong> ${crew.rank} | <strong>Dept:</strong> ${crew.dept}</p>
                <p style="margin: 10px 0;">${crew.bio}</p>
                <a href="${crew.sl_link}" class="sl-link" target="_blank">View Second Life Profile</a>
            </div>
        </div>`;
});

// --- RENDER VESSELS ---
const vesselList = document.getElementById('vessel-list');
vesselsDB.forEach(vessel => {
    vesselList.innerHTML += `<button class="vessel-btn" onclick="loadVessel('${vessel.id}')">${vessel.name}</button>`;
});

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
loreStorageDB.forEach(lore => {
    loreList.innerHTML += `<button class="lore-btn" onclick="loadStorageLore('${lore.id}')">${lore.title} <span style="float:right; color:#888;">${lore.date}</span></button>`;
});

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

// --- MAP ENGINE (Keep your existing map code here!) ---
// (Paste the map rendering and zoom logic from the previous app.js here)
