// ============================================================================
// XSV STARDUST - MASTER ASTROMETRICS DATABASE
// Contains all Star Systems, Planets, Stations, Lore, and Resources.
// ============================================================================

const systemsDB = [

    // ==========================================
    // 1. ZAVARES SECTOR (Custom Lore)
    // ==========================================
    { 
        id: 'brunhilde', name: 'Brunhilde', x: 4500, y: 3500, color: '#ffff99', size: 80, 
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
        id: 'varlupra', name: 'Var Lupra', x: 5500, y: 3800, color: '#99ccff', size: 90, 
        desc: 'Uncharted B5-Class Star System. Hostile and humid. Source of the ancient "Abruix" ghost signal.', resources: 'Unknown Anomalies',
        planets: [
            { id: 'naokin', name: 'Naokin', dist: 180, angle: 180, size: 20, color: '#ff3300', desc: 'Volcanic, geologically unstable world with a toxic sulfuric acid atmosphere.', resources: 'Magma, Sulfur Dioxide' },
            { id: 'pareah', name: 'Pareah', dist: 300, angle: 45, size: 30, color: '#009933', desc: 'Jungle world teeming with hostile flora and nocturnal Gy\'zoma beasts. The Abruix signal originates here.', resources: 'Exotic Spores, Ancient Tech' },
            { id: 'trigen', name: 'Trigen', dist: 450, angle: 270, size: 50, color: '#660066', desc: 'Massive gas giant with planetary-wide storms. Has a rocky ring.', resources: 'Iridium, Hydrogen' }
        ]
    },
    { 
        id: 'terminus', name: 'Terminus Outpost', x: 4800, y: 2800, color: '#ff0000', size: 30, type: 'station', 
        desc: 'A small, independent Forward Operating Base and free-port. A discreet layover for mercenary crews.', resources: 'Black Market Goods, Repairs', planets: [] 
    },
    { 
        id: 'nightstar', name: 'Night Star Station', x: 5000, y: 3600, color: '#cc66ff', size: 25, type: 'station', 
        desc: 'A refurbished station in the Varix corridor. Features the Twilight Bar, famous for glowing Lumix Noodles.', resources: 'Varix Spice, Fuel', planets: [] 
    },

    // ==========================================
    // 2. THE WARREN THRESHOLD
    // ==========================================
    { 
        id: 'outpost79', name: 'Warren Gateway (Outpost 79)', x: 4000, y: 4000, color: '#cc66ff', size: 60, type: 'wormhole', 
        desc: 'Starfleet border station guarding the stable inter-dimensional wormhole connecting the Alpha Quadrant to the Crux Constellation.', resources: 'Federation Tech, Replicator Rations', planets: [] 
    },

    // ==========================================
    // 3. TERRAN FEDERATION (GOF2)
    // ==========================================
    { 
        id: 'alioth', name: 'Alioth', x: 2500, y: 3000, color: '#ffffcc', size: 70, 
        desc: 'The capital system of the Terran Federation. Heavily defended and highly prosperous.', resources: 'Luxury Goods, High-Tech Electronics',
        planets: [
            { id: 'earth', name: 'Earth', dist: 200, angle: 90, size: 25, color: '#3366ff', desc: 'The birthplace of humanity. A bustling ecumenopolis.', resources: 'Water, VIPs' },
            { id: 'alioth_stat', name: 'Alioth Orbital', dist: 250, angle: 180, size: 15, color: '#fff', type: 'station', desc: 'Massive Terran trade hub.', resources: 'Credits, Ships' }
        ]
    },
    { 
        id: 'wolfreiser', name: 'Wolf-Reiser', x: 2800, y: 2200, color: '#ff6600', size: 65, 
        desc: 'A bustling system known for heavy industrial mining and corporate espionage.', resources: 'Heavy Metals, Ore',
        planets: [
            { id: 'wr_prime', name: 'Reiser Prime', dist: 180, angle: 0, size: 22, color: '#888', desc: 'Industrial smog covers this mining world.', resources: 'Iron, Gold, Platinum' }
        ]
    },
    { 
        id: 'thynome', name: 'Thynome', x: 3200, y: 4800, color: '#ffffff', size: 80, 
        desc: 'Home to Thynome Station and the Thynome Vector Foundation. Known for advanced ship manufacturing.', resources: 'Ship Armor, Weapons',
        planets: [
            { id: 'thynome_stat', name: 'Thynome Station', dist: 150, angle: 180, size: 15, color: '#44aaff', type: 'station', desc: 'Massive orbital shipyard.', resources: 'Ship Upgrades' }
        ]
    },
    { id: 'magnetar', name: 'Magnetar', x: 2000, y: 2500, color: '#ff3333', size: 50, desc: 'A dangerous system dominated by a highly magnetic star.', resources: 'Energy Cells', planets: [] },
    { id: 'pan', name: 'Pan', x: 2200, y: 3500, color: '#ffcc66', size: 60, desc: 'A wealthy Terran trade hub.', resources: 'Food, Medical Supplies', planets: [] },
    { id: 'aquila', name: 'Aquila', x: 2600, y: 4000, color: '#ffff99', size: 55, desc: 'Terran border system. Frequent skirmishes with Vossk patrols.', resources: 'Scrap Metal', planets: [] },
    { id: 'augmenta', name: 'Augmenta', x: 3000, y: 2800, color: '#ffcc99', size: 50, desc: 'Terran cybernetics and research hub.', resources: 'Implants, Microchips', planets: [] },

    // ==========================================
    // 4. VOSSK EMPIRE (GOF2)
    // ==========================================
    { 
        id: 'vikka', name: 'V\'ikka', x: 1500, y: 6000, color: '#33cc33', size: 85, 
        desc: 'The heavily fortified capital system of the Vossk Empire.', resources: 'Vossk Organs, Dark Matter',
        planets: [
            { id: 'vikka_prime', name: 'Vossk Prime', dist: 250, angle: 45, size: 30, color: '#115511', desc: 'The Vossk homeworld. Highly militarized.', resources: 'Vossk Tech' }
        ]
    },
    { id: 'suteo', name: 'Suteo', x: 1200, y: 5500, color: '#66ff66', size: 70, desc: 'A major Vossk military staging ground.', resources: 'Weapons, Ammo', planets: [] },
    { id: 'ymirr', name: 'Y\'mirr', x: 1800, y: 6500, color: '#009900', size: 65, desc: 'A Vossk mining system rich in rare isotopes.', resources: 'Isotopes, Crystals', planets: [] },
    { id: 'kane', name: 'K\'ane', x: 1000, y: 6800, color: '#22aa22', size: 55, desc: 'Vossk border patrol sector.', resources: 'Scrap', planets: [] },
    { id: 'nimrr', name: 'Ni\'mrr', x: 2200, y: 5800, color: '#55cc55', size: 60, desc: 'Vossk agricultural system.', resources: 'Space Plants, Food', planets: [] },

    // ==========================================
    // 5. NIVELIAN REPUBLIC (GOF2)
    // ==========================================
    { 
        id: 'weymire', name: 'Weymire', x: 6000, y: 2000, color: '#ccccff', size: 75, 
        desc: 'Capital of the Nivelian Republic. Known for its icy planets and advanced technology.', resources: 'Coolant, Nivelian Tech',
        planets: [
            { id: 'weymire_ice', name: 'Weymire Prime', dist: 200, angle: 270, size: 25, color: '#e6e6ff', desc: 'A frozen, elegant world.', resources: 'Water, Art' }
        ]
    },
    { id: 'nesla', name: 'Nesla', x: 6500, y: 2500, color: '#9999ff', size: 60, desc: 'A Nivelian research hub.', resources: 'Blueprints, Data', planets: [] },
    { id: 'eanya', name: 'Eanya', x: 5500, y: 1500, color: '#aaaaff', size: 55, desc: 'Nivelian trade sector.', resources: 'Luxury Goods', planets: [] },
    { id: 'sao', name: 'Sao', x: 6800, y: 1800, color: '#8888ff', size: 50, desc: 'Nivelian deep-space observatory.', resources: 'Sensor Tech', planets: [] },

    // ==========================================
    // 6. MIDORIAN SECTOR (GOF2)
    // ==========================================
    { 
        id: 'mido', name: 'Mido', x: 6500, y: 4000, color: '#cc9966', size: 65, 
        desc: 'The heart of the Midorian rebellion. A rugged system filled with asteroid miners.', resources: 'Ore, Explosives',
        planets: [
            { id: 'mido_station', name: 'Midorian Base', dist: 150, angle: 90, size: 15, color: '#885522', type: 'station', desc: 'A hollowed-out asteroid serving as a rebel base.', resources: 'Contraband' }
        ]
    },
    { id: 'ginova', name: 'Ginova', x: 7000, y: 3500, color: '#aa7744', size: 55, desc: 'Midorian mining colony.', resources: 'Titanium', planets: [] },
    { id: 'malo', name: 'Malo', x: 7500, y: 4500, color: '#bb8855', size: 50, desc: 'A lawless Midorian frontier system.', resources: 'Scrap, Weapons', planets: [] },

    // ==========================================
    // 7. PIRATE & NEUTRAL SPACE (GOF2)
    // ==========================================
    { 
        id: 'loma', name: 'Loma', x: 3500, y: 1500, color: '#cc0000', size: 55, 
        desc: 'A dangerous system heavily populated by pirates and black-market traders. Proceed with caution.', resources: 'Stolen Goods, Slaves',
        planets: [
            { id: 'loma_hideout', name: 'Pirate Haven', dist: 120, angle: 220, size: 18, color: '#555', type: 'station', desc: 'A wretched hive of scum and villainy.', resources: 'Black Market Weapons' }
        ]
    },
    { id: 'pescal', name: 'Pescal Inartu', x: 3000, y: 6000, color: '#00ffcc', size: 60, desc: 'A remote neutral system known for its strange anomalies and hidden jump gates.', resources: 'Artifacts', planets: [] },
    { id: 'skavac', name: 'Skavac', x: 4500, y: 1000, color: '#ff3366', size: 50, desc: 'A neutral smuggler\'s run.', resources: 'Narcotics', planets: [] },

    // ==========================================
    // 8. THE VOID & ANOMALIES
    // ==========================================
    { 
        id: 'void', name: 'The Void', x: 1000, y: 4000, color: '#6600cc', size: 100, type: 'wormhole', 
        desc: 'An anomalous region of space inhabited by the mysterious Void aliens. Extreme danger.', resources: 'Void Crystals', planets: [] 
    },
    { 
        id: 'gargantua', name: 'The Abyssal Reach', x: 7000, y: 7000, color: '#000000', size: 120, type: 'blackhole', 
        desc: 'A supermassive black hole. Navigation is extremely hazardous due to intense gravity wells.', resources: 'Dark Matter', planets: [] 
    },
    { 
        id: 'radiant', name: 'Radiant Core', x: 1500, y: 1500, color: '#ffffff', size: 90, type: 'whitehole', 
        desc: 'A blindingly bright white hole emitting massive amounts of exotic radiation.', resources: 'Exotic Energy', planets: [] 
    },
    { 
        id: 'obsidian', name: 'Obsidian Marches', x: 6500, y: 6000, color: '#444444', size: 50, 
        desc: 'A dead system filled with the husks of ancient, shattered planets.', resources: 'Ancient Scrap', planets: [] 
    },
    { 
        id: 'valkyrie', name: 'Valkyrie', x: 4000, y: 7000, color: '#ff00ff', size: 80, 
        desc: 'A massive supernova remnant. Highly radioactive but rich in rare materials.', resources: 'Supernova Dust', planets: [] 
    }
];
