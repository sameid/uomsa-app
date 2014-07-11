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
	var user = currentUser();

	if (user){
		$(page).find(".name").text(user.firstname + " " + user.lastname);
		$(page).find(".id").text(user.studentid);
		$(page).find(".email").text(user.email);
	}

	$(page).find('.sign-out').on('click', function (){
		api.account.logout(function (data){
			var response = JSON.parse(data.responseText);
			if (response.success){
				window.localStorage.setItem("isLoggedIn", false);
				window.localStorage.clear("currentUser");
				App.load("home");
			}
		});
	})

});