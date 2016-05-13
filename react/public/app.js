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
                            _reactRouter.Link,
                            { to: '/contacts' },
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

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactList).call(this));

        _this2.state = {
            contacts: []
        };
        return _this2;
    }

    _createClass(ContactList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._fetchContacts();
        }
    }, {
        key: 'render',
        value: function render() {
            var items = this.state.contacts.map(function (contact) {
                return _react2.default.createElement(ContactListItem, { key: contact.id, contact: contact });
            });
            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'actions' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { className: 'btn-primary', to: '/contacts/new' },
                        'New Contact'
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'contact-list' },
                    items
                )
            );
        }
    }, {
        key: '_fetchContacts',
        value: function _fetchContacts() {
            var _this3 = this;

            _jquery2.default.ajax({
                method: 'GET',
                url: '/api/contacts',
                success: function success(contacts) {
                    _this3.setState({ contacts: contacts });
                }
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
            return _react2.default.createElement(
                'li',
                { className: 'contact-item' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/contacts/' + c.id },
                    c.identity,
                    ' - ',
                    c.name,
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'email' },
                        c.email
                    )
                )
            );
        }
    }]);

    return ContactListItem;
}(_react2.default.Component);

var NewContactForm = function (_React$Component4) {
    _inherits(NewContactForm, _React$Component4);

    function NewContactForm() {
        _classCallCheck(this, NewContactForm);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(NewContactForm).call(this));

        _this5.state = {
            contact: {
                identity: null,
                name: null,
                email: null
            }
        };
        return _this5;
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
            var _this6 = this;

            _jquery2.default.ajax({
                method: 'POST',
                url: '/api/contacts',
                data: JSON.stringify(this.state.contact),
                dataType: 'json',
                contentType: 'application/json',
                success: function success(contact) {
                    _this6.setState({ contact: contact });
                    _reactRouter.browserHistory.push('/contacts');
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

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).call(this));

        _this7.state = {
            contact: {}
        };
        return _this7;
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
            var _this8 = this;

            var contactId = parseInt(this.props.params.contactId, 10);
            _jquery2.default.ajax({
                method: 'PUT',
                url: '/api/contacts/' + contactId,
                data: JSON.stringify(this.state.contact),
                dataType: 'json',
                contentType: 'application/json',
                success: function success(contact) {
                    _this8.setState({ contact: contact });
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
                    _reactRouter.browserHistory.push('/contacts');
                }
            });
        }
    }, {
        key: '_fetchContact',
        value: function _fetchContact() {
            var _this9 = this;

            var contactId = parseInt(this.props.params.contactId, 10);
            _jquery2.default.ajax({
                method: 'GET',
                url: '/api/contacts/' + contactId,
                success: function success(contact) {
                    _this9.setState({ contact: contact });
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
            { path: '/', component: App },
            _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/contacts' }),
            _react2.default.createElement(
                _reactRouter.Route,
                { path: '/contacts' },
                _react2.default.createElement(_reactRouter.IndexRoute, { component: ContactList }),
                _react2.default.createElement(_reactRouter.Route, { path: '/contacts/new', component: NewContactForm }),
                _react2.default.createElement(_reactRouter.Route, { path: '/contacts/:contactId', component: Contact })
            )
        )
    ), document.getElementById('app'));
});

},{"jquery":"jquery","react":"react","react-dom":"react-dom","react-router":"react-router"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sRzs7Ozs7Ozs7Ozs7aUNBQ087QUFDTCxtQkFDSTtBQUFBO2dCQUFBO2dCQUNJO0FBQUE7b0JBQUE7b0JBQ0k7QUFBQTt3QkFBQTt3QkFBSTtBQUFBOzRCQUFBLEVBQU0sSUFBRyxXQUFUOzRCQUFBO0FBQUE7QUFBSjtBQURKLGlCQURKO2dCQUlLLEtBQUssS0FBTCxDQUFXO0FBSmhCLGFBREo7QUFRSDs7OztFQVZhLGdCQUFNLFM7O0lBYWxCLFc7OztBQUNGLDJCQUFjO0FBQUE7O0FBQUE7O0FBRVYsZUFBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVTtBQURELFNBQWI7QUFGVTtBQUtiOzs7OzZDQUVvQjtBQUNqQixpQkFBSyxjQUFMO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixHQUFwQixDQUF3QixVQUFDLE9BQUQsRUFBYTtBQUM3Qyx1QkFBUSw4QkFBQyxlQUFELElBQWlCLEtBQUssUUFBUSxFQUE5QixFQUFrQyxTQUFTLE9BQTNDLEdBQVI7QUFDSCxhQUZXLENBQVo7QUFHQSxtQkFDSTtBQUFBO2dCQUFBO2dCQUNJO0FBQUE7b0JBQUEsRUFBSyxXQUFVLFNBQWY7b0JBQ0k7QUFBQTt3QkFBQSxFQUFNLFdBQVUsYUFBaEIsRUFBOEIsSUFBRyxlQUFqQzt3QkFBQTtBQUFBO0FBREosaUJBREo7Z0JBSUk7QUFBQTtvQkFBQSxFQUFJLFdBQVUsY0FBZDtvQkFDSztBQURMO0FBSkosYUFESjtBQVVIOzs7eUNBRWdCO0FBQUE7O0FBQ2IsNkJBQU8sSUFBUCxDQUFZO0FBQ1Isd0JBQVEsS0FEQTtBQUVSLHFCQUFLLGVBRkc7QUFHUix5QkFB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Uix5QkFBUyxpQkFBQyxPQUFELEVBQWE7QUFDbEIsMkJBQUssUUFBTCxDQUFjLEVBQUUsZ0JBQUYsRUFBZDtBQUNIO0FBTE8sYUFBWjtBQU9IOzs7O0VBcEVpQixnQkFBTSxTOztBQXVFNUIsc0JBQU8sWUFBVztBQUNmLHVCQUFTLE1BQVQsQ0FDSztBQUFBO1FBQUEsRUFBUSxvQ0FBUjtRQUNJO0FBQUE7WUFBQSxFQUFPLE1BQUssR0FBWixFQUFnQixXQUFXLEdBQTNCO1lBQ0ksNERBQWUsSUFBRyxXQUFsQixHQURKO1lBRUk7QUFBQTtnQkFBQSxFQUFPLE1BQUssV0FBWjtnQkFDSSx5REFBWSxXQUFXLFdBQXZCLEdBREo7Z0JBRUksb0RBQU8sTUFBSyxlQUFaLEVBQTRCLFdBQVcsY0FBdkMsR0FGSjtnQkFHSSxvREFBTyxNQUFLLHNCQUFaLEVBQW1DLFdBQVcsT0FBOUM7QUFISjtBQUZKO0FBREosS0FETCxFQVdJLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQVhKO0FBWUYsQ0FiRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBJbmRleFJlZGlyZWN0LCBJbmRleFJvdXRlLCBMaW5rLCBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgalF1ZXJ5IGZyb20gJ2pxdWVyeSc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPjxMaW5rIHRvPVwiL2NvbnRhY3RzXCI+UmVhY3QgQ29udGFjdHM8L0xpbms+PC9oMT5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIENvbnRhY3RMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRhY3RzOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoQ29udGFjdHMoKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLnN0YXRlLmNvbnRhY3RzLm1hcCgoY29udGFjdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICg8Q29udGFjdExpc3RJdGVtIGtleT17Y29udGFjdC5pZH0gY29udGFjdD17Y29udGFjdH0gLz4pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCIgdG89XCIvY29udGFjdHMvbmV3XCI+TmV3IENvbnRhY3Q8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNvbnRhY3QtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICB7aXRlbXN9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgX2ZldGNoQ29udGFjdHMoKSB7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChjb250YWN0cykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0cyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0TGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnByb3BzLmNvbnRhY3Q7XG4gICAgICAgIHJldHVybiAoPGxpIGNsYXNzTmFtZT1cImNvbnRhY3QtaXRlbVwiPlxuICAgICAgICAgICAgPExpbmsgdG89e2AvY29udGFjdHMvJHtjLmlkfWB9PlxuICAgICAgICAgICAgICAgIHtjLmlkZW50aXR5fSAtIHtjLm5hbWV9IDxzcGFuIGNsYXNzTmFtZT1cImVtYWlsXCI+e2MuZW1haWx9PC9zcGFuPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2xpPik7XG4gICAgfVxufVxuXG5jbGFzcyBOZXdDb250YWN0Rm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250YWN0OiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpdHk6IG51bGwsXG4gICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBlbWFpbDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5zdGF0ZS5jb250YWN0O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiY29udGFjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgPGgyPk5ldyBDb250YWN0PC9oMj5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+SWRlbnRpdHk6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIklkZW50aXR5XCIgbmFtZT1cImlkZW50aXR5XCIgdmFsdWU9e2MuaWRlbnRpdHl9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPk5hbWU6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIk5hbWVcIiBuYW1lPVwibmFtZVwiIHZhbHVlPXtjLm5hbWV9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPkVtYWlsOiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHZhbHVlPXtjLmVtYWlsfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5fYWRkLmJpbmQodGhpcyl9PkFkZCBDb250YWN0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBfaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgY1tldnQudGFyZ2V0Lm5hbWVdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3Q6IGMgfSk7XG4gICAgfVxuICAgIFxuICAgIF9hZGQoKSB7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cycsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmNvbnRhY3QpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0IH0pO1xuICAgICAgICAgICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9jb250YWN0cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIENvbnRhY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29udGFjdDoge31cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLl9mZXRjaENvbnRhY3QoKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImNvbnRhY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxoMj57Yy5pZGVudGl0eX0gLSB7Yy5uYW1lfTwvaDI+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPklkZW50aXR5OiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJJZGVudGl0eVwiIG5hbWU9XCJpZGVudGl0eVwiIHZhbHVlPXtjLmlkZW50aXR5fSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5OYW1lOiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJOYW1lXCIgbmFtZT1cIm5hbWVcIiB2YWx1ZT17Yy5uYW1lfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5FbWFpbDogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBuYW1lPVwiZW1haWxcIiB2YWx1ZT17Yy5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpfT5VcGRhdGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tZGFuZ2VyXCIgIG9uQ2xpY2s9e3RoaXMuX2RlbGV0ZS5iaW5kKHRoaXMpfT5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9oYW5kbGVDaGFuZ2UoZXZ0KSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5zdGF0ZS5jb250YWN0O1xuICAgICAgICBjW2V2dC50YXJnZXQubmFtZV0gPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdDogYyB9KTtcbiAgICB9XG4gICAgXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgdmFyIGNvbnRhY3RJZCA9IHBhcnNlSW50KHRoaXMucHJvcHMucGFyYW1zLmNvbnRhY3RJZCwgMTApO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cy8nK2NvbnRhY3RJZCxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuY29udGFjdCksXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgX2RlbGV0ZSgpIHtcbiAgICAgICAgdmFyIGNvbnRhY3RJZCA9IHBhcnNlSW50KHRoaXMucHJvcHMucGFyYW1zLmNvbnRhY3RJZCwgMTApO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cy8nK2NvbnRhY3RJZCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvY29udGFjdHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIF9mZXRjaENvbnRhY3QoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmpRdWVyeShmdW5jdGlvbigpIHtcbiAgIFJlYWN0RE9NLnJlbmRlcigoXG4gICAgICAgIDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxuICAgICAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiL2NvbnRhY3RzXCIgLz5cbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9jb250YWN0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0NvbnRhY3RMaXN0fSAvPlxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9jb250YWN0cy9uZXdcIiBjb21wb25lbnQ9e05ld0NvbnRhY3RGb3JtfSAvPlxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9jb250YWN0cy86Y29udGFjdElkXCIgY29tcG9uZW50PXtDb250YWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICA8L1JvdXRlcj5cbiAgICApLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyBcbn0pOyJdfQ==
