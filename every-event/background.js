var URL = 'https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/';

function genericLogger(msg, url, ...args) {
  console.group();
  console.log(`Event fired: browser.${msg}`);
  console.log(`Arguments: %o`, args.length === 1 ? args[0] : args);
  console.info(url);
  console.groupEnd();
}

function isEvent(obj) {
  let keys = Object.keys(obj);
  if (keys.includes('hasListener') &&
      keys.includes('addListener') &&
      keys.includes('removeListener')) {
    return true;
  }
  return false;
}

for (let api_name of Object.keys(browser)) {
  if (!browser[api_name]) {
    console.log(`Skipping: ${api_name}`);
    continue;
  }
  for (let method_name of Object.keys(browser[api_name])) {
    let method = browser[api_name][method_name];
    let name = `${api_name}.${method_name}`;
    let url = `${URL}${api_name}/${method_name}/`;
    if (method && isEvent(method)) {
      if (api_name === 'webRequest') {
        method.addListener(
          (...args) => {genericLogger(name, url, ...args)},
          {urls: ["<all_urls>"]}
        );
      } else {
        method.addListener(
          (...args) => {genericLogger(name, url, ...args)}
        );
      }
      console.log(`Added listener to: ${name}`);
    }
  }
}
