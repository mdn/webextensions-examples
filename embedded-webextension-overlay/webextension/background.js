console.log("Embedded WebExtension", window.location.href);

browser.runtime.sendMessage("embedded_webext -> overlay addon container");
