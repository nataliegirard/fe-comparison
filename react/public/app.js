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
                    { 'class': 'actions' },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/contacts/new' },
                        'New Contact'
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    null,
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
                null,
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/contacts/' + c.id },
                    c.identity,
                    ' - ',
                    c.name,
                    ' ',
                    _react2.default.createElement(
                        'span',
                        null,
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
                null,
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
                    _react2.default.createElement('input', { name: 'identity', value: c.identity, onChange: this._handleChange.bind(this) })
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
                    _react2.default.createElement('input', { name: 'name', value: c.name, onChange: this._handleChange.bind(this) })
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
                    _react2.default.createElement('input', { name: 'email', value: c.email, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'button',
                        { onClick: this._add.bind(this) },
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
                null,
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
                    _react2.default.createElement('input', { name: 'identity', value: c.identity, onChange: this._handleChange.bind(this) })
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
                    _react2.default.createElement('input', { name: 'name', value: c.name, onChange: this._handleChange.bind(this) })
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
                    _react2.default.createElement('input', { name: 'email', value: c.email, onChange: this._handleChange.bind(this) })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'button',
                        { onClick: this._update.bind(this) },
                        'Update'
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this._delete.bind(this) },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sRzs7Ozs7Ozs7Ozs7aUNBQ087QUFDTCxtQkFDSTtBQUFBO2dCQUFBO2dCQUNJO0FBQUE7b0JBQUE7b0JBQ0k7QUFBQTt3QkFBQTt3QkFBSTtBQUFBOzRCQUFBLEVBQU0sSUFBRyxXQUFUOzRCQUFBO0FBQUE7QUFBSjtBQURKLGlCQURKO2dCQUlLLEtBQUssS0FBTCxDQUFXO0FBSmhCLGFBREo7QUFRSDs7OztFQVZhLGdCQUFNLFM7O0lBYWxCLFc7OztBQUNGLDJCQUFjO0FBQUE7O0FBQUE7O0FBRVYsZUFBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVTtBQURELFNBQWI7QUFGVTtBQUtiOzs7OzZDQUVvQjtBQUNqQixpQkFBSyxjQUFMO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixHQUFwQixDQUF3QixVQUFDLE9BQUQsRUFBYTtBQUM3Qyx1QkFBUSw4QkFBQyxlQUFELElBQWlCLEtBQUssUUFBUSxFQUE5QixFQUFrQyxTQUFTLE9BQTNDLEdBQVI7QUFDSCxhQUZXLENBQVo7QUFHQSxtQkFDSTtBQUFBO2dCQUFBO2dCQUNJO0FBQUE7b0JBQUEsRUFBSyxTQUFNLFNBQVg7b0JBQ0k7QUFBQTt3QkFBQSxFQUFNLElBQUcsZUFBVDt3QkFBQTtBQUFBO0FBREosaUJBREo7Z0JBSUk7QUFBQTtvQkFBQTtvQkFDSztBQURMO0FBSkosYUFESjtBQVVIOzs7eUNBRWdCO0FBQUE7O0FBQ2IsNkJBQU8sSUFBUCxDQUFZO0FBQ1Isd0JBQVEsS0FEQTtBQUVSLHFCQUFLLGVBRkc7QUFHUix5QkFBUyxpQkFBQyxRQUFELEVBQWM7QUFDbkIsMkJBQUssUUFB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QUFLLFdBQVo7Z0JBQ0kseURBQVksV0FBVyxXQUF2QixHQURKO2dCQUVJLG9EQUFPLE1BQUssZUFBWixFQUE0QixXQUFXLGNBQXZDLEdBRko7Z0JBR0ksb0RBQU8sTUFBSyxzQkFBWixFQUFtQyxXQUFXLE9BQTlDO0FBSEo7QUFGSjtBQURKLEtBREwsRUFXSSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FYSjtBQVlGLENBYkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSwgSW5kZXhSZWRpcmVjdCwgSW5kZXhSb3V0ZSwgTGluaywgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IGpRdWVyeSBmcm9tICdqcXVlcnknO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxoMT48TGluayB0bz1cIi9jb250YWN0c1wiPlJlYWN0IENvbnRhY3RzPC9MaW5rPjwvaDE+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250YWN0czogW11cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLl9mZXRjaENvbnRhY3RzKCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5zdGF0ZS5jb250YWN0cy5tYXAoKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoPENvbnRhY3RMaXN0SXRlbSBrZXk9e2NvbnRhY3QuaWR9IGNvbnRhY3Q9e2NvbnRhY3R9IC8+KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2NvbnRhY3RzL25ld1wiPk5ldyBDb250YWN0PC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9mZXRjaENvbnRhY3RzKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cycsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdHMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQ29udGFjdExpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5wcm9wcy5jb250YWN0O1xuICAgICAgICByZXR1cm4gKDxsaT5cbiAgICAgICAgICAgIDxMaW5rIHRvPXtgL2NvbnRhY3RzLyR7Yy5pZH1gfT5cbiAgICAgICAgICAgICAgICB7Yy5pZGVudGl0eX0gLSB7Yy5uYW1lfSA8c3Bhbj57Yy5lbWFpbH08L3NwYW4+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+KTtcbiAgICB9XG59XG5cbmNsYXNzIE5ld0NvbnRhY3RGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTogbnVsbCxcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aDI+TmV3IENvbnRhY3Q8L2gyPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5JZGVudGl0eTogPC9sYWJlbD4gPGlucHV0IG5hbWU9XCJpZGVudGl0eVwiIHZhbHVlPXtjLmlkZW50aXR5fSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5OYW1lOiA8L2xhYmVsPiA8aW5wdXQgbmFtZT1cIm5hbWVcIiB2YWx1ZT17Yy5uYW1lfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5FbWFpbDogPC9sYWJlbD4gPGlucHV0IG5hbWU9XCJlbWFpbFwiIHZhbHVlPXtjLmVtYWlsfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2FkZC5iaW5kKHRoaXMpfT5BZGQgQ29udGFjdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZUNoYW5nZShldnQpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIGNbZXZ0LnRhcmdldC5uYW1lXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0OiBjIH0pO1xuICAgIH1cbiAgICBcbiAgICBfYWRkKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5jb250YWN0KSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvY29udGFjdHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRhY3Q6IHt9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2hDb250YWN0KCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aDI+e2MuaWRlbnRpdHl9IC0ge2MubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5JZGVudGl0eTogPC9sYWJlbD4gPGlucHV0IG5hbWU9XCJpZGVudGl0eVwiIHZhbHVlPXtjLmlkZW50aXR5fSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5OYW1lOiA8L2xhYmVsPiA8aW5wdXQgbmFtZT1cIm5hbWVcIiB2YWx1ZT17Yy5uYW1lfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5FbWFpbDogPC9sYWJlbD4gPGlucHV0IG5hbWU9XCJlbWFpbFwiIHZhbHVlPXtjLmVtYWlsfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpfT5VcGRhdGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLl9kZWxldGUuYmluZCh0aGlzKX0+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBfaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgY1tldnQudGFyZ2V0Lm5hbWVdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3Q6IGMgfSk7XG4gICAgfVxuICAgIFxuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmNvbnRhY3QpLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIF9kZWxldGUoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL2NvbnRhY3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfZmV0Y2hDb250YWN0KCkge1xuICAgICAgICB2YXIgY29udGFjdElkID0gcGFyc2VJbnQodGhpcy5wcm9wcy5wYXJhbXMuY29udGFjdElkLCAxMCk7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzLycrY29udGFjdElkLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5qUXVlcnkoZnVuY3Rpb24oKSB7XG4gICBSZWFjdERPTS5yZW5kZXIoKFxuICAgICAgICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cbiAgICAgICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cIi9jb250YWN0c1wiIC8+XG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvY29udGFjdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtDb250YWN0TGlzdH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvY29udGFjdHMvbmV3XCIgY29tcG9uZW50PXtOZXdDb250YWN0Rm9ybX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvY29udGFjdHMvOmNvbnRhY3RJZFwiIGNvbXBvbmVudD17Q29udGFjdH0gLz5cbiAgICAgICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgPC9Sb3V0ZXI+XG4gICAgKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsgXG59KTsiXX0=
