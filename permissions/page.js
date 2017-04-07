function updatePermissions() {
  browser.permissions.getAll()
  .then((permissions) => {
    document.getElementById('permissions').innerText = permissions.permissions.join(', ');
  });
}

function processChange(event) {
  let permission = event.target.dataset.permission;
  let result = document.getElementById('result');
  let permissionMethod = (
    event.target.dataset.action === 'grant' ?
    browser.permissions.request : browser.permissions.remove
  );

  try {
    permissionMethod({permissions: [permission]})
    .then((response) => {
      result.className = 'bg-success';
      result.textContent = 'Call successful.';
    })
    .catch((err) => {
      // Catch the case where the permission cannot be granted.
      result.className = 'bg-warning';
      result.textContent = err.message;
    });
  } catch(err) {
    // Catch the case where the permission is completely wrong.
    result.className = 'bg-danger';
    result.textContent = err.message;
  }
  result.style.display = 'block';

  updatePermissions();
  event.preventDefault();
}

for (let element of document.getElementsByClassName('permission')) {
  element.addEventListener('click', processChange);
}

updatePermissions();
