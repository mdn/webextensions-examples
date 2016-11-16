# Quicknote
A persistent note/to-do list application — click a button in your browser and record notes, which will persist even after browser restarts.

Works in Firefox 47+, and will also work as a Chrome extension, out of the box.

## What it does

This extension includes:

* A browser action that creates a popup — within the popup is:
	* Two form elements for entering title and body text for a new note, along with a button to add a note, and a button to clear all notes.
	* A list of the notes that have been added to the extension — each note includes a delete button to delete just that note. You can also click on the note title and body to edit them. In edit mode, each note includes:
		* An update button to submit an update.
		* A cancel button to cancel the update.
		
Quicknote uses the WebExtensions [Storage API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage) to persist the notes.

## What it shows

* How to persist data in a WebExtension using the Storage API.
