function onMetaData(metaData) {
  metaData = metaData[0];
  var data = { og: {}, tw: {}, fb: {} };

  for (prop in metaData) {
    value = metaData[prop];
    var section = null;
    if (prop.match(/^og:/)) {
      section = "og";
    } else if (prop.match(/^twitter:/)) {
      section = "tw";
    } else if (prop.match(/^fb:/)) {
      section = "fb";
    } else
      continue;
    data[section][prop] = value;
    let ul = document.getElementById(section+"-meta");
    let li = document.createElement("li");
    let content = document.createTextNode(prop + ": "+ value);
    li.appendChild(content);
    ul.appendChild(li);
  }

  if (Object.keys(data["og"]).length) {
    let container = document.getElementById("og-preview");
    //TODO: handle og:image:url
    //XXX: handle arrays ?
    if (data["og"]["og:image"]) {
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.setAttribute("style", "max-width: 100px; max-height: 100px;");
      //TODO: check og:image:width & height
      if (data["og"]["og:image:alt"]) {
        img.setAttribute("alt", data["og"]["og:image:alt"]);
        img.setAttribute("title", data["og"]["og:image:alt"]);
      }
      img.setAttribute("src", data["og"]["og:image"]);
      div.appendChild(img);
      container.appendChild(div);
    }
    let div = document.createElement("div");
    if (data["og"]["og:title"]) {
      let h2 = document.createElement("h2");
      let content = document.createTextNode(data["og"]["og:title"]);
      h2.appendChild(content);
      div.appendChild(h2);
    }
    if (data["og"]["og:description"]) {
      let content = document.createTextNode(data["og"]["og:description"]);
      div.appendChild(content);
    }
    if (data["og"]["og:url"]) {
      let d = document.createElement("div");
      let a = document.createElement("a");
      let content = document.createTextNode(data["og"]["og:site_name"]);
      a.appendChild(content);
      a.setAttribute("href", data["og"]["og:url"]);
      d.appendChild(a);
      div.appendChild(d);
    }
    container.appendChild(div);
  }

  if (Object.keys(data["tw"]).length) {
    let container = document.getElementById("tw-preview");
    let card = data["tw"]["twitter:card"];
    if (data["tw"]["twitter:image:src"]) {
      let div = document.createElement("div");
      let img = document.createElement("img");
      if (card == "summary_large_image")
        img.setAttribute("style", "max-width: 300px; max-height: 300px;");
      else
        img.setAttribute("style", "max-width: 100px; max-height: 100px;");
      img.setAttribute("src", data["tw"]["twitter:image:src"]);
      div.appendChild(img);
      container.appendChild(div);
    }
    let div = document.createElement("div");
    if (data["tw"]["twitter:title"]) {
      let h2 = document.createElement("h2");
      let content = document.createTextNode(data["tw"]["twitter:title"]);
      h2.appendChild(content);
      div.appendChild(h2);
    }
    if (data["tw"]["twitter:description"]) {
      let content = document.createTextNode(data["tw"]["twitter:description"]);
      div.appendChild(content);
    }
    container.appendChild(div);
  }
  /* TODO: handle fb-preview. Do we really need it? */

}

function showMetaDataForTab(tabs) {
  //get the first tab object in the array
  let tab = tabs.pop();

  var gettingMetaData = browser.tabs.executeScript(tab.id, {
    file: "/content_scripts/get_metadata.js"
  });

  gettingMetaData.then(onMetaData);
}

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showMetaDataForTab);
