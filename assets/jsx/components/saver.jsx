import React from 'react'

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

export default Saver