// ======================================================
// ORBIT DATA — PART 1
// SECTOR 1: VARIX CORE
// SECTOR 2: CRUX FRONTIER
// ======================================================

export default {
  // ------------------------------------------------------
  // TRINARY SYSTEM (THYNOME)
  // ------------------------------------------------------
  trinary_system: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "hima", radius: 20, angle: 45, size: 10, moons: [] },
      { id: "masu", radius: 40, angle: 135, size: 14, moons: [] },
      {
        id: "kisano",
        radius: 65,
        angle: 220,
        size: 16,
        moons: [
          { id: "ku", radius: 8, angle: 90, size: 4 },
          { id: "ko", radius: 11, angle: 210, size: 4 }
        ]
      },
      { id: "thynome", radius: 95, angle: 300, size: 20, moons: [] }
    ],
    belts: [
      { radius: 130, thickness: 10 }
    ],
    anomalies: [
      { id: "white_maw_anchor", radius: 170, angle: 270 }
    ]
  },

  // ------------------------------------------------------
  // WHITE MAW ANOMALY (ORBIT ANCHOR ONLY)
  // ------------------------------------------------------
  white_maw: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: [
      { id: "white_maw_core", radius: 60, angle: 0 }
    ]
  },

  // ------------------------------------------------------
  // CORE ECHO SYSTEM
  // ------------------------------------------------------
  core_echo: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "echo_i", radius: 25, angle: 60, size: 12, moons: [] },
      { id: "echo_ii", radius: 55, angle: 190, size: 14, moons: [] },
      { id: "echo_iii", radius: 85, angle: 310, size: 18, moons: [] }
    ],
    belts: [
      { radius: 120, thickness: 12 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // CORE RESEARCH NODE
  // ------------------------------------------------------
  core_research: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "lab_world", radius: 30, angle: 45, size: 13, moons: [] },
      { id: "test_moon", radius: 60, angle: 210, size: 9, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "field_distortion", radius: 110, angle: 300 }
    ]
  },

  // ------------------------------------------------------
  // VOID SCAR SYSTEM
  // ------------------------------------------------------
  void_scar: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "scar_i", radius: 35, angle: 30, size: 11, moons: [] },
      { id: "scar_ii", radius: 70, angle: 200, size: 15, moons: [] }
    ],
    belts: [
      { radius: 105, thickness: 10 }
    ],
    anomalies: [
      { id: "void_residue", radius: 145, angle: 250 }
    ]
  },

  // ------------------------------------------------------
  // POLAR GATE
  // ------------------------------------------------------
  polar_gate: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "gate_world", radius: 40, angle: 90, size: 14, moons: [] },
      { id: "outer_anchor", radius: 80, angle: 270, size: 12, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "gate_ring", radius: 120, angle: 0 }
    ]
  },

  // ------------------------------------------------------
  // HALO BELT SYSTEM
  // ------------------------------------------------------
  halo_belt: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "inner_rock", radius: 25, angle: 45, size: 9, moons: [] }
    ],
    belts: [
      { radius: 60, thickness: 15 },
      { radius: 100, thickness: 12 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // EMBER SHARD
  // ------------------------------------------------------
  ember_shard: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "shard_world", radius: 35, angle: 140, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "flare_arc", radius: 90, angle: 310 }
    ]
  },

  // ======================================================
  // SECTOR 2 — CRUX FRONTIER
  // ======================================================

  // ------------------------------------------------------
  // BRUNHILDE SYSTEM (GASTRON)
  // ------------------------------------------------------
  brunhilde_system: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "gastron", radius: 45, angle: 80, size: 18, moons: [] },
      { id: "debris_world", radius: 80, angle: 210, size: 14, moons: [] }
    ],
    belts: [
      { radius: 120, thickness: 15 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // SHATTERED VEIL RIFT
  // ------------------------------------------------------
  shattered_veil: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: [
      { id: "veil_core", radius: 70, angle: 45 },
      { id: "echo_node", radius: 120, angle: 225 }
    ]
  },

  // ------------------------------------------------------
  // CRUX OUTPOST SYSTEM
  // ------------------------------------------------------
  crux_outpost: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "crux_i", radius: 30, angle: 60, size: 12, moons: [] },
      { id: "outpost_moon", radius: 65, angle: 240, size: 9, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // LEIVERTA RUINS SYSTEM
  // ------------------------------------------------------
  leiverta_ruins: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "leiverta", radius: 40, angle: 100, size: 15, moons: [] }
    ],
    belts: [
      { radius: 85, thickness: 10 }
    ],
    anomalies: [
      { id: "palace_station", radius: 120, angle: 300 }
    ]
  },

  // ------------------------------------------------------
  // GREEN SPAN SYSTEM
  // ------------------------------------------------------
  green_span: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "forest_world", radius: 35, angle: 45, size: 16, moons: [] },
      { id: "river_moon", radius: 70, angle: 200, size: 10, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // DUSK CHAIN SYSTEM
  // ------------------------------------------------------
  dusk_chain: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "dusk_i", radius: 25, angle: 30, size: 11, moons: [] },
      { id: "dusk_ii", radius: 55, angle: 160, size: 13, moons: [] },
      { id: "dusk_iii", radius: 85, angle: 280, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // ORE MIRROR SYSTEM
  // ------------------------------------------------------
  ore_mirror: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "mirror_world", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [
      { radius: 80, thickness: 12 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // RIDGE WATCH SYSTEM
  // ------------------------------------------------------
  ridge_watch: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "ridge_world", radius: 30, angle: 60, size: 13, moons: [] },
      { id: "watch_moon", radius: 65, angle: 220, size: 9, moons: [] }
    ],
    belts: [],
    anomalies: []
  }
,
// ======================================================
// ORBIT DATA — PART 2
// SECTOR 3: VAR LUPRA CORRIDOR
// SECTOR 4: ASTRAL EXPANSE
// ======================================================

  // ------------------------------------------------------
  // VAR LUPRA SYSTEM (VARIX CLOUDS)
  // ------------------------------------------------------
  var_lupra_system: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "var_cloud_world", radius: 35, angle: 60, size: 15, moons: [] },
      { id: "station_orbit", radius: 70, angle: 200, size: 10, moons: [] }
    ],
    belts: [
      { radius: 110, thickness: 12 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // SHADOW LANE SYSTEM
  // ------------------------------------------------------
  shadow_lane: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "twilight_world", radius: 30, angle: 45, size: 14, moons: [] },
      { id: "hidden_moon", radius: 65, angle: 230, size: 9, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // BLUE CURRENT NEBULA
  // ------------------------------------------------------
  blue_current: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: [
      { id: "nebula_core", radius: 80, angle: 90 },
      { id: "warp_test_node", radius: 130, angle: 270 }
    ]
  },

  // ------------------------------------------------------
  // DRIFT CROSSING SYSTEM
  // ------------------------------------------------------
  drift_crossing: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "drift_i", radius: 25, angle: 30, size: 11, moons: [] },
      { id: "drift_ii", radius: 55, angle: 180, size: 13, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // SMUGGLERS' REST
  // ------------------------------------------------------
  smugglers_rest: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "rest_moon", radius: 40, angle: 120, size: 12, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // NIGHT ANCHOR SYSTEM
  // ------------------------------------------------------
  night_anchor: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "anchor_giant", radius: 50, angle: 90, size: 20, moons: [] }
    ],
    belts: [
      { radius: 95, thickness: 12 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // FLARE POCKET SYSTEM
  // ------------------------------------------------------
  flare_pocket: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "flare_world", radius: 30, angle: 45, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "flare_arc", radius: 80, angle: 300 }
    ]
  },

  // ------------------------------------------------------
  // RUST FIELD SYSTEM
  // ------------------------------------------------------
  rust_field: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "rust_world", radius: 35, angle: 60, size: 13, moons: [] }
    ],
    belts: [
      { radius: 75, thickness: 15 }
    ],
    anomalies: []
  },

  // ======================================================
  // SECTOR 4 — ASTRAL EXPANSE
  // ======================================================

  // ------------------------------------------------------
  // ASTRAL HUB SYSTEM
  // ------------------------------------------------------
  astral_hub: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "hub_world", radius: 40, angle: 90, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "prime_station", radius: 80, angle: 270 }
    ]
  },

  // ------------------------------------------------------
  // BROKEN RING SYSTEM
  // ------------------------------------------------------
  broken_ring: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "ring_fragment_world", radius: 50, angle: 120, size: 17, moons: [] }
    ],
    belts: [
      { radius: 90, thickness: 20 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // RELAY SPINE SYSTEM
  // ------------------------------------------------------
  relay_spine: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "relay_world", radius: 30, angle: 60, size: 13, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "comm_array", radius: 70, angle: 220 }
    ]
  },

  // ------------------------------------------------------
  // FREIGHT SPINE SYSTEM
  // ------------------------------------------------------
  freight_spine: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "freight_world", radius: 35, angle: 100, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "cargo_platforms", radius: 80, angle: 260 }
    ]
  },

  // ------------------------------------------------------
  // DEPOT SIGMA SYSTEM
  // ------------------------------------------------------
  depot_sigma: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "sigma_depot", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // CUSTOMS BARRIER SYSTEM
  // ------------------------------------------------------
  customs_barrier: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "checkpoint_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "inspection_array", radius: 80, angle: 240 }
    ]
  },

  // ------------------------------------------------------
  // SALVAGE YARD SYSTEM
  // ------------------------------------------------------
  salvage_yard: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "yard_world", radius: 30, angle: 45, size: 13, moons: [] }
    ],
    belts: [
      { radius: 70, thickness: 18 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // TRADE CONFLUX SYSTEM
  // ------------------------------------------------------
  trade_conflux: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "conflux_world", radius: 40, angle: 100, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: []
  }
,
// ======================================================
// ORBIT DATA — PART 3
// SECTOR 5: RIFT SECTOR
// SECTOR 6: MAGECRAFT BELT
// ======================================================

  // ------------------------------------------------------
  // ECHO RIFT
  // ------------------------------------------------------
  echo_rift: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: [
      { id: "rift_core", radius: 70, angle: 45 },
      { id: "echo_node", radius: 120, angle: 225 }
    ]
  },

  // ------------------------------------------------------
  // MIRROR SYSTEM
  // ------------------------------------------------------
  mirror_system: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "crystal_world", radius: 30, angle: 60, size: 13, moons: [] },
      { id: "dark_absorber", radius: 60, angle: 200, size: 15, moons: [] },
      { id: "prismatic_giant", radius: 95, angle: 310, size: 20, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // FRACTURE NODE
  // ------------------------------------------------------
  fracture_node: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "unstable_world", radius: 35, angle: 45, size: 14, moons: [] },
      { id: "broken_orbit_world", radius: 75, angle: 220, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // TIME POCKET SYSTEM
  // ------------------------------------------------------
  time_pocket: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "pocket_world", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "time_field", radius: 85, angle: 270 }
    ]
  },

  // ------------------------------------------------------
  // GHOST LANE SYSTEM
  // ------------------------------------------------------
  ghost_lane: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "ghost_world", radius: 30, angle: 45, size: 13, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // PHASE HARBOR SYSTEM
  // ------------------------------------------------------
  phase_harbor: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "harbor_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "phase_station", radius: 80, angle: 240 }
    ]
  },

  // ------------------------------------------------------
  // SPLIT ORBIT SYSTEM
  // ------------------------------------------------------
  split_orbit: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "dual_track_world", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // DELAY POINT SYSTEM
  // ------------------------------------------------------
  delay_point: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "relay_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ======================================================
  // SECTOR 6 — MAGECRAFT BELT
  // ======================================================

  // ------------------------------------------------------
  // MANA STORMS SYSTEM
  // ------------------------------------------------------
  mana_storms: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "storm_world", radius: 40, angle: 90, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "mana_arc", radius: 80, angle: 270 }
    ]
  },

  // ------------------------------------------------------
  // LIVING WORLD SYSTEM
  // ------------------------------------------------------
  living_world: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "gaia_i", radius: 45, angle: 100, size: 18, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // WHITE FOUNTAIN
  // ------------------------------------------------------
  white_fountain: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: [
      { id: "fountain_core", radius: 60, angle: 0 },
      { id: "energy_stream", radius: 110, angle: 180 }
    ]
  },

  // ------------------------------------------------------
  // SPELL FORGE SYSTEM
  // ------------------------------------------------------
  spell_forge: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "forge_world", radius: 35, angle: 60, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // AURORA CHAIN SYSTEM
  // ------------------------------------------------------
  aurora_chain: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "aurora_i", radius: 30, angle: 45, size: 13, moons: [] },
      { id: "aurora_ii", radius: 60, angle: 200, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // SHRINE SYSTEM
  // ------------------------------------------------------
  shrine_system: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "shrine_moon", radius: 40, angle: 90, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // MIST ORBIT SYSTEM
  // ------------------------------------------------------
  mist_orbit: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "mist_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // CHANT NODE SYSTEM
  // ------------------------------------------------------
  chant_node: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "chant_world", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: []
  }
,
// ======================================================
// ORBIT DATA — PART 4
// SECTOR 7: NANO FRONTIER
// SECTOR 8: OUTER DARK
// ======================================================

  // ------------------------------------------------------
  // NANO FOG SYSTEM
  // ------------------------------------------------------
  nano_fog_system: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "fog_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "nano_cloud", radius: 80, angle: 240 }
    ]
  },

  // ------------------------------------------------------
  // ARTIFICIAL SUN SYSTEM
  // ------------------------------------------------------
  artificial_sun: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "scorched_world", radius: 45, angle: 100, size: 17, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // DYSON GRAVE SYSTEM
  // ------------------------------------------------------
  dyson_grave: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "grave_world", radius: 40, angle: 90, size: 16, moons: [] }
    ],
    belts: [
      { radius: 80, thickness: 20 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // TEST ARRAY SYSTEM
  // ------------------------------------------------------
  test_array: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "array_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // SCRAP CLOUD SYSTEM
  // ------------------------------------------------------
  scrap_cloud: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "scrap_world", radius: 30, angle: 45, size: 13, moons: [] }
    ],
    belts: [
      { radius: 70, thickness: 18 }
    ],
    anomalies: []
  },

  // ------------------------------------------------------
  // CORE LAB SYSTEM
  // ------------------------------------------------------
  core_lab: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "lab_world", radius: 40, angle: 90, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // LATTICE FIELD SYSTEM
  // ------------------------------------------------------
  lattice_field: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "lattice_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // SHARD BASIN SYSTEM
  // ------------------------------------------------------
  shard_basin: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "shard_world", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ======================================================
  // SECTOR 8 — OUTER DARK
  // ======================================================

  // ------------------------------------------------------
  // VOID NEST CLUSTER
  // ------------------------------------------------------
  void_nest: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: [
      { id: "nest_core", radius: 70, angle: 45 },
      { id: "secondary_well", radius: 120, angle: 225 }
    ]
  },

  // ------------------------------------------------------
  // CRYSTAL ECHO SYSTEM
  // ------------------------------------------------------
  crystal_echo: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "echo_crystal_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // SILENT HORIZON SYSTEM
  // ------------------------------------------------------
  silent_horizon: {
    star: { x: 0, y: 0 },
    planets: [],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // DARK SPINE SYSTEM
  // ------------------------------------------------------
  dark_spine: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "spine_world", radius: 30, angle: 45, size: 13, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // HOLLOW EYE SYSTEM
  // ------------------------------------------------------
  hollow_eye: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "hollow_world", radius: 40, angle: 90, size: 16, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // GRAVE CURRENT SYSTEM
  // ------------------------------------------------------
  grave_current: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "current_world", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  },

  // ------------------------------------------------------
  // ABYSS GATE SYSTEM
  // ------------------------------------------------------
  abyss_gate: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "gate_world", radius: 40, angle: 90, size: 15, moons: [] }
    ],
    belts: [],
    anomalies: [
      { id: "gate_frame", radius: 80, angle: 270 }
    ]
  },

  // ------------------------------------------------------
  // LAST BEACON SYSTEM
  // ------------------------------------------------------
  last_beacon: {
    star: { x: 0, y: 0 },
    planets: [
      { id: "beacon_station", radius: 35, angle: 60, size: 14, moons: [] }
    ],
    belts: [],
    anomalies: []
  }
};
