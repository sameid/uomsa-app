var api = document.api;

api.account = {
	logout : function (callback){
		$.ajax({
			type:'GET',
			url: document.config.host + '/logout',
			success:function(data){
				callback(data);
			},
			error:function(err){
				callback(err);
			},
    		crossDomain: true,
    		dataType:'application/x-www-form-urlencoded'
		});
	}
}


App.controller('account', function (page) {
	var user = document.currentUser();

	if (user){
		$(page).find(".name").html("<b>Name: </b>" + user.firstname + " " + user.lastname);
		$(page).find(".id").html("<b>Student ID: </b>" + user.studentid);
		$(page).find(".email").html("<b>Email: </b>" + user.email);
	}

	$(page).find('.sign-out').on('click', function (){
		document.api.account.logout(function (data){
			var response = JSON.parse(data.responseText);
			if (response.success){
				window.localStorage.setItem("isLoggedIn", false);
				window.localStorage.clear("currentUser");
				App.load("home");
			}
		});
	})

});