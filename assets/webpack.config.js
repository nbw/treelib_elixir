var webpack = require("webpack");
var classNames = require('classnames');
const path = require('path');

module.exports = {
  resolve: {
    modulesDirectories: [ "node_modules", __dirname + "/web/static/js" ]
  },
  entry: {
    edit_species: "./jsx/edit_species.jsx",
    edit_genus: "./jsx/edit_genus.jsx",
    edit_family: "./jsx/edit_family.jsx",
    admin_family_tree: "./jsx/admin_family_tree.jsx",
    admin_signup: "./jsx/admin_signup.jsx",
    login: "./jsx/login.jsx",
    search: "./jsx/search.jsx",
    species_page: "./jsx/species_page.jsx",
    genus_page: "./jsx/genus_page.jsx",
    family_page: "./jsx/family_page.jsx",
    homepage: "./jsx/homepage.jsx",
    autres: ['react', 'react-dom','whatwg-fetch'],
  },
  output: {
    path: path.resolve(__dirname, "priv/static/js"),
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "autres", filename: "autres.bundle.js"})
  ]
}
