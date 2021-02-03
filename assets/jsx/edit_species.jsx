import React from 'react';
import ReactDOM from 'react-dom';

import AdminNavbar from './components/adminNavbar.jsx';
import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';
import Dropper from './components/dropper.jsx';
import Texter from './components/texter.jsx';
import Markup from './components/markup.jsx';
import CheckBoxer from './components/checkBoxer.jsx';
import QrCode from './components/qr_code.jsx';

var pg = pageData;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title:       pg.species.name || "",
      common_name: pg.species.common_name || "",
      description: pg.species.description || "",
      genus_id:    pg.species.genus_id || pg.genera[0].id || 0,
      album_id:    pg.species.album_id || 0,
      hardiness_enabled: (pg.species.hardiness_min != null && pg.species.hardiness_max != null),
      hardiness_min:      pg.species.hardiness_min || 0,
      hardiness_min_type: pg.species.hardiness_min_type || null,
      hardiness_max:      pg.species.hardiness_max || 9,
      hardiness_max_type: pg.species.hardiness_max_type || null,
      hide: pg.species.hide || false,
      links: []
    };
  }
  update(name, value) {
    this.setState({
      [name]: value
    });
  }
  handleInputChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }
  updateTheMotherShip() {
    if ( this.state.title === "") {alert('Please enter a species name, then try again.');return;}
    if ( this.state.common_name === "") {alert('Please enter a common name, then try again.');return;}
    if( !this.state.album_id ) {alert('Please choose a photo album, then try again.');return;}
    console.log(this.state);
    if(this.state.hardiness_enabled && (this.state.hardiness_min == null || this.state.hardiness_max == null)) {alert('At least one of the hardiness values is blank. Try again.');return;}

    var url = (pg.species.id) ? ("/species/" + pg.species.id): ("/species"),
      req_method = (pg.species.id) ? ("PATCH") : ("POST");

    fetch(url, {
      method: req_method,
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': CSRF_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: pg.species.id || null,
        name: this.state.title.trim(),
        common_name: this.state.common_name.trim(),
        description: this.state.description,
        genus_id: this.state.genus_id,
        album_id: this.state.album_id || null,
        hardiness_min: this.hardiness_min(),
        hardiness_min_type: this.state.hardiness_min_type,
        hardiness_max: this.hardiness_max(),
        hardiness_max_type: this.state.hardiness_max_type,
        hide: this.state.hide,
        links: this.state.links,
      })
    }).then(function(response) {
      if(response.ok) {
        response.json().then(function(obj) {
          window.location.href = window.location.origin + '/species/' + obj.id + "/edit";
        });
      } else {
        console.log('Response was not ok.');
        alert(response.statusText);
      }
    })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  }
  hardinessInputs() {
    return  <li>
      <Inputer
              id = "hardiness_min"
              title = "Min"
              placeholder = "value"
              text = {this.state.hardiness_min}
              handler = {this.handleInputChange.bind(this, "hardiness_min")} />
      <Dropper
              id = "hardiness_min_type"
              title = ""
              default = {this.state.hardiness_min_type}
              list = {this.hardiness_types()}
              handler = {this.handleInputChange.bind(this, "hardiness_min_type")} />
      <Inputer
              id = "hardiness_max"
              title = "Max"
              placeholder = "value"
              text = {this.state.hardiness_max}
              handler = {this.handleInputChange.bind(this, "hardiness_max")} />
      <Dropper
              id = "hardiness_max_type"
              title = ""
              default = {this.state.hardiness_max_type}
              list = {this.hardiness_types()}
              handler = {this.handleInputChange.bind(this, "hardiness_max_type")} />
      </li>;
  }
  hardiness_min(){
    return this.state.hardiness_enabled ? this.state.hardiness_min : null;
  }
  hardiness_max(){
    return this.state.hardiness_enabled ? this.state.hardiness_max : null;
  }
  hardiness_types() {
    return pg.hardiness_types.map(type =>{
      var obj = {};
      obj["id"] = type;
      obj["name"] = type;
      return obj;
    });
  }
  deleteMe() {
    var r = confirm("Are you sure you want to delete me?");
    if (r == true) {
      fetch('/species/' + pg.species.id, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'X-CSRF-Token': CSRF_TOKEN,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(function(response) {
        if(response.ok) {
          response.json().then(function(obj) {
              window.location.href = window.location.origin + '/species/new';
          });
        } else {
          console.log('Response was not ok.');
          alert('Response was not ok.');
        }
      })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }
  }
  createQRCode() {
    fetch('/qr?species_id=' + pg.species.id, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': CSRF_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      if(response.ok) {
        window.location.href = window.location.origin + '/species/' + pg.species.id + "/edit";
      } else {
        console.log('Response was not ok.');
        alert('Response was not ok.');
      }
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }
  renderQrCode() {
    if(pg.species.id) {
      if (pg.qr_code_url && pg.qr_code_url.length > 0) {
        return <div>
          <hr />
          <QrCode value={pg.qr_code_url} />
        </div>;
      } else {
        return <div>
          <hr />
          <Buttoner
            id="qrCreate"
            callback = {this.createQRCode.bind(this)}
            text = "Create QR Code" />
        </div>;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <AdminNavbar />
        <h1 className="mainTitle" >{this.state.title || "New Species"}</h1>
        <h2 className="commonTitle" >{this.state.common_name}</h2>
        { pg.species.id ?
            <Buttoner id="deleteButton"
              callback={this.deleteMe.bind(this)}
              text="delete" /> : null }
            <hr />
            <Inputer
              id = "name"
              title = "Name"
              placeholder = "species"
              text = {this.state.title}
              handler = {this.handleInputChange.bind(this, "title")} />
            <Dropper
              id = "genera"
              title = "Genus"
              default = {this.state.genus_id}
              list = {pg.genera}
              handler = {this.handleInputChange.bind(this, "genus_id")} />
            <hr />
            <Inputer
              id = "common_name"
              title = "Common Name"
              placeholder = "common name"
              text = {this.state.common_name}
              handler = {this.handleInputChange.bind(this, "common_name")} />
            <hr />
            <Texter
              id = "description"
              title = "Description"
              placeholder = "enter description here"
              text = {this.state.description}
              handler = {this.handleInputChange.bind(this, "description")} />
            <Markup />
            <hr />
            <ul className="inline undecorated-list">
              <li>
                <CheckBoxer
                  isChecked = {this.state.hardiness_enabled}
                  handler   = {this.update.bind(this, "hardiness_enabled")}
                  value = "hardiness"
                  title =  {"Hardiness" + (this.state.hardiness_enabled ? ":" : "?")}
                  />
              </li>
              { (this.state.hardiness_enabled) ? this.hardinessInputs() : null }
            </ul>
            <hr />
            <ul className="inline undecorated-list">
              <li>
                <CheckBoxer
                  isChecked = {this.state.hide}
                  handler   = {this.update.bind(this, "hide")}
                  value = "hide"
                  title =  {"Hide from Species page"}
                />
              </li>
            </ul>
            { this.renderQrCode() }
            <hr />
            <Dropper
              id = "photoAlbum"
              title = "Photo Album"
              default = {this.state.album_id}
              list = {pg.photo_albums}
              handler = {this.handleInputChange.bind(this, "album_id")} />
            <PhotoArray
              photos = {pg.photos} />
            <hr />
            <Buttoner
              id = "saveButton"
              callback = {this.updateTheMotherShip.bind(this)}
              text="save" />
          </div>
    );
  }
}


class PhotoArray extends React.Component {
  render() {
    var photoEditers = [];
    if (this.props.photos) {
      this.props.photos.forEach(function(item, index) {
        photoEditers.push(<PhotoEditer img={item.url} />);
      });
    }
    return (
      <div className='photoArray'>
        {photoEditers}
      </div>
    );
  }
}

class PhotoEditer extends React.Component {
  render() {
    return (
      <div className="photoEditer" >
        <img src={this.props.img} />
      </div>
    );
  }
}

if (!self.fetch) {
  console.log('Unsupported browser. Please use Firefox or Google Chrome');
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
