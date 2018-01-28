import React from 'react'

import CheckBoxer from './checkBoxer.jsx';
import Searcher from './searcher.jsx';

class SearchSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFamily: null,
      selectedGenus: null,
      selectedSpecies: null,
      showLatinNames: true,
      showCommonNames: true,
    };
  }
  componentDidMount() {
    var preSelected = this.props.preSelected;
    this.setState({selectedFamily: preSelected.family || null});
    this.setState({selectedGenus: preSelected.genus || null});
    this.setState({selectedSpecies: preSelected.species || null});
  }
  update(name, value) {
    this.setState({
      [name]: value // ES6 computed property
    });
  }
  handleInputChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }
  familyClicked(item,e) {
    this.update('selectedGenus', null);
    this.update('selectedSpecies', null);
    this.props.selectedHandler(item, "family", this.props.handler);
    this.update('selectedFamily', item);
    window.history.pushState({},"title","?f="+item.id);
  }
  genusClicked(item,e) {
    this.update('selectedSpecies', null); 
    this.update('selectedGenus', item);
    this.props.selectedHandler(item, "genus", this.props.handler);
    window.history.pushState({},"title","?g="+item.id);
  }
  speciesClicked(species,e) {
    species = this.preloadSpeciesWithGenus(species);
    this.props.selectedHandler(species, "species", this.props.handler);
    this.update('selectedSpecies', species);
    var genus_name = species.genus_name.toLowerCase(),
      name = species.name.toLowerCase();
    window.history.pushState({},"title","?s="+species.id);
  }
  hideSidebar(e) {
    var minimized = this.props.minimized;
    this.props.handler('sidebarMinimized', !minimized);
  }
  resetTree() {
    this.update('selectedGenus', null);
    this.update('selectedSpecies', null);
    this.update('selectedFamily', null);
  }

  findGenus(genus_id) {
    var families = self.props.tree,
      genus = {};
    for(var f_index=0; f_index < families.length; f_index++) {
      genus = families[f_index].genera.find(function(g){ return g.id == genus_id;});
      if(genus){break;}
    }
    return genus;
  };

  preloadSpeciesWithGenus(species){
    var genus = this.findGenus(species.genus_id);
    species.genus_name = genus.name;
    species.genus_common_name = genus.common_name;
    return species;
  };
  render() {
    self = this;
    var selectedFamily =  this.state.selectedFamily,
      selectedGenus = this.state.selectedGenus,
      selectedSpecies = this.state.selectedSpecies,
      minimized = this.props.minimized,
      familyRows = self.props.tree.map(function(item) {
        var isSelected = selectedFamily && (selectedFamily.id == item.id),
          latinName = self.state.showLatinNames ? item.name : "",
          commonName = self.state.showCommonNames ? item.common_name : "";
        return <SidebarListItem 
          isSelected={isSelected} 
          value={item.id}
          key={"f" + item.id} 
          onClick={(event) => self.familyClicked(item, event)}
          latinName={latinName}
          commonName={commonName}
        />;
      });
    // sort alphabetically
    familyRows.sort(function(a, b){
      var name_a = a.props.latinName,
        name_b = b.props.latinName;

      if( !self.state.showLatinNames && self.state.showCommonNames ) {
        name_a = a.props.commonName;
        name_b = b.props.commonName;
      }

      if(name_a.toLowerCase() < name_b.toLowerCase()) return -1;
      if(name_a.toLowerCase() > name_b.toLowerCase()) return 1;
      return 0;
    });

    var generaRows = [];
    if(selectedFamily) {
      generaRows = selectedFamily.genera.map(function(item) {
        var isSelected = selectedGenus && (selectedGenus.id == item.id),
          latinName = self.state.showLatinNames ? item.name : "",
          commonName = self.state.showCommonNames ? item.common_name : "";
        return <SidebarListItem 
          isSelected={isSelected} 
          value={item.id}
          key={"g" + item.id} 
          onClick={(event) => self.genusClicked(item, event)}
          latinName={latinName}
          commonName={commonName}
        />;
      });
    } else if (!(selectedFamily || selectedSpecies) || !(selectedFamily || selectedGenus) || selectedGenus){
      self.props.tree.forEach(function(family) {
        // if(selectedGenus && (family.id == selectedGenus.fam_id)) {
        family.genera.forEach(function(item) {
          var isSelected = selectedGenus && (selectedGenus.id == item.id),
            latinName = self.state.showLatinNames ? item.name : "",
            commonName = self.state.showCommonNames ? item.common_name : "";
          generaRows.push(
            <SidebarListItem 
              isSelected={isSelected} 
              value={item.id}
              key={"g" + item.id} 
              onClick={(event) => self.genusClicked(item, event)}
              latinName={latinName}
              commonName={commonName}
            />
          );
        });
        // }
      });

    }
    // sort alphabetically
    generaRows.sort(function(a, b){
      var name_a = a.props.latinName,
        name_b = b.props.latinName;

      if( !self.state.showLatinNames && self.state.showCommonNames ) {
        name_a = a.props.commonName;
        name_b = b.props.commonName;
      }

      if(name_a.toLowerCase() < name_b.toLowerCase()) return -1;
      if(name_a.toLowerCase() > name_b.toLowerCase()) return 1;
      return 0;
    });

    var speciesRows = [];
    if(selectedGenus) {
      speciesRows = selectedGenus.species.map(function(item) {
        item = self.preloadSpeciesWithGenus(item);
        var isSelected = selectedSpecies && (selectedSpecies.id == item.id),
          latinName = self.state.showLatinNames ?  item.genus_name + " " + item.name : "",
          commonName = self.state.showCommonNames ? item.common_name + " " + item.genus_common_name : "";
        return <SidebarListItem 
          isSelected={isSelected} 
          value={item.id} 
          key={"s" + item.id} 
          onClick={(event) => self.speciesClicked(item, event)}
          latinName={latinName}
          commonName={commonName}
        />;
      });
    } else if (!(selectedGenus || selectedFamily)) {
      speciesRows.push(<li key="blank" className="emptySpeciesItem">← select a genus first</li>);
      // self.props.tree.forEach(function(family) {
      //     family.genera.forEach(function(genus) {
      //         genus.species.forEach(function(item) {
      //             var isSelected = selectedSpecies && (selectedSpecies.id == item.id),
      //                 latinName = self.state.showLatinNames ? item.genus_name + " " + item.name : "",
      //                 commonName = self.state.showCommonNames ? item.common_name + " " + item.genus_common_name : "";

      //             speciesRows.push(
      //                     <SidebarListItem 
      //                     isSelected={isSelected} 
      //                     value={item.id} key={item.id} 
      //                     onClick={(event) => self.speciesClicked(item, event)}
      //                     latinName={latinName}
      //                     commonName={commonName}
      //                 />
      //             );
      //         });
      //     });
      // });     
    }
    // sort alphabetically
    speciesRows.sort(function(a, b){
      var name_a = a.props.latinName,
        name_b = b.props.latinName;

      if( !self.state.showLatinNames && self.state.showCommonNames ) {
        name_a = a.props.commonName;
        name_b = b.props.commonName;
      }

      if(name_a.toLowerCase() < name_b.toLowerCase()) return -1;
      if(name_a.toLowerCase() > name_b.toLowerCase()) return 1;
      return 0;
    });
    // default if both checkboxes are unselected
    if(!(this.state.showLatinNames || this.state.showCommonNames)) {
      this.update('showLatinNames', true);
    }

    return (
      <div id={this.props.id}　className={ minimized ? "searchbar minimized" : "searchbar"} >
        <div className="title"><a href="/"><img src="/images/logo.png"></img><label>TreeLib</label></a></div>
        <div className="closeButton" onClick={(event) => self.hideSidebar(event)}>
          { minimized ? 
            <i className="fa fa-angle-right"></i> : 
            <i className="fa fa-angle-left"></i>}
          </div>
          <Searcher 
            speciesHandler = {this.speciesClicked.bind(this)}
            genusHandler   = {this.genusClicked.bind(this)}
            familyHandler  = {this.familyClicked.bind(this)}
            handler={() => {this.props.handler}}
            tree={this.props.tree}
          />
          <div className="nameSelector">
            <span className="helper"></span>
            <CheckBoxer
              isChecked={this.state.showLatinNames}
              title=" Latin names"
              handler={this.update.bind(this,'showLatinNames')}
            />
            <CheckBoxer
              isChecked={this.state.showCommonNames}
              title=" common names"
              handler={this.update.bind(this,'showCommonNames')}
            />
          </div>
          <div className="lists">
            <div className="familyList">
              <div className="subtitle" onClick={ (event) => this.resetTree(event) } ><label >Family</label></div>
              <ul className="searchSidebar-list">
                {familyRows}
              </ul>
            </div>
            <div className="generaList">
              <div className="subtitle" onClick={ (event) => this.resetTree(event) } ><label>Genus</label></div>
              <ul className="searchSidebar-list">
                {generaRows}
              </ul>
            </div>
            <div className="speciesList">
              <div className="subtitle" onClick={ (event) => this.resetTree(event) } ><label>Species</label></div>
              <ul className="searchSidebar-list">
                {speciesRows}
              </ul>
            </div>
          </div>
        </div>
    );
  };
}

function SidebarListItem(props) {
  var classNames = "";

  if (props.isSelected) {
    classNames = "selected";
  }

  return (
    <li value={props.item} onClick={props.onClick} className={"sidebarListItem " + classNames}>
      <ul className="sidebarListItem-names">
        <li><label className="latinName">{props.latinName}</label></li><li>
          <label className="commonName">{props.commonName}</label></li>
      </ul>
    </li>
  );
}

export default SearchSidebar
