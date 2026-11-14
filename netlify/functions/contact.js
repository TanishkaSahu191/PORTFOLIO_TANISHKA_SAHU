let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  // Nodemailer is optional
}

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

    if (!message || message.length < 5 || message.length > 5000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message must be between 5 and 5,000 characters.' })
      };
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'tanishkasahuwork191@gmail.com';
    let dispatched = false;
    let deliveryMethod = 'none';
    let deliveryError = null;

    // 1. Gmail / Custom SMTP via Nodemailer
    const hasGmailApp = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
    const hasCustomSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (nodemailer && (hasGmailApp || hasCustomSmtp)) {
      try {
        const transporter = nodemailer.createTransport(
          hasGmailApp
            ? {
                service: 'gmail',
                auth: {
                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
                }
              }
            : {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS
                }
              }
        );

        const senderEmail = process.env.GMAIL_USER || process.env.SMTP_USER || receiverEmail;

        const htmlBody = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0c1222; color: #f8fafc; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0d9488 0%, #0369a1 100%); padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">⚡ LUMORA // Subspace Transmission</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #e0f2fe;">New Portfolio Inquiry for Tanishka Sahu</p>
            </div>
            <div style="padding: 28px 24px;">
              <div style="background: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0; width: 80px;">From:</td>
                    <td style="color: #ffffff; font-weight: 700; padding: 6px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0;">Email:</td>
                    <td style="color: #38bdf8; font-weight: 600; padding: 6px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 6px 0;">Date:</td>
                    <td style="color: #cbd5e1; padding: 6px 0;">${new Date().toUTCString()}</td>
                  </tr>
                </table>
              </div>
              <div style="margin-bottom: 24px;">
                <h3 style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message Content:</h3>
                <div style="background: #090e17; border-left: 3px solid #2dd4bf; border-radius: 6px; padding: 16px; color: #e2e8f0; font-size: 14.5px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              <div style="text-align: center; margin-top: 28px;">
                <a href="mailto:${email}?subject=Re:%20Transmission%20via%20Lumora%20Portfolio" style="display: inline-block; background: #2dd4bf; color: #042f2e; font-weight: 800; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 999px; box-shadow: 0 4px 14px rgba(45, 212, 191, 0.4);">
                  Reply Directly to ${name} ✉️
                </a>
              </div>
            </div>
            <div style="background: #080d1a; padding: 14px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b;">
              Dispatched via Lumora Portfolio Transmission Engine // Neptune Subspace Nexus
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Lumora Portfolio" <${senderEmail}>`,
          to: receiverEmail,
          replyTo: email,
          subject: `🚀 [Lumora Portfolio] New Transmission from ${name}`,
          text: `From: ${name} <${email}>\nDate: ${new Date().toISOString()}\n\nMessage:\n${message}`,
          html: htmlBody
        });

        dispatched = true;
        deliveryMethod = hasGmailApp ? 'gmail_smtp' : 'custom_smtp';
      } catch (err) {
        console.warn('[Dispatch] SMTP transmission failed:', err.message);
        deliveryError = err.message;
      }
    }

    // 2. Resend REST API (if RESEND_API_KEY is configured)
    if (!dispatched && process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Lumora Portfolio <onboarding@resend.dev>',
            to: [receiverEmail],
            reply_to: email,
            subject: `🚀 [Lumora Portfolio] New Transmission from ${name}`,
            text: `From: ${name} <${email}>\nDate: ${new Date().toISOString()}\n\nMessage:\n${message}`
          })
        });
        if (resendRes.ok) {
          dispatched = true;
          deliveryMethod = 'resend_api';
        } else {
          const errText = await resendRes.text();
          console.warn('[Dispatch] Resend API failed:', errText);
        }
      } catch (err) {
        console.warn('[Dispatch] Resend error:', err.message);
      }
    }

    // 3. FormSubmit.co Gateway (Zero-config direct inbox forwarding to receiverEmail)
    if (!dispatched) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(receiverEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `🚀 [Lumora Portfolio] New Transmission from ${name}`,
            _template: 'box'
          })
        });

        if (fsRes.ok) {
          const fsData = await fsRes.json().catch(() => ({}));
          dispatched = true;
          deliveryMethod = 'formsubmit_gateway';
        } else {
          const errText = await fsRes.text().catch(() => '');
          console.warn('[Dispatch] FormSubmit endpoint responded with error:', errText);
        }
      } catch (err) {
        console.warn('[Dispatch] FormSubmit fetch failed:', err.message);
      }
    }

    // 4. Webhook (Discord / Slack) if configured
    if (process.env.CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**🚀 [Lumora Portfolio] New Transmission Received!**\n**From:** ${name} (${email})\n**Time:** ${new Date().toISOString()}\n**Message:**\n${message}`
          })
        });
        if (!dispatched) {
          dispatched = true;
          deliveryMethod = 'webhook';
        }
      } catch (err) {
        console.warn('[Dispatch] Webhook error:', err.message);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        dispatched,
        deliveryMethod,
        message: dispatched
          ? `Subspace transmission delivered to ${receiverEmail}!`
          : `Transmission received! Tanishka will respond shortly.`,
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
