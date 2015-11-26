angular.module("appsworld")
.directive("zBookmark", function () {
    return {
        restrict: "EA",
        scope: {
            entityname: '='
        },

        template: '<a href tooltip="{{tooltip}}" class="mui-btn mui-btn-default" ng-click="bookmark()"><i class="{{pinimge}}"></i></a>',

        controller: 'bookmarkctrl',
        controllerAs: 'vm'

    }
})
.controller('bookmarkctrl', function ($scope,$state, $window, $rootScope, $http, $moment, config,seviceConfig) {
   var vm = this;
    getbyid();
    function getbyid() {
        if (config.companyId!='null'&&config.companyId!=undefined) {
            $http.get(seviceConfig.clientCursorRemoteServer + "GetPinImageStatus?userName=" + config.userName + '&companyId=' + config.companyId + '&Text=' + $scope.entityname).success(function (response) {
                if (response == false) {
                    $scope.pinimge = "fa fa-thumb-tack";
                    $scope.tooltip = "Bookmark this link";
                }
                else {
                    $scope.pinimge = "fa fa-thumb-tack fa-rotate-45";
                    $scope.tooltip = "Unbookmark this link";
                }
                return response;
            });
        }
       
    }
    

    $scope.pin = $scope.entitypin;
    $scope.bookmark = function () {
        var pinStatus;
        if ($scope.pinimge == "fa fa-thumb-tack") {
            $scope.pinimge = "fa fa-thumb-tack fa-rotate-45";
            $scope.tooltip = "Unbookmark this link";
            pinStatus = 1;
        }
        else {
            $scope.pinimge = "fa fa-thumb-tack";
            $scope.tooltip = "Bookmark this link";
            pinStatus = 2;
        }
        var url = '#'+location.href.split('#')[1];
     
      
        //var url = $state.current.name + "({form:"+$stateParams.form+"})";
       
        //var localUrl;
        
        
       
        $scope.bookmark123 = {
            Id: config.primaryId, CompanyId: config.companyId, UserName: config.userName, UrlContext: url, Status: pinStatus, Text: $scope.entityname
        }
        //$scope.bookmark.Status = $scope.bookStatus == true ? 2 : 1;


        var URL = seviceConfig.clientCursorRemoteServer + "SavePinDTO";

        $http.post(URL, $scope.bookmark123).success(function (response) {
            $rootScope.$broadcast('datarefresh', true);

            // $scope.bookmark = response;
            //$scope.bookmark();

        }).error(function (err, status) {
            vm.isSaving = false;
        });
    
    }
})