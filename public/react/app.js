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
            contacts: [],
            orderBy: 'identity',
            orderDesc: false
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
            var contacts = this.state.contacts.sort(function (a, b) {
                var keyA = a[_this.state.orderBy];
                var keyB = b[_this.state.orderBy];
                if (keyA == keyB) return 0;

                if (_this.state.orderDesc) {
                    return keyA > keyB ? -1 : 1;
                }
                return keyA > keyB ? 1 : -1;
            });

            var items = contacts.map(function (contact) {
                return _react2.default.createElement(ContactListItem, { key: contact.id, contact: contact, orderBy: _this4.state.orderBy });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZWFjdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxHOzs7Ozs7Ozs7OztpQ0FDTztBQUNMLG1CQUNJO0FBQUE7Z0JBQUE7Z0JBQ0k7QUFBQTtvQkFBQTtvQkFDSTtBQUFBO3dCQUFBO3dCQUFJO0FBQUE7NEJBQUEsRUFBRyxNQUFLLGlCQUFSOzRCQUFBO0FBQUE7QUFBSjtBQURKLGlCQURKO2dCQUlLLEtBQUssS0FBTCxDQUFXO0FBSmhCLGFBREo7QUFRSDs7OztFQVZhLGdCQUFNLFM7O0lBYWxCLFc7OztBQUNGLDJCQUFjO0FBQUE7O0FBQUE7O0FBRVYsZUFBSyxLQUFMLEdBQWE7QUFDVCxzQkFBVSxFQUREO0FBRVQscUJBQVMsVUFGQTtBQUdULHVCQUFXO0FBSEYsU0FBYjtBQUZVO0FBT2I7Ozs7NkNBRW9CO0FBQ2pCLGlCQUFLLGNBQUw7QUFDSDs7O2lDQUVRO0FBQUE7O0FBQ0wsZ0JBQUksUUFBUSxJQUFaO0FBQ0EsZ0JBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLElBQXBCLENBQXlCLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYztBQUNsRCxvQkFBSSxPQUFPLEVBQUUsTUFBTSxLQUFOLENBQVksT0FBZCxDQUFYO0FBQ0Esb0JBQUksT0FBTyxFQUFFLE1BQU0sS0FBTixDQUFZLE9BQWQsQ0FBWDtBQUNBLG9CQUFJLFFBQVEsSUFBWixFQUFrQixPQUFPLENBQVA7O0FBRWxCLG9CQUFJLE1BQU0sS0FBTixDQUFZLFNBQWhCLEVBQTJCO0FBQ3ZCLDJCQUFRLE9BQU8sSUFBUCxHQUFjLENBQUMsQ0FBZixHQUFtQixDQUEzQjtBQUNIO0FBQ0QsdUJBQVEsT0FBTyxJQUFQLEdBQWMsQ0FBZCxHQUFrQixDQUFDLENBQTNC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QUhKO0FBRko7QUFESixLQURMLEVBV0ksU0FBUyxjQUFULENBQXdCLEtBQXhCLENBWEo7QUFZRixDQWJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIEluZGV4UmVkaXJlY3QsIEluZGV4Um91dGUsIExpbmssIGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBqUXVlcnkgZnJvbSAnanF1ZXJ5JztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8aDE+PGEgaHJlZj1cIi9yZWFjdC9jb250YWN0c1wiPlJlYWN0IENvbnRhY3RzPC9hPjwvaDE+XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWN0TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250YWN0czogW10sXG4gICAgICAgICAgICBvcmRlckJ5OiAnaWRlbnRpdHknLFxuICAgICAgICAgICAgb3JkZXJEZXNjOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoQ29udGFjdHMoKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY29udGFjdHMgPSB0aGlzLnN0YXRlLmNvbnRhY3RzLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgICAgICB2YXIga2V5QSA9IGFbX3RoaXMuc3RhdGUub3JkZXJCeV07XG4gICAgICAgICAgICB2YXIga2V5QiA9IGJbX3RoaXMuc3RhdGUub3JkZXJCeV07XG4gICAgICAgICAgICBpZiAoa2V5QSA9PSBrZXlCKSByZXR1cm4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKF90aGlzLnN0YXRlLm9yZGVyRGVzYykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoa2V5QSA+IGtleUIgPyAtMSA6IDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChrZXlBID4ga2V5QiA/IDEgOiAtMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIGl0ZW1zID0gY29udGFjdHMubWFwKChjb250YWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKDxDb250YWN0TGlzdEl0ZW0ga2V5PXtjb250YWN0LmlkfSBjb250YWN0PXtjb250YWN0fSBvcmRlckJ5PXt0aGlzLnN0YXRlLm9yZGVyQnl9IC8+KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgaWRlbnRpdHlDbGFzc2VzPSdpZGVudGl0eScsXG4gICAgICAgICAgICBuYW1lQ2xhc3Nlcz0nbmFtZScsXG4gICAgICAgICAgICBpZGVudGl0eUNhcmV0RG93bj0nY2FyZXQtZG93biBoaWRlJyxcbiAgICAgICAgICAgIGlkZW50aXR5Q2FyZXRVcD0nY2FyZXQtdXAgaGlkZScsXG4gICAgICAgICAgICBuYW1lQ2FyZXREb3duPSdjYXJldC1kb3duIGhpZGUnLFxuICAgICAgICAgICAgbmFtZUNhcmV0VXA9J2NhcmV0LXVwIGhpZGUnO1xuICAgICAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLm9yZGVyQnkgPT0gJ2lkZW50aXR5Jykge1xuICAgICAgICAgICAgaWRlbnRpdHlDbGFzc2VzICs9ICcgYm9sZCc7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcmRlckRlc2MpIHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eUNhcmV0VXAgPSAnY2FyZXQtdXAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eUNhcmV0RG93biA9ICdjYXJldC1kb3duJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUub3JkZXJCeSA9PSAnbmFtZScpIHtcbiAgICAgICAgICAgIG5hbWVDbGFzc2VzICs9ICcgYm9sZCc7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcmRlckRlc2MpIHtcbiAgICAgICAgICAgICAgICBuYW1lQ2FyZXRVcCA9ICdjYXJldC11cCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWVDYXJldERvd24gPSAnY2FyZXQtZG93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIHRvPVwiL3JlYWN0L2NvbnRhY3RzL25ld1wiPk5ldyBDb250YWN0PC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJjb250YWN0LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImNvbnRhY3QtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e2lkZW50aXR5Q2xhc3Nlc30gb25DbGljaz17dGhpcy5fb3JkZXJCeUlkZW50aXR5LmJpbmQodGhpcyl9PklkZW50aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWRlbnRpdHlDYXJldERvd259Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpZGVudGl0eUNhcmV0VXB9Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e25hbWVDbGFzc2VzfSBvbkNsaWNrPXt0aGlzLl9vcmRlckJ5TmFtZS5iaW5kKHRoaXMpfT5OYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17bmFtZUNhcmV0RG93bn0+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e25hbWVDYXJldFVwfT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiZW1haWxcIj5FbWFpbDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9mZXRjaENvbnRhY3RzKCkge1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cycsXG4gICAgICAgICAgICBzdWNjZXNzOiAoY29udGFjdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdHMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfb3JkZXJCeUlkZW50aXR5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5vcmRlckJ5ID09ICdpZGVudGl0eScpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29yZGVyRGVzYzogIXRoaXMuc3RhdGUub3JkZXJEZXNjfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiAnaWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIG9yZGVyRGVzYzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIF9vcmRlckJ5TmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUub3JkZXJCeSA9PSAnbmFtZScpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29yZGVyRGVzYzogIXRoaXMuc3RhdGUub3JkZXJEZXNjfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgb3JkZXJEZXNjOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIENvbnRhY3RMaXN0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMucHJvcHMuY29udGFjdDtcbiAgICAgICAgdmFyIGlkZW50aXR5Q2xhc3NlcyA9IFwiaWRlbnRpdHlcIixcbiAgICAgICAgICAgIG5hbWVDbGFzc2VzID0gXCJuYW1lXCI7XG4gICAgICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3JkZXJCeSA9PSAnaWRlbnRpdHknKSB7XG4gICAgICAgICAgICBpZGVudGl0eUNsYXNzZXMgKz0gJyBib2xkJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3JkZXJCeSA9PSAnbmFtZScpIHtcbiAgICAgICAgICAgIG5hbWVDbGFzc2VzICs9ICcgYm9sZCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiY29udGFjdC1pdGVtXCIgZGF0YS1pZD17Yy5pZH0gb25DbGljaz17dGhpcy5fc2hvd0NvbnRhY3QuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17aWRlbnRpdHlDbGFzc2VzfT57Yy5pZGVudGl0eX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e25hbWVDbGFzc2VzfT57Yy5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImVtYWlsXCI+e2MuZW1haWx9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9zaG93Q29udGFjdChldnQpIHtcbiAgICAgICAgdmFyIGVsID0gbnVsbDtcbiAgICAgICAgaWYgKGV2dC50YXJnZXQudGFnTmFtZSA9PSAnVEQnKSB7XG4gICAgICAgICAgICBlbCA9IGV2dC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsID0gZXZ0LnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9yZWFjdC9jb250YWN0cy8nK2lkKTtcbiAgICB9XG59XG5cbmNsYXNzIE5ld0NvbnRhY3RGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZW1haWw6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250YWN0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8aDI+TmV3IENvbnRhY3Q8L2gyPlxuICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5JZGVudGl0eTogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiSWRlbnRpdHlcIiBuYW1lPVwiaWRlbnRpdHlcIiB2YWx1ZT17Yy5pZGVudGl0eX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+TmFtZTogPC9sYWJlbD4gPGlucHV0IHBsYWNlaG9sZGVyPVwiTmFtZVwiIG5hbWU9XCJuYW1lXCIgdmFsdWU9e2MubmFtZX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPjwvcD5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+RW1haWw6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdmFsdWU9e2MuZW1haWx9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLl9hZGQuYmluZCh0aGlzKX0+QWRkIENvbnRhY3Q8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIF9oYW5kbGVDaGFuZ2UoZXZ0KSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5zdGF0ZS5jb250YWN0O1xuICAgICAgICBjW2V2dC50YXJnZXQubmFtZV0gPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29udGFjdDogYyB9KTtcbiAgICB9XG4gICAgXG4gICAgX2FkZCgpIHtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuY29udGFjdCksXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChjb250YWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3QgfSk7XG4gICAgICAgICAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL3JlYWN0L2NvbnRhY3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQ29udGFjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250YWN0OiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpdHk6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoQ29udGFjdCgpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5zdGF0ZS5jb250YWN0O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiY29udGFjdC1mb3JtXCI+XG4gICAgICAgICAgICAgICAgPGgyPntjLmlkZW50aXR5fSAtIHtjLm5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8cD48bGFiZWw+SWRlbnRpdHk6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIklkZW50aXR5XCIgbmFtZT1cImlkZW50aXR5XCIgdmFsdWU9e2MuaWRlbnRpdHl9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPk5hbWU6IDwvbGFiZWw+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIk5hbWVcIiBuYW1lPVwibmFtZVwiIHZhbHVlPXtjLm5hbWV9IG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gLz48L3A+XG4gICAgICAgICAgICAgICAgPHA+PGxhYmVsPkVtYWlsOiA8L2xhYmVsPiA8aW5wdXQgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHZhbHVlPXtjLmVtYWlsfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+PC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5fdXBkYXRlLmJpbmQodGhpcyl9PlVwZGF0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1kYW5nZXJcIiAgb25DbGljaz17dGhpcy5fZGVsZXRlLmJpbmQodGhpcyl9PkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgX2hhbmRsZUNoYW5nZShldnQpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLnN0YXRlLmNvbnRhY3Q7XG4gICAgICAgIGNbZXZ0LnRhcmdldC5uYW1lXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWN0OiBjIH0pO1xuICAgIH1cbiAgICBcbiAgICBfdXBkYXRlKCkge1xuICAgICAgICB2YXIgY29udGFjdElkID0gcGFyc2VJbnQodGhpcy5wcm9wcy5wYXJhbXMuY29udGFjdElkLCAxMCk7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzLycrY29udGFjdElkLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5jb250YWN0KSxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChjb250YWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3QgfSk7XG4gICAgICAgICAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL3JlYWN0L2NvbnRhY3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfZGVsZXRlKCkge1xuICAgICAgICB2YXIgY29udGFjdElkID0gcGFyc2VJbnQodGhpcy5wcm9wcy5wYXJhbXMuY29udGFjdElkLCAxMCk7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RzLycrY29udGFjdElkLFxuICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9yZWFjdC9jb250YWN0cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgX2ZldGNoQ29udGFjdCgpIHtcbiAgICAgICAgdmFyIGNvbnRhY3RJZCA9IHBhcnNlSW50KHRoaXMucHJvcHMucGFyYW1zLmNvbnRhY3RJZCwgMTApO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0cy8nK2NvbnRhY3RJZCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChjb250YWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhY3QgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxualF1ZXJ5KGZ1bmN0aW9uKCkge1xuICAgUmVhY3RET00ucmVuZGVyKChcbiAgICAgICAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9yZWFjdC9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCIvcmVhY3QvY29udGFjdHNcIiAvPlxuICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3JlYWN0L2NvbnRhY3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17Q29udGFjdExpc3R9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3JlYWN0L2NvbnRhY3RzL25ld1wiIGNvbXBvbmVudD17TmV3Q29udGFjdEZvcm19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3JlYWN0L2NvbnRhY3RzLzpjb250YWN0SWRcIiBjb21wb25lbnQ9e0NvbnRhY3R9IC8+XG4gICAgICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgIDwvUm91dGVyPlxuICAgICksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IFxufSk7Il19
