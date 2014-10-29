App.controller('account', function (page) {
	var user = document.currentUser();

	if (user){
		$(page).find(".name").html("<b>Name: </b>" + user.firstname + " " + user.lastname);
		$(page).find(".id").html("<b>Student ID: </b>" + user.studentid);
		$(page).find(".email").html("<b>Email: </b>" + user.email);
	}

	$(page).find('.sign-out').on('click', function (){
		_POST('/logout', {'access_token': window.localStorage.getItem("accessToken") }, 'form-data', function (data){
			var response = JSON.parse(data.responseText);
			if (response){
				window.localStorage.clear("currentUser");
				window.localStorage.clear("accessToken")
				App.load("home");
			}
		});
	})

});