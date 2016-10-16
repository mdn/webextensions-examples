/*
 * This file is responsible for performing the logic of replacing
 * all occurances of each mapped word with its emoji counterpart.
 */

// emojiMap.js defines the 'dictionary' variable.
// Referenced here to reduce confusion.
const emojiMap = dictionary;

/*
 * For efficiency, create a word --> search RegEx Map too.
 */
let regexs = new Map();
for (let word of emojiMap.keys()) {
  // We want a global, case-insensitive replacement.
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  regexs.set(word, new RegExp(word, 'gi'));
}

/**
 * Substitutes emojis into text nodes.
 * If the node contains more than just text (ex: it has child nodes),
 * call replaceText() on each of its children.
 *
 * @param  {Node} element - The target DOM element.
 * @return {void}         - Note: the emoji substitution is done inline.
 */
function replaceText (element) {
  // Setting textContent on a node removes all of its children and replaces
  // them with a single text node. Since we don't want to alter the DOM aside
  // from substituting text, we only substitute on single text nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  if (element.nodeType === Node.TEXT_NODE) {
    // This node only contains text.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

    // Because DOM manipulation is slow, we don't want to keep setting
    // textContent after every replacement. Instead, manipulate a copy of
    // this string outside of the DOM and then perform the manipulation
    // once, at the end.
    let content = element.textContent;

    // Replace every occurance of 'word' in 'content' with its emoji.
    // Use the emojiMap for replacements.
    for (let [word, emoji] of emojiMap) {
      // Grab the search regex for this word.
      const regex = regexs.get(word);

      // Actually do the replacement / substitution.
      // Note: if 'word' does not appear in 'content', nothing happens.
      content = content.replace(regex, emoji);
    }

    // Now that all the replacements are done, perform the DOM manipulation.
    element.textContent = content;
  }
  else {
    // This node contains more than just text, call replaceText() on each
    // of its children.
    for (let i = 0; i < element.childNodes.length; i++) {
      replaceText(element.childNodes[i]);
    }    
  }
}

// Start the recursion from the body tag.
replaceText(document.body);
