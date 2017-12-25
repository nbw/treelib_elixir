import React from 'react'

//
// Input field with title next to it. 
//
// props: id, handler, placeholder, title, text
//
//

class SearcherResult extends React.Component {
  selectHandler(i,e) {
    this.props.reseter();
    this.props.selectedHandler(i, e);
  }
  highlight_input(s){
    const html_string = s.replace(this.props.current_input, `<b>${this.props.current_input}</b>`);
    return { __html: html_string };
  }
  render() {
    return (
      <li 
        key={`sr-${this.props.type}-${this.props.item.id}`}
        className={`searcher-result searcher-${this.props.type}`}
        onClick={(e) => this.selectHandler(this.props.item, e) }
      >
        <ul className="result-list">
          <li><span dangerouslySetInnerHTML={this.highlight_input(this.props.name)}></span> <span className="type">{this.props.type}</span></li>
          <li><span dangerouslySetInnerHTML={this.highlight_input(this.props.common_name)}></span></li>
        </ul>
      </li>
    );
  }
}

export default SearcherResult
