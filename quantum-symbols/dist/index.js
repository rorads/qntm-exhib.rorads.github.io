// This file is the main entry point of the application. It initializes the floating symbols, sets up event listeners for clicks, and manages the display of the modal with content.
var _a;
import './styles.css';
const symbols = [
    { id: '1', emoji: '⚛️', content: 'Quantum mechanics is the foundation of modern physics.' },
    { id: '2', emoji: '🔮', content: 'Entanglement is a phenomenon where particles become interconnected.' },
    { id: '3', emoji: '🌌', content: 'The universe is a vast quantum field of possibilities.' },
    { id: '4', emoji: '🌀', content: 'Superposition allows particles to exist in multiple states at once.' },
];
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = '<span class="close">&times;</span><div class="modal-content"></div>';
document.body.appendChild(modal);
const closeModal = () => {
    modal.style.display = 'none';
};
(_a = modal.querySelector('.close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeModal);
const showModal = (content) => {
    modal.querySelector('.modal-content').innerText = content;
    modal.style.display = 'flex';
};
const createSymbolElement = (symbol) => {
    const symbolElement = document.createElement('div');
    symbolElement.className = 'symbol';
    symbolElement.innerText = symbol.emoji;
    symbolElement.addEventListener('click', () => showModal(symbol.content));
    return symbolElement;
};
const init = () => {
    const container = document.createElement('div');
    container.className = 'symbol-container';
    symbols.forEach(symbol => {
        container.appendChild(createSymbolElement(symbol));
    });
    document.body.appendChild(container);
};
window.onload = init;
//# sourceMappingURL=index.js.map