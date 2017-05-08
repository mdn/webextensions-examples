# bookmark-it

> This example uses APIs that are available from Firefox 47 onwards.

## But de l'extension

Affiche un simple bouton dans la barre de menu qui ajoute la page courante aux favoris.

To display the button, the extension registers a [browserAction](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction) in the manifest.

A background script will listen for tab events and update the browserAction icon correspondingly. It also listens for `browserAction.onClicked` events to create or remove a bookmark when the user has clicked the icon.

## Ce qu'on y apprend

* les fonctions "bookmarks"
  * créer un bookmark
  * supprimer un bookmark
  * rechercher un bookmark par URL
* how to register a browserAction
* how to listen for tab changes
