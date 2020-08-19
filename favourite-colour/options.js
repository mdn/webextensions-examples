async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.sync.set({
    colour: document.querySelector("#colour").value
  });
}

async function restoreOptions() {
  let res = await browser.storage.managed.get('colour');
  document.querySelector("#managed-colour").innerText = res.colour;

  res = await browser.storage.sync.get('colour');
  document.querySelector("#colour").value = res.colour || 'Firefox red';
  
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
