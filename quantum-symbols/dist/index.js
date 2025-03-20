import './styles.css';
// Quantum symbol definitions
const quantumSymbols = [
    {
        id: 'psi',
        name: 'Wave Function',
        symbol: 'Ψ',
        description: 'The wave function represents the quantum state of a quantum system. It contains all the information about the system.',
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
        size: 50,
        color: '#e74c3c'
    },
    {
        id: 'sigma',
        name: 'Pauli Matrices',
        symbol: 'σ',
        description: 'Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.',
        position: { x: 40, y: 70 },
        velocity: { x: 0.03, y: -0.02 },
        size: 55,
        color: '#2ecc71'
    },
    {
        id: 'delta',
        name: 'Uncertainty',
        symbol: 'Δ',
        description: 'In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.',
        position: { x: 75, y: 65 },
        velocity: { x: -0.02, y: -0.03 },
        size: 45,
        color: '#f39c12'
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
    console.log("Opening modal:", options.title); // Debug log
    modalTitle.textContent = options.title;
    modalBody.textContent = options.content;
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
    // Add this for debugging
    console.log("Quantum Symbols initialized");
});
//# sourceMappingURL=index.js.map