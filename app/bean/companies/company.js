/*
Page:Company 
Author:Subbareddy
Description: Company Add/Edit
*/
(function () {
    'use strict';

    var controllerId = 'companydetails';
    angular.module('companySetUp').controller(controllerId,
        ['$rootScope','$scope','$http', 'companyDataContext', '$stateParams', 'commonService', 'toastr', '$state', 'config', 'formValidate', '$timeout', 'seviceConfig', 'bootstrap.dialog', companydetails]);

    function companydetails($rootScope,$scope, $http, companyDataContext, $stateParams, commonService, tostar, $state, config, formValidate, $timeout, seviceConfig, bsDialog) {

        // Always define vm first
        var vm = this;
        var _stateParams = $stateParams;
        vm.addressType = 'single';
        vm.addrTitle = 'Address';
        //function declarations
        vm.saveCompany = saveCompany;
        vm.cancelCompany = cancelCompany;
        vm.createUser = createUser;
        vm.saveUser = saveUser;
        vm.cancelUser = cancelUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;
        vm.disableUser = disableUser;
        vm.adId = $stateParams.id;
        vm.resetUser = resetUser;
        vm.getUserViewMode = getUserViewMode;
        //Flag Settings
        vm.isValidationRequired = false;
        vm.isUnsuportedFile = false;
        vm.isEdit = false;
        vm.isView = $stateParams.isView == 'true' ? true : false;
        vm.isUsernameDisable = true;
        vm.isUserEdit = false;        
        vm.userSelection = [];      
        if (config.userRole == 'Super User') {
            vm.isAdmin = false;
            vm.regRequired = '';
            vm.nameclass = "col-md-6";
            vm.nowidget = "col-md-12"
            vm.noteswidget = false;
            vm.shrRequired = '';
            vm.nameLength = 20;
        } else {
            vm.isAdmin = true;
            vm.regRequired='required';
            vm.nameclass = "col-md-10"
            vm.nowidget = "col-md-9"
            $('#registrationno').addClass('mand');
            vm.noteswidget = true;
            vm.shrRequired = 'required';
            vm.nameLength = 50;
          
            
        }
        //vm.imgUrl = "../content/images/logo-img.png";
        vm.imgUrl = "content/images/iconsnew/userprofile.png";
        document.getElementById('img').innerHTML = '<img src="' + vm.imgUrl + '" alt="sa" />';
        vm.addressObject = [];
        
        /*Date picker open,close */
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope[opened] = $scope[opened] === true ? false : true;
        };
        $scope.closeAll = function () {
            $scope.opened1 = false;
        };
        /*End Date picker open,close */

        /*Date dd/MM/yyyy format after select from datepicker*/
        $scope.dateOptions6 = {
            format: 'dd/MM/yyyy',
            'class': 'datepicker'
        };
        $scope.formats6 = ['dd/MM/yyyy'];
        $scope.format6 = $scope.formats6[0];
        /*End Date dd/MM/yyyy format after select from datepicker*/

        /*focusout Expiry Date filed*/
        $("#ExpiryDate").focusout(function () {
            var expirydate = $("#ExpiryDate").val();
            if (expirydate != "") {
                $("#ExpiryDate").val(commonService.getfocusout(expirydate));
            }
        });
        /*End focusout Expiry Date filed*/
        _loadCompany();

        vm.companyUsers = companyDataContext.getCompanyusersGrid([]);

        function _loadCompany() {

            if (_stateParams.id == 'new') {               

                return companyDataContext.createCompany().then(function (data) {
                    _setCompanyObject(data.data);
                });
                
            } else {
                
                    return _getCompanyById(_stateParams.id).then(function (data) {
                        vm.isEdit = true;
                        _setCompanyObject(data.data);
                        if (_stateParams.isView == 'true') {
                            document.getElementsByClassName('k-upload-button')[0].style.display = 'none';
                            $timeout(function () {
                                commonService.getViewMode(['form1']);
                                $("select").prop('disabled', true);
                               
                            },300)                           
                        }                       
                    });                
            }
        }

        function _setCompanyObject(Obj)
        {
            vm.companyObj = companyDataContext.getCompanyObject(Obj);                     
              vm.jsonString =angular.copy(vm.companyObj.Communication);
            $rootScope.$broadcast('setCommunication');
            vm.companyUsers = companyDataContext.getCompanyusersGrid(vm.companyObj.CompanyUsers);
            _setCompanyUsers();
            if (vm.isEdit) {
                vm.companyObj.Small = vm.companyObj.Small == null ? vm.imgUrl : vm.companyObj.Small
                document.getElementById('img').innerHTML = '<img src="' + vm.companyObj.Small + '" alt="sa" />';
            }
            
        }

        function _getCompanyById(id)
        {
            return companyDataContext.getCompanyById(id);
        }

        function _showErrorLog() {
            vm.isValidationRequired = true;
            window.scrollTo(0, 0);
        }

        function saveCompany(type) {
            $rootScope.$broadcast('checkAddrBook'); // this line  notify the directive to check for validations 
           // vm.companyObj.Communication = vm.jsonString;
            vm.isValidationRequired = false;
            vm.showInvalidCursors = false;
            vm.showInvalidUsers = false;
            vm.validationMessages = [];
            var validateResult = formValidate.validate('companyDetails');           
            if (!vm.isAdmin) {
                if (companyDataContext.getCursorSelectionCount(vm.companyObj.ModulesCompact) < 2) {
                    vm.showInvalidCursors = true;
                }
                if (vm.companyObj.CompanyUsers.length == 0) {
                    vm.invalidUserText='Please create at least one user'
                    vm.showInvalidUsers = true;
                }
            }            
            if (validateResult.isValidationRequired || vm.showInvalidCursors || vm.showInvalidUsers || $rootScope.isCommunicationValidationRequired || $rootScope.isPostValRequired)
            {
                vm.validationMessages.push({validationText:'Invalid data, Please Verify !'})
                _showErrorLog();                
            }
            else
            {
                if (vm.isEdit) {
                    vm.companyObj.ModifiedBy = config.userName;
                }
                var expr = angular.copy(vm.companyObj.ExpiryDate);
                return companyDataContext.saveCompany(vm.companyObj, vm.addressObject).success(function () {
                    tostar.success('Saved Data');
                    if (type == 'new') {
                        vm.companyObj = [];
                        _loadCompany();
                        window.scrollTo(0, 0);
                        $scope.$broadcast('angucomplete-alt:clearInput', 'postalAutocmptl1');
                        document.getElementById('img').innerHTML = '<img src="content/images/iconsnew/userprofile.png" alt="sa" />';
                    } else if (type == 'save') {
                        $state.go('app.company');
                    }
                }).error(function (data) {                   
                    vm.validationMessages.push({ validationText: data });
                    vm.companyObj.ExpiryDate = expr;
                    _showErrorLog();
                });               
            }           
        }

        function cancelCompany() {
            $state.go('app.company');
        }

        // Start Of Company Users       
        vm.isUserView = false;
        vm.toggleUserSelection = function toggleUserSelection(id) {
            var idx = vm.userSelection.indexOf(id);
            if (vm.userSelection) {
                vm.userSelection = [];
            }
            // is currently selected
            if (idx > -1) {
                vm.userSelection.splice(idx, 1);
            }
                // is newly selected
            else {
                vm.userSelection.push(id);
            }
        };

        function createUser()
        {
            vm.isUserValidationRequired = false;
            vm.isUserEdit = false;
            vm.isUsernameDisable = false;
            vm.isCreateUser = true;
          return  vm.userDetails = companyDataContext.createCompanyUser();

        }

        function _setCompanyUsers()
        {
            vm.userSelection = [];
            $('#usersGrid').data("kendoGrid").setOptions(companyDataContext.getCompanyusersGrid(vm.companyObj.CompanyUsers));
        }

        function _clearCompanyUsersInformationValidations()
        {
            vm.userValidationMessages = [];
            vm.isUserValidationRequired = false;
        }

        function saveUser()
        {
            vm.invalidUserText = '';
            vm.showInvalidUsers = false;
            _clearCompanyUsersInformationValidations();
            var formValidation=formValidate.validate('userDetails');
            if (formValidation.isValidationRequired)
            {
                vm.isUserValidationRequired = true;
                vm.userValidationMessages = formValidation.errorMessages;
                return;
            }            
            vm.companyObj.CompanyUsers = companyDataContext.saveCompanyUser(vm.companyObj.CompanyUsers, vm.userDetails, vm.isUserEdit);
            vm.isCreateUser = false;
            _setCompanyUsers();
            _clearCompanyUsersInformationValidations();           
        }

        function editUser()
        {
            vm.isUserView = false;
            vm.isUserEdit = true;
            if (vm.userSelection.length < 1 || vm.userSelection.length > 1) {
                tostar.warning('Please Select One User');
                return;
            }
            if (vm.userSelection[0].Id < 0) {
                vm.isUsernameDisable = false;
            }
            else {
                vm.isUsernameDisable = true;
            }
            vm.userDetails = companyDataContext.getSelectedUser(vm.companyObj.CompanyUsers,vm.userSelection[0].Id);
            vm.isCreateUser = true;
        }

        function getUserViewMode(dataItem) {
            if (vm.isView) {
                return;
            }
            vm.isUserView = true;
            vm.isUsernameDisable = true;
            vm.isCreateUser = true;
            vm.userDetails = companyDataContext.getSelectedUser(vm.companyObj.CompanyUsers, dataItem.Id);
        }

        function cancelUser()
        {
            formValidate.hideMessages('userDetails');
            vm.isCreateUser = false;
            vm.userDetails = {};
        }

        function disableUser()
        {
            vm.isUserValidationRequired = false;
            vm.showInvalidUsers = false;
            if (vm.userSelection.length < 1 || vm.userSelection.length > 1) {
                tostar.warning('Please Select One User');
                return;
            }
            vm.userValidationMessages = [];
            if (companyDataContext.getCompanyActiveUsersCount(vm.companyObj.CompanyUsers) == 1&&vm.userSelection[0].Status=='Active') {
                vm.invalidUserText = 'At least one user should be active';
                vm.showInvalidUsers = true;
                vm.userSelection = [];
                return;
            }
            var val = vm.userSelection[0].Status == 'Active' ? 'Inactive' : 'Active';
            return bsDialog.confirmationDialog('Confirm ' + val + ' ?', 'Are you sure do you really want to '+val + ' User ?', 'ok', 'cancel').then(function (ok) {
                if (ok == 'ok') {
                    var disableUser = companyDataContext.disableCompanyUser(vm.userSelection[0].Username, vm.userSelection[0].Id, vm.userSelection[0].Status, vm.companyObj.Id);
                        disableUser.success(function (res) {
                            if (res == true) {
                                angular.forEach(vm.companyObj.CompanyUsers, function (index,key ) {
                                    if (index.Id == vm.userSelection[0].Id) {
                                        vm.companyObj.CompanyUsers[key].Status = vm.companyObj.CompanyUsers[key].Status == 'Active' ? 'Inactive' : 'Active';
                                    }
                                })
                                _setCompanyUsers();
                            }
                        }).error(function (err) {
                            vm.invalidUserText = err;
                            vm.showInvalidUsers = true;
                        })
                    }
                
            });
        }

        function deleteUser()
        {
            vm.companyObj.CompanyUsers = companyDataContext.deleteUser(vm.companyObj.CompanyUsers, vm.userSelection[0].Id);
            vm.isCreateUser = false;
           _setCompanyUsers();          
           _clearCompanyUsersInformationValidations();
        }

        function resetUser() {
            vm.showInvalidUsers = false;
            if (vm.userSelection.length < 1 || vm.userSelection.length > 1) {
                tostar.warning('Please Select One User');
                return;
            }
            bsDialog.confirmationDialog('Confirm Reset?', 'Do You Really Want to Reset Password?', 'Yes', 'No').then(function (ok) {
                if (ok == 'ok') {
                    return commonService.getEntities(seviceConfig.remoteServer + "breeze/Account/ResetPasswordToMail?email="+ vm.userSelection[0].Username).then(function (res) {
                        vm.userSelection = [];
                        tostar.success(res.data);
                    })
                } else {
                    vm.userSelection = [];
                }

            });
        }

        // End Of Company Users

        $('#invalid').addClass('hide');

        $("#upload").kendoUpload({
            async: {
                saveUrl: companyDataContext.fileSaveUrl,
               // removeUrl: config.remoteServer + "/breeze/azurestorage/deletelogo",
                autoUpload: true
            },
            select: onFileSelect,
            success: onSuccess
            //upload: onUpload
        });

        $('.k-upload-button span').text('Upload photo');

        function onSuccess(e)
        {
            $('#invalid').removeClass('show');
            $('#invalid').addClass('hide');
            vm.isFileUploaded = true;
            vm.imgUrl = e.response.Small;
            vm.companyObj.Small = e.response.Small;
            vm.mediaRepoId = e.response.Id;
            vm.companyObj.LogoId = vm.mediaRepoId;
            document.getElementById('img').innerHTML = '<img src="' + vm.imgUrl + '" alt="sa" />';
        }

        function onFileSelect(e) {
            $.each(e.files, function (index, value) {
                var extension = value.extension.toUpperCase();
                if (extension != ".JPG" && extension != ".PNG" && extension != ".JPG") {
                    vm.isUnsuportedFile = true;
                    $('#invalid').addClass('show');
                    e.preventDefault();
                }
            });
        }
    }
})();
