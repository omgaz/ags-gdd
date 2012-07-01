(function($) {
	$(document).ready(function(){

		var errorHTML = '<div class="alert alert-error"><button type="button" class="close icon-remove-sign" data-dismiss="alert"></button><strong>Oh noes!</strong> <span></span></div>'


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
			$("button.close").trigger("click");
			$.post("register", {e:$("#email").val(),p:$("#password").val()},function(responseJSON) {
				console.log(responseJSON);

				switch (responseJSON.status) {
					case "ok":
						window.location = "/"
						break;
					case "error":
						var $error = $(errorHTML);
						$error.find("span").text(responseJSON.err);
						$("#content").prepend($error);
						$this.prop("disabled", false).find("span").text(' Register');
						$this.click(register);
						console.log(responseJSON.err);
						break;
				}
			});

		}

		function login() {
			var $this = $(this);
			$("button.close").trigger("click");

			$.post("login", {e:$("#email").val(),p:$("#password").val()},function(responseJSON) {
				console.log(responseJSON);

				switch (responseJSON.status) {
					case "ok":
						window.location = "/"
						break;
					case "error":
						var $error = $(errorHTML);
						$error.find("span").text(responseJSON.err);
						$("#content").prepend($error);
						$this.prop("disabled", false).find("span").text(' Login');
						$this.click(login);
						console.log(responseJSON.err);
						break;
				}
			});
		}

		$("body").delegate("button.close", "click", function(){ $(this).parent().remove(); });


		$("#btnRegister").click(register);
		$("#btnLogin").click(login);
	});
})(jQuery);