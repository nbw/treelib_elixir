
import BasicNavbar  from './components/basicNavbar.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

var pg = pageData;

export default class About extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <BasicNavbar />
        <div className='aboutPage'>
          <div className="tableOfContents">
            <div className="tocTitle"><label><u>Contents</u></label></div>
            <ul>
              <li><a href="#aboutSite">About the site</a></li>
              <li><a href="#speciesHier">Species hierarchy</a></li>
              <li><a href="#aboutPhotos">About the photos</a></li>
              <li><a href="#speciesConfirm">Species confirmation</a></li>
              <li><a href="#bio">Who we are</a></li>
            </ul>
            </div><div className="content">
            <div id="aboutSite">
              <label className="sectionTitle">About the site</label>
              <p>
                <b>TreeLib</b>'s dendrology collection boasts {pg.count.genera} genera and {pg.count.species} species and continues to grow. Origins of the collection can roughly be broken down into:
                <ul>
                  <li>32% from North and Central America</li>
                  <li>23% from Europe</li>
                  <li>23% from Asia (excluding Korea and Japan)</li>
                  <li>15% from Korea and Japan (61% in total from Eurasia)</li>
                  <li>4% from Australia and New Zealand</li>
                  <li>3% from Chile and Argentina</li>
                </ul>
              </p>
              <p>
                The format is streamlined to teach basic characteristics of families and genera, and then focus on specific details of each species. Teaching material is supported by high resolution pictures of defining characteristics through to natural appearance of young and old growth stands.  The unique and completely digital platform makes it most suitable for projecting onto screens in classrooms as well as for use on all digital devices including computers, tablets and smart phones.
              </p>
              <p>
                The site brings together photographs from over 60 professional and lay people from diverse backgrounds in many corners of the world in a collaborative effort in building the database.
              </p>
              <p>
                Thank you for your contributions, everyone!
              </p>
            </div>
            <hr/>
            <div id="speciesHier">
              <label className="sectionTitle">Species hierarchy</label>
              <p>
                All species are arranged by Taxonomic Hierarchy, beginning with Family, which is further divided into Genus and finally into Species.
              </p>
              <div className="taxonomy">
                <ul>
                  <li><b>Family</b> → ex.: Pinaceae (Pine)
                    <ul>
                      <li><b>Genus</b> → ex.: Picea (spruce)
                        <ul><li><b>Species</b> → ex.: Picea sitchensis (Sitka spruce)</li></ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <p>
                Search names are presented in Latin and English, and either can be turned on or off in the menu to improve usability.
              </p>
            </div>
            <hr/>
            <div id="aboutPhotos">
              <label className="sectionTitle">About the photos</label>
              <div>
                <label className="subsectionTitle">How the photos were taken</label>
                <p>
                  Many of the photos were taken by the author in botanical gardens, larger private collections, university arboretums, private gardens and natural forests across Western North America and in Japan.
                </p>
                <p>
                  But an equally important number of pictures in the database was kindly contributed by over 60 outside photographers including members of dendrology societies, universities, botanical gardens and private individuals documenting their collections or travels.
                </p>
                <p>
                  This database has become a cooperative site built by many individuals throughout the world. The Contributors section provides links to all of the people in our network and the species to which they have contributed.
                </p>
                <p>
                  Photos by the author were taken with a Canon 70D camera, using 40mm, 17mm x 85mm and 18mm x 55mm lenses. The 70D is equipped lens stabilizing technology and with Canon’s new high resolution CMOS 70D sensor which allows raising film speed to up to 2000 or more without noticeable graininess.
                </p>
              </div>
            </div>
            <hr/>
            <div id="speciesConfirm">
              <label className="sectionTitle">Species confirmation</label>
              <p>
                Many of the species photographs have been confirmed by photographing in well-respected botanical gardens where species have been labelled by experts, such as in gardens in the UK, France, Belgium and Italy or a variety of gardens in the North America (Arnold, Morton, the UBC Botanical Garden, University of Washington Botanical Garden, etc.).
              </p>
              <p>
                Botanists at universities and managers of university databases also have contribute hundreds of photos from their professional collections.
              </p>
              <p>
                Cross-referencing of English and Latin names has been done by examining many of the major databases and websites, such as Conifers Around the World, Northern Ontario Plant Database, Virginia Tech, Missouri Botanical Garden, Calpoli’s Selectree, UBC Botanical Garden, KPU Plant Database and Wespelaar (Belgium) to mention a few.
              </p>
              <p>
                The author also extensively used many well-known tree guides as well as sites such as Wikipedia extensively for cross-referencing.
              </p>
            </div>
            <hr/>
            <div id="bio">
              <label className="sectionTitle">Who we are</label>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img className="photo" src="images/blake.jpg" />
                    </td>
                    <td>
                      <ul className="description">
                        <li className="title"><label className="name">Blake Willson</label><i> - R.P.F. - Dendrologist and Photographer</i></li>
                        <li className="content">
                          <p>
                            Blake is an industry manager, botanist and photographer with over 30 years in the forestry industry, specifically with government and industry between Canada and Japan.
                          </p>
                          <p>
                            He is a member of the International Dendrology Society (a UK-based global group of professors and scientists dedicated to the study and teaching about woody plants) and the American Conifer Society.
                          </p>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img className="photo" src="images/nathan.jpg" />
                    </td>
                    <td>
                      <ul className="description">
                        <li className="title"><label className="name">Nathan Willson</label><i> - Development</i></li>
                        <li className="nathan content">
                          <p><a href="http://nathanwillson.com/">Nathan</a> is a web developer and manages the tech aspects of the site.</p>
                          <a className="github" href="https://github.com/nbw" target="_blank"><img src="/images/github.png" /></a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="footer">
            This site is a collaboration between Blake and his son Nathan.
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<About />, document.getElementById('app'));
