# "Image Reference Collector" example without a webpack build step (and React UI)

## Usage

This version of the example doesn't use Webpack and Babel to transpile the ES6 modules (and JSX)
into JavaScript bundle scripts, so it can be executed (using `web-ext run` or by installing it temporarily from "about:debugging#addons") and changed without any build step.

## NOTE on the plain JavaScript React UI

The UI of this example is based on React (as is the "build with webpack" version of this example), but it uses plain JavaScript instead of JSX (the "HTML"-like syntax usually used in "React"-based projects), and so the component UI hierarchy is composed of `React.createElement` function calls, e.g.

```
class MyReactComponent extends React.Component {
  render() {
    return (
      <div className="important">
        <h3>A title</h3>
        <p>A text paragraph</p>
      </div>
    );
  }
}
```

in plain Javascript (without JSX) this becomes:

```
// Shortcut for React components render methods.
const el = React.createElement;

class Popup extends React.Component {
  render() {
    return el("div", {className: "important"}, [
      el("h3", {}, "A title"),
      el("p", {}, "A text paragraph"),
    ]);
  }
}
```
