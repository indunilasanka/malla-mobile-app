myApp.factory('SignUp', function () {
    var obj = {};
    return obj;
});

myApp.controller('signUpCtrl', function ($scope, $http, AppContext, SignUp, Enum) {

    AppContext.setBaseUrl(resultBaseUrl);
    $scope.info = SignUp;
    angular.copy(null, $scope.info);

    ons.ready(function () {

        var supportPhone = "+94113647647";
        var supportMobile = "+94717469082";

        $scope.validateForm = function (form) {
            $scope.info.Name = $scope.info.firstName;
            if (form.$valid) {
                EmailSending.show();
                $('#singupFinalMessage').fadeIn();
                $('#singupFinalMessage').text("Sending your Mail");
                var request = {
                    method: 'GET',
                    url: "https://malla.lk/registerapi.php?Email=" + $scope.info.Email + "&Name=" + $scope.info.Name + "&Phone=" + $scope.info.Phone + "&Message=" + $scope.info.Message + "&City=" + $scope.info.countryValue,                    
                }

                $http(request).then(
                    function (response) {
                        if (response.data == 1) {
                            $('#EmailLoadingIcon').fadeOut();
                            $('#singupFinalMessage').fadeOut();

                            setTimeout(function () {
                                $('#EmailSuccessfulIcon').fadeIn();
                                $('#singupFinalMessage').text("E-Mail Sent");
                                $('#singupFinalMessage').fadeIn();
                            }, 500);


                            setTimeout(function () {
                                EmailSending.hide();
                            }, 2000);
                        }
                        else {
                            EmailSending.hide();
                            ons.notification.alert({ message: 'Email Sending failed!', title: null, animation: 'slide', buttonLabel: 'Try Again' });
                        }
                    },
                    function (error) {
                        EmailSending.hide();
                        logInfo(request, error, 'warn');
                    });
            }
        };

        $scope.$watch('filteredItems', function () {
            $scope.info.location = $scope.filteredItems[0];
            //$scope.$apply();
        });

        $scope.countryChange = function () {
            $scope.info.countryValue = $scope.info.location.Value;
            $scope.$apply();
        };

        $scope.formClear = function () {
            $scope.info.Email = "";
            angular.copy(null, $scope.info);
        };

        $scope.errorMsg = function (val) {
            if (val == "firstName" || val == "buttonPress") {
                $("#firstName").fadeOut();
                $("#firstName").fadeIn();
            }
            if (val == "lastName" || val == "buttonPress") {
                $("#lastName").fadeOut();
                $("#lastName").fadeIn();
            }
            if (val == "SignUpemailAdress" || val == "buttonPress") {
                $("#SignUpemailAdress").fadeOut();
                $("#SignUpemailAdress").fadeIn();
            }
            if (val == "SignUpCountry" || val == "buttonPress") {
                $("#SignUpCountry").fadeOut();
                $("#SignUpCountry").fadeIn();
            }

        };

        $scope.callNumber = function () {

            window.plugins.CallNumber.callNumber(function () {
                //
            },
            function (e) {
                ons.notification.alert({ message: 'Call Failed:' + e, title: null, buttonLabel: 'OK' });
            },
            supportPhone);
        };


        $scope.init = function () {

            var mapOptions = { zoom: 16 };
            var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);
            var pos1 = new google.maps.LatLng(6.8302282, 79.8655103);

            var mapcords = new google.maps.Marker({
                position: pos1,
                map: map,
                title: "No.21,Samudrasanna Road,Mount-Lavinia",
                animation: google.maps.Animation.BOUNCE,
                label: "No.21,Samudrasanna Road,Mount-Lavinia",
                labelClass: "labels"
            });

            map.setCenter(pos1);

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
        };

        $scope.sendSMS = function () {

            var message = "Hi,\nI'm interested in malla online shop. Please contact me for further disscussion.\n\nthanks";
            var options = {
                replaceLineBreaks: false,
                android: { intent: 'INTENT' }
            };

            var success = function () {
                //
            };
            var error = function (e) {
                ons.notification.alert({ message: 'Message Failed:' + e, title: null, buttonLabel: 'OK' });
            };
            sms.send(supportMobile, message, options, success, error);
        };
    });
});