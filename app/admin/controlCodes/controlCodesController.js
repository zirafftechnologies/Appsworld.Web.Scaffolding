/*Page:Control Codes 
Author:Geetha*/

(function () {
    'use strict';

    angular
        .module('controlCodes')
        .controller('controlCodesController', controlCodesController);

    controlCodesController.$inject = ['$state', '$stateParams', 'config', 'toastr','$rootScope', 'controlCodesFactory'];

    function controlCodesController($state, $stateParams, config, toastr,$rootScope, controlCodesFactory) {
        //var logError = common.logger.getLogFn('controlcodes', 'error');
        // var logWarning = common.logger.getLogFn('controlcodes', 'warning');
        var vm = this;
        vm.editControlCode = editControlCode;
        vm.refresh = refresh;
        vm.onClick = onClick;
        vm.modulefun = modulefun;
        window.scrollTo(0, 0);
       
        getModules();
        function getModules() {
            controlCodesFactory.getModuleNames().then(function (data) {
                vm.modules = data.data[0].Lookups;
                //vm.id = data.data[0].Id;
                if ($rootScope.id) {
                    vm.moduleId = $rootScope.id;
                } else {
                    vm.moduleId=data.data[0].Id;
                }               
                getGridData();
            })
        }
        function getGridData() {
            //$('#grid').data("kendoGrid").setOptions(controlCodesFactory.getData(vm.id));
            $('#grid').data("kendoGrid").setOptions(controlCodesFactory.getData(vm.moduleId));
        }

        /*select module in the dd then grid refresh*/
        function modulefun() {
            //vm.id = document.getElementById("modulename").value;
            //$('#grid').data("kendoGrid").setOptions(controlCodesFactory.getData(vm.id));
            $rootScope.id = vm.moduleId;
            $('#grid').data("kendoGrid").setOptions(controlCodesFactory.getData($rootScope.id));
            vm.selection = [];
        }
        /*End select module in the dd then grid refresh*/


        function ok() {
            $modalInstance.close();
        }

       

        vm.selection = [];
        vm.toggleSelection = function toggleSelection(id, status,module) {
            var idx = vm.selection.indexOf(id);
            vm.selectedRowStatus = status;
            vm.moduleName = module;
            if (vm.selection) {
                vm.selection = [];
            }
            // is currently selected
            if (idx > -1) {
                vm.selection.splice(idx, 1);
                config.ControlCodeId = -1;
            }
                // is newly selected
            else {
                vm.selection.push(id);
            }
        };


        function editControlCode() {
            if (vm.selection.length == 0 || vm.selection.length > 1) {
                // logWarning('Please Select one Control Code');
                toastr.warning('Please Select One Controlcode');
                return;
            }
            //$location.path('/controlcodesdetails/' + $scope.selection + "/edit");
            $state.go('app.controlCode', { id: vm.selection, val: 'edit', module: vm.moduleName });
        }



        function refresh() {
            vm.selection = [];
            $("#grid").data("kendoGrid").dataSource.filter([]);
            $("#grid").data("kendoGrid").dataSource.read();
            vm.ed = 'disabled';
        }

        /*Clear Filters*/
        function onClick() {
            $("#grid").data("kendoGrid").dataSource.filter([]);
            vm.selection = [];
        }

        vm.getViewMode = function (id, module) {
            //$location.path('/controlcodesdetails/' + selectedId + "/view");
            $state.go('app.controlCode', { id: id, val: 'view', module: module });
        }

       


    }
})();




























