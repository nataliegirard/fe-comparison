import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, IndexRoute, Link, browserHistory } from 'react-router';
import jQuery from 'jquery';

class App extends React.Component {
    render() {
        return (
            <section>
                <header>
                    <h1><Link to="/contacts">React Contacts</Link></h1>
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
            contacts: []
        };
    }
    
    componentWillMount() {
        this._fetchContacts();
    }
    
    render() {
        var items = this.state.contacts.map((contact) => {
            return (<ContactListItem key={contact.id} contact={contact} />);
        });
        return(
            <section>
                <div className="actions">
                    <Link className="btn-primary" to="/contacts/new">New Contact</Link>
                </div>
                <ul className="contact-list">
                    {items}
                </ul>
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
}

class ContactListItem extends React.Component {
    render() {
        var c = this.props.contact;
        return (<li className="contact-item">
            <Link to={`/contacts/${c.id}`}>
                {c.identity} - {c.name} <span className="email">{c.email}</span>
            </Link>
        </li>);
    }
}

class NewContactForm extends React.Component {
    constructor() {
        super();
        this.state = {
            contact: {
                identity: null,
                name: null,
                email: null
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
                browserHistory.push('/contacts');
            }
        });
    }
}

class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            contact: {}
        };
    }
    
    componentWillMount() {
        this._fetchContact();
    }
    
    render() {
        var c = this.state.contact;
        return (
            <section className="contact-form">
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
            }
        });
    }
    
    _delete() {
        var contactId = parseInt(this.props.params.contactId, 10);
        jQuery.ajax({
            method: 'DELETE',
            url: '/api/contacts/'+contactId,
            success: () => {
                browserHistory.push('/contacts');
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
            <Route path="/" component={App}>
                <IndexRedirect to="/contacts" />
                <Route path="/contacts">
                    <IndexRoute component={ContactList} />
                    <Route path="/contacts/new" component={NewContactForm} />
                    <Route path="/contacts/:contactId" component={Contact} />
                </Route>
            </Route>
        </Router>
    ), document.getElementById('app')); 
});