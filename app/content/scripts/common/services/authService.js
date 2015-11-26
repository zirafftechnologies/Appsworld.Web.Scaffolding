(function () {
    'use strict';

    angular
        .module('appsworld')
        .factory('authService', authService);

    authService.$inject = ['$window', '$http', '$q', 'config', '$state'];

    function authService($window, $http, $q, config, $state) {
        var _userDetails = JSON.parse($window.localStorage.getItem('TokenManager.token'));
        _fillUserInformation();
        var service = {
            getData: getData,
            getUser: getUser,
            _fillUserInformation: _fillUserInformation
        };
        return service;
        function getData() {
            var _authData = $window.localStorage.getItem('TokenManager.token');
            var _authDataDetails = JSON.parse(_authData);
            return _authDataDetails;
        }

        function getUser() {
            var _authData = $window.localStorage.getItem('TokenManager.token');
            var _authDataDetails = JSON.parse(_authData);
         //   return _authDataDetails.profile.email;
                   
        }
        function _fillUserInformation() {
            var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            if (userInfo !== null) {
                config.companyId = userInfo.companyId;
                config.companyName = userInfo.companyName;
                config.userRole = userInfo.userRole;
                config.userName = userInfo.userName;
                config.selectedCursor = JSON.parse(window.localStorage.getItem("selectedCursor")) === null ? userInfo.selectedCursor : JSON.parse(window.localStorage.getItem("selectedCursor"));
                config.dateFormat = userInfo.dateFormat;
                config.currency = userInfo.currency;
            }
            
        }
    }
})();