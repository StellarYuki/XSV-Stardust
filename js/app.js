// ===============================
// LCARS Navigation + Databanks
// ===============================

import { loadCategories, loadEntriesForCategory } from "./ui.js";
import { closePanel } from "./panel.js";

const header = document.getElementById("main-header");
const mainContent = document.getElementById("main-content");
const databanks = document.getElementById("databanks");
const panel = document.getElementById("db-panel");
const closePanelBtn = document.getElementById("close-panel");

const tabs = document.querySelectorAll(".lcars-tab");

window.addEventListener("DOMContentLoaded", () => {
    databanks.classList.add("hidden");
    panel.classList.add("hidden");
});

// Sidebar navigation

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        const label = btn.textContent.trim();

        // Hide panel and databanks by default
        panel.classList.add("hidden");
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
                    <h2>ASTROMETRICS</h2>
                    <p>
                        This section will show star systems, routes, and navigation data for Brunhilde, Var Lupra,
                        and other regions in the Crux Constellation.
                    </p>
                `;
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
                // Later: loadEntriesForCategory("Vessels");
                break;
        }
    });
});

// Close panel button

closePanelBtn.addEventListener("click", () => {
    closePanel();
});
