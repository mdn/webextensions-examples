
const button1 = document.querySelector("#function-notify");

button1.addEventListener("click", () => {
  window.notify("Message from the page script!");
});

const button2 = document.querySelector("#object-notify");

button2.addEventListener("click", () => {
  window.messenger.notify("Message from the page script!");
});
