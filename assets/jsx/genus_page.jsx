import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import BasicNavbar from './components/BasicNavbar.jsx';
import Genus from './components/genus.jsx';

var pg = pageData;

class App extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <BasicNavbar />
        <Genus genus={pg.genus} photos={pg.photos}/>
      </div>
    );
  }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
