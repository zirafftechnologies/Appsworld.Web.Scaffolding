'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:PagesChatCtrl
 * @description
 * # PagesChatCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('ChatCtrl', function ($scope, $resource) {
    $scope.inbox = $resource('scripts/jsons/chats.json').query();

    $scope.archive = function(index) {
      $scope.inbox.splice(index, 1);
    };
  });
