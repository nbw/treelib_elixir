const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
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
    aboutpage: "./jsx/aboutpage.jsx",
    contactpage: "./jsx/contactpage.jsx",
    species_list_page: "./jsx/species_list_page.jsx",
    autres: ['react', 'react-dom','whatwg-fetch', './js/phoenix_html.js'],
  },
  output: {
    path: path.resolve(__dirname, "../priv/static"),
    filename: "js/[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "autres", filename: "js/autres.bundle.js"}),
    new MinifyPlugin({}, {}),
    new CopyWebpackPlugin([{ from: "./assets"}]),
  ]
};
