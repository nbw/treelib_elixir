import React, { PropTypes } from 'react'

class AdminNavbar extends React.Component {
    refreshClick(){
        self = this;
        fetch('/admin/refresh', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRF-Token': CSRF_TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            if(response.ok) {
                alert('Refresh successful.');
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert('Response was not ok.');
        });    
    }
    render() {
        self = this;
        return (
            <div id="adminNavbar">
                <div className="title"><a href="/">Treelib</a></div>
                <div className="item"><a href="/family/new" >Add Family</a></div>
                <div className="item"><a href="/genus/new" >Add Genus</a></div>
                <div className="item"><a href="/species/new" >Add Species</a></div>
                <div className="item"><a href="/admin" >Master Tree</a></div>
                <div className="refresh" onClick={(event) => self.refreshClick()}>Refresh</div>
            </div>
        );
    }
}

export default AdminNavbar
