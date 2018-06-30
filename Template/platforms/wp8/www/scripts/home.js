myApp.factory('ExCustomer', function ($rootScope) {
    $rootScope.obj = {};
    return {
        setCustomerInfo: function (cus) {
            $rootScope.obj = cus;
        },

        getCustomerInfo: function () {
            return $rootScope.obj;
        }
    }
});

//myApp.controller('homeNavigation', function ($scope, ExCustomer, AppContext, $http, Enum) {
//    ons.enableDeviceBackButtonHandler();
//    function searchCustomer(phone, type) {

//        if (phone != "") {
//            loadingCustomers.show();
//            var request = {
//                method: 'POST',
//                //url: AppContext.getUrl(Enum.Url.GetCustomerInfo, [phone, AppContext.getUserContext().ClientId]),
//            }

//            $http(request).then(
//                function (response) {
//                    if (response.data == "") {
//                        loadingCustomers.hide();
//                        ons.notification.confirm({
//                            title: 'Customer Not Found!',
//                            messageHTML: "Do you want to Create a New Customer?",
//                            buttonLabels: ["NO", "YES"],
//                            callback: function (idx) {
//                                switch (idx) {
//                                    case 0:
//                                        break;
//                                    case 1:
//                                        homeNavigator.pushPage('newCustomer.html', { animation: defaultTransition, phoneNumber: phone, navigateFrom: type });
//                                }
//                            }
//                        });
//                    } else {
//                        loadingCustomers.hide();
//                        $scope.customer = response.data;
//                        ExCustomer.setCustomerInfo(response.data);
//                        $scope.customer.DateOfBirth = ConvertJsonDateString(response.data.DateOfBirth, 'date');
//                        $scope.customer.LicenseExpiryDate = ConvertJsonDateString(response.data.LicenseExpiryDate, 'date');
//                        $scope.customer.LicenseIssueDate = ConvertJsonDateString(response.data.LicenseIssueDate, 'date');
//                        $scope.customer.LicenseExpiryDate = $scope.customer.LicenseExpiryDate == null ? "--" : $scope.customer.LicenseExpiryDate;
//                        $scope.customer.LicenseIssueDate = $scope.customer.LicenseIssueDate == null ? "--" : $scope.customer.LicenseIssueDate;
//                        $scope.customer.CreditCardExpiryDate = ConvertJsonDateString(response.data.CreditCardExpiryDate, 'date');
//                        $scope.customer.CreditCardExpiryDate = $scope.customer.CreditCardExpiryDate == null ? "--" : $scope.customer.CreditCardExpiryDate;

//                        homeNavigator.pushPage('exCustomer.html', { animation: defaultTransition, navigateFrom: type, resData: null });
//                    }
//                },
//            function (error) {
//                loadingCustomers.hide();
//                logInfo(request, error, 'warn');
//            });
//        }
//        else {
//            ons.notification.alert({ message: 'Invalid Phone Number!' });
//        }
//    }

//    function searchCustomerConfirm(type) {

//        ons.notification.confirm({
//            title: 'Search Customer',
//            messageHTML: "<input type='tel' id='customersPhone' class='search-input' placeholder='Phone Number' style=hieght'15px;'>",
//            buttonLabels: ["Cancel", "Search"],
//            callback: function (idx) {
//                var phone = $('#customersPhone').val();
//                switch (idx) {
//                    case 0:
//                        break;
//                    case 1:
//                        searchCustomer(phone, type);
//                        break;
//                }
//            }
//        });
//    }

//    $scope.newAgreement = function () {
//        searchCustomerConfirm(Enum.NavigateFrom.Agreement);
//    }

//    $scope.newReservation = function () {
//        searchCustomerConfirm(Enum.NavigateFrom.Reservation);
//    }

//    $scope.vehicleStatus = function () {
//        homeNavigator.pushPage('vehicleStatus.html', { animation: defaultTransition });
//    }

//    $scope.newCustomer = function () {
//        homeNavigator.pushPage('newCustomer.html', { animation: defaultTransition, navigateFrom: Enum.NavigateFrom.Home });
//    }
//});

//myApp.controller('homeSearchOperator', function ($scope) {

//    $scope.searchModes = ['Select on Generic Name', 'Select on Brand Name'];
//    $scope.searchMode = $scope.searchModes[0];
//    $scope.isAgreementSearch = true;

//    $scope.changeSearch = function () {
//        $scope.isAgreementSearch = $scope.searchMode == $scope.searchModes[0];
//        $scope.isReservationSearch = $scope.searchMode == $scope.searchModes[1];
//    }
//});

myApp.controller('homeCategorySearch', function ($scope, $http, $timeout, $window, AppContext, Enum) {
    
    ons.ready(function () {
        loadingData.show();
        var request = {
            method: 'GET',
            url: "https://malla.lk/categoryapi.php",
        }
   
        $http(request).then(
            function (response) {
                
                if (response.data == "" || response.data.length == 0) {
                    $scope.Categories = null;
                    $scope.resSearching = false;
                    loadingData.hide();
                    ons.notification.alert({ message: 'Could not find any Categories', title: 'Empty Result', animation: 'slide', buttonLabel: 'Close' });
                }

                else {
                    $scope.avCategories = response.data;
                    angular.forEach($scope.avCategories, function (value, key) {
                        if (value.IMAGE != "") {
                            value.IMAGE = "https://malla.lk/image/" + value.IMAGE;
                            var values = value.IMAGE.split("catelog");
                            value.IMAGE = values[0] + "/" + values[1];
                        }
                        else {
                            value.IMAGE = "https://malla.lk/image/catalog/logo.png" + value.IMAGE;
                        }
                    });
                    $scope.Categories = $scope.avCategories;
                    loadingData.hide();
                }
            },
        function (error) {
            logInfo(request, error, 'warn');
        });
                
       

            $scope.hideList = function () {
                $scope.fadeSearch = true;
                $timeout(function () {
                    $scope.hideSearch = true;
                }, 500);
            }
           
            $scope.view = function (id) {
                $scope.homeNavigator.pushPage('categories.html', { animation: defaultTransition, id: id });
            }
            $scope.isOdd = function (id) {
                var remainder = id % 2;
                if (remainder == 0) { return true; }
                else { return false; }      
            }
            
            //loadingData.hide();

        });
    
    window.addEventListener("orientationchange", function () {
        $scope.deviceWidth = $window.innerWidth;
        $scope.$apply();
    });
});



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

// Controllers for aload agreement list
myApp.controller('homeAgreementSearch', function ($scope, $http, $timeout, $window, AppContext, Enum) {

    $scope.agStatus = Enum.AgreementStatus;
    $scope.deviceWidth = $window.innerWidth;

    ons.ready(function () {
        // $scope.agType = Enum.AgreementStatus.All;

        $scope.hideSearch = true;
        $scope.hideProgress = true;
        $scope.info = {};
        var AgListCount;

        $scope.search = function () {
            $scope.agreSearching = true;
            $scope.listCount = '';
            $scope.isColumShow = false;

            $scope.fadeSearch = true;
            $timeout(function () {
                $scope.hideSearch = true;
            }, 500);

            $scope.fadeProgress = false;
            $timeout(function () {
                $scope.hideProgress = false;
            }, 500);



            var request = {
                method: 'GET',
                url: "http://mediapp.host78.com/search.php?Brand=&Chemical=" + $scope.info.customerName,
            }

            $http(request).then(
            function (response) {

                $scope.fadeProgress = true;
                $timeout(function () {
                    $scope.hideProgress = true;
                }, 500);

                if (response.data == "") {
                    console.log(request.url + "load failed!");
                    $scope.Agreements = null;
                    $scope.agreSearching = false;
                    ons.notification.alert({ message: 'Could not find any Data', title: 'Empty Result', animation: 'slide', buttonLabel: 'Close' });
                    document.getElementById("searchContent").style.height = "0px";

                } else {
                    $scope.agreSearching = false;
                    $scope.fadeSearch = false;
                    $timeout(function () {
                        $scope.hideSearch = false;
                    }, 500);

                    $scope.listCount = response.data.length + ' Results';
                    $scope.isColumShow = response.data.length > 0 ? true : false;
                    $scope.Agreements = response.data;
                    if (response.data.length < 10) {

                        AgListCount = response.data.length;
                        document.getElementById("searchContent").style.height = AgListCount * 45.5 + 1 + "px";
                    }
                    else {

                        document.getElementById("searchContent").style.height = "455px";
                    }
                }
            },
            function (error) {
                $scope.agreSearching = false;
                $scope.fadeProgress = true;
                $timeout(function () {
                    $scope.hideProgress = true;
                }, 500);

                logInfo(request, error, 'warn');
            });
        }

        $scope.hideList = function () {

            $scope.listCount = '';
            $scope.isColumShow = false;

            $scope.fadeSearch = true;
            $timeout(function () {
                $scope.hideSearch = true;
            }, 500);
        }

        $scope.view = function (id) {
            $scope.homeNavigator.pushPage('viewAgreement.html', { animation: defaultTransition, id: id, navigateFrom: Enum.NavigateFrom.Home });

        }
    });
});

myApp.controller('homeGetCustomer', function ($scope) {
    ons.ready(function () {

        $scope.getCustomer = function () {
            naviDialog.hide();
            homeNavigator.pushPage('exCustomer.html', { animation: defaultTransition });
        };
    });
});

//function navigateTonewCustContinue() {
//    newCustomersaveOrContinue = 'continueToAgreement';
//    homeNavigator.pushPage('newCustomer.html', { animation: defaultTransition, }), naviDialog.hide();
//}

