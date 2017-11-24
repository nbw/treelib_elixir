import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import BasicNavbar from './components/basicNavbar.jsx';
import Species from './components/species.jsx';

var pg = pageData;

class App extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <BasicNavbar />
        <Species species={pg.species} genus={pg.genus}/>
      </div>
    );
  }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
