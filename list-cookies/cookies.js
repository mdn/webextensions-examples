function showCookiesForTab(tabs) {
  //get the first tab object in the array
  var tab = tabs.pop();

  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {

    //set the header of the panel
    var activeTabUrl = document.getElementById('header-title');
    var text = document.createTextNode("Cookies at: "+tab.title);
    var cookieList = document.getElementById('cookie-list');
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      //add an <li> item with the name and value of the cookie to the list
      for (var cookie of cookies) {
        var li = document.createElement("li");
        li.setAttribute("id", cookie.name);
        var content = document.createTextNode(`${cookie.name}: ${cookie.value}`);
        li.appendChild(content);
        var btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "delete");
        btn.setAttribute("cookieName", cookie.name);
        btn.setAttribute("url", tab.url);
        btn.addEventListener("click", deleteCookie);
        li.appendChild(btn);
        cookieList.appendChild(li);
      }
    } else {
      var p = document.createElement("p");
      var content = document.createTextNode("No cookies in this tab.");
      var parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
};

function deleteCookie() {
  var cookieName = this.getAttribute("cookieName");
  var url = this.getAttribute("url");
  var removing = browser.cookies.remove({url: url, name: cookieName});
  removing.then(onCookieRemoved, onDeleteCookieError).catch(onDeleteCookieException);
}

function onCookieRemoved(cookie) {
  console.log(`Removed cookie: ${JSON.stringify(cookie)}`);
  var li = document.getElementById(cookie.name);
  li.remove();
}

function onDeleteCookieError(error) {
  console.log(`Error removing cookie: ${error}`);
}

function onDeleteCookieException(error) {
  console.log(`Exception removing cookie: ${error}`);
}


//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showCookiesForTab);

//        var removing = browser.cookies.remove({url: 'http://example.com', name: cookie.name, storeId: cookie.storeId});
//        removing.then(onCookieRemoved, onCookieRemovalError).catch(onCookieDeletionError);
