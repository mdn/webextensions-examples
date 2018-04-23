"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import {loadStoredImages, removeStoredImages} from './utils/image-store';

class NavigateCollectionUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storedImages: [],
    };

    this.onFilterUpdated = this.onFilterUpdated.bind(this);
    this.onReload = this.onFilterUpdated;

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // Load the stored image once the component has been rendered in the page.
    this.onFilterUpdated();
  }

  onFilterUpdated() {
    loadStoredImages(this.refs.imageFilter.value)
      .then((storedImages) => {
        this.setState({storedImages});
      })
      .catch(console.error);
  }

  onDelete() {
    const {storedImages} = this.state;
    this.setState({storedImages: []});

    removeStoredImages(storedImages).catch(console.error);
  }

  render() {
    const {storedImages} = this.state;

    return (
      <div>
        <h3>Stored images</h3>
        <input placeholder="filter image" ref="imageFilter" onChange={this.onFilterUpdated}/>
        <button onClick={this.onReload}>reload</button>
        <button onClick={this.onDelete}>delete</button>
        <ul className="thumbnails">
          {
            storedImages.map(({storedName, blobUrl}) => {
              const onClickedImage = () => {
                this.refs.imageFilter.value = storedName;
                this.onFilterUpdated();
              };
              return <li key={storedName}><img src={blobUrl} onClick={onClickedImage}/></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<NavigateCollectionUI/>, document.getElementById('app'));
