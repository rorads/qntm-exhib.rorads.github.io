import './styles.css';
import { QuantumSymbol, ModalOptions } from './types';

// Quantum symbol definitions
const quantumSymbols: QuantumSymbol[] = [
  {
    id: 'psi',
    name: 'Wave Function',
    symbol: 'Ψ',
    description: 'The wave function represents the quantum state of a quantum system. It contains all the information about the system.',
    position: { x: 25, y: 25 },
    velocity: { x: 0.5, y: 0.3 },
    size: 60,
    color: '#3498db'
  },
  {
    id: 'h',
    name: 'Planck Constant',
    symbol: 'ℎ',
    description: 'The Planck constant is a fundamental physical constant central to quantum mechanics.',
    position: { x: 65, y: 45 },
    velocity: { x: -0.4, y: 0.5 },
    size: 50,
    color: '#e74c3c'
  },
  {
    id: 'sigma',
    name: 'Pauli Matrices',
    symbol: 'σ',
    description: 'Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.',
    position: { x: 40, y: 70 },
    velocity: { x: 0.3, y: -0.4 },
    size: 55,
    color: '#2ecc71'
  },
  {
    id: 'delta',
    name: 'Uncertainty',
    symbol: 'Δ',
    description: 'In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.',
    position: { x: 75, y: 65 },
    velocity: { x: -0.2, y: -0.3 },
    size: 45,
    color: '#f39c12'
  }
];

// DOM references
const symbolsContainer = document.getElementById('symbols-container') as HTMLDivElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
const modalBody = document.getElementById('modal-body') as HTMLDivElement;
const closeButton = document.querySelector('.close-button') as HTMLSpanElement;

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
    
    symbolElement.addEventListener('click', () => {
      openModal({
        title: symbol.name,
        content: symbol.description
      });
    });
    
    symbolsContainer.appendChild(symbolElement);
  });
}

// Animation of symbols
function animateSymbols() {
  quantumSymbols.forEach(symbol => {
    const symbolElement = document.getElementById(symbol.id) as HTMLDivElement;
    
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
function openModal(options: ModalOptions) {
  modalTitle.textContent = options.title;
  modalBody.textContent = options.content;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// Event listeners
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  createSymbols();
  animateSymbols();
});
import './styles.css';
import { QuantumSymbol, ModalOptions } from './types';

// Quantum symbol definitions
const quantumSymbols: QuantumSymbol[] = [
  {
    id: 'psi',
    name: 'Wave Function',
    symbol: 'Ψ',
    description: 'The wave function represents the quantum state of a quantum system. It contains all the information about the system.',
    position: { x: 25, y: 25 },
    velocity: { x: 0.5, y: 0.3 },
    size: 60,
    color: '#3498db'
  },
  {
    id: 'h',
    name: 'Planck Constant',
    symbol: 'ℎ',
    description: 'The Planck constant is a fundamental physical constant central to quantum mechanics.',
    position: { x: 65, y: 45 },
    velocity: { x: -0.4, y: 0.5 },
    size: 50,
    color: '#e74c3c'
  },
  {
    id: 'sigma',
    name: 'Pauli Matrices',
    symbol: 'σ',
    description: 'Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.',
    position: { x: 40, y: 70 },
    velocity: { x: 0.3, y: -0.4 },
    size: 55,
    color: '#2ecc71'
  },
  {
    id: 'delta',
    name: 'Uncertainty',
    symbol: 'Δ',
    description: 'In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.',
    position: { x: 75, y: 65 },
    velocity: { x: -0.2, y: -0.3 },
    size: 45,
    color: '#f39c12'
  }
];

// DOM references
const symbolsContainer = document.getElementById('symbols-container') as HTMLDivElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
const modalBody = document.getElementById('modal-body') as HTMLDivElement;
const closeButton = document.querySelector('.close-button') as HTMLSpanElement;

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
    
    symbolElement.addEventListener('click', () => {
      openModal({
        title: symbol.name,
        content: symbol.description
      });
    });
    
    symbolsContainer.appendChild(symbolElement);
  });
}

// Animation of symbols
function animateSymbols() {
  quantumSymbols.forEach(symbol => {
    const symbolElement = document.getElementById(symbol.id) as HTMLDivElement;
    
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
function openModal(options: ModalOptions) {
  modalTitle.textContent = options.title;
  modalBody.textContent = options.content;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// Event listeners
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  createSymbols();
  animateSymbols();
});
import './styles.css';
import { QuantumSymbol, ModalOptions, SymbolData } from './types';

// Quantum symbol definitions
const quantumSymbols: QuantumSymbol[] = [
  {
    id: 'psi',
    name: 'Wave Function',
    symbol: 'Ψ',
    description: 'The wave function represents the quantum state of a quantum system. It contains all the information about the system.',
    position: { x: 25, y: 25 },
    velocity: { x: 0.5, y: 0.3 },
    size: 60,
    color: '#3498db'
  },
  {
    id: 'h',
    name: 'Planck Constant',
    symbol: 'ℎ',
    description: 'The Planck constant is a fundamental physical constant central to quantum mechanics.',
    position: { x: 65, y: 45 },
    velocity: { x: -0.4, y: 0.5 },
    size: 50,
    color: '#e74c3c'
  },
  {
    id: 'sigma',
    name: 'Pauli Matrices',
    symbol: 'σ',
    description: 'Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.',
    position: { x: 40, y: 70 },
    velocity: { x: 0.3, y: -0.4 },
    size: 55,
    color: '#2ecc71'
  },
  {
    id: 'delta',
    name: 'Uncertainty',
    symbol: 'Δ',
    description: 'In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.',
    position: { x: 75, y: 65 },
    velocity: { x: -0.2, y: -0.3 },
    size: 45,
    color: '#f39c12'
  }
];

// DOM references
const symbolsContainer = document.getElementById('symbols-container') as HTMLDivElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
const modalBody = document.getElementById('modal-body') as HTMLDivElement;
const closeButton = document.querySelector('.close-button') as HTMLSpanElement;

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
    
    symbolElement.addEventListener('click', () => {
      openModal({
        title: symbol.name,
        content: symbol.description
      });
    });
    
    symbolsContainer.appendChild(symbolElement);
  });
}

// Animation of symbols
function animateSymbols() {
  quantumSymbols.forEach(symbol => {
    const symbolElement = document.getElementById(symbol.id) as HTMLDivElement;
    
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
function openModal(options: ModalOptions) {
  modalTitle.textContent = options.title;
  modalBody.textContent = options.content;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// Event listeners
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  createSymbols();
  animateSymbols();
});
import './styles.css';
import { QuantumSymbol, ModalOptions } from './types';

// Quantum symbol definitions
const quantumSymbols: QuantumSymbol[] = [
  {
    id: 'psi',
    name: 'Wave Function',
    symbol: 'Ψ',
    description: 'The wave function represents the quantum state of a quantum system. It contains all the information about the system.',
    position: { x: 25, y: 25 },
    velocity: { x: 0.5, y: 0.3 },
    size: 60,
    color: '#3498db'
  },
  {
    id: 'h',
    name: 'Planck Constant',
    symbol: 'ℎ',
    description: 'The Planck constant is a fundamental physical constant central to quantum mechanics.',
    position: { x: 65, y: 45 },
    velocity: { x: -0.4, y: 0.5 },
    size: 50,
    color: '#e74c3c'
  },
  {
    id: 'sigma',
    name: 'Pauli Matrices',
    symbol: 'σ',
    description: 'Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.',
    position: { x: 40, y: 70 },
    velocity: { x: 0.3, y: -0.4 },
    size: 55,
    color: '#2ecc71'
  },
  {
    id: 'delta',
    name: 'Uncertainty',
    symbol: 'Δ',
    description: 'In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.',
    position: { x: 75, y: 65 },
    velocity: { x: -0.2, y: -0.3 },
    size: 45,
    color: '#f39c12'
  }
];

// DOM references
const symbolsContainer = document.getElementById('symbols-container') as HTMLDivElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
const modalBody = document.getElementById('modal-body') as HTMLDivElement;
const closeButton = document.querySelector('.close-button') as HTMLSpanElement;

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
    
    symbolElement.addEventListener('click', () => {
      openModal({
        title: symbol.name,
        content: symbol.description
      });
    });
    
    symbolsContainer.appendChild(symbolElement);
  });
}

// Animation of symbols
function animateSymbols() {
  quantumSymbols.forEach(symbol => {
    const symbolElement = document.getElementById(symbol.id) as HTMLDivElement;
    
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
function openModal(options: ModalOptions) {
  modalTitle.textContent = options.title;
  modalBody.textContent = options.content;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// Event listeners
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  createSymbols();
  animateSymbols();
});
// This file is the main entry point of the application. It initializes the floating symbols, sets up event listeners for clicks, and manages the display of the modal with content.

import './styles.css';
import { SymbolData } from './types';

const symbols: SymbolData[] = [
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

modal.querySelector('.close')?.addEventListener('click', closeModal);

const showModal = (content: string) => {
    modal.querySelector('.modal-content')!.innerText = content;
    modal.style.display = 'flex';
};

const createSymbolElement = (symbol: SymbolData) => {
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