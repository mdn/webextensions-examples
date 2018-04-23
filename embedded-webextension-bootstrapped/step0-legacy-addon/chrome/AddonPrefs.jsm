"use strict";

var EXPORTED_SYMBOLS = ["AddonPrefs"];

Components.utils.import("resource://gre/modules/Services.jsm");

const BASE_PREF = "extensions.original-bootstrap-addon-id.";

function get(key, type = "char") {
  key = BASE_PREF + key;

  switch(type) {
  case "char":
    return Services.prefs.getCharPref(key);
  case "bool":
    return Services.prefs.getBoolPref(key);
  case "int":
    return Services.prefs.getIntPref(key);
  }

  throw new Error(`Unknown type: ${type}`);
}

function set(key, type, value) {
  key = BASE_PREF + key;

  switch(type) {
  case "char":
    return Services.prefs.setCharPref(key, value);
  case "bool":
    return Services.prefs.setBoolPref(key, value);
  case "int":
    return Services.prefs.setIntPref(key, value);
  }

  throw new Error(`Unknown type: ${type}`);
}

var AddonPrefs = {
  get, set,
};
