function save_options(e) {
  chrome.storage.local.set({
    colour: document.querySelector("#colour").value
  });
}

function restore_options() {
  chrome.storage.local.get('colour', (res) => {
    document.querySelector("#colour").value = res.colour;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector("form").addEventListener("submit", save_options);
