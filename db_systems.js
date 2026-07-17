// ==========================================
// GALAXY MAP DATA - STATIC DATABASE
// ==========================================

const db_sectors = [
    { id: "zavares", name: "Zavares Sector", color: "rgba(200, 50, 50, 0.15)", cx: -200, cy: -200 },
    { id: "aquila", name: "Aquila Expanse", color: "rgba(50, 100, 200, 0.15)", cx: 200, cy: -200 },
    { id: "orionis", name: "Orionis Syndicate", color: "rgba(50, 200, 50, 0.15)", cx: 400, cy: 0 },
    { id: "perseus", name: "Perseus Arm", color: "rgba(200, 200, 50, 0.15)", cx: 200, cy: 200 },
    { id: "centauri", name: "Centauri Republic", color: "rgba(200, 100, 50, 0.15)", cx: -200, cy: 200 },
    { id: "draconis", name: "Draconis Wastes", color: "rgba(150, 50, 200, 0.15)", cx: -400, cy: 0 },
    { id: "lyrae", name: "Lyrae Core", color: "rgba(255, 255, 255, 0.1)", cx: 0, cy: 0 },
    { id: "terminus", name: "Terminus Fringe", color: "rgba(100, 100, 100, 0.2)", cx: -400, cy: -400 }
];

const db_systems = [
    // --- ZAVARES SECTOR (Lore Systems) ---
    {
        id: "brunhilde", name: "Brunhilde", sector: "zavares", type: "Main Sequence F", x: -180, y: -220, color: "#ffddaa",
        planets: [
            { name: "Militia", type: "Barren", orbitRadius: 40, angle: 1.2, moons: 1, hasRings: false, hasStation: false },
            { name: "Gastron", type: "Terran", orbitRadius: 70, angle: 3.5, moons: 1, hasRings: false, hasStation: true, stationName: "Day Star" },
            { name: "Necron", type: "Gas Giant", orbitRadius: 120, angle: 0.8, moons: 5, hasRings: false, hasStation: false },
            { name: "Covault", type: "Gas Giant", orbitRadius: 160, angle: 4.1, moons: 3, hasRings: true, hasStation: false },
            { name: "Verio", type: "Gas Giant", orbitRadius: 200, angle: 2.2, moons: 4, hasRings: false, hasStation: true, stationName: "Deep Space Relay" }
        ]
    },
    {
        id: "var_lupra", name: "Var Lupra", sector: "zavares", type: "Main Sequence B5", x: -250, y: -150, color: "#aaddff",
        planets: [
            { name: "Naokin", type: "Volcanic", orbitRadius: 50, angle: 5.1, moons: 0, hasRings: false, hasStation: false },
            { name: "Pareah", type: "Jungle", orbitRadius: 90, angle: 2.7, moons: 2, hasRings: false, hasStation: false },
            { name: "Trigen", type: "Gas Giant", orbitRadius: 150, angle: 1.1, moons: 1, hasRings: true, hasStation: false }
        ]
    },
    {
        id: "varix_alpha", name: "Varix Alpha", sector: "zavares", type: "Red Dwarf", x: -140, y: -180, color: "#ff9999",
        planets: [
            { name: "Xar Prime", type: "Barren", orbitRadius: 45, angle: 0.5, moons: 0, hasRings: false, hasStation: true, stationName: "Night Star" }
        ]
    },
    { id: "zav_4", name: "Kaelen", sector: "zavares", type: "Yellow Dwarf", x: -280, y: -250, color: "#ffff99", planets: [{ name: "Kaelen I", type: "Desert", orbitRadius: 60, angle: 3.1, moons: 1, hasRings: false, hasStation: false }] },
    { id: "zav_5", name: "Othos", sector: "zavares", type: "Blue Giant", x: -120, y: -280, color: "#99ccff", planets: [{ name: "Othos Prime", type: "Ocean", orbitRadius: 110, angle: 4.4, moons: 2, hasRings: true, hasStation: false }] },
    { id: "zav_6", name: "Vesper", sector: "zavares", type: "Neutron Star", x: -220, y: -120, color: "#ffffff", planets: [] },
    { id: "zav_7", name: "Gael", sector: "zavares", type: "Red Giant", x: -160, y: -150, color: "#ff6666", planets: [{ name: "Gael Minor", type: "Volcanic", orbitRadius: 180, angle: 1.9, moons: 0, hasRings: false, hasStation: false }] },
    { id: "zav_8", name: "Sylar", sector: "zavares", type: "Yellow Dwarf", x: -290, y: -190, color: "#ffff99", planets: [{ name: "Sylar III", type: "Terran", orbitRadius: 85, angle: 5.5, moons: 1, hasRings: false, hasStation: true, stationName: "Sylar Hub" }] },

    // --- TERMINUS FRINGE (Lore Systems) ---
    {
        id: "warren_gate", name: "Warren Gateway", sector: "terminus", type: "Wormhole", x: -420, y: -380, color: "#cc99ff",
        planets: [
            { name: "Outpost 79", type: "Station", orbitRadius: 30, angle: 1.5, moons: 0, hasRings: false, hasStation: true, stationName: "Outpost 79" }
        ]
    },
    {
        id: "terminus_prime", name: "Terminus", sector: "terminus", type: "Red Dwarf", x: -380, y: -420, color: "#ff9999",
        planets: [
            { name: "Terminus Rock", type: "Barren", orbitRadius: 50, angle: 4.2, moons: 0, hasRings: true, hasStation: true, stationName: "Terminus Outpost" }
        ]
    },
    { id: "term_3", name: "Nyx", sector: "terminus", type: "Black Hole", x: -480, y: -450, color: "#000000", planets: [] },
    { id: "term_4", name: "Voss", sector: "terminus", type: "Ice Dwarf", x: -350, y: -480, color: "#ccccff", planets: [{ name: "Voss I", type: "Ice", orbitRadius: 70, angle: 2.1, moons: 0, hasRings: false, hasStation: false }] },
    { id: "term_5", name: "Kessel", sector: "terminus", type: "Yellow Dwarf", x: -450, y: -320, color: "#ffff99", planets: [{ name: "Kessel Prime", type: "Barren", orbitRadius: 65, angle: 0.9, moons: 2, hasRings: true, hasStation: false }] },
    { id: "term_6", name: "Dantoo", sector: "terminus", type: "Red Giant", x: -320, y: -350, color: "#ff6666", planets: [{ name: "Dantoo II", type: "Desert", orbitRadius: 140, angle: 3.8, moons: 1, hasRings: false, hasStation: false }] },
    { id: "term_7", name: "Ryloth", sector: "terminus", type: "Blue Giant", x: -490, y: -390, color: "#99ccff", planets: [{ name: "Ryloth Major", type: "Ocean", orbitRadius: 120, angle: 5.0, moons: 3, hasRings: false, hasStation: false }] },
    { id: "term_8", name: "Illium", sector: "terminus", type: "White Hole", x: -370, y: -490, color: "#e6ffff", planets: [] },

    // --- ORIONIS SYNDICATE (Lore Systems) ---
    {
        id: "thynome", name: "Thynome", sector: "orionis", type: "Blue Giant", x: 380, y: -20, color: "#99ccff",
        planets: [
            { name: "Vector Prime", type: "Terran", orbitRadius: 90, angle: 2.4, moons: 2, hasRings: false, hasStation: true, stationName: "Vector Foundation HQ" },
            { name: "Vector Forge", type: "Volcanic", orbitRadius: 140, angle: 5.1, moons: 0, hasRings: true, hasStation: true, stationName: "Orbital Shipyards" }
        ]
    },
    { id: "ori_2", name: "Suteo", sector: "orionis", type: "Yellow Dwarf", x: 420, y: 40, color: "#ffff99", planets: [{ name: "Suteo I", type: "Desert", orbitRadius: 60, angle: 1.1, moons: 1, hasRings: false, hasStation: false }] },
    { id: "ori_3", name: "Vikka", sector: "orionis", type: "Red Dwarf", x: 450, y: -50, color: "#ff9999", planets: [{ name: "Vikka Minor", type: "Ice", orbitRadius: 45, angle: 3.3, moons: 0, hasRings: false, hasStation: false }] },
    { id: "ori_4", name: "Pan", sector: "orionis", type: "Neutron Star", x: 350, y: 60, color: "#ffffff", planets: [] },
    { id: "ori_5", name: "Loma", sector: "orionis", type: "Red Giant", x: 480, y: 10, color: "#ff6666", planets: [{ name: "Loma III", type: "Gas Giant", orbitRadius: 160, angle: 4.7, moons: 4, hasRings: true, hasStation: false }] },
    { id: "ori_6", name: "Ymirr", sector: "orionis", type: "Yellow Dwarf", x: 320, y: -60, color: "#ffff99", planets: [{ name: "Ymirr Prime", type: "Terran", orbitRadius: 75, angle: 0.4, moons: 1, hasRings: false, hasStation: true, stationName: "Syndicate Hub" }] },
    { id: "ori_7", name: "Kontis", sector: "orionis", type: "Blue Giant", x: 410, y: -80, color: "#99ccff", planets: [{ name: "Kontis II", type: "Ocean", orbitRadius: 130, angle: 2.9, moons: 2, hasRings: false, hasStation: false }] },
    { id: "ori_8", name: "Weyt", sector: "orionis", type: "Black Hole", x: 490, y: -90, color: "#000000", planets: [] },

    // --- DRACONIS WASTES (Lore Systems) ---
    {
        id: "leiverta", name: "Leiverta", sector: "draconis", type: "Red Giant", x: -380, y: 20, color: "#ff6666",
        planets: [
            { name: "Fallen Capital", type: "Barren", orbitRadius: 150, angle: 1.8, moons: 1, hasRings: true, hasStation: true, stationName: "Ruined Monarchy Hub" }
        ]
    },
    { id: "dra_2", name: "Nimarr", sector: "draconis", type: "Red Dwarf", x: -420, y: -40, color: "#ff9999", planets: [{ name: "Nimarr I", type: "Volcanic", orbitRadius: 50, angle: 4.5, moons: 0, hasRings: false, hasStation: false }] },
    { id: "dra_3", name: "Oomba", sector: "draconis", type: "Yellow Dwarf", x: -450, y: 50, color: "#ffff99", planets: [{ name: "Oomba Prime", type: "Desert", orbitRadius: 70, angle: 0.2, moons: 2, hasRings: false, hasStation: false }] },
    { id: "dra_4", name: "Taris", sector: "draconis", type: "Neutron Star", x: -350, y: -60, color: "#ffffff", planets: [] },
    { id: "dra_5", name: "Onderon", sector: "draconis", type: "Blue Giant", x: -480, y: -10, color: "#99ccff", planets: [{ name: "Onderon Major", type: "Gas Giant", orbitRadius: 180, angle: 3.6, moons: 5, hasRings: true, hasStation: false }] },
    { id: "dra_6", name: "Korriban", sector: "draconis", type: "Red Dwarf", x: -320, y: 60, color: "#ff9999", planets: [{ name: "Korriban I", type: "Barren", orbitRadius: 40, angle: 5.8, moons: 0, hasRings: false, hasStation: false }] },
    { id: "dra_7", name: "Alderaan", sector: "draconis", type: "Yellow Dwarf", x: -410, y: 80, color: "#ffff99", planets: [{ name: "Alderaan Remnant", type: "Asteroid Field", orbitRadius: 65, angle: 2.3, moons: 0, hasRings: true, hasStation: false }] },
    { id: "dra_8", name: "Corellia", sector: "draconis", type: "White Hole", x: -490, y: 90, color: "#e6ffff", planets: [] },

    // --- LYRAE CORE (Galactic Center) ---
    {
        id: "lyrae_prime", name: "Sagittarius", sector: "lyrae", type: "Black Hole", x: 0, y: 0, color: "#000000",
        planets: [
            { name: "Event Horizon Station", type: "Station", orbitRadius: 40, angle: 3.14, moons: 0, hasRings: true, hasStation: true, stationName: "Core Observatory" }
        ]
    },
    { id: "lyr_2", name: "Eriadu", sector: "lyrae", type: "Blue Giant", x: 40, y: -40, color: "#99ccff", planets: [{ name: "Eriadu I", type: "Volcanic", orbitRadius: 120, angle: 1.5, moons: 1, hasRings: false, hasStation: false }] },
    { id: "lyr_3", name: "Sullust", sector: "lyrae", type: "Red Giant", x: -50, y: 50, color: "#ff6666", planets: [{ name: "Sullust Prime", type: "Gas Giant", orbitRadius: 160, angle: 4.2, moons: 3, hasRings: true, hasStation: false }] },
    { id: "lyr_4", name: "Mon Cala", sector: "lyrae", type: "Yellow Dwarf", x: 60, y: 30, color: "#ffff99", planets: [{ name: "Mon Cala Ocean", type: "Ocean", orbitRadius: 80, angle: 0.8, moons: 2, hasRings: false, hasStation: true, stationName: "Deep Water Hub" }] },
    { id: "lyr_5", name: "Kamino", sector: "lyrae", type: "Neutron Star", x: -30, y: -60, color: "#ffffff", planets: [] },
    { id: "lyr_6", name: "Geonosis", sector: "lyrae", type: "Red Dwarf", x: 70, y: -20, color: "#ff9999", planets: [{ name: "Geonosis I", type: "Desert", orbitRadius: 50, angle: 5.5, moons: 1, hasRings: true, hasStation: false }] },
    { id: "lyr_7", name: "Mustafar", sector: "lyrae", type: "Blue Giant", x: -70, y: -10, color: "#99ccff", planets: [{ name: "Mustafar Prime", type: "Volcanic", orbitRadius: 110, angle: 2.7, moons: 0, hasRings: false, hasStation: false }] },
    { id: "lyr_8", name: "Endor", sector: "lyrae", type: "Yellow Dwarf", x: 20, y: 70, color: "#ffff99", planets: [{ name: "Endor Gas Giant", type: "Gas Giant", orbitRadius: 140, angle: 3.9, moons: 4, hasRings: true, hasStation: false }] },

    // --- AQUILA EXPANSE ---
    { id: "aqu_1", name: "Hoth", sector: "aquila", type: "Yellow Dwarf", x: 180, y: -220, color: "#ffff99", planets: [{ name: "Hoth Prime", type: "Ice", orbitRadius: 75, angle: 1.2, moons: 2, hasRings: false, hasStation: true, stationName: "Echo Base" }] },
    { id: "aqu_2", name: "Bespin", sector: "aquila", type: "Blue Giant", x: 220, y: -180, color: "#99ccff", planets: [{ name: "Bespin Gas", type: "Gas Giant", orbitRadius: 150, angle: 4.5, moons: 1, hasRings: true, hasStation: true, stationName: "Cloud City" }] },
    { id: "aqu_3", name: "Dagobah", sector: "aquila", type: "Red Dwarf", x: 250, y: -250, color: "#ff9999", planets: [{ name: "Dagobah Swamp", type: "Jungle", orbitRadius: 55, angle: 2.8, moons: 0, hasRings: false, hasStation: false }] },
    { id: "aqu_4", name: "Naboo", sector: "aquila", type: "Yellow Dwarf", x: 150, y: -150, color: "#ffff99", planets: [{ name: "Naboo Prime", type: "Terran", orbitRadius: 80, angle: 0.5, moons: 1, hasRings: false, hasStation: false }] },
    { id: "aqu_5", name: "Tatooine", sector: "aquila", type: "Red Giant", x: 280, y: -190, color: "#ff6666", planets: [{ name: "Tatooine I", type: "Desert", orbitRadius: 170, angle: 3.4, moons: 2, hasRings: false, hasStation: false }] },
    { id: "aqu_6", name: "Coruscant", sector: "aquila", type: "White Hole", x: 120, y: -280, color: "#e6ffff", planets: [] },
    { id: "aqu_7", name: "Kashyyyk", sector: "aquila", type: "Neutron Star", x: 290, y: -290, color: "#ffffff", planets: [] },
    { id: "aqu_8", name: "Mandalore", sector: "aquila", type: "Blue Giant", x: 190, y: -120, color: "#99ccff", planets: [{ name: "Mandalore Prime", type: "Barren", orbitRadius: 130, angle: 5.1, moons: 1, hasRings: true, hasStation: false }] },

    // --- PERSEUS ARM ---
    { id: "per_1", name: "Yavin", sector: "perseus", type: "Red Giant", x: 180, y: 220, color: "#ff6666", planets: [{ name: "Yavin Prime", type: "Gas Giant", orbitRadius: 160, angle: 2.2, moons: 4, hasRings: true, hasStation: false }] },
    { id: "per_2", name: "Lothal", sector: "perseus", type: "Yellow Dwarf", x: 220, y: 180, color: "#ffff99", planets: [{ name: "Lothal I", type: "Terran", orbitRadius: 70, angle: 4.8, moons: 1, hasRings: false, hasStation: true, stationName: "Perseus Hub" }] },
    { id: "per_3", name: "Jakku", sector: "perseus", type: "Red Dwarf", x: 250, y: 250, color: "#ff9999", planets: [{ name: "Jakku Desert", type: "Desert", orbitRadius: 50, angle: 1.7, moons: 0, hasRings: false, hasStation: false }] },
    { id: "per_4", name: "Jedha", sector: "perseus", type: "Blue Giant", x: 150, y: 150, color: "#99ccff", planets: [{ name: "Jedha Ice", type: "Ice", orbitRadius: 140, angle: 3.9, moons: 2, hasRings: true, hasStation: false }] },
    { id: "per_5", name: "Scarif", sector: "perseus", type: "Yellow Dwarf", x: 280, y: 190, color: "#ffff99", planets: [{ name: "Scarif Ocean", type: "Ocean", orbitRadius: 85, angle: 0.3, moons: 1, hasRings: false, hasStation: false }] },
    { id: "per_6", name: "Exegol", sector: "perseus", type: "Black Hole", x: 120, y: 280, color: "#000000", planets: [] },
    { id: "per_7", name: "Crait", sector: "perseus", type: "Neutron Star", x: 290, y: 290, color: "#ffffff", planets: [] },
    { id: "per_8", name: "Ahch-To", sector: "perseus", type: "Red Giant", x: 190, y: 120, color: "#ff6666", planets: [{ name: "Ahch-To Prime", type: "Ocean", orbitRadius: 175, angle: 5.6, moons: 2, hasRings: false, hasStation: false }] },

    // --- CENTAURI REPUBLIC ---
    { id: "cen_1", name: "Takodana", sector: "centauri", type: "Yellow Dwarf", x: -180, y: 220, color: "#ffff99", planets: [{ name: "Takodana I", type: "Jungle", orbitRadius: 75, angle: 1.4, moons: 1, hasRings: false, hasStation: true, stationName: "Republic Capital" }] },
    { id: "cen_2", name: "Hosnian", sector: "centauri", type: "Blue Giant", x: -220, y: 180, color: "#99ccff", planets: [{ name: "Hosnian Prime", type: "Terran", orbitRadius: 130, angle: 4.1, moons: 2, hasRings: true, hasStation: false }] },
    { id: "cen_3", name: "D'Qar", sector: "centauri", type: "Red Dwarf", x: -250, y: 250, color: "#ff9999", planets: [{ name: "D'Qar Base", type: "Barren", orbitRadius: 45, angle: 2.9, moons: 0, hasRings: false, hasStation: false }] },
    { id: "cen_4", name: "Cantonica", sector: "centauri", type: "Red Giant", x: -150, y: 150, color: "#ff6666", planets: [{ name: "Cantonica Gas", type: "Gas Giant", orbitRadius: 165, angle: 0.7, moons: 5, hasRings: true, hasStation: false }] },
    { id: "cen_5", name: "Kijimi", sector: "centauri", type: "Yellow Dwarf", x: -280, y: 190, color: "#ffff99", planets: [{ name: "Kijimi Ice", type: "Ice", orbitRadius: 80, angle: 3.5, moons: 1, hasRings: false, hasStation: false }] },
    { id: "cen_6", name: "Pasaana", sector: "centauri", type: "Wormhole", x: -120, y: 280, color: "#cc99ff", planets: [] },
    { id: "cen_7", name: "Ajan Kloss", sector: "centauri", type: "Neutron Star", x: -290, y: 290, color: "#ffffff", planets: [] },
    { id: "cen_8", name: "Batuu", sector: "centauri", type: "Blue Giant", x: -190, y: 120, color: "#99ccff", planets: [{ name: "Batuu Outpost", type: "Desert", orbitRadius: 145, angle: 5.2, moons: 2, hasRings: false, hasStation: true, stationName: "Black Spire" }] }
];
