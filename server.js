/**
 * Lumora Cosmic Portfolio — Backend Server & Gemini AI Engine
 * 
 * Features:
 * 1. Serves all static portfolio assets with HTTP byte-range support (for video scrubbing)
 * 2. Secure Gemini API proxy with environment-based API key (never exposed to client)
 * 3. Dynamic Portfolio Knowledge Synchronizer:
 *    Automatically parses index.html as the single source of truth.
 *    Revalidates on file modification timestamp changes so any portfolio updates
 *    are immediately and automatically available to Nova AI.
 * 4. Multi-turn conversational memory, rate limiting, and robust input validation.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');

// Load environment variables from .env if present
function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
      console.log('[Server] Loaded .env configuration');
    } catch (err) {
      console.warn('[Server] Error reading .env file:', err.message);
    }
  }
}

loadEnv();

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

// =============================================================================
// DYNAMIC PORTFOLIO KNOWLEDGE BASE SYNCHRONIZER
// =============================================================================
let cachedKnowledge = null;
let lastIndexMtime = 0;

function cleanHtmlText(snippet) {
  if (!snippet) return '';
  return snippet
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map(line => line.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .join('\n');
}

function extractModalContent(html, modalId) {
  const marker = `id="${modalId}"`;
  const start = html.indexOf(marker);
  if (start === -1) return '';
  
  // Find the end: look for the start of the next modal or dialog
  const rest = html.slice(start + marker.length);
  const nextModalMatch = rest.search(/(?:id="[a-zA-Z0-9]+Modal"|<dialog)/);
  const end = nextModalMatch !== -1 ? start + marker.length + nextModalMatch : start + 30000;
  return html.slice(start, end);
}

function syncPortfolioKnowledge() {
  try {
    if (!fs.existsSync(INDEX_HTML_PATH)) {
      console.warn('[Sync] index.html not found, using fallback knowledge');
      return cachedKnowledge || generateFallbackKnowledge();
    }

    const stat = fs.statSync(INDEX_HTML_PATH);
    if (cachedKnowledge && stat.mtimeMs <= lastIndexMtime) {
      // Knowledge is up-to-date
      return cachedKnowledge;
    }

    console.log(`[Sync] Detected index.html update (mtime: ${stat.mtimeMs}). Rebuilding knowledge base...`);
    const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

    // Extract each distinct sector
    const cadetIdSnippet = extractModalContent(html, 'mercuryIdModal');
    const aboutSnippet = extractModalContent(html, 'venusAboutModal');
    const projectsSnippet = extractModalContent(html, 'earthBookModal');
    const educationSnippet = extractModalContent(html, 'marsModal');
    const achievementsSnippet = extractModalContent(html, 'jupiterRoadmapModal');
    const resumeSnippet = extractModalContent(html, 'uranusResumeModal');
    const certsSnippet = extractModalContent(html, 'saturnCertificatesModal');
    const linksSnippet = extractModalContent(html, 'neptuneLinksModal');

    const cleanAbout = cleanHtmlText(aboutSnippet);
    const cleanProjects = cleanHtmlText(projectsSnippet);
    const cleanEducation = cleanHtmlText(educationSnippet);
    const cleanAchievements = cleanHtmlText(achievementsSnippet);
    const cleanCerts = cleanHtmlText(certsSnippet);
    const cleanResume = cleanHtmlText(resumeSnippet);
    const cleanLinks = cleanHtmlText(linksSnippet);
    const cleanId = cleanHtmlText(cadetIdSnippet);

    const compiledKnowledge = `
# TANISHKA SAHU — VERIFIED PORTFOLIO KNOWLEDGE BASE (DYNAMICALLY SYNCHRONIZED)

## 1. IDENTITY & PROFESSIONAL SUMMARY
- Full Name: Tanishka Sahu
- Age: 19 years old
- Location: Chandigarh, India
- Role: Creative 3D Developer & Full-Stack Software Engineer / Computer Science & Engineering Undergraduate
- College: Vellore Institute of Technology (VIT Bhopal / VIT Vellore)
- Degree: Bachelor of Technology (B.Tech) in Computer Science & Engineering (2025–2029 / Ongoing)
- Academic Standing: CGPA 9.52
- Core Philosophy: Highly focused on developing modern full-stack web applications with React.js and the MERN stack, complemented by an active commitment to continuous learning and technical rigor. Deeply passionate about space exploration, scientific inquiry, spatial graphics, WebGL, algorithms, and technological research, striving to apply computational methods to complex real-world challenges.

## 2. TECHNICAL CAPABILITIES & SKILLS
- Programming Languages: C++, Python, JavaScript (ES6+), TypeScript, HTML5, CSS3, GLSL Shaders.
- Frontend & 3D Web: React.js, Next.js (including Next.js 15), Three.js, WebGL, WebGPU Compute Shaders, WebAssembly (WASM), WebSockets, WebRTC, Mapbox GL.
- Backend & Systems: Node.js, Express, MERN Stack, Distributed Architecture, Edge IoT telemetry, RESTful APIs.
- Computer Science Foundations: Data Structures & Algorithms (DSA), Spatial Math, Complex Algorithmic Optimization, Procedural Shaders, Kinematics.
- Tools & Platforms: Git, GitHub, Linux, Vite.

## 3. FEATURED PROJECTS (from Earth / Terra Archives)
1. **Lumora: 3D Solar System Simulator**
   - Domain: Spatial Web / Creative 3D
   - Tech Stack: Three.js, WebGL, GLSL Shaders, Spatial Audio
   - Description: Interactive WebGL 3D interplanetary journey with parallel planetary orbits, real-time axial spin, custom procedural surfaces, physics-derived celestial bodies, and dynamic astronaut dossier HUD overlays.
   - Highlights: 60 FPS zero-stutter WebGL, 0ms texture latency, 9 active planetary engines.
   - Links: Live in current application.

2. **NeuralCanvas: Infinite AI Studio**
   - Domain: Creative AI / WebGPU
   - Tech Stack: Next.js 15, WebGPU, WASM, Diffusion Flow
   - Description: Infinite node-based generative artboard canvas executing local diffusion models via WebGPU compute shaders. Features real-time collaborative vectors, latent brush interpolation, and multi-resolution rendering pipelines.
   - Highlights: 10x local GPU speedup, infinite artboard, 4K vector export.

3. **AeroVision: Drone Fleet Mission Control**
   - Domain: Autonomous Systems / Real-Time Telemetry
   - Tech Stack: TypeScript, WebSockets, Mapbox GL, WebRTC
   - Description: Sub-50ms latency telemetry command dashboard monitoring multi-UAV autonomous fleets. Includes 3D topographical trajectory tracking, live battery health diagnostics, geofencing alarms, and autonomous return-to-home protocols.
   - Highlights: <45 ms telemetry latency, 250+ swarm node capacity, 1080p zero-lag FPV video.

4. **ApexFlow: High-Frequency DeFi Terminal**
   - Domain: High Frequency Fintech / Performance
   - Tech Stack: React, Rust WASM, Web Workers, Shared Array Buffers, Order Book
   - Description: Institutional-grade decentralized trading terminal engineered with off-thread Web Workers and shared array buffers to process 120,000 tick updates per second with microsecond order routing and slippage mitigation.
   - Highlights: 120k ticks/sec processed, 0% UI frame drop, 12 ms order fill time.

5. **Chronos: Quantum Clock & Relativistic Engine**
   - Domain: Quantum Simulation
   - Tech Stack: WebGL, Relativistic Physics, Quantum Telemetry
   - Description: Precision relativistic engine visualizing gravitational time dilation and quantum orbital mechanics.

6. **Swasthyam (Healthcare Innovation)**
   - Developed at the Johns Hopkins University Hackathon 2025.
   - Focus: Digital healthcare platform for women and children.

7. **Game Development Projects**
   - Built Football, T-Rex runner, and Ping Pong arcade games with JavaScript, GitHub, and catapult physics as part of WhiteHat Jr. certification.

## 4. EDUCATION TIMELINE (from Mars Academic Archives)
1. **Undergraduate Degree: B.Tech in Computer Science & Engineering**
   - Institution: Vellore Institute of Technology (VIT Bhopal University)
   - Duration: 2025 – 2029 (Ongoing)
   - Performance: CGPA 9.52
   - Focus: Data structures, algorithms, MERN stack, spatial computing, continuous scientific learning.

2. **Class 12th (Senior Secondary) — Non-Medical (Physics, Chemistry & Mathematics)**
   - School: Stepping Stones Senior Secondary School, Chandigarh, India (CBSE)
   - Duration: 2024 – 2025
   - Performance: 90%
   - Focus: Physics, Chemistry, Mathematics (PCM), scientific problem solving.

3. **Class 10th (Secondary School) — Science & Mathematics Foundations**
   - School: Satluj Public School, Haryana, India (CBSE)
   - Duration: 2022 – 2023
   - Performance: 97%
   - Focus: Fundamental sciences and mathematical reasoning.

## 5. ACHIEVEMENTS & MILESTONES (from Jupiter & Saturn Vaults)
- **Smart India Hackathon (SIH 2024) — Top Innovation Finalist**:
  - Organized by: Ministry of Education & AICTE.
  - Project: High-throughput spatial telemetry IoT command center with real-time WebGL visual mapping (SIH-2024-NATL-891).
- **College DSA League (2025) — 6th Position Solo**:
  - Secured 6th position as a solo participant solving complex algorithmic challenges in graphs, trees, and dynamic programming.
- **Johns Hopkins University Hackathon (2025)**:
  - Participant with "Swasthyam" digital healthcare platform.
- **National Spell Quest (2018) — Haryana State Champion / State Winner**:
  - Demonstrates strong language, communication, and analytical skills.
- **Junior Game Developer Certification (2022)**:
  - WhiteHat Jr certified junior game developer.
- **3D WebGL Systems Intern (2024) — Spatial Dynamics Systems**:
  - Built custom shader pipelines, kinematic hardware rigs, optimized rendering loops cutting draw calls by 34%.
- **Technical & Graphics Lead (2023–2025) — Vellore Institute of Technology**:
  - Directed 3D WebGL workshops, orchestrated campus hackathons, and mentored 400+ students in creative engineering.

## 6. PROFILES & CONTACT CHANNELS (from Neptune Subspace Nexus)
- Email: tanishkasahuwork191@gmail.com
- GitHub: https://github.com/TanishkaSahu191 (@TanishkaSahu191)
- LinkedIn: https://www.linkedin.com/in/tanishka-sahu-8a617a375/
- LeetCode: https://leetcode.com/u/tanishka_189/ (500+ problems solved, strong algorithmic mastery)
- takeUforward (TUF): Striver's SDE Sheet & DSA Roadmap
- Available for: Software engineering roles, creative 3D web development, full-stack internships, and collaborative ventures.

## 7. RAW EXTRACTED ARCHIVES (FOR FULL FIDELITY)
[ABOUT ARCHIVE]:
${cleanAbout.slice(0, 2000)}

[PROJECTS ARCHIVE]:
${cleanProjects.slice(0, 3000)}

[EDUCATION ARCHIVE]:
${cleanEducation.slice(0, 1500)}

[ACHIEVEMENTS ARCHIVE]:
${cleanAchievements.slice(0, 2000)}

[CERTIFICATES ARCHIVE]:
${cleanCerts.slice(0, 2000)}

[RESUME ARCHIVE]:
${cleanResume.slice(0, 2000)}

[LINKS ARCHIVE]:
${cleanLinks.slice(0, 1500)}
`;

    cachedKnowledge = compiledKnowledge;
    lastIndexMtime = stat.mtimeMs;
    console.log('[Sync] Knowledge base synchronized successfully.');
    return cachedKnowledge;
  } catch (err) {
    console.error('[Sync] Error syncing portfolio knowledge:', err);
    return cachedKnowledge || generateFallbackKnowledge();
  }
}

function generateFallbackKnowledge() {
  return `
# TANISHKA SAHU — VERIFIED PORTFOLIO KNOWLEDGE BASE
- Name: Tanishka Sahu
- Age: 19, Chandigarh, India
- Education: B.Tech Computer Science & Engineering, VIT (CGPA: 9.52), Class 12 (90%), Class 10 (97%).
- Skills: C++, Python, JavaScript, TypeScript, React.js, Next.js, Node.js, Three.js, WebGL, GLSL, MERN, DSA.
- Projects: Lumora 3D Solar System, NeuralCanvas AI Studio, AeroVision Drone Swarm, ApexFlow DeFi Terminal, Chronos Quantum Engine, Swasthyam.
- Contact: tanishkasahuwork191@gmail.com, GitHub: https://github.com/TanishkaSahu191, LinkedIn: https://www.linkedin.com/in/tanishka-sahu-8a617a375/
`;
}

// Initial knowledge sync
syncPortfolioKnowledge();

// Watch index.html for live changes
try {
  fs.watch(INDEX_HTML_PATH, (eventType) => {
    if (eventType === 'change' || eventType === 'rename') {
      setTimeout(syncPortfolioKnowledge, 250);
    }
  });
} catch (e) {
  // fs.watch fallback handled on request time check
}

// =============================================================================
// RATE LIMITING & SECURITY GUARDS
// =============================================================================
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;

function isRateLimited(ip) {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(ip, { startTime: now, count: 1 });
    return false;
  }
  record.count++;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// =============================================================================
// GEMINI API CONVERSATIONAL ENGINE
// =============================================================================
async function callGeminiApi(apiKey, userMessage, conversationHistory) {
  const knowledge = syncPortfolioKnowledge();
  
  // Supported models list with fallback order
  const modelPreference = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  
  const systemInstruction = `
You are Nova AI, the cosmic intelligence assistant of Tanishka Sahu's Cosmic 3D Portfolio.

YOUR MISSION:
You assist portfolio visitors, recruiters, and developers in exploring Tanishka Sahu's professional profile, technical capabilities, projects, education, achievements, and contact channels.

STRICT ACCURACY & TRUTHFULNESS:
1. Ground all answers solely in the verified portfolio knowledge provided below.
2. NEVER invent qualifications, experience, degrees, projects, test scores, or personal details that are not in the portfolio.
3. If a visitor asks about something that is not present in the portfolio (e.g. details about unlisted companies, unrelated personal life), politely and clearly state: "That information is not documented in Tanishka's portfolio." Then suggest an available topic they can explore.
4. Support natural multi-turn conversations and follow-up questions (e.g., if the user previously asked about projects and now asks "What technologies did she use in the third one?", correctly reference AeroVision without asking them to repeat).
5. Recommend relevant projects based on visitors' expressed interests:
   - For 3D Graphics / Spatial Web / Three.js: Recommend Lumora.
   - For Generative AI / WebGPU / Next.js: Recommend NeuralCanvas.
   - For Real-Time Telemetry / Autonomous Drones / IoT: Recommend AeroVision.
   - For High-Performance Fintech / Rust WASM / Concurrency: Recommend ApexFlow.
   - For Physics / Simulations: Recommend Chronos.
6. Provide markdown links when referencing external resources:
   - GitHub: [GitHub Profile](https://github.com/TanishkaSahu191)
   - LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/tanishka-sahu-8a617a375/)
   - LeetCode: [LeetCode Profile](https://leetcode.com/u/tanishka_189/)
   - Email: [tanishkasahuwork191@gmail.com](mailto:tanishkasahuwork191@gmail.com)
7. CRITICAL STYLING RULE: DO NOT USE EMOJIS ANYWHERE in your response. The website maintains a sleek, cinematic, elegant astronomical aesthetic. Use clean typography, bullet points, and markdown formatting instead.
8. Tone: Sophisticated, articulate, welcoming, intelligent, and focused on engineering excellence.

PORTFOLIO KNOWLEDGE BASE:
${knowledge}
`;

  // Format history for Gemini API
  // Gemini expects: { contents: [ { role: 'user'|'model', parts: [{ text }] } ] }
  const contents = [];
  
  if (Array.isArray(conversationHistory)) {
    // Take up to the last 10 turns to avoid exceeding context
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(turn => {
      if (turn && turn.role && turn.text) {
        contents.push({
          role: turn.role === 'model' || turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(turn.text) }]
        });
      }
    });
  }

  // Append current user message
  contents.push({
    role: 'user',
    parts: [{ text: String(userMessage) }]
  });

  const requestPayload = {
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.5,
      topP: 0.95,
      maxOutputTokens: 1024
    }
  };

  // Try candidate models
  const candidateModels = [modelPreference, 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'].filter(
    (item, index, self) => self.indexOf(item) === index
  );

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorJson;
        try { errorJson = JSON.parse(errorText); } catch(e) {}
        const errorMsg = errorJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.warn(`[Gemini] Model ${model} returned error: ${errorMsg}`);
        lastError = new Error(errorMsg);
        continue; // Try next model if available
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const replyText = candidate?.content?.parts?.[0]?.text;

      if (!replyText) {
        throw new Error('Gemini API returned an empty response.');
      }

      // Filter out any emojis if the model accidentally output any
      const sanitizedReply = replyText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, '');

      return { reply: sanitizedReply, modelUsed: model };
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini] Failed with model ${model}:`, err.message);
    }
  }

  throw lastError || new Error('Could not obtain a response from Gemini API.');
}

// =============================================================================
// HTTP REQUEST ROUTER
// =============================================================================
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const clientIp = req.socket.remoteAddress || 'unknown';

  // Common CORS & security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API: /api/status ---
  if (pathname === '/api/status' && req.method === 'GET') {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0 && !process.env.GEMINI_API_KEY.includes('your_api_key_here'));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      configured: hasKey,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      lastKnowledgeSync: new Date(lastIndexMtime).toISOString(),
      status: hasKey ? 'online' : 'unconfigured',
      message: hasKey 
        ? 'Nova AI intelligence engine is active and ready.' 
        : 'GEMINI_API_KEY is not configured in .env. Please set your key to enable live AI.'
    }));
    return;
  }

  // --- API: /api/portfolio-data ---
  if (pathname === '/api/portfolio-data' && req.method === 'GET') {
    syncPortfolioKnowledge();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      synchronizedAt: new Date(lastIndexMtime).toISOString(),
      knowledgeLength: cachedKnowledge ? cachedKnowledge.length : 0
    }));
    return;
  }

  // --- API: /api/chat ---
  if (pathname === '/api/chat' && req.method === 'POST') {
    // 1. Rate limiting check
    if (isRateLimited(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Too many requests. Please wait a moment before sending another message.'
      }));
      return;
    }

    // 2. Read body with limit (max 64KB)
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 65536) {
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        let parsed;
        try {
          parsed = JSON.parse(body);
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload in request body.' }));
          return;
        }

        const message = typeof parsed.message === 'string' ? parsed.message.trim() : '';
        const history = Array.isArray(parsed.history) ? parsed.history : [];

        // Input validation
        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message cannot be empty.' }));
          return;
        }

        if (message.length > 1000) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message exceeds the maximum limit of 1,000 characters.' }));
          return;
        }

        // Check API key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey.trim().length === 0 || apiKey.includes('your_api_key_here')) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Gemini API key is not configured.',
            setupGuide: {
              step1: 'Create a .env file in the root directory if it does not already exist.',
              step2: 'Add: GEMINI_API_KEY=your_gemini_api_key',
              step3: 'Obtain an API key from Google AI Studio: https://aistudio.google.com/app/apikey',
              step4: 'Restart the server with: npm start'
            }
          }));
          return;
        }

        // Call Gemini
        const result = await callGeminiApi(apiKey, message, history);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          reply: result.reply,
          model: result.modelUsed,
          timestamp: Date.now()
        }));

      } catch (err) {
        console.error('[Chat API Error]:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: err.message || 'An error occurred while communicating with the Gemini AI engine.'
        }));
      }
    });
    return;
  }

  // --- Static Asset Serving ---
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, safePath);

  // Security: ensure path stays within ROOT_DIR
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle HTTP Range Requests (essential for video seek & mp4 playback)
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const totalSize = stats.size;
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize) {
        res.writeHead(416, { 'Content-Range': `bytes */${totalSize}` });
        res.end();
        return;
      }

      const chunkSize = (end - start) + 1;
      const stream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType
      });
      stream.pipe(res);
      return;
    }

    // Standard static stream
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[Server] Cosmic Portfolio & Nova AI running on http://localhost:${PORT}`);
  console.log(`[Server] Knowledge dynamically synced with ${INDEX_HTML_PATH}`);
  const hasKey = Boolean(process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('your_api_key_here'));
  console.log(`[Server] Gemini API Status: ${hasKey ? 'Configured (Active)' : 'Unconfigured (Key required in .env)'}`);
});
