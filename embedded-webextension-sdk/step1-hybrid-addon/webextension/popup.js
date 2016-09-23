browser.storage.local.get((results) => {
  document.querySelector("#panel-content").textContent = JSON.stringify(results, null, 2);
});
