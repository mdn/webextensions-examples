/**
 * Show a notification when we get messages from the content script.
 */
browser.runtime.onMessage.addListener((message) => {
  browser.notifications.create({
    type: "basic",
    title: "Message from the page",
    message: message.content
  });
});
