"use strict";

(async () => {
  const popupParameters = await browser.runtime.sendMessage("getPopupParameters");
  let {tabId, frameId, targetElementId} = popupParameters;

  // Ensure that the popup is opened for the currently active tab,
  // to prevent users from interacting with hidden tabs.
  await assertIsCurrentTab(tabId);

  // The browser.menus.getTargetElement API is only available in Firefox 63+.
  if (!browser.menus.getTargetElement) {
    let [didUsePolyfill] = await browser.tabs.executeScript(tabId, {
      runAt: "document_start",
      frameId,
      file: "menusGetTargetElementPolyfill.js",
    });
    if (didUsePolyfill === true) {
      console.log("Registered a polyfill for browser.menus.getTargetElement - re-open the menu to see it in action.");
      let outputStatus = document.getElementById("outputStatus")
      outputStatus.textContent = `
        This extension requires the browser.menus.getTargetElement API,
        which is only available as of Firefox 63.
        To see the expected behavior, please re-open the menu.
      `;
      return;
    }
  }

  // Inject script in page (requires activeTab permission).
  await browser.tabs.executeScript(tabId, {
    runAt: "document_start",
    frameId,
    file: "contentscript.js",
  });

  let port = browser.tabs.connect(tabId, {
    name: "portFromPopup",
    frameId,
  });
  port.onMessage.addListener(msg => {
    if (msg.action === "elementDescriptions") {
      renderElementDescriptions(port, msg.descriptions);
    }
  });
  port.onDisconnect.addListener(() => {
    let outputStatus = document.getElementById("outputStatus")
    outputStatus.textContent = `The port to the page was closed.${port.error ? "Reason: " + port.error.message : ""}`;
  });
  port.postMessage({
    action: "getElementDescriptions",
    targetElementId,
  });
})();

async function assertIsCurrentTab(tabId) {
  let [currentTab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (currentTab.id !== tabId) {
    throw new Error("The given tab ID is not the currently active tab");
  }
}

function renderElementDescriptions(port, descriptions) {
  let outputStatus = document.getElementById("outputStatus")
  if (!descriptions.length) {
    outputStatus.textContent = "Cannot find the target element. Please re-open the menu to try again.";
    return;
  }
  let list = document.createElement("ul");
  descriptions.forEach((description, elementIndex) => {
    let item = document.createElement("li");
    item.textContent = description;
    item.tabIndex = 1;
    item.onclick = () => {
      port.postMessage({
        action: "removeElement",
        elementIndex: elementIndex,
      });
    };
    item.onmouseenter = () => {
      port.postMessage({
        action: "highlightElement",
        elementIndex: elementIndex,
      });
    };
    list.appendChild(item);
  });
  outputStatus.textContent = "Click on any item to remove the element and its descendants:";
  outputStatus.appendChild(list);
}
