import React from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';

class Family extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedPhotoIndex: null,
      photos: [],
      isFSPMode: props.isFSPMode || false // full screen photo
    };
  }

  componentWillReceiveProps(nextProps){
    var self = this,
      currFamily = this.props.family,
      nextFamily = nextProps.family;

    // only grab photos (and reset index if new family)
    if(currFamily != nextFamily){
      // this.update("selectedPhotoIndex", null);
      // this.grabMorePhotos(nextFamily);
    }
  }

  componentDidMount(){
    // this.grabMorePhotos(this.props.family);
  }

  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }

  nextPhoto(){
    var selectedPhoto = this.state.selectedPhotoIndex;
    if (selectedPhoto < this.state.photos.length - 1) {
      this.update("selectedPhotoIndex", selectedPhoto + 1);
    }
    return;
  }

  prevPhoto(){
    var selectedPhoto = this.state.selectedPhotoIndex;
    if (selectedPhoto > 0) {
      this.update("selectedPhotoIndex", selectedPhoto - 1);
    }
  }

  closePhotoviewer(){
    this.update("selectedPhotoIndex", null);
  }

  createMarkup(s) {
    return {__html: s};
  }

  grabMorePhotos(f) {
    var self = this;
    return fetch('/api/photos?family_id=' + f.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      if(response.ok) {
        response.json().then(function(photos) {
          self.update("photos", photos);
        });
      } else {
        console.log('Network response was not ok.');
      }
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  showFullSizePhoto() {
    if (this.props.handler) {
      this.props.handler('fullScreenPhotoMode', true);
      this.update("isFSPMode", true);
    } else {
      this.update("isFSPMode", true);
    }
  }

  closeFullSizePhoto() {
    if (this.props.handler) {
      this.props.handler('fullScreenPhotoMode', false);
      this.update("isFSPMode", false);
    } else {
      this.update("isFSPMode", false);
    }
  }

  render() {
    var self = this,
      f = this.props.family,
      photos = this.state.photos,
      selectedPhoto = this.state.selectedPhotoIndex,
      thumbs = [];

    var genera = f.genera.map(function(g,i) {
      var species = g.species.map(function(s,j) {
        return <li key={"s-" + s.id}>
          <a className="underlineable" href={'/search?s=' + s.id}>
            <i>{s.name}</i>&nbsp;({s.common_name})
          </a>
        </li>
      });
      return <tr key={i}>
        <td>
          {i+1}.
        </td>
        <td>
          <a className="underlineable" href={'/search?g=' + g.id}>
            <i>{g.name}</i>&nbsp;({g.common_name})
          </a>
        </td>
        <td>
          <ul>
            { species }
          </ul>
        </td>
      </tr>
    });

    if( photos && photos.length > 0 ) {
      photos.forEach(function(link,index) {
        if(index == selectedPhoto) {
          thumbs.push(<img key={index} src={link.thumb} className="selected" />);
        } else {
          thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
        }
      });
    }
    return (
      <div className="family">
        <div className="title">
          <a href={'/family/' + f.id + "/" + f.name.replace(/ /g,'_')}><label className="main">{f.name}</label></a>
          <label className="commonName">{f.common_name}</label>
          <label className="secondary">family</label>
          { window.admin ? <a href={`/family/${f.id}/edit`} className="adminEdit">edit</a> : ""}
        </div>
        <ShareLinker
          path={'/family/' + f.id + "/" + f.name.replace(/ /g,'_')}
        />
        <div className="textContent">
          <div className="description">
            <div dangerouslySetInnerHTML={this.createMarkup(f.description)}></div>
          </div>
          <hr/>
          <div className="genera">
            { f.genera.length > 0 ?
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Genus</th>
                  <th>Species</th>
                </tr>
              </thead>
              <tbody>
              {genera}
              </tbody>
            </table>
            : null }
          </div>
        </div>
        { (selectedPhoto != null) ?
            <PhotoViewer
              nextCallback={() => this.nextPhoto()}
              prevCallback={() => this.prevPhoto()}
              closeCallback={() => this.closePhotoviewer()}
              isFullScreen={this.state.isFSPMode}
              hideSidebarCallback={() => (this.showFullSizePhoto())}
              showSidebarCallback={() => (this.closeFullSizePhoto())}
              image={photos[selectedPhoto].medium}
              imageName={photos[selectedPhoto].name}
              imageDescription={photos[selectedPhoto].description}
              original = {photos[selectedPhoto].original}
              flickr_url = {photos[selectedPhoto].flickr_url} /> : null }
            { thumbs.length > 0 ?
                <div className="photos">
                  <label className="subtitle">The photos below have been randomly selected from species in {f.name}.</label>
                  <div className="thumbs">{thumbs}</div>
                  <div onClick={ this.grabMorePhotos.bind(this, f) } className="newPhotoSelectionButton">
                    new random photo selection
                  </div>
                </div>
                : null }
              </div>
    );
  }
}

export default Family
