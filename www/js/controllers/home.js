var api = document.api;

api.home = {
    upcomingEvents : function(callback){
        $.ajax({
            type:'GET',
            url: document.config.host + '/events/upcoming',
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
    eventView : function (hash, title){
        return ('<div class="event-item" id="'+hash+'">'+
        '<img src="' + document.config.host + '/events/poster/' + hash + '"></img>'+
        '<div class="text">'+
        '<span>'+title+'<span>'+
        '</div>'+
        '</div>');
    }
}

App.controller('home', function (page) {

    if (document.userHasSession())$($(page).find(".sign-in-home")).hide();
    else $($(page).find(".account-home")).hide();

    var el = $(page).find('.upcoming-list');

    api.home.upcomingEvents(function (response){
        var t = response.data.length;

        $(page).find('.upcoming-list').attr('style', 'width:'+((t*200)+12) + 'px;');

        if (response.success){
            var events = response.data;
            events.forEach(function(item){
                var saltedItem = home_utils.eventView(item.hash, item.title);
                el.append(saltedItem);
            });
             $(page).find(".event-item").on('click', function(){
                // console.log(this.id);
                App.load('event', {id:this.id});
            });
        }
        else{
        }
    });
  
    // if (document.userHasSession()){
    //     currentUser = document.currentUser;
    //     var el_ = $(page).find('.attending');
    //     var attending_list = $(el_).find('event-list');
    //     api.home.subscribedEvents(currentUser.hash, function (err, data){
    //         if (err) console.error(err);
    //         else if (data){
    //             data.events.forEach(function(item){
    //                 attending_list.append(eventView(item.hash, item.img, item.title));
    //             });
    //         }

    //     });
    // }

});

