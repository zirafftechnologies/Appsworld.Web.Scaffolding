/*
Page:Company Grid Form
Author:Subbareddy

*/

(function () {
    'use strict';

    var controllerId = 'company';
    angular.module('companySetUp').controller(controllerId,
        ['companyDataContext', '$state', 'toastr', 'config', 'customValidations', company]);
    function company(companyDataContext, $state, toastr, config, customValidations) {
        // Always define vm first
        var vm = this;
        vm.editCompany = editCompany;
        vm.disableCompany = disableCompany;
        vm.getViewMode = getViewMode;
        vm.clearFilters = clearFilters;
        window.scrollTo(0, 0);
        vm.companies = companyDataContext.loadGrid();
        vm.selection = [];
        vm.isDisableValReq = false;
        vm.refresh = refresh;
        vm.isAdmin = config.userRole === 'admin' ? true : false;
        if (config.userRole === 'admin') {
            vm.directive = true;
           // $('#editbtn').show();
        } else {
            vm.directive = false;
           // $('#editbtn').hide();
        }
        // toggle selection for a given employee by name
        vm.toggleSelection = function toggleSelection(id, status) {
            vm.isDisableValReq = false;
            var idx = vm.selection.indexOf(id);
            vm.selectedRowStatus = status;
            if (vm.selection) {
                vm.selection = [];
            }
            // is currently selected
            if (idx > -1) {
                vm.selection.splice(idx, 1);
            }
                // is newly selected
            else {
                vm.selection.push(id);
            }
        };
        function clearFilters() {
            $("#companyGrid").data("kendoGrid").dataSource.filter([]);
        }
        function refresh()
        {
            vm.selection = [];
            clearFilters();
            $('#companyGrid').data("kendoGrid").dataSource.read();
        }
        function editCompany() {
            if (vm.selection.length < 1 || vm.selection.length > 1) {
                toastr.warning('Please Select One Company');
                return;
            }
            return _goNextState(vm.selection[0].Id,false);
        }

        function disableCompany() {
            if (vm.selection.length < 1 || vm.selection.length > 1) {
                toastr.warning('Please Select One Company');
                return;
            }
            if (config.userRole === 'Super User') {
                if (customValidations.compareWithNewDate(kendo.toString(kendo.parseDate(vm.selection[0].Expirydate, 'yyyy-MM-dd'), 'dd/MM/yyyy')) !== true) {
                    vm.isDisableValReq = true;
                    return;
                }
            }
            
            companyDataContext.disableCompany(vm.selection[0].Id, vm.selection[0].Status).then(function () {
                vm.selection = [];
                $('#companyGrid').data("kendoGrid").dataSource.read();
            });
           
        }

        function getViewMode(id) {
            return _goNextState(id.Id,true);
        }

        function _goNextState(id,isView) {
            $state.go('app.company_addEdit', {
                id: id,
                isView: isView
            })
        }

    }
})();