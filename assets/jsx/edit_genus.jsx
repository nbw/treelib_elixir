import React from 'react';
import ReactDOM from 'react-dom';

import AdminNavbar from './components/adminNavbar.jsx';
import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';
import Dropper from './components/dropper.jsx';
import Texter from './components/texter.jsx';
import Markup from './components/markup.jsx';

var pg = pageData;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: pg.genus.name || "",
      common_name: pg.genus.common_name || "",
      description: pg.genus.description || "",
      family_id: pg.genus.fam_id || pg.families[0].id || 0
    };
  }
  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }
  handleInputChange(name, e) {
    this.setState({
      [name]: e.target.value // ES6 computed property
    });
  }
  updateTheMotherShip() {
    if ( this.state.title === "") {alert('Please enter a species name, then try again.');return;}
    if ( this.state.common_name === "") {alert('Please enter a common name, then try again.');return;}

    var url = (pg.genus.id) ? ("/genus/" + pg.genus.id): ("/genus"),
      req_method = (pg.genus.id) ? ("PATCH"): ("POST");

    fetch(url, {
      method: req_method,
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': CSRF_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: pg.genus.id || null,
        name: this.state.title.trim(),
        common_name: this.state.common_name.trim(),
        description: this.state.description,
        fam_id: this.state.family_id
      })
    }).then(function(response) {
      if(response.ok) {
        response.json().then(function(obj) {
              window.location.href = window.location.origin + '/genus/' + obj.id + "/edit";
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
  deleteMe() {
    var r = confirm("Are you sure you want to delete me?");
    if (r == true) {
      fetch('/genus/' + pg.genus.id, {
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
            if(obj.err) {
              console.log(obj.msg);
              alert(obj.msg);
            } else {
              window.location.href = window.location.origin + '/genus/new';
            }  
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
  render() {
    return (
      <div>
        <AdminNavbar />
        <h1 className="mainTitle">{this.state.title || "New Genus"}</h1>
        <h2 className="commonTitle" >{this.state.common_name}</h2>
        { pg.genus.id ? 
            <Buttoner id="deleteButton" 
              callback={this.deleteMe.bind(this)}
              text="delete" />: null}
            <hr />
            <Inputer
              id = "name"
              title = "Name"
              placeholder = "genus"
              text = {this.state.title}
              handler = {this.handleInputChange.bind(this, 'title')} />
            <Dropper
              id = "family"
              title = "Family"
              default = {this.state.family_id}
              list = {pg.families}
              handler = {this.handleInputChange.bind(this, 'family_id')} />
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
              handler = {this.handleInputChange.bind(this, 'description')} />
            <Markup />
            <hr />
            <Buttoner
              id = "saveButton"
              callback = {this.updateTheMotherShip.bind(this)}
              text="save" />
          </div>
    );
  }
}

if (self.fetch) {

} else {
  console.log('Unsupported browser. Please use Firefox or Google Chrome')
}



export default App
ReactDOM.render(<App />, document.getElementById('app'));
