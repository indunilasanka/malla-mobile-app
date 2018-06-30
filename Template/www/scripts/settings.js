myApp.controller('settingController', function ($scope, $translate) {
    ons.ready(function () {

        //set theme
        var value = window.localStorage.getItem("theme");
        value = (value === "" || value == null) ? "blue-basic" : value;
        document.getElementById(value).checked = true;
        
        //set language
        var lang = window.localStorage.getItem("lang");
        $scope.lang = (lang == null) ? 'en' : lang;
       
        $scope.setTheme = function (colorTheme) {

            var url = 'lib/onsen/css/onsen-css-components-' + colorTheme + '-theme.css';
            $('#themeScript').attr('href', url);
            document.getElementById(colorTheme).checked = true;
            window.localStorage.setItem("theme", colorTheme);
           
        }

        $scope.setLanguage = function(lang) {
            
            $translate.use(lang);
            window.localStorage.setItem("lang", lang);
        };

    });
});

myApp.controller('mapController', function ($scope, $translate) {
    ons.ready(function () {

        ////set theme
        //var value = window.localStorage.getItem("theme");
        //value = (value === "" || value == null) ? "blue-basic" : value;
        //document.getElementById(value).checked = true;

        ////set language
        //var lang = window.localStorage.getItem("lang");
        //$scope.lang = (lang == null) ? 'en' : lang;

        $scope.init = function () {

            var mapOptions = { zoom: 11 };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var pos1 = new google.maps.LatLng(6.8498215, 79.8643877);
            var pos2 = new google.maps.LatLng(6.8321086, 79.8641412);
            var pos3 = new google.maps.LatLng(6.8173471, 79.8714395);
            var pos4 = new google.maps.LatLng(6.8396703, 79.8825949);
            var pos5 = new google.maps.LatLng(6.8721341, 79.8888619);
            var pos6 = new google.maps.LatLng(6.8884089, 79.8844378);
            var pos7 = new google.maps.LatLng(6.910078, 79.8922214);
            var pos8 = new google.maps.LatLng(6.884486, 79.9015947);

            var mapcords = new google.maps.Marker({
                position: pos1,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos2,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos3,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos4,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos5,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos6,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos7,
                map: map,
                animation: google.maps.Animation.DROP
            });
            var mapcords = new google.maps.Marker({
                position: pos8,
                map: map,
                animation: google.maps.Animation.DROP
            });
           
            map.setCenter(pos5);

            /* var cusLat = 6.9248195;
            var cusLon = 79.833288;

            //document.getElementById("txtLat").value = cusLat;
            //document.getElementById("txtLon").value = cusLon;

            try {
                var coords = new google.maps.LatLng(cusLat, cusLon);

                var options = {
                    center: coords, zoom: 15
                };

                var map = new google.maps.Map(document.getElementById("map"), options);
                var mapcords = new google.maps.Marker({
                    position: coords,
                    map: map,
                    animation: google.maps.Animation.DROP
                });
            }
            catch (err) {
                console.log(err.message);
            } */
            /*navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                maximunAge: 300000,
                timeout: 100000,
                enableHighAccuracy: true
            });*/
        }
        /*
        function onSuccess(position) {
            var cusLat = 6.9248195;
            var cusLon = 79.833288;

            //document.getElementById("txtLat").value = cusLat;
            //document.getElementById("txtLon").value = cusLon;

            try {
                var coords = new google.maps.LatLng(cusLat, cusLon);

                var options = {
                    center: coords, zoom: 15
                };

                var map = new google.maps.Map(document.getElementById("map"), options);
                var mapcords = new google.maps.Marker({
                    position: coords,
                    map: map,
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

        $scope.setLanguage = function (lang) {

            $translate.use(lang);
            window.localStorage.setItem("lang", lang);
        };
        */
    });
});

