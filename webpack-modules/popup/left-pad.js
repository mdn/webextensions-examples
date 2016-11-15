const leftPad = require("left-pad");

const resultNode = document.getElementById("result");
const textNode = document.getElementById("text");
const amountNode = document.getElementById("amount");
const withNode = document.getElementById("with");

document.getElementById("leftpad-form").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("padding");
    resultNode.value = leftPad(textNode.value, amountNode.valueAsNumber, withNode.value);
}, false);

document.getElementById("pad-bg").addEventListener("click", (e) => {
    var sendingMessage = browser.runtime.sendMessage({
        text: textNode.value,
        amount: amountNode.valueAsNumber,
        with: withNode.value
    });
    sendingMessage.then((result) => {
      resultNode.value = result;
    });
});
