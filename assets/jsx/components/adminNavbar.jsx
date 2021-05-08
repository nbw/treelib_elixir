import React from "react";

class AdminNavbar extends React.Component {
  render() {
    return (
      <div id="adminNavbar">
        <div className="title">
          <a href="/">Treelib</a>
        </div>
        <div className="item">
          <a href="/family/new">Add Family</a>
        </div>
        <div className="item">
          <a href="/genus/new">Add Genus</a>
        </div>
        <div className="item">
          <a href="/species/new">Add Species</a>
        </div>
        <div className="item">
          <a href="/admin/contributors">Contributors</a>
        </div>
        <div className="item">
          <a href="/admin/qr">QR</a>
        </div>
        <div className="item">
          <a href="/admin">Master Tree</a>
        </div>
        <div className="item">
          <a href="/admin/debug">Debug</a>
        </div>
      </div>
    );
  }
}

export default AdminNavbar;
