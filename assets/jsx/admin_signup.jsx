import React from 'react';
import ReactDOM from 'react-dom';

import AdminNavbar from './components/adminNavbar.jsx';
import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
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
        if( this.state.username.length === 0 || this.state.email.length === 0 || this.state.password.length === 0){
            alert('try again. something is missing.');
            return;
        }

        fetch('/api/add_admin_user', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then(function(response) {
            if(response.ok) {
                alert('success! user created.');
            } else {
                alert("uh oh.");
                console.log('Network response was not ok.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    }
    render() {
        return (
            <div>
                <AdminNavbar />
                <h1>Admin Signup</h1>
                <p>This page is for creating other <b>admin</b> accounts.</p> 
                <hr />
                <ul id="signupList" className="resetList">
                    <li>
                        <Inputer
                            id = "name"
                            title = "Username"
                            placeholder = "name"
                            text = {this.state.username}
                            handler = {this.handleInputChange.bind(this, 'username')} />
                    </li>
                    <li>
                        <Inputer
                            id = "email"
                            title = "Email"
                            placeholder = "email"
                            text = {this.state.email}
                            handler = {this.handleInputChange.bind(this, 'email')} />
                    </li>
                    <li>    
                        <Inputer
                            id = "password"
                            title = "Password"
                            placeholder = "password"
                            text = {this.state.password}
                            handler = {this.handleInputChange.bind(this, 'password')} />
                    </li>
                </ul>
                <hr />
                <Buttoner
                    id = "saveButton"
                    callback = {this.updateTheMotherShip.bind(this)}
                    text = "signup" />
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
