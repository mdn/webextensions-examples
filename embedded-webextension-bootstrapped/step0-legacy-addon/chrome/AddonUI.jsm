"use strict";

var EXPORTED_SYMBOLS = ["AddonUI"];

Components.utils.import("resource:///modules/CustomizableUI.jsm");

Components.utils.import("chrome://original-bootstrap-addon-id/content/AddonPrefs.jsm");

const BUTTON_ID = "original-bootstrap-addon-id--toolbar-button";
const BUTTON_ICON_URL = "chrome://original-bootstrap-addon-id/content/icons/icon-32.png";

const PANEL_ID = "original-bootstrap-addon-id--popup-panel";

function createPanel(node) {
  var doc = node.ownerDocument;

  var panel = doc.createElement("panel");
  panel.setAttribute("type", "arrow");
  panel.setAttribute("id", PANEL_ID);
  panel.setAttribute("flip", "slide");
  panel.setAttribute("hidden", true);
  panel.setAttribute("position", "bottomcenter topright");
  var panelContent = doc.createElement("label");
  panelContent.textContent = AddonPrefs.get("super-important-user-setting");
  panel.appendChild(panelContent);

  return panel;
}

function defineButtonWidget() {
  let buttonDef = {
    id : BUTTON_ID,
    type : "button",
    defaultArea : CustomizableUI.AREA_NAVBAR,
    label : "button label",
    tooltiptext : "button tooltip",
    onCreated : function (node) {
      node.setAttribute('image', BUTTON_ICON_URL);

      const panel = createPanel(node);
      node.appendChild(panel);

      node.addEventListener("click", () => {
        panel.setAttribute("hidden", false);
        panel.openPopup(node, panel.getAttribute("position"), 0, 0, false, false);
      });
    }
  };

  CustomizableUI.createWidget(buttonDef);
};



function init({id}) {
  defineButtonWidget(BUTTON_ID);
}

function shutdown({id}) {
  CustomizableUI.destroyWidget(BUTTON_ID);
}

var AddonUI = {
  init, shutdown,
};
