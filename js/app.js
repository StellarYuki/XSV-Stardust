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
                mainContent.innerHTML = `
                    <div style="display: flex; height: 100%; gap: 10px;">
                        <canvas id="starMapCanvas" style="flex: 1; background: #020214; border-radius: 8px; cursor: grab;"></canvas>
                        <div id="mapInfoPanel" style="width: 280px; background: rgba(10, 5, 30, 0.9); border: 1px solid #ffcc88; padding: 12px; border-radius: 8px; overflow-y: auto; color: #ffcc88; font-size: 13px; display: none;">
                            <div><strong>Selected:</strong> <span id="selectedName">None</span></div>
                            <hr style="border: none; border-top: 1px solid #ffcc88; margin: 8px 0;">
                            <div><strong>Type:</strong> <span id="selectedType">—</span></div>
                            <hr style="border: none; border-top: 1px solid #ffcc88; margin: 8px 0;">
                            <div><strong>Notes:</strong></div>
                            <div id="selectedNotes" style="font-size: 12px; margin-top: 4px;">—</div>
                        </div>
                    </div>
                `;
                // Load map after DOM is ready
                setTimeout(() => initializeMapRenderer(), 100);
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

// Map initialization
function initializeMapRenderer() {
    const canvas = document.getElementById("starMapCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    // Import map config inline since we can't import in this module easily
    const MAP_CONFIG = {
        scale: 1.0,
        objects: [
            { id: "trinary_system", name: "Trinary System", type: "system", x: -200, y: 50, radius: 6, color: "#ff9966", notes: "Primary core system; high traffic." },
            { id: "brunhilde_system", name: "Brunhilde System", type: "system", x: -80, y: 120, radius: 6, color: "#ff9966", notes: "Industrial system with debris fields." },
            { id: "var_lupra_system", name: "Var Lupra", type: "system", x: 140, y: 40, radius: 6, color: "#ff9966", notes: "Cloud‑rich system; station presence." },
            { id: "warren_wormhole", name: "Warren Wormhole", type: "wormhole", x: 60, y: -80, radius: 8, color: "#66ccff", notes: "Major transit anomaly; high‑risk corridor." },
            { id: "warren_station", name: "Warren Relay Station", type: "station", x: 80, y: -60, radius: 4, color: "#ffff66", notes: "Monitoring and traffic control for Warren Wormhole." },
            { id: "arcavion_reach", name: "Arcavion Reach", type: "system", x: -260, y: -40, radius: 5, color: "#ffcc88", notes: "Military frontier; patrol routes." },
            { id: "aquila_union", name: "Aquila Union", type: "system", x: 220, y: -10, radius: 5, color: "#ffcc88", notes: "Political hub; trade and diplomacy." },
            { id: "mido_drift", name: "Mido Drift", type: "system", x: 10, y: 160, radius: 5, color: "#ffcc88", notes: "Sparse frontier; salvage operations." }
        ],
        stardust: { id: "xsv_stardust", name: "XSV Stardust", type: "ship", x: 68, y: -72, radius: 5, color: "#ff66ff", notes: "Current position: holding pattern near Warren Wormhole." }
    };

    let zoom = 1.0;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let dragStartX, dragStartY, dragOriginX, dragOriginY;

    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    }

    function worldToScreen(x, y) {
        return {
            sx: canvas.width / 2 + (x * MAP_CONFIG.scale + offsetX) * zoom,
            sy: canvas.height / 2 + (y * MAP_CONFIG.scale + offsetY) * zoom
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.strokeStyle = "#111133";
        ctx.lineWidth = 1;
        const step = 50 * zoom;
        for (let x = 0; x < canvas.width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        ctx.restore();

        MAP_CONFIG.objects.forEach((obj) => {
            const { sx, sy } = worldToScreen(obj.x, obj.y);
            ctx.beginPath();
            ctx.fillStyle = obj.color;
            ctx.arc(sx, sy, obj.radius * zoom, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffcc88";
            ctx.font = `${10 * zoom}px system-ui, sans-serif`;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(obj.name, sx + 6 * zoom, sy + 4 * zoom);
        });

        const sd = MAP_CONFIG.stardust;
        const { sx: sdx, sy: sdy } = worldToScreen(sd.x, sd.y);
        ctx.beginPath();
        ctx.fillStyle = sd.color;
        ctx.arc(sdx, sdy, sd.radius * zoom, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ff66ff";
        ctx.font = `${10 * zoom}px system-ui, sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText(sd.name, sdx + 6 * zoom, sdy - 4 * zoom);
    }

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
        const dx = (e.clientX - dragStartX) / zoom / MAP_CONFIG.scale;
        const dy = (e.clientY - dragStartY) / zoom / MAP_CONFIG.scale;
        offsetX = dragOriginX + dx;
        offsetY = dragOriginY + dy;
        draw();
    });

    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const sx = e.clientX - rect.left;
        const sy = e.clientY - rect.top;

        const sd = MAP_CONFIG.stardust;
        const { sx: sdx, sy: sdy } = worldToScreen(sd.x, sd.y);
        const distSd = Math.hypot(sx - sdx, sy - sdy);
        if (distSd <= sd.radius * zoom + 4) {
            setSelected(sd);
            return;
        }

        for (const obj of MAP_CONFIG.objects) {
            const { sx: ox, sy: oy } = worldToScreen(obj.x, obj.y);
            const dist = Math.hypot(sx - ox, sy - oy);
            if (dist <= obj.radius * zoom + 4) {
                setSelected(obj);
                return;
            }
        }

        setSelected(null);
    });

    function setSelected(obj) {
        const selectedNameEl = document.getElementById("selectedName");
        const selectedTypeEl = document.getElementById("selectedType");
        const selectedNotesEl = document.getElementById("selectedNotes");
        const mapInfoPanel = document.getElementById("mapInfoPanel");
        
        if (!obj) {
            mapInfoPanel.style.display = "none";
            return;
        }
        
        selectedNameEl.textContent = obj.name;
        selectedTypeEl.textContent = obj.type;
        selectedNotesEl.textContent = obj.notes || "—";
        mapInfoPanel.style.display = "block";
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}
