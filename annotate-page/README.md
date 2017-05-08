# annotate-page

## What it does

This example adds a sidebar that lets you take notes on the current web page. The notes are saved to local storage, and the notes for each page are shown again when you open that page again.

The example also uses the `commands` manifest key to add a keyboard shortcut that opens the sidebar.

## What it shows

How to create a sidebar for an add-on. How to associate the sidebar with the currently active tab in that sidebar's window. How to store and restore sidebar content.

 wbamberg commented on 4 Mar • edited

Here's a sidebar example.

Annotateur de page très simple. La sidebar contient juste une box: when you mouseover the sidebar the box becomes contenteditable, and you can type your stuff. When you mouseout the contents of the box are stored, keyed to the currently active tab.

The sidebar then displays the content you saved for the currently active tab in the sidebar's window: when you switch tabs and stuff, the right content should be displayed.

I don't know if the mouseover/mouseout interaction model is a very good model. But I think the most
useful thing about this example is that it shows how to keep the sidebar in sync with the active tab, which is not very obvious when you have multiple windows. I'm not sure if what I've done here is the right way, but it does seem to work.


