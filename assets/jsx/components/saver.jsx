import React, { PropTypes } from 'react'

//
// Save Button
// 
// props: id, callback
//

class Saver extends React.Component {
    render() {
        return (
            <div id={this.props.id} 
                className='button'
                onClick={this.props.callback}>
                save
            </div>
        );
    }
}

Saver.propTypes = {
    callback: PropTypes.func.isRequired
}

export default Saver