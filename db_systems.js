const systemsDB = [
    { 
        id: 'brunhilde', name: 'Brunhilde', x: 4500, y: 3500, color: '#ffff99', size: 80, 
        desc: 'Main Sequence F-Class Star. The core of Setrean space.', resources: 'Solar Energy',
        planets: [
            { id: 'gastron', name: 'Gastron', dist: 250, angle: 45, size: 25, color: '#00aa00', desc: 'Lush homeworld of the Setrean people.', resources: 'Water, Organics, Titanium' },
            { id: 'necron', name: 'Necron', dist: 380, angle: 120, size: 35, color: '#0055ff', desc: 'Blue gas giant with asteroid belt.', resources: 'Helium-3, Iridium, Copper' }
        ]
    },
    { 
        id: 'varlupra', name: 'Var Lupra', x: 5500, y: 3800, color: '#99ccff', size: 90, 
        desc: 'Uncharted B5-Class Star System. Source of the Abruix signal.', resources: 'Unknown',
        planets: [
            { id: 'pareah', name: 'Pareah', dist: 300, angle: 45, size: 30, color: '#009933', desc: 'Jungle world teeming with Gy\'zoma beasts.', resources: 'Exotic Spores, Ancient Tech' }
        ]
    },
    { 
        id: 'wolfreiser', name: 'Wolf-Reiser', x: 2800, y: 2200, color: '#ff6600', size: 65, 
        desc: 'Heavy industrial mining and corporate espionage.', resources: 'Heavy Metals',
        planets: [
            { id: 'wr_prime', name: 'Reiser Prime', dist: 180, angle: 0, size: 22, color: '#888', desc: 'Industrial smog covers this mining world.', resources: 'Iron, Gold, Platinum' }
        ]
    }
];
