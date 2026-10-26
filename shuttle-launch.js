/**
 * NASA Space Shuttle Discovery (STS-121) 3D Simulation & Cinematic Launch Engine
 * Realistic PBR rendering with External Tank, Twin SRBs, Orbiter, Dynamic Shock Flames,
 * Billowing Particle Plumes, and Live Telemetry HUD.
 */

(function () {
  'use strict';

  class SpaceShuttleLaunch {
    constructor() {
      this.modal = null;
      this.canvas = null;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.controls = null;
      this.animFrameId = null;

      // Assemblies
      this.shuttleStack = null;
      this.externalTank = null;
      this.leftSRB = null;
      this.rightSRB = null;
      this.orbiter = null;

      // Exhaust and FX
      this.srbPlumes = [];
      this.ssmePlumes = [];
      this.engineLights = [];
      this.smokeParticles = null;
      this.sparkParticles = null;
      this.smokeData = [];
      this.sparkData = [];

      // Lighting
      this.sunLight = null;
      this.ambientLight = null;
      this.flameLight = null;

      // State & Animation
      this.isActive = false;
      this.startTime = 0;
      this.launchState = 'idle'; // 'idle', 'ignition', 'liftoff', 'ascent', 'maxq', 'complete'
      this.cameraMode = 'cinematic'; // 'cinematic', 'orbit', 'cockpit'
      this.flightTime = 0;
      this.altitude = 0;
      this.velocity = 0;
      this.mach = 0;
      this.maxQ = 0;
      this.gForce = 1.0;

      // Camera base offsets
      this.shakeIntensity = 0;

      this.init();
    }

    init() {
      this.modal = document.getElementById('shuttleLaunchModal');
      this.canvas = document.getElementById('shuttleCanvas');
      if (!this.modal || !this.canvas) return;

      this.bindUI();
    }

    setupThreeScene() {
      if (this.renderer) return;

      const width = this.canvas.clientWidth || window.innerWidth;
      const height = this.canvas.clientHeight || window.innerHeight;

      // 1. Scene & Renderer
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x020510, 0.0018);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
      this.setCameraView('cinematic');

      // 3. OrbitControls (for Inspect mode)
      if (typeof THREE.OrbitControls !== 'undefined') {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 120;
        this.controls.minDistance = 8;
        this.controls.enabled = false;
      }

      // 4. Lighting Setup (Dramatic high-contrast space illumination)
      this.ambientLight = new THREE.AmbientLight(0x1a263d, 0.9);
      this.scene.add(this.ambientLight);

      this.sunLight = new THREE.DirectionalLight(0xfff8ee, 2.6);
      this.sunLight.position.set(45, 60, 40);
      this.sunLight.castShadow = true;
      this.sunLight.shadow.mapSize.width = 2048;
      this.sunLight.shadow.mapSize.height = 2048;
      this.sunLight.shadow.camera.near = 10;
      this.sunLight.shadow.camera.far = 150;
      const d = 25;
      this.sunLight.shadow.camera.left = -d;
      this.sunLight.shadow.camera.right = d;
      this.sunLight.shadow.camera.top = d;
      this.sunLight.shadow.camera.bottom = -d;
      this.scene.add(this.sunLight);

      // Earth blue atmospheric bounce light
      const earthBounce = new THREE.DirectionalLight(0x1e3a5f, 0.7);
      earthBounce.position.set(-30, -40, -20);
      this.scene.add(earthBounce);

      // Engine fire glow light (pulsates dynamically)
      this.flameLight = new THREE.PointLight(0xff7722, 0, 50, 1.8);
      this.flameLight.position.set(0, -16, 0);
      this.scene.add(this.flameLight);

      // 5. Environment: Deep Cosmic Skybox & Launch Atmosphere
      this.buildCosmicBackdrop();

      // 6. Build High-Fidelity NASA Space Shuttle Stack
      this.buildShuttleStack();

      // 7. Build Plumes, Sparks & Smoke
      this.buildExhaustFX();

      // 8. Event Listeners
      window.addEventListener('resize', () => this.onResize());
    }

    buildCosmicBackdrop() {
      // Starfield sphere
      const starGeo = new THREE.BufferGeometry();
      const starCount = 2200;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 500 + Math.random() * 400;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        starPositions[i * 3] = x;
        starPositions[i * 3 + 1] = y;
        starPositions[i * 3 + 2] = z;

        // Subtle color temperature variation
        const c = 0.8 + Math.random() * 0.2;
        starColors[i * 3] = c;
        starColors[i * 3 + 1] = c * (0.9 + Math.random() * 0.1);
        starColors[i * 3 + 2] = c * (0.95 + Math.random() * 0.05);
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starMat = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });

      const stars = new THREE.Points(starGeo, starMat);
      this.scene.add(stars);

      // Horizon atmospheric haze gradient disc
      const hazeGeo = new THREE.PlaneGeometry(800, 300);
      const hazeCanvas = document.createElement('canvas');
      hazeCanvas.width = 512;
      hazeCanvas.height = 256;
      const hCtx = hazeCanvas.getContext('2d');
      const grad = hCtx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, 'rgba(0, 15, 45, 0)');
      grad.addColorStop(0.5, 'rgba(10, 40, 95, 0.45)');
      grad.addColorStop(1, 'rgba(30, 85, 175, 0.85)');
      hCtx.fillStyle = grad;
      hCtx.fillRect(0, 0, 512, 256);

      const hazeTex = new THREE.CanvasTexture(hazeCanvas);
      const hazeMat = new THREE.MeshBasicMaterial({
        map: hazeTex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const haze = new THREE.Mesh(hazeGeo, hazeMat);
      haze.position.set(0, -60, -180);
      this.scene.add(haze);
    }

    buildShuttleStack() {
      this.shuttleStack = new THREE.Group();

      // =========================================================================
      // 1. EXTERNAL TANK (ET) — Iconic Rust Orange Thermal Foam
      // =========================================================================
      const tankGroup = new THREE.Group();

      // Procedural foam texture for tank
      const etTex = this.createFoamTexture();
      const etMat = new THREE.MeshStandardMaterial({
        map: etTex,
        color: 0xc4551d,
        roughness: 0.72,
        metalness: 0.08
      });

      const etDarkMat = new THREE.MeshStandardMaterial({
        color: 0x8a3812,
        roughness: 0.8,
        metalness: 0.1
      });

      // Main cylindrical barrel
      const etCylinderGeo = new THREE.CylinderGeometry(2.1, 2.1, 26, 36);
      const etCylinder = new THREE.Mesh(etCylinderGeo, etMat);
      etCylinder.castShadow = true;
      etCylinder.receiveShadow = true;
      tankGroup.add(etCylinder);

      // Conical Ogive Nose Cap
      const etNoseGeo = new THREE.CylinderGeometry(0.18, 2.1, 7.5, 36, 1, false);
      const etNose = new THREE.Mesh(etNoseGeo, etMat);
      etNose.position.y = 13 + 3.75;
      etNose.castShadow = true;
      tankGroup.add(etNose);

      // Tip lightning rod
      const tipGeo = new THREE.CylinderGeometry(0.04, 0.18, 1.2, 16);
      const tipMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, metalness: 0.7, roughness: 0.3 });
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.y = 13 + 7.5 + 0.6;
      tankGroup.add(tip);

      // Bottom aft hemispherical dome
      const etDomeGeo = new THREE.SphereGeometry(2.1, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      const etDome = new THREE.Mesh(etDomeGeo, etDarkMat);
      etDome.position.y = -13;
      etDome.castShadow = true;
      tankGroup.add(etDome);

      // Intertank Corrugated Flange (Between LOX and LH2 tanks)
      const intertankGeo = new THREE.CylinderGeometry(2.16, 2.16, 3.2, 36);
      const intertankMat = new THREE.MeshStandardMaterial({
        color: 0xaa4815,
        roughness: 0.65,
        metalness: 0.12
      });
      const intertank = new THREE.Mesh(intertankGeo, intertankMat);
      intertank.position.y = 7;
      tankGroup.add(intertank);

      // External pressurization feedlines (long white/steel pipes along the tank)
      const feedlineGeo = new THREE.CylinderGeometry(0.08, 0.08, 28, 12);
      const feedlineMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.5, roughness: 0.4 });
      const pipe1 = new THREE.Mesh(feedlineGeo, feedlineMat);
      pipe1.position.set(1.95, -1, 0.85);
      tankGroup.add(pipe1);

      const pipe2 = new THREE.Mesh(feedlineGeo, feedlineMat);
      pipe2.position.set(-1.95, -1, 0.85);
      tankGroup.add(pipe2);

      this.externalTank = tankGroup;
      this.shuttleStack.add(this.externalTank);

      // =========================================================================
      // 2. TWIN SOLID ROCKET BOOSTERS (SRBs) — White Steel Segmented Cases
      // =========================================================================
      const srbMat = new THREE.MeshStandardMaterial({
        color: 0xf5f7fa,
        roughness: 0.32,
        metalness: 0.2
      });

      const srbRingMat = new THREE.MeshStandardMaterial({
        color: 0x181c24,
        roughness: 0.6,
        metalness: 0.6
      });

      const srbNozzleMat = new THREE.MeshStandardMaterial({
        color: 0x242a34,
        roughness: 0.4,
        metalness: 0.85
      });

      const createSRB = (xPos) => {
        const srb = new THREE.Group();

        // Main cylindrical casing (4 segments)
        const casingGeo = new THREE.CylinderGeometry(1.05, 1.05, 29, 32);
        const casing = new THREE.Mesh(casingGeo, srbMat);
        casing.castShadow = true;
        casing.receiveShadow = true;
        srb.add(casing);

        // Factory field joint rings (11 rings)
        for (let i = -12; i <= 12; i += 2.4) {
          const ringGeo = new THREE.CylinderGeometry(1.09, 1.09, 0.14, 32);
          const ring = new THREE.Mesh(ringGeo, srbRingMat);
          ring.position.y = i;
          srb.add(ring);
        }

        // Nose cone
        const srbNoseGeo = new THREE.ConeGeometry(1.05, 4.2, 32);
        const srbNose = new THREE.Mesh(srbNoseGeo, srbMat);
        srbNose.position.y = 14.5 + 2.1;
        srbNose.castShadow = true;
        srb.add(srbNose);

        // Flared aft skirt
        const skirtGeo = new THREE.CylinderGeometry(1.05, 1.48, 2.6, 32);
        const skirt = new THREE.Mesh(skirtGeo, srbMat);
        skirt.position.y = -14.5 - 1.3;
        skirt.castShadow = true;
        srb.add(skirt);

        // Heavy Gimballed Nozzle Bell
        const nozzleGeo = new THREE.CylinderGeometry(1.22, 0.78, 2.5, 32, 1, true);
        const nozzle = new THREE.Mesh(nozzleGeo, srbNozzleMat);
        nozzle.position.y = -14.5 - 2.6 - 1.25;
        nozzle.castShadow = true;
        srb.add(nozzle);

        // Nozzle interior glowing ring
        const throatGeo = new THREE.RingGeometry(0.2, 0.76, 24);
        const throatMat = new THREE.MeshBasicMaterial({ color: 0xfff0aa, side: THREE.DoubleSide });
        const throat = new THREE.Mesh(throatGeo, throatMat);
        throat.rotation.x = Math.PI / 2;
        throat.position.y = -14.5 - 2.6 - 0.2;
        srb.add(throat);

        // Cross-struts to External Tank
        const strutGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 12);
        const strutMat = new THREE.MeshStandardMaterial({ color: 0x1f242e, metalness: 0.8, roughness: 0.3 });

        const strutTop = new THREE.Mesh(strutGeo, strutMat);
        strutTop.rotation.z = xPos > 0 ? -Math.PI / 2 : Math.PI / 2;
        strutTop.position.set(xPos > 0 ? -0.9 : 0.9, 10, 0);
        srb.add(strutTop);

        const strutBottom = new THREE.Mesh(strutGeo, strutMat);
        strutBottom.rotation.z = xPos > 0 ? -Math.PI / 2 : Math.PI / 2;
        strutBottom.position.set(xPos > 0 ? -0.9 : 0.9, -10, 0);
        srb.add(strutBottom);

        srb.position.set(xPos, -0.8, 0);
        return srb;
      };

      this.leftSRB = createSRB(-3.85);
      this.rightSRB = createSRB(3.85);
      this.shuttleStack.add(this.leftSRB);
      this.shuttleStack.add(this.rightSRB);

      // =========================================================================
      // 3. SPACE SHUTTLE ORBITER (DISCOVERY OV-103)
      // =========================================================================
      const orbiterGroup = new THREE.Group();

      const whiteTileMat = new THREE.MeshStandardMaterial({
        color: 0xf4f6fa,
        roughness: 0.42,
        metalness: 0.15
      });

      const blackRccMat = new THREE.MeshStandardMaterial({
        color: 0x12151b,
        roughness: 0.85,
        metalness: 0.08
      });

      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x060c18,
        roughness: 0.1,
        metalness: 0.95
      });

      // A. Fuselage Body (Payload Bay & Crew Cabin)
      const fuseGeo = new THREE.CylinderGeometry(1.7, 1.85, 17, 32);
      const fuselage = new THREE.Mesh(fuseGeo, whiteTileMat);
      fuselage.position.y = 0.5;
      fuselage.castShadow = true;
      fuselage.receiveShadow = true;
      orbiterGroup.add(fuselage);

      // B. Forward Crew Cabin & Cockpit Nose
      const cabinGeo = new THREE.CylinderGeometry(0.85, 1.7, 5.2, 32);
      const cabin = new THREE.Mesh(cabinGeo, whiteTileMat);
      cabin.position.y = 9 + 2.6;
      cabin.castShadow = true;
      orbiterGroup.add(cabin);

      // C. Black Carbon-Carbon Nose Cone Cap
      const noseCapGeo = new THREE.SphereGeometry(0.86, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const noseCap = new THREE.Mesh(noseCapGeo, blackRccMat);
      noseCap.position.y = 9 + 5.2;
      noseCap.castShadow = true;
      orbiterGroup.add(noseCap);

      // D. Cockpit Windshield Visor (Angled Black Glass Band)
      const visorGeo = new THREE.CylinderGeometry(1.22, 1.48, 1.1, 24, 1, false, 0, Math.PI);
      const visor = new THREE.Mesh(visorGeo, glassMat);
      visor.position.set(0, 11.8, 0.45);
      visor.rotation.y = -Math.PI / 2;
      orbiterGroup.add(visor);

      // E. Double-Delta Wings with High-Res Markings
      const wingShape = new THREE.Shape();
      // Right wing profile
      wingShape.moveTo(0, 7.5);
      wingShape.lineTo(3.2, -0.5);
      wingShape.lineTo(7.6, -7.5);
      wingShape.lineTo(7.6, -8.6);
      wingShape.lineTo(0, -8.6);
      wingShape.closePath();

      const extrudeSettings = {
        depth: 0.38,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.12,
        bevelThickness: 0.14
      };

      // Create Right Wing with NASA & Discovery Markings Texture
      const rightWingTex = this.createRightWingTexture();
      const rightWingMat = new THREE.MeshStandardMaterial({
        map: rightWingTex,
        roughness: 0.45,
        metalness: 0.12
      });

      const rightWingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
      const rightWing = new THREE.Mesh(rightWingGeo, rightWingMat);
      rightWing.position.set(0.1, 0, -0.19);
      rightWing.castShadow = true;
      rightWing.receiveShadow = true;
      orbiterGroup.add(rightWing);

      // Create Left Wing with USA & Flag Texture
      const leftWingTex = this.createLeftWingTexture();
      const leftWingMat = new THREE.MeshStandardMaterial({
        map: leftWingTex,
        roughness: 0.45,
        metalness: 0.12
      });

      const leftWing = new THREE.Mesh(rightWingGeo, leftWingMat);
      leftWing.scale.set(-1, 1, 1);
      leftWing.position.set(-0.1, 0, 0.19);
      leftWing.castShadow = true;
      leftWing.receiveShadow = true;
      orbiterGroup.add(leftWing);

      // Wing Black RCC Leading Edges (Heat protection tiles)
      const edgeGeo = new THREE.CylinderGeometry(0.18, 0.18, 11.2, 12);
      const rightEdge = new THREE.Mesh(edgeGeo, blackRccMat);
      rightEdge.rotation.z = -0.76;
      rightEdge.position.set(4.1, -1.2, 0.02);
      orbiterGroup.add(rightEdge);

      const leftEdge = new THREE.Mesh(edgeGeo, blackRccMat);
      leftEdge.rotation.z = 0.76;
      leftEdge.position.set(-4.1, -1.2, 0.02);
      orbiterGroup.add(leftEdge);

      // F. Vertical Stabilizer (Tail Fin) with Rudder
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(0, 6.8);
      finShape.lineTo(3.2, 0);
      finShape.closePath();

      const finSettings = { depth: 0.28, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.08 };
      const finGeo = new THREE.ExtrudeGeometry(finShape, finSettings);
      const fin = new THREE.Mesh(finGeo, whiteTileMat);
      fin.rotation.y = Math.PI / 2;
      fin.position.set(0.14, -8.2, 1.6);
      fin.castShadow = true;
      orbiterGroup.add(fin);

      // Black tail leading edge
      const finEdgeGeo = new THREE.CylinderGeometry(0.12, 0.12, 7.5, 8);
      const finEdge = new THREE.Mesh(finEdgeGeo, blackRccMat);
      finEdge.rotation.x = -0.46;
      finEdge.position.set(0, -4.8, 3.4);
      orbiterGroup.add(finEdge);

      // G. OMS Pods (Orbital Maneuvering System Blisters)
      const omsGeo = new THREE.CylinderGeometry(0.65, 0.75, 4.2, 16);
      const omsLeft = new THREE.Mesh(omsGeo, whiteTileMat);
      omsLeft.position.set(-1.15, -6.8, 1.45);
      omsLeft.rotation.x = 0.12;
      orbiterGroup.add(omsLeft);

      const omsRight = new THREE.Mesh(omsGeo, whiteTileMat);
      omsRight.position.set(1.15, -6.8, 1.45);
      omsRight.rotation.x = 0.12;
      orbiterGroup.add(omsRight);

      // H. Space Shuttle Main Engines (SSMEs) — 3 Heavy Gimballed Nozzles
      const ssmeMat = new THREE.MeshStandardMaterial({
        color: 0x464e5c,
        metalness: 0.88,
        roughness: 0.22
      });

      const ssmeGeo = new THREE.CylinderGeometry(0.72, 0.42, 1.8, 24, 1, true);

      // Triangular layout on aft thrust structure
      const ssmeTop = new THREE.Mesh(ssmeGeo, ssmeMat);
      ssmeTop.position.set(0, -9.2, 1.25);
      ssmeTop.rotation.x = -0.16; // Authentic NASA 10.5 degree upward cant
      ssmeTop.castShadow = true;
      orbiterGroup.add(ssmeTop);

      const ssmeBottomLeft = new THREE.Mesh(ssmeGeo, ssmeMat);
      ssmeBottomLeft.position.set(-0.85, -9.2, -0.15);
      ssmeBottomLeft.rotation.x = -0.16;
      ssmeBottomLeft.rotation.z = 0.08;
      ssmeBottomLeft.castShadow = true;
      orbiterGroup.add(ssmeBottomLeft);

      const ssmeBottomRight = new THREE.Mesh(ssmeGeo, ssmeMat);
      ssmeBottomRight.position.set(0.85, -9.2, -0.15);
      ssmeBottomRight.rotation.x = -0.16;
      ssmeBottomRight.rotation.z = -0.08;
      ssmeBottomRight.castShadow = true;
      orbiterGroup.add(ssmeBottomRight);

      // Attach Orbiter to the Belly of the External Tank
      orbiterGroup.position.set(0, -3.2, 3.25);
      this.orbiter = orbiterGroup;
      this.shuttleStack.add(this.orbiter);

      // Initial stack positioning on launch pad
      this.shuttleStack.position.set(0, 0, 0);
      this.scene.add(this.shuttleStack);
    }

    createFoamTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Base foam orange
      ctx.fillStyle = '#c7561d';
      ctx.fillRect(0, 0, 512, 512);

      // Procedural spray-on foam mottling and weld rings
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = 2 + Math.random() * 8;
        const alpha = 0.04 + Math.random() * 0.08;
        ctx.fillStyle = Math.random() > 0.5 ? `rgba(225, 120, 50, ${alpha})` : `rgba(140, 50, 15, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Horizontal tank ring bands
      ctx.strokeStyle = 'rgba(70, 25, 10, 0.25)';
      ctx.lineWidth = 3;
      for (let y = 60; y < 512; y += 70) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 6);
      return tex;
    }

    createRightWingTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Base ceramic tile white
      ctx.fillStyle = '#f5f7fb';
      ctx.fillRect(0, 0, 512, 512);

      // Subtle tile seams
      ctx.strokeStyle = 'rgba(180, 190, 205, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // "NASA" vector lettering on right wing
      ctx.fillStyle = '#111827';
      ctx.font = '900 68px "Space Grotesk", sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('NASA', 140, 310);

      // "Discovery" orbiter designation
      ctx.font = '700 36px "Space Grotesk", sans-serif';
      ctx.fillText('Discovery', 142, 360);

      const tex = new THREE.CanvasTexture(c);
      return tex;
    }

    createLeftWingTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Base white
      ctx.fillStyle = '#f5f7fb';
      ctx.fillRect(0, 0, 512, 512);

      // Tile seams
      ctx.strokeStyle = 'rgba(180, 190, 205, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // "USA" bold lettering
      ctx.fillStyle = '#111827';
      ctx.font = '900 78px "Space Grotesk", sans-serif';
      ctx.fillText('USA', 170, 305);

      // American Flag Icon
      const fx = 172, fy = 325, fw = 110, fh = 60;
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(fx, fy, fw, fh);
      for (let i = 1; i < 7; i += 2) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx, fy + (fh / 7) * i, fw, fh / 7);
      }
      // Canton
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(fx, fy, fw * 0.45, (fh / 7) * 4);

      const tex = new THREE.CanvasTexture(c);
      return tex;
    }

    buildExhaustFX() {
      // 1. Two Massive Solid Rocket Booster (SRB) Fire Plumes
      const createSRBPlume = (xPos) => {
        const group = new THREE.Group();

        // Inner incandescent white-yellow core
        const coreGeo = new THREE.ConeGeometry(1.4, 28, 24, 8, true);
        const coreMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.rotation.x = Math.PI;
        core.position.y = -14;
        group.add(core);

        // Mid incandescent gold expansion flame
        const midGeo = new THREE.ConeGeometry(2.6, 42, 24, 8, true);
        const midMat = new THREE.MeshBasicMaterial({
          color: 0xffb732,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const mid = new THREE.Mesh(midGeo, midMat);
        mid.rotation.x = Math.PI;
        mid.position.y = -21;
        group.add(mid);

        // Outer billowing orange-red thrust plume
        const outerGeo = new THREE.ConeGeometry(4.2, 58, 24, 8, true);
        const outerMat = new THREE.MeshBasicMaterial({
          color: 0xff4800,
          transparent: true,
          opacity: 0.45,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const outer = new THREE.Mesh(outerGeo, outerMat);
        outer.rotation.x = Math.PI;
        outer.position.y = -29;
        group.add(outer);

        group.position.set(xPos, -18.2, 0);
        group.scale.set(0.01, 0.01, 0.01); // starts unignited
        return { group, core, mid, outer };
      };

      const srbLeft = createSRBPlume(-3.85);
      const srbRight = createSRBPlume(3.85);
      this.shuttleStack.add(srbLeft.group);
      this.shuttleStack.add(srbRight.group);
      this.srbPlumes = [srbLeft, srbRight];

      // 2. Three SSME Supersonic Shock Diamond Plumes (Electric Blue/Violet)
      const createSSMEPlume = (pos, rot) => {
        const group = new THREE.Group();

        // High-temperature Mach diamond plume
        const plumeGeo = new THREE.ConeGeometry(0.8, 14, 16, 4, true);
        const plumeMat = new THREE.MeshBasicMaterial({
          color: 0x48b6ff,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const plume = new THREE.Mesh(plumeGeo, plumeMat);
        plume.rotation.x = Math.PI;
        plume.position.y = -7;
        group.add(plume);

        // Inner shock diamond core
        const diamondGeo = new THREE.ConeGeometry(0.35, 7, 12, 1, true);
        const diamondMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const diamond = new THREE.Mesh(diamondGeo, diamondMat);
        diamond.rotation.x = Math.PI;
        diamond.position.y = -3.5;
        group.add(diamond);

        group.position.copy(pos);
        group.position.y -= 1.0;
        group.rotation.copy(rot);
        group.scale.set(0.01, 0.01, 0.01);
        return { group, plume, diamond };
      };

      const p1 = createSSMEPlume(new THREE.Vector3(0, -12.4, 4.5), new THREE.Euler(-0.16, 0, 0));
      const p2 = createSSMEPlume(new THREE.Vector3(-0.85, -12.4, 3.1), new THREE.Euler(-0.16, 0, 0.08));
      const p3 = createSSMEPlume(new THREE.Vector3(0.85, -12.4, 3.1), new THREE.Euler(-0.16, 0, -0.08));

      this.shuttleStack.add(p1.group);
      this.shuttleStack.add(p2.group);
      this.shuttleStack.add(p3.group);
      this.ssmePlumes = [p1, p2, p3];

      // 3. Billowing Smoke & Steam Particle System
      const smokeCount = 380;
      const smokeGeo = new THREE.BufferGeometry();
      const smokePositions = new Float32Array(smokeCount * 3);
      const smokeSizes = new Float32Array(smokeCount);
      const smokeOpacities = new Float32Array(smokeCount);

      this.smokeData = [];
      for (let i = 0; i < smokeCount; i++) {
        smokePositions[i * 3] = (Math.random() - 0.5) * 12;
        smokePositions[i * 3 + 1] = -24 - Math.random() * 80;
        smokePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;

        smokeSizes[i] = 12 + Math.random() * 24;
        smokeOpacities[i] = 0;

        this.smokeData.push({
          vx: (Math.random() - 0.5) * 0.45,
          vy: -0.6 - Math.random() * 1.2,
          vz: (Math.random() - 0.5) * 0.45,
          life: Math.random(),
          maxLife: 2.5 + Math.random() * 2.5,
          baseSize: 12 + Math.random() * 24
        });
      }

      smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));

      // Smoke radial texture
      const smCanvas = document.createElement('canvas');
      smCanvas.width = 64;
      smCanvas.height = 64;
      const sCtx = smCanvas.getContext('2d');
      const sGrad = sCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
      sGrad.addColorStop(0, 'rgba(240, 243, 250, 0.85)');
      sGrad.addColorStop(0.4, 'rgba(200, 210, 225, 0.4)');
      sGrad.addColorStop(0.8, 'rgba(150, 165, 190, 0.15)');
      sGrad.addColorStop(1, 'rgba(100, 120, 150, 0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 64, 64);

      const smokeTexture = new THREE.CanvasTexture(smCanvas);
      const smokeMat = new THREE.PointsMaterial({
        map: smokeTexture,
        size: 26,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

      this.smokeParticles = new THREE.Points(smokeGeo, smokeMat);
      this.scene.add(this.smokeParticles);
    }

    setCameraView(mode) {
      this.cameraMode = mode;
      if (this.controls) {
        this.controls.enabled = (mode === 'orbit');
      }

      if (mode === 'cinematic') {
        // Dramatic low-angle perspective looking up at the climbing stack
        // Exactly inspired by the reference ascent photograph
        this.camera.position.set(0, -18, 48);
        this.camera.lookAt(0, 4, 0);
      } else if (mode === 'orbit') {
        this.camera.position.set(28, 12, 36);
        this.camera.lookAt(0, 0, 0);
      } else if (mode === 'cockpit') {
        this.camera.position.set(0, -28, 22);
        this.camera.lookAt(0, 20, 0);
      }
    }

    startLaunchSequence() {
      this.isActive = true;
      this.startTime = performance.now();
      this.launchState = 'ignition';
      this.flightTime = 0;
      this.altitude = 0;
      this.velocity = 0;
      this.mach = 0;
      this.maxQ = 0;
      this.gForce = 1.0;

      // Update UI Status Badge
      this.updateStatusBadge('T-03: SSME IGNITION', 'gold');

      // Audio triggers
      if (window.solarAppInstance && window.solarAppInstance.audio) {
        try { window.solarAppInstance.audio.playRocketLaunch(); } catch (e) { }
      }

      // Animate loop
      this.animate();
    }

    updatePhysics(elapsed) {
      this.flightTime = elapsed;

      // Phase 1: T-03 to T-00 (0.0s to 1.8s) -> SSME Ignition & Twang
      if (elapsed < 1.8) {
        this.launchState = 'ignition';
        const t = elapsed / 1.8;

        // SSME plume growth
        this.ssmePlumes.forEach(p => {
          p.group.scale.set(t, t * 1.1, t);
        });

        // Twang deflection (Stack flexes 1.5 degrees forward then rebounds)
        const twangAngle = Math.sin(t * Math.PI) * 0.035;
        this.shuttleStack.rotation.x = twangAngle;
        this.shuttleStack.position.set(0, 0, 0);

        this.flameLight.intensity = t * 1.8;
        this.shakeIntensity = t * 0.15;

        this.updateTelemetry(0, 0, 0, 1.0, 'T-03 // MAIN ENGINES IGNITED');
      }
      // Phase 2: T-00 Liftoff (1.8s to 4.2s) -> SRB Ignition & Rapid Thrust Elevation
      else if (elapsed < 4.8) {
        this.launchState = 'liftoff';
        const ascT = elapsed - 1.8; // 0 to 3.0s

        // Full SRB Plumes explosion
        const srbScale = Math.min(ascT / 0.4, 1.0);
        this.srbPlumes.forEach(p => {
          const flutter = 1.0 + (Math.random() - 0.5) * 0.12;
          p.group.scale.set(srbScale * flutter, srbScale * flutter * 1.25, srbScale * flutter);
        });

        this.ssmePlumes.forEach(p => {
          p.group.scale.set(1.0, 1.0, 1.0);
        });

        // Physics: Natural quadratic acceleration (y = 0.5 * a * t^2)
        const acceleration = 7.5; // m/s^2 visual factor
        const yPos = 0.5 * acceleration * (ascT * ascT);
        this.shuttleStack.position.y = yPos;

        // Roll Maneuver into launch azimuth (Heads-down trajectory)
        const rollProgress = Math.min(Math.max((ascT - 0.8) / 2.2, 0), 1.0);
        // Smooth cubic ease for roll
        const rollEase = rollProgress * rollProgress * (3 - 2 * rollProgress);
        this.shuttleStack.rotation.z = rollEase * 0.28; // 16 degree roll
        this.shuttleStack.rotation.x = -rollEase * 0.18; // Pitch over

        this.flameLight.intensity = 4.8 + Math.random() * 1.2;
        this.shakeIntensity = 0.65;

        // Telemetry update
        this.altitude = (yPos * 0.08).toFixed(1);
        this.velocity = Math.round(ascT * 180);
        this.mach = (this.velocity / 340).toFixed(2);
        this.gForce = (1.2 + ascT * 0.5).toFixed(1);

        this.updateTelemetry(this.altitude, this.velocity, this.mach, this.gForce, 'T+02 // ROLL PROGRAM INITIATED');
      }
      // Phase 3: Ascent towards Max Q (4.8s to 8.5s)
      else if (elapsed < 9.0) {
        this.launchState = 'ascent';
        const ascT = elapsed - 1.8;
        const yPos = 0.5 * 7.5 * (ascT * ascT);
        this.shuttleStack.position.y = yPos;

        this.srbPlumes.forEach(p => {
          const flutter = 1.0 + (Math.random() - 0.5) * 0.15;
          p.group.scale.set(flutter, flutter * 1.35, flutter);
        });

        this.flameLight.intensity = 5.2 + Math.random() * 1.5;
        this.shakeIntensity = Math.max(0.75 - (elapsed - 4.8) * 0.1, 0.25);

        this.altitude = (yPos * 0.08).toFixed(1);
        this.velocity = Math.round(ascT * 260);
        this.mach = (this.velocity / 340).toFixed(2);
        this.gForce = 2.8;

        const statusText = elapsed > 6.5 ? 'T+06 // MAXIMUM DYNAMIC PRESSURE (MAX Q)' : 'T+04 // MACH 1 PASSING';
        this.updateTelemetry(this.altitude, this.velocity, this.mach, this.gForce, statusText);
      }
      // Phase 4: Stage Complete -> Warp to Solar System Orbit
      else {
        this.launchState = 'complete';
        this.updateTelemetry('84.2', '2450', '7.2', '3.0', 'T+09 // ORBITAL INSERTION CONFIRMED');
        this.completeAndWarp();
      }

      // Camera Tracking in Cinematic Mode
      if (this.cameraMode === 'cinematic') {
        const targetY = this.shuttleStack.position.y * 0.72 - 14;
        this.camera.position.y += (targetY - this.camera.position.y) * 0.08;
        this.camera.lookAt(0, this.shuttleStack.position.y + 4, 0);

        // Camera Rumble
        if (this.shakeIntensity > 0) {
          this.camera.position.x = (Math.random() - 0.5) * this.shakeIntensity;
          this.camera.position.z = 48 + (Math.random() - 0.5) * this.shakeIntensity;
        }
      }

      // Update Smoke Particles
      this.updateSmokeParticles();
    }

    updateSmokeParticles() {
      if (!this.smokeParticles) return;
      const pos = this.smokeParticles.geometry.attributes.position.array;
      const shuttleY = this.shuttleStack ? this.shuttleStack.position.y : 0;

      for (let i = 0; i < this.smokeData.length; i++) {
        const d = this.smokeData[i];
        d.life += 0.02;

        if (d.life > d.maxLife) {
          // Re-spawn near current nozzle position
          d.life = 0;
          const xOffset = Math.random() > 0.5 ? -3.85 : 3.85;
          pos[i * 3] = xOffset + (Math.random() - 0.5) * 4;
          pos[i * 3 + 1] = shuttleY - 18 - Math.random() * 4;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
        } else {
          pos[i * 3] += d.vx;
          pos[i * 3 + 1] += d.vy;
          pos[i * 3 + 2] += d.vz;
        }
      }

      this.smokeParticles.geometry.attributes.position.needsUpdate = true;
    }

    updateTelemetry(alt, vel, mach, g, status) {
      const elAlt = document.getElementById('hudShuttleAlt');
      const elVel = document.getElementById('hudShuttleVel');
      const elMach = document.getElementById('hudShuttleMach');
      const elG = document.getElementById('hudShuttleG');
      const elStatus = document.getElementById('hudShuttleStatus');

      if (elAlt) elAlt.textContent = `${alt} km`;
      if (elVel) elVel.textContent = `${vel} m/s`;
      if (elMach) elMach.textContent = `M ${mach}`;
      if (elG) elG.textContent = `${g} G`;
      if (elStatus) elStatus.textContent = status;
    }

    updateStatusBadge(text, color) {
      const badge = document.getElementById('shuttleMissionBadge');
      if (badge) {
        badge.textContent = text;
        badge.className = `mission-status-pill ${color}`;
      }
    }

    animate() {
      if (!this.isActive) return;

      this.animFrameId = requestAnimationFrame(() => this.animate());

      const now = performance.now();
      const elapsed = (now - this.startTime) * 0.001; // seconds

      this.updatePhysics(elapsed);

      if (this.controls && this.controls.enabled) {
        this.controls.update();
      }

      this.renderer.render(this.scene, this.camera);
    }

    completeAndWarp() {
      this.isActive = false;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

      // Play warp sound and transition to solar system
      if (window.solarAppInstance && window.solarAppInstance.audio) {
        try { window.solarAppInstance.audio.playWarpSound(); } catch (e) { }
      }

      // Flash white transition
      let flash = document.querySelector('.solar-flash');
      if (!flash) {
        flash = document.createElement('div');
        flash.className = 'solar-flash';
        document.body.appendChild(flash);
      }
      flash.classList.add('is-flashing');

      setTimeout(() => {
        this.closeModal();
        document.body.classList.remove('in-launch');
        document.body.classList.add('solar-active');

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
        }, 300);
      }, 500);
    }

    openModal() {
      if (!this.modal) this.init();
      if (!this.modal) return;

      this.modal.classList.add('is-open');
      this.modal.setAttribute('aria-hidden', 'false');

      this.setupThreeScene();
      this.onResize();
      this.setCameraView('cinematic');
      this.startLaunchSequence();
    }

    closeModal() {
      if (!this.modal) return;
      this.isActive = false;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

      this.modal.classList.remove('is-open');
      this.modal.setAttribute('aria-hidden', 'true');
    }

    replay() {
      this.shuttleStack.position.set(0, 0, 0);
      this.shuttleStack.rotation.set(0, 0, 0);
      this.setCameraView('cinematic');
      this.startLaunchSequence();
    }

    bindUI() {
      // 1. Close / Skip Button
      const btnClose = document.getElementById('btnCloseShuttleModal');
      if (btnClose) {
        btnClose.addEventListener('click', () => {
          this.completeAndWarp();
        });
      }

      // 2. Replay Button
      const btnReplay = document.getElementById('btnReplayShuttleLaunch');
      if (btnReplay) {
        btnReplay.addEventListener('click', () => {
          this.replay();
        });
      }

      // 3. Camera Mode Toggle Buttons
      const btnCamCinematic = document.getElementById('btnCamCinematic');
      if (btnCamCinematic) {
        btnCamCinematic.addEventListener('click', () => {
          document.querySelectorAll('.shuttle-cam-btn').forEach(b => b.classList.remove('is-active'));
          btnCamCinematic.classList.add('is-active');
          this.setCameraView('cinematic');
        });
      }

      const btnCamOrbit = document.getElementById('btnCamOrbit');
      if (btnCamOrbit) {
        btnCamOrbit.addEventListener('click', () => {
          document.querySelectorAll('.shuttle-cam-btn').forEach(b => b.classList.remove('is-active'));
          btnCamOrbit.classList.add('is-active');
          this.setCameraView('orbit');
        });
      }
    }

    onResize() {
      if (!this.renderer || !this.camera || !this.canvas) return;
      const width = this.canvas.clientWidth || window.innerWidth;
      const height = this.canvas.clientHeight || window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  // Expose global instance
  window.SpaceShuttleEngine = SpaceShuttleLaunch;
  document.addEventListener('DOMContentLoaded', () => {
    window.spaceShuttleInstance = new SpaceShuttleLaunch();
  });
})();
