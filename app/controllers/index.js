module.exports = function (app, auth) {
	app.get('/', function (req, res) {

		console.log("req.session.currentUser: ", req.session.currentUser);

		if(typeof req.session.currentUser !== "undefined") {
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