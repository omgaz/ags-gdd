var mongoose    = require('mongoose'),
    models      = require('./models'),

    db,
    User,
    Role,
    Story,
    Task,
    Message,
    Act,
    Puzzle,
    Dialog,
    Location,
    Character,
    Item,
    
    mongoConfig = {
        host: "omgaz.co.uk",
        database: "gdd",
        port: "27017",
        options: {}
    };
    
models.defineModels(mongoose, function() {
  User      = mongoose.model('User');
  Role      = mongoose.model('Role');
  Story     = mongoose.model('Story');
  Task      = mongoose.model('Task');
  Message   = mongoose.model('Message');
  Act       = mongoose.model('Act');
  Puzzle    = mongoose.model('Puzzle');
  Dialog    = mongoose.model('Dialog');
  Location  = mongoose.model('Location');
  Character = mongoose.model('Character');
  Item      = mongoose.model('Item');
  
  db = mongoose.connect(mongoConfig.host, mongoConfig.database, mongoConfig.port, mongoConfig.options);
});

if(typeof User === "undefined") {
    throw new Error("User model is not defined.");
}

function defineRoutes(app) {
    
    app.get("/", function (req, res) {
      console.log("HOME!");
      res.send("No Data");
    });
    
    app.get("/db-test", function(req, res) {
        console.log("Hello World.");
        
        var printUser = function(err, user) {
            console.log("err:", err);
            console.log("user:", user);
            res.redirect("/");
        };
        
        console.log("db", db);
        console.log("User", User);
        
        var testUser = new User({
            name: "test",
            email: "test@test.com",
            password: "test"
        });
        
        testUser.save(printUser);
    });
}

exports.defineRoutes = defineRoutes;