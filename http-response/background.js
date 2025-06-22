"use strict";

function splice(arr, starting, deleteCount, elements = []) {
  if (arguments.length === 1) {
    return arr;
  }
  starting = Math.max(starting, 0);
  deleteCount = Math.max(deleteCount, 0);

  const newSize = arr.length - deleteCount + elements.length;
  const splicedArray = new Uint8Array(newSize);
  splicedArray.set(arr.subarray(0, starting));
  if (elements.length) {
    splicedArray.set(elements, starting);
  }
  splicedArray.set(arr.subarray(starting + deleteCount), starting + elements.length);
  return splicedArray;
}

function mergeTypedArrays(a, b) {
  const c = new Uint8Array(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
}

function listener(details) {
  const filter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  const url = new URL(details.url);
  if (url.hostname === "example.com") {
    const bytes = encoder.encode("</html>");
    filter.ondata = event => {
      const data = new Uint8Array(event.data);
      // Check if this is the last chunk of the response data
      let stream = false;
      for (
        let i = data.length - 1, j = bytes.length - 1;
        i >= 0 && j >= 0;
        i--
      ) {
        if (data[i] === 0xA || data[i] === 0xD) {
          // Ignore newline chars
          continue;
        }
        if (bytes[j--] !== data[i]) {
          // This is not the last chunk of the response data
          stream = true;
          break;
        }
      }
      let str = decoder.decode(event.data, {stream});
      // Just change any instance of Example in the HTTP response
      // to WebExtension Example.
      str = str.replaceAll("Example", "WebExtension Example");
      filter.write(encoder.encode(str));
      filter.disconnect();
    };
  } else {
    const elements = encoder.encode("WebExtension Test");
    const bytes = encoder.encode("Test");
    const oldData = null;
    
    filter.ondata = event => {
      let data = new Uint8Array(event.data);

      if (oldData) {
        data = mergeTypedArrays(oldData, data);
        oldData = null;
      }

      const res = search(bytes, data);
      if (res.length) {
        let len = 0;
        for (const i of res) {
          // Replace "Test" with "WebExtension Test" at the given index
          data = splice(data, i + len, bytes.length, elements);
          len += elements.length - bytes.length;
        }
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

      if (foundIndex !== -1) {
        let found = true;
        while (j < n - foundIndex) {
          if (data[++i] !== bytes[j++]) {
            found = false;
            break;
          }
        }

        if (found) {
          oldData = data.slice(foundIndex);
          data = data.slice(0, foundIndex);
        }
      }
      filter.write(data);
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
