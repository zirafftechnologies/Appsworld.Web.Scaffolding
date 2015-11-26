(function () {
    'use strict';

    var serviceId = 'companyDataContext';
    angular.module('companySetUp',[]).factory(serviceId,
        ['commonService', 'seviceConfig','config','bootstrap.dialog','gridCols', company]);

    function company(commonService, seviceConfig, config, dialog, gridCols) {
        var service = {
            fileSaveUrl:seviceConfig.remoteServer+"breeze/azurestorage/uploadlogo",// this url using for company logo upload in subsidary company
            loadGrid: loadGrid,
            getCompanyById: getCompanyById,           
            createCompany: createCompany,
            getCompanyObject: getCompanyObject,
            getCompanyusersGrid: getCompanyusersGrid,
            saveCompany: saveCompany,
            createCompanyUser: createCompanyUser,
            saveCompanyUser: saveCompanyUser,
            disableCompany:disableCompany,
            disableCompanyUser: disableCompanyUser,
            getCompanyActiveUsersCount:getCompanyActiveUsersCount,
            getSelectedUser: getSelectedUser,
            deleteUser:deleteUser,
            getCursorSelectionCount: getCursorSelectionCount,

        }
        return service;

        function loadGrid()
        {
            var companyId,gridColumns;
            companyId = config.userRole == 'Super User' ? 0 : config.companyId;
            gridColumns = config.userRole == 'Super User' ? gridCols.Company() : gridCols.SubCompany();
            var url = seviceConfig.commonRemoteServer + 'GetAllCompany?companyId='+companyId+'&$inlinecount=allpages&$orderby=CreatedDate desc';
            return commonService.setPagedGridOptions(url, gridColumns);
        }

        function getCompanyById(id)
        {
            return commonService.getEntities(seviceConfig.clientCursorClientRemoteServer + 'GetCompanyModelById?Id=' + id);
        }
        
        function createCompany()
        {
            return commonService.getEntities(seviceConfig.clientCursorClientRemoteServer + 'CreateCompany');
        }

        function getCompanyObject(object)
        {
                     
            var companyObj={
                  Id: object.Id == 0 ? null : object.Id, ParentId: object.ParentId, RegistrationNo: object.RegistrationNo, Name: object.Name, ShortName: object.ShortName, Remarks: object.Remarks, UserCreated: object.UserCreated == null ? config.userName : object.UserCreated, ExpiryDate: object.ExpiryDate, ModifiedDate: object.ModifiedDate, ModifiedBy: object.ModifiedBy, CompanyUsers: object.CompanyUsers, ModulesCompact: object.ModulesCompact, CreatedDate: object.CreatedDate, Status: object.Status === 'Active' ? false : true, Small: object.Small, LogoId: object.LogoId, SalutationLU: object.SalutationLU, Addresses: object.Addresses, Communication: object.Communication
            }
            return companyObj;
        }

        function getCompanyusersGrid(data)
        {
           return {
                dataSource: data,
                sortable: true,
                filterable: true,
                pageable: {
                    refresh: true,
                    buttonsCount: 5,
                    pageSize: 20
                },
                columns: [
                    {
                        template: '   <label class="checkbox checkbox-custom-alt checkbox-custom-sm m-0"> <input type="checkbox" id="{{dataItem.Id}}" name="checkbox-inline" ng-checked="vm.userSelection.indexOf(dataItem) > -1" ng-click="vm.toggleUserSelection(dataItem)" /><i></i> </label>',
                        width: '50px'
                    },                    
                    { field: "FirstName", title: "Name",template:'<a href="" ng-click="vm.getUserViewMode(dataItem)">${FirstName}</a>'},
                     { field: "Username", title: "User Name" },
                    { field: 'Status', title: 'Status', template: '<lable ng-show="dataItem.Id>0">#:Status#</lable><label ng-show="dataItem.Id<0" style="color: orange;">Pending for Save</label>' },
               
                ]
            }
        }

        function saveCompany(companyObj)
        {
            return commonService.saveEntity(seviceConfig.clientCursorRemoteServer + 'SaveCompanyModel', _setsaveCompanyObj(companyObj));
        }

        function _setsaveCompanyObj(companyObj, addressObj)
        {
            var _moduleCompact = companyObj.ModulesCompact;
            companyObj.ParentId = config.userRole == 'admin' ? config.companyId : null;      
            if (companyObj.ExpiryDate) {
             
                if (typeof (companyObj.ExpiryDate) == 'string') {
                    companyObj.ExpiryDate = companyObj.ExpiryDate;
                }
                else {                    
                    companyObj.ExpiryDate = new Date(companyObj.ExpiryDate.setDate(companyObj.ExpiryDate.getDate() + 1)); // this line is added to fix date lessing -1 in company edit mode
                }
               
            }           
            return {
                Id: companyObj.Id, ParentId: companyObj.ParentId,ExpiryDate:companyObj.ExpiryDate, RegistrationNo: companyObj.RegistrationNo, Name: companyObj.Name, ShortName: companyObj.ShortName, Remarks: companyObj.Remarks, UserCreated: companyObj.UserCreated, ModifiedDate: new Date(), ModifiedBy: companyObj.ModifiedBy, CompanyUsers: companyObj.CompanyUsers, ModulesCompact: _moduleCompact,CreatedDate: companyObj.CreatedDate == null ? new Date() : companyObj.CreatedDate, Status: companyObj.Status == true ? 'Inactive' : 'Active',Small:companyObj.Small,LogoId:companyObj.LogoId,Addresses:companyObj.Addresses,Communication:companyObj.Communication
            }
        }

        function disableCompany(id, status) {
            
         //   status = status == 'Active' ? 'InActive' : 'Active';
            var tabName = 'Common.Company';
            function disable() {
                var st = status === 'Active' ? 'Inactive' : 'Active';
                return dialog.confirmationDialog('Confirm ' + st + ' ?', 'Are you sure do you really want to ' + st + ' Company ?', 'Ok', 'Cancel').then(function (ok) {
                    if (ok === 'ok') {
                        return commonService.getEntities(seviceConfig.authenticationRemoteServer + 'EnableOrDisable?Id=' + id + '&tableName=' + tabName + '&Status=' + status);
                    }
                })
            }

            if (status === 'Active' && config.userRole==='admin') {
                return dialog.confirmationDialog('Company Deactivation', 'Deactivating your company will Effect ongoing transactions of the company', 'Ok', 'Cancel').then(function (ok) {
                    if (ok === 'ok') {
                       return disable();
                    }
                });
            } else if (status === 'Inactive') {
               return disable();
            } else if (status === 'Active' && config.userRole !== 'admin') {
                return disable();
            }
            
        }

        //Company User

        function createCompanyUser() {
           var user= {
                 Id:config.primaryId, FirstName: "", LastName: "", Username: "", Status: 'Active' ,Salutation:'',Remarks:''
           }
           config.primaryId + 1;
           return user;
        }

        function getSelectedUser(Object,Id)
        {
            var _selectedObject;
            for (var _index = 0; _index <= Object.length - 1; _index++)
            {
                if (Id == Object[_index].Id)
                {
                    _selectedObject = Object[_index];
                }
            }
            return _selectedObject;
        }

        function saveCompanyUser(srcObj,Object,isEdit)
        {
            if(isEdit)
            {
                angular.forEach(srcObj, function (index) {
                    if (index.Id == Object.Id) {
                        index = Object;
                    }
               });
            }
            else
            {
                srcObj.push(Object);
                config.primaryId--;
            }
            return srcObj;
        }

        function getCursorSelectionCount(Obj)
        {
            var count = 0;
            angular.forEach(Obj, function (index) {
                index.Status === true ? count++ : count;
            })
            return count;
        }

        function getCompanyActiveUsersCount(obj) {
            var _activeCount = 0;
            angular.forEach(obj, function (index) {
                if (index.Status == 'Active' && index.Id > 0) {
                    _activeCount++;
                }
            });
            return _activeCount;
        }

        function disableCompanyUser(userName,id,status,companyId)
        {           
                var val = status == 'Active' ? 'Inactive' : 'Active';
                return commonService.getEntities(seviceConfig.clientCursorRemoteServer + 'EnableOrDisableUser?userName=' + userName + '&companyId=' + companyId + '&isEnable=' + val);                                           
        }

        function deleteUser(obj, id) {
            angular.forEach(obj, function (key, value) {
                if (obj[value].Id == id) {
                    obj.splice(value, 1);
                }
            })
            return obj;
        }
    }

})();