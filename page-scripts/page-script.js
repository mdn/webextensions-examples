var p = document.createElement("p");
p.textContent = "This paragraph was added by a page script.";
p.setAttribute("id", "page-script-para");
document.body.appendChild(p);

window.foo = "This global variable was added by a page script";

window.confirm = function() {
  alert("The page script has also redefined 'confirm'");
}

// add controls
insertControls(document.getElementById("left-column"), "Page script controls");
