import React from 'react';
import ReactDOM from 'react-dom';

import Nested from './nested-component';

class Popup extends React.Component {
  render() {
    return (
      <div>
        <h1>React Component</h1>
        <p>
          This is an example of a popup UI in React.
        </p>
        <Nested />
      </div>
    );
  }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
