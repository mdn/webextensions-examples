var themeList = document.getElementById('theme-list');

function enableTheme(e) {
  browser.management.setEnabled(e.target.value, true);
  e.preventDefault();
  window.close();
}

browser.management.getAll().then((themes) => {
  for (let theme of themes) {
    let option = document.createElement('option');
    option.textContent = theme.name;
    option.value = theme.id;
    if (theme.enabled) {
      option.selected = true;
    }
    themeList.appendChild(option);
  }
});

themeList.addEventListener('change', enableTheme);
