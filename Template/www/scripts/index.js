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
        //checkNetConnection();
        $('#button').click(getDatos);

        //if (!checkNetConnection())
        //{
        
        //    //ons.notification.alert({ message: 'Check your network connection!!', title: 'Access failed', animation: 'slide', buttonLabel: 'Close' });
        //    while (!checkNetConnection())
        //    { }
       
            
        //}
    };

    function getDatos() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            maximunAge: 300000,
            timeout: 10000,
            enableHighAccuracy: true
        });
    };

    function onSuccess(position) {
        var cusLat = 40;
        var cusLon = -40;

        //document.getElementById("txtLat").value = cusLat;
        //document.getElementById("txtLon").value = cusLon;

        try {
            var coords = new google.maps.LatLng(cusLat, cusLon);

            var opciones = {
                center: coords, zoom: 15
            };

            var mapa = new google.maps.Map(document.getElementById("map"), opciones);
            var marcador = new google.maps.Marker({
                position: coords,
                map: mapa,
                title: "Mi ubicación",
                animation: google.maps.Animation.DROP
            });
        }
        catch (err) {
            console.log(err.message);
        }
    };

    function onError(err) {
        console.log("codigo de err:" + err.code + "  msj=" + err.message);
    };


    function checkNetConnection() {

        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        alert('Connection type: ' + states[networkState]);

        /*var xhr = new XMLHttpRequest();
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
        }*/
    };

    function navigatetohome()
    {
        ons.notification.alert({ message: 'Could not find any Categories', title: 'Empty Result', animation: 'slide', buttonLabel: 'Close' });
    }

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

} )();