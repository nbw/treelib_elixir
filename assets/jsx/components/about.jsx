import React from 'react'

export default class About extends React.Component {
  render() {
    return (
      <div className='aboutPage'>
        <div className="tableOfContents">
          <div className="tocTitle"><label><u>Contents</u></label></div>
          <ul>
            <li><a href="#aboutPhotos">About the Photos</a></li>
            <li><a href="#speciesConfirm">Species Confirmation</a></li>
            <li><a href="#bio">Who we are</a></li>
          </ul>

          </div><div className="content">
          <div>
            <label className="sectionTitle">About the site</label> 
            <p>
              With a library of over 260 tree species, <b>TreeLib</b> is a new digital resource for studying trees in the Northern Hemisphere. The collection is organized at a Family, Genus or Species level with quick access to jump back a forth to get a sense of the bigger picture. 
            </p>
            <p>
              Please don't hesitate to <a href="/contact">contact</a> us with any questions and head over to the <a href="/search">search</a> page to get started!
            </p>
          </div>
          <hr/>
          <div id="speciesHier">
            <label className="sectionTitle">Species Hierarchy</label>
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
              <label className="subsectionTitle">Where the photos are hosted</label>
              <p>
                The photos are hosted on <b><a href="https://www.flickr.com/photos/145057586@N05">Flickr</a></b>. If you'd prefer, you can view the full collection on Flickr (arranged starting by family) here:
              </p>
              <div className="centered">
                <a className='flickrLink' href='https://www.flickr.com/photos/145057586@N05/collections'>Click for TreeLib Flickr Collection</a>
              </div>
              <p>
                We encourage you to use this site, but if you're looking for the original high-quality photos or want to download an entire species in one go then head over to Flickr. <u>Each photo "album" on TreeLib's Flickr page is a contained species</u>.
              </p>
            </div>
            <div>
              <label className="subsectionTitle">How the photos were taken</label>
              <p>
                All but a handful of the photos have been taken by the author in botanical gardens, larger private collections, university arboretums, private  gardens, natural forests across Western North America and in Japan.  
              </p>
              <p>
                Photos were taken with a Canon 70D camera [INSERT LINK HERE], using 40mm, 17mm x 85mm and 18mm x 55mm lenses. The 70D is equipped with Canon’s new high resolution CMOS 70D sensor which allows raising film speed to up to 2000 or more without noticeable graininess.  
              </p>
            </div>
          </div>
          <hr/>
          <div id="speciesConfirm">
            <label className="sectionTitle">Species confirmation</label>
            <p>
              The purpose of this site is more to give a flavour of the varieties of each species than to provide an authoritative catalogue of them.  For detailed lists of most of the varieties of each species, I have found that searching species names on Wikipedia provides the best information.
            </p>
            <p>
              Preference has been, in most cases, to support confirmation of many species and varieties at major sites like Riverview Hospital Lands, Vandusen Botanical Garden, Washington University Arboretum and other botanical gardens all over the Western North America, as far back as Manitoba and North Dakota, supplementing with pictures from many other locations. 
            </p>
            <p>
              Cross-referencing of Latin names and usages has also been done from many of these sites, from web sites and from numerous good tree apps and books on tree identification; there are some differences in nomenclature between the U.S., Canada, Japan and Europe.  Regarding common English names, they are often quite varied and are best outlined on sites such as Wikipedia and other plant sites.   
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
                          Blake is an industry manager, botanist and photographer with over 25 years in the forestry industry, specifically with government and industry between Canada and Japan.  
                        </p>
                        <p>
                          He is a member of the International Dendrology Society (a UK-based global group of professors and scientists dedicated to the study and teaching about woody plants).
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
                        <p><a href="http://nathanwillson.com/">Nathan</a> is a web developer based out of Victoria, Canada.</p>
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
          This site was a collaboration between Blake and his son Nathan. 
        </div>
      </div>
    );
  }
}
