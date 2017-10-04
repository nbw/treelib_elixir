webpackJsonp([1],{

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

	        _this.state = {
	            username: "",
	            email: "",
	            password: ""
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
	            if (this.state.username.length === 0 || this.state.email.length === 0 || this.state.password.length === 0) {
	                alert('try again. something is missing.');
	                return;
	            }

	            fetch('/api/add_admin_user', {
	                method: 'POST',
	                credentials: 'same-origin',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                    username: this.state.username,
	                    email: this.state.email,
	                    password: this.state.password
	                })
	            }).then(function (response) {
	                if (response.ok) {
	                    alert('success! user created.');
	                } else {
	                    alert("uh oh.");
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
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
	                    null,
	                    'Admin Signup'
	                ),
	                _react2.default.createElement(
	                    'p',
	                    null,
	                    'This page is for creating other ',
	                    _react2.default.createElement(
	                        'b',
	                        null,
	                        'admin'
	                    ),
	                    ' accounts.'
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(
	                    'ul',
	                    { id: 'signupList', className: 'resetList' },
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        _react2.default.createElement(_inputer2.default, {
	                            id: 'name',
	                            title: 'Username',
	                            placeholder: 'name',
	                            text: this.state.username,
	                            handler: this.handleInputChange.bind(this, 'username') })
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        _react2.default.createElement(_inputer2.default, {
	                            id: 'email',
	                            title: 'Email',
	                            placeholder: 'email',
	                            text: this.state.email,
	                            handler: this.handleInputChange.bind(this, 'email') })
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        null,
	                        _react2.default.createElement(_inputer2.default, {
	                            id: 'password',
	                            title: 'Password',
	                            placeholder: 'password',
	                            text: this.state.password,
	                            handler: this.handleInputChange.bind(this, 'password') })
	                    )
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_buttoner2.default, {
	                    id: 'saveButton',
	                    callback: this.updateTheMotherShip.bind(this),
	                    text: 'signup' })
	            );
	        }
	    }]);

	    return App;
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

/***/ }

});