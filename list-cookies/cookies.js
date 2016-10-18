window.onload = function(e){
    //get all cookies in the domain
    chrome.cookies.getAll({domain: "developer.mozilla.org"},  function(cookies) {
        var cookieList = document.getElementById('cookie-list');
        //add an <li> item with the name and value of the cookie to the list
        for (x in cookies) {
            var li = document.createElement("li");
            var content = document.createTextNode(cookies[x].name + ": "+ cookies[x].value);
            li.appendChild(content);
            cookieList.appendChild(li);
        }
    });
};
