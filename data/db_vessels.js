// data/db_vessels.js

export const db_vessels = [
    // --------------------------------------------------
    // XSV Stardust
    // --------------------------------------------------
    {
        id: "xsv_stardust",
        category: "Vessels",
        title: "XSV Stardust",
        tags: ["XSV Stardust", "Utility Shuttle", "Mechs", "Frontier Operations", "Astral Supply Co"],
        content: `
            <h3>XSV Stardust</h3>
            <p><strong>Overview:</strong> The XSV Stardust is a heavily modified long-range utility shuttle used by independent contractors. Designed for frontier operations, it blends cargo capacity, mech deployment capability, and defensive capabilities.</p>
            
            <h4>Ship Specifications:</h4>
            <ul>
                <li><strong>Class:</strong> Long-Range Utility Shuttle</li>
                <li><strong>Type:</strong> Modified Type-17 Argo (Retrofitted)</li>
                <li><strong>Registry:</strong> XSV-74877-C</li>
                <li><strong>Lineage:</strong> STARDUST from the USS VALKYRIE</li>
                <li><strong>Length:</strong> 32 meters</li>
                <li><strong>Width:</strong> 14 meters</li>
                <li><strong>Height:</strong> 6.5 meters</li>
                <li><strong>Tonnage:</strong> 420 tons fully loaded</li>
                <li><strong>Crew Capacity:</strong> 4 (min 1)</li>
                <li><strong>Hangar:</strong> 2–3 mechs (converted aft cargo bay)</li>
                <li><strong>Engines:</strong> Dual hydrogen reactors + ion propulsion</li>
                <li><strong>Armor:</strong> Reinforced Zeplox ore-composite plating (sensor-baffling)</li>
                <li><strong>Shields:</strong> Mana Range Micro-Generators</li>
                <li><strong>Sensors:</strong> CCX-VS02 Compact Array</li>
                <li><strong>Communications:</strong> Deep Space Network compatible</li>
                <li><strong>Weapons:</strong> Twin Forward-Mounted Pulse Cannons, Micro-Torpedo Launcher</li>
            </ul>

            <h4>Interior Layout:</h4>
            <ul>
                <li><strong>Bridge:</strong> Compact, efficient, reinforced viewports</li>
                <li><strong>Living Quarters:</strong> 4 cramped modular bunks</li>
                <li><strong>Mess Area:</strong> Small lounge with 4-seat table</li>
                <li><strong>Engineering:</strong> Reactor access, coolant systems</li>
                <li><strong>Cargo Bay:</strong> Converted to additional living quarters</li>
                <li><strong>Teleporter Pad:</strong> Single unit for transport operations</li>
                <li><strong>Medical Bay:</strong> Basic treatment station</li>
                <li><strong>Armory:</strong> Small weapons locker</li>
            </ul>

            <h4>Role in Campaign:</h4>
            <p>The Stardust serves as the crew's mobile base of operations and primary transport vessel. Its compact design makes it ideal for discreet missions through dangerous space.</p>

            <h4>Notes:</h4>
            <ul>
                <li>Originally a Federation Type-17 Argo shuttle, salvaged from debris fields.</li>
                <li>Known for reliability and sensor-baffling hull composition.</li>
                <li>Crew often customizes interior modules for mission needs.</li>
                <li>Water reclamation system is easily overtaxed, requiring strict rationing.</li>
                <li><strong>Refit Mk II:</strong> Hull length increased to 32 meters with a modular spine extension, adding endurance support systems and expanded engineering access.</li>
                <li><strong>Handling Note:</strong> The extension slightly reduced maneuver agility, but improved long-duration mission survivability.</li>
            </ul>
        `
    },
    // --------------------------------------------------
    // Huntress Dropship
    // --------------------------------------------------
    {
        id: "huntress_dropship",
        category: "Vessels",
        title: "Huntress Dropship",
        tags: ["Huntress", "Dropship", "Mechs", "Exploration Vessel", "Frontier Operations"],
        content: `
            <h3>Huntress Dropship</h3>
            <p><strong>Overview:</strong> The Huntress is a long-range exploration vessel designed to deploy heavy mechanized units planetside. Built for endurance, it excels in harsh environments, frontier worlds, and uncharted systems.</p>
            
            <h4>Ship Specifications:</h4>
            <ul>
                <li><strong>Class:</strong> Heavy Dropship / Exploration Vessel</li>
                <li><strong>Type:</strong> Astral ER-X</li>
                <li><strong>Manufacture:</strong> Thynome Vector Foundation</li>
                <li><strong>Length:</strong> 80 meters</li>
                <li><strong>Width:</strong> 39 meters (80 meter wingspan)</li>
                <li><strong>Height:</strong> 16 meters</li>
                <li><strong>Tonnage:</strong> 110,851 tons fully loaded</li>
                <li><strong>Crew Capacity:</strong> 7-30</li>
                <li><strong>Mech Capacity:</strong> 4–6 units</li>
                <li><strong>Engines:</strong> Hybrid Logic Drive Type D with base fluid core</li>
                <li><strong>Armor:</strong> Zeplox Harden ZX-1</li>
                <li><strong>Shields:</strong> Mana Range GT-5</li>
                <li><strong>Sensors:</strong> CCX-VS06 Array (capable of scanning entire planets the size of Mars)</li>
                <li><strong>Cooling:</strong> Dual Injection Triplex Coolers</li>
                <li><strong>Power:</strong> Fused Pylon GS Type B</li>
                <li><strong>Warp:</strong> Base Fluid Core capable</li>
                <li><strong>Bays:</strong> 5 total bays</li>
            </ul>

            <h4>Role in Campaign:</h4>
            <p>The Huntress is used for:</p>
            <ul>
                <li>Planetary exploration and reconnaissance</li>
                <li>Wildlife suppression operations</li>
                <li>Heavy construction projects</li>
                <li>Combat deployment with full mech complement</li>
                <li>Hazardous environment missions</li>
            </ul>

            <h4>Notes:</h4>
            <ul>
                <li>Often deployed alongside the XSV Stardust for joint operations.</li>
                <li>Known for distinctive silhouette and reinforced landing struts.</li>
                <li>Hybrid design combining Thynome and Clan technologies.</li>
                <li>Considered one of the most reliable dropships in frontier operations.</li>
                <li>Warp-capable for deep-space exploration.</li>
            </ul>
        `
    }
];
