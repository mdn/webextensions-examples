function listener(details) {
  // The received data is a stream of bytes. In order to do text-based
  // modifications, it is necessary to decode the bytes into a string
  // using the proper character encoding, do any modifications, then
  // encode back into a stream of bytes.
  // Historically, detecting character encoding has been a tricky task
  // taken on by the browser. Here, a simplified approach is taken
  // and the complexity is hidden in a helper method.
  let decoder, encoder;
  [decoder, encoder] = detectCharsetAndSetupDecoderEncoder(details);
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
    // Just change any instance of Example or Test in the HTTP response
    // to WebExtension Example or WebExtension Test.
    let mutatedStr = fullStr.replace(/Example/g, 'WebExtension Example');
    mutatedStr = mutatedStr.replace(/Test/g, 'WebExtension Test');
    filter.write(encoder.encode(mutatedStr));
    filter.close();
  }

  filter.onerror = e => {
    try {
        filter.close();
        console.log('Filter error: '+e+', '+ex);
    } catch(ex) {
        console.log('Filter error while closing: '+e+', '+ex);
    }
  }

  // Because details response headers have been mutated, return it
  return details;
}

browser.webRequest.onHeadersReceived.addListener(
  listener,
  {
    urls: ["https://example.com/*", "https://www.w3.org/*"], // Include W3 for testing charset detection.
    types: ["main_frame"]
  },
  ["blocking","responseHeaders"]
);

// This helper method does a few things regarding character encoding:
// 1) Detects the charset for the TextDecoder so that bytes are properly turned into strings
// 2) Ensures the output Content-Type is UTF-8 because that is what TextEncoder supports
// 3) Returns the decoder/encoder pair
function detectCharsetAndSetupDecoderEncoder(details) {
  let contentType = '';
  let headerIndex = -1;
  for(let i=0; i<details.responseHeaders.length; i++) {
      let header = details.responseHeaders[i];
      if(header.name.toLowerCase() == "content-type") {
          contentType = header.value.toLowerCase();
          headerIndex = i;
          break;
      }
  }
  if (headerIndex == -1) {
    console.log('No Content-Type header detected for '+details.url+', adding one.');
    headerIndex = details.responseHeaders.length;
    contentType = 'text/html';
    details.responseHeaders.push(
      {
        "name": "Content-Type",
        "value":"text/html"
      }
    );
  }

  let baseType;
  if(contentType.trim().startsWith('text/html')) {
    baseType = 'text/html';
    console.log('Detected base type was '+baseType);
  } else if(contentType.trim().startsWith('application/xhtml+xml')) {
    baseType = 'application/xhtml+xml';
    console.log('Detected base type was '+baseType);
  } else {
    baseType = 'text/html';
    console.log('The Content-Type was '+contentType+', not text/html or application/xhtml+xml - results might be strange.');
  }

  // It is important to detect the charset to correctly initialize TextDecoder or
  // else we run into garbage output sometimes.
  // However, TextEncoder does NOT support other than 'utf-8', so it is necessary
  // to change the Content-Type on the header to UTF-8
  // If modifying this block of code, ensure that the tests at
  // https://www.w3.org/2006/11/mwbp-tests/index.xhtml
  // all pass - current implementation only fails on #9 but this detection ensures
  // tests #3,4,5, and 8 pass.
  let decodingCharset = 'utf-8';
  let detectedCharset = detectCharset(contentType);

  if(detectedCharset !== undefined) {
      decodingCharset = detectedCharset;
      console.log('Detected charset was ' + decodingCharset + ' for ' + details.url);
  }
  details.responseHeaders[headerIndex].value = baseType+';charset=utf-8';

  let decoder = new TextDecoder(decodingCharset);
  let encoder = new TextEncoder(); //Encoder does not support non-UTF-8 charsets so this is always utf-8.

  return [decoder,encoder];
}

// Detect the charset from Content-Type
function detectCharset(contentType) {
  /*
  From https://tools.ietf.org/html/rfc7231#section-3.1.1.5:

  A parameter value that matches the token production can be
  transmitted either as a token or within a quoted-string.  The quoted
  and unquoted values are equivalent.  For example, the following
  examples are all equivalent, but the first is preferred for
  consistency:

  text/html;charset=utf-8
  text/html;charset=UTF-8
  Text/HTML;Charset="utf-8"
  text/html; charset="utf-8"

  Internet media types ought to be registered with IANA according to
  the procedures defined in [BCP13].

  Note: Unlike some similar constructs in other header fields, media
  type parameters do not allow whitespace (even "bad" whitespace)
  around the "=" character.

  ...

  And regarding application/xhtml+xml, from https://tools.ietf.org/html/rfc3236#section-2
  and the referenced links, it can be seen that charset is handled the same way with
  respect to Content-Type.
  */

  let charsetMarker = "charset="; // Spaces *shouldn't* matter
  let foundIndex = contentType.indexOf(charsetMarker);
  if (foundIndex == -1) {
      return undefined;
  }
  let charsetMaybeQuoted = contentType.substr(foundIndex+charsetMarker.length).trim();
  let charset = charsetMaybeQuoted.replace(/\"/g, '');
  return charset;
}