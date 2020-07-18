
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
                A high-quality tree database for educators, students and lay persons.
                <div className="searchButton">
                  <a  href='/search'>
                  <i className="fa fa-search"></i>
                  start searching</a>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <p>
            The <i>Tree Library</i> is a digital platform for teaching and studying trees with a focus on promoting awareness and understanding of trees and their global importance to the environment.
            </p>
            <div className="photoBanner">
              <div>
                <a href="/search?s=47">
                  <picture>
                    <source srcset="images/homepage-banner/1.webp" type="image/webp" />
                    <img src="images/homepage-banner/1.jpg"/>
                  </picture>
                </a>
                <a href="/search?s=2">
                  <picture>
                    <source srcset="images/homepage-banner/9.webp" type="image/webp" />
                    <img src="images/homepage-banner/9.jpg"/>
                  </picture>
                </a>
              </div><div>
                <a href="/search?s=31">
                  <picture>
                    <source srcset="images/homepage-banner/6.webp" type="image/webp" />
                    <img src="images/homepage-banner/6.jpg"/>
                  </picture>
                </a>
                <a href="/search?s=101">
                  <picture>
                    <source srcset="images/homepage-banner/5.webp" type="image/webp" />
                    <img src="images/homepage-banner/5.jpg"/>
                  </picture>
                </a>
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
              Make use of the site from any platform or device with access to an internet browser. Whether projecting in a classroom or studying from a phone while walking around a park, <b>TreeLib</b> aims to be accessible everywhere.  Want to develop a specific format for your class? Contact us to develop scripts and picture series to fit your needs.
            </p>
            <div className="photoBanner">
              <div>
                <a href="/search?s=78">
                  <picture>
                    <source srcset="images/homepage-banner/4.webp" type="image/webp" />
                    <img src="images/homepage-banner/4.jpg"/>
                  </picture>
                </a>
                <a href="/search?s=42">
                  <picture>
                    <source srcset="images/homepage-banner/2.webp" type="image/webp" />
                    <img src="images/homepage-banner/2.jpg"/>
                  </picture>
                </a>
                </div><div>
                <a href="/search?s=146">
                  <picture>
                    <source srcset="images/homepage-banner/7.webp" type="image/webp" />
                    <img src="images/homepage-banner/7.jpg"/>
                  </picture>
                </a>
                <a href="/search?s=41">
                  <picture>
                    <source srcset="images/homepage-banner/8.webp" type="image/webp" />
                    <img src="images/homepage-banner/8.jpg"/>
                  </picture>
                </a>
              </div>
            </div>
            <p>
              <b>TreeLib</b> is for educational purposes.  Copying information or pictures for commercial purposes is not permitted without specific written permission from the author.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('app'));
