const textarea = document.getElementById('entry');
const btn = document.getElementById('save');
const status = document.getElementById('status');

// prefill if already saved today
const todayKey = new Date().toISOString().slice(0,10); // “YYYY‑MM‑DD”
chrome.storage.local.get(['gratitudeEntries'], ({ gratitudeEntries }) => {
  const entries = gratitudeEntries || {};
  if (entries[todayKey]) textarea.value = entries[todayKey];
});

btn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (!text) return status.textContent = 'Please write something.';
  
  chrome.storage.local.get(['gratitudeEntries'], ({ gratitudeEntries }) => {
    const entries = gratitudeEntries || {};
    entries[todayKey] = text;
    chrome.storage.local.set({ gratitudeEntries: entries }, () => {
      status.textContent = 'Saved! 🙏';
      setTimeout(() => status.textContent = '', 1500);
    });
  });
});
