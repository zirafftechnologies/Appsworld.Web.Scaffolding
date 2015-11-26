'use strict',
angular.module('addressbook')
.directive('addressModule', function () {
    return {
        restrict: 'E',
        templateUrl:'customDirectives/addressbook/addrbook.html',
        scope: {
            addressObjects: '=addressObjects',
            adType: '=adType',
            adId: '=adId',
            isView:'='
        },
        require: 'ngModel',
        link:function(scope,element,attr,ngModel){
            scope.$watch('addressObjects', function () {
                ngModel.$setViewValue(scope.addressObjects);
            })
        },
      
        controller: function ($scope, addressBookDataContext, $rootScope, addrConfig, toastr, commonService) {

            $rootScope.addtype = $scope.adType;
            $rootScope.addtypeid = $scope.adId;

            $scope.selection = [];
            $scope.toggleSelection = function toggleSelection(row) {
                var idx = $scope.selection.indexOf(row);
                if ($scope.selection) {
                    $scope.selection = [];
                }
                // is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                }
                    // is newly selected
                else {
                    $scope.selection.push(row);
                }
            };
            $scope.editAddress = function () {
                if ($scope.selection.length === 0 || $scope.selection.length > 1) {
                    toastr.warning('Please Select One Address');
                    return;
                }
                addrConfig.addressObject =angular.copy($scope.selection[0]);
            }
            $scope.deleteAddress = function (index) {
                if ($scope.selection.length === 0 || $scope.selection.length > 1) {
                    toastr.warning('Please Select One Address');
                    return;
                }
                commonService.confirmationDialog('Confirm Delete ?', 'Are you sure do you really want to delete address ?', 'Ok', 'Cancel').then(function (res) {
                    if (res === 'ok') {
                        angular.forEach($scope.addressObjects, function (index, key) {
                            if (index.Id === $scope.selection[0].Id) {
                                $scope.addressObjects.splice(key, 1);
                            }
                        });
                    }
                });                
            }
            $rootScope.$on('saveAddressObject', function (event, args) {
                if (args.data.type === 'new') {
                    $scope.addressObjects.push(args.data.object);
                } else if (args.data.type === 'edit') {
                    angular.forEach($scope.addressObjects, function (index, key) {
                        if (index.Id === args.data.object.Id) {
                            $scope.addressObjects[key] = args.data.object;
                        }
                    });
                }
                $scope.selection = [];
            });
            $rootScope.$on('cancelAddressObject', function () {
                $scope.selection = [];
            })
        }
    }
})