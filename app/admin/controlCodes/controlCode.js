/*Page:control codes 
Author:Geetha*/

(function () {
    'use strict';

    angular
        .module('controlCodes')
        .controller('controlcode', controlcode);

    controlcode.$inject = ['$state', '$scope','commonService','bootstrap.dialog', 'genericFilters', '$stateParams', '$window', 'config', 'toastr','$timeout', 'controlCodesFactory'];

    function controlcode($state, $scope, commonService,dialog, genericFilters, $stateParams, $window,
        config, toastr, $timeout, controlCodesFactory) {
       
        var vm = this;
        //var keyCodes = config.keyCodes;
        //var entityName = 'controlCodeCategories';
        //var saveControlCodeURL = "breeze/ClientCursor/SaveControlCode";
       //var ControlCodeCategoryURL = "breeze/Leads/ControlCodeCategories";
        //var logError = common.logger.getLogFn(controllerId, 'error');
        //var logWarning = common.logger.getLogFn(controllerId, 'warn');
       //var logSuccess = common.logger.getLogFn(controllerId, 'success');
        //var $q = common.$q;
       //var Predicate = breeze.Predicate;
       //var manager = datacontext.manager;
        vm.datacodecheck = false;
        vm.cancelControlCode = cancelControlCode;
        vm.saveControlCode = saveControlCode;
        vm.cancelchild = cancelchild;
        vm.saveChildControlCode = saveChildControlCode;
        vm.deleteChildControlCode = deleteChildControlCode;
        window.scrollTo(0, 0);
        vm.hasChanges = false;
        vm.isSaving = false;
        vm.showControlCodeForm = false;
        vm.showfooterdiv = true;
        vm.addChild = addChild;
        vm.editChild = editChild;
        //vm.Status = false;
        vm.controlCodeList1 = [];
        vm.selectedControlCodeID = null;
        vm.childCodeValue = null;
       
       // vm.refresh = refresh;
        vm.save = true;
        vm.add = true;
        vm.edit = true;
        vm.inactive = true;
        
       
        //vm.controlCodeCategory = {
        //    Id: -1, CompanyId: -1, ControlCodeCategoryCode: null, ControlCodeCategoryDescription: null, DataType: null, RecOrder: null, ModuleNamesUsing: '', DefaultValue: null,
        //    Format: null, UserCreated: config.userName, CreatedDate: new Date(), ModifiedBy: null, ModifiedDate: null, Version: null, Status: false, ControlCodes: []
        //};

        vm.controlCodeCategory = controlCodesFactory.controlCodeCategoryObj();

        vm.controlCodeList = [];

        //vm.controlCodeChild = {
        //    Id: -1, ControlCategoryId: -1, CodeKey: "test", CodeValue: "test", RecOrder: null, UserCreated: null, CreatedDate: new Date(), ModifiedBy: null, ModifiedDate: null, Version: null, Status: false
        //};


        Object.defineProperty(vm, 'canSave', { get: canSave });

        activate();

        function activate() {
           // getModules();
            getControlCodeById();
        }


        /* errmsg div close,show */
        $scope.closeDiv = function () {
            $("#errormsg").hide();
        }
        /*end errmsg div close,show */


        function addChild() {
            vm.errorcampaign = false;
            vm.errorcampaign1 = false;
            $("#childsavebtn").show();
            //$("#createdshow1").hide();
            //$("#modifiedshow1").hide();
            vm.selectedControlCodeID = null;
            vm.showControlCodeForm = true;
            vm.showfooterdiv = false;
            //vm.showvalueDiv = true;
            //vm.showkeyDiv = true;
            //vm.showvalueDiv1 = false;
            //vm.showkeyDiv1 = false;
            vm.IsSystemshow = false;
            vm.IsSystem = "user";
            vm.isnew = true;
            //vm.childStatus = true;
            vm.childCodeValue = null;
            vm.selection = [];
            //vm.controlCodeChild = { Id: -1, ControlCategoryId: -1, CodeValue: null, CodeKey: null, UserCreated: null, CreatedDate: null, ModifiedBy: null, ModifiedDate: null, RecOrder: null, Status: true, IsSystem: "User" };
            vm.controlCodeChild = controlCodesFactory.controlCodeChildObj();
            return vm.controlCodeChild;
        }



        function cancelControlCode() {
            vm.selection = [];
            $state.go('app.controlCodes');
        }

        function cancelchild() {
            vm.validator.destroy();
            //vm.validator.hideMessages();
            vm.errorcampaign1 = false;
            vm.showControlCodeForm = false;
            document.getElementById("filedid").disabled = false;
            vm.selection = [];
            $("#errormsg").hide();
            vm.showfooterdiv = true;
        }

        vm.currSort = [];
        /*helper dependency functionality missing*/
        vm.sortableOptions = {
            'ui-floating': true,
            containment: 'parent',
            cursor: 'move',
            helper: "clone",
            scroll: false,
            axis: 'y',
            tolerance: 'pointer',
            items: '>tr',
            forcePlaceholderSize: true,
            forceHelperSize: true,
            zIndex: 9999,
            connectWith: ".tablecontainer",
            placeholder: "row",
            stop: function (e, ui) {
                var item = ui.item.scope().item;
                var index = ui.item.parent();
                var fromIndex = ui.item.sortable.index;
                var toIndex = ui.item.sortable.dropindex;
                console.log('moved', item, fromIndex, toIndex);
                //for (var i = 0; i <= vm.controlCodeCategory.ControlCodes.length - 1; i++) {
                //}
                var $list = ui.item.parent();
                $scope.$apply(function () {
                    $scope.currSort = $list.sortable("toArray");
                    var j = 0;
                    for (var i = 0; i <= $scope.currSort.length - 1; i++) {
                     vm.controlCodeCategory.ControlCodes[i].RecOrder = i + 1;
                    }
                })
            },
        };



        function saveChildControlCode() {
          var fieldvalue=document.getElementById("filedid").value
          if (fieldvalue == "") {
                vm.showControlCodeForm = true;
                vm.errorcampaign1 = true;
                vm.dataerror1 = "Field is required"
                return true;
            }
          if (fieldvalue.trim().length == 0) {
              vm.showControlCodeForm = true;
              vm.errorcampaign1 = true;
              vm.dataerror1 = "Field is required"
              return true;
            }
            if (vm.isnew == true) {
                vm.controlCodeChild.CodeValue = vm.childCodeValue;
                vm.controlCodeChild.CodeKey = vm.controlCodeChild.CodeValue;
               // vm.controlCodeChild.CodeKey = vm.childCodeValue;
                //vm.controlCodeChild.Status = vm.childStatus == true ? 1 : 2;
                vm.controlCodeChild.RecOrder = vm.controlCodeCategory.ControlCodes.length + 1;
                vm.showControlCodeForm = false;
                vm.showfooterdiv = true;
                vm.selection = [];
                for (var index = 0; index <= vm.controlCodeList.length - 1; index++) {
                    vm.controlCodeChild.Id = vm.controlCodeChild.Id - 1;
                    if (vm.controlCodeChild.CodeValue == vm.controlCodeList[index].CodeValue) {
                        //$("#errormsg").show();
                        //vm.error = 'ControlCode already exist';
                        vm.errorcampaign1 = true;
                        vm.dataerror1 = "ControlCode already exist"
                        vm.showControlCodeForm = true;
                        vm.showfooterdiv = false;
                        window.scrollTo(0, 0);
                        return;
                    }
                    $("#errormsg").hide();
                }
                vm.controlCodeList.push(vm.controlCodeChild);
                filterstatus();
            }
            else {
                for (var index = 0; index <= vm.controlCodeList.length - 1; index++) {
                    var valfield = document.getElementById("filedid").value;
                    if (valfield == vm.controlCodeList[index].CodeValue) {
                        if (vm.controlCodeList[index].Id != vm.selection) {
                            //$("#errormsg").show();
                            //vm.error = 'ControlCode already exist';
                            vm.errorcampaign1 = true;
                            vm.dataerror1 = "ControlCode already exist"
                            vm.showControlCodeForm = true;
                            vm.showfooterdiv = false;
                            window.scrollTo(0, 0);
                            return;
                        }
                    }
                }
                for (var index = 0; index <= vm.controlCodeList.length - 1; index++) {

                    if (vm.controlCodeList[index].CodeValue == vm.childCodeValue) {
                        //select save
                        if (vm.controlCodeList[index].Id == vm.selection) {
                            //vm.controlCodeChild.Status = vm.childStatus == true ? 1 : 2;
                            vm.controlCodeChild.Status == "Active" ? "Active" : "Inactive";
                            vm.showControlCodeForm = false;
                            vm.selection = [];
                            vm.showfooterdiv = true;
                        }
                       
                            //select already existing
                        else {
                            $("#errormsg").show();
                            vm.error = 'ControlCode already exist';
                            vm.showControlCodeForm = true;
                            vm.showfooterdiv = false;
                            window.scrollTo(0, 0);
                            return;
                        }
                    }
                   
                   
                    
                    
                        //select change save
                    else if (vm.controlCodeList[index].Id == vm.selection) {
                        vm.controlCodeChild.CodeValue = vm.childCodeValue;
                        vm.controlCodeChild.CodeKey = vm.childCodeValue;
                        //vm.controlCodeChild.Status = vm.childStatus == true ? 1 : 2;
                        vm.controlCodeChild.Status == "Active" ? "Active" : "Inactive";
                        vm.showControlCodeForm = false;
                        vm.selection = [];
                        vm.showfooterdiv = true;
                    }
                }
            }
            $("#defaultvalue").data("kendoDropDownList").dataSource.read();
            vm.errorcampaign1 = false;
            $("#errormsg").hide();
        }

        function canSave() { return vm.hasChanges && !vm.isSaving; }

        function getControlCodeById() {
            vm.showCheckboxLabel = false;
            var val = $stateParams.id;
            var module = $stateParams.module;
            vm.errorcampaign = false;
            //if (val == 'new') {
            //    vm.status = true;
            //    $("#createdshow").hide();
            //    $("#modifiedshow").hide();
            //    vm.controlCodeCategory = {
            //        Id: config.primoryId, CompanyId: config.companyId, ControlCodeCategoryCode: null, ControlCodeCategoryDescription: null, DefaultValue: null,
            //      DataType: null, Format: null, UserCreated: config.userName, RecOrder: null,
            //      CreatedDate: null, ModifiedBy: null, ModifiedDate: null, Version: null, Status: true, ControlCodes: []
            //    };
            //    config.primoryId += -1;
            //    return vm.controlCodeCategory;
            //}
           // var deferred = $q.defer();
            //$http.get("http://appsworldapicheck.azurewebsites.net/breeze/ClientCursor/ControlCodeCategoryById?Id=" + val).success(function (response) {
                  controlCodesFactory.getById(val).success(function (response) {
                      vm.controlCodeCategory = response;
                      vm.moduleName = module;
                  if (vm.controlCodeCategory.ModifiedDate == '' || vm.controlCodeCategory.ModifiedDate == undefined) {
                      $("#createdshow").show();
                      $("#modifiedshow").hide();
                      vm.showfooterdiv = true;
                  }
                  if (vm.controlCodeCategory.ModuleNamesUsing == null || vm.controlCodeCategory.ModuleNamesUsing == '') {
                      vm.controlCodeCategory.ModuleNamesUsing = [];
                  }
                  vm.controlCodeList = vm.controlCodeCategory.ControlCodes;
                  vm.DefaultValue=vm.controlCodeCategory.DefaultValue;
                  filterstatus();
                 // vm.Status = vm.controlCodeCategory.Status == 2;
                 // deferred.resolve(response);
                  if ($stateParams.val === "view") {
                      vm.save = false;
                      vm.add = false;
                      vm.edit = false;
                      vm.inactive = false;
                      document.getElementById("defaultvalue").disabled = true;
                      $timeout(function () {
                          var formName = ["form1"];
                          commonService.getViewMode(formName);
                      }, 500);
                  }
              }).error(function (err, status) {
                 // deferred.reject(err);
              })
           // return deferred.promise;
        }

        /* Default value field dd data*/
        vm.controlcodes = {
            dataSource: {
                data: vm.controlCodeList1,
            }
        }

        function filterstatus() {
            vm.controlCodeList1 = [];
            for (var i = 0; i <= vm.controlCodeList.length - 1; i++) {
                if (vm.controlCodeList[i].Status == "Active") {
                    vm.controlCodeList1.push(vm.controlCodeList[i]);
                }
            }
            $("#defaultvalue").data("kendoDropDownList").dataSource.read();
            vm.controlCodeCategory.DefaultValue = vm.DefaultValue;
        }
        /*End Default value field dd data*/
       
    
        function saveControlCode() {
            if (vm.validator.validate()) {
                vm.isSaving = true;
                //var deferred = $q.defer();
                // var URL = "http://appsworldapicheck.azurewebsites.net/breeze/ClientCursor/SaveControlCode";
                //vm.controlCodeCategory.Status = vm.Status == true ? 2 : 1;
                if ($stateParams.id != 'new') {
                    vm.controlCodeCategory.ModifiedDate = new Date();
                    vm.controlCodeCategory.ModifiedBy = config.userName;
                }
                vm.controlCodeCategory.DefaultValue = document.getElementById("defaultvalue").value;
                for (var i = 0; i <= vm.controlCodeCategory.ControlCodes.length - 1; i++) {
                    if (vm.controlCodeCategory.ControlCodes[i].CodeKey == vm.controlCodeCategory.DefaultValue) {
                        vm.controlCodeCategory.ControlCodes[i].IsDefault = true;
                    }
                }
                // $http.post(URL, vm.controlCodeCategory).success(function (response) {
                controlCodesFactory.saveData(vm.controlCodeCategory).success(function (response) {
                    //vm.controlCodeCategory = response;
                    //deferred.resolve(response);
                    vm.isSaving = false;
                    toastr.success('Saved Data');
                    $state.go('app.controlCodes');
                }).error(function (err, status) {
                    vm.errorcampaign = true;
                    vm.dataerror = err.Message;
                })
            }
            else {
                vm.errorcampaign = true;
                vm.dataerror = 'Please fill out the mandatory fields';
                window.scrollTo(0, 0);
            }
        }



        vm.selection = [];
        vm.toggleSelection = function toggleSelection(id, status) {
            var idx = vm.selection.indexOf(id)
            vm.selectedRowStatus = status;
            if (vm.selection) {
                vm.selection = [];
            }
            if (idx > -1) {
                vm.selection.splice(idx, 1)
            }
            else {
                vm.selection.push(id)
            }
        };



        function editChild(id, text) {
            //click on Detail control codes should be in disable when user in view mode .. 
            if ($stateParams.val === "view") {
                vm.showControlCodeForm = false;
                return;
            }
            if (text === "view") { vm.selection[0] = id; }
            if (vm.selection.length == 0 || vm.selection.length > 1) {
                toastr.warning('Please Select One Controlcode');
                return;
            }
            vm.errorcampaign = false;
            vm.isnew = false;
            $("#childsavebtn").show();
            for (var index = 0; index <= vm.controlCodeList.length - 1; index++) {
                for (var idx = 0; idx <= vm.selection.length - 1; idx++) {
                    if (vm.controlCodeList[index].Id == vm.selection[idx]) {
                        vm.controlCodeChild = vm.controlCodeList[index];
                        vm.childCodeValue = vm.controlCodeChild.CodeValue;
                        vm.childCodeValue = vm.controlCodeChild.CodeKey;
                        vm.controlCodeChild.Status == "Active" ? "Active" : "Inactive";
                    }
                }
            }

            if (vm.controlCodeChild.IsSystem) {
                vm.IsSystemshow = true;
            }
            if (vm.controlCodeChild.IsSystem == "System") {
                $("#childsavebtn").hide();
                document.getElementById("filedid").disabled = true;
            }
            else {
                if (text === "view") {
                    vm.showControlCodeForm = true;
                    vm.selection = [];
                    $("#childsavebtn").hide();
                    vm.IsSystemshow = false;
                    document.getElementById("filedid").disabled = true;
                    return;
                }
                document.getElementById("filedid").disabled = false;
                vm.IsSystemshow = false;
            }
            vm.showControlCodeForm = true;
            vm.showfooterdiv = false;

        }



        function deleteChildControlCode() {
           
            if (vm.selection.length == 0 || vm.selection.length > 1) {
                toastr.warning('Please Select One Controlcode');
                return;
            }
            var title, msg;
            vm.datacodecheck = true;
            vm.errorcampaign = false;
            
            for (var index = 0; index <= vm.controlCodeList.length - 1; index++) {
                for (var idx = 0; idx <= vm.selection.length - 1; idx++) {
                    if (vm.controlCodeList[index].Id == vm.selection[idx]) {
                        vm.controlCodeChild = vm.controlCodeList[index];
                        if (vm.controlCodeChild.IsSystem == "System") {
                            window.scrollTo(0, 0);
                            vm.errorcampaign = true;
                            vm.dataerror = "System Value can not be Inactive";
                            vm.selection = [];
                            return true;
                        }
                        vm.DefaultValue1 = document.getElementById("defaultvalue").value;
                        if (vm.DefaultValue1 == vm.controlCodeChild.CodeValue) {
                            window.scrollTo(0, 0);
                            vm.errorcampaign = true;
                            vm.dataerror = "Default Value can not be Inactive";
                            vm.selection = [];
                            return true;
                        }
                        var bool;
                        if (vm.controlCodeChild.Status == "Active") {
                            bool = 'Active';
                           // msg = 'Inactive Control Code ?',
                           // title = 'Confirm Inactive'
                        } else if (vm.controlCodeChild.Status == "Inactive") {
                            bool = 'Inactive';
                           // msg = 'Active Control Code?',
                           // title = 'Confirm Active'
                        }
                    }
                }
            }
            //return dialog.confirmationDialog(title, msg, 'ok', 'cancel').then(function (ok) {
            //    if (ok == "ok") {
            //        vm.errorcampaign = false;
            //        vm.controlCodeChild.Status = vm.controlCodeChild.Status == 2 ? 1 : 2;
            //        vm.controlCodeChild.Status = vm.controlCodeChild.Status == 'Inactive' ? 'Active' : 'Inactive';
            //        filterstatus();
            //        vm.selection = [];
            //        return ok;
            //    }
            //    else {
            //        vm.selection = [];
            //    }
            //});
            //$scope.$apply(function () {
            //    vm.controlCodeChild.Status = !vm.controlCodeChild.Status; vm.controlCodeChild.Status = vm.controlCodeChild.Status == 'Inactive' ? 'Active' : 'Inactive';
            //});

            return commonService.disableEntity(vm.selection, 'Common.ControlCode', bool, 'Controlcode', 'Controlcode').then(function (data) {
                if (data != undefined) {
                    //onClick();
                    vm.selection = [];
                    //vm.controlCodeChild.Status = !vm.controlCodeChild.Status; vm.controlCodeChild.Status = vm.controlCodeChild.Status == 'Inactive' ? 'Active' : 'Inactive';
                    vm.controlCodeChild.Status = vm.controlCodeChild.Status == 'Inactive' ? 'Active' : 'Inactive';
                    //filterstatus();
                    return data;
                }
                else {
                    vm.selection = [];
                }
                
            });
            }


       
       
       

        //function refresh() {
        //    vm.errorcampaign = false;
        //    vm.selection = [];
        //}


        // getting Module List
        //vm.curserSelection = [];
        //vm.cursertoggleSelection = function cursertoggleSelection(id) {
        //    var idx = vm.curserSelection.indexOf(id);

        //    //is currently selected
        //    if (idx > -1) {
        //        vm.curserSelection.splice(idx, 1);
        //    }
        //        // is newly selected
        //    else {
        //        vm.curserSelection.push(id);
        //    }
        //};

        //function getModules() {
        //    $http.get(config.remoteServer + '/breeze/MasterManagement/ModuleMasters?$filter=CompanyId eq ' + config.companyId).then(function (data) {
        //        vm.modules = data.data;
        //        return data;
        //    })
        //}






    }
})();