
import BasicNavbar  from './components/basicNavbar.jsx';
import Home         from './components/home.jsx';
import About        from './components/about.jsx';
import Contact      from './components/contact.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPage: pageData || "home"
    };
  }
  render() {
    let selectedPage = this.state.selectedPage;

    let page; 
    switch(selectedPage) {
      case "contact":
        page = <Contact/>;
        break;
      case "about":
        page = <About/>;
        break;
      default:
        page = <Home/>;
    }


    return (
      <div className="mainContainer">
        <BasicNavbar />
        {page}
      </div>
    );
  }
}

if (!self.fetch) {
  console.log('Unsupported browser. Please use Firefox or Google Chrome');
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
