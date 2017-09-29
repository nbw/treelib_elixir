import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';

class Genus extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPhotoIndex: null,
        };
    }
    componentWillReceiveProps(nextProps){
      var curr_genus = this.props.genus,
        next_genus = nextProps.genus;
      if(curr_genus != next_genus){
        this.update("selectedPhotoIndex", null);
      }
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
    nextPhoto(){
        var selectedPhoto = this.state.selectedPhotoIndex;
        if (selectedPhoto < this.props.genus.photos.length) {
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
    grabMorePhotos(event) {
        var self = this,
        g = this.props.genus;
        fetch('/api/get_genus_photos?genus_id=' + g.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(photos) {
                    g.photos = photos;
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
            g = this.props.genus,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];

        var species_links = g.species.map(function(s,i){
            return <li key={i} ><a className="underlineable" href={'/search?species=' + encodeURI((s.genus_name + "_" + s.name).toLowerCase())}>{s.name}</a></li>
        });
        if( g.photos && g.photos.length > 0 ) {
            g.photos.forEach(function(link,index) {
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
                    <a href={'/genus/' + g.name.replace(/ /g,'_')} ><label className="main">{g.name}</label></a>
                    <label className="commonName">{g.common_name}</label>
                    <label className="secondary">genus</label>
                </div>
                <ShareLinker
                    path={'/genus/' + g.name.replace(/ /g,'_')} 
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
                        hideSidebarCallback={() => this.props.handler('sidebarHidden',true)}
                        showSidebarCallback={() => this.props.handler('sidebarHidden',false)}
                        image={g.photos[selectedPhoto].medium}
                        imageName={g.photos[selectedPhoto].name}
                        imageDescription={g.photos[selectedPhoto].description}
                        original = {g.photos[selectedPhoto].original} 
                        flickr_url = {g.photos[selectedPhoto].flickr_url} /> : null }
                { thumbs.length > 0 ? 
                <div className="photos">
                    <label className="subtitle">The photos below have been randomly selected from species in {g.name}.</label>
                    <div className="thumbs">{thumbs}</div>
                    <div onClick={ this.grabMorePhotos.bind(this) } className="newPhotoSelectionButton">
                        new random photo selection
                    </div>
                </div>
                : null}
            </div>
        );
    }
}

export default Genus
