import React from 'react'

import SearcherResult from './searcher_result.jsx';

class Searcher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      val: "",
      families: this.families(),
      genera: this.genera(),
      species: this.species(),
      results: []
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.update("results", []);
    }
  }

  families() {
    return this.props.tree.map(function(f){
      return {
        type: "family",
        name: f.name,
        common_name: f.common_name,
        item: f
      }
    });
  }

  genera() {
    let g = this.props.tree.map(function(f){
      return f.genera.map(function(g) {
        return {
          type: "genus",
          name: g.name,
          common_name:g.common_name,
          item: g
        }
      });
    });
    return [].concat.apply([], g);
  }

  species() {
    let s = this.props.tree.map(function(f){
      return f.genera.map(function(g) {
        return g.species.map(function(s){
          return {
            type: "species",
            name: `${g.name} ${s.name}`,
            common_name:  `${s.common_name} ${g.common_name} `,
            item: s
          }
        });
      });
    });
    return [].concat.apply([],([].concat.apply([], s)));
  }

  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }

  check(e) {
    const val = e.target.value
    this.update("val", val);
    if(val.length > 2){
      const families =  this.search(val, "families", 50);
      const genera   =  this.search(val, "genera",   50);
      const species  =  this.search(val, "species",  50);
      this.update("results", [].concat(species, genera, families));
    } else {
      this.update("results", []);
    }
  }

  // Search is by first characters
  search(search_term, type, num_results) {
    const re = new RegExp(`\\b(${search_term.toLowerCase()})`);
    const master_list = this.state[type]
    let list = master_list.filter(
      i => (re.test(i.name.toLowerCase()) || re.test(i.common_name.toLowerCase()))
    );
    return list.slice(0,num_results);
  }

  getSearcherHandler(type) {
    let handler = null;
    switch(type){
      case "species":
        handler = this.props.speciesHandler
        break;
      case "genus":
        handler = this.props.genusHandler
        break;
      case "family":
        handler = this.props.familyHandler
        break;
    }
    return handler;
  }

  render() {
    let self = this;
    let results = this.state.results.map(function(item){
      return <SearcherResult
        key={`sr-${item.type}-${item.item.id}`}
        name = {item.name}
        common_name = {item.common_name}
        item = {item.item}
        type = {item.type}
        selectedHandler = {self.getSearcherHandler(item.type)}
        reseter ={() => {self.update("results", [])}}
        current_input = {self.state.val}
      />
    });

    return (
      <div id="searcher" ref={this.setWrapperRef}>
        <div id="searcher-input">
          <input
            type="text"
            value={this.state.val}
            placeholder="enter a family, genus, or species"
            onChange={(e) => this.check(e)}
            onClick={(e) => this.check(e)}
          />
          <div className="icon">
            <i className="fa fa-search"></i>
          </div>
        </div>
        <ul id="searcher-results">
         {results}
        </ul>
      </div>
    )
  };
}
export default Searcher
