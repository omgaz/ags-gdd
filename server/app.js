var express     = require('express'),
    routes      = require('./routes'),
    mongoStore 	= require('connect-mongodb'),
    app         = express.createServer();
    

var PORT_NO = process.env.C9_PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.bodyParser()); // so express knows what to do with request body i.e. form or json data

app.use(express.cookieParser()); // tis needed for sessions
app.use(express.session({ store: mongoStore("omgaz.co.uk:27017/gdd"), secret: 'isAnSekrit!1' }));

app.use(express.static(__dirname + '/../client'));


routes.defineRoutes(app);


if (!module.parent) {
  app.listen(PORT_NO);
  console.log('Express app started on port ' + PORT_NO);
}