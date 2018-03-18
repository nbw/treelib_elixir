import React from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';

class Genus extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedPhotoIndex: null,
      photos: [],
      isFSPMode: props.isFSPMode || false // full screen photo
    };
  }

  componentWillReceiveProps(nextProps){
    var currGenus = this.props.genus,
      nextGenus = nextProps.genus;
    // only grab photos (and reset index if new genus)
    if(currGenus != nextGenus){
      this.update("selectedPhotoIndex", null);
      this.grabMorePhotos(nextGenus);
    }
  }

  componentDidMount(){
    this.grabMorePhotos(this.props.genus);
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

  grabMorePhotos(g) {
    var self = this;
    return fetch('/api/photos?genus_id=' + g.id, {
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
    })
      .catch(function(error) {
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
      g = this.props.genus,
      photos = this.state.photos,
      selectedPhoto = this.state.selectedPhotoIndex,
      thumbs = [];

    var species_links = g.species.map(function(s,i){
      return <li key={i} ><a className="underlineable" href={'/search?s=' + s.id}>{s.name}</a></li>
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
      <div className="genus">
        <div className="title">
          <a href={'/genus/' + g.id + "/" +  g.name.replace(/ /g,'_')} ><label className="main">{g.name}</label></a>
          <label className="commonName">{g.common_name}</label>
          <label className="secondary">genus</label>
          { window.admin ? <a href={`/genus/${g.id}/edit`} className="adminEdit">edit</a> : "" }
        </div>
        <ShareLinker
          path={'/genus/' + g.id + "/" + g.name.replace(/ /g,'_')} 
        />
        <div className="textContent">
          <div className="description">
            <div dangerouslySetInnerHTML={this.createMarkup(g.description)}></div>
          </div>
          <div className="species">
            <label className="speciesTitle">Species</label>
            <ul>
              {species_links}
            </ul>
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
                  <label className="subtitle">The photos below have been randomly selected from species in {g.name}.</label>
                  <div className="thumbs">{thumbs}</div>
                  <div onClick={ this.grabMorePhotos.bind(this, g) } className="newPhotoSelectionButton">
                    new random photo selection
                  </div>
                </div>
                : null}
              </div>
    );
  }
}

export default Genus
