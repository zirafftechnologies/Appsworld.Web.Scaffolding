'use strict',
angular.module("appsworld")
.directive("zBook", function () {
    return {
        restrict: 'E',
        scope: {
            addressType: '=',
            titles: '=',
            addressObject: '=addressObject',
            isView: '='
        },
        templateUrl: 'views/tmpl/directives_tmpl/addressbook.html',
        controller: function ($scope, $http, seviceConfig, customValidations, $rootScope, commonService, $state, config, formValidate) {
            $scope.isClicked = false;
            $state.current.name.search('company') !== -1 ? $scope.isNotCompany = false : $scope.isNotCompany = true;
            $scope.phones = [];
            $scope.dupPhoneObj = [];
            $scope.angle = 'fa-angle-double-down';
            if ($scope.addressType == 'single') {
                $scope.ttladdr2 = $scope.titles;
                $scope.isClicked = true;
            }
            else if ($scope.addressType == 'multiple') {
                var title = $scope.titles.split(';');
                $scope.ttladdr1 = title[0];
                $scope.ttladdr2 = title[1];
            }
            function _setValidationType() {

            }
            $scope.acceptInput = function (e) {
                if (e.keyCode < 48 || e.keyCode > 57) {
                    return false;
                } else {
                    return true;
                }
            }
            $scope.postalVal = function (type) {
                if (type === 'local') {
                    $scope.ispostval = false;
                    var ele = document.getElementById('postalAutocmptl1_value');
                    var val = document.getElementById('postalAutocmptl1_value').value;
                    if (val) {
                        if (isNaN(val)) {
                            $scope.ispostval = true;
                        } else if (val.length < 6 || val.length > 6) {
                            $scope.ispostval = true;
                        }
                    }
                } else if (type === 'Rlocal') {
                    $scope.isRpostval = false;
                    var ele=document.getElementById('postalAutocmptl_value');
                    var val=document.getElementById('postalAutocmptl_value').value;
                    if (val) {
                        if (isNaN(val)) {
                            $scope.isRpostval = true;
                        } else if (val.length < 6 || val.length > 6) {
                            $scope.isRpostval = true;
                        }
                    }
                }
               
            }
            $scope.$watch(function () {
                return $scope.addressObject;
            }, function (newObj) {

                if ($scope.addressType == 'single') {
                    $scope.isMultiAddress = false;
                    try {
                        $scope.Website = newObj.AddressBook.Website;
                        _setPhoneEmail(newObj.AddressBook.Phone);
                        if (newObj.AddressBook.IsLocal) {
                            $scope.isMADLocal = true; document.getElementById('sradio1').checked = true;
                        }
                        else { $scope.isMADLocal = false; document.getElementById('sradio2').checked = true; }
                    }
                    catch (err) { }
                }
                else if ($scope.addressType == 'multiple') {

                    $scope.isMultiAddress = true;
                    try {
                        $scope.Website = newObj.AddressBook.Website;
                        _setPhoneEmail(newObj.AddressBook.Phone);
                        if (newObj.IsLocal) {
                            $scope.isLocal = true;
                            document.getElementById('radio1').checked = true;
                        }
                        else {
                            $scope.isLocal = false;
                            document.getElementById('radio2').checked = true;
                        }
                        if (newObj.AddressBook.IsLocal)
                        { $scope.isMADLocal = true; document.getElementById('sradio1').checked = true; }
                        else
                        { $scope.isMADLocal = false; document.getElementById('sradio2').checked = true; }
                        var addr = newObj.AddressBook;
                        if ((addr.PostalCode || addr.UnitNo || addr.BlockHouseNo || addr.BuildingEstate || addr.Street)) {
                            $scope.isClicked = true;
                            $scope.angle = 'fa-angle-double-up';
                        }
                    }
                    catch (err) { }
                }
            });
       
            $scope.isResCountryRequired = '';
            $scope.isCountryRequired = '';
            $scope.selectedObject = function (selectedObject) {
                var dataItem = selectedObject.originalObject;
                $scope.ispostval = false;
                $scope.addressObject.AddressBook.PostalCode = dataItem.PostalCode;
                $scope.addressObject.AddressBook.BuildingEstate = dataItem.BuildingName;
                $scope.addressObject.AddressBook.BlockHouseNo = dataItem.BuildingNumber;
                $scope.addressObject.AddressBook.Country = dataItem.Country;
                $scope.addressObject.AddressBook.State = dataItem.State;
                $scope.addressObject.AddressBook.City = dataItem.State;
                $scope.addressObject.AddressBook.Street = dataItem.StreetName;
                $scope.isDisableRequired = true;
            }
            $scope.selectedResObject = function (selectedObject) {
                var dataItem = selectedObject.originalObject;
                $scope.isRpostval = false;
                $scope.addressObject.ResPostalCode = dataItem.PostalCode;
                $scope.addressObject.ResCountry = dataItem.Country;
                $scope.addressObject.ResBlockHouseNo = dataItem.BuildingNumber;
                $scope.addressObject.ResState = dataItem.State;
                $scope.addressObject.ResBuildingEstate = dataItem.BuildingName;
                $scope.addressObject.ResStreet = dataItem.StreetName;
                $scope.addressObject.ResCity = dataItem.State;
                $scope.isResDisableRequired = true;
            }
            $scope.postalCodeChanged = function (type) {
              // var postStr = null;
                if (type == 'Rlocal') {
                  //  postStr = angular.copy($scope.addressObject.ResPostalCode);
                    $scope.isResDisableRequired = false;
                    $scope.addressObject.ResPostalCode = document.getElementById('postalAutocmptl_value').value;
                } else if (type == 'local') {
                  //  postStr = angular.copy($scope.addressObject.AddressBook.PostalCode);
                    $scope.isDisableRequired = false;
                    $scope.addressObject.AddressBook.PostalCode = document.getElementById('postalAutocmptl1_value').value;
                }
                //var uri = seviceConfig.elasticSearchRemoteServer + 'AutoComplete?indexName=postalcodes&input=' + postStr + '&indexField=PostalCode&noOfRecords=100';
                //if (type === 'local') {
                //    $("#postalAutocmptl1").data("kendoAutoComplete").dataSource.transport.options.read.url =uri
                //} else if (type === 'Rlocal') {
                //    $("#postalAutocmptl").data("kendoAutoComplete").dataSource.transport.options.read.url = uri
                //}
               
            }
            // end of Postal Code Look up

            var url = seviceConfig.clientCursorRemoteServer + 'ControlCodeCategories?$expand=ControlCodes&$filter=ControlCodeCategoryCode eq ';
            var cid;
            if (config.companyId === 'null' || config.companyId === null || config.companyId === 'undefined' || config.companyId === undefined) {
                cid = 0;
            } else {
                cid = config.companyId;
            }
            $http.get(url + "'CommunicationType' and CompanyId eq " + cid).success(function (response) {
                var _phoneTypes = [];
                for (var _index = 0; _index <= response[0].ControlCodes.length - 1; _index++) {
                    if (response[0].ControlCodes[_index].Status == 1) {
                        _phoneTypes.push(response[0].ControlCodes[_index]);
                    }
                }
                $scope.phoneTypes = _phoneTypes;
                return response;
            });

            function _clearValues1() {
                $scope.addressObject.AddressBook.State = '';
                $scope.addressObject.AddressBook.Country = '';
                $scope.addressObject.AddressBook.PostalCode = '';
                $scope.addressObject.AddressBook.BlockHouseNo = '';
                $scope.addressObject.AddressBook.City = '';
                $scope.addressObject.AddressBook.UnitNo = '';
                $scope.addressObject.AddressBook.BuildingEstate = '';
                $scope.addressObject.AddressBook.Street = '';
            }
            function _clearValues2() {
                $scope.addressObject.ResState = '';
                $scope.addressObject.ResCountry = '';
                $scope.addressObject.ResPostalCode = '';
                $scope.addressObject.ResBlockHouseNo = '';
                $scope.addressObject.ResCity = '';
                $scope.addressObject.ResUnitNo = '';
                $scope.addressObject.ResBuildingEstate = '';
                $scope.addressObject.ResStreet = '';
            }
            var localaddr_1 = {};
            var localaddr_2 = {};
            var foreignaddr_1 = {};
            var foreignaddr_2 = {};
            $scope.Countries = Countries;
            function savePreviousAddr(type, object) {
                switch (type) {
                    case 'foreign':
                        localaddr_1 = angular.copy(object);                      
                        return localaddr_1;
                        break;
                    case 'local':
                        foreignaddr_1 = angular.copy(object);                       
                        return foreignaddr_1;
                        break;
                    case 'Rlocal':
                        foreignaddr_2 = angular.copy(object)                      
                        return foreignaddr_2;
                        break;
                    case 'Rforeign':
                        localaddr_2 = angular.copy(object);                      
                        return localaddr_2;
                        break;
                    default:
                        break;

                }
            }
            $scope.setAddressType = function (type) {

                if (type == 'local') {
                    if ($scope.isMADLocal) {
                        $scope.isCountryReuired = '';
                        return;
                    } else {
                        $scope.isCountryReuired = '';
                        savePreviousAddr(type, $scope.addressObject.AddressBook);
                        _clearValues1();
                        if (Object.keys(localaddr_1).length != 0) {
                            localaddr_1.Website = $scope.addressObject.AddressBook.Website;
                            localaddr_1.Phone = $scope.addressObject.AddressBook.Phone;
                            $scope.addressObject.AddressBook = localaddr_1;
                        }                       
                        $scope.isDisableRequired = false;
                        $scope.addressObject.AddressBook.IsLocal = true;
                        $scope.isMADLocal = true;
                        document.getElementById('sradio1').checked = true;
                        $scope.addressObject.AddressBook.Country = 'Singapore';
                        $scope.addressObject.AddressBook.City = 'Singapore';
                        $scope.addressObject.AddressBook.State = 'Singapore';
                    }
                }
                else if (type == 'foreign') {
                    if (!$scope.isMADLocal) {
                        $scope.isCountryReuired = 'required';
                        return;
                    }
                    else {
                        $scope.isCountryReuired = 'required';
                        savePreviousAddr(type, $scope.addressObject.AddressBook);
                        _clearValues1();
                        if (Object.keys(foreignaddr_1).length !== 0) {
                            $scope.addressObject.AddressBook = foreignaddr_1;
                        }                       
                        $scope.addressObject.AddressBook.IsLocal = false;
                        $scope.isMADLocal = false;
                        document.getElementById('sradio2').checked = true;
                    }
                }
                else if (type == 'Rlocal') {
                    if ($scope.isLocal) {
                        $scope.isResCountryReuired = '';
                        return;
                    }
                    else {
                        $scope.isResCountryReuired = '';
                        savePreviousAddr(type, $scope.addressObject);
                        _clearValues2();
                        if (Object.keys(localaddr_2).length != 0) {
                            localaddr_2.AddressBook.Website = $scope.addressObject.AddressBook.Website;
                            localaddr_2.AddressBook.Phone = $scope.addressObject.AddressBook.Phone;
                            $scope.addressObject = localaddr_2;
                        }
                        
                        $scope.isResDisableRequired = false;
                        $scope.isLocal = true;
                        $scope.addressObject.IsLocal = true;
                        document.getElementById('radio1').checked = true;
                        $scope.addressObject.ResCountry = 'Singapore';
                        $scope.addressObject.ResCity = 'Singapore';
                        $scope.addressObject.ResState = 'Singapore';
                    }
                }
                else if (type == 'Rforeign') {
                    if (!$scope.isLocal) {
                        $scope.isResCountryReuired = 'required';
                        return;
                    }
                    else {
                        $scope.isResCountryReuired = 'required';
                       savePreviousAddr(type, $scope.addressObject);
                       _clearValues2();
                       if (Object.keys(foreignaddr_2).length != 0) {
                           $scope.addressObject = foreignaddr_2;
                       }
                       //$scope.addressObject.ResState = '';
                       //$scope.addressObject.ResCity = '';
                       //$scope.addressObject.ResCountry = '';
                        $scope.isLocal = false;
                        $scope.addressObject.IsLocal = false;
                        document.getElementById('radio2').checked = true;
                       // alert($scope.phones.length);
                    }
                }
            }
            $scope.categorychange = function (type, value) {
                if (!type && !value) {
                    $scope.isCMVT = false;
                    $scope.communicationValidationText = '';
                } else {
                    _validateCOMM();
                }
            }
            $scope.validateComm = function (value) {
                $scope.isCMVT = false;
                _validateCOMM();
                if (isCMVR) {
                    $scope.isCMVT = true;
                }
            }
            $scope.$on('checkAddrBook', function () {
                _validateCOMM();
            })
            function _setPhoneEmail(phone) {
                $scope.phones = [];
                try {
                    if (phone == "" || phone == null || phone == undefined||phone.length<5) {                        
                        $scope.phones.push({ "Key": "", "value": "" });
                    } else {
                        var isKey = false;
                        for (var key in JSON.parse(phone)) {
                            for (var key1 in JSON.parse(phone)[key]) {
                                isKey = key1 === 'key' || key1 === 'value' ? true : false;
                            }                            
                        }
                        if (isKey) {
                            for (var key in JSON.parse(phone)) {
                                var keyText = '';
                                var valText = '';
                                if (JSON.parse(phone)[key].key === "undefined" || JSON.parse(phone)[key].key === 'null' || JSON.parse(phone)[key].key === undefined) {
                                    keyText = '';
                                } else {
                                    keyText = JSON.parse(phone)[key].key
                                }
                                if (JSON.parse(phone)[key].value === "undefined" || JSON.parse(phone)[key].value === 'null' || JSON.parse(phone)[key].value === undefined) {
                                    valText = '';
                                } else {
                                    valText = JSON.parse(phone)[key].value;
                                }
                                $scope.phones.push({ "key": keyText, "value": valText });
                            }
                        } else {
                            if (phone != '[{"":""}]' && phone != "" && phone != null) {
                                var communicationObj = JSON.parse(phone);
                                for (var i = 0; i <= communicationObj.length - 1; i++) {
                                    for (var key in communicationObj[i]) {
                                        var type = key;
                                        var value = communicationObj[i][key];
                                        $scope.phones.push({ "key": type, "value": value });
                                    }
                                }
                            } else {
                                $scope.phones = [];
                                $scope.phones.push({ "key": "", "value": "" });
                            }
                        }
                                           
                    }
                } catch (err) { }
            }

            // Phone Validations
            $scope.isCMVT = false;
            var isCMVR = false;

            function _validateCOMM() {
                $scope.addressObject.AddressBook.Website = $scope.Website;
                $rootScope.isPostValRequired = false;
                isCMVR = false;
                for (var i = 0; i <= $scope.phones.length - 1; i++) {                
                    if (($scope.phones[i].key != '' && $scope.phones[i].key != undefined && $scope.phones[i].key != null && $scope.phones[i].key != 'undefined') && $scope.phones[i].value == '' && $scope.phones[i].key != 'null') {
                            isCMVR = true;
                            $scope.communicationValidationText = 'Please Enter ' + $scope.phones[i].key;
                        }
                    else if (($scope.phones[i].key === '' || $scope.phones[i].key === undefined || $scope.phones[i].key === 'undefined' || $scope.phones[i].key === null || $scope.phones[i].key === 'null') && $scope.phones[i].value != '') {
                            isCMVR = true;
                            $scope.communicationValidationText = 'Please Select Communication Type';
                        }
                    else if (($scope.phones[i].key != '' && $scope.phones[i].key != undefined && $scope.phones[i].key != 'undefined' && $scope.phones[i].key != null && $scope.phones[i].key != 'null') && $scope.phones[i].value != '') {
                        var val = $scope.phones[i].key.toLowerCase();
                        if (val==='phone'||val==='mobile'||val==='email') {
                            if (customValidations.validateCommunicationType($scope.phones[i].key, $scope.phones[i].value))
                            {
                            }
                            else
                            {
                            isCMVR = true;
                            $scope.communicationValidationText = 'Invalid ' + $scope.phones[i].key;
                            }
                        }
                            
                        }                    
                }
                if($scope.isRpostval||$scope.ispostval){
                    $rootScope.isPostValRequired = true;
                }
                if (isCMVR) {
                    $rootScope.isCommunicationValidationRequired = true;
                    $scope.isCMVT = true;
                } else {
                    $rootScope.isCommunicationValidationRequired = false;
                    $scope.isCMVT = false;
                    $scope.addressObject.AddressBook.Phone = commonService.getPhoneString($scope.phones);
                }
            }

            $scope.addphone = function () {
                $scope.isCMVT = false;
                if ($scope.isView) { return false };
                _validateCOMM();
                if (isCMVR) {
                    $scope.isCMVT = true;
                    return false;
                }
                $scope.phones.push({ "key": "", "value": "" });
                $scope.dupPhoneObj.push({ "key": "", "value": "" });
            }
            $scope.deletephone = function (index) {
                if ($scope.isView) { return false };
                $scope.phones.splice(index, 1)              
            }

            $scope.copyAddress = function () {
                if ($('#sameAddr').is(':checked')) {
                    $scope.isClicked = false;
                    //document.getElementById('disable').disabled = true;
                    $('#disable :input').attr('disabled', true);
                    $scope.angle = 'fa-angle-double-down';
                    if ($scope.isLocal) {
                        $scope.isMADLocal = true;
                        $scope.addressObject.AddressBook.IsLocal = true;
                        document.getElementById('sradio1').checked = true;
                    }
                    else {
                        $scope.sfbook = $scope.slbook;
                        $scope.isMADLocal = false;
                        $scope.addressObject.IsLocal = false;
                        $scope.addressObject.AddressBook.IsLocal = false;
                        document.getElementById('sradio2').checked = true;
                        $scope.isCountryReuired = 'required';
                    }
                    $scope.addressObject.AddressBook.PostalCode = $scope.addressObject.ResPostalCode;
                    $scope.addressObject.AddressBook.Street = $scope.addressObject.ResStreet;
                    $scope.addressObject.AddressBook.Country = $scope.addressObject.ResCountry;
                    $scope.addressObject.AddressBook.BlockHouseNo = $scope.addressObject.ResBlockHouseNo;
                    $scope.addressObject.AddressBook.City = $scope.addressObject.ResCity;
                    $scope.addressObject.AddressBook.State = $scope.addressObject.ResState;
                    $scope.addressObject.AddressBook.BuildingEstate = $scope.addressObject.ResBuildingEstate;
                    $scope.addressObject.AddressBook.UnitNo = $scope.addressObject.ResUnitNo;
                }
                else {
                    $('#disable :input').attr('disabled', false);
                    $scope.isClicked = true;
                    $scope.angle = 'fa-angle-double-up';
                }
            }

            $scope.showMAddress = function () {
                if ($scope.isClicked) {
                    $scope.isClicked = false;
                    $scope.angle = 'fa-angle-double-down';
                }
                else {
                    $scope.isClicked = true;
                    $scope.angle = 'fa-angle-double-up';
                }
            }

        }

    }

});

