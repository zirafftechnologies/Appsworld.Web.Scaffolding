(function () {
    'use strict';

    var controllerId = 'dashboard';
    var app = angular.module('appsworld');
    app.controller('dashboard', ['$window','$location', 'localStorageService', function ($window,$location, localStorageService) {
            /* jshint validthis:true */
            var vm = this;
            vm.title = 'Dashboard';

            //alert($window.localStorage && $window.localStorage.getItem('TokenManager.token'));

            //var _authData = $window.localStorage.getItem('TokenManager.token');

            //var _authDataDetails = JSON.parse(_authData);

            //console.log(_authDataDetails.id_token);

            //console.log(_authDataDetails.profile.email);
                

            activate();
            function activate() { }

        }]);

        app.controller('PieChartCtrl', ['$scope', function ($scope) {

            $scope.dataset = [
              { label: 'Chrome', data: 30 },
              { label: 'Firefox', data: 15 },
              { label: 'Safari', data: 15 },
              { label: 'IE', data: 10 },
              { label: 'Opera', data: 5 },
              { label: 'Other', data: 10 }
            ];

            $scope.options = {
                series: {
                    pie: {
                        show: true,
                        innerRadius: 0,
                        stroke: {
                            width: 0
                        },
                        label: {
                            show: true,
                            threshold: 0.05
                        }
                    }
                },
                colors: ['#428bca', '#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de', '#616f77'],
                grid: {
                    hoverable: true,
                    clickable: true,
                    borderWidth: 0,
                    color: '#ccc'
                },
                tooltip: true,
                tooltipOpts: { content: '%s: %p.0%' }
            };
        }]);

      
        

})();
