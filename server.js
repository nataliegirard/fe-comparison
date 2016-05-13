var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
    
var id = 24;
var data = {
     1: { id: 1,  identity: 'Batman',           name: 'Bruce Wayne',            email: 'batman@example.com' },
     2: { id: 2,  identity: 'Spider-Man',       name: 'Peter Parker',           email: 'spiderman@example.com' },
     3: { id: 3,  identity: 'Wolverine',        name: 'Logan',                  email: 'wolverine@example.com' },
     4: { id: 4,  identity: 'Superman',         name: 'Clark Kent',             email: 'superman@example.com' },
     5: { id: 5,  identity: 'Punisher',         name: 'Frank Castle',           email: 'punisher@example.com' },
     6: { id: 6,  identity: 'Red Robin',        name: 'Tim Drake',              email: 'redrobin@example.com' },
     7: { id: 7,  identity: 'Hawkeye',          name: 'Clint Barton',           email: 'hawkeye@example.com' },
     8: { id: 8,  identity: 'Captain America',  name: 'Steve Rogers',           email: 'cptamerica@example.com' },
     9: { id: 9,  identity: 'Deadpool',         name: 'Wade Wilson',            email: 'deadpool@example.com' },
    10: { id: 10, identity: 'Thor',             name: 'Thor Odinson',           email: 'thor@example.com' },
    11: { id: 11, identity: 'Hulk',             name: 'Bruce Banner',           email: 'hulk@example.com' },
    12: { id: 12, identity: 'NightWing',        name: 'Dick Grayson',           email: 'nightwing@example.com' },
    13: { id: 13, identity: 'Iron Fist',        name: 'Danny Rand',             email: 'ironfist@example.com' },
    14: { id: 14, identity: 'Iron Man',         name: 'Tony Stark',             email: 'ironman@example.com' },
    15: { id: 15, identity: 'Nightcrawler',     name: 'Kurt Wagner',            email: 'nightcrawler@example.com' },
    16: { id: 16, identity: 'Daredevil',        name: 'Matt Murdock',           email: 'daredevil@example.com' },
    17: { id: 17, identity: 'Hellboy',          name: 'Anung un Rama',          email: 'hellboy@example.com' },
    18: { id: 18, identity: 'Green Lantern',    name: 'Hal Jordan',             email: 'greenlantern@example.com' },
    19: { id: 19, identity: 'Flash',            name: 'Barry Allen',            email: 'flash@example.com' },
    20: { id: 20, identity: 'Swamp Thing',      name: 'Dr Alec Holland',        email: 'swampthing@example.com' },
    21: { id: 21, identity: 'Hellblazer',       name: 'John Constantine',       email: 'hellblazer@example.com' },
    22: { id: 22, identity: 'Bucky',            name: 'James Buchanan Barnes',  email: 'bucky@example.com' },
    23: { id: 23, identity: 'Gambit',           name: 'Remy LeBeau',            email: 'gambit@example.com' },
    24: { id: 24, identity: 'Red Hood',         name: 'Jason Todd',             email: 'redhood@example.com' }
};

app.use(bodyParser.json());
app.use(express.static('./public'));

app.route('/api/contacts')
    .get(function (req, res) {
        res.json(Object.keys(data).map(function (key) {
            return data[key];
        }));
    })
    .post(function (req, res) {
        var record = req.body;
        record.id = ++id;
        data[record.id] = record;
        res.json(record);
    });
    
app.route('/api/contacts/:id')
    .get(function (req, res) {
        res.json(data[req.params.id]);
    })
    .put(function (req, res) {
        data[req.params.id] = req.body;
        res.json(req.body);
    })
    .delete(function (req, res) {
       delete data[req.params.id];
       res.json(null);
    });

app.get('/react/*', function (req, res) {
    res.sendfile(__dirname+'/public/react/index.html');
});
    
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;