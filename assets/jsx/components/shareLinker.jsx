import React from 'react'

class ShareLinker extends React.Component {
     constructor() {
        super();
        this.state = {
            show: false
        };
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
    toggleHidden() {
        this.update('show',!this.state.show)
    }

    render() {
        var link = window.location.origin + this.props.path,
            show = this.state.show ? 'show' : '' ;
        return (
            <div id={this.props.id} className={'linkSharer ' + show} onBlur={() => this.toggleHidden()} >
                <div className="links">
                    <label onClick={() => this.toggleHidden()}><i className="fa fa-share"></i> Share</label>
                    <input value={link} onChange={function(){return}}></input>
                    <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link)} target="_blank"><i className="fa fa-facebook"></i></a>
                    <a href={"https://twitter.com/home?status=" + encodeURIComponent(link)} target="_blank"><i className="fa fa-twitter"></i></a>
                </div>
            </div>
        );
    }
}


export default ShareLinker