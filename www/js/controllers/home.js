$(document).ready(function (){

//Local functions
var eventView = function (id, img, title){

	return ('<div class="event-item" id="'+id+'">'+
		'<img src="' +img+ '"></img>'+
		'<div class="text">'+
		'<span>'+title+'<span>'+
		'</div>'+
		'</div>');
}

//REST Api Stuff
var api = {
	getUpcomingEvents : function(){
		//make rest-api call
	},
	getSubscribedEvents : function(){
		//make rest-api call
	}
}

App.controller('home', function (page) {
	// var el = $(page).find('.upcoming');
	// var el_ = $(page).finc('.attending');
	
	// var upcoming_list = $(el).find('event-list');
	// var attending list = $(el_).find('event-list');

	// var upcoming_events = api.getUpcomingEvents();
	// var attending_events = api.getAttendingEvents();

	// upcoming_events.forEach(function(obj){
	// 	upcoming_list.append(eventView(obj.id, obj.img, obj.title));
	// });

	// attending_events.forEach(function(obj){
	// 	attending_list.append(eventView(obj.id, obj.img, obj.title));
	// });

});

$(".event-item").click(function(){
	var id = $(this).id;
	App.load('event', id);
});

});

