﻿myApp.factory('SignUp', function () {
    var obj = {};
    return obj;
});

myApp.controller('signUpCtrl', function ($scope, $http, AppContext, SignUp, Enum) {

    AppContext.setBaseUrl(resultBaseUrl);
    $scope.info = SignUp;
    angular.copy(null, $scope.info);

    //load countries
    var url = AppContext.getUrl(Enum.Url.GetCountries, [4]);

    var request = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    $http(request).then(
        function (response) {
            $scope.countries = response.data;
            $scope.info.location = $scope.countries[0];
        },
        function (error) {
            logInfo(request, error, 'warn');
        });

    ons.ready(function () {

        var supportPhone = "+94712977477";

        $scope.validateForm = function (form) {
            $scope.info.Name = $scope.info.firstName + " " + $scope.info.lastName;
            if (form.$valid) {
                EmailSending.show();
                $('#singupFinalMessage').fadeIn();
                $('#singupFinalMessage').text("Sending your Mail");
                
                var request = {
                    method: 'GET',
                    url: "http://mediapp.host78.com/register.php?Username=" + $scope.info.Email + "&Name=" + $scope.info.Name + "&Phone=" + $scope.info.Phone + "&Message=" + $scope.info.Message + "&Country=" + $scope.info.countryValue,
                }

                $http(request).then(
                    function (response) {
                        if (response.data == 0) {
                            $('#EmailLoadingIcon').fadeOut();
                            $('#singupFinalMessage').fadeOut();

                            setTimeout(function () {
                                $('#EmailSuccessfulIcon').fadeIn();
                                $('#singupFinalMessage').text("E-Mail Sent");
                                $('#singupFinalMessage').fadeIn();
                            }, 500);


                            setTimeout(function () {
                                EmailSending.hide();
                                LoginNavigator.popPage({ animation: defaultTransition });
                            }, 2000);
                        }
                        else if (response.data > 0) {
                            EmailSending.hide();
                            ons.notification.alert({ message: 'Email Already Exists!', title: null, animation: 'slide', buttonLabel: 'Try Again' });
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
                ons.notification.alert({ message: 'Message Failed:' + e, title: null, buttonLabel: 'OK' });
            },
            supportPhone);
        };

        $scope.sendSMS = function () {

            var message = "Hi,\nI'd like to know more about this software. Please contact me for further disscussion.\n\nthanks";
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
            sms.send(supportPhone, message, options, success, error);
        };
    });
});