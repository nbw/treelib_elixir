import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';
import ShareLinker from './shareLinker.jsx';

class Species extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPhotoIndex: null
        };
    }
    componentWillReceiveProps(){
      this.update("selectedPhotoIndex", null);
    }
    componentWillReceiveProps(nextProps){
      var curr_species = this.props.species,
        next_species = nextProps.species;
      if(curr_species != next_species){
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
        if (selectedPhoto < this.props.species.photos.length - 1) {
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

    render() {
        var self = this,
            s = this.props.species,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];
            if (s.photos && s.photos.length > 0) {
                s.photos.forEach(function(link,index) {
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
                    <a href={'/species/' + encodeURI((s.genus_name + "_" + s.name).toLowerCase())}><label className="main">{s.genus_name} <span className="speciesTitle">{s.name}</span></label></a>
                    <label className="commonName">{s.common_name} {s.genus_common_name}</label>
                    <label className="secondary">species</label>
                    <ShareLinker
                        path={'/species/' +  encodeURI((s.genus_name + "_" + s.name).toLowerCase())} 
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
                        image={s.photos[selectedPhoto].medium} 
                        imageName={s.photos[selectedPhoto].name} 
                        imageDescription={s.photos[selectedPhoto].description} 
                        original = {s.photos[selectedPhoto].original} 
                        flickr_url = {s.photos[selectedPhoto].flickr_url} /> : null }
                <div className="photos">
                    {thumbs}
                </div>
            </div>
        );
    }
}

export default Species
