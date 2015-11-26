'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('LoginCtrl', function ($scope, $state) {
    $scope.login = function() {
      $state.go('app.dashboard');
    };
  });
