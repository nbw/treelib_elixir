webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(32);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _adminNavbar = __webpack_require__(178);

	var _adminNavbar2 = _interopRequireDefault(_adminNavbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pg = pageData;

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var families = [];
	            pg.tree.forEach(function (item) {
	                families.push(_react2.default.createElement(Family, { family: item }));
	            });
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_adminNavbar2.default, null),
	                _react2.default.createElement(
	                    'h1',
	                    { className: 'title' },
	                    'Master Tree'
	                ),
	                _react2.default.createElement('hr', null),
	                families
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	var Family = function (_React$Component2) {
	    _inherits(Family, _React$Component2);

	    function Family() {
	        _classCallCheck(this, Family);

	        return _possibleConstructorReturn(this, (Family.__proto__ || Object.getPrototypeOf(Family)).apply(this, arguments));
	    }

	    _createClass(Family, [{
	        key: 'render',
	        value: function render() {
	            var f = this.props.family,
	                genera = [];
	            this.props.family.genera.forEach(function (item) {
	                genera.push(_react2.default.createElement(Genus, { genus: item }));
	            });
	            return _react2.default.createElement(
	                'table',
	                { className: 'familyTable' },
	                _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                        'td',
	                        { id: 'family-' + f.id, key: f.id },
	                        _react2.default.createElement(
	                            'a',
	                            { target: '_blank', href: "/admin/edit_family?id=" + f.id },
	                            f.name
	                        ),
	                        _react2.default.createElement('br', null),
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'subtitle' },
	                            'family'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        genera
	                    )
	                )
	            );
	        }
	    }]);

	    return Family;
	}(_react2.default.Component);

	var Genus = function (_React$Component3) {
	    _inherits(Genus, _React$Component3);

	    function Genus() {
	        _classCallCheck(this, Genus);

	        return _possibleConstructorReturn(this, (Genus.__proto__ || Object.getPrototypeOf(Genus)).apply(this, arguments));
	    }

	    _createClass(Genus, [{
	        key: 'render',
	        value: function render() {
	            var g = this.props.genus,
	                species = [];
	            this.props.genus.species.forEach(function (item) {
	                species.push(_react2.default.createElement(Species, { species: item }));
	            });
	            return _react2.default.createElement(
	                'table',
	                { className: 'genusTable' },
	                _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                        'td',
	                        { id: 'genus-' + g.id, key: g.id },
	                        _react2.default.createElement(
	                            'a',
	                            { target: '_blank', href: "/admin/edit_genus?id=" + g.id },
	                            g.name
	                        ),
	                        _react2.default.createElement('br', null),
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'subtitle' },
	                            'genus'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        _react2.default.createElement(
	                            'table',
	                            { className: 'speciesTable' },
	                            species
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Genus;
	}(_react2.default.Component);

	var Species = function (_React$Component4) {
	    _inherits(Species, _React$Component4);

	    function Species() {
	        _classCallCheck(this, Species);

	        return _possibleConstructorReturn(this, (Species.__proto__ || Object.getPrototypeOf(Species)).apply(this, arguments));
	    }

	    _createClass(Species, [{
	        key: 'render',
	        value: function render() {
	            var s = this.props.species;
	            return _react2.default.createElement(
	                'tr',
	                { className: 'species', id: 'species-' + s.id, key: s.id },
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement(
	                        'a',
	                        { target: '_blank', href: "/admin/edit_species?id=" + s.id },
	                        s.name
	                    ),
	                    _react2.default.createElement('br', null),
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'subtitle' },
	                        'species'
	                    )
	                )
	            );
	        }
	    }]);

	    return Species;
	}(_react2.default.Component);

	exports.default = App;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AdminNavbar = function (_React$Component) {
	    _inherits(AdminNavbar, _React$Component);

	    function AdminNavbar() {
	        _classCallCheck(this, AdminNavbar);

	        return _possibleConstructorReturn(this, (AdminNavbar.__proto__ || Object.getPrototypeOf(AdminNavbar)).apply(this, arguments));
	    }

	    _createClass(AdminNavbar, [{
	        key: 'refreshClick',
	        value: function refreshClick() {
	            self = this;
	            fetch('/api/refresh', {
	                method: 'POST',
	                credentials: 'same-origin',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                }
	            }).then(function (response) {
	                if (response.ok) {
	                    alert('Refresh successful.');
	                } else {
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	                alert('Response was not ok.');
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            self = this;
	            return _react2.default.createElement(
	                'div',
	                { id: 'adminNavbar' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/' },
	                        'Treelib'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'item' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/family/new' },
	                        'Add Family'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'item' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/genus/new' },
	                        'Add Genus'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'item' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/species/new' },
	                        'Add Species'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'item' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/admin/family_tree' },
	                        'Master Tree'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'refresh', onClick: function onClick(event) {
	                            return self.refreshClick();
	                        } },
	                    'Refresh'
	                )
	            );
	        }
	    }]);

	    return AdminNavbar;
	}(_react2.default.Component);

	exports.default = AdminNavbar;

/***/ }

});