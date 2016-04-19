function saveOptions(e) {
  chrome.storage.local.set({
    colour: document.querySelector("#colour").value
  });
}

function restoreOptions() {
  chrome.storage.local.get('colour', (res) => {
    document.querySelector("#colour").value = res.colour || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
