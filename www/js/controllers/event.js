var api = document.api;

var STATUS_GOING = 'going';
var STATUS_MAYBE = 'maybe';
var STATUS_NOT_GOING = 'not-going';

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
	},
	userStatus: function (event_id, user_id, new_status, callback){
		$.ajax({
			type:'POST',
			url: document.config.host + '/events/status',
			data: {
				'event_hash': event_id,
				'user_hash': user_id,
				'status': new_status
			},
			success:function(data){
				callback(data);
			},
			error:function(err){
				callback(err);
			},
			crossDomain: true,
			dataType:'form-data'
		});
	},
	getUserStatus: function (event_id, user_id, callback){
		$.ajax({
			type:'GET',
			url:document.config.host + '/events/status',
			data: {
				'event_hash': event_id,
				'user_hash': user_id
			},
			success:function(data){
                callback(data);
            },
            error:function(err){
                callback(err);
            },
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'form-data'
		})
	}

}


App.controller('event', function (page, id) {
	var eventId = id.id;
	var userId;
	if (document.currentUser()){
		userId = document.currentUser().hash;
	}

	document.api.event.findEventById(eventId, function (response){
		if(response.success){

			document.api.event.getUserStatus(eventId, userId, function (_response){
				_data = JSON.parse(_response.responseText);
				if (_data.success){
					if (_data.status == STATUS_GOING){
						$(page).find('.event-status').empty();
						$(page).find('.event-status').append('RSVP - Going');
					}
					else if (_data.status == STATUS_MAYBE){
						$(page).find('.event-status').empty();
						$(page).find('.event-status').append('RSVP - Maybe');
					}
					else if (_data.status == STATUS_NOT_GOING){
						$(page).find('.event-status').empty();
						$(page).find('.event-status').append('RSVP - Not Going');
					}
				}

			});

			var data = response.data;
			// $(page).find(".event-title").append(data.title);
			$(page).find('.event-image').append('<img class="small-drop" style="height:100%;width:100%;" src="'+document.config.host +'/events/poster/'+eventId+'" />');
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
							document.api.event.userStatus(eventId, userId, STATUS_GOING, function(response){
								if (response.success){
									$(page).find('.event-status').empty();
									$(page).find('.event-status').append('RSVP - Going');
								}
								else {
									//perform some alert
								}
							});
      						break;
      					case 'maybe':
      						document.api.event.userStatus(eventId, userId, STATUS_MAYBE, function(response){
      							if (response.success){
									$(page).find('.event-status').empty();
									$(page).find('.event-status').append('RSVP - Maybe');
      							}
      							else {
      								alert('')
      							}
							});
      						break;
      					case 'notgoing':
      						document.api.event.userStatus(eventId, userId, STATUS_NOT_GOING, function(response){
      							//don't forget to check response 
								$(page).find('.event-status').empty();
								$(page).find('.event-status').append('RSVP - Not Going');
							});
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

