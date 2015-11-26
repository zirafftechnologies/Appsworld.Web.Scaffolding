(function () {
    'use strict';

    var controllerId = 'bookmarkctrldata';
    angular.module('appsworld').controller(controllerId,
        ['$http','$state', '$q', '$location', '$stateParams', '$scope', '$moment', 'config', 'bootstrap.dialog','seviceConfig', bookmarkctrldata]);

    function bookmarkctrldata($http,$state, $q, $location, $stateParams, $scope, $moment, config, bsDialog, seviceConfig) {
        // Always define vm first
        var vm = this;      
        getdata();
        vm.contactpost = []
        vm.checkRole = checkRole;
        function getdata() {
            if (config.companyId != 'null' && config.companyId != undefined && config.userName != 'null' && config.userName != undefined) {
                $http.get(seviceConfig.clientCursorRemoteServer + "GetPinDetails?userName=" + config.userName + '&companyId=' + config.companyId).success(function (response) {
                    vm.contactpost = response;
                }).error(function (err, status) {
                })
            }            
        }
        function checkRole(role) {
            return config.userRole === role;
        }
        $scope.$on('datarefresh', function (event, args) {
            getdata();          
        });        
    }
})();