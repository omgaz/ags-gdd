var crypto = require('crypto'),
    UserSchema,
    User;

UserSchema = new Schema({
  "name": String,
  "email": { type: String, index: true, unique: true },

  "hashed_password": String,
  "salt": String,

  "current_story": Schema.ObjectId,
  "stories": [Schema.ObjectId],

  "created_on": { type: Date, default: Date.now },
  "last_login": Date,
  "failed_login_attempts": Number
});

UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
}).get(function() { return this._password; });

UserSchema.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashed_password;
};

UserSchema.method('makeSalt', function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
});

UserSchema.method('encryptPassword', function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

UserSchema.path('email').validate(function (email) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(email);
}, 'Please provide a proper email');

mongoose.model('User', UserSchema);

var exports = module.exports = User = mongoose.model('User');