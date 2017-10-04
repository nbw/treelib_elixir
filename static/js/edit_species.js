webpackJsonp([5],{

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

	var _inputer = __webpack_require__(179);

	var _inputer2 = _interopRequireDefault(_inputer);

	var _buttoner = __webpack_require__(180);

	var _buttoner2 = _interopRequireDefault(_buttoner);

	var _dropper = __webpack_require__(184);

	var _dropper2 = _interopRequireDefault(_dropper);

	var _texter = __webpack_require__(182);

	var _texter2 = _interopRequireDefault(_texter);

	var _markup = __webpack_require__(183);

	var _markup2 = _interopRequireDefault(_markup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pg = pageData;

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

	        _this.state = {
	            title: pg.species.name || "",
	            common_name: pg.species.common_name || "",
	            description: pg.species.descrip || "",
	            genus_id: pg.species.genus_id || pg.genera[0].id || 0,
	            album_id: pg.species.album_id || 0,
	            links: pg.species.links || []
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'handleInputChange',
	        value: function handleInputChange(name, e) {
	            this.setState(_defineProperty({}, name, e.target.value));
	        }
	    }, {
	        key: 'updateTheMotherShip',
	        value: function updateTheMotherShip() {
	            if (this.state.title === "") {
	                alert('Please enter a species name, then try again.');return;
	            }
	            if (this.state.common_name === "") {
	                alert('Please enter a common name, then try again.');return;
	            }
	            if (!this.state.album_id) {
	                alert('Please choose a photo album, then try again.');return;
	            }

	            fetch('/api/edit_species', {
	                method: 'POST',
	                credentials: 'same-origin',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                    id: pg.species.id || null,
	                    name: this.state.title.trim(),
	                    common_name: this.state.common_name.trim(),
	                    descrip: this.state.description,
	                    g_id: this.state.genus_id,
	                    album_id: this.state.album_id || null,
	                    links: this.state.links,
	                    key: pg.key
	                })
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (obj) {
	                        window.location.href = window.location.origin + window.location.pathname + '?id=' + obj.id;
	                    });
	                } else {
	                    console.log('Response was not ok.');
	                    alert('Response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
	        }
	    }, {
	        key: 'deleteMe',
	        value: function deleteMe() {
	            var r = confirm("Are you sure you want to delete me?");
	            if (r == true) {
	                fetch('/api/delete_species', {
	                    method: 'POST',
	                    credentials: 'same-origin',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify({
	                        id: pg.species.id,
	                        key: pg.key
	                    })
	                }).then(function (response) {
	                    if (response.ok) {
	                        response.json().then(function (obj) {
	                            window.location.href = window.location.origin + window.location.pathname;
	                        });
	                    } else {
	                        console.log('Response was not ok.');
	                        alert('Response was not ok.');
	                    }
	                }).catch(function (error) {
	                    console.log('There has been a problem with your fetch operation: ' + error.message);
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_adminNavbar2.default, null),
	                _react2.default.createElement(
	                    'h1',
	                    { className: 'mainTitle' },
	                    this.state.title || "New Species"
	                ),
	                pg.species.id ? _react2.default.createElement(_buttoner2.default, { id: 'deleteButton',
	                    callback: this.deleteMe.bind(this),
	                    text: 'delete' }) : null,
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_inputer2.default, {
	                    id: 'name',
	                    title: 'Name',
	                    placeholder: 'species',
	                    text: this.state.title,
	                    handler: this.handleInputChange.bind(this, "title") }),
	                _react2.default.createElement(_dropper2.default, {
	                    id: 'genera',
	                    title: 'Genus',
	                    'default': this.state.genus_id,
	                    list: pg.genera,
	                    handler: this.handleInputChange.bind(this, "genus_id") }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_inputer2.default, {
	                    id: 'common_name',
	                    title: 'Common Name',
	                    placeholder: 'common name',
	                    text: this.state.common_name,
	                    handler: this.handleInputChange.bind(this, "common_name") }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_texter2.default, {
	                    id: 'description',
	                    title: 'Description',
	                    placeholder: 'enter description here',
	                    text: this.state.description,
	                    handler: this.handleInputChange.bind(this, "description") }),
	                _react2.default.createElement(_markup2.default, null),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_dropper2.default, {
	                    id: 'photoAlbum',
	                    title: 'Photo Album',
	                    'default': this.state.album_id,
	                    list: pg.photo_albums,
	                    handler: this.handleInputChange.bind(this, "album_id") }),
	                _react2.default.createElement(PhotoArray, {
	                    photos: pg.species.photos }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(Linker, {
	                    links: this.state.links,
	                    handler: this.update.bind(this, "links") }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_buttoner2.default, {
	                    id: 'saveButton',
	                    callback: this.updateTheMotherShip.bind(this),
	                    text: 'save' })
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	var Linker = function (_React$Component2) {
	    _inherits(Linker, _React$Component2);

	    function Linker() {
	        _classCallCheck(this, Linker);

	        var _this2 = _possibleConstructorReturn(this, (Linker.__proto__ || Object.getPrototypeOf(Linker)).call(this));

	        _this2.state = {
	            newLinkName: "",
	            newLinkURL: "",
	            showAddLinkInput: false
	        };
	        return _this2;
	    }

	    _createClass(Linker, [{
	        key: 'showInput',
	        value: function showInput() {
	            this.setState({
	                showAddLinkInput: true
	            });
	        }
	    }, {
	        key: 'saveLink',
	        value: function saveLink() {
	            if (this.state.newLinkName.length === 0 || this.state.newLinkURL.length === 0) {
	                alert('try again. something is missing.');
	            } else {
	                this.props.links.push({ name: this.state.newLinkName, url: this.state.newLinkURL });
	                this.props.handler(this.props.links);
	            }
	            this.setState({
	                newLinkName: "",
	                newLinkURL: "",
	                showAddLinkInput: false
	            });
	        }
	    }, {
	        key: 'removeLink',
	        value: function removeLink(e) {
	            var index = this.props.links.indexOf(e);
	            this.props.links.splice(index, 1);
	            this.props.handler(this.props.links);
	        }
	    }, {
	        key: 'updateLinkInput',
	        value: function updateLinkInput(name, e) {
	            this.setState(_defineProperty({}, name, e.target.value));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var rows = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.props.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;

	                    rows.push(_react2.default.createElement(Link, { key: item.name,
	                        name: item.name,
	                        url: item.url,
	                        handler: this.removeLink.bind(this) }));
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return _react2.default.createElement(
	                'div',
	                { id: 'linker' },
	                'Links:',
	                _react2.default.createElement(
	                    'table',
	                    { className: 'linksTable' },
	                    _react2.default.createElement(
	                        'thead',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                'Name'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                'URL'
	                            ),
	                            _react2.default.createElement('th', null)
	                        )
	                    ),
	                    rows
	                ),
	                !this.state.showAddLinkInput ? _react2.default.createElement(
	                    'div',
	                    { className: 'addLinkBtn', onClick: this.showInput.bind(this) },
	                    '+ add URL'
	                ) : null,
	                this.state.showAddLinkInput ? _react2.default.createElement(
	                    'div',
	                    { className: 'addLinkInput' },
	                    _react2.default.createElement('input', {
	                        placeholder: 'display name',
	                        value: this.state.newLinkName,
	                        onChange: this.updateLinkInput.bind(this, 'newLinkName') }),
	                    'and ',
	                    _react2.default.createElement('input', {
	                        placeholder: 'URL',
	                        value: this.state.newLinkURL,
	                        onChange: this.updateLinkInput.bind(this, 'newLinkURL') }),
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'btn-std', onClick: this.saveLink.bind(this) },
	                        'add'
	                    )
	                ) : null
	            );
	        }
	    }]);

	    return Linker;
	}(_react2.default.Component);

	var Link = function (_React$Component3) {
	    _inherits(Link, _React$Component3);

	    function Link() {
	        _classCallCheck(this, Link);

	        return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
	    }

	    _createClass(Link, [{
	        key: 'delete',
	        value: function _delete() {
	            this.props.handler(this.props);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'tr',
	                { className: 'link' },
	                _react2.default.createElement(
	                    'td',
	                    { className: 'title' },
	                    this.props.name
	                ),
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement(
	                        'a',
	                        { className: 'url', href: this.props.url },
	                        this.props.url
	                    )
	                ),
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement('span', { className: 'delete', onClick: this.delete.bind(this) })
	                )
	            );
	        }
	    }]);

	    return Link;
	}(_react2.default.Component);

	var PhotoArray = function (_React$Component4) {
	    _inherits(PhotoArray, _React$Component4);

	    function PhotoArray() {
	        _classCallCheck(this, PhotoArray);

	        return _possibleConstructorReturn(this, (PhotoArray.__proto__ || Object.getPrototypeOf(PhotoArray)).apply(this, arguments));
	    }

	    _createClass(PhotoArray, [{
	        key: 'render',
	        value: function render() {
	            var photoEditers = [];
	            if (this.props.photos) {
	                this.props.photos.forEach(function (item, index) {
	                    photoEditers.push(_react2.default.createElement(PhotoEditer, { img: item.q }));
	                });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoArray' },
	                photoEditers
	            );
	        }
	    }]);

	    return PhotoArray;
	}(_react2.default.Component);

	var PhotoEditer = function (_React$Component5) {
	    _inherits(PhotoEditer, _React$Component5);

	    function PhotoEditer() {
	        _classCallCheck(this, PhotoEditer);

	        return _possibleConstructorReturn(this, (PhotoEditer.__proto__ || Object.getPrototypeOf(PhotoEditer)).apply(this, arguments));
	    }

	    _createClass(PhotoEditer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoEditer' },
	                _react2.default.createElement('img', { src: this.props.img })
	            );
	        }
	    }]);

	    return PhotoEditer;
	}(_react2.default.Component);

	if (self.fetch) {} else {
	    console.log('Unsupported browser. Please use Firefox or Google Chrome');
	}

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

/***/ },

/***/ 179:
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

	//
	// Input field with title next to it. 
	//
	// props: id, handler, placeholder, title, text
	//
	//

	var Inputer = function (_React$Component) {
	    _inherits(Inputer, _React$Component);

	    function Inputer() {
	        _classCallCheck(this, Inputer);

	        return _possibleConstructorReturn(this, (Inputer.__proto__ || Object.getPrototypeOf(Inputer)).apply(this, arguments));
	    }

	    _createClass(Inputer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: 'question' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'title' },
	                    this.props.title,
	                    ': '
	                ),
	                _react2.default.createElement('input', { type: 'text',
	                    value: this.props.text,
	                    placeholder: this.props.placeholder,
	                    onChange: this.props.handler
	                })
	            );
	        }
	    }]);

	    return Inputer;
	}(_react2.default.Component);

	Inputer.propTypes = {
	    text: _react.PropTypes.string.isRequired,
	    title: _react.PropTypes.string.isRequired,
	    placeholder: _react.PropTypes.string.isRequired,
	    handler: _react.PropTypes.func.isRequired
	};

	exports.default = Inputer;

/***/ },

/***/ 180:
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

	//
	// Button with callback
	// 
	// props: callback, id, text
	//

	var Buttoner = function (_React$Component) {
	    _inherits(Buttoner, _React$Component);

	    function Buttoner() {
	        _classCallCheck(this, Buttoner);

	        return _possibleConstructorReturn(this, (Buttoner.__proto__ || Object.getPrototypeOf(Buttoner)).apply(this, arguments));
	    }

	    _createClass(Buttoner, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id,
	                    className: 'button',
	                    onClick: this.props.callback },
	                this.props.text
	            );
	        }
	    }]);

	    return Buttoner;
	}(_react2.default.Component);

	Buttoner.propTypes = {
	    callback: _react.PropTypes.func.isRequired
	};

	exports.default = Buttoner;

/***/ },

/***/ 182:
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

	var Texter = function (_React$Component) {
	    _inherits(Texter, _React$Component);

	    function Texter() {
	        _classCallCheck(this, Texter);

	        return _possibleConstructorReturn(this, (Texter.__proto__ || Object.getPrototypeOf(Texter)).apply(this, arguments));
	    }

	    _createClass(Texter, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: 'question' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'title' },
	                    this.props.title,
	                    ': '
	                ),
	                _react2.default.createElement('textarea', {
	                    value: this.props.text,
	                    placeholder: this.props.placeholder,
	                    onChange: this.props.handler
	                })
	            );
	        }
	    }]);

	    return Texter;
	}(_react2.default.Component);

	exports.default = Texter;

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

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

	var Markup = function (_React$Component) {
	    _inherits(Markup, _React$Component);

	    function Markup() {
	        _classCallCheck(this, Markup);

	        return _possibleConstructorReturn(this, (Markup.__proto__ || Object.getPrototypeOf(Markup)).apply(this, arguments));
	    }

	    _createClass(Markup, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "div",
	                { className: "markup" },
	                _react2.default.createElement(
	                    "table",
	                    null,
	                    _react2.default.createElement(
	                        "thead",
	                        null,
	                        _react2.default.createElement(
	                            "tr",
	                            null,
	                            _react2.default.createElement(
	                                "th",
	                                null,
	                                "HTML"
	                            ),
	                            _react2.default.createElement(
	                                "th",
	                                null,
	                                "Function"
	                            ),
	                            _react2.default.createElement(
	                                "th",
	                                null,
	                                "Example"
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        "tbody",
	                        null,
	                        _react2.default.createElement(
	                            "tr",
	                            null,
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "<p>...</p>"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "Paragraph"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                _react2.default.createElement(
	                                    "p",
	                                    null,
	                                    "This is what a paragraph looks like. "
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "tr",
	                            null,
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "<b>...</b>"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "Bold"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                _react2.default.createElement(
	                                    "b",
	                                    null,
	                                    "This is bold."
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "tr",
	                            null,
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "<i>...</i>"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "Italic"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                _react2.default.createElement(
	                                    "p",
	                                    null,
	                                    "Italicized text"
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "tr",
	                            null,
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "<u>...</u>"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "Underlined"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                _react2.default.createElement(
	                                    "u",
	                                    null,
	                                    "This text is underlined."
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "tr",
	                            null,
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "<a href='[link]'>...</a>"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                "Link"
	                            ),
	                            _react2.default.createElement(
	                                "td",
	                                null,
	                                _react2.default.createElement(
	                                    "a",
	                                    { href: "http://google.ca" },
	                                    "This is a link for google."
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Markup;
	}(_react2.default.Component);

	exports.default = Markup;

/***/ },

/***/ 184:
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

	var Dropper = function (_React$Component) {
	    _inherits(Dropper, _React$Component);

	    function Dropper() {
	        _classCallCheck(this, Dropper);

	        return _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).apply(this, arguments));
	    }

	    _createClass(Dropper, [{
	        key: 'render',
	        value: function render() {
	            var rows = [];
	            this.props.list.forEach(function (item) {
	                rows.push(_react2.default.createElement(
	                    'option',
	                    { value: item.id, key: item.id },
	                    item.name
	                ));
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: 'question' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'title' },
	                    this.props.title,
	                    ': '
	                ),
	                _react2.default.createElement(
	                    'select',
	                    { onChange: this.props.handler, defaultValue: this.props.default },
	                    rows
	                )
	            );
	        }
	    }]);

	    return Dropper;
	}(_react2.default.Component);

	exports.default = Dropper;

/***/ }

});