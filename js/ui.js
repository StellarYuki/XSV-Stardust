// ==========================================
// Databanks Category + Entry Loader
// ==========================================

import { db_species } from "../data/db_species.js";
import { db_factions } from "../data/db_factions.js";
import { db_stations } from "../data/db_stations.js";
import { db_star_systems } from "../data/db_star_systems.js";
import { db_campaign } from "../data/db_campaign.js";
import { db_vessels } from "../data/db_vessels.js";
import { db_lore_extended } from "../data/db_lore_extended.js";

import { openPanel } from "./panel.js";

export const databanks = {
    "Species": db_species,
    "Factions": db_factions,
    "Stations": db_stations,
    "Star Systems": db_star_systems,
    "Campaign": db_campaign,
    "Vessels": db_vessels,
    "Extended Lore": db_lore_extended
};

const categoryList = document.getElementById("db-categories");
const entryList = document.getElementById("db-entries");

export function loadCategories() {
    categoryList.innerHTML = "";

    Object.keys(databanks).forEach(category => {
        const btn = document.createElement("button");
        btn.className = "db-category-btn";
        btn.textContent = category;

        btn.onclick = () => loadEntries(category);

        categoryList.appendChild(btn);
    });
}

export function loadEntries(category) {
    entryList.innerHTML = "";

    const entries = databanks[category];

    entries.forEach(entry => {
        const btn = document.createElement("button");
        btn.className = "db-entry-btn";
        btn.textContent = entry.title;

        btn.onclick = () => openPanel(entry);

        entryList.appendChild(btn);
    });
}
