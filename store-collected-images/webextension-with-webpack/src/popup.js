"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import uuidV4 from 'uuid/v4';

import preventWindowDragAndDrop from './utils/handle-window-drag-and-drop';
import {saveCollectedBlobs} from './utils/image-store';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectedBlobs: [],
      lastMessage: undefined,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.refs.collectionName.value) {
      this.setState({
        lastMessage: {text: "The collection name is mandatory.", type: "error"},
      });

      // Clear the error message after a 2s timeout.
      setTimeout(() => {
        this.setState({lastMessage: undefined});
      }, 2000);

      return;
    }

    saveCollectedBlobs(this.refs.collectionName.value, this.state.collectedBlobs)
      .then(() => {
        this.setState({
          lastMessage: {text: "All the collected images have been saved", type: "success"},
          collectedBlobs: [],
        });

        // Clear the error message after a 2s timeout.
        setTimeout(() => {
          this.setState({lastMessage: undefined});
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          lastMessage: {text: `Failed to save collected images: ${err}`, type: "error"},
        });

        // Clear the error message after a 2s timeout.
        setTimeout(() => {
          this.setState({lastMessage: undefined});
        }, 2000);
      });
  }

  render() {
    const {collectedBlobs, lastMessage} = this.state;

    return (
      <div>
        <h3>Collected images</h3>
        {lastMessage && <p className={lastMessage.type}>{lastMessage.text}</p>}
        <input placeholder="collection name" ref="collectionName"/>
        <button onClick={this.onClick}>save</button>
        <ul className="thumbnails">
          {
            collectedBlobs.map(({uuid, blobUrl}) => {
              return <li key={uuid}><img src={blobUrl}/></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

const popup = ReactDOM.render(<Popup/>, document.getElementById('app'));

async function fetchBlobFromUrl(fetchUrl) {
  const res = await fetch(fetchUrl);
  const blob = await res.blob();

  return {
    blob,
    blobUrl: URL.createObjectURL(blob),
    fetchUrl,
    uuid: uuidV4(),
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
