var api = document.api;

api.register = {
	createUser: function(data, callback){
		$.ajax({
			type:'POST',
			url: document.config.host + '/user',
			data: {
				"username":data.username,
				"password":data.password,
				""

			},
			success:function(data){
				callback(null, data);
			},
			error:function(err){
				callback(err, null);
			},
    		crossDomain: true,
    		dataType: 'jsonp'
		});
	}
}

 
App.controller('register', function (page) {


});