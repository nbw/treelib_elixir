import React from 'react'

class Dropper extends React.Component {

  title() {
    if (this.props.title) {
      return <label className="title">{this.props.title}: </label>;
    } else {
      return "";
    }
  };

  render() {
    var rows = [];
    this.props.list.forEach(function(item) {
      rows.push(<option value={item.id} key={item.id}>{item.name}</option>);
    });
    return (
      <div className='question'>
        { this.title() }
        <select onChange={this.props.handler} defaultValue={this.props.default}>
          {rows}
        </select>
      </div>
    );
  }
}

export default Dropper;
