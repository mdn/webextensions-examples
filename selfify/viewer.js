var params = new URLSearchParams(window.location.search);
var imageBlobURL = params.get("blobURL");
document.querySelector("img").setAttribute("src", imageBlobURL);
