import React from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';

class Family extends React.Component {
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
        this.grabMorePhotos(this.props.family);
      }
    }
    componentWillReceiveProps(nextProps){
      var currFamily = this.props.family,
        nextFamily = nextProps.family;
      if(currFamily != nextFamily){
        this.update("selectedPhotoIndex", null);
      }
      // Reload photos
      if(!this.props.photos){
        this.grabMorePhotos(nextFamily);
      }
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
    nextPhoto(){
        var selectedPhoto = this.state.selectedPhotoIndex;
        if (selectedPhoto < this.props.photos.length) {
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
        f = this.props.family;
        fetch('/api/photos?family_id=' + f.id, {
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
            f = this.props.family,
            photos = this.state.photos,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];

        var genera = f.genera.map(function(g,i){
            return <li key={i} ><a className="underlineable" href={'/search?genus=' + encodeURI((g.name).toLowerCase())}>{g.name}</a></li>
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
                </div>
                <ShareLinker
                  path={'/family/' + f.id + "/" + f.name.replace(/ /g,'_')} 
                />
                <div className="textContent">
                    <div className="description">
                        <div dangerouslySetInnerHTML={this.createMarkup(f.description)}></div>
                    </div>
                    <div className="genera">
                        <label className="genusTitle">Genera</label>
                        <ul>
                            {genera}
                        </ul>
                    </div>
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
                { thumbs.length > 0 ? 
                <div className="photos">
                    <label className="subtitle">The photos below have been randomly selected from species in {f.name}.</label>
                    <div className="thumbs">{thumbs}</div>
                    <div onClick={ this.grabMorePhotos.bind(this) } className="newPhotoSelectionButton">
                        new random photo selection
                    </div>
                </div> 
                : null }
            </div>
        );
    }
}

export default Family
