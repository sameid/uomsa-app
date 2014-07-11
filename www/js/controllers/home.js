var api = document.api;

api.home = {
    upcomingEvents : function(callback){
        $.ajax({
            type:'GET',
            url: document.config.host + '/upcoming_events',
            success:function(data){
                callback(null, data);
            },
            error:function(err){
                callback(err, null);
            },
            crossDomain: true,
            dataType: 'jsonp'
        });
    },
    subscribedEvents : function(hash, callback){
        $.ajax({
            type:'GET',
            url: document.config.host + '/subscribed_events',
            data: {
                "hash":hash,
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

var home_utils = {
    eventView : function (id, img, title){
        return ('<div class="event-item" id="'+id+'">'+
        '<img src="' +img+ '"></img>'+
        '<div class="text">'+
        '<span>'+title+'<span>'+
        '</div>'+
        '</div>');
    }
}

$(".event-item").click(function(){
    var id = $(this).id;
    App.load('event', id);
});


App.controller('home', function (page) {
    console.log(document.userHasSession());
    if (document.userHasSession())$($(page).find(".sign-in-home")).hide();
    else $($(page).find(".account-home")).hide();

    var el = $(page).find('.upcoming');
    var upcoming_list = $(el).find('event-list');
    
    api.home.upcomingEvents(function (err, data){
        if (err) console.error(err);
        else if (data){
            data.events.forEach(function(item){
                upcoming_list.append(eventView(item.hash, item.img, item.title));
            });
        }
    });
  
    if (document.userHasSession()){
        currentUser = document.currentUser;
        var el_ = $(page).find('.attending');
        var attending_list = $(el_).find('event-list');
        api.home.subscribedEvents(currentUser.hash, function (err, data){
            if (err) console.error(err);
            else if (data){
                data.events.forEach(function(item){
                    attending_list.append(eventView(item.hash, item.img, item.title));
                });
            }

        });
    }

});

