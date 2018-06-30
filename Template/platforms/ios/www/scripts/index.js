// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    
    function onPause() {
        console.log("paused");
        // This application has been suspended. Save application state here.

    };

    function onResume() {
        console.log("resumed");
        // This application has been reactivated. Restore application state here.

    };
    
    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        //if (!checkNetConnection())
        //{
        
        //    //ons.notification.alert({ message: 'Check your network connection!!', title: 'Access failed', animation: 'slide', buttonLabel: 'Close' });
        //    while (!checkNetConnection())
        //    { }
       
            
        //}
    };

    function checkNetConnection() {
        var xhr = new XMLHttpRequest();
        var file = "https://malla.lk/dot.png";
        var r = Math.round(Math.random() * 10000);
        xhr.open('HEAD', file + "?subins=" + r, false);
        try {
            xhr.send();
            if (xhr.status >= 200 && xhr.status < 304) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };


    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

} )();