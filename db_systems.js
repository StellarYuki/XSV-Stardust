// ============================================================================
// XSV STARDUST - MASTER ASTROMETRICS DATABASE (CUSTOM LORE)
// ============================================================================

const systemsDB = [

    // ==========================================
    // 1. ZAVARES SECTOR (Setrean Space)
    // ==========================================
    { 
        id: 'brunhilde', name: 'Brunhilde', x: 5500, y: 3500, color: '#ffff99', size: 80, 
        desc: 'Main Sequence F-Class Star. The core of Setrean space. A war-torn system recovering from the Leiverta Monarchy collapse.', resources: 'Solar Energy, Scrap Metal',
        planets: [
            { id: 'militia', name: 'Militia', dist: 150, angle: 0, size: 15, color: '#aa5500', desc: 'Toxic, barren rock bombarded by solar winds. Contains hidden military bases.', resources: 'Sulfur, Iron' },
            { id: 'gastron', name: 'Gastron', dist: 250, angle: 45, size: 25, color: '#00aa00', desc: 'Lush homeworld of the Setrean people. 80% covered in lakes and forests.', resources: 'Water, Organics, Titanium' },
            { id: 'daystar', name: 'Day Star Station', dist: 280, angle: 50, size: 12, color: '#ffffff', type: 'station', desc: 'HQ of Astral Supply Co. A massive port for cargo containers and fleet maintenance.', resources: 'Ship Parts, Fuel, Contracts' },
            { id: 'necron', name: 'Necron', dist: 380, angle: 120, size: 35, color: '#0055ff', desc: 'Blue gas giant surrounded by an asteroid belt. Hidden mining stations.', resources: 'Helium-3, Iridium, Copper' },
            { id: 'covault', name: 'Covault', dist: 500, angle: 200, size: 40, color: '#cc9900', desc: 'Brownish-yellow gas giant with a shattered rock ring.', resources: 'Ammonia, Rock Dust' },
            { id: 'verio', name: 'Verio', dist: 650, angle: 300, size: 35, color: '#33ccff', desc: 'Blue gas giant with a rock and ice belt. Houses a deep space relay station.', resources: 'Ice, Nitrogen' }
        ]
    },
    { 
        id: 'varlupra', name: 'Var Lupra', x: 6500, y: 3800, color: '#99ccff', size: 90, 
        desc: 'Uncharted B5-Class Star System. Hostile and humid. Source of the ancient "Abruix" ghost signal.', resources: 'Unknown Anomalies',
        planets: [
            { id: 'naokin', name: 'Naokin', dist: 180, angle: 180, size: 20, color: '#ff3300', desc: 'Volcanic, geologically unstable world with a toxic sulfuric acid atmosphere.', resources: 'Magma, Sulfur Dioxide' },
            { id: 'pareah', name: 'Pareah', dist: 300, angle: 45, size: 30, color: '#009933', desc: 'Jungle world teeming with hostile flora and nocturnal Gy\'zoma beasts. The Abruix signal originates here.', resources: 'Exotic Spores, Ancient Tech' },
            { id: 'trigen', name: 'Trigen', dist: 450, angle: 270, size: 50, color: '#660066', desc: 'Massive gas giant with planetary-wide storms. Has a rocky ring.', resources: 'Iridium, Hydrogen' }
        ]
    },
    { id: 'terminus', name: 'Terminus Outpost', x: 5800, y: 2800, color: '#ff0000', size: 30, type: 'station', desc: 'A small, independent Forward Operating Base and free-port. A discreet layover for mercenary crews.', resources: 'Black Market Goods, Repairs', planets: [] },
    { id: 'nightstar', name: 'Night Star Station', x: 6000, y: 3600, color: '#cc66ff', size: 25, type: 'station', desc: 'A refurbished station in the Varix corridor. Features the Twilight Bar, famous for glowing Lumix Noodles.', resources: 'Varix Spice, Fuel', planets: [] },
    { id: 'outpost79', name: 'Warren Gateway (Outpost 79)', x: 4000, y: 4000, color: '#cc66ff', size: 60, type: 'wormhole', desc: 'Starfleet border station guarding the stable inter-dimensional wormhole connecting the Alpha Quadrant to the Crux Constellation.', resources: 'Federation Tech, Replicator Rations', planets: [] },

    // ==========================================
    // 2. SOLARIAN CONCORDAT (Human Coalition)
    // ==========================================
    { 
        id: 'aethelgard', name: 'Aethelgard', x: 2500, y: 3000, color: '#ffffcc', size: 70, 
        desc: 'The wealthy, bureaucratic capital system of the Solarian Concordat.', resources: 'Luxury Goods, High-Tech Electronics', 
        planets: [
            { id: 'aethel_prime', name: 'Aethelgard Prime', dist: 200, angle: 90, size: 25, color: '#3366ff', desc: 'A sprawling ecumenopolis and seat of the Concordat Senate.', resources: 'Water, VIPs' }, 
            { id: 'aethel_stat', name: 'Concordat Hub', dist: 250, angle: 180, size: 15, color: '#fff', type: 'station', desc: 'Massive Solarian trade hub.', resources: 'Credits, Ships' }
        ] 
    },
    { 
        id: 'hephaestus', name: 'Hephaestus', x: 2800, y: 2200, color: '#ff6600', size: 65, 
        desc: 'A bustling system known for heavy industrial mining and corporate espionage.', resources: 'Heavy Metals, Ore', 
        planets: [
            { id: 'heph_forge', name: 'The Anvil', dist: 180, angle: 0, size: 22, color: '#888', desc: 'Industrial smog covers this mining world.', resources: 'Iron, Gold, Platinum' }
        ] 
    },
    { 
        id: 'vector', name: 'Vector Alpha', x: 3200, y: 2800, color: '#ffffff', size: 80, 
        desc: 'Home to the Vector Foundation. Known for advanced ship manufacturing.', resources: 'Ship Armor, Weapons', 
        planets: [
            { id: 'vector_stat', name: 'Vector Shipyards', dist: 150, angle: 180, size: 15, color: '#44aaff', type: 'station', desc: 'Massive orbital shipyard.', resources: 'Ship Upgrades' }
        ] 
    },
    { id: 'pulsar', name: 'Pulsar-9', x: 2000, y: 2500, color: '#ff3333', size: 50, desc: 'A dangerous system dominated by a highly magnetic star.', resources: 'Energy Cells', planets: [] },
    { id: 'elysium', name: 'Elysium', x: 2200, y: 3500, color: '#ffcc66', size: 60, desc: 'A wealthy Solarian agricultural hub.', resources: 'Food, Medical Supplies', planets: [] },

    // ==========================================
    // 3. KAELEN ASCENDANCY (Militaristic Reptilians)
    // ==========================================
    { 
        id: 'kael', name: 'Kael\'Drak', x: 1500, y: 6000, color: '#33cc33', size: 85, 
        desc: 'The heavily fortified capital system of the Kaelen Ascendancy.', resources: 'Kaelen Armor, Dark Matter', 
        planets: [
            { id: 'kael_prime', name: 'Drakar Prime', dist: 250, angle: 45, size: 30, color: '#115511', desc: 'The Kaelen homeworld. Highly militarized.', resources: 'Kaelen Tech' },
            { id: 'kael_stat', name: 'Ascendancy Command', dist: 300, angle: 50, size: 15, color: '#00ff00', type: 'station', desc: 'Kaelen High Command orbital.', resources: 'Classified Data' }
        ] 
    },
    { 
        id: 'vanguard', name: 'Vanguard', x: 1200, y: 5500, color: '#66ff66', size: 70, 
        desc: 'A major Kaelen military staging ground.', resources: 'Weapons, Ammo', 
        planets: [
            { id: 'vanguard_forge', name: 'The Crucible', dist: 200, angle: 180, size: 25, color: '#444', desc: 'Massive Kaelen weapons manufacturing world.', resources: 'Armor, Weapons' }
        ] 
    },
    { id: 'trench', name: 'The Trench', x: 1800, y: 6500, color: '#009900', size: 65, desc: 'A Kaelen mining system rich in rare isotopes.', resources: 'Isotopes, Crystals', planets: [] },

    // ==========================================
    // 4. VESPERIAN SYNDICATE (Cybernetic Researchers)
    // ==========================================
    { 
        id: 'vesper', name: 'Vesperia', x: 6000, y: 5000, color: '#ccccff', size: 75, 
        desc: 'Capital of the Vesperian Syndicate. Known for its icy planets and advanced cybernetics.', resources: 'Coolant, Cybernetics', 
        planets: [
            { id: 'vesper_ice', name: 'Vesperia Prime', dist: 200, angle: 270, size: 25, color: '#e6e6ff', desc: 'A frozen, elegant world.', resources: 'Water, Data Cores' },
            { id: 'vesper_stat', name: 'The Archive', dist: 250, angle: 280, size: 15, color: '#fff', type: 'station', desc: 'Vesperian central data orbital.', resources: 'Blueprints' }
        ] 
    },
    { 
        id: 'oracle', name: 'The Oracle', x: 6500, y: 5500, color: '#9999ff', size: 60, 
        desc: 'A Vesperian deep-space research hub.', resources: 'Blueprints, Data', 
        planets: [
            { id: 'oracle_lab', name: 'Oracle Labs', dist: 180, angle: 45, size: 12, color: '#fff', type: 'station', desc: 'Advanced R&D facility.', resources: 'Tech Blueprints' }
        ] 
    },

    // ==========================================
    // 5. THE RUST BELT (Independent Miners & Rebels)
    // ==========================================
    { 
        id: 'rust', name: 'Rust', x: 4500, y: 1500, color: '#cc9966', size: 65, 
        desc: 'The heart of the independent miner rebellion. A rugged system filled with asteroid scavengers.', resources: 'Ore, Explosives', 
        planets: [
            { id: 'rust_station', name: 'Free-Port Alpha', dist: 150, angle: 90, size: 15, color: '#885522', type: 'station', desc: 'A hollowed-out asteroid serving as a rebel base.', resources: 'Contraband' },
            { id: 'rust_rock', name: 'Scrap-Heap', dist: 250, angle: 180, size: 20, color: '#664422', desc: 'A heavily strip-mined planet.', resources: 'Scrap' }
        ] 
    },
    { id: 'slag', name: 'Slag', x: 5000, y: 1000, color: '#aa7744', size: 55, desc: 'Independent mining colony.', resources: 'Titanium', planets: [] },

    // ==========================================
    // 6. CRIMSON CORSAIRS & NEUTRAL SPACE
    // ==========================================
    { 
        id: 'crimson', name: 'Crimson', x: 3500, y: 7000, color: '#cc0000', size: 55, 
        desc: 'A dangerous system heavily populated by the Crimson Corsairs pirate fleet. Proceed with caution.', resources: 'Stolen Goods, Slaves', 
        planets: [
            { id: 'crimson_hideout', name: 'Corsair Haven', dist: 120, angle: 220, size: 18, color: '#555', type: 'station', desc: 'A wretched hive of scum and villainy.', resources: 'Black Market Weapons' }
        ] 
    },
    { id: 'drifter', name: 'Drifter\'s Run', x: 3000, y: 6000, color: '#00ffcc', size: 60, desc: 'A remote neutral system known for its strange anomalies and hidden jump gates.', resources: 'Artifacts', planets: [] },

    // ==========================================
    // 7. THE SHROUD (Alien Anomaly)
    // ==========================================
    { 
        id: 'shroud', name: 'The Shroud', x: 1000, y: 4000, color: '#6600cc', size: 100, type: 'wormhole', 
        desc: 'An anomalous region of space inhabited by mysterious, non-corporeal entities. Extreme danger.', resources: 'Exotic Crystals', 
        planets: [
            { id: 'shroud_hive', name: 'The Monolith', dist: 250, angle: 180, size: 30, color: '#330066', desc: 'A massive, organic alien structure.', resources: 'Dark Matter' }
        ] 
    },

    // ==========================================
    // 8. ABYSSAL REACH & ANOMALIES
    // ==========================================
    { id: 'gargantua', name: 'The Abyssal Reach', x: 7000, y: 7000, color: '#000000', size: 120, type: 'blackhole', desc: 'A supermassive black hole. Navigation is extremely hazardous due to intense gravity wells.', resources: 'Dark Matter', planets: [] },
    { id: 'radiant', name: 'Radiant Core', x: 1500, y: 1500, color: '#ffffff', size: 90, type: 'whitehole', desc: 'A blindingly bright white hole emitting massive amounts of exotic radiation.', resources: 'Exotic Energy', planets: [] },
    { id: 'obsidian', name: 'Obsidian Marches', x: 6500, y: 6000, color: '#444444', size: 50, desc: 'A dead system filled with the husks of ancient, shattered planets.', resources: 'Ancient Scrap', planets: [] },
    { id: 'valkyrie', name: 'Valkyrie', x: 4000, y: 7000, color: '#ff00ff', size: 80, desc: 'A massive supernova remnant. Highly radioactive but rich in rare materials.', resources: 'Supernova Dust', planets: [] }
];
