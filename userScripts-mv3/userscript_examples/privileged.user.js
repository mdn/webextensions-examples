// ==UserScript==
// @name          Demo of privileged user script
// @description   Add button on domains starting with "example" that displays privileged info in a new tab.
// @include       https://example*
// @include       http://example*
// @grant         GM_info
// @grant         GM_openInTab
// @version       1.2.3
// ==/UserScript==

// To test:
// 1. Visit https://example.com/ or http://example.org/
// 2. Click on the "Show user script info" button.
// 2. Confirm that a new tab opens that displays the script info.

/* globals GM_info, GM_openInTab */

if (location.pathname === "/display_userscript_result") {
  document.body.style.whiteSpace = "pre-wrap";
  document.body.textContent = decodeURIComponent(location.search.slice(1));
} else {
  let button = document.createElement("button");
  button.textContent = "Show user script info";
  document.body.prepend(button);

  button.onclick = async () => {
    let info = await GM_info();
    let text = `Result from user script:\n\n${JSON.stringify(info, null, 4)}`;
    let url = "https://example.com/display_userscript_result?" + encodeURIComponent(text);
    GM_openInTab(url);
  };
}
