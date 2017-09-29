import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import BasicNavbar from './components/BasicNavbar.jsx';
import Home from './components/home.jsx';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';

var pg = pageData;

class App extends React.Component {
	constructor() {
        super();
        this.state = {
            selectedPage: pg || "home"
        };
    }
    render() {
        var selectedPage = this.state.selectedPage;

        switch(selectedPage) {
        case 'contact':
            var page = <Contact/>
            break;
        case 'about':
            var page = <About/>
            break;
        default:
            var page = <Home/>
        }

        return (
            <div className="mainContainer">
                <BasicNavbar />
                {page}
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
