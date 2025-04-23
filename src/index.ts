import './styles.css';
import { QuantumSymbol, ModalOptions } from './types';

// Audio management variables
let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let audioSource: AudioBufferSourceNode | null = null;
let isMuted: boolean = true; // Start muted

// Display an alert only if the user is on iOS Chrome
if (!!navigator.userAgent.match('CriOS')) {
  alert(navigator.userAgent);
}

// Quantum symbol definitions
const quantumSymbols: QuantumSymbol[] = [
  {
    id: 'ana1',
    name: 'Quantum Soundscape',
    symbol: '🔊',
    description: '<h3>Artist: Ana (@lunattic_sounds)</h3>' +
      '<img src="./assets/demo-exhibit-pictures-ai/6.webp" alt="Quantum Soundscape Installation" width="300" height="auto" />\n\n' +
      '<p>The beautiful hi-fi speakers were handmade by our friends Cameron and Finlay, who also organise the popular dance party \'Coorie Doon\' in Glasgow.</p>\n' +
      '<p>The soundscape of the exhibition blends recordings from real quantum experiments with sonified data. Inspired by Pauline Oliveros\' concept of Quantum Listening, what at first seems like a steady drone gradually reveals subtle shifts and rich textures, mirroring the hidden complexity of the quantum world.</p>\n' +
      '<p>I used the digital tool PaulXStretch to stretch audio and expose the sound particles within. Oliveros (1930–2016), an influential sound artist and philosopher, developed the idea of the listening effect, which parallels the observer effect in quantum physics, where the act of observing a particle changes the behavior of the particle (remember Schrödinger\'s cat?). As she wrote: "What is heard is changed by listening, and changes the listener."</p>\n' +
      '<p>I positioned different sound sources in various parts of the space, not only to create a more immersive sonic environment, but also to reflect her idea that "Quantum Listening is listening to more than one reality simultaneously." One of the sound sources plays poetry by Glasgow-based artist and activist Nadia Violette—a reflection on static vision and its curious visual parallel to the quantum world.</p>\n' +
      '<p><strong>Links:</strong></p>' +
      '<ul style="text-align:left">' +
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
  },
  {
    id: 'darren',
    name: 'Harvest Now, Decrypt Later',
    symbol: '🌽',
    description: '<h3>Artist: Darren Robertson</h3>' +
      '<img src="./assets/demo-exhibit-pictures-ai/2.webp" alt="Harvest Now, Decrypt Later Game" width="300" height="auto" />\n\n' +
      '<p>Are we ready for Q-Day?</p>\n' +
      '<p>There will come a day when quantum computers are powerful enough to break existing encryption methods. Much of the world\'s data and systems will be vulnerable to actors with access to this technology.</p>\n' +
      '<p>Cybersecurity experts recommend that we adapt to quantum-safe methods of cryptography to protect our data from this future threat. These methods already exist, however the vast majority of the world\'s data is not using it. There is on-going efforts to make the transition.</p>\n' +
      '<p>But what if you stole and held onto this data in the present day? You can\'t decrypt it yet. But one day you might. This day has been coined as "Quantum Day" or Q-Day.</p>\n' +
      '<p>"Harvest Now, Decrypt Later" is a game that puts the player in the role of a hacker tasked with harvesting data. You will hop between different organisation and choose which data to steal from them. Experts predict Q-Day will be with us in 5-30 years. Will the data you choose to harvest be of any use in that time?</p>\n' +
      '<p><strong>Medium:</strong> Interactive Game</p>\n' +
      '<h4>Artist Bio</h4>' +
      '<p>Darren Robertson is a game designer and developer focused on creating experiences that explore complex technological concepts through accessible gameplay. Visit more of his work at: <a href="https://dobertson.itch.io" target="_blank">dobertson.itch.io</a></p>',
    position: { x: 65, y: 45 },
    velocity: { x: -0.04, y: 0.02 },
    size: 60,
    color: '#e74c3c'
  },
  {
    id: 'ana2',
    name: 'The Black Box',
    symbol: '∞',
    description: '<h3>Artist: Ana (@lunattic_sounds)</h3>' +
      '<img src="./assets/demo-exhibit-pictures-ai/4.webp" alt="The Black Box Installation" width="300" height="auto" />\n\n' +
      '<p>What does \'quantum\' mean to you?</p>\n' +
      '<p>This sound piece plays an infinite loop of voice notes from non-experts answering that question. Housed inside a literal black box, it reflects how the field of quantum physics is often seen: mysterious, sealed off and a little intimidating. And yet, somehow, we\'ve all heard the word.</p>\n' +
      '<p>The word quantum has become part of our everyday language—appearing in music, psychology, philosophy, art, spirituality, science fiction, film, wellness, and beyond. This cultural spread has been shaped less by physicists and more by artists, writers, filmmakers, and thinkers—those who reinterpret science through metaphor, story, and imagination.</p>\n' +
      '<p>Of course, there\'s something a bit ironic here. While this exhibition continues the tradition of non-experts reinterpreting quantum through artistic imagination, it also reflects a gap in how the field has been communicated. In a world where science can feel distant, overly complex, or even elitist, there\'s room (and a need) for more generous, open dialogue between scientists and the public...especially when complex scientific language like quantum terminology is sometimes used or communicated in ways that can mislead or have unintended consequences.</p>\n' +
      '<p>Still, the concept has become wonderfully malleable. It\'s been stretched and abstracted; it now means everything… and nothing. But across all these interpretations, one thing tends to remain: a sense of ungraspability. The word quantum gestures toward something that resists certainty—something fundamentally unknowable, just out of reach. Perhaps that\'s why it resonates so deeply: it mirrors our experience of reality in some way.</p>\n' +
      '<p>This piece invites listeners to reflect on their own interpretation of the term. Some voice notes are funny, some thoughtful, some poetic or uncertain. But together, they suggest something bigger: that reality is more complex than it seems. That not knowing is okay. That curiosity is enough.</p>\n' +
      '<p><strong>Medium:</strong> Sound installation, headset, recycled wood</p>\n' +
      '<p><em>Black box and headset stand made by Boomerang Woodworking, a community Workshop promoting wellbeing, creativity and skills development through woodwork with the reuse of recycled wood at the heart of their philosophy.</em></p>\n' +
      '<h4>Artist Bio</h4>' +
      '<p>Ana (she/her) holds a PhD in Political Communication and is passionate about making academic research more accessible to a wider audience. She is also an electronic music producer (under the alias lunattic), and radio host at local community radio station Radio Buena Vida. Over the past couple of years, she has facilitated music production workshops with a focus on accessibility and collaboration. Her creative work—whether through music, radio, or teaching—is driven by a commitment to playfulness and experimentation.</p>',
    position: { x: 40, y: 70 },
    velocity: { x: 0.03, y: -0.02 },
    size: 60,
    color: '#2ecc71'
  },
  // {
  //   id: 'h',
  //   name: 'Constant Flux',
  //   symbol: 'ℎ',
  //   description: '<h3>Artist: Quanta Bohr</h3>' +
  //     '<img src="./assets/demo-exhibit-pictures-ai/2.webp" alt="Constant Flux Installation" width="300" height="auto" />\n\n' +
  //     '<p>This kinetic sculpture uses magnetically suspended elements that never quite settle into a fixed position. ' +
  //     'The seemingly chaotic movements follow precise mathematical formulas derived from quantum field theory, ' +
  //     'creating a mesmerizing dance of metal and light that appears both random and ordered.</p>\n' +
  //     '<p>The sculpture plays with the concept of discrete energy states, with subtle LED elements that shift in brightness ' +
  //     'only at specific intervals, never between them - a physical manifestation of quantum leaps.</p>\n' +
  //     '<p><strong>Medium:</strong> Polished aluminum, neodymium magnets, microcontrollers, LEDs</p>\n' +
  //     '<ul><li>Commissioned by CERN for their public gallery</li><li>Tour includes Tokyo Science Museum and Smithsonian</li></ul>',
  //   position: { x: 65, y: 45 },
  //   velocity: { x: -0.04, y: 0.02 },
  //   size: 60,
  //   color: '#e74c3c'
  // },
  // {
  //   id: 'sigma',
  //   name: 'Matrix Reflections',
  //   symbol: 'σ',
  //   description: '<h3>Artist: Pauli Schrödinger</h3>' +
  //     '<img src="./assets/demo-exhibit-pictures-ai/3.webp" alt="Matrix Reflections Installation" width="300" height="auto" />\n\n' +
  //     '<p>A room of perfectly aligned mirrors creates infinite reflections that transform visitors into multi-dimensional beings. ' +
  //     'Special dichroic filters cause the reflections to split into different spectra based on viewing angle, ' +
  //     'representing the multi-state nature of quantum information.</p>\n' +
  //     '<p>As viewers move through the space, their reflections appear to make decisions independent of the original, ' +
  //     'suggesting parallel realities coexisting within our own. The installation creates a sense of disorientation that ' +
  //     'forces confrontation with our limited perception of dimensions.</p>\n' +
  //     '<p><strong>Medium:</strong> Custom mirrors, dichroic glass, geometric framework, programmed lighting</p>\n' +
  //     '<ul><li>Current exhibition at Guggenheim</li><li>Featured in "Quantum Aesthetics" documentary</li></ul>',
  //   position: { x: 40, y: 70 },
  //   velocity: { x: 0.03, y: -0.02 },
  //   size: 60,
  //   color: '#2ecc71'
  // },
  // {
  //   id: 'delta',
  //   name: 'Uncertainty Principle',
  //   symbol: 'Δ',
  //   description: '<h3>Artist: Max Feynman</h3>' +
  //     '<img src="./assets/demo-exhibit-pictures-ai/4.webp" alt="Uncertainty Principle Installation" width="300" height="auto" />\n\n' +
  //     '<p>This interactive installation features a series of delicate pendulums whose movements are influenced by subtle ' +
  //     'air currents created by visitors. The more closely one attempts to observe the pendulums, the more one\'s breath ' +
  //     'and body heat disrupt their patterns, making precise measurement impossible.</p>\n' +
  //     '<p>Overhead cameras track the pendulum movements, generating real-time visualizations that demonstrate the ' +
  //     'mathematical beauty of uncertainty. The piece comments on the futility of perfect knowledge and the ' +
  //     'observer effect inherent in all systems.</p>\n' +
  //     '<p><strong>Medium:</strong> Suspended glass pendulums, thermal sensors, generative projection mapping</p>\n' +
  //     '<ul><li>Published in Art & Physics Quarterly</li><li>Acquired by Tate Modern permanent collection</li></ul>',
  //   position: { x: 75, y: 65 },
  //   velocity: { x: -0.02, y: -0.03 },
  //   size: 60,
  //   color: '#f39c12'
  // },
  // {
  //   id: 'omega',
  //   name: 'Entangled States',
  //   symbol: '🍌',
  //   description: '<h3>Artist: Niels Einstein</h3>' +
  //     '<img src="./assets/demo-exhibit-pictures-ai/5.webp" alt="Entangled States Installation" width="300" height="auto" />\n\n' +
  //     '<p>A provocative installation featuring two separate rooms in different parts of the gallery that are connected ' +
  //     'through technology. Actions in one room cause immediate reactions in the other, defying our classical understanding ' +
  //     'of cause and effect. The banana symbol serves as a whimsical reference to quantum absurdity.</p>\n' +
  //     '<p>Visitors collaborate unknowingly with strangers, creating synchronized light patterns and sound compositions ' +
  //     'that evolve based on collective behavior. The piece explores connection, causality, and the invisible threads ' +
  //     'that bind seemingly separate systems.</p>\n' +
  //     '<p style="text-align:left"><strong>Medium:</strong> Custom sensors, fiber optics, real-time data transmission, responsive environments</p>\n' +
  //     '<ul><li>Winner of the Quantum Art Prize</li><li>Installations in New York and Tokyo simultaneously</li></ul>',
  //   position: { x: 55, y: 55 },
  //   velocity: { x: 0.01, y: 0.01 },
  //   size: 60,
  //   color: '#9b59b6'
  // },
]

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
  const velocityScale = 10;
  
  // Detect if user is on iOS Chrome
  const isIOSChrome = !!navigator.userAgent.match('CriOS');

  // Define a smaller bottom boundary for iOS Chrome to account for its interface elements
  // iOS Chrome has a navigation bar at the bottom that takes up more space than other browsers
  // Using 85% instead of 90% prevents symbols from disappearing behind this UI element
  const bottomOffset = isIOSChrome ? 80 : 90;
  
  quantumSymbols.forEach(symbol => {
    const symbolElement = document.getElementById(symbol.id) as HTMLDivElement;
    
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
    
    // Apply new position
    symbolElement.style.left = `${symbol.position.x}%`;
    symbolElement.style.top = `${symbol.position.y}%`;
  });
  
  requestAnimationFrame(animateSymbols);
}

// Modal functionality
function openModal(options: ModalOptions) {
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
  if (!modal) return;
  console.log("Closing modal"); // Debug log
  
  modal.style.display = 'none';
  modal.style.opacity = '0';
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// Audio functions
async function initializeAudio() {
  try {
    console.log("Initializing audio...");
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    console.log("AudioContext created, state:", audioContext.state);
    
    console.log("Fetching audio file...");
    const response = await fetch('./assets/fm_synth_quantum.wav');
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    console.log("Audio file fetched, size:", arrayBuffer.byteLength, "bytes");
    
    try {
      console.log(arrayBuffer)
      audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      console.log("Audio buffer created successfully");
      updateMuteButtonState(); // Update button to show audio is available
    } catch (decodeError) {
      console.error("Failed to decode audio:", decodeError);
      showAudioError();
    }
  } catch (error) {
    console.error("Failed to initialize audio:", error);
    showAudioError();
  }
}

function showAudioError() {
  const muteButton = document.getElementById('mute-button');
  if (muteButton) {
    muteButton.innerHTML = '🔇 Audio Error';
    muteButton.classList.add('audio-error');
    muteButton.title = 'Audio file could not be loaded';
    (muteButton as HTMLButtonElement).disabled = true;
  }
}

function updateMuteButtonState() {
  const muteButton = document.getElementById('mute-button');
  if (!muteButton) return;
  
  if (isMuted) {
    muteButton.innerHTML = '🔊 Play Audio';
    muteButton.classList.add('muted');
    muteButton.classList.remove('playing');
  } else {
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
  } else {
    console.log("Attempting to play audio");
    // Resume audio context if it was suspended (autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log("AudioContext resumed");
        playAudio();
      });
    } else {
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
  initializeAudio();  // Initialize audio
  
  // Add this for debugging
  console.log("Quantum Symbols initialized");
});