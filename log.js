const container = document.getElementById('list');
chrome.storage.local.get(['gratitudeEntries'], ({ gratitudeEntries }) => {
  const entries = gratitudeEntries || {};
  // sort dates descending
  Object.keys(entries)
        .sort((a,b) => b.localeCompare(a))
        .forEach(date => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';
    entryDiv.innerHTML = `
      <strong>${date}</strong>
      <p>${entries[date]}</p>
    `;
    container.appendChild(entryDiv);
  });
});
