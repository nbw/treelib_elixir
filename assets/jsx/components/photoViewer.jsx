import React from 'react';
import ReactDOM from 'react-dom';

class PhotoViewer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showFullSize: props.isFullScreen
    };
  }

  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener("keydown", this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if(event.key === "ArrowLeft") {
      this.props.prevCallback();
    }
    if(event.key === "ArrowRight") {
      this.props.nextCallback();   
    }
  }
  showFullSizeImage() {
    // if defined, let the parents know what's up.
    if(this.props.hideSidebarCallback) {
      this.update('showFullSize', true);
      this.props.hideSidebarCallback(); 
    } else {
      this.update('showFullSize', true);
    }
  }

  closeFullSizeImage() {
    // if defined, let the parents know what's up.
    if(this.props.showSidebarCallback) {
      this.props.showSidebarCallback(); 
    }

    this.update('showFullSize', false);
  }

  render() {
    var self = this,
      show = this.props.isFullScreen ? 'show' : '' ;
    return (
      <div className="photoViewer">
        <div onClick={() => (self.closeFullSizeImage())} className={"fullSizeImage " + show }>
          <span className="helper"></span>
          <div className="imageWrapper">
            <img src={this.props.original} />
            <div className="info">
              <label className="title">{this.props.imageName}</label>
              <p className="description">{this.props.imageDescription}</p>
            </div>
          </div>
          <div className="closeButton" onClick={() => (self.closeFullSizeImage())} ><i className="fa fa-times fa-lg"></i> Close </div>
        </div>
        <div className="image">
          <div className="prev" onClick={this.props.prevCallback}><i className="fa fa-angle-double-left fa-2x"></i></div>
          <div className="imageWrapper">
            <span className="helper"></span>
            <div className="imageInnerWrapper">
              <img src={this.props.image} onClick={() => self.showFullSizeImage()} />
              <div className="photoButtons">
                <ul>
                  <li className="fullScreen" onClick={() => self.showFullSizeImage()}><i className="fa fa-expand fa-lg"></i> </li>
                  <li><a target="_blank" className="flickr" href={this.props.flickr_url}><i className="fa fa-flickr fa-lg"></i> </a></li>
                  <li><a className="downloadLink" href={this.props.original} download={this.props.imageName}><i className="fa fa-download fa-lg"></i> </a></li>
                </ul>
              </div>
              <div className="info">
                <label className="title">{this.props.imageName}</label>
                <p className="description">{this.props.imageDescription}</p>
              </div>
            </div>
          </div>
          <div className="next" onClick={this.props.nextCallback} ><i className="fa fa-angle-double-right fa-2x"></i></div>
        </div>
        <div className="closeButton" onClick={this.props.closeCallback} ><i className="fa fa-times fa-lg"></i> Close </div>
      </div>
    );
  }
}

export default PhotoViewer
