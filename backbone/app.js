var Contact = Backbone.Model.extend({});

var Contacts = Backbone.Collection.extend({
    sort_key: 'identity',
    sortOrder: false,
    comparator: function (a, b) {
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
 
        if (a == b) return 0;
 
        if (this.sortOrder) {
            return a > b ? -1 : 1;
        } else {
            return a > b ? 1 : -1;
        }
    },
    sortByField: function (fieldName) {
        this.sort_key = fieldName;
    },
    changeOrder: function (order) {
        this.sortOrder = order;
        this.sort();
    },
    model: Contact,
    url: '/api/contacts'
});

var ContactsListView = Backbone.View.extend({
    tagName: 'table',
    className: 'contact-list',
    template: _.template( $('#ContactsListView').html() ),
    focusedColumn: 'identity',
    events: {
        'click .contact-item': 'showContact',
        'click .contact-item td': 'showContactFromCell',
        'click .contact-heading .identity': 'changeIdentityOrder',
        'click .contact-heading .name': 'changeNameOrder'
    },
    initialize: function () {
        this.collection.on('sort', this.render, this);
    },
    render: function () {
        this.el.innerHTML = this.template({ contacts: this.collection.toJSON() });
        return this;
    },
    showContact: function (evt) {
        this.goToContact($(evt.target).data('id'));
    },
    showContactFromCell: function (evt) {
        evt.stopImmediatePropagation();
        this.goToContact($(evt.target.parentNode).data('id'));
    },
    goToContact: function (id) {
        Backbone.history.navigate('contacts/' + id, { trigger: true });
    },
    changeIdentityOrder: function (evt) {
        if (this.focusedColumn == 'identity') {
            this.collection.changeOrder(!this.collection.sortOrder);
            $('.contact-heading .caret').addClass('hide');
            if (this.collection.sortOrder) {
                $('.contact-heading .identity .caret-up').removeClass('hide');
            } else {
                $('.contact-heading .identity .caret-down').removeClass('hide');
            }
        } else {
            this.collection.sortByField('identity');
            this.collection.changeOrder(false);
            this.focusedColumn = 'identity';
            $('.contact-heading .caret').addClass('hide');
            $('.contact-heading .identity .caret-down').removeClass('hide');
        }
        
        $('.name').removeClass('bold');
        $('.identity').addClass('bold');
    },
    changeNameOrder: function (evt) {
        if (this.focusedColumn == 'name') {
            this.collection.changeOrder(!this.collection.sortOrder);
            $('.contact-heading .caret').addClass('hide');
            if (this.collection.sortOrder) {
                $('.contact-heading .name .caret-up').removeClass('hide');
            } else {
                $('.contact-heading .name .caret-down').removeClass('hide');
            }
        } else {
            this.collection.sortByField('name');
            this.collection.changeOrder(false);
            this.focusedColumn = 'name';
            $('.contact-heading .caret').addClass('hide');
            $('.contact-heading .name .caret-down').removeClass('hide');
        }
        
        $('.identity').removeClass('bold');
        $('.name').addClass('bold');
    }
});

var ContactsItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( $('#ContactsItemViewTemplate').html() ),
    render: function() {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
});

var ActionsView = Backbone.View.extend({
   className: 'actions',
   template: '<a class="btn-primary" href="contacts/new">New Contact</a>',
   render: function () {
       this.el.innerHTML = this.template;
       return this;
   }
});

var ContactView = Backbone.View.extend({
    template: _.template( $('#ContactViewTemplate').html() ),
    initialize: function () {
        this.listenTo(this.model, 'change:identity change:name', this.updateName);
    },
    events: {
        'click .update': 'update',
        'click .delete': 'delete'
    },
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
    updateName: function () {
        this.$('h2').text( this.model.get('identity') + ' - ' + this.model.get('name') );
    },
    update: function () {
        this.model.save({
           identity: this.$('.identity').val(),
           name: this.$('.name').val(),
           email: this.$('.email').val()
        });
        Backbone.history.navigate('', { trigger: true });
    },
    delete: function () {
        this.model.destroy();
        Backbone.history.navigate('', { trigger: true });
    }
});

var NewContactView = Backbone.View.extend({
    template: $('#NewContactViewTemplate').html(),
    events: {
        'click button': 'add'
    },
    render: function () {
        this.el.innerHTML = this.template;
        return this;
    },
    add: function () {
        this.collection.create({
           identity: this.$('.identity').val(),
           name: this.$('.name').val(),
           email: this.$('.email').val()
        }, {
            success: function () {
                Backbone.history.navigate('', { trigger: true });
            }
        });
    }
});

var Router = Backbone.Router.extend({
    initialize: function (options) {
        this.contacts = options.contacts;
        this.el = $('#app');
    },
    routes: {
        '': 'main',
        'contacts': 'displayList',
        'contacts/new': 'displayForm',
        'contacts/:id': 'displaySingle'
    },
    main: function () {
        Backbone.history.navigate('contacts', { trigger: true });
    },
    displayList: function () {
        this.el.empty()
            .append(new ActionsView().render().el)
            .append(new ContactsListView({ collection: this.contacts}).render().el);
    },
    displayForm: function () {
        this.el.empty().append( new NewContactView({ collection: this.contacts }).render().el );
    },
    displaySingle: function (id) {
        var model = this.contacts.get( parseInt(id, 10));
        
        this.el.empty().append( new ContactView({ model: model }).render().el );
    }
});

var contacts = new Contacts();

contacts.fetch().then(function() {
    var r = new Router({
        contacts: contacts
    });
    Backbone.history.start({
        pushState: true,
        root: "/backbone/",
        silent: false
    });
});