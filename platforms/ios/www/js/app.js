// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    // setTimeout(function (){
    //     $('.splash').transition({ y: '-100%' }, 2500, 'ease');
    //     $('.home-a').transition({ y: '-100%' }, 2500, 'ease');
    // }, 1500);

    document.addEventListener('deviceready', function () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
        FastClick.attach(document.body);
    }, false);

    /* ---------------------------------- Local Variables ---------------------------------- */
    var adapter = new MemoryAdapter();
    adapter.initialize().done(function () {
        console.log("Data adapter initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */


    /* ---------------------------------- Local Functions ---------------------------------- */
  

}());