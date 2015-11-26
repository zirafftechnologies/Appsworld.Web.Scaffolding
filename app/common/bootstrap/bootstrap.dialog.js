(function () {
    'use strict';
    var bootstrapModule = angular.module('common.bootstrap', ['ui.bootstrap']);
    bootstrapModule.factory('bootstrap.dialog', ['$modal', '$templateCache', 'config', modalDialog]);
    function modalDialog($modal, $templateCache, config) {
        var service = {
            deleteDialog: deleteDialog,
            //deleteDialog1: deleteDialog1,
            confirmationDialog: confirmationDialog,
            primaryContact: primaryContact,
            servicedeleteDialog: servicedeleteDialog,
            servicedeleteDialog1: servicedeleteDialog1,
            confirmationDialogedi:confirmationDialogedi
        };

        $templateCache.put('modalDialogedit.tpl.html',
			'<div >' +
			'    <div class="modal-header" >' +
			'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
			'        <h3>{{title}}</h3>' +
			'    </div>' +

            '<div class="col-md-12" id="validationDiv" ng-show="isValidationRequired">' +
            '<div class="alert alert-danger alert-dismissable">' +
                '<p ng-repeat="vms in validationMessages">' +
                    '<i class="fa fa-exclamation-circle"></i>{{vms}}' +
                '</p>' +
         
            '</div>' +
        '</div>' +

     
            ' <div class="p-15"> <textarea class="k-textbox w100p" rows="10" ng-model="msgtext"> {{message}} </textarea> </div> ' +
			//'        <p class="p-15 mb-0">{{message}}</p>' +
			'    </div>' +
			'    <div class="modal-footer pt-0 pb-0">' +
			'        <button class="mui-btn mui-btn-primary " data-ng-click="ok()">{{okText}}</button>' +
			'        <button class="mui-btn mui-btn-default mui-btn-raised" ng-if="cancelText" data-ng-click="cancel()">{{cancelText}}</button>' +
			'    </div>' +
			'</div>');


        $templateCache.put('modalDialog.tpl.html',
           '<div >' +
           '    <div class="modal-header" >' +
           '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
           '        <h3>{{title}}</h3>' +
           '    </div>' +

           '<div class="col-md-12" id="validationDiv" ng-show="isValidationRequired">' +
           '<div class="alert alert-danger alert-dismissable">' +
               '<p ng-repeat="vms in validationMessages">' +
                   '<i class="fa fa-exclamation-circle"></i>{{vms}}' +
               '</p>' +
               //'<span style="padding-right:80px"></span>' +
           '</div>' +
       '</div>' +

           '    <br/>' +
          '        <p class="p-15">{{message}}</p>' +
          '    </div>' +
           '    <div class="modal-footer pt-0 pb-0">' +
           '        <button class="mui-btn mui-btn-primary " data-ng-click="ok()">{{okText}}</button>' +
           '        <button class="mui-btn mui-btn-default mui-btn-raised" ng-if="cancelText" data-ng-click="cancel()">{{cancelText}}</button>' +
           '    </div>' +
           '</div>');


      //  $templateCache.put('modalDialog1.tpl.html',
      //    '<div >' +
      //    '    <div class="modal-header" >' +
      //    '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
      //    '        <h3>{{title}}</h3>' +
      //    '    </div>' +
      //    '<div class="col-md-12" id="validationDiv" ng-show="isValidationRequired">' +
      //    '<div class="alert alert-danger alert-dismissable">' +
      //        '<p ng-repeat="vms in validationMessages">' +
      //            '<i class="fa fa-exclamation-circle"></i>{{vms}}' +
      //        '</p>' +
      //    '</div>' +
      //'</div>' +
      //    '    <br/>' +
      //    '        <p class="p-15">{{message}}</p>' +
      //    '    </div>' +
      //    '    <div class="modal-footer">' +
      //    '        <button class="mui-btn mui-btn-primary " data-ng-click="ok()">{{okText}}</button>' +
      //    '        <button class="mui-btn mui-btn-default mui-btn-raised" ng-if="cancelText" data-ng-click="cancel()">{{cancelText}}</button>' +
      //    '    </div>' +
      //    '</div>');
        $templateCache.put('isPrimaryContact.tpl.html',
        '<div>' +
        '    <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
        '        <h3>{{title}} - {{field1}}</h3>' +
        '    </div>' +
        '    <div class="modal-body">' +
        '    <br/>' +
        '        <p> {{message}} - {{field1}} ?</p>' +
        '    </div>' +
        '    <div class="modal-footer">' +
        '        <button class="mui-btn mui-btn-default mui-btn-raised" data-ng-click="cancel()">{{cancelText}}</button>' +
        '        <button class="mui-btn mui-btn-primary mui-btn-raised" data-ng-click="ok()">{{okText}}</button>' +
        '    </div>' +
        '</div>');
        return service;

        function deleteDialog(itemName, Status) {
            var title = 'Confirm ' +Status
            itemName = itemName || 'item';
            var msg = 'Are you sure, do you want ' +Status+ ' The ' + itemName + '?';
            return confirmationDialog(title, msg, 'ok', 'cancel');
        }
        function servicedeleteDialog(itemName, state, id) {
            var modalOptions = {
                //templateUrl: 'modalDialog1.tpl.html',
                templateUrl: 'modalDialog.tpl.html',
                controller: serviceDisableModalInstance,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            title: itemName,
                            message: state,
                            val: id,
                            okText: "OK",
                            cancelText: "CANCEL"
                        };
                    }
                }
            };
            return $modal.open(modalOptions).result;
        }
        function servicedeleteDialog1(itemName, state, id) {
            var modalOptions = {
                templateUrl: 'modalDialog.tpl.html',
                controller: serviceDisableModalInstance1,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            title: itemName,
                            message: state,
                            val: id,
                            okText: "OK",
                            cancelText: "CANCEL"
                        };
                    }
                }
            };
            return $modal.open(modalOptions).result;
        }
        //function deleteDialog1(itemName) {
        //    var title = 'Confirm Active';
        //    itemName = itemName || 'item';
        //    var msg = 'Are you sure, do you want Active ' + itemName + '?';
        //    var msg = 'Are you sure, do you want Active the ' + itemName + '?';
        //    return confirmationDialog(title, msg, 'ok', 'cancel');
        //}

        function confirmationDialog(title, msg, okText, cancelText) {
            var modalOptions = {
                templateUrl: 'modalDialog.tpl.html',
                controller: ModalInstance,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            title: title,
                            message: msg,
                            okText: okText,
                            cancelText: cancelText
                        };
                    }
                }
            };
            return $modal.open(modalOptions).result;
        }

        function confirmationDialogedi(title, msg, okText, cancelText) {
            var modalOptions = {
                templateUrl: 'modalDialogedit.tpl.html',
                controller: ModalInstanceedit,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            title: title,
                            message: msg,
                            okText: okText,
                            cancelText: cancelText
                        };
                    }
                }
            };
            return $modal.open(modalOptions).result;
        }
        function primaryContact(field1, title, msg, okText, cancelText) {
            var modalOptions = {
                templateUrl: 'isPrimaryContact.tpl.html',
                controller: ModalInstanceisPrimaryContact,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            field1: field1,
                            title: title,
                            message: msg,
                            okText: okText,
                            cancelText: cancelText
                        };
                    }
                }
            };
            return $modal.open(modalOptions).result;
        }
    }


    var ModalInstanceedit = ['$scope', '$modalInstance', 'options', '$rootScope',
    function ($scope, $modalInstance, options, $rootScope) {
        $scope.title = options.title || 'Title';
        $scope.msgtext = options.message || '';
        $scope.okText = options.okText || 'OK';
        $scope.cancelText = options.cancelText;
        $scope.ok = function () {
            $rootScope.mesgmodel = $scope.msgtext;
            $modalInstance.close('ok');
        };
        $scope.cancel = function () { $modalInstance.close('cancel'); };
    }];
    var ModalInstance = ['$scope', '$modalInstance', 'options','$rootScope',
    function ($scope, $modalInstance, options,$rootScope) {
		    $scope.title = options.title || 'Title';
		    $scope.message = options.message || '';
		    $scope.okText = options.okText || 'OK';
		    $scope.cancelText = options.cancelText;
		    $scope.ok = function () {
		        //$rootScope.mesgmodel = $scope.msgtext;
		        $modalInstance.close('ok');
		    };
		    $scope.cancel = function () { $modalInstance.close('cancel'); };
		}];
    var serviceDisableModalInstance = ['$scope', '$rootScope', '$modalInstance', 'options', 'serviceGroupFactory',
       function ($scope, $rootScope, $modalInstance, options, serviceGroupFactory) {
           if (options.message == "Active") {
               $scope.statemesg = "Inactive"
           } else {
               $scope.statemesg = "Active"
           }
           $scope.title = " Confirm " + $scope.statemesg || 'Title';
           $scope.message = 'Are you sure, do you want to ' + $scope.statemesg + ' The Service Group';
           $scope.status = options.message;
           
           $scope.okText = options.okText || 'OK';
           $scope.cancelText = options.cancelText;
           $scope.isValidationRequired = false;
           $scope.validationMessages = [];
           $scope.value = options.val;
          
           $scope.ok = function () {
               serviceGroupFactory.enableData($scope.value, $scope.status).then(function (response) {
                   if (response.data == "Update Successfull") {
                       $rootScope.$broadcast('closemodel', { data: { status: 'saveContact' } });
                       $modalInstance.close('ok');
                       return
                   }
                   else {
                       $scope.isValidationRequired = true;
                       $scope.validationMessages.push(response.data)
                       return;
                   }
               });
           };
           $scope.cancel = function () {

               $rootScope.$broadcast('closemodel', { data: { status: 'saveContact' } });
               $modalInstance.close('cancel');
           };
       }];


    var serviceDisableModalInstance1 = ['$scope', '$rootScope', '$modalInstance', 'options', 'serviceFactory',
      function ($scope, $rootScope, $modalInstance, options, serviceFactory) {
          //$scope.title = "Confirm Service Group "  || 'Title';
          if (options.message == "Active") {
              $scope.statemesg = "Inactive"
          } else {
              $scope.statemesg = "Active"
          }
          $scope.title = " Confirm " + $scope.statemesg || 'Title';
          $scope.message = 'Are you sure, do you want to ' + $scope.statemesg + ' The Service';
          $scope.status = options.message;
          $scope.okText = options.okText || 'OK';
          $scope.cancelText = options.cancelText;
          $scope.isValidationRequired = false;
          $scope.validationMessages = [];
          $scope.value = options.val;

          $scope.ok = function () {

              serviceFactory.enableData1($scope.value, $scope.status).then(function (response) {

                  // alert(response.data);
                  if (response.data == "Update Successfull") {
                      $rootScope.$broadcast('closemodel', { data: { status: 'saveContact' } });
                      $modalInstance.close('ok');
                      return
                  }
                  else {
                      $scope.isValidationRequired = true;
                      $scope.validationMessages.push(response.data)
                      //  alert(response.data);
                      return;
                  }
              });
          };
          $scope.cancel = function () {
              $rootScope.$broadcast('closemodel', { data: { status: 'saveContact' } });
              $modalInstance.close('cancel');
          };
      }];
    var ModalInstanceisPrimaryContact = ['$scope', '$modalInstance', 'options',
		function ($scope, $modalInstance, options) {
		    $scope.field1 = options.field1 || 'Title';
		    $scope.title = options.title || 'Title';
		    $scope.message = options.message || '';
		    $scope.okText = options.okText || 'OK';
		    $scope.cancelText = options.cancelText || 'Cancel';
		    $scope.ok = function () { $modalInstance.close('Yes'); };
		    $scope.cancel = function () { $modalInstance.close('No'); };
		}];
})();
