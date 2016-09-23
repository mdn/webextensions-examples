browser.storage.local.get("prefs", results => {
  const {prefs} = results || {
    prefs: {
      superImportantUserPref: "default value"
    },
  };

  const el = document.querySelector("#superImportantUserPref");
  el.value = prefs.superImportantUserPref;

  const updatePref = () => {
    browser.storage.local.set({
      prefs: {
        superImportantUserPref: el.value,
      },
    });
  };

  el.addEventListener("input", updatePref);
});
