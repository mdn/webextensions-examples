var metaData = {};

/* Parse the meta tags to find OpenGraph and Twitter data. */
/* TODO: OG allows multiple og:image, while JS object properties must be unique... */
for (meta of document.getElementsByTagName("meta")) {
  var prop = meta.getAttribute("property");
  if (!prop)
    prop = meta.getAttribute("property");
  if (!prop)
    continue;
  var content = meta.getAttribute("content");
  metaData[prop] = content;
}

/* Last statement is returned to background script. */
metaData;
