// ===============================
// Centered Detail Panel
// ===============================

const panel = document.getElementById("db-panel");
const panelTitle = document.getElementById("db-panel-title");
const panelContent = document.getElementById("db-panel-content");

export function openPanel(entry) {
    panelTitle.textContent = entry.title;

    let imgHTML = "";
    if (entry.image) {
        imgHTML = `<img class="db-profile-img" src="${entry.image}" alt="${entry.title}">`;
    }

    panelContent.innerHTML = imgHTML + formatContent(entry.content);

    panel.classList.remove("hidden");
}

export function closePanel() {
    panel.classList.add("hidden");
}

function formatContent(text) {
    return text.trim().replace(/\n/g, "<br>");
}
