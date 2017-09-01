browser.tabs.query({
	active: true,
	currentWindow: true
}, function (tabs) {

	const url = tabs[0].url.split('?')[0] ;
	const holderObj = document.querySelector('#holder');
	const tableObj = document.createElement('table');
	const XHR = new XMLHttpRequest();
	const hexedURL = stringToHex(url);

	XHR.open('GET', `http://plugin.myip.ms/hex_${hexedURL}`, true);
	XHR.send();
	XHR.onreadystatechange = function(){
		try{
			if (XHR.readyState == 4 && XHR.status == 200){
				const result = JSON.parse(XHR.responseText);

				if(result.domain && result.domain!="")
					tableObj.appendChild(createTRNode('Domain Name', result.domain));
				if(result.ip && result.ip!="")
					tableObj.appendChild(createTRNode('IP', result.ip, true));
				if(result.ipv4 && result.ipv4!="")
					tableObj.appendChild(createTRNode('IPV4', result.ipv4));
				if(result.ipv6 && result.ipv6!="")
					tableObj.appendChild(createTRNode('IPV6', result.ipv6));
				if(result.hosting && result.hosting!="")
					tableObj.appendChild(createTRNode('Hosted By', result.hosting));
				if(result.owners && result.owners!="")
					tableObj.appendChild(createTRNode('Owners', result.owners));
				if(result.countryName && result.countryName!="")
					tableObj.appendChild(createTRNode('Country', result.countryName));
				if(result.host && result.host!="")
					tableObj.appendChild(createTRNode('Host', result.host));
				if(result.ns && result.ns!="")
					tableObj.appendChild(createTRNode('Name Servers', result.ns));

				document.getElementsByTagName('h3')[0].remove();
				holderObj.appendChild(tableObj);
			}
		}catch(e) {
			document.querySelector('#holder').textContent = "Something went Wrong!";
		}
        
    }
});

function createTRNode(label, value, isIPNode){
	const tr = document.createElement('tr');
	const tdLabel = document.createElement('td');
	const tdValue = document.createElement('td');
	tdLabel.textContent = label;
	tr.appendChild(tdLabel);
	tr.appendChild(processNode(tdValue, value, isIPNode));
	return tr;
}



function strip(string){
  return string.split("<").map(function(d){ return d.split(">").pop(); }).join("");
}

function processNode(obj, str, isIPNode){
	const dirtyNode = str.split('</li><li>');
	dirtyNode.forEach(eachNode => {
		const pTag = document.createElement('p');
		if(isIPNode){
			const aTag = document.createElement('a');
			aTag.setAttribute('href',`http://myip.ms/info/whois/${strip(eachNode)}/`);
			aTag.setAttribute('target',`_blank`);
			aTag.textContent = strip(eachNode);
			pTag.appendChild(aTag);
		}else{
			pTag.textContent = strip(eachNode);	
		}
		obj.appendChild(pTag);
	});
	return obj;
}

function stringToHex(s)
{
	s = unescape(encodeURIComponent(s));
	var h = '', a;
	for(var i=0; i<s.length; i++) {
		a = s.charCodeAt(i).toString(16)
		if (a.length == 1) {
			a = '0' + a;
		}
		h += a
	}
	return h ;
}

