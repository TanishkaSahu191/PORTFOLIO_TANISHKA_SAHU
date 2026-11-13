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

    const name = typeof parsed.name === 'string' ? parsed.name.trim() : '';
    const email = typeof parsed.email === 'string' ? parsed.email.trim() : '';
    const message = typeof parsed.message === 'string' ? parsed.message.trim() : '';

    if (!name || name.length < 2 || name.length > 100) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please provide your name (2–100 characters).' })
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please provide a valid email address.' })
      };
    }

    if (!message || message.length < 5 || message.length > 3000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message must be between 5 and 3,000 characters.' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Subspace transmission received successfully! Tanishka will respond shortly.',
        data: { name, email, timestamp: new Date().toISOString() }
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message || 'Transmission failed.'
      })
    };
  }
};
