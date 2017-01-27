browser.topSites.get()
  .then((sites) => {
    var div = document.getElementById('site-list');

    if (!sites.length) {
      div.innerText = 'No sites returned from the topSites API.';
      return;
    }

    let ul = document.createElement('ul');
    ul.className = 'list-group';
    for (let k in sites) {
      let li = document.createElement('li');
      li.className = 'list-group-item';
      let a = document.createElement('a');
      a.href = sites[k].url;
      a.innerText = sites[k].title || sites[k].url;
      li.appendChild(a);
      ul.appendChild(li);
    }

    div.appendChild(ul);
  });
