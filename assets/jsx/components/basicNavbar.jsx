import React from 'react'

class BasicNavbar extends React.Component {
    func(){
         this.props.handler('search');
    }
    render() {
        return (
            <div className="basicNavbar">
                <ul>
                    <li className="treelib"><a href="/"><img src="/images/logo.png"></img><label>TreeLib</label></a></li>
                    <li className="home"><a href="/">HOME</a></li>
                    <li className="search"><a href="/search">SEARCH</a></li>
                    <li className="species"><a href="/species">SPECIES</a></li>
                    <li className="about"><a href="/about">ABOUT</a></li>
                    <li className="contact"><a href="/contact">CONTACT</a></li>
                    <li className="contributors"><a href="/contributors">CONTRIBUTORS</a></li>
                </ul>
              <div class="navBorders">
                <div className="navBorder first"></div><div className="navBorder second"></div><div className="navBorder third"></div>
              </div>
            </div>
        );
    }
}

export default BasicNavbar
