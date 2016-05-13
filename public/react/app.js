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
                            { to: '/react/contacts' },
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
                        { className: 'btn-primary', to: '/react/contacts/new' },
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
                null,
                _react2.default.createElement(
                    _reactRouter.Link,
                    { className: 'contact-item', to: '/react/contacts/' + c.id },
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
                identity: '',
                name: '',
                email: ''
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

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).call(this));

        _this7.state = {
            contact: {
                identity: '',
                name: '',
                email: ''
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZWFjdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxHOzs7Ozs7Ozs7OztpQ0FDTztBQUNMLG1CQUNJO0FBQUE7Z0JBQUE7Z0JBQ0k7QUFBQTtvQkFBQTtvQkFDSTtBQUFBO3dCQUFBO3dCQUFJO0FBQUE7NEJBQUEsRUFBTSxJQUFHLGlCQUFUOzRCQUFBO0FBQUE7QUFBSjtBQURKLGlCQURKO2dCQUlLLEtBQUssS0FBTCxDQUFXO0FBSmhCLGFBREo7QUFRSDs7OztFQVZhLGdCQUFNLFM7O0lBYWxCLFc7OztBQUNGLDJCQUFjO0FBQUE7O0FBQUE7O0FBRVYsZUFBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVTtBQURELFNBQWI7QUFGVTtBQUtiOzs7OzZDQUVvQjtBQUNqQixpQkFBSyxjQUFMO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixHQUFwQixDQUF3QixVQUFDLE9BQUQsRUFBYTtBQUM3Qyx1QkFBUSw4QkFBQyxlQUFELElBQWlCLEtBQUssUUFBUSxFQUE5QixFQUFrQyxTQUFTLE9BQTNDLEdBQVI7QUFDSCxhQUZXLENBQVo7QUFHQSxtQkFDSTtBQUFBO2dCQUFBO2dCQUNJO0FBQUE7b0JBQUEsRUFBSyxXQUFVLFNBQWY7b0JBQ0k7QUFBQTt3QkFBQSxFQUFNLFdBQVUsYUFBaEIsRUFBOEIsSUFBRyxxQkFBakM7d0JBQUE7QUFBQTtBQURKLGlCQURKO2dCQUlJO0FBQUE7b0JBQUEsRUFBSSxXQUFVLGNBQWQ7b0JBQ0s7QUFETDtBQUpKLGFBREo7QUFVSDs7O3lDQUVnQjtBQUFBOztBQUNiLDZCQUFPLElBQVAsQ0FBWTtBQUNSLHdCQUFRLEtBREE7QUFFUixxQkFBSyxlQUZHO0FBR1Is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QTNCLEVBQXNDLEVBQXRDLENBQWhCO0FBQ0EsNkJBQU8sSUFBUCxDQUFZO0FBQ1Isd0JBQVEsS0FEQTtBQUVSLHFCQUFLLG1CQUFpQixTQUZkO0FBR1IseUJBQVMsaUJBQUMsT0FBRCxFQUFhO0FBQ2xCLDJCQUFLLFFBQUwsQ0FBYyxFQUFFLGdCQUFGLEVBQWQ7QUFDSDtBQUxPLGFBQVo7QUFPSDs7OztFQXpFaUIsZ0JBQU0sUzs7QUE0RTVCLHNCQUFPLFlBQVc7QUFDZix1QkFBUyxNQUFULENBQ0s7QUFBQTtRQUFBLEVBQVEsb0NBQVI7UUFDSTtBQUFBO1lBQUEsRUFBTyxNQUFLLFNBQVosRUFBc0IsV0FBVyxHQUFqQztZQUNJLDREQUFlLElBQUcsaUJBQWxCLEdBREo7WUFFSTtBQUFBO2dCQUFBLEVBQU8sTUFBSyxpQkFBWjtnQkFDSSx5REFBWSxXQUFXLFdBQXZCLEdBREo7Z0JBRUksb0RBQU8sTUFBSyxxQkFBWixFQUFrQyxXQUFXLGNBQTdDLEdBRko7Z0JBR0ksb0RBQU8sTUFBSyw0QkFBWixFQUF5QyxXQUFXLE9BQXBEO0FBSEo7QUFGSjtBQURKLEtBREwsRUFXSSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FYSjtBQVlGLENBYkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSwgSW5kZXhSZWRpcmVjdCwgSW5kZXhSb3V0ZSwgTGluaywgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IGpRdWVyeSBmcm9tICdqcXVlcnknO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxoMT48TGluayB0bz1cIi9yZWFjdC9jb250YWN0c1wiPlJlYWN0IENvbnRhY3RzPC9MaW5rPjwvaDE+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250YWN0czogW11cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLl9mZXRjaENvbnRhY3RzKCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5zdGF0ZS5jb250YWN0cy5tYXAoKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoPENvbnRhY3RMaXN0SXRlbSBrZXk9e2NvbnRhY3QuaWR9IGNvbnRhY3Q9e2NvbnRhY3R9IC8+KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIHRvPVwiL3JlYWN0L2NvbnRhY3RzL25ld1wiPk5ldyBDb250YWN0PC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb250YWN0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9mZXRjaENvbnRhY3RzKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cycsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdHMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQ29udGFjdExpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5wcm9wcy5jb250YWN0O1xuICAgICAgICByZXR1cm4gKDxsaT5cbiAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cImNvbnRhY3QtaXRlbVwiIHRvPXtgL3JlYWN0L2NvbnRhY3RzLyR7Yy5pZH1gfT5cbiAgICAgICAgICAgICAgICB7Yy5pZGVudGl0eX0gLSB7Yy5uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJlbWFpbFwiPntjLmVtYWlsfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9saT4pO1xuICAgIH1cbn1cblxuY2xhc3MgTmV3Q29udGFjdEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29udGFjdDoge1xuICAgICAgICAgICAgICAgIGlkZW50aXR5OiAnJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImNvbnRhY3QtZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxoMj5OZXcgQ29udGFjdDwvaDI+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPklkZW50aXR5OiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJJZGVudGl0eVwiIG5hbWU9XCJpZGVudGl0eVwiIHZhbHVlPXtjLmlkZW50aXR5fSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5OYW1lOiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJOYW1lXCIgbmFtZT1cIm5hbWVcIiB2YWx1ZT17Yy5uYW1lfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5FbWFpbDogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiRW1haWxcIiBuYW1lPVwiZW1haWxcIiB2YWx1ZT17Yy5lbWFpbH0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuX2FkZC5iaW5kKHRoaXMpfT5BZGQgQ29udGFjdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZUNoYW5nZShldnQpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIGNbZXZ0LnRhcmdldC5uYW1lXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0OiBjIH0pO1xuICAgIH1cbiAgICBcbiAgICBfYWRkKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5jb250YWN0KSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvcmVhY3QvY29udGFjdHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZW1haWw6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2hDb250YWN0KCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250YWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDI+e2MuaWRlbnRpdHl9IC0ge2MubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5JZGVudGl0eTogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiSWRlbnRpdHlcIiBuYW1lPVwiaWRlbnRpdHlcIiB2YWx1ZT17Yy5pZGVudGl0eX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+TmFtZTogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiTmFtZVwiIG5hbWU9XCJuYW1lXCIgdmFsdWU9e2MubmFtZX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+RW1haWw6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdmFsdWU9e2MuZW1haWx9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLl91cGRhdGUuYmluZCh0aGlzKX0+VXBkYXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuLWRhbmdlclwiICBvbkNsaWNrPXt0aGlzLl9kZWxldGUuYmluZCh0aGlzKX0+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBfaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuc3RhdGUuY29udGFjdDtcbiAgICAgICAgY1tldnQudGFyZ2V0Lm5hbWVdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3Q6IGMgfSk7XG4gICAgfVxuICAgIFxuICAgIF91cGRhdGUoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmNvbnRhY3QpLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvcmVhY3QvY29udGFjdHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIF9kZWxldGUoKSB7XG4gICAgICAgIHZhciBjb250YWN0SWQgPSBwYXJzZUludCh0aGlzLnByb3BzLnBhcmFtcy5jb250YWN0SWQsIDEwKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvY29udGFjdHMvJytjb250YWN0SWQsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL3JlYWN0L2NvbnRhY3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfZmV0Y2hDb250YWN0KCkge1xuICAgICAgICB2YXIgY29udGFjdElkID0gcGFyc2VJbnQodGhpcy5wcm9wcy5wYXJhbXMuY29udGFjdElkLCAxMCk7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzLycrY29udGFjdElkLFxuICAgICAgICAgICAgc3VjY2VzczogKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5qUXVlcnkoZnVuY3Rpb24oKSB7XG4gICBSZWFjdERPTS5yZW5kZXIoKFxuICAgICAgICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3JlYWN0L1wiIGNvbXBvbmVudD17QXBwfT5cbiAgICAgICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cIi9yZWFjdC9jb250YWN0c1wiIC8+XG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVhY3QvY29udGFjdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtDb250YWN0TGlzdH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVhY3QvY29udGFjdHMvbmV3XCIgY29tcG9uZW50PXtOZXdDb250YWN0Rm9ybX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVhY3QvY29udGFjdHMvOmNvbnRhY3RJZFwiIGNvbXBvbmVudD17Q29udGFjdH0gLz5cbiAgICAgICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgPC9Sb3V0ZXI+XG4gICAgKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsgXG59KTsiXX0=
