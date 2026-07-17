// ======================================================
// MAP CONFIG — SYSTEMS, STATIONS, WORMHOLES, STARDUST
// ======================================================

const MAP_CONFIG = {
  // Base scale for coordinates (you can tweak later)
  scale: 1.0,

  // Systems, stations, anomalies, etc.
  objects: [
    // -----------------------------
    // CORE SYSTEMS (EXAMPLES)
    // -----------------------------
    {
      id: "trinary_system",
      name: "Trinary System",
      type: "system",
      x: -200,
      y: 50,
      radius: 6,
      color: "#ff9966",
      notes: "Primary core system; high traffic."
    },
    {
      id: "brunhilde_system",
      name: "Brunhilde System",
      type: "system",
      x: -80,
      y: 120,
      radius: 6,
      color: "#ff9966",
      notes: "Industrial system with debris fields."
    },
    {
      id: "var_lupra_system",
      name: "Var Lupra",
      type: "system",
      x: 140,
      y: 40,
      radius: 6,
      color: "#ff9966",
      notes: "Cloud‑rich system; station presence."
    },

    // -----------------------------
    // WARREN WORMHOLE REGION
    // -----------------------------
    {
      id: "warren_wormhole",
      name: "Warren Wormhole",
      type: "wormhole",
      x: 60,
      y: -80,
      radius: 8,
      color: "#66ccff",
      notes: "Major transit anomaly; high‑risk corridor."
    },
    {
      id: "warren_station",
      name: "Warren Relay Station",
      type: "station",
      x: 80,
      y: -60,
      radius: 4,
      color: "#ffff66",
      notes: "Monitoring and traffic control for Warren Wormhole."
    },

    // -----------------------------
    // OTHER POINTS OF INTEREST
    // -----------------------------
    {
      id: "arcavion_reach",
      name: "Arcavion Reach",
      type: "system",
      x: -260,
      y: -40,
      radius: 5,
      color: "#ffcc88",
      notes: "Military frontier; patrol routes."
    },
    {
      id: "aquila_union",
      name: "Aquila Union",
      type: "system",
      x: 220,
      y: -10,
      radius: 5,
      color: "#ffcc88",
      notes: "Political hub; trade and diplomacy."
    },
    {
      id: "mido_drift",
      name: "Mido Drift",
      type: "system",
      x: 10,
      y: 160,
      radius: 5,
      color: "#ffcc88",
      notes: "Sparse frontier; salvage operations."
    }
  ],

  // XSV Stardust — dynamic marker
  stardust: {
    id: "xsv_stardust",
    name: "XSV Stardust",
    type: "ship",
    // Positioned near Warren Wormhole
    x: 68,
    y: -72,
    radius: 5,
    color: "#ff66ff",
    notes: "Current position: holding pattern near Warren Wormhole."
  }
};
