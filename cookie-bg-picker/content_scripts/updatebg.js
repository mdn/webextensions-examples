browser.runtime.onMessage.addListener(updateBg);

function updateBg(request, sender, sendResponse) {
  var html = document.querySelector('html');
  var body = document.querySelector('body');
  if (request.image) {
    html.style.backgroundImage = 'url(' + request.image + ')';
    body.style.backgroundImage = 'url(' + request.image + ')';
  } else if (request.color) {
    html.style.backgroundColor = request.color;
    body.style.backgroundColor = request.color;
  } else if (request.reset) {
    html.style.backgroundImage = '';
    html.style.backgroundColor = '';
    body.style.backgroundImage = '';
    body.style.backgroundColor = '';
  }
}
