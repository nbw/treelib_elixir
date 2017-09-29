webpackJsonp([10],{

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

	var _family = __webpack_require__(186);

	var _family2 = _interopRequireDefault(_family);

	var _genus = __webpack_require__(189);

	var _genus2 = _interopRequireDefault(_genus);

	var _species = __webpack_require__(193);

	var _species2 = _interopRequireDefault(_species);

	var _searchSidebar = __webpack_require__(194);

	var _searchSidebar2 = _interopRequireDefault(_searchSidebar);

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
	      selectedItem: { item: null, itemType: null },
	      sidebarMinimized: false,
	      sidebarHidden: false,
	      preSelected: pg.pre_selected || null,
	      isFullScreenImageMode: null
	    };
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (pg.pre_selected) {
	        var pre = pg.pre_selected;
	        if (pre.type == "species") {
	          this.speciesSelectedHandler(pre.item, this.update.bind(this));
	        } else if (pre.type == "genus") {
	          this.genusSelectedHandler(pre.item, this.update.bind(this));
	        } else if (pre.type == "family") {
	          this.familySelectedHandler(pre.item, this.update.bind(this));
	        }
	      }
	      window.addEventListener("fullScreenPhoto", function () {
	        _this2.update('sidebarHidden', !_this2.state.sidebarHidden);
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener("fullScreenPhoto", function () {});
	    }
	  }, {
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
	    key: 'searchPreSelect',
	    value: function searchPreSelect() {
	      var obj = {};
	      if (pg.pre_selected) {
	        var pre = pg.pre_selected,
	            families = pg.tree,
	            genera = [].concat.apply([], families.map(function (f) {
	          return f.genera;
	        })),
	            species = [].concat.apply([], genera.map(function (g) {
	          return g.species;
	        }));
	        if (pre.type == "species") {
	          obj.species = pre.item;
	          obj.genus = genera.find(function (g) {
	            return g.id == obj.species.genus_id;
	          });
	          obj.family = families.find(function (f) {
	            return f.id == obj.genus.family_id;
	          });
	        } else if (pre.type == "genus") {
	          obj.genus = pre.item;
	          obj.family = families.find(function (f) {
	            return f.id == obj.genus.family_id;
	          });
	        } else if (pre.type == "family") {
	          obj.family = pre.item;
	        }
	      }
	      return obj;
	    }
	  }, {
	    key: 'getAllUrlParams',
	    value: function getAllUrlParams(url) {
	      var queryString = url ? url.split('?')[1] : window.location.search.slice(1),
	          obj = {};

	      if (queryString) {
	        queryString = queryString.split('#')[0];
	        var arr = queryString.split('&');

	        for (var i = 0; i < arr.length; i++) {
	          var a = arr[i].split('='),
	              paramNum = undefined,
	              paramName = a[0].replace(/\[\d*\]/, function (v) {
	            paramNum = v.slice(1, -1);
	            return '';
	          }),
	              paramValue = typeof a[1] === 'undefined' ? true : a[1];

	          paramName = paramName.toLowerCase();
	          paramValue = paramValue.toLowerCase();

	          if (obj[paramName]) {
	            if (typeof obj[paramName] === 'string') {
	              obj[paramName] = [obj[paramName]];
	            }
	            if (typeof paramNum === 'undefined') {
	              obj[paramName].push(paramValue);
	            } else {
	              obj[paramName][paramNum] = paramValue;
	            }
	          } else {
	            obj[paramName] = paramValue;
	          }
	        }
	      }
	      return obj;
	    }
	  }, {
	    key: 'speciesSelectedHandler',
	    value: function speciesSelectedHandler(s, handler) {
	      var self = this;
	      fetch('/api/photos?species_id=' + s.id, {
	        method: 'GET',
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
	      }).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (photos) {
	            s.photos = photos;
	            handler('selectedItem', { itemType: 'species', item: s });
	          });
	        } else {
	          console.log('Network response was not ok.');
	        }
	      }).catch(function (error) {
	        console.log('There has been a problem with your fetch operation: ' + error.message);
	      });
	    }
	  }, {
	    key: 'genusSelectedHandler',
	    value: function genusSelectedHandler(g, handler) {
	      self = this;
	      fetch('/api/photos?genus_id=' + g.id, {
	        method: 'GET',
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
	      }).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (photos) {
	            g.photos = photos;
	            handler('selectedItem', { itemType: 'genus', item: g });
	          });
	        } else {
	          console.log('Network response was not ok.');
	        }
	      }).catch(function (error) {
	        console.log('There has been a problem with your fetch operation: ' + error.message);
	      });
	    }
	  }, {
	    key: 'familySelectedHandler',
	    value: function familySelectedHandler(f, handler) {
	      self = this;
	      fetch('/api/photos?family_id=' + f.id, {
	        method: 'GET',
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
	      }).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (photos) {
	            f.photos = photos;
	            handler('selectedItem', { itemType: 'family', item: f });
	          });
	        } else {
	          console.log('Network response was not ok.');
	        }
	      }).catch(function (error) {
	        console.log('There has been a problem with your fetch operation: ' + error.message);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var type = this.state.selectedItem.itemType,
	          item = this.state.selectedItem.item,
	          minimized = this.state.sidebarMinimized,
	          hidden = this.state.sidebarHidden;
	      return _react2.default.createElement(
	        'div',
	        { className: 'mainContainer' },
	        hidden ? null : _react2.default.createElement(_searchSidebar2.default, {
	          title: 'Family',
	          tree: pg.tree,
	          speciesHandler: this.speciesSelectedHandler.bind(this),
	          genusHandler: this.genusSelectedHandler.bind(this),
	          familyHandler: this.familySelectedHandler.bind(this),
	          handler: this.update.bind(this),
	          minimized: this.state.sidebarMinimized,
	          preSelected: this.searchPreSelect()
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: minimized ? "content minimized" : "content" },
	          type === null ? _react2.default.createElement(
	            'div',
	            { className: 'default' },
	            _react2.default.createElement(
	              'div',
	              { className: 'message' },
	              _react2.default.createElement('i', { className: 'fa fa-caret-left' }),
	              ' Click on a ',
	              _react2.default.createElement(
	                'b',
	                null,
	                'family'
	              ),
	              ' or ',
	              _react2.default.createElement(
	                'b',
	                null,
	                'genus'
	              ),
	              ' to get started!'
	            )
	          ) : null,
	          type === "family" ? _react2.default.createElement(_family2.default, { family: item,
	            handler: this.update.bind(this),
	            isFullScreen: this.props.isFullScreenImageMode
	          }) : null,
	          type === "genus" ? _react2.default.createElement(_genus2.default, { genus: item,
	            handler: this.update.bind(this),
	            isFullScreen: this.props.isFullScreenImageMode
	          }) : null,
	          type === "species" ? _react2.default.createElement(_species2.default, { species: item,
	            handler: this.update.bind(this),
	            isFullScreen: this.props.isFullScreenImageMode
	          }) : null
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = App;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },

/***/ 186:
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

	var _photoViewer = __webpack_require__(187);

	var _photoViewer2 = _interopRequireDefault(_photoViewer);

	var _shareLinker = __webpack_require__(188);

	var _shareLinker2 = _interopRequireDefault(_shareLinker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Family = function (_React$Component) {
	    _inherits(Family, _React$Component);

	    function Family() {
	        _classCallCheck(this, Family);

	        var _this = _possibleConstructorReturn(this, (Family.__proto__ || Object.getPrototypeOf(Family)).call(this));

	        _this.state = {
	            selectedPhotoIndex: null
	        };
	        return _this;
	    }

	    _createClass(Family, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps() {
	            this.update("selectedPhotoIndex", null);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var curr_family = this.props.family,
	                next_family = nextProps.family;
	            if (curr_family != next_family) {
	                this.update("selectedPhotoIndex", null);
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'nextPhoto',
	        value: function nextPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto < this.props.family.photos.length) {
	                this.update("selectedPhotoIndex", selectedPhoto + 1);
	            }
	            return;
	        }
	    }, {
	        key: 'prevPhoto',
	        value: function prevPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto > 0) {
	                this.update("selectedPhotoIndex", selectedPhoto - 1);
	            }
	        }
	    }, {
	        key: 'closePhotoviewer',
	        value: function closePhotoviewer() {
	            this.update("selectedPhotoIndex", null);
	        }
	    }, {
	        key: 'createMarkup',
	        value: function createMarkup(s) {
	            return { __html: s };
	        }
	    }, {
	        key: 'grabMorePhotos',
	        value: function grabMorePhotos(event) {
	            var self = this,
	                f = this.props.family;
	            fetch('/api/get_family_photos?family_id=' + f.id, {
	                method: 'GET',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                }
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (photos) {
	                        f.photos = photos;
	                        self.update("selectedPhotoIndex", null);
	                    });
	                } else {
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                f = this.props.family,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];

	            var genera = f.genera.map(function (g, i) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: i },
	                    _react2.default.createElement(
	                        'a',
	                        { className: 'underlineable', href: '/search?genus=' + encodeURI(g.name.toLowerCase()) },
	                        g.name
	                    )
	                );
	            });

	            if (f.photos && f.photos.length > 0) {
	                f.photos.forEach(function (link, index) {
	                    if (index == selectedPhoto) {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, className: 'selected' }));
	                    } else {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, onClick: function onClick() {
	                                return self.update('selectedPhotoIndex', index);
	                            } }));
	                    }
	                });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'family' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/family/' + f.name.replace(/ /g, '_') },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'main' },
	                            f.name
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'commonName' },
	                        f.common_name
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'secondary' },
	                        'family'
	                    )
	                ),
	                _react2.default.createElement(_shareLinker2.default, {
	                    path: '/family/' + f.name.replace(/ /g, '_')
	                }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'textContent' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'description' },
	                        _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(f.description) })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'genera' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'genusTitle' },
	                            'Genera'
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            null,
	                            genera
	                        )
	                    )
	                ),
	                selectedPhoto != null ? _react2.default.createElement(_photoViewer2.default, {
	                    nextCallback: function nextCallback() {
	                        return _this2.nextPhoto();
	                    },
	                    prevCallback: function prevCallback() {
	                        return _this2.prevPhoto();
	                    },
	                    closeCallback: function closeCallback() {
	                        return _this2.closePhotoviewer();
	                    },
	                    hideSidebarCallback: function hideSidebarCallback() {
	                        return _this2.props.handler('sidebarHidden', true);
	                    },
	                    showSidebarCallback: function showSidebarCallback() {
	                        return _this2.props.handler('sidebarHidden', false);
	                    },
	                    image: f.photos[selectedPhoto].medium,
	                    imageName: f.photos[selectedPhoto].name,
	                    imageDescription: f.photos[selectedPhoto].description,
	                    original: f.photos[selectedPhoto].original,
	                    flickr_url: f.photos[selectedPhoto].flickr_url }) : null,
	                thumbs.length > 0 ? _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'subtitle' },
	                        'The photos below have been randomly selected from species in ',
	                        f.name,
	                        '.'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'thumbs' },
	                        thumbs
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { onClick: this.grabMorePhotos.bind(this), className: 'newPhotoSelectionButton' },
	                        'new random photo selection'
	                    )
	                ) : null
	            );
	        }
	    }]);

	    return Family;
	}(_react2.default.Component);

	exports.default = Family;

/***/ },

/***/ 187:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PhotoViewer = function (_React$Component) {
	    _inherits(PhotoViewer, _React$Component);

	    function PhotoViewer() {
	        _classCallCheck(this, PhotoViewer);

	        var _this = _possibleConstructorReturn(this, (PhotoViewer.__proto__ || Object.getPrototypeOf(PhotoViewer)).call(this));

	        _this.state = {
	            showFullSize: false
	        };
	        return _this;
	    }

	    _createClass(PhotoViewer, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener("keydown", this.handleKeyPress.bind(this));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener("keydown", this.handleKeyPress.bind(this));
	        }
	    }, {
	        key: 'handleKeyPress',
	        value: function handleKeyPress(event) {
	            if (event.key === "ArrowLeft") {
	                this.props.prevCallback();
	            }
	            if (event.key === "ArrowRight") {
	                this.props.nextCallback();
	            }
	        }
	    }, {
	        key: 'showFullSizeImage',
	        value: function showFullSizeImage() {
	            // if defined, let the parents know what's up.
	            if (this.props.hideSidebarCallback) {
	                this.props.hideSidebarCallback();
	            }

	            this.update('showFullSize', true);
	        }
	    }, {
	        key: 'closeFullSizeImage',
	        value: function closeFullSizeImage() {
	            // if defined, let the parents know what's up.
	            if (this.props.showSidebarCallback) {
	                this.props.showSidebarCallback();
	            }

	            this.update('showFullSize', false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var self = this,
	                show = this.state.showFullSize ? 'show' : '';
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoViewer' },
	                _react2.default.createElement(
	                    'div',
	                    { onClick: function onClick() {
	                            return self.closeFullSizeImage();
	                        }, className: "fullSizeImage " + show },
	                    _react2.default.createElement('span', { className: 'helper' }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'imageWrapper' },
	                        _react2.default.createElement('img', { src: this.props.original }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'info' },
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'title' },
	                                this.props.imageName
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                { className: 'description' },
	                                this.props.imageDescription
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'closeButton', onClick: function onClick() {
	                                return self.closeFullSizeImage();
	                            } },
	                        _react2.default.createElement('i', { className: 'fa fa-times fa-lg' }),
	                        ' Close '
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'image' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'prev', onClick: this.props.prevCallback },
	                        _react2.default.createElement('i', { className: 'fa fa-angle-double-left fa-2x' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'imageWrapper' },
	                        _react2.default.createElement('span', { className: 'helper' }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'imageInnerWrapper' },
	                            _react2.default.createElement('img', { src: this.props.image, onClick: function onClick() {
	                                    return self.showFullSizeImage();
	                                } }),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'photoButtons' },
	                                _react2.default.createElement(
	                                    'ul',
	                                    null,
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'fullScreen', onClick: function onClick() {
	                                                return self.showFullSizeImage();
	                                            } },
	                                        _react2.default.createElement('i', { className: 'fa fa-expand fa-lg' }),
	                                        ' '
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'a',
	                                            { target: '_blank', className: 'flickr', href: this.props.flickr_url },
	                                            _react2.default.createElement('i', { className: 'fa fa-flickr fa-lg' }),
	                                            ' '
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'a',
	                                            { className: 'downloadLink', href: this.props.original, download: this.props.imageName },
	                                            _react2.default.createElement('i', { className: 'fa fa-download fa-lg' }),
	                                            ' '
	                                        )
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'info' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'title' },
	                                    this.props.imageName
	                                ),
	                                _react2.default.createElement(
	                                    'p',
	                                    { className: 'description' },
	                                    this.props.imageDescription
	                                )
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'next', onClick: this.props.nextCallback },
	                        _react2.default.createElement('i', { className: 'fa fa-angle-double-right fa-2x' })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'closeButton', onClick: this.props.closeCallback },
	                    _react2.default.createElement('i', { className: 'fa fa-times fa-lg' }),
	                    ' Close '
	                )
	            );
	        }
	    }]);

	    return PhotoViewer;
	}(_react2.default.Component);

	exports.default = PhotoViewer;

/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShareLinker = function (_React$Component) {
	    _inherits(ShareLinker, _React$Component);

	    function ShareLinker() {
	        _classCallCheck(this, ShareLinker);

	        var _this = _possibleConstructorReturn(this, (ShareLinker.__proto__ || Object.getPrototypeOf(ShareLinker)).call(this));

	        _this.state = {
	            show: false
	        };
	        return _this;
	    }

	    _createClass(ShareLinker, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'toggleHidden',
	        value: function toggleHidden() {
	            this.update('show', !this.state.show);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var link = window.location.origin + this.props.path,
	                show = this.state.show ? 'show' : '';
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: 'linkSharer ' + show, onBlur: function onBlur() {
	                        return _this2.toggleHidden();
	                    } },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'links' },
	                    _react2.default.createElement(
	                        'label',
	                        { onClick: function onClick() {
	                                return _this2.toggleHidden();
	                            } },
	                        _react2.default.createElement('i', { className: 'fa fa-share' }),
	                        ' Share'
	                    ),
	                    _react2.default.createElement('input', { value: link, onChange: function onChange() {
	                            return;
	                        } }),
	                    _react2.default.createElement(
	                        'a',
	                        { href: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link), target: '_blank' },
	                        _react2.default.createElement('i', { className: 'fa fa-facebook' })
	                    ),
	                    _react2.default.createElement(
	                        'a',
	                        { href: "https://twitter.com/home?status=" + encodeURIComponent(link), target: '_blank' },
	                        _react2.default.createElement('i', { className: 'fa fa-twitter' })
	                    )
	                )
	            );
	        }
	    }]);

	    return ShareLinker;
	}(_react2.default.Component);

	exports.default = ShareLinker;

/***/ },

/***/ 189:
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

	var _photoViewer = __webpack_require__(187);

	var _photoViewer2 = _interopRequireDefault(_photoViewer);

	var _shareLinker = __webpack_require__(188);

	var _shareLinker2 = _interopRequireDefault(_shareLinker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Genus = function (_React$Component) {
	    _inherits(Genus, _React$Component);

	    function Genus() {
	        _classCallCheck(this, Genus);

	        var _this = _possibleConstructorReturn(this, (Genus.__proto__ || Object.getPrototypeOf(Genus)).call(this));

	        _this.state = {
	            selectedPhotoIndex: null
	        };
	        return _this;
	    }

	    _createClass(Genus, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var curr_genus = this.props.genus,
	                next_genus = nextProps.genus;
	            if (curr_genus != next_genus) {
	                this.update("selectedPhotoIndex", null);
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'nextPhoto',
	        value: function nextPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto < this.props.genus.photos.length) {
	                this.update("selectedPhotoIndex", selectedPhoto + 1);
	            }
	            return;
	        }
	    }, {
	        key: 'prevPhoto',
	        value: function prevPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto > 0) {
	                this.update("selectedPhotoIndex", selectedPhoto - 1);
	            }
	        }
	    }, {
	        key: 'closePhotoviewer',
	        value: function closePhotoviewer() {
	            this.update("selectedPhotoIndex", null);
	        }
	    }, {
	        key: 'createMarkup',
	        value: function createMarkup(s) {
	            return { __html: s };
	        }
	    }, {
	        key: 'grabMorePhotos',
	        value: function grabMorePhotos(event) {
	            var self = this,
	                g = this.props.genus;
	            fetch('/api/get_genus_photos?genus_id=' + g.id, {
	                method: 'GET',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                }
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (photos) {
	                        g.photos = photos;
	                        self.update("selectedPhotoIndex", null);
	                    });
	                } else {
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                g = this.props.genus,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];

	            var species_links = g.species.map(function (s, i) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: i },
	                    _react2.default.createElement(
	                        'a',
	                        { className: 'underlineable', href: '/search?species=' + encodeURI((s.genus_name + "_" + s.name).toLowerCase()) },
	                        s.name
	                    )
	                );
	            });
	            if (g.photos && g.photos.length > 0) {
	                g.photos.forEach(function (link, index) {
	                    if (index == selectedPhoto) {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, className: 'selected' }));
	                    } else {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, onClick: function onClick() {
	                                return self.update('selectedPhotoIndex', index);
	                            } }));
	                    }
	                });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'genus' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/genus/' + g.name.replace(/ /g, '_') },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'main' },
	                            g.name
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'commonName' },
	                        g.common_name
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'secondary' },
	                        'genus'
	                    )
	                ),
	                _react2.default.createElement(_shareLinker2.default, {
	                    path: '/genus/' + g.name.replace(/ /g, '_')
	                }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'textContent' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'description' },
	                        _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(g.description) })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'species' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'speciesTitle' },
	                            'Species'
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            null,
	                            species_links
	                        )
	                    )
	                ),
	                selectedPhoto != null ? _react2.default.createElement(_photoViewer2.default, {
	                    nextCallback: function nextCallback() {
	                        return _this2.nextPhoto();
	                    },
	                    prevCallback: function prevCallback() {
	                        return _this2.prevPhoto();
	                    },
	                    closeCallback: function closeCallback() {
	                        return _this2.closePhotoviewer();
	                    },
	                    hideSidebarCallback: function hideSidebarCallback() {
	                        return _this2.props.handler('sidebarHidden', true);
	                    },
	                    showSidebarCallback: function showSidebarCallback() {
	                        return _this2.props.handler('sidebarHidden', false);
	                    },
	                    image: g.photos[selectedPhoto].medium,
	                    imageName: g.photos[selectedPhoto].name,
	                    imageDescription: g.photos[selectedPhoto].description,
	                    original: g.photos[selectedPhoto].original,
	                    flickr_url: g.photos[selectedPhoto].flickr_url }) : null,
	                thumbs.length > 0 ? _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'subtitle' },
	                        'The photos below have been randomly selected from species in ',
	                        g.name,
	                        '.'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'thumbs' },
	                        thumbs
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { onClick: this.grabMorePhotos.bind(this), className: 'newPhotoSelectionButton' },
	                        'new random photo selection'
	                    )
	                ) : null
	            );
	        }
	    }]);

	    return Genus;
	}(_react2.default.Component);

	exports.default = Genus;

/***/ },

/***/ 193:
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

	var _photoViewer = __webpack_require__(187);

	var _photoViewer2 = _interopRequireDefault(_photoViewer);

	var _shareLinker = __webpack_require__(188);

	var _shareLinker2 = _interopRequireDefault(_shareLinker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Species = function (_React$Component) {
	    _inherits(Species, _React$Component);

	    function Species() {
	        _classCallCheck(this, Species);

	        var _this = _possibleConstructorReturn(this, (Species.__proto__ || Object.getPrototypeOf(Species)).call(this));

	        _this.state = {
	            selectedPhotoIndex: null
	        };
	        return _this;
	    }

	    _createClass(Species, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps() {
	            this.update("selectedPhotoIndex", null);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var curr_species = this.props.species,
	                next_species = nextProps.species;
	            if (curr_species != next_species) {
	                this.update("selectedPhotoIndex", null);
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'nextPhoto',
	        value: function nextPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto < this.props.species.photos.length - 1) {
	                this.update("selectedPhotoIndex", selectedPhoto + 1);
	            }
	            return;
	        }
	    }, {
	        key: 'prevPhoto',
	        value: function prevPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto > 0) {
	                this.update("selectedPhotoIndex", selectedPhoto - 1);
	            }
	        }
	    }, {
	        key: 'closePhotoviewer',
	        value: function closePhotoviewer() {
	            this.update("selectedPhotoIndex", null);
	        }
	    }, {
	        key: 'createMarkup',
	        value: function createMarkup(s) {
	            return { __html: s };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                s = this.props.species,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];
	            if (s.photos && s.photos.length > 0) {
	                s.photos.forEach(function (link, index) {
	                    if (index == selectedPhoto) {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, className: 'selected' }));
	                    } else {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, onClick: function onClick() {
	                                return self.update('selectedPhotoIndex', index);
	                            } }));
	                    }
	                });
	            }

	            var links = links ? s.links.map(function (link, index) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: index },
	                    _react2.default.createElement(
	                        'a',
	                        { target: '_blank', href: link.url },
	                        link.name
	                    )
	                );
	            }) : [];
	            return _react2.default.createElement(
	                'div',
	                { className: 'species' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/species/' + encodeURI((s.genus_name + "_" + s.name).toLowerCase()) },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'main' },
	                            s.genus_name,
	                            ' ',
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'speciesTitle' },
	                                s.name
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'commonName' },
	                        s.common_name,
	                        ' ',
	                        s.genus_common_name
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'secondary' },
	                        'species'
	                    ),
	                    _react2.default.createElement(_shareLinker2.default, {
	                        path: '/species/' + encodeURI((s.genus_name + "_" + s.name).toLowerCase())
	                    })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'description' },
	                    _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(s.description) })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'links' },
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        links
	                    )
	                ),
	                selectedPhoto != null ? _react2.default.createElement(_photoViewer2.default, {
	                    nextCallback: function nextCallback() {
	                        return _this2.nextPhoto();
	                    },
	                    prevCallback: function prevCallback() {
	                        return _this2.prevPhoto();
	                    },
	                    closeCallback: function closeCallback() {
	                        return _this2.closePhotoviewer();
	                    },
	                    hideSidebarCallback: function hideSidebarCallback() {
	                        return _this2.props.handler('sidebarHidden', true);
	                    },
	                    showSidebarCallback: function showSidebarCallback() {
	                        return _this2.props.handler('sidebarHidden', false);
	                    },
	                    image: s.photos[selectedPhoto].medium,
	                    imageName: s.photos[selectedPhoto].name,
	                    imageDescription: s.photos[selectedPhoto].description,
	                    original: s.photos[selectedPhoto].original,
	                    flickr_url: s.photos[selectedPhoto].flickr_url }) : null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    thumbs
	                )
	            );
	        }
	    }]);

	    return Species;
	}(_react2.default.Component);

	exports.default = Species;

/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _checkBoxer = __webpack_require__(195);

	var _checkBoxer2 = _interopRequireDefault(_checkBoxer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchSidebar = function (_React$Component) {
	    _inherits(SearchSidebar, _React$Component);

	    function SearchSidebar() {
	        _classCallCheck(this, SearchSidebar);

	        var _this = _possibleConstructorReturn(this, (SearchSidebar.__proto__ || Object.getPrototypeOf(SearchSidebar)).call(this));

	        _this.state = {
	            selectedFamily: null,
	            selectedGenus: null,
	            selectedSpecies: null,
	            showLatinNames: true,
	            showCommonNames: true
	        };
	        return _this;
	    }

	    _createClass(SearchSidebar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var preSelected = this.props.preSelected;
	            this.setState({ selectedFamily: preSelected.family || null });
	            this.setState({ selectedGenus: preSelected.genus || null });
	            this.setState({ selectedSpecies: preSelected.species || null });
	        }
	    }, {
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
	        key: 'familyClicked',
	        value: function familyClicked(item, e) {
	            this.update('selectedGenus', null);
	            this.update('selectedSpecies', null);
	            this.props.familyHandler(item, this.props.handler);
	            this.update('selectedFamily', item);
	            window.history.pushState({}, "title", "?family=" + item.name.toLowerCase());
	        }
	    }, {
	        key: 'genusClicked',
	        value: function genusClicked(item, e) {
	            this.update('selectedSpecies', null);
	            this.update('selectedGenus', item);
	            this.props.genusHandler(item, this.props.handler);
	            window.history.pushState({}, "title", "?genus=" + item.name.toLowerCase());
	        }
	    }, {
	        key: 'speciesClicked',
	        value: function speciesClicked(species, e) {
	            species = this.preloadSpeciesWithGenus(species);
	            this.props.speciesHandler(species, this.props.handler);
	            this.update('selectedSpecies', species);
	            var genus_name = species.genus_name.toLowerCase(),
	                name = species.name.toLowerCase();
	            window.history.pushState({}, "title", "?species=" + genus_name + "_" + name);
	        }
	    }, {
	        key: 'hideSidebar',
	        value: function hideSidebar(e) {
	            var minimized = this.props.minimized;
	            this.props.handler('sidebarMinimized', !minimized);
	        }
	    }, {
	        key: 'resetTree',
	        value: function resetTree() {
	            this.update('selectedGenus', null);
	            this.update('selectedSpecies', null);
	            this.update('selectedFamily', null);
	        }
	    }, {
	        key: 'findGenus',
	        value: function findGenus(genus_id) {
	            var families = self.props.tree,
	                genus = {};
	            for (var f_index = 0; f_index < families.length; f_index++) {
	                genus = families[f_index].genera.find(function (g) {
	                    return g.id == genus_id;
	                });
	                if (genus) {
	                    break;
	                }
	            }
	            return genus;
	        }
	    }, {
	        key: 'preloadSpeciesWithGenus',
	        value: function preloadSpeciesWithGenus(species) {
	            var genus = this.findGenus(species.genus_id);
	            species.genus_name = genus.name;
	            species.genus_common_name = genus.common_name;
	            return species;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            self = this;
	            var selectedFamily = this.state.selectedFamily,
	                selectedGenus = this.state.selectedGenus,
	                selectedSpecies = this.state.selectedSpecies,
	                minimized = this.props.minimized,
	                familyRows = self.props.tree.map(function (item) {
	                var isSelected = selectedFamily && selectedFamily.id == item.id,
	                    latinName = self.state.showLatinNames ? item.name : "",
	                    commonName = self.state.showCommonNames ? item.common_name : "";
	                return _react2.default.createElement(SidebarListItem, {
	                    isSelected: isSelected,
	                    value: item.id,
	                    key: "f" + item.id,
	                    onClick: function onClick(event) {
	                        return self.familyClicked(item, event);
	                    },
	                    latinName: latinName,
	                    commonName: commonName
	                });
	            });
	            // sort alphabetically
	            familyRows.sort(function (a, b) {
	                var name_a = a.props.latinName,
	                    name_b = b.props.latinName;

	                if (!self.state.showLatinNames && self.state.showCommonNames) {
	                    name_a = a.props.commonName;
	                    name_b = b.props.commonName;
	                }

	                if (name_a.toLowerCase() < name_b.toLowerCase()) return -1;
	                if (name_a.toLowerCase() > name_b.toLowerCase()) return 1;
	                return 0;
	            });

	            var generaRows = [];
	            if (selectedFamily) {
	                generaRows = selectedFamily.genera.map(function (item) {
	                    var isSelected = selectedGenus && selectedGenus.id == item.id,
	                        latinName = self.state.showLatinNames ? item.name : "",
	                        commonName = self.state.showCommonNames ? item.common_name : "";
	                    return _react2.default.createElement(SidebarListItem, {
	                        isSelected: isSelected,
	                        value: item.id,
	                        key: "g" + item.id,
	                        onClick: function onClick(event) {
	                            return self.genusClicked(item, event);
	                        },
	                        latinName: latinName,
	                        commonName: commonName
	                    });
	                });
	            } else if (!(selectedFamily || selectedSpecies) || !(selectedFamily || selectedGenus) || selectedGenus) {
	                self.props.tree.forEach(function (family) {
	                    family.genera.forEach(function (item) {
	                        var isSelected = selectedGenus && selectedGenus.id == item.id,
	                            latinName = self.state.showLatinNames ? item.name : "",
	                            commonName = self.state.showCommonNames ? item.common_name : "";
	                        generaRows.push(_react2.default.createElement(SidebarListItem, {
	                            isSelected: isSelected,
	                            value: item.id,
	                            key: "g" + item.id,
	                            onClick: function onClick(event) {
	                                return self.genusClicked(item, event);
	                            },
	                            latinName: latinName,
	                            commonName: commonName
	                        }));
	                    });
	                });
	            }
	            // sort alphabetically
	            generaRows.sort(function (a, b) {
	                var name_a = a.props.latinName,
	                    name_b = b.props.latinName;

	                if (!self.state.showLatinNames && self.state.showCommonNames) {
	                    name_a = a.props.commonName;
	                    name_b = b.props.commonName;
	                }

	                if (name_a.toLowerCase() < name_b.toLowerCase()) return -1;
	                if (name_a.toLowerCase() > name_b.toLowerCase()) return 1;
	                return 0;
	            });

	            var speciesRows = [];
	            if (selectedGenus) {
	                speciesRows = selectedGenus.species.map(function (item) {
	                    item = self.preloadSpeciesWithGenus(item);
	                    var isSelected = selectedSpecies && selectedSpecies.id == item.id,
	                        latinName = self.state.showLatinNames ? item.genus_name + " " + item.name : "",
	                        commonName = self.state.showCommonNames ? item.common_name + " " + item.genus_common_name : "";
	                    return _react2.default.createElement(SidebarListItem, {
	                        isSelected: isSelected,
	                        value: item.id,
	                        key: "s" + item.id,
	                        onClick: function onClick(event) {
	                            return self.speciesClicked(item, event);
	                        },
	                        latinName: latinName,
	                        commonName: commonName
	                    });
	                });
	            } else if (!(selectedGenus || selectedFamily)) {
	                speciesRows.push(_react2.default.createElement(
	                    'li',
	                    { key: 'blank', className: 'emptySpeciesItem' },
	                    '\u2190 select a genus first'
	                ));
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
	            speciesRows.sort(function (a, b) {
	                var name_a = a.props.latinName,
	                    name_b = b.props.latinName;

	                if (!self.state.showLatinNames && self.state.showCommonNames) {
	                    name_a = a.props.commonName;
	                    name_b = b.props.commonName;
	                }

	                if (name_a.toLowerCase() < name_b.toLowerCase()) return -1;
	                if (name_a.toLowerCase() > name_b.toLowerCase()) return 1;
	                return 0;
	            });
	            // default if both checkboxes are unselected
	            if (!(this.state.showLatinNames || this.state.showCommonNames)) {
	                this.update('showLatinNames', true);
	            }

	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: minimized ? "searchbar minimized" : "searchbar" },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/' },
	                        _react2.default.createElement('img', { src: '/images/logo.png' }),
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'TreeLib'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'closeButton', onClick: function onClick(event) {
	                            return self.hideSidebar(event);
	                        } },
	                    minimized ? _react2.default.createElement('i', { className: 'fa fa-angle-right' }) : _react2.default.createElement('i', { className: 'fa fa-angle-left' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'nameSelector' },
	                    _react2.default.createElement('span', { className: 'helper' }),
	                    _react2.default.createElement(_checkBoxer2.default, {
	                        isChecked: this.state.showLatinNames,
	                        title: ' Latin names',
	                        handler: this.update.bind(this, 'showLatinNames')
	                    }),
	                    _react2.default.createElement(_checkBoxer2.default, {
	                        isChecked: this.state.showCommonNames,
	                        title: ' common names',
	                        handler: this.update.bind(this, 'showCommonNames')
	                    })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'lists' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'familyList' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'subtitle', onClick: function onClick(event) {
	                                    return _this2.resetTree(event);
	                                } },
	                            _react2.default.createElement(
	                                'label',
	                                null,
	                                'Family'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            { className: 'searchSidebar-list' },
	                            familyRows
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'generaList' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'subtitle', onClick: function onClick(event) {
	                                    return _this2.resetTree(event);
	                                } },
	                            _react2.default.createElement(
	                                'label',
	                                null,
	                                'Genus'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            { className: 'searchSidebar-list' },
	                            generaRows
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'speciesList' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'subtitle', onClick: function onClick(event) {
	                                    return _this2.resetTree(event);
	                                } },
	                            _react2.default.createElement(
	                                'label',
	                                null,
	                                'Species'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            { className: 'searchSidebar-list' },
	                            speciesRows
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return SearchSidebar;
	}(_react2.default.Component);

	function SidebarListItem(props) {
	    var classNames = "";

	    if (props.isSelected) {
	        classNames = "selected";
	    }

	    return _react2.default.createElement(
	        'li',
	        { value: props.item, onClick: props.onClick, className: "sidebarListItem " + classNames },
	        _react2.default.createElement(
	            'ul',
	            { className: 'sidebarListItem-names' },
	            _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                    'label',
	                    { className: 'latinName' },
	                    props.latinName
	                )
	            ),
	            _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                    'label',
	                    { className: 'commonName' },
	                    props.commonName
	                )
	            )
	        )
	    );
	}

	exports.default = SearchSidebar;

/***/ },

/***/ 195:
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

	var CheckBoxer = function (_React$Component) {
	    _inherits(CheckBoxer, _React$Component);

	    function CheckBoxer() {
	        _classCallCheck(this, CheckBoxer);

	        return _possibleConstructorReturn(this, (CheckBoxer.__proto__ || Object.getPrototypeOf(CheckBoxer)).apply(this, arguments));
	    }

	    _createClass(CheckBoxer, [{
	        key: 'toggleCheckbox',
	        value: function toggleCheckbox(e) {
	            var curr = this.props.isChecked;
	            this.props.handler(!curr);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: 'checkBox' },
	                _react2.default.createElement('input', { type: 'checkbox',
	                    key: this.props.key,
	                    value: this.props.value,
	                    onChange: function onChange() {
	                        return _this2.toggleCheckbox();
	                    },
	                    checked: this.props.isChecked
	                }),
	                _react2.default.createElement(
	                    'label',
	                    null,
	                    this.props.title
	                )
	            );
	        }
	    }]);

	    return CheckBoxer;
	}(_react2.default.Component);

	exports.default = CheckBoxer;

/***/ }

});