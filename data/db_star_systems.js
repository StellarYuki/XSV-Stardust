// ===============================
// Star Systems Databank
// ===============================
//
// Galaxy: Varix
// Total Entries: 64
// Sectors: 8
// Types: star_system, black_hole, white_hole, nebula, rift_anomaly,
//        megastructure_system, dead_system, cluster, anomaly_system
// ===============================

export const starSystems = [

    // ===========================
    // Sector 1 — Varix Core
    // ===========================
    {
        id: "trinary_system",
        sector: 1,
        title: "Trinary System (Thynome)",
        type: "binary_star_system",
        position: { x: 0, y: 0 },
        content: `
⦿ Star System: Trinary
Region: Varix Core
Class: Binary Star System

Notable:
• Home of Thynoimals
• Arctic super‑planet Thynome
• Multiple gas giants, dense belts
• Neighboring black hole and colony systems
        `
    },
    {
        id: "white_maw",
        sector: 1,
        title: "White Maw Anomaly",
        type: "white_hole",
        position: { x: 12, y: -5 },
        content: `
⦿ Object: White Maw
Type: Unstable White Hole

Ejects high‑density mana and exotic particles.
Forbidden zone for Thynoimal vessels.
        `
    },
    {
        id: "core_echo",
        sector: 1,
        title: "Core Echo System",
        type: "star_system",
        position: { x: -8, y: 6 },
        content: `
⦿ Star System: Core Echo

Planets:
• Echo‑I — crystalline resonant world
• Echo‑II — frozen subsurface ocean
• Echo‑III — mild gas giant

Crystals echo Thynome’s last broadcast.
        `
    },
    {
        id: "core_research",
        sector: 1,
        title: "Core Research Node",
        type: "star_system",
        position: { x: 4, y: 3 },
        content: `
⦿ Star System: Core Research

Features:
• Thynoimal deep‑space lab
• Mana and nano‑field testing
• Restricted access
        `
    },
    {
        id: "void_scar",
        sector: 1,
        title: "Void Scar System",
        type: "anomaly_system",
        position: { x: -5, y: -4 },
        content: `
⦿ Star System: Void Scar

Central star dimmed by past Void incursion.
Residual dark matter clouds distort sensors.
        `
    },
    {
        id: "polar_gate",
        sector: 1,
        title: "Polar Gate",
        type: "star_system",
        position: { x: 9, y: 9 },
        content: `
⦿ Star System: Polar Gate

Outer planets host ancient gate rings aligned to polar axes.
Purpose unknown; inactive but intact.
        `
    },
    {
        id: "halo_belt",
        sector: 1,
        title: "Halo Belt System",
        type: "star_system",
        position: { x: -11, y: 2 },
        content: `
⦿ Star System: Halo Belt

Dense asteroid halo around central star.
Used for mining and sensor calibration.
        `
    },
    {
        id: "ember_shard",
        sector: 1,
        title: "Ember Shard",
        type: "star_system",
        position: { x: 6, y: -9 },
        content: `
⦿ Star System: Ember Shard

Red dwarf with a single molten shard world.
Occasional energy flares used for reactor testing.
        `
    },

    // ===========================
    // Sector 2 — Crux Frontier
    // ===========================
    {
        id: "brunhilde_system",
        sector: 2,
        title: "Brunhilde System (Gastron)",
        type: "star_system",
        position: { x: -20, y: 10 },
        content: `
⦿ Star System: Brunhilde

Home of Setreans on Gastron.
Debris belt from ancient conflict.
Sensor‑scrambling ore deposits in ruins.
        `
    },
    {
        id: "shattered_veil",
        sector: 2,
        title: "Shattered Veil Rift",
        type: "rift_anomaly",
        position: { x: -25, y: 15 },
        content: `
⦿ Object: Shattered Veil

Dimensional rift with time dilation and visual mirages.
Linked to early Universal Drive experiments.
        `
    },
    {
        id: "crux_outpost",
        sector: 2,
        title: "Crux Outpost System",
        type: "star_system",
        position: { x: -18, y: 4 },
        content: `
⦿ Star System: Crux Outpost

Leiverta listening post ruins on Crux‑I.
Minor habitable moon with abandoned facilities.
        `
    },
    {
        id: "leiverta_ruins",
        sector: 2,
        title: "Leiverta Ruins System",
        type: "star_system",
        position: { x: -16, y: 12 },
        content: `
⦿ Star System: Leiverta Ruins

Collapsed palace station in orbit.
Surface ruins hint at monarchy‑era expansion.
        `
    },
    {
        id: "green_span",
        sector: 2,
        title: "Green Span System",
        type: "star_system",
        position: { x: -22, y: 7 },
        content: `
⦿ Star System: Green Span

Main world covered in dense forests and rivers.
Used as a quiet resupply point by Setrean traders.
        `
    },
    {
        id: "dusk_chain",
        sector: 2,
        title: "Dusk Chain",
        type: "star_system",
        position: { x: -27, y: 9 },
        content: `
⦿ Star System: Dusk Chain

Series of small worlds locked in permanent twilight.
Ideal for low‑profile research stations.
        `
    },
    {
        id: "ore_mirror",
        sector: 2,
        title: "Ore Mirror System",
        type: "star_system",
        position: { x: -19, y: 16 },
        content: `
⦿ Star System: Ore Mirror

Planetary crust rich in reflective ore.
Used to test sensor countermeasures.
        `
    },
    {
        id: "ridge_watch",
        sector: 2,
        title: "Ridge Watch System",
        type: "star_system",
        position: { x: -14, y: 6 },
        content: `
⦿ Star System: Ridge Watch

Mountainous world with old observation towers.
Former frontier monitoring site.
        `
    },

    // ===========================
    // Sector 3 — Var Lupra Corridor
    // ===========================
    {
        id: "var_lupra_system",
        sector: 3,
        title: "Var Lupra System (Varix Clouds)",
        type: "star_system",
        position: { x: 10, y: 18 },
        content: `
⦿ Star System: Var Lupra

Varix gas clouds, Night Star Station, high pirate activity.
Refined Var powder used as fuel and spice.
        `
    },
    {
        id: "shadow_lane",
        sector: 3,
        title: "Shadow Lane System",
        type: "star_system",
        position: { x: 15, y: 22 },
        content: `
⦿ Star System: Shadow Lane

Tidally locked world with twilight band.
Hidden pirate caches and docking rings.
        `
    },
    {
        id: "blue_current",
        sector: 3,
        title: "Blue Current Nebula",
        type: "nebula",
        position: { x: 7, y: 25 },
        content: `
⦿ Object: Blue Current

Ionized blue nebula.
Used to test Fluid Warp Drive prototypes.
        `
    },
    {
        id: "drift_crossing",
        sector: 3,
        title: "Drift Crossing System",
        type: "star_system",
        position: { x: 13, y: 15 },
        content: `
⦿ Star System: Drift Crossing

Sparse asteroid fields and weak gravity wells.
Common route for smugglers avoiding main lanes.
        `
    },
    {
        id: "smugglers_rest",
        sector: 3,
        title: "Smugglers' Rest",
        type: "star_system",
        position: { x: 18, y: 19 },
        content: `
⦿ Star System: Smugglers' Rest

Small habitable moon with hidden docks.
Unofficial neutral ground for shady deals.
        `
    },
    {
        id: "night_anchor",
        sector: 3,
        title: "Night Anchor System",
        type: "star_system",
        position: { x: 9, y: 21 },
        content: `
⦿ Star System: Night Anchor

Gas giant with massive orbital station frame.
Early prototype for Night Star Station.
        `
    },
    {
        id: "flare_pocket",
        sector: 3,
        title: "Flare Pocket System",
        type: "star_system",
        position: { x: 5, y: 19 },
        content: `
⦿ Star System: Flare Pocket

Star prone to sudden flares.
Used to test shielding and hull resilience.
        `
    },
    {
        id: "rust_field",
        sector: 3,
        title: "Rust Field System",
        type: "star_system",
        position: { x: 12, y: 24 },
        content: `
⦿ Star System: Rust Field

Debris‑heavy orbit with derelict ships.
Popular salvage zone for independent crews.
        `
    },

    // ===========================
    // Sector 4 — Astral Expanse
    // ===========================
    {
        id: "astral_hub",
        sector: 4,
        title: "Astral Hub System",
        type: "star_system",
        position: { x: 25, y: 5 },
        content: `
⦿ Star System: Astral Hub

White dwarf with Astral Prime station.
Central logistics node for Astral Supply Co.
        `
    },
    {
        id: "broken_ring",
        sector: 4,
        title: "Broken Ring System",
        type: "megastructure_system",
        position: { x: 30, y: 2 },
        content: `
⦿ Star System: Broken Ring

Collapsed ringworld segment orbiting a yellow dwarf.
Origin unknown; fragments still habitable.
        `
    },
    {
        id: "relay_spine",
        sector: 4,
        title: "Relay Spine System",
        type: "star_system",
        position: { x: 22, y: 9 },
        content: `
⦿ Star System: Relay Spine

Chain of comm satellites and relay nodes.
Backbone for long‑range sector communications.
        `
    },
    {
        id: "freight_spine",
        sector: 4,
        title: "Freight Spine System",
        type: "star_system",
        position: { x: 27, y: 8 },
        content: `
⦿ Star System: Freight Spine

Cargo transfer platforms in high orbit.
Heavy freighter traffic and docking rings.
        `
    },
    {
        id: "depot_sigma",
        sector: 4,
        title: "Depot Sigma System",
        type: "star_system",
        position: { x: 24, y: 2 },
        content: `
⦿ Star System: Depot Sigma

Barren world converted into storage depots.
Fuel, ore, and spare hull sections stockpiled.
        `
    },
    {
        id: "customs_barrier",
        sector: 4,
        title: "Customs Barrier System",
        type: "star_system",
        position: { x: 29, y: 6 },
        content: `
⦿ Star System: Customs Barrier

Checkpoint stations and inspection arrays.
Monitors traffic between inner and outer sectors.
        `
    },
    {
        id: "salvage_yard",
        sector: 4,
        title: "Salvage Yard System",
        type: "star_system",
        position: { x: 26, y: 11 },
        content: `
⦿ Star System: Salvage Yard

Dense debris orbit with organized salvage operations.
Astral‑licensed crews dismantle derelicts.
        `
    },
    {
        id: "trade_conflux",
        sector: 4,
        title: "Trade Conflux System",
        type: "star_system",
        position: { x: 32, y: 9 },
        content: `
⦿ Star System: Trade Conflux

Multiple minor stations linked by shuttle lanes.
Neutral ground for cross‑faction trade.
        `
    },

    // ===========================
    // Sector 5 — Rift Sector
    // ===========================
    {
        id: "echo_rift",
        sector: 5,
        title: "Echo Rift",
        type: "rift_anomaly",
        position: { x: 5, y: -15 },
        content: `
⦿ Object: Echo Rift

Spatial/temporal fracture causing signal echoes and ghost images.
Linked to Universal Drive side effects.
        `
    },
    {
        id: "mirror_system",
        sector: 5,
        title: "Mirror System",
        type: "star_system",
        position: { x: 9, y: -20 },
        content: `
⦿ Star System: Mirror

Reflective crystalline world, dark absorber world, prismatic ringed gas giant.
Used for optical and stealth research.
        `
    },
    {
        id: "fracture_node",
        sector: 5,
        title: "Fracture Node",
        type: "anomaly_system",
        position: { x: 2, y: -10 },
        content: `
⦿ Star System: Fracture Node

Unstable variable star with broken orbital paths.
Autopilot fails; manual navigation required.
        `
    },
    {
        id: "time_pocket",
        sector: 5,
        title: "Time Pocket System",
        type: "star_system",
        position: { x: 7, y: -12 },
        content: `
⦿ Star System: Time Pocket

Localized time dilation around main planet.
Experiments halted after temporal drift incidents.
        `
    },
    {
        id: "ghost_lane",
        sector: 5,
        title: "Ghost Lane System",
        type: "star_system",
        position: { x: 11, y: -17 },
        content: `
⦿ Star System: Ghost Lane

Ships report phantom contacts and false radar echoes.
No confirmed physical anomalies.
        `
    },
    {
        id: "phase_harbor",
        sector: 5,
        title: "Phase Harbor System",
        type: "star_system",
        position: { x: 4, y: -18 },
        content: `
⦿ Star System: Phase Harbor

Station partially phased out of normal space.
Docking requires specialized alignment protocols.
        `
    },
    {
        id: "split_orbit",
        sector: 5,
        title: "Split Orbit System",
        type: "star_system",
        position: { x: 1, y: -14 },
        content: `
⦿ Star System: Split Orbit

Planet with dual orbital tracks due to gravitational anomalies.
Rare and heavily studied.
        `
    },
    {
        id: "delay_point",
        sector: 5,
        title: "Delay Point System",
        type: "star_system",
        position: { x: 8, y: -22 },
        content: `
⦿ Star System: Delay Point

Communications routed through here experience consistent lag.
Used to test time‑buffered transmissions.
        `
    },

    // ===========================
    // Sector 6 — Magecraft Belt
    // ===========================
    {
        id: "mana_storms",
        sector: 6,
        title: "Mana Storms System",
        type: "star_system",
        position: { x: -5, y: -22 },
        content: `
⦿ Star System: Mana Storms

Mana‑charged nebula and energy arcs between planets.
Thynoimal Magecraft experiments conducted here.
        `
    },
    {
        id: "living_world",
        sector: 6,
        title: "Living World System",
        type: "star_system",
        position: { x: -10, y: -18 },
        content: `
⦿ Star System: Living World

Gaia‑I: sentient planet responding via environmental changes.
Ongoing contact attempts.
        `
    },
    {
        id: "white_fountain",
        sector: 6,
        title: "White Fountain",
        type: "white_hole",
        position: { x: -3, y: -25 },
        content: `
⦿ Object: White Fountain

Stable white hole emitting low‑intensity energy streams.
Calibration point for energy‑wave sensors.
        `
    },
    {
        id: "spell_forge",
        sector: 6,
        title: "Spell Forge System",
        type: "star_system",
        position: { x: -7, y: -20 },
        content: `
⦿ Star System: Spell Forge

Mana‑rich world with ritual circles and old Magecraft labs.
Abandoned but still active energetically.
        `
    },
    {
        id: "aurora_chain",
        sector: 6,
        title: "Aurora Chain System",
        type: "star_system",
        position: { x: -12, y: -23 },
        content: `
⦿ Star System: Aurora Chain

Series of worlds with constant auroras.
Used for atmospheric magic studies.
        `
    },
    {
        id: "shrine_system",
        sector: 6,
        title: "Shrine System",
        type: "star_system",
        position: { x: -6, y: -16 },
        content: `
⦿ Star System: Shrine

Small moon with ancient Magecraft shrine.
Pilgrimage site for certain Thynoimal lineages.
        `
    },
    {
        id: "mist_orbit",
        sector: 6,
        title: "Mist Orbit System",
        type: "star_system",
        position: { x: -2, y: -19 },
        content: `
⦿ Star System: Mist Orbit

Thin mana mist in orbital paths.
Subtle interference with sensors and spells.
        `
    },
    {
        id: "chant_node",
        sector: 6,
        title: "Chant Node System",
        type: "star_system",
        position: { x: -9, y: -26 },
        content: `
⦿ Star System: Chant Node

Planetary sound‑resonant caverns.
Used to amplify ritual chants and energy waves.
        `
    },

    // ===========================
    // Sector 7 — Nano Frontier
    // ===========================
    {
        id: "nano_fog_system",
        sector: 7,
        title: "Nano Fog System",
        type: "star_system",
        position: { x: 18, y: -8 },
        content: `
⦿ Star System: Nano Fog

Free‑floating nano clouds from old Thynoimal tests.
Unshielded ships risk partial disassembly.
        `
    },
    {
        id: "artificial_sun",
        sector: 7,
        title: "Artificial Sun System",
        type: "megastructure_system",
        position: { x: 22, y: -12 },
        content: `
⦿ Star System: Artificial Sun

Synthetic star built around mana reactor.
Now unstable; surrounding worlds scorched.
        `
    },
    {
        id: "dyson_grave",
        sector: 7,
        title: "Dyson Grave System",
        type: "megastructure_system",
        position: { x: 15, y: -15 },
        content: `
⦿ Star System: Dyson Grave

Collapsed Dyson shell fragments around red giant.
Occasional weak power surges from remnants.
        `
    },
    {
        id: "test_array",
        sector: 7,
        title: "Test Array System",
        type: "star_system",
        position: { x: 20, y: -6 },
        content: `
⦿ Star System: Test Array

Orbital platforms for nano‑weapon trials.
Most arrays now dormant but intact.
        `
    },
    {
        id: "scrap_cloud",
        sector: 7,
        title: "Scrap Cloud System",
        type: "star_system",
        position: { x: 17, y: -11 },
        content: `
⦿ Star System: Scrap Cloud

Metal‑rich debris cloud.
Nanos occasionally reassemble fragments into random shapes.
        `
    },
    {
        id: "core_lab",
        sector: 7,
        title: "Core Lab System",
        type: "star_system",
        position: { x: 23, y: -9 },
        content: `
⦿ Star System: Core Lab

Deep‑core research station inside a hollowed planet.
Focus on nano‑reactor stability.
        `
    },
    {
        id: "lattice_field",
        sector: 7,
        title: "Lattice Field System",
        type: "star_system",
        position: { x: 19, y: -4 },
        content: `
⦿ Star System: Lattice Field

Orbital nano‑lattice structures forming geometric patterns.
Used for structural resonance experiments.
        `
    },
    {
        id: "shard_basin",
        sector: 7,
        title: "Shard Basin System",
        type: "star_system",
        position: { x: 14, y: -10 },
        content: `
⦿ Star System: Shard Basin

Planetary basin filled with nano‑glass shards.
Hazardous but visually striking.
        `
    },

    // ===========================
    // Sector 8 — Outer Dark
    // ===========================
    {
        id: "void_nest",
        sector: 8,
        title: "Void Nest Cluster",
        type: "black_hole_cluster",
        position: { x: -18, y: -5 },
        content: `
⦿ Region: Void Nest

Multiple black holes orbiting shared center.
Suspected breeding ground for high‑level Void entities.
        `
    },
    {
        id: "crystal_echo",
        sector: 8,
        title: "Crystal Echo System",
        type: "star_system",
        position: { x: -22, y: -9 },
        content: `
⦿ Star System: Crystal Echo

Crystalline worlds responding to energy‑wave pulses.
Emit harmonic feedback signals.
        `
    },
    {
        id: "silent_horizon",
        sector: 8,
        title: "Silent Horizon System",
        type: "dead_system",
        position: { x: -25, y: -2 },
        content: `
⦿ Star System: Silent Horizon

Black dwarf star, minimal light, no active biospheres.
Occasional faint unexplained signals.
        `
    },
    {
        id: "dark_spine",
        sector: 8,
        title: "Dark Spine System",
        type: "star_system",
        position: { x: -20, y: -12 },
        content: `
⦿ Star System: Dark Spine

Elongated asteroid chain casting deep shadows.
Used as covert navigation route.
        `
    },
    {
        id: "hollow_eye",
        sector: 8,
        title: "Hollow Eye System",
        type: "star_system",
        position: { x: -16, y: -8 },
        content: `
⦿ Star System: Hollow Eye

Planet with hollow core and weak gravity.
Interior caverns host unknown relics.
        `
    },
    {
        id: "grave_current",
        sector: 8,
        title: "Grave Current System",
        type: "star_system",
        position: { x: -23, y: -14 },
        content: `
⦿ Star System: Grave Current

Slow‑moving dark matter stream through system.
Ships experience drag‑like effects.
        `
    },
    {
        id: "abyss_gate",
        sector: 8,
        title: "Abyss Gate System",
        type: "star_system",
        position: { x: -19, y: -3 },
        content: `
⦿ Star System: Abyss Gate

Ancient gate frame orbiting a dim star.
Destination unknown; inactive for millennia.
        `
    },
    {
        id: "last_beacon",
        sector: 8,
        title: "Last Beacon System",
        type: "star_system",
        position: { x: -27, y: -7 },
        content: `
⦿ Star System: Last Beacon

Lonely station broadcasting a repeating distress signal.
No origin data; signal predates current records.
        `
    }

];
