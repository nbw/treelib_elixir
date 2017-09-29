import React from 'react';
import ReactDOM from 'react-dom';

import AdminNavbar from './components/adminNavbar.jsx';
import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';
import Texter from './components/texter.jsx';
import Markup from './components/markup.jsx';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: pg.family.name || "",
            common_name: pg.family.common_name || "",
            description: pg.family.descrip || "",
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
    updateTheMotherShip(){
        if ( this.state.title === "") {alert('Please enter a species name, then try again.');return;}
        if ( this.state.common_name === "") {alert('Please enter a common name, then try again.');return;}
        
        fetch('/api/edit_family', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: pg.family.id || null,
                name: this.state.title.trim(),
                common_name: this.state.common_name.trim(),
                descrip: this.state.description
            })
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(obj) {
                    window.location.href = window.location.origin + window.location.pathname + '?id=' + obj.id;
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
            fetch('/api/delete_family', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pg.family.id,
                    key: pg.key
                })
            }).then(function(response) {
                if(response.ok) {
                    response.json().then(function(obj) {
                        if(obj.err) {
                            console.log(obj.msg);
                            alert(obj.msg);
                        } else {
                            window.location.href = window.location.origin + window.location.pathname;
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
                <h1 className="mainTitle">{this.state.title || "New Family"}</h1>
                { pg.family.id ? 
                    <Buttoner id="deleteButton" 
                        callback={this.deleteMe.bind(this)}
                        text="delete" />: null}
                <hr />
                <Inputer
                    id = "name"
                    title = "Name"
                    placeholder = "family"
                    text = {this.state.title}
                    handler = {this.handleInputChange.bind(this, 'title')} />
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
