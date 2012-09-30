var ActSchema = new Schema({}),
    Act;

ActSchema.add({
  "name": String,

  "characters": [Schema.ObjectId],
  "locations": [Schema.ObjectId],

  "created_on": { type: Date, default: Date.now },
  "last_modified_on": Date
});

ActSchema.pre("save", function(next) {
  this.last_modified_on = new Date();
  next();
});

var exports = module.exports = Act = mongoose.model('Act', ActSchema);