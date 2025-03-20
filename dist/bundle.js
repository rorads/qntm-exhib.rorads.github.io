(()=>{"use strict";var n={56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var r={},a=[],s=0;s<n.length;s++){var l=n[s],c=o.base?l[0]+o.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var p=t(d),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(m);else{var f=i(m,o);o.byIndex=s,e.splice(s,0,{identifier:d,updater:f,references:1})}a.push(d)}return a}function i(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,i){var r=o(n=n||[],i=i||{});return function(n){n=n||[];for(var a=0;a<r.length;a++){var s=t(r[a]);e[s].references--}for(var l=o(n,i),c=0;c<r.length;c++){var u=t(r[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=l}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,i,r){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(a[l]=!0)}for(var c=0;c<n.length;c++){var u=[].concat(n[c]);o&&a[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),e.push(u))}},e}},365:(n,e,t)=>{t.d(e,{A:()=>p});var o=t(601),i=t.n(o),r=t(314),a=t.n(r),s=t(417),l=t.n(s),c=new URL(t(998),t.b),u=a()(i()),d=l()(c);u.push([n.id,`* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Roboto', sans-serif;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  position: relative;\n  background-color: #02050e;\n}\n\n.background {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: url(${d}) no-repeat center center;\n  background-size: cover;\n  opacity: 0.7;\n  z-index: 0;\n}\n\n#symbols-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n.quantum-symbol {\n  position: absolute;\n  font-weight: 500;\n  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  user-select: none;\n  transition: transform 0.3s ease;\n}\n\n.quantum-symbol:hover {\n  transform: scale(1.2);\n}\n\n.modal {\n  position: fixed;\n  z-index: 1000;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: rgb(193, 232, 201);\n  display: none; /* Hidden by default */\n  justify-content: center;\n  align-items: center;\n  transition: opacity 0.3s ease;\n}\n\n.modal.active {\n  display: flex !important; /* Override any other display properties */\n  opacity: 1 !important; /* Ensure visibility */\n}\n\n.modal-content {\n  background-color: #fefefe;\n  margin: auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 80%;\n  max-width: 600px;\n  border-radius: 10px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);\n  max-height: 80vh; /* Limit height to 80% of viewport height */\n  overflow-y: auto; /* Enable vertical scrolling */\n}\n\n.close-button {\n  color: #aaa;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n}\n\n.close-button:hover,\n.close-button:focus {\n  color: black;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nbody.modal-open {\n  overflow: hidden;\n}\n\n#modal-title {\n  margin-bottom: 20px;\n  color: #7b83ff;\n}\n\n#modal-body {\n  line-height: 1.6;\n  white-space: pre-wrap; /* This makes the text respect newlines */\n  overflow-y: auto; /* Enable vertical scrolling */\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .modal-content {\n    margin: 10% auto;\n    width: 90%;\n    max-height: 70vh; /* Smaller max height on mobile */\n  }\n  \n  .quantum-symbol {\n    font-size: 40px !important;\n  }\n}\n\nbody {\n    margin: 0;\n    padding: 0;\n    font-family: 'Arial', sans-serif;\n    background: url(${d}) no-repeat center center fixed;\n    background-size: cover;\n    overflow: hidden;\n}\n\n.symbol {\n    position: absolute;\n    font-size: 3rem;\n    transition: transform 0.3s ease;\n    cursor: pointer;\n}\n\n.symbol:hover {\n    transform: scale(1.2);\n}\n\n.modal-content {\n    max-width: 600px;\n    padding: 20px;\n    text-align: center;\n    background: rgba(170, 167, 234, 0.1);\n    border-radius: 10px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n}\n\n.close {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    font-size: 2rem;\n    cursor: pointer;\n    color: white;\n}\n\n.mute-button {\n  position: fixed;\n  top: 15px;\n  right: 15px;\n  padding: 8px 12px;\n  border-radius: 4px;\n  background-color: rgba(0, 0, 0, 0.7);\n  color: white;\n  font-size: 14px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  cursor: pointer;\n  z-index: 1000;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n\n.mute-button:hover {\n  background-color: rgba(0, 0, 0, 0.9);\n}\n\n.mute-button.muted {\n  background-color: #2ecc71;\n  color: white;\n}\n\n.mute-button.playing {\n  background-color: #e74c3c;\n}\n\n.mute-button.audio-error {\n  background-color: #7f8c8d;\n  cursor: not-allowed;\n}`,""]);const p=u},417:n=>{n.exports=function(n,e){return e||(e={}),n?(n=String(n.__esModule?n.default:n),/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),e.hash&&(n+=e.hash),/["'() \t\n]|(%20)/.test(n)||e.needQuotes?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n):n}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},601:n=>{n.exports=function(n){return n[1]}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var i=void 0!==t.layer;i&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,i&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},998:(n,e,t)=>{n.exports=t.p+"b1aea5d48f4806a60861.svg"}},e={};function t(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={id:o,exports:{}};return n[o](r,r.exports,t),r.exports}t.m=n,t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&"SCRIPT"===e.currentScript.tagName.toUpperCase()&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var i=o.length-1;i>-1&&(!n||!/^http(s?):/.test(n));)n=o[i--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.b=document.baseURI||self.location.href,t.nc=void 0;var o=t(72),i=t.n(o),r=t(825),a=t.n(r),s=t(659),l=t.n(s),c=t(56),u=t.n(c),d=t(540),p=t.n(d),m=t(113),f=t.n(m),h=t(365),y={};y.styleTagTransform=f(),y.setAttributes=u(),y.insert=l().bind(null,"head"),y.domAPI=a(),y.insertStyleElement=p(),i()(h.A,y),h.A&&h.A.locals&&h.A.locals;let g=null,b=null,v=null,x=null,w=!0,L=!0;const A=[{id:"psi",name:"Wave Function",symbol:"Ψ",description:'The wave function represents the quantum state of a quantum system. It contains all the information about the system.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Here is some text with various html formatting: \n\n <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, <a href="https://example.com">Link</a>, <ul><li>List Item 1</li><li>List Item 2</li></ul>',position:{x:25,y:25},velocity:{x:.02,y:.03},size:60,color:"#3498db"},{id:"h",name:"Planck Constant",symbol:"ℎ",description:"The Planck constant is a fundamental physical constant central to quantum mechanics.",position:{x:65,y:45},velocity:{x:-.04,y:.02},size:50,color:"#e74c3c"},{id:"sigma",name:"Pauli Matrices",symbol:"σ",description:"Pauli matrices are a set of complex matrices that are Hermitian and unitary, used in quantum mechanics.",position:{x:40,y:70},velocity:{x:.03,y:-.02},size:55,color:"#2ecc71"},{id:"delta",name:"Uncertainty",symbol:"Δ",description:"In quantum mechanics, the uncertainty principle states that certain pairs of physical properties cannot be precisely measured simultaneously.",position:{x:75,y:65},velocity:{x:-.02,y:-.03},size:45,color:"#f39c12"}],E=document.getElementById("symbols-container"),k=document.getElementById("modal"),C=document.getElementById("modal-title"),z=document.getElementById("modal-body"),q=document.querySelector(".close-button");function T(){A.forEach((n=>{const e=document.getElementById(n.id);n.position.x+=n.velocity.x,n.position.y+=n.velocity.y,(n.position.x<=0||n.position.x>=90)&&(n.velocity.x*=-1),(n.position.y<=0||n.position.y>=90)&&(n.velocity.y*=-1),e.style.left=`${n.position.x}%`,e.style.top=`${n.position.y}%`})),requestAnimationFrame(T)}function I(){k&&(console.log("Closing modal"),k.style.display="none",k.style.opacity="0",k.classList.remove("active"),document.body.classList.remove("modal-open"))}function M(){return n=this,e=void 0,o=function*(){try{console.log("Initializing audio..."),g=new(window.AudioContext||window.webkitAudioContext),console.log("AudioContext created, state:",g.state),console.log("Fetching audio file...");const n=yield fetch("./assets/fm_synth_quantum.wav");if(!n.ok)throw new Error(`Failed to fetch audio: ${n.status} ${n.statusText}`);const e=yield n.arrayBuffer();console.log("Audio file fetched, size:",e.byteLength,"bytes");try{console.log("ArrayBuffer size:",e.byteLength),b=yield g.decodeAudioData(e.slice(0)),console.log("Forward buffer created successfully"),v=g.createBuffer(b.numberOfChannels,b.length,b.sampleRate);for(let n=0;n<b.numberOfChannels;n++){const e=b.getChannelData(n),t=v.getChannelData(n);for(let n=0;n<e.length;n++)t[n]=e[e.length-1-n]}console.log("Audio initialization complete"),P()}catch(n){console.error("Failed to decode audio:",n),S()}}catch(n){console.error("Failed to initialize audio:",n),S()}},new((t=void 0)||(t=Promise))((function(i,r){function a(n){try{l(o.next(n))}catch(n){r(n)}}function s(n){try{l(o.throw(n))}catch(n){r(n)}}function l(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(a,s)}l((o=o.apply(n,e||[])).next())}));var n,e,t,o}function S(){const n=document.getElementById("mute-button");n&&(n.innerHTML="🔇 Audio Error",n.classList.add("audio-error"),n.title="Audio file could not be loaded",n.disabled=!0)}function P(){const n=document.getElementById("mute-button");n&&(L?(n.innerHTML="🔊 Play Audio",n.classList.add("muted"),n.classList.remove("playing")):(n.innerHTML="🔇 Mute Audio",n.classList.remove("muted"),n.classList.add("playing")))}function $(){g?b&&v?L?console.log("Audio is muted, not playing"):(console.log("Playing audio in "+(w?"forward":"reverse")+" direction"),x&&(x.stop(),x=null),x=g.createBufferSource(),x.buffer=w?b:v,x.connect(g.destination),x.onended=()=>{w=!w,$()},x.start()):console.error("Audio buffers not loaded"):console.error("AudioContext not initialized")}q&&q.addEventListener("click",I),window.addEventListener("click",(n=>{n.target===k&&I()})),document.addEventListener("DOMContentLoaded",(()=>{E&&k&&C&&z&&q?(A.forEach((n=>{const e=document.createElement("div");e.className="quantum-symbol",e.id=n.id,e.innerHTML=n.symbol,e.style.fontSize=`${n.size}px`,e.style.color=n.color,e.style.left=`${n.position.x}%`,e.style.top=`${n.position.y}%`,e.style.zIndex="100",e.addEventListener("click",(e=>{console.log(`Symbol ${n.id} clicked!`),e.stopPropagation(),function(n){C&&z&&k?(console.log("Opening modal:",n.title),C.textContent=n.title,z.innerHTML=n.content,k.style.display="flex",k.style.opacity="1",k.classList.add("active"),document.body.classList.add("modal-open")):console.error("Modal elements not found in the DOM")}({title:n.name,content:n.description})})),E.appendChild(e)})),console.log(`Created ${A.length} symbols`),T(),function(){const n=document.createElement("button");n.id="mute-button",n.className="mute-button muted",n.innerHTML="🔊 Play Audio",n.title="Click to play audio",n.addEventListener("click",(n=>{n.stopPropagation(),function(){if(!g||!b||!v)return console.error("Cannot toggle audio - not properly initialized"),void M();L=!L,P(),L?(x&&(x.stop(),x=null),console.log("Audio muted")):(console.log("Attempting to unmute and play audio"),"suspended"===g.state?g.resume().then((()=>{console.log("AudioContext resumed"),$()})):$())}()})),document.body.appendChild(n),console.log("Mute button created")}(),M(),console.log("Quantum Symbols initialized")):console.error("Required DOM elements not found")}))})();