import React from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';

class Species extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedPhotoIndex: null,
      photos: props.photos 
    };
  }
  componentWillMount(){
    // Load photos
    if(!this.props.photos){
      this.grabPhotos(this.props.species);
    }
  }
  componentWillReceiveProps(nextProps){
    var currSpecies = this.props.species,
      nextSpecies = nextProps.species;
    if(currSpecies != nextSpecies){
      this.update("selectedPhotoIndex", null);
    }
    // Reload photos
    if(!this.props.photos){
      this.grabPhotos(nextSpecies);
    }
  }
  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }
  nextPhoto(){
    var selectedPhoto = this.state.selectedPhotoIndex;
    if (selectedPhoto < this.props.photos.length - 1) {
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

  grabPhotos(s) {
    var self = this;
    fetch('/api/photos?species_id=' + s.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      if(response.ok) {
        response.json().then(function(photos) {
          self.update("photos", photos);
          self.update("selectedPhotoIndex", null);
        });
      } else {
        console.log('Network response was not ok.');
      }
    })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  }

  render() {
    var self = this,
      s = this.props.species,
      g = this.props.genus || {},
      photos = this.state.photos,
      selectedPhoto = this.state.selectedPhotoIndex,
      thumbs = [];
    if (photos && photos.length > 0) {
      photos.forEach(function(link,index) {
        if(index == selectedPhoto) { 
          thumbs.push(<img key={index} src={link.thumb} className="selected" />);
        } else {
          thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
        }
      });
    }

    var links = links ? s.links.map(function(link, index){
      return <li key={index} ><a target="_blank" href={link.url}>{link.name}</a></li>
    }): [];
    return (
      <div className="species">
        <div className="title">
          <a href={'/species/' + s.id + "/" + encodeURI((g.name + "_" + s.name).toLowerCase())}><label className="main">{g.name} <span className="speciesTitle">{s.name}</span></label></a>
          <label className="commonName">{s.common_name} {g.common_name}</label>
          <label className="secondary">species</label>
          <ShareLinker
            path={'/species/' + s.id + "/" + encodeURI((g.name + "_" + s.name).toLowerCase())} 
          />
        </div>

        <div className="description">
          <div dangerouslySetInnerHTML={this.createMarkup(s.description)}></div>
        </div>
        <div className="links">
          <ul>
            {links}
          </ul>
        </div>
        { (selectedPhoto != null) ? 
            <PhotoViewer 
              nextCallback={() => this.nextPhoto()} 
              prevCallback={() => this.prevPhoto()} 
              closeCallback={() => this.closePhotoviewer()}
              hideSidebarCallback={() => this.props.handler('sidebarHidden',true)}
              showSidebarCallback={() => this.props.handler('sidebarHidden',false)}
              image={photos[selectedPhoto].medium} 
              imageName={photos[selectedPhoto].name} 
              imageDescription={photos[selectedPhoto].description} 
              original = {photos[selectedPhoto].original} 
              flickr_url = {photos[selectedPhoto].flickr_url} /> : null }
            <div className="photos">
              {thumbs}
            </div>
          </div>
    );
  }
}

export default Species
