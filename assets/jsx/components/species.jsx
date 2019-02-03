import React from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';
import Contributors from './contributors.jsx';

class Species extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedPhotoIndex: null,
      photos: props.photos,
      isFSPMode: props.isFSPMode || false // full screen photo
    };
  }

  componentWillReceiveProps(nextProps){
    var currSpecies = this.props.species,
        nextSpecies = nextProps.species;
    // only grab photos (and reset index if new species)
    if(currSpecies != nextSpecies){
      this.update("selectedPhotoIndex", null);
      this.grabPhotos(nextSpecies);
    }
  }

  componentDidMount(){
      this.grabPhotos(this.props.species);
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

  contributions() {
    var contributors = this.props.contributors;
    if(contributors && contributors.length > 0) {
      return <Contributors contributors={contributors} />
    }
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
          { window.admin ? <a href={`/species/${s.id}/edit`} className="adminEdit">edit</a> : "" }
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
              isFullScreen={this.state.isFSPMode}
              hideSidebarCallback={() => (this.showFullSizePhoto())}
              showSidebarCallback={() => (this.closeFullSizePhoto())}
              image={photos[selectedPhoto].medium}
              imageName={photos[selectedPhoto].name}
              imageDescription={photos[selectedPhoto].description}
              original = {photos[selectedPhoto].original}
              flickr_url = {photos[selectedPhoto].flickr_url} /> : null }
            <div className="photos">
              {thumbs}
            </div>
            { this.contributions() }
          </div>
    );
  }
}

export default Species
