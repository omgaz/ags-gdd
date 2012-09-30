module.exports = function (app, auth) {
	app.get('/', function (req, res) {

		if(req.session.currentUser) {
			if(req.session.currentUser.current_story) {

			} else {
				res.render("no-project", {
					title: 'Welcome'
				});
			}
		} else {
			res.render("index", {
				title: 'Welcome'
			});
		}

	});
};