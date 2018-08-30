"use strict";

/*
Get the background page to access the rootCertStats object
*/
const backgroundPage = browser.extension.getBackgroundPage();

let entries = Object.keys(backgroundPage.rootCertStats);

/*
If there are any stats, show the table, and append one row for each entry.
Each row contains the name of the CA and the number of times it has been
used as a trust root.
*/
if (entries.length > 0) {

  let noData = document.querySelector(".no-data");
  noData.classList.add("hidden");
  let entryTable = document.querySelector(".root-cert-table");
  entryTable.classList.remove("hidden");

  for (let entry of entries) {
    let entryTR = document.createElement("tr");
    let entryName =  document.createElement("td");
    let entryValue =  document.createElement("td");
    entryName.textContent = entry;
    entryValue.textContent = backgroundPage.rootCertStats[entry];

    entryTR.appendChild(entryName);
    entryTR.appendChild(entryValue);
    entryTable.appendChild(entryTR);
  }
}
