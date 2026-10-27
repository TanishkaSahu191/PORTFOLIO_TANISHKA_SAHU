/**
 * Nova AI — Cosmic Intelligence Frontend Controller
 * Powered by Google Gemini API & Dynamically Synchronized Portfolio Knowledge
 */

(() => {
  const modal = document.getElementById('novaAiModal');
  const chatMessages = document.getElementById('novaChatMessages');
  const chatForm = document.getElementById('novaChatForm');
  const chatInput = document.getElementById('novaChatInput');
  const sendBtn = document.getElementById('novaSendBtn');
  const resetBtn = document.getElementById('btnNovaReset');
  const closeBtn = document.getElementById('btnNovaClose');
  const typingIndicator = document.getElementById('novaTypingIndicator');
  const statusBadge = document.getElementById('novaStatusBadge');
  const setupNotice = document.getElementById('novaSetupNotice');
  const welcomeCard = document.getElementById('novaWelcomeCard');

  // Conversation history: array of { role: 'user'|'model', text: string }
  let conversationHistory = [];
  let isGenerating = false;
  let isConfigured = false;

  // ---------------------------------------------------------------------------
  // Check API Status on load
  // ---------------------------------------------------------------------------
  async function checkServerStatus() {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Status check failed');
      const data = await res.json();
      isConfigured = Boolean(data.configured);
      
      if (statusBadge) {
        if (isConfigured) {
          statusBadge.className = 'nova-status-pill online';
          statusBadge.querySelector('.status-indicator-label').textContent = 'Nova Active';
          if (setupNotice) setupNotice.style.display = 'none';
        } else {
          statusBadge.className = 'nova-status-pill warning';
          statusBadge.querySelector('.status-indicator-label').textContent = 'Setup Needed';
          if (setupNotice) setupNotice.style.display = 'block';
        }
      }
    } catch (err) {
      console.warn('[Nova AI] Server status query failed:', err);
      if (statusBadge) {
        statusBadge.className = 'nova-status-pill offline';
        statusBadge.querySelector('.status-indicator-label').textContent = 'Offline';
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Markdown Sanitizer & Formatter
  // Formats text into safe HTML with bold, italics, lists, code, and links
  // ---------------------------------------------------------------------------
  function formatMarkdown(rawText) {
    if (!rawText) return '';
    
    // Escape standard HTML tags for safety
    let text = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks: ```code```
    text = text.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
      return `<pre class="nova-code-block"><code>${code.trim()}</code></pre>`;
    });

    // Inline code: `code`
    text = text.replace(/`([^`]+)`/g, '<code class="nova-inline-code">$1</code>');

    // Bold: **text** or __text__
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italics: *text* or _text_
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Markdown Links: [label](url)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+|mailto:[^\s\)]+)\)/g, (match, label, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="nova-link">${label} ↗</a>`;
    });

    // Line breaks and bulleted lists
    const lines = text.split('\n');
    let inList = false;
    let formattedHtml = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        if (!inList) {
          formattedHtml += '<ul class="nova-bullet-list">';
          inList = true;
        }
        formattedHtml += `<li>${trimmed.slice(2)}</li>`;
      } else if (/^\d+\.\s+/.test(trimmed)) {
        if (!inList) {
          formattedHtml += '<ol class="nova-numbered-list">';
          inList = true;
        }
        formattedHtml += `<li>${trimmed.replace(/^\d+\.\s+/, '')}</li>`;
      } else {
        if (inList) {
          formattedHtml += inList ? '</ul>' : '</ol>';
          inList = false;
        }
        if (trimmed) {
          formattedHtml += `<p class="nova-text-p">${trimmed}</p>`;
        }
      }
    });

    if (inList) {
      formattedHtml += '</ul>';
    }

    return formattedHtml;
  }

  // ---------------------------------------------------------------------------
  // DOM Message Helpers
  // ---------------------------------------------------------------------------
  function appendMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `nova-message-row ${role === 'user' ? 'user-row' : 'model-row'}`;

    const content = document.createElement('div');
    content.className = `nova-bubble ${role === 'user' ? 'user-bubble' : 'model-bubble'}`;

    if (role === 'user') {
      content.textContent = text;
    } else {
      content.innerHTML = formatMarkdown(text);
    }

    bubble.appendChild(content);
    chatMessages.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function appendErrorBubble(errorMessage, setupDetails) {
    const bubble = document.createElement('div');
    bubble.className = 'nova-message-row model-row';

    const content = document.createElement('div');
    content.className = 'nova-bubble error-bubble';

    let html = `
      <div class="error-bubble-header">
        <span class="error-badge">SYSTEM NOTICE</span>
      </div>
      <p class="error-text">${formatMarkdown(errorMessage)}</p>
    `;

    if (setupDetails) {
      html += `
        <div class="error-setup-box">
          <p><strong>Setup Instructions:</strong></p>
          <ol class="nova-numbered-list">
            <li>${setupDetails.step1 || 'Open or create the .env file in the project root'}</li>
            <li><code>${setupDetails.step2 || 'GEMINI_API_KEY=your_key_here'}</code></li>
            <li>${setupDetails.step3 ? `<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="nova-link">Get a Google Gemini API Key ↗</a>` : ''}</li>
            <li>${setupDetails.step4 || 'Restart server with: npm start'}</li>
          </ol>
        </div>
      `;
    }

    content.innerHTML = html;
    bubble.appendChild(content);
    chatMessages.appendChild(bubble);
    scrollToBottom();
  }

  function scrollToBottom() {
    if (chatMessages) {
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  function setGenerating(generating) {
    isGenerating = generating;
    if (sendBtn) sendBtn.disabled = generating;
    if (chatInput) chatInput.disabled = generating;
    if (typingIndicator) {
      typingIndicator.style.display = generating ? 'flex' : 'none';
      if (generating) scrollToBottom();
    }
  }

  // ---------------------------------------------------------------------------
  // Send Message Logic
  // ---------------------------------------------------------------------------
  async function sendMessage(textToSend) {
    const text = typeof textToSend === 'string' ? textToSend.trim() : (chatInput ? chatInput.value.trim() : '');
    if (!text || isGenerating) return;

    // Reset input
    if (chatInput) {
      chatInput.value = '';
    }

    // Hide welcome suggestions once conversation begins
    if (welcomeCard) {
      welcomeCard.classList.add('in-conversation');
    }

    // Append user message
    appendMessage('user', text);
    setGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: conversationHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503 && data.setupGuide) {
          appendErrorBubble(data.error || 'Gemini API key is not configured.', data.setupGuide);
          checkServerStatus();
        } else {
          appendErrorBubble(data.error || 'Unable to communicate with the Gemini AI service.');
        }
        return;
      }

      const reply = data.reply || 'No response was received.';
      appendMessage('model', reply);

      // Record in conversation history for multi-turn context
      conversationHistory.push({ role: 'user', text: text });
      conversationHistory.push({ role: 'model', text: reply });

      // Cap history at 12 items to prevent excessive token count
      if (conversationHistory.length > 12) {
        conversationHistory = conversationHistory.slice(-12);
      }

    } catch (err) {
      console.error('[Nova AI] Network request error:', err);
      appendErrorBubble('A network error occurred while connecting to the Nova AI server. Please check your connection and retry.');
    } finally {
      setGenerating(false);
      if (chatInput) {
        chatInput.focus();
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Reset Conversation
  // ---------------------------------------------------------------------------
  function resetConversation() {
    conversationHistory = [];
    if (chatMessages) {
      // Remove all message rows, leave welcome card
      const rows = chatMessages.querySelectorAll('.nova-message-row');
      rows.forEach(r => r.remove());
    }
    if (welcomeCard) {
      welcomeCard.classList.remove('in-conversation');
    }
    if (chatInput) {
      chatInput.value = '';
      chatInput.focus();
    }
    checkServerStatus();
  }

  // ---------------------------------------------------------------------------
  // Modal Open & Close Methods
  // ---------------------------------------------------------------------------
  function openNovaModal() {
    if (!modal) return;
    
    // Close other planetary modals if open
    if (window.solarAppInstance) {
      if (typeof window.solarAppInstance.closeMercuryIdCard === 'function') window.solarAppInstance.closeMercuryIdCard(false);
      if (typeof window.solarAppInstance.closeVenusAboutModal === 'function') window.solarAppInstance.closeVenusAboutModal(false);
      if (typeof window.solarAppInstance.closeEarthBookModal === 'function') window.solarAppInstance.closeEarthBookModal(false);
      if (typeof window.solarAppInstance.closeMarsModal === 'function') window.solarAppInstance.closeMarsModal(false);
      if (typeof window.solarAppInstance.closeJupiterRoadmapModal === 'function') window.solarAppInstance.closeJupiterRoadmapModal(false);
      if (typeof window.solarAppInstance.closeUranusResumeModal === 'function') window.solarAppInstance.closeUranusResumeModal(false);
      if (typeof window.solarAppInstance.closeSaturnCertificatesModal === 'function') window.solarAppInstance.closeSaturnCertificatesModal(false);
      if (typeof window.solarAppInstance.closeNeptuneLinksModal === 'function') window.solarAppInstance.closeNeptuneLinksModal(false);
      if (typeof window.solarAppInstance.closePlanetModal === 'function') {
        const genericModal = document.getElementById('planetModal');
        if (genericModal && genericModal.open) genericModal.close();
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    
    // Sound blip
    if (window.solarAppInstance && window.solarAppInstance.audio) {
      window.solarAppInstance.audio.playSelectBlip();
    }

    // Refresh server status
    checkServerStatus();

    // Auto-focus input
    setTimeout(() => {
      if (chatInput) chatInput.focus();
    }, 200);
  }

  function closeNovaModal(shouldResetCamera = true) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    if (window.solarAppInstance && shouldResetCamera) {
      window.solarAppInstance.resetToDiagramView();
    }
  }

  // ---------------------------------------------------------------------------
  // Event Listeners
  // ---------------------------------------------------------------------------
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetConversation);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeNovaModal(true));
  }

  // Suggested prompt chips
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.nova-chip-btn');
    if (chip) {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        sendMessage(prompt);
      }
    }
  });

  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeNovaModal(true);
    }
  });

  // Global namespace exposure
  window.openNovaAI = openNovaModal;
  window.closeNovaAI = closeNovaModal;
  window.novaChat = {
    open: openNovaModal,
    close: closeNovaModal,
    reset: resetConversation,
    ask: sendMessage,
    checkStatus: checkServerStatus
  };

  // Initial check
  checkServerStatus();
})();
