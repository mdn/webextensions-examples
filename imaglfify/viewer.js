const params = new URLSearchParams(window.location.search);
const imageBlobURL = params.get("blobURL");
document.querySelector("img").setAttribute("src", imageBlobURL);
