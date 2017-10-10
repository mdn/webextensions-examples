/**
Display the redirect URL.
*/
document.querySelector("#redirect-url").textContent = browser.identity.getRedirectURL();
