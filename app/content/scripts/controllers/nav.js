'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('NavCtrl', function ($scope) {
    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: true,
      isThirdOpen: true
    };
  });