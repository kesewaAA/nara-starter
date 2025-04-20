document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('entry');
    const btn      = document.getElementById('save');
    const status   = document.getElementById('status');
    const viewLog  = document.getElementById('view-log');
    const todayKey = new Date().toISOString().slice(0,10);

  
    btn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) {
        status.textContent = 'Please write something.';
        return;
      }
  
      chrome.storage.local.get('gratitudeEntries', data => {
        const entries = data.gratitudeEntries || {};
        let todaysList = entries[todayKey];
        if (!Array.isArray(todaysList)) {
          todaysList = todaysList ? [todaysList] : [];
        }
        todaysList.push(text);
        entries[todayKey] = todaysList;
        chrome.storage.local.set({ gratitudeEntries: entries }, () => {
          status.textContent = 'Saved!';
          textarea.value = '';
          setTimeout(() => status.textContent = '', 1500);
        });
      });
    });
  
    viewLog.addEventListener('click', e => {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
    });
  });
  