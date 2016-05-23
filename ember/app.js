var app = Ember.Application.create();

app.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api'
});

app.Contact = DS.Model.extend({
   identity: DS.attr('string'),
   name: DS.attr('string'),
   email: DS.attr('string')
});

app.ContactSerializer = DS.RESTSerializer.extend({
    normalizeArrayResponse: function (store, primaryType, payload) {
        payload = { contacts: payload };
        return this._super(store, primaryType, payload);
    },
    normalizeSingleResponse: function (store, primaryType, payload, recordId) {
        payload = { contact: payload };
        return this._super(store, primaryType, payload, recordId);
    },
    serializeIntoHash: function (hash, type, snapshot, options) {
        var json = this.serialize(snapshot, { includeId: true });
        Object.keys(json).forEach(function (key) {
            hash[key] = json[key];
        });
    }
});

app.Router.reopen({
   location: 'history',
   rootURL: '/ember/'
});

app.Router.map(function () {
   this.route('contacts');
   this.route('contact', { path: 'contacts/:contact_id' });
   this.route('new', { path: 'contacts/new' });
});

app.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('contacts');
    }
});

app.ContactsRoute = Ember.Route.extend({
    model: function () {
        return this.store.findAll('contact');
    }
});

app.ContactsController = Ember.Controller.extend({
    sortProps: ['identity'],
    sortBy: 'identity',
    sortDesc: false,
    actions: {
        sortIdentity: function () {
            if (this.sortBy == 'identity') {
                if (this.sortDesc) {
                    this.set('sortProps', ['identity']);
                    this.set('sortDesc', false);
                    $('.contact-heading .identity .caret-down').removeClass('hide');
                    $('.contact-heading .identity .caret-up').addClass('hide');
                } else {
                    this.set('sortProps', ['identity:desc']);
                    this.set('sortDesc', true);
                    $('.contact-heading .identity .caret-up').removeClass('hide');
                    $('.contact-heading .identity .caret-down').addClass('hide');
                }
            } else {
                this.set('sortProps', ['identity']);
                this.set('sortBy', 'identity');
                this.set('sortDesc', false);
                $('.identity').addClass('bold');
                $('.name').removeClass('bold');
                $('.contact-heading .caret').addClass('hide');
                $('.contact-heading .identity .caret-down').removeClass('hide');
            }
        },
        sortName: function () {
            if (this.sortBy == 'name') {
                if (this.sortDesc) {
                    this.set('sortProps', ['name']);
                    this.set('sortDesc', false);
                    $('.contact-heading .name .caret-down').removeClass('hide');
                    $('.contact-heading .name .caret-up').addClass('hide');
                } else {
                    this.set('sortProps', ['name:desc']);
                    this.set('sortDesc', true);
                    $('.contact-heading .name .caret-up').removeClass('hide');
                    $('.contact-heading .name .caret-down').addClass('hide');
                }
            } else {
                this.set('sortProps', ['name']);
                this.set('sortBy', 'name');
                this.set('sortDesc', false);
                $('.name').addClass('bold');
                $('.identity').removeClass('bold');
                $('.contact-heading .caret').addClass('hide');
                $('.contact-heading .name .caret-down').removeClass('hide');
            }
        }
    },
    sortedContacts: Ember.computed.sort('model', 'sortProps')
});

app.ContactController = Ember.Controller.extend({
    actions: {
        update: function () {
            var model = this.get('model');
            model.save();
            
            this.transitionToRoute('contacts');
        },
        delete: function () {
            var model = this.get('model');
            model.deleteRecord();
            model.save();
            
            this.transitionToRoute('contacts');
        }
    }
});

app.NewRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('contact');
    }
});

app.NewController = Ember.Controller.extend({
    actions: {
        add: function () {
            this.get('model').save();
            this.transitionToRoute('contacts');
        }
    }
});