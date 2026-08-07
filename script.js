/**
 * ============================================================================
 * ULTRA PREMIUM LUXURY BIRTHDAY SURPRISE - ENGINE
 * Target: Riju
 * Stack: HTML5, CSS3, Vanilla JavaScript (60fps Canvas & Web Audio API)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. GLOBAL STATE & SELECTORS
     -------------------------------------------------------------------------- */
  const state = {
    musicPlaying: false,
    envelopeUntied: false,
    envelopeOpened: false,
    giftOpened: false,
    candlesBlown: false,
    scratchCardsCleared: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
  };

  // DOM Elements
  const introScreen = document.getElementById('intro-screen');
  const typewriterTextEl = document.getElementById('typewriter-text');
  const introStartBtn = document.getElementById('intro-start-btn');
  
  const musicToggleBtn = document.getElementById('music-toggle');
  const musicIconEl = document.getElementById('music-icon');
  const musicTextEl = document.getElementById('music-text');
  const bgAudio = document.getElementById('bg-audio');

  const envelope = document.getElementById('envelope');
  const ribbonBow = document.getElementById('ribbon-bow');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  
  const surprisesSection = document.getElementById('surprises-section');
  const giftSection = document.getElementById('gift-section');
  const scrollToEnvelopeBtn = document.getElementById('scroll-to-envelope');

  const giftBox = document.getElementById('gift-box');
  const blowCandlesBtn = document.getElementById('blow-candles-btn');

  // Canvases
  const bgCanvas = document.getElementById('bg-particles-canvas');
  const fireworksCanvas = document.getElementById('fireworks-canvas');
  const confettiCanvas = document.getElementById('confetti-canvas');

  /* --------------------------------------------------------------------------
     2. INTRO TYPEWRITER & SCREEN CONTROLLER
     -------------------------------------------------------------------------- */
  const introMessage = "A Special Surprise Awaits...";
  let typewriterIndex = 0;

  function typeWriter() {
    if (typewriterIndex < introMessage.length) {
      typewriterTextEl.textContent += introMessage.charAt(typewriterIndex);
      typewriterIndex++;
      setTimeout(typeWriter, 110);
    } else {
      // Typewriter finished -> reveal start button
      setTimeout(() => {
        introStartBtn.classList.remove('hidden');
        introStartBtn.classList.add('show');
      }, 400);
    }
  }

  // Start typewriter after brief delay
  setTimeout(typeWriter, 600);

  // Enter Experience Event
  function enterExperience() {
    introScreen.classList.add('fade-out');
    toggleMusic(true);
    spawnBalloons(12);
  }

  introStartBtn.addEventListener('click', enterExperience);

  /* --------------------------------------------------------------------------
     3. AUDIO SYSTEM (MP3 + SYNTH FALLBACK)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let synthInterval = null;

  function initWebAudioSynth() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    } catch (e) {
      console.warn("Web Audio API not supported.");
    }
  }

  function playSynthAmbientMelody() {
    if (!audioCtx) initWebAudioSynth();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Pentatonic C Major C, E, G, C, E, G
    let step = 0;

    synthInterval = setInterval(() => {
      if (!state.musicPlaying) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      const freq = notes[step % notes.length];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2);

      step++;
    }, 800);
  }

  function toggleMusic(forceState) {
    const shouldPlay = forceState !== undefined ? forceState : !state.musicPlaying;
    state.musicPlaying = shouldPlay;

    if (shouldPlay) {
      musicToggleBtn.classList.add('playing');
      musicIconEl.textContent = '🎶';
      musicTextEl.textContent = 'Music On';
      
      // Try HTML5 Audio first
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to gentle Web Audio synth
          playSynthAmbientMelody();
        });
      }
    } else {
      musicToggleBtn.classList.remove('playing');
      musicIconEl.textContent = '🎵';
      musicTextEl.textContent = 'Music Off';
      bgAudio.pause();
      if (synthInterval) clearInterval(synthInterval);
    }
  }

  musicToggleBtn.addEventListener('click', () => toggleMusic());

  /* --------------------------------------------------------------------------
     4. BACKGROUND AMBIENT PARTICLES (GOLDEN ORBS & DUST)
     -------------------------------------------------------------------------- */
  const bgCtx = bgCanvas.getContext('2d');
  let bgParticles = [];
  const bgParticleCount = 65;

  function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeBgCanvas);
  resizeBgCanvas();

  class BgParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * bgCanvas.width;
      this.y = Math.random() * bgCanvas.height;
      this.radius = Math.random() * 2.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.4 - 0.1;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.hue = Math.random() < 0.8 ? 45 : 35; // Gold tones
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10 || this.x < -10 || this.x > bgCanvas.width + 10) {
        this.reset();
        this.y = bgCanvas.height + 10;
      }
    }
    draw() {
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      bgCtx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.alpha})`;
      bgCtx.shadowBlur = this.radius * 4;
      bgCtx.shadowColor = 'rgba(212, 175, 55, 0.6)';
      bgCtx.fill();
    }
  }

  for (let i = 0; i < bgParticleCount; i++) {
    bgParticles.push(new BgParticle());
  }

  function renderBgParticles() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgParticles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(renderBgParticles);
  }
  renderBgParticles();

  /* --------------------------------------------------------------------------
     5. 3D LUXURY ENVELOPE & LETTER ANIMATIONS
     -------------------------------------------------------------------------- */
  function openEnvelopeSequence() {
    if (state.envelopeOpened) return;

    // Step 1: Untie ribbon
    state.envelopeUntied = true;
    envelope.classList.add('untied');

    // Step 2: Open flap & slide letter
    setTimeout(() => {
      state.envelopeOpened = true;
      envelope.classList.add('open');
      spawnHearts(15);
    }, 600);
  }

  ribbonBow.addEventListener('click', openEnvelopeSequence);
  envelope.addEventListener('click', (e) => {
    if (!state.envelopeUntied && !e.target.closest('.envelope-letter')) {
      openEnvelopeSequence();
    }
  });

  // Action Button inside letter -> Scroll to Surprises
  openSurpriseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    surprisesSection.classList.remove('hidden-section');
    surprisesSection.classList.add('show');
    giftSection.classList.remove('hidden-section');
    giftSection.classList.add('show');

    surprisesSection.scrollIntoView({ behavior: 'smooth' });
    
    // Trigger celebrations!
    triggerConfetti();
    launchFireworksSequence();
  });

  scrollToEnvelopeBtn.addEventListener('click', () => {
    document.getElementById('envelope-section').scrollIntoView({ behavior: 'smooth' });
  });

  /* --------------------------------------------------------------------------
     6. SCRATCH CARDS CANVAS ENGINE
     -------------------------------------------------------------------------- */
  function initScratchCard(canvasId, cardId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const wrapper = canvas.parentElement;

    let isDrawing = false;

    function resizeCanvas() {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      drawFoil();
    }

    function drawFoil() {
      // Draw luxury metallic silver coating
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#d8d8d8');
      grad.addColorStop(0.3, '#ffffff');
      grad.addColorStop(0.5, '#aaaaaa');
      grad.addColorStop(0.8, '#eeeeee');
      grad.addColorStop(1, '#999999');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add metallic sparkles texture
      for (let i = 0; i < 300; i++) {
        ctx.fillStyle = Math.random() < 0.5 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }

      // Add text cue
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.fillStyle = '#222222';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ SCRATCH ME ✨', canvas.width / 2, canvas.height / 2);
    }

    resizeCanvas();

    function getPointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isDrawing || state.scratchCardsCleared[cardId]) return;
      e.preventDefault();

      const pos = getPointerPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fill();

      checkScratchProgress();
    }

    function checkScratchProgress() {
      if (state.scratchCardsCleared[cardId]) return;

      // Sample pixels for performance
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearCount = 0;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) clearCount++;
      }

      const percent = (clearCount / (pixels.length / 16)) * 100;
      if (percent > 40) {
        state.scratchCardsCleared[cardId] = true;
        canvas.classList.add('cleared');
        triggerConfettiBurst(canvas.getBoundingClientRect());
      }
    }

    // Event listeners for touch & mouse
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isDrawing = false; });

    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', () => { isDrawing = false; });
  }

  // Initialize all 6 scratch cards
  for (let i = 1; i <= 6; i++) {
    initScratchCard(`scratch-canvas-${i}`, i);
  }

  /* --------------------------------------------------------------------------
     7. 3D GIFT BOX & CANDLE BLOWING
     -------------------------------------------------------------------------- */
  giftBox.addEventListener('click', () => {
    if (!state.giftOpened) {
      state.giftOpened = true;
      giftBox.classList.add('open');
      triggerConfetti();
    }
  });

  blowCandlesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.candlesBlown) return;

    state.candlesBlown = true;
    
    // Extinguish flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach(f => f.classList.add('extinguished'));

    // Update button text
    blowCandlesBtn.querySelector('span').textContent = '🌟 Wish Granted, Riju!';
    blowCandlesBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    blowCandlesBtn.style.color = '#ffffff';

    // Finale FX!
    triggerConfetti();
    launchFireworksSequence();
    spawnHearts(25);
  });

  /* --------------------------------------------------------------------------
     8. FLOATING PARTICLES SYSTEM (BALLOONS & HEARTS)
     -------------------------------------------------------------------------- */
  const balloonsContainer = document.getElementById('balloons-container');
  const heartsContainer = document.getElementById('hearts-container');

  function spawnBalloons(count) {
    const colors = [
      'linear-gradient(135deg, #bf953f, #fcf6ba, #aa771c)', // Gold
      'linear-gradient(135deg, #e2e8f0, #ffffff, #94a3b8)', // Silver/White
      'linear-gradient(135deg, #f43f5e, #fda4af, #be123c)', // Rose Gold / Red
      'linear-gradient(135deg, #38bdf8, #818cf8, #1e3a8a)'  // Royal Blue
    ];

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = `${Math.random() * 92 + 4}%`;
      balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animationDuration = `${Math.random() * 6 + 7}s`;
      balloon.style.animationDelay = `${Math.random() * 4}s`;

      balloon.addEventListener('click', () => {
        balloon.style.transform = 'scale(1.4)';
        balloon.style.opacity = '0';
        setTimeout(() => balloon.remove(), 200);
      });

      balloonsContainer.appendChild(balloon);
    }
  }

  function spawnHearts(count) {
    const heartSymbols = ['💛', '✨', '💖', '🌟', '❤️'];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = `${Math.random() * 90 + 5}%`;
      heart.style.bottom = '0px';
      heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
      heart.style.animationDelay = `${Math.random() * 2}s`;

      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    }
  }

  /* --------------------------------------------------------------------------
     9. HIGH-PERFORMANCE CANVAS CONFETTI SYSTEM
     -------------------------------------------------------------------------- */
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiParticles = [];

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();

  class ConfettiParticle {
    constructor(x, y) {
      this.x = x !== undefined ? x : Math.random() * confettiCanvas.width;
      this.y = y !== undefined ? y : -20;
      this.size = Math.random() * 8 + 6;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = Math.random() * 4 + 3;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 10;
      this.colors = ['#d4af37', '#fcf6ba', '#ffffff', '#aa771c', '#ffdf00'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.alpha = 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.vy += 0.05; // gravity
      this.alpha -= 0.005;
    }
    draw() {
      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = this.color;
      confettiCtx.globalAlpha = Math.max(0, this.alpha);
      confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      confettiCtx.restore();
    }
  }

  function triggerConfetti() {
    for (let i = 0; i < 120; i++) {
      confettiParticles.push(new ConfettiParticle());
    }
  }

  function triggerConfettiBurst(rect) {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 50; i++) {
      const p = new ConfettiParticle(cx, cy);
      p.vx = (Math.random() - 0.5) * 12;
      p.vy = (Math.random() - 0.5) * 12;
      confettiParticles.push(p);
    }
  }

  function renderConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0 || p.y > confettiCanvas.height + 50) {
        confettiParticles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderConfetti);
  }
  renderConfetti();

  /* --------------------------------------------------------------------------
     10. CANVAS FIREWORKS ENGINE
     -------------------------------------------------------------------------- */
  const fwCtx = fireworksCanvas.getContext('2d');
  let fireworks = [];
  let fwParticles = [];

  function resizeFireworksCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFireworksCanvas);
  resizeFireworksCanvas();

  class Firework {
    constructor(targetX, targetY) {
      this.x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
      this.y = window.innerHeight;
      this.targetX = targetX;
      this.targetY = targetY;
      this.speed = 10;
      const angle = Math.atan2(targetY - this.y, targetX - this.x);
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
      this.exploded = false;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.vy < 0 && this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    }
    explode() {
      const count = 70;
      for (let i = 0; i < count; i++) {
        fwParticles.push(new FwParticle(this.x, this.y));
      }
    }
    draw() {
      if (this.exploded) return;
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      fwCtx.fillStyle = '#ffdf00';
      fwCtx.fill();
    }
  }

  class FwParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.friction = 0.95;
      this.gravity = 0.08;
      this.colors = ['#d4af37', '#fcf6ba', '#ffffff', '#e5c158'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.015;
    }
    draw() {
      fwCtx.save();
      fwCtx.globalAlpha = Math.max(0, this.alpha);
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      fwCtx.fillStyle = this.color;
      fwCtx.shadowBlur = 8;
      fwCtx.shadowColor = this.color;
      fwCtx.fill();
      fwCtx.restore();
    }
  }

  function launchFireworksSequence() {
    const launchCount = 5;
    for (let i = 0; i < launchCount; i++) {
      setTimeout(() => {
        const tx = Math.random() * (window.innerWidth * 0.7) + window.innerWidth * 0.15;
        const ty = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.1;
        fireworks.push(new Firework(tx, ty));
      }, i * 350);
    }
  }

  function renderFireworks() {
    fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].draw();
      if (fireworks[i].exploded) {
        fireworks.splice(i, 1);
      }
    }

    for (let i = fwParticles.length - 1; i >= 0; i--) {
      fwParticles[i].update();
      fwParticles[i].draw();
      if (fwParticles[i].alpha <= 0) {
        fwParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderFireworks);
  }
  renderFireworks();

});
