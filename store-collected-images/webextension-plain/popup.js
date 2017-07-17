/* global saveCollectedBlobs, uuidv4, preventWindowDragAndDrop */

"use strict";

class Popup {
  constructor(containerEl) {
    this.containerEl = containerEl;

    this.state = {
      collectedBlobs: [],
      lastMessage: undefined,
    };

    this.onClick = this.onClick.bind(this);

    this.containerEl.querySelector("button.save-collection").onclick = this.onClick;
  }

  get collectionNameValue() {
    return this.containerEl.querySelector("input.collection-name").value;
  }

  setState(state) {
    // Merge the new state on top of the previous one and re-render everything.
    this.state = Object.assign(this.state, state);
    this.render();
  }

  onClick() {
    if (!this.collectionNameValue) {
      this.setState({
        lastMessage: {text: "The collection name is mandatory.", type: "error"},
      });

      setTimeout(() => {
        this.setState({lastMessage: undefined});
      }, 2000);

      return;
    }

    saveCollectedBlobs(this.collectionNameValue, this.state.collectedBlobs)
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
    const {collectedBlobs, lastMessage} = this.state;

    const lastMessageEl = this.containerEl.querySelector("p#error-message");
    if (lastMessage) {
      lastMessageEl.setAttribute("class", lastMessage.type);
      lastMessageEl.textContent = lastMessage.text;
    } else {
      lastMessageEl.setAttribute("class", "");
      lastMessageEl.textContent = "";
    }

    const thumbnailsUl = this.containerEl.querySelector("ul.thumbnails");
    while (thumbnailsUl.firstChild) {
      thumbnailsUl.removeChild(thumbnailsUl.firstChild);
    }

    collectedBlobs.forEach(({uuid, blobUrl}) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      li.setAttribute("id", uuid);
      img.setAttribute("src", blobUrl);
      li.appendChild(img);

      thumbnailsUl.appendChild(li);
    });
  }
}

const popup = new Popup(document.getElementById('app'));

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
