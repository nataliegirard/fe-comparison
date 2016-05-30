(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'header',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '/react/contacts' },
                            'React Contacts'
                        )
                    )
                ),
                this.props.children
            );
        }
    }]);

    return App;
}(_react2.default.Component);

var ContactList = function (_React$Component2) {
    _inherits(ContactList, _React$Component2);

    function ContactList() {
        _classCallCheck(this, ContactList);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactList).call(this));

        _this3.state = {
            contacts: [], //This shouldn't be in state
            orderBy: 'identity',
            orderDesc: false,
            searchText: ''
        };
        return _this3;
    }

    _createClass(ContactList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._fetchContacts();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _this = this;
            var items = [];

            var contacts = this.state.contacts.sort(function (a, b) {
                var keyA = a[_this.state.orderBy];
                var keyB = b[_this.state.orderBy];
                if (keyA == keyB) return 0;

                if (_this.state.orderDesc) {
                    return keyA > keyB ? -1 : 1;
                }
                return keyA > keyB ? 1 : -1;
            });

            contacts.forEach(function (contact) {
                if (contact.identity.toLowerCase().indexOf(_this4.state.searchText) === -1 && contact.name.toLowerCase().indexOf(_this4.state.searchText) === -1) {
                    return;
                }
                items.push(_react2.default.createElement(ContactListItem, { key: contact.id, contact: contact, orderBy: _this4.state.orderBy }));
            });

            var identityClasses = 'identity',
                nameClasses = 'name',
                identityCaretDown = 'caret-down hide',
                identityCaretUp = 'caret-up hide',
                nameCaretDown = 'caret-down hide',
                nameCaretUp = 'caret-up hide';

            if (this.state.orderBy == 'identity') {
                identityClasses += ' bold';
                if (this.state.orderDesc) {
                    identityCaretUp = 'caret-up';
                } else {
                    identityCaretDown = 'caret-down';
                }
            }

            if (this.state.orderBy == 'name') {
                nameClasses += ' bold';
                if (this.state.orderDesc) {
                    nameCaretUp = 'caret-up';
                } else {
                    nameCaretDown = 'caret-down';
                }
            }

            //refactor so that the actions and contact list are in different components
            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'actions' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'btn-primary', to: '/react/contacts/new' },
                        'New Contact'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'search-box' },
                        _react2.default.createElement('input', { type: 'text', value: this.state.searchText, ref: 'searchTextInput', onChange: this._handleSearch.bind(this), className: 'search-input', placeholder: 'Search' }),
                        _react2.default.createElement(
                            'button',
                            { className: 'search-btn', type: 'button' },
                            _react2.default.createElement('span', { className: 'search-icon' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'table',
                    { className: 'contact-list' },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                            'tr',
                            { className: 'contact-heading' },
                            _react2.default.createElement(
                                'th',
                                { className: identityClasses, onClick: this._orderByIdentity.bind(this) },
                                'Identity',
                                _react2.default.createElement('span', { className: identityCaretDown }),
                                _react2.default.createElement('span', { className: identityCaretUp })
                            ),
                            _react2.default.createElement(
                                'th',
                                { className: nameClasses, onClick: this._orderByName.bind(this) },
                                'Name',
                                _react2.default.createElement('span', { className: nameCaretDown }),
                                _react2.default.createElement('span', { className: nameCaretUp })
                            ),
                            _react2.default.createElement(
                                'th',
                                { className: 'email' },
                                'Email'
                            )
                        ),
                        items
                    )
                )
            );
        }
    }, {
        key: '_fetchContacts',
        value: function _fetchContacts() {
            var _this5 = this;

            _jquery2.default.ajax({
                method: 'GET',
                url: '/api/contacts',
                success: function success(contacts) {
                    _this5.setState({ contacts: contacts });
                }
            });
        }
    }, {
        key: '_orderByIdentity',
        value: function _orderByIdentity() {
            if (this.state.orderBy == 'identity') {
                this.setState({ orderDesc: !this.state.orderDesc });
            } else {
                this.setState({
                    orderBy: 'identity',
                    orderDesc: false
                });
            }
        }
    }, {
        key: '_orderByName',
        value: function _orderByName() {
            if (this.state.orderBy == 'name') {
                this.setState({ orderDesc: !this.state.orderDesc });
            } else {
                this.setState({
                    orderBy: 'name',
                    orderDesc: false
                });
            }
        }
    }, {
        key: '_handleSearch',
        value: function _handleSearch() {
            this.setState({
                searchText: this.refs.searchTextInput.value
            });
        }
    }]);

    return ContactList;
}(_react2.default.Component);

var ContactListItem = function (_React$Component3) {
    _inherits(ContactListItem, _React$Component3);

    function ContactListItem() {
        _classCallCheck(this, ContactListItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactListItem).apply(this, arguments));
    }

    _createClass(ContactListItem, [{
        key: 'render',
        value: function render() {
            var c = this.props.contact;
            var identityClasses = "identity",
                nameClasses = "name";

            if (this.props.orderBy == 'identity') {
                identityClasses += ' bold';
            }

            if (this.props.orderBy == 'name') {
                nameClasses += ' bold';
            }

            return _react2.default.createElement(
                'tr',
                { className: 'contact-item', 'data-id': c.id, onClick: this._showContact.bind(this) },
                _react2.default.createElement(
                    'td',
                    { className: identityClasses },
                    c.identity
                ),
                _react2.default.createElement(
                    'td',
                    { className: nameClasses },
                    c.name
                ),
                _react2.default.createElement(
                    'td',
                    { className: 'email' },
                    c.email
                )
            );
        }
    }, {
        key: '_showContact',
        value: function _showContact(evt) {
            var el = null;
            if (evt.target.tagName == 'TD') {
                el = evt.target.parentNode;
            } else {
                el = evt.target;
            }

            var id = el.getAttribute('data-id');
            _reactRouter.browserHistory.push('/react/contacts/' + id);
        }
    }]);

    return ContactListItem;
}(_react2.default.Component);

var NewContactForm = function (_React$Component4) {
    _inherits(NewContactForm, _React$Component4);

    function NewContactForm() {
        _classCallCheck(this, NewContactForm);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(NewContactForm).call(this));

        _this7.state = {
            contact: {
                identity: '',
                name: '',
                email: ''
            }
        };
        return _this7;
    }

    _createClass(NewContactForm, [{
        key: 'render',
        value: function render() {
            var c = this.state.contact;
            return _react2.default.createElement(
                'section',
                { className: 'contact-form' },
                _react2.default.createElement(
                    'h2',
                    null,
                    'New Contact'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Identity: '
                    ),
                    ' ',
                    _react2.default.createElement('input', { placeholder: 'Identity', name: 'identity', value: c.identity, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Name: '
                    ),
                    ' ',
                    _react2.default.createElement('input', { placeholder: 'Name', name: 'name', value: c.name, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Email: '
                    ),
                    ' ',
                    _react2.default.createElement('input', { placeholder: 'Email', name: 'email', value: c.email, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'button',
                        { className: 'btn-primary', onClick: this._add.bind(this) },
                        'Add Contact'
                    )
                )
            );
        }
    }, {
        key: '_handleChange',
        value: function _handleChange(evt) {
            var c = this.state.contact;
            c[evt.target.name] = evt.target.value;
            this.setState({ contact: c });
        }
    }, {
        key: '_add',
        value: function _add() {
            var _this8 = this;

            _jquery2.default.ajax({
                method: 'POST',
                url: '/api/contacts',
                data: JSON.stringify(this.state.contact),
                dataType: 'json',
                contentType: 'application/json',
                success: function success(contact) {
                    _this8.setState({ contact: contact });
                    _reactRouter.browserHistory.push('/react/contacts');
                }
            });
        }
    }]);

    return NewContactForm;
}(_react2.default.Component);

var Contact = function (_React$Component5) {
    _inherits(Contact, _React$Component5);

    function Contact() {
        _classCallCheck(this, Contact);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).call(this));

        _this9.state = {
            contact: {
                identity: '',
                name: '',
                email: ''
            }
        };
        return _this9;
    }

    _createClass(Contact, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._fetchContact();
        }
    }, {
        key: 'render',
        value: function render() {
            var c = this.state.contact;
            return _react2.default.createElement(
                'section',
                { className: 'contact-form' },
                _react2.default.createElement(
                    'h2',
                    null,
                    c.identity,
                    ' - ',
                    c.name
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Identity: '
                    ),
                    ' ',
                    _react2.default.createElement('input', { placeholder: 'Identity', name: 'identity', value: c.identity, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Name: '
                    ),
                    ' ',
                    _react2.default.createElement('input', { placeholder: 'Name', name: 'name', value: c.name, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Email: '
                    ),
                    ' ',
                    _react2.default.createElement('input', { placeholder: 'Email', name: 'email', value: c.email, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'button',
                        { className: 'btn-primary', onClick: this._update.bind(this) },
                        'Update'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn-danger', onClick: this._delete.bind(this) },
                        'Delete'
                    )
                )
            );
        }
    }, {
        key: '_handleChange',
        value: function _handleChange(evt) {
            var c = this.state.contact;
            c[evt.target.name] = evt.target.value;
            this.setState({ contact: c });
        }
    }, {
        key: '_update',
        value: function _update() {
            var _this10 = this;

            var contactId = parseInt(this.props.params.contactId, 10);
            _jquery2.default.ajax({
                method: 'PUT',
                url: '/api/contacts/' + contactId,
                data: JSON.stringify(this.state.contact),
                dataType: 'json',
                contentType: 'application/json',
                success: function success(contact) {
                    _this10.setState({ contact: contact });
                    _reactRouter.browserHistory.push('/react/contacts');
                }
            });
        }
    }, {
        key: '_delete',
        value: function _delete() {
            var contactId = parseInt(this.props.params.contactId, 10);
            _jquery2.default.ajax({
                method: 'DELETE',
                url: '/api/contacts/' + contactId,
                success: function success() {
                    _reactRouter.browserHistory.push('/react/contacts');
                }
            });
        }
    }, {
        key: '_fetchContact',
        value: function _fetchContact() {
            var _this11 = this;

            var contactId = parseInt(this.props.params.contactId, 10);
            _jquery2.default.ajax({
                method: 'GET',
                url: '/api/contacts/' + contactId,
                success: function success(contact) {
                    _this11.setState({ contact: contact });
                }
            });
        }
    }]);

    return Contact;
}(_react2.default.Component);

(0, _jquery2.default)(function () {
    _reactDom2.default.render(_react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/react/', component: App },
            _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/react/contacts' }),
            _react2.default.createElement(
                _reactRouter.Route,
                { path: '/react/contacts' },
                _react2.default.createElement(_reactRouter.IndexRoute, { component: ContactList }),
                _react2.default.createElement(_reactRouter.Route, { path: '/react/contacts/new', component: NewContactForm }),
                _react2.default.createElement(_reactRouter.Route, { path: '/react/contacts/:contactId', component: Contact })
            )
        )
    ), document.getElementById('app'));
});

},{"jquery":"jquery","react":"react","react-dom":"react-dom","react-router":"react-router"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZWFjdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxHOzs7Ozs7Ozs7OztpQ0FDTztBQUNMLG1CQUNJO0FBQUE7Z0JBQUE7Z0JBQ0k7QUFBQTtvQkFBQTtvQkFDSTtBQUFBO3dCQUFBO3dCQUFJO0FBQUE7NEJBQUEsRUFBRyxNQUFLLGlCQUFSOzRCQUFBO0FBQUE7QUFBSjtBQURKLGlCQURKO2dCQUlLLEtBQUssS0FBTCxDQUFXO0FBSmhCLGFBREo7QUFRSDs7OztFQVZhLGdCQUFNLFM7O0lBYWxCLFc7OztBQUNGLDJCQUFjO0FBQUE7O0FBQUE7O0FBRVYsZUFBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVSxFQURELEU7QUFFVCxxQkFBUyxVQUZBO0FBR1QsdUJBQVcsS0FIRjtBQUlULHdCQUFZO0FBSkgsU0FBYjtBQUZVO0FBUWI7Ozs7NkNBRW9CO0FBQ2pCLGlCQUFLLGNBQUw7QUFDSDs7O2lDQUVRO0FBQUE7O0FBQ0wsZ0JBQUksUUFBUSxJQUFaO0FBQ0EsZ0JBQUksUUFBUSxFQUFaOztBQUVBLGdCQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixJQUFwQixDQUF5QixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWM7QUFDbEQsb0JBQUksT0FBTyxFQUFFLE1BQU0sS0FBTixDQUFZLE9BQWQsQ0FBWDtBQUNBLG9CQUFJLE9BQU8sRUFBRSxNQUFNLEtBQU4sQ0FBWSxPQUFkLENBQVg7QUFDQSxvQkFBSSxRQUFRLElBQVosRUFBa0IsT0FBTyxDQUFQOztBQUVsQixvQkFBSSxNQUFNLEtBQU4sQ0FBWSxTQUFoQixFQUEyQjtBQUN2QiwyQkFBUSxPQUFPLElBQVAsR0FBYyxDQUFDLENBQWYsR0FBbUIsQ0FBM0I7QUFDSDtBQUNELHVC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LHlCQUFTLG1CQUFNO0FBQ1gsZ0RBQWUsSUFBZixDQUFvQixpQkFBcEI7QUFDSDtBQUxPLGFBQVo7QUFPSDs7O3dDQUVlO0FBQUE7O0FBQ1osZ0JBQUksWUFBWSxTQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsU0FBM0IsRUFBc0MsRUFBdEMsQ0FBaEI7QUFDQSw2QkFBTyxJQUFQLENBQVk7QUFDUix3QkFBUSxLQURBO0FBRVIscUJBQUssbUJBQWlCLFNBRmQ7QUFHUix5QkFBUyxpQkFBQyxPQUFELEVBQWE7QUFDbEIsNEJBQUssUUFBTCxDQUFjLEVBQUUsZ0JBQUYsRUFBZDtBQUNIO0FBTE8sYUFBWjtBQU9IOzs7O0VBekVpQixnQkFBTSxTOztBQTRFNUIsc0JBQU8sWUFBVztBQUNmLHVCQUFTLE1BQVQsQ0FDSztBQUFBO1FBQUEsRUFBUSxvQ0FBUjtRQUNJO0FBQUE7WUFBQSxFQUFPLE1BQUssU0FBWixFQUFzQixXQUFXLEdBQWpDO1lBQ0ksNERBQWUsSUFBRyxpQkFBbEIsR0FESjtZQUVJO0FBQUE7Z0JBQUEsRUFBTyxNQUFLLGlCQUFaO2dCQUNJLHlEQUFZLFdBQVcsV0FBdkIsR0FESjtnQkFFSSxvREFBTyxNQUFLLHFCQUFaLEVBQWtDLFdBQVcsY0FBN0MsR0FGSjtnQkFHSSxvREFBTyxNQUFLLDRCQUFaLEVBQXlDLFdBQVcsT0FBcEQ7QUFISjtBQUZKO0FBREosS0FETCxFQVdJLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQVhKO0FBWUYsQ0FiRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBJbmRleFJlZGlyZWN0LCBJbmRleFJvdXRlLCBMaW5rLCBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgalF1ZXJ5IGZyb20gJ2pxdWVyeSc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIvcmVhY3QvY29udGFjdHNcIj5SZWFjdCBDb250YWN0czwvYT48L2gxPlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQ29udGFjdExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29udGFjdHM6IFtdLCAvL1RoaXMgc2hvdWxkbid0IGJlIGluIHN0YXRlXG4gICAgICAgICAgICBvcmRlckJ5OiAnaWRlbnRpdHknLFxuICAgICAgICAgICAgb3JkZXJEZXNjOiBmYWxzZSxcbiAgICAgICAgICAgIHNlYXJjaFRleHQ6ICcnXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2hDb250YWN0cygpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNvbnRhY3RzID0gdGhpcy5zdGF0ZS5jb250YWN0cy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICAgICAgdmFyIGtleUEgPSBhW190aGlzLnN0YXRlLm9yZGVyQnldO1xuICAgICAgICAgICAgdmFyIGtleUIgPSBiW190aGlzLnN0YXRlLm9yZGVyQnldO1xuICAgICAgICAgICAgaWYgKGtleUEgPT0ga2V5QikgcmV0dXJuIDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChfdGhpcy5zdGF0ZS5vcmRlckRlc2MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGtleUEgPiBrZXlCID8gLTEgOiAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoa2V5QSA+IGtleUIgPyAxIDogLTEpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnRhY3RzLmZvckVhY2goKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjb250YWN0LmlkZW50aXR5LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnN0YXRlLnNlYXJjaFRleHQpID09PSAtMSAmJiBjb250YWN0Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc3RhdGUuc2VhcmNoVGV4dCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbXMucHVzaCg8Q29udGFjdExpc3RJdGVtIGtleT17Y29udGFjdC5pZH0gY29udGFjdD17Y29udGFjdH0gb3JkZXJCeT17dGhpcy5zdGF0ZS5vcmRlckJ5fSAvPik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIGlkZW50aXR5Q2xhc3Nlcz0naWRlbnRpdHknLFxuICAgICAgICAgICAgbmFtZUNsYXNzZXM9J25hbWUnLFxuICAgICAgICAgICAgaWRlbnRpdHlDYXJldERvd249J2NhcmV0LWRvd24gaGlkZScsXG4gICAgICAgICAgICBpZGVudGl0eUNhcmV0VXA9J2NhcmV0LXVwIGhpZGUnLFxuICAgICAgICAgICAgbmFtZUNhcmV0RG93bj0nY2FyZXQtZG93biBoaWRlJyxcbiAgICAgICAgICAgIG5hbWVDYXJldFVwPSdjYXJldC11cCBoaWRlJztcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcmRlckJ5ID09ICdpZGVudGl0eScpIHtcbiAgICAgICAgICAgIGlkZW50aXR5Q2xhc3NlcyArPSAnIGJvbGQnO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUub3JkZXJEZXNjKSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpdHlDYXJldFVwID0gJ2NhcmV0LXVwJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpdHlDYXJldERvd24gPSAnY2FyZXQtZG93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLm9yZGVyQnkgPT0gJ25hbWUnKSB7XG4gICAgICAgICAgICBuYW1lQ2xhc3NlcyArPSAnIGJvbGQnO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUub3JkZXJEZXNjKSB7XG4gICAgICAgICAgICAgICAgbmFtZUNhcmV0VXAgPSAnY2FyZXQtdXAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lQ2FyZXREb3duID0gJ2NhcmV0LWRvd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3JlZmFjdG9yIHNvIHRoYXQgdGhlIGFjdGlvbnMgYW5kIGNvbnRhY3QgbGlzdCBhcmUgaW4gZGlmZmVyZW50IGNvbXBvbmVudHNcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCIgdG89XCIvcmVhY3QvY29udGFjdHMvbmV3XCI+TmV3IENvbnRhY3Q8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoVGV4dH0gcmVmPVwic2VhcmNoVGV4dElucHV0XCIgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZVNlYXJjaC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNlYXJjaC1idG5cIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3NOYW1lPVwic2VhcmNoLWljb25cIj48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJjb250YWN0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImNvbnRhY3QtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e2lkZW50aXR5Q2xhc3Nlc30gb25DbGljaz17dGhpcy5fb3JkZXJCeUlkZW50aXR5LmJpbmQodGhpcyl9PklkZW50aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWRlbnRpdHlDYXJldERvd259Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpZGVudGl0eUNhcmV0VXB9Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e25hbWVDbGFzc2VzfSBvbkNsaWNrPXt0aGlzLl9vcmRlckJ5TmFtZS5iaW5kKHRoaXMpfT5OYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17bmFtZUNhcmV0RG93bn0+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e25hbWVDYXJldFVwfT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiZW1haWxcIj5FbWFpbDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9mZXRjaENvbnRhY3RzKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cycsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdHMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfb3JkZXJCeUlkZW50aXR5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcmRlckJ5ID09ICdpZGVudGl0eScpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29yZGVyRGVzYzogIXRoaXMuc3RhdGUub3JkZXJEZXNjfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiAnaWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIG9yZGVyRGVzYzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIF9vcmRlckJ5TmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUub3JkZXJCeSA9PSAnbmFtZScpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29yZGVyRGVzYzogIXRoaXMuc3RhdGUub3JkZXJEZXNjfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgb3JkZXJEZXNjOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZVNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hUZXh0OiB0aGlzLnJlZnMuc2VhcmNoVGV4dElucHV0LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQ29udGFjdExpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5wcm9wcy5jb250YWN0O1xuICAgICAgICB2YXIgaWRlbnRpdHlDbGFzc2VzID0gXCJpZGVudGl0eVwiLFxuICAgICAgICAgICAgbmFtZUNsYXNzZXMgPSBcIm5hbWVcIjtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vcmRlckJ5ID09ICdpZGVudGl0eScpIHtcbiAgICAgICAgICAgIGlkZW50aXR5Q2xhc3NlcyArPSAnIGJvbGQnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vcmRlckJ5ID09ICduYW1lJykge1xuICAgICAgICAgICAgbmFtZUNsYXNzZXMgKz0gJyBib2xkJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJjb250YWN0LWl0ZW1cIiBkYXRhLWlkPXtjLmlkfSBvbkNsaWNrPXt0aGlzLl9zaG93Q29udGFjdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXtpZGVudGl0eUNsYXNzZXN9PntjLmlkZW50aXR5fTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17bmFtZUNsYXNzZXN9PntjLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZW1haWxcIj57Yy5lbWFpbH08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgX3Nob3dDb250YWN0KGV2dCkge1xuICAgICAgICB2YXIgZWwgPSBudWxsO1xuICAgICAgICBpZiAoZXZ0LnRhcmdldC50YWdOYW1lID09ICdURCcpIHtcbiAgICAgICAgICAgIGVsID0gZXZ0LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwgPSBldnQudGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL3JlYWN0L2NvbnRhY3RzLycraWQpO1xuICAgIH1cbn1cblxuY2xhc3MgTmV3Q29udGFjdEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29udGFjdDoge1xuICAgICAgICAgICAgICAgIGlkZW50aXR5OiAnJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImNvbnRhY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxoMj5OZXcgQ29udGFjdDwvaDI+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPklkZW50aXR5OiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJJZGVudGl0eVwiIG5hbWU9XCJpZGVudGl0eVwiIHZhbHVlPXtjLmlkZW50aXR5fSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5OYW1lOiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJOYW1lXCIgbmFtZT1cIm5hbWVcIiB2YWx1ZT17Yy5uYW1lfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5FbWFpbDogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBuYW1lPVwiZW1haWxcIiB2YWx1ZT17Yy5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuX2FkZC5iaW5kKHRoaXMpfT5BZGQgQ29udGFjdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZUNoYW5nZShldnQpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIGNbZXZ0LnRhcmdldC5uYW1lXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0OiBjIH0pO1xuICAgIH1cbiAgICBcbiAgICBfYWRkKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5jb250YWN0KSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvcmVhY3QvY29udGFjdHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZW1haWw6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2hDb250YWN0KCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250YWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDI+e2MuaWRlbnRpdHl9IC0ge2MubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5JZGVudGl0eTogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiSWRlbnRpdHlcIiBuYW1lPVwiaWRlbnRpdHlcIiB2YWx1ZT17Yy5pZGVudGl0eX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+TmFtZTogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiTmFtZVwiIG5hbWU9XCJuYW1lXCIgdmFsdWU9e2MubmFtZX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+RW1haWw6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdmFsdWU9e2MuZW1haWx9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLl91cGRhdGUuYmluZCh0aGlzKX0+VXBkYXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuLWRhbmdlclwiICBvbkNsaWNrPXt0aGlzLl9kZWxldGUuYmluZCh0aGlzKX0+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBfaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgY1tldnQudGFyZ2V0Lm5hbWVdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3Q6IGMgfSk7XG4gICAgfVxuICAgIFxuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmNvbnRhY3QpLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvcmVhY3QvY29udGFjdHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIF9kZWxldGUoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL3JlYWN0L2NvbnRhY3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfZmV0Y2hDb250YWN0KCkge1xuICAgICAgICB2YXIgY29udGFjdElkID0gcGFyc2VJbnQodGhpcy5wcm9wcy5wYXJhbXMuY29udGFjdElkLCAxMCk7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzLycrY29udGFjdElkLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5qUXVlcnkoZnVuY3Rpb24oKSB7XG4gICBSZWFjdERPTS5yZW5kZXIoKFxuICAgICAgICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3JlYWN0L1wiIGNvbXBvbmVudD17QXBwfT5cbiAgICAgICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cIi9yZWFjdC9jb250YWN0c1wiIC8+XG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVhY3QvY29udGFjdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtDb250YWN0TGlzdH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVhY3QvY29udGFjdHMvbmV3XCIgY29tcG9uZW50PXtOZXdDb250YWN0Rm9ybX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVhY3QvY29udGFjdHMvOmNvbnRhY3RJZFwiIGNvbXBvbmVudD17Q29udGFjdH0gLz5cbiAgICAgICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgPC9Sb3V0ZXI+XG4gICAgKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsgXG59KTsiXX0=
