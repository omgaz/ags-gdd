(function($) {
	$(document).ready(function(){


		$("body").delegate("a.btn:not(:disabled)", "click", function(e){
			var $this = $(this);
			e.preventDefault();
			$this.find("span").text(" working...");
			$this.prop("disabled", true)
			$this.unbind().bind(function(event){
				event.preventDefault();
			});
		});

		function register() {

			var $this = $(this);

			$.post("register", {e:$("#email").val(),p:$("#password").val()},function(responseJSON) {
				console.log(responseJSON);

				switch (responseJSON.status) {
					case "ok":
						window.location = "/"
						break;
					case "error":
						$this.prop("disabled", false).find("span").text(' Register');
						$this.click(register);
						console.log(responseJSON.err);
						break;
				}
			});

		}

		function login() {
			var $this = $(this);

			$.post("login", {e:$("#email").val(),p:$("#password").val()},function(responseJSON) {
				console.log(responseJSON);

				switch (responseJSON.status) {
					case "ok":
						window.location = "/"
						break;
					case "error":
						$this.prop("disabled", false).find("span").text(' Login');
						$this.click(login);
						console.log(responseJSON.err);
						break;
				}
			});
		}


		$("#btnRegister").click(register);
		$("#btnLogin").click(login);
	});
})(jQuery);