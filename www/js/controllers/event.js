var api = document.api;

api.event = {
	findEventById: function(id, callback){
		$.ajax({
            type:'GET',
            url: document.config.host + '/events/' + id,
            success:function(data){
                callback(data);
            },
            error:function(err){
                callback(err);
            },
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json'
        });
	}
}


App.controller('event', function (page, id) {
	console.log(id.id);
	// var _event = api.getEventById(id);

	document.api.event.findEventById(id.id, function (response){
		if(response.success){
			var data = response.data;
			// $(page).find(".event-title").append(data.title);
			$(page).find('.event-image').append('<img style="height:100%;width:100%;box-shadow: 0px 1px 10px #888888;" src="'+document.config.host +'/events/poster/'+ id.id+'" />');
			$(page).find(".event-date").append(data.date);
			$(page).find(".event-time").append("From: " + data.startTime + " | To: " + data.endTime);
			$(page).find(".event-address").append(data.address);
			$(page).find(".event-location").append(data.location);
			$(page).find(".event-desc").append(data.description);

			$(page).find(".event-status").on('click', function (){
				App.dialog({
					title        : 'Select whether or not you want to join this event.',
					orangeButton : 'Going',
					redButton    : 'Maybe',
					greenButton  : 'Not going',
				}, function (choice) {
					switch (choice) {
						case 'orange':
      						// do something
      						break;
      					case 'red':
      						// do something
      						break;
      					case 'green':
      						// do something
      						break;
			  		}
				});
			});
		}
		else {

		}

	})

	// $(page).find('#rsvp').hide();

	//load ui
});

