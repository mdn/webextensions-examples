function getActiveTab() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    showCookiesForTab(tabs);
  });
}

function showCookiesForTab(tabs) {
  if (tabs.length === 0) {
    return; // No tabs found, likely an error condition
  }

  // Get the first tab object in the array
  let tab = tabs[0]; // Changed from pop() to directly access the first element

  // Get all cookies in the domain
  chrome.cookies.getAll({url: tab.url}, function(cookies) {
    // Set the header of the panel
    let activeTabUrl = document.getElementById('header-title');
    activeTabUrl.textContent = "Cookies at: " + tab.title; // Simplified textContent usage

    let cookieList = document.getElementById('cookie-list');
    cookieList.innerHTML = ''; // Clear previous entries

    if (cookies.length > 0) {
      // Add an <li> item with the name and value of the cookie to the list
      cookies.forEach(function(cookie) {
        let li = document.createElement("li");
        li.textContent = cookie.name + ": " + cookie.value; // Simplified textContent usage
        cookieList.appendChild(li);
      });
    } else {
      let p = document.createElement("p");
      p.textContent = "No cookies in this tab."; // Simplified textContent usage
      cookieList.appendChild(p);
    }
  });
}

// Call getActiveTab to start the process
getActiveTab();
