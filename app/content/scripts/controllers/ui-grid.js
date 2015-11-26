'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:UiGridCtrl
 * @description
 * # UiGridCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('GridCtrl', function ($scope) {
    $scope.page = {
      title: 'Grid',
      subtitle: 'Place subtitle here...'
    };
  });
