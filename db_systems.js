// ============================================================================
// XSV STARDUST - MASTER ASTROMETRICS DATABASE (64 SYSTEMS)
// ============================================================================

const systemsDB = [
    // --- ZAVARES SECTOR (Core) ---
    { id: 'brunhilde', name: 'Brunhilde', x: 4500, y: 3500, color: '#ffff99', size: 80, desc: 'Main Sequence F-Class Star. The core of Setrean space.', resources: 'Solar Energy', planets: [
        { id: 'militia', name: 'Militia', dist: 150, angle: 0, size: 15, color: '#aa5500', desc: 'Toxic, barren rock.', resources: 'Sulfur' },
        { id: 'gastron', name: 'Gastron', dist: 250, angle: 45, size: 25, color: '#00aa00', desc: 'Lush homeworld of the Setrean people.', resources: 'Water, Titanium' },
        { id: 'daystar', name: 'Day Star Station', dist: 280, angle: 50, size: 12, color: '#ffffff', type: 'station', desc: 'HQ of Astral Supply Co.', resources: 'Fuel, Contracts' },
        { id: 'necron', name: 'Necron', dist: 380, angle: 120, size: 35, color: '#0055ff', desc: 'Blue gas giant.', resources: 'Helium-3' },
        { id: 'covault', name: 'Covault', dist: 500, angle: 200, size: 40, color: '#cc9900', desc: 'Brownish-yellow gas giant.', resources: 'Ammonia' },
        { id: 'verio', name: 'Verio', dist: 650, angle: 300, size: 35, color: '#33ccff', desc: 'Blue gas giant with an ice belt.', resources: 'Ice' }
    ]},
    { id: 'varlupra', name: 'Var Lupra', x: 5500, y: 3800, color: '#99ccff', size: 90, desc: 'Uncharted B5-Class Star System. Source of the Abruix signal.', resources: 'Unknown', planets: [
        { id: 'naokin', name: 'Naokin', dist: 180, angle: 180, size: 20, color: '#ff3300', desc: 'Volcanic world.', resources: 'Magma' },
        { id: 'pareah', name: 'Pareah', dist: 300, angle: 45, size: 30, color: '#009933', desc: 'Jungle world teeming with Gy\'zoma beasts.', resources: 'Exotic Spores' },
        { id: 'trigen', name: 'Trigen', dist: 450, angle: 270, size: 50, color: '#660066', desc: 'Massive gas giant.', resources: 'Iridium' }
    ]},
    { id: 'terminus', name: 'Terminus Outpost', x: 4800, y: 2800, color: '#ff0000', size: 30, type: 'station', desc: 'Independent free-port.', resources: 'Black Market Goods', planets: [] },
    { id: 'nightstar', name: 'Night Star Station', x: 5000, y: 3600, color: '#cc66ff', size: 25, type: 'station', desc: 'Refurbished station in the Varix corridor.', resources: 'Varix Spice', planets: [] },
    { id: 'outpost79', name: 'Warren Gateway', x: 4000, y: 4000, color: '#cc66ff', size: 60, type: 'wormhole', desc: 'Starfleet border station guarding the inter-dimensional wormhole.', resources: 'Federation Tech', planets: [] },

    // --- TERRAN CORE (GOF2) ---
    { id: 'alioth', name: 'Alioth', x: 2500, y: 3000, color: '#ffffcc', size: 70, desc: 'Capital of the Terran Federation.', resources: 'Luxury Goods', planets: [{ id: 'earth', name: 'Earth', dist: 200, angle: 90, size: 25, color: '#3366ff', desc: 'Birthplace of humanity.', resources: 'Water' }] },
    { id: 'wolfreiser', name: 'Wolf-Reiser', x: 2800, y: 2200, color: '#ff6600', size: 65, desc: 'Heavy industrial mining.', resources: 'Heavy Metals', planets: [{ id: 'wr_prime', name: 'Reiser Prime', dist: 180, angle: 0, size: 22, color: '#888', desc: 'Industrial smog world.', resources: 'Iron' }] },
    { id: 'thynome', name: 'Thynome', x: 3200, y: 4800, color: '#ffffff', size: 80, desc: 'Advanced ship manufacturing.', resources: 'Ship Armor', planets: [{ id: 'thynome_stat', name: 'Thynome Station', dist: 150, angle: 180, size: 15, color: '#44aaff', type: 'station', desc: 'Orbital shipyard.', resources: 'Upgrades' }] },
    { id: 'magnetar', name: 'Magnetar', x: 2000, y: 2500, color: '#ff3333', size: 50, desc: 'Highly magnetic star.', resources: 'Energy Cells', planets: [] },
    { id: 'pan', name: 'Pan', x: 2200, y: 3500, color: '#ffcc66', size: 60, desc: 'Wealthy Terran trade hub.', resources: 'Food', planets: [] },
    { id: 'aquila', name: 'Aquila', x: 2600, y: 4000, color: '#ffff99', size: 55, desc: 'Terran border system.', resources: 'Scrap Metal', planets: [] },
    { id: 'augmenta', name: 'Augmenta', x: 3000, y: 2800, color: '#ffcc99', size: 50, desc: 'Cybernetics hub.', resources: 'Implants', planets: [] },
    { id: 'union', name: 'Union', x: 2400, y: 2000, color: '#ffeeaa', size: 45, desc: 'Terran agricultural center.', resources: 'Biomass', planets: [] },
    { id: 'buntta', name: 'Buntta', x: 2100, y: 3800, color: '#ffdd88', size: 40, desc: 'Small Terran colony.', resources: 'Plastics', planets: [] },
    { id: 'beidan', name: 'Beidan', x: 2900, y: 3200, color: '#ffeecc', size: 55, desc: 'Terran military outpost.', resources: 'Weapons', planets: [] },

    // --- VOSSK EMPIRE (GOF2) ---
    { id: 'vikka', name: 'V\'ikka', x: 1500, y: 6000, color: '#33cc33', size: 85, desc: 'Capital of the Vossk Empire.', resources: 'Vossk Organs', planets: [{ id: 'vikka_prime', name: 'Vossk Prime', dist: 250, angle: 45, size: 30, color: '#115511', desc: 'Vossk homeworld.', resources: 'Vossk Tech' }] },
    { id: 'suteo', name: 'Suteo', x: 1200, y: 5500, color: '#66ff66', size: 70, desc: 'Vossk military staging ground.', resources: 'Ammo', planets: [] },
    { id: 'ymirr', name: 'Y\'mirr', x: 1800, y: 6500, color: '#009900', size: 65, desc: 'Vossk mining system.', resources: 'Isotopes', planets: [] },
    { id: 'kane', name: 'K\'ane', x: 1000, y: 6800, color: '#22aa22', size: 55, desc: 'Vossk border patrol.', resources: 'Scrap', planets: [] },
    { id: 'nimrr', name: 'Ni\'mrr', x: 2200, y: 5800, color: '#55cc55', size: 60, desc: 'Vossk agricultural system.', resources: 'Space Plants', planets: [] },
    { id: 'meen', name: 'Me\'en', x: 1400, y: 7000, color: '#44bb44', size: 50, desc: 'Vossk research facility.', resources: 'Data', planets: [] },
    { id: 'oerkt', name: 'O\'erkt', x: 1900, y: 5200, color: '#77ee77', size: 45, desc: 'Vossk prison colony.', resources: 'Slaves', planets: [] },

    // --- NIVELIAN REPUBLIC (GOF2) ---
    { id: 'weymire', name: 'Weymire', x: 6000, y: 2000, color: '#ccccff', size: 75, desc: 'Capital of the Nivelian Republic.', resources: 'Coolant', planets: [{ id: 'weymire_ice', name: 'Weymire Prime', dist: 200, angle: 270, size: 25, color: '#e6e6ff', desc: 'Frozen world.', resources: 'Water' }] },
    { id: 'nesla', name: 'Nesla', x: 6500, y: 2500, color: '#9999ff', size: 60, desc: 'Nivelian research hub.', resources: 'Blueprints', planets: [] },
    { id: 'eanya', name: 'Eanya', x: 5500, y: 1500, color: '#aaaaff', size: 55, desc: 'Nivelian trade sector.', resources: 'Luxury Goods', planets: [] },
    { id: 'sao', name: 'Sao', x: 6800, y: 1800, color: '#8888ff', size: 50, desc: 'Nivelian observatory.', resources: 'Sensor Tech', planets: [] },
    { id: 'behmain', name: 'Behmain', x: 6200, y: 1200, color: '#bbbbff', size: 45, desc: 'Nivelian resort system.', resources: 'Credits', planets: [] },
    { id: 'cuteb', name: 'Cuteb', x: 5800, y: 2800, color: '#ddddff', size: 40, desc: 'Nivelian border patrol.', resources: 'Shields', planets: [] },

    // --- MIDORIAN SECTOR (GOF2) ---
    { id: 'mido', name: 'Mido', x: 6500, y: 4000, color: '#cc9966', size: 65, desc: 'Heart of the Midorian rebellion.', resources: 'Ore', planets: [{ id: 'mido_station', name: 'Midorian Base', dist: 150, angle: 90, size: 15, color: '#885522', type: 'station', desc: 'Hollowed-out asteroid.', resources: 'Contraband' }] },
    { id: 'ginova', name: 'Ginova', x: 7000, y: 3500, color: '#aa7744', size: 55, desc: 'Midorian mining colony.', resources: 'Titanium', planets: [] },
    { id: 'malo', name: 'Malo', x: 7500, y: 4500, color: '#bb8855', size: 50, desc: 'Lawless Midorian frontier.', resources: 'Weapons', planets: [] },
    { id: 'neox', name: 'Neox', x: 6800, y: 4800, color: '#ddaa77', size: 45, desc: 'Midorian scrap yard.', resources: 'Scrap', planets: [] },

    // --- LOMA PIRATES & NEUTRAL (GOF2) ---
    { id: 'loma', name: 'Loma', x: 3500, y: 1500, color: '#cc0000', size: 55, desc: 'Dangerous pirate system.', resources: 'Stolen Goods', planets: [{ id: 'loma_hideout', name: 'Pirate Haven', dist: 120, angle: 220, size: 18, color: '#555', type: 'station', desc: 'Wretched hive of scum.', resources: 'Black Market Weapons' }] },
    { id: 'pescal', name: 'Pescal Inartu', x: 3000, y: 6000, color: '#00ffcc', size: 60, desc: 'Remote neutral system.', resources: 'Artifacts', planets: [] },
    { id: 'skavac', name: 'Skavac', x: 4500, y: 1000, color: '#ff3366', size: 50, desc: 'Neutral smuggler\'s run.', resources: 'Narcotics', planets: [] },
    { id: 'prospero', name: 'Prospero', x: 3800, y: 800, color: '#ff5555', size: 45, desc: 'Pirate staging ground.', resources: 'Ammo', planets: [] },

    // --- THE VOID (GOF2) ---
    { id: 'void', name: 'The Void', x: 1000, y: 4000, color: '#6600cc', size: 100, type: 'wormhole', desc: 'Anomalous region inhabited by Void aliens.', resources: 'Void Crystals', planets: [] },
    { id: 'void_alpha', name: 'Void Alpha', x: 800, y: 3500, color: '#440088', size: 40, desc: 'Void alien hive.', resources: 'Dark Matter', planets: [] },
    { id: 'void_beta', name: 'Void Beta', x: 1200, y: 4500, color: '#5500aa', size: 45, desc: 'Void energy storm.', resources: 'Exotic Energy', planets: [] },

    // --- GENERATED SYSTEMS (Filling the 16 Sectors) ---
    { id: 'gargantua', name: 'The Abyssal Reach', x: 7000, y: 7000, color: '#000000', size: 120, type: 'blackhole', desc: 'Supermassive black hole.', resources: 'Dark Matter', planets: [] },
    { id: 'radiant', name: 'Radiant Core', x: 1500, y: 1500, color: '#ffffff', size: 90, type: 'whitehole', desc: 'Blindingly bright white hole.', resources: 'Exotic Energy', planets: [] },
    { id: 'obsidian', name: 'Obsidian Marches', x: 6500, y: 6000, color: '#444444', size: 50, desc: 'Dead system filled with shattered planets.', resources: 'Ancient Scrap', planets: [] },
    { id: 'valkyrie', name: 'Valkyrie', x: 4000, y: 7000, color: '#ff00ff', size: 80, desc: 'Massive supernova remnant.', resources: 'Supernova Dust', planets: [] },
    { id: 'tarsus', name: 'Tarsus', x: 5000, y: 6500, color: '#ffaa00', size: 60, desc: 'Binary star system.', resources: 'Plasma', planets: [] },
    { id: 'krios', name: 'Krios', x: 5500, y: 7500, color: '#aa00ff', size: 45, desc: 'Pulsar emitting deadly radiation.', resources: 'Isotopes', planets: [] },
    { id: 'solitude', name: 'Solitude', x: 3000, y: 7500, color: '#555555', size: 30, desc: 'Rogue star drifting between sectors.', resources: 'Ice', planets: [] },
    { id: 'aethelgard', name: 'Aethelgard', x: 1000, y: 2000, color: '#ffff00', size: 70, desc: 'Ancient, untouched system.', resources: 'Relics', planets: [] },
    { id: 'chronos', name: 'Chronos', x: 500, y: 2500, color: '#00ffff', size: 55, desc: 'System with severe time dilation anomalies.', resources: 'Chronitons', planets: [] },
    { id: 'hyperion', name: 'Hyperion', x: 1500, y: 800, color: '#ff0055', size: 65, desc: 'Red giant on the verge of collapse.', resources: 'Heavy Metals', planets: [] },
    { id: 'styx', name: 'Styx', x: 2500, y: 1000, color: '#222222', size: 40, desc: 'Dark nebula hiding pirate caches.', resources: 'Contraband', planets: [] },
    { id: 'elysium', name: 'Elysium', x: 7500, y: 1500, color: '#aaffaa', size: 75, desc: 'Paradise world untouched by war.', resources: 'Organics', planets: [] },
    { id: 'tartarus', name: 'Tartarus', x: 7500, y: 2500, color: '#ff5500', size: 50, desc: 'Lava world used as a penal colony.', resources: 'Magma', planets: [] },
    { id: 'nexus', name: 'The Nexus', x: 4000, y: 1000, color: '#00ccff', size: 85, desc: 'Ancient jump gate hub.', resources: 'Tech', planets: [] },
    { id: 'omega', name: 'Omega Point', x: 5000, y: 500, color: '#ff0000', size: 60, desc: 'Edge of the known galaxy.', resources: 'Unknown', planets: [] },
    { id: 'zenith', name: 'Zenith', x: 6000, y: 800, color: '#ffffcc', size: 55, desc: 'High-altitude observatory system.', resources: 'Data', planets: [] },
    { id: 'nadir', name: 'Nadir', x: 7000, y: 500, color: '#333333', size: 45, desc: 'Deep space trench.', resources: 'Dark Matter', planets: [] },
    { id: 'aurora', name: 'Aurora', x: 500, y: 5000, color: '#ff99ff', size: 65, desc: 'System bathed in a permanent nebula glow.', resources: 'Gas', planets: [] },
    { id: 'borealis', name: 'Borealis', x: 800, y: 6000, color: '#99ffff', size: 50, desc: 'Ice mining hub.', resources: 'Water', planets: [] },
    { id: 'corvus', name: 'Corvus', x: 500, y: 7000, color: '#cc0000', size: 40, desc: 'Deadly asteroid field.', resources: 'Ore', planets: [] },
    { id: 'draco', name: 'Draco', x: 2500, y: 7500, color: '#ff5500', size: 55, desc: 'Dragon-shaped nebula.', resources: 'Plasma', planets: [] },
    { id: 'lyra', name: 'Lyra', x: 3500, y: 7800, color: '#ccccff', size: 45, desc: 'Musical anomaly system.', resources: 'Crystals', planets: [] },
    { id: 'orion', name: 'Orion', x: 6000, y: 7500, color: '#55ff55', size: 60, desc: 'Hunter\'s paradise world.', resources: 'Biomass', planets: [] },
    { id: 'cygnus', name: 'Cygnus', x: 7500, y: 5500, color: '#ffccff', size: 50, desc: 'Swan nebula.', resources: 'Gas', planets: [] },
    { id: 'vela', name: 'Vela', x: 7800, y: 3500, color: '#ffffaa', size: 40, desc: 'Pulsar wind nebula.', resources: 'Energy', planets: [] }
];
