// ==UserScript==
// @name          Demo of unprivileged user script
// @description   Show dialog on MDN and every URL starting with "https://example".
// @match         https://developer.mozilla.org/*
// @include       https://example*
// @exclude-match https://example.com/display_userscript_result*
// @grant         none
// @version       1.2.3
// ==/UserScript==

// To test:
// 1. Visit https://example.com/ or https://developer.mozilla.org/
// 2. Confirm that a dialog shows up.

alert(`This is a demo of a user script, running at ${document.URL}.`);

// This user script should not get access to privileged APIs.
if (typeof GM_info !== "undefined") {
  alert("Unexpectedly, GM_info is defined...?");
}
