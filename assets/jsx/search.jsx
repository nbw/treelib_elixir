import React from 'react';
import ReactDOM from 'react-dom';
import Family         from './components/family.jsx';
import Genus          from './components/genus.jsx';
import Species        from './components/species.jsx';
import SearchSidebar  from './components/searchSidebar.jsx';

var pg = pageData;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: { item: null, itemType: null },
      sidebarMinimized: false,
      sidebarHidden: false,
      fullScreenPhotoMode: false,
      preSelected: pg.pre_selected || null
    };
  }

  componentDidMount() {
    if(pg.pre_selected){
      var pre = pg.pre_selected
      if (pre.type == "species") {
        this.selectedHandler (pre.item, "species", this.update.bind(this));
      }
      else if(pre.type == "genus") {
        this.selectedHandler (pre.item, "genus", this.update.bind(this));
      }
      else if(pre.type == "family") {
        this.selectedHandler (pre.item, "family", this.update.bind(this));
      }
    }

    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("closed")) {
      this.update("sidebarMinimized", true);
    }
    // window.addEventListener("fullScreenPhoto", () => {this.update('sidebarHidden', !this.state.sidebarHidden );});
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
      var pre = pg.pre_selected;
      var families = pg.tree;
      var genera =  [].concat.apply([],families.map(function(f){return f.genera}));
        // species = [].concat.apply([],genera.map(function(g){return g.species}));
      if (pre.type == "species") {
        obj.species = pre.item;
        obj.genus = genera.find(function(g){ return g.id == obj.species.genus_id });
        obj.family = families.find(function(f){ return f.id == obj.genus.fam_id });
      }
      else if(pre.type == "genus") {
        obj.genus = pre.item;
        obj.family = families.find(function(f){ return f.id == obj.genus.fam_id });
      }
      else if(pre.type == "family") {
        obj.family = pre.item;
      }
    }
    return obj;
  }

  selectedHandler(i, type, handler) {
    handler('selectedItem', {itemType: type, item: i});
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
      hidden = this.state.fullScreenPhotoMode;
    return (
      <div className='mainContainer'>
        { hidden ? null :
            <SearchSidebar
              title = "Family"
              tree = {pg.tree}
              selectedHandler={this.selectedHandler.bind(this)}
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
                <Family
                  key={`f-${item.id}`}
                  family={item}
                  handler={this.update.bind(this)}
                  isFSPMode={this.state.fullScreenPhotoMode}
                /> : null }
            { type === "genus" ?
                <Genus
                  key={`g-${item.id}`}
                  genus={item}
                  handler={this.update.bind(this)}
                  isFSPMode={this.state.fullScreenPhotoMode}
                /> : null }
            { type === "species" ?
                <Species
                  key={`s-${item.id}`}
                  species={item}
                  contributors={item.contributors}
                  genus={this.findGenus(item.genus_id)}
                  handler={this.update.bind(this)}
                  isFSPMode={this.state.fullScreenPhotoMode}
                /> : null }
          </div>
       </div>
    );
  }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
