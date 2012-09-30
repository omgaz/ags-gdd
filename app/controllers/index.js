module.exports = function (app, auth) {
	app.get('/', function (req, res) {
		res.render("index", {
			title: 'Welcome'
        });
	});
};