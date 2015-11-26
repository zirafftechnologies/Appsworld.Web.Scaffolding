/*
author:SubbaReddy
date:05/09/2015
Description: this is going to take user into right path
*/
/// <reference path="../content/scripts/common/auth/auth.js" />
/// <reference path="../content/scripts/common/auth/oidc-token-manager.js" />
(function () {
    'use strict';

    angular
        .module('appsworld')
        .controller('routeMediate', routeMediate);

    routeMediate.$inject = ['$http','$location','config','$state','$rootScope','seviceConfig','authService'];

    function routeMediate($http, $location, config, $state, $rootScope, serviceConfig, authService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'routeMediate';
        vm.setCompany = setCompany;        
        var _userDetails;
        activate();
        function activate() {
            var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            if (userInfo === null) {
                config.companyId = undefined;
                setTimeout(function () {
                    _userDetails = authService.getData();
                    _fillUserInformation();
                    _chooseCompany()
                }, 500)
            } else {                
                config.companyId = userInfo.companyId;
                config.userRole = userInfo.userRole;
                config.companyName = userInfo.companyName;
                config.dateFormat = userInfo.dateFormat;
                config.currency = userInfo.currency;
                config.userName = userInfo.userName;
                config.selectedCursor = userInfo.selectedCursor;
                $state.go(userInfo.url, userInfo.params);
                _getModules();
            }
        }
        function _fillUserInformation() {
            if (_userDetails !== null) {
                config.userName = _userDetails.profile.preferred_username;
                var isSuperUser = false;
                if (typeof (_userDetails.profile.role) === 'object') {
                    angular.forEach(_userDetails.profile.role, function (index) {
                        if (index == 'Super User') { isSuperUser = true; }
                    });
                    config.userRole = isSuperUser === true ? 'Super User' : 'admin';
                }
                else {
                    config.userRole = _userDetails.profile.role;
                }
            }
        }
        function _chooseCompany() {
            var obj = { ids: [], userName: config.userName };
            if (_userDetails !== null) {
                if (typeof (_userDetails.profile.companyId) === 'object') {
                    obj.ids = _userDetails.profile.companyId;
                } else {
                    obj.ids.push(_userDetails.profile.companyId)
                }

                $http.post(serviceConfig.clientCursorRemoteServer + 'GetCompanyDetails', obj).then(function (response) {
                    if (typeof (_userDetails.profile.companyId) === 'object') {
                        config.companyName = 'Choose Company';
                        _getModules();
                       
                        vm.companies = response.data;
                        angular.forEach(vm.companies, function (index) {
                            index.companyFirstletter = index.Name.charAt(0);
                        })
                    }
                    else {
                        if (response.data.length !== 0) {
                            vm.isSingleCMPYIn = false;
                            if (response.data[0].Status === 'Inactive') {
                                config.companyName = response.data[0].Name;
                                _getModules();
                                vm.isSingleCMPYIn = true;
                            } else {
                                config.companyId = response.data[0].Id;                           
                                config.companyName = response.data[0].Name;
                                config.dateFormat = response.data[0].LocalDateTimeFormat === null ? 'dd/MM/yyyy' : response.data[0].LocalDateTimeFormat;
                                config.currency = response.data[0].LocalCurrencyFormat === null ? '$' : response.data[0].LocalCurrencyFormat;
                                _getModules();
                                _setUserInfo();
                                $state.go('app.dashboard');
                            }
                            
                        }
                        else {
                            config.companyId = 'null';
                            config.companyName = 'AppsWorld';
                            config.dateFormat =  'dd/MM/yyyy';
                            config.currency =  '$';
                            _getModules();
                            $state.go('app.dashboard');
                            //config.companyName = 'AppsWorld';                                                
                        }

                    }
                })
            } else {
                mgr.redirectForToken();
            }
        }
        function _setUserInfo() {
            var data = { "url": $state.current.name, "companyId": config.companyId, "userName": config.userName, "companyName": config.companyName, "userRole": config.userRole, "params": $state.params, selectedCursor: $rootScope.selectedCursor, dateFormat: config.dateFormat, currency: config.currency };
            window.localStorage.setItem('userInfo', JSON.stringify(data));
        }
        function _getModules() {
            setTimeout(function () {
                $rootScope.$broadcast('datarefresh');
                $rootScope.$broadcast('getModules');
            }, 200)
        }
        function setCompany(company) {
            config.companyId = company.Id;
            config.companyName = company.Name;
           // config.companyfirstletter = company.Name.charAt(0);
            config.dateFormat = company.LocalDateTimeFormat === null ? 'dd/MM/yyyy' : company.LocalDateTimeFormat;
            config.currency = company.LocalCurrencyFormat === null ? '$' : company.LocalCurrencyFormat;
            $rootScope.$broadcast('datarefresh');
            $rootScope.$broadcast('getModules');
            _setUserInfo();
            $state.go('app.dashboard');
        } 
    }
})();
