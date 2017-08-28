function onMetaData(metaData) {
  metaData = metaData[0];

  var shown = false;

  for (prop in metaData) {
    value = metaData[prop];
    var section = null;
    if (!prop.match(/^og:/) && !prop.match(/^twitter:/) && !prop.match(/^fb:/))
      continue;
    if (!shown) {
      document.getElementById("metadata").setAttribute("class", "");
      document.getElementById("nothing-to-see").setAttribute("class", "hidden");
    }
    let ul = document.getElementById("metadata-list");
    let li = document.createElement("li");
    let tt = document.createElement("tt");
    tt.appendChild(document.createTextNode(prop));
    li.appendChild(tt);
    li.appendChild(document.createTextNode(": "+ value));
    ul.appendChild(li);
  }

  // see http://ogp.me/
  if (metaData["og:url"] || metaData["og:title"] || metaData["og:description"]) {
    let container = document.getElementById("og-preview");
    container.setAttribute("class", "");
    //XXX: handle arrays ?
    var image = metaData["og:image"] || metaData["og:image:src"];
    // TODO: fixup "//..." urls
    // cf. https://css-tricks.com/essential-meta-tags-social-media/
    //if (image && image.match(/^\/\/:/))
    //  image = (new URL(tabUrl)).protocol + image;
    if (image) {
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.setAttribute("style", "max-width: 100px; max-height: 100px;");
      //TODO: check og:image:width & height
      if (metaData["og:image:alt"]) {
        img.setAttribute("alt", metaData["og:image:alt"]);
        img.setAttribute("title", metaData["og:image:alt"]);
      }
      img.setAttribute("src", image);
      div.appendChild(img);
      container.appendChild(div);
    }
    let div = document.createElement("div");
    if (metaData["og:title"]) {
      let h2 = document.createElement("h2");
      let content = document.createTextNode(metaData["og:title"]);
      h2.appendChild(content);
      div.appendChild(h2);
    }
    if (metaData["og:description"]) {
      let content = document.createTextNode(metaData["og:description"]);
      div.appendChild(content);
    }
    if (metaData["og:url"]) {
      let d = document.createElement("div");
      let a = document.createElement("a");
      let sitename = metaData["og:site_name"] || metaData["og:title"]
      let content = document.createTextNode(sitename);
      a.appendChild(content);
      a.setAttribute("href", metaData["og:url"]);
      d.appendChild(a);
      div.appendChild(d);
    }
    container.appendChild(div);
  }

  // see https://dev.twitter.com/cards/markup
  if (metaData["twitter:card"] || metaData["twitter:description"] || metaData["twitter:title"]) {
    let container = document.getElementById("tw-preview");
    container.setAttribute("class", "");

    var card = metaData["twitter:card"];

    // "then a summary card may be rendered."
    if (!card && (metaData["og:type"] || metaData["og:title"] || metaData["og:description"])) {
      card = "summary";
    }
    if (!card) {
      let div = document.createElement("div");
      div.setAttribute("class", "warning");
      div.appendChild(document.createTextNode("Missing twitter:card!"));
      container.appendChild(div);
    }

    let image = metaData["twitter:image"] || metaData["twitter:image:src"] || metaData["og:image"] || metaData["og:image:src"];
    // TODO: fixup "//..." urls
    //if (image && image.match(/^\/\/:/))
    //  image = new URL(tabUrl).protocol + image;
    if (image) {
      let div = document.createElement("div");
      let img = document.createElement("img");
      if (card == "summary_large_image")
        img.setAttribute("style", "max-width: 300px; max-height: 300px;");
      else
        img.setAttribute("style", "max-width: 100px; max-height: 100px;");
      img.setAttribute("src", image);
      div.appendChild(img);
      container.appendChild(div);
    }
    let div = document.createElement("div");

    let title = metaData["twitter:title"] || metaData["og:title"];
    if (metaData["twitter:title"]) {
      let h2 = document.createElement("h2");
      let content = document.createTextNode(title);
      h2.appendChild(content);
      div.appendChild(h2);
    }

    let description = metaData["twitter:description"] || metaData["og:description"];
    if (description) {
      let content = document.createTextNode(description);
      div.appendChild(content);
    }
    container.appendChild(div);
  }
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
