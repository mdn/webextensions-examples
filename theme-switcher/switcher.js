var themeList = document.getElementById('theme-list');

function enableTheme(e) {
  browser.management.setEnabled(e.target.value, true);
  e.preventDefault();
  window.close();
}

browser.management.getAll().then((extensions) => {
  for (let extension of extensions) {
    if (extension.type !== 'theme') {
      continue;
    }
    let option = document.createElement('option');
    option.textContent = extension.name;
    option.value = extension.id;
    if (extension.enabled) {
      option.selected = true;
    }
    themeList.appendChild(option);
  }
});

themeList.addEventListener('change', enableTheme);
