const PORTFOLIO_KNOWLEDGE = `
# TANISHKA SAHU — VERIFIED PORTFOLIO KNOWLEDGE BASE

## 1. IDENTITY & PROFESSIONAL SUMMARY
- Full Name: Tanishka Sahu
- Headline: Second Year Computer Science & Engineering Undergraduate (B.Tech CSE)
- Institution: Vellore Institute of Technology (VIT Bhopal University), India
- Expected Graduation: 2029 (Batch 2025–2029)
- Academic Standing: CGPA 9.52 / 10.0
- Secondary Education: Class 12 (90% - Physics, Chemistry, Math), Class 10 (97% - Top 1%)
- Location: Chandigarh, India
- Core Competencies: Spatial Computing, 3D WebGL Engines, Full-Stack Architecture, Algorithms & Data Structures (500+ LeetCode), Cloud/IoT Integrations.

## 2. TECHNICAL SKILLS & STACK
- Languages: C++, Python, TypeScript, JavaScript, SQL, HTML5, CSS3, GLSL.
- 3D & Creative Engineering: Three.js, React Three Fiber, WebGL, Shaders (GLSL), Spatial Audio.
- Frontend Frameworks: React.js (React 18 & 19), Next.js, Vite, Tailwind CSS v4.
- Backend & Systems: Node.js, Express.js, REST APIs, WebSockets, Firebase, JWT Auth.
- Databases: MongoDB, PostgreSQL, Firebase Firestore, SQLite.
- Core CS: Algorithms (DSA), System Design, OOP, DBMS, OS, Computer Networks.
- Tools: Git, GitHub, Linux, Netlify, VS Code.

## 3. FEATURED PROJECTS
1. ParkShark: Smart Bicycle Management & 3D Campus Explorer
   - Three.js, React 19, TypeScript, Firebase, Tailwind CSS
   - 3D digital twin of VIT campus, WASD avatar collision, minimap HUD, 150 bike stands, smart QR locks.
   - GitHub: https://github.com/TanishkaSahu191/ParkShark

2. PiggyPocket: Student Budget & Safe Daily Allowance Platform
   - React 18, Node.js, Express, Vite, JWT, Vitest
   - 59 automated test suites (100% passing), daily spending limit recalculator, automated daily email digests.
   - GitHub: https://github.com/TanishkaSahu191/PiggyPocket

3. HackFest: Full-Stack Hackathon Management Platform
   - React 19, Node.js, Express, MongoDB, Vite, Tailwind CSS
   - Full-stack MERN event portal with live participant rosters, interactive schedules, team registrations.
   - GitHub: https://github.com/TanishkaSahu191/hackathon-website

4. Swasthyam: Community Maternal & Child Health AI Companion
   - AI Health RAG, Python, React, Health Analytics, Bilingual (Hindi/English)
   - Johns Hopkins University Hackathon project for maternal health, vaccination tracking, and community support.
   - GitHub: https://github.com/TanishkaSahu191/Swasthyam-1

5. Lumora: Interactive 3D Celestial Solar System & Cosmic Portfolio
   - Three.js, WebGL, Gemini AI, GLSL Shaders, Spatial Audio
   - Real-time planetary orbits, axial rotation, procedural atmospheres, spatial audio, and an embedded Gemini AI guide (Nova AI).
   - GitHub: https://github.com/TanishkaSahu191

## 4. ACHIEVEMENTS & CERTIFICATIONS
- Smart India Hackathon (SIH 2024) Top Innovation Finalist (SIH-2024-NATL-891).
- College DSA League (2025) 6th Position Solo (algorithmic mastery).
- Johns Hopkins University Hackathon Participant (Swasthyam platform).
- NPTEL IIT Kanpur: Marketing Management - I (Top 5% Topper Elite).
- National Spell Quest Haryana State Champion (2018).
- WhiteHat Jr Certified Junior Game Developer (2022).
- Technical & Graphics Lead at VIT Bhopal (mentored 400+ students).

## 5. CONTACT & PROFILES
- Email: tanishkasahuwork191@gmail.com
- Phone: +91 7717603726
- GitHub: https://github.com/TanishkaSahu191
- LinkedIn: https://www.linkedin.com/in/tanishka-sahu-8a617a375/
- LeetCode: https://leetcode.com/u/tanishka_189/
- Resume: Available for download as tanishka-sahu-resume.pdf
`;

const SYSTEM_INSTRUCTION = `You are Nova AI, the cosmic intelligence assistant of Tanishka Sahu's Cosmic 3D Portfolio.

YOUR MISSION:
You assist portfolio visitors, recruiters, and developers in exploring Tanishka Sahu's professional profile, technical capabilities, projects, education, achievements, and contact channels.

RESPONSE LENGTH & CONCISENESS (CRITICAL MANDATE):
1. KEEP ALL ANSWERS SHORT, CRISP, AND ON POINT.
2. Limit your answer to 1 to 3 concise sentences or a compact 2-3 bullet point list (strictly under 60 words total).
3. Do NOT provide lengthy introductions, filler words, unnecessary pleasantries, or verbose essays. Answer the user's specific question directly in the very first sentence.
4. NO EMOJIS: Do not use any emojis anywhere in your response. The website maintains a sleek, cinematic, elegant astronomical aesthetic. Use clean typography and brief markdown.

STRICT ACCURACY & TRUTHFULNESS:
1. Ground all answers solely in the verified portfolio knowledge provided below.
2. NEVER invent qualifications, experience, degrees, projects, test scores, or personal details that are not in the portfolio.
3. If a visitor asks about something not present in the portfolio, politely state: "That information is not documented in Tanishka's portfolio." Then suggest an available topic.
4. Provide markdown links when referencing external resources:
   - GitHub: [GitHub Profile](https://github.com/TanishkaSahu191)
   - LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/tanishka-sahu-8a617a375/)
   - LeetCode: [LeetCode Profile](https://leetcode.com/u/tanishka_189/)
   - Email: [tanishkasahuwork191@gmail.com](mailto:tanishkasahuwork191@gmail.com)

PORTFOLIO KNOWLEDGE BASE:
${PORTFOLIO_KNOWLEDGE}
`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  try {
    let parsed;
    try {
      parsed = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON payload.' })
      };
    }

    const message = typeof parsed.message === 'string' ? parsed.message.trim() : '';
    const history = Array.isArray(parsed.history) ? parsed.history : [];

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message cannot be empty.' })
      };
    }

    if (message.length > 1000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message exceeds maximum limit of 1,000 characters.' })
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim().length === 0 || apiKey.includes('your_api_key_here')) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'Gemini API key is not configured.',
          setupGuide: 'Please set GEMINI_API_KEY in your Netlify site environment variables.'
        })
      };
    }

    const contents = [];
    for (const item of history.slice(-8)) {
      if (item && item.text && (item.role === 'user' || item.role === 'assistant' || item.role === 'model')) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(item.text).slice(0, 600) }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const candidateModels = [
      process.env.GEMINI_MODEL,
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro',
      'gemini-pro'
    ].filter(Boolean);

    let lastError = null;
    let replyText = null;
    let usedModel = null;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents,
            generationConfig: {
              temperature: 0.5,
              topP: 0.85,
              topK: 32,
              maxOutputTokens: 250
            }
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        const candidate = data.candidates?.[0];
        const partText = candidate?.content?.parts?.[0]?.text;

        if (partText && partText.trim().length > 0) {
          replyText = partText.trim();
          usedModel = model;
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!replyText) {
      throw lastError || new Error('No response generated by Gemini model.');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: replyText,
        model: usedModel,
        timestamp: Date.now()
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message || 'Error processing AI chat request.'
      })
    };
  }
};
