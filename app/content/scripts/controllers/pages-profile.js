'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:PagesProfileCtrl
 * @description
 * # PagesProfileCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('ProfileCtrl', function ($scope) {
    $scope.page = {
      title: 'Profile Page',
      subtitle: 'Place subtitle here...'
    };
  });
