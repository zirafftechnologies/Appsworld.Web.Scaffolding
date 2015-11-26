'use strict';

/**
 * @ngdoc directive
 * @name appsworld.directive:offcanvasSidebar
 * @description
 * # offcanvasSidebar
 */
angular.module('appsworld')
  .directive('offcanvasSidebar', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {

        var app = angular.element('#minovate'),
            $window = angular.element(window),
            width = $window.width();

        element.on('click', function(e) {
          if (app.hasClass('offcanvas-opened')) {
            app.removeClass('offcanvas-opened');
          } else {
            app.addClass('offcanvas-opened');
          }
          e.preventDefault();
        });

      }
    };
  });
