// ==========================================
// LCARS Navigation + Databanks Wiring
// ==========================================

import { loadCategories, loadEntries } from "./ui.js";
import { closePanel } from "./panel.js";
import { initializeStarMap } from "./starmap.js";

const header = document.getElementById("main-header");
const mainContent = document.getElementById("main-content");
const databanksContainer = document.getElementById("databanks");
const panel = document.getElementById("db-panel");
const closePanelBtn = document.getElementById("close-panel");

const tabs = document.querySelectorAll(".lcars-tab");

window.addEventListener("DOMContentLoaded", () => {
    databanksContainer.classList.add("hidden");
});

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        const label = btn.textContent.trim();

        panel.classList.add("hidden");
        databanksContainer.classList.add("hidden");
        databanksContainer.classList.remove("show");

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
                        This section will contain your rules, guidelines, and operational procedures for the XSV Stardust.
                    </p>
                `;
                break;

            case "CREW REGISTRY":
                header.textContent = "CREW REGISTRY";
                mainContent.innerHTML = `
                    <h2>CREW REGISTRY</h2>
                    <p>
                        This section will list your crew members, roles, and profiles.
                    </p>
                `;
                break;

            case "ASTROMETRICS":
                header.textContent = "ASTROMETRICS";
                mainContent.innerHTML = `
                    <h2>ASTROMETRICS - STELLAR CARTOGRAPHY</h2>
                    <div id="starmap-container" style="width: 100%; height: 500px; margin-top: 20px; border: 2px solid #ff9900; background: #111; border-radius: 10px;"></div>
                `;
                setTimeout(() => initializeStarMap(), 100);
                break;

            case "STORAGE BANKS":
                header.textContent = "STORAGE BANKS";
                mainContent.innerHTML = `
                    <h2>LORE STORAGE BANKS</h2>
                    <p>Select a category and entry from the databanks.</p>
                `;
                databanksContainer.classList.remove("hidden");
                databanksContainer.classList.add("show");
                loadCategories();
                break;

            case "DOCKED VESSELS":
                header.textContent = "DOCKED VESSELS";
                mainContent.innerHTML = `
                    <h2>DOCKED VESSELS</h2>
                    <p>Select a vessel entry from the databanks.</p>
                `;
                databanksContainer.classList.remove("hidden");
                databanksContainer.classList.add("show");
                loadEntries("Vessels");
                break;
        }
    });
});

closePanelBtn.onclick = () => {
    closePanel();
};
