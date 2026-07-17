// ==========================================
// UI: Databank Reader Panel
// ==========================================

const panel = document.getElementById("db-panel");
const panelTitle = document.getElementById("db-panel-title");
const panelContent = document.getElementById("db-panel-content");

export function openPanel(entry) {
    panelTitle.textContent = entry.title;
    panelContent.innerHTML = formatContent(entry.content);

    panel.classList.add("open");
}

export function closePanel() {
    panel.classList.remove("open");
}

// Basic formatting for multiline databank content
function formatContent(text) {
    return text
        .trim()
        .replace(/\n/g, "<br>");
}
