// ===============================
// LCARS Navigation + Databanks + Map
// ===============================

import { loadCategories } from "./ui.js";
import { closePanel } from "./panel.js";

const header = document.getElementById("main-header");
const mainContent = document.getElementById("main-content");
const databanks = document.getElementById("databanks");
const panel = document.getElementById("db-panel");
const closePanelBtn = document.getElementById("close-panel");

const tabs = document.querySelectorAll(".lcars-tab");
let mapAbortController = null;
const CAPTAINS_LOG_FOLDER = "assets/logs/";
const GITHUB_REPO_LOGS_API = "https://api.github.com/repos/StellarYuki/XSV-Stardust/contents/assets/logs";
let captainLogRenderToken = 0;

const fallbackCaptainLogEntries = [
    {
        date: "Stardate 77041.6",
        title: "Into the void we reach",
        brief: "Captain Stellar Yuki records the Stardust's first steady cycle after the Mk II refit.",
        body: `The Stardust is finally settling into her new spine geometry. Roman still swears the portside conduit maze was designed by a sadist, but the extra endurance is already paying off. We are running more freight under Astral contract than I like, though the credits are keeping our long-range plans alive.

Sora has fleet coordination locked down, Aika keeps our systems from drifting into chaos, and every new run pushes us one jump closer to the deeper edge of Var Lupra. If the currents hold and the wormhole traffic stays clean, our next season of work will not just keep us flying - it will put our name where the constellation remembers it.`,
        sourceName: "Fallback Ship Record"
    },
    {
        date: "Mission Report",
        title: "Operation Lantern Wake",
        brief: "Escorted two Astral Supply haulers through the Warren approach corridor.",
        body: `Cargo arrived intact after a masked-burn convoy run through debris clutter near the wormhole approach.

One pirate scout broke off once Roman lit up the tactical grid. No confirmed Stardust damage.`,
        sourceName: "Fallback Ship Record"
    },
    {
        date: "Mission Report",
        title: "Var Lupra Edge Survey",
        brief: "Pending launch package for anomaly corridor charting beyond the usual trade lanes.",
        body: `Mission package is staged for a multi-leg sensor sweep covering drift currents, hazard blooms, and fallback escape vectors.

Awaiting final fuel math, probe calibration, and command sign-off before departure.`,
        sourceName: "Fallback Ship Record"
    }
];

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function formatLogBodyHtml(text) {
    const normalized = String(text || "").replace(/\r/g, "").trim();
    if (!normalized) return `<p class="captains-log-empty">No log body recorded.</p>`;
    return normalized
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
        .join("");
}

function decodeLogHref(href) {
    try {
        return decodeURIComponent(href);
    } catch {
        return href;
    }
}

function buildLogFileUrl(fileName) {
    return `${CAPTAINS_LOG_FOLDER}${fileName.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function toSortTimestamp(value) {
    const direct = Date.parse(value);
    if (Number.isFinite(direct)) return direct;
    const stardateMatch = String(value || "").match(/(\d+(?:\.\d+)?)/);
    if (stardateMatch) return Number(stardateMatch[1]) * 1000;
    return 0;
}

function normalizeLogName(fileName) {
    return String(fileName || "")
        .replace(/\.[^.]+$/, "")
        .replace(/^Captains?\s+Log[\s:_-]*/i, "")
        .replace(/[_-]+/g, " ")
        .trim();
}

function parseCaptainLogText(text, fileName) {
    const lines = String(text || "").replace(/\r/g, "").split("\n");
    let date = "";
    let title = "";
    let brief = "";
    let bodyStartIndex = 0;

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const trimmed = line.trim();
        if (!date) {
            const match = trimmed.match(/^Date\s*:\s*(.*)$/i);
            if (match) {
                date = match[1].trim();
                bodyStartIndex = i + 1;
                continue;
            }
        }
        if (!title) {
            const match = trimmed.match(/^Title\s*:\s*(.*)$/i);
            if (match) {
                title = match[1].trim();
                bodyStartIndex = i + 1;
                continue;
            }
        }
        if (!brief) {
            const match = trimmed.match(/^Brief\s*:\s*(.*)$/i);
            if (match) {
                brief = match[1].trim();
                bodyStartIndex = i + 1;
                continue;
            }
        }
        if (date && title && brief && trimmed === "") {
            bodyStartIndex = i + 1;
            break;
        }
    }

    const body = lines.slice(bodyStartIndex).join("\n").trim();
    const fallbackTitle = normalizeLogName(fileName) || "Untitled Captain's Log";

    return {
        date: date || "Undated Entry",
        title: title || fallbackTitle,
        brief: brief || "No brief provided.",
        body,
        sourceName: fileName,
        sortTimestamp: toSortTimestamp(date || fileName)
    };
}

async function listCaptainLogFiles() {
    try {
        const response = await fetch(CAPTAINS_LOG_FOLDER, { cache: "no-store" });
        if (!response.ok) throw new Error(`Unable to read ${CAPTAINS_LOG_FOLDER}`);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const files = [...doc.querySelectorAll("a")]
            .map((link) => decodeLogHref(link.getAttribute("href") || ""))
            .filter((href) => href
                && !href.startsWith("?")
                && !href.startsWith(".")
                && !href.endsWith("/")
                && !/^index\.(html?|json)$/i.test(href)
                && !/\.(png|jpe?g|gif|webp|svg|ico|css|js)$/i.test(href));

        if (files.length) return files;
    } catch {
        // Fall back to GitHub's contents API when the hosted site does not expose directory listings.
    }

    const apiResponse = await fetch(GITHUB_REPO_LOGS_API, {
        cache: "no-store",
        headers: { Accept: "application/vnd.github+json" }
    });
    if (!apiResponse.ok) throw new Error(`Unable to read ${GITHUB_REPO_LOGS_API}`);
    const payload = await apiResponse.json();
    if (!Array.isArray(payload)) return [];

    return payload
        .filter((entry) => entry?.type === "file" && typeof entry.name === "string")
        .map((entry) => entry.name)
        .filter((name) => !name.startsWith(".") && !/\.(png|jpe?g|gif|webp|svg|ico|css|js)$/i.test(name));
}

async function loadCaptainLogEntries() {
    const files = await listCaptainLogFiles();
    const entries = await Promise.all(files.map(async (fileName) => {
        try {
            const response = await fetch(buildLogFileUrl(fileName), { cache: "no-store" });
            if (!response.ok) return null;
            const text = await response.text();
            return parseCaptainLogText(text, fileName);
        } catch {
            return null;
        }
    }));

    return entries
        .filter(Boolean)
        .sort((a, b) => b.sortTimestamp - a.sortTimestamp || a.title.localeCompare(b.title));
}

function renderCaptainLogEntries(entries, note = "") {
    const infoNote = note ? `<p class="captains-log-empty">${escapeHtml(note)}</p>` : "";
    const itemsHtml = entries.map((entry) => `
        <article class="captains-log-entry">
            <span class="record-meta">${escapeHtml(entry.date)} • ${escapeHtml(entry.sourceName || "Captain's Log")}</span>
            <h3>${escapeHtml(entry.title)}</h3>
            <p class="captains-log-brief"><strong>Brief:</strong> ${escapeHtml(entry.brief)}</p>
            <div class="captains-log-body">${formatLogBodyHtml(entry.body)}</div>
        </article>
    `).join("");

    return `
        <div class="content-section">
            <h2>CAPTAIN'S LOG ARCHIVE</h2>
            <div class="captains-log-intro">
                <p>
                    Drop SL notecard exports into <strong>${CAPTAINS_LOG_FOLDER}</strong> and this archive will read them automatically.
                </p>
                <p>
                    Supported body format: <strong>Date:</strong>, <strong>Title:</strong>, <strong>Brief:</strong>, then the RP text below.
                </p>
                <p>
                    On Windows, filenames cannot use <code>:</code>, so <strong>Captains Log - Name - Date.txt</strong> works fine. The archive reads the fields from inside the file.
                </p>
                ${infoNote}
            </div>
            <div class="captains-log-list">${itemsHtml}</div>
        </div>
    `;
}

async function renderCaptainLogContent() {
    const token = ++captainLogRenderToken;
    header.textContent = "CAPTAIN'S LOG";
    mainContent.innerHTML = `
        <div class="content-section">
            <h2>CAPTAIN'S LOG ARCHIVE</h2>
            <p class="captains-log-empty">Scanning ${CAPTAINS_LOG_FOLDER} for notecards...</p>
        </div>
    `;

    try {
        const entries = await loadCaptainLogEntries();
        if (token !== captainLogRenderToken || header.textContent !== "CAPTAIN'S LOG") return;
        if (entries.length) {
            mainContent.innerHTML = renderCaptainLogEntries(entries);
            return;
        }
        mainContent.innerHTML = renderCaptainLogEntries(
            fallbackCaptainLogEntries,
            "No files were found in the log folder yet, so fallback ship records are shown for now."
        );
    } catch {
        if (token !== captainLogRenderToken || header.textContent !== "CAPTAIN'S LOG") return;
        mainContent.innerHTML = renderCaptainLogEntries(
            fallbackCaptainLogEntries,
            "The archive could not read the folder listing, so fallback ship records are shown for now."
        );
    }
}

function renderHomeStationContent() {
    return `
        <div class="content-section">
            <div class="home-hero">
                <img class="home-hero-logo" src="assets/logos/xsv_stardust_white_logo.png" alt="XSV Stardust logo">
                <div>
                    <h2>⦿ WELCOME TO THE XSV STARDUST</h2>
                    <p>
                        We are an <strong>independent mercenary crew</strong> operating the XSV Stardust—a heavily modified Type-17 
                        Argo-class shuttle. Our vessel is equipped with experimental technology and cutting-edge systems designed for 
                        high-speed transport, escort missions, and deep-space operations.
                    </p>
                    <img class="home-hero-image" src="assets/stardust/stardust_ext_1.png" alt="XSV Stardust exterior">
                </div>
            </div>
            <h3>Who We Are</h3>
            <p>
                The XSV Stardust operates primarily within the <strong>Crux Constellation</strong> under contract with the 
                <strong>Independent Services Review Board (ISRB)</strong>. We take on high-risk contracts that require speed, 
                stealth, and tactical expertise. Due to our ship's unique capabilities, we are frequently hired by Astral Supply Co. 
                to escort high-value freight through dangerous space lanes or run security patrols near major stations.
            </p>
            
            <h3>What We Do</h3>
            <ul>
                <li><strong>Mercenary Operations:</strong> High-risk escort and security missions</li>
                <li><strong>Deep-Space Exploration:</strong> Long-duration missions beyond charted space</li>
                <li><strong>Tactical Response:</strong> Fast-deployment response to emerging threats</li>
                <li><strong>Salvage & Recovery:</strong> Retrieval of valuable assets in hostile environments</li>
            </ul>
            
            <h3>Our Crew</h3>
            <p>
                We are a <strong>tight-knit team of four specialists</strong>, each bringing unique skills to every mission. 
                While our accommodations are minimal—the shuttle was never designed for comfort—our crew excels at adapting, 
                improvising, and accomplishing objectives under extreme pressure.
            </p>
            
            <h3>The Ship</h3>
            <p>
                The XSV Stardust is a marvel of retrofit engineering. Its hull composition naturally scrambles standard sensors, 
                making it difficult to track in deep space. Combined with its advanced propulsion systems and tactical capabilities, 
                the Stardust is both a home and a weapon—perfectly suited for independent operations on the edge of known space.
            </p>

            <h3>Join Us</h3>
            <p> 
                If you enjoy short skirts or playful urgency in RP, a crew that's not uptight 
                about pure Trek canon, harsh rigid rules - you'll fit right in aboard the XSV Stardust. We're here for good stories, sharp banter, 
                and the thrill of deep-space chaos.
            </p>
            <p>
                Review the <strong>RULES & GUIDE</strong> section for our operational procedures and RP etiquette, then hop aboard. Bring your creativity, 
                your sense of humor, and maybe a spare coolant pack - we promise you'll need all three.
            </p>
            <p><strong>Motto:</strong> Into the void we reach.</p>
            <p>
                <strong>Second Life Group Profile:</strong>
                <a href="secondlife:///app/group/7c12e1d4-9c76-e58b-8bc2-becfca647f49/about">XSV Stardust Group Link</a>
            </p>
            <p>
                <strong>XSV Stardust Location:</strong>
                <a href="http://maps.secondlife.com/secondlife/Haman/35/35/3800" target="_blank">http://maps.secondlife.com/secondlife/Haman/35/35/3800</a>
            </p>
        </div>
    `;
}

window.addEventListener("DOMContentLoaded", () => {
    databanks.classList.add("hidden");
    panel.classList.remove("open");
    
    // Load Home Station by default
    header.textContent = "HOME STATION";
    mainContent.innerHTML = renderHomeStationContent();
});

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        const label = btn.textContent.trim();

        panel.classList.remove("open");
        databanks.classList.add("hidden");
        mainContent.style.padding = "30px";
        mainContent.style.height = "";
        mainContent.style.flex = "";
        mainContent.style.overflow = "auto";

        if (label !== "ASTROMETRICS" && mapAbortController) {
            mapAbortController.abort();
            mapAbortController = null;
        }

        switch (label) {
            case "HOME STATION":
                header.textContent = "HOME STATION";
                mainContent.innerHTML = renderHomeStationContent();
                break;

            case "RULES & GUIDE":
                header.textContent = "RULES & GUIDE";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>🚀 WELCOME ABOARD THE XSV STARDUST</h2>
                        <p style="font-size: 13px; color: #aaa;">Official Roleplay Guide & Ship Rules</p>
                        
                        <h3>Introduction</h3>
                        <p>
                            Welcome aboard the XSV Stardust! We are an independent mercenary crew. This vessel is a heavily modified 
                            Type-17 Argo-class shuttle. Originally designed to carry a cargo buggy, the aft section has been completely 
                            retrofitted to support deep-space, long-duration roleplay.
                        </p>
                        <p>
                            Amenities are minimal. We have a Bridge, a small Teleporter pad, 4 cramped bunks, a tiny lounge with a 4-seat table, 
                            and a compact engineering section. Whether we are docked at a station or exploring deep space, this shuttle serves as 
                            our mobile home. We encourage collaborative, creative storytelling where everyone gets to contribute!
                        </p>
                        
                        <h3>🎨 Departments & Colors</h3>
                        <p>Our crew uses a color-coding system to easily identify everyone's primary role:</p>
                        <ul>
                            <li><strong style="color:#6aa9ff;">BLUE (Command & CONN):</strong> The leaders and pilots.</li>
                            <li><strong style="color:#ff6f6f;">RED (Security & Tactical):</strong> The protectors and weapons specialists.</li>
                            <li><strong style="color:#ffd96b;">YELLOW (Engineering & Operations):</strong> The fixers and system mechanics.</li>
                            <li><strong style="color:#b65a7e;">BURGUNDY (Science & Medical):</strong> The researchers and healers.</li>
                        </ul>
                        
                        <h3>⭐ Rank Pips & HUD System</h3>
                        <p>
                            We use the JRF Equipment HUD system for our overhead titlers and gear. Please set your titler to display your Name, 
                            Rank, and "XSV Stardust". Your rank is displayed on your collar using a 6-tier pip system. Rank implies responsibility 
                            in the RP, not just power.
                        </p>
                        <h4>XSV Stardust Rank Structure (6-Tier)</h4>
                        <ul>
                            <li><strong>🟡 → Ensign</strong><br>Entry‑level commissioned officer.</li>
                            <li><strong>🟡⚫ → Lieutenant Junior Grade (J.G.)</strong><br>Probationary officer; one step above Ensign.</li>
                            <li><strong>🟡🟡 → Lieutenant</strong><br>Standard mid‑level officer; trusted to run departments.</li>
                            <li><strong>🟡🟡⚫ → Lieutenant Commander</strong><br>Senior officer; halfway between Lieutenant and Commander.</li>
                            <li><strong>🟡🟡🟡⚫ → Commander</strong><br>Second‑in‑command rank; often XO of a starship.</li>
                            <li><strong>🟡🟡🟡🟡 → Captain</strong><br>Starship commanding officer.</li>
                        </ul>
                        <p><em>Promotion is earned through activity, reliability, and IC leadership quality—not time alone.</em></p>
                        
                        <h3>👗 Dress Code & Uniforms</h3>
                        <p>
                            We are open to most uniforms! While we have "official" uniforms linked below, you may wear what you like as long as 
                            it stays within the sci-fi theme. Civilian attire is also completely allowed while off-duty.
                        </p>
                        
                        <h4>Official Female Duty Uniforms:</h4>
                        <ul style="font-size: 13px;">
                            <li><strong>Jazabelle 'Deep Space 69':</strong> <a href="https://marketplace.secondlife.com/p/Jazabelle-Deep-Space-69-complete-outfit/22834766" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>Jazabelle 'To Boldly Go':</strong> <a href="https://marketplace.secondlife.com/p/Jazabelle-To-Boldly-Go-complete-outfit/28087979" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Uniform - 2360s:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Uniform-2360s-Female/14669939" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                        </ul>
                        
                        <h4>Official Male Duty Uniforms:</h4>
                        <ul style="font-size: 13px;">
                            <li><strong>Mercer Fleet Officer:</strong> <a href="https://marketplace.secondlife.com/p/Mercer-Fleet-Officer-Blue/23627398" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>WW 2371 Uniform:</strong> <a href="https://marketplace.secondlife.com/p/WW-2371-Uniform-Male/25932021" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>JRF 2360s Uniform:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Uniform-2360s-Male/14991576" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                        </ul>
                        
                        <h4>Equipment & Rank Pips:</h4>
                        <ul style="font-size: 13px;">
                            <li><strong>TerraCo Rank Pips (Standard, Officer):</strong> <a href="https://marketplace.secondlife.com/p/TerraCo-Rank-Pips-Standard-Officer/9390312" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Equipment - S3RP STP Tricorder:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Equipment-S3RP-STP-Tricorder/25896747" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Equipment - Med Kit:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Equipment-Med-Kit/22241217" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Weapon - Phaser sidearm Type 2 MK6:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Weapon-Phaser-sidearm-Type-2-MK6/25896599" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                            <li><strong>[JRF] Weapon - Phaser rifle Type 3 MK10:</strong> <a href="https://marketplace.secondlife.com/p/JRF-Weapon-Phaser-rifle-Type-3-MK10/25896366" target="_blank" style="color: #66ccff;">View in Marketplace</a></li>
                        </ul>
                        
                        <h3>🛠️ Shuttle Operations & IC Protocols</h3>
                        <p>Because this is a small shuttle and not a luxury starship, we run a tight ship. The following In-Character rules apply:</p>
                        <ol>
                            <li><strong>ALARMS & RED ALERTS:</strong> When the ship's alarm sounds, all crew are expected to immediately return to their duty station and remain there until the alert is cleared or the mission dictates otherwise.</li>
                            <li><strong>RESOURCE CONSERVATION:</strong> Due to the shuttle's limited water-reclamation and life-support capacities, lavatory and sonic shower usage is strictly rationed.</li>
                            <li><strong>REPLICATOR RATIONS:</strong> The mess replicator draws heavily on the warp core. Use is limited to basic rations, water, and coffee. Luxury items require Command authorization.</li>
                            <li><strong>CRAMPED QUARTERS:</strong> Space is at a premium. Keep your personal gear stowed in your designated bunk area.</li>
                            <li><strong>MAINTENANCE DUTY:</strong> Everyone, regardless of rank, is expected to help scrub the decks, patch conduits, and keep the ship flying.</li>
                        </ol>
                        
                        <h3>📜 OOC Rules, Limits & Consent</h3>
                        <ol style="font-size: 13px;">
                            <li><strong>ADULT THEMES & ERP:</strong> This is a strictly 18+ environment. Consent is REQUIRED.</li>
                            <li><strong>NO GOD-MODDING:</strong> Your character is not invincible and must have weaknesses.</li>
                            <li><strong>NO META-GAMING:</strong> Do not use OOC information for IC situations.</li>
                            <li><strong>CONSEQUENCES:</strong> IC actions have IC consequences.</li>
                            <li><strong>IC vs. OOC:</strong> Keep OOC chatter to a minimum. Use (( brackets )) for OOC.</li>
                            <li><strong>APPEARANCE:</strong> No child/underage avatars. Characters must look realistic and fit within sci-fi setting.</li>
                            <li><strong>NO GRIEFING:</strong> Do not use weapons, pushers, or disruptive HUDs inside the shuttle.</li>
                            <li><strong>HAVE FUN:</strong> Above all else, we are here to tell a great story together!</li>
                        </ol>
                    </div>
                `;
                break;

            case "CREW REGISTRY":
                header.textContent = "CREW REGISTRY";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>XSV STARDUST CREW MANIFEST</h2>
                        <div class="crew-grid">
                            <div class="crew-member blue">
                                <img class="crew-member-image" src="assets/crew/crew_stellar.png" alt="Stellar Yuki portrait">
                                <h3>Stellar Yuki - CAPTAIN</h3>
                                <p><strong>Role:</strong> Command & Navigation</p>
                                <p><strong>Rank:</strong> 🟡🟡🟡🟡 (Captain)</p>
                                <p><strong>Specialty:</strong> Tactical planning, stellar navigation, diplomatic negotiation</p>
                                <p><strong>Status:</strong> Active</p>
                                <p>Veteran pilot with 12+ years in deep space operations. Expert in reading space anomalies and charting safe routes through hostile territories.</p>
                                <p><strong>Medical Telemetry:</strong> Health 94% | Heart Rate 78 bpm | Hydration 71% | Bladder 43% | Stress Load 38%</p>
                                <p><strong>Notes:</strong> Mild fatigue markers after extended bridge shifts; no duty restrictions.</p>
                            </div>

                            <div class="crew-member blue">
                                <img class="crew-member-image" src="assets/crew/crew_sora.png" alt="Sora Skyward portrait">
                                <h3>Sora Skyward - COMMANDING OFFICER</h3>
                                <p><strong>Role:</strong> Ship Command & Fleet Coordination</p>
                                <p><strong>Rank:</strong> 🟡🟡⚫ (Lieutenant Commander)</p>
                                <p><strong>Specialty:</strong> Fleet coordination, formation command, multi-vessel tactical planning</p>
                                <p><strong>Status:</strong> Active</p>
                                <p>Sora oversees live command flow aboard the Stardust and excels at coordinating allied ships during high-pressure operations.</p>
                                <p><strong>Medical Telemetry:</strong> Health 96% | Heart Rate 74 bpm | Hydration 79% | Bladder 34% | Stress Load 31%</p>
                                <p><strong>Notes:</strong> Excellent command resilience; cleared for prolonged tactical control sessions.</p>
                            </div>
                            
                            <div class="crew-member red">
                                <img class="crew-member-image" src="assets/crew/crew_aika.png" alt="Aika portrait">
                                <h3>Aika - OPERATIONS OFFICER</h3>
                                <p><strong>Role:</strong> Systems Management & Logistics</p>
                                <p><strong>Rank:</strong> 🟡🟡 (Lieutenant)</p>
                                <p><strong>Specialty:</strong> Ship systems diagnostics, crew coordination, problem-solving</p>
                                <p><strong>Status:</strong> Active</p>
                                <p>Brilliant systems engineer with expertise in AI integration. Can troubleshoot almost any shipboard system under pressure.</p>
                                <p><strong>Medical Telemetry:</strong> Health 97% | Heart Rate 72 bpm | Hydration 84% | Bladder 29% | Stress Load 27%</p>
                                <p><strong>Notes:</strong> Optimal cognitive response profile; cleared for high-intensity operations duty.</p>
                            </div>
                            
                            <div class="crew-member red">
                                <img class="crew-member-image" src="assets/crew/crew_roman.png" alt="Roman portrait">
                                <h3>Roman - CHIEF ENGINEER</h3>
                                <p><strong>Role:</strong> Engineering & Reactor Operations</p>
                                <p><strong>Rank:</strong> 🟡🟡🟡⚫ (Commander)</p>
                                <p><strong>Specialty:</strong> Power systems, propulsion, exotic technology</p>
                                <p><strong>Status:</strong> Active</p>
                                <p>Expert in experimental drive systems and weapons engineering. Keeps the Stardust running on a shoestring budget through sheer ingenuity.</p>
                                <p><strong>Medical Telemetry:</strong> Health 89% | Heart Rate 86 bpm | Hydration 63% | Bladder 67% | Stress Load 55%</p>
                                <p><strong>Notes:</strong> Elevated stress from engineering workloads; advised short recovery cycles between reactor calibrations.</p>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case "ASTROMETRICS":
                header.textContent = "ASTROMETRICS";
                mainContent.style.padding = "0";
                mainContent.style.height = "calc(100vh - 70px)";
                mainContent.style.flex = "1";
                mainContent.style.overflow = "hidden";
                mainContent.innerHTML = `
                    <div class="astrometrics-container">
                        <canvas id="starMapCanvas"></canvas>
                        <div class="map-hud">
                            <button id="mapZoomOutBtn" type="button">-</button>
                            <span id="mapZoomReadout">100%</span>
                            <button id="mapZoomInBtn" type="button">+</button>
                            <button id="mapResetBtn" type="button">Center</button>
                            <button id="mapTerritoryToggleBtn" type="button">Territories: ON</button>
                            <button id="mapRouteModeBtn" type="button">Route Plot: OFF</button>
                            <button id="mapRouteClearBtn" type="button">Clear Route</button>
                            <button id="mapRoutePrefBtn" type="button">Lane Mode: FAST</button>
                            <button id="mapRouteSaveBtn" type="button">Save Route</button>
                            <select id="mapRoutePresetSelect">
                                <option value="">Route Presets</option>
                            </select>
                            <button id="mapRouteLoadBtn" type="button">Load Route</button>
                            <button id="mapTimelinePlayBtn" type="button">Play Track</button>
                            <input id="mapTimelineScrub" type="range" min="0" max="1000" value="0">
                            <span id="mapTimelineLabel">Track T+00:00</span>
                        </div>
                        <div class="map-filter-panel">
                            <label><span>Search</span><input id="mapSearchInput" type="text" placeholder="Find by name..."></label>
                            <label><input id="mapFilterTerritoryRings" type="checkbox" checked> Territory Rings</label>
                            <label><input id="mapFilterSystems" type="checkbox" checked> Systems</label>
                            <label><input id="mapFilterStations" type="checkbox" checked> Stations</label>
                            <label><input id="mapFilterAnomalies" type="checkbox" checked> Anomalies / Wormholes</label>
                            <label><input id="mapFilterMoons" type="checkbox" checked> Moons</label>
                        </div>
                        <div id="mapRouteReadout" class="map-route-readout">Route: 0 waypoints</div>
                        <div id="mapHoverCard" class="map-hover-card" style="display:none;"></div>
                        <div class="map-help">Scroll: Zoom • Drag: Pan • Click: Open Databank</div>
                    </div>
                    <div id="mapInfoPanel" class="db-panel">
                        <div class="db-panel-inner">
                            <button id="close-map-panel" class="db-panel-close">Close</button>
                            <h2 id="selectedName"></h2>
                            <div id="selectedInfo" class="db-panel-content"></div>
                        </div>
                    </div>
                `;
                initializeHierarchicalMap();
                break;

            case "STORAGE BANKS":
                header.textContent = "STORAGE BANKS";
                mainContent.innerHTML = "";
                databanks.classList.remove("hidden");
                loadCategories();
                break;

            case "CAPTAIN'S LOG":
                renderCaptainLogContent();
                break;

            case "DOCKED VESSELS":
                header.textContent = "DOCKED VESSELS";
                mainContent.innerHTML = `
                    <div class="content-section">
                        <h2>XSV STARDUST - VESSEL STATUS REPORT</h2>
                        <div class="vessel-gallery">
                            <figure>
                                <img src="assets/stardust/stardust_ext_1.png" alt="XSV Stardust exterior view one">
                                <figcaption>Exterior profile - forward starboard silhouette.</figcaption>
                            </figure>
                            <figure>
                                <img src="assets/stardust/stardust_ext_2.png" alt="XSV Stardust exterior view two">
                                <figcaption>Exterior profile - mission-ready hull with refit geometry.</figcaption>
                            </figure>
                            <figure>
                                <img src="assets/stardust/stardust_int_1.png" alt="XSV Stardust interior view one">
                                <figcaption>Interior deck section - primary command access corridor.</figcaption>
                            </figure>
                            <figure>
                                <img src="assets/stardust/stardust_int_2.png" alt="XSV Stardust interior view two">
                                <figcaption>Interior deck section - crew activity and support space.</figcaption>
                            </figure>
                            <figure>
                                <img src="assets/stardust/stardust_int_3.png" alt="XSV Stardust interior view three">
                                <figcaption>Interior deck section - engineering and subsystem routing.</figcaption>
                            </figure>
                            <figure>
                                <img src="assets/stardust/stardust_int_4.png" alt="XSV Stardust interior view four">
                                <figcaption>Interior deck section - mission operations and habitation detail.</figcaption>
                            </figure>
                        </div>
                        
                        <div class="vessel-stats">
                            <div class="stat-group">
                                <h3>Hull & Structure</h3>
                                <p><strong>Hull Integrity:</strong> 94% <span style="color: #44dd44;">■■■■■■■■■□</span></p>
                                <p><strong>Shielding:</strong> 87% <span style="color: #4488ff;">■■■■■■■■□□</span></p>
                                <p><strong>Hull Classification:</strong> Type-17 Argo (Modified)</p>
                                <p><strong>Registry:</strong> XSV-74877-C</p>
                                <p><strong>Lineage:</strong> STARDUST from the USS VALKYRIE</p>
                                <p><strong>Length:</strong> 32 meters</p>
                                <p><strong>Displacement:</strong> 450 metric tons</p>
                                <p><strong>Crew Quarters:</strong> 3 crew pods + 1 medical bay</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Power Systems</h3>
                                <p><strong>Primary Reactor:</strong> Quantum-Core Mark VII @ 100% <span style="color: #ffff88;">▰▰▰▰▰▰▰▰▰▰</span></p>
                                <p><strong>Backup Battery:</strong> 74 hours autonomy remaining</p>
                                <p><strong>Power Distribution:</strong> Nominal</p>
                                <p><strong>Capacitor Banks:</strong> Charged</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Propulsion</h3>
                                <p><strong>Primary Engines:</strong> Fluid Warp Drive (Experimental) @ 85% efficiency</p>
                                <p><strong>RCS Thrusters:</strong> 12x functional</p>
                                <p><strong>Max Velocity:</strong> Warp 4.7 (Standard cruise: Warp 2.1)</p>
                                <p><strong>Fuel Status:</strong> 91% <span style="color: #ff9944;">■■■■■■■■■◻</span></p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Armaments</h3>
                                <p><strong>Plasma Cannons:</strong> 2x (70% charge)</p>
                                <p><strong>Torpedo Tubes:</strong> 1x (5 torpedoes loaded)</p>
                                <p><strong>Point Defense:</strong> 4x rapid-fire pulse cannons</p>
                                <p><strong>EMP Generator:</strong> Available (1 hour cooldown)</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Systems & Sensors</h3>
                                <p><strong>Sensor Array:</strong> Long-range, 8 light-year radius</p>
                                <p><strong>Communications:</strong> Full-spectrum, encrypted channels active</p>
                                <p><strong>AI Assistant:</strong> Online and operational</p>
                                <p><strong>Life Support:</strong> All green - 2 years consumables aboard</p>
                                <p><strong>Cloaking Device:</strong> Experimental (70% operational, 4-hour duration max)</p>
                            </div>
                            
                            <div class="stat-group">
                                <h3>Maintenance Schedule</h3>
                                <p><strong>Last Major Overhaul:</strong> 6 months ago</p>
                                <p><strong>Next Scheduled Maintenance:</strong> 2 months</p>
                                <p><strong>Known Issues:</strong> Starboard deflector plate alignment (minor)</p>
                                <p><strong>Recommended Repairs:</strong> Thruster D-4 replacement</p>
                            </div>

                            <div class="stat-group">
                                <h3>Refit Mk II - 32m Upgrade</h3>
                                <p><strong>Hull Extension:</strong> +6 meters modular spine insert</p>
                                <p><strong>Interior Gains:</strong> Expanded engineering crawlspace + upgraded storage lockers</p>
                                <p><strong>Systems Added:</strong> Secondary coolant manifold, reinforced EPS routing, extra life-support buffer</p>
                                <p><strong>Tradeoffs:</strong> Slight turn-rate loss at impulse and increased maintenance complexity</p>
                                <p><strong>Crew Verdict:</strong> Worth it for endurance missions and better onboard logistics</p>
                            </div>

                            <div class="stat-group">
                                <h3>Water & Life Support Fluids</h3>
                                <p><strong>Potable Water:</strong> 68% (4,120 L reserve)</p>
                                <p><strong>Graywater Recovery:</strong> 87% cycle efficiency</p>
                                <p><strong>Coolant Loop Volume:</strong> 1,640 L (Nominal pressure)</p>
                                <p><strong>Sonic Hygiene Ration:</strong> 3.2 min/crew/day</p>
                                <p><strong>Hydroponics Nutrient Mix:</strong> 54% stock</p>
                            </div>

                            <div class="stat-group">
                                <h3>Particle & Reactor Feedstock</h3>
                                <p><strong>Deuterium Slurry:</strong> 73% (reactor grade)</p>
                                <p><strong>Antimatter Pods:</strong> 18 secured micro-cells</p>
                                <p><strong>Plasma Particle Density:</strong> 2.8e14 particles/cm3</p>
                                <p><strong>Warp Injector Purity:</strong> 96.1%</p>
                                <p><strong>Containment Loss Rate:</strong> 0.004% / hour</p>
                            </div>

                            <div class="stat-group">
                                <h3>Waste Simulation & Recycling</h3>
                                <p><strong>Solid Waste Compactors:</strong> 41% capacity used</p>
                                <p><strong>Bio-Waste Digestor:</strong> Active (batch cycle: 3h 20m)</p>
                                <p><strong>CO2 Scrubber Saturation:</strong> 26%</p>
                                <p><strong>Trace Toxin Filters:</strong> 92% service life remaining</p>
                                <p><strong>Reclamation Output:</strong> 18.4 kg reusable matter/day</p>
                            </div>

                            <div class="stat-group">
                                <h3>Cargo, Stores & Replicator Feed</h3>
                                <p><strong>Cargo Bay Utilization:</strong> 62%</p>
                                <p><strong>Replicator Matter Reserve:</strong> 39% (ration protocol active)</p>
                                <p><strong>Medical Consumables:</strong> 81% stock</p>
                                <p><strong>Emergency Rations:</strong> 97 crew-days</p>
                                <p><strong>Spare EPS Couplings:</strong> 24 units aboard</p>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
    });
});

closePanelBtn.addEventListener("click", () => {
    closePanel();
});

// Astrometrics Map
async function initializeHierarchicalMap() {
    const canvas = document.getElementById("starMapCanvas");
    if (!canvas) return;

    try {
        if (mapAbortController) mapAbortController.abort();
        mapAbortController = new AbortController();
        const { signal } = mapAbortController;

        const [{ starSystems }, { stations }, { db_vessels }, { default: orbitsData }] = await Promise.all([
            import("../data/db_star_systems.js"),
            import("../data/db_stations.js"),
            import("../data/db_vessels.js"),
            import("../data/db_orbits.js")
        ]);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mapInfoPanel = document.getElementById("mapInfoPanel");
        const selectedName = document.getElementById("selectedName");
        const selectedInfo = document.getElementById("selectedInfo");
        const closeMapPanelBtn = document.getElementById("close-map-panel");
        const zoomInBtn = document.getElementById("mapZoomInBtn");
        const zoomOutBtn = document.getElementById("mapZoomOutBtn");
        const resetBtn = document.getElementById("mapResetBtn");
        const zoomReadout = document.getElementById("mapZoomReadout");
        const territoryToggleBtn = document.getElementById("mapTerritoryToggleBtn");
        const routeModeBtn = document.getElementById("mapRouteModeBtn");
        const routeClearBtn = document.getElementById("mapRouteClearBtn");
        const routePrefBtn = document.getElementById("mapRoutePrefBtn");
        const routeSaveBtn = document.getElementById("mapRouteSaveBtn");
        const routeLoadBtn = document.getElementById("mapRouteLoadBtn");
        const routePresetSelect = document.getElementById("mapRoutePresetSelect");
        const routeReadout = document.getElementById("mapRouteReadout");
        const hoverCard = document.getElementById("mapHoverCard");
        const timelinePlayBtn = document.getElementById("mapTimelinePlayBtn");
        const timelineScrub = document.getElementById("mapTimelineScrub");
        const timelineLabel = document.getElementById("mapTimelineLabel");
        const filterTerritoryRingsInput = document.getElementById("mapFilterTerritoryRings");
        const filterSystemsInput = document.getElementById("mapFilterSystems");
        const filterStationsInput = document.getElementById("mapFilterStations");
        const filterAnomaliesInput = document.getElementById("mapFilterAnomalies");
        const filterMoonsInput = document.getElementById("mapFilterMoons");
        const searchInput = document.getElementById("mapSearchInput");

        const sectorDefs = [
            { id: 1, name: "VARIX CORE", x: 0.8, y: 0.2, radius: 12.8, color: "#ff7f50" },
            { id: 2, name: "CRUX FRONTIER", x: -13.8, y: 8.8, radius: 12.6, color: "#f3b25f" },
            { id: 3, name: "VAR LUPRA CORRIDOR", x: 0.9, y: 16.2, radius: 11.9, color: "#ff9d7a" },
            { id: 4, name: "ASTRAL EXPANSE", x: 15.2, y: 9.2, radius: 11.7, color: "#ffb580" },
            { id: 5, name: "CARDINAL REACH", x: 10.1, y: -9.2, radius: 12.1, color: "#e37b6b" },
            { id: 6, name: "SPIRAL ARC", x: -1.4, y: -16.6, radius: 12.0, color: "#f39a6c" },
            { id: 7, name: "NANO CLUSTER ZONE", x: 16.9, y: -5.9, radius: 11.1, color: "#d97ecf" },
            { id: 8, name: "OUTER DARK", x: -15.8, y: -6.4, radius: 12.7, color: "#8b8dbf" }
        ];

        const stationById = new Map(stations.map((station) => [station.id, station]));
        const stationAnchors = {
            day_star: { x: 12.6, y: 18.4 },
            night_star: { x: 10.0, y: 18.0 },
            terminus_outpost: { x: -20.2, y: 10.3 },
            outpost_79: { x: 1.4, y: 6.8 }
        };
        const vesselData = db_vessels.find((v) => v.id === "xsv_stardust");

        const systemObjects = starSystems.map((system) => ({
            id: system.id,
            kind: "system",
            typeLabel: system.type.replace(/_/g, " ").toUpperCase(),
            title: system.title,
            content: system.content,
            x: system.position.x,
            y: system.position.y,
            color: "#66b8ff"
        }));
        const stationObjects = Object.entries(stationAnchors)
            .map(([id, coords]) => {
                const station = stationById.get(id);
                if (!station) return null;
                return {
                    id: station.id,
                    kind: "station",
                    typeLabel: "STATION",
                    title: station.title,
                    content: station.content,
                    x: coords.x,
                    y: coords.y,
                    color: "#ffe07a"
                };
            })
            .filter(Boolean);
        const wormholeObjects = [
            {
                id: "warren_wormhole",
                kind: "wormhole",
                typeLabel: "WORMHOLE",
                title: "Warren Wormhole",
                content: `
⦿ Object: Warren Wormhole

Stable gateway corridor linking the Crux theatre to Federation-adjacent space.
Traffic requires tight approach vectors and active navigation beacons.
                `,
                x: 2.4,
                y: 9.4,
                color: "#85f7ff"
            }
        ];
        const stardustObject = {
            id: "xsv_stardust",
            kind: "ship",
            typeLabel: "ACTIVE VESSEL",
            title: "XSV Stardust",
            content: vesselData ? vesselData.content : "<p>Current mission vessel marker.</p>",
            x: 9.4,
            y: 18.8,
            color: "#ff75ff"
        };
        const stardustAnchor = { x: 9.4, y: 18.8 };
        const mapObjects = [...systemObjects, ...stationObjects, ...wormholeObjects, stardustObject];
        const orbitCache = new Map();

        const typeRender = {
            system: { radius: 3.4, color: "#66b8ff" },
            station: { radius: 3.8, color: "#ffe07a" },
            wormhole: { radius: 5.2, color: "#85f7ff" },
            ship: { radius: 4.5, color: "#ff75ff" }
        };
        const worldScale = 22;
        const minZoom = 0.55;
        const maxZoom = 20;
        let zoom = 1.3;
        let panX = 0;
        let panY = 0;
        let selectedObject = null;
        let hoveredObject = null;
        const interactiveNodes = [];
        let isDragging = false;
        let dragMoved = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let dragPanX = 0;
        let dragPanY = 0;
        let showTerritoryRings = true;
        let routeMode = false;
        const routeWaypoints = [];
        const routeStorageKey = "xsv-stardust-route-presets";
        let routePreference = "fast";
        let routePresets = [];
        let timelinePlaying = false;
        let timelineProgress = 0;
        let timelineSpeed = 0.028;
        let routeProgress = 0;
        const routeSpeed = 0.05;
        const filters = {
            systems: true,
            stations: true,
            anomalies: true,
            moons: true,
            search: ""
        };

        const factionTerritories = [
            { id: "isrb", name: "ISRB Coalition", sectors: [2, 3], color: "#6ca6ff" },
            { id: "astral", name: "Astral Supply Reach", sectors: [1, 4], color: "#ffba66" },
            { id: "independent", name: "Independent Frontier", sectors: [5, 6], color: "#95df8f" },
            { id: "veil", name: "Outer Threat Zone", sectors: [7, 8], color: "#bf8fff" }
        ];
        const hazardZones = [
            { id: "warren-shear", x: 2.4, y: 9.4, radius: 4.2, severity: 0.9, name: "Warren Shear Field" },
            { id: "void-bloom", x: -15.8, y: -6.4, radius: 5.4, severity: 0.8, name: "Outer Dark Void Bloom" },
            { id: "nano-storm", x: 16.9, y: -5.9, radius: 4.0, severity: 0.65, name: "Nano Cluster Storm Cell" },
            { id: "varix-current", x: 0.9, y: 16.2, radius: 3.8, severity: 0.5, name: "Varix Current Drift" }
        ];

        const stardustTimeline = [
            { t: 0.0, x: 1.3, y: 6.7, label: "Outpost 79 Departure" },
            { t: 0.2, x: 2.4, y: 9.4, label: "Warren Wormhole Approach" },
            { t: 0.45, x: 10.0, y: 18.0, label: "Night Star Transit" },
            { t: 0.72, x: 12.6, y: 18.4, label: "Day Star Contract Window" },
            { t: 1.0, x: 9.4, y: 18.8, label: "Var Lupra Holding Pattern" }
        ];

        function worldToScreen(x, y) {
            return {
                sx: canvas.width / 2 + (x + panX) * worldScale * zoom,
                sy: canvas.height / 2 + (y + panY) * worldScale * zoom
            };
        }

        function screenToWorld(sx, sy) {
            return {
                x: (sx - canvas.width / 2) / (worldScale * zoom) - panX,
                y: (sy - canvas.height / 2) / (worldScale * zoom) - panY
            };
        }

        function resizeCanvas() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            draw();
        }

        function getScreenRadius(object) {
            const cfg = typeRender[object.kind] || typeRender.system;
            const base = cfg.radius;
            return Math.max(3, base * (0.7 + Math.min(zoom, 2.2) * 0.45));
        }

        function hashString(value) {
            let hash = 0;
            for (let i = 0; i < value.length; i += 1) {
                hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
            }
            return hash || 1;
        }

        function titleFromId(value) {
            return String(value || "Uncataloged")
                .replace(/[_-]+/g, " ")
                .replace(/\b\w/g, (m) => m.toUpperCase());
        }

        function generatedCelestialName(seed, index, category) {
            const prefixes = ["Astra", "Vel", "Khar", "Nero", "Tali", "Voss", "Iri", "Solis", "Eldra", "Myr"];
            const suffixes = ["ion", "ara", "eth", "os", "is", "ae", "or", "um", "yx", "el"];
            const first = prefixes[(seed + index * 3 + category.length) % prefixes.length];
            const last = suffixes[(seed + index * 5 + category.charCodeAt(0)) % suffixes.length];
            const designator = (seed + index * 11) % 89 + 11;
            return `${first}${last}-${designator}`;
        }

        function generatePlanetProfile(systemId, planetId, index) {
            const seed = hashString(`${systemId}:${planetId}:${index}`);
            const classes = ["M-Class", "L-Class", "D-Class", "Y-Class", "K-Class", "N-Class", "T-Class"];
            const atmospheres = ["Nitrogen-Oxygen", "Thin Argon", "Methane-heavy", "Ionized", "CO2 Dense", "Ammonia Trace"];
            const bios = ["Sparse microbial", "No confirmed life", "Complex biosphere", "Subsurface extremophile", "Engineered flora traces"];
            const hazards = ["Magnetosphere storms", "Tectonic volatility", "Radiation pockets", "Cryo-front collapse", "Subspace echo pockets"];
            return {
                className: classes[seed % classes.length],
                atmosphere: atmospheres[(seed >> 2) % atmospheres.length],
                gravity: (0.4 + (seed % 190) / 100).toFixed(2),
                biosphere: bios[(seed >> 4) % bios.length],
                hazard: hazards[(seed >> 6) % hazards.length],
                population: seed % 4 === 0 ? "Uninhabited" : (seed % 3 === 0 ? "Outpost-scale" : "Expeditionary")
            };
        }

        function generateMoonProfile(systemId, planetId, moonId) {
            const seed = hashString(`${systemId}:${planetId}:${moonId}`);
            const composition = ["Silicate-rock", "Nickel-ice", "Basaltic core", "Porous regolith", "Dense metallic"];
            const note = ["Tidal fissures", "Ancient impact basin", "Cryo-geyser fields", "Static discharge plains", "Orbital resonance lock"];
            return {
                composition: composition[seed % composition.length],
                note: note[(seed >> 3) % note.length]
            };
        }

        function hazardPenaltyAt(x, y) {
            let total = 0;
            hazardZones.forEach((zone) => {
                const d = Math.hypot(x - zone.x, y - zone.y);
                if (d < zone.radius) {
                    total += (1 - d / zone.radius) * zone.severity;
                }
            });
            return total;
        }

        function getEffectiveRoutePath() {
            if (routeWaypoints.length < 2) return routeWaypoints.slice();
            if (routePreference === "fast") return routeWaypoints.slice();

            const safePath = [routeWaypoints[0]];
            for (let i = 1; i < routeWaypoints.length; i += 1) {
                const from = safePath[safePath.length - 1];
                const to = routeWaypoints[i];
                const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
                const danger = hazardPenaltyAt(mid.x, mid.y);
                if (danger > 0.35) {
                    const bend = Math.max(1.4, danger * 3.2);
                    const vx = to.x - from.x;
                    const vy = to.y - from.y;
                    const mag = Math.max(0.001, Math.hypot(vx, vy));
                    const nx = -vy / mag;
                    const ny = vx / mag;
                    safePath.push({
                        title: `Safe Corridor ${i}`,
                        x: mid.x + nx * bend,
                        y: mid.y + ny * bend,
                        generated: true
                    });
                }
                safePath.push(to);
            }
            return safePath;
        }

        function populateRoutePresetSelect() {
            if (!routePresetSelect) return;
            routePresetSelect.innerHTML = `<option value="">Route Presets</option>`;
            routePresets.forEach((preset) => {
                const opt = document.createElement("option");
                opt.value = preset.id;
                opt.textContent = preset.name;
                routePresetSelect.appendChild(opt);
            });
        }

        function loadRoutePresets() {
            try {
                const raw = localStorage.getItem(routeStorageKey);
                routePresets = raw ? JSON.parse(raw) : [];
            } catch {
                routePresets = [];
            }
            if (!Array.isArray(routePresets)) routePresets = [];
            populateRoutePresetSelect();
        }

        function saveRoutePresets() {
            try {
                localStorage.setItem(routeStorageKey, JSON.stringify(routePresets));
            } catch {
                // ignore persistence failures
            }
            populateRoutePresetSelect();
        }

        function updateHoverCard(entry) {
            if (!hoverCard) return;
            if (!entry) {
                hoverCard.style.display = "none";
                return;
            }
            hoverCard.style.display = "block";
            hoverCard.innerHTML = `
                <div><strong>${entry.title || "Uncataloged"}</strong></div>
                <div style="color:#9fc0ff;">${entry.typeLabel || "Unknown Type"}</div>
                ${Number.isFinite(entry.mapX) && Number.isFinite(entry.mapY) ? `<div>Coords: ${entry.mapX.toFixed(2)}, ${entry.mapY.toFixed(2)}</div>` : ""}
            `;
        }

        function getTimelinePosition(progress) {
            const clamped = Math.max(0, Math.min(1, progress));
            for (let i = 0; i < stardustTimeline.length - 1; i += 1) {
                const a = stardustTimeline[i];
                const b = stardustTimeline[i + 1];
                if (clamped >= a.t && clamped <= b.t) {
                    const local = (clamped - a.t) / Math.max(0.0001, b.t - a.t);
                    return {
                        x: a.x + (b.x - a.x) * local,
                        y: a.y + (b.y - a.y) * local,
                        label: `${a.label} → ${b.label}`,
                        segment: i + 1
                    };
                }
            }
            const last = stardustTimeline[stardustTimeline.length - 1];
            return { x: last.x, y: last.y, label: last.label, segment: stardustTimeline.length - 1 };
        }

        function getRoutePosition(progress) {
            if (routeWaypoints.length < 2) return null;

            const segments = [];
            let total = 0;
            for (let i = 1; i < routeWaypoints.length; i += 1) {
                const from = routeWaypoints[i - 1];
                const to = routeWaypoints[i];
                const length = Math.max(0.0001, Math.hypot(to.x - from.x, to.y - from.y));
                total += length;
                segments.push({ from, to, length });
            }

            let target = Math.max(0, Math.min(1, progress)) * total;
            for (let i = 0; i < segments.length; i += 1) {
                const segment = segments[i];
                if (target <= segment.length || i === segments.length - 1) {
                    const local = Math.max(0, Math.min(1, target / segment.length));
                    return {
                        x: segment.from.x + (segment.to.x - segment.from.x) * local,
                        y: segment.from.y + (segment.to.y - segment.from.y) * local,
                        label: `${segment.from.title} → ${segment.to.title}`,
                        segment: i + 1
                    };
                }
                target -= segment.length;
            }
            return null;
        }

        function updateTimelineReadout() {
            const usingRoute = routeWaypoints.length >= 2;
            const progress = usingRoute ? routeProgress : timelineProgress;
            const minutes = Math.floor(progress * 240);
            const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
            const mm = String(minutes % 60).padStart(2, "0");
            const state = usingRoute ? getRoutePosition(progress) : getTimelinePosition(progress);
            const modeLabel = usingRoute ? "Route" : "Track";
            if (timelineLabel && state) timelineLabel.textContent = `${modeLabel} T+${hh}:${mm} • ${state.label}`;
            if (timelineScrub && Number(timelineScrub.value) !== Math.round(progress * 1000)) {
                timelineScrub.value = String(Math.round(progress * 1000));
            }
        }

        function updateStardustFromTimeline(nowSeconds) {
            const usingRoute = routeWaypoints.length >= 2;
            const timelineState = usingRoute ? getRoutePosition(routeProgress) : getTimelinePosition(timelineProgress);
            if (!timelineState) return;
            const driftX = Math.cos(nowSeconds * 0.48) * 0.14;
            const driftY = Math.sin(nowSeconds * 0.42) * 0.11;
            stardustObject.x = timelineState.x + driftX;
            stardustObject.y = timelineState.y + driftY;
            stardustAnchor.x = timelineState.x;
            stardustAnchor.y = timelineState.y;
            stardustObject.content = `
                <h3>XSV Stardust - Live Position Feed</h3>
                <p><strong>Current Vector:</strong> (${stardustObject.x.toFixed(2)}, ${stardustObject.y.toFixed(2)})</p>
                <p><strong>${usingRoute ? "Route Segment" : "Track Segment"}:</strong> ${timelineState.label}</p>
                <p><strong>Playback:</strong> ${timelinePlaying ? "Active" : "Paused"}</p>
                <p><strong>Telemetry:</strong> Deflector harmonics stable, long-range sensors nominal, warp field envelope within mission tolerance.</p>
                ${vesselData ? vesselData.content : ""}
            `;
        }

        function generateStarProfile(systemObject, systemData) {
            const seed = hashString(systemObject.id);
            const spectralClasses = ["O", "B", "A", "F", "G", "K", "M"];
            const luminosityClasses = ["V", "IV", "III"];
            const spectral = spectralClasses[seed % spectralClasses.length];
            const subclass = (seed % 9) + 1;
            const luminosity = luminosityClasses[(seed >> 3) % luminosityClasses.length];
            const multiplicity = systemObject.typeLabel.includes("BINARY")
                ? "Binary"
                : systemObject.typeLabel.includes("TRINARY")
                    ? "Trinary"
                    : ((seed % 5) === 0 ? "Binary" : "Single");
            const temperature = 2900 + (seed % 6200);
            const trekTrait = [
                "minor subspace turbulence",
                "tachyon-rich corona",
                "sporadic polar flare ribbons",
                "stable verteron wake",
                "elevated neutrino output"
            ][seed % 5];
            const planetCount = Array.isArray(systemData?.planets) ? systemData.planets.length : 0;
            return {
                designation: `${spectral}${subclass}${luminosity}`,
                multiplicity,
                temperature,
                trekTrait,
                planetCount
            };
        }

        function matchesSearch(text) {
            if (!filters.search) return true;
            return String(text || "").toLowerCase().includes(filters.search);
        }

        function isTypeVisible(kind) {
            if (kind === "system") return filters.systems;
            if (kind === "station") return filters.stations;
            if (kind === "wormhole" || kind === "anomaly") return filters.anomalies;
            return true;
        }

        function getAugmentedOrbitData(systemObject) {
            if (orbitCache.has(systemObject.id)) return orbitCache.get(systemObject.id);

            const base = orbitsData[systemObject.id] || { planets: [] };
            const planets = Array.isArray(base.planets)
                ? base.planets.map((planet) => ({
                    id: planet.id,
                    name: titleFromId(planet.id),
                    radius: planet.radius,
                    angle: planet.angle,
                    size: planet.size,
                    moons: Array.isArray(planet.moons) ? planet.moons.map((moon) => ({
                        id: moon.id,
                        name: titleFromId(moon.id),
                        radius: moon.radius,
                        angle: moon.angle,
                        size: moon.size
                    })) : []
                }))
                : [];

            const normalizedType = systemObject.typeLabel.toLowerCase();
            const targetCount = normalizedType.includes("cluster") ? 6 : normalizedType.includes("anomaly") ? 4 : 5;
            const systemHash = hashString(systemObject.id);
            let radiusCursor = planets.length
                ? Math.max(...planets.map((planet) => planet.radius || 20)) + 18
                : 28 + (systemHash % 8);

            while (planets.length < targetCount) {
                const index = planets.length;
                const planetName = generatedCelestialName(systemHash, index, "planet");
                planets.push({
                    id: `orbital-${index + 1}`,
                    name: planetName,
                    radius: radiusCursor,
                    angle: (systemHash * (index + 3) * 17) % 360,
                    size: 6 + ((systemHash + index * 5) % 8),
                    moons: []
                });
                radiusCursor += 18 + ((systemHash + index) % 9);
            }

            planets.forEach((planet, index) => {
                if (!planet.name) planet.name = titleFromId(planet.id);
                const moonSeed = hashString(`${systemObject.id}:${planet.id}`);
                const targetMoonCount = planet.moons.length || ((moonSeed + index) % 3);
                let moonRadiusCursor = 9;
                while (planet.moons.length < targetMoonCount) {
                    const moonIndex = planet.moons.length;
                    planet.moons.push({
                        id: `moon-${index + 1}-${moonIndex + 1}`,
                        name: generatedCelestialName(moonSeed, moonIndex, "moon"),
                        radius: moonRadiusCursor,
                        angle: (moonSeed * (moonIndex + 2) * 29) % 360,
                        size: 2 + ((moonSeed + moonIndex) % 3)
                    });
                    moonRadiusCursor += 5 + ((moonSeed + moonIndex) % 4);
                }
                planet.moons = planet.moons.map((moon) => ({
                    ...moon,
                    name: moon.name || titleFromId(moon.id)
                }));
            });

            const anomalies = Array.isArray(base.anomalies)
                ? base.anomalies.map((anomaly, index) => ({
                    id: anomaly.id || `anomaly-${index + 1}`,
                    name: titleFromId(anomaly.id || `anomaly-${index + 1}`),
                    radius: anomaly.radius ?? (110 + index * 18),
                    angle: anomaly.angle ?? ((systemHash * (index + 7) * 13) % 360)
                }))
                : [];
            if (!anomalies.length) {
                anomalies.push({
                    id: "resonance-shear",
                    name: "Resonance Shear",
                    radius: 110 + (systemHash % 40),
                    angle: (systemHash * 19) % 360
                });
            }

            const merged = { ...base, planets, anomalies };
            orbitCache.set(systemObject.id, merged);
            return merged;
        }

        function drawRoughSectorPath(sector) {
            const vertexCount = 9;
            const { sx: cx, sy: cy } = worldToScreen(sector.x, sector.y);
            const screenRadius = sector.radius * worldScale * zoom;
            ctx.beginPath();
            for (let i = 0; i < vertexCount; i += 1) {
                const t = i / vertexCount;
                const angle = t * Math.PI * 2;
                const variance = 0.86 + 0.17 * Math.sin(angle * 3 + sector.id * 0.91);
                const r = screenRadius * variance;
                const px = cx + Math.cos(angle) * r;
                const py = cy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
        }

        function drawFactionTerritories() {
            if (!showTerritoryRings || zoom > 5.2) return;
            factionTerritories.forEach((territory) => {
                const linked = territory.sectors
                    .map((sectorId) => sectorDefs.find((sector) => sector.id === sectorId))
                    .filter(Boolean);
                if (!linked.length) return;

                const center = linked.reduce((acc, sector) => ({ x: acc.x + sector.x, y: acc.y + sector.y }), { x: 0, y: 0 });
                center.x /= linked.length;
                center.y /= linked.length;
                const farthest = Math.max(...linked.map((sector) => Math.hypot(sector.x - center.x, sector.y - center.y) + sector.radius));
                const { sx, sy } = worldToScreen(center.x, center.y);
                const sr = farthest * worldScale * zoom * 1.02;

                ctx.strokeStyle = `${territory.color}aa`;
                ctx.fillStyle = `${territory.color}14`;
                ctx.lineWidth = 2.2;
                ctx.setLineDash([8, 5]);
                ctx.beginPath();
                ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = territory.color;
                ctx.font = `bold ${Math.max(10, 10.5 * Math.min(zoom, 1.5))}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(territory.name, sx, sy - sr - 10);
            });
        }

        function drawSectorMap() {
            if (zoom > 3.4) return;
            sectorDefs.forEach((sector) => {
                drawRoughSectorPath(sector);
                ctx.fillStyle = `${sector.color}1a`;
                ctx.fill();
                ctx.lineWidth = 1.4;
                ctx.strokeStyle = `${sector.color}b8`;
                ctx.stroke();

                const { sx, sy } = worldToScreen(sector.x, sector.y);
                ctx.fillStyle = sector.color;
                ctx.font = `bold ${Math.max(10, 11 * zoom)}px Arial`;
                ctx.textAlign = "center";
                if (zoom < 2.15) ctx.fillText(sector.name, sx, sy);
            });
        }

        function drawGrid() {
            const topLeft = screenToWorld(0, 0);
            const bottomRight = screenToWorld(canvas.width, canvas.height);
            const step = 4;
            const startX = Math.floor(topLeft.x / step) * step;
            const endX = Math.ceil(bottomRight.x / step) * step;
            const startY = Math.floor(topLeft.y / step) * step;
            const endY = Math.ceil(bottomRight.y / step) * step;

            ctx.strokeStyle = "#18213d";
            ctx.lineWidth = 1;
            for (let x = startX; x <= endX; x += step) {
                const a = worldToScreen(x, startY);
                const b = worldToScreen(x, endY);
                ctx.beginPath();
                ctx.moveTo(a.sx, a.sy);
                ctx.lineTo(b.sx, b.sy);
                ctx.stroke();
            }
            for (let y = startY; y <= endY; y += step) {
                const a = worldToScreen(startX, y);
                const b = worldToScreen(endX, y);
                ctx.beginPath();
                ctx.moveTo(a.sx, a.sy);
                ctx.lineTo(b.sx, b.sy);
                ctx.stroke();
            }

            const center = worldToScreen(0, 0);
            ctx.strokeStyle = "#ff9944";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(center.sx - 8, center.sy);
            ctx.lineTo(center.sx + 8, center.sy);
            ctx.moveTo(center.sx, center.sy - 8);
            ctx.lineTo(center.sx, center.sy + 8);
            ctx.stroke();
        }

        function drawObjects() {
            const now = performance.now() / 1000;
            updateStardustFromTimeline(now);
            mapObjects.forEach((object) => {
                if (!isTypeVisible(object.kind)) return;
                if (!matchesSearch(`${object.title} ${object.typeLabel}`)) return;
                const { sx, sy } = worldToScreen(object.x, object.y);
                const cfg = typeRender[object.kind] || typeRender.system;
                const radius = getScreenRadius(object);
                const pulse = object.kind === "wormhole" ? 1 + Math.sin(now * 2.5) * 0.12 : 1;

                if (object.kind === "wormhole") {
                    ctx.strokeStyle = cfg.color;
                    ctx.globalAlpha = 0.35;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(sx, sy, radius * 1.9 * pulse, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                ctx.fillStyle = object.color || cfg.color;
                ctx.beginPath();
                ctx.arc(sx, sy, radius * pulse, 0, Math.PI * 2);
                ctx.fill();

                if (selectedObject?.id === object.id || hoveredObject?.id === object.id) {
                    ctx.strokeStyle = "#ffd68f";
                    ctx.lineWidth = 1.8;
                    ctx.beginPath();
                    ctx.arc(sx, sy, radius + 4, 0, Math.PI * 2);
                    ctx.stroke();
                }

                const showLabel = zoom >= 1.25 || selectedObject?.id === object.id || hoveredObject?.id === object.id || object.kind === "ship";
                if (showLabel) {
                    ctx.fillStyle = object.kind === "ship" ? "#ff9dff" : "#ffcf95";
                    ctx.font = `${Math.max(10, 10.5 * Math.min(zoom, 1.7))}px Arial`;
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";
                    ctx.fillText(object.title.split(" (")[0], sx + radius + 4, sy);
                }

                interactiveNodes.push({
                    id: object.id,
                    sx,
                    sy,
                    hitRadius: Math.max(9, radius + 5),
                    entry: {
                        id: object.id,
                        title: object.title,
                        typeLabel: object.typeLabel,
                        content: object.content,
                        mapX: object.x,
                        mapY: object.y
                    }
                });
            });
        }

        function drawSystemOrbitsForObject(systemObject, emphasize) {
            if (!filters.systems) return;
            if (!matchesSearch(`${systemObject.title} ${systemObject.typeLabel}`) && !emphasize) return;
            const data = getAugmentedOrbitData(systemObject);
            if (!data) return;

            const now = performance.now() / 1000;
            const { sx: cx, sy: cy } = worldToScreen(systemObject.x, systemObject.y);
            const orbitScale = Math.max(0.26, Math.min(2.6, zoom * 0.34));
            const starProfile = generateStarProfile(systemObject, data);

            ctx.fillStyle = emphasize ? "#ffe26f" : "#f4d271";
            ctx.beginPath();
            ctx.arc(cx, cy, emphasize ? 5.8 : 4.6, 0, Math.PI * 2);
            ctx.fill();

            interactiveNodes.push({
                id: `${systemObject.id}-star`,
                sx: cx,
                sy: cy,
                hitRadius: 10,
                entry: {
                    id: `${systemObject.id}-star`,
                    title: `${systemObject.title.split(" (")[0]} Primary`,
                    typeLabel: "PRIMARY STAR",
                    content: `
⦿ Primary Star Body

Anchor stellar object for ${systemObject.title}.
• Stellar Classification: ${starProfile.designation}
• Configuration: ${starProfile.multiplicity}
• Estimated Photosphere: ${starProfile.temperature} K
• Orbital Bodies Cataloged: ${starProfile.planetCount}
• Subspace Signature: ${starProfile.trekTrait}
                    `
                },
                mapX: systemObject.x,
                mapY: systemObject.y
            });

            if (filters.anomalies && Array.isArray(data.anomalies)) {
                data.anomalies.forEach((anomaly, anomalyIndex) => {
                    const anomalyAngle = (anomaly.angle * Math.PI) / 180 + now * 0.01;
                    const anomalyDistance = Math.max(35, anomaly.radius * orbitScale * 0.9);
                    const ax = cx + Math.cos(anomalyAngle) * anomalyDistance;
                    const ay = cy + Math.sin(anomalyAngle) * anomalyDistance;
                    const aw = screenToWorld(ax, ay);

                    ctx.fillStyle = "#7ce8ff";
                    ctx.strokeStyle = "#4ec4ff";
                    ctx.lineWidth = 1.3;
                    ctx.beginPath();
                    ctx.moveTo(ax, ay - 5);
                    ctx.lineTo(ax + 5, ay);
                    ctx.lineTo(ax, ay + 5);
                    ctx.lineTo(ax - 5, ay);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    const anomalyName = anomaly.name || titleFromId(anomaly.id || `anomaly-${anomalyIndex + 1}`);
                    if (zoom >= 3.1 || emphasize) {
                        ctx.fillStyle = "#94f0ff";
                        ctx.font = `${Math.max(9, 8.4 * Math.min(zoom, 1.8))}px Arial`;
                        ctx.textAlign = "left";
                        ctx.textBaseline = "middle";
                        ctx.fillText(anomalyName, ax + 8, ay);
                    }

                    interactiveNodes.push({
                        id: `${systemObject.id}-anomaly-${anomaly.id || anomalyIndex}`,
                        sx: ax,
                        sy: ay,
                        hitRadius: 10,
                        entry: {
                            id: `${systemObject.id}-anomaly-${anomaly.id || anomalyIndex}`,
                            title: anomalyName,
                            typeLabel: "SPATIAL ANOMALY",
                            content: `
⦿ ${anomalyName}

Localized anomaly inside ${systemObject.title}. Field instruments report fluctuating gravitic shear, intermittent subspace lensing, and recoverable trace particles.
                            `,
                            mapX: aw.x,
                            mapY: aw.y
                        }
                    });
                });
            }

            if (!Array.isArray(data.planets)) return;
            data.planets.forEach((planet, i) => {
                const ringRadius = planet.radius * orbitScale;
                ctx.strokeStyle = emphasize ? "#7fb2ff" : "#4e7ec8";
                ctx.globalAlpha = emphasize ? 0.6 : 0.42;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1;

                const angle = (planet.angle * Math.PI) / 180 + now * (0.03 + (i + 1) * 0.002);
                const px = cx + Math.cos(angle) * ringRadius;
                const py = cy + Math.sin(angle) * ringRadius;
                const pw = screenToWorld(px, py);
                const planetSize = Math.max(2.4, Math.min(8, (planet.size || 6) * 0.2));
                ctx.fillStyle = "#8de58d";
                ctx.beginPath();
                ctx.arc(px, py, planetSize, 0, Math.PI * 2);
                ctx.fill();

                const planetName = planet.name || titleFromId(planet.id || `orbital-${i + 1}`);
                const showPlanetLabel = (zoom >= 3.2) || (emphasize && zoom >= 2.4);
                if (showPlanetLabel) {
                    ctx.fillStyle = "#b9f1b9";
                    ctx.font = `${Math.max(9, 8.8 * Math.min(zoom, 1.7))}px Arial`;
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";
                    ctx.fillText(planetName, px + planetSize + 3, py);
                }

                interactiveNodes.push({
                    id: `${systemObject.id}-planet-${planet.id || i}`,
                    sx: px,
                    sy: py,
                    hitRadius: Math.max(8, planetSize + 5),
                    entry: {
                        id: `${systemObject.id}-planet-${planet.id || i}`,
                        title: planetName,
                        typeLabel: "PLANETARY BODY",
                        content: `
⦿ ${planetName}
System: ${systemObject.title}

Cataloged as orbital track ${i + 1}. Survey notes describe layered mineral signatures, shifting magnetosphere arcs, and multiple landing vectors of tactical interest.
                        `,
                        mapX: pw.x,
                        mapY: pw.y
                    }
                });

                const moonOrbitScale = Math.max(0.55, Math.min(1.6, zoom * 0.16));
                const showMoons = (zoom >= 2.9 || emphasize) && filters.moons;
                if (showMoons && Array.isArray(planet.moons)) {
                    planet.moons.forEach((moon, moonIndex) => {
                        const moonRadius = Math.max(8, (moon.radius || 9) * moonOrbitScale);
                        const moonAngle = ((moon.angle || 0) * Math.PI) / 180 + now * (0.09 + moonIndex * 0.02);
                        const mx = px + Math.cos(moonAngle) * moonRadius;
                        const my = py + Math.sin(moonAngle) * moonRadius;
                        const mw = screenToWorld(mx, my);
                        const moonSize = Math.max(1.5, Math.min(4, (moon.size || 2) * 0.8));

                        ctx.strokeStyle = "#6e7ea2";
                        ctx.globalAlpha = 0.65;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.arc(px, py, moonRadius, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.globalAlpha = 1;

                        ctx.fillStyle = "#d1d6f4";
                        ctx.beginPath();
                        ctx.arc(mx, my, moonSize, 0, Math.PI * 2);
                        ctx.fill();

                        const moonName = moon.name || titleFromId(moon.id || `moon-${moonIndex + 1}`);
                        if (zoom >= 3.7 || emphasize) {
                            ctx.fillStyle = "#dce3ff";
                            ctx.font = `${Math.max(8, 8.2 * Math.min(zoom, 1.8))}px Arial`;
                            ctx.textAlign = "left";
                            ctx.textBaseline = "middle";
                            ctx.fillText(moonName, mx + moonSize + 2, my);
                        }

                        interactiveNodes.push({
                            id: `${systemObject.id}-planet-${planet.id || i}-moon-${moon.id || moonIndex}`,
                            sx: mx,
                            sy: my,
                            hitRadius: Math.max(7, moonSize + 4),
                            entry: {
                                id: `${systemObject.id}-planet-${planet.id || i}-moon-${moon.id || moonIndex}`,
                                title: moonName,
                                typeLabel: "NATURAL SATELLITE",
                                content: `
⦿ ${moonName}
Parent Body: ${planetName}
System: ${systemObject.title}

Tidally constrained satellite with intermittent thermal vents and irregular crust harmonics.
                                `,
                                mapX: mw.x,
                                mapY: mw.y
                            }
                        });
                    });
                }
            });
        }

        function drawVisibleSystemOrbits() {
            if (zoom < 2.0) return;

            const visibleWithOrbitData = systemObjects.filter((object) => {
                if (!filters.systems) return false;
                if (!matchesSearch(`${object.title} ${object.typeLabel}`) && selectedObject?.id !== object.id) return false;
                const p = worldToScreen(object.x, object.y);
                return p.sx > -180 && p.sy > -180 && p.sx < canvas.width + 180 && p.sy < canvas.height + 180;
            });

            visibleWithOrbitData.sort((a, b) => {
                const pa = worldToScreen(a.x, a.y);
                const pb = worldToScreen(b.x, b.y);
                const da = Math.hypot(pa.sx - canvas.width / 2, pa.sy - canvas.height / 2);
                const db = Math.hypot(pb.sx - canvas.width / 2, pb.sy - canvas.height / 2);
                return da - db;
            });

            const maxSystemsWithOrbits = zoom < 3.1 ? 10 : (zoom < 5.5 ? 20 : 12);
            visibleWithOrbitData.slice(0, maxSystemsWithOrbits).forEach((object) => {
                drawSystemOrbitsForObject(object, selectedObject?.id === object.id);
            });
        }

        function updateZoomReadout() {
            if (zoomReadout) zoomReadout.textContent = `${Math.round(zoom * 100)}%`;
        }

        function updateRouteReadout() {
            if (!routeReadout) return;
            if (!routeWaypoints.length) {
                routeReadout.textContent = "Route: 0 waypoints";
                return;
            }
            let totalLy = 0;
            for (let i = 1; i < routeWaypoints.length; i += 1) {
                totalLy += Math.hypot(
                    routeWaypoints[i].x - routeWaypoints[i - 1].x,
                    routeWaypoints[i].y - routeWaypoints[i - 1].y
                );
            }
            const cruiseLyPerHour = 1.4;
            const etaHours = totalLy / cruiseLyPerHour;
            const hops = Math.max(0, routeWaypoints.length - 1);
            routeReadout.textContent = `Route: ${hops} hops from current position • ${totalLy.toFixed(1)} LY • ETA ${etaHours.toFixed(1)}h • ${timelinePlaying && routeWaypoints.length >= 2 ? "Engaged" : "Standby"}`;
        }

        function drawRoute() {
            if (routeWaypoints.length < 1) return;
            if (routeWaypoints.length > 1) {
                ctx.strokeStyle = "#ffb96f";
                ctx.lineWidth = 2;
                ctx.setLineDash([7, 5]);
                ctx.beginPath();
                routeWaypoints.forEach((point, index) => {
                    const p = worldToScreen(point.x, point.y);
                    if (index === 0) ctx.moveTo(p.sx, p.sy);
                    else ctx.lineTo(p.sx, p.sy);
                });
                ctx.stroke();
                ctx.setLineDash([]);
            }
            routeWaypoints.forEach((point, index) => {
                const p = worldToScreen(point.x, point.y);
                ctx.fillStyle = "#ffd28c";
                ctx.beginPath();
                ctx.arc(p.sx, p.sy, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ffe8ba";
                ctx.font = "10px Arial";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                ctx.fillText(`${index + 1}. ${point.title}`, p.sx + 6, p.sy - 1);
            });
        }

        function addRouteWaypoint(entry) {
            const hasCoords = Number.isFinite(entry?.mapX) && Number.isFinite(entry?.mapY);
            if (!hasCoords) return;
            if (!routeWaypoints.length) {
                routeWaypoints.push({
                    title: "Current Shuttle Position",
                    x: stardustAnchor.x,
                    y: stardustAnchor.y
                });
            }

            const last = routeWaypoints[routeWaypoints.length - 1];
            const duplicate = Math.hypot(last.x - entry.mapX, last.y - entry.mapY) < 0.05;
            if (duplicate) return;

            routeWaypoints.push({
                title: entry.title,
                x: entry.mapX,
                y: entry.mapY
            });
            routeProgress = 0;
            if (timelinePlayBtn) timelinePlayBtn.textContent = routeWaypoints.length >= 2 ? "Play Route" : "Play Track";
            updateRouteReadout();
        }

        function drawHudText() {
            ctx.fillStyle = "#ffcd9a";
            ctx.font = "12px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("VARIX GALAXY ORIGIN", 12, 12);
            if (routeMode) {
                ctx.fillStyle = "#ffb477";
                ctx.fillText("ROUTE PLOTTING ACTIVE", 12, 28);
            }
        }

        function draw() {
            interactiveNodes.length = 0;
            ctx.fillStyle = "#03071a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawFactionTerritories();
            drawSectorMap();
            drawVisibleSystemOrbits();
            drawObjects();
            drawRoute();
            drawHudText();
            updateZoomReadout();
            updateTimelineReadout();
        }

        function pickObjectAt(sx, sy) {
            let nearestNode = null;
            let nearestNodeDistance = Infinity;
            for (const node of interactiveNodes) {
                const d = Math.hypot(sx - node.sx, sy - node.sy);
                if (d <= node.hitRadius && d < nearestNodeDistance) {
                    nearestNode = node;
                    nearestNodeDistance = d;
                }
            }
            if (nearestNode) return nearestNode.entry;

            let nearest = null;
            let nearestDistance = Infinity;
            for (const object of mapObjects) {
                if (!isTypeVisible(object.kind)) continue;
                if (!matchesSearch(`${object.title} ${object.typeLabel}`)) continue;
                const p = worldToScreen(object.x, object.y);
                const d = Math.hypot(sx - p.sx, sy - p.sy);
                const maxPick = Math.max(8, getScreenRadius(object) + 5);
                if (d <= maxPick && d < nearestDistance) {
                    nearest = object;
                    nearestDistance = d;
                }
            }
            return nearest;
        }

        function formatMapContent(content) {
            if (!content) return "<p>No databank entry available.</p>";
            return /<[a-z][\s\S]*>/i.test(content) ? content : content.trim().replace(/\n/g, "<br>");
        }

        function openMapInfo(entry) {
            if (!mapInfoPanel || !selectedName || !selectedInfo) return;
            selectedName.textContent = entry.title;
            selectedInfo.innerHTML = `
                <p><strong>Type:</strong> ${entry.typeLabel}</p>
                ${formatMapContent(entry.content)}
            `;
            mapInfoPanel.classList.add("open");
        }

        function zoomAtScreenPoint(screenX, screenY, deltaMultiplier) {
            const before = screenToWorld(screenX, screenY);
            zoom = Math.max(minZoom, Math.min(maxZoom, zoom * deltaMultiplier));
            panX = (screenX - canvas.width / 2) / (worldScale * zoom) - before.x;
            panY = (screenY - canvas.height / 2) / (worldScale * zoom) - before.y;
            draw();
        }

        canvas.addEventListener("mousedown", (event) => {
            isDragging = true;
            dragMoved = false;
            dragStartX = event.clientX;
            dragStartY = event.clientY;
            dragPanX = panX;
            dragPanY = panY;
            canvas.classList.add("dragging");
        }, { signal });

        window.addEventListener("mousemove", (event) => {
            if (!isDragging) {
                const rect = canvas.getBoundingClientRect();
                const hover = pickObjectAt(event.clientX - rect.left, event.clientY - rect.top);
                if (hoveredObject?.id !== hover?.id) {
                    hoveredObject = hover;
                    draw();
                }
                return;
            }
            const dx = event.clientX - dragStartX;
            const dy = event.clientY - dragStartY;
            if (Math.hypot(dx, dy) > 3) dragMoved = true;
            panX = dragPanX + dx / (worldScale * zoom);
            panY = dragPanY + dy / (worldScale * zoom);
            draw();
        }, { signal });

        window.addEventListener("mouseup", () => {
            isDragging = false;
            canvas.classList.remove("dragging");
        }, { signal });

        canvas.addEventListener("mouseleave", () => {
            hoveredObject = null;
            draw();
        }, { signal });

        canvas.addEventListener("click", (event) => {
            if (dragMoved) return;
            const rect = canvas.getBoundingClientRect();
            const sx = event.clientX - rect.left;
            const sy = event.clientY - rect.top;
            const picked = pickObjectAt(sx, sy);
            if (!picked) {
                mapInfoPanel?.classList.remove("open");
                selectedObject = null;
                draw();
                return;
            }
            if (routeMode) {
                addRouteWaypoint(picked);
                draw();
                return;
            }
            selectedObject = picked;
            openMapInfo(picked);
            draw();
        }, { signal });

        canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
            const factor = event.deltaY < 0 ? 1.14 : 0.88;
            const rect = canvas.getBoundingClientRect();
            zoomAtScreenPoint(event.clientX - rect.left, event.clientY - rect.top, factor);
        }, { passive: false, signal });

        zoomInBtn?.addEventListener("click", () => {
            zoomAtScreenPoint(canvas.width / 2, canvas.height / 2, 1.24);
        }, { signal });
        zoomOutBtn?.addEventListener("click", () => {
            zoomAtScreenPoint(canvas.width / 2, canvas.height / 2, 0.82);
        }, { signal });
        resetBtn?.addEventListener("click", () => {
            zoom = 1.3;
            panX = 0;
            panY = 0;
            draw();
        }, { signal });
        const syncTerritoryRingControls = () => {
            if (territoryToggleBtn) territoryToggleBtn.textContent = `Territory Rings: ${showTerritoryRings ? "ON" : "OFF"}`;
            if (filterTerritoryRingsInput) filterTerritoryRingsInput.checked = showTerritoryRings;
        };
        territoryToggleBtn?.addEventListener("click", () => {
            showTerritoryRings = !showTerritoryRings;
            syncTerritoryRingControls();
            draw();
        }, { signal });
        filterTerritoryRingsInput?.addEventListener("change", () => {
            showTerritoryRings = filterTerritoryRingsInput.checked;
            syncTerritoryRingControls();
            draw();
        }, { signal });
        routeModeBtn?.addEventListener("click", () => {
            routeMode = !routeMode;
            routeModeBtn.textContent = `Route Plot: ${routeMode ? "ON" : "OFF"}`;
            draw();
        }, { signal });
        routeClearBtn?.addEventListener("click", () => {
            routeWaypoints.length = 0;
            routeProgress = 0;
            updateRouteReadout();
            if (timelinePlayBtn) timelinePlayBtn.textContent = timelinePlaying ? "Pause Track" : "Play Track";
            draw();
        }, { signal });
        timelinePlayBtn?.addEventListener("click", () => {
            timelinePlaying = !timelinePlaying;
            const label = routeWaypoints.length >= 2 ? "Route" : "Track";
            timelinePlayBtn.textContent = timelinePlaying ? `Pause ${label}` : `Play ${label}`;
        }, { signal });
        timelineScrub?.addEventListener("input", () => {
            const value = Math.max(0, Math.min(1, Number(timelineScrub.value) / 1000));
            if (routeWaypoints.length >= 2) routeProgress = value;
            else timelineProgress = value;
            timelinePlaying = false;
            if (timelinePlayBtn) timelinePlayBtn.textContent = routeWaypoints.length >= 2 ? "Play Route" : "Play Track";
            draw();
        }, { signal });
        filterSystemsInput?.addEventListener("change", () => {
            filters.systems = filterSystemsInput.checked;
            draw();
        }, { signal });
        filterStationsInput?.addEventListener("change", () => {
            filters.stations = filterStationsInput.checked;
            draw();
        }, { signal });
        filterAnomaliesInput?.addEventListener("change", () => {
            filters.anomalies = filterAnomaliesInput.checked;
            draw();
        }, { signal });
        filterMoonsInput?.addEventListener("change", () => {
            filters.moons = filterMoonsInput.checked;
            draw();
        }, { signal });
        searchInput?.addEventListener("input", () => {
            filters.search = searchInput.value.trim().toLowerCase();
            draw();
        }, { signal });
        closeMapPanelBtn?.addEventListener("click", () => mapInfoPanel?.classList.remove("open"), { signal });

        window.addEventListener("resize", resizeCanvas, { signal });
        let animationFrameId = 0;
        const animate = () => {
            if (signal.aborted) return;
            if (timelinePlaying) {
                if (routeWaypoints.length >= 2) {
                    routeProgress += routeSpeed / 60;
                    if (routeProgress >= 1) routeProgress = 1;
                } else {
                    timelineProgress += timelineSpeed / 60;
                    if (timelineProgress >= 1) timelineProgress = 0;
                }
            }
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };
        signal.addEventListener("abort", () => cancelAnimationFrame(animationFrameId), { once: true });

        updateRouteReadout();
        updateTimelineReadout();
        syncTerritoryRingControls();
        if (timelinePlayBtn) timelinePlayBtn.textContent = "Play Track";
        mapInfoPanel?.classList.remove("open");
        resizeCanvas();
        animate();
    } catch (err) {
        console.error("Map initialization failed:", err);
    }
}
