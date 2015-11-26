(function () {
    'use strict'

    var serviceId = 'genericFilters';
    angular.module('appsworld').factory(serviceId,
        [genericFilters]);
    function genericFilters() {
        var service = {

        }
        return service;
    }

    // this filter will use convert the date  UTC to  client browser time format.
    
    angular.module('appsworld').filter('clientZoneDateTimeFormat', function ($filter, config) {
       // console.log(config);
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input), config.dateFormat);

            //return _date.toUpperCase();
            return _date;

        };
    });









})();