import React from 'react'

class Texter extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='question'>
                <label className="title">{this.props.title}: </label>
                <textarea
                    value={this.props.text}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handler}
                     />
            </div>
        );
    }
}

export default Texter