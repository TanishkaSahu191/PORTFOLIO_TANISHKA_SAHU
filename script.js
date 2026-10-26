(() => {
  const HEAD_URL = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e1b48476-24ab-456a-bb12-13e63bc60973.mp4';
  const stage = document.getElementById('stage');
  const scene = document.getElementById('scene');
  const clip = document.getElementById('headClip');
  const headClipShell = document.querySelector('.head-clip');
  const helmetShell = document.getElementById('helmetShell');
  const pushButton = document.getElementById('pushButton');
  const dot = document.getElementById('pointerDot');
  const ring = document.getElementById('pointerRing');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  let objectUrl = '';
  let duration = 5.04;
  let targetTime = duration * .5;
  let shownTime = targetTime;
  let lastPointerX = window.innerWidth * .5;
  let lastMove = performance.now();
  let ringX = lastPointerX;
  let ringY = window.innerHeight * .5;
  let pointerY = ringY;
  let clipReady = false;
  let hasShownClip = false;
  let firstSeekDone = false;
  let seeking = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function setLoaded() {
    const entranceTimeline = [
      [document.querySelector('.plate'), [{ opacity: 0, transform: 'scale(1.025)' }, { opacity: 1, transform: 'scale(1)' }], 0, 900],
      [document.querySelector('.plate-shade'), [{ opacity: 0 }, { opacity: 1 }], 100, 1100],
      [document.querySelector('.copy-block h1'), [{ opacity: 0, filter: 'blur(14px)', transform: 'translateY(20px)' }, { opacity: 1, filter: 'blur(0)', transform: 'translateY(0)' }], 300, 1000],
      [document.querySelector('.subtitle'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 600, 700],
      [document.querySelector('.captions'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 800, 700],
      [pushButton, [{ opacity: 0, transform: 'scale(.55)' }, { opacity: 1, transform: 'scale(1)' }], 1000, 600]
    ];

    if (!reducedMotion && typeof Element.prototype.animate === 'function') {
      entranceTimeline.forEach(([element, keyframes, delay, duration]) => {
        if (!element) return;
        element.animate(keyframes, {
          duration,
          delay,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'both'
        });
      });
    }

    requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  }

  function updatePointer(clientX, clientY) {
    lastPointerX = clientX;
    pointerY = clientY;
    lastMove = performance.now();
    if (!clipReady || reducedMotion) return;

    const rect = scene.getBoundingClientRect();
    const unit = rect.width / 1440;
    const frameX = (clientX - rect.left) / unit;
    const mapped = clamp((frameX - 1440 * .14) / (1440 * .72), 0, 1);
    targetTime = mapped * Math.max(duration - .06, 0);
  }

  function showClip() {
    if (!hasShownClip) {
      hasShownClip = true;
      headClipShell.classList.add('is-visible');
    }
  }

  function attachClip(src) {
    clip.src = src;
    clip.muted = true;
    clip.volume = 0;
    clip.addEventListener('loadedmetadata', () => {
      duration = Number.isFinite(clip.duration) && clip.duration > 0 ? clip.duration : duration;
      targetTime = duration * .5;
      shownTime = targetTime;
      clipReady = true;
      clip.currentTime = shownTime;
    }, { once: true });
    clip.addEventListener('seeking', () => { seeking = true; });
    clip.addEventListener('seeked', () => {
      seeking = false;
      if (!firstSeekDone) {
        firstSeekDone = true;
        showClip();
      }
    });
    clip.load();
  }

  async function preloadClip() {
    if (reducedMotion) return;
    try {
      const response = await fetch(HEAD_URL, { mode: 'cors', cache: 'force-cache' });
      if (!response.ok) throw new Error(`head clip request failed: ${response.status}`);
      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      attachClip(objectUrl);
    } catch (error) {
      attachClip(HEAD_URL);
    }
  }

  function tick(now) {
    if (!reducedMotion && clipReady && Number.isFinite(duration)) {
      const idleFor = now - lastMove;
      const idleAmount = idleFor > 3500 ? Math.sin((idleFor - 3500) / 1600) * duration * .32 : 0;
      const desired = idleFor > 3500 ? duration * .5 + idleAmount : targetTime;
      targetTime += (desired - targetTime) * .06;
      shownTime += (targetTime - shownTime) * .14;
      if (!seeking && Math.abs(clip.currentTime - shownTime) > .012) {
        clip.currentTime = clamp(shownTime, 0, Math.max(duration - .03, 0));
      }
    }

    if (finePointer && dot && ring) {
      ringX += (lastPointerX - ringX) * .55;
      ringY += (pointerY - ringY) * .55;
      dot.style.transform = `translate3d(${lastPointerX}px, ${pointerY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }
    requestAnimationFrame(tick);
  }

  function launchToSolarSystem() {
    // 1. Visor closes over cadet's head
    helmetShell.classList.add('is-on');
    pushButton.setAttribute('aria-pressed', 'true');
    pushButton.classList.add('is-pressing');
    setTimeout(() => pushButton.classList.remove('is-pressing'), 350);

    // Ensure solar audio is initialized & play visor seal
    if (!window.solarAppInstance && typeof window.initSolarSystemApp === 'function') {
      window.initSolarSystemApp();
    }
    if (window.solarAppInstance && window.solarAppInstance.audio) {
      window.solarAppInstance.audio.playVisorLock();
    }

    // 2. Start rocket sequence
    document.body.classList.add('in-launch');
    const transition = document.getElementById('rocketTransition');
    const countdownEl = document.getElementById('launchCountdown');

    if (transition) {
      transition.classList.add('is-active');
    }

    if (window.solarAppInstance && window.solarAppInstance.audio) {
      window.solarAppInstance.audio.playRocketLaunch();
    }

    setTimeout(() => {
      if (window.solarAppInstance && window.solarAppInstance.audio) {
        window.solarAppInstance.audio.playWarpSound();
      }
    }, 1400);

    // Flash and reveal solar system
    setTimeout(() => {
      let flash = document.querySelector('.solar-flash');
      if (!flash) {
        flash = document.createElement('div');
        flash.className = 'solar-flash';
        document.body.appendChild(flash);
      }
      flash.classList.add('is-flashing');

      setTimeout(() => {
        document.body.classList.remove('in-launch');
        document.body.classList.add('solar-active');
        if (transition) transition.classList.remove('is-active');

        // Trigger resize and reset view
        if (window.solarAppInstance) {
          window.solarAppInstance.onResize();
          window.solarAppInstance.resetToDiagramView();
        }

        const cosmicVid = document.getElementById('solarCosmicBgVideo');
        if (cosmicVid) {
          cosmicVid.play().catch(() => { });
        }

        setTimeout(() => {
          flash.classList.remove('is-flashing');
        }, 250);
      }, 400);
    }, 2000);
  }

  window.returnToCadetScreen = () => {
    let flash = document.querySelector('.solar-flash');
    if (!flash) {
      flash = document.createElement('div');
      flash.className = 'solar-flash';
      document.body.appendChild(flash);
    }
    flash.classList.add('is-flashing');

    if (window.solarAppInstance) {
      if (window.solarAppInstance.audio) {
        window.solarAppInstance.audio.playWarpSound();
      }
      if (typeof window.solarAppInstance.closeMarsModal === 'function') {
        window.solarAppInstance.closeMarsModal(false);
      }
      if (typeof window.solarAppInstance.closeJupiterRoadmapModal === 'function') {
        window.solarAppInstance.closeJupiterRoadmapModal(false);
      }
      if (typeof window.solarAppInstance.closeUranusResumeModal === 'function') {
        window.solarAppInstance.closeUranusResumeModal(false);
      }
      if (typeof window.solarAppInstance.closeSaturnCertificatesModal === 'function') {
        window.solarAppInstance.closeSaturnCertificatesModal(false);
      }
      if (typeof window.solarAppInstance.closeNeptuneLinksModal === 'function') {
        window.solarAppInstance.closeNeptuneLinksModal(false);
      }
      if (typeof window.solarAppInstance.setMarsSceneBackground === 'function') {
        window.solarAppInstance.setMarsSceneBackground(false);
      }
    }

    setTimeout(() => {
      document.body.classList.remove('solar-active');
      setTimeout(() => {
        flash.classList.remove('is-flashing');
      }, 250);
    }, 400);
  };

  if (finePointer && !reducedMotion) {
    window.addEventListener('pointermove', (event) => updatePointer(event.clientX, event.clientY), { passive: true });
  }

  pushButton.addEventListener('click', launchToSolarSystem);
  window.addEventListener('pagehide', () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  });

  setLoaded();
  preloadClip();
  requestAnimationFrame(tick);
})();
