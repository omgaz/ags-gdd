/* Main application entry file. Please note, the order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express'),
  fs = require('fs'),
  utils = require('./lib/utils'),
  auth = require('./authorisation');

// Load configurations
exports = module.exports = config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

require('./db-connect');                // Bootstrap db connection

// Bootstrap models
var models_path = __dirname + '/app/models',
    model_files = fs.readdirSync(models_path);

model_files.forEach(function (file) {
  if (file == 'user.js') {
    User = require(models_path + '/' + file);
  } else {
    require(models_path + '/' + file);
  }
})

var app = express();                    // express app
require('./settings').boot(app);        // Bootstrap application settings

// Bootstrap controllers
var controllers_path = __dirname + '/app/controllers',
    controller_files = fs.readdirSync(controllers_path);

controller_files.forEach(function (file) {
  require(controllers_path + '/' + file)(app, auth);
});

require('./error-handler').boot(app);   // Bootstrap custom error handler

// Start the app by listening on 
var port = process.env.PORT || 8008;
app.listen(port);
console.log('Express app started on port '+port);