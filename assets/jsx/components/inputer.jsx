import React from 'react'

//
// Input field with title next to it.
//
// props: id, handler, placeholder, title, text
//
//

class Inputer extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='question'>
                <label className="title">{this.props.title}: </label>
                <input type="text"
                    value={this.props.text}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handler}
                     />
            </div>
        );
    }
}

export default Inputer
