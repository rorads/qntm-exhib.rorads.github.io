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
// Audio management variables
let audioContext = null;
let audioBuffer = null;
let audioSource = null;
let isMuted = true; // Start muted
// Quantum symbol definitions
const quantumSymbols = [
    {
        id: 'psi',
        name: 'Waveform Convergence',
        symbol: 'Ψ',
        description: '<h3>Artist: Heisenberg Planck</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/1.webp" alt="Waveform Convergence Installation" width="300" height="auto" />\n\n' +
            '<p>This immersive installation explores the convergence of sound waves and visual patterns in a symbiotic relationship. ' +
            'Visitors walk through a corridor of suspended translucent panels that react to their presence, creating ' +
            'rippling wave patterns that transform the space around them.</p>\n' +
            '<p>The installation challenges our understanding of permanence and observation, asking viewers to consider how ' +
            'their mere presence alters the reality they perceive. Each visitor experiences a unique manifestation of the work, ' +
            'much like the probabilistic nature of quantum phenomena.</p>\n' +
            '<p><strong>Medium:</strong> Reactive projection, motion sensors, transparent acrylic, custom software</p>\n' +
            '<ul><li>Featured at Venice Biennale 2023</li><li>Winner, Golden Light Award</li><li>Permanent collection, MOMA</li></ul>',
        position: { x: 25, y: 25 },
        velocity: { x: 0.02, y: 0.03 },
        size: 60,
        color: '#3498db'
    },
    {
        id: 'h',
        name: 'Constant Flux',
        symbol: 'ℎ',
        description: '<h3>Artist: Quanta Bohr</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/2.webp" alt="Constant Flux Installation" width="300" height="auto" />\n\n' +
            '<p>This kinetic sculpture uses magnetically suspended elements that never quite settle into a fixed position. ' +
            'The seemingly chaotic movements follow precise mathematical formulas derived from quantum field theory, ' +
            'creating a mesmerizing dance of metal and light that appears both random and ordered.</p>\n' +
            '<p>The sculpture plays with the concept of discrete energy states, with subtle LED elements that shift in brightness ' +
            'only at specific intervals, never between them - a physical manifestation of quantum leaps.</p>\n' +
            '<p><strong>Medium:</strong> Polished aluminum, neodymium magnets, microcontrollers, LEDs</p>\n' +
            '<ul><li>Commissioned by CERN for their public gallery</li><li>Tour includes Tokyo Science Museum and Smithsonian</li></ul>',
        position: { x: 65, y: 45 },
        velocity: { x: -0.04, y: 0.02 },
        size: 60,
        color: '#e74c3c'
    },
    {
        id: 'sigma',
        name: 'Matrix Reflections',
        symbol: 'σ',
        description: '<h3>Artist: Pauli Schrödinger</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/3.webp" alt="Matrix Reflections Installation" width="300" height="auto" />\n\n' +
            '<p>A room of perfectly aligned mirrors creates infinite reflections that transform visitors into multi-dimensional beings. ' +
            'Special dichroic filters cause the reflections to split into different spectra based on viewing angle, ' +
            'representing the multi-state nature of quantum information.</p>\n' +
            '<p>As viewers move through the space, their reflections appear to make decisions independent of the original, ' +
            'suggesting parallel realities coexisting within our own. The installation creates a sense of disorientation that ' +
            'forces confrontation with our limited perception of dimensions.</p>\n' +
            '<p><strong>Medium:</strong> Custom mirrors, dichroic glass, geometric framework, programmed lighting</p>\n' +
            '<ul><li>Current exhibition at Guggenheim</li><li>Featured in "Quantum Aesthetics" documentary</li></ul>',
        position: { x: 40, y: 70 },
        velocity: { x: 0.03, y: -0.02 },
        size: 60,
        color: '#2ecc71'
    },
    {
        id: 'delta',
        name: 'Uncertainty Principle',
        symbol: 'Δ',
        description: '<h3>Artist: Max Feynman</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/4.webp" alt="Uncertainty Principle Installation" width="300" height="auto" />\n\n' +
            '<p>This interactive installation features a series of delicate pendulums whose movements are influenced by subtle ' +
            'air currents created by visitors. The more closely one attempts to observe the pendulums, the more one\'s breath ' +
            'and body heat disrupt their patterns, making precise measurement impossible.</p>\n' +
            '<p>Overhead cameras track the pendulum movements, generating real-time visualizations that demonstrate the ' +
            'mathematical beauty of uncertainty. The piece comments on the futility of perfect knowledge and the ' +
            'observer effect inherent in all systems.</p>\n' +
            '<p><strong>Medium:</strong> Suspended glass pendulums, thermal sensors, generative projection mapping</p>\n' +
            '<ul><li>Published in Art & Physics Quarterly</li><li>Acquired by Tate Modern permanent collection</li></ul>',
        position: { x: 75, y: 65 },
        velocity: { x: -0.02, y: -0.03 },
        size: 60,
        color: '#f39c12'
    },
    {
        id: 'omega',
        name: 'Entangled States',
        symbol: '🍌',
        description: '<h3>Artist: Niels Einstein</h3>' +
            '<img src="./assets/demo-exhibit-pictures-ai/5.webp" alt="Entangled States Installation" width="300" height="auto" />\n\n' +
            '<p>A provocative installation featuring two separate rooms in different parts of the gallery that are connected ' +
            'through technology. Actions in one room cause immediate reactions in the other, defying our classical understanding ' +
            'of cause and effect. The banana symbol serves as a whimsical reference to quantum absurdity.</p>\n' +
            '<p>Visitors collaborate unknowingly with strangers, creating synchronized light patterns and sound compositions ' +
            'that evolve based on collective behavior. The piece explores connection, causality, and the invisible threads ' +
            'that bind seemingly separate systems.</p>\n' +
            '<p style="text-align:left"><strong>Medium:</strong> Custom sensors, fiber optics, real-time data transmission, responsive environments</p>\n' +
            '<ul><li>Winner of the Quantum Art Prize</li><li>Installations in New York and Tokyo simultaneously</li></ul>',
        position: { x: 55, y: 55 },
        velocity: { x: 0.01, y: 0.01 },
        size: 60,
        color: '#9b59b6'
    },
    {
        id: 'matty',
        name: 'Connection',
        symbol: '🍻',
        description: '<h3>Artist: Matthew Wasylko</h3>' +
            '<img src="./assets/actual-exhibit-images/matty_depiction_image.png" alt="Connection Installation" width="300" height="auto" />\n\n' +
            '<p><em>Two particles intertwined.</em><br>' +
            '<em>Born together.</em><br>' +
            '<em>Perfectly correlated.</em><br>' +
            '<em>No matter how far apart you move them, they will stay connected.</em></p>\n' +
            '<p>Connection is a 3D interactive artwork inspired by graphical representations of quantum entanglement. Built using shaders within a 3D graphics framework, the piece explores the dynamic, electric-like space between two bound particles. Their connection is in constant motion—shifting, weaving, and responding to semi-random input within mathematical expressions. Emerging patterns cluster, fold, and overlap, forming new, evolving shapes. Within and across the particles, a continuously excited tessellation blends colour, form, and movement. Though separate, the particles remain perpetually linked, flying together through an otherwise empty space.</p>\n' +
            '<p><strong>Medium:</strong> GLSL, THREE.JS, Code/Algorithm, Arduino</p>\n' +
            '<h4>Artist Bio</h4>' +
            '<p>Matthew Wasylko is a Glasgow-based creative technologist and multimedia artist working with computational methods across video, audio, photography and digital media. His practice explores the influence of code on both physical and perceptual spaces, focusing on procedural decision-making and generative systems. Rather than imitating traditional forms, Wasylko uses algorithmic processes to shape meaning, emotion and interaction. His work examines the interface between technology and human perception, connecting audiences to the underlying systems that shape both digital and natural worlds. Through his chosen media, he documents his exploration into new systems of expression, structure and experience. Matthew is also taking part in a fundraiser, which you can donate to through this link: <a href="https://www.justgiving.com/page/matthew-wasylko?utm_medium=FR&utm_source=CL&utm_campaign=015" target="_blank">https://www.justgiving.com/page/matthew-wasylko</a></p>\n',
        position: { x: 20, y: 30 },
        velocity: { x: 0.05, y: 0.01 },
        size: 60,
        color: '#9b59b6'
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
    quantumSymbols.forEach(symbol => {
        const symbolElement = document.getElementById(symbol.id);
        // Update position based on velocity
        symbol.position.x += symbol.velocity.x;
        symbol.position.y += symbol.velocity.y;
        // Bounce off edges
        if (symbol.position.x <= 0 || symbol.position.x >= 90) {
            symbol.velocity.x *= -1;
        }
        if (symbol.position.y <= 0 || symbol.position.y >= 90) {
            symbol.velocity.y *= -1;
        }
        // Apply new position
        symbolElement.style.left = `${symbol.position.x}%`;
        symbolElement.style.top = `${symbol.position.y}%`;
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
            content: 'This is an exhibition walkthrough website, optimized for any device, built by Rory Scott (<a href="https://rorads.github.io" target="_blank">rorads.github.io</a>). ' +
                'It showcases quantum-inspired art installations through interactive floating symbols.\n\n' +
                'The soundtrack accompanying the exhibition is a sonification of Rabi cycle data using FM synthesis. ' +
                'The Rabi cycle represents the cyclic behavior of a two-level quantum system in the presence of an oscillatory driving field. ' +
                'The full sonification tool can be found at <a href="https://xy-sonification.streamlit.app/" target="_blank">xy-sonification.streamlit.app</a>.\n\n' +
                'The source code for this project is available on GitHub: ' +
                '<a href="https://github.com/rorads/qntm-exhib.rorads.github.io" target="_blank">github.com/rorads/qntm-exhib.rorads.github.io</a>'
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
    // Add this for debugging
    console.log("Quantum Symbols initialized");
});
//# sourceMappingURL=index.js.map