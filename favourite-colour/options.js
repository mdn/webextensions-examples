function saveOptions(e) {
  browser.storage.sync.set({
    colour: document.querySelector("#colour").value
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get('colour');
  gettingItem.then((res) => {
    document.querySelector("#colour").value = res.colour || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
