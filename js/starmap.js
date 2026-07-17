// ==========================================
// Star Map System
// ==========================================

export function initializeStarMap() {
    const mapContainer = document.getElementById("starmap-container");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Set canvas size
    canvas.width = mapContainer.clientWidth;
    canvas.height = mapContainer.clientHeight;
    
    // Star map data structure
    const starMapLevels = {
        galaxy: {
            name: "Milky Way Galaxy",
            children: {
                crux: {
                    name: "Crux Constellation",
                    x: 300,
                    y: 250,
                    size: 80,
                    children: {
                        brunhilde: {
                            name: "Brunhilde System",
                            x: 250,
                            y: 200,
                            size: 40,
                            type: "star",
                            planets: [
                                { name: "Militia", x: 200, y: 150 },
                                { name: "Gastron", x: 250, y: 180, inhabited: true },
                                { name: "Necron", x: 300, y: 200 },
                                { name: "Covault", x: 350, y: 210 },
                                { name: "Verio", x: 400, y: 190 }
                            ]
                        },
                        varLupra: {
                            name: "Var Lupra System",
                            x: 500,
                            y: 300,
                            size: 40,
                            type: "star",
                            planets: [
                                { name: "Naokin", x: 450, y: 250 },
                                { name: "Pareah", x: 500, y: 280, inhabited: true, hostile: true },
                                { name: "Trigen", x: 550, y: 310 }
                            ]
                        }
                    }
                }
            }
        }
    };
    
    let currentLevel = "galaxy";
    let zoomHistory = [];
    
    // Draw functions
    function drawGalaxy() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffcc66";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GALAXY VIEW - Milky Way", canvas.width / 2, 40);
        
        ctx.fillStyle = "#66ccff";
        ctx.font = "14px Arial";
        ctx.fillText("Click on regions to zoom in", canvas.width / 2, canvas.height - 30);
        
        // Draw Crux Constellation
        const crux = starMapLevels.galaxy.children.crux;
        ctx.fillStyle = "#ff9900";
        ctx.beginPath();
        ctx.arc(crux.x, crux.y, crux.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#ffcc66";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(crux.name, crux.x, crux.y);
        
        // Create clickable zone
        canvas.onclick = () => zoomIntoConstellation();
    }
    
    function drawConstellation() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffcc66";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("CRUX CONSTELLATION", canvas.width / 2, 40);
        
        ctx.fillStyle = "#66ccff";
        ctx.font = "14px Arial";
        ctx.fillText("Star Systems - Click to explore", canvas.width / 2, canvas.height - 30);
        
        // Draw star systems
        const systems = starMapLevels.galaxy.children.crux.children;
        
        Object.values(systems).forEach(system => {
            ctx.fillStyle = "#ffff00";
            ctx.beginPath();
            ctx.arc(system.x, system.y, system.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = "#ffcc66";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(system.name, system.x, system.y + system.size + 20);
        });
        
        // Back button
        ctx.fillStyle = "#7f1fa2";
        ctx.fillRect(20, 20, 100, 30);
        ctx.fillStyle = "#ffcc66";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("< BACK", 70, 40);
        
        canvas.onclick = (e) => handleConstellationClick(e, systems);
    }
    
    function drawSystem(systemId) {
        const system = starMapLevels.galaxy.children.crux.children[systemId];
        
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffcc66";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(system.name.toUpperCase(), canvas.width / 2, 40);
        
        // Draw star
        ctx.fillStyle = "#ffff00";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 120, 30, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#ffcc66";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Primary Star", canvas.width / 2, 160);
        
        // Draw planets
        system.planets.forEach((planet, index) => {
            const angle = (index / system.planets.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 120 + index * 30;
            const x = canvas.width / 2 + Math.cos(angle) * radius;
            const y = 120 + Math.sin(angle) * radius;
            
            ctx.fillStyle = planet.hostile ? "#ff6600" : planet.inhabited ? "#66ff66" : "#6666ff";
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = "#ffcc66";
            ctx.font = "11px Arial";
            ctx.textAlign = "center";
            ctx.fillText(planet.name, x, y + 25);
        });
        
        // Back button
        ctx.fillStyle = "#7f1fa2";
        ctx.fillRect(20, 20, 100, 30);
        ctx.fillStyle = "#ffcc66";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("< BACK", 70, 40);
        
        ctx.fillStyle = "#66ccff";
        ctx.font = "12px Arial";
        ctx.fillText("Click planets for details (future feature)", canvas.width / 2, canvas.height - 30);
        
        canvas.onclick = (e) => {
            if (e.offsetX < 120 && e.offsetX > 20 && e.offsetY < 50 && e.offsetY > 20) {
                zoomOutToConstellation();
            }
        };
    }
    
    function zoomIntoConstellation() {
        zoomHistory.push("galaxy");
        currentLevel = "constellation";
        drawConstellation();
    }
    
    function zoomOutToConstellation() {
        currentLevel = "constellation";
        drawConstellation();
    }
    
    function handleConstellationClick(e, systems) {
        // Back button
        if (e.offsetX < 120 && e.offsetX > 20 && e.offsetY < 50 && e.offsetY > 20) {
            currentLevel = "galaxy";
            drawGalaxy();
            return;
        }
        
        // System zones
        Object.entries(systems).forEach(([id, system]) => {
            const dist = Math.sqrt(
                Math.pow(e.offsetX - system.x, 2) + 
                Math.pow(e.offsetY - system.y, 2)
            );
            if (dist < system.size + 20) {
                zoomHistory.push("constellation");
                currentLevel = id;
                drawSystem(id);
            }
        });
    }
    
    // Initialize
    drawGalaxy();
}
