/**
 * Lumora — Solar System 3D Engine & Planet Explorer
 * Built with Three.js, Procedural Textures, Elliptical Orbits,
 * Web Audio Synthesizer, and Interactive Planet Dossiers.
 */

(() => {
  // Planetary Database
  const PLANET_DATA = {
    sun: {
      id: 'sun',
      name: 'Sun (Sol)',
      title: 'Sol — Sovereign Star of the System',
      category: 'Yellow Dwarf Star (G2V)',
      color: '#ffaa33',
      secondaryColor: '#ff4400',
      symbol: '☉',
      distance: '0 AU (System Epicenter)',
      distanceKm: '0 km',
      diameter: '1,392,700 km (109 × Earth)',
      mass: '1.989 × 10³⁰ kg (333,000 × Earth)',
      gravity: '274 m/s² (28 × Earth)',
      surfaceTemp: '5,500 °C (Surface) / 15,000,000 °C (Core)',
      rotationPeriod: '25 – 35 Earth Days (Differential)',
      orbitalPeriod: '230 Million Years (Galactic Orbit)',
      moons: '8 Planets, 5 Dwarf Planets, 1.3M+ Asteroids',
      atmosphere: [
        { name: 'Hydrogen (H₂)', percent: 73.4 },
        { name: 'Helium (He)', percent: 24.8 },
        { name: 'Oxygen & Carbon', percent: 1.2 },
        { name: 'Iron & Neon', percent: 0.6 }
      ],
      overview: 'The heart and life-giver of our solar system, containing 99.86% of all mass in the entire planetary family. The Sun is a nearly perfect sphere of incandescent hot plasma, heated to incandescence by nuclear fusion reactions in its deep core.',
      discovery: 'Known since antiquity; heliocentric model mathematically formalized by Nicolaus Copernicus in 1543.',
      missions: [
        { name: 'Parker Solar Probe', year: '2018–Present', desc: 'Swooping within 6.1M km of the solar surface at 690,000 km/h, sampling the corona directly.' },
        { name: 'SOHO & SDO', year: '1995–Present', desc: 'Continuous 24/7 space weather imaging, coronal mass ejection detection, and helioseismology.' },
        { name: 'Solar Orbiter', year: '2020–Present', desc: 'ESA/NASA mission capturing the closest images ever taken of solar campfires and polar regions.' }
      ],
      cadetNotes: [
        'Every single second, the Sun converts 600 million tons of hydrogen into 596 million tons of helium, releasing 4 million tons of matter as radiant energy.',
        'A photon born through nuclear fusion in the core takes over 100,000 years to slowly diffuse through the radiative zone before shooting to Earth in just 8 minutes and 20 seconds.',
        'The Sun’s outer atmosphere (the corona) is paradoxically millions of degrees hotter than its visible surface (photosphere), heated by magnetic reconnection waves.'
      ]
    },
    mercury: {
      id: 'mercury',
      name: 'Mercury',
      title: 'Mercury — The Swift Scorched Messenger',
      category: 'Terrestrial Planet',
      color: '#b0a498',
      secondaryColor: '#5c5249',
      symbol: '☿',
      distance: '0.39 AU',
      distanceKm: '57.9 Million km',
      diameter: '4,879 km (0.38 × Earth)',
      mass: '3.301 × 10²³ kg (0.055 × Earth)',
      gravity: '3.7 m/s² (0.38 × Earth)',
      surfaceTemp: '-180 °C (Night) to +430 °C (Day)',
      rotationPeriod: '58.6 Earth Days (3:2 spin-orbit resonance)',
      orbitalPeriod: '88 Earth Days',
      moons: '0 (Moonless)',
      atmosphere: [
        { name: 'Oxygen (O₂)', percent: 42.0 },
        { name: 'Sodium (Na)', percent: 29.0 },
        { name: 'Hydrogen (H₂)', percent: 22.0 },
        { name: 'Helium & Potassium', percent: 7.0 }
      ],
      overview: 'The innermost, smallest planet in our solar system. Mercury is a dense, heavily cratered world resembling Earth’s Moon, possessing an enormous iron core that generates a surprisingly active magnetic field despite its diminutive size.',
      discovery: 'Documented by Assyrian and Babylonian astronomers in the 14th century BC as "Udu-idim-gu\u2084-ud".',
      missions: [
        { name: 'MESSENGER', year: '2011–2015', desc: 'First probe to orbit Mercury, mapping 100% of the surface, uncovering volcanic vents and polar water ice.' },
        { name: 'BepiColombo', year: '2025–En Route', desc: 'Joint ESA/JAXA dual-orbiter conducting unprecedented magnetospheric and high-resolution compositional scans.' },
        { name: 'Mariner 10', year: '1974–1975', desc: 'First spacecraft to visit Mercury, revealing a heavily scarred moon-like surface and surprise magnetic field.' }
      ],
      cadetNotes: [
        'Mercury has the wildest temperature swing in the solar system: a staggering 610 °C difference between its sun-scorched days and pitch-black nights.',
        'Water ice permanently survives in the frigid, sunless shadows of Mercury’s deep polar craters, shielded from direct sunlight for billions of years.',
        'Due to Mercury’s orbital eccentricity and slow rotation, an observer on the surface would watch the Sun rise, stop, reverse direction, stop again, and resume its path across the sky.'
      ]
    },
    venus: {
      id: 'venus',
      name: 'Venus',
      title: 'Venus — The Veiled Greenhouse Inferno',
      category: 'Terrestrial Planet',
      color: '#e8c288',
      secondaryColor: '#c48943',
      symbol: '♀',
      distance: '0.72 AU',
      distanceKm: '108.2 Million km',
      diameter: '12,104 km (0.95 × Earth)',
      mass: '4.867 × 10²⁴ kg (0.815 × Earth)',
      gravity: '8.87 m/s² (0.90 × Earth)',
      surfaceTemp: '+465 °C (Hottest in Solar System)',
      rotationPeriod: '243 Earth Days (Retrograde clockwise)',
      orbitalPeriod: '224.7 Earth Days',
      moons: '0 (Moonless)',
      atmosphere: [
        { name: 'Carbon Dioxide (CO₂)', percent: 96.5 },
        { name: 'Nitrogen (N₂)', percent: 3.5 },
        { name: 'Sulfur Dioxide (SO₂)', percent: 0.015 },
        { name: 'Water Vapor & Argon', percent: 0.005 }
      ],
      overview: 'Often named Earth’s twin for its nearly identical size, mass, and bulk composition, Venus evolved into a hellish greenhouse landscape. Its opaque canopy of sulfuric acid clouds traps solar radiation, making its lead-melting surface the hottest planet in the solar system.',
      discovery: 'Observed as both the "Morning Star" (Phosphorus) and "Evening Star" (Hesperus) since prehistoric times.',
      missions: [
        { name: 'Venera 13 & 14', year: '1982', desc: 'Soviet landers that survived under 90 atm pressure to transmit color photos and record the sound of Venusian winds.' },
        { name: 'Magellan Radar', year: '1990–1994', desc: 'NASA synthetic aperture radar stripped away the cloud barrier, revealing 85% volcanic basalt plains.' },
        { name: 'DAVINCI & VERITAS', year: '2029+ (Upcoming)', desc: 'Next-generation atmospheric descent probes and infrared surface composition mapping.' }
      ],
      cadetNotes: [
        'A single day on Venus (243 Earth days) is longer than its entire year (225 Earth days)!',
        'Venus spins backwards (retrograde) compared to nearly all other planets—the Sun rises in the west and sets in the east.',
        'The atmospheric pressure at the Venusian surface is 92 times Earth’s—identical to being submerged nearly 1,000 meters beneath ocean waters.'
      ]
    },
    earth: {
      id: 'earth',
      name: 'Earth (Terra)',
      title: 'Earth — The Azure Jewel of Life',
      category: 'Terrestrial / Habitable Oasis',
      color: '#4f94cd',
      secondaryColor: '#3c6e3b',
      symbol: '♁',
      distance: '1.00 AU (The Astronomical Unit)',
      distanceKm: '149.6 Million km',
      diameter: '12,742 km',
      mass: '5.972 × 10²⁴ kg',
      gravity: '9.807 m/s² (1.00 G)',
      surfaceTemp: '-89 °C to +57 °C (Mean: +15 °C)',
      rotationPeriod: '23h 56m 04s',
      orbitalPeriod: '365.25 Days',
      moons: '1 (Luna — 3,474 km diameter)',
      atmosphere: [
        { name: 'Nitrogen (N₂)', percent: 78.08 },
        { name: 'Oxygen (O₂)', percent: 20.95 },
        { name: 'Argon (Ar)', percent: 0.93 },
        { name: 'Water Vapor & CO₂', percent: 0.04 }
      ],
      overview: 'Our home haven: the only verified cradle of consciousness and life in the cosmos. Wrapped in a nitrogen-oxygen envelope, shielded by a dynamic molten iron geodynamo, and blessed with vast liquid oceans covering 71% of its crust.',
      discovery: 'Origin of human civilization; home coordinates of Cadet Skyranger basecamp.',
      missions: [
        { name: 'Apollo Program', year: '1968–1972', desc: 'Took humanity to the Moon and captured the iconic "Earthrise" and "Blue Marble" portraits.' },
        { name: 'International Space Station', year: '2000–Present', desc: 'Continuously crewed orbital microgravity laboratory testing long-duration human spaceflight.' },
        { name: 'Earth Observing Fleet', year: 'Continuous', desc: 'Constellation of NASA/ESA satellites monitoring climate, polar ice sheets, oceans, and biosphere.' }
      ],
      cadetNotes: [
        'Earth is the densest major body in the entire solar system (5.51 g/cm³), driven by its massive nickel-iron outer and inner core.',
        'The Earth-Moon gravitational dance stabilizes Earth’s 23.4° axial tilt, ensuring billions of years of predictable seasonal climate stability necessary for life.',
        'Earth is continuously pelted by over 100 tons of interplanetary micrometeoroids and space dust every single day—almost all vaporized harmlessly in the mesosphere.'
      ]
    },
    mars: {
      id: 'mars',
      name: 'Mars',
      title: 'Mars — The Crimson Frontier',
      category: 'Terrestrial Planet',
      color: '#d46343',
      secondaryColor: '#8a2b16',
      symbol: '♂',
      distance: '1.52 AU',
      distanceKm: '227.9 Million km',
      diameter: '6,779 km (0.53 × Earth)',
      mass: '6.417 × 10²³ kg (0.107 × Earth)',
      gravity: '3.72 m/s² (0.38 × Earth)',
      surfaceTemp: '-125 °C (Poles) to +20 °C (Equator)',
      rotationPeriod: '24h 37m 22s (1 Sol)',
      orbitalPeriod: '687 Earth Days (1.88 Years)',
      moons: '2 (Phobos & Deimos — captured asteroids)',
      atmosphere: [
        { name: 'Carbon Dioxide (CO₂)', percent: 95.32 },
        { name: 'Nitrogen (N₂)', percent: 2.60 },
        { name: 'Argon (Ar)', percent: 1.90 },
        { name: 'Oxygen & Water Vapor', percent: 0.18 }
      ],
      overview: 'The famous Red Planet, adorned in iron oxide rust sands and carved by ancient catastrophic rivers, lakes, and oceans. Mars stands as humanity’s primary horizon for interplanetary settlement and the search for past microbial biosignatures.',
      discovery: 'Recorded by Egyptian astronomers in the 2nd millennium BC as "Horus of the Horizon".',
      missions: [
        { name: 'Perseverance & Ingenuity', year: '2021–Present', desc: 'Searching Jezero Crater for biosignatures, caching rock cores, and achieving first powered flight on another world.' },
        { name: 'Curiosity Rover', year: '2012–Present', desc: 'Climbing Mount Sharp in Gale Crater, proving ancient Mars was once fully habitable with fresh water lakes.' },
        { name: 'Viking 1 & 2', year: '1976', desc: 'First successful long-duration American landers to operate on the Martian surface.' }
      ],
      cadetNotes: [
        'Home to Olympus Mons: a volcanic shield monster 22 kilometers high and 600 kilometers across—nearly triple the height of Mount Everest.',
        'The colossal canyon system Valles Marineris stretches over 4,000 kilometers long and 7 kilometers deep—long enough to span the entire North American continent.',
        'Mars experiences planetary-scale dust storms that can envelope the entire globe in red haze for months at a time.'
      ]
    },
    jupiter: {
      id: 'jupiter',
      name: 'Jupiter',
      title: 'Jupiter — The Sovereign King of Storms',
      category: 'Gas Giant (Jovian)',
      color: '#d4a373',
      secondaryColor: '#a96b3d',
      symbol: '♃',
      distance: '5.20 AU',
      distanceKm: '778.5 Million km',
      diameter: '139,820 km (11.0 × Earth)',
      mass: '1.898 × 10²⁷ kg (318 × Earth)',
      gravity: '24.79 m/s² (2.53 × Earth)',
      surfaceTemp: '-110 °C (1-bar cloud level)',
      rotationPeriod: '9h 55m 30s (Fastest in Solar System)',
      orbitalPeriod: '11.86 Earth Years',
      moons: '95 Known (Io, Europa, Ganymede, Callisto...)',
      atmosphere: [
        { name: 'Hydrogen (H₂)', percent: 89.8 },
        { name: 'Helium (He)', percent: 10.2 },
        { name: 'Methane (CH₄)', percent: 0.3 },
        { name: 'Ammonia & Water', percent: 0.1 }
      ],
      overview: 'The colossal titan of the solar system, holding 2.5 times the mass of all other planets combined. Jupiter features a mesmerizing striped atmosphere of jet streams, white ammonium ovals, and the immortal crimson vortex of the Great Red Spot.',
      discovery: 'Observed through telescope by Galileo Galilei in 1610, revealing its four major moons.',
      missions: [
        { name: 'Juno', year: '2016–Present', desc: 'Polar orbit probe mapping deep Jovian water content, core structure, and lethal radiation belts.' },
        { name: 'Galileo Orbiter & Probe', year: '1995–2003', desc: 'First mission to deploy an atmospheric descent probe into Jupiter’s crushing winds.' },
        { name: 'Europa Clipper & JUICE', year: '2024+ En Route', desc: 'Directly investigating the subsurface liquid oceans of icy moons Europa and Ganymede.' }
      ],
      cadetNotes: [
        'The Great Red Spot is an anticyclonic super-storm larger than Earth that has raged across Jupiter’s southern hemisphere for over 350 years.',
        'Jupiter’s moon Ganymede is the largest moon in the solar system—at 5,268 km wide, it is substantially larger than the planet Mercury and has its own magnetic field.',
        'Deep inside Jupiter, pressure is so extreme that hydrogen turns into a glowing liquid metallic ocean, creating a magnetic field 20,000 times stronger than Earth’s.'
      ]
    },
    saturn: {
      id: 'saturn',
      name: 'Saturn',
      title: 'Saturn — The Ringed Majestic Jewel',
      category: 'Gas Giant (Jovian)',
      color: '#e2ca9a',
      secondaryColor: '#c29d66',
      symbol: '♄',
      distance: '9.58 AU',
      distanceKm: '1.43 Billion km',
      diameter: '116,460 km (9.1 × Earth)',
      mass: '5.683 × 10²⁶ kg (95 × Earth)',
      gravity: '10.44 m/s² (1.06 × Earth)',
      surfaceTemp: '-140 °C (1-bar cloud level)',
      rotationPeriod: '10h 33m 38s',
      orbitalPeriod: '29.45 Earth Years',
      moons: '146 Verified Moons (System Record)',
      atmosphere: [
        { name: 'Hydrogen (H₂)', percent: 96.3 },
        { name: 'Helium (He)', percent: 3.25 },
        { name: 'Methane (CH₄)', percent: 0.45 },
        { name: 'Ammonia (NH₃)', percent: 0.02 }
      ],
      overview: 'Universally recognized for its peerless, luminous ring system extending up to 282,000 km across space. Saturn is a golden pastel gas giant harboring an extraordinary entourage of moons, including smog-shrouded Titan and cryovolcanic Enceladus.',
      discovery: 'Rings first perceived by Galileo (1610) as "ears" and resolved as rings by Christiaan Huygens in 1655.',
      missions: [
        { name: 'Cassini-Huygens', year: '2004–2017', desc: 'Thirteen years in Saturnian orbit; landed the Huygens probe on Titan and discovered Enceladus ocean geysers.' },
        { name: 'Voyager 1 & 2', year: '1980–1981', desc: 'Captured first high-resolution views of ring spokes, shepherd moons, and intricate ringlet subdivisions.' },
        { name: 'Dragonfly', year: '2028 (Upcoming)', desc: 'Rotorcraft lander that will fly through the dense nitrogen atmosphere of methane-sea moon Titan.' }
      ],
      cadetNotes: [
        'Saturn’s magnificent rings span over 280,000 kilometers wide, yet they are remarkably thin—averaging only 10 to 30 meters in thickness!',
        'Saturn has the lowest bulk density of any planet in the solar system (0.687 g/cm³)—it is lighter than water and would literally float in a giant cosmic bathtub.',
        'At Saturn’s north pole sits an enigmatic, persistent 6-sided hexagonal jet stream storm wide enough to fit four Earths inside.'
      ]
    },
    uranus: {
      id: 'uranus',
      name: 'Uranus',
      title: 'Uranus — The Tilted Aquamarine Ice Giant',
      category: 'Ice Giant',
      color: '#8be5e5',
      secondaryColor: '#4ea8a8',
      symbol: '♅',
      distance: '19.22 AU',
      distanceKm: '2.87 Billion km',
      diameter: '50,724 km (4.0 × Earth)',
      mass: '8.681 × 10²⁵ kg (14.5 × Earth)',
      gravity: '8.69 m/s² (0.89 × Earth)',
      surfaceTemp: '-224 °C (Coldest atmosphere recorded)',
      rotationPeriod: '17h 14m 24s (Retrograde)',
      orbitalPeriod: '84.02 Earth Years',
      moons: '28 Known (Titania, Oberon, Miranda...)',
      atmosphere: [
        { name: 'Hydrogen (H₂)', percent: 82.5 },
        { name: 'Helium (He)', percent: 15.2 },
        { name: 'Methane (CH₄)', percent: 2.3 },
        { name: 'Hydrogen Deuteride', percent: 0.01 }
      ],
      overview: 'A serene pale cyan ice giant composed of water, ammonia, and methane supercritical ices above a rocky core. Uranus is famously knocked on its side with a 98° axial tilt, rolling around the Sun like a cosmic wheel.',
      discovery: 'First planet discovered with a telescope, sighted by William Herschel on March 13, 1781.',
      missions: [
        { name: 'Voyager 2', year: '1986', desc: 'Sole spacecraft flyby, discovering 10 new moons, 2 rings, and measuring its bizarre tilted magnetic dipole.' },
        { name: 'Uranus Orbiter & Probe (Proposed)', year: 'Decadal Priority', desc: 'Top priority NASA flagship mission slated to map internal heat flux and atmospheric structure.' }
      ],
      cadetNotes: [
        'Due to its 97.77° axial tilt, each pole on Uranus endures 42 years of continuous blazing sunlight followed by 42 years of unbroken polar night.',
        'Methane gas in Uranus’s upper atmosphere absorbs red light from the Sun, reflecting the serene pale aquamarine and cyan hues back into space.',
        'Uranus’s moon Miranda possesses Verona Rupes, the tallest cliff in the solar system, dropping over 20 kilometers straight down!'
      ]
    },
    neptune: {
      id: 'neptune',
      name: 'Neptune',
      title: 'Neptune — The Supersonic Azure Outpost',
      category: 'Ice Giant',
      color: '#2dd4bf',
      secondaryColor: '#0f766e',
      symbol: '♆',
      distance: '30.05 AU',
      distanceKm: '4.50 Billion km',
      diameter: '49,244 km (3.9 × Earth)',
      mass: '1.024 × 10²⁶ kg (17.1 × Earth)',
      gravity: '11.15 m/s² (1.14 × Earth)',
      surfaceTemp: '-214 °C (Cloud top)',
      rotationPeriod: '16h 06m 36s',
      orbitalPeriod: '164.79 Earth Years',
      moons: '16 Known (Triton, Proteus, Nereid...)',
      atmosphere: [
        { name: 'Hydrogen (H₂)', percent: 80.0 },
        { name: 'Helium (He)', percent: 19.0 },
        { name: 'Methane (CH₄)', percent: 1.5 },
        { name: 'Ammonia & Ethane', percent: 0.1 }
      ],
      overview: 'The distant guardian of the planetary frontier, a deep cobalt-blue ice giant whipped by supersonic winds. Neptune was located through pure mathematical prediction by Urbain Le Verrier before it was ever seen through a telescope lens.',
      discovery: 'Mathematically predicted and verified on September 23, 1846 by Johann Gottfried Galle.',
      missions: [
        { name: 'Voyager 2', year: '1989', desc: 'Historic flyby revealing the Great Dark Spot, active geysers on moon Triton, and thin clumpy ring arcs.' },
        { name: 'Hubble & James Webb', year: 'Ongoing', desc: 'High-contrast infrared observation capturing glowing methane clouds and Neptune’s delicate ring system.' }
      ],
      cadetNotes: [
        'Neptune harbors the fastest recorded winds anywhere in the solar system, clocking speeds exceeding 2,160 km/h (1,340 mph)—surpassing the speed of sound on Earth!',
        'Its largest moon Triton orbits backwards (retrograde) and is a captured Kuiper Belt dwarf planet with active liquid nitrogen geysers spewing 8 kilometers high.',
        'Neptune has completed only one full orbit around the Sun since its mathematical discovery in 1846, marking its first anniversary in July 2011.'
      ]
    }
  };

  // Celestial bodies list in order from Sun to Neptune
  const BODY_KEYS = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  // Audio Synthesizer (Zero-dependency Web Audio API)
  class SpaceAudioEngine {
    constructor() {
      this.ctx = null;
      this.muted = false;
      this.ambientGain = null;
      this.ambientNodes = [];
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (this.ambientNodes && this.ambientNodes.length > 0) {
        this.ambientNodes.forEach(node => {
          try { node.stop(); node.disconnect(); } catch (err) {}
        });
        this.ambientNodes = [];
      }
      if (this.ambientGain) {
        try { this.ambientGain.disconnect(); } catch (err) {}
        this.ambientGain = null;
      }
    }

    playVisorLock() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      // Heavy pneumatic click & visor latch
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);

      // Pneumatic hiss
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.value = 3.0;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.26);
    }

    playRocketLaunch() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      // Deep rumble oscillator
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(45, now);
      sub.frequency.exponentialRampToValueAtTime(140, now + 2.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 2.0);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.45, now + 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      sub.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 2.6);

      // Rocket thrust noise roar
      const bufferSize = Math.floor(this.ctx.sampleRate * 2.5);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.8;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(250, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(1600, now + 2.0);
      noiseFilter.Q.value = 1.8;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 1.0);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 2.6);
    }

    playWarpSound() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.7);
    }

    playScanTelemetry() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      [620, 880, 1240].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = now + idx * 0.05;
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.1);
      });
    }

    playSelectBlip() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }

    playClick() {
      this.playSelectBlip();
    }

    playWhoosh() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    }

    playCardClink() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      // Metallic clasp clink with high glass resonance
      [1800, 2400, 3100].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        gain.gain.setValueAtTime(0.08, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.2);
      });
    }

    playPageFlip() {
      this.init();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;
      // Synthesize realistic paper page turning sound (bandpass noise burst + gentle glide)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.16);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.15);
      filter.Q.value = 1.4;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    }

    startAmbientSpace() {
      // Background ambient sound disabled as requested
      return;
    }

    toggleMute() {
      this.muted = !this.muted;
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setTargetAtTime(this.muted ? 0 : 0.045, this.ctx.currentTime, 0.2);
      }
      return this.muted;
    }
  }

  // High-performance 2D Permutation Noise with Octave fBm for cinematic planetary surfaces
  class Noise2D {
    constructor(seed = 1984) {
      this.p = new Uint8Array(512);
      const perm = new Uint8Array(256);
      for (let i = 0; i < 256; i++) perm[i] = i;
      let s = seed;
      for (let i = 255; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        const j = s % (i + 1);
        const t = perm[i]; perm[i] = perm[j]; perm[j] = t;
      }
      for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255];
    }
    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t, a, b) { return a + t * (b - a); }
    grad(hash, x, y) {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    noise(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
      const u = this.fade(xf);
      const v = this.fade(yf);
      const a = this.p[X] + Y;
      const b = this.p[X + 1] + Y;
      const x1 = this.lerp(u, this.grad(this.p[a], xf, yf), this.grad(this.p[b], xf - 1, yf));
      const x2 = this.lerp(u, this.grad(this.p[a + 1], xf, yf - 1), this.grad(this.p[b + 1], xf - 1, yf - 1));
      return (this.lerp(v, x1, x2) + 1) * 0.5;
    }
    fbm(x, y, octaves = 4, persistence = 0.5, lacunarity = 2.0) {
      let total = 0, freq = 1, amp = 1, max = 0;
      for (let i = 0; i < octaves; i++) {
        total += this.noise(x * freq, y * freq) * amp;
        max += amp;
        amp *= persistence;
        freq *= lacunarity;
      }
      return total / max;
    }
  }

  const _noise = new Noise2D(2026);

  // Procedural Texture Generator for Photorealistic, Zero-Latency Celestial Bodies
  class ProceduralTextures {
    static createSunTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Photosphere convective granulation & turbulent incandescent plasma
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        const poleDim = Math.sin(ny * Math.PI);
        const poleFactor = 0.75 + 0.25 * Math.pow(poleDim, 0.4);

        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;

          const nFine = _noise.fbm(nx * 48, ny * 24, 3, 0.55);
          const nCoarse = _noise.fbm(nx * 8 + 12, ny * 6, 2, 0.5);
          const val = nFine * 0.7 + nCoarse * 0.3;

          let r, g, b;
          if (val < 0.45) {
            const t = val / 0.45;
            r = Math.floor(190 + 65 * t);
            g = Math.floor(45 + 105 * t);
            b = Math.floor(5 + 10 * t);
          } else if (val < 0.8) {
            const t = (val - 0.45) / 0.35;
            r = 255;
            g = Math.floor(150 + 85 * t);
            b = Math.floor(15 + 110 * t);
          } else {
            const t = (val - 0.8) / 0.2;
            r = 255;
            g = Math.floor(235 + 20 * t);
            b = Math.floor(125 + 130 * t);
          }

          data[idx] = Math.floor(r * poleFactor);
          data[idx + 1] = Math.floor(g * poleFactor);
          data[idx + 2] = Math.floor(b * poleFactor);
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Realistic, fibrous active sunspot groups (dark umbra, magnetic penumbra)
      const sunspots = [
        { cx: 320, cy: 220, rx: 14, ry: 9, angle: 0.15 },
        { cx: 345, cy: 228, rx: 8, ry: 6, angle: -0.1 },
        { cx: 680, cy: 290, rx: 18, ry: 11, angle: -0.2 },
        { cx: 710, cy: 298, rx: 10, ry: 7, angle: 0.1 },
        { cx: 735, cy: 292, rx: 6, ry: 5, angle: 0 }
      ];

      sunspots.forEach(sp => {
        const penGrad = ctx.createRadialGradient(sp.cx, sp.cy, sp.rx * 0.3, sp.cx, sp.cy, sp.rx);
        penGrad.addColorStop(0, 'rgba(110, 32, 2, 0.95)');
        penGrad.addColorStop(0.65, 'rgba(180, 70, 8, 0.75)');
        penGrad.addColorStop(1, 'rgba(255, 160, 20, 0)');
        ctx.fillStyle = penGrad;
        ctx.beginPath();
        ctx.ellipse(sp.cx, sp.cy, sp.rx, sp.ry, sp.angle, 0, Math.PI * 2);
        ctx.fill();

        const umbraGrad = ctx.createRadialGradient(sp.cx, sp.cy, 0, sp.cx, sp.cy, sp.rx * 0.45);
        umbraGrad.addColorStop(0, 'rgba(18, 4, 1, 0.98)');
        umbraGrad.addColorStop(1, 'rgba(45, 10, 2, 0.92)');
        ctx.fillStyle = umbraGrad;
        ctx.beginPath();
        ctx.ellipse(sp.cx, sp.cy, sp.rx * 0.48, sp.ry * 0.48, sp.angle, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 250, 210, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(sp.cx, sp.cy, sp.rx * 1.35, sp.ry * 1.35, sp.angle, 0, Math.PI * 2);
        ctx.stroke();
      });

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    }

    static createMercuryTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Realistic heavily cratered anorthosite & dark volcanic basalt plains
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;

          const n1 = _noise.fbm(nx * 10, ny * 10, 4, 0.52);
          const n2 = _noise.fbm(nx * 32, ny * 32, 3, 0.5);
          const craterNoise = _noise.fbm(nx * 64, ny * 64, 2, 0.4);
          const v = n1 * 0.55 + n2 * 0.3 + craterNoise * 0.15;

          const base = 85 + v * 95;
          const r = Math.floor(base * 1.05);
          const g = Math.floor(base * 0.98);
          const b = Math.floor(base * 0.92);

          data[idx] = Math.min(255, r);
          data[idx + 1] = Math.min(255, g);
          data[idx + 2] = Math.min(255, b);
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Prominent impact craters with radiating glass ejecta rays
      const craters = [
        { cx: 320, cy: 210, r: 42, rays: 12 },
        { cx: 650, cy: 290, r: 35, rays: 8 },
        { cx: 480, cy: 380, r: 25, rays: 6 },
        { cx: 780, cy: 160, r: 28, rays: 7 },
        { cx: 160, cy: 310, r: 22, rays: 5 }
      ];

      craters.forEach(cr => {
        for (let a = 0; a < cr.rays; a++) {
          const angle = (a / cr.rays) * Math.PI * 2 + (cr.cx * 0.01);
          const rayLen = cr.r * (2.5 + Math.random() * 2.2);
          const grad = ctx.createLinearGradient(cr.cx, cr.cy, cr.cx + Math.cos(angle) * rayLen, cr.cy + Math.sin(angle) * rayLen);
          grad.addColorStop(0, 'rgba(235, 230, 220, 0.32)');
          grad.addColorStop(1, 'rgba(235, 230, 220, 0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cr.cx, cr.cy);
          ctx.lineTo(cr.cx + Math.cos(angle) * rayLen, cr.cy + Math.sin(angle) * rayLen);
          ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(220, 215, 205, 0.75)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(cr.cx, cr.cy, cr.r, 0, Math.PI * 2);
        ctx.stroke();

        const crGrad = ctx.createRadialGradient(cr.cx - cr.r * 0.2, cr.cy - cr.r * 0.2, 0, cr.cx, cr.cy, cr.r);
        crGrad.addColorStop(0, 'rgba(170, 165, 155, 0.9)');
        crGrad.addColorStop(0.7, 'rgba(65, 60, 55, 0.95)');
        crGrad.addColorStop(1, 'rgba(40, 36, 32, 0.85)');
        ctx.fillStyle = crGrad;
        ctx.beginPath();
        ctx.arc(cr.cx, cr.cy, cr.r * 0.92, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(225, 220, 210, 0.85)';
        ctx.beginPath();
        ctx.arc(cr.cx, cr.cy, cr.r * 0.16, 0, Math.PI * 2);
        ctx.fill();
      });

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createMercuryBump() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;
          const v = Math.floor(_noise.fbm(nx * 20, ny * 20, 3, 0.5) * 255);
          data[idx] = v;
          data[idx + 1] = v;
          data[idx + 2] = v;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return new THREE.CanvasTexture(canvas);
    }

    static createVenusTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Realistic dense super-rotating cloud deck with chevron Rossby waves
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        const chevron = Math.abs(ny - 0.5) * 1.8;

        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width + chevron * 0.15) % 1.0;
          const idx = (y * canvas.width + x) * 4;

          const nSmooth = _noise.fbm(nx * 6, ny * 14, 4, 0.5);
          const nWave = Math.sin(nx * Math.PI * 8 + ny * Math.PI * 4) * 0.08;
          const val = THREE.MathUtils.clamp(nSmooth + nWave, 0, 1);

          const r = Math.floor(222 + val * 30);
          const g = Math.floor(190 + val * 45);
          const b = Math.floor(135 + val * 55);

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createEarthTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Ocean base: deep sapphire with oceanic depth variation
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#0c2242');
      oceanGrad.addColorStop(0.5, '#14386b');
      oceanGrad.addColorStop(1, '#0c2242');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Continental shelf coastal turquoise fringes
      ctx.fillStyle = 'rgba(28, 98, 148, 0.45)';
      ctx.beginPath();
      ctx.ellipse(560, 255, 150, 160, 0.05, 0, Math.PI * 2);
      ctx.ellipse(280, 240, 130, 170, -0.1, 0, Math.PI * 2);
      ctx.fill();

      // 1. Africa
      const africaGrad = ctx.createLinearGradient(500, 160, 560, 360);
      africaGrad.addColorStop(0, '#788242');
      africaGrad.addColorStop(0.25, '#c99b4e');
      africaGrad.addColorStop(0.6, '#285e2b');
      africaGrad.addColorStop(1, '#5a7536');
      ctx.fillStyle = africaGrad;
      ctx.beginPath();
      ctx.moveTo(490, 190);
      ctx.bezierCurveTo(530, 175, 610, 190, 630, 230);
      ctx.bezierCurveTo(620, 280, 580, 340, 560, 370);
      ctx.bezierCurveTo(535, 360, 520, 300, 480, 260);
      ctx.bezierCurveTo(460, 240, 470, 200, 490, 190);
      ctx.closePath();
      ctx.fill();

      // 2. Eurasia
      const eurasiaGrad = ctx.createLinearGradient(520, 80, 800, 260);
      eurasiaGrad.addColorStop(0, '#365c32');
      eurasiaGrad.addColorStop(0.3, '#3f6b32');
      eurasiaGrad.addColorStop(0.55, '#d4a85b');
      eurasiaGrad.addColorStop(0.7, '#2f5e2d');
      ctx.fillStyle = eurasiaGrad;
      ctx.beginPath();
      ctx.moveTo(480, 180);
      ctx.bezierCurveTo(500, 110, 560, 90, 650, 95);
      ctx.bezierCurveTo(760, 80, 850, 110, 880, 170);
      ctx.bezierCurveTo(870, 230, 780, 270, 730, 270);
      ctx.bezierCurveTo(680, 280, 660, 240, 620, 220);
      ctx.bezierCurveTo(570, 230, 520, 200, 480, 180);
      ctx.closePath();
      ctx.fill();

      // 3. North America
      const naGrad = ctx.createLinearGradient(160, 90, 330, 230);
      naGrad.addColorStop(0, '#426139');
      naGrad.addColorStop(0.4, '#547d40');
      naGrad.addColorStop(0.75, '#b09650');
      naGrad.addColorStop(1, '#3b6e36');
      ctx.fillStyle = naGrad;
      ctx.beginPath();
      ctx.moveTo(130, 130);
      ctx.bezierCurveTo(200, 90, 290, 95, 340, 140);
      ctx.bezierCurveTo(345, 190, 305, 220, 290, 240);
      ctx.bezierCurveTo(260, 250, 240, 225, 200, 200);
      ctx.bezierCurveTo(160, 180, 120, 160, 130, 130);
      ctx.closePath();
      ctx.fill();

      // 4. South America
      const saGrad = ctx.createLinearGradient(250, 250, 340, 440);
      saGrad.addColorStop(0, '#225925');
      saGrad.addColorStop(0.5, '#2e6b2c');
      saGrad.addColorStop(0.85, '#69753c');
      saGrad.addColorStop(1, '#8f9474');
      ctx.fillStyle = saGrad;
      ctx.beginPath();
      ctx.moveTo(260, 250);
      ctx.bezierCurveTo(310, 255, 360, 280, 350, 330);
      ctx.bezierCurveTo(330, 390, 290, 440, 275, 455);
      ctx.bezierCurveTo(260, 420, 250, 340, 250, 280);
      ctx.closePath();
      ctx.fill();

      // 5. Australia
      ctx.fillStyle = '#9e5a2f';
      ctx.beginPath();
      ctx.ellipse(780, 350, 52, 38, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4f7535';
      ctx.beginPath();
      ctx.ellipse(815, 355, 14, 28, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // 6. Polar Ice Caps & Himalayas
      ctx.fillStyle = '#f2f8fc';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, 490, canvas.width * 0.48, 25, 0, 0, Math.PI * 2);
      ctx.ellipse(canvas.width / 2, 14, canvas.width * 0.38, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(660, 195, 26, 6, 0.15, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createEarthCloudTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Realistic meteorological cloud systems (cyclonic vortices, cold fronts, trade wind belts)
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        const itcz = Math.exp(-Math.pow((ny - 0.5) / 0.12, 2)) * 0.35;
        const stormNorth = Math.exp(-Math.pow((ny - 0.28) / 0.14, 2)) * 0.4;
        const stormSouth = Math.exp(-Math.pow((ny - 0.72) / 0.14, 2)) * 0.4;
        const beltBias = itcz + stormNorth + stormSouth;

        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;

          const n1 = _noise.fbm(nx * 12, ny * 12, 4, 0.55);
          const n2 = _noise.fbm(nx * 28 + 5, ny * 28, 2, 0.5);
          const raw = n1 * 0.7 + n2 * 0.3 + beltBias;
          const cloudDensity = THREE.MathUtils.smoothstep(raw, 0.48, 0.82);

          const brightness = Math.floor(235 + cloudDensity * 20);
          const alpha = Math.floor(cloudDensity * 225);

          data[idx] = brightness;
          data[idx + 1] = brightness;
          data[idx + 2] = brightness;
          data[idx + 3] = alpha;
        }
      }
      ctx.putImageData(img, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createMoonTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Realistic Lunar Maria and Anorthosite Highlands
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;

          const n1 = _noise.fbm(nx * 6, ny * 6, 4, 0.52);
          const n2 = _noise.fbm(nx * 24, ny * 24, 3, 0.5);
          const val = n1 * 0.65 + n2 * 0.35;

          const base = val < 0.42 ? (60 + val * 60) : (115 + val * 105);
          data[idx] = Math.floor(base);
          data[idx + 1] = Math.floor(base * 0.98);
          data[idx + 2] = Math.floor(base * 0.95);
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Tycho crater with radiating ray system
      const tychoX = 220, tychoY = 195;
      for (let r = 0; r < 14; r++) {
        const ang = (r / 14) * Math.PI * 2;
        const len = 65 + Math.random() * 30;
        const grad = ctx.createLinearGradient(tychoX, tychoY, tychoX + Math.cos(ang) * len, tychoY + Math.sin(ang) * len);
        grad.addColorStop(0, 'rgba(240, 240, 240, 0.5)');
        grad.addColorStop(1, 'rgba(240, 240, 240, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(tychoX + Math.cos(ang) * len, tychoY + Math.sin(ang) * len);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createMarsTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Authentic Martian geology: iron-oxide deserts and dark volcanic basalt provinces
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;

          const n1 = _noise.fbm(nx * 8, ny * 8, 4, 0.54);
          const n2 = _noise.fbm(nx * 26, ny * 26, 3, 0.48);
          const v = n1 * 0.6 + n2 * 0.4;

          let r, g, b;
          if (v < 0.42) {
            r = Math.floor(75 + v * 90);
            g = Math.floor(32 + v * 40);
            b = Math.floor(22 + v * 28);
          } else {
            const t = (v - 0.42) / 0.58;
            r = Math.floor(165 + t * 65);
            g = Math.floor(68 + t * 45);
            b = Math.floor(38 + t * 25);
          }

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Valles Marineris (4,000 km grand canyon rift along equatorial zone)
      ctx.strokeStyle = 'rgba(52, 18, 10, 0.85)';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(340, 260);
      ctx.bezierCurveTo(400, 265, 470, 280, 520, 275);
      ctx.stroke();

      // Olympus Mons volcanic caldera & Tharsis Montes
      ctx.fillStyle = 'rgba(185, 95, 55, 0.9)';
      ctx.beginPath();
      ctx.ellipse(260, 220, 22, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(65, 22, 12, 0.95)';
      ctx.beginPath();
      ctx.arc(260, 220, 5, 0, Math.PI * 2);
      ctx.fill();

      // Polar Ice Caps: North and South frosted CO2 ice with spiral melt troughs
      ctx.fillStyle = '#f8fbfd';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, 10, canvas.width * 0.32, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(canvas.width / 2, canvas.height - 10, canvas.width * 0.22, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createMarsBump() {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;
          const v = Math.floor(_noise.fbm(nx * 14, ny * 14, 3, 0.5) * 255);
          data[idx] = v;
          data[idx + 1] = v;
          data[idx + 2] = v;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return new THREE.CanvasTexture(canvas);
    }

    static createJupiterTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Authentic Jovian atmospheric zones and belts with shear turbulence
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;

        const bandPattern = Math.sin(ny * Math.PI * 18) * 0.4 +
                            Math.sin(ny * Math.PI * 34) * 0.2 +
                            Math.sin(ny * Math.PI * 6) * 0.4;

        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;

          const turbulence = _noise.fbm(nx * 16 + ny * 3, ny * 16, 4, 0.52) * 0.45;
          const val = THREE.MathUtils.clamp((bandPattern + 1) * 0.5 + turbulence * 0.35, 0, 1);

          let r, g, b;
          if (val < 0.35) {
            r = Math.floor(140 + val * 70);
            g = Math.floor(75 + val * 45);
            b = Math.floor(38 + val * 25);
          } else if (val < 0.7) {
            const t = (val - 0.35) / 0.35;
            r = Math.floor(215 + t * 30);
            g = Math.floor(165 + t * 40);
            b = Math.floor(110 + t * 45);
          } else {
            const t = (val - 0.7) / 0.3;
            r = Math.floor(245 + t * 10);
            g = Math.floor(235 + t * 15);
            b = Math.floor(215 + t * 25);
          }

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Great Red Spot with inner vortex spiral & turbulent wake
      const grsX = canvas.width * 0.64;
      const grsY = canvas.height * 0.67;
      const grsW = 68, grsH = 38;

      const grsOuter = ctx.createRadialGradient(grsX, grsY, grsH * 0.3, grsX, grsY, grsW * 0.95);
      grsOuter.addColorStop(0, 'rgba(215, 85, 45, 0.95)');
      grsOuter.addColorStop(0.55, 'rgba(195, 65, 30, 0.88)');
      grsOuter.addColorStop(0.85, 'rgba(235, 145, 95, 0.5)');
      grsOuter.addColorStop(1, 'rgba(240, 200, 150, 0)');
      ctx.fillStyle = grsOuter;
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW, grsH, 0.05, 0, Math.PI * 2);
      ctx.fill();

      const grsCore = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, grsW * 0.45);
      grsCore.addColorStop(0, 'rgba(155, 35, 15, 0.98)');
      grsCore.addColorStop(1, 'rgba(185, 55, 25, 0.92)');
      ctx.fillStyle = grsCore;
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW * 0.45, grsH * 0.48, 0.05, 0, Math.PI * 2);
      ctx.fill();

      // Trailing wake eddies
      for (let e = 1; e <= 4; e++) {
        ctx.fillStyle = 'rgba(245, 235, 215, 0.35)';
        ctx.beginPath();
        ctx.ellipse(grsX + e * 45, grsY + (e % 2 === 0 ? 8 : -8), 14 - e * 2, 7 - e, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createSaturnTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      // Silky pastel golden-cream gas bands
      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        const band = Math.sin(ny * Math.PI * 14) * 0.35 + Math.sin(ny * Math.PI * 28) * 0.15;

        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;
          const turb = _noise.fbm(nx * 10, ny * 10, 3, 0.5) * 0.15;
          const val = THREE.MathUtils.clamp((band + 1) * 0.5 + turb, 0, 1);

          const r = Math.floor(215 + val * 35);
          const g = Math.floor(190 + val * 38);
          const b = Math.floor(145 + val * 42);

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createSaturnRingTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0.00, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.10, 'rgba(165, 140, 105, 0.15)');
      grad.addColorStop(0.25, 'rgba(185, 160, 125, 0.45)');
      grad.addColorStop(0.35, 'rgba(215, 190, 150, 0.85)');
      // B Ring
      grad.addColorStop(0.50, 'rgba(240, 220, 185, 0.98)');
      grad.addColorStop(0.64, 'rgba(220, 195, 160, 0.92)');
      // Cassini Division
      grad.addColorStop(0.66, 'rgba(15, 10, 5, 0.05)');
      grad.addColorStop(0.71, 'rgba(15, 10, 5, 0.05)');
      // A Ring
      grad.addColorStop(0.73, 'rgba(215, 190, 155, 0.82)');
      grad.addColorStop(0.84, 'rgba(200, 175, 140, 0.78)');
      grad.addColorStop(0.86, 'rgba(40, 30, 20, 0.2)');
      grad.addColorStop(0.88, 'rgba(195, 170, 135, 0.75)');
      grad.addColorStop(0.96, 'rgba(160, 135, 105, 0.35)');
      grad.addColorStop(1.00, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 280; i++) {
        const x = Math.random() * canvas.width;
        if (x > canvas.width * 0.65 && x < canvas.width * 0.72) continue;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(30, 20, 10, 0.08)';
        ctx.fillRect(x, 0, Math.random() * 2 + 0.5, canvas.height);
      }

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    }

    static createUranusTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        const polarCollar = Math.exp(-Math.pow((ny - 0.22) / 0.16, 2)) * 0.18;

        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;
          const n = _noise.fbm(nx * 4, ny * 8, 3, 0.5) * 0.08;
          const val = THREE.MathUtils.clamp(polarCollar + n, 0, 1);

          const r = Math.floor(135 + val * 60);
          const g = Math.floor(215 + val * 35);
          const b = Math.floor(215 + val * 35);

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }

    static createNeptuneTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(canvas.width, canvas.height);
      const data = img.data;

      for (let y = 0; y < canvas.height; y++) {
        const ny = y / canvas.height;
        const band = Math.sin(ny * Math.PI * 12) * 0.12;

        for (let x = 0; x < canvas.width; x++) {
          const nx = x / canvas.width;
          const idx = (y * canvas.width + x) * 4;
          const n = _noise.fbm(nx * 8, ny * 16, 3, 0.5) * 0.15;
          const val = THREE.MathUtils.clamp((band + 0.5) * 0.5 + n, 0, 1);

          const r = Math.floor(35 + val * 45);
          const g = Math.floor(85 + val * 65);
          const b = Math.floor(210 + val * 45);

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // Great Dark Spot
      const gdsX = canvas.width * 0.55;
      const gdsY = canvas.height * 0.58;
      const gdsGrad = ctx.createRadialGradient(gdsX, gdsY, 0, gdsX, gdsY, 32);
      gdsGrad.addColorStop(0, 'rgba(12, 38, 120, 0.95)');
      gdsGrad.addColorStop(0.7, 'rgba(20, 60, 175, 0.85)');
      gdsGrad.addColorStop(1, 'rgba(40, 100, 240, 0)');
      ctx.fillStyle = gdsGrad;
      ctx.beginPath();
      ctx.ellipse(gdsX, gdsY, 36, 20, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // High-altitude white methane cirrus cloud streaks ("Scooter")
      const cirrus = [
        { cx: gdsX - 10, cy: gdsY - 14, len: 75 },
        { cx: gdsX + 35, cy: gdsY + 12, len: 55 },
        { cx: 320, cy: 190, len: 90 },
        { cx: 780, cy: 340, len: 85 }
      ];

      cirrus.forEach(c => {
        const cGrad = ctx.createLinearGradient(c.cx, c.cy, c.cx + c.len, c.cy);
        cGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        cGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.75)');
        cGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.7)');
        cGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.ellipse(c.cx + c.len * 0.5, c.cy, c.len * 0.5, 3.5, 0.05, 0, Math.PI * 2);
        ctx.fill();
      });

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    }
  }

  // ==========================================================================
  // JUPITER 3D INTERACTIVE WINDING ROADMAP ENGINE
  // Transforms the reference presentation roadmap into full 3D geometry
  // ==========================================================================
  const JUPITER_MILESTONES = [
    {
      phase: 0,
      id: 'green',
      code: 'ACHIEVEMENT 01 // 2018',
      color: '#22c55e',
      colorHex: 0x22c55e,
      side: 'left',
      title: 'Haryana State Winner — National Spell Quest',
      subtitle: 'State Championship in Academic Linguistics & Vocabulary Rigor',
      summary: 'In 2018, I was recognized as the Haryana State Winner in the National Spell Quest, an achievement that reflects both strong language skills, vocabulary mastery, and dedicated effort across rigorous competitive rounds.',
      status: 'STATE WINNER',
      statusClass: 'completed',
      progress: 100,
      timeline: '2018 State Finals',
      curveT: 0.18,
      badgeOffset: new THREE.Vector3(-13, 3.2, 4),
      deliverables: [
        { text: 'Conquered school, district, and state competitive linguistic rounds', done: true },
        { text: 'Honored as Haryana State Champion in National Spell Quest (2018)', done: true },
        { text: 'Demonstrated advanced lexical recall, etymology, and verbal reasoning', done: true },
        { text: 'Built foundational discipline, poise under pressure, and perseverance', done: true }
      ],
      metrics: [
        { label: 'HONOR', val: 'STATE WINNER' },
        { label: 'TERRITORY', val: 'HARYANA, INDIA' },
        { label: 'YEAR', val: '2018' }
      ],
      camPos: new THREE.Vector3(18, 9, 28),
      camLook: new THREE.Vector3(4, 2.2, 14)
    },
    {
      phase: 1,
      id: 'red',
      code: 'ACHIEVEMENT 02 // 2022',
      color: '#ef4444',
      colorHex: 0xef4444,
      side: 'right',
      title: 'Junior Game Developer Certification — WhiteHat Jr.',
      subtitle: 'Early JavaScript Programming, Version Control & Game Physics',
      summary: 'In 2022, I hold a Junior Game Developer certification from WhiteHat Jr., where I built simple games like Football, T-Rex, and Ping Pong. This helped me learn basic JavaScript, and version control with Git and GitHub, along with simple game mechanics like a catapult, inspired by games like Angry Birds.',
      status: 'CERTIFIED DEVELOPER',
      statusClass: 'active',
      progress: 100,
      timeline: '2022 Certification',
      curveT: 0.42,
      badgeOffset: new THREE.Vector3(14, 3.8, -2),
      deliverables: [
        { text: 'Earned Junior Game Developer Certification from WhiteHat Jr.', done: true },
        { text: 'Engineered playable games: Football, T-Rex Runner, and Ping Pong', done: true },
        { text: 'Implemented catapult trajectory and collision mechanics (Angry Birds inspired)', done: true },
        { text: 'Mastered core version control workflows using Git and GitHub repository hosting', done: true }
      ],
      metrics: [
        { label: 'CERTIFICATE', val: 'WHITEHAT JR.' },
        { label: 'LANGUAGES', val: 'JAVASCRIPT' },
        { label: 'TOOLS', val: 'GIT & GITHUB' }
      ],
      camPos: new THREE.Vector3(22, 10, 8),
      camLook: new THREE.Vector3(6, 3, -6)
    },
    {
      phase: 2,
      id: 'blue',
      code: 'ACHIEVEMENT 03 // 2025',
      color: '#0ea5e9',
      colorHex: 0x0ea5e9,
      side: 'left',
      title: 'Johns Hopkins University Hackathon — "Swasthyam"',
      subtitle: 'Digital Healthcare Solutions for Women and Children',
      summary: 'In 2025, I participated in a hackathon organized by Johns Hopkins University, where my team developed Swasthyam, focused on digital solutions for women\'s and children\'s healthcare.',
      status: 'GLOBAL HACKATHON',
      statusClass: 'in-dev',
      progress: 100,
      timeline: '2025 Hackathon',
      curveT: 0.64,
      badgeOffset: new THREE.Vector3(-14, 3.8, 2),
      deliverables: [
        { text: 'Architected and developed "Swasthyam" for maternal and pediatric healthcare', done: true },
        { text: 'Collaborated in an intensive, multidisciplinary hackathon team sprint', done: true },
        { text: 'Engineered user-centric digital triage and health record tracking flows', done: true },
        { text: 'Showcased before Johns Hopkins University clinical & tech evaluation panels', done: true }
      ],
      metrics: [
        { label: 'ORGANIZATION', val: 'JOHNS HOPKINS' },
        { label: 'PLATFORM', val: 'SWASTHYAM' },
        { label: 'FOCUS', val: 'WOMEN & CHILD' }
      ],
      camPos: new THREE.Vector3(-24, 11, -16),
      camLook: new THREE.Vector3(-10, 4, -30)
    },
    {
      phase: 3,
      id: 'yellow',
      code: 'ACHIEVEMENT 04 // 2025',
      color: '#f59e0b',
      colorHex: 0xf59e0b,
      side: 'right',
      title: '6th Position (Solo Participant) — College DSA League',
      subtitle: 'Algorithmic Problem-Solving in Graphs, Trees & Dynamic Programming',
      summary: 'In 2025, Secured 6th position as a solo participant in my college\'s DSA League, with a focus on problem-solving and core topics such as graphs, trees, and dynamic programming.',
      status: '6TH RANK SOLO',
      statusClass: 'planned',
      progress: 100,
      timeline: '2025 DSA League',
      curveT: 0.84,
      badgeOffset: new THREE.Vector3(14, 4.2, -2),
      deliverables: [
        { text: 'Competed as a solo contender against university-wide engineering participants', done: true },
        { text: 'Solved complex algorithmic challenges in Graphs (BFS, DFS, shortest paths)', done: true },
        { text: 'Demonstrated mastery in Tree traversals and Dynamic Programming states', done: true },
        { text: 'Ranked in the top 6 solo finishers for algorithmic speed and precision', done: true }
      ],
      metrics: [
        { label: 'RANK', val: '6TH PLACE (SOLO)' },
        { label: 'CORE DSA', val: 'GRAPHS, TREES, DP' },
        { label: 'EVENT', val: 'COLLEGE DSA LEAGUE' }
      ],
      camPos: new THREE.Vector3(18, 12, -44),
      camLook: new THREE.Vector3(4, 5.5, -66)
    }
  ];

  class JupiterRoadmap3D {
    constructor(container, canvas, audio) {
      this.container = container;
      this.canvas = canvas;
      this.audio = audio;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;

      this.isRunning = false;
      this.animFrameId = null;

      // Camera views
      this.overviewCamPos = new THREE.Vector3(-10, 36, 54);
      this.overviewCamLook = new THREE.Vector3(0, 3.5, -18);
      this.camTargetPos = this.overviewCamPos.clone();
      this.camTargetLook = this.overviewCamLook.clone();
      this.isCamTransitioning = false;

      // Auto tour state
      this.isTourRunning = false;
      this.tourProgress = 0;

      // Active state
      this.activeMilestoneIdx = -1;

      // Meshes & animators
      this.radarRipples = [];
      this.milestoneBadges = [];
      this.milestoneRoadPads = [];
      this.stardustPoints = null;

      this.init();
    }

    init() {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;

      // 1. Scene setup
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x050711, 0.0065);

      // 2. Camera setup
      this.camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 2000);
      this.camera.position.copy(this.overviewCamPos);

      // 3. WebGL Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;

      // 4. OrbitControls
      if (window.THREE && THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.minDistance = 12;
        this.controls.maxDistance = 160;
        this.controls.maxPolarAngle = Math.PI * 0.48; // prevent going beneath ground
        this.controls.target.copy(this.overviewCamLook);
      }

      // 5. Build Environment, Lighting & 3D Road
      this.buildLighting();
      this.buildAtmosphere();
      this.buildRoadMesh();
      this.buildMilestones3D();
      this.bindEvents();
    }

    buildLighting() {
      // Ambient celestial glow
      const ambient = new THREE.AmbientLight(0x223048, 0.7);
      this.scene.add(ambient);

      // Main Sun/Key light illuminating road asphalt
      const sunLight = new THREE.DirectionalLight(0xfff6e8, 1.6);
      sunLight.position.set(30, 80, 50);
      this.scene.add(sunLight);

      // Horizon rim light creating glowing horizon atmosphere
      const rimLight = new THREE.DirectionalLight(0xd4a373, 1.2);
      rimLight.position.set(0, 30, -140);
      this.scene.add(rimLight);
    }

    buildAtmosphere() {
      // 1. Stardust particle field drifting around the road
      const count = 1200;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 220;
        pos[i * 3 + 1] = Math.random() * 80 - 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 240 - 20;

        const c = new THREE.Color().setHSL(0.58 + Math.random() * 0.15, 0.7, 0.65 + Math.random() * 0.3);
        col[i * 3 + 0] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 1.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        depthWrite: false
      });
      this.stardustPoints = new THREE.Points(geo, mat);
      this.scene.add(this.stardustPoints);

      // 2. Colossal distant Jupiter planet sphere on horizon
      const jupGeo = new THREE.SphereGeometry(32, 48, 48);
      const jupMat = new THREE.MeshStandardMaterial({
        color: 0xd4a373,
        roughness: 0.75,
        metalness: 0.1,
        emissive: 0x6e4518,
        emissiveIntensity: 0.28
      });
      this.distantJupiter = new THREE.Mesh(jupGeo, jupMat);
      this.distantJupiter.position.set(0, 14, -180);
      this.scene.add(this.distantJupiter);
    }

    createRoadTexture() {
      // High-resolution procedural texture for asphalt and markings
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // 1. Asphalt dark tarmac base
      ctx.fillStyle = '#161922';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Procedural asphalt aggregate noise
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 18;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      // 3. Crisp solid white curb edge stripes
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 4;
      // Left border line
      ctx.fillRect(40, 0, 24, canvas.height);
      // Right border line
      ctx.fillRect(canvas.width - 64, 0, 24, canvas.height);

      // 4. Crisp dashed center divider line (repeats vertically)
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f8fafc';
      const dashHeight = canvas.height * 0.48;
      ctx.fillRect(canvas.width * 0.5 - 12, 0, 24, dashHeight);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 26);
      return texture;
    }

    buildRoadMesh() {
      // Spline curve points matching reference image's winding S-curve
      const curvePoints = [
        new THREE.Vector3(-24, 0.4, 42),   // foreground entrance
        new THREE.Vector3(-14, 0.9, 28),
        new THREE.Vector3(  8, 1.5, 16),   // curve right (Milestone 1 Green)
        new THREE.Vector3( 18, 2.0,  2),   // right apex
        new THREE.Vector3(  6, 2.5, -12),  // curve back left (Milestone 2 Coral Red)
        new THREE.Vector3(-12, 3.1, -24),  // curve left (Milestone 3 Blue)
        new THREE.Vector3(-17, 3.6, -38),  // left apex
        new THREE.Vector3( -3, 4.2, -52),  // curve back right
        new THREE.Vector3( 12, 4.8, -66),  // upper right apex (Milestone 4 Yellow)
        new THREE.Vector3(  4, 5.3, -84),  // curving towards vanishing point
        new THREE.Vector3( -4, 5.7, -104)  // vanishing toward horizon
      ];
      this.roadCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5);

      // Generate volumetric 3D road mesh
      const slices = 220;
      const roadWidth = 6.6;
      const curbDepth = 0.45;

      const positions = [];
      const normals = [];
      const uvs = [];
      const indices = [];

      const leftRailPoints = [];
      const rightRailPoints = [];

      for (let i = 0; i <= slices; i++) {
        const t = i / slices;
        const P = this.roadCurve.getPointAt(t);
        const T = this.roadCurve.getTangentAt(t);
        const up = new THREE.Vector3(0, 1, 0);
        const B = new THREE.Vector3().crossVectors(T, up).normalize();

        // 4 vertices per cross section:
        // 0: Left Curb Bottom
        // 1: Left Deck Edge
        // 2: Right Deck Edge
        // 3: Right Curb Bottom
        const p1 = P.clone().sub(B.clone().multiplyScalar(roadWidth * 0.5));
        const p2 = P.clone().add(B.clone().multiplyScalar(roadWidth * 0.5));
        const p0 = p1.clone().sub(new THREE.Vector3(0, curbDepth, 0));
        const p3 = p2.clone().sub(new THREE.Vector3(0, curbDepth, 0));

        positions.push(
          p0.x, p0.y, p0.z,
          p1.x, p1.y, p1.z,
          p2.x, p2.y, p2.z,
          p3.x, p3.y, p3.z
        );

        // Normals: deck points up, curbs point sideways
        normals.push(
          -B.x, 0, -B.z,
          0, 1, 0,
          0, 1, 0,
          B.x, 0, B.z
        );

        // UVs: mapping across road width and along curve
        const v = t;
        uvs.push(
          0.0, v,
          0.04, v,
          0.96, v,
          1.0, v
        );

        // Track rail points for 3D glowing side tubes
        leftRailPoints.push(p1.clone().add(new THREE.Vector3(0, 0.08, 0)));
        rightRailPoints.push(p2.clone().add(new THREE.Vector3(0, 0.08, 0)));

        if (i < slices) {
          const row1 = i * 4;
          const row2 = (i + 1) * 4;

          // Left Curb Quad
          indices.push(row1 + 0, row2 + 0, row1 + 1);
          indices.push(row2 + 0, row2 + 1, row1 + 1);

          // Top Road Deck Quad
          indices.push(row1 + 1, row2 + 1, row1 + 2);
          indices.push(row2 + 1, row2 + 2, row1 + 2);

          // Right Curb Quad
          indices.push(row1 + 2, row2 + 2, row1 + 3);
          indices.push(row2 + 2, row2 + 3, row1 + 3);
        }
      }

      const roadGeo = new THREE.BufferGeometry();
      roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      roadGeo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      roadGeo.setIndex(indices);

      const roadMat = new THREE.MeshStandardMaterial({
        map: this.createRoadTexture(),
        roughness: 0.85,
        metalness: 0.12,
        side: THREE.DoubleSide
      });

      this.roadMesh = new THREE.Mesh(roadGeo, roadMat);
      this.scene.add(this.roadMesh);

      // Glowing edge neon light tubes framing the road
      const leftRailCurve = new THREE.CatmullRomCurve3(leftRailPoints);
      const rightRailCurve = new THREE.CatmullRomCurve3(rightRailPoints);

      const railGeoL = new THREE.TubeGeometry(leftRailCurve, 180, 0.07, 8, false);
      const railGeoR = new THREE.TubeGeometry(rightRailCurve, 180, 0.07, 8, false);
      const railMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      this.scene.add(new THREE.Mesh(railGeoL, railMat));
      this.scene.add(new THREE.Mesh(railGeoR, railMat));
    }

    buildMilestones3D() {
      JUPITER_MILESTONES.forEach((m, idx) => {
        const roadP = this.roadCurve.getPointAt(m.curveT);
        const floatP = roadP.clone().add(m.badgeOffset);

        // 1. Waypoint Ground Pad on the Road Surface
        const padGroup = new THREE.Group();
        padGroup.position.copy(roadP);
        padGroup.position.y += 0.04;

        // Base metallic ring
        const baseRing = new THREE.Mesh(
          new THREE.CylinderGeometry(0.85, 0.85, 0.08, 32),
          new THREE.MeshStandardMaterial({ color: 0x1e2430, roughness: 0.4, metalness: 0.8 })
        );
        padGroup.add(baseRing);

        // Colored core disk
        const coreDisk = new THREE.Mesh(
          new THREE.CircleGeometry(0.65, 32),
          new THREE.MeshBasicMaterial({ color: m.colorHex, side: THREE.DoubleSide })
        );
        coreDisk.rotation.x = -Math.PI * 0.5;
        coreDisk.position.y = 0.05;
        padGroup.add(coreDisk);

        // 3 Concentric Animated Radar Ripple Rings
        const ripples = [];
        for (let r = 0; r < 2; r++) {
          const ringGeo = new THREE.RingGeometry(0.65, 0.85, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: m.colorHex,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
          });
          const rippleMesh = new THREE.Mesh(ringGeo, ringMat);
          rippleMesh.rotation.x = -Math.PI * 0.5;
          rippleMesh.position.y = 0.06;
          padGroup.add(rippleMesh);
          ripples.push({ mesh: rippleMesh, phase: r * 0.5 });
        }
        this.radarRipples.push(...ripples);

        this.scene.add(padGroup);
        this.milestoneRoadPads.push(padGroup);

        // 2. 3D Floating Beacon Gem / Diamond
        const beaconGroup = new THREE.Group();
        beaconGroup.position.copy(floatP);

        // Rotating faceted crystal
        const gemGeo = new THREE.OctahedronGeometry(0.85, 0);
        const gemMat = new THREE.MeshStandardMaterial({
          color: m.colorHex,
          emissive: m.colorHex,
          emissiveIntensity: 0.45,
          roughness: 0.2,
          metalness: 0.8
        });
        const gemMesh = new THREE.Mesh(gemGeo, gemMat);
        beaconGroup.add(gemMesh);

        // Outer spinning orbital ring
        const orbitRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.3, 0.04, 8, 32),
          new THREE.MeshBasicMaterial({ color: m.colorHex, transparent: true, opacity: 0.65 })
        );
        orbitRing.rotation.x = Math.PI * 0.4;
        beaconGroup.add(orbitRing);

        // PointLight casting colored illumination on road
        const pLight = new THREE.PointLight(m.colorHex, 2.2, 28);
        pLight.position.set(0, 0, 0);
        beaconGroup.add(pLight);

        this.scene.add(beaconGroup);
        this.milestoneBadges.push({ group: beaconGroup, gem: gemMesh, ring: orbitRing });

        // 3. 3D Dashed Connector Line in Three.js space
        const lineGeo = new THREE.BufferGeometry().setFromPoints([roadP, floatP]);
        const lineMat = new THREE.LineDashedMaterial({
          color: m.colorHex,
          dashSize: 0.7,
          gapSize: 0.45,
          linewidth: 2
        });
        const line = new THREE.Line(lineGeo, lineMat);
        line.computeLineDistances();
        this.scene.add(line);
      });
    }

    bindEvents() {
      // Window resize
      window.addEventListener('resize', this.onResize.bind(this));

      // HTML Milestone Cards click handlers
      JUPITER_MILESTONES.forEach((m, idx) => {
        const card = document.getElementById(`card-milestone-${idx}`);
        if (card) {
          card.addEventListener('click', (e) => {
            e.stopPropagation();
            this.focusMilestone(idx);
          });
          card.addEventListener('mouseenter', () => {
            if (this.audio) this.audio.playSelectBlip();
          });
        }
      });

      // Bottom Dock buttons
      const dockBtns = document.querySelectorAll('.jupiter-bottom-dock .road-dock-btn');
      dockBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-camera-view');
          if (view === 'overview') {
            this.resetToOverview();
          } else {
            const idx = parseInt(view, 10);
            if (!isNaN(idx)) this.focusMilestone(idx);
          }
        });
      });

      // Flythrough Tour button
      const btnTour = document.getElementById('btnJupiterAutoTour');
      if (btnTour) {
        btnTour.addEventListener('click', () => {
          this.toggleTour();
        });
      }

      // Detail Drawer buttons
      const btnCloseDrawer = document.getElementById('btnCloseMilestoneDrawer');
      if (btnCloseDrawer) {
        btnCloseDrawer.addEventListener('click', () => {
          this.closeDrawer();
        });
      }

      const btnResetDrawer = document.getElementById('btnResetOverviewFromDrawer');
      if (btnResetDrawer) {
        btnResetDrawer.addEventListener('click', () => {
          this.resetToOverview();
        });
      }

      const btnPrev = document.getElementById('btnPrevMilestone');
      if (btnPrev) {
        btnPrev.addEventListener('click', () => {
          const prevIdx = (this.activeMilestoneIdx - 1 + JUPITER_MILESTONES.length) % JUPITER_MILESTONES.length;
          this.focusMilestone(prevIdx);
        });
      }

      const btnNext = document.getElementById('btnNextMilestone');
      if (btnNext) {
        btnNext.addEventListener('click', () => {
          const nextIdx = (this.activeMilestoneIdx + 1) % JUPITER_MILESTONES.length;
          this.focusMilestone(nextIdx);
        });
      }
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    focusMilestone(index) {
      if (index < 0 || index >= JUPITER_MILESTONES.length) return;
      this.activeMilestoneIdx = index;
      const m = JUPITER_MILESTONES[index];

      // Smooth camera fly-to
      this.camTargetPos.copy(m.camPos);
      this.camTargetLook.copy(m.camLook);
      this.isCamTransitioning = true;
      this.isTourRunning = false;

      // Update bottom dock active pill
      document.querySelectorAll('.jupiter-bottom-dock .road-dock-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-camera-view') === String(index));
      });

      // Update Tour button text
      const btnTour = document.getElementById('btnJupiterAutoTour');
      if (btnTour) btnTour.querySelector('.tour-text').textContent = 'Flythrough Tour';

      // Open and populate detail drawer
      this.populateDrawer(m);

      if (this.audio) this.audio.playScanTelemetry();
    }

    resetToOverview() {
      this.activeMilestoneIdx = -1;
      this.camTargetPos.copy(this.overviewCamPos);
      this.camTargetLook.copy(this.overviewCamLook);
      this.isCamTransitioning = true;
      this.isTourRunning = false;

      // Update dock
      document.querySelectorAll('.jupiter-bottom-dock .road-dock-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.getAttribute('data-camera-view') === 'overview');
      });

      // Close drawer
      this.closeDrawer();

      // Update Tour button text
      const btnTour = document.getElementById('btnJupiterAutoTour');
      if (btnTour) btnTour.querySelector('.tour-text').textContent = 'Flythrough Tour';

      if (this.audio) this.audio.playSelectBlip();
    }

    populateDrawer(m) {
      const drawer = document.getElementById('milestoneDetailDrawer');
      if (!drawer) return;

      document.getElementById('drawerPhaseBadge').textContent = m.code;
      const statusBadge = document.getElementById('drawerStatusBadge');
      statusBadge.textContent = m.status;
      statusBadge.className = `drawer-status-badge ${m.statusClass}`;

      document.getElementById('drawerTitle').textContent = m.title;
      document.getElementById('drawerDesc').textContent = m.summary;

      // Deliverables list
      const delList = document.getElementById('drawerDeliverablesList');
      delList.innerHTML = '';
      m.deliverables.forEach(d => {
        const li = document.createElement('li');
        li.className = d.done ? 'is-done' : '';
        li.innerHTML = `
          <span class="check-icon ${d.done ? 'done' : 'pending'}">${d.done ? '✓' : '○'}</span>
          <span>${d.text}</span>
        `;
        delList.appendChild(li);
      });

      // Metrics grid
      const metGrid = document.getElementById('drawerMetricsGrid');
      metGrid.innerHTML = '';
      m.metrics.forEach(met => {
        const div = document.createElement('div');
        div.className = 'drawer-metric-card';
        div.innerHTML = `
          <span class="metric-label">${met.label}</span>
          <span class="metric-val">${met.val}</span>
        `;
        metGrid.appendChild(div);
      });

      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
    }

    closeDrawer() {
      const drawer = document.getElementById('milestoneDetailDrawer');
      if (drawer) {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
      }
    }

    toggleTour() {
      this.isTourRunning = !this.isTourRunning;
      const btnTour = document.getElementById('btnJupiterAutoTour');
      if (btnTour) {
        btnTour.querySelector('.tour-text').textContent = this.isTourRunning ? 'Pause Tour' : 'Flythrough Tour';
      }
      if (this.isTourRunning) {
        this.tourProgress = 0;
        this.closeDrawer();
        if (this.audio) this.audio.playScanTelemetry();
      }
    }

    updateOverlayPositions() {
      const w = this.canvas.clientWidth || window.innerWidth;
      const h = this.canvas.clientHeight || window.innerHeight;

      JUPITER_MILESTONES.forEach((m, idx) => {
        const badgeObj = this.milestoneBadges[idx];
        const roadPad = this.milestoneRoadPads[idx];
        if (!badgeObj || !roadPad) return;

        // Project badge and road positions into 2D screen coordinates
        const projectedBadge = badgeObj.group.position.clone().project(this.camera);
        const projectedRoad = roadPad.position.clone().project(this.camera);

        const card = document.getElementById(`card-milestone-${idx}`);
        const svgGroup = document.getElementById(`svgGroup-${idx}`);
        const svgLine = document.getElementById(`svgLine-${idx}`);
        const svgDot = document.getElementById(`svgDot-${idx}`);

        // Only show if in front of camera
        if (projectedBadge.z < 1 && projectedRoad.z < 1) {
          const bx = (projectedBadge.x * 0.5 + 0.5) * w;
          const by = (-projectedBadge.y * 0.5 + 0.5) * h;
          const rx = (projectedRoad.x * 0.5 + 0.5) * w;
          const ry = (-projectedRoad.y * 0.5 + 0.5) * h;

          // Position HTML card
          if (card) {
            const cardOffsetX = m.side === 'left' ? -310 : 20;
            const cardOffsetY = -42;
            const finalX = Math.round(bx + cardOffsetX);
            const finalY = Math.round(by + cardOffsetY);

            card.style.setProperty('--tx', `${finalX}px`);
            card.style.setProperty('--ty', `${finalY}px`);
            card.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
          }

          // Update SVG dashed line
          if (svgGroup && svgLine && svgDot) {
            svgLine.setAttribute('x1', rx);
            svgLine.setAttribute('y1', ry);
            svgLine.setAttribute('x2', bx);
            svgLine.setAttribute('y2', by);

            svgDot.setAttribute('cx', rx);
            svgDot.setAttribute('cy', ry);
            svgGroup.style.display = 'block';
          }
        } else {
          if (card) {
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
          }
          if (svgGroup) {
            svgGroup.style.display = 'none';
          }
        }
      });
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.onResize();
      this.resetToOverview();
      this.animate();
    }

    stop() {
      this.isRunning = false;
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    }

    animate() {
      if (!this.isRunning) return;
      this.animFrameId = requestAnimationFrame(this.animate.bind(this));

      const time = performance.now() * 0.001;

      // 1. Radar ripple animation on road waypoint pads
      this.radarRipples.forEach(r => {
        const progress = ((time * 0.8) + r.phase) % 1.0;
        const scale = 1.0 + progress * 1.6;
        r.mesh.scale.set(scale, scale, scale);
        r.mesh.material.opacity = (1.0 - progress) * 0.7;
      });

      // 2. Milestone floating gems spin & bob
      this.milestoneBadges.forEach((b, i) => {
        b.gem.rotation.y = time * 0.9 + i;
        b.gem.rotation.x = Math.sin(time * 0.7 + i) * 0.15;
        b.ring.rotation.z = time * 0.6 + i;
        b.group.position.y += Math.sin(time * 2.0 + i) * 0.003;
      });

      // 3. Stardust gentle rotation
      if (this.stardustPoints) {
        this.stardustPoints.rotation.y = time * 0.015;
      }
      if (this.distantJupiter) {
        this.distantJupiter.rotation.y = time * 0.02;
      }

      // 4. Camera transition / Auto-tour
      if (this.isTourRunning) {
        this.tourProgress += 0.0012;
        if (this.tourProgress >= 1.0) {
          this.tourProgress = 0;
          this.resetToOverview();
        } else {
          const p = this.roadCurve.getPointAt(this.tourProgress);
          const t = this.roadCurve.getTangentAt(this.tourProgress);
          this.camera.position.set(p.x - t.x * 5, p.y + 2.8, p.z - t.z * 5);
          const lookAhead = p.clone().add(t.clone().multiplyScalar(12)).add(new THREE.Vector3(0, 1.2, 0));
          this.controls.target.copy(lookAhead);
        }
      } else if (this.isCamTransitioning) {
        this.camera.position.lerp(this.camTargetPos, 0.065);
        if (this.controls) {
          this.controls.target.lerp(this.camTargetLook, 0.065);
        }
        if (this.camera.position.distanceTo(this.camTargetPos) < 0.25) {
          this.isCamTransitioning = false;
        }
      }

      if (this.controls) {
        this.controls.update();
      }

      // 5. Update HTML/SVG screen projection
      this.updateOverlayPositions();

      // 6. Render
      this.renderer.render(this.scene, this.camera);
    }
  }

  // =========================================================================
  // URANUS CINEMATIC 3D INTERACTIVE LAPTOP & FLOATING RESUME EXPERIENCE
  // =========================================================================
  class UranusLaptop3D {
    constructor(container, canvas, audio) {
      this.container = container;
      this.canvas = canvas;
      this.audio = audio;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.animId = null;

      // 3D Model Hierarchy
      this.laptopRoot = null;
      this.baseChassis = null;
      this.lidGroup = null;
      this.screenMesh = null;
      this.floatingCardMesh = null;
      this.keyboardMesh = null;
      this.trackpadMesh = null;

      // Raycaster for interactive click on screen
      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();

      // Kinematic states
      // 0 rad = lid closed flat on keyboard; -1.95 rad (~-112 deg) = standard open viewing angle
      this.CLOSED_ANGLE = 0.0;
      this.OPEN_ANGLE = -1.95;

      this.currentLidAngle = this.CLOSED_ANGLE;
      this.targetLidAngle = this.CLOSED_ANGLE;

      this.currentRotY = -0.52; // Initial cinematic perspective rotation
      this.targetRotY = -0.52;

      this.cardProgress = 0.0; // 0 = docked inside screen, 1 = floating in front
      this.targetCardProgress = 0.0;

      // Animation flags & timing
      this.isRunning = false;
      this.animStartTime = 0;
      this.isSequenceActive = false;
      this.isCardPopped = false;
      this.autoDockTimer = null;
      this.hasCompletedIntro = false;

      // Camera preset targets
      this.camTargetPos = new THREE.Vector3(0, 4.4, 14.6);
      this.camTargetLook = new THREE.Vector3(0, 1.8, 0);
      this.isLerpingCamera = false;

      this.initScene();
      this.buildLaptop();
      this.bindInteractions();
    }

    initScene() {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;

      // 1. Scene
      this.scene = new THREE.Scene();

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      this.camera.position.copy(this.camTargetPos);

      // 3. Renderer with high aesthetic quality & antialiasing
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      if (this.renderer.outputEncoding !== undefined) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }

      // 4. Orbit Controls
      if (typeof THREE.OrbitControls === 'function') {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.target.copy(this.camTargetLook);
        this.controls.minDistance = 6.0;
        this.controls.maxDistance = 26.0;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.12;
      }

      // 5. Lighting Setup for Sleek Metallic Reflections
      const ambientLight = new THREE.AmbientLight(0xdff4f9, 0.95);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
      keyLight.position.set(12, 22, 16);
      this.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.85);
      fillLight.position.set(-16, 10, -10);
      this.scene.add(fillLight);

      const bottomRimLight = new THREE.DirectionalLight(0x0ea5e9, 0.65);
      bottomRimLight.position.set(0, -12, 10);
      this.scene.add(bottomRimLight);

      // Soft point light right above keyboard for warm backlight bounce
      const kbPointLight = new THREE.PointLight(0xd8f8ff, 0.9, 14);
      kbPointLight.position.set(0, 2.5, 0);
      this.scene.add(kbPointLight);

      // Handle window resize
      this.onResize = () => {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth || window.innerWidth;
        const h = this.container.clientHeight || window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      };
      window.addEventListener('resize', this.onResize);
    }

    buildLaptop() {
      this.laptopRoot = new THREE.Group();
      this.laptopRoot.position.set(0, -1.2, 0);
      this.laptopRoot.rotation.y = this.currentRotY;
      this.scene.add(this.laptopRoot);

      // Sleek Anodized Aluminum / Titanium Material (Space Gray)
      const chassisMaterial = new THREE.MeshStandardMaterial({
        color: 0x181c25,
        metalness: 0.85,
        roughness: 0.28
      });

      // =====================================================================
      // 1. BASE CHASSIS (Bottom Half)
      // =====================================================================
      // Dimensions: width 13.2, thickness 0.44, depth 9.4. Hinge at z = -4.7
      const baseGeo = new THREE.BoxGeometry(13.2, 0.44, 9.4, 2, 2, 2);
      this.baseChassis = new THREE.Mesh(baseGeo, chassisMaterial);
      this.baseChassis.position.set(0, 0.22, 0);
      this.laptopRoot.add(this.baseChassis);

      // Bottom rubber feet
      const footGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.08, 16);
      const footMat = new THREE.MeshBasicMaterial({ color: 0x080a0f });
      [
        [-5.8, -4.0], [5.8, -4.0],
        [-5.8, 4.0], [5.8, 4.0]
      ].forEach(([fx, fz]) => {
        const foot = new THREE.Mesh(footGeo, footMat);
        foot.position.set(fx, 0.02, fz);
        this.laptopRoot.add(foot);
      });

      // Front thumb opening notch
      const notchGeo = new THREE.BoxGeometry(2.4, 0.16, 0.2);
      const notchMat = new THREE.MeshStandardMaterial({ color: 0x0b0d12, roughness: 0.4 });
      const notch = new THREE.Mesh(notchGeo, notchMat);
      notch.position.set(0, 0.38, 4.65);
      this.laptopRoot.add(notch);

      // =====================================================================
      // 2. TRACKPAD
      // =====================================================================
      const trackpadGeo = new THREE.PlaneGeometry(4.8, 3.2);
      trackpadGeo.rotateX(-Math.PI / 2);
      const trackpadMat = new THREE.MeshStandardMaterial({
        color: 0x242a38,
        metalness: 0.5,
        roughness: 0.22
      });
      this.trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
      this.trackpadMesh.position.set(0, 0.445, 2.3);
      this.laptopRoot.add(this.trackpadMesh);

      // Subtle trackpad border line
      const trackpadBorderGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.4, 0.446, 0.7),
        new THREE.Vector3(2.4, 0.446, 0.7),
        new THREE.Vector3(2.4, 0.446, 3.9),
        new THREE.Vector3(-2.4, 0.446, 3.9),
        new THREE.Vector3(-2.4, 0.446, 0.7)
      ]);
      const trackpadBorderMat = new THREE.LineBasicMaterial({
        color: 0x3d475c,
        transparent: true,
        opacity: 0.65
      });
      const trackpadBorder = new THREE.Line(trackpadBorderGeo, trackpadBorderMat);
      this.laptopRoot.add(trackpadBorder);

      // =====================================================================
      // 3. ILLUMINATED BACKLIT KEYBOARD (Matching Reference Photo!)
      // =====================================================================
      // Recessed dark well
      const wellGeo = new THREE.BoxGeometry(11.6, 0.04, 4.8);
      const wellMat = new THREE.MeshStandardMaterial({
        color: 0x0a0d13,
        roughness: 0.6,
        metalness: 0.4
      });
      const wellMesh = new THREE.Mesh(wellGeo, wellMat);
      wellMesh.position.set(0, 0.435, -1.8);
      this.laptopRoot.add(wellMesh);

      // Backlit Keyboard Canvas Texture
      const keyboardTexture = this.createKeyboardTexture();
      const keyboardGeo = new THREE.PlaneGeometry(11.4, 4.6);
      keyboardGeo.rotateX(-Math.PI / 2);

      const keyboardMat = new THREE.MeshStandardMaterial({
        map: keyboardTexture,
        emissiveMap: keyboardTexture,
        emissive: 0xffffff,
        emissiveIntensity: 0.95,
        roughness: 0.25,
        metalness: 0.2
      });

      this.keyMesh = new THREE.Mesh(keyboardGeo, keyboardMat);
      this.keyMesh.position.set(0, 0.456, -1.8);
      this.laptopRoot.add(this.keyMesh);

      // =====================================================================
      // 4. SCREEN LID & HINGE PIVOT (Opens $0 \rightarrow 105^\circ$)
      // =====================================================================
      // Hinge pivot placed at top rear edge of chassis: (0, 0.44, -4.7)
      this.lidGroup = new THREE.Group();
      this.lidGroup.position.set(0, 0.44, -4.7);
      this.lidGroup.rotation.x = this.currentLidAngle; // Closed at start
      this.laptopRoot.add(this.lidGroup);

      // Hinge cylinder
      const hingeGeo = new THREE.CylinderGeometry(0.24, 0.24, 11.4, 32);
      hingeGeo.rotateZ(Math.PI / 2);
      const hingeMat = new THREE.MeshStandardMaterial({
        color: 0x0f131a,
        metalness: 0.9,
        roughness: 0.2
      });
      const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
      hingeMesh.position.set(0, 0, 0);
      this.lidGroup.add(hingeMesh);

      // Lid outer back shell
      // When closed, lid extends along +Z from 0 to 9.4, at y = 0.16 relative to hinge pivot
      const lidBackGeo = new THREE.BoxGeometry(13.2, 0.32, 9.4, 2, 2, 2);
      const lidBackMesh = new THREE.Mesh(lidBackGeo, chassisMaterial);
      lidBackMesh.position.set(0, 0.16, 4.7);
      this.lidGroup.add(lidBackMesh);

      // Outer lid Lumora Star emblem on the back cover
      const logoGeo = new THREE.RingGeometry(0.25, 0.65, 32);
      logoGeo.rotateX(Math.PI / 2);
      const logoMat = new THREE.MeshBasicMaterial({
        color: 0x8be5e5,
        side: THREE.DoubleSide
      });
      const logoMesh = new THREE.Mesh(logoGeo, logoMat);
      logoMesh.position.set(0, 0.325, 4.7);
      this.lidGroup.add(logoMesh);

      // Inner screen bezel
      const bezelGeo = new THREE.PlaneGeometry(12.8, 8.8);
      bezelGeo.rotateX(Math.PI / 2); // Faces downwards (-Y) inside lid
      const bezelMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
      const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
      bezelMesh.position.set(0, -0.005, 4.7);
      this.lidGroup.add(bezelMesh);

      // Web camera dot on top bezel
      const camDotGeo = new THREE.CircleGeometry(0.06, 16);
      camDotGeo.rotateX(Math.PI / 2);
      const camDotMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
      const camDot = new THREE.Mesh(camDotGeo, camDotMat);
      camDot.position.set(0, -0.006, 8.8);
      this.lidGroup.add(camDot);

      // =====================================================================
      // 5. HIGH-RESOLUTION DISPLAY (Developer IDE & Resume Screen)
      // =====================================================================
      const screenTexture = this.createScreenTexture();
      const screenGeo = new THREE.PlaneGeometry(12.2, 7.8);
      screenGeo.rotateX(Math.PI / 2); // Faces downwards towards keyboard when closed, faces viewer when open!

      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTexture,
        emissiveMap: screenTexture,
        emissive: 0xffffff,
        emissiveIntensity: 0.95,
        roughness: 0.18,
        metalness: 0.1
      });

      this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
      this.screenMesh.position.set(0, -0.01, 4.7);
      this.screenMesh.name = 'laptopScreenMesh';
      this.lidGroup.add(this.screenMesh);

      // =====================================================================
      // 6. 3D FLOATING RESUME CARD (Pops out from screen in 3D!)
      // =====================================================================
      const cardGeo = new THREE.PlaneGeometry(8.6, 5.6);
      cardGeo.rotateX(Math.PI / 2);

      const cardTexture = this.createFloatingCardTexture();
      const cardMat = new THREE.MeshStandardMaterial({
        map: cardTexture,
        emissiveMap: cardTexture,
        emissive: 0xffffff,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.96,
        roughness: 0.2,
        side: THREE.DoubleSide
      });

      this.floatingCardMesh = new THREE.Mesh(cardGeo, cardMat);
      this.floatingCardMesh.position.set(0, -0.02, 4.7);
      this.floatingCardMesh.scale.set(0.001, 0.001, 0.001);
      this.floatingCardMesh.visible = false;
      this.floatingCardMesh.name = 'floatingResumeCard';
      this.lidGroup.add(this.floatingCardMesh);
    }

    createKeyboardTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 920;
      const ctx = canvas.getContext('2d');

      // 1. Dark matte chassis background
      ctx.fillStyle = '#10141d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Speaker grilles on left and right flanks
      ctx.fillStyle = '#080a0f';
      const drawSpeakerGrille = (startX, endX) => {
        for (let x = startX; x < endX; x += 10) {
          for (let y = 80; y < 840; y += 10) {
            ctx.beginPath();
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };
      drawSpeakerGrille(25, 125);
      drawSpeakerGrille(canvas.width - 125, canvas.width - 25);

      // 3. Recessed keyboard well
      const wellX = 140;
      const wellY = 30;
      const wellW = canvas.width - 280;
      const wellH = canvas.height - 60;
      const r = 24;

      ctx.fillStyle = '#080a10';
      ctx.beginPath();
      ctx.roundRect(wellX, wellY, wellW, wellH, r);
      ctx.fill();

      // 4. Chiclet Keys Layout (6 Rows)
      const rows = [
        // Row 0: Function Keys
        [
          { label: 'esc', w: 1.2 }, { label: 'F1', w: 1 }, { label: 'F2', w: 1 }, { label: 'F3', w: 1 },
          { label: 'F4', w: 1 }, { label: 'F5', w: 1 }, { label: 'F6', w: 1 }, { label: 'F7', w: 1 },
          { label: 'F8', w: 1 }, { label: 'F9', w: 1 }, { label: 'F10', w: 1 }, { label: 'F11', w: 1 },
          { label: 'F12', w: 1 }, { label: '⌽', w: 1.15 }
        ],
        // Row 1: Numbers
        [
          { label: '~\n`', w: 1 }, { label: '!\n1', w: 1 }, { label: '@\n2', w: 1 }, { label: '#\n3', w: 1 },
          { label: '$\n4', w: 1 }, { label: '%\n5', w: 1 }, { label: '^\n6', w: 1 }, { label: '&\n7', w: 1 },
          { label: '*\n8', w: 1 }, { label: '(\n9', w: 1 }, { label: ')\n0', w: 1 }, { label: '_\n-', w: 1 },
          { label: '+\n=', w: 1 }, { label: 'delete', w: 1.5 }
        ],
        // Row 2: QWERTY
        [
          { label: 'tab', w: 1.5 }, { label: 'Q', w: 1 }, { label: 'W', w: 1 }, { label: 'E', w: 1 },
          { label: 'R', w: 1 }, { label: 'T', w: 1 }, { label: 'Y', w: 1 }, { label: 'U', w: 1 },
          { label: 'I', w: 1 }, { label: 'O', w: 1 }, { label: 'P', w: 1 }, { label: '{\n[', w: 1 },
          { label: '}\n]', w: 1 }, { label: '|\n\\', w: 1 }
        ],
        // Row 3: Home Row
        [
          { label: 'caps lock', w: 1.8 }, { label: 'A', w: 1 }, { label: 'S', w: 1 }, { label: 'D', w: 1 },
          { label: 'F', w: 1 }, { label: 'G', w: 1 }, { label: 'H', w: 1 }, { label: 'J', w: 1 },
          { label: 'K', w: 1 }, { label: 'L', w: 1 }, { label: ':\n;', w: 1 }, { label: '"\n\'', w: 1 },
          { label: 'return', w: 1.8 }
        ],
        // Row 4: Shift Row
        [
          { label: 'shift', w: 2.3 }, { label: 'Z', w: 1 }, { label: 'X', w: 1 }, { label: 'C', w: 1 },
          { label: 'V', w: 1 }, { label: 'B', w: 1 }, { label: 'N', w: 1 }, { label: 'M', w: 1 },
          { label: '<\n,', w: 1 }, { label: '>\n.', w: 1 }, { label: '?\n/', w: 1 }, { label: 'shift', w: 2.3 }
        ],
        // Row 5: Modifier & Spacebar Row
        [
          { label: 'fn', w: 1.1 }, { label: 'control', w: 1.2 }, { label: 'option', w: 1.2 }, { label: 'command', w: 1.4 },
          { label: '', w: 6.0, isSpace: true }, // Spacebar
          { label: 'command', w: 1.4 }, { label: 'option', w: 1.2 }, { label: '◀', w: 0.9 },
          { label: '▲\n▼', w: 0.9 }, { label: '▶', w: 0.9 }
        ]
      ];

      const marginX = wellX + 24;
      const marginY = wellY + 20;
      const usableW = wellW - 48;
      const gap = 12;
      const numRows = rows.length;
      const rowH = (wellH - 40 - (numRows - 1) * gap) / numRows;

      let spacebarCenterX = 0;
      let spacebarBottomY = 0;

      rows.forEach((row, rIdx) => {
        const totalUnits = row.reduce((acc, k) => acc + k.w, 0);
        const gapsTotal = (row.length - 1) * gap;
        const unitW = (usableW - gapsTotal) / totalUnits;
        const keyY = marginY + rIdx * (rowH + gap);

        let curX = marginX;
        row.forEach(key => {
          const keyW = key.w * unitW;
          const kRadius = 8;

          // 1. BACKLIGHT GLOW (Underneath Keycap)
          // Radiant white/cyan glow bleed matching reference image
          const glowRadius = Math.max(keyW, rowH) * 0.75;
          const glowGrad = ctx.createRadialGradient(
            curX + keyW / 2, keyY + rowH / 2, 2,
            curX + keyW / 2, keyY + rowH / 2, glowRadius
          );
          glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
          glowGrad.addColorStop(0.5, 'rgba(215, 248, 255, 0.4)');
          glowGrad.addColorStop(1, 'rgba(139, 229, 229, 0)');
          ctx.fillStyle = glowGrad;
          ctx.fillRect(curX - 8, keyY - 8, keyW + 16, rowH + 16);

          // 2. KEYCAP BODY
          ctx.fillStyle = '#181b24';
          ctx.beginPath();
          ctx.roundRect(curX, keyY, keyW, rowH, kRadius);
          ctx.fill();

          // Subtle top bevel highlight
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // 3. KEYCAP LEGEND (Crisp White Text)
          if (key.label) {
            ctx.fillStyle = '#f8fafc';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (rIdx === 0) {
              ctx.font = '600 18px "Space Grotesk", sans-serif';
              ctx.fillText(key.label, curX + keyW / 2, keyY + rowH / 2);
            } else if (key.label.includes('\n')) {
              const [top, bot] = key.label.split('\n');
              ctx.font = '700 16px "Space Grotesk", sans-serif';
              ctx.fillText(top, curX + keyW / 2, keyY + rowH * 0.36);
              ctx.font = '600 18px "Space Grotesk", sans-serif';
              ctx.fillText(bot, curX + keyW / 2, keyY + rowH * 0.72);
            } else {
              ctx.font = key.label.length > 3 ? '600 17px "Space Grotesk", sans-serif' : '700 22px "Space Grotesk", sans-serif';
              ctx.fillText(key.label, curX + keyW / 2, keyY + rowH / 2);
            }
          }

          if (key.isSpace) {
            spacebarCenterX = curX + keyW / 2;
            spacebarBottomY = keyY + rowH;
          }

          curX += keyW + gap;
        });
      });

      // 5. Ambient Backlight Glow Pool under Spacebar (Exact match to reference photo!)
      if (spacebarCenterX > 0) {
        const poolGrad = ctx.createRadialGradient(
          spacebarCenterX, spacebarBottomY + 6, 2,
          spacebarCenterX, spacebarBottomY + 24, 180
        );
        poolGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        poolGrad.addColorStop(0.35, 'rgba(215, 248, 255, 0.55)');
        poolGrad.addColorStop(0.7, 'rgba(139, 229, 229, 0.22)');
        poolGrad.addColorStop(1, 'rgba(16, 20, 29, 0)');
        ctx.fillStyle = poolGrad;
        ctx.fillRect(spacebarCenterX - 260, spacebarBottomY, 520, 110);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    }

    createScreenTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1310;
      const ctx = canvas.getContext('2d');

      // 1. Dark IDE Canvas Background
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. macOS Top Window Bar
      ctx.fillStyle = '#0f1422';
      ctx.fillRect(0, 0, canvas.width, 68);

      // Window Control Pills
      const pills = ['#ff5f56', '#ffbd2e', '#27c93f'];
      pills.forEach((c, idx) => {
        ctx.beginPath();
        ctx.arc(42 + idx * 28, 34, 9, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      });

      // Window Title & Breadcrumb
      ctx.font = '600 20px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText('lumora // workspace // TanishkaSahu_Resume.ts — Orbit Studio', canvas.width / 2, 42);

      // 3. Left Sidebar (Project Files & Dossier)
      const sidebarW = 420;
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 68, sidebarW, canvas.height - 68);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sidebarW, 68);
      ctx.lineTo(sidebarW, canvas.height);
      ctx.stroke();

      // Sidebar Header: Candidate Avatar & Status
      ctx.fillStyle = '#141d2e';
      ctx.beginPath();
      ctx.roundRect(28, 96, sidebarW - 56, 120, 16);
      ctx.fill();

      // Avatar Circle "TS"
      const avatarGrad = ctx.createLinearGradient(48, 116, 108, 176);
      avatarGrad.addColorStop(0, '#8be5e5');
      avatarGrad.addColorStop(1, '#0ea5e9');
      ctx.fillStyle = avatarGrad;
      ctx.beginPath();
      ctx.arc(80, 156, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#030712';
      ctx.font = '800 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TS', 80, 164);

      // Candidate Text
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 20px "Space Grotesk", sans-serif';
      ctx.fillText('Tanishka Sahu', 126, 142);

      ctx.fillStyle = '#8be5e5';
      ctx.font = '600 14px "Space Grotesk", sans-serif';
      ctx.fillText('VIT CSE 2022–2026', 126, 166);

      ctx.fillStyle = '#86efac';
      ctx.font = '700 12px "Space Grotesk", sans-serif';
      ctx.fillText('● OPEN TO ROLES', 126, 188);

      // File Tree Items in Sidebar
      const treeItems = [
        { icon: '•', label: 'Overview: Tanishka Sahu' },
        { icon: 'TS', label: 'Resume_Engineering.ts', active: true },
        { icon: 'GL', label: 'Lumora_SolarSystem.webgl' },
        { icon: 'FX', label: 'Shaders & Kinematics' },
        { icon: 'ED', label: 'VIT Academic Honors' },
        { icon: '@', label: 'Get in Touch' }
      ];

      treeItems.forEach((item, idx) => {
        const itemY = 246 + idx * 56;
        if (item.active) {
          ctx.fillStyle = 'rgba(139, 229, 229, 0.16)';
          ctx.beginPath();
          ctx.roundRect(28, itemY - 6, sidebarW - 56, 44, 10);
          ctx.fill();
          ctx.fillStyle = '#8be5e5';
        } else {
          ctx.fillStyle = '#94a3b8';
        }
        ctx.font = '600 17px "Space Grotesk", sans-serif';
        ctx.fillText(`${item.icon}   ${item.label}`, 42, itemY + 22);
      });

      // 4. Main Code Editor Area
      const editorX = sidebarW + 40;
      let editorY = 120;

      // Tab Bar
      ctx.fillStyle = '#101626';
      ctx.beginPath();
      ctx.roundRect(editorX, 82, 340, 44, 8);
      ctx.fill();
      ctx.fillStyle = '#8be5e5';
      ctx.font = '600 17px "Space Grotesk", sans-serif';
      ctx.fillText('TanishkaSahu_Resume.ts  ✕', editorX + 24, 110);

      editorY = 160;

      // Syntax-highlighted resume code
      const codeLines = [
        { num: '01', tokens: [{ text: 'import ', col: '#ff7b72' }, { text: '{ ThreeEngine, WebGLShader, Systems } ', col: '#79c0ff' }, { text: 'from ', col: '#ff7b72' }, { text: "'@lumora/core';", col: '#a5d6ff' }] },
        { num: '02', tokens: [{ text: '// Candidate Profile: Tanishka Sahu (VIT CSE)', col: '#8b949e' }] },
        { num: '03', tokens: [{ text: 'export const ', col: '#ff7b72' }, { text: 'CandidateProfile ', col: '#d2a8ff' }, { text: '= {', col: '#c9d1d9' }] },
        { num: '04', tokens: [{ text: '  name: ', col: '#79c0ff' }, { text: '"Tanishka Sahu"', col: '#a5d6ff' }, { text: ',', col: '#c9d1d9' }] },
        { num: '05', tokens: [{ text: '  institution: ', col: '#79c0ff' }, { text: '"Vellore Institute of Technology (VIT)"', col: '#a5d6ff' }, { text: ',', col: '#c9d1d9' }] },
        { num: '06', tokens: [{ text: '  degree: ', col: '#79c0ff' }, { text: '"B.Tech in Computer Science & Engineering"', col: '#a5d6ff' }, { text: ',', col: '#c9d1d9' }] },
        { num: '07', tokens: [{ text: '  duration: ', col: '#79c0ff' }, { text: '"2022 – 2026"', col: '#a5d6ff' }, { text: ',', col: '#c9d1d9' }] },
        { num: '08', tokens: [{ text: '  coreExpertise: [', col: '#79c0ff' }] },
        { num: '09', tokens: [{ text: '    "Three.js / WebGL", "Interactive 3D UI", "GLSL Shaders",', col: '#a5d6ff' }] },
        { num: '10', tokens: [{ text: '    "React / Next.js", "Spatial Math", "Full-Stack Distributed Systems"', col: '#a5d6ff' }] },
        { num: '11', tokens: [{ text: '  ],', col: '#c9d1d9' }] },
        { num: '12', tokens: [{ text: '  email: ', col: '#79c0ff' }, { text: '"tanishkasahuwork191@gmail.com"', col: '#a5d6ff' }, { text: ',', col: '#c9d1d9' }] },
        { num: '13', tokens: [{ text: '  featuredWork: [', col: '#79c0ff' }] },
        { num: '14', tokens: [{ text: '    "Lumora 3D Interactive Solar System Engine",', col: '#7ee787' }] },
        { num: '15', tokens: [{ text: '    "Kinematic 3D Hardware Simulation with Smooth Card Pop-out",', col: '#7ee787' }] },
        { num: '16', tokens: [{ text: '    "Cadet Skyranger Head-Tracking Audio-Visual Experience"', col: '#7ee787' }] },
        { num: '17', tokens: [{ text: '  ]', col: '#c9d1d9' }] },
        { num: '18', tokens: [{ text: '};', col: '#c9d1d9' }] }
      ];

      codeLines.forEach(line => {
        editorY += 36;
        // Line number
        ctx.fillStyle = '#4b5563';
        ctx.font = '500 17px "Space Grotesk", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(line.num, editorX + 24, editorY);

        // Code tokens
        let tokenX = editorX + 50;
        ctx.textAlign = 'left';
        ctx.font = '500 19px "Space Grotesk", monospace';
        line.tokens.forEach(tok => {
          ctx.fillStyle = tok.col;
          ctx.fillText(tok.text, tokenX, editorY);
          tokenX += ctx.measureText(tok.text).width;
        });
      });

      // 5. High-Impact Floating Interactive Banner at Bottom of Screen
      const bannerX = editorX + 40;
      const bannerY = canvas.height - 180;
      const bannerW = canvas.width - editorX - 120;
      const bannerH = 110;

      // Glowing banner border & gradient
      ctx.fillStyle = 'rgba(14, 25, 42, 0.88)';
      ctx.beginPath();
      ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 20);
      ctx.fill();

      ctx.strokeStyle = '#8be5e5';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Banner Icon
      ctx.font = '40px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#8be5e5';
      ctx.textAlign = 'center';
      ctx.fillText('✦', bannerX + 55, bannerY + 68);

      // Banner Text
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 24px "Space Grotesk", sans-serif';
      ctx.fillText('CLICK ANYWHERE ON SCREEN TO POP OUT FULL RESUME', bannerX + 105, bannerY + 50);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 17px "Space Grotesk", sans-serif';
      ctx.fillText('Smooth 3D kinematic card elevation • Tanishka Sahu (VIT CSE)', bannerX + 105, bannerY + 84);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    }

    createFloatingCardTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1400;
      canvas.height = 920;
      const ctx = canvas.getContext('2d');

      // Glassmorphic Card Background
      ctx.fillStyle = 'rgba(10, 18, 32, 0.94)';
      ctx.beginPath();
      ctx.roundRect(20, 20, canvas.width - 40, canvas.height - 40, 36);
      ctx.fill();

      // Glowing Cyan Border
      ctx.strokeStyle = 'rgba(139, 229, 229, 0.85)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Avatar
      const grad = ctx.createLinearGradient(70, 70, 170, 170);
      grad.addColorStop(0, '#8be5e5');
      grad.addColorStop(1, '#0ea5e9');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(70, 70, 100, 100, 24);
      ctx.fill();

      ctx.fillStyle = '#04101e';
      ctx.font = '800 48px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TS', 120, 138);

      // Name & Title
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 44px "Space Grotesk", sans-serif';
      ctx.fillText('Tanishka Sahu', 200, 115);

      ctx.fillStyle = '#8be5e5';
      ctx.font = '600 24px "Space Grotesk", sans-serif';
      ctx.fillText('Creative 3D Developer & Full-Stack Engineer', 200, 155);

      // Section Dividers & Content
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 20px "Space Grotesk", sans-serif';
      ctx.fillText('Vellore Institute of Technology (VIT) • B.Tech Computer Science (2022–2026)', 70, 225);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(70, 250);
      ctx.lineTo(canvas.width - 70, 250);
      ctx.stroke();

      // Highlights
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 24px "Space Grotesk", sans-serif';
      ctx.fillText('CORE COMPETENCIES & STACK', 70, 295);

      const skills = ['Three.js', 'WebGL', 'GLSL Shaders', 'React / Next.js', 'Distributed Systems', 'UI/UX Engineering'];
      let skX = 70;
      skills.forEach(s => {
        ctx.fillStyle = 'rgba(139, 229, 229, 0.15)';
        const w = ctx.measureText(s).width + 36;
        ctx.beginPath();
        ctx.roundRect(skX, 315, w, 44, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 229, 229, 0.45)';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 18px "Space Grotesk", sans-serif';
        ctx.fillText(s, skX + 18, 343);
        skX += w + 16;
      });

      // Projects
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 24px "Space Grotesk", sans-serif';
      ctx.fillText('FEATURED ENGINEERING HIGHLIGHTS', 70, 415);

      const projs = [
        'Lumora 3D Interactive Solar System & Cinematic Hardware Showcase',
        'Kinematic Hinge & Procedural Backlit Keycap Shaders (WebGL/Three.js)',
        'Full-Stack Spatial Telemetry Visualization & Reactive Web Architecture'
      ];
      projs.forEach((p, idx) => {
        ctx.fillStyle = '#8be5e5';
        ctx.fillText('✦', 70, 460 + idx * 46);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '500 21px "Space Grotesk", sans-serif';
        ctx.fillText(p, 105, 460 + idx * 46);
      });

      // Contact Banner at bottom
      ctx.fillStyle = 'rgba(14, 25, 42, 0.9)';
      ctx.beginPath();
      ctx.roundRect(70, 640, canvas.width - 140, 180, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 26px "Space Grotesk", sans-serif';
      ctx.fillText('Contact: tanishkasahuwork191@gmail.com', 110, 710);

      ctx.fillStyle = '#86efac';
      ctx.font = '600 21px "Space Grotesk", sans-serif';
      ctx.fillText('● Ready for high-impact Creative Technologist & 3D WebGL roles', 110, 760);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      return texture;
    }

    bindInteractions() {
      // 1. Raycast Click on 3D Screen to pop out resume
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects([this.screenMesh, this.floatingCardMesh], true);

        if (intersects.length > 0) {
          if (this.isCardPopped) {
            this.dockResume();
          } else {
            this.popOutResume(true);
          }
        }
      });

      // 2. Header and Dock Pop-out Toggle Buttons
      const btnPopHeader = document.getElementById('btnUranusPopResume');
      if (btnPopHeader) {
        btnPopHeader.addEventListener('click', () => {
          if (this.isCardPopped) {
            this.dockResume();
          } else {
            this.popOutResume(true);
          }
        });
      }

      const btnPopDock = document.getElementById('btnUranusToggleResumeDock');
      if (btnPopDock) {
        btnPopDock.addEventListener('click', () => {
          if (this.isCardPopped) {
            this.dockResume();
          } else {
            this.popOutResume(true);
          }
        });
      }

      // 3. Dock button inside the Floating Card
      const btnDock = document.getElementById('btnDockResume');
      if (btnDock) {
        btnDock.addEventListener('click', () => {
          this.dockResume();
        });
      }

      // 4. Replay Sequence Buttons
      const btnReplayHeader = document.getElementById('btnReopenLaptopSequence');
      if (btnReplayHeader) {
        btnReplayHeader.addEventListener('click', () => {
          this.startSequence();
        });
      }

      const btnReplayDock = document.getElementById('btnUranusReplayAnim');
      if (btnReplayDock) {
        btnReplayDock.addEventListener('click', () => {
          this.startSequence();
        });
      }

      // 5. Camera Preset Views
      const btnFront = document.getElementById('btnUranusViewFront');
      const btnAngle = document.getElementById('btnUranusViewAngle');
      const btnKb = document.getElementById('btnUranusViewKeyboard');

      const setCamActive = (activeBtn) => {
        [btnFront, btnAngle, btnKb].forEach(b => {
          if (b) b.classList.toggle('is-active', b === activeBtn);
        });
      };

      if (btnFront) {
        btnFront.addEventListener('click', () => {
          setCamActive(btnFront);
          this.setCameraPreset(new THREE.Vector3(0, 4.2, 14.2), new THREE.Vector3(0, 1.8, 0));
        });
      }

      if (btnAngle) {
        btnAngle.addEventListener('click', () => {
          setCamActive(btnAngle);
          this.setCameraPreset(new THREE.Vector3(11.2, 8.8, 12.4), new THREE.Vector3(0, 1.2, 0));
        });
      }

      if (btnKb) {
        btnKb.addEventListener('click', () => {
          setCamActive(btnKb);
          // High top-down close up looking at illuminated keyboard, matching reference photo!
          this.setCameraPreset(new THREE.Vector3(0, 9.6, 4.2), new THREE.Vector3(0, 0.4, -1.0));
        });
      }

      // 6. Interactive 3D Parallax Tilt for DOM Floating Card
      const cardEl = document.getElementById('resumeGlassCard');
      const overlayEl = document.getElementById('uranusFloatingResume');
      if (cardEl && overlayEl) {
        overlayEl.addEventListener('pointermove', (e) => {
          if (!this.isCardPopped) return;
          const rect = cardEl.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (rect.width / 2);
          const dy = (e.clientY - cy) / (rect.height / 2);

          const rotX = -dy * 10;
          const rotY = dx * 12;
          const tiltX = dx * 14;
          const tiltY = dy * 14;

          overlayEl.style.setProperty('--rot-x', `${rotX.toFixed(2)}deg`);
          overlayEl.style.setProperty('--rot-y', `${rotY.toFixed(2)}deg`);
          overlayEl.style.setProperty('--tilt-x', `${tiltX.toFixed(1)}px`);
          overlayEl.style.setProperty('--tilt-y', `${tiltY.toFixed(1)}px`);
        });

        overlayEl.addEventListener('pointerleave', () => {
          overlayEl.style.setProperty('--rot-x', '0deg');
          overlayEl.style.setProperty('--rot-y', '0deg');
          overlayEl.style.setProperty('--tilt-x', '0px');
          overlayEl.style.setProperty('--tilt-y', '0px');
        });
      }
    }

    setCameraPreset(pos, lookAt) {
      this.camTargetPos.copy(pos);
      this.camTargetLook.copy(lookAt);
      this.isLerpingCamera = true;
      if (this.audio) this.audio.playSelectBlip();
    }

    start() {
      this.isRunning = true;
      this.onResize();
      this.startSequence();
      this.animId = requestAnimationFrame(this.render.bind(this));
    }

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      if (this.autoDockTimer) {
        clearTimeout(this.autoDockTimer);
        this.autoDockTimer = null;
      }
      const overlay = document.getElementById('uranusFloatingResume');
      if (overlay) {
        overlay.classList.remove('is-popped-out');
        overlay.setAttribute('aria-hidden', 'true');
      }
      this.isCardPopped = false;
    }

    startSequence() {
      if (this.autoDockTimer) {
        clearTimeout(this.autoDockTimer);
        this.autoDockTimer = null;
      }

      this.isSequenceActive = true;
      this.animStartTime = performance.now();
      this.hasCompletedIntro = false;

      // 1. Starts completely closed
      this.currentLidAngle = this.CLOSED_ANGLE;
      this.targetLidAngle = this.OPEN_ANGLE;
      if (this.lidGroup) {
        this.lidGroup.rotation.x = this.CLOSED_ANGLE;
      }

      // 2. Starts at angled 3D rotation, rotates smoothly to face camera
      this.currentRotY = -0.52;
      this.targetRotY = 0.0;
      if (this.laptopRoot) {
        this.laptopRoot.rotation.y = this.currentRotY;
      }

      // 3. Card starts docked inside
      this.cardProgress = 0.0;
      this.targetCardProgress = 0.0;
      this.isCardPopped = false;

      if (this.floatingCardMesh) {
        this.floatingCardMesh.visible = false;
        this.floatingCardMesh.scale.set(0.001, 0.001, 0.001);
      }

      const overlay = document.getElementById('uranusFloatingResume');
      if (overlay) {
        overlay.classList.remove('is-popped-out');
        overlay.setAttribute('aria-hidden', 'true');
      }

      this.updatePopButtonsState();

      // Play whoosh sound for opening
      if (this.audio) {
        this.audio.playWhoosh();
      }
    }

    popOutResume(isManual = false) {
      if (this.autoDockTimer) {
        clearTimeout(this.autoDockTimer);
        this.autoDockTimer = null;
      }

      this.isCardPopped = true;
      this.targetCardProgress = 1.0;
      if (this.floatingCardMesh) {
        this.floatingCardMesh.visible = true;
      }

      const overlay = document.getElementById('uranusFloatingResume');
      if (overlay) {
        overlay.classList.add('is-popped-out');
        overlay.setAttribute('aria-hidden', 'false');
      }

      this.updatePopButtonsState();

      if (this.audio) {
        this.audio.playCardClink();
      }

      // If triggered by the automatic intro sequence (not manual click), hold for 5 seconds and return inside
      if (!isManual) {
        this.autoDockTimer = setTimeout(() => {
          this.dockResume();
        }, 5000); // 5 seconds hold
      }
    }

    dockResume() {
      if (this.autoDockTimer) {
        clearTimeout(this.autoDockTimer);
        this.autoDockTimer = null;
      }

      this.isCardPopped = false;
      this.targetCardProgress = 0.0;

      const overlay = document.getElementById('uranusFloatingResume');
      if (overlay) {
        overlay.classList.remove('is-popped-out');
        overlay.setAttribute('aria-hidden', 'true');
      }

      this.updatePopButtonsState();

      if (this.audio) {
        this.audio.playSelectBlip();
      }

      // "but the laptop does not close automatically, it stays open showing my resume."
      this.targetLidAngle = this.OPEN_ANGLE;
    }

    updatePopButtonsState() {
      const btnHeader = document.getElementById('btnUranusPopResume');
      if (btnHeader) {
        btnHeader.classList.toggle('is-active', this.isCardPopped);
        const txt = btnHeader.querySelector('.pop-btn-text');
        if (txt) txt.textContent = this.isCardPopped ? 'Dock Resume' : 'Pop Out Resume';
      }

      const btnDock = document.getElementById('btnUranusToggleResumeDock');
      if (btnDock) {
        btnDock.classList.toggle('is-active', this.isCardPopped);
        const span = btnDock.querySelector('span');
        if (span) span.textContent = this.isCardPopped ? 'Dock to Screen' : 'Pop-Out Resume';
      }
    }

    render(time) {
      if (!this.isRunning) return;

      // =====================================================================
      // 1. SEQUENCE OR CONTINUOUS INTERPOLATION
      // =====================================================================
      if (this.isSequenceActive) {
        const elapsed = (time - this.animStartTime) * 0.001;

        // Phase 1: Laptop Opens and Rotates (0.0s to 1.8s)
        if (elapsed <= 1.8) {
          const t = Math.min(elapsed / 1.8, 1.0);
          // Cubic ease-in-out
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          this.currentLidAngle = this.CLOSED_ANGLE + (this.OPEN_ANGLE - this.CLOSED_ANGLE) * ease;
          this.currentRotY = -0.52 * (1.0 - ease);
        } else {
          this.currentLidAngle = this.OPEN_ANGLE;
          this.currentRotY = 0.0;

          // Phase 2: Resume comes out like a floating card (at 1.9s)
          if (!this.hasCompletedIntro && !this.isCardPopped) {
            this.hasCompletedIntro = true;
            this.popOutResume(false);
          }
        }
      } else {
        // Continuous smooth lerp
        this.currentLidAngle += (this.targetLidAngle - this.currentLidAngle) * 0.08;
        this.currentRotY += (this.targetRotY - this.currentRotY) * 0.06;
      }

      // Apply Kinematic Rotations
      if (this.lidGroup) {
        this.lidGroup.rotation.x = this.currentLidAngle;
      }
      if (this.laptopRoot && this.isSequenceActive) {
        this.laptopRoot.rotation.y = this.currentRotY;
      }

      // =====================================================================
      // 2. 3D FLOATING CARD KINEMATICS
      // =====================================================================
      this.cardProgress += (this.targetCardProgress - this.cardProgress) * 0.085;

      if (this.floatingCardMesh) {
        if (this.cardProgress > 0.01) {
          this.floatingCardMesh.visible = true;
          const p = this.cardProgress;

          // Float elevation out from screen plane
          // Local screen normal in lidGroup is -Y!
          const floatY = -0.02 - p * 3.6;
          const floatZ = 4.7 + p * 0.9;
          this.floatingCardMesh.position.set(0, floatY, floatZ);

          // Subtle float tilt towards user
          this.floatingCardMesh.rotation.x = (Math.PI / 2) - p * 0.12;

          // Gentle sinusoidal levitation breathing when fully popped
          if (p > 0.85) {
            const levitation = Math.sin(time * 0.0024) * 0.14;
            this.floatingCardMesh.position.y += levitation;
          }

          this.floatingCardMesh.scale.set(p, p, p);
        } else {
          this.floatingCardMesh.visible = false;
          this.floatingCardMesh.scale.set(0.001, 0.001, 0.001);
        }
      }

      // =====================================================================
      // 3. CAMERA SMOOTH LERP (Preset Views)
      // =====================================================================
      if (this.isLerpingCamera) {
        this.camera.position.lerp(this.camTargetPos, 0.075);
        if (this.controls) {
          this.controls.target.lerp(this.camTargetLook, 0.075);
          this.controls.update();
        }
        if (this.camera.position.distanceTo(this.camTargetPos) < 0.15) {
          this.isLerpingCamera = false;
        }
      } else if (this.controls) {
        this.controls.update();
      }

      // =====================================================================
      // 4. RENDER FRAME
      // =====================================================================
      this.renderer.render(this.scene, this.camera);
      this.animId = requestAnimationFrame(this.render.bind(this));
    }
  }



  // =========================================================================
  // SATURN 3D GLASSMORPHISM CERTIFICATES & ACHIEVEMENTS HANGING ENGINE
  // 5 translucent glass cards hanging from visible strings, gentle drop
  // into place, natural pendulum sway, and smooth forward 3D expansion!
  // =========================================================================
  class SaturnCertificates3D {
    constructor(modalEl, audio) {
      this.modal = modalEl;
      this.audio = audio;

      this.stage = document.getElementById('saturnHangingStage');
      this.container = document.getElementById('saturnCardsContainer');
      this.rail = document.getElementById('saturnCeilingRail');
      this.svg = document.getElementById('saturnStringsSvg');
      this.stringsGroup = document.getElementById('saturnStringsGroup');
      this.cards = Array.from(document.querySelectorAll('.saturn-glass-card'));
      this.brackets = Array.from(document.querySelectorAll('.rail-bracket-item'));

      this.isRunning = false;
      this.animId = null;
      this.startTime = 0;
      this.expandedCard = null;
      this.activeFilter = 'all';

      // Card Physics & Sway State
      this.cardPhysics = this.cards.map((card, i) => ({
        index: i,
        el: card,
        // Individualized pendulum frequencies and phase offsets
        speed: 1.15 + (i * 0.14) + (Math.sin(i * 1.5) * 0.08),
        phase: (i * 1.35),
        maxSwayAngle: 2.6 + (i % 2 === 0 ? 0.6 : -0.4),
        currentAngle: 0,
        currentX: 0,
        currentY: -500, // Starts above viewport for drop entrance
        dropProgress: 0,
        isDropped: false,
        dropStartTime: 0,
        dropDelay: i * 110, // Staggered drop
        mouseTiltX: 0,
        mouseTiltY: 0,
        isHovered: false
      }));

      // String line SVG references (2 lines per card: left and right)
      this.stringLines = [];

      this.initSvgStrings();
      this.bindInteractions();
    }

    initSvgStrings() {
      if (!this.stringsGroup) return;
      this.stringsGroup.innerHTML = '';
      this.stringLines = [];

      this.cards.forEach((card, idx) => {
        // Left suspension cable
        const lineL = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineL.setAttribute('class', 'saturn-string-line');
        lineL.setAttribute('stroke', 'url(#saturnStringGrad)');
        lineL.setAttribute('data-card', idx);
        lineL.setAttribute('data-side', 'left');
        this.stringsGroup.appendChild(lineL);

        // Right suspension cable
        const lineR = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineR.setAttribute('class', 'saturn-string-line');
        lineR.setAttribute('stroke', 'url(#saturnStringGrad)');
        lineR.setAttribute('data-card', idx);
        lineR.setAttribute('data-side', 'right');
        this.stringsGroup.appendChild(lineR);

        this.stringLines.push({ left: lineL, right: lineR });
      });
    }

    bindInteractions() {
      // 1. Click on card to expand forward or return
      this.cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
          // If clicked the return button
          if (e.target.closest('.btn-return-card')) {
            e.stopPropagation();
            this.collapseCard();
            return;
          }

          // If already expanded, clicking it again collapses it back to hanging
          if (this.expandedCard === card) {
            this.collapseCard();
            return;
          }

          // If clicking a dimmed or standard card, expand it
          this.expandCard(card);
        });

        // 2. Interactive pointer hover tilt
        card.addEventListener('pointermove', (e) => {
          if (this.expandedCard === card) return;
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (rect.width / 2);
          const dy = (e.clientY - cy) / (rect.height / 2);

          const phys = this.cardPhysics[idx];
          if (phys) {
            phys.mouseTiltX = -dy * 8;
            phys.mouseTiltY = dx * 8;
            phys.isHovered = true;
          }
        });

        card.addEventListener('pointerenter', () => {
          const phys = this.cardPhysics[idx];
          if (phys) phys.isHovered = true;
          if (this.audio && !this.expandedCard) {
            try { this.audio.playSelectBlip(); } catch (err) {}
          }
        });

        card.addEventListener('pointerleave', () => {
          const phys = this.cardPhysics[idx];
          if (phys) {
            phys.mouseTiltX = 0;
            phys.mouseTiltY = 0;
            phys.isHovered = false;
          }
        });
      });

      // 3. Stage click to collapse if clicking outside expanded card
      if (this.stage) {
        this.stage.addEventListener('click', (e) => {
          if (this.expandedCard && !e.target.closest('.saturn-glass-card')) {
            this.collapseCard();
          }
        });
      }

      // 4. Replay Drop Animation Button
      const btnReplay = document.getElementById('btnSaturnReplayDrop');
      if (btnReplay) {
        btnReplay.addEventListener('click', () => {
          this.replayDropSequence();
        });
      }

      // 5. Category Filter Dock Buttons
      const filterBtns = document.querySelectorAll('.saturn-dock-btn[data-filter]');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const filter = btn.getAttribute('data-filter');
          this.setFilter(filter);
        });
      });
    }

    start() {
      this.isRunning = true;
      this.startTime = performance.now();
      this.collapseCard(false);
      this.replayDropSequence();
      this.animId = requestAnimationFrame(this.tick.bind(this));
    }

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      this.collapseCard(false);
    }

    replayDropSequence() {
      const now = performance.now();
      this.cardPhysics.forEach((phys) => {
        phys.isDropped = false;
        phys.dropStartTime = now + phys.dropDelay;
        phys.currentY = -520;
        phys.currentAngle = (Math.random() * 8) - 4;
        phys.el.style.transform = `translate3d(0, -520px, 0)`;
      });
      if (this.audio) {
        try { this.audio.playWhoosh(); } catch (err) {}
      }
    }

    expandCard(card) {
      if (this.expandedCard === card) return;
      this.collapseCard(false);

      this.expandedCard = card;
      card.classList.add('is-expanded');

      // Dim other cards
      this.cards.forEach(c => {
        if (c !== card) c.classList.add('is-dimmed');
      });

      if (this.audio) {
        try { this.audio.playCardClink(); } catch (err) {}
      }
    }

    collapseCard(playAudio = true) {
      if (!this.expandedCard) return;

      this.expandedCard.classList.remove('is-expanded');
      this.cards.forEach(c => c.classList.remove('is-dimmed'));
      this.expandedCard = null;

      if (playAudio && this.audio) {
        try { this.audio.playSelectBlip(); } catch (err) {}
      }
    }

    setFilter(filter) {
      this.activeFilter = filter;
      if (this.expandedCard) this.collapseCard(false);

      this.cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const matches = (filter === 'all' || cat === filter);
        card.classList.toggle('is-filtered-out', !matches);
      });

      if (this.audio) {
        try { this.audio.playSelectBlip(); } catch (err) {}
      }
    }

    tick(time) {
      if (!this.isRunning) return;

      const elapsed = (time - this.startTime) * 0.001;

      // 1. Update Card Physics (Drop & Natural Pendulum Sway)
      this.cardPhysics.forEach((phys) => {
        if (phys.el === this.expandedCard) {
          // If expanded, it is centered in foreground, handled by CSS
          return;
        }

        // Staggered drop entrance
        if (time >= phys.dropStartTime) {
          const dropElapsed = (time - phys.dropStartTime) * 0.001;
          const dropDuration = 1.35; // seconds

          if (dropElapsed < dropDuration) {
            const t = dropElapsed / dropDuration;
            // Elastic bounce ease-out
            const p = 0.38;
            const easeOutElastic = Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
            phys.currentY = -520 + (520 * easeOutElastic);
          } else {
            phys.currentY = 0;
            phys.isDropped = true;
          }
        } else {
          phys.currentY = -520;
        }

        // Natural harmonic pendulum sway once dropped
        if (phys.isDropped) {
          const swayDamping = phys.isHovered ? 0.35 : 1.0;
          const hoverLift = phys.isHovered ? -10 : 0;

          // Pure harmonic angular oscillation
          phys.currentAngle = Math.sin((elapsed * phys.speed) + phys.phase) * phys.maxSwayAngle * swayDamping;
          phys.currentX = Math.sin((elapsed * phys.speed) + phys.phase) * 5.5 * swayDamping;

          // Apply 3D transform (swaying from the top hinge!)
          const finalY = phys.currentY + hoverLift;
          const rotX = phys.mouseTiltX;
          const rotY = phys.mouseTiltY;

          phys.el.style.transform = `translate3d(${phys.currentX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0px) rotateZ(${phys.currentAngle.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
      });

      // 2. Real-Time String Line Connections (Strings STAY CONNECTED during motion!)
      this.updateStringLines();

      this.animId = requestAnimationFrame(this.tick.bind(this));
    }

    updateStringLines() {
      if (!this.modal || !this.svg) return;
      const modalRect = this.modal.getBoundingClientRect();

      this.cards.forEach((card, idx) => {
        const lines = this.stringLines[idx];
        if (!lines) return;

        // Find top eyelet elements on the card
        const eyeletL = card.querySelector('[data-eyelet="left"]');
        const eyeletR = card.querySelector('[data-eyelet="right"]');
        if (!eyeletL || !eyeletR) return;

        const eyeRectL = eyeletL.getBoundingClientRect();
        const eyeRectR = eyeletR.getBoundingClientRect();

        // Eyelet target coordinates relative to SVG
        const cardX1 = (eyeRectL.left + eyeRectL.width / 2) - modalRect.left;
        const cardY1 = (eyeRectL.top + eyeRectL.height / 2) - modalRect.top;

        const cardX2 = (eyeRectR.left + eyeRectR.width / 2) - modalRect.left;
        const cardY2 = (eyeRectR.top + eyeRectR.height / 2) - modalRect.top;

        // Top ceiling mount anchor coordinates
        // Corresponding rail bracket or evenly spaced along the rail
        const bracket = this.brackets[idx];
        let anchorX1 = cardX1;
        let anchorX2 = cardX2;
        let anchorY = 70; // Rail height

        if (bracket) {
          const bRect = bracket.getBoundingClientRect();
          const bCenter = (bRect.left + bRect.width / 2) - modalRect.left;
          anchorX1 = bCenter - 14;
          anchorX2 = bCenter + 14;
          anchorY = (bRect.top + bRect.height / 2) - modalRect.top;
        }

        // Set line coordinates
        lines.left.setAttribute('x1', anchorX1.toFixed(1));
        lines.left.setAttribute('y1', anchorY.toFixed(1));
        lines.left.setAttribute('x2', cardX1.toFixed(1));
        lines.left.setAttribute('y2', cardY1.toFixed(1));

        lines.right.setAttribute('x1', anchorX2.toFixed(1));
        lines.right.setAttribute('y1', anchorY.toFixed(1));
        lines.right.setAttribute('x2', cardX2.toFixed(1));
        lines.right.setAttribute('y2', cardY2.toFixed(1));
      });
    }
  }


  // =========================================================================
  // NEPTUNE SUBSPACE NEXUS & COMMS DIRECTORY ENGINE
  // Important links (LeetCode, GitHub, LinkedIn, TUF) and direct transmission
  // =========================================================================
  class NeptuneNexus3D {
    constructor(modalEl, audio) {
      this.modal = modalEl;
      this.audio = audio;
      this.cards = Array.from(document.querySelectorAll('.link-portal-card'));
      this.copyBtn = document.getElementById('btnCopyNeptuneEmail');
      this.copyBtnText = document.getElementById('copyEmailBtnText');
      this.emailAddress = document.getElementById('neptuneEmailAddress');
      this.transmitForm = document.getElementById('neptuneTransmitForm');
      this.transmitStatus = document.getElementById('transmitStatusMsg');

      this.bindInteractions();
    }

    bindInteractions() {
      // 1. One-click Email Copy with Animated Feedback
      if (this.copyBtn && this.emailAddress) {
        this.copyBtn.addEventListener('click', () => {
          const text = this.emailAddress.textContent.trim();
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(text).then(() => {
              this.showCopyFeedback();
            }).catch(() => {
              this.fallbackCopy(text);
            });
          } else {
            this.fallbackCopy(text);
          }
        });
      }

      // 2. Global window handler for quick transmission form
      window.handleNeptuneMessageSend = () => {
        const nameEl = document.getElementById('neptuneSenderName');
        const emailEl = document.getElementById('neptuneSenderContact');
        const msgEl = document.getElementById('neptuneSenderMessage');

        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const msg = msgEl ? msgEl.value.trim() : '';

        if (!name || !email || !msg) return;

        if (this.audio) {
          try { this.audio.playScanTelemetry(); } catch (err) {}
        }

        if (this.transmitStatus) {
          this.transmitStatus.textContent = 'Transmitting to Tanishka...';
        }

        // Open mailto with pre-composed content
        const subject = encodeURIComponent(`Transmission from ${name} [${email}]`);
        const body = encodeURIComponent(`Hi Tanishka,

${msg}

---
From: ${name}
Contact: ${email}`);
        const mailtoUrl = `mailto:tanishkasahuwork191@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
          window.location.href = mailtoUrl;
          if (this.transmitStatus) {
            this.transmitStatus.textContent = 'Transmission Dispatched!';
            setTimeout(() => {
              if (this.transmitStatus) this.transmitStatus.textContent = '';
            }, 6000);
          }
          if (this.transmitForm) this.transmitForm.reset();
        }, 500);
      };

      // 3. Audio blips on clicking links
      this.cards.forEach(card => {
        card.addEventListener('click', () => {
          if (this.audio) {
            try { this.audio.playCardClink(); } catch (err) {}
          }
        });
      });
    }

    showCopyFeedback() {
      if (this.audio) {
        try { this.audio.playSelectBlip(); } catch (err) {}
      }
      if (this.copyBtnText) {
        const originalText = this.copyBtnText.textContent;
        this.copyBtnText.textContent = 'Copied to Clipboard!';
        if (this.copyBtn) this.copyBtn.style.borderColor = '#86efac';
        setTimeout(() => {
          if (this.copyBtnText) this.copyBtnText.textContent = originalText;
          if (this.copyBtn) this.copyBtn.style.borderColor = '';
        }, 3000);
      }
    }

    fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.showCopyFeedback();
      } catch (err) {}
      document.body.removeChild(textarea);
    }

    start() {
      // Reset form status
      if (this.transmitStatus) this.transmitStatus.textContent = '';
    }

    stop() {}
  }

  // Solar System 3D Manager
  class SolarSystemApp {
    constructor() {
      this.container = document.getElementById('solarCanvasContainer');
      this.audio = new SpaceAudioEngine();
      this.uranusLaptop3D = null;
      this.saturnCertificates3D = null;
      this.neptuneNexus3D = null;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      this.planets = {};
      this.orbitCurves = [];
      this.interactiveMeshes = [];
      this.labelElements = {};

      this.isSimulationRunning = true;
      this.simSpeed = 2.5;
      this.selectedBodyId = null;
      this.isFocusingCamera = false;
      this.cameraTargetPos = new THREE.Vector3();
      this.cameraTargetLook = new THREE.Vector3();

      // Reference Blueprint diagram camera preset (Sun on left, all planets visible diagonally across screen matching user alignment)
      this.diagramCameraPos = new THREE.Vector3(-187, 457, 500);
      this.diagramCameraLook = new THREE.Vector3(-6, -55, -45);

      this.activeTab = 'overview';
      this.hoveredBody = null;

      // 3D Flippable Project Book state
      this.currentBookLeaf = 0;
      this.totalBookLeaves = 4;
      this.isAutoFlipping = false;
      this.autoFlipTimer = null;

      // Jupiter 3D Winding Roadmap instance
      this.jupiterRoadmap3D = null;

      this.init();
    }

    init() {
      if (!this.container) return;

      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;

      // Three.js Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x02040d, 0.00028);

      // Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 12000);
      this.updateCameraForAspect(width / height);
      this.camera.position.copy(this.diagramCameraPos);
      this.camera.lookAt(this.diagramCameraLook);

      // WebGL Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      this.container.appendChild(this.renderer.domElement);

      // OrbitControls
      if (window.THREE && THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 2600;
        this.controls.minDistance = 25;
        this.controls.target.copy(this.diagramCameraLook);
        this.controls.update();
      }

      this.buildLighting();
      this.buildStarfield();
      this.buildSolarSystemBodies();
      this.buildDomLabels();
      this.bindEvents();

      // Start cosmic background video
      const cosmicVid = document.getElementById('solarCosmicBgVideo');
      if (cosmicVid) {
        cosmicVid.play().catch(() => { });
      }

      // Start render loop
      this.lastTime = performance.now();
      requestAnimationFrame(this.render.bind(this));
    }

    updateCameraForAspect(aspect) {
      const baseTarget = new THREE.Vector3(-6, -55, -45);
      const baseOffset = new THREE.Vector3(-181, 512, 545);
      const scale = aspect < 1.75 ? (1.75 / Math.max(aspect, 0.72)) : 1.0;
      this.diagramCameraPos.copy(baseTarget).addScaledVector(baseOffset, scale);
      this.diagramCameraLook.copy(baseTarget);
    }

    buildLighting() {
      // Cosmic ambient light: balanced so night sides have dramatic, cinematic terminator shadows without being completely invisible
      const ambient = new THREE.AmbientLight(0x182033, 0.32);
      this.scene.add(ambient);

      // Radiant PointLight directly at the Sun's core
      this.sunLight = new THREE.PointLight(0xfff6e8, 3.8, 5500, 0.62);
      this.sunLight.position.set(-460, 0, 0);
      this.scene.add(this.sunLight);

      // Key Sunlight casting cinematic directional rays and authentic day/night terminator lines across all planets
      const sunDirLight = new THREE.DirectionalLight(0xfff5e6, 1.35);
      sunDirLight.position.set(-460, 15, 8);
      const sunTarget = new THREE.Object3D();
      sunTarget.position.set(100, 0, 0);
      this.scene.add(sunTarget);
      sunDirLight.target = sunTarget;
      this.scene.add(sunDirLight);

      // Subtle cool rim light for volumetric depth
      const rimLight = new THREE.DirectionalLight(0x6688cc, 0.28);
      rimLight.position.set(50, 400, 350);
      this.scene.add(rimLight);
    }

    buildStarfield() {
      const starGeo = new THREE.BufferGeometry();
      const count = 4200;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      // Spectral star classification colors: O (deep blue), B (blue-white), A (pure white), F/G (warm yellow-white), K (amber-orange), M (crimson)
      const colorPalette = [
        new THREE.Color(0xffffff),
        new THREE.Color(0xbcdcff),
        new THREE.Color(0x99ccff),
        new THREE.Color(0xffeedd),
        new THREE.Color(0xffd59e),
        new THREE.Color(0xffa882),
        new THREE.Color(0x82b4ff)
      ];

      for (let i = 0; i < count; i++) {
        const radius = 2600 + Math.random() * 3200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const starMat = new THREE.PointsMaterial({
        size: 2.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.88
      });

      this.starField = new THREE.Points(starGeo, starMat);
      this.scene.add(this.starField);
    }

    buildSolarSystemBodies() {
      // Configuration matching the user's diagram:
      // The Sun is on the left, and all 8 planets are arranged parallelly in a straight horizontal line
      // from left to right along Y = 0, Z = 0, each sitting on its elliptical orbit.
      this.sunOffset = new THREE.Vector3(-460, 0, 0);

      this.planetSpecs = [
        {
          id: 'sun',
          name: 'Ask Nova AI',
          labelHtml: 'Ask Nova AI',
          x: -460,
          radius: 76.8, // 64 * 1.20
          rotSpeed: 0.0018,
          tilt: 7.25,
          labelOffsetDir: 'down',
          texture: ProceduralTextures.createSunTexture()
        },
        {
          id: 'mercury',
          name: 'Cosmic ID',
          labelHtml: 'Cosmic ID',
          x: -330,
          radius: 6.6, // 5.5 * 1.20
          rotSpeed: 0.006,
          tilt: 0.03,
          labelOffsetDir: 'up',
          texture: ProceduralTextures.createMercuryTexture(),
          bumpTexture: ProceduralTextures.createMercuryBump(),
          bumpScale: 0.14,
          roughness: 0.92,
          metalness: 0.04
        },
        {
          id: 'venus',
          name: 'Meet Tanishka Sahu',
          labelHtml: 'Meet Tanishka<br>Sahu',
          x: -255,
          radius: 12.0, // 10 * 1.20
          rotSpeed: -0.004,
          tilt: 177.3,
          labelOffsetDir: 'down',
          texture: ProceduralTextures.createVenusTexture(),
          roughness: 0.58,
          metalness: 0.02,
          atmosphereColor: 0xffe2a3
        },
        {
          id: 'earth',
          name: 'Planet of Projects',
          labelHtml: 'Planet of Projects',
          x: -170,
          radius: 13.8, // 11.5 * 1.20
          rotSpeed: 0.010,
          tilt: 23.4,
          labelOffsetDir: 'up',
          texture: ProceduralTextures.createEarthTexture(),
          cloudTexture: ProceduralTextures.createEarthCloudTexture(),
          roughness: 0.42,
          metalness: 0.12,
          atmosphereColor: 0x4aa3ff,
          hasMoon: true
        },
        {
          id: 'mars',
          name: 'Education',
          labelHtml: 'Education',
          x: -90,
          radius: 9.0, // 7.5 * 1.20
          rotSpeed: 0.009,
          tilt: 25.2,
          labelOffsetDir: 'down',
          texture: ProceduralTextures.createMarsTexture(),
          bumpTexture: ProceduralTextures.createMarsBump(),
          bumpScale: 0.16,
          roughness: 0.84,
          metalness: 0.06,
          atmosphereColor: 0xdf8253
        },
        {
          id: 'jupiter',
          name: 'Achievements belt',
          labelHtml: 'Achievements belt',
          x: 30,
          radius: 38.4, // 32 * 1.20
          rotSpeed: 0.018,
          tilt: 3.1,
          labelOffsetDir: 'up',
          texture: ProceduralTextures.createJupiterTexture(),
          roughness: 0.62,
          metalness: 0.02
        },
        {
          id: 'saturn',
          name: 'Certifications and Activities',
          labelHtml: 'Certifications &amp;<br>Activities',
          x: 170,
          radius: 28.8, // 24 * 1.20
          rotSpeed: 0.016,
          tilt: 26.7,
          labelOffsetDir: 'down',
          texture: ProceduralTextures.createSaturnTexture(),
          roughness: 0.66,
          metalness: 0.02,
          hasRings: true
        },
        {
          id: 'uranus',
          name: 'Resume',
          labelHtml: 'Resume',
          x: 295,
          radius: 19.2, // 16 * 1.20
          rotSpeed: 0.012,
          tilt: 97.8,
          labelOffsetDir: 'up',
          texture: ProceduralTextures.createUranusTexture(),
          roughness: 0.52,
          metalness: 0.02,
          atmosphereColor: 0x6ae2ff
        },
        {
          id: 'neptune',
          name: 'Important Links',
          labelHtml: 'Important Links',
          x: 405,
          radius: 18.0, // 15 * 1.20
          rotSpeed: 0.011,
          tilt: 28.3,
          labelOffsetDir: 'down',
          texture: ProceduralTextures.createNeptuneTexture(),
          roughness: 0.48,
          metalness: 0.02,
          atmosphereColor: 0x4488ff
        }
      ];

      this.planetSpecs.forEach((spec) => {
        const group = new THREE.Group();
        group.userData = { id: spec.id, name: spec.name };

        // 1. Planetary Sphere Geometry & Material
        const geo = new THREE.SphereGeometry(spec.radius, 64, 64);
        let mat;

        if (spec.id === 'sun') {
          // Luminous incandescent star surface
          mat = new THREE.MeshBasicMaterial({
            map: spec.texture
          });
        } else {
          // Realistic PBR Standard Material with bump relief & tuned micro-roughness
          const matOpts = {
            map: spec.texture,
            roughness: spec.roughness !== undefined ? spec.roughness : 0.75,
            metalness: spec.metalness !== undefined ? spec.metalness : 0.08
          };
          if (spec.bumpTexture) {
            matOpts.bumpMap = spec.bumpTexture;
            matOpts.bumpScale = spec.bumpScale || 0.12;
          }
          mat = new THREE.MeshStandardMaterial(matOpts);
        }

        const sphereMesh = new THREE.Mesh(geo, mat);
        sphereMesh.userData = { id: spec.id, name: spec.name };
        if (spec.tilt) {
          sphereMesh.rotation.z = THREE.MathUtils.degToRad(spec.tilt);
        }
        group.add(sphereMesh);
        this.interactiveMeshes.push(sphereMesh);

        // 2. Extra Atmospheric Glow for Sun
        if (spec.id === 'sun') {
          // Layer 1: Inner incandescent chromospheric flare halo
          const corona1Geo = new THREE.SphereGeometry(spec.radius * 1.08, 48, 48);
          const corona1Mat = new THREE.MeshBasicMaterial({
            color: 0xffbe3b,
            transparent: true,
            opacity: 0.38,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
          });
          const corona1Mesh = new THREE.Mesh(corona1Geo, corona1Mat);
          group.add(corona1Mesh);
          group.userData.corona1Mesh = corona1Mesh;

          // Layer 2: Mid coronal prominence envelope
          const corona2Geo = new THREE.SphereGeometry(spec.radius * 1.24, 48, 48);
          const corona2Mat = new THREE.MeshBasicMaterial({
            color: 0xff6b18,
            transparent: true,
            opacity: 0.22,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
          });
          const corona2Mesh = new THREE.Mesh(corona2Geo, corona2Mat);
          group.add(corona2Mesh);
          group.userData.corona2Mesh = corona2Mesh;

          // Layer 3: Outer diffuse cosmic solar wind radiance
          const haloGeo = new THREE.SphereGeometry(spec.radius * 1.56, 32, 32);
          const haloMat = new THREE.MeshBasicMaterial({
            color: 0xff3b05,
            transparent: true,
            opacity: 0.12,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
          });
          const haloMesh = new THREE.Mesh(haloGeo, haloMat);
          group.add(haloMesh);
          group.userData.haloMesh = haloMesh;
        } else {
          // Draw the elliptical orbit track passing through this planet and wrapping around the Sun
          this.createOrbitLine(spec);
        }

        // 3. Atmospheric Rayleigh Rim Glow Shells (Earth, Venus, Mars, Uranus, Neptune)
        if (spec.atmosphereColor) {
          const atmoGeo = new THREE.SphereGeometry(spec.radius * 1.035, 48, 48);
          const atmoMat = new THREE.MeshBasicMaterial({
            color: spec.atmosphereColor,
            transparent: true,
            opacity: spec.id === 'earth' ? 0.22 : 0.16,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
          });
          const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
          group.add(atmoMesh);
        }

        // 4. Earth Dual-Sphere Swirling Cloud Layer
        if (spec.id === 'earth' && spec.cloudTexture) {
          const cloudGeo = new THREE.SphereGeometry(spec.radius * 1.018, 54, 54);
          const cloudMat = new THREE.MeshStandardMaterial({
            map: spec.cloudTexture,
            transparent: true,
            opacity: 0.72,
            roughness: 0.95,
            metalness: 0.0
          });
          const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
          if (spec.tilt) {
            cloudMesh.rotation.z = THREE.MathUtils.degToRad(spec.tilt);
          }
          group.add(cloudMesh);
          group.userData.cloudMesh = cloudMesh;
        }

        // 5. Saturn Photorealistic Rings
        if (spec.hasRings) {
          const ringGeo = new THREE.RingGeometry(spec.radius * 1.3, spec.radius * 2.35, 64);
          ringGeo.rotateX(Math.PI / 2);
          const ringTexture = ProceduralTextures.createSaturnRingTexture();
          ringTexture.wrapS = THREE.RepeatWrapping;
          ringTexture.wrapT = THREE.RepeatWrapping;

          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTexture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            roughness: 0.5
          });

          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.z = THREE.MathUtils.degToRad(26.7);
          ringMesh.rotation.x = THREE.MathUtils.degToRad(12);
          group.add(ringMesh);
        }

        // 6. Earth Cratered Moon
        if (spec.hasMoon) {
          const moonGeo = new THREE.SphereGeometry(3.6, 32, 32);
          const moonMat = new THREE.MeshStandardMaterial({
            map: ProceduralTextures.createMoonTexture(),
            bumpMap: ProceduralTextures.createMercuryBump(),
            bumpScale: 0.10,
            roughness: 0.92,
            metalness: 0.03
          });
          const moonMesh = new THREE.Mesh(moonGeo, moonMat);
          moonMesh.position.set(spec.radius + 18, 2, 0);
          group.add(moonMesh);
          group.userData.moonMesh = moonMesh;
        }

        // Fixed parallel positioning: all planets aligned horizontally along Y=0, Z=0
        group.position.set(spec.x, 0, 0);

        this.scene.add(group);
        this.planets[spec.id] = { group, spec, sphereMesh };
      });
    }

    createOrbitLine(spec) {
      // Elliptical orbit that wraps around the left of the Sun and extends to the planet's parallel position
      const leftX = this.sunOffset.x - 22; // -482
      const rightX = spec.x;
      const centerX = (leftX + rightX) / 2;
      const a = (rightX - leftX) / 2;
      const b = a * 0.44; // Perspective depth matching user diagram

      const points = [];
      const segments = 160;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const px = centerX + Math.cos(theta) * a;
        const pz = Math.sin(theta) * b;
        points.push(new THREE.Vector3(px, 0, pz));
      }

      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x688bb5,
        transparent: true,
        opacity: 0.42,
        linewidth: 1
      });

      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      this.scene.add(orbitLine);
      this.orbitCurves.push(orbitLine);
    }

    updatePlanetPosition(group, spec) {
      if (spec.id === 'sun') return;
      const x = this.sunOffset.x + Math.cos(spec.angle) * spec.orbitA;
      const z = this.sunOffset.z + Math.sin(spec.angle) * spec.orbitB;
      group.position.set(x, 0, z);
    }

    buildDomLabels() {
      // Floating billboard tags with connector dots and lines placed safely outside each planetary body
      const labelLayer = document.getElementById('solarLabelsLayer');
      if (!labelLayer) return;
      labelLayer.innerHTML = '';

      this.planetSpecs.forEach(spec => {
        const tag = document.createElement('div');
        const isDown = spec.labelOffsetDir === 'down';
        tag.className = `planet-hud-tag ${isDown ? 'label-down' : 'label-up'}`;
        tag.id = `tag-${spec.id}`;

        const textContent = spec.labelHtml || spec.name;

        if (isDown) {
          tag.innerHTML = `
            <span class="hud-dot"></span>
            <span class="hud-line"></span>
            <span class="hud-name">${textContent}</span>
          `;
        } else {
          tag.innerHTML = `
            <span class="hud-name">${textContent}</span>
            <span class="hud-line"></span>
            <span class="hud-dot"></span>
          `;
        }

        tag.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectPlanet(spec.id);
        });

        labelLayer.appendChild(tag);
        this.labelElements[spec.id] = tag;
      });
    }

    updateDomLabels() {
      if (!this.camera || !this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;

      // Camera local up vector in world space for precise projected radial clearance
      const camElements = this.camera.matrixWorld.elements;
      const camUp = new THREE.Vector3(camElements[4], camElements[5], camElements[6]).normalize();

      const planetPos = new THREE.Vector3();
      const tempVec = new THREE.Vector3();
      const rimVec = new THREE.Vector3();

      this.planetSpecs.forEach(spec => {
        const item = this.planets[spec.id];
        const tag = this.labelElements[spec.id];
        if (!item || !tag) return;

        item.group.getWorldPosition(planetPos);

        // Project center
        tempVec.copy(planetPos).project(this.camera);

        // Discard bodies positioned behind camera
        if (tempVec.z >= 1) {
          tag.style.display = 'none';
          return;
        }

        const centerX = (tempVec.x * 0.5 + 0.5) * width;
        const centerY = (-(tempVec.y * 0.5) + 0.5) * height;

        // Accurate visual radii in 3D world units (scaled up 20% to match enlarged planet bodies):
        // - Sun: 98 units covers the full enlarged radiant corona
        // - Earth: 31 units encompasses the Moon's expanded orbit
        // - Saturn: 70 units fully encompasses the enlarged wide 67.7 unit rings
        // - Jupiter: 42 units fully encompasses its enlarged massive globe
        let visualRadius = spec.radius;
        if (spec.id === 'sun') {
          visualRadius = 98;
        } else if (spec.id === 'earth') {
          visualRadius = 31;
        } else if (spec.id === 'saturn') {
          visualRadius = 70;
        } else if (spec.id === 'jupiter') {
          visualRadius = 42;
        } else {
          visualRadius = spec.radius * 1.25;
        }

        // Project boundary rim along camera UP axis to find exact screen pixel radius
        rimVec.copy(planetPos).addScaledVector(camUp, visualRadius).project(this.camera);
        const rimY = (-(rimVec.y * 0.5) + 0.5) * height;
        const pixelRadius = Math.max(Math.abs(centerY - rimY), visualRadius * 0.45);

        const isDown = spec.labelOffsetDir === 'down';
        let anchorX = centerX;
        let anchorY = 0;

        if (spec.id === 'sun') {
          // Sun is partially off-screen on the far left. Anchor comfortably in the lower void
          anchorX = Math.max(centerX + 40, 80);
          anchorY = centerY + pixelRadius + 14;
          tag.style.transform = 'translate(-50%, 0)';
        } else if (isDown) {
          // Label is below planet: anchor dot sits cleanly below planet/ring rim, line and badge go down
          anchorY = centerY + pixelRadius + 10;
          tag.style.transform = 'translate(-50%, 0)';
        } else {
          // Label is above planet: anchor dot sits cleanly above planet rim, line and badge go up
          anchorY = centerY - pixelRadius - 10;
          tag.style.transform = 'translate(-50%, -100%)';
        }

        tag.style.left = `${anchorX}px`;
        tag.style.top = `${anchorY}px`;
        tag.style.display = 'flex';
        tag.classList.toggle('is-selected', this.selectedBodyId === spec.id);
      });
    }

    bindEvents() {
      window.addEventListener('resize', this.onResize.bind(this));

      const dom = this.renderer.domElement;
      dom.addEventListener('pointermove', this.onPointerMove.bind(this));
      dom.addEventListener('click', this.onPointerClick.bind(this));

      // Controls toolbar buttons
      const btnResetView = document.getElementById('btnResetSolarView');
      if (btnResetView) {
        btnResetView.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.resetToDiagramView();
        });
      }

      const btnToggleOrbit = document.getElementById('btnToggleOrbit');
      if (btnToggleOrbit) {
        btnToggleOrbit.addEventListener('click', () => {
          this.isSimulationRunning = !this.isSimulationRunning;
          btnToggleOrbit.classList.toggle('is-paused', !this.isSimulationRunning);
          btnToggleOrbit.setAttribute('aria-pressed', String(!this.isSimulationRunning));
          btnToggleOrbit.querySelector('.btn-label').textContent = this.isSimulationRunning ? 'Pause Rotation' : 'Resume Rotation';
          this.audio.playSelectBlip();
        });
      }

      const btnAudioToggle = document.getElementById('btnSolarAudio');
      if (btnAudioToggle) {
        btnAudioToggle.addEventListener('click', () => {
          const isMuted = this.audio.toggleMute();
          btnAudioToggle.classList.toggle('is-muted', isMuted);
          btnAudioToggle.setAttribute('aria-pressed', String(isMuted));
          btnAudioToggle.querySelector('.btn-label').textContent = isMuted ? 'Sound: OFF' : 'Sound: ON';
        });
      }

      const btnSpeed = document.getElementById('btnSolarSpeed');
      if (btnSpeed) {
        btnSpeed.addEventListener('click', () => {
          const speeds = [1.0, 2.5, 5.0, 10.0];
          const currIdx = speeds.indexOf(this.simSpeed);
          this.simSpeed = speeds[(currIdx + 1) % speeds.length];
          btnSpeed.querySelector('.btn-label').textContent = `${this.simSpeed}x Speed`;
          this.audio.playSelectBlip();
        });
      }

      // Return to Cockpit button
      const btnBackCockpit = document.getElementById('btnBackCockpit');
      if (btnBackCockpit) {
        btnBackCockpit.addEventListener('click', () => {
          this.audio.playSelectBlip();
          window.returnToCadetScreen();
        });
      }

      // Mission Guide Modal Events
      const btnMissionGuide = document.getElementById('btnMissionGuide');
      const missionGuideModal = document.getElementById('missionGuideModal');
      const btnCloseMissionGuide = document.getElementById('btnCloseMissionGuide');
      const btnDismissGuide = document.getElementById('btnDismissGuide');
      const missionGuideBackdrop = document.getElementById('missionGuideBackdrop');

      if (btnMissionGuide) {
        btnMissionGuide.addEventListener('click', () => {
          this.toggleMissionGuideModal();
        });
      }

      if (btnCloseMissionGuide) {
        btnCloseMissionGuide.addEventListener('click', () => {
          this.closeMissionGuideModal();
        });
      }

      if (btnDismissGuide) {
        btnDismissGuide.addEventListener('click', () => {
          this.closeMissionGuideModal();
        });
      }

      if (missionGuideBackdrop) {
        missionGuideBackdrop.addEventListener('click', () => {
          this.closeMissionGuideModal();
        });
      }

      // Close Mission Guide on Escape key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (missionGuideModal && missionGuideModal.classList.contains('is-open')) {
            this.closeMissionGuideModal();
          }
        }
      });

      // Quick navigation click on any celestial destination in Mission Guide
      document.querySelectorAll('.guide-item-card[data-guide-planet]').forEach(card => {
        card.addEventListener('click', () => {
          const planetId = card.getAttribute('data-guide-planet');
          this.closeMissionGuideModal();
          if (planetId) {
            this.selectPlanet(planetId);
          }
        });
      });

      // Planet Selector Bottom Dock
      const dockButtons = document.querySelectorAll('.planet-dock-item');
      dockButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const planetId = btn.getAttribute('data-planet');
          if (planetId) this.selectPlanet(planetId);
        });
      });

      // Modal buttons
      const modal = document.getElementById('planetModal');
      const btnCloseModal = document.getElementById('btnClosePlanetModal');
      if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => this.closePlanetModal());
      }
      if (modal) {
        modal.addEventListener('close', () => this.closePlanetModal());
      }

      const btnPrevPlanet = document.getElementById('btnPrevPlanet');
      if (btnPrevPlanet) {
        btnPrevPlanet.addEventListener('click', () => this.navigatePlanet(-1));
      }

      const btnNextPlanet = document.getElementById('btnNextPlanet');
      if (btnNextPlanet) {
        btnNextPlanet.addEventListener('click', () => this.navigatePlanet(1));
      }

      // Dossier tabs
      const tabButtons = document.querySelectorAll('.dossier-tab-btn');
      tabButtons.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabKey = tab.getAttribute('data-tab');
          this.switchDossierTab(tabKey);
        });
      });

      // Mercury Hanging ID Card Modal bindings
      const btnCloseMercury = document.getElementById('btnCloseMercuryId');
      if (btnCloseMercury) {
        btnCloseMercury.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeMercuryIdCard(true);
        });
      }

      const btnMercuryPlanetData = document.getElementById('btnViewMercuryPlanetData');
      if (btnMercuryPlanetData) {
        btnMercuryPlanetData.addEventListener('click', () => {
          this.closeMercuryIdCard(false);
          this.populatePlanetModal('mercury');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      // Venus About Me Modal bindings
      const btnCloseVenus = document.getElementById('btnCloseVenusAbout');
      if (btnCloseVenus) {
        btnCloseVenus.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeVenusAboutModal(true);
        });
      }

      const btnSheetBack = document.getElementById('btnSheetBackArrow');
      if (btnSheetBack) {
        btnSheetBack.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeVenusAboutModal(true);
        });
      }

      const btnSheetClose = document.getElementById('btnSheetCloseBottom');
      if (btnSheetClose) {
        btnSheetClose.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeVenusAboutModal(true);
        });
      }

      const btnVenusPlanetData = document.getElementById('btnViewVenusPlanetData');
      if (btnVenusPlanetData) {
        btnVenusPlanetData.addEventListener('click', () => {
          this.closeVenusAboutModal(false);
          this.populatePlanetModal('venus');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      // Backdrop click on Venus modal to close
      const venusModal = document.getElementById('venusAboutModal');
      if (venusModal) {
        venusModal.addEventListener('click', (e) => {
          if (e.target === venusModal) {
            this.closeVenusAboutModal(true);
          }
        });
      }

      // Earth 3D Project Book Modal bindings
      const btnCloseEarth = document.getElementById('btnCloseEarthBook');
      if (btnCloseEarth) {
        btnCloseEarth.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeEarthBookModal(true);
        });
      }

      const btnEarthPlanetData = document.getElementById('btnViewEarthPlanetData');
      if (btnEarthPlanetData) {
        btnEarthPlanetData.addEventListener('click', () => {
          this.closeEarthBookModal(false);
          this.populatePlanetModal('earth');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      const btnPrevPage = document.getElementById('btnPrevPage');
      if (btnPrevPage) {
        btnPrevPage.addEventListener('click', () => this.flipBookPrev());
      }

      const btnNextPage = document.getElementById('btnNextPage');
      if (btnNextPage) {
        btnNextPage.addEventListener('click', () => this.flipBookNext());
      }

      const btnEarthAutoFlip = document.getElementById('btnEarthAutoFlip');
      if (btnEarthAutoFlip) {
        btnEarthAutoFlip.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.toggleAutoFlip();
        });
      }

      const btnRestart = document.getElementById('btnRestartBook');
      if (btnRestart) {
        btnRestart.addEventListener('click', () => this.flipBookTo(0));
      }

      const btnBackCoverRestart = document.getElementById('btnBackCoverRestart');
      if (btnBackCoverRestart) {
        btnBackCoverRestart.addEventListener('click', () => this.flipBookTo(0));
      }

      const btnBackCoverClose = document.getElementById('btnBackCoverClose');
      if (btnBackCoverClose) {
        btnBackCoverClose.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeEarthBookModal(true);
        });
      }

      // Click on any book leaf to flip forward or backward
      document.querySelectorAll('.book-leaf').forEach((leaf) => {
        leaf.addEventListener('click', (e) => {
          if (e.target.closest('a') || e.target.closest('button')) return;
          const leafIdx = parseInt(leaf.getAttribute('data-leaf'), 10);
          if (isNaN(leafIdx)) return;
          if (leafIdx < this.currentBookLeaf) {
            this.flipBookTo(leafIdx);
          } else {
            this.flipBookTo(leafIdx + 1);
          }
        });
      });

      // Table of Contents jump links
      document.querySelectorAll('.toc-item').forEach(item => {
        item.addEventListener('click', () => {
          const target = parseInt(item.getAttribute('data-goto'), 10);
          if (!isNaN(target)) this.flipBookTo(target);
        });
      });

      // Page Indicator Pills click
      document.querySelectorAll('.page-pill').forEach((pill, idx) => {
        pill.addEventListener('click', () => this.flipBookTo(idx));
      });

      // Mars Academic Archives & 3D Education Button Bindings
      const btnCloseMars = document.getElementById('btnCloseMarsModal');
      if (btnCloseMars) {
        btnCloseMars.addEventListener('click', () => {
          this.audio.playSelectBlip();
          this.closeMarsModal(true);
        });
      }

      const btnMarsPlanetData = document.getElementById('btnViewMarsPlanetData');
      if (btnMarsPlanetData) {
        btnMarsPlanetData.addEventListener('click', () => {
          this.closeMarsModal(false);
          this.populatePlanetModal('mars');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      // 3D Center Button: MY EDUCATION
      const btnMarsMyEdu = document.getElementById('btnMarsMyEducation');
      const marsEduTimeline = document.getElementById('marsEducationTimeline');
      if (btnMarsMyEdu && marsEduTimeline) {
        btnMarsMyEdu.addEventListener('click', () => {
          const willOpen = !marsEduTimeline.classList.contains('is-visible');
          if (willOpen) {
            marsEduTimeline.classList.add('is-visible');
            btnMarsMyEdu.classList.add('is-active');
            btnMarsMyEdu.setAttribute('aria-expanded', 'true');
            const sub = btnMarsMyEdu.querySelector('.mars-3d-btn-sub');
            if (sub) sub.textContent = 'CLOSE';
            this.audio.playScanTelemetry();
          } else {
            marsEduTimeline.classList.remove('is-visible');
            btnMarsMyEdu.classList.remove('is-active');
            btnMarsMyEdu.setAttribute('aria-expanded', 'false');
            const sub = btnMarsMyEdu.querySelector('.mars-3d-btn-sub');
            if (sub) sub.textContent = 'TIMELINE';
            this.audio.playClick();
          }
        });
      }

      // Close button inside the Left Timeline card
      const btnCloseTimeline = document.getElementById('btnCloseMarsTimeline');
      if (btnCloseTimeline && marsEduTimeline && btnMarsMyEdu) {
        btnCloseTimeline.addEventListener('click', () => {
          marsEduTimeline.classList.remove('is-visible');
          btnMarsMyEdu.classList.remove('is-active');
          btnMarsMyEdu.setAttribute('aria-expanded', 'false');
          const sub = btnMarsMyEdu.querySelector('.mars-3d-btn-sub');
          if (sub) sub.textContent = 'TIMELINE';
          this.audio.playClick();
        });
      }

      const marsModal = document.getElementById('marsModal');
      if (marsModal) {
        marsModal.addEventListener('click', (e) => {
          if (e.target === marsModal) {
            this.closeMarsModal(true);
          }
        });
      }

      // Jupiter 3D Roadmap Modal Listeners
      const btnCloseJupiter = document.getElementById('btnCloseJupiterModal');
      if (btnCloseJupiter) {
        const handleCloseJupiter = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (this.audio && typeof this.audio.playSelectBlip === 'function') {
            try { this.audio.playSelectBlip(); } catch (err) {}
          }
          this.closeJupiterRoadmapModal(true);
        };
        btnCloseJupiter.addEventListener('click', handleCloseJupiter);
        btnCloseJupiter.addEventListener('pointerdown', (e) => e.stopPropagation());
      }

      const btnJupViewSpecs = document.getElementById('btnJupiterViewSpecs');
      if (btnJupViewSpecs) {
        btnJupViewSpecs.addEventListener('click', () => {
          this.closeJupiterRoadmapModal(false);
          this.populatePlanetModal('jupiter');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      const jupiterModal = document.getElementById('jupiterRoadmapModal');
      if (jupiterModal) {
        jupiterModal.addEventListener('click', (e) => {
          if (e.target === jupiterModal) {
            this.closeJupiterRoadmapModal(true);
          }
        });
      }

      // Uranus 3D Interactive Laptop Modal Listeners
      const btnCloseUranus = document.getElementById('btnCloseUranusModal');
      if (btnCloseUranus) {
        const handleCloseUranus = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (this.audio && typeof this.audio.playSelectBlip === 'function') {
            try { this.audio.playSelectBlip(); } catch (err) {}
          }
          this.closeUranusResumeModal(true);
        };
        btnCloseUranus.addEventListener('click', handleCloseUranus);
        btnCloseUranus.addEventListener('pointerdown', (e) => e.stopPropagation());
      }

      const btnUranusSpecs = document.getElementById('btnViewUranusPlanetData');
      if (btnUranusSpecs) {
        btnUranusSpecs.addEventListener('click', () => {
          this.closeUranusResumeModal(false);
          this.populatePlanetModal('uranus');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      const uranusModal = document.getElementById('uranusResumeModal');
      if (uranusModal) {
        uranusModal.addEventListener('click', (e) => {
          if (e.target === uranusModal) {
            this.closeUranusResumeModal(true);
          }
        });
      }

      // Saturn 3D Hanging Certificates Modal Listeners
      const btnCloseSaturn = document.getElementById('btnCloseSaturnModal');
      if (btnCloseSaturn) {
        const handleCloseSaturn = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (this.audio && typeof this.audio.playSelectBlip === 'function') {
            try { this.audio.playSelectBlip(); } catch (err) {}
          }
          this.closeSaturnCertificatesModal(true);
        };
        btnCloseSaturn.addEventListener('click', handleCloseSaturn);
        btnCloseSaturn.addEventListener('pointerdown', (e) => e.stopPropagation());
      }

      const btnSaturnSpecs = document.getElementById('btnViewSaturnPlanetData');
      if (btnSaturnSpecs) {
        btnSaturnSpecs.addEventListener('click', () => {
          this.closeSaturnCertificatesModal(false);
          this.populatePlanetModal('saturn');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      const saturnModal = document.getElementById('saturnCertificatesModal');
      if (saturnModal) {
        saturnModal.addEventListener('click', (e) => {
          if (e.target === saturnModal) {
            this.closeSaturnCertificatesModal(true);
          }
        });
      }

      // Neptune Subspace Nexus Modal Listeners
      const btnCloseNeptune = document.getElementById('btnCloseNeptuneModal');
      if (btnCloseNeptune) {
        const handleCloseNeptune = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (this.audio && typeof this.audio.playSelectBlip === 'function') {
            try { this.audio.playSelectBlip(); } catch (err) {}
          }
          this.closeNeptuneLinksModal(true);
        };
        btnCloseNeptune.addEventListener('click', handleCloseNeptune);
        btnCloseNeptune.addEventListener('pointerdown', (e) => e.stopPropagation());
      }

      const btnNeptuneSpecs = document.getElementById('btnViewNeptunePlanetData');
      if (btnNeptuneSpecs) {
        btnNeptuneSpecs.addEventListener('click', () => {
          this.closeNeptuneLinksModal(false);
          this.populatePlanetModal('neptune');
          const modal = document.getElementById('planetModal');
          if (modal && typeof modal.showModal === 'function') {
            if (!modal.open) modal.showModal();
            modal.classList.add('is-open');
          }
        });
      }

      const neptuneModal = document.getElementById('neptuneLinksModal');
      if (neptuneModal) {
        neptuneModal.addEventListener('click', (e) => {
          if (e.target === neptuneModal) {
            this.closeNeptuneLinksModal(true);
          }
        });
      }

      // Keyboard Controls (Page Turning & ESC)
      window.addEventListener('keydown', (e) => {
        const eBookModal = document.getElementById('earthBookModal');
        if (eBookModal && eBookModal.classList.contains('is-open')) {
          if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            this.flipBookNext();
            return;
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.flipBookPrev();
            return;
          }
          if (e.key === 'Escape') {
            this.closeEarthBookModal(true);
            return;
          }
        }

        if (e.key === 'Escape') {
          const nval = document.getElementById('neptuneLinksModal');
          if (nval && nval.classList.contains('is-open')) {
            this.closeNeptuneLinksModal(true);
            return;
          }
          const sM = document.getElementById('saturnCertificatesModal');
          if (sM && sM.classList.contains('is-open')) {
            this.closeSaturnCertificatesModal(true);
            return;
          }
          const uM = document.getElementById('uranusResumeModal');
          if (uM && uM.classList.contains('is-open')) {
            this.closeUranusResumeModal(true);
            return;
          }
          const jupM = document.getElementById('jupiterRoadmapModal');
          if (jupM && jupM.classList.contains('is-open')) {
            this.closeJupiterRoadmapModal(true);
            return;
          }
          const marsM = document.getElementById('marsModal');
          if (marsM && marsM.classList.contains('is-open')) {
            this.closeMarsModal(true);
            return;
          }
          const vModal = document.getElementById('venusAboutModal');
          if (vModal && vModal.classList.contains('is-open')) {
            this.closeVenusAboutModal(true);
            return;
          }
          const mModal = document.getElementById('mercuryIdModal');
          if (mModal && mModal.classList.contains('is-open')) {
            this.closeMercuryIdCard(true);
            return;
          }
        }
      });

      // Interactive 3D Parallax Tilt for the Hanging ID Card
      const cardHolder = document.getElementById('idCardHolder');
      const cardGlare = document.getElementById('idCardGlare');
      const mercuryModal = document.getElementById('mercuryIdModal');

      if (mercuryModal && cardHolder) {
        mercuryModal.addEventListener('pointermove', (e) => {
          if (!mercuryModal.classList.contains('is-open')) return;
          const rect = cardHolder.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;

          const rx = (dy / (window.innerHeight * 0.5)) * -16;
          const ry = (dx / (window.innerWidth * 0.5)) * 20;

          cardHolder.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

          if (cardGlare) {
            const gx = ((e.clientX - rect.left) / rect.width) * 100;
            const gy = ((e.clientY - rect.top) / rect.height) * 100;
            cardGlare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)`;
          }
        });

        mercuryModal.addEventListener('pointerleave', () => {
          cardHolder.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      }
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      const aspect = width / height;
      this.camera.aspect = aspect;
      this.updateCameraForAspect(aspect);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    onPointerMove(event) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const id = hit.userData.id;
        if (this.hoveredBody !== id) {
          this.hoveredBody = id;
          document.body.style.cursor = 'pointer';
          this.audio.playSelectBlip();
          this.highlightTag(id, true);
        }
      } else {
        if (this.hoveredBody) {
          this.highlightTag(this.hoveredBody, false);
          this.hoveredBody = null;
          document.body.style.cursor = 'default';
        }
      }
    }

    highlightTag(id, isHovered) {
      const tag = this.labelElements[id];
      if (tag) tag.classList.toggle('is-hovered', isHovered);
    }

    onPointerClick(event) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes);

      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        this.selectPlanet(id);
      }
    }

    openMercuryIdCard() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeNeptuneLinksModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('mercuryIdModal');
      const video = document.getElementById('mercuryBgVideo');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
      this.audio.playCardClink();
    }

    closeMercuryIdCard(shouldResetCamera = true) {
      const modal = document.getElementById('mercuryIdModal');
      const video = document.getElementById('mercuryBgVideo');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (video) {
        video.pause();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    openVenusAboutModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeNeptuneLinksModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('venusAboutModal');
      const video = document.getElementById('venusBgVideo');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
      this.audio.playScanTelemetry();
    }

    closeVenusAboutModal(shouldResetCamera = true) {
      const modal = document.getElementById('venusAboutModal');
      const video = document.getElementById('venusBgVideo');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (video) {
        video.pause();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    // ==========================================
    // EARTH 3D FLIPPABLE PROJECT BOOK CONTROLLER
    // ==========================================
    openEarthBookModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeNeptuneLinksModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('earthBookModal');
      const video = document.getElementById('earthBgVideo');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }

      this.updateBookState();
      this.audio.playPageFlip();
    }

    closeEarthBookModal(shouldResetCamera = true) {
      if (this.isAutoFlipping) {
        this.toggleAutoFlip();
      }
      const modal = document.getElementById('earthBookModal');
      const video = document.getElementById('earthBgVideo');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (video) {
        video.pause();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    // ==========================================
    // MARS ACADEMIC ARCHIVES & EDUCATION HUB
    // ==========================================
    openMarsModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeNeptuneLinksModal(false);

      // Set Mars background video playing on scene layer
      this.setMarsSceneBackground(true);

      const modal = document.getElementById('marsModal');
      const video = document.getElementById('marsBgVideo');
      const marsEduTimeline = document.getElementById('marsEducationTimeline');
      const btnMarsMyEdu = document.getElementById('btnMarsMyEducation');

      // Reset timeline to initial closed state so the 3D button is at the center
      if (marsEduTimeline) {
        marsEduTimeline.classList.remove('is-visible');
      }
      if (btnMarsMyEdu) {
        btnMarsMyEdu.classList.remove('is-active');
        btnMarsMyEdu.setAttribute('aria-expanded', 'false');
        const sub = btnMarsMyEdu.querySelector('.mars-3d-btn-sub');
        if (sub) sub.textContent = 'TIMELINE';
      }

      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => { });
      }
      this.audio.playScanTelemetry();
    }

    closeMarsModal(shouldResetCamera = true) {
      const modal = document.getElementById('marsModal');
      const video = document.getElementById('marsBgVideo');
      const marsEduTimeline = document.getElementById('marsEducationTimeline');
      const btnMarsMyEdu = document.getElementById('btnMarsMyEducation');

      if (marsEduTimeline) {
        marsEduTimeline.classList.remove('is-visible');
      }
      if (btnMarsMyEdu) {
        btnMarsMyEdu.classList.remove('is-active');
        btnMarsMyEdu.setAttribute('aria-expanded', 'false');
        const sub = btnMarsMyEdu.querySelector('.mars-3d-btn-sub');
        if (sub) sub.textContent = 'TIMELINE';
      }

      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (video) {
        video.pause();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        this.setMarsSceneBackground(false);
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    // ==========================================
    // JUPITER 3D INTERACTIVE WINDING ROADMAP
    // ==========================================
    openJupiterRoadmapModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('jupiterRoadmapModal');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }

      // Initialize or start 3D Winding Roadmap Engine
      if (!this.jupiterRoadmap3D) {
        const container = document.getElementById('jupiterRoadmapCanvasWrapper');
        const canvas = document.getElementById('jupiterRoadmapCanvas');
        if (container && canvas) {
          this.jupiterRoadmap3D = new JupiterRoadmap3D(container, canvas, this.audio);
        }
      }

      if (this.jupiterRoadmap3D) {
        this.jupiterRoadmap3D.start();
      }

      this.audio.playScanTelemetry();
    }

    closeJupiterRoadmapModal(shouldResetCamera = true) {
      const modal = document.getElementById('jupiterRoadmapModal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (this.jupiterRoadmap3D) {
        this.jupiterRoadmap3D.stop();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    // ==========================================
    // URANUS 3D INTERACTIVE LAPTOP RESUME MODAL
    // ==========================================
    openUranusResumeModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeNeptuneLinksModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('uranusResumeModal');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }

      // Initialize or start 3D Laptop Resume Engine
      if (!this.uranusLaptop3D) {
        const container = document.getElementById('uranusLaptopCanvasWrapper');
        const canvas = document.getElementById('uranusLaptopCanvas');
        if (container && canvas) {
          this.uranusLaptop3D = new UranusLaptop3D(container, canvas, this.audio);
        }
      }

      if (this.uranusLaptop3D) {
        this.uranusLaptop3D.start();
      }

      this.audio.playScanTelemetry();
    }

    closeUranusResumeModal(shouldResetCamera = true) {
      const modal = document.getElementById('uranusResumeModal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (this.uranusLaptop3D) {
        this.uranusLaptop3D.stop();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    // ==========================================
    // SATURN 3D HANGING CERTIFICATES VAULT MODAL
    // ==========================================
    openSaturnCertificatesModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('saturnCertificatesModal');
      const video = document.getElementById('saturnBgVideo');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }

      // Initialize or start 3D Hanging Certificates Engine
      if (!this.saturnCertificates3D) {
        if (modal) {
          this.saturnCertificates3D = new SaturnCertificates3D(modal, this.audio);
        }
      }

      if (this.saturnCertificates3D) {
        this.saturnCertificates3D.start();
      }

      this.audio.playScanTelemetry();
    }

    closeSaturnCertificatesModal(shouldResetCamera = true) {
      const modal = document.getElementById('saturnCertificatesModal');
      const video = document.getElementById('saturnBgVideo');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (video) {
        video.pause();
      }
      if (this.saturnCertificates3D) {
        this.saturnCertificates3D.stop();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    // ==========================================
    // NEPTUNE SUBSPACE NEXUS & COMMS DIRECTORY MODAL
    // ==========================================
    openNeptuneLinksModal() {
      // Close standard planet modal if open
      const pModal = document.getElementById('planetModal');
      if (pModal && pModal.open) {
        pModal.classList.remove('is-open');
        pModal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeUranusResumeModal(false);
      this.setMarsSceneBackground(false);

      const modal = document.getElementById('neptuneLinksModal');
      const video = document.getElementById('neptuneBgVideo');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }

      // Initialize or start Neptune Subspace Nexus Engine
      if (!this.neptuneNexus3D) {
        if (modal) {
          this.neptuneNexus3D = new NeptuneNexus3D(modal, this.audio);
        }
      }

      if (this.neptuneNexus3D) {
        this.neptuneNexus3D.start();
      }

      this.audio.playScanTelemetry();
    }

    closeNeptuneLinksModal(shouldResetCamera = true) {
      const modal = document.getElementById('neptuneLinksModal');
      const video = document.getElementById('neptuneBgVideo');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (video) {
        video.pause();
      }
      if (this.neptuneNexus3D) {
        this.neptuneNexus3D.stop();
      }
      if (shouldResetCamera) {
        this.selectedBodyId = null;
        document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
        this.resetToDiagramView();
      }
    }

    setMarsSceneBackground(active) {
      const sceneBg = document.getElementById('solarMarsBgLayer');
      const sceneVid = document.getElementById('solarMarsBgVideo');
      if (sceneBg) {
        sceneBg.classList.toggle('is-active', active);
      }
      if (sceneVid) {
        if (active) {
          sceneVid.play().catch(() => {});
        } else {
          sceneVid.pause();
        }
      }
    }

    flipBookNext() {
      if (this.currentBookLeaf < this.totalBookLeaves) {
        this.currentBookLeaf++;
        this.audio.playPageFlip();
        this.updateBookState();
      }
    }

    flipBookPrev() {
      if (this.currentBookLeaf > 0) {
        this.currentBookLeaf--;
        this.audio.playPageFlip();
        this.updateBookState();
      }
    }

    flipBookTo(targetLeaf) {
      if (targetLeaf >= 0 && targetLeaf <= this.totalBookLeaves) {
        this.currentBookLeaf = targetLeaf;
        this.audio.playPageFlip();
        this.updateBookState();
      }
    }

    toggleAutoFlip() {
      this.isAutoFlipping = !this.isAutoFlipping;
      const btn = document.getElementById('btnEarthAutoFlip');
      if (btn) {
        btn.classList.toggle('is-active', this.isAutoFlipping);
        const icon = btn.querySelector('.ctrl-icon');
        const text = btn.querySelector('.btn-text');
        if (icon) icon.textContent = this.isAutoFlipping ? '❚❚' : '▶';
        if (text) text.textContent = this.isAutoFlipping ? 'Pause' : 'Auto-Flip';
      }

      if (this.isAutoFlipping) {
        this.autoFlipTimer = setInterval(() => {
          if (this.currentBookLeaf >= this.totalBookLeaves) {
            this.flipBookTo(0);
          } else {
            this.flipBookNext();
          }
        }, 4200);
      } else {
        if (this.autoFlipTimer) {
          clearInterval(this.autoFlipTimer);
          this.autoFlipTimer = null;
        }
      }
    }

    updateBookState() {
      const leaves = document.querySelectorAll('.book-leaf');
      const N = leaves.length;
      leaves.forEach((leaf) => {
        const idx = parseInt(leaf.getAttribute('data-leaf'), 10);
        if (idx < this.currentBookLeaf) {
          leaf.classList.add('is-flipped');
          leaf.style.zIndex = idx + 1;
          leaf.style.transform = `rotateY(-180deg) translateZ(${idx * 2}px)`;
        } else {
          leaf.classList.remove('is-flipped');
          leaf.style.zIndex = N - idx;
          leaf.style.transform = `rotateY(0deg) translateZ(${(N - idx) * 2}px)`;
        }
      });

      // Update Prev / Next button states
      const btnPrev = document.getElementById('btnPrevPage');
      const btnNext = document.getElementById('btnNextPage');
      if (btnPrev) btnPrev.disabled = (this.currentBookLeaf === 0);
      if (btnNext) btnNext.disabled = (this.currentBookLeaf === this.totalBookLeaves);

      // Page Labels
      const labels = [
        'Cover: Terra Archives',
        'Spread 1: Lumora & NeuralCanvas (P. 02–03)',
        'Spread 2: AeroVision & ApexFlow (P. 04–05)',
        'Spread 3: Chronos & Back Cover (P. 06)',
        'Epilogue: End of Volume I'
      ];
      const pageLabelEl = document.getElementById('bookPageLabel');
      if (pageLabelEl) {
        pageLabelEl.textContent = labels[this.currentBookLeaf] || `Page ${this.currentBookLeaf}`;
      }

      // Update pills
      document.querySelectorAll('.page-pill').forEach((pill) => {
        const pillIdx = parseInt(pill.getAttribute('data-leaf-idx'), 10);
        pill.classList.toggle('active', pillIdx === this.currentBookLeaf);
      });
    }

    selectPlanet(planetId) {
      if (!PLANET_DATA[planetId]) return;
      this.selectedBodyId = planetId;
      const item = this.planets[planetId];
      if (!item) return;

      this.audio.playScanTelemetry();

      // Smooth camera transition to target planet
      const worldPos = new THREE.Vector3();
      item.group.getWorldPosition(worldPos);

      // Distance offset scaled to planet radius
      const camOffsetDist = Math.max(item.spec.radius * 3.4, 38);
      this.cameraTargetLook.copy(worldPos);
      this.cameraTargetPos.set(
        worldPos.x + camOffsetDist * 0.7,
        worldPos.y + camOffsetDist * 0.45,
        worldPos.z + camOffsetDist * 0.85
      );
      this.isFocusingCamera = true;

      // Update bottom dock active state
      document.querySelectorAll('.planet-dock-item').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-planet') === planetId);
      });

      // Special Hanging ID Card for Mercury!
      if (planetId === 'mercury') {
        this.openMercuryIdCard();
        return;
      }

      // Special About Me Editorial Sheet for Venus!
      if (planetId === 'venus') {
        this.openVenusAboutModal();
        return;
      }

      // Special 3D Flippable Project Book for Earth!
      if (planetId === 'earth') {
        this.openEarthBookModal();
        return;
      }

      // Special Crimson Frontier Expedition Hub for Mars!
      if (planetId === 'mars') {
        this.openMarsModal();
        return;
      }

      // Special 3D Winding Roadmap for Jupiter!
      if (planetId === 'jupiter') {
        this.openJupiterRoadmapModal();
        return;
      }

      // Special 3D Glassmorphism Certificates Vault for Saturn!
      if (planetId === 'saturn') {
        this.openSaturnCertificatesModal();
        return;
      }

      // Special 3D Laptop & Floating Resume for Uranus!
      if (planetId === 'uranus') {
        this.openUranusResumeModal();
        return;
      }

      // Special Subspace Nexus & Important Links for Neptune!
      if (planetId === 'neptune') {
        this.openNeptuneLinksModal();
        return;
      }

      // Close custom modals if opening another planet
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.setMarsSceneBackground(false);

      // Populate & open Planet Dossier Modal for other bodies
      this.populatePlanetModal(planetId);
      const modal = document.getElementById('planetModal');
      if (modal && typeof modal.showModal === 'function') {
        if (!modal.open) modal.showModal();
        modal.classList.add('is-open');
      }
    }

    populatePlanetModal(planetId) {
      const data = PLANET_DATA[planetId];
      if (!data) return;

      document.getElementById('modalPlanetSymbol').textContent = data.symbol;
      document.getElementById('modalPlanetName').textContent = data.name;
      document.getElementById('modalPlanetTitle').textContent = data.title;
      document.getElementById('modalPlanetCategory').textContent = data.category;
      document.getElementById('modalDistance').textContent = data.distance;

      // Vital Specs Grid
      document.getElementById('specDiameter').textContent = data.diameter;
      document.getElementById('specMass').textContent = data.mass;
      document.getElementById('specGravity').textContent = data.gravity;
      document.getElementById('specTemp').textContent = data.surfaceTemp;
      document.getElementById('specRotation').textContent = data.rotationPeriod;
      document.getElementById('specOrbit').textContent = data.orbitalPeriod;
      document.getElementById('specMoons').textContent = data.moons;
      document.getElementById('specDistanceKm').textContent = data.distanceKm;

      // Tab: Overview
      document.getElementById('dossierOverviewText').textContent = data.overview;
      document.getElementById('dossierDiscoveryText').textContent = data.discovery;

      // Tab: Atmosphere Bars
      const atmoContainer = document.getElementById('dossierAtmoList');
      atmoContainer.innerHTML = '';
      data.atmosphere.forEach(gas => {
        const row = document.createElement('div');
        row.className = 'atmo-bar-row';
        row.innerHTML = `
          <div class="atmo-bar-label">
            <span>${gas.name}</span>
            <span class="atmo-bar-val">${gas.percent}%</span>
          </div>
          <div class="atmo-bar-track">
            <div class="atmo-bar-fill" style="width: ${Math.min(gas.percent, 100)}%;"></div>
          </div>
        `;
        atmoContainer.appendChild(row);
      });

      // Tab: Missions
      const missionContainer = document.getElementById('dossierMissionsList');
      missionContainer.innerHTML = '';
      data.missions.forEach(m => {
        const card = document.createElement('div');
        card.className = 'mission-card';
        card.innerHTML = `
          <div class="mission-header">
            <h4 class="mission-name">${m.name}</h4>
            <span class="mission-year">${m.year}</span>
          </div>
          <p class="mission-desc">${m.desc}</p>
        `;
        missionContainer.appendChild(card);
      });

      // Tab: Cadet Field Notes
      const notesContainer = document.getElementById('dossierCadetNotes');
      notesContainer.innerHTML = '';
      data.cadetNotes.forEach((note, idx) => {
        const li = document.createElement('li');
        li.className = 'cadet-note-item';
        li.innerHTML = `
          <span class="note-num">LOG #${idx + 1}</span>
          <p>${note}</p>
        `;
        notesContainer.appendChild(li);
      });

      // Reset to overview tab
      this.switchDossierTab('overview');
    }

    switchDossierTab(tabKey) {
      this.activeTab = tabKey;
      document.querySelectorAll('.dossier-tab-btn').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-tab') === tabKey);
      });
      document.querySelectorAll('.dossier-tab-panel').forEach(p => {
        p.classList.toggle('is-active', p.getAttribute('id') === `panel-${tabKey}`);
      });
      this.audio.playSelectBlip();
    }

    navigatePlanet(direction) {
      if (!this.selectedBodyId) {
        this.selectPlanet('sun');
        return;
      }
      const currIdx = BODY_KEYS.indexOf(this.selectedBodyId);
      const nextIdx = (currIdx + direction + BODY_KEYS.length) % BODY_KEYS.length;
      this.selectPlanet(BODY_KEYS[nextIdx]);
    }

    closePlanetModal() {
      const modal = document.getElementById('planetModal');
      if (modal) {
        modal.classList.remove('is-open');
        if (modal.open) modal.close();
      }
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.setMarsSceneBackground(false);
      this.selectedBodyId = null;
      document.querySelectorAll('.planet-dock-item').forEach(b => b.classList.remove('is-active'));
      this.resetToDiagramView();
    }

    resetToDiagramView() {
      this.closeMercuryIdCard(false);
      this.closeVenusAboutModal(false);
      this.closeEarthBookModal(false);
      this.closeMarsModal(false);
      this.closeJupiterRoadmapModal(false);
      this.closeUranusResumeModal(false);
      this.closeSaturnCertificatesModal(false);
      this.closeNeptuneLinksModal(false);
      this.closeMissionGuideModal();
      this.setMarsSceneBackground(false);
      this.cameraTargetPos.copy(this.diagramCameraPos);
      this.cameraTargetLook.copy(this.diagramCameraLook);
      this.isFocusingCamera = true;
    }

    openMissionGuideModal() {
      const modal = document.getElementById('missionGuideModal');
      const btn = document.getElementById('btnMissionGuide');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        if (typeof modal.showModal === 'function' && !modal.open) {
          try { modal.showModal(); } catch (err) {}
        }
      }
      if (btn) {
        btn.setAttribute('aria-expanded', 'true');
      }
      if (this.audio) {
        try { this.audio.playSelectBlip(); } catch (err) {}
      }
    }

    closeMissionGuideModal() {
      const modal = document.getElementById('missionGuideModal');
      const btn = document.getElementById('btnMissionGuide');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        if (typeof modal.close === 'function' && modal.open) {
          try { modal.close(); } catch (err) {}
        }
      }
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
      }
      if (this.audio) {
        try { this.audio.playSelectBlip(); } catch (err) {}
      }
    }

    toggleMissionGuideModal() {
      const modal = document.getElementById('missionGuideModal');
      if (modal && modal.classList.contains('is-open')) {
        this.closeMissionGuideModal();
      } else {
        this.openMissionGuideModal();
      }
    }

    render(time) {
      const delta = (time - this.lastTime) * 0.001;
      this.lastTime = time;

      // 1. Fixed Rotation Simulation:
      // All planets remain in their parallel horizontal alignment and perform continuous fixed axial rotation
      if (this.isSimulationRunning) {
        const simMultiplier = this.simSpeed;

        this.planetSpecs.forEach(spec => {
          const item = this.planets[spec.id];
          if (!item) return;

          // Continuous fixed axial rotation in place
          item.sphereMesh.rotation.y += spec.rotSpeed * simMultiplier;

          // Planetary position stays fixed along parallel row
          item.group.position.set(spec.x, 0, 0);

          // Realistic Sun corona pulsing & counter-rotation
          if (spec.id === 'sun') {
            if (item.group.userData.corona1Mesh) {
              item.group.userData.corona1Mesh.rotation.y = -time * 0.00035;
              const pulse1 = 1.0 + Math.sin(time * 0.0018) * 0.016;
              item.group.userData.corona1Mesh.scale.set(pulse1, pulse1, pulse1);
            }
            if (item.group.userData.corona2Mesh) {
              item.group.userData.corona2Mesh.rotation.y = time * 0.00022;
              const pulse2 = 1.0 + Math.cos(time * 0.0014) * 0.022;
              item.group.userData.corona2Mesh.scale.set(pulse2, pulse2, pulse2);
            }
            if (item.group.userData.haloMesh) {
              const pulse3 = 1.0 + Math.sin(time * 0.001) * 0.028;
              item.group.userData.haloMesh.scale.set(pulse3, pulse3, pulse3);
            }
          }

          // Earth independent atmospheric cloud circulation
          if (spec.id === 'earth' && item.group.userData.cloudMesh) {
            item.group.userData.cloudMesh.rotation.y += (spec.rotSpeed * 1.32) * simMultiplier;
          }

          // Moon continuous 3D orbit around Earth with tidal synchronous rotation
          if (spec.hasMoon && item.group.userData.moonMesh) {
            const m = item.group.userData.moonMesh;
            const moonSpeed = time * 0.0022 * simMultiplier;
            const moonDist = spec.radius + 18;
            m.position.x = Math.cos(moonSpeed) * moonDist;
            m.position.z = Math.sin(moonSpeed) * moonDist;
            m.rotation.y += 0.008;
          }
        });
      }

      // 2. Smooth Camera Lerp when focusing or resetting
      if (this.isFocusingCamera) {
        this.camera.position.lerp(this.cameraTargetPos, 0.065);
        if (this.controls) {
          this.controls.target.lerp(this.cameraTargetLook, 0.065);
          this.controls.update();
        }
        if (this.camera.position.distanceTo(this.cameraTargetPos) < 1.2) {
          this.isFocusingCamera = false;
        }
      } else if (this.controls) {
        this.controls.update();
      }

      // 3. Update HUD Billboard Labels
      this.updateDomLabels();

      // 4. Subtle starfield twinkling
      if (this.starField) {
        this.starField.rotation.y = time * 0.00003;
      }

      // 5. Render Scene
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render.bind(this));
    }
  }

  // Global access to launch sequence & solar system
  window.initSolarSystemApp = () => {
    if (!window.solarAppInstance) {
      window.solarAppInstance = new SolarSystemApp();
    }
    // Ambient space music disabled (click haptics & rocket launch sounds preserved)
  };
})();
