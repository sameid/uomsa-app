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
			$(page).find('.event-image').append('<img class="small-drop" style="height:100%;width:100%;" src="'+document.config.host +'/events/poster/'+ id.id+'" />');
			$(page).find(".event-date").append(data.date);
			$(page).find(".event-time").append("From: " + data.startTime + " | To: " + data.endTime);
			$(page).find(".event-address").append(data.address);
			$(page).find(".event-desc").append(data.description);

			if (data.location){
				var canvas = document.getElementById("event-map-canvas")
				canvas.setAttribute('style', "height:70%;width:100%");
				canvas.className = canvas.className + " small-drop";

				var latLng = new google.maps.LatLng(data.location.lat, data.location.lng);
				var mapOptions = {
					center: latLng,
					zoom: 16
				};

				var map = new google.maps.Map(canvas, mapOptions);

				var marker = new google.maps.Marker({
					position: latLng,
					title:data.address			
				});

				// To add the marker to the map, call setMap();
				marker.setMap(map);
			}
			

			$(page).find(".event-status").on('click', function (){
				App.dialog({
					title        : 'Select whether or not you want to join this event.',
					goingButton : 'Going',
					maybeButton    : 'Maybe',
					notgoingButton  : 'Not going',
				}, function (choice) {
					switch (choice) {
						case 'going':
      						// do something
      						break;
      					case 'maybe':
      						// do something
      						break;
      					case 'notgoing':
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

