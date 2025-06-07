"use strict";

function listener(details) {
  const filter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  const url = new URL(details.url);
  if (url.hostname != "www.w3.org") {
    filter.ondata = event => {
      let str = decoder.decode(event.data, {stream: true});
      // Just change any instance of Example in the HTTP response
      // to WebExtension Example.
      str = str.replace(/Example/g, 'WebExtension Example');
      filter.write(encoder.encode(str));
      filter.disconnect();
    };
  } else {
    const elements = encoder.encode("WebExtension ");
    const bytes = encoder.encode("Test");
    const oldData = [];
    filter.ondata = event => {
      let data = event.data;
      data = new Uint8Array(data);
      data = Array.from(data);

      if (oldData.length) {
        data = oldData.concat(data);
        oldData.length = 0;
      }

      let len = 0;
      const res = search(bytes, data);
      for (const i of res) {
        // Insert "WebExtension " at the given index
        data.splice(i + len, 0, ...elements);
        len += elements.length;
      }

      // Check if the word "Test" is cropped at the end, e.g. "<h1>Tes"
      const n = data.length;
      const m = bytes.length;

      let i = n;
      let j = 1;

      let foundIndex = -1;

      while (--i > n - m) {
        if (bytes[0] === data[i]) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex != -1) {
        let found = true;
        while (j < n - foundIndex) {
          if (data[++i] !== bytes[j++]) {
            found = false;
            break;
          }
        }

        if (found) {
          oldData.push(...data.slice(foundIndex));
          data = data.slice(0, foundIndex);
        }
      }
      filter.write(new Uint8Array(data));
    };

    filter.onstop = () => {
      filter.close();
    };
  }
  
  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://example.com/*", "https://www.w3.org/2006/11/mwbp-tests/*"], types: ["main_frame"]},
  ["blocking"]
);

// JavaScript program to search the pattern in given array
// using KMP Algorithm

function constructLps(pat, lps) {
  // len stores the length of longest prefix which
  // is also a suffix for the previous index
  let len = 0;

  // lps[0] is always 0
  lps[0] = 0;

  let i = 1;
  while (i < pat.length) {
    // If characters match, increment the size of lps
    if (pat[i] === pat[len]) {
      lps[i++] = ++len;
    }
    // If there is a mismatch
    else {
      if (len !== 0) {
        // Update len to the previous lps value
        // to avoid redundant comparisons
        len = lps[len - 1];
      } else {
        // If no matching prefix found, set lps[i] to 0
        lps[i++] = 0;
      }
    }
  }
}

function search(pat, arr) {
  const n = arr.length;
  const m = pat.length;

  const lps = new Array(m);
  const res = [];

  constructLps(pat, lps);

  // Pointers i and j, for traversing
  // the array and pattern
  let i = 0;
  let j = 0;

  while (i < n) {
    // If characters match, move both pointers forward
    if (arr[i] === pat[j]) {
      i++;
      j++;

      // If the entire pattern is matched
      // store the start index in result
      if (j === m) {
        res.push(i - j);
        // Use LPS of previous index to
        // skip unnecessary comparisons
        j = lps[j - 1];
      }
    }
    // If there is a mismatch
    else {
      // Use lps value of previous index
      // to avoid redundant comparisons
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return res;
}
