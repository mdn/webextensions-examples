# HTTP Response parser

## What it does

Listens to HTTP Responses from example.com and w3.org and changes "Example" to "WebExtension Example" and
"Test" to "WebExtension Test" in the web pages contents. 

## What it shows

A real-world example of WebRequest that shows three important details not always found in beginning examples:
 - The accumulation of data through multiple calls to .ondata
 - The decoding of binary data to text in a streaming fashion.
 - Text decoding that tries to respect the page's reported encoding via Content-Type.

The domain w3.org is included in the list of domains to allow for testing against [this suite of standardized tests](https://www.w3.org/2006/11/mwbp-tests/index.xhtml)
regarding text encoding. Tests #1-8 pass, test #9 currently fails.

## Credits

Icon is from: https://www.iconfinder.com/icons/763339/draw_edit_editor_pen_pencil_tool_write_icon#size=128
