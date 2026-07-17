// ===============================
// LCARS Navigation + Databanks + Map
// ===============================

import { loadCategories } from "./ui.js";
import { closePanel } from "./panel.js";

const header = document.getElementById("main-header");
const mainContent = document.getElementById("main-content");
const databanks = document.getElementById("databanks");
const panel = document.getElementById("db-panel");
const closePanelBtn = document.getElementById("close-panel");

const tabs = document.querySelectorAll(".lcars-tab");

window.addEventListener("DOMContentLoaded", () => {
    databanks.classList.add("hidden");
    panel.classList.remove("open");
    
    // Load Home Station by default
    header.textContent = "HOME STATION";
    mainContent.innerHTML = `
        <div class="content-section">
            <h2>⦿ WELCOME TO THE XSV STARDUST</h2>
            
            <p>
                We are an <strong>independent mercenary crew</strong> operating the XSV Stardust—a heavily modified Type-17 
                Argo-class shuttle. Our vessel is equipped with experimental technology and cutting-edge systems designed for 
                high-speed transport, escort missions, and deep-space operations.
            </p>
            
            <h3>Who We Are</h3>
            <p>
                The XSV Stardust operates primarily within the <strong>Crux Constellation</strong> under contract with the 
                <strong>Independent Services Review Board (ISRB)</strong>. We take on high-risk contracts that require speed, 
                stealth, and tactical expertise. Due to our ship's unique capabilities, we are frequently hired by Astral Supply Co. 
                to escort high-value freight through dangerous space lanes or run security patrols near major stations.
            </p>
            
            <h3>What We Do</h3>
            <ul>
                <li><strong>Mercenary Operations:</strong> High-risk escort and security missions</li>
                <li><strong>Deep-Space Exploration:</strong> Long-duration missions beyond charted space</li>
                <li><strong>Tactical Response:</strong> Fast-deployment response to emerging threats</li>
                <li><strong>Salvage & Recovery:</strong> Retrieval of valuable assets in hostile environments</li>
            </ul>
            
            <h3>Our Crew</h3>
            <p>
                We are a <strong>tight-knit team of three specialists</strong>, each bringing unique skills to every mission. 
                While our accommodations are minimal—the shuttle was never designed for comfort—our crew excels at adapting, 
                improvising, and accomplishing objectives under extreme pressure.
            </p>
            
            <h3>The Ship</h3>
            <p>
                The XSV Stardust is a marvel of retrofit engineering. Its hull composition naturally scrambles standard sensors, 
                making it difficult to track in deep space. Combined with its advanced propulsion systems and tactical capabilities, 
                the Stardust is both a home and a weapon—perfectly suited for independent operations on the edge of known space.
            </p>
            
            <h3>Join Us</h3>
            <p>
                If you're interested in joining our roleplay group aboard the XSV Stardust, please review the <strong>RULES & GUIDE</strong> 
                section for our operational procedures, dress code, and IC protocols. We welcome new crew members who are committed to 
                collaborative storytelling and creating an engaging roleplay experience for everyone.
            </p>
        </div>
    `;
});

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        const label = btn.textContent.trim();

        panel.classList.remove("open");
        databanks.classList.add("hidden");

        switch (label) {
            case "HOME STATION":
                header.textContent = "HOME STATION";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>⦿ WELCOME TO THE XSV STARDUST</h2>
                        
                        <p>
                            We are an <strong>independent mercenary crew</strong> operating the XSV Stardust—a heavily modified Type-17 
                            Argo-class shuttle. Our vessel is equipped with experimental technology and cutting-edge systems designed for 
                            high-speed transport, escort missions, and deep-space operations.
                        </p>
                        
                        <h3>Who We Are</h3>
                        <p>
                            The XSV Stardust operates primarily within the <strong>Crux Constellation</strong> under contract with the 
                            <strong>Independent Services Review Board (ISRB)</strong>. We take on high-risk contracts that require speed, 
                            stealth, and tactical expertise. Due to our ship's unique capabilities, we are frequently hired by Astral Supply Co. 
                            to escort high-value freight through dangerous space lanes or run security patrols near major stations.
                        </p>
                        
                        <h3>What We Do</h3>
                        <ul>
                            <li><strong>Mercenary Operations:</strong> High-risk escort and security missions</li>
                            <li><strong>Deep-Space Exploration:</strong> Long-duration missions beyond charted space</li>
                            <li><strong>Tactical Response:</strong> Fast-deployment response to emerging threats</li>
                            <li><strong>Salvage & Recovery:</strong> Retrieval of valuable assets in hostile environments</li>
                        </ul>
                        
                        <h3>Our Crew</h3>
                        <p>
                            We are a <strong>tight-knit team of three specialists</strong>, each bringing unique skills to every mission. 
                            While our accommodations are minimal—the shuttle was never designed for comfort—our crew excels at adapting, 
                            improvising, and accomplishing objectives under extreme pressure.
                        </p>
                        
                        <h3>The Ship</h3>
                        <p>
                            The XSV Stardust is a marvel of retrofit engineering. Its hull composition naturally scrambles standard sensors, 
                            making it difficult to track in deep space. Combined with its advanced propulsion systems and tactical capabilities, 
                            the Stardust is both a home and a weapon—perfectly suited for independent operations on the edge of known space.
                        </p>
                        
                        <h3>Join Us</h3>
                        <p>
                            If you're interested in joining our roleplay group aboard the XSV Stardust, please review the <strong>RULES & GUIDE</strong> 
                            section for our operational procedures, dress code, and IC protocols. We welcome new crew members who are committed to 
                            collaborative storytelling and creating an engaging roleplay experience for everyone.
                        </p>
                    </div>
                `;
                break;

            case "RULES & GUIDE":
                header.textContent = "RULES & GUIDE";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>🚀 WELCOME ABOARD THE XSV STARDUST</h2>
                        <p style="font-size: 13px; color: #aaa;">Official Roleplay Guide & Ship Rules</p>
                        
                        <h3>Introduction</h3>
                        <p>
                            Welcome aboard the XSV Stardust! We are an independent mercenary crew. This vessel is a heavily modified 
                            Type-17 Argo-class shuttle. Originally designed to carry a cargo buggy, the aft section has been completely 
                            retrofitted to support deep-space, long-duration roleplay.
                        </p>
                        <p>
                            Amenities are minimal. We have a Bridge, a small Teleporter pad, 4 cramped bunks, a tiny lounge with a 4-seat table, 
                            and a compact engineering section. Whether we are docked at a station or exploring deep space, this shuttle serves as 
                            our mobile home. We encourage collaborative, creative storytelling where everyone gets to contribute!
                        </p>
                        
                        <h3>🎨 Departments & Colors</h3>
                        <p>Our crew uses a color-coding system to easily identify everyone's primary role:</p>
                        <ul>
                            <li><strong>BLUE (Command & CONN):</strong> The leaders and pilots.</li>
                            <li><strong>RED (Security & Tactical):</strong> The protectors and weapons specialists.</li>
                            <li><strong>YELLOW (Engineering & Operations):</strong> The fixers and system mechanics.</li>
                            <li><strong>BURGUNDY (Science & Medical):</strong> The researchers and healers.</li>
                        </ul>
                        
                        <h3>⭐ Rank Pips & HUD System</h3>
                        <p>
                            We use the JRF Equipment HUD system for our overhead titlers and gear. Please set your titler to display your Name, 
                            Rank, and "XSV Stardust". Your rank is displayed on your collar using a 6-tier pip system. Rank implies responsibility 
                            in the RP, not just power.
                        </p>
                        
                        <h3>👗 Dress Code & Uniforms</h3>
                        <p>
                            We are open to most uniforms! While we have "official" uniforms linked below, you may wear what you like as long as 
                            it stays within the sci-fi theme. Civilian attire is also completely allowed while off-duty.
                        </p>
                        
                        <h4>Official Female Duty Uniforms:</h4>
                        <ul style="font-size: 13px;">
                            <li><strong>Jazabelle 'Deep Space 69':</strong> <a href="https://marketplace.secondlife.com/p/Jazabelle-Deep-Space-69-complete-outfit/22834766" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>Jazabelle 'To Boldly Go':</strong> <a href="https://marketplace.secondlife.com/p/Jazabelle-To-Boldly-Go-complete-outfit/28087979" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Uniform - 2360s:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Uniform-2360s-Female/14669939" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                        </ul>
                        
                        <h4>Official Male Duty Uniforms:</h4>
                        <ul style="font-size: 13px;">
                            <li><strong>Mercer Fleet Officer:</strong> <a href="https://marketplace.secondlife.com/p/Mercer-Fleet-Officer-Blue/23627398" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>WW 2371 Uniform:</strong> <a href="https://marketplace.secondlife.com/p/WW-2371-Uniform-Male/25932021" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>JRF 2360s Uniform:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Uniform-2360s-Male/14991576" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                        </ul>
                        
                        <h4>Equipment & Rank Pips:</h4>
                        <ul style="font-size: 13px;">
                            <li><strong>TerraCo Rank Pips (Standard, Officer):</strong> <a href="https://marketplace.secondlife.com/p/TerraCo-Rank-Pips-Standard-Officer/9390312" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Equipment - S3RP STP Tricorder:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Equipment-S3RP-STP-Tricorder/25896747" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Equipment - Med Kit:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Equipment-Med-Kit/22241217" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Weapon - Phaser sidearm Type 2 MK6:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Weapon-Phaser-sidearm-Type-2-MK6/25896599" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Weapon - Phaser rifle Type 3 MK10:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Weapon-Phaser-rifle-Type-3-MK10/25896366" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                        </ul>
                        
                        <h3>🛠️ Shuttle Operations & IC Protocols</h3>
                        <p>Because this is a small shuttle and not a luxury starship, we run a tight ship. The following In-Character rules apply:</p>
                        <ol>
                            <li><strong>ALARMS & RED ALERTS:</strong> When the ship's alarm sounds, all crew are expected to immediately return to their duty station and remain there until the alert is cleared or the mission dictates otherwise.</li>
                            <li><strong>RESOURCE CONSERVATION:</strong> Due to the shuttle's limited water-reclamation and life-support capacities, lavatory and sonic shower usage is strictly rationed.</li>
                            <li><strong>REPLICATOR RATIONS:</strong> The mess replicator draws heavily on the warp core. Use is limited to basic rations, water, and coffee. Luxury items require Command authorization.</li>
                            <li><strong>CRAMPED QUARTERS:</strong> Space is at a premium. Keep your personal gear stowed in your designated bunk area.</li>
                            <li><strong>MAINTENANCE DUTY:</strong> Everyone, regardless of rank, is expected to help scrub the decks, patch conduits, and keep the ship flying.</li>
                        </ol>
                        
                        <h3>📜 OOC Rules, Limits & Consent</h3>
                        <ol style="font-size: 13px;">
                            <li><strong>ADULT THEMES & ERP:</strong> This is a strictly 18+ environment. Consent is REQUIRED.</li>
                            <li><strong>NO GOD-MODDING:</strong> Your character is not invincible and must have weaknesses.</li>
                            <li><strong>NO META-GAMING:</strong> Do not use OOC information for IC situations.</li>
                            <li><strong>CONSEQUENCES:</strong> IC actions have IC consequences.</li>
                            <li><strong>IC vs. OOC:</strong> Keep OOC chatter to a minimum. Use (( brackets )) for OOC.</li>
                            <li><strong>APPEARANCE:</strong> No child/underage avatars. Characters must look realistic and fit within sci-fi setting.</li>
                            <li><strong>NO GRIEFING:</strong> Do not use weapons, pushers, or disruptive HUDs inside the shuttle.</li>
                            <li><strong>HAVE FUN:</strong> Above all else, we are here to tell a great story together!</li>
                        </ol>
                    </div>
                `;
                break;

            case "CREW REGISTRY":
                header.textContent = "CREW REGISTRY";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>XSV STARDUST CREW MANIFEST</h2>
                        
                        <div class="crew-member blue">
                            <h3>Stellar Yuki - CAPTAIN</h3>
                            <p><strong>Role:</strong> Command & Navigation</p>
                            <p><strong>Specialty:</strong> Tactical planning, stellar navigation, diplomatic negotiation</p>
                            <p><strong>Status:</strong> Active</p>
                            <p>Veteran pilot with 12+ years in deep space operations. Expert in reading space anomalies and charting safe routes through hostile territories.</p>
                        </div>
                        
                        <div class="crew-member red">
                            <h3>Aika - OPERATIONS OFFICER</h3>
                            <p><strong>Role:</strong> Systems Management & Logistics</p>
                            <p><strong>Specialty:</strong> Ship systems diagnostics, crew coordination, problem-solving</p>
                            <p><strong>Status:</strong> Active</p>
                            <p>Brilliant systems engineer with expertise in AI integration. Can troubleshoot almost any shipboard system under pressure.</p>
                        </div>
                        
                        <div class="crew-member red">
                            <h3>Roman - CHIEF ENGINEER</h3>
                            <p><strong>Role:</strong> Engineering & Reactor Operations</p>
                            <p><strong>Specialty:</strong> Power systems, propulsion, exotic technology</p>
                            <p><strong>Status:</strong> Active</p>
                            <p>Expert in experimental drive systems and weapons engineering. Keeps the Stardust running on a shoestring budget through sheer ingenuity.</p>
                        </div>
                    </div>
                `;
                break;

            case "ASTROMETRICS":
                header.textContent = "ASTROMETRICS";
                mainContent.style.padding = "0";
                mainContent.style.height = "calc(100vh - 70px)";
                mainContent.style.flex = "1";
                mainContent.innerHTML = `
                    <canvas id="starMapCanvas" style="width: 100%; height: 100%; background: #020214; display: block; flex: 1;"></canvas>
                    <div id="mapInfoPanel" class="db-panel" style="display: none;">
                        <div class="db-panel-inner">
                            <button id="close-map-panel" class="db-panel-close">Close</button>
                            <h2 id="selectedName"></h2>
                            <div id="selectedInfo" class="db-panel-content"></div>
                        </div>
                    </div>
                `;
                // Load map after DOM is ready
                setTimeout(() => initializeHierarchicalMap(), 100);
                break;

            case "STORAGE BANKS":
                header.textContent = "STORAGE BANKS";
                mainContent.innerHTML = "";
                databanks.classList.remove("hidden");
                loadCategories();
                break;

            case "DOCKED VESSELS":
                header.textContent = "DOCKED VESSELS";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>XSV STARDUST - VESSEL STATUS REPORT</h2>
                        
                        <div class="vessel-stats">
                            <div class="stat-group">
                                <h3>Hull & Structure</h3>
                                <p><strong>Hull Integrity:</strong> 94% <span style="color: #44dd44;">■■■■■■■■■□</span></p>
                                <p><strong>Shielding:</strong> 87% <span style="color: #4488ff;">■■■■■■■■□□</span></p>
                                <p><strong>Hull Classification:</strong> Type-17 Argo (Modified)</p>
                                <p><strong>Displacement:</strong> 450 metric tons</p>
                                <p><strong>Crew Quarters:</strong> 3 crew pods + 1 medical bay</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Power Systems</h3>
                                <p><strong>Primary Reactor:</strong> Quantum-Core Mark VII @ 100% <span style="color: #ffff88;">▰▰▰▰▰▰▰▰▰▰</span></p>
                                <p><strong>Backup Battery:</strong> 74 hours autonomy remaining</p>
                                <p><strong>Power Distribution:</strong> Nominal</p>
                                <p><strong>Capacitor Banks:</strong> Charged</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Propulsion</h3>
                                <p><strong>Primary Engines:</strong> Fluid Warp Drive (Experimental) @ 85% efficiency</p>
                                <p><strong>RCS Thrusters:</strong> 12x functional</p>
                                <p><strong>Max Velocity:</strong> Warp 4.7 (Standard cruise: Warp 2.1)</p>
                                <p><strong>Fuel Status:</strong> 91% <span style="color: #ff9944;">■■■■■■■■■◻</span></p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Armaments</h3>
                                <p><strong>Plasma Cannons:</strong> 2x (70% charge)</p>
                                <p><strong>Torpedo Tubes:</strong> 1x (5 torpedoes loaded)</p>
                                <p><strong>Point Defense:</strong> 4x rapid-fire pulse cannons</p>
                                <p><strong>EMP Generator:</strong> Available (1 hour cooldown)</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Systems & Sensors</h3>
                                <p><strong>Sensor Array:</strong> Long-range, 8 light-year radius</p>
                                <p><strong>Communications:</strong> Full-spectrum, encrypted channels active</p>
                                <p><strong>AI Assistant:</strong> Online and operational</p>
                                <p><strong>Life Support:</strong> All green - 2 years consumables aboard</p>
                                <p><strong>Cloaking Device:</strong> Experimental (70% operational, 4-hour duration max)</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Maintenance Schedule</h3>
                                <p><strong>Last Major Overhaul:</strong> 6 months ago</p>
                                <p><strong>Next Scheduled Maintenance:</strong> 2 months</p>
                                <p><strong>Known Issues:</strong> Starboard deflector plate alignment (minor)</p>
                                <p><strong>Recommended Repairs:</strong> Thruster D-4 replacement</p>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
    });
});

closePanelBtn.addEventListener("click", () => {
    closePanel();
});

// Hierarchical Map System
async function initializeHierarchicalMap() {
    console.log("🗺️  Map initialization starting...");
    
    const canvas = document.getElementById("starMapCanvas");
    if (!canvas) {
        console.error("❌ Canvas element not found!");
        return;
    }

    try {
        // Load data
        const { starSystems } = await import("../data/db_star_systems.js");
        const orbitsData = (await import("../data/db_orbits.js")).default;
        console.log("✅ Data loaded:", starSystems.length, "systems");

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("❌ Canvas 2D context failed!");
            return;
        }

        // Sectors array
        const sectors = [
            { id: 1, name: "Varix Core", x: -300, y: -200, radius: 150, color: "#ff6633" },
            { id: 2, name: "Crux Frontier", x: 100, y: -200, radius: 150, color: "#ff9944" },
            { id: 3, name: "Var Lupra Corridor", x: 200, y: 50, radius: 150, color: "#ffaa55" },
            { id: 4, name: "Void Edge", x: 100, y: 200, radius: 150, color: "#ff7722" },
            { id: 5, name: "Cardinal Reach", x: -100, y: 200, radius: 150, color: "#ff8833" },
            { id: 6, name: "Spiral Arc", x: -200, y: 50, radius: 150, color: "#ffaa44" },
            { id: 7, name: "Deep Dark", x: -200, y: -150, radius: 150, color: "#ff6611" },
            { id: 8, name: "Warren Zone", x: 0, y: 0, radius: 100, color: "#ff9955" }
        ];

        let zoomLevel = 0;
        let currentSector = null;
        let currentSystem = null;

        function draw() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            ctx.fillStyle = "#020214";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (zoomLevel === 0) drawGalaxy();
            else if (zoomLevel === 1) drawSector();
            else if (zoomLevel === 2) drawSystem();
        }

        function drawGalaxy() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const scale = 1.5;

            // Draw sectors
            sectors.forEach(sector => {
                const x = centerX + sector.x * scale;
                const y = centerY + sector.y * scale;

                // Sector circle
                ctx.strokeStyle = sector.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(x, y, sector.radius * scale, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Sector label
                ctx.fillStyle = sector.color;
                ctx.font = "bold 13px Arial";
                ctx.textAlign = "center";
                ctx.fillText(sector.name, x, y - 20);

                // System count
                const sysCnt = starSystems.filter(s => s.sector === sector.id).length;
                ctx.fillStyle = "#aaaaff";
                ctx.font = "11px Arial";
                ctx.fillText(`${sysCnt} systems`, x, y + 15);
            });

            // Instructions
            ctx.fillStyle = "#ffcc88";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Click a sector to explore", centerX, 30);
        }

        function drawSector() {
            if (!currentSector) return;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const sectorSystems = starSystems.filter(s => s.sector === currentSector.id);

            // Title
            ctx.fillStyle = currentSector.color;
            ctx.font = "bold 18px Arial";
            ctx.textAlign = "center";
            ctx.fillText(currentSector.name, centerX, 35);

            // Draw systems
            sectorSystems.forEach(system => {
                const x = centerX + system.position.x * 30;
                const y = centerY + system.position.y * 30;

                // System dot
                ctx.fillStyle = "#4488ff";
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                // System label
                ctx.fillStyle = "#ffcc88";
                ctx.font = "10px Arial";
                ctx.textAlign = "center";
                ctx.fillText(system.title.split(" (")[0], x, y + 18);
            });

            // Back button
            ctx.fillStyle = "#ff9944";
            ctx.font = "11px Arial";
            ctx.textAlign = "left";
            ctx.fillText("← BACK", 20, 30);
        }

        function drawSystem() {
            if (!currentSystem) return;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Title
            ctx.fillStyle = "#ffaa55";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(currentSystem.title, centerX, 35);

            const systemData = orbitsData[currentSystem.id];
            if (systemData) {
                // Draw star
                ctx.fillStyle = "#ffff88";
                ctx.beginPath();
                ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
                ctx.fill();

                // Draw planets
                if (systemData.planets) {
                    systemData.planets.forEach(planet => {
                        const angle = (planet.angle * Math.PI) / 180;
                        const px = centerX + Math.cos(angle) * planet.radius * 2;
                        const py = centerY + Math.sin(angle) * planet.radius * 2;

                        // Orbit line
                        ctx.strokeStyle = "#4488ff";
                        ctx.lineWidth = 0.5;
                        ctx.globalAlpha = 0.2;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, planet.radius * 2, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.globalAlpha = 1;

                        // Planet
                        ctx.fillStyle = "#44dd44";
                        ctx.beginPath();
                        ctx.arc(px, py, 4, 0, Math.PI * 2);
                        ctx.fill();

                        // Label
                        ctx.fillStyle = "#aaffaa";
                        ctx.font = "9px Arial";
                        ctx.textAlign = "center";
                        ctx.fillText(planet.id, px, py - 8);
                    });
                }
            }

            // Back button
            ctx.fillStyle = "#ff9944";
            ctx.font = "11px Arial";
            ctx.textAlign = "left";
            ctx.fillText("← BACK", 20, 30);
        }

        // Click handler
        canvas.addEventListener("click", (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Back button
            if (clickY < 40 && clickX < 100) {
                if (zoomLevel === 1) {
                    zoomLevel = 0;
                    currentSector = null;
                    draw();
                } else if (zoomLevel === 2) {
                    zoomLevel = 1;
                    currentSystem = null;
                    draw();
                }
                return;
            }

            if (zoomLevel === 0) {
                // Check sector click
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const scale = 1.5;

                sectors.forEach(sector => {
                    const x = centerX + sector.x * scale;
                    const y = centerY + sector.y * scale;
                    const dist = Math.hypot(clickX - x, clickY - y);

                    if (dist <= sector.radius * scale) {
                        currentSector = sector;
                        zoomLevel = 1;
                        draw();
                    }
                });
            } else if (zoomLevel === 1 && currentSector) {
                // Check system click
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const sectorSystems = starSystems.filter(s => s.sector === currentSector.id);

                sectorSystems.forEach(system => {
                    const x = centerX + system.position.x * 30;
                    const y = centerY + system.position.y * 30;
                    const dist = Math.hypot(clickX - x, clickY - y);

                    if (dist <= 15) {
                        currentSystem = system;
                        zoomLevel = 2;
                        draw();
                    }
                });
            }
        });

        // Mouse wheel zoom
        canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            // Can add zoom functionality here later
        }, { passive: false });

        // Initial draw
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
        
        window.addEventListener("resize", draw);
        console.log("✅ Map ready!");

    } catch (err) {
        console.error("❌ Map error:", err);
    }
}
