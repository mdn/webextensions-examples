# devtools-panels

**Adds a new sidebar to the developer tools inspector.**

## What it does

This extension adds a new sidebar to the inspector panel.
It displays the properties of the current selected node in the markup view, using
`sidebar.setExpression($0)` each time a new node is selected (listener added via
`browser.devtools.panels.elements.onSelectionChanged`).

To learn more about the devtools APIs, see [Extending the developer tools](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Extending_the_developer_tools).
