'use strict';

/**
 * @ngdoc directive
 * @name appsworld.directive:prettyprint
 * @description
 * # prettyprint
 */
/* jshint ignore:start */
angular.module('appsworld')
  .directive('prettyprint', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element) {
        element.html(prettyPrintOne(element.html(),'',true));
      }
    };
  });
/* jshint ignore:end */
