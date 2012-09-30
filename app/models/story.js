var StorySchema = new Schema({}),
    Story;

StorySchema.add({
  "name": String,

  "acts": [Schema.ObjectId],
  "team": [Schema.ObjectId],

  "created_on": { type: Date, default: Date.now },
  "last_modified_on": Date
});

StorySchema.pre("save", function(next) {
  this.last_modified_on = new Date();
  next();
});

var exports = module.exports = Story = mongoose.model('Story', StorySchema);