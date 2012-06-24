var express = require('express'),
    models = require('./models'),
    mongoose = require('mongoose'),
    app = express.createServer(),

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
    Item;
    

var PORT_NO = 8080;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('db-uri', 'mongodb://localhost/gdd');
app.use(express.static(__dirname + '../client'));


models.defineModels(mongoose, function() {
  app.User      = User      = mongoose.model('User');
  app.Role      = Role      = mongoose.model('Role');
  app.Story     = Story     = mongoose.model('Story');
  app.Task      = Task      = mongoose.model('Task');
  app.Message   = Message   = mongoose.model('Message');
  app.Act       = Act       = mongoose.model('Act');
  app.Puzzle    = Puzzle    = mongoose.model('Puzzle');
  app.Dialog    = Dialog    = mongoose.model('Dialog');
  app.Location  = Location  = mongoose.model('Location');
  app.Character = Character = mongoose.model('Character');
  app.Item      = Item      = mongoose.model('Item');
  
  db = mongoose.connect(app.set('db-uri'));
});

if (!module.parent) {
  app.listen(PORT_NO);
  console.log('Express app started on port ' + PORT_NO);
}