module.exports = function (app, auth) {
	app.get('/', function (req, res) {

		console.log(">   LOG  Current User:", req.session.currentUser.email);
		console.log(">   LOG  Current Story:", req.session.currentUser.current_story? req.session.currentUser.current_story : "undefined");

		if(typeof req.session.currentUser !== "undefined") {
			if(req.session.currentUser.current_story) {
				res.render("story/view", {
					layout: "layouts/main"
				});
			} else {
				res.render("no-projects", {
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