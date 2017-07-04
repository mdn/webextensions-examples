"use strict";

// Shortcut for React components render methods.
const el = React.createElement;

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

    const storedImagesElements = storedImages.map(({storedName, blobUrl}) => {
      const onClickedImage = () => {
        this.refs.imageFilter.value = storedName;
        this.onFilterUpdated();
      };
      return el("li", {key: storedName}, el("img", {src: blobUrl, onClick: onClickedImage}));
    });

    return el("div", {}, [
      el("h3", {}, "Stored images"),
      el("input", {
        placeholder: "filter image",
        ref: "imageFilter",
        onChange: this.onFilterUpdated,
      }),
      el("button", {onClick: this.onReload}, "reload"),
      el("button", {onClick: this.onDelete}, "delete"),
      el("ul", {className: "thumbnails"}, storedImagesElements),
    ]);
  }
}

ReactDOM.render(el(NavigateCollectionUI), document.getElementById('app'));
