var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
    
var id = 24;

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
    
app.get(/^(.+)\/contacts/, function (req, res) {
    res.sendFile( __dirname + '/public/' + req.params[0] + '/index.html');
});

app.get(/^(.+)$/, function (req, res) { 
     res.sendFile( __dirname + '/public/' + req.params[0]); 
 });

module.exports = app;


var data = {
    1: { 
        id: 1,  
        identity: 'Batman',           
        name: 'Bruce Wayne',            
        email: 'batman@example.com', 
        imgUrl: 'batman.jpg'
    },
    2: { 
        id: 2,  
        identity: 'Spider-Man',       
        name: 'Peter Parker',           
        email: 'spiderman@example.com',
        imgUrl: 'spider-man.jpg'
    },
    3: { 
        id: 3,  
        identity: 'Wolverine',        
        name: 'Logan',                  
        email: 'wolverine@example.com',
        imgUrl: 'wolverine.jpg'
    },
    4: { 
        id: 4,  
        identity: 'Superman',         
        name: 'Clark Kent',             
        email: 'superman@example.com',
        imgUrl: 'superman.jpg'
    },
    5: { 
        id: 5,  
        identity: 'Punisher',         
        name: 'Frank Castle',           
        email: 'punisher@example.com',
        imgUrl: 'punisher.jpg'
    },
    6: { 
        id: 6,  
        identity: 'Red Robin',        
        name: 'Tim Drake',              
        email: 'redrobin@example.com',
        imgUrl: 'red-robin.jpg'
    },
    7: { 
        id: 7,  
        identity: 'Hawkeye',          
        name: 'Clint Barton',           
        email: 'hawkeye@example.com',
        imgUrl: 'hawkeye.jpg'
    },
    8: { 
        id: 8,  
        identity: 'Captain America',  
        name: 'Steve Rogers',           
        email: 'cptamerica@example.com',
        imgUrl: 'captain-america.jpg'
    },
    9: { 
        id: 9,  
        identity: 'Deadpool',         
        name: 'Wade Wilson',            
        email: 'deadpool@example.com',
        imgUrl: 'deadpool.jpg'
    },
    10: { 
        id: 10, 
        identity: 'Thor',             
        name: 'Thor Odinson',           
        email: 'thor@example.com',
        imgUrl: 'thor.jpg'
    },
    11: { 
        id: 11, 
        identity: 'Hulk',             
        name: 'Bruce Banner',           
        email: 'hulk@example.com',
        imgUrl: 'hulk.jpg'
    },
    12: { 
        id: 12, 
        identity: 'NightWing',        
        name: 'Dick Grayson',           
        email: 'nightwing@example.com',
        imgUrl: 'night-wing.jpg'
    },
    13: { 
        id: 13, 
        identity: 'Iron Fist',        
        name: 'Danny Rand',             
        email: 'ironfist@example.com',
        imgUrl: 'iron-fist.jpg'
    },
    14: { 
        id: 14, 
        identity: 'Iron Man',         
        name: 'Tony Stark',             
        email: 'ironman@example.com',
        imgUrl: 'iron-man.jpg'
    },
    15: { 
        id: 15, 
        identity: 'Nightcrawler',     
        name: 'Kurt Wagner',            
        email: 'nightcrawler@example.com',
        imgUrl: 'nightcrawler.jpg'
    },
    16: { 
        id: 16, 
        identity: 'Daredevil',        
        name: 'Matt Murdock',           
        email: 'daredevil@example.com',
        imgUrl: 'daredevil.jpg'
    },
    17: { 
        id: 17, 
        identity: 'Hellboy',          
        name: 'Anung un Rama',          
        email: 'hellboy@example.com',
        imgUrl: 'hellboy.jpg'
    },
    18: { 
        id: 18, 
        identity: 'Green Lantern',    
        name: 'Hal Jordan',             
        email: 'greenlantern@example.com',
        imgUrl: 'green-lantern.jpg'
    },
    19: { 
        id: 19, 
        identity: 'Flash',            
        name: 'Barry Allen',            
        email: 'flash@example.com',
        imgUrl: 'flash.png'
    },
    20: { 
        id: 20, 
        identity: 'Swamp Thing',      
        name: 'Dr Alec Holland',        
        email: 'swampthing@example.com',
        imgUrl: 'swamp-thing.png'
    },
    21: { 
        id: 21, 
        identity: 'Hellblazer',       
        name: 'John Constantine',       
        email: 'hellblazer@example.com',
        imgUrl: 'hellblazer.jpg'
    },
    22: { 
        id: 22, 
        identity: 'Bucky',            
        name: 'James Buchanan Barnes',  
        email: 'bucky@example.com',
        imgUrl: 'bucky.jpg'
    },
    23: { 
        id: 23, 
        identity: 'Gambit',           
        name: 'Remy LeBeau',            
        email: 'gambit@example.com',
        imgUrl: 'gambit.jpg'
    },
    24: { 
        id: 24, 
        identity: 'Red Hood',         
        name: 'Jason Todd',             
        email: 'redhood@example.com',
        imgUrl: 'red-hood.jpg'
    }
};