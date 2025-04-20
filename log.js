document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('list');
  
    chrome.storage.local.get('gratitudeEntries', data => {
      const entries = data.gratitudeEntries || {};
  
      Object.keys(entries)
        .sort((a, b) => b.localeCompare(a))
        .forEach(date => {
          // header
          const h = document.createElement('h3');
          h.textContent = date;
          container.appendChild(h);
  
          // always iterate an array
          const dayEntries = Array.isArray(entries[date])
                             ? entries[date]
                             : [entries[date]];
  
          const ul = document.createElement('ul');
          dayEntries.forEach(txt => {
            const li = document.createElement('li');
            li.textContent = txt;
            ul.appendChild(li);
          });
          container.appendChild(ul);
        });
    });
  });
  