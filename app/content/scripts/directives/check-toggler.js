'use strict';

/**
 * @ngdoc directive
 * @name appsworld.directive:checkToggler
 * @description
 * # checkToggler
 */
angular.module('appsworld')
  .directive('checkToggler', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('click', function(){

          if (element.hasClass('checked')) {
            element.removeClass('checked');
          } else {
            element.addClass('checked');
          }

        });
      }
    };
  });
