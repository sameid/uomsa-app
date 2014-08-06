var api = document.api;

api.login = {
	authenticate: function(username, password, callback){
		$.ajax({
			type:'POST',
			url: document.config.host + '/login',
			data: {
				'username':username,
				'password':password
			},
			success:function(data){
				callback(data);
			},
			error:function(err){
				callback(err);
			},
    		crossDomain: true,
    		dataType: 'form-data'
		});
	}
}

// 
	
App.controller('login', function (page) {

	$("#spinner-sign-in").hide();

	$(page).find(".sign-in").on('click', function (){

		var username = $(page).find(".username").val();
		var password = $(page).find(".password").val();

		$("#spinner-sign-in").show();
		$(".creds").hide();

		var opts = {
  			lines: 10, // The number of lines to draw
  			length: 0, // The length of each line
  			width: 20, // The line thickness
  			radius: 30, // The radius of the inner circle
 			corners: 0.9, // Corner roundness (0..1)
  			rotate: 0, // The rotation offset
  			direction: 1, // 1: clockwise, -1: counterclockwise
  			color: '#000', // #rgb or #rrggbb or array of colors
  			speed: 1, // Rounds per second
  			trail: 22, // Afterglow percentage
  			shadow: false, // Whether to render a shadow
  			hwaccel: false, // Whether to use hardware acceleration
  			className: 'spinner', // The CSS class to assign to the spinner
  			zIndex: 2e9, // The z-index (defaults to 2000000000)
  			top: '50%', // Top position relative to parent
  			left: '50%' // Left position relative to parent
		};
		var target = document.getElementById('spinner-sign-in');
		var spinner = new Spinner(opts).spin(target);

		document.api.login.authenticate(username, password, function (data){
			var response = JSON.parse(data.responseText);
			
			setTimeout(function (){

				if (response.success){
					console.log('Login Successful.');
					window.localStorage.setItem("isLoggedIn", true);
					window.localStorage.setItem("currentUser", JSON.stringify(response.user));
					alert('Login Successful');
					App.load('home');
				}
				else {
					window.localStorage.setItem("isLoggedIn", false);
					alert('Invalid email or password was provided.');
            	}

				$("#spinner-sign-in").hide();
				$(".creds").show();
            	spinner.spin();
            }, 1000);
            
        });
	});
});
// });