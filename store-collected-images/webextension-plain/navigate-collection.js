/* global loadStoredImages, removeStoredImages */

"use strict";

class NavigateCollectionUI {
  constructor(containerEl) {
    this.containerEl = containerEl;

    this.state = {
      storedImages: [],
    };

    this.onFilterUpdated = this.onFilterUpdated.bind(this);
    this.onReload = this.onFilterUpdated;
    this.onDelete = this.onDelete.bind(this);

    this.containerEl.querySelector("button.reload-images").onclick = this.onReload;
    this.containerEl.querySelector("button.delete-images").onclick = this.onDelete;
    this.containerEl.querySelector("input.image-filter").onchange = this.onFilterUpdated;

    // Load the stored image once the component has been rendered in the page.
    this.onFilterUpdated();
  }

  get imageFilterValue() {
    return this.containerEl.querySelector("input.image-filter").value;
  }

  set imageFilterValue(value) {
    return this.containerEl.querySelector("input.image-filter").value = value;
  }

  setState(state) {
    // Merge the new state on top of the previous one and re-render everything.
    this.state = Object.assign(this.state, state);
    this.render();
  }

  componentDidMount() {
    // Load the stored image once the component has been rendered in the page.
    this.onFilterUpdated();
  }

  onFilterUpdated() {
    loadStoredImages(this.imageFilterValue)
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

    const thumbnailsUl = this.containerEl.querySelector("ul.thumbnails");
    while (thumbnailsUl.firstChild) {
      thumbnailsUl.removeChild(thumbnailsUl.firstChild);
    }

    storedImages.forEach(({storedName, blobUrl}) => {
      const onClickedImage = () => {
        this.imageFilterValue = storedName;
        this.onFilterUpdated();
      };
      const li = document.createElement("li");
      const img = document.createElement("img");
      li.setAttribute("id", storedName);
      img.setAttribute("src", blobUrl);
      img.onclick = onClickedImage;

      li.appendChild(img);
      thumbnailsUl.appendChild(li);
    });
  }
}

// eslint-disable-next-line no-unused-vars
const navigateCollectionUI = new NavigateCollectionUI(document.getElementById('app'));
