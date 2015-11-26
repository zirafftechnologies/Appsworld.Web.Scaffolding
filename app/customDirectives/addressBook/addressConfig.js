(function () {
    'use strict';

    var app = angular.module('addressbook');
    //User Details
    var addressObject;
    var addrConfig = {
        addressObject:addressObject
    }
    app.value('addrConfig', addrConfig);

})();
