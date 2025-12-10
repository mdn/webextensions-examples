let isDataCollectionSupported;

async function updatePermissions() {
  const permissions = await browser.permissions.getAll();
  isDataCollectionSupported ??= Array.isArray(permissions.data_collection);
  document.getElementById('permissions').innerText = permissions.permissions.join(', ');
  document.getElementById('host-permissions').innerText = permissions.origins.join(', ');
  document.getElementById('data-permissions').innerText = permissions.data_collection.join(', ');
  return permissions;
}

async function processChange(event) {
  let action = event.target.dataset.action;
  let permission = event.target.dataset.permission;
  let type = event.target.dataset.permissionType;
  let result = document.getElementById('result');

  const change = {
    permissions: [],
    origins: [],
    data_collection: [],
  };

  if (type in change) {
    change[type].push(permission);
  }

  if (action === 'grant') {
    try {
      const requestResult = await browser.permissions.request(change);
      result.className = 'bg-success';
      result.textContent = `Call successful. Request ${requestResult ? 'granted' : 'denied'}.`;
    } catch (err) {
      // Catch the case where the permission cannot be granted.
      result.className = 'bg-warning';
      result.textContent = err.message;
    }
  } else {
    try {
      await browser.permissions.remove(change);
      result.className = 'bg-success';
      result.textContent = 'Call successful. Permissions removed.';
    } catch (err) {
      // Catch the case where the permission is completely wrong.
      result.className = 'bg-danger';
      result.textContent = err.message;
    }
  }
  result.style.display = 'block';
  await updatePermissions();
  event.preventDefault();
}

for (let element of document.querySelectorAll('.permission, .host-permission, .data-permission')) {
  element.addEventListener('click', processChange);
}

updatePermissions();
