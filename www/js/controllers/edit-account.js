var api = document.api;

api.edit_account = {
	updateUser : function (body, callback){
		$.ajax({
			type:'PUT',
			url: document.config.host + '/users/' + body.hash,
			data :body,
			success:function(data){
				callback(data);
			},
			error:function(err){
				callback(err);
			},
			xhrFields: { withCredentials: true },
    		crossDomain: true,
    		dataType:'application/json'
		});
	}
}


App.controller('edit-account', function (page) {
	var user = document.currentUser();
	if (user){
		$(page).find(".firstname-edit").val(user.firstname);
		$(page).find(".lastname-edit").val(user.lastname);
		$(page).find(".std-number-edit").val(user.studentid);
		$(page).find(".email-edit").val(user.email);

	}
	$(page).find(".save-new-pass").click(function (){

		var old_password, new_password, confirm_password;
		
		old_password = $(page).find(".password-old").val();
		new_password = $(page).find(".password-new").val();
		confirm_password = $(page).find(".password-conf").val();
		
		_POST('/user/pc', {
			'user_id': user._id, 
			'old_password':old_password, 
			'new_password': new_password, 
			'confirm_password': confirm_password 
		}, 'json', function(response){
			alert(response.message);
		});

	});

	// $(page).find(".save-changes").click(function (){
	// 	var data = {
	// 		'hash': user.hash,
	// 		'firstname': $(page).find(".firstname-edit").val(),
	// 		'lastname': $(page).find(".lastname-edit").val(),
	// 		'studentNumber': $(page).find(".std-number-edit").val(),
	// 		'email': $(page).find(".email-edit").val(),
	// 		'password': $(page).find(".confirm-pass").val(),
	// 		'username': $(page).find(".email-edit").val()
	// 	}
	// 	console.log(data);
	// 	var regexEmailCheck = false;

	// 	if (data.firstname.length == 0 )alert("Please provide a firstname");
	// 	else if (data.lastname.length == 0)alert("Please provide a lastname");
	// 	else if (data.studentNumber.length <= 6)alert("Invalid Student Number length");
	// 	else if (data.password.length == 0)alert("Enter a password");
	// 	else if (regexEmailCheck) alert("You must enter a valid uOttawa Email Address");
	// 	else {

	// 		api.edit_account.updateUser(data, function(response){
	// 			console.log(response);
	// 		})
	// 	}
	// });

	

});