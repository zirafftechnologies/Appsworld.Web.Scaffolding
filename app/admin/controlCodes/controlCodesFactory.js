(function () {
    'use strict';

    angular
        .module('controlCodes', [])
        .factory('controlCodesFactory', controlCodesFactory);

    controlCodesFactory.$inject = ['config', 'commonService','seviceConfig','gridCols'];

    function controlCodesFactory(config, commonService, seviceConfig,gridCols) {
        var service = {
            controlCodeCategoryObj: controlCodeCategoryObj,
            controlCodeChildObj: controlCodeChildObj,
            getData: getData,
            saveData: saveData,
            getModuleNames: getModuleNames,
            getById: getById
        };

        return service;
       

        function controlCodeCategoryObj() {
            var controlCodeCategory = {
                Id: -1, CompanyId: config.companyId, ControlCodeCategoryCode: null, ControlCodeCategoryDescription: null, DefaultValue: null, DataType: null, Format: null, UserCreated: config.userName, RecOrder: null, CreatedDate: new Date(), ModifiedBy: null, ModifiedDate: null, Version: null, Status: null, ControlCodes: []
            }
            return controlCodeCategory;
        }



        function controlCodeChildObj() {
            var controlCodeChild = {
                Id: -1, ControlCategoryId: -1, CodeValue: null, CodeKey: null, UserCreated: config.userName, CreatedDate: new Date(), ModifiedBy: null, ModifiedDate: null, RecOrder: null, Status: "Active", IsSystem: "User"
            }
            return controlCodeChild;
        }
        
        

        //options for kendo grid
        function getData(id) {
           
            var url = seviceConfig.clientCursorRemoteServer + "GetControlCodeCategories?companyId="+config.companyId+"&masterId="+id
            //var columns = [
            //    //{template: '<label class="checkbox checkbox-custom checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.selection.indexOf(dataItem.Id) > -1" ng-click="vm.toggleSelection(dataItem.Id,dataItem.Status)" /><i></i> </label>',
            //    //    width: '50px'},
            //     { template: '<input type="checkbox" id="{{dataItem.Id}}" class="k-checkbox rme" ng-checked="vm.selection.indexOf(dataItem.Id) > -1" ng-click="vm.toggleSelection(dataItem.Id,dataItem.Status)"><label class="k-checkbox-label pull-left" for="{{dataItem.Id}}"></label>', width: '50px' },
            //     { field: 'ControlCodeCategoryCode', template: '<a href="" ng-click="vm.getViewMode(dataItem.Id)">${ControlCodeCategoryCode}</a>', title: "Category", filterable: { cell: { operator: "contains" } } },
            //     {field: "ModuleNamesUsing", title: "ModuleNamesUsing" },
            //   //{ field: "Status", title: "Status", template: '<label ng-show="dataItem.Status==1>0">Active</label><label ng-show="dataItem.Status==2">Inactive</label>' }
            //     { field: "Status", title: "Status" }
            //]
            //return commonService.setAdvancedGridOptions(url, columns);
            return commonService.setAdvancedGridOptions(url, gridCols.ControlCodes());
        }

        //Method to save object
        function saveData(object) {
            //var saveurl = seviceConfig.clientCursorRemoteServer + "SaveControlCode"
            var saveurl = seviceConfig.clientCursorRemoteServer + "SaveControlCodeModel"
            return commonService.saveEntity(saveurl, object);
        }
        //Method to Modules DD
        function getModuleNames() {
            //var url=seviceConfig.clientCursorRemoteServer + "GetModuleNames?companyId=497"
            var url = seviceConfig.clientCursorRemoteServer+"GetModuleNames?companyId="+config.companyId
           return commonService.getEntities(url);
        }

        function getById(id) {
            //var url = seviceConfig.clientCursorRemoteServer + "GetControlCodeLookUp?companyId=497&categoryId="+id
            var url = seviceConfig.clientCursorRemoteServer + "GetControlCodeLookUp?companyId="+config.companyId+"&categoryId="+id
            return commonService.getEntities(url);
        }










    }
})();