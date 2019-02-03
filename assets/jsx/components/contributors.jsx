import React from 'react'

class Contributors extends React.Component {
  contributionsList(contributors){
    var names = [];
    for (var i = 0; i < contributors.length; i++) {
      var name = contributors[i].first_name + " " + contributors[i].last_name;
      names.push(<a key={"cont-" + contributors[i].id} href={"/contributors#cont-" + contributors[i].id}>{name}</a>);

      if(contributors.length > 1) {
        if (i == (contributors.length - 1)) {
          names.splice(-1, 0, " and ");
        } else {
          names.push(", ");
        }
      }
    }
    return names;
  }
  render() {
    var contributors = this.props.contributors;
    if (contributors === undefined || contributors.length === 0 ) {
      return "";
    }
    return (
      <div className="contributors">
        <h2>Contributors</h2>
        <p>Additional contributions from {this.contributionsList(contributors)}.</p>
      </div>
    );
  }
}

export default Contributors

