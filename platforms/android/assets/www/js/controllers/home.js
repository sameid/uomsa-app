var home_utils = {
    eventView : function (hash, title){
        return ('<div class="event-item" id="'+hash+'">'+
        '<img src="' + document.config.host + '/event/' + hash + '/poster"></img>'+
        '<div class="text">'+
        '<span>'+title+'<span>'+
        '</div>'+
        '</div>');
    },
    //quicked fix of my lyfe
    attendView : function(hash, title){
        return ('<div class="event-item attend" id="'+hash+'">'+
        '<img src="' + document.config.host + '/event/' + hash + '/poster"></img>'+
        '<div class="text">'+
        '<span>'+title+'<span>'+
        '</div>'+
        '</div>');
    }
}

App.controller('home', function (page) {

    if (document.currentUser())$($(page).find(".sign-in-home")).hide();
    else $($(page).find(".account-home")).hide();

    var el = $(page).find('.upcoming-list');

    _GET('/upcomingEvents','json', function (response){
        var t = response.length;

        $(page).find('.upcoming-list').attr('style', 'width:'+((t*200)+12) + 'px;');

        if (response){
            var events = response;
            events.forEach(function(item){
                var saltedItem = home_utils.eventView(item._id, item.title);
                el.append(saltedItem);
            });
            $(page).find(".event-item").on('click', function(){
                App.load('event', {id:this.id});
            });
            
        }
        else{
            //do nothing for now
        }
    });
  
    var el_attending = $(page).find('.attending-list');
    
    if (document.currentUser()){
        var user = document.currentUser();

        _GET('/attending/' + user._id, 'json', function(response){
            var t = response.length;
            if (t > 0){
                $(page).find('.attending-list').attr('style', 'width:'+((t*200)+12) + 'px;');
                if (response){
                    var events = response;
                    events.forEach(function(item){
                        var saltedItem = home_utils.attendView(item._id, item.title);
                        el_attending.append(saltedItem);
                    });
                    $(page).find(".attend").on('click', function(){
                        App.load('event', {id:this.id});
                    });
                }
                else{
                    //do nothing for nowa
                } 
            }
            else {
                $(page).find('.attending').hide(); 
            }
        });
    }
    else {
        $(page).find('.attending').hide();
    }


});

