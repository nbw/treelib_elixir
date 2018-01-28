
import BasicNavbar  from './components/basicNavbar.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <BasicNavbar />
        <div className='homePage'>
          <div className="banner">
            <div className="innerBanner">
              <span className="helper"></span>
              <div className="wrapper">
                A collection of high-quality tree photographs for educators, students and lay persons.
                <div className="searchButton">
                  <a  href='/search'>start searching</a>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <p>
              A <i>tree library</i> for students, professors, laymen, artists, naturalists – anyone studying trees or who just appreciates their beauty.  Need more pictures for a dendrology class, or to make your own collection, or to add background to a new website? <b>TreeLib</b> is yours all in one spot.
            </p>
            <div className="photoBanner">
              <div>
                <a href="/search?s=47"><img src="images/homepage-banner/1.jpg"/></a>
                <a href="/search?s=2"><img src="images/homepage-banner/9.jpg"/></a>
                </div><div>
                <a href="/search?s=31"><img src="images/homepage-banner/6.jpg"/></a>
                <a href="/search?s=101"><img src="images/homepage-banner/5.jpg"/></a>

              </div>
            </div>
          </div>
          <div className="banner">
            <div className="innerBanner">
              <span className="helper"></span>
              <div className="wrapper">
                Trees are our silent partners, sensing us as we move about, providing shelter, offering us beauty, and nurturing and protecting the earth.
              </div>
            </div>
          </div>
          <div className="section">
            <p>
              Help yourself to the site, at home or in the field, to enhance your learning and understanding of the trees around you. It is not the final resource for every aspect of identification, but rather a tool to be used to visually complement many other good sources of information.  Visitors are encouraged to connect to other excellent sources of technical information such as the Northern Ontario Plant Database, Wikipedia and so on.
            </p>
            <div className="photoBanner">
              <div>
                <a href="/search?s=78"><img src="images/homepage-banner/4.jpg"/></a>
                <a href="/search?s=42"><img src="images/homepage-banner/2.jpg"/></a>
                </div><div>
                <a href="/search?s=146"><img src="images/homepage-banner/7.jpg"/></a>
                <a href="/search?s=41"><img src="images/homepage-banner/8.jpg"/></a>
              </div>
            </div>
            <p>
              <u><b>TreeLib</b> is for educational purposes</u> to complement many excellent sources of technical information on trees. Copying them and using them for commercial purposes is not permitted without specific written permission from the author.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('app'));
