'use strict';

/**
 * @ngdoc function
 * @name appsworld.controller:FormsWizardCtrl
 * @description
 * # FormsWizardCtrl
 * Controller of the appsworld
 */
angular.module('appsworld')
  .controller('FormWizardCtrl', function ($scope) {
    $scope.page = {
      title: 'Form Wizard',
      subtitle: 'Place subtitle here...'
    };
  });
