'use strict'
angular.module('addressbook')
.directive('communication', function () {
    return {
        restrict: 'E',
        templateUrl: 'customDirectives/addressbook/communication.html',
        scope: {
            jsonString: '=jsonString',
            isView:'='
        },
        require: 'ngModel',
        link: function (scope, element, attr, ngModel,commonService) {
            scope.$watch('jsonString', function () {
                var str = angular.copy(scope.jsonString);
                ngModel.$setViewValue(getPhoneString(JSON.parse(str)));
            });
            function getPhoneString(obj) {
                var str = "["
                var isValidString = false;
                angular.forEach(obj, function (index) {
                    if ((index.key == '' || index.key == null || index.key == 'null' || index.key == 'undefined' || index.key == undefined) && (index.value == '' || index.value == null || index.value == 'null' || index.value == 'undefined' || index.value == undefined)) {
                    } else {
                        isValidString = true;
                        str += '{' + '"key"' + ":" + '"' + index.key + '",' + '"value"' + ":" + '"' + index.value + '"' + '},'
                    }
                });
                var strin;
                if (isValidString) {
                    strin = str.substring(0, str.length - 1) + ']';
                } else {
                    strin = '';
                }
                return strin;
            }
        },
        controller: function ($http, $scope, $rootScope, seviceConfig, config, commonService, formValidate) {
            $scope.$watch(function () {
                return $scope.jsonString;
            }, function (newObj) {
                //$rootScope.$on('setCommunication', function (event, args) {
                if ($scope.jsonString === "" || $scope.jsonString === undefined || $scope.jsonString === null || $scope.jsonString === '[{ "key": "", "value": "" }]' || $scope.jsonString === '["":""]') {
                    $scope.communication = [{ "key": "", "value": "" }];
                } else {
                    $scope.communication = [];
                    $scope.communications = [];
                    $scope.phones = [];
                    var communicationObj = JSON.parse($scope.jsonString);
                    for (var key in communicationObj) {
                        var type = key;
                        var value = communicationObj[key];
                        $scope.communication.push({ key: value.key, value: value.value });
                    }
                }
            });

            var url = seviceConfig.clientCursorRemoteServer + 'ControlCodeCategory?';
            var cid;
            if (config.companyId === 'null' || config.companyId === null || config.companyId === 'undefined' || config.companyId === undefined) {
                cid = 0;
            } else {
                cid = config.companyId;
            }
            $http.get(url + "CompanyId=" + cid).success(function (response) {
                var _phoneTypes = [];
                for (var _index = 0; _index <= response.ControlCodes.length - 1; _index++) {
                    if (response.ControlCodes[_index].Status == "Active") {
                        _phoneTypes.push(response.ControlCodes[_index]);
                    }
                }
                $scope.phoneTypes = _phoneTypes;
                return response;
            });
            $scope.setComm = function () {               
                $scope.jsonString = getPhoneString($scope.communication);
              
            }
            $scope.addCommunication = function () {
                $scope.communication.push({ "key": "", "value": "" });
            }
            $scope.deleteCommunication = function (index) {
                if ($scope.communication.length === 1||$scope.isView) { return; }
                $scope.communication.splice(index, 1);
                $scope.jsonString = getPhoneString($scope.communication);

            }
            $scope.categoryChange = function () {
                $scope.jsonString = getPhoneString($scope.communication);
            }
            $rootScope.getCommunication = function () {
                if (formValidate.validate('communication').isValidationRequired) {
                }
                $scope.jsonString = commonService.getPhoneString($scope.communication);
                $scope.comm = $scope.jsonString;
            }
            function getPhoneString(obj) {
                var str = "[";
                angular.forEach(obj, function (index) {
                    str = str + "{" + '"' + "key" + '"' + ':' + '"' + index.key + '"' + "," + '"' + "value" + '"' + ":" + '"' + index.value + '"' + "},";
                });
                return str.substring(0, str.length - 1) + "]";
            }
        }
    }
});