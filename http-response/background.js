function listener(details) {
  // If the HTTP response code is not OK, just let it flow through normally.
  if (details.statusCode < 200 || 300 <= details.statusCode) {
    console.log('HTTP Status Code was '+details.statusCode+' not 2XX for '+details.url+', skipping filtering.');
    return;
  }

  // The received data is a stream of bytes. In order to do text-based
  // modifications, it is necessary to decode the bytes into a string
  // using the proper character encoding, do any modifications, then
  // encode back into a stream of bytes.
  //
  // In order to use the correct decoding, one needs to detect the charset.
  // Please note that there are many complex rules to detect the charset,
  // and no approach with scanning only the response headers will be
  // fully accurate. The simplified approach here is to find the
  // Content-Type and extract the charset if found.

  let {responseHeaders} = details;

  // Find the last Content-Type header.
  let contentTypeHeader = responseHeaders
        .slice().reverse()
        .find(h => h.name.toLowerCase() == "content-type");

  // If Content-Type header is not set, the browser is going to do content-sniffing,
  // and we should also return to avoid trouble (e.g. breaking downloads, PDFs, videos, ...).
  if (contentTypeHeader === undefined) {
    console.log('Content-Type header not found for '+details.url+', skipping filtering');
    return;
  }

  // If it not a supported content type, we will return rather than guess.
  let baseType;
  let contentType = contentTypeHeader.value.trim();
  if(contentType.startsWith('text/html')) {
    baseType = 'text/html';
  } else if (contentType.startsWith('application/xhtml+xml')) {
    baseType = 'application/xhtml+xml';
  } else {
    console.log('Content type '+contentType+' not supported for '+details.url+', skipping filtering.');
    return;
  }

  // Set up TextDecoder
  console.log('Initial checks passed, beginning charset detection for '+details.url);
  let charset = detectCharset(contentType) || 'utf-8';
  let decoder = new TextDecoder(charset);
  console.log('The detected charset was '+charset+' for '+details.url);

  // While TextDecoder supports most charset encodings, TextEncoder does NOT support
  // other than 'utf-8', so it is necessary to change the Content-Type on the header
  // to UTF-8. If modifying this block of code, ensure that the tests at
  // https://www.w3.org/2006/11/mwbp-tests/index.xhtml
  // pass - current implementation only fails on #9 but this detection ensures
  // tests #3,4,5, and 8 pass.
  let encoder = new TextEncoder(); 
  contentTypeHeader.value = baseType+';charset=utf-8';

  
  // Now the actual filtering can begin!
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let fullStr = '';
  
  filter.ondata = e => {
    // Note that the event's data may break in the middle of an encoded
    // character - the stream parameter is critical for success as this
    // method gets called multiple times.
    let str = decoder.decode(e.data, {stream: true});
    fullStr += str;
  }
  
  filter.onstop = async e => {
    fullStr += decoder.decode(); //Flush the buffer
    // Just change any instance of Test in the HTTP response to WebExtension Test.
    let mutatedStr = fullStr.replace(/Test/g, 'WebExtension Test');
    filter.write(encoder.encode(mutatedStr));
    filter.close();
  }

  // Because details response headers have been mutated, return them
  return details;
}

// This code tries to snag the last charset indicated
// but is still not robust to poorly formed inputs.
function detectCharset(contentType) {
  let charsetMarker = "charset=";
  let foundIndex = contentType.lastIndexOf(charsetMarker);
  if (foundIndex == -1) {
      return undefined;
  }
  let charsetMaybeQuoted = contentType.substr(foundIndex+charsetMarker.length).trim().toLowerCase();
  let charset = charsetMaybeQuoted.replace(/"/g, '');
  return charset;
}

browser.webRequest.onHeadersReceived.addListener(
  listener,
  {
    urls: ["https://www.w3.org/*"], // Include W3 for testing charset detection.
    types: ["main_frame"]
  },
  ["blocking","responseHeaders"]
);