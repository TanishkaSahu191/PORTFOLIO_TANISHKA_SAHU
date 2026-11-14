exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const hasKey = Boolean(apiKey && apiKey.trim().length > 0 && !apiKey.includes('your_api_key_here'));

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      configured: hasKey,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      status: hasKey ? 'online' : 'unconfigured',
      message: hasKey
        ? 'Nova AI intelligence engine is active and ready on Netlify.'
        : 'GEMINI_API_KEY is not configured in Netlify environment variables.'
    })
  };
};

