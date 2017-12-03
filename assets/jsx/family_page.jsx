
import React from 'react';
import ReactDOM from 'react-dom';

import BasicNavbar from './components/basicNavbar.jsx';
import Family from './components/family.jsx';

var pg = pageData;

class App extends React.Component {
    render() {
        return (
            <div className="mainContainer">
            	<BasicNavbar />
                <Family family={pg.family} photos={pg.photos}/>
            </div>
        );
    }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
