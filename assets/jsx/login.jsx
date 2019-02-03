import React from 'react';
import ReactDOM from 'react-dom';

import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: "",
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
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener("keydown", this.handleKeyPress.bind(this));
    }
    handleKeyPress(event) {
        if(event.key === "Enter") {
            this.updateTheMotherShip();
        }
    }
    updateTheMotherShip(){
        var self = this;
        if( self.state.username.length === 0 || self.state.password.length === 0){
            alert('try again. something is missing.');
            return;
        }
        fetch('/api/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                username: self.state.username,
                password: self.state.password
            })
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(obj) {
                        if(obj.error){
                            self.setState({
                                ['message']: obj.msg
                            });
                            return;
                        }
                    window.location.replace(obj.redirect);
                });
            } else {
                alert("uh oh.");
                console.log('Network response was not ok.'); } })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

    }
    render() {
        return (
            <div>
                <h1>Account Login</h1>
                <hr />
                <ul id="login" className="resetList">
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
                            id = "password"
                            title = "Password"
                            placeholder = "password"
                            text = {this.state.password}
                            handler = {this.handleInputChange.bind(this, 'password')} />
                    </li>
                </ul>
                <hr />
                <p className="message">{this.state.message}</p>
                <Buttoner
                    id = "saveButton"
                    callback = {this.updateTheMotherShip.bind(this)} 
                    text = "login" />
            </div>
        );
    }
}


if (!self.fetch) {
    console.log('Unsupported browser. Please use Firefox or Google Chrome')
} else {
    // to do
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
