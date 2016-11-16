function getUserInfo(provider, intractive=true) {
  chrome.runtime.sendMessage({"type": "getUserInfo", provider, "interactive": intractive});
}

function revoke() {
  chrome.runtime.sendMessage({"type": "removeCachedToken"});
  show();
}

function show(text) {
  document.getElementById('user_info').innerHTML = text || "";
}

function messageListener(message) {
  show("<pre>" + JSON.stringify(message.error || message.user) + "</pre>");
}

window.onload = () => {
  chrome.runtime.onMessage.addListener(messageListener);
  document.getElementById('facebook-signin').onclick = () => { getUserInfo("facebook"); };
  document.getElementById('google-signin').onclick = () => { getUserInfo("google"); };
  document.getElementById('revoke').onclick = revoke;
};
