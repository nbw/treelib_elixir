import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import BasicNavbar from './components/BasicNavbar.jsx';
import Species from './components/species.jsx';

var pg = pageData;

class App extends React.Component {
    render() {
        return (
            <div className="mainContainer">
            	<BasicNavbar />
                <Species species={pg.species}/>
            </div>
        );
    }
}

if (self.fetch) {

} else {
    console.log('Unsupported browser. Please use Firefox or Google Chrome')
}


export default App
ReactDOM.render(<App />, document.getElementById('app'));