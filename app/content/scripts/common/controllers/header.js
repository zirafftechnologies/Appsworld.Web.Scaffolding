(function () {
    'use strict';
    $.root_ = $('body');
    var controllerId = 'headerController';
    var vm = this;

    angular
        .module('appsworld')
        .controller(controllerId, ['$scope', '$http', '$stateParams', '$rootScope', '$window', '$location', 'authService', 'config','seviceConfig', headerController])

        .directive('body', function () {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    element.on('click', 'a[href="#"], [data-toggle]', function (e) {
                        e.preventDefault();
                    })
                }
            }

        })
    function headerController($scope, $http, $stateParams, $rootScope, $window, $location, authService, config, seviceConfig) {
        var vm = this;
        vm.currentUser = config.userName;
        vm.companyName = config.companyName;
        vm.MasterLinks = ["Client Cursor", "Bean Cursor", "Workflow Cursor", "Knowledge Cursor", "Audit Cursor", "HR Cursor"];
        getmodules1();
        $("#isCursorSelected1").hide();
        $scope.selectedCursor = function (name, id, detailobj) {
            $("#isCursorSelected1").show();
            $rootScope.selectedCursor = { name: name, id: id, detailObj: detailobj };
            window.localStorage.setItem("selectedCursor", JSON.stringify($rootScope.selectedCursor));
            $scope.cursorId = id;
            $scope.isCursorSelected = true;
            vm.cursorName1 = name;
            $scope.link = 'accounts';
            $scope.ModuleDetails = JSON.parse(detailobj);
            $scope.linkTitle = name;
            getDetailLinks();
            if ($(window).width() < 768 || $(window).width() <= 992) {
                getDetailLinks1();
            }
        }
        //console.log(config.userRole)
        //if (config.userRole === 'admin') {
        //    $scope.showeditprofile = true;
        //    // $('#editbtn').show();
        //} else {
        //    $scope.showeditprofile = false;
        //    // $('#editbtn').hide();
        //}
       // alert($scope.showeditprofile);
        $scope.$on('getModules', function (event,args) {
            getmodules1();
        })
        //getmodule();
        function getmodules1() {
            
           
            vm.companyName = config.companyName;
            vm.currentUser = config.userName;
         
            if (config.userRole === 'admin') {
                $scope.showeditprofile = true;
                // $('#editbtn').show();
            } else {
                $scope.showeditprofile = false;
                // $('#editbtn').hide();
            }
            if (config.companyId != 'null' && config.companyId != undefined) {               
                $http.get(seviceConfig.mastermanagementRemoteServer + "ModuleMaster?companyId=" + config.companyId).success(function (data) {
                    $scope.modulemaster = data;
                    if (config.selectedCursor) {
                        $scope.selectedCursor(config.selectedCursor.name,config.selectedCursor.name,config.selectedCursor.detailObj);
                    }
                    return data;
                })
            }            
        }
       
        function getDetailLinks1() {
            var data2 = $scope.ModuleDetails;
            for (var index = 0; index <= data2.length - 1; index++) {
                if (data2[index].Status != 'Inactive') {
                    data1.push(data2[index].GroupName)
                }
            }

            var uniqueNames = [];

            $scope.Names1 = [];
            for (var index = 0; index <= data1.length - 1; index++) {
                uniqueNames.push(data1[index].GroupName)
            }

            $.each(uniqueNames, function (i, el) {
                if ($.inArray(el, $scope.Names1) === -1) $scope.Names1.push(el);
            });

            //var uniqueNames = $.unique(adminData.map(function (d) { return d.GroupName; }));
            //$scope.Names1 = $.unique(uniqueNames);

            $scope.result = [];
           
            angular.forEach($scope.Names1, function (index) {
                $scope.result.push({ grpName: index, Details: getDetails(index, data1) })
            });

       
            function getDetails(name, obj) {
                var obj1 = [];
                angular.forEach(obj, function (index) {
                    if (index.GroupName === name) {
                        obj1.push(index);
                    }
                });
                return obj1;
            }


        }
    

        function getDetailLinks() {
            var data = [];
            var data2 = $scope.ModuleDetails;
            for (var index = 0; index <= data2.length - 1; index++) {
                if (data2[index].Status != 'Inactive') {
                    data.push(data2[index])
                }
            }
            $scope.DetailLinks = data.entity || data;
            uniqueGroupName();
            function uniqueGroupName() {

                var tempLink = $scope.DetailLinks;

                var uniqueNames = [];

                $scope.Names1 = [];
                for (var index = 0; index <= tempLink.length - 1; index++) {
                    uniqueNames.push(tempLink[index].GroupName)
                }
              
                $.each(uniqueNames, function (i, el) {
                    if ($.inArray(el, $scope.Names1) === -1) $scope.Names1.push(el);
                });

              
                $(".createdLis").remove();
                var j = 1; var l = 1;

                for (var i = 0; i <= $scope.Names1.length - 1; i++) {
                    //alert($scope.Names1[i]);
                    $('#' + j).append("<li id='" + j + "' class='dropdown-header createdLis'>" + $scope.Names1[i] + "</li>");
                    l++;

                    var GroupName = $scope.Names1[i];

                    var selectedHeading = $.grep($scope.DetailLinks, function (n, i) {
                       
                        return (n.GroupName == GroupName);
                     
                    });

                    for (var k = 0; k <= selectedHeading.length - 1; k++) {
                        //alert(selectedHeading[k]);   --- style='padding-left:20px'
                        // if (selectedHeading[k].status == 1) {
                        $('#' + j).append("<li class='createdLis' data-ng-click=" + "vm.selectedPage('" + selectedHeading[k].Url + "','" + selectedHeading[k].Heading + "')" + "><a href=" + selectedHeading[k].Url + "><i class='" + selectedHeading[k].Url + "'></i>" + selectedHeading[k].Heading + "</a></li>");
                        //}
                        //else {
                        //    $('#' + j).append("<li class='not-allowed createdLis'><a><i class='" + selectedHeading[k].imageUrl + "'></i>" + selectedHeading[k].heading + "</a></li>");
                        //}

                        l++;

                        if (l > 8) {
                            j++;
                            l = 1;
                        }
                    } $('#' + j).append("<li class='divider createdLis'></li>");
                }
            }


        }
    
    
        
        $scope.countryNames = [
                             "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus",
                             "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy",
                             "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco",
                             "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
                             "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City", "India"
        ];
    }
})();

(function () {
    'use strict';
    angular.module("appsworld").
   controller('resetpasswordController', function ($scope, $modal, $log) {
       $scope.open = function (size) {

           var modalInstance = $modal.open({
               templateUrl: 'resetpasswordcontent.html',
               controller: 'resetpasswordControllerInstance',
               size: size,
               resolve: {
                   items: function () {
                       return $scope.items;
                   }
               }
           });

           modalInstance.result.then(function (selectedItem) {
               $scope.selected = selectedItem;
           }, function () {
               $log.info('Modal dismissed at: ' + new Date());
           });
       };
   })
   .controller('resetpasswordControllerInstance',
         ['$scope', '$http', '$q', '$location', '$modalInstance', '$window', 'config', 'seviceConfig', 'toastr', 'formValidate', changepass]);
    function changepass($scope, $http, $q, $location, $modalInstance, $window, config, seviceConfig, toastr, formValidate) {
        //var logError = common.logger.getLogFn('login', 'error');
        //var logSuccess = common.logger.getLogFn('login', 'sucess');
        //  var manager = datacontact.manager;
        $scope.isValidationRequired = false;
        $scope.validationMessages = [];
        $scope.currentPasswordFun = currentPasswordFun
        $scope.newpasswordFun = newpasswordFun
        $scope.confirmPasswordFun = confirmPasswordFun
       
        function currentPasswordFun() {
            var string = $scope.currentPassword;
            var str = string.trim();
            $scope.currentPassword = str;
            return
        }

        function newpasswordFun() {
            var string = $scope.newPassword;
            var str1 = string.trim();
            $scope.newPassword = str1;
            return
        }

        function confirmPasswordFun() {
            var string = $scope.confirmPassword;
            var str2 = string.trim();
            $scope.confirmPassword = str2;
            return
        }




        $scope.ok = function () {
            var deferred = $q.defer();


            $scope.isValidationRequired = false;
            var errormesgs = formValidate.validate('form');
            if (errormesgs.isValidationRequired == true) {
                $scope.isValidationRequired = true;
                $scope.validationMessages = [];
                $scope.validationMessages.push('Invalid data,Please Verify.' ); return;
            }
            var iscapital = /[A-Z]/,
              isDigit = /\d/,
              isSpecialCharector = /[^a-zA-Z\d]/,
              isMinLength = /.{6,}/;

            if (!isMinLength.test($scope.newPassword)) {
                $scope.isValidationRequired = true;
                $scope.validationMessages = [];
                $scope.validationMessages.push('Minlength must be 6'); return;
            }
            if (!iscapital.test($scope.newPassword)) {
                $scope.isValidationRequired = true;
                $scope.validationMessages = [];
                $scope.validationMessages.push('Atlest One Upper Case is Mandatory'); return;
            }
            if (!isDigit.test($scope.newPassword)) {
                $scope.isValidationRequired = true;
                $scope.validationMessages = [];
                $scope.validationMessages.push('Atlest One Digit is Mandatory'); return;
            }
            if (!isSpecialCharector.test($scope.newPassword)) {
                $scope.isValidationRequired = true;
                $scope.validationMessages = [];
                $scope.validationMessages.push('Atlest One Special Charector is Mandatory'); return;
            }
            



                if ($scope.newPassword != $scope.confirmPassword) {
                $scope.validationMessages = [];
                $scope.isValidationRequired = true;
                $scope.validationMessages.push('Passwords do not match!' ); return;
          
                };

                if ($scope.newPassword == $scope.currentPassword) {
                    $scope.validationMessages = [];
                    $scope.isValidationRequired = true;
                    $scope.validationMessages.push('Current & New passwords should not be same'); return;

                };
                //$scope.currentPassword = str;
                //$scope.newPassword = str1;
                //$scope.confirmPassword = str2;

           // $scope.isValidationRequired = false;
          //  http://appsworldapiclient.azurewebsites.net/breeze/Account/ChangePassword?userName=Name&currentPassword=currentrPassword&newPassword=newPassword
                $http.get(seviceConfig.accountRemoteServerapi + "/ChangePassword?userName="+ config.userName+"&currentPassword="+ $scope.currentPassword+"&newPassword="+ $scope.newPassword)
                    .success(function (response) {
                        toastr.success('Password Changed Successfully');
                        $modalInstance.close('ok');
                        deferred.resolve(response);

                    })
                    .error(function (err, status) {
                        $scope.validationMessages = [];
                        $scope.isValidationRequired = true;
                        $scope.validationMessages.push(err.Message.toString());
                       // $scope.validationText = err.ModelState.error0[0];
                        deferred.reject(err);
                        return;
                    })

        }
        $scope.cancel = function () {
            $modalInstance.close('cancel');
        }
    }
})();
