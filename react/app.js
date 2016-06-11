import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, IndexRoute, Link, browserHistory } from 'react-router';
import jQuery from 'jquery';

class App extends React.Component {
    render() {
        return (
            <section>
                <header>
                    <h1><a href="/react/contacts">React Contacts</a></h1>
                </header>
                {this.props.children}
            </section>
        );
    }
}

class ContactList extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: [], //This shouldn't be in state
            orderBy: 'identity',
            orderDesc: false,
            searchText: ''
        };
    }
    
    componentWillMount() {
        this._fetchContacts();
    }
    
    render() {
        var _this = this;
        var items = [];
        
        var contacts = this.state.contacts.sort(function(a,b) {
            var keyA = a[_this.state.orderBy];
            var keyB = b[_this.state.orderBy];
            if (keyA == keyB) return 0;
            
            if (_this.state.orderDesc) {
                return (keyA > keyB ? -1 : 1);
            }
            return (keyA > keyB ? 1 : -1);
        });
        
        contacts.forEach((contact) => {
            if (contact.identity.toLowerCase().indexOf(this.state.searchText) === -1 && contact.name.toLowerCase().indexOf(this.state.searchText) === -1) {
                return;
            }
            items.push(<ContactListItem key={contact.id} contact={contact} orderBy={this.state.orderBy} />);
        });
        
        var identityClasses='identity',
            nameClasses='name',
            identityCaretDown='caret-down hide',
            identityCaretUp='caret-up hide',
            nameCaretDown='caret-down hide',
            nameCaretUp='caret-up hide';
            
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
        return(
            <section>
                <div className="actions">
                    <Link className="btn-primary" to="/react/contacts/new">New Contact</Link>
                    <div className="search-box">
                        <input type="text" value={this.state.searchText} ref="searchTextInput" onChange={this._handleSearch.bind(this)} className="search-input" placeholder="Search" />
                        <button className="search-btn" type="button"><span className="search-icon"></span></button>
                    </div>
                </div>
                <table className="contact-list">
                    <tbody>
                        <tr className="contact-heading">
                            <th className={identityClasses} onClick={this._orderByIdentity.bind(this)}>Identity
                                <span className={identityCaretDown}></span>
                                <span className={identityCaretUp}></span>
                            </th>
                            <th className={nameClasses} onClick={this._orderByName.bind(this)}>Name
                                <span className={nameCaretDown}></span>
                                <span className={nameCaretUp}></span>
                            </th>
                            <th className="email">Email</th>
                        </tr>
                        {items}
                    </tbody>
                </table>
            </section>
        );
    }
    
    _fetchContacts() {
        jQuery.ajax({
            method: 'GET',
            url: '/api/contacts',
            success: (contacts) => {
                this.setState({ contacts });
            }
        });
    }
    
    _orderByIdentity() {
        if (this.state.orderBy == 'identity') {
            this.setState({orderDesc: !this.state.orderDesc});
        } else {
            this.setState({
                orderBy: 'identity',
                orderDesc: false
            });
        }
    }
    
    _orderByName() {
        if (this.state.orderBy == 'name') {
            this.setState({orderDesc: !this.state.orderDesc});
        } else {
            this.setState({
                orderBy: 'name',
                orderDesc: false
            });
        }
    }
    
    _handleSearch() {
        this.setState({
            searchText: this.refs.searchTextInput.value
        });
    }
}

class ContactListItem extends React.Component {
    render() {
        var c = this.props.contact;
        var identityClasses = "identity",
            nameClasses = "name";
            
        if (this.props.orderBy == 'identity') {
            identityClasses += ' bold';
        }
        
        if (this.props.orderBy == 'name') {
            nameClasses += ' bold';
        }
        
        return (
            <tr className="contact-item" data-id={c.id} onClick={this._showContact.bind(this)}>
                <td className={identityClasses}>{c.identity}</td>
                <td className={nameClasses}>{c.name}</td>
                <td className="email">{c.email}</td>
            </tr>
        );
    }
    
    _showContact(evt) {
        var el = null;
        if (evt.target.tagName == 'TD') {
            el = evt.target.parentNode;
        } else {
            el = evt.target;
        }
        
        var id = el.getAttribute('data-id');
        browserHistory.push('/react/contacts/'+id);
    }
}

class NewContactForm extends React.Component {
    constructor() {
        super();
        this.state = {
            contact: {
                identity: '',
                name: '',
                email: ''
            }
        };
    }
    
    render() {
        var c = this.state.contact;
        return (
            <section className="contact-form">
                <h2>New Contact</h2>
                <p><label>Identity: </label> <input placeholder="Identity" name="identity" value={c.identity} onChange={this._handleChange.bind(this)} /></p>
                <p><label>Name: </label> <input placeholder="Name" name="name" value={c.name} onChange={this._handleChange.bind(this)} /></p>
                <p><label>Email: </label> <input placeholder="Email" name="email" value={c.email} onChange={this._handleChange.bind(this)} /></p>
                <p>
                    <button className="btn-primary" onClick={this._add.bind(this)}>Add Contact</button>
                </p>
            </section>
        );
    }
    
    _handleChange(evt) {
        var c = this.state.contact;
        c[evt.target.name] = evt.target.value;
        this.setState({ contact: c });
    }
    
    _add() {
        jQuery.ajax({
            method: 'POST',
            url: '/api/contacts',
            data: JSON.stringify(this.state.contact),
            dataType: 'json',
            contentType: 'application/json',
            success: (contact) => {
                this.setState({ contact });
                browserHistory.push('/react/contacts');
            }
        });
    }
}

class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            contact: {
                identity: '',
                name: '',
                email: '',
                imgUrl: 'no-avatar.png'
            }
        };
    }
    
    componentWillMount() {
        this._fetchContact();
    }
    
    render() {
        var c = this.state.contact;
        return (
            <section className="contact-form">
                <img className="contact-img" src={'/img/'+c.imgUrl} />
                <h2>{c.identity} - {c.name}</h2>
                <p><label>Identity: </label> <input placeholder="Identity" name="identity" value={c.identity} onChange={this._handleChange.bind(this)} /></p>
                <p><label>Name: </label> <input placeholder="Name" name="name" value={c.name} onChange={this._handleChange.bind(this)} /></p>
                <p><label>Email: </label> <input placeholder="Email" name="email" value={c.email} onChange={this._handleChange.bind(this)} /></p>
                <p>
                    <button className="btn-primary" onClick={this._update.bind(this)}>Update</button>
                    <button className="btn-danger"  onClick={this._delete.bind(this)}>Delete</button>
                </p>
            </section>
        );
    }
    
    _handleChange(evt) {
        var c = this.state.contact;
        c[evt.target.name] = evt.target.value;
        this.setState({ contact: c });
    }
    
    _update() {
        var contactId = parseInt(this.props.params.contactId, 10);
        jQuery.ajax({
            method: 'PUT',
            url: '/api/contacts/'+contactId,
            data: JSON.stringify(this.state.contact),
            dataType : 'json',
            contentType: 'application/json',
            success: (contact) => {
                this.setState({ contact });
                browserHistory.push('/react/contacts');
            }
        });
    }
    
    _delete() {
        var contactId = parseInt(this.props.params.contactId, 10);
        jQuery.ajax({
            method: 'DELETE',
            url: '/api/contacts/'+contactId,
            success: () => {
                browserHistory.push('/react/contacts');
            }
        });
    }
    
    _fetchContact() {
        var contactId = parseInt(this.props.params.contactId, 10);
        jQuery.ajax({
            method: 'GET',
            url: '/api/contacts/'+contactId,
            success: (contact) => {
                this.setState({ contact });
            }
        });
    }
}

jQuery(function() {
   ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/react/" component={App}>
                <IndexRedirect to="/react/contacts" />
                <Route path="/react/contacts">
                    <IndexRoute component={ContactList} />
                    <Route path="/react/contacts/new" component={NewContactForm} />
                    <Route path="/react/contacts/:contactId" component={Contact} />
                </Route>
            </Route>
        </Router>
    ), document.getElementById('app')); 
});