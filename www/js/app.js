// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    $('.overlay')

    // setTimeout(function (){
    //     $('.splash').transition({ y: '-100%' }, 2500, 'ease');
    //     $('.home-a').transition({ y: '-100%' }, 2500, 'ease');
    // }, 1500);
    FastClick.attach(document.body);
        
    window.alert = function (message){
                App.dialog({
                    title: message,
                    okButton : 'OK'
                }, function (choice) {
                    switch (choice) {
                        case 'OK':
                        break;
                    }
                });
            }

    // document.addEventListener('deviceready', function () {
    //     FastClick.attach(document.body);
    //     if (navigator.notification) { // Override default HTML alert with native dialog
    //         // window.alert = function (message) {
    //         //     navigator.notification.alert(
    //         //         message,    // message
    //         //         null,       // callback
    //         //         "Workshop", // title
    //         //         'OK'        // buttonName
    //         //     );
    //         // };
    //         window.alert = function (message){
    //             App.dialog({
    //                 title: message,
    //                 okButton : 'OK'
    //             }, function (choice) {
    //                 switch (choice) {
    //                     case 'OK':
    //                     break;
    //                 }
    //             });
    //         }
    //     }
    // }, false);

    /* ---------------------------------- Local Variables ---------------------------------- */
    var adapter = new MemoryAdapter();
    adapter.initialize().done(function () {
        console.log("Data adapter initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */


    /* ---------------------------------- Local Functions ---------------------------------- */

    document.userHasSession = function (){
        var hasSession = window.localStorage.getItem("isLoggedIn");
        if (hasSession == "true") return true;
        else return false;
    }

    document.currentUser = function (){
        var user  = window.localStorage.getItem("currentUser");
        if (user) return JSON.parse(user);
        else return false
    }

    document.config = {
        host:"http://192.168.1.117:8080/api"
    }

    document.api = {}


}());