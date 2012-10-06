var Story = mongoose.model('Story'),
    User = mongoose.model('User');

module.exports = function (app, auth) {
    var StoryMiddleware = {
        createStory: function (req, res, next) {
            var newStory = new Story(req.body.story);
            newStory.save(function(err, story){
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
                    User.findOne({_id: req.session.currentUser._id}, function(err, user){
                        if(!err) {
                            user.current_story = story;
                            req.session.currentUser = user;
                            user.save(function(err, user){
                                if(!err) {
                                    next();
                                } else {
                                    console.log("ERROR", err);
                                }
                            });
                        } else {
                            console.log("ERROR", err);
                        }
                    });
                }
            });
        }
    };



  /**
   * Create project
   * Example usage:
   *   $.post("/create-project", {story: {title:"My Adventure"}}, function(data) {console.log(data);});
  **/
  app.post('/create-project', StoryMiddleware.createStory, function(req, res) { // TODO: Permission this to global admin / current user
    res.json({
        "status": "success"
      });
  });
};