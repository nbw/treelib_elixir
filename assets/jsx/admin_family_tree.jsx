import React from 'react';
import ReactDOM from 'react-dom';
import AdminNavbar from './components/adminNavbar.jsx';

var pg = pageData;

class App extends React.Component {
    render() {
        var families = [];
        pg.tree.forEach(function(item) {
            families.push(
                <Family family={item} />)
        });
        return (
            <div>
                <AdminNavbar />
                <h1 className="title">Master Tree</h1>
                <hr />
                {families}
            </div>
        );
    }
}

class Family extends React.Component {
    render() {
        var f = this.props.family,
            genera = [];
        this.props.family.genera.forEach(function(item) {
            genera.push(<Genus genus={item} />);
        });
        return (
            <table className="familyTable">
                <tr>
                    <td id={'family-' + f.id} key={f.id}>
                        <a target="_blank" href={"/admin/edit_family?id=" + f.id}>{f.name}</a><br/>
                        <span className="subtitle">family</span>
                    </td>
                    <td>
                        {genera}
                    </td>
                </tr>
            </table>
        );
    }
}

class Genus extends React.Component {
    render() {
        var g = this.props.genus,
            species = [];
        this.props.genus.species.forEach(function(item) {
            species.push(<Species species={item} />);
        });
        return (
            <table className="genusTable">
                <tr>
                    <td id={'genus-' + g.id} key={g.id}>
                        <a target="_blank" href={"/admin/edit_genus?id=" + g.id}>{g.name}</a><br/>
                        <span className="subtitle">genus</span>
                    </td>
                    <td>
                        <table className="speciesTable">
                            {species}
                        </table>
                    </td>
                </tr>
            </table>
        );
    }
}

class Species extends React.Component {
    render() {
        var s = this.props.species;
        return (
            <tr className="species" id={'species-' + s.id} key={s.id}>
                <td>
                    <a target="_blank" href={"/admin/edit_species?id=" + s.id}>{s.name}</a><br/>
                        <span className="subtitle">species</span>
                </td>
            </tr>
        );
    }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));