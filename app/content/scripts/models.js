var app = angular.module('lead');

app.controller('LikeInstance', function ($rootScope, $scope, $modal, config) {
    $scope.open = function (size, id, url, like) {
        config.likeDislike = { IsLike: like, UrlContext: url, Parameter: id };
        var modalInstance = $modal.open({
            templateUrl: 'myModalLike.html',
            controller: 'myModalLikeInstance',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        }); myModalAsociation

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };
})

app.controller('myModalLikeInstance', ['$http', '$rootScope', '$modalInstance', '$scope',  '$window', 'config', 'seviceConfig', myModalLikeInstance]);
function myModalLikeInstance($http, $rootScope, $modalInstance, $scope, $window, config,serviceConfig) {     
    $scope.likeTitle = config.likeDislike.IsLike == 'like' ? 'Like' : 'Dis-Like';
    $scope.selection = [];
    var LikeDto = {
        Id: null, UrlContext: null, Parameter: null, UserName: config.userName, Like: null, Dislike: null, Rating: null, CompanyId: config.companyId, IsLike: null, UserCreated: config.userName,Status:'Active'
    }
    // toggle selection for a given employee by name
    $scope.saveLike = function () {
        if ($scope.validator.validate()) {
            LikeDto.UrlContext = config.likeDislike.UrlContext;
            LikeDto.Parameter = config.likeDislike.Parameter;
            LikeDto.IsLike = config.likeDislike.IsLike == 'like' ? true : false;
            $http.post(serviceConfig.clientCursorRemoteServer + 'SaveExpression', LikeDto).success(function (response) {
                $modalInstance.close();
                $rootScope.$broadcast('like', LikeDto.IsLike);
            });
        }


    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

}
app.controller('manAssociations', function ($rootScope, $scope, $modal, config) {
    $scope.open = function (size, leadId) {
        $rootScope.leadId = leadId;
        var modalInstance = $modal.open({
            templateUrl: 'myModalAsociation.html',
            controller: 'myModalAsociationInstance',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };
})
app.controller('myModalAsociationInstance', ['$http', '$rootScope', '$modalInstance', '$scope', '$window', 'config', 'seviceConfig', 'leadAccountDataContext', 'formValidate', myModalAsociationInstance]);
function myModalAsociationInstance($http, $rootScope, $modalInstance, $scope, $window, config, serviceConfig, leadAccountDataContext,formValidate) {
    $scope.selection = [];    
    $scope.companyLookUp = {
        dataTextField: "LeadName",
        maxLength: 2,
        headerTemplate: '<div class="dropdown-header">' +
                '<span class="tile-header">Lead info</span>' +
            '</div>',
        template:
                  '<span class="k-state-default"><h3>#: data.LeadName #</h3><p><b>Primary Contact: </b>#: data.PrimaryContactName #</p></span>' +
                  '<span class="k-state-default"></span>',
        dataSource: {
            transport: {
                read: {
                    dataType: "json",
                    url: serviceConfig.clientCursorClientRemoteServer + "LeadLookUp?companyId=" + config.companyId
                }
            },
        },
        height: 470,
        select: getSelectedLead
    }
    $http.get(serviceConfig.clientCursorClientRemoteServer + 'ControlCodeCategories?$filter=CompanyId%20eq%20' + config.companyId + '%20and%20ControlCodeCategoryCode%20eq%20%27Relationship%27').then(function (res) {
        $scope.associationObj.RelationShip = res.data[0].DefaultValue;
        $scope.relationShip = res.data[0].ControlCodes;
    })
    $scope.isLeadSelected = false;
    $scope.isServerValRequire = false;
    $scope.associationObj = leadAccountDataContext.createManAssociation($rootScope.leadId);
    function getSelectedLead(e) {
        var selectedItem = this.dataItem(e.item.index());
        $scope.associationObj.ToAccountId = selectedItem.LeadId;
        $scope.isLeadSelected = true;
    }
    $scope.cancelAssociation = function () {
        $modalInstance.dismiss('cancel');
    }
    $scope.saveAssociation = function () {
        $scope.isServerValRequire = false;
       
        if (formValidate.validate('manAss').isValidationRequired === true) {
            if ($scope.isLeadSelected === false&&$scope.associationObj.Name) {
                formValidate.setValidationMessages(document.getElementById('assAutoCmptl').parentElement, 'Select Name from lookup only');
            }
            return;
        }
        if ($scope.isLeadSelected === false) {
            formValidate.setValidationMessages(document.getElementById('assAutoCmptl').parentElement, 'Select Name from lookup only');
            return;
        }
        if ($scope.associationObj.ToAccountId === $rootScope.leadId) {
            formValidate.setValidationMessages(document.getElementById('assAutoCmptl').parentElement, 'Self Association not allowed');
            return;
        }
        return leadAccountDataContext.saveManAssociation($scope.associationObj).success(function () {
            $modalInstance.dismiss('ok');
            $rootScope.$broadcast('savedManAss');
        }).error(function (res) {
            $scope.isServerValRequire = true;
            $scope.serverValidation = res.Message;
        })
        
    }
}
app.controller('verifyLoackPassword', function ($rootScope, $scope, $modal, config) {
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'periodLockPasswordVerify.html',
            controller: 'myModalPasswordVerifyInstance',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        }); 
        $rootScope.$on('verifyPassword', function () {
            open('md');
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };
})

app.controller('myModalPasswordVerifyInstance', ['$rootScope', '$modalInstance', '$scope', 'config', 'formValidate', 'invoicingDataContext', myModalPasswordVerifyInstance]);
function myModalPasswordVerifyInstance($rootScope, $modalInstance, $scope,config, formvalidate, invoicingDataContext) {
    $scope.isPlPassValidationRequired = false;

    $scope.verifyPassWord = function ()
    {
        $scope.isPlPassValidationRequired = false;
        $scope.validationMessages = [];
        if (!formvalidate.validate('plPassword').isValidationRequired)
        {
            invoicingDataContext.verifyLockPassword($scope.periodLockPassword).then(function (res) {
                if (!res.data)
                {
                    $scope.isPlPassValidationRequired = true;
                    $scope.validationMessages.push('Invalid password please enter correct password');                    
                }
                else
                {
                    $rootScope.$broadcast('passwordVerified', { response: res, password: $scope.periodLockPassword });
                    $modalInstance.close('ok');
                }
                
            });
        }
                          
    }
    $scope.cancelVerification = function ()
    {
        $modalInstance.dismiss('cancel');
    }

}

app.controller('invoiceNote', function ($rootScope, $scope, $modal, config) {
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'invoiceNotes.html',
            controller: 'myModalInvoiceNoteInstance',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });        
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };
})

app.controller('myModalInvoiceNoteInstance', ['$rootScope', '$modalInstance', '$scope', 'config','formValidate', 'invoicingDataContext', myModalInvoiceNoteInstance]);
function myModalInvoiceNoteInstance($rootScope, $modalInstance, $scope, config,formValidate, invoicingDataContext) {
    $scope.dateOptions = {
        format: 'dd/MM/yyyy',
        'class': 'datepicker'
    };
    $scope.formats6 = ['dd/MM/yyyy'];
    $scope.format6 = $scope.formats6[0];
    var _invoiceId = invoicingDataContext.getInvoiceData().invoiceId;
    (function () {
        invoicingDataContext.getInvoiceNote(_invoiceId, 'new').then(function (res) {
            $scope.invoiceNote = res.data;
        });
    })();
    $scope.openExDateOfPayment = function ($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope[opened] = $scope[opened] === true ? false : true;
    };
    $scope.saveNote = function () {
       
        var _validationResult = formValidate.validate('invoiceNote');
        if (!_validationResult.isValidationRequired)
        {
            if (_invoiceId === 'new')
            {
                $scope.invoiceNote.UserCreated = config.userName;
                $scope.invoiceNote.CreatedDate = new Date();
                invoicingDataContext.setInvoiceData(_invoiceId, $scope.invoiceNote);
            }
            else
            {
                $scope.invoiceNote.InvoiceId = _invoiceId;
                $scope.invoiceNote.UserCreated = config.userName;
                $scope.invoiceNote.CreatedDate = new Date();
                invoicingDataContext.saveInvoiceNote($scope.invoiceNote);
                invoicingDataContext.setInvoiceData(_invoiceId, $scope.invoiceNote);
            }
            $rootScope.$broadcast('invoiceNoteSaved');
            $modalInstance.close('ok');
        }
        else
        {

        }
    }
    $scope.cancelNote = function () {
        $modalInstance.dismiss('cancel');
    }

}