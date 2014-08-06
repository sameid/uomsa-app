var api = document.api;

api.register = {
	createUser: function(data, callback){
		$.ajax({
			type:'POST',
			url: document.config.host + '/users',
			data :data,
			success:function(data){
				callback(null, data);
			},
			error:function(err){
				callback(err, null);
			},
    		crossDomain: true,
    		dataType: 'form-data'
		});
	}
}

 
App.controller('register', function (page) {

	$("#spinner-register").hide();

	$(page).find(".register").on('click', function (){

		var firstname = $(page).find(".firstname").val();
		var lastname = $(page).find(".lastname").val();
		var studentNumber = $(page).find(".std-number").val();
		var email = $(page).find(".email-reg").val();
		var password = $(page).find(".password-reg").val();
		var confirm = $(page).find(".password-confirm-reg").val();

		$("#spinner-register").show();
		$(".register-creds").hide();

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

		var target = document.getElementById('spinner-register');
		var spinner = new Spinner(opts).spin(target);

		//remember to regex email to see if it valid uottawa or atleast xxxx999@uottawa.ca 
		var regexEmailCheck = false;

		if (firstname.length == 0 )alert("Please provide a firstname");
		else if (lastname.length == 0)alert("Please provide a lastname");
		else if (studentNumber.length == 6)alert("Invalid Student Number length");
		else if (password != confirm && password.length > 6)alert("Password fields do not match");
		else if (regexEmailCheck) alert("You must enter a valid uOttawa Email Address");
		else {
			console.log('successful register');
			document.api.register.createUser({
				'firstname':firstname,
				'lastname':lastname,
				'studentNumber': studentNumber,
				'email':email,
				'password':password
			}, function (data){

				setTimeout(function() {
					console.log(data);
					var response = JSON.parse(data.responseText);

					if(response.success){

						console.log('Registration Successful.');
						window.localStorage.setItem("isLoggedIn", true);
						window.localStorage.setItem("currentUser", JSON.stringify(response.user));
						App.load('home');

					}
					else {
						console.log(response.responseText);

					}

					$("#spinner-register").hide();
					$(".register-creds").show();
            		spinner.spin();
				}, 1000);

			});
		}

		setTimeout(function() {
			$("#spinner-register").hide();
			$(".register-creds").show();
            spinner.spin();
		}, 1000);


	});
});