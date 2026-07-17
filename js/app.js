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
                    <h2>WELCOME TO THE XSV STARDUST</h2>
                    <p>
                        We are an independent mercenary crew operating a heavily retrofitted Type‑17 Argo shuttle.
                        While we officially operate under ISRB contracts in the Zavares Sector, we frequently take on
                        off‑the‑books shadow‑contracts for Starfleet and other factions.
                    </p>
                `;
                break;

            case "RULES & GUIDE":
                header.textContent = "RULES & GUIDE";
                mainContent.innerHTML = `
                    <h2>CREW RULES & GUIDE</h2>
                    <p>
                        This section will contain your rules, guidelines, and operational procedures for the XSV Stardust
                        and associated stations or outposts.
                    </p>
                `;
                break;

            case "CREW REGISTRY":
                header.textContent = "CREW REGISTRY";
                mainContent.innerHTML = `
                    <h2>CREW REGISTRY</h2>
                    <p>
                        This section will list your crew members, roles, and profiles. (Stellar: Blue, Aika & Roman: Red.)
                    </p>
                `;
                break;

            case "ASTROMETRICS":
                header.textContent = "ASTROMETRICS";
                mainContent.style.padding = "0";
                mainContent.style.height = "100%";
                mainContent.innerHTML = `
                    <canvas id="starMapCanvas" style="width: 100%; height: 100%; background: #020214; display: block;"></canvas>
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
                    <h2>DOCKED VESSELS</h2>
                    <p>
                        This section will list vessels currently docked or associated with Astral Supply Co. and the XSV Stardust.
                    </p>
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
    // Load data
    const { starSystems } = await import("../data/db_star_systems.js");
    const orbitsData = (await import("../data/db_orbits.js")).default;

    const canvas = document.getElementById("starMapCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
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
