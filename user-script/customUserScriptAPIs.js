browser.userScripts.onBeforeScript.addListener(script => {
  const scriptMetadata = script.metadata;

  script.defineGlobals({
    async GM_getValue(name) {
      const res = await browser.storage.local.get(name);
      console.log("GM_getValue", {name, res, scriptMetadata});
      return res[name];
    },
    GM_setValue(name, value) {
      console.log("GM_setValue", {name, value, scriptMetadata});
      return browser.storage.local.set({[name]: value});
    },
	exportFunction(fn, global) {
      return exportFunction(fn, global);
    },
	cloneInto(fn, global) {
      return cloneInto(fn, global);
    },
  });

  console.log("custom userScripts APIs defined");
});

console.log("apiScript executed and userScripts.onBeforeScript listener subscribed");
