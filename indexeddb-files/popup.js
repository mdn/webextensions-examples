document.querySelector("#reading-saving-files-example").onclick = () => {
  browser.tabs.create({url: "/tabs/save-local-dirtree.html", active: true});
};

document.querySelector("#mutable-files-example").onclick = () => {
  browser.tabs.create({url: "/tabs/mutablefile.html", active: true});
};
