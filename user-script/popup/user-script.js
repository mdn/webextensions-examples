'use strict';

const hostsInput =  document.querySelector("#hosts");
const codeInput =  document.querySelector("#code");

const defaultHosts = "*://*.org/*";
const defaultCode = "document.body.innerHTML = '<h1>This page has been eaten<h1>'";

hostsInput.value = defaultHosts;
codeInput.value = defaultCode;

async function registerScript() {
  let background = await browser.runtime.getBackgroundPage();
  background.register(hostsInput.value.split(","), codeInput.value)
}

document.querySelector("#register").addEventListener('click', registerScript);
