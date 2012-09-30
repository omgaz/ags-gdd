var User = mongoose.model('User');

var ErrorMessages = {
  "11000": "The email address is already registered.",
  "email": "The email address is invalid.",
  "2": "Invalid email or password."
};

module.exports = function (app, auth) {

  /* USER MIDDLEWARE-- */

  var UserMiddleware = {
    createUser: function (req, res, next) {
      var newUser = new User(req.body.user);
      newUser.save(function(err, user) {

        if(err) {
          if(err.errors && err.errors.email) {
            err.code = "email";
          }
          res.json({
            "status": "error",
            "errorMessage": ErrorMessages[err.code],
            "stack": err
          });
        } else {
          next();
        }
      });
    },

    signIn: function (req, res, next) {
      next();
    }
  };

  /* --END USER MIDDLEWARE */

  app.param('profileId', function (req, res, next, id) {
    User
      .findOne({ _id : id })
      .run(function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new Error('Failed to load User ' + id)); }

        req.foundUser = user;
        next();
      });
  });


  /* USER ROUTES-- */

  /**
   * Remove Users
   * Example usage:
   *   $.post("/remove-users", {}, function(data) {console.log(data);});
   *   $.post("/remove-users", {query: {email:"me@omgaz.co.uk"}}, function(data) {console.log(data);});
  **/
  app.post('/remove-users', function(req, res) { // TODO: Permission this to global admin / current user
    User.find(req.body.query || {}).remove(function(err) {
      console.log("Successfully removed all users.");
      res.json({
        "status": "success",
        "message": "Successfully removed " + (req.body.query? "selected" : "all") + " users."
      });
    });
  });

  /**
   * Get Users
   * Example usage:
   *   $.post("/get-users", {}, function(data) {console.log(data);});
   *   $.post("/get-users", {query: {email:"me@omgaz.co.uk"}}, function(data) {console.log(data);});
  **/
  app.post('/get-users', function(req, res) {
    User.find(req.body.query || {}, "name email _id", function(err, users) {
      console.log("Users:", users);
      res.json(users);
    });
  });

  /**
   * Create User
   * Example usage:
   *   $.post("/create-user", {user: {email:"me@omgaz.co.uk", password: "password1"}}, function(data) {console.log(data);});
  **/
  app.post('/create-user', UserMiddleware.createUser, function (req, res) {
    res.json({
      "status": "success",
      "redirect": "/"
    });
  });


  // Handles session Logout
  app.get('/logout', auth.requiresLogin, function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Profile view
  app.get('/profile/:profileId', auth.requiresLogin, function (req, res) {
    var profileUser = req.foundUser;
    res.render('users/profile', {
      title : profileUser.name,
      profileUser : profileUser
    });
  });

  /* --END USER ROUTES */

};