import React from 'react';
import ReactDOM from 'react-dom';

import BasicNavbar from './components/basicNavbar.jsx';
import Home    from './components/home.jsx';
import AboutPage   from './components/about_page.jsx';
import ContactPage from './components/contact_page.jsx';

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
        page = <ContactPage/>;
        break;
      case "about":
        page = <AboutPage/>;
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

if (self.fetch) {

} else {
  console.log('Unsupported browser. Please use Firefox or Google Chrome')
}

export default App

ReactDOM.render(<App />, document.getElementById('app'));
