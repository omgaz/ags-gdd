var express     = require('express'),
    routes      = require('./routes'),
    app         = express.createServer();
    

var PORT_NO = process.env.C9_PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '../client'));


routes.defineRoutes(app);


if (!module.parent) {
  app.listen(PORT_NO);
  console.log('Express app started on port ' + PORT_NO);
}