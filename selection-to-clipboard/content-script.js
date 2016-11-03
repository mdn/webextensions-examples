/*
copy the selected text to clipboard
*/
function copySelection(e) {
    var selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        document.execCommand("Copy");
    }
}

/*
Add copySelection() as a listener to mouseup events.
*/
document.addEventListener("mouseup", copySelection);