const db_vessels = [
  {
    name: "XSV Stardust",
    type: "Modified Utility Shuttle / Fast Transport",
    class: "Type-17 Argo (Retrofitted)",
    manufacturer: "Unknown (Salvaged/Retrofitted by Setrean Engineers)",
    dimensions: "Length: 26m | Width: 14m | Height: 6.5m",
    tonnage: "420 tons fully loaded",
    crew: "Max: 4 | Min: 1",
    weapons: "Twin Forward-Mounted Pulse Cannons, Micro-Torpedo Launcher",
    overview: `The XSV Stardust is a heavily modified, long-range utility shuttle. Designed for high-speed transport, escort, and mercenary operations. Owned and operated by an independent mercenary crew under ISRB contract.`,
    history: `The origins of the XSV Stardust are shrouded in mystery. Its base chassis—a Type-17 Argo-class shuttle—does not match standard Setrean or Thynome Vector Foundation designs. It is believed to be a relic from a forgotten era, or perhaps a vessel that fell through a spatial anomaly from a distant sector.\n\nThe derelict hull was discovered adrift in the debris fields near the gas giant Necron by an Astral Supply Co. security patrol in 5068 S.Y. Recognizing the advanced nature of its ion-propulsion engines and sensor-baffling hull, it was salvaged and sold to an independent mercenary crew.\n\nThe crew heavily retrofitted the vessel to bring it up to modern operational standards. The massive aft cargo bay, originally designed to hold a ground transport buggy, was completely gutted. In its place, compact living quarters for a 4-person crew, a small mess area, and enhanced life support systems were installed to allow for deep-space, long-duration missions.`,
    notes: `• The Stardust's hull composition naturally scrambles standard sensors, making it difficult to track in deep space.\n• Due to the experimental nature of its retrofitted life support, the ship's water-reclamation systems are easily overtaxed, requiring strict rationing of the lavatory and sonic showers.\n• The vessel lacks a dedicated hangar or cargo bay; all gear must be stowed in the cramped crew quarters.`
  },
  {
    name: "Huntress",
    type: "Exploration Dropship",
    class: "Astral ER-X",
    manufacturer: "Thynome Vector Foundation",
    dimensions: "Length: 80m | Width: 39m (80m wingspan) | Height: 16m",
    tonnage: "110,851 tons fully loaded",
    crew: "Max: 30 | Min: 7",
    weapons: "None",
    overview: `The Huntress is a long range exploration vessel. Designed to deploy heavy mechanized units planet side. Owned and operated by the Sabers of Fortune Company.`,
    history: `Commissioned by Grim in 5062 S.Y., currently serving with the Sabers of Fortune Co. The Huntress was laid down in the orbital shipyards of Thynome Vector Foundation's HQ. The ship would receive many names in its short life span until its current designation Huntress. The drop ship warp capable vessel designed for deep space exploration. Able to carry equipment and mechanized units within and out of atmosphere.`,
    notes: `• CCX-VS06 Array is capable of scanning an entire planet the size of Mars.\n• The Huntress is a hybrid design of Thynome and Clan Technologies.`
  },
  {
    name: "Night Star Station",
    type: "Refurbished Space Station / Refinery",
    class: "Outpost",
    manufacturer: "Leiverta Proliferation Front (Refurbished by Astral Supply Co.)",
    dimensions: "Unknown",
    tonnage: "Unknown",
    crew: "Unknown",
    weapons: "Unknown",
    overview: `The Night Star is a refurbish space station owned and operated by Astral Supply Co. Serving as a beacon along the mid-point of the Varix corridor, the station is a hub of activity from layovers, refueling and resupplying, to commerce and trading.`,
    history: `The Night Star was originally created by the Leiverta Proliferation Front in 4821 S.Y. Being a military installation, it was masked as just a local refinery for the Varix clouds. It's two main purposes was refining fuel using on-board refineries and espionage with it's now decommissioned powerful gain antenna array.\n\nThe station was once designated the Black Cloud due to poor work conditions and quality of equipment keeping everything covered in the by product of Xar combustion. After recent discoveries from an exploration team sent in by Astral Supply Co. the station has regained a new life named Night Star.`,
    notes: `• The Night Star received it's name acting as a navigational aid on star charts.\n• Houses the 'Twilight' bar, famous for Lumix Noodles.\n• Varix Clouds are gaseous pockets of heavy particles which can be used as fuel and spice.`
  },
  {
    name: "Terminus Outpost",
    type: "Independent Free-Port / Forward Operating Base",
    class: "Modular Deep-Space Habitat",
    manufacturer: "Scavenged (Mixed Leiverta Monarchy & Setrean Tech)",
    dimensions: "Length: 120m | Width: 120m | Height: 45m",
    tonnage: "14,200 tons",
    crew: "Max Population: 45",
    weapons: "Automated Flak Turrets, Point-Defense Lasers",
    overview: `Terminus Outpost is a small, independent Forward Operating Base (FOB) and free-port. Operated by independent contractors and recognized by the ISRB as a private sanctuary. Serving as a discreet layover for mercenary crews, smugglers, and privateers operating in the Zavares Sector.`,
    history: `Terminus Outpost began its life as a Leiverta Monarchy deep-space communications relay, hidden in the outer edges of the Brunhilde Star System. After the collapse of the Monarchy, the relay was abandoned and stripped of its most valuable technology by pirates.\n\nIn 5075 S.Y., a coalition of independent mercenary crews pooled their resources to claim the derelict structure. They towed it into a stable, hidden orbit and began cobbling it back together using salvaged Setrean technology and surplus armor plating.`,
    notes: `• The Black Market: Terminus lacks a massive promenade, but its small lounge serves as a discreet meeting place for brokers.\n• Maintenance Bay: Features a specialized repair bay designed for small-to-medium vessels.\n• Off the Grid: The station's passive sensor array and location make it incredibly difficult for larger military vessels to detect.`
  }
];
