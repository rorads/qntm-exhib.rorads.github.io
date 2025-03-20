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
        name: 'Wave Function',
        symbol: 'Ψ',
        description: 'The wave function represents the quantum state of a quantum system. It contains all the information about the system.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Here is some text with various html formatting: \n\n <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, <a href="https://example.com">Link</a>, <ul><li>List Item 1</li><li>List Item 2</li></ul>',
        position: { x: 25, y: 25 },
        velocity: { x: 0.02, y: 0.03 },
        size: 60,
        color: '#3498db'
    },
    {
        id: 'h',
        name: 'Planck Constant',
        symbol: 'ℎ',
        description: 'The Planck constant is a fundamental physical constant central to quantum mechanics.',
        position: { x: 65, y: 45 },
        velocity: { x: -0.04, y: 0.02 },
        size: 60,
        color: '#e74c3c'
    },
    {
        id: 'sigma',
        name: 'Pauli Matrices',
        symbol: 'σ',
        description: 'Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.',
        position: { x: 40, y: 70 },
        velocity: { x: 0.03, y: -0.02 },
        size: 60,
        color: '#2ecc71'
    },
    {
        id: 'delta',
        name: 'Uncertainty',
        symbol: 'Δ',
        description: 'In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.',
        position: { x: 75, y: 65 },
        velocity: { x: -0.02, y: -0.03 },
        size: 60,
        color: '#f39c12'
    },
    {
        id: 'omega',
        name: 'Quantum Entanglement',
        symbol: '🍌',
        description: 'Quantum entanglement is a phenomenon where two particles can become correlated in such a way that their properties are linked, even when separated by large distances.',
        position: { x: 55, y: 55 },
        velocity: { x: 0.01, y: 0.01 },
        size: 60,
        color: '#9b59b6'
    },
    // an example using a word as the symbol and with some html formatted text as the description
    {
        id: 'rory',
        name: 'Rory',
        symbol: 'ro',
        description: '<h1>Rory</h1> <p>Rory built this page. He likes:</p> <ul><li>Quantum Mechanics</li><li>Typescript</li><li><em>Webpack</em></li></ul>',
        position: { x: 20, y: 30 },
        velocity: { x: 0.05, y: 0.001 },
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
            content: 'This is a quantum symbols visualization project. It demonstrates quantum mechanics concepts through interactive floating symbols.'
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