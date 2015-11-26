'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:MailInboxCtrl
 * @description
 * # MailInboxCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('MailInboxCtrl', function ($scope, $resource) {
    $scope.mails = $resource('scripts/jsons/mails.json').query();

    $scope.selectedAll = false;

    $scope.selectAll = function () {

      if ($scope.selectedAll) {
        $scope.selectedAll = false;
      } else {
        $scope.selectedAll = true;
      }

      angular.forEach($scope.mails, function(mail) {
        mail.selected = $scope.selectedAll;
      });
    };
  });
