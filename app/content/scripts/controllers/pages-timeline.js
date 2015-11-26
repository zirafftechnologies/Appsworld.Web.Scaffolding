'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:PagesTimelineCtrl
 * @description
 * # PagesTimelineCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('TimelineCtrl', function ($scope) {
    $scope.page = {
      title: 'Timeline',
      subtitle: 'Place subtitle here...'
    };
  });
