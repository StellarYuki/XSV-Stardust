// ======================================================
// MAP RENDERER — CANVAS, ZOOM, PAN, CLICK, STARDUST
// ======================================================

(function () {
  const canvas = document.getElementById("starMap");
  const ctx = canvas.getContext("2d");

  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const resetViewBtn = document.getElementById("resetViewBtn");

  const selectedNameEl = document.getElementById("selectedName");
  const selectedTypeEl = document.getElementById("selectedType");
  const selectedNotesEl = document.getElementById("selectedNotes");

  // View state
  let zoom = 1.0;
  let offsetX = 0;
  let offsetY = 0;

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    draw();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Transform helpers
  function worldToScreen(x, y) {
    return {
      sx: canvas.width / 2 + (x * MAP_CONFIG.scale + offsetX) * zoom,
      sy: canvas.height / 2 + (y * MAP_CONFIG.scale + offsetY) * zoom
    };
  }

  function screenToWorld(sx, sy) {
    const x =
      (sx - canvas.width / 2) / zoom / MAP_CONFIG.scale - offsetX;
    const y =
      (sy - canvas.height / 2) / zoom / MAP_CONFIG.scale - offsetY;
    return { x, y };
  }

  // Drawing
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background grid (subtle)
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

    // Draw systems / stations / wormholes
    MAP_CONFIG.objects.forEach((obj) => {
      const { sx, sy } = worldToScreen(obj.x, obj.y);

      // Circle
      ctx.beginPath();
      ctx.fillStyle = obj.color;
      ctx.arc(sx, sy, obj.radius * zoom, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = "#ffcc88";
      ctx.font = `${10 * zoom}px system-ui, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(obj.name, sx + 6 * zoom, sy + 4 * zoom);
    });

    // Draw Stardust
    const sd = MAP_CONFIG.stardust;
    const { sx: sdx, sy: sdy } = worldToScreen(sd.x, sd.y);

    ctx.beginPath();
    ctx.fillStyle = sd.color;
    ctx.arc(sdx, sdy, sd.radius * zoom, 0, Math.PI * 2);
    ctx.fill();

    // Stardust label
    ctx.fillStyle = "#ff66ff";
    ctx.font = `${10 * zoom}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(sd.name, sdx + 6 * zoom, sdy - 4 * zoom);
  }

  // Zoom controls
  zoomInBtn.addEventListener("click", () => {
    zoom *= 1.2;
    draw();
  });

  zoomOutBtn.addEventListener("click", () => {
    zoom /= 1.2;
    if (zoom < 0.3) zoom = 0.3;
    draw();
  });

  resetViewBtn.addEventListener("click", () => {
    zoom = 1.0;
    offsetX = 0;
    offsetY = 0;
    draw();
  });

  // Drag / pan
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

  // Click detection
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    // Check Stardust first
    const sd = MAP_CONFIG.stardust;
    const { sx: sdx, sy: sdy } = worldToScreen(sd.x, sd.y);
    const distSd = Math.hypot(sx - sdx, sy - sdy);
    if (distSd <= sd.radius * zoom + 4) {
      setSelected(sd);
      return;
    }

    // Check objects
    for (const obj of MAP_CONFIG.objects) {
      const { sx: ox, sy: oy } = worldToScreen(obj.x, obj.y);
      const dist = Math.hypot(sx - ox, sy - oy);
      if (dist <= obj.radius * zoom + 4) {
        setSelected(obj);
        return;
      }
    }

    // Clicked empty space
    setSelected(null);
  });

  function setSelected(obj) {
    if (!obj) {
      selectedNameEl.textContent = "None";
      selectedTypeEl.textContent = "—";
      selectedNotesEl.textContent = "—";
      return;
    }
    selectedNameEl.textContent = obj.name;
    selectedTypeEl.textContent = obj.type;
    selectedNotesEl.textContent = obj.notes || "—";
  }

  // Initial draw
  draw();
})();
