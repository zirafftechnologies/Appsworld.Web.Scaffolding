'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('HelpCtrl', function ($scope) {
     $scope.page = {
      title: 'Documentation',
      subtitle: 'Place subtitle here...'
    };
  });
