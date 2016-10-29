/*
list tabs in the current window
 */
function listTabs() {
    chrome.tabs.query({
        currentWindow: true
    }, function(tabs) {
        var tabsList = document.getElementById('tabs-list'),
            currentTabs = document.createDocumentFragment();

        tabs.innerHTML = '';

        for (var tab of tabs) {
            if (!tab.active) {
                var tabLink = document.createElement('a');

                tabLink.innerHTML = tab.title;
                tabLink.setAttribute('href', tab.id);
                currentTabs.appendChild(tabLink);
            }
        }

        tabsList.appendChild(currentTabs);
    });
}

/*
get link that was clicked on
 */
function getLink(e) {
    var link = e.target;
    while ((link.tagName != "A" || !link.href) && link.parentNode) {
        link = link.parentNode;
    }

    if (link.tagName != "A") {
        return;
    }

    return link;
}

function switchTabs(e) {
    var link = getLink(e),
        tabId = +link.getAttribute('href');

    chrome.tabs.query({
        currentWindow: true
    }, function(tabs) {
        for (var tab of tabs) {
            if (tab.id === tabId) {
                chrome.tabs.update(tabId, {
                    active: true
                });
            }
        }
    });

    e.preventDefault();
}

document.addEventListener("click", switchTabs);

document.addEventListener("DOMContentLoaded", listTabs);