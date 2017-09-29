webpackJsonp([8],{

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

	var _BasicNavbar = __webpack_require__(185);

	var _BasicNavbar2 = _interopRequireDefault(_BasicNavbar);

	var _home = __webpack_require__(190);

	var _home2 = _interopRequireDefault(_home);

	var _about = __webpack_require__(191);

	var _about2 = _interopRequireDefault(_about);

	var _contact = __webpack_require__(192);

	var _contact2 = _interopRequireDefault(_contact);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	            selectedPage: pg || "home"
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var selectedPage = this.state.selectedPage;

	            switch (selectedPage) {
	                case 'contact':
	                    var page = _react2.default.createElement(_contact2.default, null);
	                    break;
	                case 'about':
	                    var page = _react2.default.createElement(_about2.default, null);
	                    break;
	                default:
	                    var page = _react2.default.createElement(_home2.default, null);
	            }

	            return _react2.default.createElement(
	                'div',
	                { className: 'mainContainer' },
	                _react2.default.createElement(_BasicNavbar2.default, null),
	                page
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

/***/ 185:
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

	var BasicNavbar = function (_React$Component) {
	    _inherits(BasicNavbar, _React$Component);

	    function BasicNavbar() {
	        _classCallCheck(this, BasicNavbar);

	        return _possibleConstructorReturn(this, (BasicNavbar.__proto__ || Object.getPrototypeOf(BasicNavbar)).apply(this, arguments));
	    }

	    _createClass(BasicNavbar, [{
	        key: 'func',
	        value: function func() {
	            this.props.handler('search');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'basicNavbar' },
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'treelib' },
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
	                        'li',
	                        { className: 'home' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/' },
	                            'HOME'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'search' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/search' },
	                            'SEARCH'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'about' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/about' },
	                            'ABOUT'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'contact' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/contact' },
	                            'CONTACT'
	                        )
	                    )
	                ),
	                _react2.default.createElement('div', { className: 'navBorder first' }),
	                _react2.default.createElement('div', { className: 'navBorder second' }),
	                _react2.default.createElement('div', { className: 'navBorder third' })
	            );
	        }
	    }]);

	    return BasicNavbar;
	}(_react2.default.Component);

	exports.default = BasicNavbar;

/***/ },

/***/ 190:
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

	var Home = function (_React$Component) {
	    _inherits(Home, _React$Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'homePage' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'banner' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'innerBanner' },
	                        _react2.default.createElement('span', { className: 'helper' }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'wrapper' },
	                            'A collection of high-quality tree photographs for educators, students and lay persons.',
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'searchButton' },
	                                _react2.default.createElement(
	                                    'a',
	                                    { href: '/search' },
	                                    'start searching'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'section' },
	                    _react2.default.createElement(
	                        'p',
	                        null,
	                        'A ',
	                        _react2.default.createElement(
	                            'i',
	                            null,
	                            'tree library'
	                        ),
	                        ' for students, professors, laymen, artists, naturalists \u2013 anyone studying trees or who just appreciates their beauty.  Need more pictures for a dendrology class, or to make your own collection, or to add background to a new website? ',
	                        _react2.default.createElement(
	                            'b',
	                            null,
	                            'TreeLib'
	                        ),
	                        ' is yours all in one spot.'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'photoBanner' },
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=gymnocladus_dioicus' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/1.jpg' })
	                            ),
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=liquidambar_formosana' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/9.jpg' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=nyssa_sylvatica' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/6.jpg' })
	                            ),
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=populus_tremuloides' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/5.jpg' })
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'banner' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'innerBanner' },
	                        _react2.default.createElement('span', { className: 'helper' }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'wrapper' },
	                            'Trees are our silent partners, sensing us as we move about, providing shelter, offering us beauty, and nurturing and protecting the earth.'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'section' },
	                    _react2.default.createElement(
	                        'p',
	                        null,
	                        'Help yourself to the site, at home or in the field, to enhance your learning and understanding of the trees around you. It is not the final resource for every aspect of identification, but rather a tool to be used to visually complement many other good sources of information.  Visitors are encouraged to connect to other excellent sources of technical information such as the Northern Ontario Plant Database, Wikipedia and so on.'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'photoBanner' },
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=tsuga_heterophylla' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/4.jpg' })
	                            ),
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=cercis_canadensis' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/2.jpg' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=acer_platanoides' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/7.jpg' })
	                            ),
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search?species=albizia_julibrissin' },
	                                _react2.default.createElement('img', { src: 'images/homepage-banner/8.jpg' })
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'p',
	                        null,
	                        _react2.default.createElement(
	                            'u',
	                            null,
	                            _react2.default.createElement(
	                                'b',
	                                null,
	                                'TreeLib'
	                            ),
	                            ' is for educational purposes'
	                        ),
	                        ' to complement many excellent sources of technical information on trees. Copying them and using them for commercial purposes is not permitted without specific written permission from the author.'
	                    )
	                )
	            );
	        }
	    }]);

	    return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },

/***/ 191:
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

	var About = function (_React$Component) {
	    _inherits(About, _React$Component);

	    function About() {
	        _classCallCheck(this, About);

	        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
	    }

	    _createClass(About, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'aboutPage' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'tableOfContents' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'tocTitle' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            _react2.default.createElement(
	                                'u',
	                                null,
	                                'Contents'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        _react2.default.createElement(
	                            'li',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#aboutPhotos' },
	                                'About the Photos'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'li',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#speciesConfirm' },
	                                'Species Confirmation'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'li',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#bio' },
	                                'Who we are'
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'content' },
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'sectionTitle' },
	                            'About the site'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'With a library of over 260 tree species, ',
	                            _react2.default.createElement(
	                                'b',
	                                null,
	                                'TreeLib'
	                            ),
	                            ' is a new digital resource for studying trees in the Northern Hemisphere. The collection is organized at a Family, Genus or Species level with quick access to jump back a forth to get a sense of the bigger picture.'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'Please don\'t hesitate to ',
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/contact' },
	                                'contact'
	                            ),
	                            ' us with any questions and head over to the ',
	                            _react2.default.createElement(
	                                'a',
	                                { href: '/search' },
	                                'search'
	                            ),
	                            ' page to get started!'
	                        )
	                    ),
	                    _react2.default.createElement('hr', null),
	                    _react2.default.createElement(
	                        'div',
	                        { id: 'speciesHier' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'sectionTitle' },
	                            'Species Hierarchy'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'All species are arranged by Taxonomic Hierarchy, beginning with Family, which is further divided into Genus and finally into Species.'
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'taxonomy' },
	                            _react2.default.createElement(
	                                'ul',
	                                null,
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'b',
	                                        null,
	                                        'Family'
	                                    ),
	                                    ' \u2192 ex.: Pinaceae (Pine)',
	                                    _react2.default.createElement(
	                                        'ul',
	                                        null,
	                                        _react2.default.createElement(
	                                            'li',
	                                            null,
	                                            _react2.default.createElement(
	                                                'b',
	                                                null,
	                                                'Genus'
	                                            ),
	                                            ' \u2192 ex.: Picea (spruce)',
	                                            _react2.default.createElement(
	                                                'ul',
	                                                null,
	                                                _react2.default.createElement(
	                                                    'li',
	                                                    null,
	                                                    _react2.default.createElement(
	                                                        'b',
	                                                        null,
	                                                        'Species'
	                                                    ),
	                                                    ' \u2192 ex.: Picea sitchensis (Sitka spruce)'
	                                                )
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'Search names are presented in Latin and English, and either can be turned on or off in the menu to improve usability.'
	                        )
	                    ),
	                    _react2.default.createElement('hr', null),
	                    _react2.default.createElement(
	                        'div',
	                        { id: 'aboutPhotos' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'sectionTitle' },
	                            'About the photos'
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'subsectionTitle' },
	                                'Where the photos are hosted'
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                'The photos are hosted on ',
	                                _react2.default.createElement(
	                                    'b',
	                                    null,
	                                    _react2.default.createElement(
	                                        'a',
	                                        { href: 'https://www.flickr.com/photos/145057586@N05' },
	                                        'Flickr'
	                                    )
	                                ),
	                                '. If you\'d prefer, you can view the full collection on Flickr (arranged starting by family) here:'
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'centered' },
	                                _react2.default.createElement(
	                                    'a',
	                                    { className: 'flickrLink', href: 'https://www.flickr.com/photos/145057586@N05/collections' },
	                                    'Click for TreeLib Flickr Collection'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                'We encourage you to use this site, but if you\'re looking for the original high-quality photos or want to download an entire species in one go then head over to Flickr. ',
	                                _react2.default.createElement(
	                                    'u',
	                                    null,
	                                    'Each photo "album" on TreeLib\'s Flickr page is a contained species'
	                                ),
	                                '.'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'subsectionTitle' },
	                                'How the photos were taken'
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                'All but a handful of the photos have been taken by the author in botanical gardens, larger private collections, university arboretums, private  gardens, natural forests across Western North America and in Japan.'
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                'Photos were taken with a Canon 70D camera [INSERT LINK HERE], using 40mm, 17mm x 85mm and 18mm x 55mm lenses. The 70D is equipped with Canon\u2019s new high resolution CMOS 70D sensor which allows raising film speed to up to 2000 or more without noticeable graininess.'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement('hr', null),
	                    _react2.default.createElement(
	                        'div',
	                        { id: 'speciesConfirm' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'sectionTitle' },
	                            'Species confirmation'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'The purpose of this site is more to give a flavour of the varieties of each species than to provide an authoritative catalogue of them.  For detailed lists of most of the varieties of each species, I have found that searching species names on Wikipedia provides the best information.'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'Preference has been, in most cases, to support confirmation of many species and varieties at major sites like Riverview Hospital Lands, Vandusen Botanical Garden, Washington University Arboretum and other botanical gardens all over the Western North America, as far back as Manitoba and North Dakota, supplementing with pictures from many other locations.'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            'Cross-referencing of Latin names and usages has also been done from many of these sites, from web sites and from numerous good tree apps and books on tree identification; there are some differences in nomenclature between the U.S., Canada, Japan and Europe.  Regarding common English names, they are often quite varied and are best outlined on sites such as Wikipedia and other plant sites.'
	                        )
	                    ),
	                    _react2.default.createElement('hr', null),
	                    _react2.default.createElement(
	                        'div',
	                        { id: 'bio' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'sectionTitle' },
	                            'Who we are'
	                        ),
	                        _react2.default.createElement(
	                            'table',
	                            null,
	                            _react2.default.createElement(
	                                'tbody',
	                                null,
	                                _react2.default.createElement(
	                                    'tr',
	                                    null,
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        _react2.default.createElement('img', { className: 'photo', src: 'images/blake.jpg' })
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        _react2.default.createElement(
	                                            'ul',
	                                            { className: 'description' },
	                                            _react2.default.createElement(
	                                                'li',
	                                                { className: 'title' },
	                                                _react2.default.createElement(
	                                                    'label',
	                                                    { className: 'name' },
	                                                    'Blake Willson'
	                                                ),
	                                                _react2.default.createElement(
	                                                    'i',
	                                                    null,
	                                                    ' - R.P.F. - Dendrologist and Photographer'
	                                                )
	                                            ),
	                                            _react2.default.createElement(
	                                                'li',
	                                                { className: 'content' },
	                                                _react2.default.createElement(
	                                                    'p',
	                                                    null,
	                                                    'Blake is an industry manager, botanist and photographer with over 25 years in the forestry industry, specifically with government and industry between Canada and Japan.'
	                                                ),
	                                                _react2.default.createElement(
	                                                    'p',
	                                                    null,
	                                                    'He is a member of the International Dendrology Society (a UK-based global group of professors and scientists dedicated to the study and teaching about woody plants).'
	                                                )
	                                            )
	                                        )
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'tr',
	                                    null,
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        _react2.default.createElement('img', { className: 'photo', src: 'images/nathan.jpg' })
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        _react2.default.createElement(
	                                            'ul',
	                                            { className: 'description' },
	                                            _react2.default.createElement(
	                                                'li',
	                                                { className: 'title' },
	                                                _react2.default.createElement(
	                                                    'label',
	                                                    { className: 'name' },
	                                                    'Nathan Willson'
	                                                ),
	                                                _react2.default.createElement(
	                                                    'i',
	                                                    null,
	                                                    ' - Development'
	                                                )
	                                            ),
	                                            _react2.default.createElement(
	                                                'li',
	                                                { className: 'nathan content' },
	                                                _react2.default.createElement(
	                                                    'p',
	                                                    null,
	                                                    _react2.default.createElement(
	                                                        'a',
	                                                        { href: 'http://nathanwillson.com/' },
	                                                        'Nathan'
	                                                    ),
	                                                    ' is a web developer based out of Victoria, Canada.'
	                                                ),
	                                                _react2.default.createElement(
	                                                    'a',
	                                                    { className: 'github', href: 'https://github.com/nbw', target: '_blank' },
	                                                    _react2.default.createElement('img', { src: '/images/github.png' })
	                                                )
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'footer' },
	                    'This site was a collaboration between Blake and his son Nathan.'
	                )
	            );
	        }
	    }]);

	    return About;
	}(_react2.default.Component);

	exports.default = About;

/***/ },

/***/ 192:
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

	var Contact = function (_React$Component) {
	    _inherits(Contact, _React$Component);

	    function Contact() {
	        _classCallCheck(this, Contact);

	        return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).apply(this, arguments));
	    }

	    _createClass(Contact, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'contactPage' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'section' },
	                    _react2.default.createElement(
	                        'table',
	                        { className: 'content' },
	                        _react2.default.createElement(
	                            'tbody',
	                            null,
	                            _react2.default.createElement(
	                                'tr',
	                                null,
	                                _react2.default.createElement(
	                                    'td',
	                                    null,
	                                    _react2.default.createElement(
	                                        'label',
	                                        null,
	                                        'How you can connect'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'td',
	                                    null,
	                                    _react2.default.createElement(
	                                        'p',
	                                        null,
	                                        'Life is about connecting to other people and finding ways to serve them.'
	                                    ),
	                                    _react2.default.createElement(
	                                        'p',
	                                        null,
	                                        'If you have some knowledge of and enjoy photographing trees, connect with us and contribute photographs of new species, improve our shots with your own, introduce great parks you have hiked around.'
	                                    ),
	                                    _react2.default.createElement(
	                                        'p',
	                                        null,
	                                        'Become a part of a network of friends who love trees and the outdoors, building the site together.  It is as simple as sending us an email.'
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'tr',
	                                null,
	                                _react2.default.createElement(
	                                    'td',
	                                    null,
	                                    _react2.default.createElement(
	                                        'label',
	                                        null,
	                                        'Who to contact'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'td',
	                                    null,
	                                    'Blake'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'tr',
	                                null,
	                                _react2.default.createElement(
	                                    'td',
	                                    null,
	                                    _react2.default.createElement(
	                                        'label',
	                                        null,
	                                        'Reach us at'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'td',
	                                    null,
	                                    _react2.default.createElement('img', { src: 'images/email.png' })
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Contact;
	}(_react2.default.Component);

	exports.default = Contact;

/***/ }

});