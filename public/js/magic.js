(function($) {

	GDD = {};

	GDD.Users = {
		// GDD.Users.create("me@omgaz.com", "password1", function(data) { console.log(data); });
		create: function (email, password, callback) {
			$.post("/create-user", {"user": {"email": email, "password": password}}, callback || function(data) {});
		},

		find: function (query, callback) {
			$.post("/get-users", query? {"query": query} : {}, callback || function(data) {});
		},

		findById: function (id, callback) {
			this.find({ "_id": id}, callback || function(data) {});
		},

		findByEmail: function (email, callback) {
			this.find({ "email": email}, callback || function(data) {});
		}
	};


	GDD.Widgets = {};

	GDD.Widgets.RegistrationWidget = function () {
		this.init();
	};
	

	GDD.Widgets.RegistrationWidget.prototype = {
		errorMarkup: '<div class="alert alert-error">{error}</div>',

		init: function () {
			this.bindUI();
			this.bindEvents();
		},

		bindUI: function () {
			this.container = $(".register");

			this.errorContainer = this.container.find(".errorContainer");

			this.emailField = this.container.find("#registerEmail");
			this.passwordField = this.container.find("#registerPassword");

			this.submitButton = this.container.find("a.btn.submit");
		},

		bindEvents: function () {
			this.submitButton.click( $.proxy(this.buttonClick, this ) );
		},

		buttonClick: function(e) {
			e.preventDefault();
			if(!this.submitButton.is(".disabled")) {
				this.submitButton.addClass("disabled");
				this.submitButton.find("span.text").text("Registering...");
				this.submitButton.find("i").removeClass("icon-signin").addClass("icon-time");
				this.createUser(this.emailField.val(), this.passwordField.val());
			}
		},

		showError: function (errorMessage) {
			this.clearErrors();
			this.errorContainer.append( $(this.errorMarkup.supplant({error: errorMessage})) );
		},

		clearErrors: function () {
			this.errorContainer.find("*").remove();
		},

		createUser: function (email, password) {
			GDD.Users.create(email, password, $.proxy( this.onCreateCallback, this ));
		},

		onCreateCallback: function (data) {

			if(data.status === "error") {
				this.showError(data.errorMessage);
				this.submitButton.removeClass("disabled");
				this.submitButton.find("span.text").text("Register");
				this.submitButton.find("i").removeClass("icon-time").addClass("icon-signin");
			} else if (data.status === "success") {
				this.clearErrors();
				this.submitButton.addClass("btn-success").removeClass(".btn-primary").find("span.text").text("Success");
				this.submitButton.find("i").removeClass("icon-time").addClass("icon-thumbs-up");
			}
		}
	};

	$(document).ready(function () {
		for (var i = window.widgets.length - 1; i >= 0; i--) {
			var widget = window.widgets[i];
			try {
				new GDD.Widgets[widget];
			} catch (e) {
				console.log("Cannot find widget: " + widget);
			}
		};
	});


})(jQuery);


// Protyped Utils
if (!String.prototype.supplant) {
	String.prototype.supplant = function (o) {
		return this.replace(/{([^{}]*)}/g,
			function (a, b) {
				var r = o[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			}
		);
	};
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1");
	};
}