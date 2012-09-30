
/**
 * Module dependencies.
 */

var express = require('express'),
    gzippo = require('gzippo'),
    mongoStore = require('connect-mongodb'),
    url = require('url');

exports.boot = function(app){
  bootApplication(app);
};

// App settings and middleware

function bootApplication(app) {
  app.configure(function(){

    // set views path, template engine and default layout
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.engine("ejs", require('ejs-locals'));
    app.locals._layoutFile = '/layouts/default';

    // contentFor & content view helper - to include blocks of content only on required pages
    app.use(function(req, res, next){
      // expose the current path as a view local
      res.locals.path = url.parse(req.url).pathname;
      next();
    });

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // cookieParser should be above session
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'moist',
      store: new mongoStore({
        url: config[process.env.NODE_ENV || "development"].db.uri,
        collection : 'sessions'
      })
    }));

    app.use(express.favicon());

    app.use(express.static(__dirname + '/public'));
    // app.use(gzippo.staticGzip(__dirname + '/public'));

      // Some dynamic view helpers refactored for express 3.x
      app.use(function(req, res, next){
        res.locals.request = req;
        res.locals.hasMessages = !req.session? false : Object.keys(req.session.flash || {}).length;
        res.locals.messages = require('./lib/express-messages');
        res.locals.dateformat = require('./lib/dateformat').strftime;
        res.locals.base = '/' == app.route ? '' : app.route; // return the app's mount-point so that urls can adjust.
        res.locals.appName = "Adventure Dossier";
        res.locals.slogan = "A bigger undertaking than I first thought.";
        next();
      });

    app.use(express.logger(':method :url :status'));
    // show error on screen. False for all envs except development
    // settmgs for custom error handlers
    app.set('showStackError', false);

    // routes should be at the last
    app.use(app.router);


  });

}