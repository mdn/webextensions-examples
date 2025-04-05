async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.sync.set({
    colour: document.querySelector("#colour").value
  });
}

async function restoreOptions() {
 try {
   let res = await browser.storage.managed.get('colour');
   document.querySelector("#managed-colour").innerText = res.colour || "Could not find 'colour' in managed storage.";
 } catch(error) {
   if (error.message === "Managed storage manifest not found") {
     document.querySelector("#managed-colour").innerText = "Managed storage manifest not found. Make sure it's stored in an appropriate location.";
   } else {
     document.querySelector("#managed-colour").innerText = `Unexpected managed storage error: ${error.message}`;
   }
 }

  res = await browser.storage.sync.get('colour');
  document.querySelector("#colour").value = res.colour || 'Firefox red';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
