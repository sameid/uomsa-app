var api = document.api;

api.event = {
	getEventById: function(id){
		return {};
	}
}


App.controller('event', function (page, id) {
	console.log(id);
	var _event = api.getEventById(id);

	//load ui
});

