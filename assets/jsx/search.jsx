import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Family from './components/family.jsx';
import Genus from './components/genus.jsx';
import Species from './components/species.jsx';
import SearchSidebar from './components/searchSidebar.jsx';

var pg = pageData;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: { item: null, itemType: null },
      sidebarMinimized: false,
      sidebarHidden: false,
      preSelected: pg.pre_selected || null,
      isFullScreenImageMode: null
    };
  }
  componentDidMount() {
    if(pg.pre_selected){
      var pre = pg.pre_selected
      if (pre.type == "species") {
        this.speciesSelectedHandler (pre.item, this.update.bind(this));
      }
      else if(pre.type == "genus") { 
        this.genusSelectedHandler (pre.item, this.update.bind(this));
      }
      else if(pre.type == "family") {
        this.familySelectedHandler (pre.item, this.update.bind(this));
      }
    }
    window.addEventListener("fullScreenPhoto", () => {this.update('sidebarHidden', !this.state.sidebarHidden );});
  }
  componentWillUnmount() {
    window.removeEventListener("fullScreenPhoto", () => {});
  }
  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }
  handleInputChange(name, e) {
    this.setState({
      [name]: e.target.value // ES6 computed property
    });
  }
  searchPreSelect(){
    var obj = {};
    if(pg.pre_selected){
      var pre = pg.pre_selected,
        families = pg.tree,
        genera =  [].concat.apply([],families.map(function(f){return f.genera})),
        species = [].concat.apply([],genera.map(function(g){return g.species}));
      if (pre.type == "species") {
        obj.species = pre.item;
        obj.genus = genera.find(function(g){ return g.id == obj.species.genus_id });
        obj.family = families.find(function(f){ return f.id == obj.genus.family_id });
      }
      else if(pre.type == "genus") { 
        obj.genus = pre.item;
        obj.family = families.find(function(f){ return f.id == obj.genus.family_id });
      }
      else if(pre.type == "family") {
        obj.family = pre.item;
      }
    } 
    return obj;
  }

  getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1),
      obj = {};

    if (queryString) {
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');

      for (var i=0; i<arr.length; i++) {
        var a = arr[i].split('='),
          paramNum = undefined,
          paramName = a[0].replace(/\[\d*\]/, function(v) {
            paramNum = v.slice(1,-1);
            return '';
          }),
          paramValue = typeof(a[1])==='undefined' ? true : a[1];

        paramName = paramName.toLowerCase();
        paramValue = paramValue.toLowerCase();

        if (obj[paramName]) { 
          if (typeof obj[paramName] === 'string') { obj[paramName] = [obj[paramName]]; }
          if (typeof paramNum === 'undefined') { obj[paramName].push(paramValue); }
          else { obj[paramName][paramNum] = paramValue; }
        }
        else { obj[paramName] = paramValue; }
      }
    }
    return obj;
  }

  speciesSelectedHandler(s, handler) {
    handler('selectedItem', {itemType: 'species', item: s});
  }

  genusSelectedHandler(g, handler) {
    handler('selectedItem', {itemType: 'genus', item: g});
  }

  familySelectedHandler(f, handler) {
    handler('selectedItem', {itemType: 'family', item: f});
  }

  findGenus(genus_id) {
    var families = pg.tree,
      genus = {};
    for(var f_index=0; f_index < families.length; f_index++) {
      genus = families[f_index].genera.find(function(g){ return g.id == genus_id;});
      if(genus){break;}
    }
    return genus;
  };

  render() {
    var type = this.state.selectedItem.itemType,
      item = this.state.selectedItem.item,
      minimized = this.state.sidebarMinimized,
      hidden = this.state.sidebarHidden;
    return (
      <div className='mainContainer'>
        { hidden ? null :
            <SearchSidebar 
              title = "Family"
              tree = {pg.tree}
              speciesHandler ={this.speciesSelectedHandler.bind(this)}
              genusHandler ={this.genusSelectedHandler.bind(this)}
              familyHandler ={this.familySelectedHandler.bind(this)}
              handler = {this.update.bind(this)} 
              minimized = {this.state.sidebarMinimized}
              preSelected = {this.searchPreSelect()}
            />
        }
        <div className={minimized ? "content minimized": "content"}>
          { type === null ?
            <div className="default">
              <div className="message">
                <i className="fa fa-caret-left"></i> Click on a <b>family</b> or <b>genus</b> to get started!
              </div>
            </div>
            : null}
            { type === "family" ? 
                <Family family={item}
                  handler={this.update.bind(this)} 
                  isFullScreen={this.props.isFullScreenImageMode}
                /> : null }
                { type === "genus" ? 
                    <Genus genus={item}
                      handler={this.update.bind(this)} 
                      isFullScreen={this.props.isFullScreenImageMode}
                    /> : null }
                    { type === "species" ? 
                        <Species species={item} genus={this.findGenus(item.genus_id)}
                          handler={this.update.bind(this)} 
                          isFullScreen={this.props.isFullScreenImageMode}
                        /> : null }
                      </div>
                    </div>
    );
  }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
