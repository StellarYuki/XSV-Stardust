// ===============================
// Databanks UI (Categories/Entries)
// ===============================

import { stations } from "../data/db_stations.js";
import { openPanel } from "./panel.js";

const categoryList = document.getElementById("db-categories");
const entryList = document.getElementById("db-entries");

// For now, we start with one category: Stations.
// Later we can add Species, Factions, Star Systems, Campaign, Vessels, Extended Lore.

const databankCategories = {
    "Stations": stations
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
