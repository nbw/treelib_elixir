import React from 'react'

//
// Button with callback
// 
// props: callback, id, text
//

class Buttoner extends React.Component {
    render() {
        return (
            <div id={this.props.id}
                className='button'
                onClick={this.props.callback}>
                {this.props.text}
            </div>
        );
    }
}

export default Buttoner

