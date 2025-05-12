var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './styles.css';
/**
 * Calculate an adaptive collision radius (as a percentage of the viewport
 * coordinates used throughout this file).
 *
 * The width/height distortion that appears on tall, narrow viewports (mobile
 * portrait) means that a fixed radius expressed in percentage of the
 * *viewport width* becomes too small, resulting in missed collisions.  To
 * counter this we grow the radius as the aspect-ratio decreases:
 *
 *   • ratio ≥ 1   →  5 %  (default previously used)
 *   • ratio = 0.25 → 15 % (width is 25 % of height)
 *
 * The growth is linear between the two limits and capped at the extremes.
 */
function getAdaptiveCollisionRadius() {
    const MIN_RATIO = 0.25; // width / height threshold at which we reach max radius
    const MIN_RADIUS = 5; // % (for square / landscape screens)
    const MAX_RADIUS = 10; // % (for tall, narrow screens)
    const ratio = window.innerWidth / window.innerHeight;
    // Clamp ratio so that very wide screens don't reduce the radius and very
    // tall screens don't increase it past the cap.
    const clampedRatio = Math.min(1, Math.max(ratio, MIN_RATIO));
    const t = (1 - clampedRatio) / (1 - MIN_RATIO); // 0 → 1 interpolation factor
    return MIN_RADIUS + t * (MAX_RADIUS - MIN_RADIUS);
}
const VELOCITY_SCALE = 1;
// Audio management variables
let audioContext = null;
let audioBuffer = null;
let audioSource = null;
let isMuted = true; // Start muted
// Display an alert only if the user is on iOS Chrome or iOS Safari
// if (!!navigator.userAgent.match('CriOS') || !!navigator.userAgent.match('Safari')) {
//   alert(navigator.userAgent);
// }
// Quantum symbol definitions
const quantumSymbols = [
    {
        id: 'ana1',
        name: 'Soundscape',
        symbol: '<img src="https://em-content.zobj.net/source/microsoft/74/speaker-with-three-sound-waves_1f50a.png" alt="Speaker" width="60" height="60" />',
        description: '<h3>Artist: Ana (@lunattic_sounds)</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/6.webp" alt="Quantum Soundscape Installation" width="300" height="auto" />\n\n' +
            '<p>The exhibition\'s soundscape blends two compositions: an immersive, sustained soundscape inspired by Pauline Oliveros\' concept of Quantum Listening, built from recordings of quantum experiments and sonified data, and featuring poetry by Glasgow-based poet Nadia Violette. This gradually shifts into a lighter, more melodic improvisation created in collaboration with Glasgow-based sound artist Yoker Moon.</p>' +
            '<p>Pauline Oliveros (1930–2016), an influential sound artist and philosopher, developed the idea of the listening effect, which parallels the observer effect in quantum physics, where the act of observing a particle changes the behavior of the particle (remember Schrödinger\'s cat?). As she wrote: "What is heard is changed by listening, and changes the listener."</p>' +
            '<p>I positioned different sound sources in various parts of the space to reflect her idea that "Quantum Listening is listening to more than one reality simultaneously."</p>' +
            '<p>The beautiful hi-fi speakers were handmade by our friends Cameron and Finlay, who also organise Coorie Doon, a beloved Glasgow dance party. The Bluetooth speakers were kindly loaned by gomi, a Brighton-based studio creating sustainable tech from recycled materials. Headphones came from Music Broth, Scotland\'s loudest library, an inclusive social enterprise dedicated to making music accessible. The heaphone stand was handmade my Boomerang Woodworking, a community workshop promoting wellbeing though woodwork, creativity and skills development.</p>' +
            '<p><strong>Medium:</strong> Sound, Speakers, Headphones</p>' +
            '<p><strong>Links:</strong></p>' +
            '<ul style="text-align:left">' +
            '<li><a href="https://www.musicbroth.org/" target="_blank">Music Broth, instrument library</a></li>' +
            '<li><a href="https://www.instagram.com/boomerangwoodworking/" target="_blank">Boomerang Woodworking</a></li>' +
            '<li><a href="https://gomi.design/products/gomi-speaker" target="_blank">gomi speakers</a></li>' +
            '<li><a href="https://sonosaurus.com/paulxstretch/" target="_blank">PaulXStretch</a></li>' +
            '<li><a href="https://goodpress.co.uk/products/quantum-listening-by-pauline-oliveros-1" target="_blank">Quantum Listening by Pauline Oliveros</a></li>' +
            '<li><a href="https://linktr.ee/nadia.the.poet?utm_source=linktree_profile_share&ltsid=64beaaed-bc10-45bb-a709-84f0345e7cb0" target="_blank">Nadia Violette</a></li>' +
            '<li><a href="https://cooriedoonparty.org/" target="_blank">Coorie Doon</a></li>' +
            '<li><a href="https://theconversation.com/a-new-quantum-paradox-throws-the-foundations-of-observed-reality-into-question-144426" target="_blank">Article from The Conversation about the observer effect</a></li>' +
            '</ul>\n' +
            '<h4>Artist Bio</h4>' +
            '<p>Ana (she/her) holds a PhD in Political Communication and is passionate about making academic research more accessible to a wider audience. She is also an electronic music producer (under the alias lunattic), and radio host at local community radio station Radio Buena Vida. Over the past couple of years, she has facilitated music production workshops with a focus on accessibility and collaboration. Her creative work—whether through music, radio, or teaching—is driven by a commitment to playfulness and experimentation.</p>',
        position: { x: 25, y: 35 },
        velocity: { x: 0.02, y: 0.03 },
        size: 60,
        color: '#3498db'
    },
    {
        id: 'rory',
        name: 'Data Sonification Playground',
        symbol: '<img src="https://em-content.zobj.net/source/microsoft/74/bar-chart_1f4ca.png" alt="Bar Chart" width="60" height="60" />',
        description: '<h3>Artist: Rory Scott</h3>' +
            '<img src="./assets/spectrogram.png" alt="Data Sonification Playground" width="300" height="auto" />\n\n' +
            '<p>The Data Sonification Playground is an interactive web application that transforms quantum data into sound. Built using Python and Streamlit, it allows users to explore different sonification techniques and parameters, creating a bridge between quantum physics and auditory experience.</p>' +
            '<p>These sounds trace Rabi oscillations in the pentacene triplet level, following microsecond-scale swings in optical contrast as the molecule\'s spin state coherently flips between ground and excited triplet configurations. Through bespoke sonification techniques, those quantum pulses become immersive soundscapes—audible echoes of invisible oscillations—that invite listeners to feel the hidden rhythm of light–matter interaction in this exhibition.</p>' +
            '<p><strong>Medium:</strong> Interactive Web Dashboard, Python, Streamlit</p>' +
            '<h4>Artist Bio</h4>' +
            '<p>Rory Scott is a data scientist with a background in AI and public sector work, who occasionally dives into creative projects at the intersection of data, sound, and art. His work focuses on making complex systems and data more accessible and interpretable through creative means.</p>' +
            '<p>He is particularly interested in how we can use technology to make abstract concepts more tangible and human-centred. This sonification project represents his exploration of using sound as a medium to experience and understand quantum phenomena that would otherwise remain invisible to our senses.</p>' +
            '<p>Visit the Data Sonification Playground: <a href="https://xy-sonification.streamlit.app/" target="_blank">xy-sonification.streamlit.app</a></p>',
        position: { x: 30, y: 60 },
        velocity: { x: -0.02, y: 0.03 },
        size: 60,
        color: '#1abc9c'
    },
    {
        id: 'libby',
        name: 'Trapped in Light',
        symbol: '<img src="./assets/custom_laser_emoji.svg" alt="Laser" width="60" height="60" />',
        description: '<h3>Artist: Lib L</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/2.webp" alt="Quantum Laser Installation" width="300" height="auto" />\n\n' +
            '<p>Lib L blends the highly precise light of the laser and phosphorus paint to evoke the delicate processes of magneto-optical trapping, where light and magnetism work together to cool and confine atoms. As laser beams carve vivid, glowing patterns across reactive surfaces, the piece visualizes the invisible dance of atomic motion, capture, and control. The piece invites viewers to experience the strange beauty of quantum forces at work: particles frozen and guided by beams of pure energy.</p>' +
            '<h4>Artist Bio</h4>' +
            '<p>Lib L is a Glasgow based laser artist, visual artist and lighting designer and founder of Laser-Faire, her practice is rooted in skirting the edges of socially defined boundaries, and warping expectation and space. Manipulating and changing environments through light, and engaging with the interplay of different materials, both physical and ethereal. She works with forms oft considered salacious and perverse and highlighting the elegance she finds within them.</p>' +
            '<p>She understands lasers not as party novelty but as a multifaceted beauty that with experimentation can drastically shift and change any space.</p>' +
            '<p>She has brought her lasers to spaces across the UK and EU and has work published in various publications and The Glasgow Women\'s Library.</p>' +
            '<p>She highlights and utilises the laser\'s purity of light and precision to explore themes and mediums of art, protest, club and collaboration. The laser is a tool to dissect, play and find delicacy in the dangerous.</p>',
        position: { x: 50, y: 50 },
        velocity: { x: 0.01, y: 0.01 },
        size: 60,
        color: '#ff0000'
    },
    {
        id: 'matty',
        name: 'Connection',
        symbol: '<img src="https://em-content.zobj.net/source/microsoft/74/clinking-beer-mugs_1f37b.png" alt="Clinking Beer Mugs" width="60" height="60" />',
        description: '<h3>Artist: Matthew Wasylko</h3>' +
            '<img src="./assets/actual-exhibit-images/matty_depiction_image.png" alt="Connection Installation" width="300" height="auto" />\n\n' +
            '<p><em>Two particles intertwined.</em><br>' +
            '<em>Born together.</em><br>' +
            '<em>Perfectly correlated.</em><br>' +
            '<em>No matter how far apart you move them, they will stay connected.</em></p>' +
            '<p>Connection is a 3D interactive artwork inspired by graphical representations of quantum entanglement. Built using shaders within a 3D graphics framework, the piece explores the dynamic, electric-like space between two bound particles. Their connection is in constant motion—shifting, weaving, and responding to semi-random input within mathematical expressions. Emerging patterns cluster, fold, and overlap, forming new, evolving shapes. Within and across the particles, a continuously excited tessellation blends colour, form, and movement. Though separate, the particles remain perpetually linked, flying together through an otherwise empty space.</p>' +
            '<p><strong>Medium:</strong> GLSL, THREE.JS, Code/Algorithm, Arduino, Sound</p>' +
            '<h4>Artist Bio</h4>' +
            '<p>Matthew Wasylko is a Glasgow-based creative technologist and multimedia artist working with computational methods across video, audio, photography and digital media. His practice explores the influence of code on both physical and perceptual spaces, focusing on procedural decision-making and generative systems. Rather than imitating traditional forms, Wasylko uses algorithmic processes to shape meaning, emotion and interaction.</p>' +
            '<p>His work examines the interface between technology and human perception, connecting audiences to the underlying systems that shape both digital and natural worlds. Through his chosen media, he documents his exploration into new systems of expression, structure and experience. Matthew is also taking part in a fundraiser, which you can donate to through this link: <a href="https://www.justgiving.com/page/matthew-wasylko?utm_medium=FR&utm_source=CL&utm_campaign=015" target="_blank">https://www.justgiving.com/page/matthew-wasylko</a></p>',
        position: { x: 20, y: 30 },
        velocity: { x: 0.05, y: 0.01 },
        size: 60,
        color: '#9b59b6'
    },
    {
        id: 'darren',
        name: 'Harvest Now, Decrypt Later',
        symbol: '<img src="https://em-content.zobj.net/source/microsoft/74/ear-of-maize_1f33d.png" alt="Corn" width="60" height="60" />',
        description: '<h3>Artist: Darren Robertson</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/2.webp" alt="Harvest Now, Decrypt Later Game" width="300" height="auto" />\n\n' +
            '<p>Are we ready for Q-Day?</p>' +
            '<p>There will come a day when quantum computers are powerful enough to break existing encryption methods. Much of the world\'s data and systems will be vulnerable to actors with access to this technology.</p>' +
            '<p>Cybersecurity experts recommend that we adapt to quantum-safe methods of cryptography to protect our data from this future threat. These methods already exist, however the vast majority of the world\'s data is not using it. There is on-going efforts to make the transition.</p>' +
            '<p>But what if you stole and held onto this data in the present day? You can\'t decrypt it yet. But one day you might. This day has been coined as "Quantum Day" or Q-Day.</p>' +
            '<p>"Harvest Now, Decrypt Later" is a game that puts the player in the role of a hacker tasked with harvesting data. You will hop between different organisation and choose which data to steal from them. Experts predict Q-Day will be with us in 5-30 years. Will the data you choose to harvest be of any use in that time?</p>' +
            '<p><strong>Medium:</strong> Interactive Game</p>' +
            '<h4>Artist Bio</h4>' +
            '<p>Darren is a reformed computer nerd from Ayrshire. He has a background in developing very serious web applications for a multinational corporation. When he discovered he has agency in this life he got into making computer games, his actual passion. However, realising that he could not sit at the computer all day like he had most of his life, he copied his dad and started an apprenticeship to become an electrician. Once qualified he hopes he\'ll have more time to work on his magnum opus. Visit more of his work at: <a href="https://dobertson.itch.io" target="_blank">dobertson.itch.io</a></p>',
        position: { x: 65, y: 45 },
        velocity: { x: -0.04, y: 0.02 },
        size: 60,
        color: '#e74c3c'
    },
    {
        id: 'ana2',
        name: 'The Black Box',
        symbol: '<img src="https://em-content.zobj.net/source/microsoft/153/permanent-paper-sign_267e.png" alt="Infinity" width="60" height="60" />',
        description: '<h3>Artist: Ana (@lunattic_sounds)</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/4.webp" alt="The Black Box Installation" width="300" height="auto" />\n\n' +
            '<p>What does \'quantum\' mean to you?</p>' +
            '<p>This sound piece plays an infinite loop of voice notes responding to that question. Housed inside a literal black box, it reflects how the field of quantum physics is often seen: mysterious, sealed off and a little intimidating. And yet, somehow, we\'ve all heard the word.</p>' +
            '<p>From music and film to wellness and philosophy, the term has escaped its scientific roots. Its spread owes more to artists, writers and thinkers than to physicists.</p>' +
            '<p>While this Quantum Playground follows the tradition of non-experts reimagining quantum ideas, it also highlights a gap in how the field has been communicated. In a world where science often feels distant or opaque, there\'s a need for more open, generous dialogue between scientists and the public, especially when quantum terms are so often abstracted, drifting far from their original meaning.</p>' +
            '<p>Still, the concept has become wonderfully malleable; it now means everything… and nothing. But across all these interpretations, one thing tends to remain: a sense of ungraspability. The word quantum gestures toward something fundamentally unknowable, just out of reach. Perhaps that\'s why it resonates so deeply: it mirrors our experience of reality in some way.</p>' +
            '<p>This piece invites listeners to reflect on their own interpretation. Some voice notes are funny, some thoughtful, some poetic or uncertain. But together, they suggest something bigger: that reality is more complex than it seems.</p>' +
            '<p>Big thanks to everyone who contributed a voicenote and made time to answer my random question!</p>' +
            '<p><strong>Medium:</strong> Sound installation, headset, recycled wood</p>' +
            '<p>Black box and headset stand made by Boomerang Woodworking, a community Workshop promoting wellbeing, creativity and skills development through woodwork with the reuse of recycled wood at the heart of their philosophy.</p>' +
            '<h4>Artist Bio</h4>' +
            '<p>Ana (she/her) holds a PhD in Political Communication and is passionate about making academic research more accessible to a wider audience. She is also an electronic music producer (under the alias lunattic), and radio host at local community radio station Radio Buena Vida. Over the past couple of years, she has facilitated music production workshops with a focus on accessibility and collaboration. Her creative work—whether through music, radio, or teaching—is driven by a commitment to playfulness and experimentation.</p>',
        position: { x: 40, y: 70 },
        velocity: { x: 0.03, y: -0.02 },
        size: 60,
        color: '#2ecc71'
    }
];
// DOM references
const symbolsContainer = document.getElementById('symbols-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');
// Initialize symbols
function createSymbols() {
    quantumSymbols.forEach(symbol => {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'quantum-symbol';
        symbolElement.id = symbol.id;
        symbolElement.innerHTML = symbol.symbol;
        symbolElement.style.fontSize = `${symbol.size}px`;
        symbolElement.style.color = symbol.color;
        symbolElement.style.left = `${symbol.position.x}%`;
        symbolElement.style.top = `${symbol.position.y}%`;
        symbolElement.style.zIndex = '100'; // Ensure symbols are clickable
        symbolElement.addEventListener('click', (event) => {
            console.log(`Symbol ${symbol.id} clicked!`);
            event.stopPropagation(); // Prevent event bubbling
            openModal({
                title: symbol.name,
                content: symbol.description
            });
        });
        symbolsContainer.appendChild(symbolElement);
    });
    console.log(`Created ${quantumSymbols.length} symbols`);
}
// Animation of symbols
function animateSymbols() {
    // Velocity scaling for debugging (1 = normal speed)
    const velocityScale = VELOCITY_SCALE;
    // Detect if user is on iOS Chrome or iOS Safari
    const isIOSChrome = !!navigator.userAgent.match('CriOS');
    const isIOSSafari = !!navigator.userAgent.match('Safari');
    // Define different bottom boundaries based on browser
    const bottomOffset = isIOSChrome ? 80 : (isIOSSafari ? 85 : 90);
    // First update all positions
    quantumSymbols.forEach(symbol => {
        // Update position based on velocity (with scaling)
        symbol.position.x += symbol.velocity.x * velocityScale;
        symbol.position.y += symbol.velocity.y * velocityScale;
        // Bounce off edges - normal horizontal bounds
        if (symbol.position.x <= 0 || symbol.position.x >= 90) {
            symbol.velocity.x *= -1;
        }
        // Vertical bounds with adjusted bottom for iOS Chrome
        if (symbol.position.y <= 0 || symbol.position.y >= bottomOffset) {
            symbol.velocity.y *= -1;
        }
    });
    // Then check for collisions
    for (let i = 0; i < quantumSymbols.length; i++) {
        const symbol1 = quantumSymbols[i];
        const element1 = document.getElementById(symbol1.id);
        if (!element1) {
            console.warn(`Element not found for symbol ${symbol1.id}`);
            continue;
        }
        for (let j = i + 1; j < quantumSymbols.length; j++) {
            const symbol2 = quantumSymbols[j];
            const element2 = document.getElementById(symbol2.id);
            if (!element2) {
                console.warn(`Element not found for symbol ${symbol2.id}`);
                continue;
            }
            // ------------------------------------------------------------------
            // Improved circle-to-circle collision detection & response
            // ------------------------------------------------------------------
            // Convert the percentage-based coordinates into real pixel values so
            // that distance calculations are performed in the same unit in both
            // axes (important when the viewport is not square).
            const x1Px = (symbol1.position.x / 100) * window.innerWidth;
            const y1Px = (symbol1.position.y / 100) * window.innerHeight;
            const x2Px = (symbol2.position.x / 100) * window.innerWidth;
            const y2Px = (symbol2.position.y / 100) * window.innerHeight;
            const dxPx = x1Px - x2Px;
            const dyPx = y1Px - y2Px;
            const distancePx = Math.sqrt(dxPx * dxPx + dyPx * dyPx);
            // Radii based on the rendered font size (≈ diameter) of each symbol.
            const r1 = symbol1.size / 2;
            const r2 = symbol2.size / 2;
            const minDistancePx = r1 + r2;
            if (distancePx < minDistancePx && distancePx > 0) {
                // Normal vector between centres (unit length)
                const nx = dxPx / distancePx;
                const ny = dyPx / distancePx;
                // ----------------------------------------------------------------
                // Resolve interpenetration (separate the discs so they just touch)
                // ----------------------------------------------------------------
                const overlapPx = minDistancePx - distancePx;
                const sepPx = overlapPx / 2; // move each symbol half the overlap
                // Update positions in *pixel* space then convert back to %
                const newX1Px = x1Px + nx * sepPx;
                const newY1Px = y1Px + ny * sepPx;
                const newX2Px = x2Px - nx * sepPx;
                const newY2Px = y2Px - ny * sepPx;
                symbol1.position.x = (newX1Px / window.innerWidth) * 100;
                symbol1.position.y = (newY1Px / window.innerHeight) * 100;
                symbol2.position.x = (newX2Px / window.innerWidth) * 100;
                symbol2.position.y = (newY2Px / window.innerHeight) * 100;
                // ----------------------------------------------------------------
                // Perfectly elastic collision of two discs with equal mass
                // ----------------------------------------------------------------
                // Convert percentage velocities to pixels / frame
                const v1xPx = (symbol1.velocity.x / 100) * window.innerWidth;
                const v1yPx = (symbol1.velocity.y / 100) * window.innerHeight;
                const v2xPx = (symbol2.velocity.x / 100) * window.innerWidth;
                const v2yPx = (symbol2.velocity.y / 100) * window.innerHeight;
                // Components of the velocities along the normal
                const dvx = v1xPx - v2xPx;
                const dvy = v1yPx - v2yPx;
                const relVelAlongNormal = dvx * nx + dvy * ny;
                // Only apply response if the circles are moving towards each other
                if (relVelAlongNormal < 0) {
                    const v1n = v1xPx * nx + v1yPx * ny;
                    const v2n = v2xPx * nx + v2yPx * ny;
                    // Exchange the normal components (perfectly elastic, equal mass)
                    const v1nAfter = v2n;
                    const v2nAfter = v1n;
                    // Tangential components remain unchanged
                    const v1tX = v1xPx - v1n * nx;
                    const v1tY = v1yPx - v1n * ny;
                    const v2tX = v2xPx - v2n * nx;
                    const v2tY = v2yPx - v2n * ny;
                    const newV1xPx = v1tX + v1nAfter * nx;
                    const newV1yPx = v1tY + v1nAfter * ny;
                    const newV2xPx = v2tX + v2nAfter * nx;
                    const newV2yPx = v2tY + v2nAfter * ny;
                    // Convert back to percentage velocities
                    symbol1.velocity.x = (newV1xPx / window.innerWidth) * 100;
                    symbol1.velocity.y = (newV1yPx / window.innerHeight) * 100;
                    symbol2.velocity.x = (newV2xPx / window.innerWidth) * 100;
                    symbol2.velocity.y = (newV2yPx / window.innerHeight) * 100;
                }
            }
        }
    }
    // Finally update all DOM elements
    quantumSymbols.forEach(symbol => {
        const symbolElement = document.getElementById(symbol.id);
        if (symbolElement) {
            symbolElement.style.left = `${symbol.position.x}%`;
            symbolElement.style.top = `${symbol.position.y}%`;
        }
        else {
            console.warn(`Element not found for symbol ${symbol.id}`);
        }
    });
    requestAnimationFrame(animateSymbols);
}
// Modal functionality
function openModal(options) {
    // Check if modal elements exist
    if (!modalTitle || !modalBody || !modal) {
        console.error("Modal elements not found in the DOM");
        return;
    }
    console.log("Opening modal:", options.title);
    modalTitle.textContent = options.title;
    // Use innerHTML instead of textContent to respect HTML tags
    modalBody.innerHTML = options.content;
    // Set direct CSS properties to ensure visibility
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}
function closeModal() {
    if (!modal)
        return;
    console.log("Closing modal"); // Debug log
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}
// Audio functions
function initializeAudio() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Initializing audio...");
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log("AudioContext created, state:", audioContext.state);
            console.log("Fetching audio file...");
            const response = yield fetch('./assets/fm_synth_quantum.wav');
            if (!response.ok) {
                throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
            }
            const arrayBuffer = yield response.arrayBuffer();
            console.log("Audio file fetched, size:", arrayBuffer.byteLength, "bytes");
            try {
                console.log(arrayBuffer);
                audioBuffer = yield audioContext.decodeAudioData(arrayBuffer);
                console.log("Audio buffer created successfully");
                updateMuteButtonState(); // Update button to show audio is available
            }
            catch (decodeError) {
                console.error("Failed to decode audio:", decodeError);
                showAudioError();
            }
        }
        catch (error) {
            console.error("Failed to initialize audio:", error);
            showAudioError();
        }
    });
}
function showAudioError() {
    const muteButton = document.getElementById('mute-button');
    if (muteButton) {
        muteButton.innerHTML = '🔇 Audio Error';
        muteButton.classList.add('audio-error');
        muteButton.title = 'Audio file could not be loaded';
        muteButton.disabled = true;
    }
}
function updateMuteButtonState() {
    const muteButton = document.getElementById('mute-button');
    if (!muteButton)
        return;
    if (isMuted) {
        muteButton.innerHTML = '🔊 Play Audio';
        muteButton.classList.add('muted');
        muteButton.classList.remove('playing');
    }
    else {
        muteButton.innerHTML = '🔇 Mute Audio';
        muteButton.classList.remove('muted');
        muteButton.classList.add('playing');
    }
}
function playAudio() {
    if (!audioContext || !audioBuffer) {
        console.error("AudioContext or buffer not initialized");
        return;
    }
    if (isMuted) {
        console.log("Audio is muted, not playing");
        return;
    }
    console.log("Playing audio");
    // If already playing, stop the current source
    if (audioSource) {
        audioSource.stop();
        audioSource = null;
    }
    // Create a new source
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(audioContext.destination);
    // Remove looping to prevent perceived infinite loop
    // audioSource.loop = true; - This might be causing the issue
    // Add an onended handler instead of looping
    audioSource.onended = () => {
        console.log("Audio playback ended");
        // Only restart if still unmuted
        if (!isMuted) {
            console.log("Restarting audio playback");
            playAudio();
        }
    };
    audioSource.start();
}
function toggleMute() {
    // Only proceed with toggle if we've completed initialization
    if (!audioContext || !audioBuffer) {
        console.log("Audio not ready, initializing...");
        initializeAudio(); // Try to initialize again
        return;
    }
    console.log("Toggle mute from:", isMuted, "to:", !isMuted);
    isMuted = !isMuted;
    updateMuteButtonState();
    if (isMuted) {
        if (audioSource) {
            console.log("Stopping audio");
            audioSource.stop();
            audioSource = null;
        }
    }
    else {
        console.log("Attempting to play audio");
        // Resume audio context if it was suspended (autoplay policy)
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log("AudioContext resumed");
                playAudio();
            });
        }
        else {
            playAudio();
        }
    }
}
function createMuteButton() {
    const muteButton = document.createElement('button');
    muteButton.id = 'mute-button';
    muteButton.className = 'mute-button muted';
    muteButton.innerHTML = '🔊 Play Audio';
    muteButton.title = 'Click to play audio';
    muteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMute();
    });
    document.body.appendChild(muteButton);
    console.log("Mute button created");
}
function createAboutButton() {
    const aboutButton = document.createElement('button');
    aboutButton.id = 'about-button';
    aboutButton.className = 'about-button';
    aboutButton.innerHTML = 'About';
    aboutButton.title = 'About this project';
    aboutButton.addEventListener('click', (event) => {
        event.stopPropagation();
        openModal({
            title: 'About',
            content: '<p><strong>Dates:</strong> 16th May - 26th May</p>' +
                '<p><strong>Opening hours:</strong> 11:30 - 15:30</p>' +
                '<p><strong>Event Link:</strong> <a href="https://www.eventbrite.co.uk/e/quantum-playground-tickets-1304066330499" target="_blank">Quantum Playground Tickets</a></p>' +
                '<p>Quantum playground is a free event that offers a hands-on, engaging experience where you can explore an artistic interpretation of quantum technologies. Through interactive installations, immersive light displays, dynamic soundscapes, and gamified elements, visitors will have the chance to "play" with quantum principles in an intuitive way.</p>' +
                '<p>By making complex ideas accessible and fun, the exhibition aims to bring attendees a face-to-face with quantum technology and spark curiosity. Whether you\'re a curious passer-by or a science enthusiast, this exhibition promises a thought-provoking, hands-on adventure into the world of quantum innovation. Don\'t miss the opportunity to engage, learn, and be inspired!</p>' +
                '<p>This event was organised by <a href="https://www.linkedin.com/in/alistair-inglis-49aa69179/" target="_blank">Dr. Alistair Inglis</a>, a Postdoctoral Research Associate at the University of Glasgow. He is an award-winning science communicator, passionate about the use of art as a vehicle for public engagement of science. His research seeks to examine the spintronic and photonic properties of molecular materials, leading to applications in quantum technologies such as quantum information processing, and quantum sensing.</p>' +
                '<img src="./assets/quantum-arc-logo.webp" alt="Quantum ARC Logo" width="200" height="auto" style="background-color: white; padding: 5px; border-radius: 5px;" />' +
                '<p>This event was made possible by the <a href="https://quantum-tech-alliance.co.uk/" target="_blank">Quantum ARC</a> and the <a href="https://www.sfc.ac.uk/" target="_blank">Scottish Funding Council</a>, in partnership with the University of Glasgow.</p>' +
                '<p>In addition to the artists\' contributions, Alistair would like to thank Soundplay Projects, Boomerang Woodworking, and Rory Scott for their support in making the exhibition possible.</p>' +
                '<h3>About this site</h3>' +
                '<p>This is an exhibition walkthrough website, optimized for any device, built by <a href="https://www.linkedin.com/in/radscott/" target="_blank">Rory Scott</a>. ' +
                'It showcases quantum-inspired art installations through interactive floating symbols.</p>' +
                '<p>The soundtrack accompanying the exhibition is a sonification of Rabi cycle data using FM synthesis. See the 📊 symbol for the full sonification tool. ' +
                '<p>The source code for this project is available on ' +
                '<a href="https://github.com/rorads/qntm-exhib.rorads.github.io" target="_blank">Rory\'s GitHub</a>, and writings about this and other projects are available on <a href="https://rorads.github.io" target="_blank">Rory\'s website</a></p>.'
        });
    });
    document.body.appendChild(aboutButton);
    console.log("About button created");
}
// Event listeners
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
// Function to teleport a random symbol
function teleportSymbol() {
    // Select a random symbol
    const randomIndex = Math.floor(Math.random() * quantumSymbols.length);
    const symbol = quantumSymbols[randomIndex];
    const symbolElement = document.getElementById(symbol.id);
    if (!symbolElement)
        return;
    // Store original position for animation
    const originalX = symbol.position.x;
    const originalY = symbol.position.y;
    // Add teleportation class for animation
    symbolElement.classList.add('teleporting');
    // Animate down and then up to centre
    symbolElement.style.transition = 'all 0.5s ease-in-out';
    symbolElement.style.left = '50%';
    symbolElement.style.top = '100%';
    // After sliding down, slide up to centre
    setTimeout(() => {
        symbolElement.style.top = '50%';
        // Update the symbol's position in the data structure
        symbol.position.x = 50;
        symbol.position.y = 50;
        // Remove teleportation class after animation completes
        setTimeout(() => {
            symbolElement.classList.remove('teleporting');
            symbolElement.style.transition = '';
        }, 500);
    }, 500);
}
// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Verify DOM elements exist before continuing
    if (!symbolsContainer || !modal || !modalTitle || !modalBody || !closeButton) {
        console.error("Required DOM elements not found");
        return;
    }
    createSymbols();
    animateSymbols();
    createMuteButton(); // Add mute button
    createAboutButton(); // Add about button
    initializeAudio(); // Initialize audio
    // Start teleportation timer
    function scheduleNextTeleport() {
        const delay = Math.random() * 10000 + 10000; // Random delay between 10-20 seconds
        setTimeout(() => {
            teleportSymbol();
            scheduleNextTeleport(); // Schedule next teleportation
        }, delay);
    }
    scheduleNextTeleport();
    // Add this for debugging
    console.log("Quantum Symbols initialized");
});
//# sourceMappingURL=index.js.map