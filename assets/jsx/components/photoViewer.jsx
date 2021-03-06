import React from 'react';
import ReactDOM from 'react-dom';
import Drift from 'drift-zoom';

class PhotoViewer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showFullSize: props.isFullScreen,
      drift: null,
      fullDrift: null,
    };
  }

  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }

  componentDidMount() {
    const viewer = this.refs.photoViewer;
    viewer.scrollIntoView({behavior: "smooth"});

    window.addEventListener("keydown", this.handleKeyPress.bind(this));

    // Only use Drift for non-mobile
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      // Drift in normal mode
      this.update(
        'drift',
        new Drift(document.getElementById('imageMain'), {
          paneContainer: document.getElementById('imageZoom'),
          boundingBoxContainer: document.getElementById('imageContainer'),
          zoomFactor: 2.2
        })
      );

      // Drift in fullscreen mode
      this.update(
        'driftFull',
        new Drift(document.getElementById('fullImage'), {
          paneContainer: document.getElementById('fullImageZoom'),
          boundingBoxContainer: document.getElementById('fullImageContainer'),
          zoomFactor: 1.8
        })
      );

      this.trackMouseForZoom("imageZoom", "imageMain");
      this.trackMouseForZoom("fullImageZoom", "fullImage");
    }
  }

  componentWillReceiveProps(nextProps){
    const viewer = this.refs.photoViewer;
    viewer.scrollIntoView({behavior: "smooth"});

    if (this.state.drift) {
      this.state.drift.setZoomImageURL(nextProps.image);
      this.state.driftFull.setZoomImageURL(nextProps.original);
    }
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

  trackMouseForZoom(id, container) {
    var div = document.getElementById(id);
    var container = document.getElementById(container);
    var x, y, offset;
    self = this;

    window.addEventListener('mousemove', function(event){
      x = event.clientX;
      y = event.clientY;

      if ( typeof x !== 'undefined' ){
        // offset = (self.getOffset(container).left + container.offsetWidth) - x;
        //
        // if (offset < div.offsetWidth) {
        //   div.style.left = (x - div.offsetWidth - 100) + "px";
        // } else {
        div.style.left = (x - 100) + "px";
        // }

        div.style.top = (y - 100) + "px";
      }
    }, false);
  }

  getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  render() {
    var self = this,
      show = this.props.isFullScreen ? 'show' : '' ;
    return (
      <div ref="photoViewer" className="photoViewer">
        <div onClick={() => (self.closeFullSizeImage())} className={"fullSizeImage " + show }>
          <span className="helper"></span>
          <div id="fullImageContainer" className="imageWrapper">
            <img alt={this.props.imageName} id="fullImage" src={this.props.original + "?w=900"} data-zoom={this.props.original + "?w=1000"} />
            <div id="fullImageZoom"></div>
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
              <div id="imageContainer">
                <img id="imageMain" alt={this.props.imageName} src={this.props.image + "?w=826"} data-zoom={this.props.image + "?w=1000"} onClick={() => self.showFullSizeImage()}/>
                <div id="imageZoom"></div>
              </div>
              <div className="photoButtons">
                <ul>
                  <li className="fullScreen" onClick={() => self.showFullSizeImage()}><i className="fa fa-expand fa-lg"></i> </li>
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
