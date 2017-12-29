import React from 'react';

export default class ContactPage extends React.Component {
  render() {
    return (
      <div className="contactPage">
        <div className="section">
          <table className="content">
            <tbody>
              <tr>
                <td><label>How you can connect</label></td>
                <td>
                  <p>
                    Life is about connecting to other people and finding ways to serve them. 
                  </p>
                  <p> 
                    If you have some knowledge of and enjoy photographing trees, connect with us and contribute photographs of new species, improve our shots with your own, introduce great parks you have hiked around.
                  </p>
                  <p>
                    Become a part of a network of friends who love trees and the outdoors, building the site together.  It is as simple as sending us an email. 
                  </p>
                </td>
              </tr>
              <tr>
                <td><label>Who to contact</label></td>
                <td>
                  Blake
                </td>
              </tr>
              <tr>
                <td><label>Reach us at</label></td>
                <td>
                  <img src="images/email.png"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

