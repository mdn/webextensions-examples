function list(results) {
    var element = document.createElement("div");
    for (let searchEngine of results)
    {
        let a = document.createElement('a');

        var img = document.createElement('IMG');
        img.setAttribute("src", searchEngine.favIconUrl);
        img.setAttribute("alt", searchEngine.name);
        img.setAttribute("height", "32");
        img.setAttribute("width", "32");
        element.appendChild(img);

        a.innerText = ' ' + searchEngine.name;

        if (searchEngine.isDefault == true)
        {
            a.innerText += ' ----> Is Default :  ' + searchEngine.isDefault;
        }
        a.innerText += ' \n';

        element.appendChild(a);
    }

    document.getElementById('engine').appendChild(element);
}

browser.search.get().then(list);







