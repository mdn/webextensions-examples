function showCookiesForTab(tabs) {
  //get the first tab object in the array
  tab = tabs.pop();

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
      for (cookie of cookies) {
        var li = document.createElement("li");
        var content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
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

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showCookiesForTab);
