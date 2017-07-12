function handleError(error) {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}

function handleResult(result) {
  console.log('Function handleResult');
  console.log(result);
  if (result[0] !== undefined) {
    console.log(`jQuery: ${result[0]}`);
  } else if (result[1]) {
    handleError(result[1]);
  }
}

const checkjQuery = "typeof jQuery != 'undefined'";
document.getElementById("jquery").addEventListener("click", () => {
  browser.devtools.inspectedWindow.eval(checkjQuery)
    .then(handleResult);
});

const evalButton = document.querySelector("#reddinate");
const evalString = "$0.style.backgroundColor = 'red'";
document.getElementById("background").addEventListener("click", () => {
  browser.devtools.inspectedWindow.eval(evalString)
    .then(handleResult);
});

const inspectString = "inspect(document.querySelector('h1'))";
document.getElementById("h1").addEventListener("click", function(){
    browser.devtools.inspectedWindow.eval(inspectString)
    .then(handleResult);  
}); 

const scriptToAttach = "document.body.innerHTML = 'Hi from the devtools';";
document.getElementById("message").addEventListener("click", () => {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: scriptToAttach
  });
  
  newPanel.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: scriptToAttach
  });
});
