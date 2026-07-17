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
function initializeHierarchicalMap() {
    const canvas = document.getElementById("starMapCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    // 8 Varix Sectors with political boundaries
    const sectors = [
        { id: "varix_core", name: "Varix Core", x: -300, y: -200, radius: 400, color: "#ff6633", systems: ["trinary_system", "core_echo", "core_research"] },
        { id: "crux_frontier", name: "Crux Frontier", x: 300, y: -200, radius: 400, color: "#ff9944", systems: ["void_scar", "polar_gate"] },
        { id: "outer_rim", name: "Outer Rim", x: 600, y: 200, radius: 350, color: "#ffaa55", systems: ["brunhilde_system", "var_lupra_system"] },
        { id: "void_edge", name: "Void Edge", x: -600, y: 200, radius: 350, color: "#ff7722", systems: [] },
        { id: "cardinal_reach", name: "Cardinal Reach", x: 0, y: 600, radius: 350, color: "#ff8833", systems: [] },
        { id: "spiral_arc", name: "Spiral Arc", x: -200, y: -600, radius: 350, color: "#ffaa44", systems: [] },
        { id: "deep_dark", name: "Deep Dark", x: 200, y: -600, radius: 350, color: "#ff6611", systems: [] },
        { id: "warren_zone", name: "Warren Zone", x: 0, y: 0, radius: 300, color: "#ff9955", systems: ["warren_wormhole", "warren_station"] }
    ];

    let zoomLevel = 0; // 0=galaxy, 1=sector, 2=system, 3=planets
    let selectedSystem = null;
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
        // Draw 8 sectors as political regions
        sectors.forEach(sector => {
            const { sx, sy } = worldToScreen(sector.x, sector.y);
            
            // Draw sector boundary
            ctx.strokeStyle = sector.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(sx, sy, sector.radius * zoom, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Draw sector label
            ctx.fillStyle = sector.color;
            ctx.font = `${12 * zoom}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText(sector.name, sx, sy);
        });
    }

    function drawSector() {
        // Draw systems in selected sector
        ctx.fillStyle = "#ffcc88";
        ctx.font = `14px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("SECTOR VIEW - Click system to zoom", canvas.width / 2, 30);
    }

    function drawSystem() {
        ctx.fillStyle = "#ffcc88";
        ctx.font = `14px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("SYSTEM VIEW - Orbital mechanics", canvas.width / 2, 30);
    }

    function drawPlanets() {
        ctx.fillStyle = "#ffcc88";
        ctx.font = `14px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("PLANET VIEW", canvas.width / 2, 30);
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

    // Click to select/zoom
    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const sx = e.clientX - rect.left;
        const sy = e.clientY - rect.top;
        const { x, y } = screenToWorld(sx, sy);

        if (zoomLevel === 0) {
            // Check if clicked on sector
            for (const sector of sectors) {
                const dist = Math.hypot(x - sector.x, y - sector.y);
                if (dist <= sector.radius) {
                    selectedSystem = sector;
                    zoomLevel = 1;
                    offsetX = -sector.x + canvas.width / (2 * zoom);
                    offsetY = -sector.y + canvas.height / (2 * zoom);
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
