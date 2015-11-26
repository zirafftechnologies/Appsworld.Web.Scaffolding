(function () {
    'use strict';

    angular
        .module('addressbook',[])
        .factory('addressBookDataContext', addressBookDataContext);

    addressBookDataContext.$inject = ['$http', 'DefaultValues','commonService'];

    function addressBookDataContext($http, DefaultValues, commonService) {
        var service = {
            getAddressGridOptions: getAddressGridOptions,
            addressObject: addressObject,
        };

        return service;

        function getAddressGridOptions(data) {
            return {
                dataSource: {
                    type: 'json',
                    data: data,
                    pageSize:20
                },
                sortable: true,
                pageable: {
                    refresh: true,
                    buttonsCount:5
                },
                filtarable: true,
                columns: [
                    { field: "AddType", title: "Address Type" },
                    { field: 'AddSectionType', title: 'Address Section Type' },
                    {title:'Address',template:""}
                ]
            }
        }
        function addressObject(addType,addTypeId) {
            return {
                Id: commonService.guid(), AddSectionType: "", AddType: "", AddTypeId: addTypeId, AddTypeIdInt: addTypeId, AddressBookId: "", Status: "Active", AddressBook: DefaultValues.addressBook()
            }
        }
    }
})();