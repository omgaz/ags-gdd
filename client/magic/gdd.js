(function($) {
	$(document).ready(function(){


		$("a.btn").click(function(e){
			var $this = $(this);
			e.preventDefault();
			$this.text("working...");
			$this.prop("disabled", true) {
				$this.unbind().bind(function(event){
					event.preventDefault();
				});
			}
		});


		$("#btnRegister").click(function(){
			var $this = $(this);

			$.post("register", {e:$("#email").val(),p:$("#password").val()},function(responseJSON) {
				console.log(responseJSON);

				switch (responseJSON.status) {
					case "ok":
						window.location = "/project"
						break;
					case "error":
						$this.prop("disabled", false).html('<i class="icon-certificate icon-white"></i> Register');
						console.log(responseJSON.err);
						break;
				}
			});
		});
	});
})(jQuery);