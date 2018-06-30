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

        navigateHome.hide();
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
           
            $scope.view = function (pid,cid,name) {
                //var ref = window.open('https://malla.lk/', '_blank', 'location=no,toolbar=no,zoom=no');
                $scope.homeNavigator.pushPage('categories.html', { animation: defaultTransition, pid: pid, cid: cid, name: name });
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

myApp.controller('ctrCtrl', function ($scope, $http, $timeout, $window, $sce, AppContext, Enum) {
    ons.ready(function () {
        loadingData.show();
        var src;
        var PID = homeNavigator.getCurrentPage().options.pid;
        var CID = homeNavigator.getCurrentPage().options.cid;
        var NAME = homeNavigator.getCurrentPage().options.name;
        $scope.Name = "products"

        if (CID == 0)
        {
            src = "https://malla.lk/index.php?frame=aaa&route=product/category&path=" + PID;
            $scope.url =  $sce.trustAsResourceUrl(src);
        }
        else
        {
            src = "https://malla.lk/index.php?frame=aaa&route=product/category&path=" + PID + "_" + CID;
            $scope.url = $sce.trustAsResourceUrl(src);
        }

        var request = {
            method: 'GET',
            url: $scope.url,
        }
   
        $http(request).then(
            function (response) { 
                if (response != "")
                {
                    loadingData.hide();
                }
            });
                
                
        
        $scope.init = function () {
            
        }
    });
});



myApp.controller('navigatehome', function ($scope, $http, $timeout, $window, $sce, AppContext, Enum) {
    ons.ready(function () {
        $scope.navigatetohome = function () {
            $scope.homeNavigator.pushPage('home.html', { });
        }
    });
});


//function navigateTonewCustContinue() {
//    newCustomersaveOrContinue = 'continueToAgreement';
//    homeNavigator.pushPage('newCustomer.html', { animation: defaultTransition, }), naviDialog.hide();
//}

