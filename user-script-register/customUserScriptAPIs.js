browser.userScripts.onBeforeScript.addListener(script => {

  const scriptMetadata = script.metadata;
  const id = scriptMetadata.userScriptID;

  script.defineGlobals({
    async GM_getValue(name) {
      const res = await browser.storage.local.get(`${id}:${name}`);
      console.log("GM_getValue", {id, name, res, scriptMetadata});
      return res[`${id}:${name}`];
    },
    GM_setValue(name, value) {
      console.log("GM_setValue", {id, name, value, scriptMetadata});
      return browser.storage.local.set({[`${id}:${name}`]: value});
    },
  });

  console.log("custom userScripts APIs defined");
});

console.log("apiScript executed and userScripts.onBeforeScript listener subscribed");
