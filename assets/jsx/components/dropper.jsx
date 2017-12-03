import React from 'react'

class Dropper extends React.Component {
    render() {
        var rows = [];
        this.props.list.forEach(function(item) {
            rows.push(<option value={item.id} key={item.id}>{item.name}</option>);
        });
        return (
            <div className='question'>
                <label className="title">{this.props.title}: </label>
                <select onChange={this.props.handler} defaultValue={this.props.default}>
                    {rows}
                </select>
            </div>
        );
    }
}

export default Dropper