var CharacterSchema = new Schema({}),
    Character;

CharacterSchema.add({
  "name": String,

  "is_player": Boolean,
  "bio": String,

  "created_on": { type: Date, default: Date.now },
  "last_modified_on": Date
});

CharacterSchema.pre("save", function(next) {
  this.last_modified_on = new Date();
  next();
});

var exports = module.exports = Character = mongoose.model('Character', CharacterSchema);