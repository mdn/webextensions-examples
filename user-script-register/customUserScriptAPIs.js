
browser.userScripts.onBeforeScript.addListener(script => {

  const scriptMetadata = script.metadata;
  const id = scriptMetadata.userScriptID;

  function getScopedName(name) {
    return `${id}:${name}`;
  }

  script.defineGlobals({
    async GM_getValue(name) {
      const scopedName = getScopedName(name);
      const res = await browser.storage.local.get(scopedName);
      console.log("GM_getValue", {id, name, res, scriptMetadata});
      return res[scopedName];
    },
    GM_setValue(name, value) {
      console.log("GM_setValue", {id, name, value, scriptMetadata});
      return browser.storage.local.set({[getScopedName(name)]: value});
    },
  });

  console.log("custom userScripts APIs defined");
});

console.log("apiScript executed and userScripts.onBeforeScript listener subscribed");