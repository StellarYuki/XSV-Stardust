// ===============================
// Databanks UI (Categories/Entries)
// ===============================

import { stations } from "../data/db_stations.js";
import { species } from "../data/db_species.js";
import { db_factions } from "../data/db_factions.js";
import { starSystems } from "../data/db_star_systems.js";
import { db_campaign } from "../data/db_campaign.js";
import { db_vessels } from "../data/db_vessels.js";
import { db_lore_extended as loreExt } from "../data/db_lore_extended.js";
import { openPanel } from "./panel.js";

const categoryList = document.getElementById("db-categories");
const entryList = document.getElementById("db-entries");

const databankCategories = {
    "Stations": stations,
    "Species": species,
    "Factions": db_factions,
    "Star Systems": starSystems,
    "Campaign": db_campaign,
    "Vessels": db_vessels,
    "Extended Lore": loreExt
};

export function loadCategories() {
    categoryList.innerHTML = "";
    entryList.innerHTML = "";

    Object.keys(databankCategories).forEach(categoryName => {
        const btn = document.createElement("button");
        btn.className = "db-category-btn";
        btn.textContent = categoryName;

        btn.addEventListener("click", () => {
            loadEntriesForCategory(categoryName);
        });

        categoryList.appendChild(btn);
    });
}

export function loadEntriesForCategory(categoryName) {
    entryList.innerHTML = "";

    const entries = databankCategories[categoryName] || [];

    entries.forEach(entry => {
        const btn = document.createElement("button");
        btn.className = "db-entry-btn";
        btn.textContent = entry.title;

        btn.addEventListener("click", () => {
            openPanel(entry);
        });

        entryList.appendChild(btn);
    });
}
