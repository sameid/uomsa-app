var STATUS_GOING = 'going';
var STATUS_MAYBE = 'maybe';
var STATUS_NOT_GOING = 'not-going';

App.controller('event', function (page, id) {
	var eventId = id.id;
	var userId;
	if (document.currentUser()){
		userId = document.currentUser().hash;
		$(page).find('.event-signin').hide();
	}
	else {
		$(page).find('.event-status').hide();
	}

	 _GET('/event/' + eventId, 'json', function (response){
		if(response){

			_GET('/event/status/'+ eventId + '/' + userId, 'json', function (_response){
				console.log(_response);
				var _data = _response;
				if (_data.success){
					$(page).find('.event-status').empty();
					$(page).find('.event-status').append(_data.status);
				}
			});

			var data = response;
			// $(page).find(".event-title").append(data.title);
			$(page).find('.event-image').append('<img class="small-drop" style="height:100%;width:100%;" src="'+document.config.host +'/events/'+eventId+'/poster" />');
			$(page).find(".event-date").append(moment(data.date).format("dddd, MMMM Do YYYY"));
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
							_POST( '/events/status', {'event_hash': eventId,'user_hash': userId,'status': STATUS_GOING}, 'form-data', function(response){
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
      						_POST( '/events/status', {'event_hash': eventId,'user_hash': userId,'status': STATUS_MAYBE}, 'form-data', function(response){
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
      						_POST( '/events/status', {'event_hash': eventId,'user_hash': userId,'status': STATUS_NOT_GOING}, 'form-data', function(response){
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

