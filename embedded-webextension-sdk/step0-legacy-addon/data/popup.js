addon.port.on("got-user-data", results => {
  document.querySelector("#panel-content").textContent = JSON.stringify(results, null, 2);
});
