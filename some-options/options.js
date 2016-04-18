function save_options(e) {
}


function restore_options() {
  chrome.storage.local.get('colour');
}

document.addEventListener('DOMContentLoaded', restore_options);
