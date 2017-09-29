import React from 'react'

class CheckBoxer extends React.Component {

    toggleCheckbox(e){
        var curr = this.props.isChecked;
        this.props.handler(!curr);
    }

    render() {
        return (
            <div id={this.props.id} className='checkBox'>
                <input type="checkbox"
                    key={this.props.key}
                    value={this.props.value}
                    onChange={() => this.toggleCheckbox()}
                    checked={this.props.isChecked} 
                     />
                    <label>{this.props.title}</label>
            </div>
        );
    }
}

export default CheckBoxer