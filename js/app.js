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
            <h2>⦿ THE XSV STARDUST</h2>
            <p style="font-size: 13px; color: #aaa;">Revised: [7-16-2026]</p>
            <p style="font-size: 13px; color: #aaa;">Sabers of Fortune</p>
            
            <h3>Overview</h3>
            <p>
                The XSV Stardust is a heavily modified, long-range utility shuttle designed for high-speed transport, 
                escort, and mercenary operations. Owned and operated by an independent mercenary crew under ISRB contract.
            </p>
            
            <h3>Specifications</h3>
            <ul>
                <li><strong>Type:</strong> Modified Utility Shuttle / Fast Transport</li>
                <li><strong>Class:</strong> Type-17 Argo (Retrofitted)</li>
                <li><strong>Length:</strong> 26m | <strong>Width:</strong> 14m | <strong>Height:</strong> 6.5m</li>
                <li><strong>Tonnage:</strong> 420 tons fully loaded</li>
                <li><strong>Max Crew:</strong> 4 | <strong>Min Crew:</strong> 1</li>
                <li><strong>Armor:</strong> Reinforced Zeplox Plating (Sensor-Baffling)</li>
                <li><strong>Shielding:</strong> Mana Range Micro-Generators</li>
            </ul>
            
            <h3>Systems</h3>
            <ul>
                <li><strong>Sensors:</strong> CCX-VS02 Compact Array</li>
                <li><strong>Warp:</strong> Compact Fluid Core</li>
                <li><strong>Power:</strong> Fused Pylon GS Type C (Miniaturized)</li>
                <li><strong>Engines:</strong> Hybrid Ion-Impulse Drive</li>
                <li><strong>Weapons:</strong> Twin Forward-Mounted Pulse Cannons, Micro-Torpedo Launcher</li>
            </ul>
            
            <h3>History</h3>
            <p>
                The origins of the XSV Stardust are shrouded in mystery. Its base chassis—a Type-17 Argo-class shuttle—does not match 
                standard Setrean or Thynome Vector Foundation designs. It is believed to be a relic from a forgotten era, or perhaps 
                a vessel that fell through a spatial anomaly from a distant sector.
            </p>
            <p>
                The derelict hull was discovered adrift in the debris fields near the gas giant Necron by an Astral Supply Co. security 
                patrol in 5068 S.Y. Recognizing the advanced nature of its ion-propulsion engines and sensor-baffling hull, it was salvaged 
                and sold to an independent mercenary crew.
            </p>
            <p>
                The crew heavily retrofitted the vessel to bring it up to modern operational standards. The massive aft cargo bay, originally 
                designed to hold a ground transport buggy, was completely gutted. In its place, compact living quarters for a 4-person crew, 
                a small mess area, and enhanced life support systems were installed to allow for deep-space, long-duration missions.
            </p>
            <p>
                Today, the Stardust operates primarily within the Crux Constellation, taking high-risk contracts from the Independent 
                Services Review Board (ISRB). Due to its speed and stealth capabilities, it is frequently hired by Astral Supply Co. 
                to escort high-value freight through the dangerous Varix Gas Clouds or run security patrols near the Night Star station.
            </p>
            
            <h3>Notable Characteristics</h3>
            <ul>
                <li>The Stardust's hull composition naturally scrambles standard sensors, making it difficult to track in deep space.</li>
                <li>Due to the experimental nature of its retrofitted life support, the ship's water-reclamation systems are easily overtaxed.</li>
                <li>The vessel lacks a dedicated hangar or cargo bay; all gear must be stowed in the cramped crew quarters.</li>
                <li><strong>S.Y.:</strong> Refers to the Stellar Year of the Universal Coordinate Plane.</li>
            </ul>
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
                        <h2>⦿ THE XSV STARDUST</h2>
                        <p style="font-size: 13px; color: #aaa;">Revised: [7-16-2026]</p>
                        <p style="font-size: 13px; color: #aaa;">Sabers of Fortune</p>
                        
                        <h3>Overview</h3>
                        <p>
                            The XSV Stardust is a heavily modified, long-range utility shuttle designed for high-speed transport, 
                            escort, and mercenary operations. Owned and operated by an independent mercenary crew under ISRB contract.
                        </p>
                        
                        <h3>Specifications</h3>
                        <ul>
                            <li><strong>Type:</strong> Modified Utility Shuttle / Fast Transport</li>
                            <li><strong>Class:</strong> Type-17 Argo (Retrofitted)</li>
                            <li><strong>Length:</strong> 26m | <strong>Width:</strong> 14m | <strong>Height:</strong> 6.5m</li>
                            <li><strong>Tonnage:</strong> 420 tons fully loaded</li>
                            <li><strong>Max Crew:</strong> 4 | <strong>Min Crew:</strong> 1</li>
                            <li><strong>Armor:</strong> Reinforced Zeplox Plating (Sensor-Baffling)</li>
                            <li><strong>Shielding:</strong> Mana Range Micro-Generators</li>
                        </ul>
                        
                        <h3>Systems</h3>
                        <ul>
                            <li><strong>Sensors:</strong> CCX-VS02 Compact Array</li>
                            <li><strong>Warp:</strong> Compact Fluid Core</li>
                            <li><strong>Power:</strong> Fused Pylon GS Type C (Miniaturized)</li>
                            <li><strong>Engines:</strong> Hybrid Ion-Impulse Drive</li>
                            <li><strong>Weapons:</strong> Twin Forward-Mounted Pulse Cannons, Micro-Torpedo Launcher</li>
                        </ul>
                        
                        <h3>History</h3>
                        <p>
                            The origins of the XSV Stardust are shrouded in mystery. Its base chassis—a Type-17 Argo-class shuttle—does not match 
                            standard Setrean or Thynome Vector Foundation designs. It is believed to be a relic from a forgotten era, or perhaps 
                            a vessel that fell through a spatial anomaly from a distant sector.
                        </p>
                        <p>
                            The derelict hull was discovered adrift in the debris fields near the gas giant Necron by an Astral Supply Co. security 
                            patrol in 5068 S.Y. Recognizing the advanced nature of its ion-propulsion engines and sensor-baffling hull, it was salvaged 
                            and sold to an independent mercenary crew.
                        </p>
                        <p>
                            The crew heavily retrofitted the vessel to bring it up to modern operational standards. The massive aft cargo bay, originally 
                            designed to hold a ground transport buggy, was completely gutted. In its place, compact living quarters for a 4-person crew, 
                            a small mess area, and enhanced life support systems were installed to allow for deep-space, long-duration missions.
                        </p>
                        <p>
                            Today, the Stardust operates primarily within the Crux Constellation, taking high-risk contracts from the Independent 
                            Services Review Board (ISRB). Due to its speed and stealth capabilities, it is frequently hired by Astral Supply Co. 
                            to escort high-value freight through the dangerous Varix Gas Clouds or run security patrols near the Night Star station.
                        </p>
                        
                        <h3>Notable Characteristics</h3>
                        <ul>
                            <li>The Stardust's hull composition naturally scrambles standard sensors, making it difficult to track in deep space.</li>
                            <li>Due to the experimental nature of its retrofitted life support, the ship's water-reclamation systems are easily overtaxed.</li>
                            <li>The vessel lacks a dedicated hangar or cargo bay; all gear must be stowed in the cramped crew quarters.</li>
                            <li><strong>S.Y.:</strong> Refers to the Stellar Year of the Universal Coordinate Plane.</li>
                        </ul>
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
    console.log("Map initialization starting...");
    
    // Load data
    try {
        const { starSystems } = await import("../data/db_star_systems.js");
        const orbitsData = (await import("../data/db_orbits.js")).default;
        console.log("Data loaded:", starSystems.length, "systems");

        const canvas = document.getElementById("starMapCanvas");
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }

        console.log("Canvas found, size:", canvas.clientWidth, "x", canvas.clientHeight);
        const ctx = canvas.getContext("2d");
        
        // Set canvas size before any drawing
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        console.log("Canvas context set, actual size:", canvas.width, "x", canvas.height);
        
        // Test draw a rectangle
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(10, 10, 100, 100);
        console.log("Test rectangle drawn");
        
    } catch (err) {
        console.error("Error in map initialization:", err);
        return;
    }
    
    // 8 Varix Sectors with political boundaries
    const sectors = [
        { id: 1, name: "Varix Core", x: -350, y: -300, radius: 300, color: "#ff6633" },
        { id: 2, name: "Crux Frontier", x: -100, y: -400, radius: 300, color: "#ff9944" },
        { id: 3, name: "Var Lupra Corridor", x: 250, y: -250, radius: 300, color: "#ffaa55" },
        { id: 4, name: "Void Edge", x: 400, y: 0, radius: 300, color: "#ff7722" },
        { id: 5, name: "Cardinal Reach", x: 250, y: 250, radius: 300, color: "#ff8833" },
        { id: 6, name: "Spiral Arc", x: -100, y: 400, radius: 300, color: "#ffaa44" },
        { id: 7, name: "Deep Dark", x: -350, y: 250, radius: 300, color: "#ff6611" },
        { id: 8, name: "Warren Zone", x: 0, y: 0, radius: 250, color: "#ff9955" }
    ];

    let zoomLevel = 0; // 0=galaxy, 1=sector, 2=system, 3=planets
    let currentSector = null;
    let currentSystem = null;
    let zoom = 1.0;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0, dragOriginX = 0, dragOriginY = 0;

    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        zoom = Math.min(0.6, canvas.width / 1200);
        draw();
    }

    function worldToScreen(x, y) {
        return {
            sx: canvas.width / 2 + (x + offsetX) * zoom,
            sy: canvas.height / 2 + (y + offsetY) * zoom
        };
    }

    function screenToWorld(sx, sy) {
        return {
            x: (sx - canvas.width / 2) / zoom - offsetX,
            y: (sy - canvas.height / 2) / zoom - offsetY
        };
    }

    function draw() {
        ctx.fillStyle = "#020214";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (zoomLevel === 0) drawGalaxy();
        else if (zoomLevel === 1) drawSector();
        else if (zoomLevel === 2) drawSystem();
        else if (zoomLevel === 3) drawPlanets();
    }

    function drawGalaxy() {
        // Draw 8 sectors as political regions with connecting lines
        ctx.strokeStyle = "#ffaa55";
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
        
        // Draw sector dividing lines (political map)
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        ctx.globalAlpha = 1;

        // Draw each sector
        sectors.forEach(sector => {
            const { sx, sy } = worldToScreen(sector.x, sector.y);
            
            // Sector circle
            ctx.strokeStyle = sector.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(sx, sy, sector.radius * zoom, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Sector label
            ctx.fillStyle = sector.color;
            ctx.font = `bold ${14 * Math.min(zoom, 1.5)}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(sector.name, sx, sy - 30);
            
            // Show system count
            const systemsInSector = starSystems.filter(sys => sys.sector === sector.id);
            ctx.fillStyle = "#aaaaff";
            ctx.font = `${11 * Math.min(zoom, 1.5)}px Arial`;
            ctx.fillText(`${systemsInSector.length} systems`, sx, sy + 30);
        });
    }

    function drawSector() {
        if (!currentSector) return;

        // Get all systems in this sector
        const sectorSystems = starSystems.filter(sys => sys.sector === currentSector.id);
        
        // Draw sector background
        const { sx, sy } = worldToScreen(currentSector.x, currentSector.y);
        ctx.strokeStyle = currentSector.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(sx, sy, currentSector.radius * zoom, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Draw back button
        ctx.fillStyle = "#ff9944";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText("← Back to Galaxy", 20, 20);

        // Draw title
        ctx.fillStyle = currentSector.color;
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.fillText(currentSector.name, canvas.width / 2, 40);

        // Draw systems
        sectorSystems.forEach(system => {
            const { sx, sy } = worldToScreen(system.position.x * 50, system.position.y * 50);
            
            // System circle
            ctx.fillStyle = "#4488ff";
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(sx, sy, 12 * zoom, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            // System label
            ctx.fillStyle = "#ffcc88";
            ctx.font = `${11 * zoom}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText(system.title.split(" (")[0], sx, sy + 25);
        });
    }

    function drawSystem() {
        if (!currentSystem) return;

        const systemData = orbitsData[currentSystem.id];
        if (!systemData) return;

        // Draw back button
        ctx.fillStyle = "#ff9944";
        ctx.font = "12px Arial";
        ctx.textAlign = "left";
        ctx.fillText("← Back to Sector", 20, 20);

        // Draw title
        ctx.fillStyle = "#ffaa55";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.fillText(currentSystem.title, canvas.width / 2, 40);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Draw star
        ctx.fillStyle = "#ffff88";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw belts
        if (systemData.belts) {
            systemData.belts.forEach(belt => {
                ctx.strokeStyle = "#888844";
                ctx.lineWidth = belt.thickness;
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(centerX, centerY, belt.radius * zoom, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1;
            });
        }

        // Draw planets on orbits
        if (systemData.planets) {
            systemData.planets.forEach(planet => {
                const angle = (planet.angle * Math.PI) / 180;
                const px = centerX + Math.cos(angle) * planet.radius * zoom;
                const py = centerY + Math.sin(angle) * planet.radius * zoom;

                // Orbital ring
                ctx.strokeStyle = "#4488ff";
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, planet.radius * zoom, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Planet
                ctx.fillStyle = "#44dd44";
                ctx.beginPath();
                ctx.arc(px, py, planet.size * zoom * 0.5, 0, Math.PI * 2);
                ctx.fill();

                // Label
                ctx.fillStyle = "#aaffaa";
                ctx.font = `${10 * zoom}px Arial`;
                ctx.textAlign = "center";
                ctx.fillText(planet.id, px, py - planet.size * zoom - 5);
            });
        }

        // Draw anomalies
        if (systemData.anomalies) {
            systemData.anomalies.forEach(anomaly => {
                const angle = (anomaly.angle * Math.PI) / 180;
                const ax = centerX + Math.cos(angle) * anomaly.radius * zoom;
                const ay = centerY + Math.sin(angle) * anomaly.radius * zoom;

                ctx.fillStyle = "#ff6666";
                ctx.beginPath();
                ctx.arc(ax, ay, 5 * zoom, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#ffaaaa";
                ctx.font = `${9 * zoom}px Arial`;
                ctx.textAlign = "center";
                ctx.fillText(anomaly.id, ax, ay - 8 * zoom);
            });
        }
    }

    function drawPlanets() {
        ctx.fillStyle = "#ffcc88";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PLANET DETAIL VIEW", canvas.width / 2, 30);
    }

    // Mouse wheel zoom
    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        zoom *= e.deltaY > 0 ? 0.9 : 1.1;
        zoom = Math.max(0.3, Math.min(5, zoom));
        draw();
    }, { passive: false });

    // Drag/pan
    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragOriginX = offsetX;
        dragOriginY = offsetY;
        canvas.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        canvas.style.cursor = "grab";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        offsetX = dragOriginX - (e.clientX - dragStartX) / zoom;
        offsetY = dragOriginY - (e.clientY - dragStartY) / zoom;
        draw();
    });

    // Click to navigate
    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const sx = e.clientX - rect.left;
        const sy = e.clientY - rect.top;

        // Back button click
        if (sy < 35) {
            if (sx < 150) {
                if (zoomLevel === 1) {
                    zoomLevel = 0;
                    currentSector = null;
                    offsetX = 0;
                    offsetY = 0;
                    zoom = 1;
                    draw();
                    return;
                } else if (zoomLevel === 2) {
                    zoomLevel = 1;
                    currentSystem = null;
                    offsetX = 0;
                    offsetY = 0;
                    zoom = 1;
                    draw();
                    return;
                }
            }
        }

        const { x, y } = screenToWorld(sx, sy);

        if (zoomLevel === 0) {
            // Check if clicked on sector
            for (const sector of sectors) {
                const dist = Math.hypot(x - sector.x, y - sector.y);
                if (dist <= sector.radius) {
                    currentSector = sector;
                    zoomLevel = 1;
                    offsetX = 0;
                    offsetY = 0;
                    zoom = 1;
                    draw();
                    return;
                }
            }
        } else if (zoomLevel === 1) {
            // Check if clicked on system
            const sectorSystems = starSystems.filter(sys => sys.sector === currentSector.id);
            for (const system of sectorSystems) {
                const dist = Math.hypot(x - system.position.x * 50, y - system.position.y * 50);
                if (dist <= 20) {
                    currentSystem = system;
                    zoomLevel = 2;
                    offsetX = 0;
                    offsetY = 0;
                    zoom = 1;
                    draw();
                    return;
                }
            }
        }
    });

    // Close panel button
    const closeBtn = document.getElementById("close-map-panel");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.getElementById("mapInfoPanel").style.display = "none";
        });
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}
