'use strict';

const hostsInput =  document.querySelector("#hosts");
const codeInput =  document.querySelector("#code");

const defaultHosts = "*://*.org/*";
const defaultCode = "document.body.innerHTML = '<h1>This page has been eaten</h1>'";

hostsInput.value = defaultHosts;
codeInput.value = defaultCode;

function registerScript() {
  browser.runtime.sendMessage({
    hosts: hostsInput.value.split(","),
    code: codeInput.value
  });
}

document.querySelector("#register").addEventListener('click', registerScript);
