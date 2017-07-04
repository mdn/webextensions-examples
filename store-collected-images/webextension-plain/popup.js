"use strict";

// Shortcut for React components render methods.
const el = React.createElement;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectedBlobs: [],
      lastMessage: undefined,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    if (!this.refs.collectionName.value) {
      this.setState({
        lastMessage: {text: "The collection name is mandatory.", type: "error"},
      });

      setTimeout(() => {
        this.setState({lastError: undefined});
      }, 2000);

      return;
    }

    saveCollectedBlobs(this.refs.collectionName.value, this.state.collectedBlobs)
      .then(() => {
        this.setState({
          lastMessage: {text: "All the collected images have been saved", type: "success"},
          collectedBlobs: [],
        });

        setTimeout(() => {
          this.setState({lastMessage: undefined});
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          lastMessage: {text: `Failed to save collected images: ${err}`, type: "error"},
        });

        setTimeout(() => {
          this.setState({lastMessage: undefined});
        }, 2000);
      });
  }

  render() {
    const {activeTab, collectedBlobs, lastMessage} = this.state;

    const lastMessageEl = lastMessage && el("p", {
      className: lastMessage.type,
    }, lastMessage.text);

    const collectedBlobsElements = collectedBlobs.map(({uuid, blobUrl}) => {
      return el("li", {key: uuid}, el("img", {src: blobUrl}));
    });

    return el("div", {}, [
      el("h3", {}, "Collected images"),
      lastMessageEl,
      el("input", {placeholder: "collection name", ref: "collectionName"}),
      el("button", {onClick: this.onClick}, "save"),
      el("ul", {className: "thumbnails"}, collectedBlobsElements),
    ]);
  }
}

const popup = ReactDOM.render(el(Popup), document.getElementById('app'));

async function fetchBlobFromUrl(fetchUrl) {
  const res = await fetch(fetchUrl);
  const blob = await res.blob();

  return {
    blob,
    blobUrl: URL.createObjectURL(blob),
    fetchUrl,
    uuid: uuidv4(),
  };
}

preventWindowDragAndDrop();

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.type === "new-collected-images") {
    let collectedBlobs = popup.state.collectedBlobs || [];
    const fetchRes = await fetchBlobFromUrl(msg.url);
    collectedBlobs.push(fetchRes);
    popup.setState({collectedBlobs});
    return true;
  }
});

browser.runtime.sendMessage({type: "get-pending-collected-urls"}).then(async res => {
  let collectedBlobs = popup.state.collectedBlobs || [];

  for (const url of res) {
    const fetchRes = await fetchBlobFromUrl(url);
    collectedBlobs.push(fetchRes);
    popup.setState({collectedBlobs});
  }
});
