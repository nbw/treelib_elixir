import React from 'react';
import ReactDOM from 'react-dom';

import AdminNavbar from './components/adminNavbar.jsx';
import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';
import Dropper from './components/dropper.jsx';
import Texter from './components/texter.jsx'
import Markup from './components/markup.jsx';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: pg.species.name || "",
            common_name: pg.species.common_name || "",
            description: pg.species.descrip || "",
            genus_id: pg.species.genus_id || pg.genera[0].id || 0,
            album_id: pg.species.album_id || 0,
            links: pg.species.links || []
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

        fetch('/api/edit_species', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: pg.species.id || null,
                name: this.state.title.trim(),
                common_name: this.state.common_name.trim(),
                descrip: this.state.description,
                g_id: this.state.genus_id,
                album_id: this.state.album_id || null,
                links: this.state.links,
                key: pg.key
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
            fetch('/api/delete_species', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pg.species.id,
                    key: pg.key
                })
            }).then(function(response) {
                if(response.ok) {
                    response.json().then(function(obj) {
                        window.location.href = window.location.origin + window.location.pathname;
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
                <h1 className="mainTitle" >{this.state.title || "New Species"}</h1>
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
                <Dropper
                    id = "photoAlbum"
                    title = "Photo Album"
                    default = {this.state.album_id}
                    list = {pg.photo_albums}
                    handler = {this.handleInputChange.bind(this, "album_id")} />
                <PhotoArray
                    photos = {pg.species.photos} />
                <hr />
                <Linker
                    links = {this.state.links}
                    handler = {this.update.bind(this, "links")} />
                <hr />
                <Buttoner
                    id = "saveButton"
                    callback = {this.updateTheMotherShip.bind(this)}
                    text="save" />
            </div>
        );
    }
}

class Linker extends React.Component {
    constructor() {
        super();
        this.state = {
            newLinkName: "",
            newLinkURL: "",
            showAddLinkInput: false
        };
    }
    showInput() {
        this.setState({
            showAddLinkInput: true
        });
    }
    saveLink() {
        if(this.state.newLinkName.length === 0 || this.state.newLinkURL.length === 0) {
            alert('try again. something is missing.');
        } else {
            this.props.links.push({ name: this.state.newLinkName, url: this.state.newLinkURL});
            this.props.handler(this.props.links);
        }
        this.setState({
            newLinkName: "",
            newLinkURL: "",
            showAddLinkInput: false,
        });
    }
    removeLink(e) {
        var index = this.props.links.indexOf(e);
        this.props.links.splice(index, 1);
        this.props.handler(this.props.links);
    }
    updateLinkInput(name,e) {
        this.setState({
            [name]: e.target.value
        });
    }
    render() {
        var rows = [];
        for ( let item of this.props.links ) {
            rows.push(
                <Link   key={item.name}
                        name={item.name}
                        url={item.url}
                        handler={this.removeLink.bind(this)} />);
        }
        return (
        <div id="linker">
            Links:
            <table className="linksTable">
            <thead>
                <tr><th>Name</th><th>URL</th><th></th></tr>
            </thead>
            {rows}
            </table>
            { !this.state.showAddLinkInput ? <div className="addLinkBtn" onClick={this.showInput.bind(this)}>+ add URL</div> : null }
            { this.state.showAddLinkInput ?
                <div className="addLinkInput">
                    <input 
                        placeholder="display name"
                        value={this.state.newLinkName}
                        onChange={this.updateLinkInput.bind(this, 'newLinkName')} />
                    and <input 
                        placeholder="URL" 
                        value={this.state.newLinkURL} 
                        onChange={this.updateLinkInput.bind(this, 'newLinkURL')} />
                    <span className="btn-std" onClick={this.saveLink.bind(this)}>add</span>
                </div> : null 
            }
        </div>
        );
    }
}
class Link extends React.Component {
    delete() {
        this.props.handler(this.props);
    }
    render() {
        return (
            <tr className="link">
                <td className="title">{this.props.name}</td><td><a className="url" href={this.props.url}>{this.props.url}</a></td><td><span className="delete" onClick={this.delete.bind(this)}></span></td>
            </tr>
        );
    }
}

class PhotoArray extends React.Component {
    render() {
        var photoEditers = [];
        if (this.props.photos) {
            this.props.photos.forEach(function(item, index) {
                photoEditers.push(<PhotoEditer img={item.q} />);
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

if (self.fetch) {

} else {
    console.log('Unsupported browser. Please use Firefox or Google Chrome')
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
