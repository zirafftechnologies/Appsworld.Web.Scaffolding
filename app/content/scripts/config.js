(function () {
    'use strict';

    var app = angular.module('appsworld');
    //User Details
    var userName;
    var userRole;
    var companyId;
    var primaryId = -1;
    var companyName;
    var selectedCursor;
    var likeDislike;
    var dateFormat;
    var currency;
    var config = {
        userName: userName,
        userRole: userRole,
        companyId: companyId,
        primaryId: primaryId,
        companyName: companyName,
        likeDislike: likeDislike,
        selectedCursor: selectedCursor,
        dateFormat: dateFormat,
        currency:currency
    }
    app.value('config', config);
        
})();
