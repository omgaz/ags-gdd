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

function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, function(err, user) {
      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
}

function defineRoutes(app) {
    
    app.get("/", function (req, res) {
      res.render("public/home")
    });

    app.post("/login", function (req, res) {

      User.findOne({ email: req.body.e }, function(err, user) {
        if (user && user.authenticate(req.body.p)) {
          req.session.user_id = user.id;
          res.send("Success");
        } else {
          // TODO: need to save this information
          user.failed_login_attempts = user.failed_login_attempts++;

          if(user.failed_login_attempts == 3) {
            res.send("Blocked");
          } else {
            res.send("Failed");
          }
        }
      }); 
    });

    app.get("/project", loadUser, function(req, res, next) {
      res.send("project");
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