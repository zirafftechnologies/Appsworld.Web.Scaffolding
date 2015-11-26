'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:UiPortletsCtrl
 * @description
 * # UiPortletsCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('PortletsCtrl', function ($scope) {
    $scope.page = {
      title: 'Portlets',
      subtitle: 'Place subtitle here...'
    };
  });
