var app = angular.module('addressbook');

app.controller('addressModel', function ($rootScope, $scope, $modal, config) {
    $scope.open = function (size, addtype, addtypeid, type) {
        $rootScope.type = type;
        //$rootScope.addtype = addtype;
        //$rootScope.addtypeid = addtypeid;
        var modalInstance = $modal.open({
            templateUrl: 'myAddrBook.html',
            controller: 'myModalAddrInstance',
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

        });
    };
})

app.controller('myModalAddrInstance', ['$rootScope', '$modalInstance', '$scope', 'config', 'seviceConfig', 'addressBookDataContext', 'DefaultValues','formValidate','addrConfig', myModalAddrInstance]);
function myModalAddrInstance($rootScope, $modalInstance, $scope, config, serviceConfig, addressBookDataContext, DefaultValues, formValidate, addrConfig) {
       
    setAddressObject();

    $scope.Countries = DefaultValues.countries();

    function setAddressObject() {
        removeAddrFromLocalStorage();
        if ($rootScope.type === 'new') {
            var addrBook = addressBookDataContext.addressObject($rootScope.addtype, $rootScope.addtypeid);
            addrBook.AddressBook.IsLocal = 'localaddress';
            $scope.addressObject = addrBook;
        } else if ($rootScope.type === 'edit') {
            var _addr = angular.copy(addrConfig.addressObject);
            _addr.AddressBook.IsLocal = _addr.AddressBook.IsLocal === true ? 'localaddress' : 'foreignaddress';
            $scope.addressObject = _addr;
        }
    }
    function clearAddrValues() {
        $scope.addressObject.AddressBook.PostalCode = '';
        $scope.addressObject.AddressBook.Street = '';
        $scope.addressObject.AddressBook.BlockHouseNo = '';
        $scope.addressObject.AddressBook.BuildingEstate = '';
        $scope.addressObject.AddressBook.State = '';
        $scope.addressObject.AddressBook.Country = '';
        $scope.addressObject.AddressBook.City = '';
        $scope.addressObject.AddressBook.UnitNo = '';
    }
    var laddr;
    var faddr;
    function setAddr(type) {
         laddr = { PostalCode: "", BuildingEstate: '', BlockHouseNo: '', Country: '', State: '', City: '', Street: '', UnitNo: '' };
         faddr = { PostalCode: "", BuildingEstate: '', BlockHouseNo: '', Country: '', State: '', City: '', Street: '', UnitNo: '' };
        if (type === 'localaddress') {
            faddr.PostalCode = $scope.addressObject.AddressBook.PostalCode;
            faddr.BuildingEstate = $scope.addressObject.AddressBook.BuildingEstate;
            faddr.BlockHouseNo = $scope.addressObject.AddressBook.BlockHouseNo;
            faddr.Country = $scope.addressObject.AddressBook.Country;
            faddr.State = $scope.addressObject.AddressBook.State;
            faddr.City = $scope.addressObject.AddressBook.City;
            faddr.Street = $scope.addressObject.AddressBook.Street;
            faddr.UnitNo = $scope.addressObject.AddressBook.UnitNo;
        }
        if (type === 'foreignaddress') {
            laddr.PostalCode = $scope.addressObject.AddressBook.PostalCode;
            laddr.BuildingEstate = $scope.addressObject.AddressBook.BuildingEstate;
            laddr.BlockHouseNo = $scope.addressObject.AddressBook.BlockHouseNo;
            laddr.Country = $scope.addressObject.AddressBook.Country;
            laddr.State = $scope.addressObject.AddressBook.State;
            laddr.City = $scope.addressObject.AddressBook.City;
            laddr.Street = $scope.addressObject.AddressBook.Street;
            laddr.UnitNo = $scope.addressObject.AddressBook.UnitNo;
        }
    }
    function _setAddrValues(object) {
        $scope.addressObject.AddressBook.PostalCode = object.PostalCode;
        $scope.addressObject.AddressBook.Street = object.Street;
        $scope.addressObject.AddressBook.BlockHouseNo = object.BlockHouseNo;
        $scope.addressObject.AddressBook.BuildingEstate = object.BuildingEstate;
        $scope.addressObject.AddressBook.State = object.State;
        $scope.addressObject.AddressBook.Country = object.Country;
        $scope.addressObject.AddressBook.City = object.City;
        $scope.addressObject.AddressBook.UnitNo = object.UnitNo;
    }
    $scope.addressSectionChanged = function (type) {
        setAddr(type);
        if (type === 'localaddress') {
            window.localStorage.setItem('foreignAddr', JSON.stringify(faddr));
            clearAddrValues();
            if(JSON.parse(window.localStorage.getItem('localAddr')!=null)){
                _setAddrValues(JSON.parse(window.localStorage.getItem('localAddr')));
            } else {
                $scope.addressObject.AddressBook.Country = "Singapore";
                $scope.addressObject.AddressBook.State = "Singapore";
                $scope.addressObject.AddressBook.City = "Singapore";
            }
           
        } else if (type === 'foreignaddress') {
            window.localStorage.setItem('localAddr', JSON.stringify(laddr));
            clearAddrValues();
            if (JSON.parse(window.localStorage.getItem('foreignAddr') != null)) {
                _setAddrValues(JSON.parse(window.localStorage.getItem('foreignAddr')));
            }
        }
    }

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

    $scope.postalCodeChanged = function () {       
        $scope.isDisableRequired = false;
        $scope.addressObject.AddressBook.PostalCode = document.getElementById('postalAutocmptl_value').value;        
    }

    $scope.save = function () {
        var valaidate = formValidate.validate('addrBook');
        $scope.isRpostval = false;
        if ($scope.addressObject.AddressBook.IsLocal === 'localaddress') {
            var pcode = document.getElementById('postalAutocmptl_value').value;
            if (isNaN(pcode) || (pcode.length != 6 && pcode != "")) {
                $scope.isRpostval = true;
            }
        }       
        if (valaidate.isValidationRequired || $scope.isRpostval) {
            return;
        }
        $scope.addressObject.AddressBook.IsLocal = $scope.addressObject.AddressBook.IsLocal === 'localaddress' ? true : false;
        $scope.addressObject.AddType = $rootScope.addtype;
        isNaN($rootScope.addtypeid) === true ? $scope.addressObject.AddTypeId = $rootScope.addtypeid : $scope.addressObject.AddTypeIdInt = $rootScope.addtypeid;
        if (isNaN($rootScope.addtypeid)) {
            $scope.addressObject.AddTypeIdInt = null;
            $scope.addressObject.AddTypeId = $rootScope.addtypeid;
        } else {
            $scope.addressObject.AddTypeIdInt = $rootScope.addtypeid;
            $scope.addressObject.AddTypeId = null;
        }
        $scope.addressObject.AddressBookId = $scope.addressObject.AddressBook.Id;
        $rootScope.$broadcast('saveAddressObject', { data: { type: $rootScope.type, object: $scope.addressObject } });
        removeAddrFromLocalStorage();
        $modalInstance.dismiss('ok');
    }
    function removeAddrFromLocalStorage() {
        if(window.localStorage.getItem('localAddr')!=null){  window.localStorage.removeItem('localAddr');}
        if (window.localStorage.getItem('foreignAddr')!=null) { window.localStorage.removeItem('foreignAddr'); }
    }
    $scope.cancel = function () {
        removeAddrFromLocalStorage();
        $rootScope.$broadcast('cancelAddressObject');
        $modalInstance.dismiss('cancel');
    }

}